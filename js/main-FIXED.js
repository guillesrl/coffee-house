// ========================================
// COFFEE - Fixed Interactions
// ========================================

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Header scroll effect
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  // Add/remove scrolled class for header styling
  if (currentScroll > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// Update active nav link based on scroll position
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 200;
    const sectionId = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// Hero animations using individual gsap.from() calls
gsap.from('.logo', {
  opacity: 0,
  y: -20,
  duration: 0.8,
  ease: 'power3.out'
});

gsap.from('.nav-links li', {
  opacity: 0,
  y: -20,
  duration: 0.6,
  stagger: 0.1,
  ease: 'power3.out',
  delay: 0.3
});

gsap.from('.hero-title .line', {
  y: 100,
  opacity: 0,
  duration: 1,
  stagger: 0.15,
  ease: 'power4.out',
  delay: 0.5
});

gsap.from('.hero-subtitle', {
  opacity: 0,
  y: 20,
  duration: 0.8,
  ease: 'power3.out',
  delay: 1.2
});

gsap.from('.hero-actions', {
  opacity: 0,
  y: 20,
  duration: 0.8,
  ease: 'power3.out',
  delay: 1.4
});

gsap.to('.hero-img', {
  opacity: 1,
  scale: 1,
  duration: 1.5,
  ease: 'power3.out',
  delay: 0.8
});

gsap.to('.hero-image-accent', {
  opacity: 0.4,
  duration: 2,
  ease: 'power2.out',
  delay: 1,
  yoyo: true,
  repeat: -1
});

// Section animations
gsap.from('.section-title', {
  scrollTrigger: {
    trigger: '.section-title',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  opacity: 0,
  y: 40,
  duration: 0.8,
  ease: 'power3.out'
});

gsap.from('.about-text', {
  scrollTrigger: {
    trigger: '.about-text',
    start: 'top 75%',
    toggleActions: 'play none none reverse'
  },
  opacity: 0,
  x: -50,
  duration: 1,
  ease: 'power3.out'
});

gsap.from('.about-image', {
  scrollTrigger: {
    trigger: '.about-image',
    start: 'top 75%',
    toggleActions: 'play none none reverse'
  },
  opacity: 0,
  y: 30,
  duration: 1,
  ease: 'power3.out',
  delay: 0.3,
  onComplete: () => {
    document.querySelector('.about-image').classList.add('visible');
  }
});

gsap.utils.toArray('.menu-card').forEach((card, i) => {
  gsap.to(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 85%',
      toggleActions: 'play none none reverse'
    },
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power3.out',
    delay: i * 0.15
  });
});

gsap.from('.contact-content', {
  scrollTrigger: {
    trigger: '.contact',
    start: 'top 75%',
    toggleActions: 'play none none reverse'
  },
  opacity: 0,
  y: 30,
  duration: 1,
  ease: 'power3.out'
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);

    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: target,
          offsetY: 80
        },
        ease: 'power3.inOut'
      });
    }
  });
});

// Add keyboard navigation for button focus
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      btn.click();
    }
  });
});

// Intersection Observer for lazy loading images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Handle reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Disable animations for users who prefer reduced motion
  gsap.globalTimeline.timeScale(10000);
}

// Performance: pause animations when page is not visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    gsap.globalTimeline.pause();
  } else {
    gsap.globalTimeline.resume();
  }
});

console.log('Coffee site loaded successfully! ☕');
