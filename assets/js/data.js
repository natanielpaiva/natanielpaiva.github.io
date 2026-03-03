/**
 * Site Data - Nataniel Paiva Personal Website
 * Static data structures for the personal portfolio site
 * Based on data-model.md from specs/001-personal-website/
 */

// Profile Data
const profileData = {
  name: "Nataniel Paiva",
  title: "Staff Engineer & Professor & Palestrante",
  description: "Sou Bacharel em Sistemas de Informação, atualmente Staff Engineer no PicPay com uma carreira de mais de 15 anos focada em Desenvolvimento Fullstack e Mobile. Trabalho com diversas tecnologias modernas como Java, Spring, Python, React, Angular e MongoDB. Nas horas vagas, sou professor e instrutor em plataformas EAD, onde já ajudei mais de 55 mil alunos a evoluírem suas carreiras em tecnologia.",
  yearsOfExperience: 16,
  currentPosition: {
    role: "Staff Engineer",
    company: "PicPay",
    companyUrl: "https://picpay.com"
  },
  education: {
    degree: "Bacharel em Sistemas de Informação",
    institution: "Centro Universitário de Desenvolvimento do Centro Oeste"
  },
  photos: {
    hero: "assets/images/hero-photo.png",
    about: "assets/images/about-photo.png",
    favicon: "assets/images/favicon.ico"
  },
  email: "nataniel.paiva@gmail.com",
  tagline: "Transformando ideias em soluções tecnológicas há mais de 16 anos",
  subtitle: "Apaixonado por compartilhar conhecimento e desenvolver pessoas"
};

// Social Links
const socialLinks = [
  {
    platform: "linkedin",
    name: "LinkedIn",
    url: "https://linkedin.com/in/natanielpaiva",
    icon: "fab fa-linkedin",
    color: "#0077B5"
  },
  {
    platform: "github",
    name: "GitHub",
    url: "https://github.com/natanielpaiva",
    icon: "fab fa-github",
    color: "#333333"
  },
  {
    platform: "youtube",
    name: "YouTube",
    url: "https://youtube.com/@NatanielTech",
    icon: "fab fa-youtube",
    color: "#FF0000"
  },
  {
    platform: "udemy",
    name: "Udemy",
    url: "https://www.udemy.com/user/nataniel-paiva/",
    icon: "fas fa-graduation-cap",
    color: "#A435F0"
  },
  {
    platform: "facebook",
    name: "Facebook",
    url: "https://facebook.com/natanielpaiva",
    icon: "fab fa-facebook",
    color: "#1877F2"
  }
];

// Technical Skills
const technicalSkills = [
  // Languages
  { id: "java", name: "Java", category: "language", proficiency: "expert", icon: "assets/images/tech-icons/java.svg" },
  { id: "php", name: "PHP", category: "language", proficiency: "expert", icon: "assets/images/tech-icons/php.svg" },
  { id: "python", name: "Python", category: "language", proficiency: "expert", icon: "assets/images/tech-icons/python.svg" },
  { id: "javascript", name: "JavaScript", category: "language", proficiency: "expert", icon: "assets/images/tech-icons/javascript.svg" },
  { id: "typescript", name: "TypeScript", category: "language", proficiency: "advanced", icon: "assets/images/tech-icons/typescript.svg" },
  
  // Backend Frameworks
  { id: "spring", name: "Spring Framework", category: "framework-backend", proficiency: "expert", icon: "assets/images/tech-icons/spring.png" },
  { id: "laravel", name: "Laravel", category: "framework-backend", proficiency: "expert", icon: "assets/images/tech-icons/laravel.svg" },
  { id: "flask", name: "Flask", category: "framework-backend", proficiency: "advanced", icon: "assets/images/tech-icons/flask.svg" },
  
  // Frontend Frameworks
  { id: "react", name: "React", category: "framework-frontend", proficiency: "expert", icon: "assets/images/tech-icons/react.svg" },
  { id: "angular", name: "Angular", category: "framework-frontend", proficiency: "expert", icon: "assets/images/tech-icons/angular.svg" },
  
  // Mobile
  { id: "react-native", name: "React Native", category: "mobile", proficiency: "expert", icon: "assets/images/tech-icons/react-native.svg" },
  { id: "ionic", name: "Ionic", category: "mobile", proficiency: "advanced", icon: "assets/images/tech-icons/ionic.svg" },
  
  // Databases
  { id: "mongodb", name: "MongoDB", category: "database", proficiency: "expert", icon: "assets/images/tech-icons/mongodb.svg" },
  { id: "mysql", name: "MySQL", category: "database", proficiency: "expert", icon: "assets/images/tech-icons/mysql.svg" },
  { id: "oracle", name: "Oracle", category: "database", proficiency: "advanced", icon: "assets/images/tech-icons/oracle.svg" },
  { id: "cassandra", name: "Cassandra", category: "database", proficiency: "advanced", icon: "assets/images/tech-icons/cassandra.svg" },
  
  // Architecture
  { id: "c4-model", name: "C4 Model", category: "architecture", proficiency: "expert", icon: "assets/images/tech-icons/c4-model.svg" },
  { id: "hexagonal", name: "Hexagonal Architecture", category: "architecture", proficiency: "expert", icon: "assets/images/tech-icons/hexagonal.svg" },
  { id: "microservices", name: "Microservices", category: "architecture", proficiency: "expert", icon: "assets/images/tech-icons/microservices.svg" }
];

// Course Statistics
const courseStats = {
  totalCourses: 17,
  totalStudents: 55541,
  totalReviews: 4480,
  averageRating: 4.4
};

// Featured Courses (Top 6)
const courses = [
  {
    id: "spring-framework-5-spring-boot-2",
    title: "Spring Framework 5 e Spring Boot 2",
    description: "Aprenda Spring Framework 5 e Spring Boot 2 com Wildfly 11, MySql, Web Services, JPA e Hibernate",
    rating: 4.3,
    reviewCount: 725,
    studentCount: null,
    duration: { hours: 7, minutes: 30 },
    level: "all-levels",
    lectureCount: 61,
    price: { current: 49.90, original: 58.90, currency: "BRL" },
    url: "https://www.udemy.com/course/spring-framework-5-spring-boot-2/?referralCode=F6638FB3FF8589B0F1E1",
    thumbnail: "assets/images/courses/spring.png",
    tags: ["Java", "Spring", "Spring Boot", "Wildfly"],
    featured: true
  },
  {
    id: "arquitetura-hexagonal",
    title: "Arquitetura Hexagonal na prática com Spring Boot",
    description: "Domine a Arquitetura Hexagonal (Ports and Adapters) com implementação real",
    rating: 4.5,
    reviewCount: 259,
    studentCount: null,
    duration: { hours: 1, minutes: 0 },
    level: "expert",
    lectureCount: 15,
    price: { current: 49.90, original: 58.90, currency: "BRL" },
    url: "https://www.udemy.com/course/arquitetura-hexagonal-na-pratica/?referralCode=3E0D9C2C0E24508EF1E7",
    thumbnail: "assets/images/courses/hexagonal.png",
    tags: ["Arquitetura", "Spring Boot", "Clean Architecture"],
    featured: true
  },
  {
    id: "c4-model",
    title: "Modelo de arquitetura C4 Model na prática",
    description: "Aprenda a documentar arquitetura de software com C4 Model",
    rating: 3.7,
    reviewCount: 280,
    studentCount: null,
    duration: { hours: 1, minutes: 0 },
    level: "expert",
    lectureCount: 12,
    price: { current: 49.90, original: 58.90, currency: "BRL" },
    url: "https://www.udemy.com/course/modelo-de-arquitetura-c4-model/?referralCode=6AC0232CE59A084BD914",
    thumbnail: "assets/images/courses/c4-model.png",
    tags: ["Arquitetura", "C4 Model", "Documentação"],
    featured: true
  }
];

// YouTube Videos (Manual list - to be updated periodically)
const youtubeVideos = [
  {
    id: "1y5bPYWUifw",
    title: "Como o GitHub Copilot Fez Essa Funcionalidade Inteira em Minutos (React Native + Expo)",
    description: "Como o GitHub Copilot Fez Essa Funcionalidade Inteira em Minutos (React Native + Expo)",
    thumbnail: "https://img.youtube.com/vi/1y5bPYWUifw/maxresdefault.jpg",
    publishedAt: "2023-06-15T10:00:00Z",
    url: "https://youtu.be/1y5bPYWUifw",
    embedUrl: "https://youtu.be/1y5bPYWUifw"
  },
  {
    id: "dcS6iPn4v2Y",
    title: "Não colocar regras na Service te reprovaria em um processo seletivo?",
    description: "Modelo Rico vs. Modelo Anêmico – Você Está Fazendo Certo?",
    thumbnail: "https://img.youtube.com/vi/dcS6iPn4v2Y/maxresdefault.jpg",
    publishedAt: "2023-08-20T14:30:00Z",
    url: "https://www.youtube.com/watch?v=dcS6iPn4v2Y",
    embedUrl: "https://www.youtube.com/watch?v=dcS6iPn4v2Y"
  },
  {
    id: "arA7VUo4Fx0",
    title: "Desenvolva seu pensamento CRÍTICO",
    description: "Desenvolver um pensamento crítico é uma das habilidades mais valiosas para qualquer profissional, especialmente para programadores. ",
    thumbnail: "https://img.youtube.com/vi/arA7VUo4Fx0/maxresdefault.jpg",
    publishedAt: "2023-09-10T16:00:00Z",
    url: "https://www.youtube.com/watch?v=arA7VUo4Fx0",
    embedUrl: "https://www.youtube.com/embed/arA7VUo4Fx0"
  }
];

// YouTube Channel Info
const youtubeChannel = {
  name: "@NatanielTech",
  url: "https://youtube.com/@NatanielTech",
  subscriberCount: null // To be updated if API is integrated
};

// Talks/Speaking Engagements
const talks = [
  {
    id: "talk-1",
    title: "Quando usar a arquitetura hexagonal? ",
    event: "The Developer's Conference 2022",
    date: "2022-06-01",
    location: "Florianópolis, SC",
    description: "Palestra sobre Arquitetura Hexagonal (Ports and Adapters) e seus casos de uso ideais",
    slides: null,
    video: null
  },
  {
    id: "talk-2",
    title: "Design de Código Assistido por IA: Novo Paradigma ou Risco Arquitetural?",
    event: "The Developer's Conference 2025",
    date: "2025-09-17",
    location: "São Paulo, SP",
    description: "Painel com especialistas discutindo como a inteligência artificial está transformando (ou comprometendo) os fundamentos do design de código - desde decisões micro (como nome de métodos ou estrutura de classes) até macroestruturas (designs arquiteturais, DDD, padrões e anti-padrões).",
    slides: null,
    video: null
  }
];

// Talk Topics Available
const talkTopics = [
  {
    id: "topic-1",
    title: "Apache Camel e a Orquestração de Microservices",
    description: "Apache Camel e a Orquestração de Microservices",
    duration: "16 min",
    level: "Intermediate"
  }
];

// Contact Form Configuration
const contactConfig = {
  formspreeEndpoint: "YOUR_FORMSPREE_ENDPOINT_HERE", // To be replaced with actual endpoint
  maxMessageLength: 1000,
  requiredFields: ["name", "email", "message"],
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
};

// Site Configuration
const siteConfig = {
  title: "Nataniel Paiva - Staff Engineer & Professor",
  description: "Site pessoal profissional de Nataniel Paiva - Staff Engineer, Professor e Palestrante. 16+ anos de experiência em desenvolvimento Fullstack e Mobile.",
  keywords: "nataniel paiva, staff engineer, professor, desenvolvedor, spring boot, angular, react, java, php, python, mongodb, cursos udemy, palestras tecnologia",
  author: "Nataniel Paiva",
  url: "https://natanielpaiva.github.io",
  image: "assets/images/og-image.jpg",
  themeColor: "#0077B5",
  language: "pt-BR",
  analytics: {
    enabled: false,
    googleAnalyticsId: null // GA4 Measurement ID (e.g., "G-XXXXXXXXXX")
  }
};

// Skill Categories (for grouping)
const SKILL_CATEGORIES = {
  LANGUAGE: "language",
  FRAMEWORK_BACKEND: "framework-backend",
  FRAMEWORK_FRONTEND: "framework-frontend",
  MOBILE: "mobile",
  DATABASE: "database",
  ARCHITECTURE: "architecture",
  CLOUD: "cloud"
};

// Helper function to group skills by category
function groupSkillsByCategory(skills) {
  return skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});
}

// Helper function to get featured courses
function getFeaturedCourses() {
  return courses.filter(course => course.featured);
}

// Helper function to format star rating
function formatRating(rating) {
  return rating.toFixed(1);
}

// Export data (for ES6 modules) or make available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    profileData,
    socialLinks,
    technicalSkills,
    courseStats,
    courses,
    youtubeVideos,
    youtubeChannel,
    talks,
    talkTopics,
    contactConfig,
    siteConfig,
    SKILL_CATEGORIES,
    groupSkillsByCategory,
    getFeaturedCourses,
    formatRating
  };
}
