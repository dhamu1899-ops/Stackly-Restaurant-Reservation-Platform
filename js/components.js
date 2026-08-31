// Shared UI Components & Modal Renderers for Stackly Luxury Platform

let isUserDropdownOpen = false;

function toggleUserDropdown(e) {
  if (e) e.stopPropagation();
  isUserDropdownOpen = !isUserDropdownOpen;
  const menu = document.getElementById('navbar-user-dropdown');
  const chevron = document.getElementById('navbar-user-chevron');
  if (menu) {
    if (isUserDropdownOpen) {
      menu.classList.remove('hidden');
      if (chevron) chevron.classList.add('rotate-180');
    } else {
      menu.classList.add('hidden');
      if (chevron) chevron.classList.remove('rotate-180');
    }
  }
}

// Close dropdown on outside click
document.addEventListener('click', (e) => {
  const container = document.getElementById('navbar-user-dropdown-container');
  if (container && !container.contains(e.target) && isUserDropdownOpen) {
    isUserDropdownOpen = false;
    const menu = document.getElementById('navbar-user-dropdown');
    const chevron = document.getElementById('navbar-user-chevron');
    if (menu) menu.classList.add('hidden');
    if (chevron) chevron.classList.remove('rotate-180');
  }
});

// Shared Restaurant Card Renderer (Matching RestaurantCard.tsx 100%)
function renderRestaurantCardHTML(restaurant, viewMode = 'grid') {
  const isFav = store.isFavorite(restaurant.id);

  if (viewMode === 'list') {
    return `
      <div 
        onclick="window.location.href='restaurant-detail.html?id=${restaurant.id}'"
        class="group relative flex flex-col md:flex-row overflow-hidden rounded-2xl border border-[#262837] bg-[#12141c] transition-all duration-300 hover:border-amber-500/40 hover:shadow-[0_10px_35px_rgba(0,0,0,0.6)] cursor-pointer"
        id="restaurant-card-${restaurant.id}"
      >
        <!-- Left image -->
        <div class="relative h-64 md:h-auto md:w-80 shrink-0 overflow-hidden">
          <img
            src="${restaurant.heroImage}"
            alt="${restaurant.name}"
            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#12141c] via-transparent to-black/30 md:hidden"></div>
          
          <!-- Michelin Stars Badge -->
          ${restaurant.michelinStars > 0 ? `
            <div class="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/80 backdrop-blur-md px-3 py-1 border border-amber-500/40 shadow-lg">
              <div class="flex text-amber-400">
                ${Array.from({ length: restaurant.michelinStars }).map(() => `
                  <i data-lucide="star" class="h-3.5 w-3.5 fill-amber-400 text-amber-400"></i>
                `).join('')}
              </div>
              <span class="text-[11px] font-semibold text-amber-200 ml-1">
                ${restaurant.michelinStars} Michelin ${restaurant.michelinStars === 1 ? 'Star' : 'Stars'}
              </span>
            </div>
          ` : ''}

          <!-- Heart Button -->
          <button
            onclick="event.stopPropagation(); store.toggleFavorite('${restaurant.id}');"
            class="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 hover:border-rose-500 hover:text-rose-400 transition-colors cursor-pointer"
          >
            <i data-lucide="heart" class="h-4 w-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}"></i>
          </button>
        </div>

        <!-- Content -->
        <div class="flex flex-1 flex-col justify-between p-6">
          <div>
            <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div class="flex items-center gap-2 text-xs text-[#a1a1aa]">
                <span class="text-amber-300 font-medium">${restaurant.cuisine}</span>
                <span>•</span>
                <span class="flex items-center gap-1 text-[#d4d4d8]">
                  <i data-lucide="map-pin" class="h-3.5 w-3.5 text-amber-400"></i>
                  ${restaurant.neighborhood}, ${restaurant.city}
                </span>
              </div>
              <div class="flex items-center gap-1.5 rounded-md bg-[#1d202d] px-2.5 py-1 text-xs font-semibold text-white">
                <i data-lucide="star" class="h-3.5 w-3.5 fill-amber-400 text-amber-400"></i>
                <span>${restaurant.rating}</span>
                <span class="text-[#71717a] font-normal">(${restaurant.reviewCount})</span>
              </div>
            </div>

            <h3 class="font-display text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
              ${restaurant.name}
            </h3>
            <p class="mt-1 text-sm text-[#8c8f9f] line-clamp-2">
              ${restaurant.tagline}
            </p>

            <!-- Ambience Tags -->
            <div class="mt-3 flex flex-wrap gap-1.5">
              ${restaurant.ambienceTags.slice(0, 3).map((tag) => `
                <span class="rounded-md border border-[#2c2f40] bg-[#161824] px-2 py-0.5 text-[11px] text-[#a1a1aa]">
                  ${tag}
                </span>
              `).join('')}
              <span class="text-xs text-amber-300/80 font-medium self-center ml-2">
                ~$${restaurant.pricePerPerson} per guest (${restaurant.priceRange})
              </span>
            </div>
          </div>

          <!-- Bottom Quick Book Time Slots -->
          <div class="mt-6 pt-4 border-t border-[#222533] flex flex-wrap items-center justify-between gap-3">
            <div>
              <div class="flex items-center gap-1 text-xs text-[#71717a] mb-1.5">
                <i data-lucide="clock" class="h-3.5 w-3.5 text-amber-400"></i>
                <span>Next Available Seatings Tonight:</span>
              </div>
              <div class="flex flex-wrap gap-1.5">
                ${restaurant.timeSlots.filter(t => t.available).slice(0, 4).map((slot) => `
                  <button
                    onclick="event.stopPropagation(); store.openBookingModal(RESTAURANTS_DATA.find(r=>r.id==='${restaurant.id}'), { time: '${slot.time}' });"
                    class="rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-500 hover:text-black transition-all shadow-sm cursor-pointer"
                  >
                    ${slot.time}
                  </button>
                `).join('')}
              </div>
            </div>

            <button
              onclick="event.stopPropagation(); window.location.href='restaurant-detail.html?id=${restaurant.id}';"
              class="flex items-center gap-1.5 rounded-lg bg-[#202330] px-4 py-2 text-xs font-semibold text-white group-hover:bg-amber-400 group-hover:text-black transition-all cursor-pointer"
            >
              <span>View Profile</span>
              <i data-lucide="chevron-right" class="h-4 w-4"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Grid view
  return `
    <div
      onclick="window.location.href='restaurant-detail.html?id=${restaurant.id}'"
      class="group relative flex flex-col overflow-hidden rounded-2xl border border-[#262837] bg-[#12141c] transition-all duration-300 hover:border-amber-500/40 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.7)] cursor-pointer"
      id="restaurant-card-${restaurant.id}"
    >
      <!-- Top Image & Floating Badges -->
      <div class="relative h-56 w-full overflow-hidden bg-[#1a1c26]">
        <img
          src="${restaurant.heroImage}"
          alt="${restaurant.name}"
          class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#12141c] via-[#12141c]/20 to-black/40"></div>

        <!-- Michelin Star Badge -->
        ${restaurant.michelinStars > 0 ? `
          <div class="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-black/85 backdrop-blur-md px-3 py-1 border border-amber-500/40 shadow-lg">
            <div class="flex text-amber-400">
              ${Array.from({ length: restaurant.michelinStars }).map(() => `
                <i data-lucide="star" class="h-3.5 w-3.5 fill-amber-400 text-amber-400"></i>
              `).join('')}
            </div>
            <span class="text-[11px] font-semibold text-amber-200 ml-1">
              ${restaurant.michelinStars} ${restaurant.michelinStars === 1 ? 'Star' : 'Stars'}
            </span>
          </div>
        ` : ''}

        <!-- Urgent Availability Badge -->
        ${restaurant.urgentTablesCount && restaurant.urgentTablesCount <= 3 ? `
          <div class="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-rose-950/80 border border-rose-500/40 px-2.5 py-0.5 text-[10px] font-medium text-rose-300 backdrop-blur-md">
            <i data-lucide="flame" class="h-3 w-3 text-rose-400 animate-pulse"></i>
            <span>Only ${restaurant.urgentTablesCount} tables left</span>
          </div>
        ` : ''}

        <!-- Favorite Heart -->
        <button
          onclick="event.stopPropagation(); store.toggleFavorite('${restaurant.id}');"
          class="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 hover:border-rose-500 hover:text-rose-400 transition-colors cursor-pointer"
        >
          <i data-lucide="heart" class="h-4 w-4 ${isFav ? 'fill-rose-500 text-rose-500' : ''}"></i>
        </button>
      </div>

      <!-- Card Body -->
      <div class="flex flex-1 flex-col p-5">
        <div class="flex items-center justify-between gap-2 text-xs text-[#a1a1aa] mb-1.5">
          <span class="text-amber-300 font-medium truncate">${restaurant.cuisine}</span>
          <span class="text-[#d4d4d8] shrink-0 font-medium">${restaurant.priceRange} ($${restaurant.pricePerPerson}/pp)</span>
        </div>

        <h3 class="font-display text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
          ${restaurant.name}
        </h3>

        <div class="mt-1 flex items-center justify-between text-xs text-[#8c8f9f]">
          <div class="flex items-center gap-1 truncate">
            <i data-lucide="map-pin" class="h-3.5 w-3.5 text-amber-400 shrink-0"></i>
            <span class="truncate">${restaurant.neighborhood}, ${restaurant.city}</span>
          </div>
          <div class="flex items-center gap-1 font-semibold text-white">
            <i data-lucide="star" class="h-3.5 w-3.5 fill-amber-400 text-amber-400"></i>
            <span>${restaurant.rating}</span>
          </div>
        </div>

        <!-- Experience / Seating Highlight -->
        <div class="mt-3 flex flex-wrap gap-1">
          ${restaurant.seatingAreas.slice(0, 2).map((area) => `
            <span class="rounded-md border border-[#2b2d3d] bg-[#161824] px-2 py-0.5 text-[10px] text-[#b4b7c9]">
              ${area.name}
            </span>
          `).join('')}
        </div>

        <!-- Time slots chip group -->
        <div class="mt-4 pt-3 border-t border-[#222533]">
          <span class="text-[11px] text-[#71717a] block mb-1.5 font-medium">
            Available Tonight:
          </span>
          <div class="flex flex-wrap gap-1.5">
            ${restaurant.timeSlots.filter(t => t.available).slice(0, 3).map((slot) => `
              <button
                onclick="event.stopPropagation(); store.openBookingModal(RESTAURANTS_DATA.find(r=>r.id==='${restaurant.id}'), { time: '${slot.time}' });"
                class="flex-1 min-w-[65px] rounded-lg border border-amber-500/25 bg-amber-500/10 py-1 text-center text-xs font-semibold text-amber-300 hover:bg-amber-400 hover:text-black transition-all shadow-sm cursor-pointer"
              >
                ${slot.time}
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

// Render Toast Container
function renderToasts() {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4';
    document.body.appendChild(container);
  }

  const toastsHtml = store.toasts.map((toast) => {
    let icon = 'sparkles';
    let borderColor = 'border-amber-500/40';
    let bgGradient = 'from-amber-950/80 to-stone-900/90';
    let titleColor = 'text-amber-200';

    if (toast.type === 'info') {
      icon = 'info';
      borderColor = 'border-sky-500/40';
      bgGradient = 'from-sky-950/80 to-stone-900/90';
      titleColor = 'text-sky-200';
    } else if (toast.type === 'success') {
      icon = 'check-circle';
      borderColor = 'border-emerald-500/40';
      bgGradient = 'from-emerald-950/80 to-stone-900/90';
      titleColor = 'text-emerald-200';
    }

    return `
      <div class="pointer-events-auto flex items-start gap-4 p-4 rounded-xl border ${borderColor} bg-gradient-to-r ${bgGradient} backdrop-blur-xl shadow-2xl animate-fade-in relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent pointer-events-none"></div>
        <div class="mt-0.5 p-2 rounded-lg bg-amber-500/10 text-amber-400">
          <i data-lucide="${icon}" class="w-5 h-5"></i>
        </div>
        <div class="flex-1 pr-6">
          <h4 class="font-display font-medium text-sm ${titleColor}">${toast.title}</h4>
          <p class="text-xs text-stone-300 mt-1 leading-relaxed">${toast.message}</p>
        </div>
        <button onclick="store.removeToast('${toast.id}')" class="text-stone-400 hover:text-white transition-colors p-1">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>
    `;
  }).join('');

  container.innerHTML = toastsHtml;
  if (window.lucide) window.lucide.createIcons();
}

// Render Global Navbar Header (Matching Navbar.tsx 100%)
function renderNavbar(activePage = '') {
  const navContainer = document.getElementById('navbar-mount');
  if (!navContainer) return;

  const user = store.currentUser;
  const isClient = user && user.role === 'client';
  const isAdmin = user && user.role === 'admin';
  const activeReservationsCount = store.reservations.filter((r) => r.status === 'confirmed').length;

  navContainer.innerHTML = `
    <header class="sticky top-0 z-40 w-full border-b border-[#222432] bg-[#0c0d12]/95 backdrop-blur-xl transition-all duration-300">
      
      <!-- Top Stackly Global Contact & Address Micro-Bar -->
      <div class="border-b border-[#1c1d27] bg-[#10121a]/95 px-4 py-1.5 text-xs text-[#a1a1aa]">
        <div class="mx-auto flex max-w-7xl items-center justify-between gap-4 text-[11px]">
          
          <!-- Stackly HQ Address Detail -->
          <div class="flex items-center gap-2 truncate">
            <span class="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 font-medium text-amber-300 border border-amber-500/20 shrink-0">
              <i data-lucide="crown" class="h-3 w-3 text-amber-400"></i>
              <span>Stackly Reserve</span>
            </span>
            <div class="hidden sm:flex items-center gap-1.5 text-[#d4d4d8] truncate">
              <i data-lucide="map-pin" class="h-3 w-3 text-amber-400 shrink-0"></i>
              <span class="truncate">HQ: 450 Lexington Ave, Fl 32, New York, NY 10017</span>
            </div>
          </div>

          <!-- Unified Contact Hotline -->
          <div class="flex items-center gap-3 shrink-0">
            <div class="hidden md:flex items-center gap-2 text-[#a1a1aa]">
              <span class="flex items-center gap-1 text-amber-300">
                <i data-lucide="phone-call" class="h-3 w-3"></i>
                <span class="font-mono font-medium">+1 (800) 589-STACK</span>
              </span>
              <span>•</span>
              <a href="concierge.html" class="flex items-center gap-1 hover:text-white transition-colors">
                <i data-lucide="mail" class="h-3 w-3 text-amber-400"></i>
                <span>concierge@stackly.com</span>
              </a>
            </div>

            <!-- Login & Sign Up / Profile Actions -->
            ${user ? `
              <div class="flex items-center gap-2">
                <a href="${isAdmin ? 'admin-dashboard.html' : 'client-profile.html'}" class="flex items-center gap-1.5 rounded-full bg-[#181a26] border border-[#272a3b] hover:border-amber-500/40 px-2.5 py-0.5 text-[11px] font-semibold text-amber-300 hover:text-amber-200 transition-colors">
                  <i data-lucide="crown" class="h-3 w-3 text-amber-400"></i>
                  <span>${user.name.split(' ')[0]}</span>
                </a>
                <button onclick="store.logout(); renderNavbar('${activePage}');" class="flex items-center gap-1 text-[11px] text-[#a1a1aa] hover:text-rose-400 transition-colors px-1 py-0.5 cursor-pointer">
                  <i data-lucide="log-out" class="h-3 w-3"></i>
                  <span class="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ` : `
              <div class="flex items-center gap-1.5">
                <a href="login.html" class="flex items-center gap-1 rounded-full bg-[#161824] border border-[#2b2e40] hover:border-amber-400/60 px-3 py-0.5 text-[11px] font-semibold text-white hover:text-amber-300 transition-all">
                  <i data-lucide="log-in" class="h-3 w-3 text-amber-400"></i>
                  <span>Login</span>
                </a>
                <a href="signup.html" class="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 px-3 py-0.5 text-[11px] font-bold text-black shadow-sm transition-all">
                  <i data-lucide="crown" class="h-3 w-3"></i>
                  <span>Sign Up</span>
                </a>
              </div>
            `}
          </div>

        </div>
      </div>

      <!-- Main Single-Row Navigation Bar -->
      <div class="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 gap-3">
        
        <!-- Brand Logo - STACKLY -->
        <a href="index.html" class="flex cursor-pointer items-center gap-2.5 group shrink-0">
          <svg viewBox="398 82 212 290" xmlns="http://www.w3.org/2000/svg" class="h-9 w-9 shrink-0 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_12px_rgba(252,211,77,0.3)]"><path fill="#fcd34d" d="M419.713867,256.179962 C408.001251,235.739304 410.215973,215.613876 419.889709,195.679504 C426.373138,182.319229 436.255493,171.444672 446.508270,160.904480 C457.075165,150.041229 468.783997,140.348602 478.792694,128.896606 C487.411407,119.035004 494.797852,108.464394 500.031921,96.425682 C500.738983,94.799370 501.001617,92.854477 502.785980,91.712807 C503.214905,91.838028 503.879059,91.821617 504.103485,92.127670 C514.526489,106.341171 522.003967,121.483376 518.287415,139.859406 C515.933533,151.498276 508.987885,160.308563 500.296600,167.942245 C487.788574,178.928223 473.634369,187.949692 462.046570,200.037262 C456.219025,206.116135 451.191589,212.659836 449.149933,221.054688 C445.376373,236.570572 454.272034,249.198563 470.197021,250.779221 C485.241028,252.272446 499.302216,248.880798 512.632202,241.996979 C514.021362,241.279602 515.213196,239.793518 517.062500,240.547546 C517.833252,242.063324 516.690857,242.794266 515.917847,243.562866 C502.480865,256.923462 487.519073,267.973206 468.591339,271.949402 C447.923096,276.291199 431.269562,272.383606 419.713867,256.179962 z"/><path fill="#fcd34d" d="M536.351807,311.352905 C521.089722,325.623138 508.631836,341.451172 501.644409,361.304535 C500.580017,360.856842 499.799347,360.777496 499.458496,360.348633 C491.323975,350.113098 485.458466,338.909088 484.707672,325.531189 C484.034546,313.536499 489.236786,303.909576 496.947052,295.363251 C506.737030,284.511749 519.089050,276.702271 530.329102,267.573334 C539.676453,259.981689 548.930542,252.352356 553.649658,240.719803 C556.247925,234.315125 556.803040,227.722214 555.167542,221.122284 C551.964783,208.197189 539.399353,200.886032 526.174622,203.877502 C513.911682,206.651428 503.242737,212.702515 493.079834,219.823700 C492.039246,220.552856 491.267578,221.851700 489.661957,221.557190 C488.659760,220.289383 489.653076,219.345703 490.287292,218.480408 C503.850159,199.976334 521.506714,187.674316 544.321167,183.636948 C574.742554,178.253418 599.437622,199.883118 594.804749,234.346802 C592.539368,251.198425 583.628967,264.794067 572.581299,277.156372 C561.558105,289.491241 548.610413,299.803345 536.351807,311.352905 z"/></svg>
          <div class="flex flex-col">
            <div class="flex items-center gap-1">
              <span class="font-display tracking-[0.2em] text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                STACKLY
              </span>
              <span class="rounded bg-amber-500/20 px-1 py-0.2 text-[9px] font-mono font-bold text-amber-300 uppercase tracking-wider">
                RESERVE
              </span>
            </div>
            <span class="text-[9px] uppercase tracking-[0.2em] text-[#71717a] font-medium hidden sm:inline">
              Luxury Gastronomy Platform
            </span>
          </div>
        </a>

        <!-- Desktop Single-Row Navigation Links -->
        <nav class="hidden lg:flex items-center flex-nowrap space-x-1 xl:space-x-2">
          <a href="index.html" class="relative flex items-center gap-1.5 rounded-xl px-2.5 xl:px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${activePage === 'home' ? 'text-amber-300 bg-amber-500/15 border border-amber-500/40 shadow-[0_0_10px_rgba(232,193,90,0.12)]' : 'text-[#a1a1aa] hover:text-white hover:bg-[#161824] border border-transparent'}">
            <i data-lucide="compass" class="h-3.5 w-3.5 ${activePage === 'home' ? 'text-amber-400' : 'text-[#71717a]'}"></i>
            <span>Home</span>
          </a>

          <a href="about.html" class="relative flex items-center gap-1.5 rounded-xl px-2.5 xl:px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${activePage === 'about' ? 'text-amber-300 bg-amber-500/15 border border-amber-500/40 shadow-[0_0_10px_rgba(232,193,90,0.12)]' : 'text-[#a1a1aa] hover:text-white hover:bg-[#161824] border border-transparent'}">
            <i data-lucide="info" class="h-3.5 w-3.5 ${activePage === 'about' ? 'text-amber-400' : 'text-[#71717a]'}"></i>
            <span>About</span>
          </a>

          <a href="restaurants.html" class="relative flex items-center gap-1.5 rounded-xl px-2.5 xl:px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${activePage === 'restaurants' ? 'text-amber-300 bg-amber-500/15 border border-amber-500/40 shadow-[0_0_10px_rgba(232,193,90,0.12)]' : 'text-[#a1a1aa] hover:text-white hover:bg-[#161824] border border-transparent'}">
            <i data-lucide="utensils" class="h-3.5 w-3.5 ${activePage === 'restaurants' ? 'text-amber-400' : 'text-[#71717a]'}"></i>
            <span>Restaurants</span>
          </a>

          <a href="my-reservations.html" class="relative flex items-center gap-1.5 rounded-xl px-2.5 xl:px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${activePage === 'my-reservations' ? 'text-amber-300 bg-amber-500/15 border border-amber-500/40 shadow-[0_0_10px_rgba(232,193,90,0.12)]' : 'text-[#a1a1aa] hover:text-white hover:bg-[#161824] border border-transparent'}">
            <i data-lucide="calendar" class="h-3.5 w-3.5 ${activePage === 'my-reservations' ? 'text-amber-400' : 'text-[#71717a]'}"></i>
            <span>Reservation</span>
            ${activeReservationsCount > 0 ? `<span class="ml-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-400 px-1 text-[9px] font-bold text-black shadow-sm">${activeReservationsCount}</span>` : ''}
          </a>

          ${isAdmin ? `
            <a href="admin-dashboard.html" class="relative flex items-center gap-1.5 rounded-xl px-2.5 xl:px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${activePage === 'admin-dashboard' ? 'text-amber-300 bg-amber-500/15 border border-amber-500/40 shadow-[0_0_10px_rgba(232,193,90,0.12)]' : 'text-[#a1a1aa] hover:text-white hover:bg-[#161824] border border-transparent'}">
              <i data-lucide="chef-hat" class="h-3.5 w-3.5 ${activePage === 'admin-dashboard' ? 'text-amber-400' : 'text-[#71717a]'}"></i>
              <span>Maître D’</span>
            </a>
          ` : ''}

          <a href="concierge.html" class="relative flex items-center gap-1.5 rounded-xl px-2.5 xl:px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all ${activePage === 'concierge' ? 'text-amber-300 bg-amber-500/15 border border-amber-500/40 shadow-[0_0_10px_rgba(232,193,90,0.12)]' : 'text-[#a1a1aa] hover:text-white hover:bg-[#161824] border border-transparent'}">
            <i data-lucide="phone-call" class="h-3.5 w-3.5 ${activePage === 'concierge' ? 'text-amber-400' : 'text-[#71717a]'}"></i>
            <span>Contact</span>
          </a>
        </nav>

        <!-- Right Side Controls - Matching Navbar.tsx 100% -->
        <div class="flex items-center gap-2 sm:gap-2.5 shrink-0">
          
          <!-- Quick Search Button -->
          <button onclick="toggleCommandSearch(true)" class="flex items-center gap-1.5 rounded-xl border border-[#272a38] bg-[#141622] px-2.5 sm:px-3 py-1.5 text-xs text-[#a1a1aa] hover:border-amber-500/40 hover:text-white transition-all whitespace-nowrap cursor-pointer">
            <i data-lucide="search" class="h-3.5 w-3.5 text-amber-400 shrink-0"></i>
            <span class="hidden xl:inline">Search...</span>
            <kbd class="hidden sm:inline-block rounded bg-[#222533] px-1 py-0.2 text-[9px] font-mono text-[#a1a1aa] border border-[#323648]">⌘K</kbd>
          </button>

          <!-- Saved Wishlist Icon -->
          <a href="my-reservations.html" class="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#272a38] bg-[#141622] text-[#a1a1aa] hover:border-rose-500/40 hover:text-rose-300 transition-colors shrink-0">
            <i data-lucide="heart" class="h-4 w-4 ${store.favorites.length > 0 ? 'text-rose-400 fill-rose-400/30' : ''}"></i>
            ${store.favorites.length > 0 ? `<span class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">${store.favorites.length}</span>` : ''}
          </a>

          <!-- User Profile Dropdown Menu (Matching Navbar.tsx 100%) -->
          ${user ? `
            <div class="relative shrink-0" id="navbar-user-dropdown-container">
              <button onclick="toggleUserDropdown(event)" class="flex items-center gap-2 rounded-xl border border-[#2b2e40] bg-[#141624] p-1.5 pr-2.5 hover:border-amber-500/40 transition-colors whitespace-nowrap cursor-pointer">
                <img src="${user.avatar}" alt="${user.name}" class="h-6 w-6 sm:h-7 sm:w-7 rounded-lg object-cover border border-amber-500/40 shrink-0" />
                <div class="hidden sm:flex flex-col text-left">
                  <span class="text-xs font-bold text-white leading-tight truncate max-w-[85px]">
                    ${user.name.split(' ')[0]}
                  </span>
                  <span class="text-[8px] font-semibold text-amber-400 uppercase tracking-wider">
                    ${user.role === 'admin' ? 'Maître D’' : 'VIP Diner'}
                  </span>
                </div>
                <i data-lucide="chevron-down" id="navbar-user-chevron" class="h-3 w-3 text-[#a1a1aa] transition-transform"></i>
              </button>

              <div id="navbar-user-dropdown" class="hidden absolute right-0 mt-2 w-64 rounded-2xl border border-[#2b2e40] bg-[#12141e] p-2 shadow-2xl z-50 animate-fade-in">
                <div class="p-3 border-b border-[#222534] bg-black/30 rounded-xl mb-1">
                  <div class="font-bold text-xs text-white">${user.name}</div>
                  <div class="text-[10px] text-amber-400 truncate">${user.email}</div>
                  <div class="mt-1.5 inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 text-[9px] font-bold text-amber-300">
                    <i data-lucide="crown" class="h-3 w-3 text-amber-400"></i>
                    <span>${user.membershipTier || 'Black Diamond VIP'}</span>
                  </div>
                </div>

                <div class="space-y-0.5 py-1">
                  ${user.role === 'admin' ? `
                    <a href="admin-dashboard.html" class="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-amber-300 hover:bg-amber-500/15 transition-colors text-left block">
                      <i data-lucide="chef-hat" class="h-4 w-4 text-amber-400"></i>
                      <span>Maître D’ Command Room</span>
                    </a>
                  ` : `
                    <a href="client-profile.html" class="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-[#d4d4d8] hover:bg-[#1c1e2c] hover:text-white transition-colors text-left block">
                      <i data-lucide="crown" class="h-4 w-4 text-amber-400"></i>
                      <span>VIP Patron Passport & Profile</span>
                    </a>
                  `}

                  <a href="my-reservations.html" class="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-[#d4d4d8] hover:bg-[#1c1e2c] hover:text-white transition-colors text-left block">
                    <i data-lucide="calendar" class="h-4 w-4 text-[#71717a]"></i>
                    <span>My Reservations</span>
                  </a>

                  <a href="concierge.html" class="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-[#d4d4d8] hover:bg-[#1c1e2c] hover:text-white transition-colors text-left block">
                    <i data-lucide="phone-call" class="h-4 w-4 text-[#71717a]"></i>
                    <span>Contact & Concierge Desk</span>
                  </a>
                </div>

                <div class="pt-1 border-t border-[#222534] mt-1">
                  <button onclick="store.logout(); renderNavbar('${activePage}');" class="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors text-left cursor-pointer">
                    <i data-lucide="log-out" class="h-4 w-4"></i>
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- Main CTA: Find Tables -->
          <a href="restaurants.html" class="hidden md:flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-3.5 py-1.5 text-xs font-bold text-black shadow-[0_0_16px_rgba(212,175,55,0.25)] hover:brightness-110 active:scale-95 transition-all whitespace-nowrap shrink-0">
            <svg viewBox="398 82 212 290" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0"><path fill="#fcd34d" d="M419.713867,256.179962 C408.001251,235.739304 410.215973,215.613876 419.889709,195.679504 C426.373138,182.319229 436.255493,171.444672 446.508270,160.904480 C457.075165,150.041229 468.783997,140.348602 478.792694,128.896606 C487.411407,119.035004 494.797852,108.464394 500.031921,96.425682 C500.738983,94.799370 501.001617,92.854477 502.785980,91.712807 C503.214905,91.838028 503.879059,91.821617 504.103485,92.127670 C514.526489,106.341171 522.003967,121.483376 518.287415,139.859406 C515.933533,151.498276 508.987885,160.308563 500.296600,167.942245 C487.788574,178.928223 473.634369,187.949692 462.046570,200.037262 C456.219025,206.116135 451.191589,212.659836 449.149933,221.054688 C445.376373,236.570572 454.272034,249.198563 470.197021,250.779221 C485.241028,252.272446 499.302216,248.880798 512.632202,241.996979 C514.021362,241.279602 515.213196,239.793518 517.062500,240.547546 C517.833252,242.063324 516.690857,242.794266 515.917847,243.562866 C502.480865,256.923462 487.519073,267.973206 468.591339,271.949402 C447.923096,276.291199 431.269562,272.383606 419.713867,256.179962 z"/><path fill="#fcd34d" d="M536.351807,311.352905 C521.089722,325.623138 508.631836,341.451172 501.644409,361.304535 C500.580017,360.856842 499.799347,360.777496 499.458496,360.348633 C491.323975,350.113098 485.458466,338.909088 484.707672,325.531189 C484.034546,313.536499 489.236786,303.909576 496.947052,295.363251 C506.737030,284.511749 519.089050,276.702271 530.329102,267.573334 C539.676453,259.981689 548.930542,252.352356 553.649658,240.719803 C556.247925,234.315125 556.803040,227.722214 555.167542,221.122284 C551.964783,208.197189 539.399353,200.886032 526.174622,203.877502 C513.911682,206.651428 503.242737,212.702515 493.079834,219.823700 C492.039246,220.552856 491.267578,221.851700 489.661957,221.557190 C488.659760,220.289383 489.653076,219.345703 490.287292,218.480408 C503.850159,199.976334 521.506714,187.674316 544.321167,183.636948 C574.742554,178.253418 599.437622,199.883118 594.804749,234.346802 C592.539368,251.198425 583.628967,264.794067 572.581299,277.156372 C561.558105,289.491241 548.610413,299.803345 536.351807,311.352905 z"/></svg>
            <span>Find Tables</span>
          </a>

          <!-- Mobile Menu Toggle -->
          <button onclick="toggleMobileNav()" class="flex lg:hidden h-9 w-9 items-center justify-center rounded-xl border border-[#272a38] bg-[#141620] text-white shrink-0">
            <i data-lucide="menu" class="h-4 w-4"></i>
          </button>
        </div>

      </div>

      <!-- Mobile Dropdown Drawer -->
      <div id="mobile-menu" class="hidden lg:hidden border-t border-[#262834] bg-[#0d0e14] px-4 pt-3 pb-6 space-y-2">
        <a href="index.html" class="block py-2 text-xs font-semibold text-stone-300 hover:text-amber-300">Home</a>
        <a href="about.html" class="block py-2 text-xs font-semibold text-stone-300 hover:text-amber-300">About Charter</a>
        <a href="restaurants.html" class="block py-2 text-xs font-semibold text-stone-300 hover:text-amber-300">Restaurants</a>
        <a href="my-reservations.html" class="block py-2 text-xs font-semibold text-stone-300 hover:text-amber-300">Reservation (${activeReservationsCount})</a>
        <a href="concierge.html" class="block py-2 text-xs font-semibold text-amber-400">Contact & Concierge Desk</a>
        ${isAdmin ? `<a href="admin-dashboard.html" class="block py-2 text-xs font-semibold text-amber-300">Maître D’ Command Room</a>` : ''}
      </div>

    </header>
  `;

  if (window.lucide) window.lucide.createIcons();
}

function toggleMobileNav() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('hidden');
}

// Render Global Footer (Matching Footer.tsx 100%)
function renderFooter() {
  const footerContainer = document.getElementById('footer-mount');
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <footer class="relative border-t border-[#222430] bg-[#07080b] text-[#a1a1aa] overflow-hidden">
      <!-- Background glow -->
      <div class="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-amber-500/5 blur-[120px] rounded-full"></div>

      <!-- Top Newsletter / VIP Table Drops Section -->
      <div class="border-b border-[#1c1d27] bg-[#0e1017]/80 py-12 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl flex flex-col lg:flex-row items-center justify-between gap-8">
          <div class="max-w-xl text-center lg:text-left">
            <div class="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-300 mb-3">
              <i data-lucide="crown" class="h-3.5 w-3.5 text-amber-400"></i>
              <span>Stackly VIP Table Drops</span>
            </div>
            <h3 class="font-display text-2xl font-bold text-white tracking-wide">
              Never Miss a Coveted Michelin Star Reservation
            </h3>
            <p class="mt-2 text-sm text-[#8c8f9f] leading-relaxed">
              Receive instant SMS and encrypted invitations when hard-to-book tables, chef tasting seats, and cancellation openings become available.
            </p>
          </div>

          <div id="footer-newsletter-container" class="w-full max-w-md">
            <form onsubmit="event.preventDefault(); handleFooterNewsletterSubmit();" class="flex flex-col sm:flex-row gap-2">
              <div class="relative flex-1">
                <i data-lucide="mail" class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717a]"></i>
                <input type="email" required placeholder="Enter your private email..." class="w-full rounded-xl border border-[#2d3040] bg-[#141620] pl-10 pr-4 py-3 text-sm text-white placeholder-[#71717a] focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400/50" />
              </div>
              <button type="submit" class="rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-6 py-3 text-sm font-semibold text-black hover:brightness-110 active:scale-95 transition-all whitespace-nowrap shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                Join VIP Circle
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Worldwide Concierge Hubs & Addresses Grid -->
      <div class="border-b border-[#1c1d27] bg-[#090b10] py-12 px-4 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-7xl">
          <div class="flex items-center gap-2 mb-6">
            <i data-lucide="globe-2" class="h-4 w-4 text-amber-400"></i>
            <h4 class="font-display text-xs font-bold uppercase tracking-[0.2em] text-white">
              Stackly Worldwide Concierge Hubs & Addresses
            </h4>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="rounded-2xl border border-[#222534] bg-[#12141e]/90 p-5 space-y-2.5">
              <div class="flex items-center justify-between">
                <span class="font-display text-sm font-bold text-white">New York (Global HQ)</span>
                <span class="rounded bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-mono text-amber-300">24/7 Desk</span>
              </div>
              <div class="flex items-start gap-2 text-xs text-[#8c8f9f]">
                <i data-lucide="map-pin" class="h-4 w-4 text-amber-400 shrink-0 mt-0.5"></i>
                <span>Stackly Tower, 450 Lexington Avenue, 32nd Floor, New York, NY 10017, USA</span>
              </div>
              <div class="flex items-center gap-2 text-xs text-amber-300 font-mono pt-1">
                <i data-lucide="phone-call" class="h-3.5 w-3.5 text-amber-400"></i>
                <span>+1 (800) 589-STACK</span>
              </div>
            </div>

            <div class="rounded-2xl border border-[#222534] bg-[#12141e]/90 p-5 space-y-2.5">
              <div class="flex items-center justify-between">
                <span class="font-display text-sm font-bold text-white">London (Mayfair)</span>
                <span class="rounded bg-[#202332] px-1.5 py-0.5 text-[9px] font-mono text-[#a1a1aa]">GMT Desk</span>
              </div>
              <div class="flex items-start gap-2 text-xs text-[#8c8f9f]">
                <i data-lucide="map-pin" class="h-4 w-4 text-amber-400 shrink-0 mt-0.5"></i>
                <span>1 Berkeley Street, Mayfair, London W1J 8DJ, United Kingdom</span>
              </div>
              <div class="flex items-center gap-2 text-xs text-amber-300 font-mono pt-1">
                <i data-lucide="phone-call" class="h-3.5 w-3.5 text-amber-400"></i>
                <span>+44 20 7946 0912</span>
              </div>
            </div>

            <div class="rounded-2xl border border-[#222534] bg-[#12141e]/90 p-5 space-y-2.5">
              <div class="flex items-center justify-between">
                <span class="font-display text-sm font-bold text-white">Paris (Vendôme)</span>
                <span class="rounded bg-[#202332] px-1.5 py-0.5 text-[9px] font-mono text-[#a1a1aa]">CET Desk</span>
              </div>
              <div class="flex items-start gap-2 text-xs text-[#8c8f9f]">
                <i data-lucide="map-pin" class="h-4 w-4 text-amber-400 shrink-0 mt-0.5"></i>
                <span>18 Place Vendôme, 75001 Paris, France</span>
              </div>
              <div class="flex items-center gap-2 text-xs text-amber-300 font-mono pt-1">
                <i data-lucide="phone-call" class="h-3.5 w-3.5 text-amber-400"></i>
                <span>+33 1 42 68 55 00</span>
              </div>
            </div>

            <div class="rounded-2xl border border-[#222534] bg-[#12141e]/90 p-5 space-y-2.5">
              <div class="flex items-center justify-between">
                <span class="font-display text-sm font-bold text-white">Tokyo (Ginza)</span>
                <span class="rounded bg-[#202332] px-1.5 py-0.5 text-[9px] font-mono text-[#a1a1aa]">JST Desk</span>
              </div>
              <div class="flex items-start gap-2 text-xs text-[#8c8f9f]">
                <i data-lucide="map-pin" class="h-4 w-4 text-amber-400 shrink-0 mt-0.5"></i>
                <span>Ginza Six 12F, 6-10-1 Ginza, Chuo City, Tokyo 104-0061, Japan</span>
              </div>
              <div class="flex items-center gap-2 text-xs text-amber-300 font-mono pt-1">
                <i data-lucide="phone-call" class="h-3.5 w-3.5 text-amber-400"></i>
                <span>+81 3 5537 0199</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Footer Links -->
      <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div class="lg:col-span-2 space-y-4">
            <div class="flex items-center gap-3">
              <svg viewBox="398 82 212 290" xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 shrink-0 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_0_12px_rgba(252,211,77,0.3)]"><path fill="#fcd34d" d="M419.713867,256.179962 C408.001251,235.739304 410.215973,215.613876 419.889709,195.679504 C426.373138,182.319229 436.255493,171.444672 446.508270,160.904480 C457.075165,150.041229 468.783997,140.348602 478.792694,128.896606 C487.411407,119.035004 494.797852,108.464394 500.031921,96.425682 C500.738983,94.799370 501.001617,92.854477 502.785980,91.712807 C503.214905,91.838028 503.879059,91.821617 504.103485,92.127670 C514.526489,106.341171 522.003967,121.483376 518.287415,139.859406 C515.933533,151.498276 508.987885,160.308563 500.296600,167.942245 C487.788574,178.928223 473.634369,187.949692 462.046570,200.037262 C456.219025,206.116135 451.191589,212.659836 449.149933,221.054688 C445.376373,236.570572 454.272034,249.198563 470.197021,250.779221 C485.241028,252.272446 499.302216,248.880798 512.632202,241.996979 C514.021362,241.279602 515.213196,239.793518 517.062500,240.547546 C517.833252,242.063324 516.690857,242.794266 515.917847,243.562866 C502.480865,256.923462 487.519073,267.973206 468.591339,271.949402 C447.923096,276.291199 431.269562,272.383606 419.713867,256.179962 z"/><path fill="#fcd34d" d="M536.351807,311.352905 C521.089722,325.623138 508.631836,341.451172 501.644409,361.304535 C500.580017,360.856842 499.799347,360.777496 499.458496,360.348633 C491.323975,350.113098 485.458466,338.909088 484.707672,325.531189 C484.034546,313.536499 489.236786,303.909576 496.947052,295.363251 C506.737030,284.511749 519.089050,276.702271 530.329102,267.573334 C539.676453,259.981689 548.930542,252.352356 553.649658,240.719803 C556.247925,234.315125 556.803040,227.722214 555.167542,221.122284 C551.964783,208.197189 539.399353,200.886032 526.174622,203.877502 C513.911682,206.651428 503.242737,212.702515 493.079834,219.823700 C492.039246,220.552856 491.267578,221.851700 489.661957,221.557190 C488.659760,220.289383 489.653076,219.345703 490.287292,218.480408 C503.850159,199.976334 521.506714,187.674316 544.321167,183.636948 C574.742554,178.253418 599.437622,199.883118 594.804749,234.346802 C592.539368,251.198425 583.628967,264.794067 572.581299,277.156372 C561.558105,289.491241 548.610413,299.803345 536.351807,311.352905 z"/></svg>
              <div class="flex flex-col">
                <span class="font-display tracking-[0.2em] text-lg font-bold text-white">
                  STACKLY RESERVE
                </span>
                <span class="text-[10px] uppercase tracking-[0.2em] text-[#71717a]">
                  Global Haute Gastronomy Portal
                </span>
              </div>
            </div>
            <p class="text-sm text-[#8c8f9f] leading-relaxed max-w-sm">
              The world's premier reservation architecture connecting epicures to 3-Star Michelin tables, private chef counters, and exclusive dining cellars with zero wait times.
            </p>
            <div class="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#a1a1aa]">
              <div class="flex items-center gap-1.5">
                <i data-lucide="award" class="h-4 w-4 text-amber-400"></i>
                <span>Verified Michelin Partner</span>
              </div>
              <div class="flex items-center gap-1.5">
                <i data-lucide="shield-check" class="h-4 w-4 text-amber-400"></i>
                <span>Guaranteed Seating</span>
              </div>
            </div>

            <!-- Official Channels (Matching Footer.tsx 100%) -->
            <div class="pt-2">
              <span class="text-[11px] font-semibold text-[#8c8f9f] uppercase tracking-wider block mb-2.5">
                Official Channels
              </span>
              <div class="flex items-center gap-2">
                <!-- X (Twitter) -->
                <a href="https://x.com" target="_blank" rel="noopener noreferrer" onclick="event.preventDefault(); store.showToast('X Connected', 'Opening Stackly\'s official X portal (@StacklyReserve).', 'gold');" class="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#272a38] bg-[#12141e] text-[#a1a1aa] hover:border-amber-400/50 hover:bg-amber-500/10 hover:text-amber-300 transition-all duration-200 shadow-sm" title="X - @StacklyReserve">
                  <svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4 transition-transform group-hover:scale-110"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <!-- Instagram -->
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" onclick="event.preventDefault(); store.showToast('Instagram Connected', 'Opening Stackly\'s official Instagram portal (@stacklyreserve).', 'gold');" class="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#272a38] bg-[#12141e] text-[#a1a1aa] hover:border-amber-400/50 hover:bg-amber-500/10 hover:text-amber-300 transition-all duration-200 shadow-sm" title="Instagram - @stacklyreserve">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 transition-transform group-hover:scale-110"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <!-- LinkedIn -->
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" onclick="event.preventDefault(); store.showToast('LinkedIn Connected', 'Opening Stackly\'s official LinkedIn portal (Stackly Reserve Gastronomy).', 'gold');" class="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#272a38] bg-[#12141e] text-[#a1a1aa] hover:border-amber-400/50 hover:bg-amber-500/10 hover:text-amber-300 transition-all duration-200 shadow-sm" title="LinkedIn - Stackly Reserve Gastronomy">
                  <svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4 transition-transform group-hover:scale-110"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.74c-.95 0-1.72.77-1.72 1.72 0 .95.77 1.72 1.72 1.72.95 0 1.72-.77 1.72-1.72 0-.95-.77-1.72-1.72-1.72z"/></svg>
                </a>
                <!-- YouTube -->
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" onclick="event.preventDefault(); store.showToast('YouTube Connected', 'Opening Stackly\'s official YouTube portal (Stackly Culinary Cinema).', 'gold');" class="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#272a38] bg-[#12141e] text-[#a1a1aa] hover:border-amber-400/50 hover:bg-amber-500/10 hover:text-amber-300 transition-all duration-200 shadow-sm" title="YouTube - Stackly Culinary Cinema">
                  <svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4 transition-transform group-hover:scale-110"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
                <!-- Facebook -->
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" onclick="event.preventDefault(); store.showToast('Facebook Connected', 'Opening Stackly\'s official Facebook portal (Stackly Reserve).', 'gold');" class="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-[#272a38] bg-[#12141e] text-[#a1a1aa] hover:border-amber-400/50 hover:bg-amber-500/10 hover:text-amber-300 transition-all duration-200 shadow-sm" title="Facebook - Stackly Reserve">
                  <svg viewBox="0 0 24 24" fill="currentColor" class="h-4 w-4 transition-transform group-hover:scale-110"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 class="font-display text-xs font-bold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul class="space-y-2.5 text-sm">
              <li><a href="index.html" class="text-[#8c8f9f] hover:text-amber-300 transition-colors">Home Overview</a></li>
              <li><a href="about.html" class="text-[#8c8f9f] hover:text-amber-300 transition-colors">About Stackly Charter</a></li>
              <li><a href="restaurants.html" class="text-[#8c8f9f] hover:text-amber-300 transition-colors">All Restaurants</a></li>
              <li><a href="my-reservations.html" class="text-[#8c8f9f] hover:text-amber-300 transition-colors">My Reservations</a></li>
              <li><a href="concierge.html" class="text-[#8c8f9f] hover:text-amber-300 transition-colors">Contact & Concierge Desk</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-display text-xs font-bold text-white uppercase tracking-wider mb-4">
              Dining Categories
            </h4>
            <ul class="space-y-2.5 text-sm">
              <li><a href="restaurants.html?cuisine=Omakase" class="text-[#8c8f9f] hover:text-amber-300 transition-colors">Hinoki Omakase Counters</a></li>
              <li><a href="restaurants.html?city=Bordeaux" class="text-[#8c8f9f] hover:text-amber-300 transition-colors">Historic Grand Cru Cellars</a></li>
              <li><a href="restaurants.html?city=Amalfi%20Coast" class="text-[#8c8f9f] hover:text-amber-300 transition-colors">Cliffside & Superyacht Dining</a></li>
              <li><a href="concierge.html" class="text-[#8c8f9f] hover:text-amber-300 transition-colors">Private Salon Buyouts</a></li>
              <li><a href="about.html" class="text-[#8c8f9f] hover:text-amber-300 transition-colors">3-Star Dining Charter</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-display text-xs font-bold text-white uppercase tracking-wider mb-4">
              Access Portals
            </h4>
            <ul class="space-y-2.5 text-sm">
              <li><a href="login.html" class="text-[#8c8f9f] hover:text-amber-300 transition-colors">VIP Member Sign In</a></li>
              <li><a href="signup.html" class="text-[#8c8f9f] hover:text-amber-300 transition-colors">Apply for Membership</a></li>
              <li><a href="admin-dashboard.html" class="text-[#8c8f9f] hover:text-amber-300 transition-colors">Maître D’ Command Room</a></li>
              <li><a href="client-profile.html" class="text-[#8c8f9f] hover:text-amber-300 transition-colors">VIP Member Passport</a></li>
              <li><a href="404.html" class="text-[#8c8f9f] hover:text-amber-300 transition-colors">404 Error Preview</a></li>
            </ul>
          </div>
        </div>

        <div class="mt-12 pt-8 border-t border-[#1d1f2a] flex flex-col md:flex-row items-center justify-between text-xs text-[#71717a] gap-4">
          <p>© 2026 STACKLY RESERVE Gastronomy Platforms Inc. All rights reserved.</p>
          <div class="flex flex-wrap items-center gap-6">
            <a href="concierge.html" class="hover:text-zinc-400">Global Contact</a>
            <span class="hover:text-zinc-400">Privacy Charter</span>
            <span class="hover:text-zinc-400">Sommelier Standards</span>
            <span class="hover:text-zinc-400">Cancellation Policy</span>
            <span class="hover:text-zinc-400">Security Protocols</span>
          </div>
        </div>
      </div>
    </footer>
  `;
}

function handleFooterNewsletterSubmit() {
  const container = document.getElementById('footer-newsletter-container');
  if (container) {
    container.innerHTML = `
      <div class="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-sm text-emerald-300">
        <i data-lucide="check-circle-2" class="h-5 w-5 text-emerald-400 shrink-0"></i>
        <span>You're on the Stackly allocation list. We'll alert you on table releases.</span>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
  }
  if (window.store && typeof store.showToast === 'function') {
    store.showToast(
      'Private Drop Access Granted',
      'You are now registered for 24-hour advance drops on Michelin 3-Star cancellations and chef counters via Stackly.',
      'gold'
    );
  }
}

// Spotlight Command Palette Modal Controller
let isCommandSearchOpen = false;

function toggleCommandSearch(isOpen) {
  isCommandSearchOpen = typeof isOpen === 'boolean' ? isOpen : !isCommandSearchOpen;
  renderCommandSearchModal();
}

document.addEventListener('keydown', (e) => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    toggleCommandSearch(true);
  }
  if (e.key === 'Escape' && isCommandSearchOpen) {
    toggleCommandSearch(false);
  }
});

function renderCommandSearchModal(query = '') {
  let modal = document.getElementById('command-search-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'command-search-modal';
    document.body.appendChild(modal);
  }

  if (!isCommandSearchOpen) {
    modal.innerHTML = '';
    return;
  }

  const q = query.toLowerCase().trim();
  const filtered = RESTAURANTS_DATA.filter((r) => {
    if (!q) return true;
    return (
      r.name.toLowerCase().includes(q) ||
      r.city.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q) ||
      r.neighborhood.toLowerCase().includes(q) ||
      r.chef.name.toLowerCase().includes(q) ||
      r.ambienceTags.some((t) => t.toLowerCase().includes(q))
    );
  });

  modal.className = 'fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/80 backdrop-blur-md animate-fade-in';
  modal.innerHTML = `
    <div class="relative w-full max-w-2xl rounded-2xl border border-[#2b2e40] bg-[#0f1118] shadow-2xl overflow-hidden text-white">
      
      <!-- Search Bar Input -->
      <div class="flex items-center gap-3 border-b border-[#202332] px-5 py-4 bg-[#141622]">
        <i data-lucide="search" class="h-5 w-5 text-amber-400 shrink-0"></i>
        <input
          id="cmd-search-input"
          type="text"
          value="${query}"
          oninput="renderCommandSearchModal(this.value)"
          placeholder="Search by restaurant name, city, chef, cuisine, or vibe (e.g. 'Ginza', 'Omakase', 'Skyline')..."
          class="w-full bg-transparent text-sm text-white placeholder-[#71717a] focus:outline-none"
        />
        <button onclick="toggleCommandSearch(false)" class="text-[#71717a] hover:text-white">
          <i data-lucide="x" class="h-4 w-4"></i>
        </button>
        <kbd class="hidden sm:inline-block rounded bg-[#202332] px-2 py-0.5 text-[10px] font-mono text-[#a1a1aa] border border-[#2d3042]">
          ESC
        </kbd>
      </div>

      <!-- Quick suggestion tags -->
      <div class="flex items-center gap-2 px-5 py-2.5 bg-[#0a0b10] border-b border-[#1c1e2b] text-xs overflow-x-auto">
        <span class="text-[#71717a] shrink-0">Popular:</span>
        ${['3 Michelin Stars', 'Tokyo Omakase', 'Hudson Yards NYC', 'Amalfi Coast', 'Birch Hearth', 'Basque Fire'].map((tag) => `
          <button
            onclick="renderCommandSearchModal('${tag}')"
            class="rounded-lg border border-[#262939] bg-[#12141c] px-2.5 py-1 text-[11px] text-[#a1a1aa] hover:border-amber-500/40 hover:text-amber-300 whitespace-nowrap cursor-pointer"
          >
            ${tag}
          </button>
        `).join('')}
      </div>

      <!-- Results List -->
      <div class="max-h-[60vh] overflow-y-auto p-3 space-y-1.5">
        ${filtered.length === 0 ? `
          <div class="py-12 text-center text-[#71717a]">
            <p class="text-sm">No reservations matching "${query}"</p>
            <p class="text-xs mt-1">Try searching for cities like "New York", "Tokyo", or "Bordeaux"</p>
          </div>
        ` : filtered.map((r) => `
          <a
            href="restaurant-detail.html?id=${r.id}"
            onclick="toggleCommandSearch(false)"
            class="group flex items-center justify-between gap-4 rounded-xl border border-transparent p-3 hover:border-amber-500/30 hover:bg-[#151824] cursor-pointer transition-all block"
          >
            <div class="flex items-center gap-3 min-w-0">
              <img src="${r.heroImage}" alt="${r.name}" class="h-12 w-12 rounded-xl object-cover shrink-0 border border-[#2a2d3e]" />
              <div class="min-w-0">
                <div class="flex items-center gap-2">
                  <h4 class="font-semibold text-sm text-white group-hover:text-amber-300 truncate">${r.name}</h4>
                  ${r.michelinStars > 0 ? `
                    <span class="flex items-center gap-0.5 text-amber-400 text-xs shrink-0">
                      ★ <span class="text-[11px] font-bold">${r.michelinStars} Star</span>
                    </span>
                  ` : ''}
                </div>
                <div class="flex items-center gap-2 text-xs text-[#8c8f9f] truncate mt-0.5">
                  <span>${r.cuisine}</span>
                  <span>•</span>
                  <span>${r.city}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3 shrink-0">
              <span class="text-xs text-amber-300 font-mono font-medium hidden sm:inline">$${r.pricePerPerson}/pp</span>
              <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1e2130] text-[#a1a1aa] group-hover:bg-amber-400 group-hover:text-black transition-colors">
                <i data-lucide="arrow-right" class="h-4 w-4"></i>
              </div>
            </div>
          </a>
        `).join('')}
      </div>

      <!-- Footer -->
      <div class="border-t border-[#1c1e2b] bg-[#0c0d13] px-5 py-3 flex items-center justify-between text-xs text-[#71717a]">
        <span>Showing ${filtered.length} haute cuisine destinations</span>
        <a href="restaurants.html" onclick="toggleCommandSearch(false)" class="text-amber-300 hover:underline">
          Open Advanced Catalog & Filters →
        </a>
      </div>

    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
  const input = document.getElementById('cmd-search-input');
  if (input && document.activeElement !== input) input.focus();
}
