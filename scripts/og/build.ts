// Renders the social preview cards (public/og/*.jpg) and app icons with headless Edge.
// Usage: node scripts/og/build.ts   (Windows; set EDGE_PATH to use another Chromium browser)
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { projects } from '../../src/content/projects.ts';
import type { ProjectSeed } from '../../src/content/types.ts';

const repo = join(import.meta.dirname, '..', '..');
const out = join(repo, 'scripts', 'og', '.out');
const pub = join(repo, 'public');
mkdirSync(out, { recursive: true });
mkdirSync(join(pub, 'og'), { recursive: true });

const file = (p: string) => pathToFileURL(join(repo, p)).href;
const fonts = `
  @font-face { font-family: Geist; src: url(${file('node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2')}) format('woff2'); font-weight: 100 900; }
  @font-face { font-family: GeistMono; src: url(${file('node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2')}) format('woff2'); font-weight: 100 900; }`;

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const base = `
  ${fonts}
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; overflow: hidden; }
  body { background: #0d0f13; color: #f4f1ea; font-family: Geist; position: relative; -webkit-font-smoothing: antialiased; }
  .grid { position: absolute; inset: 0; background-image: linear-gradient(to right, rgba(255,255,255,.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.045) 1px, transparent 1px); background-size: 56px 56px; mask-image: radial-gradient(ellipse 80% 90% at 20% 30%, #000, transparent); }
  .glow { position: absolute; width: 760px; height: 520px; left: -160px; top: -260px; border-radius: 50%; filter: blur(110px); opacity: .32; }
  .left { position: absolute; left: 72px; top: 64px; bottom: 64px; width: 560px; display: flex; flex-direction: column; }
  .brand { display: flex; align-items: center; gap: 14px; font-size: 22px; font-weight: 600; letter-spacing: -.01em; }
  .mark { width: 44px; height: 44px; border-radius: 11px; background: #f4f1ea; color: #0d0f13; display: grid; place-items: center; font: 600 17px GeistMono; position: relative; }
  .mark i { position: absolute; right: -3px; bottom: -3px; width: 12px; height: 12px; border-radius: 50%; background: #f2c14e; border: 3px solid #0d0f13; }
  .domain { margin-left: auto; font: 400 16px GeistMono; color: #8b8f99; }
  .eyebrow { font: 500 15px GeistMono; letter-spacing: .16em; text-transform: uppercase; color: #f2c14e; margin-top: auto; }
  h1 { font-size: 68px; line-height: 1.02; font-weight: 600; letter-spacing: -.04em; margin-top: 18px; }
  .tag { font-size: 28px; line-height: 1.25; color: #b9bcc4; margin-top: 18px; letter-spacing: -.01em; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 30px; }
  .chips span { font: 400 15px GeistMono; color: #a7abb5; border: 1px solid rgba(255,255,255,.14); border-radius: 999px; padding: 6px 13px; }
  .shot { position: absolute; left: 660px; top: 96px; width: 760px; border-radius: 14px; overflow: hidden; border: 1px solid rgba(255,255,255,.12); background: #16181d; box-shadow: 0 40px 100px -20px rgba(0,0,0,.8), 0 0 0 1px rgba(0,0,0,.4); transform: perspective(1800px) rotateY(-14deg) rotateX(3deg); transform-origin: left center; }
  .bar { height: 30px; background: #1c1f25; border-bottom: 1px solid rgba(255,255,255,.08); display: flex; gap: 7px; align-items: center; padding: 0 13px; }
  .bar b { width: 11px; height: 11px; border-radius: 50%; display: block; }
  .shot img { display: block; width: 100%; }
  .phone { position: absolute; border-radius: 40px; border: 9px solid #1a1a1a; overflow: hidden; box-shadow: 0 40px 90px -20px rgba(0,0,0,.85); background: #000; }
  .phone img { display: block; width: 100%; border-radius: 31px; }
`;

const dots = '<div class="bar"><b style="background:#ff5f57"></b><b style="background:#febc2e"></b><b style="background:#28c840"></b></div>';
const header = '<div class="brand"><div class="mark">SA<i></i></div>Shadrack Ankomahene<span class="domain">mrshadrack.site</span></div>';
const label = { product: 'Product', client: 'Client project', side: 'Side project' } as const;

function projectCard(p: ProjectSeed) {
  const cover = p.gallery.find((g) => g.src === p.cover) ?? p.gallery[0];
  const isPhone = cover?.frame === 'phone';
  const img = file(join('public', cover.src));
  const visual = isPhone
    ? `<div class="phone" style="left:800px;top:70px;width:270px;transform:rotate(-4deg)"><img src="${img}"></div>`
    : `<div class="shot">${cover.frame === 'none' ? '' : dots}<img src="${img}"></div>`;
  const size = p.name.length > 16 ? 56 : 68;
  return `<!doctype html><html><head><style>${base}</style></head><body>
    <div class="grid"></div><div class="glow" style="background:${p.accent}"></div>
    ${visual}
    <div class="left">${header}
      <p class="eyebrow">${label[p.category]} · ${esc(p.year)}</p>
      <h1 style="font-size:${size}px">${esc(p.name)}</h1>
      <p class="tag">${esc(p.tagline)}</p>
      <div class="chips">${p.stack.slice(0, 4).map((s) => `<span>${esc(s)}</span>`).join('')}</div>
    </div></body></html>`;
}

function defaultCard() {
  return `<!doctype html><html><head><style>${base}
    .shot.back { left: 760px; top: 40px; width: 620px; opacity: .55; transform: perspective(1800px) rotateY(-14deg) rotateX(3deg); }
  </style></head><body>
    <div class="grid"></div><div class="glow" style="background:#f2c14e;opacity:.22"></div>
    <div class="shot back">${dots}<img src="${file('public/work/stockflow/dashboard.webp')}"></div>
    <div class="shot" style="top:150px;left:690px;width:640px">${dots}<img src="${file('public/work/print-suite-pro/home-dashboard.webp')}"></div>
    <div class="phone" style="left:1010px;top:300px;width:160px;border-width:7px;border-radius:28px"><img style="border-radius:21px" src="${file('public/work/judey-phones/mobile.webp')}"></div>
    <div class="left">${header}
      <p class="eyebrow">Software Engineer · Accra</p>
      <h1 style="font-size:64px">I build the software businesses run on.</h1>
      <p class="tag">Web, desktop and Android products. 6+ years, from Morgan Stanley to my own company.</p>
    </div></body></html>`;
}

const iconSvg = readFileSync(join(pub, 'favicon.svg'), 'utf8');
const icon = (size: number) =>
  `<!doctype html><html><head><style>*{margin:0}html,body{width:${size}px;height:${size}px;overflow:hidden;background:#0d0f13}svg{display:block;width:100%;height:100%}</style></head><body>${iconSvg}</body></html>`;

const jobs: object[] = [];
const add = (name: string, html: string, outPath: string, w: number, h: number, format: 'jpeg' | 'png') => {
  const src = join(out, `${name}.html`);
  writeFileSync(src, html);
  jobs.push({ kind: 'file', url: pathToFileURL(src).href, out: outPath, width: w, height: h, dsf: 1, wait: 1200, format, quality: 88 });
};

add('default', defaultCard(), join(pub, 'og', 'default.jpg'), 1200, 630, 'jpeg');
for (const p of projects) add(p.slug, projectCard(p), join(pub, 'og', `${p.slug}.jpg`), 1200, 630, 'jpeg');
add('apple-touch-icon', icon(180), join(pub, 'apple-touch-icon.png'), 180, 180, 'png');
add('icon-192', icon(192), join(pub, 'icon-192.png'), 192, 192, 'png');
add('icon-512', icon(512), join(pub, 'icon-512.png'), 512, 512, 'png');
add('icon-32', icon(32), join(out, 'icon-32.png'), 32, 32, 'png');

const jobsFile = join(out, 'jobs.json');
writeFileSync(jobsFile, JSON.stringify(jobs, null, 1));
execFileSync(process.execPath, [join(repo, 'scripts', 'capture.mjs'), jobsFile], { stdio: 'inherit' });

// favicon.ico: a single 32px PNG in an ICO container.
const png = readFileSync(join(out, 'icon-32.png'));
const ico = Buffer.alloc(22);
ico.writeUInt16LE(1, 2); // type: icon
ico.writeUInt16LE(1, 4); // one image
ico.writeUInt8(32, 6);
ico.writeUInt8(32, 7);
ico.writeUInt16LE(1, 10); // colour planes
ico.writeUInt16LE(32, 12); // bits per pixel
ico.writeUInt32LE(png.length, 14);
ico.writeUInt32LE(22, 18);
writeFileSync(join(pub, 'favicon.ico'), Buffer.concat([ico, png]));
console.log('favicon.ico written');
