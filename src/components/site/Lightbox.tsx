import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Dialog } from 'radix-ui';
import { useEffect } from 'react';
import type { GalleryImage } from '../../content/types.ts';

interface LightboxProps {
  images: GalleryImage[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
}

export function Lightbox({ images, index, onIndexChange }: LightboxProps) {
  const open = index !== null;
  const image = open ? images[index] : null;
  const step = (d: number) => index !== null && onIndexChange((index + d + images.length) % images.length);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  return (
    <Dialog.Root open={open} onOpenChange={(o) => !o && onIndexChange(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 outline-none sm:p-10"
          onClick={(e) => e.target === e.currentTarget && onIndexChange(null)}
        >
          <Dialog.Title className="sr-only">{image?.alt ?? 'Screenshot'}</Dialog.Title>
          {image && (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              className={`max-h-[82vh] w-auto max-w-full rounded-lg shadow-2xl animate-in fade-in-0 zoom-in-[0.98] ${
                image.frame === 'phone' ? 'max-h-[86vh]' : ''
              }`}
            />
          )}
          <p className="mt-4 font-mono text-xs text-white/70">
            {image?.alt} · {(index ?? 0) + 1}/{images.length}
          </p>
          <Dialog.Close className="absolute top-4 right-4 grid size-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
            <X className="size-5" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                className="absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Previous"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
                aria-label="Next"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
