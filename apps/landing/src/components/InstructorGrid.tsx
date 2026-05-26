import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, BadgeCheck } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Instructor {
  name: string
  slug: string
  photo: string
  languages: string[]
  specialization: string
  specKey: string
  students: string
  rating: string
  bio: string
  credentials: string[]
  variant: string
}

interface InstructorGridProps {
  t: (key: string) => string
  lang: string
  instructors: Instructor[]
  eyebrow: string
  title: string
  subtitle: string
}

const ringGradients: Record<string, string> = {
  blue: 'from-brand-blue via-brand-indigo to-brand-blue',
  purple: 'from-brand-purple via-brand-blue to-brand-purple',
  gold: 'from-brand-gold via-brand-orange to-brand-gold',
  orange: 'from-brand-orange via-brand-coral to-brand-orange',
  navy: 'from-brand-navy via-brand-blue to-brand-navy',
}

function InstructorCard({ instructor, lang, t, index, isInView, prefersReducedMotion }: {
  instructor: Instructor
  lang: string
  t: (key: string) => string
  index: number
  isInView: boolean
  prefersReducedMotion: boolean
}) {
  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={prefersReducedMotion ? { duration: 0 } : {
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <motion.div
        whileHover={prefersReducedMotion ? {} : { y: -8 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        className="group relative flex flex-col items-center p-10 pb-8 bg-white rounded-3xl border border-black/[0.06] hover:border-brand-blue/15 hover:shadow-[0_24px_60px_rgba(0,0,0,0.08),0_8px_24px_rgba(0,0,0,0.04)] transition-colors duration-400 h-full overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/[0.02] to-brand-purple/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        <div className="relative w-28 h-28 mb-6">
          <div className={cn(
            "absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400",
            "bg-gradient-to-r",
            ringGradients[instructor.variant] || ringGradients.blue,
            prefersReducedMotion ? "" : "group-hover:animate-spin"
          )}
          style={{ animationDuration: '6s' }}
          />
          <Avatar className="w-28 h-28 relative z-[2] border-[3px] border-brand-blue-100 group-hover:border-transparent transition-colors duration-300">
            <AvatarImage src={instructor.photo} alt={instructor.name} />
            <AvatarFallback className="text-2xl font-heading font-semibold bg-gradient-to-br from-brand-blue/10 to-brand-purple/10 text-brand-navy">
              {instructor.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="absolute bottom-1 right-1 z-[3] w-6 h-6 bg-brand-blue rounded-full flex items-center justify-center border-2 border-white shadow-[0_2px_8px_rgba(82,138,237,0.3)]">
            <BadgeCheck className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        <div className="relative z-[2] text-center flex flex-col items-center flex-1">
          <h3 className="font-heading text-xl font-semibold text-brand-navy">{instructor.name}</h3>
          <p className="text-sm text-brand-blue-700 font-medium mt-1.5">{instructor.specialization}</p>

          <div className="flex flex-wrap justify-center gap-1.5 mt-3">
            {instructor.languages.map((l) => (
              <Badge key={l} variant="secondary" className="text-[0.6875rem] font-semibold px-2.5 py-0.5 bg-brand-blue-50 text-brand-blue-700 border-brand-blue-200 group-hover:bg-brand-blue-100 transition-colors">
                {l}
              </Badge>
            ))}
          </div>

          <p className="text-sm text-brand-slate-light leading-relaxed mt-4 line-clamp-3">{instructor.bio}</p>

          <div className="flex items-center gap-4 mt-5 py-3 px-5 bg-brand-blue-50 rounded-xl w-full justify-center">
            <div className="flex flex-col items-center">
              <span className="font-heading text-lg font-bold text-brand-navy">{instructor.students}</span>
              <span className="text-[0.6875rem] text-brand-navy-700 font-medium uppercase tracking-wider">{t('instructors.students')}</span>
            </div>
            <Separator orientation="vertical" className="h-8" />
            <div className="flex flex-col items-center">
              <span className="font-heading text-lg font-bold text-brand-navy">{instructor.rating}</span>
              <span className="text-[0.6875rem] text-brand-navy-700 font-medium uppercase tracking-wider">{t('instructors.rating')}</span>
            </div>
          </div>

          <a
            href={`/${lang}/instructors`}
            className="inline-flex items-center gap-2 mt-5 text-sm font-semibold text-brand-blue-700 group-hover:text-brand-indigo transition-colors duration-300"
          >
            {t('instructors.viewprofile')}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function InstructorGrid({ t, lang, instructors, eyebrow, title, subtitle }: InstructorGridProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  return (
    <section className="section-padding bg-white" id="instructors">
      <div ref={sectionRef} className="max-w-[1200px] mx-auto px-6">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-brand-blue-50 text-brand-blue-700 rounded-full text-xs font-bold tracking-[0.12em] uppercase font-heading">
            {eyebrow}
          </span>
          <h2 className="font-heading text-[clamp(2rem,4vw,3rem)] font-bold text-brand-navy tracking-tight mt-4">{title}</h2>
          <p className="text-lg text-brand-slate-light leading-relaxed max-w-[640px] mx-auto mt-4">{subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {instructors.map((inst, i) => (
            <InstructorCard
              key={inst.slug}
              instructor={inst}
              lang={lang}
              t={t}
              index={i}
              isInView={isInView}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
