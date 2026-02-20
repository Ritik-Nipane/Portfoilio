/* ============================================
   RITIK NIPANE — PORTFOLIO
   Main Animation Script
   app.js — Loaded via /static/app.js
   ============================================ */

(function () {
  'use strict';

  /* ─────────────────────────────────────────
     1. LOADING SCREEN
  ───────────────────────────────────────── */
  function createLoadingScreen() {
    const screen = document.createElement('div');
    screen.id = 'loadingScreen';
    screen.innerHTML = `
      <div style="text-align:center">
        <div style="font-family:'Space Grotesk',sans-serif; font-size:1.2rem; font-weight:900; color:#fff; letter-spacing:-0.02em; margin-bottom:8px;">
          RN<span style="color:#06b6d4;">.</span>
        </div>
        <div style="font-family:'JetBrains Mono',monospace; font-size:0.65rem; color:rgba(6,182,212,0.6); letter-spacing:0.3em; text-transform:uppercase; margin-bottom:20px;" id="loadingText">Initializing Data</div>
        <div class="loading-bar-outer">
          <div class="loading-bar-inner" id="loadingBar"></div>
        </div>
        <div style="font-family:'JetBrains Mono',monospace; font-size:0.6rem; color:rgba(148,163,184,0.4); margin-top:8px;" id="loadingPct">0%</div>
      </div>
    `;
    document.body.prepend(screen);

    const bar = document.getElementById('loadingBar');
    const pct = document.getElementById('loadingPct');
    const txt = document.getElementById('loadingText');
    const phases = ['Initializing Data', 'Loading Pipelines', 'Rendering Canvas', 'Calibrating'];
    let progress = 0;

    const interval = setInterval(() => {
      progress += Math.random() * 18 + 5;
      if (progress > 100) progress = 100;
      bar.style.width = progress + '%';
      pct.textContent = Math.round(progress) + '%';
      txt.textContent = phases[Math.floor(progress / 26)] || 'Ready';
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          gsap.to(screen, {
            opacity: 0, duration: 0.8, ease: 'power2.inOut',
            onComplete: () => screen.remove()
          });
        }, 200);
      }
    }, 80);
  }

  /* ─────────────────────────────────────────
     2. SMOOTH SCROLL — LENIS
  ───────────────────────────────────────── */
  function initLenis() {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return lenis;
  }

  /* ─────────────────────────────────────────
     3. THREE.JS HERO CANVAS — PARTICLE NETWORK
  ───────────────────────────────────────── */
  function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x06060E, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 60;

    /* ── Particle System ── */
    const PARTICLE_COUNT = 160;
    const positions = [];
    const velocities = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions.push(
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 70,
        (Math.random() - 0.5) * 40
      );
      velocities.push(
        (Math.random() - 0.5) * 0.04,
        (Math.random() - 0.5) * 0.03,
        (Math.random() - 0.5) * 0.02
      );
    }

    /* Particle dots */
    const posArray = new Float32Array(positions);
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 0.6,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    /* Connection lines */
    const MAX_CONNECTIONS = 300;
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = new Float32Array(MAX_CONNECTIONS * 6);
    const lineColors = new Float32Array(MAX_CONNECTIONS * 6);

    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMat = new THREE.LineSegments(
      lineGeo,
      new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.25 })
    );
    scene.add(lineMat);

    /* Mouse influence */
    const mouse3D = { x: 0, y: 0 };
    let targetMX = 0, targetMY = 0;

    window.addEventListener('mousemove', (e) => {
      targetMX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMY = -(e.clientY / window.innerHeight - 0.5) * 2;
    });

    /* Animation loop */
    const posAttr = particleGeo.attributes.position;

    function animateParticles() {
      // Smooth mouse
      mouse3D.x += (targetMX - mouse3D.x) * 0.04;
      mouse3D.y += (targetMY - mouse3D.y) * 0.04;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;

        // Move
        posArray[ix]  += velocities[i * 3];
        posArray[iy]  += velocities[i * 3 + 1];
        posArray[iz]  += velocities[i * 3 + 2];

        // Mouse repel
        const dx = posArray[ix] - mouse3D.x * 50;
        const dy = posArray[iy] - mouse3D.y * 30;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 15) {
          const force = (15 - dist) / 15 * 0.1;
          posArray[ix] += (dx / dist) * force;
          posArray[iy] += (dy / dist) * force;
        }

        // Boundary wrap
        if (posArray[ix]  >  60) posArray[ix]  = -60;
        if (posArray[ix]  < -60) posArray[ix]  =  60;
        if (posArray[iy]  >  35) posArray[iy]  = -35;
        if (posArray[iy]  < -35) posArray[iy]  =  35;
        if (posArray[iz]  >  20) posArray[iz]  = -20;
        if (posArray[iz]  < -20) posArray[iz]  =  20;
      }

      posAttr.needsUpdate = true;

      // Update lines
      let lineIdx = 0;
      const lp = lineGeo.attributes.position.array;
      const lc = lineGeo.attributes.color.array;

      for (let i = 0; i < PARTICLE_COUNT && lineIdx < MAX_CONNECTIONS; i++) {
        for (let j = i + 1; j < PARTICLE_COUNT && lineIdx < MAX_CONNECTIONS; j++) {
          const ax = posArray[i*3], ay = posArray[i*3+1];
          const bx = posArray[j*3], by = posArray[j*3+1];
          const d = Math.sqrt((ax-bx)**2 + (ay-by)**2);
          if (d < 22) {
            const alpha = (1 - d / 22) * 0.6;
            lp[lineIdx*6+0] = ax; lp[lineIdx*6+1] = ay; lp[lineIdx*6+2] = posArray[i*3+2];
            lp[lineIdx*6+3] = bx; lp[lineIdx*6+4] = by; lp[lineIdx*6+5] = posArray[j*3+2];
            lc[lineIdx*6+0] = alpha * 0.05; lc[lineIdx*6+1] = alpha * 0.7; lc[lineIdx*6+2] = alpha * 0.85;
            lc[lineIdx*6+3] = alpha * 0.05; lc[lineIdx*6+4] = alpha * 0.7; lc[lineIdx*6+5] = alpha * 0.85;
            lineIdx++;
          }
        }
      }

      lineGeo.setDrawRange(0, lineIdx * 2);
      lineGeo.attributes.position.needsUpdate = true;
      lineGeo.attributes.color.needsUpdate = true;

      // Camera drift
      camera.position.x += (mouse3D.x * 3 - camera.position.x) * 0.02;
      camera.position.y += (mouse3D.y * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    }

    gsap.ticker.add(animateParticles);

    /* Resize */
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  /* ─────────────────────────────────────────
     4. CUSTOM CURSOR
  ───────────────────────────────────────── */
  function initCursor() {
    const cursor = document.getElementById('cursor');
    const trail = document.getElementById('cursorTrail');
    if (!cursor) return;

    let mx = 0, my = 0, tx = 0, ty = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      gsap.to(cursor, { x: mx, y: my, duration: 0.1, ease: 'power1.out' });
    });

    gsap.ticker.add(() => {
      tx += (mx - tx) * 0.12;
      ty += (my - ty) * 0.12;
      gsap.set(trail, { x: tx, y: ty });
    });

    // Hover expand
    document.querySelectorAll('a, button, .magnetic-btn, .skill-tag-interactive, .experience-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursor, { width: 24, height: 24, borderColor: 'rgba(6,182,212,1)', duration: 0.2 });
        gsap.to(trail, { width: 48, height: 48, duration: 0.3 });
      });
      el.addEventListener('mouseleave', () => {
        gsap.to(cursor, { width: 16, height: 16, borderColor: 'rgba(6,182,212,0.7)', duration: 0.2 });
        gsap.to(trail, { width: 32, height: 32, duration: 0.3 });
      });
    });
  }

  /* ─────────────────────────────────────────
     5. HERO TEXT SCRAMBLE
  ───────────────────────────────────────── */
  function textScramble(el, finalText, duration = 1800) {
    const chars = '0123456789!@#$%&*ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefgh';
    let frame = 0;
    const totalFrames = duration / 16;
    const originalBg = el.style.backgroundImage || el.style.background;

    const raf = () => {
      const progress = frame / totalFrames;
      let output = '';
      for (let i = 0; i < finalText.length; i++) {
        if (finalText[i] === ' ') { output += ' '; continue; }
        if (i < finalText.length * progress) {
          output += finalText[i];
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      el.textContent = output;
      frame++;
      if (frame < totalFrames) {
        requestAnimationFrame(raf);
      } else {
        el.textContent = finalText;
        // Restore gradient
        el.style.background = 'linear-gradient(135deg, #ffffff 0%, #94a3b8 50%, #ffffff 100%)';
        el.style.webkitBackgroundClip = 'text';
        el.style.webkitTextFillColor = 'transparent';
        el.style.backgroundClip = 'text';
      }
    };

    // Set monospace during scramble
    el.style.fontFamily = "'JetBrains Mono', monospace";
    el.style.webkitTextFillColor = '#06b6d4';
    el.style.background = 'none';
    el.style.backgroundClip = 'unset';

    requestAnimationFrame(raf);
  }

  /* ─────────────────────────────────────────
     6. HERO GSAP ENTRANCE
  ───────────────────────────────────────── */
  function initHeroAnimations() {
    const tl = gsap.timeline({ delay: 0.5 });

    // Name scramble
    const nameEl = document.getElementById('heroName');
    if (nameEl) {
      gsap.set(nameEl, { opacity: 0, y: 40 });
      tl.to(nameEl, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
        onComplete: () => {
          nameEl.style.fontFamily = "'Space Grotesk', sans-serif";
          textScramble(nameEl, 'Ritik Nipane', 1600);
        }
      });
    }

    // Subtitle
    const subtitleEl = document.querySelector('.hero-subtitle');
    if (subtitleEl) {
      gsap.set(subtitleEl, { y: 30, opacity: 0 });
      tl.to(subtitleEl, { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.2');
    }

    // CTAs
    const ctasEl = document.getElementById('heroCtas');
    if (ctasEl) {
      const btns = ctasEl.querySelectorAll('a');
      gsap.set(btns, { y: 20, opacity: 0 });
      tl.to(btns, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.3');
    }
  }

  /* ─────────────────────────────────────────
     7. NAV SCROLL EFFECT
  ───────────────────────────────────────── */
  function initNav() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;
    ScrollTrigger.create({
      start: 'top -80px',
      onEnter: () => nav.classList.add('scrolled'),
      onLeaveBack: () => nav.classList.remove('scrolled'),
    });
  }

  /* ─────────────────────────────────────────
     8. REVEAL ON SCROLL (generic)
  ───────────────────────────────────────── */
  function initRevealAnimations() {
    // Reveal up
    gsap.utils.toArray('.reveal-up').forEach(el => {
      gsap.to(el, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      });
    });

    // Reveal left
    gsap.utils.toArray('.reveal-left').forEach(el => {
      gsap.to(el, {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      });
    });

    // Reveal right
    gsap.utils.toArray('.reveal-right').forEach(el => {
      gsap.to(el, {
        opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
      });
    });
  }

  /* ─────────────────────────────────────────
     9. EXPERIENCE PIPELINE ANIMATION
  ───────────────────────────────────────── */
  function initTimelineAnimation() {
    const container = document.querySelector('.timeline-container');
    if (!container) return;

    const entries = container.querySelectorAll('.timeline-entry');

    entries.forEach((entry, idx) => {
      // Staggered bullet points on scroll
      const bullets = entry.querySelectorAll('.exp-bullet');
      const card = entry.querySelector('.experience-card');

      ScrollTrigger.create({
        trigger: entry,
        start: 'top 75%',
        onEnter: () => {
          // Card spring-in
          gsap.from(card, {
            scale: 0.96, rotateX: 3, rotateY: idx % 2 === 0 ? 2 : -2,
            opacity: 0, duration: 0.7, ease: 'back.out(1.4)'
          });

          // Stagger bullets
          gsap.to(bullets, {
            opacity: 1, y: 0, duration: 0.5,
            stagger: 0.08, ease: 'power2.out', delay: 0.3
          });
        }
      });

      // 3D tilt on card hover
      if (card) {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const cx = (e.clientX - rect.left) / rect.width - 0.5;
          const cy = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(card, {
            rotateY: cx * 8, rotateX: -cy * 6,
            duration: 0.4, ease: 'power2.out',
            transformPerspective: 800
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
        });
      }
    });

    // Pipeline progress line animation
    const pipelineLine = document.getElementById('pipelineProgress');
    const dataPacket = document.getElementById('dataPacket');

    if (pipelineLine && dataPacket && window.innerWidth >= 768) {
      const totalHeight = container.offsetHeight;

      gsap.to({ progress: 0 }, {
        progress: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top center',
          end: 'bottom center',
          scrub: 0.5,
          onUpdate: (self) => {
            const h = self.progress * totalHeight;
            pipelineLine.setAttribute('y2', h);
            dataPacket.setAttribute('cy', h);
            dataPacket.setAttribute('opacity', self.progress > 0.01 ? 1 : 0);
          }
        }
      });
    }
  }

  /* ─────────────────────────────────────────
     10. RADAR CHART — CANVAS
  ───────────────────────────────────────── */
  function initRadarChart() {
    const canvas = document.getElementById('radarChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const cx = W / 2, cy = H / 2;
    const R = Math.min(W, H) / 2 - 40;

    const skills = [
      { label: 'Python / SQL', value: 0.9, color: '#06b6d4' },
      { label: 'Power BI', value: 0.88, color: '#0ea5e9' },
      { label: 'Tableau', value: 0.82, color: '#22d3ee' },
      { label: 'Pandas/ML', value: 0.78, color: '#3b82f6' },
      { label: 'Risk Analysis', value: 0.92, color: '#06b6d4' },
      { label: 'Data Modeling', value: 0.85, color: '#0ea5e9' },
    ];

    const N = skills.length;
    let animProgress = 0;
    let animating = false;

    function drawRadar(progress) {
      ctx.clearRect(0, 0, W, H);

      // Background circles
      for (let r = 1; r <= 5; r++) {
        const rad = (R * r) / 5;
        ctx.beginPath();
        for (let i = 0; i < N; i++) {
          const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
          const x = cx + rad * Math.cos(angle);
          const y = cy + rad * Math.sin(angle);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(6,182,212,0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
        if (r === 5) {
          ctx.fillStyle = 'rgba(6,182,212,0.015)';
          ctx.fill();
        }
      }

      // Axes
      for (let i = 0; i < N; i++) {
        const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle));
        ctx.strokeStyle = 'rgba(6,182,212,0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Data polygon
      ctx.beginPath();
      for (let i = 0; i < N; i++) {
        const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
        const val = skills[i].value * progress;
        const x = cx + R * val * Math.cos(angle);
        const y = cy + R * val * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();

      // Gradient fill
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
      grad.addColorStop(0, 'rgba(6,182,212,0.3)');
      grad.addColorStop(1, 'rgba(6,182,212,0.05)');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(6,182,212,0.8)';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Data points
      for (let i = 0; i < N; i++) {
        const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
        const val = skills[i].value * progress;
        const x = cx + R * val * Math.cos(angle);
        const y = cy + R * val * Math.sin(angle);

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#06b6d4';
        ctx.shadowColor = '#06b6d4';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Labels
      ctx.shadowBlur = 0;
      for (let i = 0; i < N; i++) {
        const angle = (Math.PI * 2 * i) / N - Math.PI / 2;
        const labelR = R + 28;
        const x = cx + labelR * Math.cos(angle);
        const y = cy + labelR * Math.sin(angle);

        ctx.font = "bold 11px 'JetBrains Mono', monospace";
        ctx.fillStyle = 'rgba(148,163,184,0.9)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(skills[i].label, x, y);
      }
    }

    // Animate on scroll
    ScrollTrigger.create({
      trigger: canvas,
      start: 'top 80%',
      onEnter: () => {
        if (animating) return;
        animating = true;
        gsap.to({ p: 0 }, {
          p: 1, duration: 1.5, ease: 'power2.out',
          onUpdate: function() { drawRadar(this.targets()[0].p); }
        });
      }
    });

    drawRadar(0);
  }

  /* ─────────────────────────────────────────
     11. MAGNETIC BUTTONS
  ───────────────────────────────────────── */
  function initMagneticButtons() {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.35;
        const dy = (e.clientY - cy) * 0.35;
        gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      });
    });
  }

  /* ─────────────────────────────────────────
     12. MARQUEE — GSAP FALLBACK
     (CSS handles it, GSAP controls speed on hover)
  ───────────────────────────────────────── */
  function initMarquee() {
    const track = document.getElementById('marqueeTrack');
    if (!track) return;

    // GSAP-powered infinite marquee (more reliable than CSS)
    const inners = track.querySelectorAll('.marquee-inner');
    if (!inners.length) return;

    // Remove CSS animation from marquee-inner
    inners.forEach(el => { el.style.animation = 'none'; });

    const totalWidth = inners[0].offsetWidth;
    let speed = 1;
    let x = 0;
    let paused = false;

    track.addEventListener('mouseenter', () => { speed = 0.2; });
    track.addEventListener('mouseleave', () => { speed = 1; });

    gsap.ticker.add(() => {
      if (paused) return;
      x -= speed;
      if (Math.abs(x) >= totalWidth) x = 0;
      inners.forEach(el => { el.style.transform = `translateX(${x}px)`; });
    });
  }

  /* ─────────────────────────────────────────
     13. PROJECTS HORIZONTAL PANEL SCROLL
  ───────────────────────────────────────── */
  function initProjectsScroll() {
    const slides = document.querySelectorAll('.project-slide');
    if (!slides.length) return;

    slides.forEach((slide, i) => {
      const visual = slide.querySelector('.project-visual');
      const mockup = slide.querySelector('.project-mockup');

      if (visual) {
        gsap.fromTo(visual,
          { yPercent: 5, opacity: 0.7 },
          {
            yPercent: -5, opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: slide,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5
            }
          }
        );
      }

      // Stagger info reveal
      const info = slide.querySelector('.project-info');
      if (info) {
        const children = info.querySelectorAll('.reveal-up > *');
        gsap.from(info, {
          x: -40, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: slide, start: 'top 70%', toggleActions: 'play none none none' }
        });
      }

      // Mockup entrance
      if (mockup) {
        gsap.from(mockup, {
          y: 40, opacity: 0, rotateX: 5,
          duration: 0.9, ease: 'power3.out',
          transformPerspective: 1000,
          scrollTrigger: { trigger: slide, start: 'top 65%', toggleActions: 'play none none none' }
        });
      }
    });
  }

  /* ─────────────────────────────────────────
     14. SKILL CATEGORY DIM EFFECT
  ───────────────────────────────────────── */
  function initSkillHovers() {
    const chips = document.querySelectorAll('.skill-tag-interactive');
    const section = document.getElementById('skills');

    chips.forEach(chip => {
      chip.addEventListener('mouseenter', () => {
        // Dim other chips slightly
        chips.forEach(other => {
          if (other !== chip) {
            gsap.to(other, { opacity: 0.35, duration: 0.25 });
          }
        });
        // Dim section background
        gsap.to(section, { '--bg-dim': 1, duration: 0.25 });
      });

      chip.addEventListener('mouseleave', () => {
        chips.forEach(other => {
          gsap.to(other, { opacity: 1, duration: 0.35 });
        });
      });
    });
  }

  /* ─────────────────────────────────────────
     15. SMOOTH ANCHOR SCROLLING
  ───────────────────────────────────────── */
  function initAnchorScrolling(lenis) {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target && lenis) {
          lenis.scrollTo(target, { offset: -60, duration: 1.6, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        }
      });
    });
  }

  /* ─────────────────────────────────────────
     16. STAT COUNTER ANIMATION
  ───────────────────────────────────────── */
  function initStatCounters() {
    // Not used (stats are text), but triggers a subtle scale pop on the stat cards
    gsap.utils.toArray('.stat-card').forEach((card, i) => {
      gsap.from(card, {
        scale: 0.9, opacity: 0, duration: 0.6,
        ease: 'back.out(1.5)', delay: i * 0.1,
        scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' }
      });
    });
  }

  /* ─────────────────────────────────────────
     17. SECTION HORIZONTAL LINE REVEALS
  ───────────────────────────────────────── */
  function initSectionDividers() {
    gsap.utils.toArray('.section-divider').forEach(el => {
      gsap.from(el, {
        scaleX: 0, transformOrigin: 'left center', duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
      });
    });
  }

  /* ─────────────────────────────────────────
     18. CERT ITEMS STAGGER
  ───────────────────────────────────────── */
  function initCertAnimations() {
    const certs = document.querySelectorAll('.cert-item');
    if (!certs.length) return;
    gsap.from(certs, {
      x: 20, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out',
      scrollTrigger: { trigger: certs[0], start: 'top 85%', toggleActions: 'play none none none' }
    });
  }

  /* ─────────────────────────────────────────
     19. FOOTER PARALLAX
  ───────────────────────────────────────── */
  function initParallax() {
    const hero = document.getElementById('hero');
    if (!hero) return;
    gsap.to('#heroCanvas', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
    });
  }

  /* ─────────────────────────────────────────
     INIT — Wait for DOM
  ───────────────────────────────────────── */
  function init() {
    // Loading screen
    createLoadingScreen();

    // GSAP plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Smooth scroll
    const lenis = initLenis();

    // Wait a tick for everything to settle
    setTimeout(() => {
      // Three.js canvas
      initHeroCanvas();

      // Custom cursor
      initCursor();

      // Hero entrance
      initHeroAnimations();

      // Nav behavior
      initNav();

      // Scroll reveal
      initRevealAnimations();

      // Timeline pipeline
      initTimelineAnimation();

      // Radar chart
      initRadarChart();

      // Magnetic buttons
      initMagneticButtons();

      // Marquee
      initMarquee();

      // Projects parallax
      initProjectsScroll();

      // Skill hover effects
      initSkillHovers();

      // Anchor scrolling
      initAnchorScrolling(lenis);

      // Stat cards
      initStatCounters();

      // Dividers
      initSectionDividers();

      // Certs
      initCertAnimations();

      // Parallax
      initParallax();

      // Refresh ScrollTrigger after all setup
      ScrollTrigger.refresh();

    }, 100);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
