"use client"

export function InfiniteScrollBanner() {
  const text = "NUEVAS EXCURSIONES DISPONIBLES ¡RESERVA AHORA! 🔥 CUPOS LIMITADOS"
  const repeatedText = Array(10).fill(text).join(" • ") // Repeat text for infinite scroll effect

  return (
    <div className="relative w-full overflow-hidden bg-brand-deep-teal py-2 text-brand-light-sand shadow-lg">
      {" "}
      {/* Updated colors */}
      <div className="animate-marquee whitespace-nowrap text-center text-lg font-bold uppercase tracking-wider md:text-xl">
        {repeatedText}
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%); /* Adjust based on content width */
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite; /* Adjust duration for speed */
          display: inline-block;
          padding-right: 100%; /* Ensures seamless loop */
        }
      `}</style>
    </div>
  )
}
