# Data Model: Site Pessoal Nataniel Paiva

**Phase 1 Output** | **Date**: 2026-02-18

## Overview

Este documento descreve o modelo de dados para o site pessoal. Como é um site estático sem backend/database, o "modelo de dados" representa a estrutura de conteúdo que será renderizado no HTML e manipulado via JavaScript.

## 1. Entidades de Conteúdo

### 1.1 Profile (Perfil Profissional)

Representa as informações principais do profissional.

**Campos**:
- `name`: String - Nome completo ("Nataniel Paiva")
- `title`: String - Tagline/título ("Staff Engineer & Professor & Palestrante")
- `description`: String (markdown) - Descrição profissional longa
- `yearsOfExperience`: Number - Anos de experiência (13)
- `currentPosition`: Object
  - `role`: String - "Staff Engineer"
  - `company`: String - "PicPay"
  - `companyUrl`: String (URL) - Link para empresa (opcional)
- `education`: Object
  - `degree`: String - "Bacharel em Sistemas de Informação"
  - `institution`: String - "Centro Universitário de Desenvolvimento do Centro Oeste"
- `photos`: Object
  - `hero`: String (URL) - Foto principal
  - `about`: String (URL) - Foto secundária
  - `favicon`: String (URL) - Favicon

**Exemplo (JSON)**:
```json
{
  "name": "Nataniel Paiva",
  "title": "Staff Engineer & Professor & Palestrante",
  "description": "Sou Bacharel em Sistemas de Informação...",
  "yearsOfExperience": 13,
  "currentPosition": {
    "role": "Staff Engineer",
    "company": "PicPay",
    "companyUrl": "https://picpay.com"
  },
  "education": {
    "degree": "Bacharel em Sistemas de Informação",
    "institution": "Centro Universitário de Desenvolvimento do Centro Oeste"
  },
  "photos": {
    "hero": "assets/images/hero-photo.jpg",
    "about": "assets/images/about-photo.jpg",
    "favicon": "favicon.ico"
  }
}
```

**Estado**: Estático (hard-coded no HTML)

---

### 1.2 TechnicalSkill (Habilidade Técnica)

Representa uma tecnologia ou habilidade.

**Campos**:
- `id`: String - Identificador único ("java", "spring")
- `name`: String - Nome da tecnologia ("Java", "Spring Framework")
- `category`: Enum - Categoria da skill
  - "language" | "framework-backend" | "framework-frontend" | "mobile" | "database" | "architecture" | "cloud"
- `proficiency`: Enum (opcional) - Nível de proficiência
  - "expert" | "advanced" | "intermediate"
- `icon`: String (URL) - Caminho para ícone/badge

**Exemplo**:
```json
{
  "id": "java",
  "name": "Java",
  "category": "language",
  "proficiency": "expert",
  "icon": "assets/images/tech-icons/java.svg"
}
```

**Relacionamentos**:
- Um Profile tem muitas TechnicalSkills (1:N)

**Estado**: Array estático no HTML ou JavaScript

**Categorias pré-definidas**:
```javascript
const SKILL_CATEGORIES = {
  LANGUAGE: "language",
  FRAMEWORK_BACKEND: "framework-backend",
  FRAMEWORK_FRONTEND: "framework-frontend",
  MOBILE: "mobile",
  DATABASE: "database",
  ARCHITECTURE: "architecture",
  CLOUD: "cloud"
};
```

---

### 1.3 Course (Curso)

Representa um curso publicado na Udemy.

**Campos**:
- `id`: String - ID único do curso
- `title`: String - Título do curso
- `description`: String - Descrição curta
- `rating`: Number - Nota média (0.0 - 5.0)
- `reviewCount`: Number - Número de avaliações
- `studentCount`: Number - Número de alunos (opcional, agregado)
- `duration`: Object
  - `hours`: Number - Horas totais
  - `minutes`: Number - Minutos adicionais
- `level`: Enum - Nível do curso
  - "beginner" | "intermediate" | "expert" | "all-levels"
- `lectureCount`: Number - Número de aulas
- `price`: Object
  - `current`: Number - Preço atual (BRL)
  - `original`: Number - Preço original (BRL)
  - `currency`: String - "BRL"
- `url`: String (URL) - Link para Udemy
- `thumbnail`: String (URL) - Imagem do curso
- `tags`: Array<String> - Tags/tecnologias (["Java", "Spring Boot"])
- `featured`: Boolean - Se é curso em destaque

**Exemplo**:
```json
{
  "id": "spring-framework-5-spring-boot-2",
  "title": "Spring Framework 5 e Spring Boot 2",
  "description": "Aprenda Spring Framework 5 e Spring Boot 2 com Wildfly 11...",
  "rating": 4.3,
  "reviewCount": 725,
  "studentCount": null,
  "duration": {
    "hours": 7,
    "minutes": 30
  },
  "level": "all-levels",
  "lectureCount": 61,
  "price": {
    "current": 49.90,
    "original": 58.90,
    "currency": "BRL"
  },
  "url": "https://www.udemy.com/course/spring-framework-5-spring-boot-2/",
  "thumbnail": "assets/images/courses/spring-boot.jpg",
  "tags": ["Java", "Spring", "Wildfly"],
  "featured": true
}
```

**Relacionamentos**:
- Um Profile tem muitos Courses (1:N)

**Estado**: Array estático no JavaScript ou JSON file

**Estatísticas agregadas**:
```javascript
const courseStats = {
  totalCourses: 17,
  totalStudents: 55541,
  totalReviews: 4480
};
```

---

### 1.4 YouTubeVideo (Vídeo)

Representa um vídeo do canal YouTube.

**Campos**:
- `id`: String - YouTube video ID
- `title`: String - Título do vídeo
- `description`: String - Descrição (opcional)
- `thumbnail`: String (URL) - Thumbnail URL
  - Default: `https://img.youtube.com/vi/{videoId}/maxresdefault.jpg`
- `publishedAt`: String (ISO Date) - Data de publicação
- `url`: String (URL) - URL completo
  - `https://www.youtube.com/watch?v={id}`
- `embedUrl`: String (URL) - URL para embed
  - `https://www.youtube.com/embed/{id}`

**Exemplo**:
```json
{
  "id": "dQw4w9WgXcQ",
  "title": "Introdução ao Spring Boot",
  "description": "Neste vídeo vamos aprender...",
  "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  "publishedAt": "2026-01-15T10:00:00Z",
  "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "embedUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ"
}
```

**Relacionamentos**:
- Um Profile tem muitos YouTubeVideos (1:N)

**Estado**: Array estático ou carregado via IFrame API (lazy)

**YouTube Channel**:
```javascript
const youtubeChannel = {
  handle: "@NatanielTech",
  url: "https://www.youtube.com/@NatanielTech",
  // subscriberCount pode ser carregado via API (opcional)
};
```

---

### 1.5 SocialLink (Link de Rede Social)

Representa um link para perfil em rede social.

**Campos**:
- `id`: String - Identificador ("linkedin", "github")
- `platform`: String - Nome da plataforma ("LinkedIn", "GitHub")
- `url`: String (URL) - Link completo para perfil
- `icon`: String - Nome do ícone (para icon library ou SVG)
- `handle`: String (opcional) - Username/handle (@natanielpaiva)

**Exemplo**:
```json
{
  "id": "linkedin",
  "platform": "LinkedIn",
  "url": "https://linkedin.com/in/natanielpaiva",
  "icon": "linkedin",
  "handle": "natanielpaiva"
}
```

**Relacionamentos**:
- Um Profile tem muitos SocialLinks (1:N)

**Estado**: Array estático

**Plataformas suportadas**:
```javascript
const socialLinks = [
  { id: "linkedin", platform: "LinkedIn", url: "...", icon: "linkedin" },
  { id: "github", platform: "GitHub", url: "...", icon: "github" },
  { id: "youtube", platform: "YouTube", url: "...", icon: "youtube" },
  { id: "udemy", platform: "Udemy", url: "...", icon: "udemy" },
  { id: "facebook", platform: "Facebook", url: "...", icon: "facebook" }
];
```

---

### 1.6 ContactMessage (Mensagem de Contato)

Representa uma mensagem enviada pelo formulário.

**Campos**:
- `name`: String - Nome do remetente (required)
- `email`: String - Email do remetente (required, validated)
- `subject`: String - Assunto (optional)
- `message`: String - Mensagem (required, min 10 chars)
- `timestamp`: String (ISO Date) - Data/hora de envio
- `_captcha`: Boolean - reCAPTCHA validation (Formspree)
- `_replyto`: String - Reply-to email (Formspree)

**Exemplo** (form data):
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "subject": "Proposta de Palestra",
  "message": "Olá Nataniel, gostaria de convidá-lo...",
  "timestamp": "2026-02-18T14:30:00Z",
  "_captcha": true,
  "_replyto": "joao@example.com"
}
```

**Validação**:
```javascript
const contactValidation = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  email: {
    required: true,
    pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i
  },
  subject: {
    required: false,
    maxLength: 150
  },
  message: {
    required: true,
    minLength: 10,
    maxLength: 1000
  }
};
```

**Estado**: Transient (enviado para Formspree, não persistido localmente)

---

### 1.7 Talk (Palestra)

Representa uma palestra ou apresentação realizada.

**Campos**:
- `id`: String - ID único
- `title`: String - Título da palestra
- `description`: String - Descrição/resumo
- `event`: String - Nome do evento
- `date`: String (ISO Date) - Data da apresentação
- `location`: String - Local (cidade/estado ou "Online")
- `slides`: String (URL) - Link para slides (opcional)
- `video`: String (URL) - Link para gravação (opcional)
- `topics`: Array<String> - Temas abordados

**Exemplo**:
```json
{
  "id": "arquitetura-hexagonal-2025",
  "title": "Arquitetura Hexagonal na Prática",
  "description": "Explorando o padrão Ports and Adapters...",
  "event": "DevConf Brasil 2025",
  "date": "2025-08-15",
  "location": "São Paulo, SP",
  "slides": "https://slides.com/natanielpaiva/hexagonal",
  "video": "https://youtube.com/watch?v=...",
  "topics": ["Arquitetura", "Clean Architecture", "DDD"]
}
```

**Relacionamentos**:
- Um Profile tem muitas Talks (1:N)

**Estado**: Array estático (para Phase 2 - seção palestras)

---

## 2. Estruturas de Dados (JavaScript)

### 2.1 Configuração Global

```javascript
// config.js
const SiteConfig = {
  profile: {
    name: "Nataniel Paiva",
    title: "Staff Engineer & Professor & Palestrante",
    email: "contato@natanielpaiva.com.br", // ou email real
    // ... outros campos do Profile
  },
  
  socialLinks: [
    // ... array de SocialLink
  ],
  
  skills: [
    // ... array de TechnicalSkill
  ],
  
  featuredCourses: [
    // Top 6 cursos em destaque
  ],
  
  youtubeVideos: [
    // Últimos 3-6 vídeos (IDs)
  ],
  
  analytics: {
    googleAnalyticsId: "G-XXXXXXXXXX",
    enableTracking: true
  },
  
  formspree: {
    formId: "YOUR_FORM_ID"
  }
};
```

### 2.2 Estado da UI

```javascript
// state.js
const UIState = {
  // Scroll position
  currentSection: "hero", // hero | about | experience | courses | contact
  
  // Animações
  animatedElements: new Set(), // elementos já animados
  
  // Form
  contactForm: {
    isSubmitting: false,
    isSuccess: false,
    error: null
  },
  
  // YouTube
  youtubeReady: false,
  players: [] // YouTube IFrame players
};
```

### 2.3 Eventos de Analytics

```javascript
// analytics-events.js
const AnalyticsEvents = {
  // Page views
  PAGE_VIEW: "page_view",
  
  // Engagement
  SCROLL_TO_SECTION: "scroll_to_section",
  
  // Courses
  COURSE_CLICK: "course_click",
  VIEW_ALL_COURSES: "view_all_courses",
  
  // YouTube
  VIDEO_PLAY: "video_play",
  CHANNEL_VISIT: "channel_visit",
  
  // Contact
  CONTACT_FORM_SUBMIT: "contact_form_submit",
  CONTACT_FORM_SUCCESS: "contact_form_success",
  CONTACT_FORM_ERROR: "contact_form_error",
  
  // Social
  SOCIAL_LINK_CLICK: "social_link_click"
};
```

## 3. Validação de Dados

### 3.1 Schemas (usando validação nativa)

**Course Schema**:
```javascript
function validateCourse(course) {
  return {
    isValid: 
      typeof course.title === 'string' && course.title.length > 0 &&
      typeof course.rating === 'number' && course.rating >= 0 && course.rating <= 5 &&
      typeof course.url === 'string' && course.url.startsWith('https://'),
    errors: []
  };
}
```

**ContactMessage Schema** (client-side):
```javascript
function validateContactForm(data) {
  const errors = [];
  
  if (!data.name || data.name.length < 2) {
    errors.push({ field: 'name', message: 'Nome deve ter pelo menos 2 caracteres' });
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.push({ field: 'email', message: 'Email inválido' });
  }
  
  if (!data.message || data.message.length < 10) {
    errors.push({ field: 'message', message: 'Mensagem deve ter pelo menos 10 caracteres' });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

function isValidEmail(email) {
  return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email);
}
```

## 4. Transformações de Dados

### 4.1 YouTube Video URL Helper

```javascript
function getYouTubeEmbedUrl(videoId) {
  return `https://www.youtube.com/embed/${videoId}`;
}

function getYouTubeThumbnail(videoId, quality = 'maxresdefault') {
  // quality: default, mqdefault, hqdefault, sddefault, maxresdefault
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}
```

### 4.2 Course Price Formatter

```javascript
function formatPrice(price, currency = 'BRL') {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: currency
  }).format(price);
}

// Uso: formatPrice(49.90, 'BRL') // "R$ 49,90"
```

### 4.3 Date Formatter

```javascript
function formatDate(isoDate, format = 'short') {
  const date = new Date(isoDate);
  
  if (format === 'short') {
    return date.toLocaleDateString('pt-BR'); // "15/01/2026"
  }
  
  if (format === 'long') {
    return date.toLocaleDateString('pt-BR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }); // "15 de janeiro de 2026"
  }
  
  return date.toISOString();
}
```

### 4.4 Duration Formatter

```javascript
function formatDuration(hours, minutes = 0) {
  if (hours === 0) {
    return `${minutes} min`;
  }
  if (minutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${minutes}min`;
}

// Uso: formatDuration(7, 30) // "7h 30min"
```

## 5. Persistência

### 5.1 LocalStorage (opcional, para preferências)

```javascript
// Preferências de UI (futuro - dark mode)
const Preferences = {
  get(key, defaultValue) {
    try {
      const value = localStorage.getItem(`nataniel_${key}`);
      return value ? JSON.parse(value) : defaultValue;
    } catch {
      return defaultValue;
    }
  },
  
  set(key, value) {
    try {
      localStorage.setItem(`nataniel_${key}`, JSON.stringify(value));
    } catch (e) {
      console.error('Failed to save preference:', e);
    }
  }
};

// Uso:
// Preferences.set('theme', 'dark');
// const theme = Preferences.get('theme', 'light');
```

### 5.2 Nenhuma persistência de dados de usuário

**Importante**: Este é um site estático sem backend. Não há:
- Banco de dados
- Autenticação de usuários
- Sessões
- Cookies de rastreamento (além de Analytics)

**Dados persistidos apenas**:
- Analytics (Google Analytics cookies)
- LocalStorage para preferências de UI (opcional)

## 6. API Contracts (ver contracts/ directory)

Interfaces externas documentadas separadamente em:
- `contracts/formspree-api.md` - Contrato do formulário de contato
- `contracts/youtube-iframe-api.md` - Contrato da YouTube IFrame API
- `contracts/google-analytics.md` - Eventos de tracking

## 7. Migrations / Versioning

**Versão atual do schema**: 1.0

Como é conteúdo estático, "migrations" são simplesmente atualizações de conteúdo:

**Futuras mudanças previstas**:
- v1.1: Adicionar campo `testimonials` ao Course (depoimentos de alunos)
- v1.2: Adicionar entidade `BlogPost` (quando/se blog for adicionado)
- v2.0: Migrar dados para JSON files externos (facilitar updates)

**Processo de atualização**:
1. Atualizar JSON/JavaScript data files
2. Commit e push para GitHub
3. GitHub Pages auto-deploy

## 8. Data Sources

### 8.1 Fontes de Dados

**Conteúdo estático**:
- Profile info: Hard-coded no HTML/JS
- Courses: Manualmente curados (top 6)
- Skills: Lista estática
- Social links: URLs fixos

**Conteúdo dinâmico** (opcional/futuro):
- YouTube videos: Via IFrame API
- Analytics: Google Analytics

**Atualização manual**:
- Ao lançar novo curso: adicionar ao array `featuredCourses`
- Ao publicar vídeo importante: adicionar ID ao array `youtubeVideos`
- Mudança de posição: editar `profile.currentPosition`

### 8.2 Frequência de Atualização

**Mensal ou conforme necessário**:
- Novos cursos lançados
- Vídeos importantes publicados
- Mudanças de carreira

**Trimestral**:
- Review de cursos em destaque (substituir por melhores)
- Atualização de estatísticas (alunos, reviews)

**Anual**:
- Atualização de anos de experiência
- Review completo de skills

## 9. Exemplo Completo de Dados

### 9.1 data.js (arquivo centralizado)

```javascript
// data.js - Centraliza todos os dados do site
const SiteData = {
  profile: {
    name: "Nataniel Paiva",
    title: "Staff Engineer & Professor & Palestrante",
    tagline: "Transformando ideias em soluções tecnológicas há mais de 13 anos",
    description: `Sou Bacharel em Sistemas de Informação, atualmente Staff Engineer no PicPay 
    com uma carreira de mais de 13 anos focada em Desenvolvimento Fullstack e Mobile. 
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
      totalReviews: 4480
    }
  },

  socialLinks: [
    {
      id: "linkedin",
      platform: "LinkedIn",
      url: "https://linkedin.com/in/natanielpaiva",
      icon: "linkedin"
    },
    {
      id: "github",
      platform: "GitHub",
      url: "https://github.com/natanielpaiva",
      icon: "github"
    },
    {
      id: "youtube",
      platform: "YouTube",
      url: "https://www.youtube.com/@NatanielTech",
      icon: "youtube"
    },
    {
      id: "udemy",
      platform: "Udemy",
      url: "https://www.udemy.com/user/natanielpaiva/",
      icon: "udemy"
    }
  ],

  skills: [
    // Languages
    { id: "java", name: "Java", category: "language", proficiency: "expert" },
    { id: "javascript", name: "JavaScript/ES6", category: "language", proficiency: "expert" },
    { id: "python", name: "Python", category: "language", proficiency: "advanced" },
    { id: "php", name: "PHP", category: "language", proficiency: "advanced" },
    
    // Backend Frameworks
    { id: "spring", name: "Spring Framework", category: "framework-backend", proficiency: "expert" },
    { id: "laravel", name: "Laravel", category: "framework-backend", proficiency: "advanced" },
    { id: "flask", name: "Flask", category: "framework-backend", proficiency: "advanced" },
    
    // Frontend Frameworks
    { id: "react", name: "React", category: "framework-frontend", proficiency: "expert" },
    { id: "angular", name: "Angular", category: "framework-frontend", proficiency: "expert" },
    
    // Mobile
    { id: "react-native", name: "React Native", category: "mobile", proficiency: "advanced" },
    { id: "ionic", name: "Ionic", category: "mobile", proficiency: "advanced" },
    
    // Databases
    { id: "mongodb", name: "MongoDB", category: "database", proficiency: "expert" },
    { id: "mysql", name: "MySQL", category: "database", proficiency: "expert" },
    { id: "oracle", name: "Oracle", category: "database", proficiency: "advanced" },
    { id: "cassandra", name: "Cassandra", category: "database", proficiency: "intermediate" },
    
    // Architecture
    { id: "hexagonal", name: "Arquitetura Hexagonal", category: "architecture", proficiency: "expert" },
    { id: "c4-model", name: "C4 Model", category: "architecture", proficiency: "expert" },
    { id: "microservices", name: "Microservices", category: "architecture", proficiency: "advanced" }
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
      tags: ["Angular", "API", "TypeScript"],
      featured: true
    },
    {
      id: "ionic-laravel",
      title: "Criar aplicativos com Ionic 3 e Laravel (PHP) com MongoDB",
      description: "API REST com Laravel(PHP) e MongoDB. Consumir o serviço via Ionic 3(TypeScript)",
      rating: 4.5,
      reviewCount: 478,
      duration: { hours: 3, minutes: 0 },
      level: "intermediate",
      lectureCount: 15,
      price: { current: 24.90, original: 39.90, currency: "BRL" },
      url: "https://www.udemy.com/course/criar-aplicativos-com-ionic-3-e-laravelphp-com-mongodb/",
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
      tags: ["Arquitetura", "C4 Model", "Documentação"],
      featured: true
    },
    {
      id: "mongodb-plsql",
      title: "MongoDB e PL/SQL - curso completo profissionais de dados",
      description: "Manipulando dados de diversos formatos",
      rating: 4.7,
      reviewCount: 7,
      duration: { hours: 6, minutes: 30 },
      level: "beginner",
      lectureCount: 31,
      price: { current: 44.90, original: 52.90, currency: "BRL" },
      url: "https://www.udemy.com/course/mongodb-e-plsql-curso-completo-profissionais-de-dados/",
      tags: ["MongoDB", "PL/SQL", "Database"],
      featured: true
    }
  ],

  youtubeVideos: [
    // IDs dos vídeos mais recentes (atualizar manualmente)
    { id: "VIDEO_ID_1" },
    { id: "VIDEO_ID_2" },
    { id: "VIDEO_ID_3" }
  ]
};

// Export para usar em outros módulos
export default SiteData;
```

---

## 10. Conclusão

Este data model define todas as estruturas de dados necessárias para o site pessoal. Como é um site estático, todos os dados são hard-coded ou gerenciados via arquivos JavaScript/JSON simples.

**Próximos passos**:
- ✅ Data model definido
- → Criar contracts/ (APIs externas)
- → Criar quickstart.md
- → Atualizar contexto do agente

**Versão**: 1.0  
**Última atualização**: 2026-02-18
