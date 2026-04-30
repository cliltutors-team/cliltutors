import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

interface MotionCardProps {
  children: ReactNode
  className?: string
  hoverScale?: number
  hoverY?: number
  glowColor?: string
}

export default function MotionCard({
  children,
  className = '',
  hoverScale = 1.02,
  hoverY = -4,
  glowColor,
}: MotionCardProps) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      whileHover={{
        scale: hoverScale,
        y: hoverY,
        ...(glowColor ? { boxShadow: `0 20px 40px ${glowColor}` } : {}),
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  )
}
