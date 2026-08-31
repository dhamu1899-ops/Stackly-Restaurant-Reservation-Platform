// Restaurant Detail Page Controller

let currentRest = RESTAURANTS_DATA[0];
let activeImgIndex = 0;
let selectedTableId = null;
let activeMenuTab = 0;
let partySize = 2;
let selectedTime = '19:15';

document.addEventListener('DOMContentLoaded', () => {
  renderNavbar('restaurants');
  renderFooter();

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (id) {
    const found = RESTAURANTS_DATA.find((r) => r.id === id);
    if (found) currentRest = found;
  }

  if (currentRest.timeSlots && currentRest.timeSlots.length) {
    selectedTime = currentRest.timeSlots[0].time;
  }

  renderDetailStage();
});

function toggleDetailFav() {
  store.toggleFavorite(currentRest.id);
  const isFav = store.isFavorite(currentRest.id);
  const btn = document.getElementById('detail-fav-btn');
  const label = document.getElementById('detail-fav-label');
  if (btn && label) {
    if (isFav) {
      btn.className = 'flex items-center gap-1.5 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-300 transition-colors cursor-pointer';
      label.textContent = 'Saved to Hotlist';
    } else {
      btn.className = 'flex items-center gap-1.5 rounded-xl border border-[#282a3a] bg-[#141622] px-3 py-1.5 text-xs font-medium text-[#a1a1aa] hover:text-white transition-colors cursor-pointer';
      label.textContent = 'Save';
    }
  }
}

function selectFloorTable(tableId) {
  selectedTableId = tableId;
  renderDetailStage();
}

function renderDetailStage() {
  const stage = document.getElementById('restaurant-detail-stage');
  if (!stage) return;

  const isFav = store.isFavorite(currentRest.id);
  const btn = document.getElementById('detail-fav-btn');
  const label = document.getElementById('detail-fav-label');
  if (btn && label) {
    if (isFav) {
      btn.className = 'flex items-center gap-1.5 rounded-xl border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-xs font-medium text-rose-300 transition-colors cursor-pointer';
      label.textContent = 'Saved to Hotlist';
    } else {
      btn.className = 'flex items-center gap-1.5 rounded-xl border border-[#282a3a] bg-[#141622] px-3 py-1.5 text-xs font-medium text-[#a1a1aa] hover:text-white transition-colors cursor-pointer';
      label.textContent = 'Save';
    }
  }

  stage.innerHTML = `
    <!-- HERO PHOTO GALLERY -->
    <div class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-3 h-[380px] sm:h-[480px]">
        <div class="lg:col-span-3 relative rounded-3xl overflow-hidden bg-[#161824] shadow-2xl">
          <img src="${currentRest.gallery[activeImgIndex] || currentRest.heroImage}" alt="${currentRest.name}" class="h-full w-full object-cover transition-all duration-500" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>

          <div class="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
            <div class="space-y-1.5">
              <div class="flex flex-wrap items-center gap-2">
                ${currentRest.michelinStars > 0 ? `
                  <div class="flex items-center gap-1 rounded-full bg-black/80 border border-amber-500/40 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-md">
                    <span class="text-amber-400">★ ${currentRest.michelinStars} Michelin Stars</span>
                  </div>
                ` : ''}
                ${currentRest.awards.slice(0, 2).map((aw) => `
                  <span class="rounded-full bg-amber-500/20 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-200 backdrop-blur-md">
                    ${aw}
                  </span>
                `).join('')}
              </div>

              <h1 class="font-display text-3xl sm:text-5xl font-bold text-white tracking-wide">
                ${currentRest.name}
              </h1>
              <p class="text-xs sm:text-sm text-[#d4d4d8] flex items-center gap-1.5">
                <i data-lucide="map-pin" class="h-4 w-4 text-amber-400 shrink-0"></i>
                ${currentRest.address}
              </p>
            </div>

            <div class="flex items-center gap-2 rounded-2xl bg-black/75 border border-white/10 px-4 py-2 text-white backdrop-blur-md">
              <i data-lucide="star" class="h-5 w-5 fill-amber-400 text-amber-400"></i>
              <div>
                <span class="text-base font-bold">${currentRest.rating}</span>
                <span class="text-xs text-[#8c8f9f] block">(${currentRest.reviewCount} Reviews)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="hidden lg:flex flex-col gap-3">
          ${currentRest.gallery.slice(0, 3).map((img, idx) => `
            <div onclick="activeImgIndex=${idx}; renderDetailStage();" class="relative flex-1 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all ${activeImgIndex === idx ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-transparent opacity-70 hover:opacity-100'}">
              <img src="${img}" alt="Thumbnail" class="h-full w-full object-cover" />
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <!-- MAIN CONTENT & STICKY BOOKING -->
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        <div class="lg:col-span-2 space-y-12">
          <!-- Overview -->
          <div class="rounded-3xl border border-[#222536] bg-[#12141e] p-6 sm:p-8 space-y-4">
            <div class="flex flex-wrap items-center gap-2">
              <span class="rounded-lg bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-300">
                ${currentRest.cuisine}
              </span>
              <span class="rounded-lg border border-[#2e3144] bg-[#181a27] px-3 py-1 text-xs text-[#a1a1aa]">
                ${currentRest.priceRange} (~$${currentRest.pricePerPerson} per guest)
              </span>
            </div>

            <p class="text-base text-[#d4d4d8] leading-relaxed font-light">
              ${currentRest.tagline}
            </p>

            <div class="pt-2 flex flex-wrap gap-2">
              ${currentRest.ambienceTags.map((tag) => `
                <span class="rounded-full border border-[#292c3d] bg-[#161824] px-3 py-1 text-xs text-[#a1a1aa]">
                  ✨ ${tag}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Interactive Floorplan Stage (Matching InteractiveFloorPlan.tsx 100%) -->
          <div class="rounded-3xl border border-[#272a39] bg-[#0f1118] p-6 sm:p-8 space-y-4">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#1f2230]">
              <div>
                <div class="flex items-center gap-2">
                  <span class="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <h4 class="font-display text-xl font-bold text-white tracking-wide">
                    Interactive Table Floor Plan
                  </h4>
                </div>
                <p class="text-xs text-[#8c8f9f] mt-0.5">
                  Select your preferred dining position, view angle, and private alcove.
                </p>
              </div>

              <!-- Legend -->
              <div class="flex flex-wrap items-center gap-3 text-xs">
                <div class="flex items-center gap-1.5">
                  <div class="h-3.5 w-3.5 rounded-full border border-amber-400 bg-amber-500/20 shadow-[0_0_8px_rgba(232,193,90,0.4)]"></div>
                  <span class="text-[#d4d4d8]">Available</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <div class="h-3.5 w-3.5 rounded-full border border-amber-300 bg-amber-400 text-black flex items-center justify-center text-[9px] font-bold">✓</div>
                  <span class="text-amber-300 font-semibold">Selected</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <div class="h-3.5 w-3.5 rounded-full border border-[#3f4356] bg-[#202330]"></div>
                  <span class="text-[#71717a]">Reserved</span>
                </div>
              </div>
            </div>

            <!-- Blueprint Canvas Stage -->
            <div class="relative mt-5 h-[340px] sm:h-[400px] w-full overflow-hidden rounded-xl border border-[#222536] bg-gradient-to-b from-[#141622] via-[#0d0e15] to-[#0a0b10] shadow-inner p-4">
              <!-- Blueprint Grid -->
              <div class="absolute inset-0 opacity-15 pointer-events-none" style="background-image: radial-gradient(#d4af37 1px, transparent 1px); background-size: 24px 24px;"></div>

              <!-- Section Labels Overlay -->
              <div class="absolute top-4 left-6 pointer-events-none">
                <span class="text-[10px] font-mono uppercase tracking-widest text-amber-400/60 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/20">
                  Open Kitchen & Chef Pass
                </span>
              </div>
              <div class="absolute top-4 right-6 pointer-events-none">
                <span class="text-[10px] font-mono uppercase tracking-widest text-sky-400/60 bg-sky-500/5 px-2 py-0.5 rounded border border-sky-500/20">
                  Panoramic Skyline Windows
                </span>
              </div>
              <div class="absolute bottom-4 left-6 pointer-events-none">
                <span class="text-[10px] font-mono uppercase tracking-widest text-purple-400/60 bg-purple-500/5 px-2 py-0.5 rounded border border-purple-500/20">
                  Sommelier Wine Vault
                </span>
              </div>
              <div class="absolute bottom-4 right-6 pointer-events-none">
                <span class="text-[10px] font-mono uppercase tracking-widest text-zinc-400/60 bg-zinc-500/5 px-2 py-0.5 rounded border border-zinc-500/20">
                  Main Crystal Salon
                </span>
              </div>

              <!-- Visual Lines -->
              <div class="absolute top-[28%] left-[16%] w-[35%] h-[4px] bg-amber-500/30 rounded-full blur-[0.5px]"></div>
              <div class="absolute top-[15%] right-[10%] w-[3px] h-[65%] bg-sky-500/30 rounded-full blur-[0.5px]"></div>

              <!-- Tables Pins -->
              ${currentRest.tables.map((table) => {
                const isSelected = selectedTableId === table.id;
                const isAvail = table.isAvailable;
                let shapeClasses = 'rounded-full';
                if (table.shape === 'rect') shapeClasses = 'rounded-lg';
                if (table.shape === 'booth') shapeClasses = 'rounded-xl';
                if (table.shape === 'counter') shapeClasses = 'rounded-md';

                return `
                  <button
                    ${!isAvail ? 'disabled' : ''}
                    onclick="selectFloorTable('${table.id}')"
                    style="left: ${table.xPercent}%; top: ${table.yPercent}%; transform: translate(-50%, -50%);"
                    class="absolute transition-all duration-300 flex items-center justify-center cursor-pointer ${shapeClasses} ${
                      isSelected
                        ? 'h-13 w-13 bg-amber-400 text-black ring-4 ring-amber-400/40 font-bold z-20 scale-110 shadow-[0_0_20px_rgba(232,193,90,0.8)]'
                        : isAvail
                        ? 'h-11 w-11 bg-[#1a1d29] text-amber-300 border-2 border-amber-400/60 hover:border-amber-300 hover:bg-amber-500/20 hover:scale-110 hover:shadow-[0_0_15px_rgba(232,193,90,0.5)] z-10'
                        : 'h-10 w-10 bg-[#161822] text-[#4f5367] border border-[#2b2e3e] opacity-60 cursor-not-allowed'
                    }"
                  >
                    <div class="flex flex-col items-center justify-center leading-none">
                      <span class="text-xs font-bold">${isSelected ? '✓' : `T${table.number}`}</span>
                      <span class="text-[9px] opacity-75 font-mono mt-0.5">${table.capacity}p</span>
                    </div>
                  </button>
                `;
              }).join('')}
            </div>

            <!-- Bottom Selected Summary Banner -->
            <div class="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-[#272b3c] bg-[#141622] p-3.5">
              <div class="flex items-center gap-3">
                <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-300">
                  <i data-lucide="sparkles" class="h-4 w-4"></i>
                </div>
                <div>
                  <span class="text-xs text-[#8c8f9f] block">Selected Table Status</span>
                  <span class="text-sm font-semibold text-white">
                    ${selectedTableId
                      ? `Table #${currentRest.tables.find(t => t.id === selectedTableId)?.number} (${currentRest.tables.find(t => t.id === selectedTableId)?.name})`
                      : 'Auto-Assign Best Available Table in Zone'}
                  </span>
                </div>
              </div>

              ${selectedTableId ? `
                <button onclick="selectedTableId=null; renderDetailStage();" class="text-xs text-[#8c8f9f] hover:text-amber-300 underline cursor-pointer">
                  Reset to Auto-Assign
                </button>
              ` : ''}
            </div>
          </div>

          <!-- Menus -->
          <div class="rounded-3xl border border-[#222536] bg-[#12141e] p-6 sm:p-8 space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#202334]">
              <div>
                <span class="text-xs uppercase font-mono tracking-widest text-amber-400 font-semibold">HAUTE CUISINE REPERTOIRE</span>
                <h3 class="font-display text-2xl font-bold text-white mt-0.5">Seasonal Tasting Menus & Pairings</h3>
              </div>

              <div class="flex rounded-xl border border-[#272a3b] bg-[#0e1017] p-1 text-xs">
                ${currentRest.menus.map((m, idx) => `
                  <button onclick="activeMenuTab=${idx}; renderDetailStage();" class="rounded-lg px-3 py-1.5 font-medium transition-all ${activeMenuTab === idx ? 'bg-amber-400 text-black font-bold shadow-md' : 'text-[#8c8f9f] hover:text-white'}">
                    ${m.category.split(' ')[0]} Menu
                  </button>
                `).join('')}
              </div>
            </div>

            ${currentRest.menus[activeMenuTab] ? `
              <div class="space-y-4">
                ${currentRest.menus[activeMenuTab].items.map((dish) => `
                  <div class="rounded-2xl border border-[#242738] bg-[#151824] p-4 space-y-1.5">
                    <div class="flex items-center justify-between">
                      <h4 class="font-display text-base font-bold text-white">${dish.name}</h4>
                      ${dish.isSignature ? `<span class="rounded-full bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 text-[9px] font-bold text-amber-300">Signature Masterpiece</span>` : ''}
                    </div>
                    <p class="text-xs text-[#8c8f9f]">${dish.description}</p>
                    ${dish.pairingWine ? `<div class="pt-2 border-t border-[#222533] text-xs text-purple-300 flex items-center gap-1.5"><i data-lucide="wine" class="h-3.5 w-3.5 text-purple-400"></i><span>Sommelier Pairing: ${dish.pairingWine}</span></div>` : ''}
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>

          <!-- Chef Spotlight -->
          <div class="rounded-3xl border border-amber-500/30 bg-gradient-to-br from-[#161826] via-[#12141c] to-[#0c0d14] p-6 sm:p-8">
            <div class="flex flex-col sm:flex-row gap-6 items-start">
              <img src="${currentRest.chef.photo}" alt="${currentRest.chef.name}" class="h-28 w-28 rounded-2xl object-cover border-2 border-amber-400/50 shadow-xl shrink-0" />
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <i data-lucide="chef-hat" class="h-5 w-5 text-amber-400"></i>
                  <span class="text-xs uppercase font-mono tracking-widest text-amber-400">CRAFT MASTERY</span>
                </div>
                <h3 class="font-display text-2xl font-bold text-white">${currentRest.chef.name}</h3>
                <p class="text-xs text-amber-200/90 font-medium">${currentRest.chef.role}</p>
                <p class="text-xs text-[#8c8f9f] leading-relaxed">${currentRest.chef.bio}</p>
                <div class="pt-2 flex flex-wrap gap-2 text-xs text-[#d4d4d8]">
                  <span class="font-semibold text-amber-300">Signature Dish:</span>
                  <span>${currentRest.chef.signatureDish || 'Chef\'s Seasonal Degustation'}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Verified Connoisseur Reviews -->
          <div class="rounded-3xl border border-[#222536] bg-[#12141c] p-6 sm:p-8 space-y-6">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#202334]">
              <div>
                <h3 class="font-display text-2xl font-bold text-white">Verified Connoisseur Reviews</h3>
                <p class="text-xs text-[#8c8f9f]">Reflections from patrons who have experienced this dining room.</p>
              </div>
              <button onclick="store.openReviewModal(currentRest)" class="flex items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-300 hover:bg-amber-500 hover:text-black transition-all cursor-pointer">
                <i data-lucide="message-square-plus" class="h-4 w-4"></i>
                <span>Write a Review</span>
              </button>
            </div>
            <div class="space-y-4">
              ${currentRest.reviews.map((rev) => `
                <div class="rounded-2xl border border-[#242738] bg-[#151824] p-5 space-y-3">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <img src="${rev.avatar}" alt="${rev.dinerName}" class="h-10 w-10 rounded-full object-cover border border-amber-500/40" />
                      <div>
                        <div class="flex items-center gap-1.5">
                          <h5 class="font-bold text-sm text-white">${rev.dinerName}</h5>
                          ${rev.isVerifiedVIP ? `<span class="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 text-[9px] font-bold">Verified VIP</span>` : ''}
                        </div>
                        <span class="text-[11px] text-[#71717a]">${rev.dinerCity} • ${rev.date}</span>
                      </div>
                    </div>
                    <div class="flex text-amber-400">
                      ${Array.from({length: 5}).map(() => `<i data-lucide="star" class="h-3.5 w-3.5 fill-amber-400 text-amber-400"></i>`).join('')}
                    </div>
                  </div>
                  <p class="text-xs text-[#d4d4d8] leading-relaxed italic">"${rev.comment}"</p>
                  ${rev.experiencedDish ? `<span class="inline-block text-[11px] text-amber-300 font-medium">✨ Experienced: ${rev.experiencedDish}</span>` : ''}
                </div>
              `).join('')}
            </div>
          </div>

        </div>

        <!-- STICKY BOOKING SIDEBAR -->
        <div class="lg:col-span-1">
          <div class="sticky top-[120px] rounded-3xl border border-amber-500/40 bg-[#12141e]/95 p-6 shadow-2xl backdrop-blur-2xl space-y-6">
            <div class="border-b border-[#242738] pb-4">
              <div class="flex items-center justify-between">
                <span class="text-xs font-mono uppercase tracking-widest text-amber-300 font-semibold">RESERVE YOUR SEAT</span>
                <span class="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                  <i data-lucide="shield-check" class="h-3.5 w-3.5"></i> Instant Confirmation
                </span>
              </div>
              <div class="mt-2 flex items-baseline justify-between">
                <span class="font-display text-2xl font-bold text-white">$${currentRest.pricePerPerson}</span>
                <span class="text-xs text-[#8c8f9f]">per person (Degustation)</span>
              </div>
            </div>

            <div class="space-y-4">
              <div>
                <label class="block text-xs font-semibold uppercase text-[#a1a1aa] mb-1.5">Guests</label>
                <div class="grid grid-cols-4 gap-1.5">
                  ${[1, 2, 4, 6].map((num) => `
                    <button onclick="partySize=${num}; renderDetailStage();" class="rounded-xl py-2 text-xs font-semibold transition-all ${partySize === num ? 'bg-amber-400 text-black font-bold' : 'border border-[#2a2d3e] bg-[#161824] text-[#d4d4d8]'}">
                      ${num} ${num === 1 ? 'Guest' : 'Guests'}
                    </button>
                  `).join('')}
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold uppercase text-[#a1a1aa] mb-1.5">Date</label>
                <input type="date" id="detail-date-picker" value="2026-09-02" class="w-full rounded-xl border border-[#2a2d3e] bg-[#161824] px-4 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none cursor-pointer" />
              </div>

              <div>
                <label class="block text-xs font-semibold uppercase text-[#a1a1aa] mb-1.5">Seating Time</label>
                <div class="grid grid-cols-2 gap-1.5">
                  ${currentRest.timeSlots.map((slot) => `
                    <button
                      ${!slot.available ? 'disabled' : ''}
                      onclick="selectedTime='${slot.time}'; renderDetailStage();"
                      class="rounded-xl p-2.5 text-left text-xs transition-all ${
                        !slot.available
                          ? 'opacity-40 border border-[#222432] bg-[#101118] cursor-not-allowed'
                          : selectedTime === slot.time
                          ? 'border-2 border-amber-400 bg-amber-500/20 text-white font-bold'
                          : 'border border-[#2a2d3e] bg-[#161824] text-[#d4d4d8] hover:border-amber-500/40'
                      }"
                    >
                      <div class="font-mono font-bold">${slot.time}</div>
                      <span class="text-[10px] text-[#8c8f9f] block">${slot.meal}</span>
                    </button>
                  `).join('')}
                </div>
              </div>

              <!-- Seating Zone Summary -->
              <div class="rounded-xl border border-[#262838] bg-[#161826] p-3.5 text-xs space-y-1">
                <div class="flex justify-between text-[#8c8f9f]">
                  <span>Seating Zone:</span>
                  <span class="font-semibold text-amber-300">${currentRest.seatingAreas[0]?.name || 'Main Dining Salon'}</span>
                </div>
                <div class="flex justify-between text-[#8c8f9f]">
                  <span>Table Selection:</span>
                  <span class="font-semibold text-white">
                    ${selectedTableId
                      ? `Table #${currentRest.tables.find(t => t.id === selectedTableId)?.number || 'N/A'}`
                      : 'Auto-Optimized'}
                  </span>
                </div>
              </div>

              <button onclick="store.openBookingModal(currentRest, { time: selectedTime, date: document.getElementById('detail-date-picker')?.value || '2026-09-02' });" class="w-full rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 py-4 text-sm font-bold text-black shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:brightness-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2">
                <i data-lucide="sparkles" class="h-4 w-4"></i>
                <span>Reserve Table &amp; Get Pass</span>
              </button>
            </div>

            <!-- Practical Details -->
            <div class="border-t border-[#222534] pt-4 space-y-2 text-xs text-[#8c8f9f]">
              <div class="flex items-start gap-2">
                <i data-lucide="info" class="h-4 w-4 text-amber-400 shrink-0 mt-0.5"></i>
                <span><strong>Dress Code:</strong> Smart Elegant Attire</span>
              </div>
              <div class="flex items-start gap-2">
                <i data-lucide="shield-check" class="h-4 w-4 text-emerald-400 shrink-0 mt-0.5"></i>
                <span><strong>Cancellation:</strong> Free up to 24 hours</span>
              </div>
              <div class="flex items-start gap-2">
                <i data-lucide="phone" class="h-4 w-4 text-amber-400 shrink-0 mt-0.5"></i>
                <span><strong>Maître d' Direct:</strong> +1 (212) 555-0199</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `;

  if (window.lucide) window.lucide.createIcons();
}
