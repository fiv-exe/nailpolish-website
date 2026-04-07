"use client";

import { useEffect, useRef, useState } from "react";
import NavHeader from "@/components/ui/nav-header";

const FRAME_COUNT = 144;
const framePath = (i: number) =>
  `/frames/frame_${String(i).padStart(4, "0")}.jpg`;

export default function Hero({ onBooking }: { onBooking?: () => void }) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [loaded, setLoaded] = useState(false);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;

    ctx.fillStyle = "#f7f1ea";
    ctx.fillRect(0, 0, cw, ch);

    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    // Cover scaling so the studio room fills the viewport edge-to-edge
    // (no letterboxing). When the viewport is wider than 16:9 the image
    // is scaled by width → any vertical overflow is anchored to the
    // BOTTOM so the puddle stays visible and only the empty ceiling
    // above gets cropped.
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = ch - dh;
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  useEffect(() => {
    let cancelled = false;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = framePath(i);
      img.onload = () => {
        loadedCount++;
        if (cancelled) return;
        if (i === 1) drawFrame(0);
        if (loadedCount >= FRAME_COUNT) setLoaded(true);
      };
      img.onerror = () => {
        loadedCount++;
        if (!cancelled && loadedCount >= FRAME_COUNT) setLoaded(true);
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawFrame(frameRef.current);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const section = sectionRef.current;
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const total = section.offsetHeight - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), total);
        const progress = total > 0 ? scrolled / total : 0;
        const next = Math.min(
          FRAME_COUNT - 1,
          Math.max(0, Math.floor(progress * (FRAME_COUNT - 1)))
        );
        if (next !== frameRef.current) {
          frameRef.current = next;
          drawFrame(next);
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: "300vh" }}
      aria-label="Hero"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#f7f1ea]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ display: "block" }}
        />

        {/* Top bar — logo left, nav centered */}
        <div className="absolute top-0 left-0 right-0 px-6 md:px-12 pt-10 md:pt-14 pb-5 md:pb-6 z-30">
          <span className="hidden md:block absolute left-12 top-1/2 -translate-y-1/2 font-display italic text-xl md:text-2xl tracking-wide text-[#3a0610]">
            Rouge Nails
          </span>
          <div className="flex justify-center animate-fade-up delay-600">
            <NavHeader onBooking={onBooking} />
          </div>
        </div>

        {/* Overlay text — bottom center, doesn't cover the bottle */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="relative h-full max-w-7xl mx-auto px-6 md:px-12">
            <div
              className="
                absolute left-1/2 -translate-x-1/2
                bottom-[8vh] md:bottom-[6vh]
                text-center max-w-md w-full
              "
            >
              <p className="text-[0.7rem] uppercase tracking-[0.45em] text-[#3a0610]/60 mb-5 animate-fade-up">
                Handwerkskunst &nbsp;·&nbsp; Eleganz
              </p>

              <h1 className="font-display font-light text-[#3a0610] leading-[0.9] animate-fade-up delay-200">
                <span className="block text-[0.7rem] uppercase tracking-[0.35em] font-light text-[#3a0610]/70 mb-3">
                  Dein
                </span>
                <em className="italic block text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]">
                  Nagelstudio
                </em>
              </h1>

              <p className="mt-6 text-sm md:text-base text-[#3a0610]/75 max-w-xs mx-auto font-light animate-fade-up delay-400">
                Perfektion in jeder Schicht. Von Hand geformt, mit Liebe zum Detail.
              </p>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-6 right-6 md:right-12 flex flex-col items-center gap-2 z-20">
          <span className="text-[0.65rem] uppercase tracking-[0.3em] text-[#3a0610]/50">
            Scroll
          </span>
          <div className="w-px h-8 bg-[#3a0610]/30" />
        </div>

        {!loaded && (
          <div className="absolute bottom-6 left-6 md:left-12 text-[0.65rem] uppercase tracking-[0.3em] text-[#3a0610]/40 z-20">
            Loading…
          </div>
        )}
      </div>
    </section>
  );
}
