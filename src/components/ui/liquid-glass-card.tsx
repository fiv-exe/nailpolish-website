import * as React from "react";

export function LiquidCard({
  className = "",
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      style={{ backdropFilter: 'url("#container-glass")' }}
      className={
        "text-[#3a0610] bg-transparent flex flex-col rounded-xl border border-[#3a0610]/10 transition-all " +
        "shadow-[0_0_6px_rgba(58,6,16,0.04),0_2px_6px_rgba(58,6,16,0.1),inset_3px_3px_0.5px_-3px_rgba(58,6,16,0.9),inset_-3px_-3px_0.5px_-3px_rgba(58,6,16,0.85),inset_1px_1px_1px_-0.5px_rgba(58,6,16,0.6),inset_-1px_-1px_1px_-0.5px_rgba(58,6,16,0.6),inset_0_0_6px_6px_rgba(58,6,16,0.12),inset_0_0_2px_2px_rgba(58,6,16,0.06),0_0_12px_rgba(247,241,234,0.2)] " +
        className
      }
      {...props}
    />
  );
}

export function GlassFilter() {
  return (
    <svg className="hidden" aria-hidden>
      <defs>
        <filter
          id="container-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.02 0.02"
            numOctaves="1"
            seed="1"
            result="turbulence"
          />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="120"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}
