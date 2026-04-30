import { useState } from 'react'
import MockupLayout from '../components/MockupLayout'
import { type Lang } from '../i18n'

const FORM_URL = 'https://forms.gle/akaJ5u8PPrLsB6386'

interface Props {
  lang: Lang
  onToggleLang: () => void
}

type Step = 1 | 2 | 3 | 4

const ageRanges = ['< 40', '40–60', '60–75', '75+']
const concerns = [
  { en: 'Difficulty hearing in noise', it: 'Difficoltà a sentire in ambienti rumorosi' },
  { en: 'Tinnitus / ringing', it: 'Acufeni / ronzio' },
  { en: 'General hearing loss', it: 'Perdita uditiva generale' },
  { en: 'Other', it: 'Altro' },
]

const symptomQuestions = [
  { en: 'Hearing in noisy environments', it: 'Sentire in ambienti rumorosi' },
  { en: 'Following a conversation', it: 'Seguire una conversazione' },
  { en: 'TV volume comfort level', it: 'Volume TV adeguato' },
  { en: 'Tinnitus / ringing frequency', it: 'Frequenza di acufeni / ronzio' },
  { en: 'Ear pressure or pain', it: 'Pressione o dolore alle orecchie' },
]

const mockToneLog = [
  { freq: '500 Hz', ok: true },
  { freq: '1000 Hz', ok: true },
  { freq: '2000 Hz', ok: true },
]

function StepIndicator({ step }: { step: Step }) {
  const steps = [1, 2, 3, 4] as const
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((s, i) => {
        const done = s < step
        const active = s === step
        return (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                done
                  ? 'bg-sky-brand text-white'
                  : active
                  ? 'bg-navy text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              {done ? (
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : s}
            </div>
            {i < steps.length - 1 && (
              <div className={`w-8 h-0.5 ${s < step ? 'bg-sky-brand' : 'bg-gray-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function ScreenTest({ lang, onToggleLang }: Props) {
  const [step, setStep] = useState<Step>(1)
  const [selectedAge, setSelectedAge] = useState<string | null>(null)
  const [selectedConcern, setSelectedConcern] = useState<string | null>(null)
  const [symptoms, setSymptoms] = useState<number[]>([3, 3, 3, 3, 3])
  const [toneCount, setToneCount] = useState(3)

  const isIt = lang === 'it'

  const handleToneClick = () => {
    const next = toneCount + 1
    setToneCount(next)
    if (next >= 5) {
      setTimeout(() => setStep(4), 400)
    }
  }

  return (
    <MockupLayout lang={lang} onToggleLang={onToggleLang}>
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="text-center mb-6">
          <p className="text-sky-brand text-sm font-semibold uppercase tracking-widest mb-1">
            {isIt ? 'Screening Audiologico Gratuito' : 'Free Audiological Screening'}
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy">
            {isIt ? 'Test preliminare' : 'Preliminary Test'}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
          <StepIndicator step={step} />

          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-navy mb-1">
                {isIt ? 'Raccontaci di te' : 'Tell us about yourself'}
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                {isIt ? 'Seleziona la tua fascia d\'età e il motivo principale.' : 'Select your age range and main concern.'}
              </p>

              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  {isIt ? 'Fascia d\'età' : 'Age range'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {ageRanges.map(a => (
                    <button
                      key={a}
                      onClick={() => setSelectedAge(a)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                        selectedAge === a
                          ? 'bg-navy text-white border-navy'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-navy hover:text-navy'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  {isIt ? 'Motivo principale' : 'Main concern'}
                </p>
                <div className="flex flex-wrap gap-2">
                  {concerns.map(c => {
                    const label = isIt ? c.it : c.en
                    return (
                      <button
                        key={c.en}
                        onClick={() => setSelectedConcern(c.en)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                          selectedConcern === c.en
                            ? 'bg-sky-brand text-white border-sky-brand'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-sky-brand hover:text-sky-brand'
                        }`}
                      >
                        {label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="btn-primary w-full"
              >
                {isIt ? 'Avanti →' : 'Next →'}
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-navy mb-1">
                {isIt ? 'Questionario sintomi' : 'Symptom questionnaire'}
              </h2>
              <p className="text-gray-500 text-sm mb-6">
                {isIt ? 'Valuta da 1 (nessun problema) a 5 (problema grave).' : 'Rate from 1 (no problem) to 5 (severe problem).'}
              </p>

              <div className="space-y-5 mb-8">
                {symptomQuestions.map((q, i) => (
                  <div key={i}>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      {isIt ? q.it : q.en}
                    </p>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map(v => (
                        <button
                          key={v}
                          onClick={() => setSymptoms(prev => { const next = [...prev]; next[i] = v; return next })}
                          className={`w-10 h-10 rounded-full text-sm font-bold border-2 transition-colors ${
                            symptoms[i] === v
                              ? 'bg-navy text-white border-navy'
                              : 'bg-white text-gray-500 border-gray-200 hover:border-navy hover:text-navy'
                          }`}
                        >
                          {v}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:border-navy hover:text-navy transition-colors">
                  {isIt ? '← Indietro' : '← Back'}
                </button>
                <button onClick={() => setStep(3)} className="flex-1 btn-primary">
                  {isIt ? 'Avanti →' : 'Next →'}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              <h2 className="text-xl font-bold text-navy mb-1">
                {isIt ? 'Test tonale simulato' : 'Simulated Tone Test'}
              </h2>
              <p className="text-gray-400 text-sm mb-2">
                {isIt ? '(Solo a scopo dimostrativo)' : '(For demonstration purposes only)'}
              </p>
              <p className="text-gray-600 text-sm mb-8">
                {isIt ? 'Premi il pulsante quando senti il tono.' : 'Press the button when you hear the tone.'}
              </p>

              <div className="flex justify-center mb-6">
                <button
                  onClick={handleToneClick}
                  className="relative w-32 h-32 rounded-full focus:outline-none"
                >
                  <span className="absolute inset-0 rounded-full bg-sky-brand/20 animate-ping" />
                  <span className="relative flex items-center justify-center w-32 h-32 rounded-full bg-navy text-white font-bold text-lg shadow-lg hover:bg-navy-light transition-colors">
                    {isIt ? 'Sento' : 'Hear'}
                  </span>
                </button>
              </div>

              <p className="text-navy font-semibold text-lg mb-1">1000 Hz</p>
              <p className="text-gray-400 text-xs mb-6">{toneCount} / 5 {isIt ? 'toni registrati' : 'tones recorded'}</p>

              <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                  {isIt ? 'Log risposte' : 'Response log'}
                </p>
                {mockToneLog.map((entry, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-500 flex-shrink-0">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    {entry.freq}
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:border-navy hover:text-navy transition-colors">
                  {isIt ? '← Indietro' : '← Back'}
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div className="rounded-xl bg-gradient-to-r from-sky-brand to-navy text-white p-6 text-center mb-6">
                <p className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-1">
                  {isIt ? 'Screening completato' : 'Screening Complete'}
                </p>
                <h2 className="text-xl font-extrabold">
                  {isIt ? 'Risultati preliminari' : 'Preliminary Results'}
                </h2>
              </div>

              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  {isIt ? 'Livello uditivo stimato' : 'Estimated hearing level'}
                </p>
                <div className="relative h-6 rounded-full bg-gray-100 overflow-hidden mb-1">
                  <div className="absolute inset-y-0 left-0 w-1/3 bg-green-400 rounded-l-full" />
                  <div className="absolute inset-y-0 left-1/3 w-1/3 bg-amber-400" />
                  <div className="absolute inset-y-0 left-2/3 w-1/3 bg-red-400 rounded-r-full" />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-navy rounded-full border-2 border-white shadow"
                    style={{ left: 'calc(45% - 8px)' }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 px-1">
                  <span>{isIt ? 'Normale' : 'Normal'}</span>
                  <span>{isIt ? 'Lieve' : 'Mild'}</span>
                  <span>{isIt ? 'Significativo' : 'Significant'}</span>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                {[
                  isIt
                    ? 'Possibile lieve perdita uditiva in frequenze medio-alte'
                    : 'Possible mild hearing loss in mid-to-high frequencies',
                  isIt
                    ? 'Episodi di acufeni segnalati — approfondimento consigliato'
                    : 'Tinnitus episodes reported — further assessment advised',
                  isIt
                    ? 'Raccomandato: visita audiologica specialistica a domicilio'
                    : 'Recommended: specialist home audiology visit',
                ].map((finding, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-gray-700">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-sky-brand flex-shrink-0 mt-0.5">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {finding}
                  </div>
                ))}
              </div>

              <a href={FORM_URL} className="btn-primary-lg block text-center mb-4">
                {isIt ? 'Prenota la visita specialistica gratuita →' : 'Book your free specialist visit →'}
              </a>
              <p className="text-xs text-gray-400 text-center">
                {isIt
                  ? 'Questo è uno strumento di screening preliminare. I risultati non costituiscono una diagnosi clinica.'
                  : 'This is a preliminary screening tool. Results are not a clinical diagnosis.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </MockupLayout>
  )
}
