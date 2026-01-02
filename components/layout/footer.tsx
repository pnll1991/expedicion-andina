"use client"

import { ImageWithLoader } from "@/components/ui/image-with-loader"
import { MessageCircle, Instagram, Youtube } from "lucide-react"

export function Footer() {
  return (
    <>
      {/* Botón flotante de WhatsApp */}
      <div id="whatsapp-contact" className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/5492625642793"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-110 flex items-center justify-center w-16 h-16"
        >
          <MessageCircle className="w-8 h-8" />
        </a>
      </div>

      <footer className="mt-16 bg-footer-dark text-brand-light-sand">
        <div className="container mx-auto px-4 md:px-6 py-12 flex flex-col md:flex-row items-start justify-between gap-8">
          {/* Sección izquierda: Logo y descripción Expedición Andina */}
          <div className="flex flex-col items-start gap-4 max-w-lg">
            <ImageWithLoader
              src="/expedicion-andina-logo-white-footer.png"
              alt="Expedición Andina Logo"
              width={48} // Tamaño más pequeño
              height={48} // Tamaño más pequeño
              className="h-12 w-12 object-contain filter invert" // `filter invert` para asegurar que sea blanco
            />
            <p className="text-gray-300 text-base leading-relaxed">
              En Expedición Andina, te invitamos a vivir la aventura en su máxima expresión. Somos tu puerta de entrada
              a experiencias inolvidables en la majestuosa naturaleza, donde cada paso es una conexión con el entorno y
              una historia por contar.
            </p>
          </div>

          {/* Sección derecha: Redes sociales */}
          <div className="flex flex-col items-start gap-4">
            {" "}
            {/* Cambiado de items-end a items-start */}
            <h3 className="font-heading text-xl font-bold text-white mb-2">Seguinos en redes sociales</h3>
            <div className="flex gap-4">
              <a
                href="https://youtube.com/@expedicionandina7618"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-white transition-colors hover:bg-gray-600"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/expedicion.andina"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-white transition-colors hover:bg-gray-600"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Sección inferior: Copyright y KuatroMetric */}
        <div className="bg-footer-darker py-4">
          <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} Expedición Andina. Todos los derechos reservados.</p>
            <div className="flex items-center gap-2">
              <span>Diseñado por KuatroMetric</span>
              <ImageWithLoader
                src="/kuatro-metric-logo.avif"
                alt="KuatroMetric Logo"
                width={20}
                height={20}
                className="h-5 w-5"
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
