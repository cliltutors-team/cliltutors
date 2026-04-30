import { useState, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, CheckCircle, Send } from 'lucide-react'
import LucideIcon from '@/components/LucideIcon'
import { cn } from '@/lib/utils'

interface ContactFormProps {
  t: (key: string) => string
  lang: string
  contactMethods: { icon: string; iconType?: 'emoji' | 'lucide'; title: string; description: string; action: string; href: string }[]
  faqs: { question: string; answer: string }[]
}

export default function ContactForm({ t, lang, contactMethods, faqs }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const prefersReducedMotion = useReducedMotion()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    ;(e.target as HTMLFormElement).reset()
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

  return (
    <div ref={sectionRef} className="grid lg:grid-cols-5 gap-12 items-start">
      <div className="lg:col-span-3">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 border-b-2 border-brand-blue-100 pb-6"
        >
          <h2 className="font-heading text-3xl font-semibold text-brand-navy tracking-tight mb-2">
            {t('contact.form.header')}
          </h2>
          <p className="text-brand-slate-light">{t('contact.form.subheader')}</p>
        </motion.div>

        <motion.form
          ref={formRef}
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          onSubmit={handleSubmit}
          className="flex flex-col gap-7"
        >
          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <label htmlFor="contact-name" className="flex items-center gap-1 font-heading text-sm font-semibold text-brand-navy">
              {t('contact.form.name')}
              <span className="text-brand-blue font-bold">*</span>
            </label>
            <Input id="contact-name" name="name" required placeholder={t('contact.form.name.placeholder')} className={fieldClass} />
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <label htmlFor="contact-email" className="flex items-center gap-1 font-heading text-sm font-semibold text-brand-navy">
              {t('contact.form.email')}
              <span className="text-brand-blue font-bold">*</span>
            </label>
            <Input id="contact-email" name="email" type="email" required placeholder={t('contact.form.email.placeholder')} className={fieldClass} />
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <label htmlFor="contact-subject" className="font-heading text-sm font-semibold text-brand-navy">
              {t('contact.form.subject')}
            </label>
            <select
              id="contact-subject"
              name="subject"
              className={cn(
                fieldClass,
                "appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2024%2024%22%20stroke%3D%22%2364748b%22%3E%3Cpath%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%222%22%20d%3D%22M19%209l-7%207-7-7%22%2F%3E%3C%2Fsvg%3E')] bg-[length:1.25rem] bg-[right_0.75rem_center] bg-no-repeat pr-10"
              )}
            >
              <option value="">{t('contact.form.subject.select')}</option>
              <option value="general">{t('contact.form.subject.general')}</option>
              <option value="corporate">{t('contact.form.subject.corporate')}</option>
              <option value="academic">{t('contact.form.subject.academic')}</option>
              <option value="partnership">{t('contact.form.subject.partnership')}</option>
              <option value="other">{t('contact.form.subject.other')}</option>
            </select>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <label htmlFor="contact-message" className="flex items-center gap-1 font-heading text-sm font-semibold text-brand-navy">
              {t('contact.form.message')}
              <span className="text-brand-blue font-bold">*</span>
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              required
              placeholder={t('contact.form.message.placeholder')}
              className={cn(fieldClass, "min-h-[150px] resize-y py-3 px-4")}
            />
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-col gap-2">
            <label htmlFor="contact-referral" className="font-heading text-sm font-semibold text-brand-navy">
              {t('contact.form.referral')}
            </label>
            <Input id="contact-referral" name="referral" placeholder={t('contact.form.referral.placeholder')} className={fieldClass} />
          </motion.div>

          <motion.div variants={fadeUp}>
            {submitted ? (
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-blue/10 border border-brand-blue/25"
              >
                <CheckCircle className="w-5 h-5 text-brand-blue shrink-0" />
                <p className="text-sm font-medium text-brand-blue m-0">{t('contact.form.success')}</p>
              </motion.div>
            ) : (
              <Button
                type="submit"
                size="lg"
                className={cn(
                  "w-full h-12 rounded-[14px] font-heading text-base font-semibold",
                  "bg-gradient-to-r from-brand-blue to-brand-indigo shadow-[0_4px_15px_rgba(82,138,237,0.3)]",
                  "hover:shadow-[0_8px_25px_rgba(82,138,237,0.4)] hover:-translate-y-0.5",
                  "transition-all duration-300"
                )}
              >
                <Send className="w-4 h-4" />
                <span>{t('contact.form.submit')}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            )}
          </motion.div>
        </motion.form>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
className="bg-brand-blue-50 rounded-[1.25rem] p-6"
>
        <h3 className="font-heading text-xl font-semibold text-brand-navy mb-5">{t('contact.social.title')}</h3>
          <div className="flex flex-col gap-3">
            {[
              { name: 'LinkedIn', href: 'https://linkedin.com/company/cliltutors', svg: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>' },
              { name: 'Instagram', href: 'https://instagram.com/cliltutors', svg: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>' },
              { name: 'YouTube', href: 'https://youtube.com/@cliltutors', svg: '<path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>' },
            ].map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener"
                className="flex items-center gap-3 p-3.5 bg-white border border-brand-blue-200 rounded-xl hover:border-brand-blue hover:translate-x-1 transition-all duration-250 group"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-brand-blue-50 rounded-[10px] text-brand-navy-700 group-hover:bg-brand-blue group-hover:text-white transition-all duration-250">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: social.svg }} />
                </div>
                <span className="font-heading text-[0.9375rem] font-semibold text-brand-navy">{social.name}</span>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
className="bg-brand-blue-50 rounded-[1.25rem] p-6"
>
        <h3 className="font-heading text-xl font-semibold text-brand-navy mb-5">{t('contact.faq.title')}</h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-brand-blue-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  aria-expanded={openFaq === index}
                  className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-brand-blue-50 transition-colors cursor-pointer"
                >
                  <span className="font-heading text-[0.9375rem] font-semibold text-brand-navy">{faq.question}</span>
                  <motion.svg
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
                    className="w-5 h-5 text-brand-blue shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? 'auto' : 0,
                    opacity: openFaq === index ? 1 : 0,
                  }}
                  transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4">
                    <Separator className="mb-3" />
                    <p className="text-[0.9375rem] text-brand-slate-light leading-relaxed m-0">{faq.answer}</p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
