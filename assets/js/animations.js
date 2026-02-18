// animations.js - Scroll animations using Intersection Observer

/**
 * Initialize scroll animations using Intersection Observer API
 */
function initScrollAnimations() {
  // Elements to animate on scroll
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
  
  if (!animatedElements.length) return;
  
  // Check if IntersectionObserver is supported
  if ('IntersectionObserver' in window) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // Trigger when 10% of element is visible
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class to trigger animation
          entry.target.classList.add('visible');
          
          // Optional: stop observing after animation
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe all animated elements
    animatedElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    animatedElements.forEach(element => {
      element.classList.add('visible');
    });
  }
}

/**
 * Add animation classes to elements based on their position
 */
function addScrollAnimations() {
  // Add fade-in to stat items
  document.querySelectorAll('.stat-item').forEach((item, index) => {
    item.classList.add('fade-in');
    item.style.transitionDelay = `${index * 0.1}s`;
  });
  
  // Add fade-in to course cards
  document.querySelectorAll('.course-card').forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.1}s`;
  });
  
  // Add fade-in to timeline items
  document.querySelectorAll('.timeline-item').forEach((item, index) => {
    item.classList.add('fade-in-left');
    item.style.transitionDelay = `${index * 0.2}s`;
  });
  
  // Add fade-in to skill badges
  document.querySelectorAll('.skill-badge').forEach((badge, index) => {
    badge.classList.add('fade-in');
    badge.style.transitionDelay = `${(index % 10) * 0.05}s`; // Stagger groups of 10
  });
  
  // Add fade-in to talks
  document.querySelectorAll('.talk-card').forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.1}s`;
  });
  
  // Add fade-in to YouTube videos
  document.querySelectorAll('.youtube-card').forEach((card, index) => {
    card.classList.add('fade-in');
    card.style.transitionDelay = `${index * 0.1}s`;
  });
}

/**
 * Animate numbers counting up
 * @param {HTMLElement} element - Element containing the number
 * @param {number} target - Target number
 * @param {number} duration - Animation duration in ms
 */
function animateNumber(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;
  
  const updateNumber = () => {
    current += increment;
    if (current >= target) {
      element.textContent = formatNumber(Math.floor(target));
      return;
    }
    element.textContent = formatNumber(Math.floor(current));
    requestAnimationFrame(updateNumber);
  };
  
  updateNumber();
}

/**
 * Initialize number counter animations for stats
 */
function initCounterAnimations() {
  const counters = document.querySelectorAll('.stat-number');
  
  if (!counters.length) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.textContent.replace(/,/g, ''));
        
        if (!isNaN(targetValue)) {
          animateNumber(target, targetValue);
          observer.unobserve(target);
        }
      }
    });
  }, observerOptions);
  
  counters.forEach(counter => observer.observe(counter));
}

/**
 * Add parallax effect to hero section
 */
function initParallaxEffect() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    const parallaxSpeed = 0.5;
    
    // Only apply parallax if hero is in viewport
    if (scrolled < window.innerHeight) {
      hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
    }
  }, 16)); // ~60fps
}

/**
 * Initialize typing animation for hero text (optional)
 * @param {string} elementId - ID of element to type in
 * @param {string} text - Text to type
 * @param {number} speed - Typing speed in ms
 */
function initTypingAnimation(elementId, text, speed = 100) {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  let charIndex = 0;
  element.textContent = '';
  
  const typeChar = () => {
    if (charIndex < text.length) {
      element.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(typeChar, speed);
    } else {
      // Add blinking cursor
      const cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      element.appendChild(cursor);
    }
  };
  
  // Start typing after a short delay
  setTimeout(typeChar, 500);
}

/**
 * Add hover effects to cards
 */
function initCardHoverEffects() {
  const cards = document.querySelectorAll('.course-card, .talk-card, .stat-item');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

/**
 * Initialize all animations
 */
function initAnimations() {
  // Add animation classes to elements
  addScrollAnimations();
  
  // Initialize scroll-triggered animations
  initScrollAnimations();
  
  // Initialize counter animations
  initCounterAnimations();
  
  // Initialize parallax (optional - can be heavy on performance)
  // initParallaxEffect();
  
  // Initialize card hover effects
  initCardHoverEffects();
}

// Helper function for formatting numbers (imported from utils if available)
function formatNumber(num) {
  return new Intl.NumberFormat('pt-BR').format(num);
}

// Helper function for throttling (imported from utils if available)
function throttle(func, limit = 300) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initScrollAnimations,
    addScrollAnimations,
    animateNumber,
    initCounterAnimations,
    initParallaxEffect,
    initTypingAnimation,
    initCardHoverEffects,
    initAnimations
  };
}
