"use client";

import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import MarqueeStrip from "@/components/ui/marquee-strip";
import Services from "@/components/sections/services";
import BrushDivider from "@/components/ui/brush-divider";
import Gallery from "@/components/sections/gallery";
import Reviews from "@/components/sections/reviews";
import Footer from "@/components/sections/footer";
import ChatWidget, { useChatWidget } from "@/components/ui/chat-widget";

export default function Home() {
  const chat = useChatWidget();

  return (
    <>
      <Hero onBooking={chat.openChat} />
      <About onBooking={chat.openChat} />
      <MarqueeStrip />
      <Services />
      <BrushDivider />
      <Gallery />
      <Reviews onBooking={chat.openChat} />
      <Footer />
      <ChatWidget open={chat.open} onClose={() => chat.setOpen(false)} />
    </>
  );
}
