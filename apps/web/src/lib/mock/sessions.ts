import type { Session, BookedSession } from "../types";

/** Generate dates relative to "today" (2026-03-15) for realistic scheduling */
const week1 = [
  "2026-03-16", "2026-03-17", "2026-03-18", "2026-03-19", "2026-03-20", "2026-03-21",
];
const week2 = [
  "2026-03-23", "2026-03-24", "2026-03-25", "2026-03-26", "2026-03-27", "2026-03-28",
];

export const sessions: Session[] = [
  // ── Maria Soledad (Business English) ─────────────────
  {
    id: "ses-01",
    instructorId: "maria",
    instructorName: "Maria Soledad",
    title: {
      en: "Business English: Negotiation Skills",
      es: "Inglés de Negocios: Habilidades de Negociación",
      pt: "Inglês de Negócios: Habilidades de Negociação",
    },
    description: {
      en: "Practice negotiation phrases, persuasion techniques, and closing strategies in a professional English context.",
      es: "Practica frases de negociación, técnicas de persuasión y estrategias de cierre en un contexto profesional en inglés.",
      pt: "Pratique frases de negociação, técnicas de persuasão e estratégias de fechamento em um contexto profissional em inglês.",
    },
    date: week1[0],
    startTime: "09:00",
    endTime: "09:50",
    durationMinutes: 50,
    type: "group",
    languageFocus: "English",
    level: "B2",
    maxParticipants: 8,
    enrolledCount: 5,
    price: 15,
    status: "available",
    tags: ["Negotiation", "Business"],
  },
  {
    id: "ses-02",
    instructorId: "maria",
    instructorName: "Maria Soledad",
    title: {
      en: "Email Writing Masterclass",
      es: "Masterclass de Redacción de Emails",
      pt: "Masterclass de Redação de E-mails",
    },
    description: {
      en: "Learn to write professional emails that get results. Subject lines, tone, calls to action, and common pitfalls.",
      es: "Aprende a escribir emails profesionales que obtienen resultados.",
      pt: "Aprenda a escrever e-mails profissionais que obtêm resultados.",
    },
    date: week1[2],
    startTime: "10:00",
    endTime: "10:50",
    durationMinutes: 50,
    type: "group",
    languageFocus: "English",
    level: "B1",
    maxParticipants: 10,
    enrolledCount: 7,
    price: 12,
    status: "available",
    tags: ["Writing", "Business"],
  },
  {
    id: "ses-03",
    instructorId: "maria",
    instructorName: "Maria Soledad",
    title: {
      en: "1-on-1: Business English Coaching",
      es: "1-a-1: Coaching de Inglés de Negocios",
      pt: "1-a-1: Coaching de Inglês de Negócios",
    },
    description: {
      en: "Personalized coaching session focused on your specific business communication needs.",
      es: "Sesión de coaching personalizada enfocada en tus necesidades de comunicación empresarial.",
      pt: "Sessão de coaching personalizada focada nas suas necessidades de comunicação empresarial.",
    },
    date: week1[3],
    startTime: "14:00",
    endTime: "14:50",
    durationMinutes: 50,
    type: "1on1",
    languageFocus: "English",
    level: "All",
    maxParticipants: 1,
    enrolledCount: 0,
    price: 35,
    status: "available",
    tags: ["Coaching", "Business"],
  },
  {
    id: "ses-04",
    instructorId: "maria",
    instructorName: "Maria Soledad",
    title: {
      en: "1-on-1: Business English Coaching",
      es: "1-a-1: Coaching de Inglés de Negocios",
      pt: "1-a-1: Coaching de Inglês de Negócios",
    },
    description: {
      en: "Personalized coaching session focused on your specific business communication needs.",
      es: "Sesión de coaching personalizada.",
      pt: "Sessão de coaching personalizada.",
    },
    date: week2[1],
    startTime: "14:00",
    endTime: "14:50",
    durationMinutes: 50,
    type: "1on1",
    languageFocus: "English",
    level: "All",
    maxParticipants: 1,
    enrolledCount: 0,
    price: 35,
    status: "available",
    tags: ["Coaching", "Business"],
  },

  // ── Carlos Mendez (Spanish Conversation) ────────────
  {
    id: "ses-05",
    instructorId: "carlos",
    instructorName: "Carlos Mendez",
    title: {
      en: "Spanish Conversation: Daily Life",
      es: "Conversación en Español: Vida Cotidiana",
      pt: "Conversação em Espanhol: Vida Cotidiana",
    },
    description: {
      en: "Practice everyday Spanish through role-plays: ordering food, asking for directions, making appointments.",
      es: "Practica español cotidiano a través de juegos de rol.",
      pt: "Pratique espanhol cotidiano através de encenações.",
    },
    date: week1[1],
    startTime: "11:00",
    endTime: "11:50",
    durationMinutes: 50,
    type: "group",
    languageFocus: "Spanish",
    level: "A2",
    maxParticipants: 6,
    enrolledCount: 4,
    price: 10,
    status: "available",
    tags: ["Conversation", "Daily Life"],
  },
  {
    id: "ses-06",
    instructorId: "carlos",
    instructorName: "Carlos Mendez",
    title: {
      en: "Spanish Conversation: Travel & Culture",
      es: "Conversación en Español: Viajes y Cultura",
      pt: "Conversação em Espanhol: Viagens e Cultura",
    },
    description: {
      en: "Explore travel vocabulary and cultural nuances of Spanish-speaking countries.",
      es: "Explora vocabulario de viajes y matices culturales de países hispanohablantes.",
      pt: "Explore vocabulário de viagens e nuances culturais de países hispanofalantes.",
    },
    date: week1[4],
    startTime: "15:00",
    endTime: "15:50",
    durationMinutes: 50,
    type: "group",
    languageFocus: "Spanish",
    level: "B1",
    maxParticipants: 8,
    enrolledCount: 2,
    price: 10,
    status: "available",
    tags: ["Culture", "Travel"],
  },
  {
    id: "ses-07",
    instructorId: "carlos",
    instructorName: "Carlos Mendez",
    title: {
      en: "Free Trial: Spanish Conversation",
      es: "Prueba Gratis: Conversación en Español",
      pt: "Teste Grátis: Conversação em Espanhol",
    },
    description: {
      en: "A free 25-minute introductory session to experience our conversational Spanish methodology.",
      es: "Sesión introductoria gratuita de 25 minutos para experimentar nuestra metodología.",
      pt: "Sessão introdutória gratuita de 25 minutos para experimentar nossa metodologia.",
    },
    date: week2[0],
    startTime: "10:00",
    endTime: "10:25",
    durationMinutes: 25,
    type: "trial",
    languageFocus: "Spanish",
    level: "All",
    maxParticipants: 1,
    enrolledCount: 0,
    price: 0,
    status: "available",
    tags: ["Trial", "Conversation"],
  },

  // ── Ana Beatriz (Portuguese) ────────────────────────
  {
    id: "ses-08",
    instructorId: "ana",
    instructorName: "Ana Beatriz",
    title: {
      en: "Academic Portuguese: Essay Structure",
      es: "Portugués Académico: Estructura de Ensayos",
      pt: "Português Acadêmico: Estrutura de Redação",
    },
    description: {
      en: "Learn the fundamentals of academic essay writing in Portuguese: thesis statements, argumentation, and citations.",
      es: "Aprende los fundamentos de la escritura académica en portugués.",
      pt: "Aprenda os fundamentos da escrita acadêmica em português.",
    },
    date: week1[2],
    startTime: "16:00",
    endTime: "16:50",
    durationMinutes: 50,
    type: "group",
    languageFocus: "Portuguese",
    level: "B1",
    maxParticipants: 6,
    enrolledCount: 3,
    price: 12,
    status: "available",
    tags: ["Academic", "Writing"],
  },
  {
    id: "ses-09",
    instructorId: "ana",
    instructorName: "Ana Beatriz",
    title: {
      en: "1-on-1: Portuguese Pronunciation",
      es: "1-a-1: Pronunciación en Portugués",
      pt: "1-a-1: Pronúncia em Português",
    },
    description: {
      en: "Focused pronunciation coaching for Brazilian Portuguese, covering sounds unique to the language.",
      es: "Coaching de pronunciación para portugués brasileño.",
      pt: "Coaching de pronúncia para português brasileiro.",
    },
    date: week1[4],
    startTime: "09:00",
    endTime: "09:25",
    durationMinutes: 25,
    type: "1on1",
    languageFocus: "Portuguese",
    level: "All",
    maxParticipants: 1,
    enrolledCount: 0,
    price: 25,
    status: "available",
    tags: ["Pronunciation", "Coaching"],
  },
  {
    id: "ses-10",
    instructorId: "ana",
    instructorName: "Ana Beatriz",
    title: {
      en: "Free Trial: Portuguese for Beginners",
      es: "Prueba Gratis: Portugués para Principiantes",
      pt: "Teste Grátis: Português para Iniciantes",
    },
    description: {
      en: "A complimentary 25-minute session to assess your Portuguese level and discuss your learning goals.",
      es: "Sesión complementaria de 25 minutos para evaluar tu nivel.",
      pt: "Sessão complementar de 25 minutos para avaliar seu nível.",
    },
    date: week2[2],
    startTime: "11:00",
    endTime: "11:25",
    durationMinutes: 25,
    type: "trial",
    languageFocus: "Portuguese",
    level: "All",
    maxParticipants: 1,
    enrolledCount: 0,
    price: 0,
    status: "available",
    tags: ["Trial", "Assessment"],
  },

  // ── James O'Brien (CLIL / English) ──────────────────
  {
    id: "ses-11",
    instructorId: "james",
    instructorName: "James O'Brien",
    title: {
      en: "CLIL Methodology Workshop",
      es: "Taller de Metodología CLIL",
      pt: "Workshop de Metodologia CLIL",
    },
    description: {
      en: "Interactive workshop on Content and Language Integrated Learning. Perfect for teachers wanting to implement CLIL.",
      es: "Taller interactivo sobre Aprendizaje Integrado de Contenidos y Lenguas.",
      pt: "Workshop interativo sobre Aprendizagem Integrada de Conteúdo e Língua.",
    },
    date: week1[3],
    startTime: "16:00",
    endTime: "16:50",
    durationMinutes: 50,
    type: "group",
    languageFocus: "English",
    level: "B2",
    maxParticipants: 12,
    enrolledCount: 8,
    price: 15,
    status: "available",
    tags: ["CLIL", "Methodology", "Teacher Training"],
  },
  {
    id: "ses-12",
    instructorId: "james",
    instructorName: "James O'Brien",
    title: {
      en: "1-on-1: CLIL Lesson Planning",
      es: "1-a-1: Planificación de Clases CLIL",
      pt: "1-a-1: Planejamento de Aulas CLIL",
    },
    description: {
      en: "Get expert feedback on your CLIL lesson plans. Bring your materials for a hands-on review.",
      es: "Obtén retroalimentación experta sobre tus planes de clase CLIL.",
      pt: "Obtenha feedback especializado sobre seus planos de aula CLIL.",
    },
    date: week2[3],
    startTime: "10:00",
    endTime: "10:50",
    durationMinutes: 50,
    type: "1on1",
    languageFocus: "English",
    level: "All",
    maxParticipants: 1,
    enrolledCount: 0,
    price: 40,
    status: "available",
    tags: ["CLIL", "Lesson Planning"],
  },

  // ── Lucia Torres (Business Spanish) ─────────────────
  {
    id: "ses-13",
    instructorId: "lucia",
    instructorName: "Lucia Torres",
    title: {
      en: "Business Spanish: Presentations",
      es: "Español de Negocios: Presentaciones",
      pt: "Espanhol de Negócios: Apresentações",
    },
    description: {
      en: "Learn to deliver compelling presentations in Spanish. Structure, visual aids, and Q&A handling.",
      es: "Aprende a dar presentaciones convincentes en español.",
      pt: "Aprenda a fazer apresentações convincentes em espanhol.",
    },
    date: week1[1],
    startTime: "14:00",
    endTime: "14:50",
    durationMinutes: 50,
    type: "group",
    languageFocus: "Spanish",
    level: "B2",
    maxParticipants: 8,
    enrolledCount: 3,
    price: 15,
    status: "available",
    tags: ["Business", "Presentations"],
  },
  {
    id: "ses-14",
    instructorId: "lucia",
    instructorName: "Lucia Torres",
    title: {
      en: "1-on-1: Spanish for Interviews",
      es: "1-a-1: Español para Entrevistas",
      pt: "1-a-1: Espanhol para Entrevistas",
    },
    description: {
      en: "Prepare for job interviews in Spanish. Practice common questions, professional vocabulary, and confident delivery.",
      es: "Prepárate para entrevistas de trabajo en español.",
      pt: "Prepare-se para entrevistas de emprego em espanhol.",
    },
    date: week2[0],
    startTime: "15:00",
    endTime: "15:50",
    durationMinutes: 50,
    type: "1on1",
    languageFocus: "Spanish",
    level: "B1",
    maxParticipants: 1,
    enrolledCount: 0,
    price: 30,
    status: "available",
    tags: ["Business", "Interviews"],
  },
  {
    id: "ses-15",
    instructorId: "lucia",
    instructorName: "Lucia Torres",
    title: {
      en: "Free Trial: Business Spanish",
      es: "Prueba Gratis: Español de Negocios",
      pt: "Teste Grátis: Espanhol de Negócios",
    },
    description: {
      en: "Complimentary 25-minute session to experience our Business Spanish methodology.",
      es: "Sesión complementaria de 25 minutos para probar nuestra metodología.",
      pt: "Sessão complementar de 25 minutos para experimentar nossa metodologia.",
    },
    date: week1[5],
    startTime: "10:00",
    endTime: "10:25",
    durationMinutes: 25,
    type: "trial",
    languageFocus: "Spanish",
    level: "All",
    maxParticipants: 1,
    enrolledCount: 0,
    price: 0,
    status: "available",
    tags: ["Trial", "Business"],
  },
];

/**
 * Simulate the current user already having booked some sessions.
 * Stored client-side via localStorage, but seeded with defaults.
 */
export const defaultBookedSessions: BookedSession[] = [
  {
    sessionId: "ses-01",
    userId: "gio",
    status: "confirmed",
    bookedAt: "2026-03-14T10:30:00Z",
    notes: "I want to focus on salary negotiation vocabulary",
  },
  {
    sessionId: "ses-05",
    userId: "gio",
    status: "confirmed",
    bookedAt: "2026-03-14T12:00:00Z",
  },
  {
    sessionId: "ses-11",
    userId: "gio",
    status: "confirmed",
    bookedAt: "2026-03-13T09:00:00Z",
    notes: "Bringing my lesson plan draft for Module 3",
  },
];

/** Helper to get sessions for a given instructor */
export function getSessionsByInstructor(instructorId: string): Session[] {
  return sessions.filter((s) => s.instructorId === instructorId);
}

/** Helper to get sessions for a given date */
export function getSessionsByDate(date: string): Session[] {
  return sessions.filter((s) => s.date === date);
}

/** Helper to get sessions by type */
export function getSessionsByType(type: Session["type"]): Session[] {
  return sessions.filter((s) => s.type === type);
}

/** Get all unique dates that have sessions */
export function getSessionDates(): string[] {
  return [...new Set(sessions.map((s) => s.date))].sort();
}
