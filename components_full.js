// =============================================
// THỢ ĐỤNG APP - REUSABLE COMPONENTS
// =============================================

// Build App Header
function buildHeader({ title = '', showBack = true, showRight = false, rightIcon = 'fa-ellipsis-v', rightAction = null, style = 'orange', transparent = false }) {
  const headerClass = transparent ? 'app-header transparent' 
    : style === 'white' ? 'app-header white' 
    : 'app-header orange';
  
  const textColor = (style === 'white' && !transparent) ? 'var(--text-primary)' : 'white';
  const btnBg = (style === 'white' && !transparent) ? 'var(--bg-secondary)' : 'rgba(255,255,255,0.2)';

  return `
    <div class="${headerClass}" style="position: sticky; top: 0; z-index: 100;">
      ${showBack ? `<button class="back-btn" onclick="goBack()" style="background:${btnBg}; color:${textColor}; flex-shrink:0; width:36px; height:36px; border-radius:50%; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:16px;">
        <i class="fas fa-chevron-left"></i>
      </button>` : `<div style="width:36px"></div>`}
      <h1 class="header-title" style="flex:1; text-align:center; font-size:16px; font-weight:700; color:${textColor}; margin:0;">${title}</h1>
      ${showRight ? `<button onclick="${rightAction || 'void(0)'}" style="background:${btnBg}; color:${textColor}; width:36px; height:36px; border-radius:50%; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:16px; flex-shrink:0;">
        <i class="fas ${rightIcon}"></i>
      </button>` : `<div style="width:36px"></div>`}
    </div>
  `;
}

// Build Bottom Nav for Customer
function buildCustomerNav(activeTab) {
  const tabs = [
    { id: 'home', icon: 'fa-home', label: 'Trang chủ' },
    { id: 'booking', icon: 'fa-calendar-check', label: 'Đặt dịch vụ' },
    { id: 'orders', icon: 'fa-receipt', label: 'Đơn hàng' },
    { id: 'chat', icon: 'fa-comment-dots', label: 'Tin nhắn' },
    { id: 'profile', icon: 'fa-user', label: 'Tài khoản' },
  ];
  
  return `
    <nav class="bottom-nav">
      ${tabs.map(t => `
        <button class="nav-item ${t.id === activeTab ? 'active' : ''}" onclick="navigateCustomer('${t.id}')">
          <i class="nav-icon fas ${t.icon}"></i>
          <span class="nav-label">${t.label}</span>
        </button>
      `).join('')}
    </nav>
  `;
}

// Build Bottom Nav for Worker
function buildWorkerNav(activeTab) {
  const tabs = [
    { id: 'home', icon: 'fa-home', label: 'Trang chủ' },
    { id: 'jobs', icon: 'fa-list-check', label: 'Công việc' },
    { id: 'earnings', icon: 'fa-wallet', label: 'Thu nhập' },
    { id: 'chat', icon: 'fa-comment-dots', label: 'Tin nhắn' },
    { id: 'profile', icon: 'fa-user', label: 'Tài khoản' },
  ];
  
  return `
    <nav class="bottom-nav">
      ${tabs.map(t => `
        <button class="nav-item ${t.id === activeTab ? 'active' : ''}" onclick="navigateWorker('${t.id}')">
          <i class="nav-icon fas ${t.icon}"></i>
          <span class="nav-label">${t.label}</span>
        </button>
      `).join('')}
    </nav>
  `;
}

// Build Bottom Nav for Admin
function buildAdminNav(activeTab) {
  const tabs = [
    { id: 'dashboard', icon: 'fa-chart-line', label: 'Dashboard' },
    { id: 'orders', icon: 'fa-receipt', label: 'Đơn hàng' },
    { id: 'workers', icon: 'fa-users', label: 'Thợ' },
    { id: 'settings', icon: 'fa-cog', label: 'Cài đặt' },
    { id: 'account', icon: 'fa-user-shield', label: 'Admin' },
  ];
  
  return `
    <nav class="bottom-nav">
      ${tabs.map(t => `
        <button class="nav-item ${t.id === activeTab ? 'active' : ''}" onclick="navigateAdmin('${t.id}')">
          <i class="nav-icon fas ${t.icon}"></i>
          <span class="nav-label">${t.label}</span>
        </button>
      `).join('')}
    </nav>
  `;
}

// Build order status badge
function buildStatusBadge(status) {
  const labels = {
    'pending': ['Chờ xác nhận', 'pending'],
    'confirmed': ['Đã xác nhận', 'confirmed'],
    'in-progress': ['Đang thực hiện', 'in-progress'],
    'going': ['Thợ đang đến', 'in-progress'],
    'completed': ['Hoàn thành', 'completed'],
    'cancelled': ['Đã hủy', 'cancelled'],
  };
  const [label, cls] = labels[status] || [status, 'pending'];
  return `<span class="order-status ${cls}">${label}</span>`;
}

// Build worker avatar element
function buildWorkerAvatar(worker, size = 60) {
  const color = getAvatarColor(worker.name || worker.initial);
  return `
    <div class="worker-avatar" style="width:${size}px; height:${size}px; background:${color.bg}; color:${color.color}; border:2px solid ${color.bg};">
      ${worker.initial || getInitials(worker.name)}
    </div>
  `;
}

// Build service icon container
function buildCategoryIcon(cat) {
  return `
    <div class="category-icon" style="background:${cat.color};">
      <span style="font-size:26px;">${cat.icon}</span>
    </div>
  `;
}

// Build banner slide
function buildBannerSlide(banner, idx) {
  return `
    <div class="banner-slide" style="min-width:100%; cursor:pointer;" onclick="navigateCustomer('booking')">
      <div style="width:100%; height:160px; background:${banner.gradient}; border-radius:var(--radius-lg); position:relative; overflow:hidden;">
        <div style="position:absolute; top:-30px; right:-30px; width:160px; height:160px; background:rgba(255,255,255,0.08); border-radius:50%;"></div>
        <div style="position:absolute; bottom:-40px; right:20px; width:120px; height:120px; background:rgba(255,255,255,0.06); border-radius:50%;"></div>
        <div style="position:absolute; inset:0; padding:20px; display:flex; flex-direction:column; justify-content:center;">
          <span style="display:inline-block; background:rgba(255,255,255,0.25); color:white; font-size:10px; font-weight:700; padding:3px 8px; border-radius:4px; margin-bottom:8px; width:fit-content; text-transform:uppercase; letter-spacing:0.5px;">${banner.tag}</span>
          <h3 style="font-size:20px; font-weight:800; color:white; line-height:1.3; margin-bottom:4px; white-space:pre-line;">${banner.title}</h3>
          <p style="font-size:12px; color:rgba(255,255,255,0.85);">${banner.desc}</p>
        </div>
      </div>
    </div>
  `;
}

// Build voucher card
function buildVoucherCard(voucher) {
  const isExpired = voucher.status === 'expired';
  const usedPct = Math.round((voucher.used / voucher.limit) * 100);
  
  return `
    <div class="voucher-card ${isExpired ? 'opacity-50' : ''}" style="${isExpired ? 'opacity:0.55' : ''}">
      <div class="voucher-left">
        <div class="voucher-icon"><i class="fas fa-tag"></i></div>
        <div class="voucher-discount">${voucher.discount}</div>
        <div style="position:absolute; right:-12px; top:50%; transform:translateY(-50%); width:24px; height:24px; border-radius:50%; background:var(--bg-secondary); z-index:2;"></div>
      </div>
      <div class="voucher-right">
        <div class="voucher-code">${voucher.code}</div>
        <div class="voucher-name">${voucher.name}</div>
        <div class="voucher-meta">
          <span class="voucher-expiry"><i class="far fa-calendar"></i> HSD: ${voucher.expiry}</span>
          ${!isExpired ? `<button class="btn-use-voucher" onclick="applyVoucher('${voucher.code}')">Dùng ngay</button>` : `<span style="font-size:11px; color:var(--danger); font-weight:600;">Hết hạn</span>`}
        </div>
        <div class="voucher-progress">
          <div class="voucher-progress-bar" style="width:${usedPct}%"></div>
        </div>
        <div style="font-size:10px; color:var(--text-tertiary); margin-top:2px;">Đã dùng: ${voucher.used}/${voucher.limit}</div>
      </div>
    </div>
  `;
}

// Build order card
function buildOrderCard(order, clickFn = '') {
  const colorMap = {
    'pending': '#F39C12',
    'confirmed': '#3498DB',
    'in-progress': 'var(--primary)',
    'going': 'var(--primary)',
    'completed': '#27AE60',
    'cancelled': '#E74C3C',
  };
  const bc = colorMap[order.status] || '#999';

  return `
    <div class="order-card ${order.status}" onclick="${clickFn || `viewOrder('${order.id}')`}" style="border-left-color:${bc};">
      <div class="order-header">
        <div>
          <div class="order-id">#${order.id} • ${order.date || ''}</div>
          <div class="order-service">${order.service}</div>
        </div>
        ${buildStatusBadge(order.status)}
      </div>
      <div class="order-body">
        <div class="order-worker">
          <div style="width:32px; height:32px; border-radius:50%; background:var(--primary-light); display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; color:var(--primary);">
            ${getInitials(order.worker?.name || 'T')}
          </div>
          <div>
            <div style="font-size:13px; font-weight:600; color:var(--text-primary);">${order.worker?.name || 'Chưa phân công'}</div>
            <div class="order-time"><i class="far fa-clock" style="margin-right:3px;"></i>${order.timeSlot || ''}</div>
          </div>
        </div>
        <div class="order-price">${formatCurrency(order.totalPrice)}</div>
      </div>
    </div>
  `;
}

// Build notification item
function buildNotifItem(notif) {
  return `
    <div class="notif-item ${notif.unread ? 'unread' : ''}" onclick="handleNotifClick('${notif.id}')">
      <div class="notif-icon-wrap" style="background:${notif.iconBg}; font-size:22px;">
        ${notif.icon}
      </div>
      <div class="notif-content">
        <div class="notif-title">${notif.title}${notif.unread ? '<span style="display:inline-block; width:8px; height:8px; background:var(--primary); border-radius:50%; margin-left:6px; vertical-align:middle;"></span>' : ''}</div>
        <div class="notif-message">${notif.message}</div>
        <div class="notif-time">${notif.time}</div>
      </div>
    </div>
  `;
}

// Build worker card
function buildWorkerCard(worker, clickFn = '') {
  const color = getAvatarColor(worker.name);
  return `
    <div class="worker-card" onclick="${clickFn || `viewWorkerDetail('${worker.id}')`}">
      <div class="worker-avatar" style="background:${color.bg}; color:${color.color}; border-color:${color.bg};">
        ${worker.initial || getInitials(worker.name)}
      </div>
      <div class="worker-info">
        <div class="worker-name">${worker.name}${worker.verified ? ' <i class="fas fa-check-circle" style="color:var(--info); font-size:13px;"></i>' : ''}</div>
        <div class="worker-role">${worker.service} • ${worker.experience}</div>
        <div class="worker-meta">
          <span class="worker-badge star"><i class="fas fa-star"></i> ${worker.rating}</span>
          <span class="worker-badge loc"><i class="fas fa-map-marker-alt"></i> ${worker.distance} km</span>
          <span class="worker-badge jobs"><i class="fas fa-briefcase"></i> ${worker.totalJobs} jobs</span>
        </div>
      </div>
      <div class="worker-status">
        <span class="status-badge ${worker.isOnline ? 'online' : 'offline'}">${worker.isOnline ? 'Sẵn sàng' : 'Bận'}</span>
      </div>
    </div>
  `;
}

// Build chat item
function buildChatItem(conv) {
  const color = getAvatarColor(conv.name);
  return `
    <div class="chat-item" onclick="openChat('${conv.id}')">
      <div class="chat-avatar" style="background:${color.bg}; color:${color.color};">
        ${getInitials(conv.name)}
        ${conv.unread > 0 ? `<div class="notif-dot"></div>` : ''}
      </div>
      <div class="chat-info">
        <div class="chat-name">${conv.name}</div>
        <div class="chat-preview">${conv.lastMessage}</div>
      </div>
      <div class="chat-meta">
        <span class="chat-time">${conv.time}</span>
        ${conv.unread > 0 ? `<span class="chat-unread">${conv.unread}</span>` : ''}
      </div>
    </div>
  `;
}

// Render rating dialog
function showRatingDialog(orderId, workerName) {
  let selectedRating = 0;
  
  const overlay = document.createElement('div');
  overlay.className = 'rating-dialog';
  overlay.innerHTML = `
    <div class="rating-sheet">
      <div class="sheet-handle"></div>
      <div style="text-align:center; margin-bottom:16px;">
        <div style="font-size:24px; margin-bottom:8px;">🌟</div>
        <h3 style="font-size:18px; font-weight:700; margin-bottom:4px;">Đánh giá dịch vụ</h3>
        <p style="font-size:13px; color:var(--text-tertiary);">Bạn cảm thấy thế nào về ${workerName}?</p>
      </div>
      <div class="rating-stars" id="rating-stars">
        ${[1,2,3,4,5].map(i => `<span class="rating-star" data-val="${i}" onclick="setRating(${i})"><i class="fas fa-star"></i></span>`).join('')}
      </div>
      <textarea id="rating-comment" placeholder="Nhận xét của bạn (không bắt buộc)..." 
        style="width:100%; min-height:80px; padding:12px; border:1.5px solid var(--border); border-radius:var(--radius-md); font-family:inherit; font-size:14px; resize:none; outline:none; margin-bottom:16px;"></textarea>
      <button class="btn btn-primary" onclick="submitRating('${orderId}')">Gửi đánh giá</button>
      <button class="btn btn-ghost" style="width:100%; margin-top:8px; color:var(--text-tertiary);" onclick="closeRatingDialog()">Bỏ qua</button>
    </div>
  `;
  
  document.body.appendChild(overlay);
  window._ratingDialog = overlay;
  window._currentRating = 0;
  
  // Click outside to close
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeRatingDialog();
  });
}

window.setRating = function(val) {
  window._currentRating = val;
  document.querySelectorAll('.rating-star').forEach((el, i) => {
    el.classList.toggle('active', i < val);
  });
};

window.closeRatingDialog = function() {
  if (window._ratingDialog) {
    window._ratingDialog.remove();
    window._ratingDialog = null;
  }
};

window.submitRating = async function(orderId) {
  const rating = window._currentRating;
  if (rating === 0) {
    showToast('Vui lòng chọn số sao đánh giá', 'warning');
    return;
  }
  closeRatingDialog();
  showLoading();
  await delay(800);
  hideLoading();
  showToast('Cảm ơn bạn đã đánh giá! 🌟', 'success');
};

// Apply voucher handler
window.applyVoucher = function(code) {
  showToast(`Đã áp dụng voucher ${code}`, 'success');
};
