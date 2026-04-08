"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

type Position = { left: number; width: number; opacity: number };

const items: { label: string; mobileLabel?: string; href?: string; action?: boolean; highlight?: boolean }[] = [
  { label: "Über uns", mobileLabel: "Über uns", href: "#ueber-uns" },
  { label: "Leistungen", mobileLabel: "Services", href: "#leistungen" },
  { label: "Termin buchen", mobileLabel: "Termin", action: true, highlight: true },
  { label: "Arbeiten", mobileLabel: "Arbeiten", href: "#arbeiten" },
  { label: "Kontakt", mobileLabel: "Kontakt", href: "#kontakt" },
];

export default function NavHeader({ onBooking }: { onBooking?: () => void }) {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className="relative mx-auto flex w-fit rounded-full border-2 border-[#3a0610] bg-[#f7f1ea] p-0.5 md:p-1"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      {items.map((item) => (
        <Tab
          key={item.label}
          label={item.label}
          mobileLabel={item.mobileLabel}
          href={item.href}
          highlight={item.highlight}
          onClick={item.action ? onBooking : undefined}
          setPosition={setPosition}
        />
      ))}
      <Cursor position={position} />
    </ul>
  );
}

function Tab({
  label,
  mobileLabel,
  href,
  highlight,
  onClick,
  setPosition,
}: {
  label: string;
  mobileLabel?: string;
  href?: string;
  highlight?: boolean;
  onClick?: () => void;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
}) {
  const ref = useRef<HTMLLIElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block text-[#3a0610]"
    >
      <a
        href={href || "#"}
        onClick={handleClick}
        className={
          "block cursor-pointer uppercase " +
          (highlight
            ? "px-2.5 py-1.5 text-[0.55rem] tracking-[0.12em] font-medium md:px-9 md:py-3.5 md:text-[0.85rem] md:tracking-[0.28em]"
            : "px-2.5 py-1.5 text-[0.5rem] tracking-[0.1em] md:px-9 md:py-3.5 md:text-[0.75rem] md:tracking-[0.32em]")
        }
      >
        <span className="md:hidden">{mobileLabel || label}</span>
        <span className="hidden md:inline">{label}</span>
      </a>
    </li>
  );
}

function Cursor({ position }: { position: Position }) {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-7 rounded-full bg-[#8b0a1a]/15 border border-[#8b0a1a]/40 md:h-12"
    />
  );
}
