"use client"

import { useState } from "react"
import Image, { ImageProps } from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Skeleton } from "./skeleton"
import { cn } from "@/lib/utils"

interface ImageWithLoaderProps extends Omit<ImageProps, 'onLoad'> {
  skeletonClassName?: string
  showBlurEffect?: boolean
}

export function ImageWithLoader({ 
  className, 
  skeletonClassName,
  showBlurEffect = true,
  alt,
  ...props 
}: ImageWithLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="skeleton"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-10"
          >
            <Skeleton 
              className={cn(
                "w-full h-full",
                skeletonClassName
              )} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ 
          opacity: isLoading ? 0 : 1,
          scale: isLoading ? 1.05 : 1,
        }}
        transition={{ 
          duration: 0.6, 
          ease: [0.25, 0.1, 0.25, 1] // Easing personalizado para suavidad
        }}
        className="w-full h-full"
      >
        <Image
          {...props}
          alt={alt}
          className={cn(
            showBlurEffect && isLoading && "blur-sm scale-105",
            "transition-all duration-300",
            className
          )}
          onLoad={() => {
            setIsLoading(false)
            setHasError(false)
          }}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        />
      </motion.div>

      <AnimatePresence>
        {hasError && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-100"
          >
            <p className="text-sm text-gray-400">Error al cargar imagen</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
