"use client";

import { LiquidMetal, liquidMetalPresets } from "@paper-design/shaders-react";

export default function Footer() {
  const noir = liquidMetalPresets[1].params;

  return (
    <footer
      id="kontakt"
      className="relative overflow-hidden bg-[#3a0610] text-[#f7f1ea] mt-24 isolate"
    >
      {/* Red-tinted metallic fluid background */}
      <LiquidMetal
        {...noir}
        fit="cover"
        colorBack="#3a0610"
        colorTint="#b8001e"
        speed={0.6}
        scale={1.4}
        repetition={2}
        softness={0.55}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      {/* Vignette for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(58,6,16,0.35) 0%, rgba(58,6,16,0.8) 100%)",
        }}
      />

      <div className="relative z-[2] max-w-6xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="text-center mb-20">
          <p className="text-[0.7rem] uppercase tracking-[0.4em] text-[#f7f1ea]/50 mb-8">
            Kontakt &nbsp;·&nbsp; Termin
          </p>
          <h2 className="font-display font-light italic text-5xl md:text-7xl leading-[0.95]">
            Rouge Nails
          </h2>
          <div className="mt-10 mx-auto w-12 h-px bg-[#f7f1ea]/40" />
          <p className="mt-8 max-w-md mx-auto text-sm md:text-base font-light text-[#f7f1ea]/80">
            Für Terminanfragen, Fragen oder einfach eine persönliche Beratung.
            Wir freuen uns auf Sie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-center md:text-left">
          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#f7f1ea]/50 mb-4">
              Adresse
            </p>
            <p className="font-light text-sm leading-relaxed text-[#f7f1ea]/85">
              Friedrichstraße 47
              <br />
              10117 Berlin
            </p>
          </div>

          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#f7f1ea]/50 mb-4">
              Kontakt
            </p>
            <p className="font-light text-sm leading-relaxed text-[#f7f1ea]/85">
              +49 000 000 00 00
              <br />
              hallo@rougenails.de
            </p>
          </div>

          <div>
            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#f7f1ea]/50 mb-4">
              Öffnungszeiten
            </p>
            <p className="font-light text-sm leading-relaxed text-[#f7f1ea]/85">
              Di – Fr &nbsp; 10 – 19 Uhr
              <br />
              Sa &nbsp; 11 – 17 Uhr
            </p>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-[#f7f1ea]/15 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#f7f1ea]/40">
            © {new Date().getFullYear()} Rouge Nails
          </p>

          <div className="flex items-center gap-8 text-[0.7rem] uppercase tracking-[0.3em]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer noopener"
              className="text-[#f7f1ea]/70 hover:text-[#f7f1ea] transition-colors"
            >
              Instagram
            </a>
            <a
              href="#impressum"
              className="text-[#f7f1ea]/70 hover:text-[#f7f1ea] transition-colors"
            >
              Impressum
            </a>
            <a
              href="#datenschutz"
              className="text-[#f7f1ea]/70 hover:text-[#f7f1ea] transition-colors"
            >
              Datenschutz
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
