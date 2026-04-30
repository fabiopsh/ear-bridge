import MockupLayout from '../components/MockupLayout'
import { type Lang } from '../i18n'

interface Props {
  lang: Lang
  onToggleLang: () => void
}

// Audiogram data — typical mild-moderate presbycusis
const freqs = [250, 500, 1000, 2000, 4000, 8000]
const rightEar = [20, 25, 35, 45, 60, 70]
const leftEar = [22, 28, 38, 48, 63, 72]

// Chart dimensions
const W = 560
const H = 260
const PAD = { top: 20, right: 20, bottom: 36, left: 44 }
const chartW = W - PAD.left - PAD.right
const chartH = H - PAD.top - PAD.bottom

const DB_MIN = -10
const DB_MAX = 90
const DB_RANGE = DB_MAX - DB_MIN

function dbToY(db: number) {
  return PAD.top + ((db - DB_MIN) / DB_RANGE) * chartH
}
function freqToX(i: number) {
  return PAD.left + (i / (freqs.length - 1)) * chartW
}

function Audiogram({ isIt }: { isIt: boolean }) {
  const rightPoints = rightEar.map((db, i) => `${freqToX(i)},${dbToY(db)}`).join(' ')
  const leftPoints = leftEar.map((db, i) => `${freqToX(i)},${dbToY(db)}`).join(' ')

  const normalTop = dbToY(-10)
  const normalBottom = dbToY(25)

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-full"
        style={{ minWidth: 320 }}
        aria-label={isIt ? 'Audiogramma' : 'Audiogram'}
      >
        {/* Normal hearing band */}
        <rect
          x={PAD.left}
          y={normalTop}
          width={chartW}
          height={normalBottom - normalTop}
          fill="#d1fae5"
          opacity={0.6}
        />

        {/* Grid lines every 20 dB */}
        {[-10, 10, 30, 50, 70, 90].map(db => (
          <g key={db}>
            <line
              x1={PAD.left}
              y1={dbToY(db)}
              x2={PAD.left + chartW}
              y2={dbToY(db)}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
            <text
              x={PAD.left - 6}
              y={dbToY(db) + 4}
              textAnchor="end"
              fontSize="10"
              fill="#9ca3af"
            >
              {db}
            </text>
          </g>
        ))}

        {/* Y-axis label */}
        <text
          x={10}
          y={PAD.top + chartH / 2}
          textAnchor="middle"
          fontSize="9"
          fill="#6b7280"
          transform={`rotate(-90, 10, ${PAD.top + chartH / 2})`}
        >
          dB HL
        </text>

        {/* X-axis freq labels */}
        {freqs.map((f, i) => (
          <text
            key={f}
            x={freqToX(i)}
            y={PAD.top + chartH + 20}
            textAnchor="middle"
            fontSize="10"
            fill="#6b7280"
          >
            {f < 1000 ? f : `${f / 1000}k`}
          </text>
        ))}

        {/* X-axis label */}
        <text
          x={PAD.left + chartW / 2}
          y={H - 2}
          textAnchor="middle"
          fontSize="9"
          fill="#6b7280"
        >
          Hz
        </text>

        {/* Connecting lines */}
        <polyline points={rightPoints} fill="none" stroke="#ef4444" strokeWidth="1.5" opacity="0.7" />
        <polyline points={leftPoints} fill="none" stroke="#3b82f6" strokeWidth="1.5" opacity="0.7" />

        {/* Right ear circles */}
        {rightEar.map((db, i) => (
          <circle key={i} cx={freqToX(i)} cy={dbToY(db)} r="5" fill="white" stroke="#ef4444" strokeWidth="2" />
        ))}

        {/* Left ear X marks */}
        {leftEar.map((db, i) => {
          const cx = freqToX(i)
          const cy = dbToY(db)
          const s = 4
          return (
            <g key={i}>
              <line x1={cx - s} y1={cy - s} x2={cx + s} y2={cy + s} stroke="#3b82f6" strokeWidth="2" />
              <line x1={cx + s} y1={cy - s} x2={cx - s} y2={cy + s} stroke="#3b82f6" strokeWidth="2" />
            </g>
          )
        })}
      </svg>

      {/* Legend */}
      <div className="flex gap-6 justify-center mt-2 text-xs text-gray-600">
        <div className="flex items-center gap-1.5">
          <svg width="16" height="16" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="5" fill="white" stroke="#ef4444" strokeWidth="2" />
          </svg>
          <span>{isIt ? 'Orecchio destro (O)' : 'Right ear (O)'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="16" height="16" viewBox="0 0 16 16">
            <line x1="4" y1="4" x2="12" y2="12" stroke="#3b82f6" strokeWidth="2" />
            <line x1="12" y1="4" x2="4" y2="12" stroke="#3b82f6" strokeWidth="2" />
          </svg>
          <span>{isIt ? 'Orecchio sinistro (X)' : 'Left ear (X)'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-green-200 opacity-60" />
          <span>{isIt ? 'Udito normale' : 'Normal hearing'}</span>
        </div>
      </div>
    </div>
  )
}

function BreadcrumbStep({ label, active }: { label: string; active: boolean }) {
  return (
    <span className={`text-xs font-semibold ${active ? 'text-navy' : 'text-gray-400'}`}>
      {label}
    </span>
  )
}

export default function ScreenReports({ lang, onToggleLang }: Props) {
  const isIt = lang === 'it'

  const breadcrumbs = isIt
    ? ['Profilo Paziente', 'Audiogramma', 'Referto', 'Ricevuta']
    : ['Patient Profile', 'Audiogram', 'Report', 'Receipt']

  return (
    <MockupLayout lang={lang} onToggleLang={onToggleLang}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-sky-brand text-sm font-semibold uppercase tracking-widest mb-1">
            {isIt ? 'Dati Paziente & Report' : 'Patient Data & Reports'}
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy mb-4">
            {isIt ? 'Riepilogo visita' : 'Visit Summary'}
          </h1>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 flex-wrap">
            {breadcrumbs.map((b, i) => (
              <div key={b} className="flex items-center gap-2">
                <BreadcrumbStep label={b} active />
                {i < breadcrumbs.length - 1 && (
                  <span className="text-gray-300 text-xs">→</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Patient Profile */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-bold text-navy mb-4">
              {isIt ? 'Profilo Paziente' : 'Patient Profile'}
            </h2>
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-navy/10 flex items-center justify-center text-navy font-bold text-lg flex-shrink-0">
                FE
              </div>
              <div className="flex-1">
                <p className="font-bold text-navy text-lg">Franco Esposito</p>
                <p className="text-gray-500 text-sm mb-3">
                  {isIt ? 'Età 72 · Pisa · Nato il 15/03/1953' : 'Age 72 · Pisa · DOB 15/03/1953'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { en: 'Presbycusis risk', it: 'Rischio presbioacusia' },
                    { en: 'Tinnitus reported', it: 'Acufeni segnalati' },
                    { en: 'First visit: 22 Apr 2026', it: 'Prima visita: 22 Apr 2026' },
                  ].map(tag => (
                    <span key={tag.en} className="text-xs font-medium px-3 py-1 rounded-full bg-navy/5 text-navy">
                      {isIt ? tag.it : tag.en}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-50 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-gray-400 text-xs uppercase tracking-wide">{isIt ? 'Medico curante' : 'GP'}</span>
                <p className="text-gray-700 font-medium">Dr. Laura Conti</p>
              </div>
              <div>
                <span className="text-gray-400 text-xs uppercase tracking-wide">{isIt ? 'Nota referente' : 'Referral note'}</span>
                <p className="text-gray-700 font-medium">{isIt ? 'Controllo preventivo annuale' : 'Annual preventive check'}</p>
              </div>
            </div>
          </section>

          {/* Audiogram */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-bold text-navy mb-4">
              {isIt ? 'Audiogramma' : 'Audiogram'}
            </h2>
            <Audiogram isIt={isIt} />
            <p className="text-xs text-gray-400 text-center mt-3">
              {isIt
                ? 'Audiogramma · Orecchio destro e sinistro · EarBridge Platform (mockup)'
                : 'Audiogram · Right and left ear · EarBridge Platform (mockup)'}
            </p>
          </section>

          {/* Medical Report */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-base font-bold text-navy mb-4">
              {isIt ? 'Referto Medico' : 'Medical Report'}
            </h2>
            <div className="relative border border-gray-200 rounded-xl p-6">
              {/* DRAFT watermark */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden rounded-xl"
                aria-hidden="true"
              >
                <span
                  className="text-6xl font-extrabold text-gray-100 tracking-widest"
                  style={{ transform: 'rotate(-20deg)' }}
                >
                  DRAFT
                </span>
              </div>

              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-widest">{isIt ? 'REFERTO MEDICO' : 'MEDICAL REPORT'}</p>
                  <p className="font-bold text-navy">EarBridge</p>
                </div>
                <p className="text-xs text-gray-400">22/04/2026 · #EB-2026-0441</p>
              </div>

              <div className="space-y-3 text-sm relative">
                {[
                  { label: isIt ? 'Paziente' : 'Patient', value: 'Franco Esposito · 72 anni · Pisa' },
                  { label: isIt ? 'Specialista' : 'Specialist', value: 'Dr. Marco Bianchi, Audiometrista cert.' },
                  { label: isIt ? 'Data visita' : 'Visit date', value: '22 Aprile 2026' },
                  {
                    label: isIt ? 'Risultati' : 'Findings',
                    value: isIt
                      ? 'L\'esame audiometrico tonale evidenzia una perdita uditiva lieve-moderata bilaterale, più marcata nelle frequenze medio-alte (2–8 kHz), compatibile con un quadro di presbioacusia. Presente rinforzo di mascheramento nelle frequenze acute.'
                      : 'Tonal audiometric examination reveals mild-to-moderate bilateral hearing loss, more pronounced in mid-to-high frequencies (2–8 kHz), consistent with presbycusis. Masking reinforcement present in high-frequency range.',
                  },
                  {
                    label: isIt ? 'Raccomandazioni' : 'Recommendations',
                    value: isIt
                      ? 'Si consiglia valutazione protesica e follow-up audiologico a 6 mesi. Rivalutazione ORL consigliata in caso di peggioramento sintomatologico.'
                      : 'Hearing aid evaluation and audiological follow-up at 6 months recommended. ENT reassessment advised if symptoms worsen.',
                  },
                ].map(row => (
                  <div key={row.label} className="grid grid-cols-3 gap-2">
                    <span className="text-gray-400 font-medium col-span-1">{row.label}</span>
                    <span className="text-gray-700 col-span-2">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Receipt */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-navy">
                {isIt ? 'Ricevuta Fiscale' : 'Receipt'}
              </h2>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-50 text-green-700">
                {isIt ? 'Pagato' : 'Paid'}
              </span>
            </div>

            <div className="space-y-2 mb-4 text-sm">
              {[
                { desc: isIt ? 'Visita audiologica a domicilio' : 'Home audiology visit', qty: 1, price: '€ 120,00' },
                { desc: isIt ? 'Analisi audiogramma' : 'Audiogram analysis', qty: 1, price: '€ 45,00' },
                { desc: isIt ? 'Supplemento spostamento' : 'Travel supplement', qty: 1, price: '€ 15,00' },
              ].map(row => (
                <div key={row.desc} className="grid grid-cols-12 gap-2 py-2 border-b border-gray-50">
                  <span className="col-span-7 text-gray-700">{row.desc}</span>
                  <span className="col-span-2 text-gray-400 text-center">{row.qty}</span>
                  <span className="col-span-3 text-right font-medium text-navy">{row.price}</span>
                </div>
              ))}
            </div>

            <div className="space-y-1 text-sm pt-2">
              <div className="flex justify-between text-gray-500">
                <span>{isIt ? 'Subtotale' : 'Subtotal'}</span>
                <span>€ 180,00</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>IVA 22%</span>
                <span>€ 39,60</span>
              </div>
              <div className="flex justify-between font-bold text-navy text-base pt-2 border-t border-gray-100">
                <span>Totale</span>
                <span>€ 219,60</span>
              </div>
            </div>
          </section>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pb-8">
            <button
              onClick={() => alert(isIt ? 'Mockup — Download PDF non disponibile in anteprima' : 'Mockup — PDF download not available in preview')}
              className="btn-primary flex items-center justify-center gap-2 flex-1"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              {isIt ? 'Scarica PDF' : 'Download PDF'}
            </button>
            <button
              onClick={() => alert(isIt ? 'Mockup — Invio al paziente non disponibile in anteprima' : 'Mockup — Send to patient not available in preview')}
              className="flex-1 py-3 px-6 rounded-xl border-2 border-navy text-navy font-semibold hover:bg-navy hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              {isIt ? 'Invia al paziente' : 'Send to patient'}
            </button>
          </div>
        </div>
      </div>
    </MockupLayout>
  )
}
