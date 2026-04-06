import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Services from "@/components/sections/services";
import Gallery from "@/components/sections/gallery";
import Reviews from "@/components/sections/reviews";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Gallery />
      <Reviews />
      <Footer />
    </>
  );
}
