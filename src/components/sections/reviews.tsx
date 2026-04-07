"use client";

import React from "react";

type Review = {
  image: string;
  name: string;
  date: string;
  text: string;
};

const row1: Review[] = [
  {
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=60",
    name: "Lena Hoffmann",
    date: "vor 2 Wochen",
    text: "Absolut traumhafte Arbeit. Die Atmosphäre im Studio ist so ruhig und elegant, man fühlt sich sofort wie in einem privaten Atelier. Meine Nägel waren noch nie so perfekt.",
  },
  {
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=60",
    name: "Sophie Richter",
    date: "vor 1 Monat",
    text: "Höchste Präzision und ein Auge für Details, das seinesgleichen sucht. Die Beratung war persönlich, das Ergebnis einfach wunderschön.",
  },
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=60",
    name: "Marie Bauer",
    date: "vor 3 Wochen",
    text: "Ein echtes Premium-Erlebnis von Anfang bis Ende. Sehr sauber, hochwertige Produkte und ein Design, das genau meinen Geschmack getroffen hat.",
  },
  {
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=60",
    name: "Clara Fischer",
    date: "vor 5 Tagen",
    text: "Endlich ein Studio, das wirklich versteht, was ich möchte. Die Gelnägel halten ewig und sehen nach drei Wochen noch aus wie am ersten Tag.",
  },
];

const row2: Review[] = [
  {
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=60",
    name: "Hannah Weber",
    date: "vor 2 Monaten",
    text: "Die beste Maniküre, die ich je hatte. So gepflegt, so sorgfältig. Man merkt einfach, dass hier jemand mit echter Leidenschaft arbeitet.",
  },
  {
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=60",
    name: "Julia Meier",
    date: "vor 1 Woche",
    text: "Das Nageldesign war genau so, wie ich es mir vorgestellt habe — filigran, elegant und absolut einzigartig. Ich komme definitiv wieder.",
  },
  {
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&auto=format&fit=crop&q=60",
    name: "Anna Schäfer",
    date: "vor 3 Wochen",
    text: "Wunderschönes Studio, entspannte Atmosphäre und ein Ergebnis das mich jedes Mal aufs Neue begeistert. Absolut empfehlenswert.",
  },
  {
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&auto=format&fit=crop&q=60",
    name: "Emilia Braun",
    date: "vor 6 Tagen",
    text: "Mein Geheimtipp in der Stadt. Professionell, sauber, luxuriös — und trotzdem persönlich. Die Shellac-Farben sind einfach unglaublich.",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 text-[#8b0a1a]">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function VerifyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 48 48" className="inline-block shrink-0">
      <polygon fill="#8b0a1a" points="29.62,3 33.053,8.308 39.367,8.624 39.686,14.937 44.997,18.367 42.116,23.995 45,29.62 39.692,33.053 39.376,39.367 33.063,39.686 29.633,44.997 24.005,42.116 18.38,45 14.947,39.692 8.633,39.376 8.314,33.063 3.003,29.633 5.884,24.005 3,18.38 8.308,14.947 8.624,8.633 14.937,8.314 18.367,3.003 23.995,5.884" />
      <polygon fill="#f7f1ea" points="21.396,31.255 14.899,24.76 17.021,22.639 21.428,27.046 30.996,17.772 33.084,19.926" />
    </svg>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="p-5 rounded-xl mx-3 shadow-sm hover:shadow-md transition-all duration-300 w-80 shrink-0 bg-[#f7f1ea] border border-[#3a0610]/8">
      <div className="flex items-start gap-3">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={review.image}
          alt={review.name}
        />
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-medium text-[#3a0610] truncate">{review.name}</p>
            <VerifyIcon />
          </div>
          <span className="text-[0.65rem] uppercase tracking-[0.15em] text-[#3a0610]/50">{review.date}</span>
        </div>
      </div>
      <div className="mt-3">
        <Stars />
      </div>
      <p className="text-sm pt-3 text-[#3a0610]/80 font-light leading-relaxed">
        „{review.text}"
      </p>
    </div>
  );
}

function MarqueeRow({
  data,
  reverse = false,
  speed = 35,
}: {
  data: Review[];
  reverse?: boolean;
  speed?: number;
}) {
  const doubled = React.useMemo(() => [...data, ...data], [data]);
  return (
    <div className="relative w-full mx-auto max-w-6xl overflow-hidden">
      <div
        className="pointer-events-none absolute left-0 top-0 h-full w-20 md:w-28 z-10"
        style={{ background: "linear-gradient(to right, #f7f1ea, transparent)" }}
      />
      <div
        className={`flex min-w-[200%] ${reverse ? "pt-3 pb-6" : "pt-6 pb-3"}`}
        style={{
          animation: `marqueeScroll ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {doubled.map((r, i) => (
          <ReviewCard key={i} review={r} />
        ))}
      </div>
      <div
        className="pointer-events-none absolute right-0 top-0 h-full w-20 md:w-28 z-10"
        style={{ background: "linear-gradient(to left, #f7f1ea, transparent)" }}
      />
    </div>
  );
}

export default function Reviews({ onBooking }: { onBooking?: () => void }) {
  return (
    <section id="bewertungen" className="relative py-32 md:py-48 px-6 md:px-12">
      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="hairline max-w-6xl mx-auto" />

      <div className="max-w-6xl mx-auto pt-20 md:pt-28">
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.4em] text-[#3a0610]/60">
              Google Bewertungen
            </p>
            <h2 className="mt-6 font-display font-light text-4xl md:text-6xl leading-[1.05] text-[#3a0610]">
              Worte meiner
              <br />
              <em className="italic">Kundinnen.</em>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex gap-0.5 text-[#8b0a1a]">
              {[0, 1, 2, 3, 4].map((i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-light text-[#3a0610]/70">
              5,0 · 124 Rezensionen
            </span>
          </div>
        </div>
      </div>

      <MarqueeRow data={row1} reverse={false} speed={35} />
      <MarqueeRow data={row2} reverse={true} speed={35} />

      {/* CTA after social proof */}
      <div className="mt-16 md:mt-20 flex flex-col items-center gap-4">
        <p className="text-sm md:text-base text-[#3a0610]/65 font-light">
          Überzeugt? Sichern Sie sich Ihren Wunschtermin.
        </p>
        <button
          onClick={onBooking}
          className="group inline-flex items-center gap-4 bg-[#8b0a1a] text-[#f7f1ea] px-10 py-4 text-[0.7rem] uppercase tracking-[0.3em] font-light transition-all duration-500 hover:bg-[#a01025] cursor-pointer"
        >
          Jetzt Termin buchen
          <span className="w-5 h-px bg-[#f7f1ea]/70 transition-all duration-500 group-hover:w-9" />
        </button>
      </div>
    </section>
  );
}
