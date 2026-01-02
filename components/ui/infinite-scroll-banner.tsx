"use client"

export function InfiniteScrollBanner() {
  const text = "NUEVAS EXCURSIONES DISPONIBLES ¡RESERVA AHORA! 🔥 CUPOS LIMITADOS"
  const repeatedText = Array(10).fill(text).join(" • ") // Repeat text for infinite scroll effect

  return (
      <div className="relative w-full overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 py-3 shadow-xl border-b-2 border-orange-300">
      {/* Shine overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine pointer-events-none z-10" />
      
      {/* Content with glow effect */}
      <div className="relative z-0">
        <div className="animate-marquee whitespace-nowrap text-center text-base font-extrabold uppercase tracking-wider md:text-lg lg:text-xl">
          <span className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] text-white filter drop-shadow-lg">
            {repeatedText}
          </span>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
          display: inline-block;
          padding-right: 100%;
        }
      `}</style>
    </div>
  )
}
