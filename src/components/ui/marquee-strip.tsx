const TEXT = "GELNÄGEL · SHELLAC · NAGELDESIGN · MANIKÜRE · PEDIKÜRE · ROUGE NAILS · ";
const REPEATS = 12;

export default function MarqueeStrip() {
  const repeated = Array(REPEATS).fill(TEXT).join("");

  return (
    <div
      className="relative w-full overflow-hidden select-none"
      style={{ backgroundColor: "#3a0610", height: "44px" }}
    >
      <style>{`
        @keyframes marqueeStrip {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
      <div
        className="flex items-center h-full whitespace-nowrap"
        style={{
          animation: "marqueeStrip 30s linear infinite",
        }}
      >
        <span
          className="uppercase"
          style={{
            color: "#f7f1ea",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
          }}
        >
          {repeated}
        </span>
        <span
          className="uppercase"
          style={{
            color: "#f7f1ea",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
          }}
        >
          {repeated}
        </span>
      </div>
    </div>
  );
}
