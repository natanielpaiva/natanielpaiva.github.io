/**
 * Main JavaScript - Site Initialization and Dynamic Content Loading
 * Nataniel Paiva Personal Website
 */

// ========== Navigation & Scroll Behavior ==========

// Fixed navbar on scroll
function handleNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  
  const scrollHandler = throttle(() => {
    if (window.scrollY > 100) {
      navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
      navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
  }, 100);
  
  window.addEventListener('scroll', scrollHandler);
}

// Handle mobile menu
function initMobileMenu() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelectorAll('.nav-link');
  
  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileMenu);
  }
  
  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      closeMobileMenu();
      
      // Handle smooth scroll for anchor links
      if (link.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        smoothScrollTo(targetId);
      }
    });
  });
}

// Back to top button
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;
  
  const scrollHandler = throttle(() => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, 100);
  
  window.addEventListener('scroll', scrollHandler);
  
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ========== Dynamic Content Loading ==========

// Load Courses
function loadCourses() {
  const coursesGrid = document.getElementById('coursesGrid');
  if (!coursesGrid || typeof courses === 'undefined') return;
  
  coursesGrid.innerHTML = '';
  
  const featuredCourses = courses.filter(course => course.featured);
  
  featuredCourses.forEach(course => {
    const courseCard = createCourseCard(course);
    coursesGrid.appendChild(courseCard);
  });
}

// Create course card
function createCourseCard(course) {
  const card = document.createElement('div');
  card.className = 'course-card';
  
  const thumbnail = course.thumbnail || 'assets/images/course-placeholder.jpg';
  const durationText = `${course.duration.hours}h${course.duration.minutes > 0 ? ` ${course.duration.minutes}m` : ''}`;
  const levelText = course.level === 'all-levels' ? 'Todos os Níveis' : 
                    course.level === 'beginner' ? 'Iniciante' :
                    course.level === 'intermediate' ? 'Intermediário' : 'Avançado';
  
  card.innerHTML = `
    <img src="${thumbnail}" alt="${sanitizeHTML(course.title)}" class="course-thumbnail" loading="lazy">
    <div class="course-content">
      <h3 class="course-title">${sanitizeHTML(course.title)}</h3>
      <div class="course-meta">
        <div class="course-rating">
          ${generateStars(course.rating)}
          <span>${formatRating(course.rating)}</span>
          <span>(${formatNumber(course.reviewCount)})</span>
        </div>
      </div>
      <div class="course-meta">
        <span><i class="far fa-clock"></i> ${durationText}</span>
        <span><i class="fas fa-signal"></i> ${levelText}</span>
      </div>
      <div class="course-tags">
        ${course.tags.map(tag => `<span class="course-tag">${tag}</span>`).join('')}
      </div>
      <a href="${course.url}" target="_blank" rel="noopener" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">
        Ver Curso <i class="fas fa-external-link-alt"></i>
      </a>
    </div>
  `;
  
  return card;
}

// Load Talks
function loadTalks() {
  const talksList = document.getElementById('talksList');
  if (!talksList || typeof talks === 'undefined') return;
  
  talksList.innerHTML = '';
  
  if (talks.length === 0) {
    talksList.innerHTML = '<p>Palestras anteriores serão listadas aqui.</p>';
    return;
  }
  
  talks.forEach(talk => {
    const talkItem = createTalkItem(talk);
    talksList.appendChild(talkItem);
  });
}

// Create talk item
function createTalkItem(talk) {
  const item = document.createElement('div');
  item.className = 'talk-item';
  
  item.innerHTML = `
    <h3>${sanitizeHTML(talk.title)}</h3>
    <p class="talk-event"><i class="fas fa-calendar-alt"></i> ${sanitizeHTML(talk.event)}</p>
    <p class="talk-date">${formatDate(talk.date)} • ${sanitizeHTML(talk.location)}</p>
    <p>${sanitizeHTML(talk.description)}</p>
  `;
  
  return item;
}

// Load Talk Topics
function loadTalkTopics() {
  const topicsContainer = document.getElementById('talkTopics');
  if (!topicsContainer || typeof talkTopics === 'undefined') return;
  
  topicsContainer.innerHTML = '';
  
  talkTopics.forEach(topic => {
    const topicItem = createTopicItem(topic);
    topicsContainer.appendChild(topicItem);
  });
}

// Create topic item
function createTopicItem(topic) {
  const item = document.createElement('div');
  item.className = 'topic-item';
  
  item.innerHTML = `
    <h4>${sanitizeHTML(topic.title)}</h4>
    <p style="font-size: 0.875rem; color: var(--color-gray); margin-bottom: 0.5rem;">
      ${sanitizeHTML(topic.description)}
    </p>
    <div class="topic-meta">
      <span><i class="far fa-clock"></i> ${topic.duration}</span>
      <span><i class="fas fa-signal"></i> ${topic.level}</span>
    </div>
  `;
  
  return item;
}

// Load Skills
function loadSkills() {
  const skillsContainer = document.getElementById('skillsContainer');
  if (!skillsContainer || typeof technicalSkills === 'undefined') return;
  
  skillsContainer.innerHTML = '';
  
  // Group skills by category
  const groupedSkills = technicalSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});
  
  // Category labels
  const categoryLabels = {
    'language': 'Linguagens de Programação',
    'framework-backend': 'Frameworks Backend',
    'framework-frontend': 'Frameworks Frontend',
    'mobile': 'Desenvolvimento Mobile',
    'database': 'Bancos de Dados',
    'architecture': 'Arquitetura de Software',
    'cloud': 'Cloud & DevOps'
  };
  
  // Create sections for each category
  Object.keys(groupedSkills).forEach(category => {
    const categorySection = document.createElement('div');
    categorySection.className = 'skill-category';
    
    const categoryTitle = document.createElement('h3');
    categoryTitle.textContent = categoryLabels[category] || category;
    categorySection.appendChild(categoryTitle);
    
    const skillGrid = document.createElement('div');
    skillGrid.className = 'skill-grid';
    
    groupedSkills[category].forEach(skill => {
      const skillBadge = createSkillBadge(skill);
      skillGrid.appendChild(skillBadge);
    });
    
    categorySection.appendChild(skillGrid);
    skillsContainer.appendChild(categorySection);
  });
}

// Create skill badge
function createSkillBadge(skill) {
  const badge = document.createElement('div');
  badge.className = 'skill-badge';
  
  // Use placeholder icon if not available
  const iconSrc = skill.icon || `https://via.placeholder.com/48?text=${skill.name.charAt(0)}`;
  
  badge.innerHTML = `
    <img src="${iconSrc}" alt="${sanitizeHTML(skill.name)}" class="skill-icon" loading="lazy" onerror="this.src='https://via.placeholder.com/48?text=${skill.name.charAt(0)}'">
    <span class="skill-name">${sanitizeHTML(skill.name)}</span>
  `;
  
  return badge;
}

// ========== Page Initialization ==========

function initPage() {
  console.log('🚀 Initializing Nataniel Paiva Personal Website...');
  
  // Navigation
  handleNavbarScroll();
  initMobileMenu();
  initBackToTop();
  
  // Load dynamic content
  loadCourses();
  loadTalks();
  loadTalkTopics();
  loadSkills();
  
  // Note: YouTube videos and contact form are handled by their respective modules
  // Note: Animations are handled by animations.js
  
  console.log('✅ Page initialized successfully');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPage);
} else {
  initPage();
}

// Handle window resize (debounced)
window.addEventListener('resize', debounce(() => {
  // Close mobile menu on resize to desktop
  if (window.innerWidth > 768) {
    closeMobileMenu();
  }
}, 250));

// Log errors for debugging
window.addEventListener('error', (event) => {
  console.error('JavaScript Error:', event.error);
});

console.log('📦 Main.js loaded');
