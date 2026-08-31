// Global Main Initializer for Stackly Luxury Platform

document.addEventListener('DOMContentLoaded', () => {
  // Initialize 3-Second Luxury Preloading Screen (Single-Pass Engine)
  initPagePreloader();

  // Initialize Scroll Entrance Animations for Sections & Cards
  initScrollRevealAnimations();

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Create Scroll Progress Bar
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.className = 'fixed top-0 left-0 h-[2px] bg-gradient-to-r from-amber-300 via-amber-500 to-amber-700 z-50 transition-all duration-150';
  document.body.appendChild(progressBar);

  // Handle dynamic navbar header scroll effects
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';

    if (header) {
      if (winScroll > 20) {
        header.classList.add('shadow-[0_10px_30px_rgba(0,0,0,0.85)]', 'border-amber-500/30', 'bg-[#07080d]/98');
        header.classList.remove('bg-[#0c0d12]/95', 'border-[#222432]');
      } else {
        header.classList.remove('shadow-[0_10px_30px_rgba(0,0,0,0.85)]', 'border-amber-500/30', 'bg-[#07080d]/98');
        header.classList.add('bg-[#0c0d12]/95', 'border-[#222432]');
      }
    }
  });

  // Render Toasts container initially
  renderToasts();

  // Subscribe renderToasts to store so new toasts are shown immediately
  if (window.store && typeof renderToasts === 'function') {
    store.subscribe(() => renderToasts());
  }

  // Keyboard shortcuts: Ctrl+K / Cmd+K for command search
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (typeof toggleCommandSearch === 'function') toggleCommandSearch(true);
    }
    if (e.key === 'Escape') {
      if (typeof toggleCommandSearch === 'function') toggleCommandSearch(false);
    }
  });

  // Intercept all page links for 3-second loader transition
  setupNavigationLinkInterceptors();
});

// 3-Second Luxury Preloader Screen Controller (Single-Pass Engine)
function initPagePreloader() {
  const isNavigated = sessionStorage.getItem('stackly_navigated') === 'true';

  // If coming from link navigation transition, skip second 3-second delay on page load!
  if (isNavigated) {
    sessionStorage.removeItem('stackly_navigated');
    return;
  }

  let preloader = document.getElementById('stackly-preloader');
  if (!preloader) {
    preloader = document.createElement('div');
    preloader.id = 'stackly-preloader';
    preloader.className = 'fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07080b] transition-opacity duration-700 pointer-events-auto';
    preloader.innerHTML = `
      <div class="pointer-events-none absolute h-96 w-96 rounded-full bg-amber-500/10 blur-[120px] animate-pulse"></div>
      
      <div class="relative flex flex-col items-center space-y-6 text-center z-10 px-6">
        <svg viewBox="398 82 212 290" xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 filter drop-shadow-[0_0_25px_rgba(252,211,77,0.6)] shrink-0 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_12px_rgba(252,211,77,0.3)]"><path fill="#fcd34d" d="M419.713867,256.179962 C408.001251,235.739304 410.215973,215.613876 419.889709,195.679504 C426.373138,182.319229 436.255493,171.444672 446.508270,160.904480 C457.075165,150.041229 468.783997,140.348602 478.792694,128.896606 C487.411407,119.035004 494.797852,108.464394 500.031921,96.425682 C500.738983,94.799370 501.001617,92.854477 502.785980,91.712807 C503.214905,91.838028 503.879059,91.821617 504.103485,92.127670 C514.526489,106.341171 522.003967,121.483376 518.287415,139.859406 C515.933533,151.498276 508.987885,160.308563 500.296600,167.942245 C487.788574,178.928223 473.634369,187.949692 462.046570,200.037262 C456.219025,206.116135 451.191589,212.659836 449.149933,221.054688 C445.376373,236.570572 454.272034,249.198563 470.197021,250.779221 C485.241028,252.272446 499.302216,248.880798 512.632202,241.996979 C514.021362,241.279602 515.213196,239.793518 517.062500,240.547546 C517.833252,242.063324 516.690857,242.794266 515.917847,243.562866 C502.480865,256.923462 487.519073,267.973206 468.591339,271.949402 C447.923096,276.291199 431.269562,272.383606 419.713867,256.179962 z"/><path fill="#fcd34d" d="M536.351807,311.352905 C521.089722,325.623138 508.631836,341.451172 501.644409,361.304535 C500.580017,360.856842 499.799347,360.777496 499.458496,360.348633 C491.323975,350.113098 485.458466,338.909088 484.707672,325.531189 C484.034546,313.536499 489.236786,303.909576 496.947052,295.363251 C506.737030,284.511749 519.089050,276.702271 530.329102,267.573334 C539.676453,259.981689 548.930542,252.352356 553.649658,240.719803 C556.247925,234.315125 556.803040,227.722214 555.167542,221.122284 C551.964783,208.197189 539.399353,200.886032 526.174622,203.877502 C513.911682,206.651428 503.242737,212.702515 493.079834,219.823700 C492.039246,220.552856 491.267578,221.851700 489.661957,221.557190 C488.659760,220.289383 489.653076,219.345703 490.287292,218.480408 C503.850159,199.976334 521.506714,187.674316 544.321167,183.636948 C574.742554,178.253418 599.437622,199.883118 594.804749,234.346802 C592.539368,251.198425 583.628967,264.794067 572.581299,277.156372 C561.558105,289.491241 548.610413,299.803345 536.351807,311.352905 z"/></svg>

        <div class="space-y-1">
          <span class="font-display tracking-[0.25em] text-2xl font-extrabold text-white block">STACKLY RESERVE</span>
          <span class="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold block">Haute Gastronomy Portal</span>
        </div>

        <p id="preloader-text" class="text-xs text-[#8c8f9f] font-light tracking-wider max-w-xs animate-pulse">
          Orchestrating 3-Star Michelin Allocations...
        </p>

        <div class="w-64 h-1.5 rounded-full bg-[#171926] border border-[#2b2e40] overflow-hidden p-0.5 relative shadow-inner">
          <div id="preloader-progress-bar" class="h-full rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 w-0 transition-all duration-[3000ms] ease-out shadow-[0_0_12px_rgba(212,175,55,0.8)]"></div>
        </div>

        <span id="preloader-percent" class="font-mono text-[10px] font-bold text-amber-300 uppercase tracking-widest">
          Loading Portal... 0%
        </span>
      </div>
    `;
    document.body.prepend(preloader);
    if (window.lucide) window.lucide.createIcons();
  }

  const bar = document.getElementById('preloader-progress-bar');
  const percentText = document.getElementById('preloader-percent');

  if (bar) {
    bar.style.width = '0%';
    setTimeout(() => {
      bar.style.width = '100%';
    }, 50);
  }

  const startTime = Date.now();
  const interval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const pct = Math.min(100, Math.floor((elapsed / 3000) * 100));
    if (percentText) percentText.textContent = `Loading Portal... ${pct}%`;
    if (elapsed >= 3000) {
      clearInterval(interval);
      if (preloader) {
        preloader.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 700);
      }
    }
  }, 100);
}

// Intercept page links to trigger 3-second loader transition before navigating
function setupNavigationLinkInterceptors() {
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (!anchor) return;
    const href = anchor.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('javascript') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

    // Check if it's an internal HTML page link
    if (href.endsWith('.html') || href.includes('.html?')) {
      e.preventDefault();
      trigger3SecPageNavigation(href);
    }
  });
}

function trigger3SecPageNavigation(targetUrl) {
  let preloader = document.getElementById('stackly-preloader');
  if (!preloader) {
    preloader = document.createElement('div');
    preloader.id = 'stackly-preloader';
    preloader.className = 'fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07080b] transition-opacity duration-700 pointer-events-auto';
    preloader.innerHTML = `
      <div class="pointer-events-none absolute h-96 w-96 rounded-full bg-amber-500/10 blur-[120px] animate-pulse"></div>
      
      <div class="relative flex flex-col items-center space-y-6 text-center z-10 px-6">
        <svg viewBox="398 82 212 290" xmlns="http://www.w3.org/2000/svg" class="h-20 w-20 filter drop-shadow-[0_0_25px_rgba(252,211,77,0.6)] shrink-0 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_12px_rgba(252,211,77,0.3)]"><path fill="#fcd34d" d="M419.713867,256.179962 C408.001251,235.739304 410.215973,215.613876 419.889709,195.679504 C426.373138,182.319229 436.255493,171.444672 446.508270,160.904480 C457.075165,150.041229 468.783997,140.348602 478.792694,128.896606 C487.411407,119.035004 494.797852,108.464394 500.031921,96.425682 C500.738983,94.799370 501.001617,92.854477 502.785980,91.712807 C503.214905,91.838028 503.879059,91.821617 504.103485,92.127670 C514.526489,106.341171 522.003967,121.483376 518.287415,139.859406 C515.933533,151.498276 508.987885,160.308563 500.296600,167.942245 C487.788574,178.928223 473.634369,187.949692 462.046570,200.037262 C456.219025,206.116135 451.191589,212.659836 449.149933,221.054688 C445.376373,236.570572 454.272034,249.198563 470.197021,250.779221 C485.241028,252.272446 499.302216,248.880798 512.632202,241.996979 C514.021362,241.279602 515.213196,239.793518 517.062500,240.547546 C517.833252,242.063324 516.690857,242.794266 515.917847,243.562866 C502.480865,256.923462 487.519073,267.973206 468.591339,271.949402 C447.923096,276.291199 431.269562,272.383606 419.713867,256.179962 z"/><path fill="#fcd34d" d="M536.351807,311.352905 C521.089722,325.623138 508.631836,341.451172 501.644409,361.304535 C500.580017,360.856842 499.799347,360.777496 499.458496,360.348633 C491.323975,350.113098 485.458466,338.909088 484.707672,325.531189 C484.034546,313.536499 489.236786,303.909576 496.947052,295.363251 C506.737030,284.511749 519.089050,276.702271 530.329102,267.573334 C539.676453,259.981689 548.930542,252.352356 553.649658,240.719803 C556.247925,234.315125 556.803040,227.722214 555.167542,221.122284 C551.964783,208.197189 539.399353,200.886032 526.174622,203.877502 C513.911682,206.651428 503.242737,212.702515 493.079834,219.823700 C492.039246,220.552856 491.267578,221.851700 489.661957,221.557190 C488.659760,220.289383 489.653076,219.345703 490.287292,218.480408 C503.850159,199.976334 521.506714,187.674316 544.321167,183.636948 C574.742554,178.253418 599.437622,199.883118 594.804749,234.346802 C592.539368,251.198425 583.628967,264.794067 572.581299,277.156372 C561.558105,289.491241 548.610413,299.803345 536.351807,311.352905 z"/></svg>

        <div class="space-y-1">
          <span class="font-display tracking-[0.25em] text-2xl font-extrabold text-white block">STACKLY RESERVE</span>
          <span class="text-xs uppercase tracking-[0.3em] text-amber-400 font-semibold block">Haute Gastronomy Portal</span>
        </div>

        <p id="preloader-text" class="text-xs text-[#8c8f9f] font-light tracking-wider max-w-xs animate-pulse">
          Orchestrating 3-Star Michelin Allocations...
        </p>

        <div class="w-64 h-1.5 rounded-full bg-[#171926] border border-[#2b2e40] overflow-hidden p-0.5 relative shadow-inner">
          <div id="preloader-progress-bar" class="h-full rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 w-0 transition-all duration-[3000ms] ease-out shadow-[0_0_12px_rgba(212,175,55,0.8)]"></div>
        </div>

        <span id="preloader-percent" class="font-mono text-[10px] font-bold text-amber-300 uppercase tracking-widest">
          Navigating... 0%
        </span>
      </div>
    `;
    document.body.prepend(preloader);
    if (window.lucide) window.lucide.createIcons();
  }

  preloader.style.display = 'flex';
  preloader.classList.remove('opacity-0', 'pointer-events-none');
  const bar = document.getElementById('preloader-progress-bar');
  const percentText = document.getElementById('preloader-percent');
  
  if (bar) bar.style.width = '0%';
  setTimeout(() => {
    if (bar) bar.style.width = '100%';
  }, 50);

  const startTime = Date.now();
  const interval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const pct = Math.min(100, Math.floor((elapsed / 3000) * 100));
    if (percentText) percentText.textContent = `Navigating... ${pct}%`;
    if (elapsed >= 3000) {
      clearInterval(interval);
      sessionStorage.setItem('stackly_navigated', 'true');
      window.location.href = targetUrl;
    }
  }, 100);
}

// Section-Wise Ultra-Luxury Scroll Entrance Animations Engine (IntersectionObserver)
function initScrollRevealAnimations() {
  if (typeof IntersectionObserver === 'undefined') return;

  // Inject Luxury Motion Styles
  const style = document.createElement('style');
  style.id = 'luxury-scroll-reveal-styles';
  style.textContent = `
    .reveal-on-scroll {
      opacity: 0;
      transform: translateY(40px) scale(0.97);
      transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1), transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform;
    }
    .reveal-on-scroll.reveal-left {
      transform: translateX(-40px);
    }
    .reveal-on-scroll.reveal-right {
      transform: translateX(40px);
    }
    .reveal-on-scroll.reveal-scale {
      transform: scale(0.92);
    }
    .reveal-on-scroll.is-revealed {
      opacity: 1;
      transform: translateY(0) translateX(0) scale(1);
    }
  `;
  if (!document.getElementById('luxury-scroll-reveal-styles')) {
    document.head.appendChild(style);
  }

  // Select all sections, grid cards, hero boxes, and content blocks
  const selectors = [
    'section', 
    'main > div', 
    'footer', 
    '.grid > div', 
    '.rounded-3xl', 
    '.rounded-2xl',
    '.luxury-card'
  ];

  const targets = document.querySelectorAll(selectors.join(', '));
  
  targets.forEach((el, index) => {
    // Avoid double tagging or breaking sticky bars
    if (el.classList.contains('sticky') || el.classList.contains('fixed') || el.closest('#navbar-mount') || el.id === 'stackly-preloader') {
      return;
    }

    el.classList.add('reveal-on-scroll');

    // Add staggered transition delays for grid items
    const parentGrid = el.closest('.grid');
    if (parentGrid) {
      const children = Array.from(parentGrid.children);
      const childIdx = children.indexOf(el);
      if (childIdx >= 0) {
        el.style.transitionDelay = `${(childIdx % 6) * 100}ms`;
      }
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
  );

  targets.forEach((el) => {
    if (el.classList.contains('reveal-on-scroll')) {
      observer.observe(el);
    }
  });
}
