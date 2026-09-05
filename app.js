/* ==========================================================================
   BASECASE — MASTER INTERACTIVE ENGINE & SCROLL CONTROL SYSTEM
   Lenis + GSAP ScrollTrigger + Interactive Camera Lens + Video Observer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCloudinaryMediaUrls();
  initLenisSmoothScroll();
  initCustomCursor();
  initAtmosphericCloudCanvas();
  initInteractiveLensPhysics();
  initGSAPScrollScrubbing();
  initVideoPerformanceObserver();
  initPhotographyCategoryFilter();
});

/* 0. CLOUDINARY CDN DYNAMIC BINDING */
function initCloudinaryMediaUrls() {
  if (typeof CLOUDINARY_CONFIG === 'undefined' || !CLOUDINARY_CONFIG.cloudName || CLOUDINARY_CONFIG.cloudName === 'your_cloud_name_here') return;

  // Bind Cloudinary Videos
  const videoElements = document.querySelectorAll('[data-cloudinary-video]');
  videoElements.forEach(el => {
    const key = el.getAttribute('data-cloudinary-video');
    if (key && typeof getCloudinaryVideoUrl === 'function') {
      const cdnUrl = getCloudinaryVideoUrl(key);
      if (cdnUrl) el.src = cdnUrl;
    }
  });

  // Bind Cloudinary Photos
  const photoElements = document.querySelectorAll('[data-cloudinary-photo]');
  photoElements.forEach(el => {
    const key = el.getAttribute('data-cloudinary-photo');
    if (key && typeof getCloudinaryPhotoUrl === 'function') {
      const cdnUrl = getCloudinaryPhotoUrl(key);
      if (cdnUrl) el.src = cdnUrl;
    }
  });
}

/* 1. LENIS SMOOTH SCROLLING SETUP */
let lenis;
function initLenisSmoothScroll() {
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }
}

/* 2. CUSTOM MICRO CURSOR & DYNAMIC HOVER BADGES */
function initCustomCursor() {
  const cursor = document.getElementById('customCursor');
  const badge = document.getElementById('cursorBadge');
  if (!cursor || !badge) return;

  let mouseX = -100;
  let mouseY = -100;
  let cursorX = -100;
  let cursorY = -100;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    cursorX += (mouseX - cursorX) * 0.18;
    cursorY += (mouseY - cursorY) * 0.18;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover triggers for interactive items
  const cursorTriggers = document.querySelectorAll('[data-cursor]');
  cursorTriggers.forEach(el => {
    el.addEventListener('mouseenter', () => {
      const label = el.getAttribute('data-cursor') || 'VIEW';
      badge.innerText = label;
      cursor.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
      badge.innerText = '';
    });
  });
}

/* 3. PROCEDURAL HERO ATMOSPHERIC CLOUD CANVAS */
function initAtmosphericCloudCanvas() {
  const canvas = document.getElementById('cloudCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = canvas.offsetWidth);
  let height = (canvas.height = canvas.offsetHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  });

  // Particle cloud system
  const particles = [];
  const particleCount = 24;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 260 + 140,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.2,
      alpha: Math.random() * 0.12 + 0.03,
    });
  }

  function renderClouds() {
    ctx.clearRect(0, 0, width, height);

    // Dark moody radial vignette base
    const baseGradient = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, Math.max(width, height));
    baseGradient.addColorStop(0, '#12141a');
    baseGradient.addColorStop(0.6, '#08090c');
    baseGradient.addColorStop(1, '#050505');
    ctx.fillStyle = baseGradient;
    ctx.fillRect(0, 0, width, height);

    // Draw atmospheric cloud puffs
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -p.radius) p.x = width + p.radius;
      if (p.x > width + p.radius) p.x = -p.radius;
      if (p.y < -p.radius) p.y = height + p.radius;
      if (p.y > height + p.radius) p.y = -p.radius;

      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
      grad.addColorStop(0, `rgba(160, 180, 210, ${p.alpha})`);
      grad.addColorStop(0.5, `rgba(60, 75, 100, ${p.alpha * 0.4})`);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(renderClouds);
  }
  renderClouds();
}

/* 4. INTERACTIVE BASECASE CAMERA LENS & MECHANICAL APERTURE IRIS */
function initInteractiveLensPhysics() {
  const lensWrapper = document.getElementById('heroLens');
  const lensPhoto = document.getElementById('lensPhoto');
  const lensRingOuter = document.getElementById('lensRingOuter');
  const lensReflection = document.getElementById('lensReflection');
  if (!lensWrapper || !lensPhoto) return;

  const chassis = lensWrapper.querySelector('.lens-chassis');

  // Subtle Mouse 3D Tilt & Parallax Reaction
  let bounds = lensWrapper.getBoundingClientRect();
  window.addEventListener('resize', () => { bounds = lensWrapper.getBoundingClientRect(); });

  lensWrapper.addEventListener('mousemove', (e) => {
    const x = e.clientX - (bounds.left + bounds.width / 2);
    const y = e.clientY - (bounds.top + bounds.height / 2);
    const rotateX = (-y / (bounds.height / 2)) * 12;
    const rotateY = (x / (bounds.width / 2)) * 12;

    if (chassis) chassis.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    if (lensReflection) lensReflection.style.transform = `translate3d(${x * 0.12}px, ${y * 0.12}px, 0)`;
  });

  lensWrapper.addEventListener('mouseleave', () => {
    if (chassis) chassis.style.transform = `rotateX(0deg) rotateY(0deg)`;
    if (lensReflection) lensReflection.style.transform = `translate3d(0, 0, 0)`;
  });

  // Scroll Scrubbed Mechanical Aperture Opening & Optical Reveal
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    const heroSec = document.getElementById('intro');

    gsap.timeline({
      scrollTrigger: {
        trigger: heroSec,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
      }
    })
    .to(lensPhoto, {
      clipPath: 'circle(75% at 50% 50%)',
      filter: 'blur(0px) brightness(1.0)',
      scale: 1.15,
      ease: 'none',
    }, 0)
    .to(lensRingOuter, {
      rotation: 180,
      ease: 'none',
    }, 0);
  }
}

/* 5. GSAP SCROLL SCRUBBING & COLOR THEME ENGINE */
function initGSAPScrollScrubbing() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Marquee horizontal velocity scrubbing
  const marqueeTracks = document.querySelectorAll('[data-scrub-marquee]');
  marqueeTracks.forEach(track => {
    const speed = parseFloat(track.getAttribute('data-scrub-speed')) || -35;
    gsap.to(track, {
      xPercent: speed,
      ease: 'none',
      scrollTrigger: {
        trigger: track.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      }
    });
  });

  // Kinetic headline horizontal displacement
  const scrubTexts = document.querySelectorAll('[data-scrub-text]');
  scrubTexts.forEach(elem => {
    gsap.to(elem, {
      yPercent: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: elem,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5,
      }
    });
  });

  // Solid Color Field Background Theme Switching
  const sections = document.querySelectorAll('.editorial-section');
  sections.forEach(sec => {
    const bg = sec.getAttribute('data-bg-color');
    if (bg) {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => changeBodyTheme(bg),
        onEnterBack: () => changeBodyTheme(bg),
      });
    }
  });
}

function changeBodyTheme(color) {
  document.body.style.backgroundColor = color;
}

/* 6. VIDEO PERFORMANCE INTERSECTION OBSERVER */
function initVideoPerformanceObserver() {
  const videos = document.querySelectorAll('.basecase-video-player');
  if (!videos.length) return;

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        // Play video safely when visible
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Auto-play prevented or paused, ignore
          });
        }
      } else {
        // Pause video immediately when outside viewport
        video.pause();
      }
    });
  }, {
    threshold: 0.2
  });

  videos.forEach(v => videoObserver.observe(v));
}

/* 7. PHOTOGRAPHY CATEGORY FILTERING */
function initPhotographyCategoryFilter() {
  const pills = document.querySelectorAll('.cat-pill');
  const items = document.querySelectorAll('.photo-item');
  if (!pills.length || !items.length) return;

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const catText = pill.innerText.trim();
      items.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (catText.includes('ALL') || (itemCat && catText.includes(itemCat))) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}
