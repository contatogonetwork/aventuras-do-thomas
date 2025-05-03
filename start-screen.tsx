"use client"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { EnhancedSpaceBackground } from "./enhanced-space-background"
import { AnimatedMonkey } from "./animated-monkey"
import { EnhancedButton } from "./enhanced-button"
import { useOptimizedIcons } from "@/hooks/use-optimized-icons"

interface StartScreenProps {
  onThemeSelect: (theme: string) => void
  onDurationSelect: (duration: string) => void
  onStartAdventure: () => void
  selectedTheme: string | null
  selectedDuration: string | null
}

export function StartScreen({
  onThemeSelect,
  onDurationSelect,
  onStartAdventure,
  selectedTheme,
  selectedDuration,
}: StartScreenProps) {
  // Estado para controlar animações dos ícones
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  const [animatingIcons, setAnimatingIcons] = useState(true)
  const { themes, iconsLoaded } = useOptimizedIcons()

  // Efeito para animar os ícones na entrada
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatingIcons(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center p-4 relative">
      {/* Background espacial melhorado com parallax */}
      <EnhancedSpaceBackground />

      {/* Conteúdo principal (com z-index para ficar acima do background) */}
      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Logo principal */}
        <div className="w-full max-w-md mb-6 mt-4">
          <Image
            src="/icons/top_logo.png"
            alt="Aventuras do Thomás"
            width={400}
            height={150}
            className="w-full h-auto animate-pulse-slow"
            priority
            quality={85}
          />
        </div>

        {/* Grade de ícones de temas melhorada */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-md mb-8">
          {themes.map((theme, index) => (
            <button
              key={theme.id}
              onClick={() => onThemeSelect(theme.id)}
              onMouseEnter={() => setHoveredIcon(theme.id)}
              onMouseLeave={() => setHoveredIcon(null)}
              className={cn(
                "relative rounded-2xl overflow-hidden shadow-lg transition-all duration-300 transform aspect-square",
                "bg-gradient-to-br",
                theme.color,
                selectedTheme === theme.id
                  ? "ring-4 ring-yellow-400 scale-110 z-10"
                  : hoveredIcon === theme.id
                    ? "scale-105 shadow-xl"
                    : "",
                animatingIcons ? `animate-float-in delay-${index * 100}` : "",
                !iconsLoaded ? "bg-gray-200" : "",
              )}
              aria-label={`Tema ${theme.name}`}
              style={{
                animationDelay: animatingIcons ? `${index * 100}ms` : "0ms",
              }}
            >
              {/* Efeito de brilho quando selecionado */}
              {selectedTheme === theme.id && (
                <div className="absolute inset-0 bg-yellow-300 opacity-20 animate-pulse-slow z-0"></div>
              )}

              {/* Efeito de partículas quando hover */}
              {hoveredIcon === theme.id && (
                <div className="absolute inset-0 z-0">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={`sparkle-${i}`}
                      className="absolute w-1.5 h-1.5 bg-white rounded-full animate-sparkle"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        opacity: 0.7,
                        animationDelay: `${Math.random() * 1}s`,
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Conteúdo do ícone */}
              <div className="absolute inset-0 flex items-center justify-center">
                {theme.id === "monkey" ? (
                  <AnimatedMonkey />
                ) : (
                  <div className="relative w-full h-full">
                    {theme.icon && (
                      <Image
                        src={theme.icon || "/placeholder.svg"}
                        alt={theme.name}
                        fill
                        className={cn(
                          "object-cover z-10 transition-transform duration-300",
                          hoveredIcon === theme.id ? "scale-110" : "",
                          selectedTheme === theme.id ? "animate-bounce-gentle" : "",
                        )}
                        sizes="(max-width: 768px) 33vw, 120px"
                        quality={75}
                        loading={index < 6 ? "eager" : "lazy"}
                        placeholder="blur"
                        blurDataURL={
                          theme.blurDataURL ||
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2NjY2NjYyIvPjwvc3ZnPg=="
                        }
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Nome do tema */}
              <div
                className={cn(
                  "absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs font-bold py-1 text-center",
                  "opacity-0 transition-opacity duration-300",
                  hoveredIcon === theme.id || selectedTheme === theme.id ? "opacity-100" : "",
                )}
              >
                {theme.name}
              </div>
            </button>
          ))}
        </div>

        {/* Botão de duração (CURTA/LONGA) melhorado */}
        <div className="w-full max-w-md mb-6">
          <div className="w-full h-14 rounded-full flex overflow-hidden shadow-lg" aria-label="Selecionar duração">
            <EnhancedButton
              onClick={() => onDurationSelect("short")}
              className={cn(
                "w-1/2 h-full flex items-center justify-center text-white font-bold text-xl transition-colors",
                selectedDuration === "short" ? "bg-teal-500" : "bg-teal-400 hover:bg-teal-500",
              )}
              icon="/stickers/foguete.png"
              iconPosition="left"
              glow="teal"
            >
              CURTA
            </EnhancedButton>
            <EnhancedButton
              onClick={() => onDurationSelect("long")}
              className={cn(
                "w-1/2 h-full flex items-center justify-center text-white font-bold text-xl transition-colors",
                selectedDuration === "long" ? "bg-indigo-600" : "bg-indigo-500 hover:bg-indigo-600",
              )}
              icon="/stickers/planeta2.png"
              iconPosition="right"
              glow="indigo"
            >
              LONGA
            </EnhancedButton>
          </div>
        </div>

        {/* Botão de começar aventura melhorado */}
        <EnhancedButton
          onClick={onStartAdventure}
          disabled={!selectedTheme || !selectedDuration}
          className={cn(
            "w-full max-w-md py-4 rounded-full text-xl font-bold text-white shadow-lg transition-all",
            selectedTheme && selectedDuration ? "bg-orange-500 hover:bg-orange-600" : "bg-gray-400 cursor-not-allowed",
          )}
          icon="/stickers/nave.png"
          iconPosition="right"
          glow="orange"
        >
          COMEÇAR AVENTURA
        </EnhancedButton>
      </div>
    </div>
  )
}
