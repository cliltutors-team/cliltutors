import type { Course } from "../types";

export const courses: Course[] = [
  {
    id: "eng-business-b2",
    title: {
      en: "Business English B2",
      es: "Inglés de Negocios B2",
      pt: "Inglês de Negócios B2",
    },
    description: {
      en: "Master professional communication in English. Presentations, negotiations, email writing, and cross-cultural business interactions.",
      es: "Domina la comunicación profesional en inglés. Presentaciones, negociaciones, redacción de correos y relaciones interculturales de negocios.",
      pt: "Domine a comunicação profissional em inglês. Apresentações, negociações, redação de e-mails e interações empresariais interculturais.",
    },
    thumbnail: "/images/courses/business-english.webp",
    instructor: { id: "maria", name: "Maria Soledad" },
    level: "B2",
    language: "English",
    category: "Business",
    totalLessons: 24,
    estimatedHours: 36,
    enrolledCount: 1248,
    rating: 4.8,
    isFeatured: true,
    modules: [
      {
        id: "m1",
        title: { en: "Professional Introductions", es: "Presentaciones Profesionales", pt: "Apresentações Profissionais" },
        lessons: [
          { id: "l1", title: { en: "First Impressions in Business", es: "Primeras Impresiones en Negocios", pt: "Primeiras Impressões nos Negócios" }, duration: 18, type: "video" },
          { id: "l2", title: { en: "Elevator Pitch Mastery", es: "Dominio del Elevator Pitch", pt: "Dominando o Elevator Pitch" }, duration: 22, type: "video" },
          { id: "l3", title: { en: "Networking Conversations", es: "Conversaciones de Networking", pt: "Conversas de Networking" }, duration: 15, type: "video" },
          { id: "l4", title: { en: "Module 1 Quiz", es: "Quiz del Módulo 1", pt: "Quiz do Módulo 1" }, duration: 10, type: "quiz" },
        ],
      },
      {
        id: "m2",
        title: { en: "Email & Written Communication", es: "Correo y Comunicación Escrita", pt: "E-mail e Comunicação Escrita" },
        lessons: [
          { id: "l5", title: { en: "Professional Email Structure", es: "Estructura de Email Profesional", pt: "Estrutura de E-mail Profissional" }, duration: 20, type: "video" },
          { id: "l6", title: { en: "Formal vs Informal Tone", es: "Tono Formal vs Informal", pt: "Tom Formal vs Informal" }, duration: 16, type: "video" },
          { id: "l7", title: { en: "Writing Practice", es: "Práctica de Escritura", pt: "Prática de Escrita" }, duration: 25, type: "exercise" },
        ],
      },
      {
        id: "m3",
        title: { en: "Presentations & Public Speaking", es: "Presentaciones y Oratoria", pt: "Apresentações e Oratória" },
        lessons: [
          { id: "l8", title: { en: "Structuring a Presentation", es: "Estructurando una Presentación", pt: "Estruturando uma Apresentação" }, duration: 22, type: "video" },
          { id: "l9", title: { en: "Engaging Your Audience", es: "Captando a tu Audiencia", pt: "Engajando seu Público" }, duration: 18, type: "video" },
          { id: "l10", title: { en: "Handling Q&A Sessions", es: "Manejando Sesiones de Preguntas", pt: "Gerenciando Sessões de Perguntas" }, duration: 15, type: "video" },
        ],
      },
    ],
  },
  {
    id: "spa-conversation-a2",
    title: {
      en: "Spanish Conversation A2",
      es: "Conversación en Español A2",
      pt: "Conversação em Espanhol A2",
    },
    description: {
      en: "Build everyday conversational fluency in Spanish. Practice real-life scenarios from ordering food to making appointments.",
      es: "Desarrolla fluidez conversacional cotidiana en español. Practica escenarios reales desde pedir comida hasta hacer citas.",
      pt: "Desenvolva fluência conversacional cotidiana em espanhol. Pratique cenários reais, de pedir comida a marcar compromissos.",
    },
    thumbnail: "/images/courses/spanish-conversation.webp",
    instructor: { id: "carlos", name: "Carlos Mendez" },
    level: "A2",
    language: "Spanish",
    category: "Conversation",
    totalLessons: 18,
    estimatedHours: 24,
    enrolledCount: 892,
    rating: 4.9,
    isNew: true,
    modules: [
      {
        id: "m1",
        title: { en: "Daily Life", es: "Vida Diaria", pt: "Vida Diária" },
        lessons: [
          { id: "l1", title: { en: "Greetings & Small Talk", es: "Saludos y Charla Casual", pt: "Saudações e Conversa Casual" }, duration: 15, type: "video", isPreview: true },
          { id: "l2", title: { en: "At the Restaurant", es: "En el Restaurante", pt: "No Restaurante" }, duration: 18, type: "video" },
          { id: "l3", title: { en: "Shopping & Directions", es: "Compras y Direcciones", pt: "Compras e Direções" }, duration: 20, type: "video" },
        ],
      },
      {
        id: "m2",
        title: { en: "Social Situations", es: "Situaciones Sociales", pt: "Situações Sociais" },
        lessons: [
          { id: "l4", title: { en: "Making Plans with Friends", es: "Haciendo Planes con Amigos", pt: "Fazendo Planos com Amigos" }, duration: 16, type: "video" },
          { id: "l5", title: { en: "Phone Conversations", es: "Conversaciones Telefónicas", pt: "Conversas Telefônicas" }, duration: 14, type: "video" },
          { id: "l6", title: { en: "Role-play Practice", es: "Práctica de Role-play", pt: "Prática de Role-play" }, duration: 20, type: "exercise" },
        ],
      },
    ],
  },
  {
    id: "por-academic-b1",
    title: {
      en: "Academic Portuguese B1",
      es: "Portugués Académico B1",
      pt: "Português Acadêmico B1",
    },
    description: {
      en: "Prepare for academic success in Portuguese-speaking environments. Academic writing, research presentations, and scholarly discussions.",
      es: "Prepárate para el éxito académico en entornos lusófonos. Escritura académica, presentaciones de investigación y debates académicos.",
      pt: "Prepare-se para o sucesso acadêmico em ambientes lusófonos. Escrita acadêmica, apresentações de pesquisa e debates acadêmicos.",
    },
    thumbnail: "/images/courses/academic-portuguese.webp",
    instructor: { id: "ana", name: "Ana Beatriz" },
    level: "B1",
    language: "Portuguese",
    category: "Academic",
    totalLessons: 20,
    estimatedHours: 30,
    enrolledCount: 456,
    rating: 4.7,
    modules: [
      {
        id: "m1",
        title: { en: "Academic Writing Basics", es: "Bases de Escritura Académica", pt: "Bases da Escrita Acadêmica" },
        lessons: [
          { id: "l1", title: { en: "Essay Structure", es: "Estructura de Ensayo", pt: "Estrutura de Redação" }, duration: 22, type: "video" },
          { id: "l2", title: { en: "Citation & References", es: "Citación y Referencias", pt: "Citação e Referências" }, duration: 18, type: "video" },
          { id: "l3", title: { en: "Writing Practice", es: "Práctica de Escritura", pt: "Prática de Escrita" }, duration: 30, type: "exercise" },
        ],
      },
    ],
  },
  {
    id: "eng-clil-certification",
    title: {
      en: "CLIL Teaching Certification",
      es: "Certificación de Enseñanza CLIL",
      pt: "Certificação de Ensino CLIL",
    },
    description: {
      en: "Master the Content and Language Integrated Learning methodology. Learn to design, deliver, and assess CLIL lessons effectively.",
      es: "Domina la metodología CLIL. Aprende a diseñar, impartir y evaluar lecciones CLIL de manera efectiva.",
      pt: "Domine a metodologia CLIL. Aprenda a projetar, ministrar e avaliar aulas CLIL de forma eficaz.",
    },
    thumbnail: "/images/courses/clil-certification.webp",
    instructor: { id: "james", name: "James O'Brien" },
    level: "C1",
    language: "English",
    category: "CLIL",
    totalLessons: 32,
    estimatedHours: 48,
    enrolledCount: 673,
    rating: 4.9,
    isFeatured: true,
    modules: [
      {
        id: "m1",
        title: { en: "CLIL Foundations", es: "Fundamentos CLIL", pt: "Fundamentos CLIL" },
        lessons: [
          { id: "l1", title: { en: "What is CLIL?", es: "¿Qué es CLIL?", pt: "O que é CLIL?" }, duration: 20, type: "video", isPreview: true },
          { id: "l2", title: { en: "The 4Cs Framework", es: "El Marco de las 4C", pt: "O Framework das 4Cs" }, duration: 25, type: "video" },
          { id: "l3", title: { en: "CLIL vs Traditional Methods", es: "CLIL vs Métodos Tradicionales", pt: "CLIL vs Métodos Tradicionais" }, duration: 18, type: "video" },
          { id: "l4", title: { en: "Reading: Research on CLIL", es: "Lectura: Investigación sobre CLIL", pt: "Leitura: Pesquisa sobre CLIL" }, duration: 15, type: "reading" },
        ],
      },
      {
        id: "m2",
        title: { en: "Designing CLIL Lessons", es: "Diseño de Lecciones CLIL", pt: "Projetando Aulas CLIL" },
        lessons: [
          { id: "l5", title: { en: "Lesson Planning Template", es: "Plantilla de Planificación", pt: "Modelo de Planejamento" }, duration: 22, type: "video" },
          { id: "l6", title: { en: "Scaffolding Techniques", es: "Técnicas de Scaffolding", pt: "Técnicas de Scaffolding" }, duration: 20, type: "video" },
        ],
      },
    ],
  },
  {
    id: "spa-business-b1",
    title: {
      en: "Business Spanish B1",
      es: "Español de Negocios B1",
      pt: "Espanhol de Negócios B1",
    },
    description: {
      en: "Navigate the Spanish-speaking business world with confidence. Meetings, calls, reports, and cross-border negotiations.",
      es: "Navega el mundo empresarial hispanohablante con confianza. Reuniones, llamadas, informes y negociaciones transfronterizas.",
      pt: "Navegue pelo mundo empresarial hispanófono com confiança. Reuniões, chamadas, relatórios e negociações transfronteiriças.",
    },
    thumbnail: "/images/courses/business-spanish.webp",
    instructor: { id: "lucia", name: "Lucia Torres" },
    level: "B1",
    language: "Spanish",
    category: "Business",
    totalLessons: 22,
    estimatedHours: 33,
    enrolledCount: 564,
    rating: 4.6,
    modules: [
      {
        id: "m1",
        title: { en: "Business Meetings", es: "Reuniones de Negocios", pt: "Reuniões de Negócios" },
        lessons: [
          { id: "l1", title: { en: "Meeting Vocabulary", es: "Vocabulario de Reuniones", pt: "Vocabulário de Reuniões" }, duration: 16, type: "video" },
          { id: "l2", title: { en: "Leading a Meeting", es: "Liderar una Reunión", pt: "Conduzindo uma Reunião" }, duration: 20, type: "video" },
        ],
      },
    ],
  },
  {
    id: "eng-academic-c1",
    title: {
      en: "Academic English C1",
      es: "Inglés Académico C1",
      pt: "Inglês Acadêmico C1",
    },
    description: {
      en: "Excel in English-medium academic environments. Research writing, conference presentations, and scholarly debate at an advanced level.",
      es: "Destaca en ambientes académicos en inglés. Escritura de investigación, presentaciones en conferencias y debate académico a nivel avanzado.",
      pt: "Destaque-se em ambientes acadêmicos em inglês. Escrita de pesquisa, apresentações em conferências e debate acadêmico em nível avançado.",
    },
    thumbnail: "/images/courses/academic-english.webp",
    instructor: { id: "maria", name: "Maria Soledad" },
    level: "C1",
    language: "English",
    category: "Academic",
    totalLessons: 28,
    estimatedHours: 42,
    enrolledCount: 389,
    rating: 4.8,
    isNew: true,
    modules: [
      {
        id: "m1",
        title: { en: "Research Writing", es: "Escritura de Investigación", pt: "Escrita de Pesquisa" },
        lessons: [
          { id: "l1", title: { en: "Abstract Writing", es: "Escritura de Resúmenes", pt: "Escrita de Resumos" }, duration: 20, type: "video" },
          { id: "l2", title: { en: "Literature Review Techniques", es: "Técnicas de Revisión Bibliográfica", pt: "Técnicas de Revisão Bibliográfica" }, duration: 25, type: "video" },
        ],
      },
    ],
  },
];

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getFeaturedCourses(): Course[] {
  return courses.filter((c) => c.isFeatured);
}

export function getNewCourses(): Course[] {
  return courses.filter((c) => c.isNew);
}
