import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useReducedMotion, AnimatePresence } from 'motion/react'

interface HeroVisualProps {
  variant?: 'dashboard' | 'growth' | 'network'
  className?: string
  stats?: Array<{ value: string; label: string }>
}

const brandColors = {
  blue: '#528aed',
  indigo: '#4c6ce1',
  purple: '#a67bf4',
  gold: '#febb37',
  orange: '#fb7a4b',
  coral: '#f96c54',
  navy: '#34354f',
}

const defaultStats = [
  { value: '94%', label: 'Success' },
  { value: '3x', label: 'Faster' },
  { value: '50K+', label: 'Learners' },
]

function parseNumericValue(val: string): number {
  const match = val.match(/[\d.]+/)
  return match ? parseFloat(match[0]) : 0
}

function AnimatedBar({ value, maxValue, color, delay, label }: {
  value: number
  maxValue: number
  color: string
  delay: number
  label: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-30px' })
  const prefersReducedMotion = useReducedMotion()
  const height = Math.max((value / maxValue) * 100, 8)

  return (
    <motion.div
      ref={ref}
      className="hero-visual-bar-col"
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="hero-visual-bar-track">
        <motion.div
          className="hero-visual-bar-fill"
          style={{ background: `linear-gradient(180deg, ${color}, ${color}88)` }}
          initial={prefersReducedMotion ? { height: `${height}%` } : { height: '0%' }}
          animate={isInView ? { height: `${height}%` } : {}}
          transition={{ duration: 1.2, delay: delay + 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <span className="hero-visual-bar-label">{label}</span>
    </motion.div>
  )
}

function OrbitBadge({ angle, radius, delay, color, icon, size = 44 }: {
  angle: number
  radius: number
  delay: number
  color: string
  icon: string
  size?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const prefersReducedMotion = useReducedMotion()

  const rad = (angle * Math.PI) / 180
  const x = Math.cos(rad) * radius
  const y = Math.sin(rad) * radius

  return (
    <motion.div
      ref={ref}
      className="hero-visual-orbit-badge"
      style={{
        width: size,
        height: size,
        background: `linear-gradient(135deg, ${color}22, ${color}11)`,
        borderColor: `${color}44`,
        boxShadow: `0 4px 20px ${color}20`,
        '--orbit-color': color,
      } as React.CSSProperties}
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0, x: 0, y: 0 }}
      animate={isInView ? {
        opacity: 1,
        scale: 1,
        x,
        y,
      } : {}}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
        x: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] },
      }}
    >
      <span className="hero-visual-orbit-icon">{icon}</span>
    </motion.div>
  )
}

function FloatingMetric({ x, y, delay, value, label, color }: {
  x: string
  y: string
  delay: number
  value: string
  label: string
  color: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const prefersReducedMotion = useReducedMotion()
  const numericValue = parseNumericValue(value)

  const [displayVal, setDisplayVal] = useState(prefersReducedMotion ? value : '0')

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      setDisplayVal(value)
      return
    }
    const duration = 2000
    const startTime = performance.now()
    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = numericValue * eased
      const prefix = value.match(/^([^0-9]*)/)?.[1] || ''
      const suffix = value.match(/([^0-9.]*)$/)?.[1] || ''
      const decimals = value.includes('.') ? (value.split('.')[1]?.match(/\d/)?.length || 0) : 0
      setDisplayVal(`${prefix}${decimals > 0 ? current.toFixed(decimals) : Math.round(current).toLocaleString('en-US')}${suffix}`)
      if (progress < 1) requestAnimationFrame(animate)
      else setDisplayVal(value)
    }
    requestAnimationFrame(animate)
  }, [isInView, value, numericValue, prefersReducedMotion])

  return (
    <motion.div
      ref={ref}
      className="hero-visual-floating-metric"
      style={{
        left: x,
        top: y,
        background: `linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))`,
        borderColor: `${color}55`,
        boxShadow: `0 8px 32px ${color}15`,
      }}
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="hero-visual-metric-value"
        style={{ color }}
        animate={prefersReducedMotion ? {} : {
          y: [0, -4, 0],
        }}
        transition={{
          duration: 3 + delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {displayVal}
      </motion.div>
      <div className="hero-visual-metric-label">{label}</div>
    </motion.div>
  )
}

function ConnectionLine({ from, to, delay, color }: {
  from: { x: number; y: number }
  to: { x: number; y: number }
  delay: number
  color: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const prefersReducedMotion = useReducedMotion()

  const dx = to.x - from.x
  const dy = to.y - from.y
  const length = Math.sqrt(dx * dx + dy * dy)
  const angle = Math.atan2(dy, dx) * (180 / Math.PI)

  return (
    <motion.div
      ref={ref}
      className="hero-visual-connection"
      style={{
        left: from.x,
        top: from.y,
        width: length,
        height: 2,
        background: `linear-gradient(90deg, ${color}66, ${color}22)`,
        transformOrigin: '0 50%',
        rotate: angle,
      }}
      initial={prefersReducedMotion ? { scaleX: 1 } : { scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}

function PulseRing({ delay, size, color }: { delay: number; size: number; color: string }) {
  const prefersReducedMotion = useReducedMotion()
  if (prefersReducedMotion) return null

  return (
    <motion.div
      className="hero-visual-pulse-ring"
      style={{
        width: size,
        height: size,
        borderColor: `${color}40`,
      }}
      animate={{
        scale: [1, 1.8],
        opacity: [0.5, 0],
      }}
      transition={{
        duration: 3,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  )
}

function DashboardVariant({ stats }: { stats: Array<{ value: string; label: string }> }) {
  const barData = [
    { value: 94, label: 'Q1', color: brandColors.blue },
    { value: 87, label: 'Q2', color: brandColors.indigo },
    { value: 96, label: 'Q3', color: brandColors.purple },
    { value: 92, label: 'Q4', color: brandColors.gold },
    { value: 98, label: 'Q5', color: brandColors.coral },
  ]

  return (
    <div className="hero-visual-dashboard">
      <div className="hero-visual-chart-area">
        <div className="hero-visual-chart-bars">
          {barData.map((bar, i) => (
            <AnimatedBar
              key={i}
              value={bar.value}
              maxValue={100}
              color={bar.color}
              delay={i * 0.1}
              label={bar.label}
            />
          ))}
        </div>
        <div className="hero-visual-chart-line">
          <svg viewBox="0 0 200 60" className="hero-visual-line-svg" preserveAspectRatio="none">
            <motion.path
              d="M0,50 Q40,45 60,35 T120,20 T180,10 L200,8"
              fill="none"
              stroke={brandColors.gold}
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.path
              d="M0,50 Q40,45 60,35 T120,20 T180,10 L200,8"
              fill="none"
              stroke={`${brandColors.gold}33`}
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>
        </div>
      </div>
      <div className="hero-visual-metrics-row">
        {stats.slice(0, 3).map((stat, i) => (
          <FloatingMetric
            key={i}
            x={`${10 + i * 32}%`}
            y={`${10 + (i % 2) * 30}%`}
            delay={0.8 + i * 0.15}
            value={stat.value}
            label={stat.label}
            color={[brandColors.blue, brandColors.purple, brandColors.gold][i]}
          />
        ))}
      </div>
    </div>
  )
}

function GrowthVariant({ stats }: { stats: Array<{ value: string; label: string }> }) {
  return (
    <div className="hero-visual-growth">
      <div className="hero-visual-orbit-center">
        <PulseRing delay={0} size={80} color={brandColors.blue} />
        <PulseRing delay={1} size={80} color={brandColors.purple} />
        <motion.div
          className="hero-visual-center-hub"
          style={{
            background: `linear-gradient(135deg, ${brandColors.blue}, ${brandColors.purple})`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </motion.div>
        <OrbitBadge angle={30} radius={85} delay={0.4} color={brandColors.blue} icon="✓" size={42} />
        <OrbitBadge angle={120} radius={95} delay={0.6} color={brandColors.purple} icon="★" size={38} />
        <OrbitBadge angle={210} radius={80} delay={0.8} color={brandColors.gold} icon="↑" size={40} />
        <OrbitBadge angle={300} radius={90} delay={1.0} color={brandColors.coral} icon="◆" size={36} />
        <ConnectionLine from={{ x: 120, y: 120 }} to={{ x: 200, y: 75 }} delay={0.7} color={brandColors.blue} />
        <ConnectionLine from={{ x: 120, y: 120 }} to={{ x: 70, y: 45 }} delay={0.9} color={brandColors.purple} />
        <ConnectionLine from={{ x: 120, y: 120 }} to={{ x: 40, y: 185 }} delay={1.1} color={brandColors.gold} />
        <ConnectionLine from={{ x: 120, y: 120 }} to={{ x: 200, y: 185 }} delay={1.3} color={brandColors.coral} />
      </div>
      <div className="hero-visual-growth-metrics">
        {stats.slice(0, 3).map((stat, i) => (
          <FloatingMetric
            key={i}
            x={`${5 + i * 34}%`}
            y={`${15 + (i % 2) * 25}%`}
            delay={1.0 + i * 0.2}
            value={stat.value}
            label={stat.label}
            color={[brandColors.blue, brandColors.gold, brandColors.purple][i]}
          />
        ))}
      </div>
    </div>
  )
}

function NetworkVariant({ stats }: { stats: Array<{ value: string; label: string }> }) {
  const nodes = [
    { x: 50, y: 30, color: brandColors.blue, size: 10 },
    { x: 150, y: 20, color: brandColors.purple, size: 8 },
    { x: 30, y: 100, color: brandColors.gold, size: 9 },
    { x: 170, y: 90, color: brandColors.coral, size: 7 },
    { x: 100, y: 60, color: brandColors.indigo, size: 14 },
    { x: 80, y: 140, color: brandColors.blue, size: 6 },
    { x: 140, y: 150, color: brandColors.purple, size: 8 },
  ]

  const edges = [
    [4, 0], [4, 1], [4, 2], [4, 3], [0, 1], [2, 3], [5, 2], [6, 3], [5, 4], [6, 4],
  ]

  return (
    <div className="hero-visual-network">
      <svg className="hero-visual-network-svg" viewBox="0 0 200 180">
        {edges.map(([from, to], i) => (
          <motion.line
            key={i}
            x1={nodes[from].x}
            y1={nodes[from].y}
            x2={nodes[to].x}
            y2={nodes[to].y}
            stroke={`${nodes[from].color}55`}
            strokeWidth="1.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
        {nodes.map((node, i) => (
          <motion.circle
            key={i}
            cx={node.x}
            cy={node.y}
            r={node.size}
            fill={`${node.color}33`}
            stroke={node.color}
            strokeWidth="2"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: edges.length * 0.08 + i * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        ))}
      </svg>
      <div className="hero-visual-network-metrics">
        {stats.slice(0, 3).map((stat, i) => (
          <FloatingMetric
            key={i}
            x={`${8 + i * 32}%`}
            y={`${20 + (i % 2) * 25}%`}
            delay={1.5 + i * 0.2}
            value={stat.value}
            label={stat.label}
            color={[brandColors.blue, brandColors.purple, brandColors.gold][i]}
          />
        ))}
      </div>
    </div>
  )
}

export default function HeroVisual({ variant = 'dashboard', className = '', stats = defaultStats }: HeroVisualProps) {
  const prefersReducedMotion = useReducedMotion()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className={`hero-visual-container ${className}`}
      initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="hero-visual-glass-panel">
        <div className="hero-visual-header-bar">
          <div className="hero-visual-dots">
            <span style={{ background: brandColors.coral }} />
            <span style={{ background: brandColors.gold }} />
            <span style={{ background: brandColors.blue }} />
          </div>
          <div className="hero-visual-header-title">
            {variant === 'dashboard' && 'Analytics'}
            {variant === 'growth' && 'Growth'}
            {variant === 'network' && 'Network'}
          </div>
          <div className="hero-visual-header-spacer" />
        </div>
        <div className="hero-visual-content">
          {variant === 'dashboard' && <DashboardVariant stats={stats} />}
          {variant === 'growth' && <GrowthVariant stats={stats} />}
          {variant === 'network' && <NetworkVariant stats={stats} />}
        </div>
      </div>
      <div className="hero-visual-glow glow-blue" />
      <div className="hero-visual-glow glow-purple" />
    </motion.div>
  )
}
