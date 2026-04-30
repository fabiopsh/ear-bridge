import { useState } from 'react'
import MockupLayout from '../components/MockupLayout'
import { type Lang } from '../i18n'

interface Props {
  lang: Lang
  onToggleLang: () => void
}

type Status = 'confirmed' | 'pending' | 'cancelled'
type FilterType = 'all' | Status

interface Appointment {
  id: number
  day: string
  dayLabel: { en: string; it: string }
  date: string
  time: string
  patient: string
  type: { en: string; it: string }
  location: string
  status: Status
}

const appointments: Appointment[] = [
  { id: 1, day: 'Mon', dayLabel: { en: 'Monday', it: 'Lunedì' }, date: '28 Apr', time: '09:30', patient: 'Anna Rossi', type: { en: 'First visit', it: 'Prima visita' }, location: 'Home · Pisa', status: 'confirmed' },
  { id: 2, day: 'Mon', dayLabel: { en: 'Monday', it: 'Lunedì' }, date: '28 Apr', time: '11:00', patient: 'Carlo Verdi', type: { en: 'Follow-up', it: 'Controllo' }, location: 'Home · Empoli', status: 'pending' },
  { id: 3, day: 'Tue', dayLabel: { en: 'Tuesday', it: 'Martedì' }, date: '29 Apr', time: '10:00', patient: 'Maria Neri', type: { en: 'Hearing test', it: 'Audiometria' }, location: 'Home · Pisa', status: 'confirmed' },
  { id: 4, day: 'Wed', dayLabel: { en: 'Wednesday', it: 'Mercoledì' }, date: '30 Apr', time: '14:30', patient: 'Giuseppe Bianchi', type: { en: 'Device fitting', it: 'Applicazione protesi' }, location: 'Home · Livorno', status: 'confirmed' },
  { id: 5, day: 'Thu', dayLabel: { en: 'Thursday', it: 'Giovedì' }, date: '1 May', time: '09:00', patient: 'Elena Romano', type: { en: 'First visit', it: 'Prima visita' }, location: 'Home · Pisa', status: 'cancelled' },
  { id: 6, day: 'Fri', dayLabel: { en: 'Friday', it: 'Venerdì' }, date: '2 May', time: '15:00', patient: 'Roberto Conti', type: { en: 'Follow-up', it: 'Controllo' }, location: 'Home · Empoli', status: 'pending' },
]

const days = [
  { key: 'Mon', en: 'Mon', it: 'Lun', date: '28 Apr' },
  { key: 'Tue', en: 'Tue', it: 'Mar', date: '29 Apr' },
  { key: 'Wed', en: 'Wed', it: 'Mer', date: '30 Apr' },
  { key: 'Thu', en: 'Thu', it: 'Gio', date: '1 May' },
  { key: 'Fri', en: 'Fri', it: 'Ven', date: '2 May' },
]

const statusConfig: Record<Status, { bg: string; text: string; border: string; label: { en: string; it: string } }> = {
  confirmed: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-400', label: { en: 'Confirmed', it: 'Confermato' } },
  pending: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-400', label: { en: 'Pending', it: 'In attesa' } },
  cancelled: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-400', label: { en: 'Cancelled', it: 'Cancellato' } },
}

function IconMapPin() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="w-3.5 h-3.5">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

function AppointmentCard({ appt, isIt }: { appt: Appointment; isIt: boolean }) {
  const cfg = statusConfig[appt.status]
  return (
    <div className={`rounded-xl border-l-4 ${cfg.border} bg-white shadow-sm p-3 mb-2`}>
      <div className="flex items-start justify-between gap-2 mb-1">
        <span className="font-bold text-navy text-sm leading-tight">{appt.patient}</span>
        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text} flex-shrink-0`}>
          {isIt ? cfg.label.it : cfg.label.en}
        </span>
      </div>
      <p className="text-xs text-gray-500 mb-1.5">
        {isIt ? appt.type.it : appt.type.en}
      </p>
      <div className="flex items-center gap-1 text-xs text-gray-400 mb-2">
        <IconMapPin />
        {appt.location}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-sky-brand">{appt.time}</span>
        <div className="flex gap-1">
          <button className="w-7 h-7 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors flex items-center justify-center" title="Confirm">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="w-7 h-7 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors flex items-center justify-center" title="Reschedule">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
          <button className="w-7 h-7 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors flex items-center justify-center" title="Cancel">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ScreenBookings({ lang, onToggleLang }: Props) {
  const [filter, setFilter] = useState<FilterType>('all')
  const isIt = lang === 'it'

  const filtered = filter === 'all' ? appointments : appointments.filter(a => a.status === filter)

  const filters: { key: FilterType; en: string; it: string }[] = [
    { key: 'all', en: 'All', it: 'Tutti' },
    { key: 'confirmed', en: 'Confirmed', it: 'Confermati' },
    { key: 'pending', en: 'Pending', it: 'In attesa' },
    { key: 'cancelled', en: 'Cancelled', it: 'Cancellati' },
  ]

  return (
    <MockupLayout lang={lang} onToggleLang={onToggleLang}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <p className="text-sky-brand text-sm font-semibold uppercase tracking-widest mb-1">
            {isIt ? 'Gestione Prenotazioni' : 'Booking Management'}
          </p>
          <h1 className="text-2xl md:text-3xl font-extrabold text-navy">
            {isIt ? 'Agenda settimanale' : 'Weekly Schedule'}
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-navy/10 flex items-center justify-center text-navy font-bold text-lg flex-shrink-0">
                  MB
                </div>
                <div>
                  <p className="font-bold text-navy text-sm leading-tight">Dr. Marco Bianchi</p>
                  <p className="text-xs text-gray-400">{isIt ? 'Audiometrista Cert.' : 'Certified Audiologist'}</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { value: '12', label: { en: 'This week', it: 'Questa settimana' } },
                  { value: '3', label: { en: 'Pending', it: 'In attesa' } },
                  { value: '28', label: { en: 'This month', it: 'Questo mese' } },
                ].map(stat => (
                  <div key={stat.value} className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">{isIt ? stat.label.it : stat.label.en}</span>
                    <span className="font-bold text-navy">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                {isIt ? 'Filtra' : 'Filter'}
              </p>
              <div className="space-y-1">
                {filters.map(f => (
                  <button
                    key={f.key}
                    onClick={() => setFilter(f.key)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      filter === f.key
                        ? 'bg-navy text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {isIt ? f.it : f.en}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Calendar grid — desktop */}
          <div className="flex-1 hidden md:block">
            <div className="grid grid-cols-5 gap-3">
              {days.map(day => {
                const dayAppts = filtered.filter(a => a.day === day.key)
                return (
                  <div key={day.key}>
                    <div className="text-center mb-3">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                        {isIt ? day.it : day.en}
                      </p>
                      <p className="text-xs text-gray-400">{day.date}</p>
                    </div>
                    <div className="min-h-24">
                      {dayAppts.length === 0 ? (
                        <div className="rounded-xl border-2 border-dashed border-gray-100 h-16 flex items-center justify-center text-xs text-gray-300">
                          {isIt ? 'Libero' : 'Free'}
                        </div>
                      ) : (
                        dayAppts.map(a => <AppointmentCard key={a.id} appt={a} isIt={isIt} />)
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* List view — mobile */}
          <div className="flex-1 md:hidden">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              {isIt ? 'Appuntamenti' : 'Appointments'}
            </p>
            {filtered.length === 0 ? (
              <p className="text-gray-400 text-sm">{isIt ? 'Nessun appuntamento.' : 'No appointments.'}</p>
            ) : (
              filtered.map(a => (
                <div key={a.id} className="mb-3">
                  <p className="text-xs text-gray-400 mb-1">
                    {isIt ? a.dayLabel.it : a.dayLabel.en} · {a.date}
                  </p>
                  <AppointmentCard appt={a} isIt={isIt} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </MockupLayout>
  )
}
