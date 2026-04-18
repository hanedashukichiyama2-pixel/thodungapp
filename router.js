// =============================================
// THỢ ĐỤNG APP - ROUTER
// =============================================

// All screen renderers registry
const SCREEN_RENDERERS = {
  'splash': renderSplash,
  'login': renderLogin,
  'otp': renderOTP,
  'register': renderRegister,
  'select-role': renderSelectRole,

  // Customer
  'customer-home': renderCustomerHome,
  'customer-booking': renderCustomerBooking,
  'customer-orders': renderCustomerOrders,
  'customer-chat': renderCustomerChat,
  'customer-profile': renderCustomerProfile,
  'customer-loyalty': renderCustomerLoyalty,
  'customer-vouchers': renderCustomerVouchers,
  'customer-notifications': renderCustomerNotifications,
  'customer-workers': renderWorkersList,

  // Booking flow
  'booking-form': renderBookingForm,
  'booking-confirm': renderBookingConfirm,

  // Order detail
  'order-detail': renderOrderDetail,

  // Chat messages
  'chat-messages': renderChatMessages,

  // Worker detail
  'worker-detail': renderWorkerDetail,

  // Worker
  'worker-home': renderWorkerHome,
  'worker-jobs': renderWorkerJobs,
  'worker-job-detail': renderWorkerJobDetail,
  'worker-earnings': renderWorkerEarnings,
  'worker-chat': function () {
    return window.renderWorkerChat();
  },
  'worker-profile': renderWorkerProfile,

  // Admin
  'admin-dashboard': function () { return window.renderAdminDashboard ? window.renderAdminDashboard() : '' },
  'admin-orders': function () { return window.renderAdminOrders ? window.renderAdminOrders() : '' },
  'admin-workers': function () { return window.renderAdminWorkers ? window.renderAdminWorkers() : '' },
  'admin-vouchers': function () { return window.renderAdminVouchers ? window.renderAdminVouchers() : '' },
  'admin-create-voucher': function () { return window.renderAdminCreateVoucher ? window.renderAdminCreateVoucher() : '' },
  'admin-banners': function () { return window.renderAdminBanners ? window.renderAdminBanners() : '' },
  'admin-settings': function () { return window.renderAdminSettings ? window.renderAdminSettings() : '' },
  'admin-account': function () { return window.renderAdminAccount ? window.renderAdminAccount() : '' },
};

// Show a screen by name
function showScreen(screenName) {
  const renderer = SCREEN_RENDERERS[screenName];
  if (!renderer) {
    console.warn(`Screen "${screenName}" not found.`);
    return;
  }

  // Push to history (avoid duplicates at top)
  if (AppState.screenHistory[AppState.screenHistory.length - 1] !== AppState.currentScreen) {
    AppState.screenHistory.push(AppState.currentScreen);
  }
  AppState.currentScreen = screenName;

  // Render
  const html = renderer();
  const container = document.getElementById('app');

  // Animate out + in
  container.style.opacity = '0';
  container.style.transform = 'translateX(12px)';

  requestAnimationFrame(() => {
    container.innerHTML = html;
    requestAnimationFrame(() => {
      container.style.opacity = '1';
      container.style.transform = 'translateX(0)';
    });
  });

  // Post-render hooks
  setTimeout(() => {
    afterScreenRender(screenName);
  }, 100);
}

// Go back in history
function goBack() {
  let prevScreen = AppState.screenHistory.pop();

  if (!prevScreen) {
    // No history - go to natural home
    if (AppState.currentRole === 'customer') prevScreen = 'customer-home';
    else if (AppState.currentRole === 'worker') prevScreen = 'worker-home';
    else if (AppState.currentRole === 'admin') prevScreen = 'admin-dashboard';
    else prevScreen = 'splash';
  }

  // Direct render (don't push to history again)
  const renderer = SCREEN_RENDERERS[prevScreen];
  if (renderer) {
    AppState.currentScreen = prevScreen;
    const container = document.getElementById('app');
    container.style.opacity = '0';
    container.style.transform = 'translateX(-12px)';

    requestAnimationFrame(() => {
      container.innerHTML = renderer();
      requestAnimationFrame(() => {
        container.style.opacity = '1';
        container.style.transform = 'translateX(0)';
      });
    });

    setTimeout(() => afterScreenRender(prevScreen), 100);
  }
}

// Post-render hooks
function afterScreenRender(screenName) {
  // Auto-start banner slider on home
  if (screenName === 'customer-home') {
    initBannerSlider();
  }

  // Auto-focus OTP input
  if (screenName === 'otp') {
    const firstInput = document.querySelector('.otp-input');
    if (firstInput) firstInput.focus();
  }

  // Scroll chat to bottom
  if (screenName === 'chat-messages') {
    const container = document.getElementById('messages-container');
    if (container) container.scrollTop = container.scrollHeight;
  }
}

// Banner slider logic
let bannerInterval;
function initBannerSlider() {
  const track = document.getElementById('banner-track');
  const dots = document.querySelectorAll('[data-dot]');
  if (!track) return;

  let currentSlide = 0;
  const totalSlides = MOCK_DATA.banners.length;

  clearInterval(bannerInterval);

  bannerInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;

    if (track) {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    dots.forEach((dot, i) => {
      dot.style.width = i === currentSlide ? '20px' : '6px';
      dot.style.background = i === currentSlide ? 'var(--primary)' : 'var(--border)';
    });
  }, 3000);
}

// Initialize app
async function initApp() {
  const container = document.getElementById('app');
  if (!container) {
    console.error('App container not found!');
    return;
  }

  container.style.transition = 'opacity 0.2s ease, transform 0.2s ease';

  // Show splash immediately
  showScreen('splash');

  // Load API data
  try {
    if (window.api) {
      const homeData = await api.data.getHome();
      if (homeData.categories) {
        MOCK_DATA.categories = homeData.categories.map(apiCat => {
          const mock = MOCK_DATA.categories.find(c => c.id === apiCat.id) || {};
          return { ...mock, ...apiCat };
        });
      }
      if (homeData.services) {
        MOCK_DATA.services = homeData.services.map(apiSvc => {
          const mock = MOCK_DATA.services.find(s => s.id === apiSvc.id) || {};
          const merged = { ...mock, ...apiSvc };
          if (typeof merged.category === 'object' && merged.category !== null) {
            merged.category = merged.category.id || apiSvc.categoryId || mock.category;
          }
          return merged;
        });
      }
      if (homeData.banners) {
        MOCK_DATA.banners = homeData.banners.map((b, i) => {
          const mock = MOCK_DATA.banners[i] || {};
          return { ...mock, ...b };
        });
      }
      if (homeData.vouchers) MOCK_DATA.vouchers = homeData.vouchers;

      const token = api.getToken();
      if (token) {
        const user = await api.user.getProfile();
        if (user) {
          AppState.isLoggedIn = true;
          AppState.currentRole = user.role.toLowerCase();
          if (user.role === 'CUSTOMER') MOCK_DATA.customer = user;
          else if (user.role === 'WORKER') MOCK_DATA.worker = user;
          else MOCK_DATA.admin = user;

          Object.assign(AppState[AppState.currentRole], { data: user });

          // Connect Socket
          const socketUrl = window.api.getSocketUrl ? window.api.getSocketUrl() : 'http://localhost:3000';
          window.socket = io(socketUrl);
          window.socket.emit('join', { role: user.role, userId: user.id });
        }
      }
    }
  } catch (e) {
    console.error('API Load Error:', e);
  }
}

// Start when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
