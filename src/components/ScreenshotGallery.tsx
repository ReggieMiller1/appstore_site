"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function ScreenshotGallery({ images, alt }: { images: string[]; alt: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = () => setOpenIndex(null);
  const prev = () =>
    setOpenIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  const next = () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length));

  return (
    <>
      <div className="scrollbar-thin flex gap-4 overflow-x-auto pb-2">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setOpenIndex(i)}
            className="relative h-64 w-36 shrink-0 overflow-hidden rounded-2xl border border-border bg-surface-2 transition-transform hover:scale-[1.02] sm:h-80 sm:w-44"
          >
            <Image src={src} alt={`${alt} screenshot ${i + 1}`} fill className="object-cover" />
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <button
            aria-label="Close"
            onClick={close}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            aria-label="Previous screenshot"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-8"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            className="relative h-[70vh] w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[openIndex]}
              alt={`${alt} screenshot ${openIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>

          <button
            aria-label="Next screenshot"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-8"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </>
  );
}
