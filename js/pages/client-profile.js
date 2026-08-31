// Client Profile Page Controller

let isEditingProfile = false;

document.addEventListener('DOMContentLoaded', () => {
  renderClientProfile();
  store.subscribe(renderClientProfile);
});

function toggleEditProfile() {
  isEditingProfile = !isEditingProfile;
  renderClientProfile();
}

function handleSaveClientProfile(e) {
  e.preventDefault();
  const name = document.getElementById('prof-name')?.value || 'Alexander Sterling';
  const phone = document.getElementById('prof-phone')?.value || '+1 (555) 234-8900';
  const city = document.getElementById('prof-city')?.value || 'New York & Paris';
  const dietary = document.getElementById('prof-dietary')?.value || '';

  store.updateUserProfile({
    name,
    phone,
    city,
    dietaryNotes: dietary
  });

  isEditingProfile = false;
  store.showToast('Profile Updated', 'Your culinary preferences and cellar notes have been saved.', 'gold');
  renderClientProfile();
}

function showPassModal(resId) {
  const res = store.reservations.find((r) => r.id === resId);
  if (!res) return;

  const modal = document.getElementById('pass-popup-modal');
  const content = document.getElementById('pass-popup-content');

  if (modal && content) {
    content.innerHTML = `
      <div class="absolute top-0 right-0 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none"></div>
      <button onclick="document.getElementById('pass-popup-modal').classList.add('hidden')" class="absolute top-4 right-4 text-[#71717a] hover:text-white">
        <i data-lucide="x" class="h-5 w-5"></i>
      </button>

      <div class="space-y-1">
        <span class="font-display text-xs uppercase tracking-[0.2em] text-amber-400 font-bold">
          STACKLY DIGITAL DINING PASS
        </span>
        <h3 class="font-display text-xl font-bold text-white">${res.restaurantName}</h3>
        <p class="text-xs text-[#a1a1aa]">${res.restaurantCity} • ${res.seatingAreaName}</p>
      </div>

      <div class="mx-auto w-44 h-44 bg-white rounded-2xl p-3 flex flex-col items-center justify-center shadow-lg">
        <div class="w-full h-full border-4 border-black rounded-lg p-2 flex flex-col items-center justify-between">
          <div class="grid grid-cols-5 gap-1 w-full flex-1">
            ${Array.from({ length: 25 }).map((_, i) => `
              <div class="rounded-xs ${(i * 7) % 3 === 0 ? 'bg-black' : 'bg-transparent'}"></div>
            `).join('')}
          </div>
          <span class="font-mono text-[9px] font-bold text-black tracking-widest mt-1">${res.confirmationCode}</span>
        </div>
      </div>

      <div class="space-y-1 text-xs text-[#d4d4d8]">
        <div class="font-bold text-amber-300">${res.date} at ${res.time}</div>
        <div>Table #${res.tableNumber || 10} • ${res.guests} Covers</div>
        <div class="text-[10px] text-[#a1a1aa] pt-1">Present to Maître D’ upon arrival for immediate priority seating.</div>
      </div>

      <button onclick="document.getElementById('pass-popup-modal').classList.add('hidden')" class="w-full rounded-xl bg-amber-400 py-2.5 text-xs font-bold text-black hover:bg-amber-300">
        Done
      </button>
    `;
    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }
}

function renderClientProfile() {
  const stage = document.getElementById('client-profile-stage');
  if (!stage) return;

  const user = store.currentUser;
  if (!user) {
    stage.innerHTML = `
      <div class="py-16 text-center max-w-lg mx-auto rounded-3xl border border-amber-500/30 bg-[#12141e] p-8 shadow-2xl space-y-5">
        <div class="mx-auto h-16 w-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <i data-lucide="crown" class="h-8 w-8"></i>
        </div>
        <h2 class="font-display text-2xl font-bold text-white">VIP Patron Portal</h2>
        <p class="text-xs text-[#a1a1aa] leading-relaxed">
          Please sign in to access your digital NFC dining passport, active Michelin reservations, and private cellar allocations.
        </p>
        <a href="login.html" class="inline-block rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-6 py-2.5 text-xs font-bold text-black hover:brightness-110">
          Sign In as VIP Member
        </a>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  const nameEl = document.getElementById('vip-user-name');
  const idEl = document.getElementById('vip-user-id');
  const badgeEl = document.getElementById('vip-tier-badge');
  if (nameEl) nameEl.textContent = user.name;
  if (idEl) idEl.textContent = (user.id || 'usr-1').toUpperCase();
  if (badgeEl) badgeEl.textContent = user.membershipTier || 'Black Diamond VIP';

  const confirmed = store.reservations.filter((r) => r.status === 'confirmed');

  stage.innerHTML = `
    <!-- Stats Banner -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="rounded-2xl border border-[#222534] bg-[#12141e] p-5 shadow-lg">
        <div class="flex items-center justify-between text-[#a1a1aa]">
          <span class="text-xs font-semibold uppercase tracking-wider">Michelin Stars Visited</span>
          <i data-lucide="sparkles" class="h-4 w-4 text-amber-400"></i>
        </div>
        <div class="mt-3 flex items-baseline gap-2">
          <span class="text-3xl font-bold font-display text-white">18 Stars</span>
          <span class="text-xs text-amber-300">Global</span>
        </div>
        <p class="text-[11px] text-[#71717a] mt-1">Across NYC, Tokyo, Paris, Amalfi</p>
      </div>

      <div class="rounded-2xl border border-[#222534] bg-[#12141e] p-5 shadow-lg">
        <div class="flex items-center justify-between text-[#a1a1aa]">
          <span class="text-xs font-semibold uppercase tracking-wider">Stackly Rewards</span>
          <i data-lucide="award" class="h-4 w-4 text-emerald-400"></i>
        </div>
        <div class="mt-3 flex items-baseline gap-2">
          <span class="text-3xl font-bold font-display text-white">${(user.loyaltyPoints || 14250).toLocaleString()}</span>
          <span class="text-xs text-emerald-400">Points</span>
        </div>
        <p class="text-[11px] text-[#71717a] mt-1">Complimentary Grand Cru pairing ready</p>
      </div>

      <div class="rounded-2xl border border-[#222534] bg-[#12141e] p-5 shadow-lg">
        <div class="flex items-center justify-between text-[#a1a1aa]">
          <span class="text-xs font-semibold uppercase tracking-wider">Active Bookings</span>
          <i data-lucide="calendar" class="h-4 w-4 text-blue-400"></i>
        </div>
        <div class="mt-3 flex items-baseline gap-2">
          <span class="text-3xl font-bold font-display text-white">${confirmed.length}</span>
          <span class="text-xs text-blue-300">Confirmed</span>
        </div>
        <p class="text-[11px] text-[#71717a] mt-1">NFC Digital passes loaded</p>
      </div>

      <div class="rounded-2xl border border-[#222534] bg-[#12141e] p-5 shadow-lg">
        <div class="flex items-center justify-between text-[#a1a1aa]">
          <span class="text-xs font-semibold uppercase tracking-wider">Saved Tables</span>
          <i data-lucide="heart" class="h-4 w-4 text-rose-400"></i>
        </div>
        <div class="mt-3 flex items-baseline gap-2">
          <span class="text-3xl font-bold font-display text-white">${store.favorites.length}</span>
          <span class="text-xs text-rose-300">Wishlisted</span>
        </div>
        <p class="text-[11px] text-[#71717a] mt-1">Priority table drop alerts active</p>
      </div>
    </div>

    <!-- Main Content Columns -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Left: VIP Pass Card & Form -->
      <div class="lg:col-span-7 space-y-6">
        <div class="relative rounded-3xl border border-amber-500/40 bg-gradient-to-br from-[#222536] via-[#151722] to-[#0c0d12] p-7 shadow-2xl overflow-hidden">
          <div class="absolute top-0 right-0 w-48 h-48 bg-amber-500/15 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
          
          <div class="flex items-center justify-between relative z-10">
            <div class="flex items-center gap-2">
              <i data-lucide="sparkles" class="h-5 w-5 text-amber-300"></i>
              <span class="font-display tracking-[0.2em] text-sm font-bold text-white">STACKLY RESERVE</span>
            </div>
            <span class="text-[11px] uppercase tracking-[0.2em] text-amber-400 font-bold">BLACK DIAMOND PASS</span>
          </div>

          <div class="mt-8 space-y-1 relative z-10">
            <span class="text-[10px] uppercase tracking-wider text-[#a1a1aa]">Cardholder</span>
            <div class="font-display text-2xl font-bold text-white">${user.name}</div>
          </div>

          <div class="mt-6 pt-4 border-t border-white/10 flex items-center justify-between relative z-10 text-xs text-[#a1a1aa]">
            <div>
              <span class="block text-[9px] uppercase text-[#71717a]">Tier Status</span>
              <span class="text-amber-300 font-semibold">${user.membershipTier || 'Black Diamond VIP'}</span>
            </div>
            <div>
              <span class="block text-[9px] uppercase text-[#71717a]">Valid Thru</span>
              <span class="text-white font-mono">12/2028</span>
            </div>
            <div class="flex items-center gap-1.5 text-emerald-400">
              <i data-lucide="shield-check" class="h-4 w-4"></i>
              <span class="text-[11px]">Cryptographically Signed</span>
            </div>
          </div>
        </div>

        <div class="rounded-3xl border border-[#222534] bg-[#12141e] p-6 shadow-xl space-y-5">
          <div class="flex items-center justify-between border-b border-[#1f2230] pb-4">
            <div>
              <h3 class="font-display text-lg font-bold text-white">Gastronomic Profile & Directives</h3>
              <p class="text-xs text-[#a1a1aa]">Shared automatically with Executive Chefs upon table booking</p>
            </div>
            <button onclick="toggleEditProfile()" class="flex items-center gap-1.5 rounded-xl border border-[#2b2e40] bg-[#161826] px-3.5 py-1.5 text-xs text-amber-300 hover:border-amber-400 transition-colors cursor-pointer">
              <i data-lucide="edit-3" class="h-3.5 w-3.5"></i>
              <span>${isEditingProfile ? 'Cancel' : 'Edit Profile'}</span>
            </button>
          </div>

          <form onsubmit="handleSaveClientProfile(event)" class="space-y-4">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] mb-1.5">Full Name</label>
                <input type="text" id="prof-name" ${!isEditingProfile ? 'disabled' : ''} value="${user.name}" class="w-full rounded-xl border border-[#2b2e40] bg-[#161826] px-3.5 py-2.5 text-xs text-white disabled:opacity-60 focus:border-amber-400 focus:outline-none" />
              </div>
              <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] mb-1.5">Concierge Mobile</label>
                <input type="text" id="prof-phone" ${!isEditingProfile ? 'disabled' : ''} value="${user.phone || '+1 (555) 234-8900'}" class="w-full rounded-xl border border-[#2b2e40] bg-[#161826] px-3.5 py-2.5 text-xs text-white disabled:opacity-60 focus:border-amber-400 focus:outline-none" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] mb-1.5">Primary Gastronomy Residence</label>
              <input type="text" id="prof-city" ${!isEditingProfile ? 'disabled' : ''} value="${user.city || 'New York & Paris'}" class="w-full rounded-xl border border-[#2b2e40] bg-[#161826] px-3.5 py-2.5 text-xs text-white disabled:opacity-60 focus:border-amber-400 focus:outline-none" />
            </div>

            <div>
              <label class="block text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] mb-1.5">Dietary Restrictions & Wine Pairing Preferences</label>
              <textarea id="prof-dietary" rows="3" ${!isEditingProfile ? 'disabled' : ''} class="w-full rounded-xl border border-[#2b2e40] bg-[#161826] px-3.5 py-2.5 text-xs text-white disabled:opacity-60 focus:border-amber-400 focus:outline-none resize-none">${user.dietaryNotes || 'Pescatarian, Truffle enthusiast, preference for French Burgundies'}</textarea>
            </div>

            ${isEditingProfile ? `
              <button type="submit" class="flex items-center justify-center gap-2 rounded-xl bg-amber-400 py-3 px-6 text-xs font-bold text-black hover:bg-amber-300 transition-colors shadow cursor-pointer">
                <i data-lucide="save" class="h-3.5 w-3.5"></i>
                <span>Save Culinary Profile</span>
              </button>
            ` : ''}
          </form>
        </div>
      </div>

      <!-- Right: Active Passes -->
      <div class="lg:col-span-5 space-y-6">
        <div class="rounded-3xl border border-[#222534] bg-[#12141e] p-6 shadow-xl space-y-4">
          <div class="flex items-center justify-between border-b border-[#1f2230] pb-3">
            <div class="flex items-center gap-2">
              <i data-lucide="calendar" class="h-5 w-5 text-amber-400"></i>
              <h3 class="font-display text-base font-bold text-white">Confirmed Dining Passes</h3>
            </div>
            <span class="text-xs text-amber-300 font-semibold">${confirmed.length} Active</span>
          </div>

          ${confirmed.length === 0 ? `
            <div class="text-center py-8 space-y-3">
              <i data-lucide="utensils" class="mx-auto h-8 w-8 text-[#71717a]"></i>
              <p class="text-xs text-[#a1a1aa]">No active table bookings currently confirmed.</p>
              <a href="restaurants.html" class="inline-block rounded-xl bg-amber-400 px-4 py-2 text-xs font-bold text-black hover:bg-amber-300">
                Browse Michelin Tables
              </a>
            </div>
          ` : `
            <div class="space-y-3">
              ${confirmed.map((res) => `
                <div class="rounded-2xl border border-[#26293a] bg-[#161826] p-4 space-y-3 hover:border-amber-500/40 transition-colors">
                  <div class="flex items-start justify-between">
                    <div>
                      <h4 class="font-bold text-white text-sm">${res.restaurantName}</h4>
                      <p class="text-xs text-[#a1a1aa] flex items-center gap-1 mt-0.5">
                        <i data-lucide="map-pin" class="h-3 w-3 text-amber-400"></i>
                        <span>${res.restaurantCity} • ${res.seatingAreaName}</span>
                      </p>
                    </div>
                    <span class="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                      CONFIRMED
                    </span>
                  </div>

                  <div class="pt-2 border-t border-[#252838] flex items-center justify-between text-xs text-[#d4d4d8]">
                    <span class="flex items-center gap-1 text-amber-300">
                      <i data-lucide="clock" class="h-3.5 w-3.5"></i>
                      ${res.date} at ${res.time}
                    </span>
                    <span>${res.guests} Guests • Table #${res.tableNumber || 10}</span>
                  </div>

                  <div class="flex items-center gap-2 pt-1">
                    <button onclick="showPassModal('${res.id}')" class="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-amber-400/20 border border-amber-400/40 py-2 text-xs font-bold text-amber-300 hover:bg-amber-400/30 transition-colors cursor-pointer">
                      <i data-lucide="qr-code" class="h-3.5 w-3.5"></i>
                      <span>View Digital Pass</span>
                    </button>
                    <button onclick="store.cancelReservation('${res.id}'); renderClientProfile();" class="rounded-xl border border-rose-500/30 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-300 hover:bg-rose-500/20 transition-colors cursor-pointer">
                      Cancel
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>

        <div class="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#181a26] to-[#10121a] p-6 shadow-xl space-y-3">
          <div class="flex items-center gap-2">
            <i data-lucide="crown" class="h-5 w-5 text-amber-300"></i>
            <h3 class="font-display text-base font-bold text-white">Private Desk Access</h3>
          </div>
          <p class="text-xs text-[#a1a1aa] leading-relaxed">
            Need table adjustments, private aviation tarmac transport, or customized decanting for an upcoming engagement?
          </p>
          <a href="concierge.html" class="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 py-3 text-xs font-bold text-black shadow hover:brightness-110 transition-all">
            <i data-lucide="phone-call" class="h-3.5 w-3.5"></i>
            <span>Open Dedicated Concierge Desk</span>
          </a>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}
