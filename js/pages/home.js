// Home Page Controller Script

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar('home');
  renderFooter();
  renderHomeFeaturedRestaurants();
  renderHomeFeaturedExperiences();
});

function renderHomeFeaturedRestaurants() {
  const container = document.getElementById('featured-restaurants-grid');
  if (!container) return;

  const featuredList = RESTAURANTS_DATA.slice(0, 3);

  container.innerHTML = featuredList.map((r) => renderRestaurantCardHTML(r, 'grid')).join('');

  if (window.lucide) window.lucide.createIcons();
}

function renderHomeFeaturedExperiences() {
  const container = document.getElementById('featured-experiences-grid');
  if (!container) return;

  container.innerHTML = EXPERIENCES_DATA.slice(0, 2).map((exp) => `
    <div class="group rounded-2xl luxury-glass overflow-hidden border border-amber-500/20 luxury-glass-hover grid grid-cols-1 sm:grid-cols-2">
      <div class="relative h-64 sm:h-auto overflow-hidden">
        <img src="${exp.image}" alt="${exp.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <span class="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-stone-950/80 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
          ${exp.spotsRemaining} Spots Remaining
        </span>
      </div>
      <div class="p-6 flex flex-col justify-between space-y-4">
        <div>
          <span class="text-[10px] uppercase font-bold tracking-widest text-amber-400">${exp.location}</span>
          <h3 class="font-display text-lg font-bold text-stone-100 mt-1">${exp.title}</h3>
          <p class="text-xs text-stone-400 mt-2 line-clamp-2">${exp.subtitle}</p>
        </div>

        <div class="space-y-3 pt-2">
          <div class="flex items-center justify-between text-xs text-stone-300 border-t border-stone-800 pt-3">
            <span>Duration: ${exp.duration}</span>
            <span class="font-bold text-amber-300">$${exp.pricePerPerson} / guest</span>
          </div>
          <button onclick="store.showToast('Experience Request', 'Your inquiry for ${exp.title} has been routed to Executive Concierge.', 'gold')" class="w-full py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer">
            Request Bespoke Booking
          </button>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) window.lucide.createIcons();
}
