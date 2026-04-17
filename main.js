// Theme Toggle Logic
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle?.querySelector('i');

// Check for saved theme
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  if (!icon) return;
  if (theme === 'dark') {
    icon.classList.replace('bi-moon', 'bi-sun');
  } else {
    icon.classList.replace('bi-sun', 'bi-moon');
  }
}

// Header Scroll Effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileBtn) {
  mobileBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon
    const mlIcon = mobileBtn.querySelector('i');
    if (navLinks.classList.contains('active')) {
      mlIcon.classList.replace('bi-list', 'bi-x');
    } else {
      mlIcon.classList.replace('bi-x', 'bi-list');
    }
  });
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('[data-reveal]');

const revealOnScroll = () => {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.85;
    if (isVisible) {
      el.classList.add('active');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Form Submission Simulation
const quoteForm = document.getElementById('quoteForm');
const formStatus = document.getElementById('formStatus');

if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.style.display = 'block';
    formStatus.style.color = 'var(--success)';
    formStatus.textContent = 'Thank you! Your request has been sent. We will contact you shortly.';
    quoteForm.reset();
    
    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 5000);
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
