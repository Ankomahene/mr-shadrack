// Drives headless Edge over CDP to capture screenshots. Usage: node scripts/capture.mjs <jobs.json>
// Jobs: { kind: "url"|"file", url, out, width, height, dsf, wait, mobile, js, afterJs, quality, format, dark }
//       { kind: "convert", src, out, maxWidth, quality }
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const EDGE = process.env.EDGE_PATH ?? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9333;
const dir = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1'));
const jobs = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const edge = spawn(
  EDGE,
  [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-first-run',
    '--mute-audio',
    `--remote-debugging-port=${PORT}`,
    `--user-data-dir=${path.join(dir, '.edge-profile')}`,
    '--force-color-profile=srgb',
    'about:blank',
  ],
  { stdio: 'ignore' },
);

let ws;
let seq = 0;
const pending = new Map();
const listeners = new Set();
function send(method, params = {}, sessionId) {
  const id = ++seq;
  ws.send(JSON.stringify({ id, method, params, sessionId }));
  return new Promise((res, rej) => {
    pending.set(id, { res, rej });
    setTimeout(() => {
      if (pending.has(id)) {
        pending.delete(id);
        rej(new Error('timeout ' + method));
      }
    }, 60000);
  });
}

async function connect() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      const { webSocketDebuggerUrl } = await r.json();
      ws = new WebSocket(webSocketDebuggerUrl);
      await new Promise((res, rej) => {
        ws.onopen = res;
        ws.onerror = rej;
      });
      ws.onmessage = (ev) => {
        const msg = JSON.parse(ev.data);
        if (msg.id && pending.has(msg.id)) {
          const p = pending.get(msg.id);
          pending.delete(msg.id);
          msg.error ? p.rej(new Error(msg.error.message)) : p.res(msg.result);
        } else if (msg.method) listeners.forEach((l) => l(msg));
      };
      return;
    } catch {
      await sleep(500);
    }
  }
  throw new Error('could not connect to Edge');
}

async function withPage(width, height, dsf, mobile, fn) {
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  const s = (m, p) => send(m, p, sessionId);
  try {
    await s('Page.enable');
    await s('Runtime.enable');
    await s('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: dsf, mobile });
    if (mobile) {
      await s('Emulation.setUserAgentOverride', {
        userAgent:
          'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Mobile Safari/537.36',
      });
      await s('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
    }
    return await fn(s, sessionId);
  } finally {
    await send('Target.closeTarget', { targetId }).catch(() => {});
  }
}

const evaluate = async (s, expression) => {
  const r = await s('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || 'eval error');
  return r.result.value;
};

async function capture(job) {
  const width = job.width || 1440;
  const height = job.height || 900;
  return withPage(width, height, job.dsf || 2, !!job.mobile, async (s, sessionId) => {
    if (job.dark !== undefined) {
      await s('Emulation.setEmulatedMedia', {
        features: [{ name: 'prefers-color-scheme', value: job.dark ? 'dark' : 'light' }],
      });
    }
    const loaded = new Promise((res) => {
      const l = (m) => {
        if (m.sessionId === sessionId && m.method === 'Page.loadEventFired') {
          listeners.delete(l);
          res();
        }
      };
      listeners.add(l);
      setTimeout(res, 45000);
    });
    await s('Page.navigate', { url: job.url });
    await loaded;
    await sleep(job.wait ?? 4000);
    if (job.js) {
      try {
        await evaluate(s, `(async () => { ${job.js} })()`);
      } catch (e) {
        console.warn('  js warning', e.message);
      }
      await sleep(job.afterJs ?? 1500);
    }
    if (job.fullPage) {
      const { cssContentSize } = await s('Page.getLayoutMetrics');
      await s('Emulation.setDeviceMetricsOverride', {
        width,
        height: Math.ceil(cssContentSize.height),
        deviceScaleFactor: job.dsf || 2,
        mobile: !!job.mobile,
      });
      await sleep(job.settle ?? 3000);
    }
    const format = job.format || 'webp';
    const { data } = await s('Page.captureScreenshot', {
      format,
      ...(format === 'png' ? {} : { quality: job.quality ?? 86 }),
      captureBeyondViewport: false,
    });
    fs.mkdirSync(path.dirname(job.out), { recursive: true });
    fs.writeFileSync(job.out, Buffer.from(data, 'base64'));
  });
}

async function convert(job) {
  return withPage(800, 600, 1, false, async (s) => {
    await s('Page.navigate', { url: pathToFileURL(job.src).href });
    await sleep(800);
    const dataUrl = await evaluate(
      s,
      `new Promise((res, rej) => {
        const img = document.querySelector('img');
        const go = () => {
          const scale = Math.min(1, ${job.maxWidth || 2400} / img.naturalWidth);
          const c = document.createElement('canvas');
          c.width = Math.round(img.naturalWidth * scale);
          c.height = Math.round(img.naturalHeight * scale);
          const ctx = c.getContext('2d');
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, c.width, c.height);
          res(c.toDataURL('image/webp', ${job.quality ?? 0.84}));
        };
        img.complete ? go() : (img.onload = go, img.onerror = () => rej(new Error('decode failed')));
      })`,
    );
    fs.mkdirSync(path.dirname(job.out), { recursive: true });
    fs.writeFileSync(job.out, Buffer.from(dataUrl.split(',')[1], 'base64'));
  });
}

try {
  await connect();
  for (const job of jobs) {
    const t = Date.now();
    try {
      if (job.kind === 'convert') await convert(job);
      else await capture(job);
      const kb = Math.round(fs.statSync(job.out).size / 1024);
      console.log(`ok   ${path.basename(job.out)} ${kb}KB ${Date.now() - t}ms`);
    } catch (e) {
      console.log(`FAIL ${path.basename(job.out)}: ${e.message}`);
    }
  }
} finally {
  ws?.close();
  edge.kill();
}
