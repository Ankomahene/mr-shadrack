import type { ReactNode } from 'react';
import type { GalleryImage } from '../../content/types.ts';
import { cn } from '../../lib/utils.ts';

/** Local screenshots ship with a 1200px "-sm" twin; pick it for cards and let the browser decide. */
function sources(src: string) {
  if (!src.startsWith('/work/') || !src.endsWith('.webp')) return {};
  return { srcSet: `${src.replace(/\.webp$/, '-sm.webp')} 1200w, ${src} 2400w` };
}

interface ShotImageProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

export function ShotImage({ src, alt, sizes = '(min-width: 1024px) 50vw, 100vw', priority, className }: ShotImageProps) {
  return (
    <img
      src={src}
      {...sources(src)}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      className={cn('block h-auto w-full', className)}
    />
  );
}

function Dots() {
  return (
    <div className="flex gap-1.5">
      <span className="size-2.5 rounded-full bg-[#ff5f57]" />
      <span className="size-2.5 rounded-full bg-[#febc2e]" />
      <span className="size-2.5 rounded-full bg-[#28c840]" />
    </div>
  );
}

export function BrowserFrame({ url, children, className }: { url?: string | null; children: ReactNode; className?: string }) {
  const host = url ? url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '') : null;
  return (
    <div className={cn('overflow-hidden rounded-xl border border-border bg-card', className)}>
      <div className="flex h-8 items-center gap-3 border-b border-border bg-surface px-3">
        <Dots />
        {host && (
          <div className="mx-auto flex h-5 max-w-[60%] items-center truncate rounded-md bg-background/80 px-3 font-mono text-[10px] text-muted-foreground">
            {host}
          </div>
        )}
        {host && <div className="w-[42px]" />}
      </div>
      {children}
    </div>
  );
}

export function DesktopFrame({ title, children, className }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn('overflow-hidden rounded-xl border border-border bg-card', className)}>
      <div className="relative flex h-7 items-center border-b border-border bg-surface px-3">
        <Dots />
        {title && (
          <span className="absolute inset-x-0 text-center text-[10px] font-medium text-muted-foreground">{title}</span>
        )}
      </div>
      {children}
    </div>
  );
}

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[2.2rem] border-[7px] border-neutral-900 bg-neutral-900 ring-1 ring-white/10 dark:border-neutral-800',
        className,
      )}
    >
      <div className="absolute top-2 left-1/2 z-10 h-[18px] w-[30%] -translate-x-1/2 rounded-full bg-neutral-900" />
      <div className="overflow-hidden rounded-[1.7rem]">{children}</div>
    </div>
  );
}

interface ShotProps {
  image: GalleryImage;
  url?: string | null;
  title?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
}

/** A screenshot in the frame its gallery entry asks for. */
export function Shot({ image, url, title, sizes, priority, className }: ShotProps) {
  const img = <ShotImage src={image.src} alt={image.alt} sizes={sizes} priority={priority} />;
  switch (image.frame) {
    case 'phone':
      return (
        <PhoneFrame className={className}>
          <ShotImage src={image.src} alt={image.alt} sizes="360px" priority={priority} />
        </PhoneFrame>
      );
    case 'desktop':
      return (
        <DesktopFrame title={title} className={className}>
          {img}
        </DesktopFrame>
      );
    case 'none':
      return <div className={cn('overflow-hidden rounded-xl border border-border', className)}>{img}</div>;
    default:
      return (
        <BrowserFrame url={url} className={className}>
          {img}
        </BrowserFrame>
      );
  }
}
