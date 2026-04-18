// =============================================
// THỢ ĐỤNG APP - AUTH SCREENS
// =============================================

function renderSplash() {
  return `
    <div class="screen active" id="screen-splash" style="background: var(--primary-gradient); min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:40px 32px; position:relative; overflow:hidden;">
      
      <!-- Background circles -->
      <div style="position:absolute; top:-80px; right:-80px; width:280px; height:280px; background:rgba(255,255,255,0.08); border-radius:50%;"></div>
      <div style="position:absolute; bottom:-100px; left:-80px; width:320px; height:320px; background:rgba(255,255,255,0.06); border-radius:50%;"></div>
      <div style="position:absolute; top:30%; left:-40px; width:120px; height:120px; background:rgba(255,255,255,0.05); border-radius:50%;"></div>
      
      <!-- Logo -->
      <div style="text-align:center; margin-bottom:40px; z-index:1;">
        <img src="logo.png" alt="Thợ Đụng" style="max-height: 120px; object-fit: contain; margin-bottom: 16px; border-radius: 16px;">
        <p style="font-size:14px; color:rgba(255,255,255,0.85); margin-top:4px;">Home Services Platform</p>
      </div>
      
      <!-- Tagline -->
      <div style="text-align:center; margin-bottom:56px; z-index:1;">
        <p style="font-size:17px; font-weight:600; color:white; line-height:1.7;">"Giải pháp dịch vụ gia đình<br>chuẩn hóa toàn quốc"</p>
        <div style="display:flex; justify-content:center; gap:20px; margin-top:20px;">
          ${['⚡ Điện nước', '❄️ Điện lạnh', '🪚 Đồ gỗ'].map(s => `
            <span style="font-size:12px; color:rgba(255,255,255,0.82); display:flex; align-items:center; gap:3px;">${s}</span>
          `).join('')}
        </div>
      </div>
      
      <!-- Actions -->
      <div style="width:100%; display:flex; flex-direction:column; gap:12px; z-index:1;">
        <button class="btn btn-white" onclick="showScreen('login')">
          <i class="fas fa-sign-in-alt"></i> Đăng nhập
        </button>
        <button class="btn btn-outline" style="border-color:rgba(255,255,255,0.7); color:white;" onclick="showScreen('register')">
          <i class="fas fa-user-plus"></i> Đăng ký tài khoản
        </button>
        <button class="btn btn-ghost" style="color:rgba(255,255,255,0.75); text-align:center; width:100%; margin-top:4px; font-size:14px;" onclick="showSelectRole()">
          Xem demo không cần đăng nhập →
        </button>
      </div>
    </div>
  `;
}

function renderLogin() {
  return `
    <div class="screen active" id="screen-login" style="background:var(--bg-primary); min-height:100vh;">
      
      <!-- Header bg -->
      <div style="background:var(--primary-gradient); padding:60px 24px 60px; position:relative; overflow:hidden;">
        <div style="position:absolute; top:-40px; right:-40px; width:160px; height:160px; background:rgba(255,255,255,0.1); border-radius:50%;"></div>
        <div style="position:absolute; bottom:-50px; left:-30px; width:120px; height:120px; background:rgba(255,255,255,0.07); border-radius:50%;"></div>
        
        <button onclick="showScreen('splash')" style="background:rgba(255,255,255,0.2); width:36px; height:36px; border-radius:50%; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:white; font-size:16px; margin-bottom:20px;">
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <div style="z-index:1; position:relative;">
          <div style="width:52px; height:52px; background:rgba(255,255,255,0.2); border-radius:14px; display:flex; align-items:center; justify-content:center; margin-bottom:12px;">
            <i class="fas fa-lock" style="font-size:22px; color:white;"></i>
          </div>
          <h1 style="font-size:26px; font-weight:800; color:white; margin-bottom:4px;">Đăng nhập</h1>
          <p style="font-size:14px; color:rgba(255,255,255,0.82);">Nhập số điện thoại để tiếp tục</p>
        </div>
      </div>
      
      <!-- Curve -->
      <div style="height:24px; background:var(--primary-gradient);">
        <div style="height:100%; background:var(--bg-primary); border-radius:24px 24px 0 0;"></div>
      </div>
      
      <!-- Form -->
      <div style="padding:24px 24px;">
        <div class="form-group">
          <label class="form-label">Số điện thoại</label>
          <div class="input-group">
            <i class="fas fa-phone input-icon"></i>
            <input type="tel" class="form-control" id="login-phone" placeholder="Số điện thoại" maxlength="11" style="padding-left:48px;">
          </div>
        </div>
        
        <button class="btn btn-primary" style="margin-top:8px;" onclick="handleSendOTP()">
          Gửi mã OTP
        </button>
        
        <div style="text-align:center; margin-top:24px; font-size:14px; color:var(--text-tertiary);">
          Chưa có tài khoản? 
          <a onclick="showScreen('register')" style="color:var(--primary); font-weight:700; cursor:pointer;">Đăng ký ngay</a>
        </div>
        
        <div style="margin-top:32px; text-align:center;">
          <p style="font-size:12px; color:var(--text-tertiary); line-height:1.6;">
            Bằng cách tiếp tục, bạn đồng ý với<br>
            <a style="color:var(--primary); cursor:pointer;">Điều khoản dịch vụ</a> và 
            <a style="color:var(--primary); cursor:pointer;">Chính sách bảo mật</a>
          </p>
        </div>
      </div>
    </div>
  `;
}

function renderOTP() {
  const phone = AppState.auth.phone || '';
  return `
    <div class="screen active" id="screen-otp" style="background:var(--bg-primary); min-height:100vh;">
      
      <div style="background:var(--primary-gradient); padding:60px 24px 60px; position:relative; overflow:hidden;">
        <div style="position:absolute; top:-40px; right:-40px; width:160px; height:160px; background:rgba(255,255,255,0.1); border-radius:50%;"></div>
        
        <button onclick="showScreen('login')" style="background:rgba(255,255,255,0.2); width:36px; height:36px; border-radius:50%; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:white; font-size:16px; margin-bottom:20px;">
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <div style="z-index:1; position:relative;">
          <div style="width:52px; height:52px; background:rgba(255,255,255,0.2); border-radius:14px; display:flex; align-items:center; justify-content:center; margin-bottom:12px;">
            <i class="fas fa-comment-dots" style="font-size:22px; color:white;"></i>
          </div>
          <h1 style="font-size:26px; font-weight:800; color:white; margin-bottom:4px;">Xác thực OTP</h1>
          <p style="font-size:14px; color:rgba(255,255,255,0.82);">Mã đã gửi đến <strong>${formatPhone(phone)}</strong></p>
        </div>
      </div>
      
      <div style="height:24px; background:var(--primary-gradient);">
        <div style="height:100%; background:var(--bg-primary); border-radius:24px 24px 0 0;"></div>
      </div>
      
      <div style="padding:32px 24px; text-align:center;">
        <p style="font-size:14px; color:var(--text-secondary); margin-bottom:24px;">Nhập mã 6 chữ số được gửi qua SMS</p>
        
        <div class="otp-container" id="otp-container">
          ${[1, 2, 3, 4, 5, 6].map((_, i) => `
            <input type="number" class="otp-input" id="otp-${i}" maxlength="1" 
              onkeyup="handleOTPInput(event, ${i})"
              oninput="limitOTPInput(this)"
              style="width:48px; height:56px;">
          `).join('')}
        </div>
        
        <p style="font-size:13px; color:var(--text-tertiary); margin-bottom:24px;">
          Không nhận được mã? 
          <span id="otp-resend" onclick="resendOTP()" style="color:var(--primary); font-weight:700; cursor:pointer;">Gửi lại (60s)</span>
        </p>
        
        <button class="btn btn-primary" onclick="handleVerifyOTP()">Xác nhận</button>
        
        <p style="font-size:12px; color:var(--text-tertiary); margin-top:20px;">💡 Demo: Nhập bất kỳ 6 số nào để tiếp tục</p>
      </div>
    </div>
  `;
}

function renderRegister() {
  return `
    <div class="screen active" id="screen-register" style="background:var(--bg-primary); min-height:100vh;">
      
      <div style="background:var(--primary-gradient); padding:60px 24px 60px; position:relative; overflow:hidden;">
        <div style="position:absolute; top:-40px; right:-40px; width:160px; height:160px; background:rgba(255,255,255,0.1); border-radius:50%;"></div>
        
        <button onclick="showScreen('splash')" style="background:rgba(255,255,255,0.2); width:36px; height:36px; border-radius:50%; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:white; font-size:16px; margin-bottom:20px;">
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <div style="z-index:1; position:relative;">
          <div style="width:52px; height:52px; background:rgba(255,255,255,0.2); border-radius:14px; display:flex; align-items:center; justify-content:center; margin-bottom:12px;">
            <i class="fas fa-user-plus" style="font-size:22px; color:white;"></i>
          </div>
          <h1 style="font-size:26px; font-weight:800; color:white; margin-bottom:4px;">Đăng ký</h1>
          <p style="font-size:14px; color:rgba(255,255,255,0.82);">Tạo tài khoản mới miễn phí</p>
        </div>
      </div>
      
      <div style="height:24px; background:var(--primary-gradient);">
        <div style="height:100%; background:var(--bg-primary); border-radius:24px 24px 0 0;"></div>
      </div>
      
      <div style="padding:24px;">
        <div class="form-group">
          <label class="form-label">Họ và tên</label>
          <div class="input-group">
            <i class="fas fa-user input-icon"></i>
            <input type="text" class="form-control" placeholder="Nguyễn Văn A" style="padding-left:48px;">
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label">Số điện thoại</label>
          <div class="input-group">
            <i class="fas fa-phone input-icon"></i>
            <input type="tel" class="form-control" id="reg-phone" placeholder="Số điện thoại" style="padding-left:48px;">
          </div>
        </div>
        
        <div class="form-group">
          <label class="form-label">Địa chỉ (tùy chọn)</label>
          <div class="input-group">
            <i class="fas fa-map-marker-alt input-icon"></i>
            <input type="text" class="form-control" placeholder="Số nhà, đường, quận..." style="padding-left:48px;">
          </div>
        </div>
        
        <!-- Role selection -->
        <div class="form-group">
          <label class="form-label">Bạn muốn đăng ký với tư cách?</label>
          <div class="role-cards">
            <div class="role-card" id="role-customer" onclick="selectRegRole('customer')">
              <div class="role-card-icon" style="background:#FFF3E8;">🏠</div>
              <div class="role-card-text">
                <h3>Khách hàng</h3>
                <p>Đặt dịch vụ sửa chữa, bảo trì nhà</p>
              </div>
            </div>
            <div class="role-card" id="role-worker" onclick="selectRegRole('worker')">
              <div class="role-card-icon" style="background:#E8F5E9;">🔧</div>
              <div class="role-card-text">
                <h3>Thợ kỹ thuật</h3>
                <p>Nhận việc, tăng thu nhập với kỹ năng của bạn</p>
              </div>
            </div>
          </div>
        </div>
        
        <button class="btn btn-primary" onclick="handleRegister()">
          Tiếp tục xác thực OTP
        </button>
        
        <div style="text-align:center; margin-top:16px; font-size:14px; color:var(--text-tertiary);">
          Đã có tài khoản? 
          <a onclick="showScreen('login')" style="color:var(--primary); font-weight:700; cursor:pointer;">Đăng nhập</a>
        </div>
      </div>
    </div>
  `;
}

function renderSelectRole() {
  return `
    <div class="screen active" id="screen-select-role" style="background:var(--bg-primary); min-height:100vh; display:flex; flex-direction:column;">
      <div style="background:var(--primary-gradient); padding:60px 24px 40px; text-align:center; position:relative; overflow:hidden;">
        <div style="position:absolute; top:-40px; right:-40px; width:160px; height:160px; background:rgba(255,255,255,0.1); border-radius:50%;"></div>
        
        <button onclick="showScreen('splash')" style="position:absolute; top:20px; left:20px; background:rgba(255,255,255,0.2); width:36px; height:36px; border-radius:50%; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:white; font-size:16px;">
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <div style="width:68px; height:68px; background:rgba(255,255,255,0.2); border-radius:20px; display:flex; align-items:center; justify-content:center; margin:0 auto 16px;">
          <i class="fas fa-tools" style="font-size:30px; color:white;"></i>
        </div>
        <h1 style="font-size:24px; font-weight:800; color:white; margin-bottom:6px;">Chọn chế độ Demo</h1>
        <p style="font-size:14px; color:rgba(255,255,255,0.82);">Khám phá tính năng theo từng vai trò</p>
      </div>
      
      <div style="height:24px; background:var(--primary-gradient);">
        <div style="height:100%; background:var(--bg-primary); border-radius:24px 24px 0 0;"></div>
      </div>
      
      <div style="padding:24px; flex:1;">
        <div class="role-cards">
          <div class="role-card" onclick="enterDemo('customer')" style="padding:20px;">
            <div class="role-card-icon" style="background:#FFF3E8; font-size:32px; width:60px; height:60px;">🏠</div>
            <div class="role-card-text">
              <h3 style="font-size:17px; margin-bottom:6px;">Khách hàng</h3>
              <p>Đặt dịch vụ, theo dõi đơn, đánh giá thợ, quản lý voucher</p>
              <div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:8px;">
                ${['Đặt dịch vụ', 'Tracking', 'Chat', 'Voucher'].map(t => `<span style="font-size:10px; background:var(--primary-light); color:var(--primary); padding:2px 7px; border-radius:20px; font-weight:600;">${t}</span>`).join('')}
              </div>
            </div>
          </div>
          
          <div class="role-card" onclick="enterDemo('worker')" style="padding:20px;">
            <div class="role-card-icon" style="background:#E8F5E9; font-size:32px; width:60px; height:60px;">🔧</div>
            <div class="role-card-text">
              <h3 style="font-size:17px; margin-bottom:6px;">Thợ kỹ thuật</h3>
              <p>Nhận việc, xem bản đồ, quản lý thu nhập, hỗ sơ cá nhân</p>
              <div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:8px;">
                ${['Nhận job', 'Bản đồ', 'Thu nhập', 'Lịch sử'].map(t => `<span style="font-size:10px; background:#E8F5E9; color:var(--success); padding:2px 7px; border-radius:20px; font-weight:600;">${t}</span>`).join('')}
              </div>
            </div>
          </div>
          
          <div class="role-card" onclick="enterDemo('admin')" style="padding:20px;">
            <div class="role-card-icon" style="background:#E3F2FD; font-size:32px; width:60px; height:60px;">📊</div>
            <div class="role-card-text">
              <h3 style="font-size:17px; margin-bottom:6px;">Quản trị viên</h3>
              <p>Dashboard doanh thu, quản lý đơn, thợ, voucher, banner</p>
              <div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:8px;">
                ${['Dashboard', 'Quản lý đơn', 'Quản lý thợ', 'Voucher'].map(t => `<span style="font-size:10px; background:#E3F2FD; color:var(--info); padding:2px 7px; border-radius:20px; font-weight:600;">${t}</span>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Auth handlers
window.showSelectRole = function () {
  showScreen('select-role');
};

window.enterDemo = function (role) {
  AppState.currentRole = role;
  AppState.isLoggedIn = true;

  if (window.io) {
    const socketUrl = window.api && window.api.getSocketUrl ? window.api.getSocketUrl() : 'http://localhost:3015';
    if (!window.socket) {
      window.socket = io(socketUrl);
    }
    window.initSocketListeners();
    window.socket.emit('join', { role: role, userId: 'DEMO' });
  }

  if (role === 'customer') {
    showScreen('customer-home');
  } else if (role === 'worker') {
    showScreen('worker-home');
  } else if (role === 'admin') {
    showScreen('admin-dashboard');
  }
};

window.handleSendOTP = async function () {
  const phone = document.getElementById('login-phone')?.value?.trim();
  if (!phone || phone.length < 9) {
    showToast('Vui lòng nhập số điện thoại hợp lệ', 'error');
    return;
  }

  AppState.auth.phone = phone;
  showLoading();
  await delay(1000);
  hideLoading();
  showToast('Đã gửi mã OTP', 'success');
  showScreen('otp');
};

window.handleVerifyOTP = async function () {
  const inputs = document.querySelectorAll('.otp-input');
  const otp = Array.from(inputs).map(i => i.value).join('');

  if (otp.length < 6) {
    showToast('Vui lòng nhập đủ 6 chữ số', 'error');
    return;
  }

  showLoading();
  try {
    if (window.api) {
      const role = AppState.auth.registerData?.role?.toUpperCase() || 'CUSTOMER';
      const res = await api.auth.verify(AppState.auth.phone, role);
      api.setToken(res.token);

      AppState.isLoggedIn = true;
      AppState.auth.otpValue = otp;
      AppState.currentRole = res.user.role.toLowerCase();

      if (res.user.role === 'CUSTOMER') MOCK_DATA.customer = res.user;
      else if (res.user.role === 'WORKER') MOCK_DATA.worker = res.user;
      else MOCK_DATA.admin = res.user;

      Object.assign(AppState[AppState.currentRole], { data: res.user });

      if (window.io) {
        const socketUrl = window.api.getSocketUrl ? window.api.getSocketUrl() : 'http://localhost:3000';
        window.socket = io(socketUrl);
        window.initSocketListeners();
        window.socket.emit('join', { role: res.user.role, userId: res.user.id });
      }

      hideLoading();
      showToast('Đăng nhập thành công', 'success');

      if (AppState.currentRole === 'customer') showScreen('customer-home');
      else if (AppState.currentRole === 'worker') showScreen('worker-home');
      else showScreen('admin-dashboard');
    } else {
      // Fallback
      await delay(1000);
      hideLoading();
      AppState.isLoggedIn = true;
      AppState.auth.otpValue = otp;
      showScreen('select-role');
    }
  } catch (e) {
    hideLoading();
    showToast(e.message || 'Có lỗi xảy ra', 'error');
  }
};

window.handleRegister = async function () {
  const phone = document.getElementById('reg-phone')?.value?.trim();
  if (!phone) {
    showToast('Vui lòng nhập số điện thoại', 'error');
    return;
  }
  AppState.auth.phone = phone;
  showLoading();
  await delay(800);
  hideLoading();
  showScreen('otp');
};

window.handleOTPInput = function (e, idx) {
  const inputs = document.querySelectorAll('.otp-input');
  const val = e.target.value;

  if (val && idx < 5) {
    inputs[idx + 1].focus();
  }
  if (e.key === 'Backspace' && !val && idx > 0) {
    inputs[idx - 1].focus();
  }
};

window.limitOTPInput = function (el) {
  if (el.value.length > 1) el.value = el.value.slice(-1);
};

window.resendOTP = async function () {
  showToast('Đã gửi lại mã OTP', 'info');
};

window.selectRegRole = function (role) {
  document.querySelectorAll('.role-card').forEach(el => el.classList.remove('selected'));
  document.getElementById(`role-${role}`)?.classList.add('selected');
  AppState.auth.registerData.role = role;
};
