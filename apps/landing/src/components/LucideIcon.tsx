import {
  BookOpen,
  Globe,
  GraduationCap,
  Users,
  Brain,
  Lightbulb,
  MessageCircle,
  Target,
  Sparkles,
  Award,
  Rocket,
  Heart,
  Star,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Clock,
  Shield,
  ShieldCheck,
  Zap,
  TrendingUp,
  BarChart3,
  Languages,
  Microscope,
  Calculator,
  Briefcase,
  Presentation,
  CircleDot,
  Mail,
  DollarSign,
  Wallet,
  CreditCard,
  RefreshCw,
  Dumbbell,
  Check,
  Globe2,
  Palette,
  ClipboardList,
  Landmark,
  School,
  Mic,
  Pencil,
  Factory,
  User,
  Calendar,
  Ruler,
  Search,
  FileText,
  type LucideProps,
} from 'lucide-react'
import type { FC } from 'react'

const iconMap: Record<string, FC<LucideProps>> = {
  'book-open': BookOpen,
  'globe': Globe,
  'graduation-cap': GraduationCap,
  'users': Users,
  'brain': Brain,
  'lightbulb': Lightbulb,
  'message-circle': MessageCircle,
  'target': Target,
  'sparkles': Sparkles,
  'award': Award,
  'rocket': Rocket,
  'heart': Heart,
  'star': Star,
  'check-circle': CheckCircle,
  'arrow-right': ArrowRight,
  'chevron-right': ChevronRight,
  'clock': Clock,
  'shield': Shield,
  'shield-check': ShieldCheck,
  'zap': Zap,
  'trending-up': TrendingUp,
  'bar-chart': BarChart3,
  'languages': Languages,
  'microscope': Microscope,
  'calculator': Calculator,
  'briefcase': Briefcase,
  'presentation': Presentation,
  'circle-dot': CircleDot,
  'mail': Mail,
  'dollar-sign': DollarSign,
  'wallet': Wallet,
  'credit-card': CreditCard,
  'refresh-cw': RefreshCw,
  'dumbbell': Dumbbell,
  'check': Check,
  'globe-2': Globe2,
  'palette': Palette,
  'clipboard-list': ClipboardList,
  'landmark': Landmark,
  'school': School,
  'mic': Mic,
  'pencil': Pencil,
  'factory': Factory,
  'user': User,
  'calendar': Calendar,
  'ruler': Ruler,
  'search': Search,
  'file-text': FileText,
}

interface LucideIconProps {
  name: string
  size?: number
  className?: string
  strokeWidth?: number
  color?: string
}

export default function LucideIcon({
  name,
  size = 24,
  className = '',
  strokeWidth = 1.75,
  color,
}: LucideIconProps) {
  const IconComponent = iconMap[name]

  if (!IconComponent) {
    return <span class={`inline-flex items-center justify-center ${className}`} style={{ width: size, height: size }} />
  }

  return (
    <IconComponent
      size={size}
      className={className}
      strokeWidth={strokeWidth}
      color={color}
    />
  )
}
