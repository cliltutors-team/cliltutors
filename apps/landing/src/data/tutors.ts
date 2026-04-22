export interface TutorProfile {
  slug: string
  name: string
  photo: string
  languages: string[]
  specialization: string
  specKey: string
  students: string
  rating: string
  bio: Record<string, string>
  approach: Record<string, string>
  credentials: string[]
}

export const tutorProfiles: TutorProfile[] = [
  {
    slug: 'jimmy-ramires',
    name: 'Jimmy Ramires',
    photo: '/images/web/Jimmy.png',
    languages: ['es', 'en'],
    specialization: 'CLIL · Business Communication',
    specKey: 'business',
    students: '1.2k',
    rating: '4.9',
    bio: {
      pt: 'Jimmy é um professor nativo de espanhol com ampla experiência em comunicação corporativa. Especialista em preparar executivos para reuniões internacionais, apresentações e negociações em espanhol e inglês.',
      en: 'Jimmy is a native Spanish teacher with extensive experience in corporate communication. He specializes in preparing executives for international meetings, presentations, and negotiations in Spanish and English.',
      es: 'Jimmy es un profesor nativo de español con amplia experiencia en comunicación corporativa. Especialista en preparar ejecutivos para reuniones internacionales, presentaciones y negociaciones en español e inglés.',
    },
    approach: {
      pt: 'Utiliza o método CLIL para integrar vocabulário de negócios e cenários reais em cada aula. Simulações de reuniões, estudos de caso e role-play garantem fluência prática desde o primeiro encontro.',
      en: 'Uses the CLIL method to integrate business vocabulary and real scenarios into every class. Meeting simulations, case studies, and role-play ensure practical fluency from the very first session.',
      es: 'Utiliza el método CLIL para integrar vocabulario de negocios y escenarios reales en cada clase. Simulaciones de reuniones, estudios de caso y role-play garantizan fluidez práctica desde el primer encuentro.',
    },
    credentials: ['TEFL Certified', 'CLIL Methodology', 'Business English Specialist'],
  },
  {
    slug: 'alissa-lechleitner',
    name: 'Alissa Lechleitner',
    photo: '/images/web/Alissa.png',
    languages: ['en', 'pt'],
    specialization: 'CLIL · Academic Writing',
    specKey: 'academic',
    students: '980',
    rating: '4.8',
    bio: {
      pt: 'Alissa é professora nativa de inglês com especialização em escrita acadêmica. Ajuda estudantes internacionais a dominar ensaios, artigos científicos e dissertações em inglês e português.',
      en: 'Alissa is a native English teacher specializing in academic writing. She helps international students master essays, research papers, and dissertations in English and Portuguese.',
      es: 'Alissa es una profesora nativa de inglés con especialización en escritura académica. Ayuda a estudiantes internacionales a dominar ensayos, artículos científicos y disertaciones en inglés y portugués.',
    },
    approach: {
      pt: 'Combina o CLIL com técnicas de escrita acadêmica, usando textos reais e exemplos de publicações científicas. Feedback detalhado e sessões de revisão estruturada garantem evolução visível.',
      en: 'Combines CLIL with academic writing techniques, using real texts and examples from scientific publications. Detailed feedback and structured revision sessions ensure visible progress.',
      es: 'Combina CLIL con técnicas de escritura académica, usando textos reales y ejemplos de publicaciones científicas. Retroalimentación detallada y sesiones de revisión estructurada garantizan evolución visible.',
    },
    credentials: ['TESOL Certified', 'CLIL Methodology', 'Academic Writing Expert'],
  },
  {
    slug: 'laura-gomes',
    name: 'Laura Gomes',
    photo: '/images/web/Laura.png',
    languages: ['pt', 'en'],
    specialization: 'CLIL · STEM Education',
    specKey: 'stem',
    students: '1.1k',
    rating: '4.9',
    bio: {
      pt: 'Laura é professora nativa de português com formação em ciências exatas. Une o ensino de idiomas ao reforço em Matemática, Física e Química, tornando o aprendizado duplamente eficaz.',
      en: 'Laura is a native Portuguese teacher with a background in STEM. She combines language teaching with reinforcement in Math, Physics, and Chemistry, making learning doubly effective.',
      es: 'Laura es una profesora nativa de portugués con formación en ciencias exactas. Une la enseñanza de idiomas con el refuerzo en Matemáticas, Física y Química, haciendo el aprendizaje doblemente eficaz.',
    },
    approach: {
      pt: 'Integra conceitos de STEM ao ensino de idiomas com o método CLIL. Cada aula explora um tema científico enquanto desenvolve vocabulário e fluência, ideal para estudantes que buscam reforço duplo.',
      en: 'Integrates STEM concepts into language teaching using the CLIL method. Each class explores a scientific theme while developing vocabulary and fluency, ideal for students seeking dual reinforcement.',
      es: 'Integra conceptos de STEM a la enseñanza de idiomas con el método CLIL. Cada clase explora un tema científico mientras desarrolla vocabulario y fluidez, ideal para estudiantes que buscan refuerzo doble.',
    },
    credentials: ['CLIL Methodology', 'STEM Education Specialist', 'Bilingual Education'],
  },
  {
    slug: 'thayline-candatti',
    name: 'Thayline Candatti',
    photo: '/images/web/Thayline.png',
    languages: ['en', 'pt'],
    specialization: 'CLIL · Professional Coaching',
    specKey: 'coaching',
    students: '870',
    rating: '4.9',
    bio: {
      pt: 'Thayline é professora bilíngue e coach profissional. Ajuda alunos a desenvolver habilidades de comunicação e liderança em inglês e português, com foco em progressão de carreira.',
      en: 'Thayline is a bilingual teacher and professional coach. She helps students develop communication and leadership skills in English and Portuguese, with a focus on career progression.',
      es: 'Thayline es una profesora bilingüe y coach profesional. Ayuda a alumnos a desarrollar habilidades de comunicación y liderazgo en inglés y portugués, con enfoque en progresión de carrera.',
    },
    approach: {
      pt: 'Combina coaching profissional ao método CLIL, usando cenários reais de carreira como contexto para o aprendizado de idiomas. Cada aula é um passo em direção aos seus objetivos profissionais.',
      en: 'Combines professional coaching with the CLIL method, using real career scenarios as context for language learning. Each class is a step toward your professional goals.',
      es: 'Combina coaching profesional con el método CLIL, usando escenarios reales de carrera como contexto para el aprendizaje de idiomas. Cada clase es un paso hacia tus objetivos profesionales.',
    },
    credentials: ['Professional Coach Certified', 'CLIL Methodology', 'TEFL Certified'],
  },
  {
    slug: 'xiomara-ramires',
    name: 'Xiomara Ramires',
    photo: '/images/web/Xiomara.png',
    languages: ['es', 'pt'],
    specialization: 'CLIL · Cultural Communication',
    specKey: 'culture',
    students: '760',
    rating: '4.8',
    bio: {
      pt: 'Xiomara é professora nativa de espanhol especializada em comunicação intercultural. Sua abordagem une idioma e cultura, ajudando alunos a navegar contextos multiculturais com confiança.',
      en: 'Xiomara is a native Spanish teacher specializing in cross-cultural communication. Her approach combines language and culture, helping students navigate multicultural contexts with confidence.',
      es: 'Xiomara es una profesora nativa de español especializada en comunicación intercultural. Su enfoque une idioma y cultura, ayudando a alumnos a navegar contextos multiculturales con confianza.',
    },
    approach: {
      pt: 'Usa o método CLIL para explorar aspectos culturais enquanto ensina o idioma. Discussões sobre tradições, costumes e diferenças culturais enriquecem cada aula e preparam para interações globais.',
      en: 'Uses the CLIL method to explore cultural aspects while teaching the language. Discussions about traditions, customs, and cultural differences enrich every class and prepare for global interactions.',
      es: 'Usa el método CLIL para explorar aspectos culturales mientras enseña el idioma. Discusiones sobre tradiciones, costumbres y diferencias culturales enriquecen cada clase y preparan para interacciones globales.',
    },
    credentials: ['CLIL Methodology', 'Intercultural Communication', 'TESOL Certified'],
  },
  {
    slug: 'cristian',
    name: 'Cristian',
    photo: '/images/web/Cristian.png',
    languages: ['es', 'en', 'pt'],
    specialization: 'CLIL · Corporate Training',
    specKey: 'business',
    students: '1.4k',
    rating: '4.9',
    bio: {
      pt: 'Cristian é trilíngue e especialista em treinamento corporativo. Com experiência em três idiomas, prepara equipes e profissionais para ambientes de negócios multilíngues.',
      en: 'Cristian is trilingual and a corporate training specialist. With experience in three languages, he prepares teams and professionals for multilingual business environments.',
      es: 'Cristian es trilingüe y especialista en capacitación corporativa. Con experiencia en tres idiomas, prepara equipos y profesionales para entornos de negocios multilingües.',
    },
    approach: {
      pt: 'Aplica o método CLIL em contextos corporativos, simulando reuniões, e-mails profissionais e negociações em três idiomas. Ideal para profissionais que atuam em mercados internacionais.',
      en: 'Applies the CLIL method in corporate contexts, simulating meetings, professional emails, and negotiations in three languages. Ideal for professionals working in international markets.',
      es: 'Aplica el método CLIL en contextos corporativos, simulando reuniones, correos profesionales y negociaciones en tres idiomas. Ideal para profesionales que actúan en mercados internacionales.',
    },
    credentials: ['CLIL Methodology', 'Corporate Training Specialist', 'TEFL & TESOL Certified'],
  },
]

export function getTutorBySlug(slug: string): TutorProfile | undefined {
  return tutorProfiles.find(t => t.slug === slug)
}
