"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

const slides = [
  { src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=750&fit=crop&auto=format&q=80", label: "Almond · Nude" },
  { src: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=500&h=750&fit=crop&auto=format&q=80", label: "Stiletto · Rouge" },
  { src: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=500&h=750&fit=crop&auto=format&q=80", label: "Square · Rosé" },
  { src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=500&h=750&fit=crop&auto=format&q=80", label: "Coffin · Chrome" },
  { src: "https://images.unsplash.com/photo-1571290274554-6a2eaa74d75b?w=500&h=750&fit=crop&auto=format&q=80", label: "Oval · French" },
  { src: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=500&h=750&fit=crop&auto=format&q=80", label: "Round · Noir" },
];

const swiperCSS = `
  .swiper { width: 100%; padding-bottom: 50px; }
  .swiper-slide { background-position: center; background-size: cover; width: 300px; }
  .swiper-slide img { display: block; width: 100%; }
  .swiper-3d .swiper-slide-shadow-left { background-image: none; }
  .swiper-3d .swiper-slide-shadow-right { background: none; }
  .swiper-pagination-bullet { background: #3a0610; opacity: 0.3; }
  .swiper-pagination-bullet-active { opacity: 1; background: #8b0a1a; }
  .swiper-button-next, .swiper-button-prev { color: #3a0610; }
  .swiper-button-next::after, .swiper-button-prev::after { font-size: 18px; }
`;

export default function Gallery() {
  return (
    <section id="arbeiten" className="relative py-32 md:py-48">
      <style>{swiperCSS}</style>

      <div className="hairline max-w-6xl mx-auto" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-20 md:pt-28">
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.4em] text-[#3a0610]/60">
              Portfolio
            </p>
            <h2 className="mt-6 font-display font-light text-4xl md:text-6xl leading-[1.05] text-[#3a0610]">
              Meine <em className="italic">Arbeiten.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm md:text-base text-[#3a0610]/70 font-light">
            Eine Auswahl aktueller Kreationen — jedes Set erzählt eine eigene,
            stille Geschichte.
          </p>
        </div>
      </div>

      {/* Coverflow carousel */}
      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="rounded-[24px] border border-[#3a0610]/10 p-2 shadow-sm md:rounded-t-[44px]">
          <div className="relative flex w-full flex-col rounded-[24px] border border-[#3a0610]/10 bg-[#3a0610]/[0.04] p-2 md:rounded-b-[20px] md:rounded-t-[40px] md:p-4">
            <Swiper
              spaceBetween={50}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              effect="coverflow"
              grabCursor
              centeredSlides
              loop
              slidesPerView="auto"
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
              }}
              pagination={{ clickable: true }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
              className="w-full"
            >
              {slides.map((s, i) => (
                <SwiperSlide key={`a-${i}`}>
                  <div className="relative overflow-hidden rounded-xl">
                    <Image
                      src={s.src}
                      width={500}
                      height={750}
                      className="w-full rounded-xl object-cover"
                      alt={s.label}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3a0610]/70 to-transparent p-4">
                      <span className="font-display italic text-[#f7f1ea] text-sm">
                        {s.label}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              {/* Duplicate set for seamless looping */}
              {slides.map((s, i) => (
                <SwiperSlide key={`b-${i}`}>
                  <div className="relative overflow-hidden rounded-xl">
                    <Image
                      src={s.src}
                      width={500}
                      height={750}
                      className="w-full rounded-xl object-cover"
                      alt={s.label}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#3a0610]/70 to-transparent p-4">
                      <span className="font-display italic text-[#f7f1ea] text-sm">
                        {s.label}
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 mt-14 flex justify-center">
        <a
          href="#"
          className="group inline-flex items-center gap-4 text-[0.7rem] uppercase tracking-[0.3em] text-[#3a0610] border-b border-[#8b0a1a]/60 pb-2 hover:border-[#8b0a1a] transition-colors"
        >
          Mehr auf Instagram
          <span className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
