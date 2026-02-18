/**
 * Scroll Animations using Intersection Observer
 * Animates elements as they come into viewport
 */

// Initialize Intersection Observer for scroll animations
function initScrollAnimations() {
  // Observer options
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  // Callback function
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        // Optional: unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  };

  // Create observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);

  // Target elements to observe
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

// Add animation classes to sections on page load
function addScrollAnimationClasses() {
  // Hero section elements
  const heroElements = document.querySelectorAll('.hero-text > *, .hero-image');
  heroElements.forEach((el, index) => {
    el.classList.add('animate-on-scroll', 'fade-in-up');
    el.style.animationDelay = `${index * 0.1}s`;
  });

  // Section titles and subtitles
  const sectionTitles = document.querySelectorAll('.section-title, .section-subtitle');
  sectionTitles.forEach(el => {
    el.classList.add('animate-on-scroll', 'fade-in-up');
  });

  // About section
  const aboutImage = document.querySelector('.about-image');
  if (aboutImage) aboutImage.classList.add('animate-on-scroll', 'fade-in-left');
  
  const aboutText = document.querySelector('.about-text');
  if (aboutText) aboutText.classList.add('animate-on-scroll', 'fade-in-right');

  // Cards and grid items
  const cards = document.querySelectorAll(
    '.stat-card, .course-card, .youtube-video, .skill-badge, .experience-item, .talk-item'
  );
  cards.forEach((card, index) => {
    card.classList.add('animate-on-scroll', 'fade-in-up');
    card.style.animationDelay = `${(index % 6) * 0.1}s`;
  });
}

// Parallax scroll effect (optional)
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  if (parallaxElements.length === 0) return;

  const handleScroll = throttle(() => {
    const scrolled = window.pageYOffset;
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }, 10);

  window.addEventListener('scroll', handleScroll);
}

// Count up animation for numbers
function animateCountUp(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16); // 60 FPS
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

// Initialize number count up animations
function initCountUpAnimations() {
  const observerOptions = {
    root: null,
    threshold: 0.5
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
        entry.target.classList.add('counted');
        const target = parseInt(entry.target.dataset.count);
        animateCountUp(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  // Add data-count to stat numbers
  document.querySelectorAll('.stat-number').forEach((el, index) => {
    const numbers = [17, 55541, 4480, 4.4];
    el.dataset.count = numbers[index] || 0;
    observer.observe(el);
  });

  document.querySelectorAll('.summary-number').forEach((el, index) => {
    const text = el.textContent.replace(/[^0-9]/g, '');
    const number = parseInt(text) || 0;
    el.dataset.count = number;
    observer.observe(el);
  });
}

// Initialize all animations
function initAnimations() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      addScrollAnimationClasses();
      initScrollAnimations();
      initCountUpAnimations();
      initParallaxEffect();
    });
  } else {
    addScrollAnimationClasses();
    initScrollAnimations();
    initCountUpAnimations();
    initParallaxEffect();
  }
}

// Auto-initialize
initAnimations();
