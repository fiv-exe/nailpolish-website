const services = [
  {
    title: "Gelnägel",
    description: "Langanhaltende Modellage mit makellosem Finish.",
    photo: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=500&auto=format&fit=crop&q=60",
    bgColor: "#8b0a1a",
  },
  {
    title: "Shellac",
    description: "Brillante Farbe, wochenlang perfekt.",
    photo: "https://images.unsplash.com/photo-1607779097040-26e80aa78e66?w=400&h=500&auto=format&fit=crop&q=60",
    bgColor: "#c4967a",
  },
  {
    title: "Nageldesign",
    description: "Individuelle Ornamente und skulpturale Akzente.",
    photo: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?w=400&h=500&auto=format&fit=crop&q=60",
    bgColor: "#5c0a14",
  },
  {
    title: "Maniküre",
    description: "Gepflegte Nagelhaut, geformte Kanten, seidig weiche Haut.",
    photo: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=500&auto=format&fit=crop&q=60",
    bgColor: "#d4a490",
  },
];

export default function Services() {
  return (
    <section
      id="leistungen"
      className="relative py-32 md:py-48 px-6 md:px-12"
    >
      <div className="hairline max-w-6xl mx-auto" />

      <div className="max-w-5xl mx-auto pt-20 md:pt-28">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-20 md:mb-28">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.4em] text-[#3a0610]/60">
              Leistungen
            </p>
            <h2 className="mt-6 font-display font-light text-4xl md:text-6xl leading-[1.05] text-[#3a0610]">
              Die Kunst
              <br />
              <em className="italic">der Pflege.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm md:text-base text-[#3a0610]/70 font-light">
            Vier Disziplinen. Ein Anspruch: kompromisslose Qualität in jedem
            Detail.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
          {services.map((s, i) => (
            <div
              key={i}
              className="group bg-[#3a0610]/[0.04] rounded-3xl p-6 flex flex-col h-[320px] transition-all duration-300 hover:bg-[#3a0610]/[0.08]"
            >
              {/* Overlapping images */}
              <div className="relative flex-grow flex items-center justify-center mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {/* Color card behind */}
                <div
                  className="absolute w-36 h-44 rounded-lg shadow-md transform -rotate-6 transition-all duration-400 ease-in-out group-hover:rotate-[-10deg] group-hover:scale-105"
                  style={{ backgroundColor: s.bgColor }}
                />
                {/* Photo in front */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.photo}
                  alt={s.title}
                  className="absolute w-36 h-44 rounded-lg shadow-lg transform rotate-3 transition-all duration-400 ease-in-out group-hover:rotate-[5deg] group-hover:scale-105 object-cover"
                />
              </div>

              {/* Title + description */}
              <div className="mt-auto">
                <h3 className="font-display font-light text-2xl md:text-3xl text-[#3a0610]">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm font-light text-[#3a0610]/65">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
