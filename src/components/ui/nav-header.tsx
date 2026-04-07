"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

type Position = { left: number; width: number; opacity: number };

const items: { label: string; href?: string; action?: boolean; highlight?: boolean }[] = [
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Leistungen", href: "#leistungen" },
  { label: "Termin buchen", action: true, highlight: true },
  { label: "Arbeiten", href: "#arbeiten" },
  { label: "Kontakt", href: "#kontakt" },
];

export default function NavHeader({ onBooking }: { onBooking?: () => void }) {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className="relative mx-auto flex w-fit rounded-full border-2 border-[#3a0610] bg-[#f7f1ea] p-1"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      {items.map((item) => (
        <Tab
          key={item.label}
          href={item.href}
          highlight={item.highlight}
          onClick={item.action ? onBooking : undefined}
          setPosition={setPosition}
        >
          {item.label}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
}

function Tab({
  children,
  href,
  highlight,
  onClick,
  setPosition,
}: {
  children: React.ReactNode;
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
          "block cursor-pointer px-4 py-2 uppercase " +
          (highlight
            ? "text-[0.7rem] tracking-[0.18em] font-medium md:px-9 md:py-3.5 md:text-[0.85rem] md:tracking-[0.28em]"
            : "text-[0.65rem] tracking-[0.2em] md:px-9 md:py-3.5 md:text-[0.75rem] md:tracking-[0.32em]")
        }
      >
        {children}
      </a>
    </li>
  );
}

function Cursor({ position }: { position: Position }) {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-8 rounded-full bg-[#8b0a1a]/15 border border-[#8b0a1a]/40 md:h-12"
    />
  );
}
