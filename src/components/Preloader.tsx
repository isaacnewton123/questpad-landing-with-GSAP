import { useEffect, useState, useRef } from 'react'
import questpadLogo from '../assets/brand/questpad.webp'

interface PreloaderProps {
  onComplete: () => void
  onExitStart?: () => void
  assets: string[]
}

export default function Preloader({ onComplete, onExitStart, assets }: PreloaderProps) {
  const [displayProgress, setDisplayProgress] = useState(0)
  const [isExiting, setIsExiting] = useState(false)
  const targetProgressRef = useRef(0)
  const animFrameRef = useRef<number | null>(null)
  const hasFinishedRef = useRef(false)

  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    let loadedCount = 0
    const totalItems = assets.length + 1 // assets + fonts

    const updateTarget = (count: number) => {
      const calculated = Math.min(Math.round((count / totalItems) * 100), 100)
      targetProgressRef.current = Math.max(targetProgressRef.current, calculated)
    }

    // Preload Fonts
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready
        .then(() => {
          loadedCount++
          updateTarget(loadedCount)
        })
        .catch(() => {
          loadedCount++
          updateTarget(loadedCount)
        })
    } else {
      loadedCount++
      updateTarget(loadedCount)
    }

    // Preload Critical Images
    assets.forEach((src) => {
      const img = new Image()
      img.onload = () => {
        loadedCount++
        updateTarget(loadedCount)
      }
      img.onerror = () => {
        loadedCount++
        updateTarget(loadedCount)
      }
      img.src = src
    })

    // Safety timeout in case network stalls
    const safetyTimeout = setTimeout(() => {
      targetProgressRef.current = 100
    }, 2500)

    const startTime = Date.now()
    const MIN_DURATION = 800 // Ringan & cepat, tidak menahan user lama

    const tick = () => {
      const elapsed = Date.now() - startTime
      const timeRatio = Math.min(elapsed / MIN_DURATION, 1)
      const effectiveTarget = Math.min(
        100,
        Math.max(Math.round(timeRatio * 100), targetProgressRef.current)
      )

      setDisplayProgress((prev) => {
        if (prev < effectiveTarget) {
          const step = Math.max(1, Math.ceil((effectiveTarget - prev) * 0.15))
          return Math.min(prev + step, effectiveTarget)
        }

        if (prev >= 100 && !hasFinishedRef.current && elapsed >= MIN_DURATION) {
          hasFinishedRef.current = true

          setTimeout(() => {
            setIsExiting(true)
            onExitStart?.()

            setTimeout(() => {
              document.body.style.overflow = originalOverflow
              onComplete()
            }, 400)
          }, 150)
        }

        return prev
      })

      if (!hasFinishedRef.current || !isExiting) {
        animFrameRef.current = requestAnimationFrame(tick)
      }
    }

    animFrameRef.current = requestAnimationFrame(tick)

    return () => {
      clearTimeout(safetyTimeout)
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
      }
      document.body.style.overflow = originalOverflow
    }
  }, [assets, onComplete, onExitStart])

  return (
    <div
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#0047AB] select-none transition-opacity duration-400 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center">
        {/* Simple Clean Logo */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 mb-5">
          <img
            src={questpadLogo}
            alt="QuestPad"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Minimalist Progress Line */}
        <div className="w-32 sm:w-40 h-[2px] bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-100 ease-out"
            style={{ width: `${displayProgress}%` }}
          />
        </div>

        {/* Simple Percentage Text */}
        <span className="mt-3 text-[11px] font-mono tracking-widest text-white/60">
          {displayProgress}%
        </span>
      </div>
    </div>
  )
}
