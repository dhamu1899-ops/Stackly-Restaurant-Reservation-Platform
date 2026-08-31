// My Reservations Page Controller

let currentResTab = 'upcoming'; // 'upcoming' | 'saved' | 'past'

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar('my-reservations');
  renderFooter();

  // Listen to store updates
  store.subscribe(renderTabContent);
  renderTabContent();
});

function setReservationsTab(tab) {
  currentResTab = tab;

  ['upcoming', 'saved', 'past'].forEach((t) => {
    const btn = document.getElementById(`tab-btn-${t}`);
    if (btn) {
      if (t === tab) {
        btn.className = 'flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 border-amber-400 text-amber-300 transition-all cursor-pointer';
      } else {
        btn.className = 'flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 border-transparent text-[#8c8f9f] hover:text-white transition-all cursor-pointer';
      }
    }
  });

  renderTabContent();
}

function renderTabContent() {
  const container = document.getElementById('reservations-content-area');
  if (!container) return;

  const upcoming = store.reservations.filter((r) => r.status === 'confirmed');
  const past = store.reservations.filter((r) => r.status === 'completed' || r.status === 'cancelled');
  const saved = RESTAURANTS_DATA.filter((r) => store.favorites.includes(r.id));

  // Update tab counters
  const labelUp = document.getElementById('tab-label-upcoming');
  const labelFav = document.getElementById('tab-label-saved');
  const labelPast = document.getElementById('tab-label-past');

  if (labelUp) labelUp.textContent = `Upcoming Tables (${upcoming.length})`;
  if (labelFav) labelFav.textContent = `Saved Hotlist (${saved.length})`;
  if (labelPast) labelPast.textContent = `Dining History (${past.length})`;

  if (currentResTab === 'upcoming') {
    if (upcoming.length === 0) {
      container.innerHTML = `
        <div class="py-20 text-center rounded-3xl border border-[#222536] bg-[#11131c]">
          <i data-lucide="calendar" class="h-10 w-10 text-amber-400/60 mx-auto mb-3"></i>
          <h3 class="text-xl font-bold text-white font-display">No Upcoming Reservations</h3>
          <p class="text-xs text-[#8c8f9f] mt-1 max-w-sm mx-auto">
            Explore our Michelin 3-Star sanctuaries and reserve your next gastronomic evening.
          </p>
          <a href="restaurants.html" class="inline-block mt-5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-6 py-2.5 text-xs font-bold text-black hover:brightness-110">
            Discover Tables
          </a>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="space-y-6">
          ${upcoming.map((res) => `
            <div class="group relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#151724] via-[#11131c] to-[#0c0d14] p-6 sm:p-8 shadow-2xl transition-all hover:border-amber-500/50">
              <div class="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
                
                <div class="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                  <img src="${res.restaurantImage}" alt="${res.restaurantName}" class="h-28 w-28 rounded-2xl object-cover border border-[#2e3144] shadow-lg shrink-0" />
                  <div class="space-y-1">
                    <div class="flex items-center gap-2">
                      <span class="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-bold text-emerald-300">
                        ✓ Confirmed & Guaranteed
                      </span>
                      <span class="font-mono text-xs text-amber-300 font-bold">
                        Code: ${res.confirmationCode}
                      </span>
                    </div>

                    <a href="restaurant-detail.html?id=${res.restaurantId}" class="font-display text-2xl font-bold text-white hover:text-amber-300 transition-colors block">
                      ${res.restaurantName}
                    </a>

                    <p class="text-xs text-[#8c8f9f] flex items-center gap-1">
                      <i data-lucide="map-pin" class="h-3.5 w-3.5 text-amber-400"></i>
                      ${res.restaurantNeighborhood}, ${res.restaurantCity}
                    </p>

                    <div class="pt-2 flex flex-wrap items-center gap-3 text-xs text-[#d4d4d8]">
                      <span class="flex items-center gap-1 font-semibold text-amber-200">
                        <i data-lucide="calendar" class="h-3.5 w-3.5 text-amber-400"></i>
                        ${res.date}
                      </span>
                      <span>•</span>
                      <span class="flex items-center gap-1 font-mono font-bold text-white">
                        <i data-lucide="clock" class="h-3.5 w-3.5 text-amber-400"></i>
                        ${res.time}
                      </span>
                      <span>•</span>
                      <span class="flex items-center gap-1">
                        <i data-lucide="users" class="h-3.5 w-3.5 text-amber-400"></i>
                        ${res.guests} Guests
                      </span>
                      <span>•</span>
                      <span class="text-amber-300 font-medium">
                        ${res.tableNumber ? `Table #${res.tableNumber}` : res.seatingAreaName}
                      </span>
                    </div>
                  </div>
                </div>

                <div class="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto shrink-0">
                  <button onclick="store.openPassModal(store.reservations.find(r=>r.id==='${res.id}'))" class="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-6 py-3 text-xs font-bold text-black hover:brightness-110 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.2)] cursor-pointer">
                    <i data-lucide="qr-code" class="h-4 w-4"></i>
                    <span>View Digital VIP Pass</span>
                  </button>

                  <div class="flex gap-2">
                    <a href="restaurant-detail.html?id=${res.restaurantId}" class="flex-1 rounded-xl border border-[#2c2f42] bg-[#181a26] py-2 px-3 text-xs font-semibold text-white hover:bg-[#222536] transition-colors text-center">
                      View Menu & Floor Plan
                    </a>

                    <button onclick="if(confirm('Are you sure you wish to release your confirmed table at ${res.restaurantName}?')){ store.cancelReservation('${res.id}'); }" class="rounded-xl border border-rose-500/30 bg-rose-500/10 p-2 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors cursor-pointer" title="Cancel Table">
                      <i data-lucide="trash-2" class="h-4 w-4"></i>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  } else if (currentResTab === 'saved') {
    if (saved.length === 0) {
      container.innerHTML = `
        <div class="py-20 text-center rounded-3xl border border-[#222536] bg-[#11131c]">
          <i data-lucide="heart" class="h-10 w-10 text-rose-400/60 mx-auto mb-3"></i>
          <h3 class="text-xl font-bold text-white font-display">Your Hotlist is Empty</h3>
          <p class="text-xs text-[#8c8f9f] mt-1 max-w-sm mx-auto">
            Click the heart icon on any restaurant card to save your preferred destinations for easy booking.
          </p>
          <a href="restaurants.html" class="inline-block mt-5 rounded-xl bg-amber-400 px-6 py-2.5 text-xs font-bold text-black hover:brightness-110">
            Browse Michelin Guide
          </a>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${saved.map((r) => renderRestaurantCardHTML(r, 'grid')).join('')}
        </div>
      `;
    }
  } else if (currentResTab === 'past') {
    if (past.length === 0) {
      container.innerHTML = `
        <div class="py-20 text-center rounded-3xl border border-[#222536] bg-[#11131c]">
          <i data-lucide="history" class="h-10 w-10 text-[#8c8f9f] mx-auto mb-3"></i>
          <h3 class="text-xl font-bold text-white font-display">No Past Dining History</h3>
          <p class="text-xs text-[#8c8f9f] mt-1 max-w-sm mx-auto">
            Your completed and historical Michelin dining experiences will appear here.
          </p>
        </div>
      `;
    } else {
      container.innerHTML = `
        <div class="space-y-4">
          ${past.map((res) => `
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-[#252837] bg-[#12141c] p-5 opacity-75">
              <div class="flex items-center gap-4">
                <img src="${res.restaurantImage}" alt="${res.restaurantName}" class="h-14 w-14 rounded-xl object-cover border border-[#2a2d3e]" />
                <div>
                  <div class="flex items-center gap-2">
                    <h4 class="font-bold text-base text-white">${res.restaurantName}</h4>
                    <span class="px-2 py-0.5 rounded text-[10px] font-semibold ${res.status === 'cancelled' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' : 'bg-zinc-800 text-zinc-300'}">
                      ${res.status === 'cancelled' ? 'Cancelled' : 'Completed'}
                    </span>
                  </div>
                  <p class="text-xs text-[#8c8f9f]">${res.date} • ${res.time} • ${res.guests} Guests</p>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <button onclick="store.openBookingModal(RESTAURANTS_DATA.find(r=>r.id==='${res.restaurantId}'))" class="rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-400 hover:text-black transition-all cursor-pointer">
                  Rebook in 1-Click
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `;
    }
  }

  if (window.lucide) window.lucide.createIcons();
}
