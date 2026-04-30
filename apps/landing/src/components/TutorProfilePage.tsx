import { motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, Users, Star, Globe, Award, CheckCircle, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { TutorProfile } from '../data/tutors'

interface Props {
  tutor: TutorProfile
  lang: string
  t: (key: string) => string
}

const langKeyMap: Record<string, string> = { es: 'tutors.lang.es', en: 'tutors.lang.en', pt: 'tutors.lang.pt' }

export default function TutorProfilePage({ tutor, lang, t }: Props) {
  const getLangLabel = (code: string) => t(langKeyMap[code] || code)
  const bio = tutor.bio[lang] || tutor.bio.en
  const approach = tutor.approach[lang] || tutor.approach.en
  const prefersReducedMotion = useReducedMotion()

  const stagger = {
    container: { transition: prefersReducedMotion ? {} : { staggerChildren: 0.1 } },
    item: {
      initial: prefersReducedMotion ? {} : { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0, transition: prefersReducedMotion ? { duration: 0 } : { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
    },
  }

  const whileInViewTransition = prefersReducedMotion ? { duration: 0 } : { duration: 0.6 }

  return (
    <div className="overflow-hidden">
      <section className="relative bg-white pb-0">
        <div className="absolute inset-0 gradient-hero-glow opacity-30 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #4c6ce1 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

        <div className="relative container-narrow section-padding">
          <motion.a
            href={`/${lang}/tutors`}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-indigo hover:text-brand-blue-dark transition-colors mb-8"
            initial={prefersReducedMotion ? {} : { opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.4 }}
          >
            <ArrowLeft className="w-4 h-4" />
            {t('tutor.profile.back')}
          </motion.a>

          <div className="grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-14 items-start">
            <motion.div
              className="flex flex-col items-center lg:items-start"
              initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="relative group">
                <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-2xl overflow-hidden border-4 border-brand-blue-100 bg-brand-blue-50 shadow-lg transition-all duration-500 group-hover:border-brand-blue-200 group-hover:shadow-glow-blue">
                  <img
                    src={tutor.photo}
                    alt={tutor.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <motion.div
                  className="absolute -top-3 -right-3 bg-brand-indigo text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1"
                  initial={prefersReducedMotion ? {} : { opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={prefersReducedMotion ? { duration: 0 } : { delay: 0.3, type: 'spring', stiffness: 200 }}
                >
                  <Sparkles className="w-3 h-3" />
                  {t('tutor.profile.certified')}
                </motion.div>
              </div>

              <motion.div
                className="mt-6 w-full max-w-xs space-y-3"
                variants={stagger.container}
                initial="initial"
                animate="animate"
              >
                {[
                  { icon: Users, value: tutor.students, label: t('tutor.profile.students') },
                  { icon: Star, value: tutor.rating, label: t('tutor.profile.rating') },
                ].map(stat => (
                  <motion.div
                    key={stat.label}
                    variants={stagger.item}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-blue-50/50 border border-brand-blue-100/60"
                  >
                    <stat.icon className="w-4 h-4 text-brand-indigo shrink-0" />
                    <span className="text-sm font-semibold text-brand-navy">{stat.value}</span>
                    <span className="text-sm text-brand-blue-500">{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              variants={stagger.container}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={stagger.item}>
                <span className="eyebrow">{t('tutors.hero.eyebrow')}</span>
              </motion.div>

              <motion.h1
                variants={stagger.item}
                className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-brand-navy mt-2"
              >
                {tutor.name}
              </motion.h1>

              <motion.p
                variants={stagger.item}
                className="text-lg text-brand-indigo font-medium mt-2"
              >
                {tutor.specialization}
              </motion.p>

              <motion.div
                variants={stagger.item}
                className="flex flex-wrap items-center gap-2 mt-5"
              >
<Globe className="w-4 h-4 text-brand-blue-400 shrink-0" />
      <span className="text-sm font-medium text-brand-blue-500">{t('tutor.profile.languages')}:</span>
                {tutor.languages.map(l => (
                  <span
                    key={l}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-brand-purple-50 text-brand-purple border border-brand-purple-100/50"
                  >
                    {getLangLabel(l)}
                  </span>
                ))}
              </motion.div>

              <motion.div
                variants={stagger.item}
                className="flex flex-wrap gap-3 mt-5"
              >
                {[
                  { label: t('tutor.profile.live'), color: 'bg-green-50 text-green-700 border-green-200/60' },
                  { label: t('tutor.profile.certified'), color: 'bg-brand-blue-50 text-brand-indigo border-brand-blue-100/60' },
                  ...(tutor.languages.length >= 2 ? [{ label: t('tutor.profile.native'), color: 'bg-brand-gold-50 text-amber-700 border-brand-gold-100/60' }] : []),
                ].map(badge => (
                  <span
                    key={badge.label}
                    className={cn('inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border', badge.color)}
                  >
                    <CheckCircle className="w-3 h-3" />
                    {badge.label}
                  </span>
                ))}
              </motion.div>

              <motion.div variants={stagger.item} className="mt-8">
                <a
                  href={`/${lang}/consultation`}
                  aria-label={`${t('tutor.profile.cta')} ${tutor.name.split(' ')[0]}`}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  {t('tutor.profile.cta')} {tutor.name.split(' ')[0]}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section-padding gradient-section-alt">
        <div className="container-narrow">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={whileInViewTransition}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="icon-box-blue">
                <Users className="w-5 h-5" />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-navy">
                {t('tutor.profile.about')}
              </h2>
            </div>
            <div className="max-w-3xl">
              <p className="text-lg text-brand-navy-700 leading-relaxed">{bio}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-narrow">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={whileInViewTransition}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="icon-box-blue">
                <Sparkles className="w-5 h-5" />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-navy">
                {t('tutor.profile.approach')}
              </h2>
            </div>
            <div className="max-w-3xl">
              <div className="relative pl-6 border-l-3 border-brand-indigo">
                <div className="absolute -left-[7px] top-0 w-3.5 h-3.5 rounded-full bg-brand-indigo ring-4 ring-brand-blue-50" />
                <p className="text-lg text-brand-navy-700 leading-relaxed">{approach}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="section-padding gradient-section-alt">
        <div className="container-narrow">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={whileInViewTransition}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="icon-box-blue">
                <Award className="w-5 h-5" />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-navy">
                {t('tutor.profile.credentials')}
              </h2>
            </div>
            <motion.div
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
              variants={stagger.container}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: '-50px' }}
            >
              {tutor.credentials.map((cred, i) => (
                <motion.div
                  key={i}
                  variants={stagger.item}
                  className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white border border-brand-blue-100/60 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-blue-50 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 text-brand-indigo" />
                  </div>
                  <span className="text-sm font-medium text-brand-navy">{cred}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-cta" />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full opacity-15 blur-[80px]" style={{ background: 'rgba(166,123,244,0.5)' }} />
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full opacity-10 blur-[60px]" style={{ background: 'rgba(254,187,55,0.4)' }} />

        <motion.div
          className="relative max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 py-20 lg:py-24 text-center"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={whileInViewTransition}
        >
          <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-[2.75rem] text-white leading-[1.1] text-balance">
          {t('tutor.profile.cta')} {tutor.name.split(' ')[0]}{'?'}
        </h2>
          <div className="mt-10">
            <a
              href={`/${lang}/consultation`}
              className="btn-white inline-flex items-center gap-2 group"
              aria-label={`${t('nav.consultation')} — ${tutor.name}`}
            >
              {t('nav.consultation')}
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
