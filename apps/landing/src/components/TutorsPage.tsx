import { useState, useMemo } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { Filter, X, Users, Star } from 'lucide-react'

interface Tutor {
  slug: string
  name: string
  photo: string
  languages: string[]
  specialization: string
  specKey: string
  students: string
  rating: string
}

interface TutorsPageProps {
  lang: string
  t: (key: string) => string
}

const tutorsData: Tutor[] = [
  { slug: 'jimmy-ramires', name: 'Jimmy Ramires', photo: '/images/web/Jimmy.png', languages: ['es', 'en'], specialization: 'CLIL · Business Communication', specKey: 'business', students: '1.2k', rating: '4.9' },
  { slug: 'alissa-lechleitner', name: 'Alissa Lechleitner', photo: '/images/web/Alissa.png', languages: ['en', 'pt'], specialization: 'CLIL · Academic Writing', specKey: 'academic', students: '980', rating: '4.8' },
  { slug: 'laura-gomes', name: 'Laura Gomes', photo: '/images/web/Laura.png', languages: ['pt', 'en'], specialization: 'CLIL · STEM Education', specKey: 'stem', students: '1.1k', rating: '4.9' },
  { slug: 'thayline-candatti', name: 'Thayline Candatti', photo: '/images/web/Thayline.png', languages: ['en', 'pt'], specialization: 'CLIL · Professional Coaching', specKey: 'coaching', students: '870', rating: '4.9' },
  { slug: 'xiomara-ramires', name: 'Xiomara Ramires', photo: '/images/web/Xiomara.png', languages: ['es', 'pt'], specialization: 'CLIL · Cultural Communication', specKey: 'culture', students: '760', rating: '4.8' },
  { slug: 'cristian', name: 'Cristian', photo: '/images/web/Cristian.png', languages: ['es', 'en', 'pt'], specialization: 'CLIL · Corporate Training', specKey: 'business', students: '1.4k', rating: '4.9' },
]

const langFilterOptions = ['en', 'es', 'pt'] as const
const specFilterOptions = ['business', 'academic', 'stem', 'coaching', 'culture'] as const

export default function TutorsPage({ lang, t }: TutorsPageProps) {
  const [activeLang, setActiveLang] = useState<string | null>(null)
  const [activeSpec, setActiveSpec] = useState<string | null>(null)
  const prefersReducedMotion = useReducedMotion()

  const filtered = useMemo(() => {
    return tutorsData.filter(tutor => {
      if (activeLang && !tutor.languages.includes(activeLang)) return false
      if (activeSpec && tutor.specKey !== activeSpec) return false
      return true
    })
  }, [activeLang, activeSpec])

  const hasFilters = activeLang || activeSpec

  const clearFilters = () => {
    setActiveLang(null)
    setActiveSpec(null)
  }

  const getLangLabel = (code: string) => {
    const map: Record<string, string> = { en: t('tutors.lang.en'), es: t('tutors.lang.es'), pt: t('tutors.lang.pt') }
    return map[code] || code.toUpperCase()
  }

  return (
    <div>
      {/* Filters */}
      <section className="section-padding bg-white border-b border-gray-100">
        <div className="container-narrow">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <Filter className="w-4 h-4" />
              <span>{t('tutors.filter.language')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
        {langFilterOptions.map(code => (
          <button
            key={code}
            onClick={() => setActiveLang(activeLang === code ? null : code)}
            aria-pressed={activeLang === code}
            className={cn(
                    'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                    activeLang === code
                      ? 'bg-brand-blue text-white shadow-sm'
                      : 'bg-brand-blue-50 text-brand-blue hover:bg-brand-blue-100'
                  )}
                >
                  {getLangLabel(code)}
                </button>
              ))}
            </div>

            <div className="w-px h-6 bg-gray-200 mx-2 hidden sm:block" />

            <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
              <span>{t('tutors.filter.specialization')}</span>
            </div>
            <div className="flex flex-wrap gap-2">
        {specFilterOptions.map(spec => (
          <button
            key={spec}
            onClick={() => setActiveSpec(activeSpec === spec ? null : spec)}
            aria-pressed={activeSpec === spec}
            className={cn(
                    'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
                    activeSpec === spec
                      ? 'bg-brand-purple text-white shadow-sm'
                      : 'bg-brand-purple-50 text-brand-purple hover:bg-brand-purple-100'
                  )}
                >
                  {t(`tutors.spec.${spec}`)}
                </button>
              ))}
            </div>

            {hasFilters && (
        <button
          onClick={clearFilters}
          aria-label={t('tutors.filter.all')}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600 transition-colors ml-2"
              >
                <X className="w-3.5 h-3.5" />
                {t('tutors.filter.all')}
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Tutor Grid */}
      <section className="section-padding gradient-section-alt">
        <div className="container-narrow">
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
          key="grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filtered.map((tutor, i) => (
                  <motion.div
                    key={tutor.slug}
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4, delay: i * 0.08 }}
                    className="card-gradient p-6 text-center group hover:translate-y-[-4px]"
                  >
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-brand-blue-100 bg-gray-100 transition-all duration-300 group-hover:border-brand-blue-200">
                      <img src={tutor.photo} alt={tutor.name} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-brand-navy mt-4 group-hover:text-brand-indigo transition-colors">
                      {tutor.name}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-1.5 mt-3">
                      {tutor.languages.map(l => (
                        <span key={l} className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-blue-50 text-brand-blue border border-brand-blue-200">
                          {getLangLabel(l)}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-3">{t(`tutors.spec.${tutor.specKey}`)}</p>
                    <div className="flex items-center justify-center gap-4 mt-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        {tutor.students} {t('tutors.card.students')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-brand-gold" />
                        {tutor.rating}
                      </span>
                    </div>
        <a
          href={`/${lang}/tutors/${tutor.slug}`}
          aria-label={`${t('tutors.card.cta')} ${tutor.name}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue group-hover:text-brand-indigo transition-all"
                    >
                      {t('tutors.card.cta')}
                      <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
          key="empty"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.3 }}
                className="text-center py-16"
              >
        <div className="text-5xl mb-4" aria-hidden="true">🔍</div>
        <h3 className="font-heading font-semibold text-xl text-brand-navy">{t('tutors.empty.title')}</h3>
                <p className="text-gray-500 mt-2">{t('tutors.empty.desc')}</p>
                <button
                  onClick={clearFilters}
                  className="mt-6 btn-primary"
                >
                  {t('tutors.filter.all')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-cta" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
        <div className="relative section-padding">
          <div className="container-narrow text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">{t('tutors.cta.title')}</h2>
            <p className="text-white/80 mt-4 max-w-xl mx-auto">{t('tutors.cta.subtitle')}</p>
            <a
              href={`/${lang}/consultation`}
              className="mt-8 inline-block btn-white"
            >
              {t('nav.consultation')}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
