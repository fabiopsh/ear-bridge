export type Lang = 'en' | 'it'

export interface Translations {
  nav: {
    cta: string
  }
  hero: {
    badge: string
    headline: string
    subheadline: string
    cta: string
    disclaimer: string
  }
  how: {
    title: string
    subtitle: string
    steps: Array<{ title: string; description: string }>
  }
  benefits: {
    title: string
    subtitle: string
    cards: Array<{ title: string; description: string }>
  }
  proof: {
    quote: string
    author: string
    location: string
    launchNote: string
    quoteDisclaimer: string
  }
  finalCta: {
    eyebrow: string
    title: string
    body: string
    cta: string
    disclaimer: string
  }
  footer: {
    tagline: string
    email: string
  }
}

const en: Translations = {
  nav: {
    cta: 'Book now',
  },
  hero: {
    badge: 'Now available in Pisa & Empoli',
    headline: "Your father can't hear well.\nAnd he won't go anywhere.",
    subheadline:
      'EarBridge brings a certified audiologist directly to your door. You book online, the specialist comes to you. No waiting, no hassle.',
    cta: 'Book a home visit \u2192',
    disclaimer: 'Free and no commitment. We reply within 24 hours.',
  },
  how: {
    title: 'How it works',
    subtitle: 'Three steps, from booking to visit.',
    steps: [
      {
        title: 'Find a specialist',
        description:
          'Browse available audiologists in your area, with verified credentials.',
      },
      {
        title: 'Book online',
        description:
          'Choose a date and time in minutes \u2014 even from your smartphone.',
      },
      {
        title: 'The specialist comes to you',
        description:
          'The professional arrives with certified equipment. The patient stays home.',
      },
    ],
  },
  benefits: {
    title: 'Why choose EarBridge',
    subtitle: 'Built for those who care for someone who needs help.',
    cards: [
      {
        title: 'No travel for the patient',
        description:
          'Your loved one stays in a familiar environment. Less resistance, more peace of mind for the whole family.',
      },
      {
        title: 'Certified professionals',
        description:
          'Every audiologist is verified and registered with professional boards. Clinical quality, guaranteed \u2014 even at home.',
      },
      {
        title: 'Easy to book',
        description:
          "You handle the booking, even from your phone. The patient doesn't need to know how to use the internet.",
      },
    ],
  },
  proof: {
    quote:
      '\u201cMy father had refused to go to the clinic for years. He always said he was fine. With the home visit, he agreed straight away \u2014 no arguments, no stress.\u201d',
    author: 'Giulia, 47',
    location: 'Pisa',
    launchNote:
      'We are launching in Pisa and Empoli \u2014 first spots are limited.',
    quoteDisclaimer:
      'Representative quote based on experiences gathered during our research phase.',
  },
  finalCta: {
    eyebrow: "You're among the first",
    title: 'Book the first\nhome visit',
    body: "Leave your details: we'll get back to you within 24 hours to find the nearest specialist together.",
    cta: 'Leave your details \u2192',
    disclaimer: 'No spam. Just confirmation of your visit.',
  },
  footer: {
    tagline: '\u00a9 2026 EarBridge \u00b7 Early-stage project',
    email: 'info@earbridge.it',
  },
}

const it: Translations = {
  nav: {
    cta: 'Prenota ora',
  },
  hero: {
    badge: 'Ora disponibile a Pisa e Empoli',
    headline: 'Tuo padre non sente bene.\nE non vuole andare da nessuna parte.',
    subheadline:
      "EarBridge porta l'audiometrista direttamente a casa sua. Tu prenoti online, il professionista arriva. Zero attese, zero stress.",
    cta: 'Prenota una visita a domicilio \u2192',
    disclaimer: 'Gratuito e senza impegno. Rispondiamo entro 24 ore.',
  },
  how: {
    title: 'Come funziona',
    subtitle: 'In tre passi, dalla prenotazione alla visita.',
    steps: [
      {
        title: 'Trova il professionista',
        description:
          "Cerca l'audiometrista disponibile nella tua zona, con le sue credenziali verificate.",
      },
      {
        title: 'Prenota online',
        description:
          'Scegli data e ora in pochi minuti, anche dal tuo smartphone.',
      },
      {
        title: 'Il tecnico viene a casa',
        description:
          "Il professionista arriva con l'attrezzatura certificata. Il paziente non si muove.",
      },
    ],
  },
  benefits: {
    title: 'Perché scegliere EarBridge',
    subtitle: 'Pensato per chi ama qualcuno che ha bisogno di aiuto.',
    cards: [
      {
        title: 'Nessun viaggio per il paziente',
        description:
          "L'anziano resta a casa sua, in un ambiente familiare. Meno resistenza, più serenità per tutta la famiglia.",
      },
      {
        title: 'Professionisti certificati',
        description:
          'Ogni audiometrista è verificato e iscritto agli albi professionali. Qualità clinica garantita, anche a domicilio.',
      },
      {
        title: 'Semplice da prenotare',
        description:
          'La prenotazione la fai tu, anche da smartphone. Non serve che il paziente sappia usare internet.',
      },
    ],
  },
  proof: {
    quote:
      '\u201cMio padre si era rifiutato di andare in studio per anni. Diceva sempre che stava bene. Con la visita a casa ha accettato subito \u2014 senza discussioni, senza stress.\u201d',
    author: 'Giulia, 47 anni',
    location: 'Pisa',
    launchNote:
      'Siamo in fase di lancio a Pisa e Empoli \u2014 i primi posti sono limitati.',
    quoteDisclaimer:
      'Citazione rappresentativa di esperienze raccolte durante la fase di ricerca.',
  },
  finalCta: {
    eyebrow: 'Sei tra i primi',
    title: 'Prenota la prima visita\na domicilio',
    body: 'Lascia i tuoi dati: ti ricontattiamo entro 24 ore per trovare insieme il professionista più vicino a te.',
    cta: 'Lascia i tuoi dati \u2192',
    disclaimer: 'Nessuno spam. Solo la conferma della tua visita.',
  },
  footer: {
    tagline: '\u00a9 2026 EarBridge \u00b7 Progetto in fase pretotyping',
    email: 'info@earbridge.it',
  },
}

export const translations: Record<Lang, Translations> = { en, it }
