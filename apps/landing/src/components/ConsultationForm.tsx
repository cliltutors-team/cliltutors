import { useState, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, CheckCircle, CalendarDays } from 'lucide-react'
import LucideIcon from '@/components/LucideIcon'
import { cn } from '@/lib/utils'

interface Benefit {
  icon: string
  iconType?: 'emoji' | 'lucide'
  title: string
  description: string
}

interface ConsultationFormProps {
  t: (key: string) => string
  lang: string
  benefits: Benefit[]
}

export default function ConsultationForm({ t, lang, benefits }: ConsultationFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const prefersReducedMotion = useReducedMotion()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    ;(e.target as HTMLFormElement).reset()
    setNewsletter(false)
    setTimeout(() => setSubmitted(false), 6000)
  }

  const stagger = {
    hidden: {},
    visible: { transition: prefersReducedMotion ? {} : { staggerChildren: 0.07 } }
  }

  const fadeUp = {
    hidden: prefersReducedMotion ? {} : { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  }

  const fieldClass = "h-12 rounded-xl border-brand-blue-200 bg-brand-blue-50/80 text-brand-navy placeholder:text-brand-blue-400 hover:border-brand-blue-300 focus:border-brand-blue focus:ring-brand-blue/20 focus:bg-white transition-all"

  const selectClass = cn(
    fieldClass,
    "appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%2364748b%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10"
  )

  const ringColors: Record<string, string> = {
    blue: 'from-brand-blue to-brand-indigo',
    purple: 'from-brand-purple to-brand-blue',
    gold: 'from-brand-gold to-brand-orange',
    orange: 'from-brand-orange to-brand-coral',
  }

  return (
    <div ref={sectionRef} className="grid lg:grid-cols-2 gap-16 items-start">
      <div>
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 border-b-2 border-brand-blue-100 pb-6"
        >
          <h2 className="font-heading text-3xl font-semibold text-brand-navy tracking-tight mb-2">
            {t('consultation.form.header')}
          </h2>
          <p className="text-brand-slate-light">{t('consultation.form.subheader')}</p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full bg-brand-blue/10 mb-5">
              <CheckCircle className="w-8 h-8 text-brand-blue" />
            </div>
            <h3 className="font-heading text-xl font-semibold text-brand-navy mb-2">{t('consultation.form.success')}</h3>
          </motion.div>
        ) : (
          <motion.form
            ref={formRef}
            variants={stagger}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            onSubmit={handleSubmit}
            className="flex flex-col gap-7"
          >
            <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="consult-name" className="flex items-center gap-1 font-heading text-sm font-semibold text-brand-navy">
                  {t('consultation.form.name')}
                  <span className="text-brand-blue font-bold">*</span>
                </label>
                <Input id="consult-name" name="name" required placeholder={t('consultation.form.name.placeholder')} className={fieldClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="consult-email" className="flex items-center gap-1 font-heading text-sm font-semibold text-brand-navy">
                  {t('consultation.form.email')}
                  <span className="text-brand-blue font-bold">*</span>
                </label>
                <Input id="consult-email" name="email" type="email" required placeholder={t('consultation.form.email.placeholder')} className={fieldClass} />
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="consult-company" className="font-heading text-sm font-semibold text-brand-navy">
                  {t('consultation.form.company')}
                </label>
                <Input id="consult-company" name="company" placeholder={t('consultation.form.company.placeholder')} className={fieldClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="consult-role" className="flex items-center gap-1 font-heading text-sm font-semibold text-brand-navy">
                  {t('consultation.form.role')}
                  <span className="text-brand-blue font-bold">*</span>
                </label>
                <Input id="consult-role" name="role" required placeholder={t('consultation.form.role.placeholder')} className={fieldClass} />
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-2">
              <label htmlFor="consult-program" className="flex items-center gap-1 font-heading text-sm font-semibold text-brand-navy">
                {t('consultation.form.program')}
                <span className="text-brand-blue font-bold">*</span>
              </label>
              <select id="consult-program" name="program-type" required className={selectClass}>
                <option value="">{t('consultation.form.program.select')}</option>
                <option value="corporate">{t('consultation.form.program.corporate')}</option>
                <option value="professional">{t('consultation.form.program.professional')}</option>
                <option value="academic">{t('consultation.form.program.academic')}</option>
                <option value="k12">{t('consultation.form.program.k12')}</option>
              </select>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-2">
              <label htmlFor="consult-timeline" className="font-heading text-sm font-semibold text-brand-navy">
                {t('consultation.form.timeline')}
              </label>
              <select id="consult-timeline" name="timeline" className={selectClass}>
                <option value="">{t('consultation.form.timeline.select')}</option>
                <option value="immediate">{t('consultation.form.timeline.immediate')}</option>
                <option value="1-3months">{t('consultation.form.timeline.1-3')}</option>
                <option value="3-6months">{t('consultation.form.timeline.3-6')}</option>
                <option value="planning">{t('consultation.form.timeline.planning')}</option>
              </select>
            </motion.div>

            <motion.div variants={fadeUp} className="flex flex-col gap-2">
              <label htmlFor="consult-objective" className="flex items-center gap-1 font-heading text-sm font-semibold text-brand-navy">
                {t('consultation.form.objective')}
                <span className="text-brand-blue font-bold">*</span>
              </label>
              <textarea
                id="consult-objective"
                name="objective"
                rows={4}
                required
                placeholder={t('consultation.form.objective.placeholder')}
                className={cn(fieldClass, "min-h-[120px] resize-y py-3 px-4")}
              />
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-start gap-3">
              <input
                type="checkbox"
                id="consult-newsletter"
                name="newsletter"
                checked={newsletter}
                onChange={(e) => setNewsletter(e.target.checked)}
                className="w-5 h-5 rounded accent-brand-blue cursor-pointer mt-0.5"
              />
              <label htmlFor="consult-newsletter" className="text-sm text-brand-slate-light cursor-pointer leading-relaxed">
                {t('consultation.form.newsletter')}
              </label>
            </motion.div>

            <motion.div variants={fadeUp}>
              <Button
                type="submit"
                size="lg"
                className={cn(
                  "w-full h-12 rounded-[14px] font-heading text-base font-semibold",
                  "bg-gradient-to-r from-brand-blue to-brand-indigo shadow-[0_4px_15px_rgba(82,138,237,0.3)]",
                  "hover:shadow-[0_8px_25px_rgba(82,138,237,0.4)] hover:-translate-y-0.5",
                  "transition-all duration-300 group"
                )}
              >
                <span>{t('consultation.form.submit')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          </motion.form>
        )}
      </div>

      <div className="space-y-6">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="font-heading text-2xl font-semibold text-brand-navy mb-5 tracking-tight">
            {t('consultation.benefits.title')}
          </h3>
          <div className="space-y-4">
            {benefits.map((benefit, i) => {
              const variant = (['blue', 'purple', 'gold'] as const)[i % 3]
              return (
                <motion.div
                  key={i}
                  initial={prefersReducedMotion ? {} : { opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Card className="border-0 shadow-none bg-gradient-to-br from-white to-brand-blue-50/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                    <CardContent className="p-5 flex items-start gap-4">
                        <div className={cn(
                          "w-11 h-11 flex items-center justify-center rounded-xl shrink-0",
                          benefit.iconType === 'lucide' ? "" : "text-lg",
                          variant === 'blue' && (benefit.iconType === 'lucide' ? "bg-brand-blue/10 text-brand-blue" : "bg-brand-blue/10"),
                          variant === 'purple' && (benefit.iconType === 'lucide' ? "bg-brand-purple/10 text-brand-purple" : "bg-brand-purple/10"),
                          variant === 'gold' && (benefit.iconType === 'lucide' ? "bg-brand-gold/10 text-brand-gold" : "bg-brand-gold/10"),
                        )}>
                          {benefit.iconType === 'lucide' ? (
                            <LucideIcon name={benefit.icon} size={20} color="currentColor" strokeWidth={1.75} />
                          ) : (
                            benefit.icon
                          )}
                        </div>
                      <div>
                        <h4 className="font-heading text-base font-semibold text-brand-navy mb-1">{benefit.title}</h4>
                        <p className="text-sm text-brand-slate-light leading-relaxed m-0">{benefit.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="border-brand-blue-200 bg-white">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue-50 to-brand-blue-100 border border-brand-blue-200">
                  <CalendarDays className="w-6 h-6 text-brand-blue" />
                </div>
                <div>
                  <CardTitle className="font-heading text-lg text-brand-navy">{t('consultation.calendar.title')}</CardTitle>
                  <CardDescription className="text-sm">{t('consultation.calendar.desc')}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
<div className="h-80 bg-brand-blue-50 rounded-xl flex items-center justify-center">
        <p className="text-sm text-brand-blue-400">{t('consultation.calendar.loading')}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
