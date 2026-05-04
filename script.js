// ===== MOBILE NAV TOGGLE =====
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');

navToggle.addEventListener('click', () => {
  navMobile.classList.toggle('open');
  navToggle.classList.toggle('active');
});

// Close mobile nav when clicking a link
const navMobileLinks = navMobile.querySelectorAll('a');
navMobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===== NAVBAR BACKGROUND ON SCROLL =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 80) {
    navbar.style.background = 'rgba(91, 18, 32, 0.98)';
    navbar.style.boxShadow = '0 2px 16px rgba(0,0,0,0.15)';
  } else {
    navbar.style.background = 'rgba(91, 18, 32, 0.96)';
    navbar.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// ===== INTERSECTION OBSERVER FOR REVEAL ANIMATIONS =====
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: stop observing after reveal
      // observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -80px 0px'
});

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// ===== PARALLAX PETALS (OPTIONAL) =====
const petals = document.querySelectorAll('.petal');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroHeight = document.querySelector('.hero').offsetHeight;
  
  if (scrolled < heroHeight) {
    petals.forEach((petal, index) => {
      const speed = 0.3 + (index * 0.1);
      const yPos = -(scrolled * speed);
      petal.style.transform = `translateY(${yPos}px)`;
    });
  }
});

// ===== DYNAMIC YEAR/DATE VALIDATION (Optional) =====
// If the wedding date has passed, you could show a message
// For now, we'll keep it static

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

// ===== CURSOR EFFECT (OPTIONAL PREMIUM TOUCH) =====
let cursorDot = null;
let cursorOutline = null;

// Only add cursor effects on desktop
if (window.innerWidth > 768) {
  cursorDot = document.createElement('div');
  cursorDot.className = 'cursor-dot';
  cursorDot.style.cssText = `
    position: fixed;
    width: 8px;
    height: 8px;
    background: rgba(200,153,42,0.8);
    border-radius: 50%;
    pointer-events: none;
    z-index: 10000;
    transition: transform 0.15s ease;
  `;
  document.body.appendChild(cursorDot);

  cursorOutline = document.createElement('div');
  cursorOutline.className = 'cursor-outline';
  cursorOutline.style.cssText = `
    position: fixed;
    width: 32px;
    height: 32px;
    border: 2px solid rgba(123,28,46,0.4);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.2s ease, width 0.2s, height 0.2s;
  `;
  document.body.appendChild(cursorOutline);

  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let outlineX = 0, outlineY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    // Smooth follow for dot
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    
    // Slower follow for outline
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    if (cursorDot) {
      cursorDot.style.left = cursorX + 'px';
      cursorDot.style.top = cursorY + 'px';
    }
    
    if (cursorOutline) {
      cursorOutline.style.left = (outlineX - 16) + 'px';
      cursorOutline.style.top = (outlineY - 16) + 'px';
    }

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Scale cursor on hover over interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .event-card, .family-card');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (cursorDot) cursorDot.style.transform = 'scale(1.5)';
      if (cursorOutline) {
        cursorOutline.style.width = '48px';
        cursorOutline.style.height = '48px';
        cursorOutline.style.left = (outlineX - 24) + 'px';
        cursorOutline.style.top = (outlineY - 24) + 'px';
      }
    });
    
    el.addEventListener('mouseleave', () => {
      if (cursorDot) cursorDot.style.transform = 'scale(1)';
      if (cursorOutline) {
        cursorOutline.style.width = '32px';
        cursorOutline.style.height = '32px';
      }
    });
  });
}

// ===== CONFETTI EFFECT ON LOAD (Optional celebratory touch) =====
function createConfetti() {
  const colors = ['#C8992A', '#E8C45A', '#FFB3C6', '#A8E6CF'];
  const confettiCount = 50;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
      position: fixed;
      width: ${Math.random() * 8 + 4}px;
      height: ${Math.random() * 8 + 4}px;
      background: ${colors[Math.floor(Math.random() * colors.length)]};
      top: -10px;
      left: ${Math.random() * 100}vw;
      opacity: ${Math.random() * 0.7 + 0.3};
      border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
      pointer-events: none;
      z-index: 9998;
      animation: confettiFall ${Math.random() * 3 + 3}s linear forwards;
    `;
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 6000);
  }
}

// Add confetti animation
const style = document.createElement('style');
style.textContent = `
  @keyframes confettiFall {
    to {
      transform: translateY(100vh) rotate(${Math.random() * 360}deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Trigger confetti on page load (once)
let confettiShown = false;
window.addEventListener('load', () => {
  if (!confettiShown) {
    setTimeout(createConfetti, 800);
    confettiShown = true;
  }
});

// ===== PREVENT CONTEXT MENU ON IMAGES (Optional protection) =====
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('contextmenu', e => e.preventDefault());
});

// ===== LOG CONSOLE MESSAGE =====
console.log('%c💍 शुभविवाह सोहळा 💍', 'font-size: 20px; color: #C8992A; font-weight: bold;');
console.log('%cDigital invitation created with love ❤️', 'font-size: 12px; color: #7B1C2E;');
