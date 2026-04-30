import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'

interface StatsCounterProps {
  value: string
  className?: string
}

function parseNumericValue(value: string): { number: number; prefix: string; suffix: string; decimals: number } {
  let prefix = ''
  let suffix = ''
  let numStr = value

  const prefixMatch = numStr.match(/^([^0-9]+)/)
  if (prefixMatch) {
    prefix = prefixMatch[1]
    numStr = numStr.slice(prefix.length)
  }

  const suffixMatch = numStr.match(/([^0-9.]+)$/)
  if (suffixMatch) {
    suffix = suffixMatch[1]
    numStr = numStr.slice(0, -suffixMatch[1].length)
  }

  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0
  const number = parseFloat(numStr) || 0

  return { number, prefix, suffix, decimals }
}

function formatNumber(num: number, decimals: number): string {
  if (decimals > 0) {
    return num.toFixed(decimals)
  }
  return Math.round(num).toLocaleString('en-US')
}

export default function StatsCounter({ value, className }: StatsCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const prefersReducedMotion = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? value : '0')

  const { number, prefix, suffix, decimals } = parseNumericValue(value)

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      setDisplayValue(value)
      return
    }

    const duration = 2000
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      const currentNum = number * eased
      setDisplayValue(`${prefix}${formatNumber(currentNum, decimals)}${suffix}`)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayValue(value)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, value, number, prefix, suffix, decimals, prefersReducedMotion])

  return (
    <motion.span
      ref={ref}
      className={className || 'stat-value'}
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {displayValue}
    </motion.span>
  )
}
