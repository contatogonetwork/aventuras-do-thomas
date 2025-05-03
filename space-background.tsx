"use client"

import { useEffect, useState, useRef } from "react"

export function SpaceBackground() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    const container = containerRef.current
    if (!container) return

    // Função para aplicar o efeito parallax
    const handleMovement = (e: MouseEvent | TouchEvent) => {
      const elements = container.querySelectorAll(".parallax-element")

      // Obter coordenadas do movimento
      let clientX, clientY

      if ("touches" in e) {
        // Evento de toque
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else {
        // Evento de mouse
        clientX = e.clientX
        clientY = e.clientY
      }

      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2

      // Calcular deslocamento do centro
      const offsetX = (clientX - centerX) / centerX
      const offsetY = (clientY - centerY) / centerY

      // Aplicar transformação a cada elemento
      elements.forEach((element) => {
        const depth = Number.parseFloat(element.getAttribute("data-depth") || "0.1")
        const moveX = offsetX * depth * 50
        const moveY = offsetY * depth * 50

        // Aplicar transformação
        ;(element as HTMLElement).style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`
      })
    }

    // Adicionar event listeners
    container.addEventListener("mousemove", handleMovement)
    container.addEventListener("touchmove", handleMovement)

    // Cleanup
    return () => {
      container.removeEventListener("mousemove", handleMovement)
      container.removeEventListener("touchmove", handleMovement)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden z-0 bg-gradient-to-b from-indigo-900 via-purple-900 to-blue-800"
      style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}
    >
      {/* Estrelas (pequenas) */}
      {[...Array(30)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="parallax-element absolute rounded-full bg-white"
          data-depth={Math.random() * 0.2 + 0.05}
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: "0 0 4px 1px rgba(255, 255, 255, 0.6)",
          }}
        />
      ))}

      {/* Estrelas (médias) */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`star-med-${i}`}
          className="parallax-element absolute rounded-full bg-yellow-100"
          data-depth={Math.random() * 0.3 + 0.1}
          style={{
            width: `${Math.random() * 4 + 3}px`,
            height: `${Math.random() * 4 + 3}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: "0 0 6px 2px rgba(255, 255, 200, 0.8)",
          }}
        />
      ))}

      {/* Planetas */}
      <div
        className="parallax-element absolute rounded-full"
        data-depth="0.2"
        style={{
          width: "80px",
          height: "80px",
          left: "15%",
          top: "20%",
          background: "linear-gradient(45deg, #FF6B6B, #FF8E53)",
          boxShadow: "0 0 20px 5px rgba(255, 107, 107, 0.4)",
        }}
      />

      <div
        className="parallax-element absolute rounded-full"
        data-depth="0.15"
        style={{
          width: "60px",
          height: "60px",
          right: "20%",
          top: "60%",
          background: "linear-gradient(45deg, #4facfe, #00f2fe)",
          boxShadow: "0 0 20px 5px rgba(79, 172, 254, 0.4)",
        }}
      />

      <div
        className="parallax-element absolute"
        data-depth="0.25"
        style={{
          width: "100px",
          height: "50px",
          left: "70%",
          top: "30%",
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 rounded-full bg-yellow-300 opacity-80"></div>
          <div className="absolute inset-0 rounded-full bg-yellow-500 opacity-60 transform translate-x-1/4"></div>
        </div>
      </div>

      {/* Disco voador */}
      <div
        className="parallax-element absolute"
        data-depth="0.3"
        style={{
          width: "80px",
          height: "40px",
          left: "30%",
          bottom: "25%",
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/5 h-1/5 rounded-full bg-gray-400"></div>
          <div className="absolute bottom-1/5 left-1/2 transform -translate-x-1/2 w-full h-2/5 rounded-full bg-blue-400"></div>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-2/5 h-2/5 rounded-full bg-gray-300"></div>
        </div>
      </div>

      {/* Cometa */}
      <div
        className="parallax-element absolute"
        data-depth="0.35"
        style={{
          width: "120px",
          height: "4px",
          left: "10%",
          top: "70%",
          background: "linear-gradient(to right, transparent, white)",
          transform: "rotate(-30deg)",
        }}
      />
    </div>
  )
}
