"use client";

import { useEffect, useRef, useState } from "react";

export default function BrushDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative w-full overflow-hidden"
      style={{ height: "80px", backgroundColor: "#f7f1ea" }}
    >
      {/* Stripe */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2"
        style={{
          height: "3px",
          backgroundColor: "#8b0a1a",
          width: active ? "100%" : "0%",
          transition: "width 2s ease-in-out",
        }}
      />

      {/* Brush at leading edge */}
      <div
        className="absolute top-1/2 -translate-y-1/2"
        style={{
          left: active ? "100%" : "0%",
          transition: "left 2s ease-in-out",
          transform: "translate(-100%, -50%)",
        }}
      >
        <svg
          width="38"
          height="18"
          viewBox="0 0 38 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Handle */}
          <rect x="0" y="5" width="22" height="8" rx="2" fill="#3a0610" />
          {/* Ferrule */}
          <rect x="22" y="4" width="4" height="10" rx="1" fill="#3a0610" />
          {/* Bristle tip */}
          <path
            d="M26 6 L38 8 L38 10 L26 12 Z"
            fill="#3a0610"
            opacity="0.85"
          />
        </svg>
      </div>
    </div>
  );
}
