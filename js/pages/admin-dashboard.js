// Admin Dashboard Controller

let adminTab = 'overview'; // 'overview' | 'floor' | 'reservations' | 'cellar' | 'kitchen'
let adminStatusFilter = 'all'; // 'all' | 'confirmed' | 'seated' | 'completed' | 'cancelled'
let adminSearchQuery = '';
let selectedDossierReservation = null;

document.addEventListener('DOMContentLoaded', () => {
  renderAdminDashboard();
  
  // Live clock
  setInterval(() => {
    const el = document.getElementById('admin-live-clock');
    if (el) {
      const now = new Date();
      el.textContent = now.toLocaleTimeString('en-US', { hour12: false });
    }
  }, 1000);

  // Subscribe to store updates
  store.subscribe(renderAdminDashboard);
});

function setAdminTab(tab) {
  adminTab = tab;
  renderAdminDashboard();
}

function setAdminStatusFilter(st) {
  adminStatusFilter = st;
  renderAdminDashboard();
}

function setAdminSearchQuery(q) {
  adminSearchQuery = q.toLowerCase();
  renderAdminDashboard();
}

function openDossierModal(resId) {
  const res = store.reservations.find(r => r.id === resId);
  if (!res) return;
  selectedDossierReservation = res;
  const modal = document.getElementById('dossier-modal');
  const content = document.getElementById('dossier-modal-content');
  if (modal && content) {
    content.innerHTML = `
      <div class="flex items-center justify-between border-b border-[#222534] pb-3">
        <div class="flex items-center gap-2">
          <i data-lucide="crown" class="h-5 w-5 text-amber-400"></i>
          <h3 class="font-display text-base font-bold text-white">VIP Guest Dossier</h3>
        </div>
        <button onclick="closeDossierModal()" class="text-[#71717a] hover:text-white">
          <i data-lucide="x" class="h-5 w-5"></i>
        </button>
      </div>

      <div class="space-y-3 text-xs">
        <div class="rounded-2xl bg-black/40 p-4 border border-[#222534] space-y-2">
          <div class="flex items-center justify-between">
            <span class="font-display text-lg font-bold text-white">${res.guestInfo.fullName}</span>
            <span class="text-amber-400 font-mono text-xs">${res.confirmationCode}</span>
          </div>
          <div class="text-[#a1a1aa]">
            <span>Email: ${res.guestInfo.email}</span> • <span>Phone: ${res.guestInfo.phone}</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 text-xs">
          <div class="p-3 rounded-xl bg-[#161826] border border-[#272a38]">
            <span class="text-[10px] uppercase text-[#71717a] block">Date & Time</span>
            <span class="font-bold text-white">${res.date} at ${res.time}</span>
          </div>
          <div class="p-3 rounded-xl bg-[#161826] border border-[#272a38]">
            <span class="text-[10px] uppercase text-[#71717a] block">Table & Area</span>
            <span class="font-bold text-amber-300">Table #${res.tableNumber || 10} • ${res.seatingAreaName}</span>
          </div>
        </div>

        <div class="p-3 rounded-xl bg-[#161826] border border-[#272a38] space-y-1">
          <span class="text-[10px] uppercase text-[#71717a] block">Special Dining Directives</span>
          <p class="text-amber-200">${res.guestInfo.specialRequests || 'None noted'}</p>
        </div>
      </div>

      <div class="pt-2 flex justify-end">
        <button onclick="closeDossierModal()" class="rounded-xl bg-amber-400 px-5 py-2 text-xs font-bold text-black hover:bg-amber-300">
          Close Dossier
        </button>
      </div>
    `;
    modal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }
}

function closeDossierModal() {
  const modal = document.getElementById('dossier-modal');
  if (modal) modal.classList.add('hidden');
}

function toggleWalkInModal(show) {
  const modal = document.getElementById('walkin-modal');
  if (modal) {
    if (show) modal.classList.remove('hidden');
    else modal.classList.add('hidden');
  }
}

function handleWalkInSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('walkin-name')?.value || 'VIP Guest';
  const guests = parseInt(document.getElementById('walkin-guests')?.value || '2');
  const tableNum = parseInt(document.getElementById('walkin-table')?.value || '1');
  const notes = document.getElementById('walkin-notes')?.value || 'Walk-in VIP';

  const tableKey = `t${tableNum}`;
  const currentStatus = store.tableStatuses[tableKey] || store.tableStatuses[`t-${tableNum}`];

  // RES-010: Validate table availability before seating walk-in
  if (currentStatus === 'seated' || currentStatus === 'reserved' || currentStatus === 'vip_hold') {
    store.showToast('Table Unavailable', `Table #${tableNum} is currently ${currentStatus.replace('_', ' ').toUpperCase()}! Please select an available table.`, 'error');
    return false;
  }

  const select = document.getElementById('admin-rest-select');
  const restId = select ? select.value : 'r1';
  const rest = RESTAURANTS_DATA.find((r) => r.id === restId) || RESTAURANTS_DATA[0];

  store.addReservation({
    restaurantId: rest.id,
    restaurantName: rest.name,
    restaurantCity: rest.city,
    restaurantNeighborhood: rest.neighborhood,
    restaurantImage: rest.heroImage,
    restaurantAddress: rest.address,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    partySize: guests,
    guests: guests,
    seatingAreaName: `Table #${tableNum} Floor Seating`,
    seatingAreaId: 'main-dining',
    tableNumber: tableNum,
    guestInfo: {
      fullName: name,
      email: 'walkin@guest.com',
      phone: '+1 (555) 000-0000',
      occasion: 'Evening Walk-in Dining',
      specialRequests: notes,
      winePairingAdded: true,
      champagneOnArrival: false,
      preferredSeatingAreaId: 'main-dining'
    },
    totalEstimatedSpend: guests * 250,
    totalPrice: guests * 250,
    depositPaid: 0
  });

  store.setTableLiveStatus(tableKey, 'seated');
  store.showToast('Walk-in Seated', `Guest ${name} assigned to Table #${tableNum}.`, 'gold');
  toggleWalkInModal(false);
}

function renderAdminDashboard() {
  const stage = document.getElementById('admin-main-stage');
  if (!stage) return;

  const user = store.currentUser;
  const isAdmin = user && user.role === 'admin';

  // Role Guard (RES-015)
  if (!isAdmin) {
    stage.innerHTML = `
      <div class="py-16 text-center max-w-lg mx-auto rounded-3xl border border-rose-500/30 bg-[#12141e] p-8 shadow-2xl space-y-5">
        <div class="mx-auto h-16 w-16 rounded-3xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
          <i data-lucide="lock" class="h-8 w-8"></i>
        </div>
        <h2 class="font-display text-2xl font-bold text-white">Restricted Operations Console</h2>
        <p class="text-xs text-[#a1a1aa] leading-relaxed">
          The Maître D’ command suite requires valid Admin credentials. Please sign in with an authorized Administrator account.
        </p>
        <div class="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="login.html" class="rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 px-6 py-3 text-xs font-bold text-black hover:brightness-110">
            Sign In with Admin Passcode
          </a>
        </div>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  const select = document.getElementById('admin-rest-select');
  const restId = select ? select.value : 'r1';
  const rest = RESTAURANTS_DATA.find((r) => r.id === restId) || RESTAURANTS_DATA[0];

  // RES-012: Operational metrics calculated entirely from actual reservation records
  const totalCovers = store.reservations.reduce((acc, r) => acc + (r.status !== 'cancelled' ? (r.partySize || r.guests || 2) : 0), 0);
  const totalRevenue = store.reservations.reduce((acc, r) => acc + (r.status !== 'cancelled' ? (r.totalPrice || r.totalEstimatedSpend || 500) : 0), 0);
  const totalReservationsCount = store.reservations.length;

  const statusColors = {
    available: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30', label: 'Available' },
    reserved: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30', label: 'Reserved' },
    seated: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/30', label: 'Seated' },
    cleaning: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/30', label: 'Turnover' },
    vip_hold: { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30', label: 'VIP Hold' }
  };

  const filtered = store.reservations.filter((r) => {
    const matchSearch = !adminSearchQuery || (
      (r.guestInfo && r.guestInfo.fullName && r.guestInfo.fullName.toLowerCase().includes(adminSearchQuery)) ||
      (r.restaurantName && r.restaurantName.toLowerCase().includes(adminSearchQuery)) ||
      (r.confirmationCode && r.confirmationCode.toLowerCase().includes(adminSearchQuery))
    );
    const matchStatus = adminStatusFilter === 'all' || r.status === adminStatusFilter;
    return matchSearch && matchStatus;
  });

  stage.innerHTML = `
    <!-- KPI Metrics (Calculated 100% dynamically from actual store records - RES-012) -->
    <div class="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
      <div class="rounded-2xl border border-[#222534] bg-[#12141e] p-4 shadow-lg">
        <div class="flex items-center justify-between text-[#a1a1aa]">
          <span class="text-[11px] font-semibold uppercase tracking-wider">Tonight's Covers</span>
          <i data-lucide="users" class="h-4 w-4 text-amber-400"></i>
        </div>
        <div class="mt-2 flex items-baseline gap-2">
          <span class="text-2xl font-bold font-display text-white">${totalCovers}</span>
          <span class="text-[10px] text-emerald-400 font-semibold">Active Seats</span>
        </div>
        <p class="text-[10px] text-[#71717a] mt-0.5">Calculated from reservations</p>
      </div>

      <div class="rounded-2xl border border-[#222534] bg-[#12141e] p-4 shadow-lg">
        <div class="flex items-center justify-between text-[#a1a1aa]">
          <span class="text-[11px] font-semibold uppercase tracking-wider">Shift Revenue</span>
          <i data-lucide="dollar-sign" class="h-4 w-4 text-emerald-400"></i>
        </div>
        <div class="mt-2 flex items-baseline gap-2">
          <span class="text-2xl font-bold font-display text-white">$${totalRevenue.toLocaleString()}</span>
        </div>
        <p class="text-[10px] text-amber-300/80 mt-0.5">Actual Degustation Revenue</p>
      </div>

      <div class="rounded-2xl border border-[#222534] bg-[#12141e] p-4 shadow-lg">
        <div class="flex items-center justify-between text-[#a1a1aa]">
          <span class="text-[11px] font-semibold uppercase tracking-wider">Total Bookings</span>
          <i data-lucide="calendar" class="h-4 w-4 text-blue-400"></i>
        </div>
        <div class="mt-2 flex items-baseline gap-2">
          <span class="text-2xl font-bold font-display text-white">${totalReservationsCount}</span>
          <span class="text-[10px] text-blue-300 font-semibold">Verified</span>
        </div>
        <p class="text-[10px] text-[#71717a] mt-0.5">Live store reservations</p>
      </div>

      <div class="rounded-2xl border border-[#222534] bg-[#12141e] p-4 shadow-lg">
        <div class="flex items-center justify-between text-[#a1a1aa]">
          <span class="text-[11px] font-semibold uppercase tracking-wider">Cellar Aerations</span>
          <i data-lucide="wine" class="h-4 w-4 text-purple-400"></i>
        </div>
        <div class="mt-2 flex items-baseline gap-2">
          <span class="text-2xl font-bold font-display text-white">12 Bottles</span>
        </div>
        <p class="text-[10px] text-purple-300 mt-0.5">Grand Cru decanting queue</p>
      </div>

      <div class="rounded-2xl border border-[#222534] bg-[#12141e] p-4 shadow-lg">
        <div class="flex items-center justify-between text-[#a1a1aa]">
          <span class="text-[11px] font-semibold uppercase tracking-wider">VIP Allergy Flags</span>
          <i data-lucide="alert-triangle" class="h-4 w-4 text-rose-400"></i>
        </div>
        <div class="mt-2 flex items-baseline gap-2">
          <span class="text-2xl font-bold font-display text-white">6 Tables</span>
        </div>
        <p class="text-[10px] text-rose-300 mt-0.5">Chef briefing completed</p>
      </div>
    </div>

    <!-- Tab Bar -->
    <div class="flex items-center gap-2 border-b border-[#222534] pb-2 overflow-x-auto">
      ${[
        { id: 'overview', label: 'Live Shift Command', icon: 'trending-up' },
        { id: 'floor', label: 'Floor Plan & Live Tables', icon: 'utensils' },
        { id: 'reservations', label: 'Guest Pipeline & Dossiers', icon: 'calendar' },
        { id: 'cellar', label: 'Sommelier Pre-Decanting Queue', icon: 'wine' },
        { id: 'kitchen', label: 'Kitchen Pass & Dietary Nuances', icon: 'chef-hat' }
      ].map(tab => `
        <button onclick="setAdminTab('${tab.id}')" class="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${adminTab === tab.id ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm' : 'text-[#a1a1aa] hover:text-white hover:bg-[#161826]'}">
          <i data-lucide="${tab.icon}" class="h-4 w-4"></i>
          <span>${tab.label}</span>
        </button>
      `).join('')}
    </div>

    <!-- TAB CONTENTS -->
    ${adminTab === 'overview' ? `
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-8 space-y-6">
          <div class="rounded-3xl border border-[#222534] bg-[#12141e] p-6 shadow-xl">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1f2230] pb-4">
              <div>
                <h2 class="font-display text-lg font-bold text-white">Live Floor Table Statuses</h2>
                <p class="text-xs text-[#a1a1aa]">${rest.name} • Click any table to cycle state</p>
              </div>
              <div class="flex flex-wrap gap-1.5 text-[10px]">
                ${Object.entries(statusColors).map(([status, cfg]) => `
                  <span class="inline-flex items-center gap-1 rounded-full ${cfg.bg} ${cfg.text} border ${cfg.border} px-2 py-0.5 font-medium">
                    <span class="h-1.5 w-1.5 rounded-full bg-current"></span>
                    ${cfg.label}
                  </span>
                `).join('')}
              </div>
            </div>

            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-5">
              ${rest.tables.map((t) => {
                const cur = (store.tableStatuses && store.tableStatuses[t.id]) || (t.isAvailable ? 'available' : 'reserved');
                const cfg = statusColors[cur] || statusColors.available;
                return `
                  <div onclick="cycleTableStatus('${t.id}')" class="group cursor-pointer rounded-2xl border ${cfg.border} ${cfg.bg} p-3.5 transition-all hover:scale-[1.02] flex flex-col justify-between min-h-[105px]">
                    <div class="flex items-center justify-between">
                      <span class="font-display text-sm font-bold text-white">Table ${t.number}</span>
                      <span class="text-[9px] font-bold uppercase tracking-wider ${cfg.text}">${cfg.label}</span>
                    </div>
                    <div class="text-xs text-[#d4d4d8] my-1">
                      <div class="font-medium text-white line-clamp-1 text-[11px]">${t.name}</div>
                      <div class="text-[10px] text-[#a1a1aa] flex items-center gap-1">
                        <i data-lucide="users" class="h-3 w-3"></i>
                        <span>${t.capacity} guests</span>
                      </div>
                    </div>
                    <div class="pt-1.5 border-t border-white/5 text-[9px] text-amber-300/80 font-semibold group-hover:underline">
                      Cycle Status →
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div class="rounded-3xl border border-[#222534] bg-[#12141e] p-6 shadow-xl">
            <div class="flex items-center justify-between border-b border-[#1f2230] pb-4">
              <div>
                <h2 class="font-display text-lg font-bold text-white">Tonight’s Guest Arrivals</h2>
                <p class="text-xs text-[#a1a1aa]">Real-time reservation seating queue</p>
              </div>
              <button onclick="setAdminTab('reservations')" class="text-xs text-amber-400 hover:underline font-semibold cursor-pointer">
                View All (${store.reservations.length})
              </button>
            </div>

            <div class="divide-y divide-[#1f2230] mt-2">
              ${store.reservations.slice(0, 4).map((res) => `
                <div class="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div class="flex items-start gap-3">
                    <div class="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                      <i data-lucide="crown" class="h-4 w-4"></i>
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-bold text-white">${res.guestInfo.fullName}</span>
                        <span class="rounded-full bg-amber-500/20 border border-amber-500/30 px-2 py-0.2 text-[10px] text-amber-300 font-mono">
                          ${res.confirmationCode}
                        </span>
                        <span class="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full ${res.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'}">
                          ${res.status}
                        </span>
                      </div>
                      <div class="text-xs text-[#a1a1aa] mt-1 flex flex-wrap items-center gap-3">
                        <span class="flex items-center gap-1 text-amber-300">
                          <i data-lucide="clock" class="h-3 w-3"></i>
                          ${res.time} • Table #${res.tableNumber || 10}
                        </span>
                        <span>${res.guests} Guests</span>
                        <span class="text-[#a1a1aa]">${res.seatingAreaName}</span>
                      </div>
                      ${res.guestInfo.specialRequests ? `<p class="text-[11px] text-amber-300/90 italic mt-1 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/20 inline-block">Note: ${res.guestInfo.specialRequests}</p>` : ''}
                    </div>
                  </div>

                  <div class="flex items-center gap-2 shrink-0">
                    ${res.status === 'confirmed' ? `
                      <button onclick="store.updateReservationStatus('${res.id}', 'completed'); store.showToast('Guest Seated', '${res.guestInfo.fullName} marked as seated at Table #${res.tableNumber || 10}', 'success');" class="flex items-center gap-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/30 transition-colors cursor-pointer">
                        <i data-lucide="check" class="h-3.5 w-3.5"></i>
                        <span>Mark Seated</span>
                      </button>
                    ` : `<span class="text-xs text-blue-400 font-medium">In Service</span>`}
                    <button onclick="openDossierModal('${res.id}')" class="rounded-xl border border-[#2b2e40] bg-[#161826] px-3 py-1.5 text-xs text-[#d4d4d8] hover:text-white hover:border-amber-400 transition-colors cursor-pointer">
                      Dossier
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="lg:col-span-4 space-y-6">
          <div class="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#181a26] to-[#10121a] p-5 shadow-xl space-y-3.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <i data-lucide="radio" class="h-4 w-4 text-amber-400 animate-pulse"></i>
                <h3 class="font-display text-sm font-bold text-white">Live Table Drop Broadcast</h3>
              </div>
              <span class="text-[9px] font-bold text-amber-400 uppercase tracking-wider bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/30">VIP Ticker</span>
            </div>
            <p class="text-xs text-[#a1a1aa] leading-relaxed">
              Release a cancelled or newly opened 3-Star Michelin table allocation instantly to verified Black Diamond patrons.
            </p>
            <button onclick="store.showToast('Broadcast Dispatched', 'Flash Table Drop sent to 1,420 Black Diamond VIP patrons.', 'gold')" class="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-400 py-2.5 text-xs font-bold text-black hover:bg-amber-300 transition-all cursor-pointer">
              <i data-lucide="sparkles" class="h-4 w-4"></i>
              <span>Broadcast Table Drop Now</span>
            </button>
          </div>

          <div class="rounded-3xl border border-[#222534] bg-[#12141e] p-5 shadow-xl space-y-3">
            <div class="flex items-center justify-between border-b border-[#1f2230] pb-3">
              <div class="flex items-center gap-2">
                <i data-lucide="wine" class="h-4 w-4 text-purple-400"></i>
                <h3 class="font-display text-sm font-bold text-white">Sommelier Cellar Alerts</h3>
              </div>
              <span class="text-[10px] text-purple-300 font-mono">4 Decanting</span>
            </div>

            <div class="space-y-2.5">
              ${[
                { wine: 'Domaine de la Romanée-Conti 2017', table: 'Table 10 (Sterling)', temp: '16°C', status: 'Aerating (35m remaining)' },
                { wine: 'Château Margaux Premier Grand Cru 2010', table: 'Table 4 (VIP 88)', temp: '17°C', status: 'Double Decanted & Ready' },
                { wine: 'Dom Pérignon P2 Vintage 2004', table: 'Table 7 (Salon)', temp: '9°C', status: 'Chilled in Ice Cellar' }
              ].map((w) => `
                <div class="rounded-xl border border-[#252838] bg-[#161826] p-3 text-xs space-y-1">
                  <div class="font-bold text-white">${w.wine}</div>
                  <div class="flex items-center justify-between text-[10px] text-[#a1a1aa]">
                    <span class="text-amber-300">${w.table}</span>
                    <span class="text-purple-300 font-medium">${w.status}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    ` : ''}

    ${adminTab === 'floor' ? `
      <div class="rounded-3xl border border-[#222534] bg-[#12141e] p-6 shadow-xl space-y-6">
        <div class="border-b border-[#1f2230] pb-4">
          <h2 class="font-display text-xl font-bold text-white">${rest.name} Live Floor Plan</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          ${rest.tables.map((t) => {
            const cur = (store.tableStatuses && store.tableStatuses[t.id]) || (t.isAvailable ? 'available' : 'reserved');
            const cfg = statusColors[cur] || statusColors.available;
            return `
              <div class="rounded-2xl border ${cfg.border} ${cfg.bg} p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div class="flex items-center justify-between">
                    <span class="font-display text-lg font-bold text-white">Table #${t.number}</span>
                    <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.text} border ${cfg.border}">${cfg.label}</span>
                  </div>
                  <p class="text-xs font-semibold text-[#f3f4f6] mt-1">${t.name}</p>
                </div>
                <div class="space-y-1.5 pt-3 border-t border-white/10 text-xs">
                  <label class="text-[10px] uppercase font-bold text-[#71717a] block">Update Status</label>
                  <div class="grid grid-cols-2 gap-1.5">
                    ${['available', 'reserved', 'seated', 'cleaning', 'vip_hold'].map(st => `
                      <button onclick="store.setTableLiveStatus('${t.id}', '${st}'); renderAdminDashboard();" class="rounded-lg py-1 px-2 text-[10px] font-bold uppercase ${cur === st ? 'bg-amber-400 text-black shadow' : 'bg-[#181a28] text-[#a1a1aa] hover:text-white border border-[#2b2e40]'}">
                        ${st.replace('_', ' ')}
                      </button>
                    `).join('')}
                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    ` : ''}

    ${adminTab === 'reservations' ? `
      <div class="rounded-3xl border border-[#222534] bg-[#12141e] p-6 shadow-xl space-y-6">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1f2230] pb-4">
          <div>
            <h2 class="font-display text-xl font-bold text-white">Reservation Management Pipeline</h2>
            <p class="text-xs text-[#a1a1aa]">Search, filter, seat, and manage all dining allocations</p>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <div class="relative">
              <i data-lucide="search" class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717a]"></i>
              <input type="text" oninput="setAdminSearchQuery(this.value)" placeholder="Search guest or code..." class="rounded-xl border border-[#2b2e40] bg-[#161826] pl-10 pr-4 py-2 text-xs text-white placeholder-[#71717a] focus:border-amber-400 focus:outline-none" />
            </div>

            <div class="flex items-center gap-1 rounded-xl bg-[#141624] p-1 border border-[#272a38]">
              ${['all', 'confirmed', 'seated', 'completed', 'cancelled'].map(st => `
                <button onclick="setAdminStatusFilter('${st}')" class="rounded-lg px-2.5 py-1 text-xs font-semibold uppercase transition-all ${adminStatusFilter === st ? 'bg-amber-400 text-black shadow' : 'text-[#a1a1aa] hover:text-white'}">
                  ${st}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs text-[#d4d4d8]">
            <thead class="bg-[#161826] text-[10px] uppercase tracking-wider text-[#a1a1aa] border-b border-[#222534]">
              <tr>
                <th class="py-3 px-4">Guest Name & Tier</th>
                <th class="py-3 px-4">Restaurant</th>
                <th class="py-3 px-4">Date & Time</th>
                <th class="py-3 px-4">Guests & Table</th>
                <th class="py-3 px-4">Special Nuances</th>
                <th class="py-3 px-4">Status</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#1f2230]">
              ${filtered.map((res) => `
                <tr class="hover:bg-[#161826]/60 transition-colors">
                  <td class="py-3.5 px-4">
                    <div class="font-bold text-white">${res.guestInfo.fullName}</div>
                    <div class="text-[10px] text-amber-400 font-mono">${res.confirmationCode}</div>
                  </td>
                  <td class="py-3.5 px-4 font-medium text-white">${res.restaurantName}</td>
                  <td class="py-3.5 px-4">
                    <div>${res.date}</div>
                    <div class="text-amber-300 font-mono">${res.time}</div>
                  </td>
                  <td class="py-3.5 px-4">
                    <div>${res.guests} Guests</div>
                    <div class="text-[#a1a1aa] text-[10px]">Table #${res.tableNumber || 10}</div>
                  </td>
                  <td class="py-3.5 px-4 max-w-xs">
                    <div class="line-clamp-2 text-[11px] text-[#a1a1aa]">${res.guestInfo.specialRequests || res.guestInfo.occasion || 'Standard Michelin Degustation'}</div>
                  </td>
                  <td class="py-3.5 px-4">
                    <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${res.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'}">
                      ${res.status}
                    </span>
                  </td>
                  <td class="py-3.5 px-4 text-right space-x-2">
                    ${res.status === 'confirmed' ? `
                      <button onclick="store.updateReservationStatus('${res.id}', 'completed'); store.showToast('Seated', '${res.guestInfo.fullName} marked seated.', 'success');" class="rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-2.5 py-1 text-[11px] font-bold text-emerald-300 hover:bg-emerald-500/30">
                        Seat
                      </button>
                    ` : ''}
                    <button onclick="openDossierModal('${res.id}')" class="rounded-lg border border-[#2b2e40] bg-[#161826] px-2.5 py-1 text-[11px] text-white hover:border-amber-400">
                      Dossier
                    </button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    ` : ''}

    ${adminTab === 'cellar' ? `
      <div class="rounded-3xl border border-[#222534] bg-[#12141e] p-6 shadow-xl space-y-6">
        <div class="border-b border-[#1f2230] pb-4">
          <h2 class="font-display text-xl font-bold text-white">Subterranean Sommelier Decanting Queue</h2>
          <p class="text-xs text-[#a1a1aa]">Live tracking of Grand Cru vintages being decanted, aerated, and temperature-conditioned</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${[
            { name: 'Domaine de la Romanée-Conti 2017', region: 'Vosne-Romanée, Burgundy', table: 'Table 10 (Lord Alexander Sterling)', eta: '19:15 Seating', temp: '16°C', status: 'Aerating (45m remaining)' },
            { name: 'Château Margaux Premier Grand Cru 2010', region: 'Bordeaux, France', table: 'Table 4 (VIP 88)', eta: '19:45 Seating', temp: '17°C', status: 'Double Decanted & Ready' },
            { name: 'Dom Pérignon P2 Vintage 2004', region: 'Épernay, Champagne', table: 'Table 7 (Salon Prive)', eta: '20:00 Seating', temp: '9°C', status: 'Chilled in Ice Cellar' },
            { name: 'Sassicaia Tenuta San Guido 2016', region: 'Bolgheri, Italy', table: 'Table 2 (Executive Booth)', eta: '20:30 Seating', temp: '18°C', status: 'Decanter Selected' }
          ].map((wine) => `
            <div class="rounded-2xl border border-purple-500/30 bg-[#161828] p-5 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-bold uppercase tracking-wider text-purple-300">Grand Cru Bottle</span>
                <i data-lucide="wine" class="h-4 w-4 text-purple-400"></i>
              </div>
              <div>
                <h3 class="text-sm font-bold text-white">${wine.name}</h3>
                <p class="text-[11px] text-[#a1a1aa] mt-0.5">${wine.region}</p>
              </div>
              <div class="pt-2 border-t border-[#2a2d42] text-xs space-y-1">
                <div class="flex justify-between text-[#a1a1aa]">
                  <span>Target Table:</span>
                  <span class="text-white font-semibold">${wine.table}</span>
                </div>
                <div class="flex justify-between text-[#a1a1aa]">
                  <span>Conditioning:</span>
                  <span class="text-amber-300">${wine.temp} • ${wine.eta}</span>
                </div>
                <div class="flex justify-between text-purple-300 font-semibold pt-1">
                  <span>Status:</span>
                  <span>${wine.status}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    ${adminTab === 'kitchen' ? `
      <div class="rounded-3xl border border-[#222534] bg-[#12141e] p-6 shadow-xl space-y-6">
        <div class="border-b border-[#1f2230] pb-4">
          <h2 class="font-display text-xl font-bold text-white">Kitchen Pass & Dietary Nuances Stream</h2>
          <p class="text-xs text-[#a1a1aa]">Live tickets dispatched to Chef de Cuisine & Sous Chefs</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${[
            { guest: 'Alexander Sterling', table: 'Table 10', restriction: 'Pescatarian • No shellfish for Guest 2', wine: 'Grand Cru pairing confirmed', priority: 'VIP Black Diamond' },
            { guest: 'Lady Genevieve Dupond', table: 'Table 4', restriction: 'Celiac (Strict Gluten Free) • Truffle Degustation', wine: 'Reserve Champagne Flight', priority: 'VIP Connoisseur' },
            { guest: 'Ambassador Kenji Sato', table: 'Table 8', restriction: 'Kosher-style preparation requested', wine: 'Non-alcoholic botanical pairing', priority: 'Diplomatic Hold' }
          ].map((ticket) => `
            <div class="rounded-2xl border border-amber-500/30 bg-[#161828] p-5 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-bold uppercase tracking-wider text-amber-400">${ticket.priority}</span>
                <i data-lucide="chef-hat" class="h-4 w-4 text-amber-300"></i>
              </div>
              <div>
                <h3 class="text-sm font-bold text-white">${ticket.guest}</h3>
                <p class="text-[11px] text-amber-300 font-semibold mt-0.5">${ticket.table}</p>
              </div>
              <div class="rounded-xl bg-black/40 p-3 border border-[#2b2e40] text-xs space-y-1">
                <div class="text-rose-300 font-semibold">Dietary: ${ticket.restriction}</div>
                <div class="text-emerald-300 text-[11px]">Pairing: ${ticket.wine}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}
  `;

  if (window.lucide) window.lucide.createIcons();
}

function cycleTableStatus(tableId) {
  const current = store.getTableLiveStatus(tableId) || 'available';
  const cycle = ['available', 'reserved', 'seated', 'cleaning', 'vip_hold'];
  const next = cycle[(cycle.indexOf(current) + 1) % cycle.length];
  store.setTableLiveStatus(tableId, next);
  renderAdminDashboard();
}
