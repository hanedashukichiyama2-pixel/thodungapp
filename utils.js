// =============================================
// THỢ ĐỤNG APP - UTILITIES
// =============================================

// Show toast notification
function showToast(message, type = 'default', duration = 2500) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast ${type} show`;

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.className = 'toast';
  }, duration);
}

// Show/hide loading
function showLoading() {
  document.getElementById('loading-overlay').classList.remove('hidden');
}

function hideLoading() {
  document.getElementById('loading-overlay').classList.add('hidden');
}

// Simulate API delay
function delay(ms = 800) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Format number with commas
function formatNumber(n) {
  return Number(n).toLocaleString('vi-VN');
}

// Get current date info
function getCurrentDates() {
  const dates = [];
  const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push({
      day: i === 0 ? 'Hôm nay' : days[d.getDay()],
      date: d.getDate(),
      month: d.getMonth() + 1,
      full: d.toISOString().split('T')[0],
      isToday: i === 0,
    });
  }
  return dates;
}

// Generate random order timer countdown
function startJobTimer(seconds, onTick, onEnd) {
  let remaining = seconds;
  onTick(remaining);

  const interval = setInterval(() => {
    remaining--;
    onTick(remaining);
    if (remaining <= 0) {
      clearInterval(interval);
      onEnd && onEnd();
    }
  }, 1000);

  return interval;
}

// Format phone number display
function formatPhone(phone) {
  if (!phone) return '';
  return phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
}

// Scroll to top of element
function scrollToTop(el) {
  if (el) el.scrollTop = 0;
}

// Create star rating HTML
function renderStars(rating, max = 5) {
  let html = '';
  for (let i = 1; i <= max; i++) {
    if (i <= Math.floor(rating)) {
      html += '<i class="fas fa-star"></i>';
    } else if (i === Math.ceil(rating) && rating % 1 >= 0.5) {
      html += '<i class="fas fa-star-half-alt"></i>';
    } else {
      html += '<i class="far fa-star"></i>';
    }
  }
  return html;
}

// Debounce
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// Generate avatar initials
function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return parts[0][0].toUpperCase();
}

// Random color from preset
const avatarColors = [
  { bg: '#FFF3E8', color: 'var(--primary)' },
  { bg: '#E8F5E9', color: '#27AE60' },
  { bg: '#E3F2FD', color: '#3498DB' },
  { bg: '#F3E5F5', color: '#8B5CF6' },
  { bg: '#FFF3C4', color: '#F59E0B' },
];

function getAvatarColor(name) {
  const index = (name || '').charCodeAt(0) % avatarColors.length;
  return avatarColors[index];
}

// Check if element is in viewport
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= window.innerHeight;
}

// Create ripple effect on click
function addRipple(el) {
  el.addEventListener('click', function (e) {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      transform: scale(0);
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      animation: rippleEffect 0.5s ease;
    `;
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.appendChild(ripple);

    setTimeout(() => ripple.remove(), 500);
  });
}

// Image picker simulation
function simulateImagePick(callback) {
  const fakeImages = ['📷', '🖼️'];
  callback(fakeImages);
}

// Format time ago
function timeAgo(dateStr) {
  const now = new Date();
  const then = new Date(dateStr);
  const diff = Math.floor((now - then) / 1000);

  if (diff < 60) return 'vừa xong';
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  return `${Math.floor(diff / 86400)} ngày trước`;
}

// Extract realtime listeners into a shared global function
window.initSocketListeners = function () {
  if (!window.socket || window.socket._listenersBound) return;

  window.socket.on('new_job_request', (job) => {
    MOCK_DATA.jobRequests.unshift(job);
    if (AppState.currentRole === 'worker' && AppState.currentScreen.startsWith('worker')) {
      showScreen(AppState.currentScreen);
      showToast('Có đơn mới xung quanh bạn!', 'info');
    }
  });

  window.socket.on('job_accepted', (data) => {
    const ord = AppState.customer.orders.find(o => o.id === data.jobId);
    if (ord) {
      ord.status = 'confirmed';
      ord.worker = { name: 'Thợ Kỹ Thuật', id: data.workerId };
      // Refresh if looking at customer screens
      if (AppState.currentRole === 'customer') {
        showToast(`Thợ đã nhận đơn ${data.jobId} của bạn!`, 'success');
        if (AppState.currentScreen.startsWith('customer')) {
          showScreen(AppState.currentScreen);
        }
      }
    }
  });

  window.socket._listenersBound = true;
};
