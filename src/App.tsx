import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { translations, type Lang, type Translations } from './i18n'
import { LangToggle } from './components/MockupLayout'
import ScreenTest from './screens/ScreenTest'
import ScreenBookings from './screens/ScreenBookings'
import ScreenReports from './screens/ScreenReports'

const FORM_URL = 'https://forms.gle/akaJ5u8PPrLsB6386'

// ── Icons (inline SVG, zero external deps) ──────────────────────────────────

function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-8 h-8">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-8 h-8">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function IconHome() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-8 h-8">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-7 h-7">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function IconHeart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-4 h-4">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function IconSmartphone() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-7 h-7">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </svg>
  )
}

function IconQuote() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="w-8 h-8 opacity-30">
      <path d="M11.192 15.757c0-.88-.23-1.618-.69-2.217-.326-.412-.768-.683-1.327-.812-.55-.128-1.07-.137-1.54-.028-.16-.95.1-1.95.76-3 .66-1.06 1.515-1.876 2.565-2.455L9.21 5.03c-1.837.8-3.248 2.01-4.233 3.63-.985 1.62-1.477 3.29-1.477 5.01 0 1.42.39 2.57 1.17 3.45.78.88 1.86 1.32 3.24 1.32 1.17 0 2.09-.35 2.76-1.05.67-.7 1-1.58 1-2.63zm9.19 0c0-.88-.23-1.618-.69-2.217-.326-.42-.77-.692-1.327-.817-.56-.124-1.074-.13-1.54-.022-.16-.95.1-1.95.76-3 .66-1.06 1.515-1.876 2.565-2.455l-1.75-1.772c-1.837.8-3.248 2.01-4.233 3.63-.985 1.62-1.477 3.29-1.477 5.01 0 1.42.39 2.57 1.17 3.45.78.88 1.86 1.32 3.24 1.32 1.17 0 2.09-.35 2.76-1.05.67-.7 1-1.58 1-2.63z" />
    </svg>
  )
}

function IconEar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-7 h-7">
      <path d="M6 12a6 6 0 1 1 12 0c0 2.5-1.5 4-3 5.5S12 21 12 21" />
      <path d="M9 12a3 3 0 1 1 6 0c0 1.5-1 2.5-2 3.5" />
      <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconDocument() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-7 h-7">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}

// ── Scroll to top on route change ────────────────────────────────────────────

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// ── Subcomponents ────────────────────────────────────────────────────────────

interface NavbarProps {
  t: Translations
  lang: Lang
  onToggleLang: () => void
}

function Navbar({ t, lang, onToggleLang }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <img
          src="logo.png"
          alt="EarBridge"
          className="h-9 w-auto"
          width="160"
          height="36"
        />
        <div className="flex items-center gap-3">
          <LangToggle lang={lang} onToggle={onToggleLang} />
          <a href={FORM_URL} className="btn-primary text-sm py-2.5 px-5">
            {t.nav.cta}
          </a>
        </div>
      </div>
    </header>
  )
}

interface HeroProps { t: Translations }

function Hero({ t }: HeroProps) {
  const [line1, line2] = t.hero.headline.split('\n')
  return (
    <section className="hero-bg text-white">
      <div className="max-w-4xl mx-auto px-4 py-16 md:py-24 text-center">
        <p className="inline-block bg-sky-brand/20 text-sky-lighter text-sm font-semibold tracking-wide uppercase px-3 py-1 rounded-full mb-6">
          {t.hero.badge}
        </p>
        <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-tight mb-5">
          {line1}<br />{line2}
        </h1>
        <p className="text-[clamp(1.1rem,2.5vw,1.3rem)] text-sky-lighter/90 max-w-2xl mx-auto mb-10 leading-relaxed">
          {t.hero.subheadline}
        </p>
        <a href={FORM_URL} className="btn-primary-lg">
          {t.hero.cta}
        </a>
        <p className="mt-5 text-sm text-sky-lighter/60">{t.hero.disclaimer}</p>
      </div>
    </section>
  )
}

interface StepProps {
  number: string
  icon: React.ReactNode
  title: string
  description: string
}

function Step({ number, icon, title, description }: StepProps) {
  return (
    <li className="flex flex-col items-center text-center px-4">
      <div className="relative mb-4">
        <div className="w-16 h-16 rounded-2xl bg-sky-brand/10 text-navy flex items-center justify-center">
          {icon}
        </div>
        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center">
          {number}
        </span>
      </div>
      <h3 className="font-bold text-navy text-lg mb-1">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed max-w-[220px]">{description}</p>
    </li>
  )
}

const stepIcons = [<IconSearch />, <IconCalendar />, <IconHome />]

interface HowItWorksProps { t: Translations }

function HowItWorks({ t }: HowItWorksProps) {
  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="section-title">{t.how.title}</h2>
        <p className="section-subtitle">{t.how.subtitle}</p>
        <ol className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
          {t.how.steps.map((step, i) => (
            <Step
              key={i}
              number={String(i + 1)}
              icon={stepIcons[i]}
              title={step.title}
              description={step.description}
            />
          ))}
        </ol>
      </div>
    </section>
  )
}

interface BenefitCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3">
      <div className="w-12 h-12 rounded-xl bg-navy/5 text-navy flex items-center justify-center">
        {icon}
      </div>
      <h3 className="font-bold text-navy text-lg">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

const benefitIcons = [<IconHome />, <IconShield />, <IconSmartphone />]

interface BenefitsProps { t: Translations }

function Benefits({ t }: BenefitsProps) {
  return (
    <section className="py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="section-title">{t.benefits.title}</h2>
        <p className="section-subtitle">{t.benefits.subtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.benefits.cards.map((card, i) => (
            <BenefitCard
              key={i}
              icon={benefitIcons[i]}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Platform Preview section ─────────────────────────────────────────────────

const previewIcons = [<IconEar />, <IconCalendar />, <IconDocument />]
const previewRoutes = ['/test', '/bookings', '/reports']

interface PlatformPreviewProps { t: Translations }

function PlatformPreview({ t }: PlatformPreviewProps) {
  return (
    <section className="bg-gray-50 py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-center text-sky-brand text-sm font-semibold uppercase tracking-widest mb-3">
          {t.platformPreview.eyebrow}
        </p>
        <h2 className="section-title">{t.platformPreview.title}</h2>
        <p className="section-subtitle">{t.platformPreview.subtitle}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          {t.platformPreview.cards.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-brand/10 text-sky-brand flex items-center justify-center">
                {previewIcons[i]}
              </div>
              <h3 className="font-bold text-navy text-lg">{card.label}</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1">{card.description}</p>
              <Link
                to={previewRoutes[i]}
                className="inline-flex items-center text-sm font-semibold text-sky-brand hover:text-navy transition-colors mt-1"
              >
                {card.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Social Proof, FinalCTA, Footer ───────────────────────────────────────────

interface SocialProofProps { t: Translations }

function SocialProof({ t }: SocialProofProps) {
  const initial = t.proof.author.charAt(0)
  return (
    <section className="bg-navy/5 py-16 md:py-20">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-10 relative">
          <div className="absolute top-6 left-8 text-sky-brand">
            <IconQuote />
          </div>
          <blockquote className="pt-6">
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed italic mb-6">
              {t.proof.quote}
            </p>
            <footer className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center text-navy font-bold text-sm">
                {initial}
              </div>
              <div className="text-left">
                <cite className="not-italic font-semibold text-navy text-sm">{t.proof.author}</cite>
                <p className="text-gray-400 text-xs">{t.proof.location}</p>
              </div>
            </footer>
          </blockquote>
        </div>
        <p className="mt-6 text-xs text-gray-400 flex items-center justify-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-sky-brand animate-pulse" />
          {t.proof.launchNote}
        </p>
        <div className="mt-2 flex items-center justify-center gap-1 text-gray-400">
          <IconHeart />
          <p className="text-xs">{t.proof.quoteDisclaimer}</p>
        </div>
      </div>
    </section>
  )
}

interface FinalCTAProps { t: Translations }

function FinalCTA({ t }: FinalCTAProps) {
  const [line1, line2] = t.finalCta.title.split('\n')
  return (
    <section id="form" className="cta-bg py-16 md:py-24 text-white text-center">
      <div className="max-w-2xl mx-auto px-4">
        <p className="text-sky-brand font-semibold text-sm uppercase tracking-widest mb-4">
          {t.finalCta.eyebrow}
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
          {line1}<br />{line2}
        </h2>
        <p className="text-sky-lighter/80 text-lg mb-8 leading-relaxed">
          {t.finalCta.body}
        </p>
        <a href={FORM_URL} className="btn-primary-lg">
          {t.finalCta.cta}
        </a>
        <p className="mt-5 text-sm text-sky-lighter/50">
          {t.finalCta.disclaimer}
        </p>
      </div>
    </section>
  )
}

interface FooterProps { t: Translations }

function Footer({ t }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <img src="logo.png" alt="EarBridge" className="h-6 w-auto brightness-200 opacity-70" width="80" height="24" />
        <p>{t.footer.tagline}</p>
        <a href={`mailto:${t.footer.email}`} className="hover:text-white transition-colors">
          {t.footer.email}
        </a>
      </div>
    </footer>
  )
}

// ── Landing Page ─────────────────────────────────────────────────────────────

interface LandingPageProps {
  lang: Lang
  onToggleLang: () => void
}

function LandingPage({ lang, onToggleLang }: LandingPageProps) {
  const t = translations[lang]
  return (
    <div className="min-h-screen flex flex-col" lang={lang}>
      <Navbar t={t} lang={lang} onToggleLang={onToggleLang} />
      <main>
        <Hero t={t} />
        <HowItWorks t={t} />
        <Benefits t={t} />
        <PlatformPreview t={t} />
        <SocialProof t={t} />
        <FinalCTA t={t} />
      </main>
      <Footer t={t} />
    </div>
  )
}

// ── Routing shell ─────────────────────────────────────────────────────────────

export default function App() {
  const [lang, setLang] = useState<Lang>('en')
  const toggleLang = () => setLang(l => (l === 'en' ? 'it' : 'en'))

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage lang={lang} onToggleLang={toggleLang} />} />
        <Route path="/test" element={<ScreenTest lang={lang} onToggleLang={toggleLang} />} />
        <Route path="/bookings" element={<ScreenBookings lang={lang} onToggleLang={toggleLang} />} />
        <Route path="/reports" element={<ScreenReports lang={lang} onToggleLang={toggleLang} />} />
      </Routes>
    </>
  )
}
