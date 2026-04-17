// =============================================
// THỢ ĐỤNG APP - STATE MANAGEMENT
// =============================================

const AppState = {
  // Current user session
  currentRole: null, // 'customer' | 'worker' | 'admin'
  isLoggedIn: false,

  // Navigation history
  screenHistory: [],
  currentScreen: 'splash',

  // Customer state
  customer: {
    data: MOCK_DATA.customer,
    selectedService: null,
    booking: {
      service: null,
      category: null,
      worker: null,
      date: null,
      timeSlot: null,
      address: '123 Lê Lợi, Quận 1, TP.HCM',
      note: '',
      images: [],
      voucher: null,
      totalPrice: 0,
    },
    get orders() { return MOCK_DATA.orders; },
    activeTab: 'home',
    selectedOrderId: null,
    selectedConvId: null,
    selectedVoucher: null,
    selectedWorkerId: null,
    selectedCategoryId: null,
  },

  // Worker state
  worker: {
    data: MOCK_DATA.worker,
    isOnline: false,
    activeTab: 'home',
    pendingJob: null,
    selectedJobId: null,
    jobTimer: null,
    get currentJobs() { return MOCK_DATA.workerJobs; },
  },

  // Admin state
  admin: {
    data: MOCK_DATA.admin,
    activeTab: 'dashboard',
    selectedOrderId: null,
    selectedWorkerId: null,
    filterStatus: 'all',
  },

  // Auth state
  auth: {
    phone: '',
    step: 'phone', // 'phone' | 'otp' | 'name'
    otpValue: '',
    registerData: {},
  },
};

// Getters
function getState() { return AppState; }
function getCurrentRole() { return AppState.currentRole; }
function isLoggedIn() { return AppState.isLoggedIn; }
