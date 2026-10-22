// Language-independent data (links, stacks, colors, layout). All copy lives in
// src/i18n/locales/* keyed by the ids below.

export const CONTACT = {
  email: 'jpbusinesss@hotmail.com',
  linkedin: 'https://linkedin.com/in/joaopedrosoaresfigueiredo',
  github: 'https://github.com/Jpsoaresfig',
  // One PDF per site language, exported from the CV .docx (ES original, PT/EN translated).
  cv: { en: '/cv/Joao_Pedro_Soares_CV_EN.pdf', es: '/cv/Joao_Pedro_Soares_CV_ES.pdf', pt: '/cv/Joao_Pedro_Soares_CV_PT.pdf' },
}

export const SECTION_IDS = ['film', 'about', 'experience', 'tech', 'projects', 'recommendations', 'connect']

// Presentation film on YouTube: one upload per site language (subtitles burned in), rendered by video/producao.
// Chapter times and duration come from data/film-chapters.json, written by video/producao/web.py.
export const FILM = {
  youtube: { en: 'jLjVc3n6Iwo', es: 'WX88JmUlHGw', pt: '-LHqy9Rsh0M' },
  poster: '/video/from-problems-to-software-poster-en.jpg',
}

export const HERO_STACK = ['Java', 'Spring Boot', 'TypeScript', 'React', 'Node.js', 'Python']

export const HERO_STATS = ['3+', '4', '3']

// Same order as LinkedIn. Copy for each entry lives in the locales under the same id.
export const EXPERIENCES = [
  { id: 'inovatec', company: 'INOVATEC-JP', stack: ['Java', 'Spring Boot', 'Docker', 'Oracle APEX', 'BIRT', 'JasperReports', 'ClickUp', 'OutSystems'] },
  { id: 'ousepassar', company: 'Ouse Passar', stack: ['React', 'TypeScript', 'Capacitor', 'Supabase', 'PostgreSQL', 'OpenAI', 'Gemini', 'n8n', 'Nginx', 'RevenueCat', 'Hotmart'] },
  { id: 'sicredi-dev', company: 'Sicredi Evolução', stack: ['JavaScript', 'PHP', 'Python', 'MySQL', 'UiPath', 'Orchestrator (Cloud)', 'CI/CD'] },
  { id: 'sicredi-support', company: 'Sicredi Evolução', stack: ['Windows', 'Linux', 'Redes', 'Suporte Técnico'] },
  { id: 'devdynamos', company: 'Dev Dynamos', stack: ['Java', 'JavaScript', 'PHP', 'MySQL', 'Vue', 'React', 'Docker', 'Figma', 'Jira'] },
]

// Soft skills, each backed by a photo in public/softskills (<id>.jpg 4:3 thumb, <id>-full.jpg).
// Copy lives in the locales under about.softSkills.items[id].
export const SOFT_SKILLS = ['teamwork', 'communication', 'collaboration', 'learning', 'growth', 'community']

export const SKILL_GROUPS = [
  { id: 'backend', color: '#6db33f', skills: ['Java', 'Spring Boot', 'Node.js', 'Python', 'PHP', 'C#', '.NET (VB.NET)', 'REST APIs'] },
  { id: 'frontend', color: '#61dafb', skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'React Native', 'Capacitor', 'HTML5 / CSS3', 'Tailwind CSS'] },
  { id: 'data', color: '#f89820', skills: ['PostgreSQL', 'MySQL', 'Oracle', 'Supabase', 'Firebase', 'Docker', 'AWS', 'GCP', 'Vercel', 'Nginx', 'CI/CD'] },
  { id: 'ai', color: '#c084fc', skills: ['OpenAI', 'Gemini', 'n8n', 'AI Agents', 'UiPath', 'RPA', 'Orchestrator'] },
  { id: 'enterprise', color: '#3fb6ff', skills: ['Oracle APEX', 'OutSystems', 'BIRT', 'JasperReports', 'Pentaho', 'Power BI'] },
  { id: 'tools', color: '#8b9cff', skills: ['Git', 'GitHub', 'GitLab', 'JUnit', 'Clean Code', 'LGPD / GDPR', 'Scrum', 'Kanban', 'Jira', 'Confluence', 'ClickUp', 'Figma'] },
]

/* Each featured project is a star in the constellation. x/y are % positions in the map. */
export const PROJECTS = [
  {
    id: 'codigodavida',
    shot: '/projects/codigodavida.webp',
    title: 'Código da Vida',
    stack: ['React', 'TypeScript', 'Capacitor', 'Supabase', 'OpenAI', 'Gemini', 'n8n', 'RevenueCat'],
    demo: 'https://appcodigodavida.com.br/portal',
    color: '#FF8C3A',
    star: { x: 22, y: 30 },
  },
  {
    id: 'ousepassar',
    shot: '/projects/ousepassar.webp',
    title: 'Ouse Passar',
    stack: ['React', 'Java', 'Spring Boot', 'IA', 'PostgreSQL'],
    demo: 'https://app.ousepassar.com.br/',
    color: '#61dafb',
    star: { x: 50, y: 68 },
  },
  {
    id: 'shark',
    shot: '/projects/shark.webp',
    title: 'Shark Smokehouse',
    stack: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind v4', 'Firebase', 'Mercado Pago', 'Zustand', 'Cloudinary', 'Vitest'],
    link: 'https://github.com/Jpsoaresfig/Shark_SmokeHouse',
    demo: 'https://shark-smoke-house.vercel.app',
    color: '#7ed957',
    star: { x: 76, y: 26 },
  },
]

export const OPEN_SOURCE = [
  // `wide` spans both grid columns.
  { id: 'tcc', title: 'Spring Boot vs Quarkus', link: 'https://github.com/TCC-Jv-Jp-Luiz', stack: ['Java 17 / 21', 'Spring Boot', 'Quarkus', 'PostgreSQL', 'Kubernetes (GKE)', 'JMeter', 'Terraform'], wide: true },
  { id: 'apex', title: 'APEX Print Server (BIRT)', link: 'https://github.com/Jpsoaresfig/apex-print-server-birt', stack: ['Java', 'BIRT', 'Maven', 'Docker'] },
  // Title comes from the locale (projects.allRepos).
  { id: 'all', title: null, link: 'https://github.com/Jpsoaresfig', stack: ['@Jpsoaresfig'] },
]

export const RECOMMENDATIONS = [
  { id: 'carlos', name: 'Carlos Rufino', linkedin: 'https://www.linkedin.com/in/carlos-rufino-b2b650197/', role: 'Automation & RPA Developer · Sicredi Evolução', letter: '/cv/Carta_Recomendacao_Carlos_Rufino.pdf' },
  { id: 'monalisa', name: 'Monalisa Silva', linkedin: 'https://www.linkedin.com/in/monalisa-ellen-silva-0b99442b3/', role: 'Systems Developer · Oracle APEX · PL/SQL' },
  { id: 'miqueias', name: 'Miquéias Soares', linkedin: 'https://www.linkedin.com/in/mq-soares/', role: 'PHP · Laravel · JS · TypeScript · Vue.js' },
  { id: 'odenir', name: 'Odenir Gomes da Silva Filho', linkedin: 'https://www.linkedin.com/in/odenirdev/', role: 'Evaluator · Dev Dynamos', evaluation: '/recommendations/feedback-devdynamos.jpg' },
  { id: 'luiz', name: 'Luiz Filipe', linkedin: 'https://www.linkedin.com/in/luiz-filipe-293865206/', role: 'Backend · Java · Spring Boot · SQL' },
]
