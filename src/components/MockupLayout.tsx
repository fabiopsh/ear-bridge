import { Link } from 'react-router-dom'
import { translations, type Lang } from '../i18n'

interface LangToggleProps {
  lang: Lang
  onToggle: () => void
}

export function LangToggle({ lang, onToggle }: LangToggleProps) {
  const isEn = lang === 'en'
  return (
    <button
      onClick={onToggle}
      aria-label={isEn ? 'Switch to Italian' : "Passa all'inglese"}
      className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-navy transition-colors px-2 py-1 rounded-lg hover:bg-gray-100"
    >
      <span className={isEn ? 'text-navy font-bold' : 'text-gray-400'}>EN</span>
      <span className="text-gray-300 select-none">|</span>
      <span className={!isEn ? 'text-navy font-bold' : 'text-gray-400'}>IT</span>
    </button>
  )
}

interface MockupLayoutProps {
  lang: Lang
  onToggleLang: () => void
  children: React.ReactNode
}

export default function MockupLayout({ lang, onToggleLang, children }: MockupLayoutProps) {
  const t = translations[lang]

  return (
    <div className="min-h-screen flex flex-col" lang={lang}>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/">
            <img src="logo.png" alt="EarBridge" className="h-9 w-auto" width="160" height="36" />
          </Link>
          <div className="flex items-center gap-3">
            <LangToggle lang={lang} onToggle={onToggleLang} />
            <Link
              to="/"
              className="text-sm font-medium text-navy hover:text-navy-dark transition-colors px-3 py-2 rounded-lg hover:bg-gray-100"
            >
              {t.platformPreview.backLabel}
            </Link>
          </div>
        </div>
        <div className="bg-sky-brand/10 border-b border-sky-brand/20 py-1.5 text-center">
          <span className="text-xs font-semibold text-sky-brand tracking-wide uppercase">
            {t.platformPreview.badge}
          </span>
        </div>
      </header>
      <main className="flex-1 bg-gray-50">
        {children}
      </main>
    </div>
  )
}
