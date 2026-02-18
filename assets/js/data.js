// data.js - Site data for Nataniel Paiva's personal website
// All static content centralized in one place

const SiteData = {
  profile: {
    name: "Nataniel Paiva",
    title: "Staff Engineer & Professor & Palestrante",
    tagline: "Transformando ideias em soluções tecnológicas há mais de 13 anos",
    description: `Sou Bacharel em Sistemas de Informação, atualmente Staff Engineer no PicPay 
    com uma carreira de mais de 15 anos focada em Desenvolvimento Fullstack e Mobile. 
    Trabalho com diversas tecnologias modernas como Java, Spring, Python, React, Angular e MongoDB. 
    Nas horas vagas, sou professor e instrutor em plataformas EAD, onde já ajudei mais de 55 mil 
    alunos a evoluírem suas carreiras em tecnologia.`,
    yearsOfExperience: 13,
    currentPosition: {
      role: "Staff Engineer",
      company: "PicPay",
      companyUrl: "https://picpay.com"
    },
    education: {
      degree: "Bacharel em Sistemas de Informação",
      institution: "Centro Universitário de Desenvolvimento do Centro Oeste"
    },
    stats: {
      totalCourses: 17,
      totalStudents: 55541,
      totalReviews: 4480,
      averageRating: 4.4
    },
    photos: {
      hero: "assets/images/hero-photo.jpg",
      about: "assets/images/about-photo.jpg",
      favicon: "assets/images/favicon.ico"
    }
  },

  socialLinks: [
    {
      id: "linkedin",
      platform: "LinkedIn",
      url: "https://linkedin.com/in/natanielpaiva",
      icon: "fab fa-linkedin",
      ariaLabel: "Visite meu perfil no LinkedIn"
    },
    {
      id: "github",
      platform: "GitHub",
      url: "https://github.com/natanielpaiva",
      icon: "fab fa-github",
      ariaLabel: "Veja meus projetos no GitHub"
    },
    {
      id: "youtube",
      platform: "YouTube",
      url: "https://www.youtube.com/@NatanielTech",
      icon: "fab fa-youtube",
      ariaLabel: "Inscreva-se no canal YouTube"
    },
    {
      id: "udemy",
      platform: "Udemy",
      url: "https://www.udemy.com/user/nataniel-paiva/",
      icon: "fas fa-graduation-cap",
      ariaLabel: "Veja meus cursos na Udemy"
    },
    {
      id: "facebook",
      platform: "Facebook",
      url: "https://facebook.com/natanielpaiva",
      icon: "fab fa-facebook",
      ariaLabel: "Siga no Facebook"
    }
  ],

  skills: [
    // Languages
    { id: "java", name: "Java", category: "language", proficiency: "expert", icon: "assets/images/tech-icons/java.svg" },
    { id: "javascript", name: "JavaScript/ES6", category: "language", proficiency: "expert", icon: "assets/images/tech-icons/javascript.svg" },
    { id: "typescript", name: "TypeScript", category: "language", proficiency: "expert", icon: "assets/images/tech-icons/typescript.svg" },
    { id: "python", name: "Python", category: "language", proficiency: "advanced", icon: "assets/images/tech-icons/python.svg" },
    { id: "php", name: "PHP", category: "language", proficiency: "advanced", icon: "assets/images/tech-icons/php.svg" },
    
    // Backend Frameworks
    { id: "spring", name: "Spring Framework", category: "framework-backend", proficiency: "expert", icon: "assets/images/tech-icons/spring.svg" },
    { id: "laravel", name: "Laravel", category: "framework-backend", proficiency: "advanced", icon: "assets/images/tech-icons/laravel.svg" },
    { id: "flask", name: "Flask", category: "framework-backend", proficiency: "advanced", icon: "assets/images/tech-icons/flask.svg" },
    
    // Frontend Frameworks
    { id: "react", name: "React", category: "framework-frontend", proficiency: "expert", icon: "assets/images/tech-icons/react.svg" },
    { id: "angular", name: "Angular", category: "framework-frontend", proficiency: "expert", icon: "assets/images/tech-icons/angular.svg" },
    
    // Mobile
    { id: "react-native", name: "React Native", category: "mobile", proficiency: "advanced", icon: "assets/images/tech-icons/react-native.svg" },
    { id: "ionic", name: "Ionic", category: "mobile", proficiency: "advanced", icon: "assets/images/tech-icons/ionic.svg" },
    
    // Databases
    { id: "mongodb", name: "MongoDB", category: "database", proficiency: "expert", icon: "assets/images/tech-icons/mongodb.svg" },
    { id: "mysql", name: "MySQL", category: "database", proficiency: "expert", icon: "assets/images/tech-icons/mysql.svg" },
    { id: "oracle", name: "Oracle", category: "database", proficiency: "advanced", icon: "assets/images/tech-icons/oracle.svg" },
    { id: "cassandra", name: "Cassandra", category: "database", proficiency: "intermediate", icon: "assets/images/tech-icons/cassandra.svg" },
    
    // Architecture
    { id: "hexagonal", name: "Arquitetura Hexagonal", category: "architecture", proficiency: "expert", icon: "assets/images/tech-icons/hexagon.svg" },
    { id: "c4-model", name: "C4 Model", category: "architecture", proficiency: "expert", icon: "assets/images/tech-icons/c4.svg" },
    { id: "microservices", name: "Microservices", category: "architecture", proficiency: "advanced", icon: "assets/images/tech-icons/microservices.svg" }
  ],

  featuredCourses: [
    {
      id: "spring-framework-5",
      title: "Spring Framework 5 e Spring Boot 2",
      description: "Aprenda Spring Framework 5 e Spring Boot 2 com Wildfly 11, Spring Data com Mongo e MySQL",
      rating: 4.3,
      reviewCount: 725,
      duration: { hours: 7, minutes: 30 },
      level: "all-levels",
      lectureCount: 61,
      price: { current: 49.90, original: 58.90, currency: "BRL" },
      url: "https://www.udemy.com/course/spring-framework-5-spring-boot-2/",
      thumbnail: "assets/images/courses/spring-boot.jpg",
      tags: ["Java", "Spring", "Wildfly"],
      featured: true
    },
    {
      id: "angular-apis",
      title: "Angular e integração de APIs",
      description: "Criar clientes WEB com Angular de forma simples e produtiva",
      rating: 4.6,
      reviewCount: 721,
      duration: { hours: 2, minutes: 30 },
      level: "intermediate",
      lectureCount: 18,
      price: { current: 45.90, original: 53.90, currency: "BRL" },
      url: "https://www.udemy.com/course/angular-7-e-integracao-de-apis/",
      thumbnail: "assets/images/courses/angular.jpg",
      tags: ["Angular", "API", "TypeScript"],
      featured: true
    },
    {
      id: "ionic-laravel",
      title: "Criar aplicativos com Ionic 3 e Laravel",
      description: "API REST com Laravel(PHP) e MongoDB. Consumir o serviço via Ionic 3(TypeScript)",
      rating: 4.5,
      reviewCount: 478,
      duration: { hours: 3, minutes: 0 },
      level: "intermediate",
      lectureCount: 15,
      price: { current: 24.90, original: 39.90, currency: "BRL" },
      url: "https://www.udemy.com/course/criar-aplicativos-com-ionic-3-e-laravelphp-com-mongodb/",
      thumbnail: "assets/images/courses/ionic-laravel.jpg",
      tags: ["Ionic", "Laravel", "MongoDB"],
      featured: true
    },
    {
      id: "arquitetura-hexagonal",
      title: "Arquitetura Hexagonal na prática",
      description: "Entenda de uma vez por todas essa arquitetura tão utilizada hoje em dia (Ports and Adapters)",
      rating: 4.5,
      reviewCount: 259,
      duration: { hours: 1, minutes: 0 },
      level: "expert",
      lectureCount: 6,
      price: { current: 25.90, original: 39.90, currency: "BRL" },
      url: "https://www.udemy.com/course/arquitetura-hexagonal-na-pratica/",
      thumbnail: "assets/images/courses/hexagonal.jpg",
      tags: ["Arquitetura", "Design Patterns"],
      featured: true
    },
    {
      id: "c4-model",
      title: "Modelo de arquitetura C4 Model",
      description: "Faça desenhos de arquitetura do seu software de forma simples e eficiente",
      rating: 3.7,
      reviewCount: 280,
      duration: { hours: 1, minutes: 0 },
      level: "expert",
      lectureCount: 8,
      price: { current: 24.90, original: 39.90, currency: "BRL" },
      url: "https://www.udemy.com/course/modelo-de-arquitetura-c4-model/",
      thumbnail: "assets/images/courses/c4-model.jpg",
      tags: ["Arquitetura", "C4 Model", "Documentação"],
      featured: true
    },
    {
      id: "mongodb-plsql",
      title: "MongoDB e PL/SQL - curso completo",
      description: "Manipulando dados de diversos formatos para profissionais de dados",
      rating: 4.7,
      reviewCount: 7,
      duration: { hours: 6, minutes: 30 },
      level: "beginner",
      lectureCount: 31,
      price: { current: 44.90, original: 52.90, currency: "BRL" },
      url: "https://www.udemy.com/course/mongodb-e-plsql-curso-completo-profissionais-de-dados/",
      thumbnail: "assets/images/courses/mongodb-plsql.jpg",
      tags: ["MongoDB", "PL/SQL", "Database"],
      featured: true
    }
  ],

  talks: [
    {
      id: "talk-1",
      title: "Arquitetura Hexagonal: Teoria e Prática",
      event: "Meetup Tech Community",
      date: "2025-11-15",
      location: "São Paulo, SP",
      description: "Como aplicar arquitetura hexagonal em projetos reais",
      tags: ["Arquitetura", "Design Patterns"]
    },
    {
      id: "talk-2",
      title: "Microservices com Spring Boot",
      event: "TechTalks Conference",
      date: "2025-08-20",
      location: "Virtual",
      description: "Construindo microservices escaláveis com Spring Boot e Spring Cloud",
      tags: ["Microservices", "Spring Boot", "Java"]
    }
  ],

  youtubeVideos: [
    // Adicionar IDs reais dos vídeos do canal @NatanielTech
    // Placeholder para estrutura
    { 
      id: "PLACEHOLDER_1",
      title: "Introdução ao Spring Boot",
      thumbnail: "https://img.youtube.com/vi/PLACEHOLDER_1/maxresdefault.jpg"
    },
    { 
      id: "PLACEHOLDER_2",
      title: "Angular na Prática",
      thumbnail: "https://img.youtube.com/vi/PLACEHOLDER_2/maxresdefault.jpg"
    },
    { 
      id: "PLACEHOLDER_3",
      title: "MongoDB Tutorial",
      thumbnail: "https://img.youtube.com/vi/PLACEHOLDER_3/maxresdefault.jpg"
    }
  ]
};

// Utility functions

// Format star rating (4.3 -> "★★★★☆")
function formatRating(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return '★'.repeat(fullStars) + 
         (hasHalfStar ? '½' : '') + 
         '☆'.repeat(emptyStars);
}

// Format price (49.90, 'BRL' -> "R$ 49,90")
function formatPrice(price, currency = 'BRL') {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency
  }).format(price);
}

// Format duration (7, 30 -> "7h 30min")
function formatDuration(hours, minutes = 0) {
  if (hours === 0) {
    return `${minutes} min`;
  }
  if (minutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${minutes}min`;
}

// Format date
function formatDate(isoDate, format = 'short') {
  const date = new Date(isoDate);
  
  if (format === 'short') {
    return date.toLocaleDateString('pt-BR');
  }
  
  if (format === 'long') {
    return date.toLocaleDateString('pt-BR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
  
  return date.toISOString();
}

// Get skills by category
function getSkillsByCategory(category) {
  return SiteData.skills.filter(skill => skill.category === category);
}

// Category labels
const SKILL_CATEGORIES = {
  language: "Linguagens",
  "framework-backend": "Frameworks Backend",
  "framework-frontend": "Frameworks Frontend",
  mobile: "Desenvolvimento Mobile",
  database: "Bancos de Dados",
  architecture: "Arquitetura de Software",
  cloud: "Cloud & DevOps"
};
