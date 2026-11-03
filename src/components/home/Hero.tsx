import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import { ArrowDown, FileText, MapPin } from 'lucide-react';
import type { PointerEvent } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router';
import { useStatus } from '../../lib/data.ts';
import { site } from '../../lib/site.ts';
import { DesktopFrame, PhoneFrame, ShotImage } from '../site/frames.tsx';
import { Button } from '../ui/button.tsx';

const ease = [0.16, 1, 0.3, 1] as const;

function StatusPill() {
  const { data: status } = useStatus();
  if (status && !status.visible) return <div className="h-8" />;
  const available = status?.available ?? true;
  const text = status?.text ?? 'Open to new opportunities';
  const content = (
    <>
      <span className="relative flex size-2">
        {available && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-emerald-500" />}
        <span className={`relative size-2 rounded-full ${available ? 'bg-emerald-500' : 'bg-amber-500'}`} />
      </span>
      {text}
    </>
  );
  const cls =
    'inline-flex h-8 items-center gap-2.5 rounded-full border border-border bg-background/60 px-3.5 text-[13px] text-muted-foreground backdrop-blur';
  return status?.link ? (
    <a href={status.link} target="_blank" rel="noreferrer" className={`${cls} hover:text-foreground`}>
      {content}
    </a>
  ) : (
    <span className={cls}>{content}</span>
  );
}

function Collage() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const backX = useTransform(sx, (v) => v * -10);
  const backY = useTransform(sy, (v) => v * -10);
  const mainX = useTransform(sx, (v) => v * 8);
  const mainY = useTransform(sy, (v) => v * 8);
  const phoneX = useTransform(sx, (v) => v * 22);
  const phoneY = useTransform(sy, (v) => v * 22);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative mx-auto aspect-[1.08] w-full max-w-[640px] select-none"
      aria-hidden
    >
      <motion.div
        style={{ x: backX, y: backY }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.35, ease }}
        className="absolute top-0 right-0 w-[78%]"
      >
        <DesktopFrame title="StockFlow" className="shadow-soft opacity-70 dark:opacity-55">
          <ShotImage src="/work/stockflow/dashboard.webp" alt="" sizes="500px" priority />
        </DesktopFrame>
      </motion.div>

      <motion.div
        style={{ x: mainX, y: mainY }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.15, ease }}
        className="absolute top-[18%] left-0 w-[86%]"
      >
        <DesktopFrame title="Print Suite Pro" className="shadow-float">
          <ShotImage src="/work/print-suite-pro/home-dashboard.webp" alt="" sizes="560px" priority />
        </DesktopFrame>
      </motion.div>

      <motion.div
        style={{ x: phoneX, y: phoneY }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.5, ease }}
        className="absolute right-[3%] bottom-0 w-[27%]"
      >
        <div className="animate-float">
          <PhoneFrame className="shadow-float">
            <ShotImage src="/work/judey-phones/mobile.webp" alt="" sizes="180px" priority />
          </PhoneFrame>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 1, ease }}
        className="absolute bottom-[9%] left-[4%] hidden rounded-xl border border-border bg-popover/90 px-4 py-3 shadow-float backdrop-blur sm:block"
      >
        <p className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">Shipping now</p>
        <p className="mt-1 text-sm font-medium">Judey Phones · Android + Web</p>
      </motion.div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="grid-bg pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-brand/15 blur-[120px] dark:bg-brand/10" />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-10">
        <div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <StatusPill />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.08, ease }}
            className="mt-7 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.1rem]"
          >
            I build the software{' '}
            <span className="relative whitespace-nowrap">
              <span className="bg-gradient-to-br from-foreground to-foreground/55 bg-clip-text text-transparent">
                businesses run on.
              </span>
              <svg
                className="absolute -bottom-2 left-0 h-3 w-full text-brand"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                aria-hidden
              >
                <motion.path
                  d="M2 9 C 80 2, 200 2, 298 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.7, ease }}
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground"
          >
            I’m <span className="text-foreground">Shadrack Ankomahene</span>, a software engineer in Accra with 6+ years in
            production — from enterprise API platforms at Morgan Stanley to desktop, web and Android products that print
            shops, retailers, churches and phone sellers use every day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button asChild variant="brand" size="lg">
              <Link to="/#work">
                See my work <ArrowDown />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={site.cv} target="_blank" rel="noreferrer">
                <FileText /> Résumé
              </a>
            </Button>
            <div className="ml-1 flex items-center gap-1">
              <a
                href={site.socials.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid size-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <FaGithub className="size-5" />
              </a>
              <a
                href={site.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid size-11 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <FaLinkedin className="size-5" />
              </a>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex items-center gap-2 font-mono text-xs text-muted-foreground"
          >
            <MapPin className="size-3.5 text-brand" /> {site.location} · {site.timezone} · remote-friendly
          </motion.p>
        </div>

        <Collage />
      </div>
    </section>
  );
}
