// Central State Store for Stackly Luxury Platform

class StacklyStore {
  constructor() {
    this.listeners = new Set();
    
    // Auth User Initialization (Handles explicit logout persistence)
    const isLoggedOut = localStorage.getItem('stackly_logged_out') === 'true';
    const savedUser = localStorage.getItem('stackly_auth_user');
    const demoUsers = (typeof DEMO_USERS !== 'undefined' ? DEMO_USERS : (window.DEMO_USERS || {}));

    if (isLoggedOut) {
      this.currentUser = null;
    } else if (savedUser) {
      try {
        this.currentUser = JSON.parse(savedUser);
      } catch (e) {
        this.currentUser = demoUsers.client || null;
      }
    } else {
      this.currentUser = demoUsers.client || null;
    }

    // Reservations
    const savedRes = localStorage.getItem('stackly_reservations');
    const initRes = (typeof INITIAL_RESERVATIONS !== 'undefined' ? INITIAL_RESERVATIONS : (window.INITIAL_RESERVATIONS || []));
    this.reservations = savedRes ? JSON.parse(savedRes) : initRes;

    // Favorites
    const savedFav = localStorage.getItem('stackly_favorites');
    this.favorites = savedFav ? JSON.parse(savedFav) : ['rest-lumina-nyc', 'rest-omakase-shibata', 'rest-terrazza-amalfi'];

    // Table Statuses for Admin
    this.tableStatuses = {
      't1': 'seated',
      't2': 'reserved',
      't3': 'available',
      't4': 'seated',
      't5': 'vip_hold',
      't6': 'cleaning',
      't7': 'available',
      't8': 'seated',
      't9': 'reserved',
      't10': 'reserved'
    };

    // Toasts
    this.toasts = [];

    // Filter State
    this.filters = {
      searchQuery: '',
      city: 'All Global Destinations',
      cuisine: 'All Cuisines',
      michelinRating: 'all',
      priceRange: 'all',
      ambience: 'All Vibes',
      dietary: 'all',
      partySize: 2,
      date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      timePeriod: 'all',
      seatingType: 'all',
      sortBy: 'recommended'
    };

    // Modals
    this.activePassReservation = null;
    this.bookingModalRestaurant = null;
    this.bookingPreselectedSlot = null;
    this.isBookingModalOpen = false;
    this.isSearchModalOpen = false;
    this.isReviewModalOpen = false;
    this.reviewModalRestaurant = null;
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((listener) => listener(this));
  }

  // Persistence
  saveState() {
    if (this.currentUser) {
      localStorage.setItem('stackly_auth_user', JSON.stringify(this.currentUser));
      localStorage.removeItem('stackly_logged_out');
    } else {
      localStorage.removeItem('stackly_auth_user');
      localStorage.setItem('stackly_logged_out', 'true');
    }
    localStorage.setItem('stackly_reservations', JSON.stringify(this.reservations));
    localStorage.setItem('stackly_favorites', JSON.stringify(this.favorites));
  }

  // Auth Operations
  login(email, role = 'client', name) {
    const matchedRole = role || (email && email.toLowerCase().includes('admin') ? 'admin' : 'client');
    const demoUsers = (typeof DEMO_USERS !== 'undefined' ? DEMO_USERS : (window.DEMO_USERS || {}));
    const baseUser = demoUsers[matchedRole] || {
      id: 'user-' + Date.now(),
      name: name || 'VIP Gastronome',
      email: email || 'vip@stackly.com',
      role: matchedRole,
      roleTitle: matchedRole === 'admin' ? 'Operations Director' : 'VIP Gastronome',
      membershipTier: matchedRole === 'admin' ? 'Executive Maitre D' : 'Gold Connoisseur',
      avatar: 'assets/asset-14.webp'
    };

    this.currentUser = {
      ...baseUser,
      email: email || baseUser.email,
      name: name || baseUser.name,
      role: matchedRole
    };
    this.saveState();
    this.showToast(
      `Welcome back, ${this.currentUser.name.split(' ')[0]}`,
      matchedRole === 'admin' 
        ? 'Authenticated as Maître D’ & Operations Director.' 
        : 'VIP Gastronome credentials verified.',
      'gold'
    );
    this.notify();
    return true;
  }

  signup(data) {
    this.currentUser = {
      id: 'user-' + Date.now(),
      name: data.name,
      email: data.email,
      role: data.role,
      roleTitle: data.role === 'admin' ? 'Restaurant Manager' : 'VIP Gastronome Member',
      membershipTier: data.role === 'admin' ? 'Executive Maitre D' : 'Gold Connoisseur',
      dinerSince: '2026',
      loyaltyPoints: 1000,
      avatar: data.role === 'admin' 
        ? 'assets/asset-15.webp'
        : 'assets/asset-14.webp',
      phone: data.phone || '+1 (555) 000-0000',
      city: 'Global Member',
      dietaryNotes: data.dietaryNotes || 'No specific restrictions noted'
    };
    this.saveState();
    this.triggerCelebration();
    this.showToast(
      'Membership Created!',
      `Welcome to Stackly Reserve, ${this.currentUser.name}. Your VIP privileges are active.`,
      'gold'
    );
    this.notify();
    return true;
  }

  logout() {
    const name = this.currentUser ? this.currentUser.name : 'Member';
    this.currentUser = null;
    this.saveState();
    this.showToast('Signed Out', `Goodbye ${name}. Your session has been safely closed.`, 'info');
    this.notify();
  }

  switchRole(newRole) {
    const template = DEMO_USERS[newRole];
    this.currentUser = template;
    this.saveState();
    this.showToast(
      `Role Switched: ${newRole === 'admin' ? 'Maitre D’ / Operations' : 'VIP Gastronome'}`,
      `You are now viewing the platform as ${template.name} (${newRole.toUpperCase()}).`,
      'gold'
    );
    this.notify();
  }

  updateUserProfile(data) {
    if (!this.currentUser) return;
    this.currentUser = { ...this.currentUser, ...data };
    this.saveState();
    this.showToast('Profile Updated', 'Your VIP preferences and dining profile were updated.', 'gold');
    this.notify();
  }

  // Favorites
  toggleFavorite(restaurantId) {
    const exists = this.favorites.includes(restaurantId);
    this.favorites = exists
      ? this.favorites.filter((id) => id !== restaurantId)
      : [...this.favorites, restaurantId];
    this.saveState();
    this.showToast(
      exists ? 'Removed from Wishlist' : 'Saved to Hotlist',
      exists ? 'Restaurant removed from your curated favorites.' : 'Saved to your personal VIP dining hotlist.',
      'info'
    );
    this.notify();
  }

  isFavorite(restaurantId) {
    return this.favorites.includes(restaurantId);
  }

  // Reservations
  addReservation(data) {
    const code = `STACKLY-${Math.floor(1000 + Math.random() * 9000)}-${(data.restaurantCity || 'VIP').substring(0, 3).toUpperCase()}`;
    const newRes = {
      ...data,
      id: 'res-' + Date.now(),
      confirmationCode: code,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      qrCodeSeed: `${code}-CONFIRMED-SEAT`
    };
    this.reservations = [newRes, ...this.reservations];
    this.saveState();
    this.triggerCelebration();
    this.showToast(
      'Reservation Confirmed!',
      `Your table at ${newRes.restaurantName} for ${newRes.guests} guests is officially secured.`,
      'gold'
    );
    this.notify();
    return newRes;
  }

  cancelReservation(id) {
    this.reservations = this.reservations.map((r) => (r.id === id ? { ...r, status: 'cancelled' } : r));
    this.saveState();
    this.showToast('Reservation Cancelled', 'Your reservation was cancelled and your table was released.', 'info');
    this.notify();
  }

  updateReservationStatus(reservationId, status) {
    this.reservations = this.reservations.map((r) => (r.id === reservationId ? { ...r, status } : r));
    this.saveState();
    this.showToast('Status Updated', `Reservation ${reservationId} is now marked as ${status.toUpperCase()}.`, 'gold');
    this.notify();
  }

  // Table status admin ops
  setTableLiveStatus(tableId, status) {
    this.tableStatuses[tableId] = status;
    this.showToast('Table Status Updated', `Table ${tableId} status set to ${status.replace('_', ' ').toUpperCase()}`, 'info');
    this.notify();
  }

  // Modals
  openBookingModal(restaurant, preselected) {
    this.bookingModalRestaurant = restaurant;
    this.bookingPreselectedSlot = preselected;
    this.isBookingModalOpen = true;
    this.notify();
  }

  closeBookingModal() {
    this.isBookingModalOpen = false;
    this.bookingModalRestaurant = null;
    this.bookingPreselectedSlot = null;
    this.notify();
  }

  openDigitalPass(reservation) {
    this.activePassReservation = reservation;
    this.notify();
  }

  closeDigitalPass() {
    this.activePassReservation = null;
    this.notify();
  }

  openReviewModal(restaurant) {
    this.reviewModalRestaurant = restaurant;
    this.isReviewModalOpen = true;
    this.notify();
  }

  closeReviewModal() {
    this.isReviewModalOpen = false;
    this.reviewModalRestaurant = null;
    this.notify();
  }

  submitReview(restaurantId, reviewData) {
    const rest = RESTAURANTS_DATA.find((r) => r.id === restaurantId);
    if (rest) {
      const newReview = {
        id: 'rev-' + Date.now(),
        dinerName: reviewData.name || (this.currentUser ? this.currentUser.name : 'Verified Connoisseur'),
        dinerCity: reviewData.city || (this.currentUser ? this.currentUser.city : 'New York'),
        avatar: this.currentUser ? this.currentUser.avatar : 'assets/asset-29.webp',
        isVerifiedVIP: true,
        date: 'Today',
        rating: parseFloat(reviewData.rating) || 5.0,
        foodRating: parseFloat(reviewData.foodRating) || 5.0,
        serviceRating: parseFloat(reviewData.serviceRating) || 5.0,
        ambienceRating: parseFloat(reviewData.ambienceRating) || 5.0,
        wineRating: parseFloat(reviewData.wineRating) || 5.0,
        comment: reviewData.comment,
        experiencedDish: reviewData.experiencedDish || 'Chef Degustation'
      };
      rest.reviews.unshift(newReview);
      rest.reviewCount += 1;
      this.showToast('Review Published', 'Thank you for contributing your verified gastronomy review!', 'gold');
    }
    this.closeReviewModal();
  }

  // Toasts
  showToast(title, message, type = 'gold') {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    this.toasts.push({ id, title, message, type });
    this.notify();
    setTimeout(() => {
      this.removeToast(id);
    }, 4500);
  }

  removeToast(id) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }

  triggerCelebration() {
    if (typeof confetti === 'function') {
      try {
        confetti({
          particleCount: 90,
          spread: 75,
          origin: { y: 0.6 },
          colors: ['#E8C15A', '#B8860B', '#FFF', '#D4AF37']
        });
      } catch (e) {
        console.log('Confetti triggered');
      }
    }
  }
}

window.store = new StacklyStore();
