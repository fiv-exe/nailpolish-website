"use client";

import { useEffect, useRef, useState } from "react";

interface SlideProps {
  children: React.ReactNode;
  from: "left" | "right";
  delay?: number;
  className?: string;
}

function SlideIn({ children, from, delay = 0, className = "" }: SlideProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const offset = from === "left" ? -100 : 100;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : `translateX(${offset}px)`,
        transition: `opacity 1s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 1s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function About({ onBooking }: { onBooking?: () => void }) {
  return (
    <section id="ueber-uns" className="relative py-32 md:py-48 px-6 md:px-12 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 md:gap-16 items-start">
          {/* Label */}
          <div className="md:col-span-3">
            <SlideIn from="left">
              <p className="text-[0.7rem] uppercase tracking-[0.4em] text-[#3a0610]/60">
                Über uns
              </p>
              <div className="mt-6 w-8 h-px bg-[#8b0a1a]/60" />
            </SlideIn>
          </div>

          {/* Content */}
          <div className="md:col-span-9 space-y-8">
            <h2 className="font-display font-light text-4xl md:text-6xl leading-[1.05] text-[#3a0610]">
              <SlideIn from="left">
                Ein stilles Atelier für die
              </SlideIn>
              <SlideIn from="right" delay={0.15}>
                <em className="italic">schönsten Hände.</em>
              </SlideIn>
            </h2>

            <div className="space-y-6 text-base md:text-lg text-[#3a0610]/80 max-w-2xl leading-relaxed font-light">
              <SlideIn from="left" delay={0.25}>
                <p>
                  In meinem Studio trifft jahrelange Erfahrung auf kompromisslose
                  Hingabe zum Detail. Jeder Nagel wird behandelt wie ein kleines
                  Kunstwerk — geformt, gefeilt und veredelt mit der Ruhe und
                  Präzision, die Luxus ausmacht.
                </p>
              </SlideIn>
              <SlideIn from="right" delay={0.35}>
                <p>
                  Hochwertige Materialien, sorgfältig ausgewählte Farben und ein
                  Ambiente, das zur Entspannung einlädt. Ein Ort für Menschen, die
                  nicht weniger als das Beste erwarten.
                </p>
              </SlideIn>
            </div>

            <SlideIn from="left" delay={0.45}>
              <div className="pt-4 flex flex-wrap items-center gap-6 text-[0.7rem] uppercase tracking-[0.3em] text-[#3a0610]/60">
                <span>Premium Produkte</span>
                <span className="w-8 h-px bg-[#8b0a1a]/40" />
                <span>Private Studio</span>
                <span className="w-8 h-px bg-[#8b0a1a]/40" />
                <span>Persönliche Beratung</span>
              </div>
            </SlideIn>

            <SlideIn from="left" delay={0.55}>
              <div className="pt-6">
                <button
                  onClick={onBooking}
                  className="group inline-flex items-center gap-4 border border-[#3a0610]/30 text-[#3a0610] px-8 py-3.5 text-[0.7rem] uppercase tracking-[0.3em] font-light transition-all duration-500 hover:bg-[#3a0610] hover:text-[#f7f1ea] hover:border-[#3a0610] cursor-pointer"
                >
                  Termin buchen
                  <span className="w-5 h-px bg-current transition-all duration-500 group-hover:w-8" />
                </button>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>
    </section>
  );
}
