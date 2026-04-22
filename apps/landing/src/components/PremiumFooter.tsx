import { useState, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Send, CheckCircle, Globe, ArrowRight, Mail, ChevronDown } from 'lucide-react'

interface FooterProps {
  lang: string
  t: (key: string) => string
  solutionLinks: { href: string; label: string }[]
  resourceLinks: { href: string; label: string }[]
  currentPath: string
}

const langs = [
  { code: 'pt', labelKey: 'tutors.lang.pt', flag: '🇧🇷' },
  { code: 'en', labelKey: 'tutors.lang.en', flag: '🇺🇸' },
  { code: 'es', labelKey: 'tutors.lang.es', flag: '🇪🇸' },
]

export default function PremiumFooter({ lang, t, solutionLinks, resourceLinks, currentPath }: FooterProps) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const footerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(footerRef, { once: true, margin: '-80px' })
  const prefersReducedMotion = useReducedMotion()

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  const currentLang = langs.find(l => l.code === lang) || langs[0]

  const stagger = {
    hidden: {},
    visible: { transition: prefersReducedMotion ? {} : { staggerChildren: 0.08 } }
  }

const fadeUp = {
  hidden: prefersReducedMotion ? {} : { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
}

return (
    <footer ref={footerRef} className="relative overflow-hidden">
      {/* Top gradient accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[var(--color-brand-blue)] to-transparent opacity-30" />

      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--color-brand-blue)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[var(--color-brand-purple)]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-16 lg:pt-20 pb-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8"
        >
          {/* Brand + Newsletter — spans 5 cols */}
          <motion.div variants={fadeUp} className="lg:col-span-5">
            <img
              src="/images/logo-cliltutors.svg"
              alt="ClilTutors"
              className="h-8 w-auto mb-5 brightness-0 invert"
            />
            <p className="text-sm text-white/60 leading-relaxed mb-8 max-w-sm">
              {t('footer.about.desc')}
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="font-heading font-semibold text-[0.8125rem] tracking-widest uppercase text-white/50 mb-2">
                {t('footer.newsletter.title')}
              </h4>
              <p className="text-sm text-white/40 mb-4">{t('footer.newsletter.desc')}</p>

              {subscribed ? (
    <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={prefersReducedMotion ? { duration: 0 } : undefined}
          className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[var(--color-brand-blue)]/15 border border-[var(--color-brand-blue)]/25"
                >
                  <CheckCircle className="w-4 h-4 text-[var(--color-brand-blue)]" />
                  <span className="text-sm text-[var(--color-brand-blue)] font-medium">{t('footer.newsletter.success')}</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletter.placeholder')}
                  aria-label={t('footer.newsletter.placeholder')}
                  className="w-full h-11 pl-10 pr-4 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[var(--color-brand-blue)]/40 focus:ring-1 focus:ring-[var(--color-brand-blue)]/20 transition-all"
                />
                  </div>
                  <button
                    type="submit"
                    className="h-11 px-5 rounded-xl bg-[var(--color-brand-blue)] text-white text-sm font-semibold flex items-center gap-2 hover:bg-[var(--color-brand-blue)]/90 transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">{t('footer.newsletter.button')}</span>
                  </button>
                </form>
              )}
              <p className="text-xs text-white/20 mt-2">{t('footer.newsletter.privacy')}</p>
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <span className="text-xs text-white/30 uppercase tracking-wider mr-3">{t('footer.language.label')}</span>
        <button
          onClick={() => setLangOpen(!langOpen)}
          onBlur={() => setTimeout(() => setLangOpen(false), 200)}
          aria-expanded={langOpen}
          aria-haspopup="listbox"
          aria-label={t('footer.language.label')}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-sm text-white/70 hover:text-white hover:border-white/15 transition-all cursor-pointer"
        >
                <Globe className="w-4 h-4" />
                <span>{currentLang.flag} {t(currentLang.labelKey)}</span>
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", langOpen && "rotate-180")} />
              </button>
              {langOpen && (
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          role="listbox"
          className="absolute bottom-full left-[5.5rem] mb-2 py-1 rounded-lg bg-[var(--color-brand-navy-800)] border border-white/10 shadow-xl z-50 min-w-[140px]"
        >
          {langs.map(l => (
            <a
              key={l.code}
              href={`/${l.code}${currentPath}`}
              role="option"
              aria-selected={l.code === lang}
              className={cn(
                "flex items-center gap-2 px-4 py-2 text-sm transition-colors",
                l.code === lang ? "text-[var(--color-brand-blue)]" : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              )}
            >
                      <span>{l.flag}</span>
                      <span>{t(l.labelKey)}</span>
                    </a>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Solutions — spans 2 cols */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <h4 className="font-heading font-semibold text-[0.8125rem] tracking-[0.05em] uppercase text-white/50 mb-5">
              {t('footer.solutions.title')}
            </h4>
            <ul className="space-y-3">
              {solutionLinks.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/55 hover:text-white hover:pl-1 transition-all duration-200 block">
                    {t(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources — spans 2 cols */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <h4 className="font-heading font-semibold text-[0.8125rem] tracking-[0.05em] uppercase text-white/50 mb-5">
              {t('footer.resources.title')}
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map(link => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/55 hover:text-white hover:pl-1 transition-all duration-200 block">
                    {t(link.label)}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact — spans 3 cols */}
          <motion.div variants={fadeUp} className="lg:col-span-3">
            <h4 className="font-heading font-semibold text-[0.8125rem] tracking-[0.05em] uppercase text-white/50 mb-5">
              {t('footer.contact.title')}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@cliltutors.com" className="text-sm text-white/55 hover:text-white transition-colors">
                  {t('footer.email')}
                </a>
              </li>
              <li>
                <a href={`/${lang}/contact`} className="text-sm text-white/55 hover:text-white transition-colors">
                  {t('nav.contact')}
                </a>
              </li>
              <li>
                <a
                  href={`/${lang}/consultation`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-brand-blue)] hover:text-[var(--color-brand-blue-200)] transition-colors group"
                >
                  {t('nav.consultation')}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex gap-3 mt-8">
        <a
          href="https://linkedin.com/company/cliltutors"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
                className="w-9 h-9 rounded-[10px] bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/45 hover:bg-[var(--color-brand-blue)]/15 hover:border-[var(--color-brand-blue)]/30 hover:text-[var(--color-brand-blue)] hover:-translate-y-0.5 transition-all duration-250"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
        <a
          href="https://instagram.com/cliltutors"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
                className="w-9 h-9 rounded-[10px] bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/45 hover:bg-[var(--color-brand-blue)]/15 hover:border-[var(--color-brand-blue)]/30 hover:text-[var(--color-brand-blue)] hover:-translate-y-0.5 transition-all duration-250"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
        <a
          href="https://youtube.com/@cliltutors"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
                className="w-9 h-9 rounded-[10px] bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/45 hover:bg-[var(--color-brand-blue)]/15 hover:border-[var(--color-brand-blue)]/30 hover:text-[var(--color-brand-blue)] hover:-translate-y-0.5 transition-all duration-250"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
    initial={{ opacity: 0 }}
    animate={isInView ? { opacity: 1 } : {}}
    transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.6, duration: 0.5 }}
          className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-sm text-white/30">{t('footer.copyright')}</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="text-sm text-white/30 hover:text-white/60 transition-colors">{t('footer.terms')}</a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
