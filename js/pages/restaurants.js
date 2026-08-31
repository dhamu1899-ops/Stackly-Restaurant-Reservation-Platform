// Restaurants Page Catalog Controller

let catalogCityFilter = 'All Global Destinations';
let catalogViewMode = 'grid'; // 'grid' | 'list' | 'map'
let selectedMapRestaurant = RESTAURANTS_DATA[0];

const CITIES_LIST = [
  'All Global Destinations',
  'New York',
  'Tokyo',
  'Amalfi Coast',
  'Stockholm',
  'Dubai',
  'Bordeaux'
];

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar('restaurants');
  renderFooter();

  // Read URL Params if present
  const params = new URLSearchParams(window.location.search);
  if (params.has('search')) {
    const qInput = document.getElementById('filter-search');
    if (qInput) qInput.value = params.get('search');
  }
  if (params.has('michelin')) {
    const mSelect = document.getElementById('filter-michelin');
    if (mSelect) mSelect.value = params.get('michelin');
  }
  if (params.has('cuisine')) {
    const cSelect = document.getElementById('filter-cuisine');
    if (cSelect) cSelect.value = params.get('cuisine');
  }
  if (params.has('city')) {
    catalogCityFilter = params.get('city');
  }

  renderCityChips();
  renderUrgentDrops();
  applyCatalogFilters();
});

function renderCityChips() {
  const container = document.getElementById('city-chips-container');
  if (!container) return;

  container.innerHTML = CITIES_LIST.map((c) => {
    const isActive = catalogCityFilter === c;
    return `
      <button 
        onclick="setCityFilter('${c}')" 
        class="rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
          isActive
            ? 'bg-amber-400 text-black font-semibold shadow-[0_0_12px_rgba(232,193,90,0.3)]'
            : 'border border-[#292c3d] bg-[#141622] text-[#a1a1aa] hover:border-amber-500/40 hover:text-white'
        }"
      >
        ${c}
      </button>
    `;
  }).join('');
}

function setCityFilter(city) {
  catalogCityFilter = city;
  renderCityChips();
  applyCatalogFilters();
}

function renderUrgentDrops() {
  const container = document.getElementById('urgent-drops-container');
  if (!container) return;

  const drops = RESTAURANTS_DATA.slice(0, 3);

  container.innerHTML = drops.map((rest) => `
    <div onclick="store.openBookingModal(RESTAURANTS_DATA.find(r=>r.id==='${rest.id}'))" class="rounded-2xl border border-amber-500/30 bg-[#141724] p-4 flex items-center justify-between gap-4 hover:border-amber-400 transition-all cursor-pointer shadow-lg group">
      <div class="flex items-center gap-3 min-w-0">
        <img src="${rest.heroImage}" alt="${rest.name}" class="h-12 w-12 rounded-xl object-cover shrink-0 border border-amber-500/30" />
        <div class="min-w-0">
          <div class="flex items-center gap-1.5">
            <span class="font-display text-xs font-bold text-white group-hover:text-amber-300 truncate">${rest.name}</span>
            ${rest.michelinStars > 0 ? `<span class="text-[10px] text-amber-400 shrink-0 font-bold">★${rest.michelinStars}</span>` : ''}
          </div>
          <p class="text-[10px] text-[#8c8f9f] truncate">${rest.neighborhood}, ${rest.city}</p>
          <p class="text-[10px] text-amber-300 font-mono mt-0.5">Tonight 19:45 • 2-4 Seats</p>
        </div>
      </div>
      <button class="rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-3 py-1.5 text-xs font-bold text-black hover:brightness-110 shrink-0 whitespace-nowrap shadow cursor-pointer">
        Book Now
      </button>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}

function setCatalogViewMode(mode) {
  catalogViewMode = mode;
  ['grid', 'list', 'map'].forEach((m) => {
    const btn = document.getElementById(`view-mode-${m}`);
    if (btn) {
      if (m === mode) {
        btn.className = 'flex h-7 w-7 items-center justify-center rounded-lg bg-amber-400 text-black font-bold cursor-pointer';
      } else {
        btn.className = 'flex h-7 w-7 items-center justify-center rounded-lg text-[#8c8f9f] hover:text-white cursor-pointer';
      }
    }
  });
  applyCatalogFilters();
}

function resetCatalogFilters() {
  const searchInput = document.getElementById('filter-search');
  if (searchInput) searchInput.value = '';
  const michelin = document.getElementById('filter-michelin');
  if (michelin) michelin.value = 'all';
  const cuisine = document.getElementById('filter-cuisine');
  if (cuisine) cuisine.value = 'all';
  const price = document.getElementById('filter-price');
  if (price) price.value = 'all';
  const sort = document.getElementById('filter-sort');
  if (sort) sort.value = 'recommended';
  setCityFilter('All Global Destinations');
}

function applyCatalogFilters() {
  const container = document.getElementById('catalog-view-container');
  const countLabel = document.getElementById('catalog-count-label');
  const activeTagsContainer = document.getElementById('active-filter-tags');
  if (!container) return;

  const searchQuery = (document.getElementById('filter-search')?.value || '').toLowerCase().trim();
  const michelin = document.getElementById('filter-michelin')?.value || 'all';
  const cuisine = document.getElementById('filter-cuisine')?.value || 'all';
  const price = document.getElementById('filter-price')?.value || 'all';
  const sort = document.getElementById('filter-sort')?.value || 'recommended';

  let list = RESTAURANTS_DATA.filter((r) => {
    if (searchQuery) {
      const matchName = r.name.toLowerCase().includes(searchQuery);
      const matchCuisine = r.cuisine.toLowerCase().includes(searchQuery);
      const matchCity = r.city.toLowerCase().includes(searchQuery);
      const matchChef = r.chef.name.toLowerCase().includes(searchQuery);
      const matchTag = r.ambienceTags.some((t) => t.toLowerCase().includes(searchQuery));
      if (!matchName && !matchCuisine && !matchCity && !matchChef && !matchTag) return false;
    }

    if (catalogCityFilter !== 'All Global Destinations' && r.city.toLowerCase() !== catalogCityFilter.toLowerCase()) return false;
    if (cuisine !== 'all' && !r.cuisine.toLowerCase().includes(cuisine.toLowerCase())) return false;
    
    if (michelin === '3' && r.michelinStars !== 3) return false;
    if (michelin === '2' && r.michelinStars !== 2) return false;
    if (michelin === 'starred' && r.michelinStars < 1) return false;

    if (price !== 'all' && r.priceRange !== price) return false;

    return true;
  });

  // Sorting
  if (sort === 'stars') {
    list.sort((a, b) => b.michelinStars - a.michelinStars);
  } else if (sort === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  } else if (sort === 'price-desc') {
    list.sort((a, b) => b.pricePerPerson - a.pricePerPerson);
  } else if (sort === 'price-asc') {
    list.sort((a, b) => a.pricePerPerson - b.pricePerPerson);
  }

  if (countLabel) {
    countLabel.innerHTML = `Found <strong class="text-white font-semibold">${list.length}</strong> premier dining allocations`;
  }

  if (activeTagsContainer) {
    let tagsHtml = '';
    if (catalogCityFilter !== 'All Global Destinations') {
      tagsHtml += `<span class="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-amber-300 text-xs">${catalogCityFilter} <i data-lucide="x" class="h-3 w-3 cursor-pointer" onclick="setCityFilter('All Global Destinations')"></i></span>`;
    }
    if (michelin !== 'all') {
      tagsHtml += `<span class="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/30 px-2.5 py-0.5 text-amber-300 text-xs">${michelin} Stars <i data-lucide="x" class="h-3 w-3 cursor-pointer" onclick="document.getElementById('filter-michelin').value='all'; applyCatalogFilters();"></i></span>`;
    }
    activeTagsContainer.innerHTML = tagsHtml;
  }

  if (!list.length) {
    container.innerHTML = `
      <div class="py-20 text-center rounded-3xl border border-[#222536] bg-[#11131c]">
        <i data-lucide="sparkles" class="h-8 w-8 text-amber-400 mx-auto mb-3"></i>
        <h3 class="text-lg font-bold text-white">No Dining Allocations Found</h3>
        <p class="text-xs text-[#8c8f9f] mt-1 max-w-sm mx-auto">
          Try adjusting your cuisine, destination, or Michelin star filters to discover available tables.
        </p>
        <button onclick="resetCatalogFilters()" class="mt-4 rounded-xl bg-amber-400 px-4 py-2 text-xs font-bold text-black hover:brightness-110 cursor-pointer">
          Reset All Filters
        </button>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  if (catalogViewMode === 'grid' || catalogViewMode === 'list') {
    container.innerHTML = `
      <div class="${catalogViewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}">
        ${list.map((r) => renderRestaurantCardHTML(r, catalogViewMode)).join('')}
      </div>
    `;
  } else if (catalogViewMode === 'map') {
    if (!selectedMapRestaurant || !list.some(r=>r.id===selectedMapRestaurant.id)) {
      selectedMapRestaurant = list[0];
    }

    container.innerHTML = `
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[650px]">
        <div class="overflow-y-auto space-y-4 pr-2">
          ${list.map((r) => {
            const isSelected = selectedMapRestaurant?.id === r.id;
            return `
              <div onclick="selectedMapRestaurant=RESTAURANTS_DATA.find(x=>x.id==='${r.id}'); applyCatalogFilters();" class="rounded-2xl border p-4 cursor-pointer transition-all ${isSelected ? 'border-amber-400 bg-[#161928] shadow-[0_0_20px_rgba(232,193,90,0.15)]' : 'border-[#262837] bg-[#12141c] hover:border-amber-500/30'}">
                <div class="flex gap-3.5">
                  <img src="${r.heroImage}" alt="${r.name}" class="h-18 w-18 rounded-xl object-cover shrink-0 border border-[#2e3144]" />
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between">
                      <h4 class="font-display font-bold text-sm text-white truncate">${r.name}</h4>
                      <span class="text-[10px] text-amber-400 font-bold">★ ${r.michelinStars} Star</span>
                    </div>
                    <p class="text-xs text-[#8c8f9f] truncate mt-0.5">${r.neighborhood}, ${r.city}</p>
                    <div class="mt-2 flex items-center justify-between text-xs">
                      <span class="text-amber-300 font-medium">$${r.pricePerPerson}/pp</span>
                      <a href="restaurant-detail.html?id=${r.id}" class="text-xs text-amber-400 hover:underline font-medium">Profile →</a>
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="lg:col-span-2 relative rounded-3xl border border-[#262838] bg-[#0c0d14] overflow-hidden shadow-2xl flex flex-col">
          <div class="relative flex-1 w-full bg-[#08090f] overflow-hidden flex items-center justify-center" style="background-image: radial-gradient(#1f2235 1.5px, transparent 1.5px); background-size: 32px 32px;">
            <svg class="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 1000 500">
              <path d="M150,150 Q200,80 350,120 T600,180 T850,150 T900,300 T750,400 T500,350 T200,380 Z" fill="none" stroke="#d4af37" stroke-width="1.5" stroke-dasharray="4 4" />
              <circle cx="280" cy="180" r="80" fill="#d4af37" fill-opacity="0.05" />
              <circle cx="820" cy="190" r="70" fill="#d4af37" fill-opacity="0.05" />
              <circle cx="520" cy="180" r="90" fill="#d4af37" fill-opacity="0.05" />
            </svg>

            ${list.map((r, idx) => {
              const isSelected = selectedMapRestaurant?.id === r.id;
              const xPos = 20 + ((idx * 28 + (r.lng * 2)) % 65);
              const yPos = 25 + ((idx * 22 + (r.lat * 1.5)) % 55);

              return `
                <div onclick="selectedMapRestaurant=RESTAURANTS_DATA.find(x=>x.id==='${r.id}'); applyCatalogFilters();" style="left: ${xPos}%; top: ${yPos}%;" class="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 group">
                  <div class="relative flex items-center justify-center transition-all ${isSelected ? 'scale-125 z-20' : 'hover:scale-110'}">
                    <div class="flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold shadow-2xl backdrop-blur-md transition-all ${isSelected ? 'bg-amber-400 text-black ring-4 ring-amber-400/30' : 'bg-black/90 text-amber-300 border border-amber-500/40'}">
                      <i data-lucide="star" class="h-3 w-3 fill-current"></i>
                      <span>${r.name.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}

            ${selectedMapRestaurant ? `
              <div class="absolute bottom-4 inset-x-4 sm:inset-x-8 rounded-2xl border border-amber-500/40 bg-[#10121c]/95 p-4 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div class="flex items-center gap-3.5 min-w-0">
                  <img src="${selectedMapRestaurant.heroImage}" alt="${selectedMapRestaurant.name}" class="h-16 w-16 rounded-xl object-cover shrink-0 border border-[#2e3144]" />
                  <div class="min-w-0">
                    <div class="flex items-center gap-2">
                      <h3 class="font-display font-bold text-base text-white truncate">${selectedMapRestaurant.name}</h3>
                      <span class="rounded-md bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">${selectedMapRestaurant.michelinStars} Star Michelin</span>
                    </div>
                    <p class="text-xs text-[#8c8f9f] truncate mt-0.5">${selectedMapRestaurant.address}</p>
                    <p class="text-xs text-amber-300 font-medium mt-1">${selectedMapRestaurant.cuisine} • $${selectedMapRestaurant.pricePerPerson}/pp</p>
                  </div>
                </div>

                <div class="flex items-center gap-2 shrink-0">
                  <button onclick="store.openBookingModal(selectedMapRestaurant)" class="rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-4 py-2.5 text-xs font-bold text-black hover:brightness-110 shadow-lg cursor-pointer">
                    Reserve Table
                  </button>
                  <a href="restaurant-detail.html?id=${selectedMapRestaurant.id}" class="rounded-xl border border-[#2e3144] bg-[#181a27] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#222536]">
                    Full Profile
                  </a>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }

  if (window.lucide) window.lucide.createIcons();
}
