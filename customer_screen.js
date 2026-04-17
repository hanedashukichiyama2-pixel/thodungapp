// =============================================
// THỢ ĐỤNG APP - CUSTOMER SCREENS
// =============================================

// ---- HOME ----
function renderCustomerHome() {
  const state = AppState.customer;
  const user = state.data;
  const banners = MOCK_DATA.banners;
  const categories = MOCK_DATA.categories;
  const topWorkers = MOCK_DATA.workers.slice(0, 3);

  return `
    <div class="screen active" id="screen-customer-home" style="background:var(--bg-secondary); min-height:100vh; display:flex; flex-direction:column;">
      <div class="scroll-content pb-nav" style="flex:1; overflow-y:auto;">
        
        <!-- Home Header -->
        <div class="home-header" style="background:var(--primary-gradient); padding:16px 20px 72px; position:relative;">
          <div style="position:absolute; bottom:-1px; left:0; right:0; height:40px; background:var(--bg-secondary); border-radius:24px 24px 0 0;"></div>
          
          <div class="home-location" style="display:flex; align-items:center; gap:6px; margin-bottom:16px;">
            <i class="fas fa-map-marker-alt" style="font-size:13px; color:rgba(255,255,255,0.9);"></i>
            <span class="location-text" style="font-size:13px; color:rgba(255,255,255,0.9); flex:1;">123 Lê Lợi, Quận 1, TP.HCM</span>
            <span style="font-size:12px; color:rgba(255,255,255,0.75); cursor:pointer; text-decoration:underline;" onclick="showToast('Tính năng đang phát triển 🔨', 'info')">Đổi</span>
          </div>
          
          <div class="home-greeting" style="display:flex; align-items:center; justify-content:space-between;">
            <div class="greeting-text" style="color:white;">
              <h2 style="font-size:22px; font-weight:800; margin-bottom:2px; letter-spacing:-0.3px;">Xin chào, ${user.name.split(' ').pop()}! 👋</h2>
              <p style="font-size:13px; color:rgba(255,255,255,0.82);">Dịch vụ gì bạn cần hôm nay?</p>
            </div>
            <div onclick="navigateCustomer('profile')" style="position:relative;">
              <div class="avatar" style="width:44px; height:44px; border-radius:50%; background:rgba(255,255,255,0.25); border:2px solid rgba(255,255,255,0.4); display:flex; align-items:center; justify-content:center; cursor:pointer;">
                <i class="fas fa-user" style="font-size:20px; color:white;"></i>
              </div>
              <div style="position:absolute; top:0; right:0; width:12px; height:12px; background:#4CD964; border-radius:50%; border:2px solid var(--primary);"></div>
            </div>
          </div>
        </div>
        
        <!-- Search Bar -->
        <div style="margin:0 16px; transform:translateY(-28px); position:relative; z-index:10;">
          <div style="position:relative;">
            <i class="fas fa-search" style="position:absolute; left:16px; top:50%; transform:translateY(-50%); color:var(--primary); font-size:16px;"></i>
            <input type="text" placeholder="Tìm dịch vụ: điện, nước, điều hòa..." 
              style="width:100%; height:48px; background:white; border:none; border-radius:var(--radius-md); padding:0 48px; font-family:inherit; font-size:14px; box-shadow:0 4px 16px rgba(0,0,0,0.12); outline:none;"
              onclick="navigateCustomer('booking')">
            <i class="fas fa-sliders-h" style="position:absolute; right:16px; top:50%; transform:translateY(-50%); color:var(--text-tertiary); font-size:16px; cursor:pointer;"></i>
          </div>
        </div>
        
        <!-- Banner Slider -->
        <div style="margin:-4px 16px 20px; position:relative;">
          <div id="banner-track" style="display:flex; transition:transform 0.4s ease; border-radius:var(--radius-lg); overflow:hidden;">
            ${banners.map((b, i) => buildBannerSlide(b, i)).join('')}
          </div>
          <div id="banner-dots" style="display:flex; justify-content:center; gap:4px; margin-top:10px;">
            ${banners.map((_, i) => `<div style="width:${i === 0 ? '20px' : '6px'}; height:6px; border-radius:3px; background:${i === 0 ? 'var(--primary)' : 'var(--border)'}; transition:all 0.3s ease;" data-dot="${i}"></div>`).join('')}
          </div>
        </div>
        
        <!-- Reward Summary Bar -->
        <div style="margin:0 16px 20px;">
          <div style="background:linear-gradient(90deg, #1A1A2E 0%, #2D2D44 100%); border-radius:var(--radius-md); padding:12px 16px; display:flex; align-items:center; gap:10px; cursor:pointer;" onclick="navigateCustomer('profile')">
            <div style="width:36px; height:36px; background:var(--primary); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0;">⭐</div>
            <div style="flex:1;">
              <div style="font-size:12px; color:rgba(255,255,255,0.7); margin-bottom:1px;">Điểm thưởng của bạn</div>
              <div style="font-size:16px; font-weight:800; color:white;">${formatNumber(user.loyaltyPoints)} điểm</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:11px; color:rgba(255,255,255,0.6);">Hạng</div>
              <div style="font-size:13px; font-weight:700; color:var(--accent);">🥇 ${user.memberLevel}</div>
            </div>
          </div>
        </div>
        
        <!-- Service Categories -->
        <div style="margin:0 0 24px;">
          <div class="section-header" style="display:flex; align-items:center; justify-content:space-between; margin:0 16px 12px;">
            <h2 class="section-title" style="font-size:16px; font-weight:700; color:var(--text-primary);">Danh mục dịch vụ</h2>
            <a class="section-link" style="font-size:13px; color:var(--primary); font-weight:600; cursor:pointer;" onclick="navigateCustomer('booking')">Xem tất cả</a>
          </div>
          
          <div class="categories-grid" style="display:grid; grid-template-columns:repeat(4,1fr); gap:12px; padding:0 16px;">
            ${categories.map(cat => `
              <div class="category-item" onclick="selectCategory('${cat.id}')" style="display:flex; flex-direction:column; align-items:center; gap:6px; cursor:pointer;">
                <div style="width:60px; height:60px; border-radius:var(--radius-md); background:${cat.color}; display:flex; align-items:center; justify-content:center; font-size:26px; transition:all 0.3s;">
                  ${cat.icon}
                </div>
                <span style="font-size:11px; font-weight:600; color:var(--text-secondary); text-align:center; line-height:1.3;">${cat.name}</span>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Near Workers -->
        <div style="margin-bottom:20px;">
          <div class="section-header" style="display:flex; align-items:center; justify-content:space-between; margin:0 16px 12px;">
            <h2 class="section-title" style="font-size:16px; font-weight:700; color:var(--text-primary);">Thợ gần bạn <span style="font-size:12px; color:var(--success); font-weight:500;">● ${topWorkers.filter(w => w.isOnline).length} đang sẵn sàng</span></h2>
            <a class="section-link" style="font-size:13px; color:var(--primary); font-weight:600; cursor:pointer;" onclick="showScreen('customer-workers')">Xem thêm</a>
          </div>
          
          <div class="workers-list" style="padding:0 16px; display:flex; flex-direction:column; gap:10px;">
            ${topWorkers.map(w => buildWorkerCard(w)).join('')}
          </div>
        </div>
        
        <!-- Flash Sale -->
        <div style="margin:0 16px 24px; background:var(--primary-gradient); border-radius:var(--radius-lg); padding:16px; position:relative; overflow:hidden; cursor:pointer;" onclick="navigateCustomer('booking')">
          <div style="position:absolute; top:-20px; right:-20px; width:100px; height:100px; background:rgba(255,255,255,0.1); border-radius:50%;"></div>
          <div style="position:absolute; bottom:-30px; right:60px; width:80px; height:80px; background:rgba(255,255,255,0.07); border-radius:50%;"></div>
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <div>
              <span style="font-size:10px; background:rgba(255,255,255,0.25); color:white; padding:2px 8px; border-radius:4px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px;">Flash Sale</span>
              <h3 style="font-size:18px; font-weight:800; color:white; margin:6px 0 4px; line-height:1.3;">Vệ sinh điều hòa<br>chỉ từ 99.000đ</h3>
              <p style="font-size:12px; color:rgba(255,255,255,0.85);">Còn lại: <strong>15 suất</strong> • HSD: 15/04</p>
            </div>
            <div style="text-align:center; z-index:1;">
              <div style="font-size:40px; margin-bottom:4px;">❄️</div>
              <button style="background:white; color:var(--primary); border:none; padding:6px 14px; border-radius:var(--radius-full); font-size:12px; font-weight:700; cursor:pointer;">Đặt ngay</button>
            </div>
          </div>
        </div>
        
        <!-- Price List Preview -->
        <div style="margin-bottom:80px;">
          <div class="section-header" style="display:flex; align-items:center; justify-content:space-between; margin:0 16px 12px;">
            <h2 class="section-title" style="font-size:16px; font-weight:700; color:var(--text-primary);">Bảng giá dịch vụ</h2>
            <a class="section-link" style="font-size:13px; color:var(--primary); font-weight:600; cursor:pointer;" onclick="navigateCustomer('booking')">Xem tất cả</a>
          </div>
          
          <div class="service-list" style="padding:0 16px; display:flex; flex-direction:column; gap:10px;">
            ${MOCK_DATA.services.slice(0, 4).map(svc => `
              <div class="service-card" onclick="bookService('${svc.id}')" style="background:var(--bg-primary); border-radius:var(--radius-md); padding:12px; display:flex; align-items:center; gap:12px; box-shadow:var(--shadow-sm); cursor:pointer; border:1.5px solid transparent;">
                <div style="width:56px; height:56px; border-radius:var(--radius-md); background:var(--primary-light); display:flex; align-items:center; justify-content:center; font-size:26px; flex-shrink:0;">${svc.icon}</div>
                <div style="flex:1; min-width:0;">
                  <div style="font-size:14px; font-weight:700; color:var(--text-primary); margin-bottom:2px;">${svc.name}</div>
                  <div style="font-size:12px; color:var(--text-tertiary); margin-bottom:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${svc.description}</div>
                  <div style="display:flex; align-items:center; gap:6px;">
                    <span style="font-size:14px; font-weight:700; color:var(--primary);">${formatCurrency(svc.basePrice)}</span>
                    <span style="font-size:11px; color:var(--text-tertiary);">${svc.priceUnit}</span>
                    <span style="display:flex; align-items:center; gap:2px; font-size:11px; color:var(--text-secondary); margin-left:4px;">
                      <i class="fas fa-star" style="color:#FFB800; font-size:10px;"></i>${svc.rating}
                    </span>
                  </div>
                </div>
                <div style="color:var(--text-tertiary); font-size:12px;"><i class="fas fa-chevron-right"></i></div>
              </div>
            `).join('')}
          </div>
        </div>
        
      </div>
      ${buildCustomerNav('home')}
    </div>
  `;
}

// ---- BOOKING ----
function renderCustomerBooking() {
  const categories = MOCK_DATA.categories;
  const services = MOCK_DATA.services;
  const state = AppState.customer;
  const selectedCat = state.selectedCategoryId;
  const filteredServices = selectedCat ? services.filter(s => s.category === selectedCat) : services;

  return `
    <div class="screen active" id="screen-customer-booking" style="background:var(--bg-secondary); min-height:100vh; display:flex; flex-direction:column;">
      
      ${buildHeader({ title: 'Đặt dịch vụ', showBack: false, style: 'orange' })}
      
      <!-- Search -->
      <div style="padding:12px 16px; background:white; border-bottom:1px solid var(--border-light);">
        <div style="position:relative;">
          <i class="fas fa-search" style="position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--primary); font-size:15px;"></i>
          <input type="text" placeholder="Tìm dịch vụ..." 
            style="width:100%; height:42px; border:1.5px solid var(--border); border-radius:var(--radius-md); padding:0 14px 0 42px; font-family:inherit; font-size:14px; outline:none; background:var(--bg-secondary);">
        </div>
      </div>
      
      <!-- Category filter -->
      <div style="padding:12px 0; background:white; border-bottom:1px solid var(--border-light); overflow-x:auto; -webkit-overflow-scrolling:touch;">
        <div style="display:flex; gap:8px; padding:0 16px; min-width:max-content;">
          <button onclick="filterCategory(null)" style="padding:6px 14px; border-radius:var(--radius-full); font-size:13px; font-weight:600; cursor:pointer; border:1.5px solid ${!selectedCat ? 'var(--primary)' : 'var(--border)'}; background:${!selectedCat ? 'var(--primary)' : 'transparent'}; color:${!selectedCat ? 'white' : 'var(--text-secondary)'}; white-space:nowrap; font-family:inherit; transition:all 0.2s;">
            Tất cả
          </button>
          ${categories.map(cat => `
            <button onclick="filterCategory('${cat.id}')" style="display:flex; align-items:center; gap:5px; padding:6px 14px; border-radius:var(--radius-full); font-size:13px; font-weight:600; cursor:pointer; border:1.5px solid ${selectedCat === cat.id ? 'var(--primary)' : 'var(--border)'}; background:${selectedCat === cat.id ? 'var(--primary)' : 'transparent'}; color:${selectedCat === cat.id ? 'white' : 'var(--text-secondary)'}; white-space:nowrap; font-family:inherit; transition:all 0.2s;">
              ${cat.icon} ${cat.name}
            </button>
          `).join('')}
        </div>
      </div>
      
      <div class="scroll-content pb-nav" style="flex:1; overflow-y:auto; padding:16px;">
        
        <!-- Price Guide Banner -->
        <div style="background:linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%); border-radius:var(--radius-md); padding:14px 16px; margin-bottom:16px; display:flex; align-items:center; gap:12px;">
          <div style="font-size:28px;">💡</div>
          <div>
            <div style="font-size:13px; font-weight:700; color:white; margin-bottom:2px;">Mục "Bảng giá"</div>
            <div style="font-size:12px; color:rgba(255,255,255,0.7);">Minh bạch chi phí trước khi quyết định đặt</div>
          </div>
        </div>
        
        <!-- Services list -->
        <div style="display:flex; flex-direction:column; gap:12px;">
          ${filteredServices.map(svc => `
            <div onclick="bookService('${svc.id}')" style="background:white; border-radius:var(--radius-lg); overflow:hidden; box-shadow:var(--shadow-sm); cursor:pointer; transition:all 0.2s; border:1.5px solid transparent;">
              <div style="background:${MOCK_DATA.categories.find(c => c.id === svc.category)?.color || '#f5f5f5'}; padding:20px; text-align:center; font-size:48px;">
                ${svc.icon}
              </div>
              <div style="padding:14px;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:6px;">
                  <h3 style="font-size:15px; font-weight:700; color:var(--text-primary);">${svc.name}</h3>
                  <span style="background:var(--primary-light); color:var(--primary); font-size:11px; font-weight:700; padding:2px 8px; border-radius:var(--radius-full); white-space:nowrap; margin-left:8px;">${svc.estimatedTime}</span>
                </div>
                <p style="font-size:13px; color:var(--text-tertiary); margin-bottom:10px; line-height:1.5;">${svc.description}</p>
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <div>
                    <span style="font-size:18px; font-weight:800; color:var(--primary);">${formatCurrency(svc.basePrice)}</span>
                    <span style="font-size:12px; color:var(--text-tertiary);">${svc.priceUnit}</span>
                  </div>
                  <div style="display:flex; align-items:center; gap:6px;">
                    <span style="display:flex; align-items:center; gap:3px; font-size:13px; color:#666;">
                      <i class="fas fa-star" style="color:#FFB800;"></i>${svc.rating} (${svc.totalBookings})
                    </span>
                    <button style="background:var(--primary-gradient); color:white; border:none; padding:8px 16px; border-radius:var(--radius-md); font-size:13px; font-weight:700; cursor:pointer; font-family:inherit;">
                      Đặt ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
      
      ${buildCustomerNav('booking')}
    </div>
  `;
}

// ---- BOOKING FORM ----
function renderBookingForm() {
  const booking = AppState.customer.booking;
  const service = booking.service || MOCK_DATA.services[0];
  const dates = getCurrentDates();

  const timeSlots = ['07:00', '08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'];
  const selectedDate = booking.date || dates[0].full;
  const selectedTime = booking.timeSlot || '09:00';

  return `
    <div class="screen active" id="screen-booking-form" style="background:var(--bg-secondary); min-height:100vh; display:flex; flex-direction:column;">
      
      ${buildHeader({ title: service.name, showBack: true, style: 'orange', showRight: false })}
      
      <!-- Step indicator -->
      <div class="step-flow" style="display:flex; align-items:center; padding:12px 16px; background:white; border-bottom:1px solid var(--border-light);">
        ${['Dịch vụ', 'Thời gian', 'Xác nhận'].map((label, i) => `
          ${i > 0 ? `<div style="flex:1; height:1px; background:${i <= 1 ? 'var(--primary)' : 'var(--border)'}; margin:0 4px; margin-bottom:18px;"></div>` : ''}
          <div style="display:flex; flex-direction:column; align-items:center;">
            <div style="width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:12px; font-weight:700; background:${i === 0 ? 'var(--primary)' : i === 1 ? 'var(--primary)' : 'var(--border)'}; color:${i < 2 ? 'white' : 'var(--text-tertiary)'}; border:2px solid ${i < 2 ? 'var(--primary)' : 'var(--border)'};">
              ${i === 0 ? '<i class="fas fa-check"></i>' : i + 1}
            </div>
            <span style="font-size:10px; margin-top:4px; color:${i < 2 ? 'var(--primary)' : 'var(--text-tertiary)'}; font-weight:${i < 2 ? '700' : '500'};">${label}</span>
          </div>
        `).join('')}
      </div>
      
      <div class="scroll-content" style="flex:1; overflow-y:auto; padding-bottom:120px;">
        
        <!-- Service info card -->
        <div style="margin:16px 16px 0; background:white; border-radius:var(--radius-lg); padding:16px; display:flex; gap:12px; box-shadow:var(--shadow-sm);">
          <div style="width:60px; height:60px; background:var(--primary-light); border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; font-size:28px; flex-shrink:0;">
            ${service.icon || '🔧'}
          </div>
          <div>
            <h3 style="font-size:15px; font-weight:700; margin-bottom:4px;">${service.name}</h3>
            <p style="font-size:12px; color:var(--text-tertiary); margin-bottom:6px;">${service.description}</p>
            <span style="font-size:15px; font-weight:800; color:var(--primary);">${formatCurrency(service.basePrice)}</span>
            <span style="font-size:12px; color:var(--text-tertiary);">${service.priceUnit}</span>
          </div>
        </div>
        
        <!-- Section: Date -->
        <div style="margin:12px 16px 0; background:white; border-radius:var(--radius-lg); padding:16px; box-shadow:var(--shadow-sm);">
          <h3 style="font-size:14px; font-weight:700; margin-bottom:12px; display:flex; align-items:center; gap:8px; color:var(--text-primary);">
            <i class="fas fa-calendar" style="color:var(--primary);"></i> Chọn ngày
          </h3>
          <div id="date-picker" style="display:flex; gap:8px; overflow-x:auto; padding-bottom:4px; -webkit-overflow-scrolling:touch;">
            ${dates.map(d => `
              <div onclick="selectBookingDate('${d.full}')" style="flex-shrink:0; padding:10px 14px; border:1.5px solid ${d.full === selectedDate ? 'var(--primary)' : 'var(--border)'}; border-radius:var(--radius-md); text-align:center; cursor:pointer; background:${d.full === selectedDate ? 'var(--primary)' : 'transparent'}; transition:all 0.2s;" data-date="${d.full}">
                <div style="font-size:11px; color:${d.full === selectedDate ? 'rgba(255,255,255,0.85)' : 'var(--text-tertiary)'}; margin-bottom:2px;">${d.day}</div>
                <div style="font-size:18px; font-weight:700; color:${d.full === selectedDate ? 'white' : 'var(--text-primary)'};">${d.date}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Section: Time -->
        <div style="margin:12px 16px 0; background:white; border-radius:var(--radius-lg); padding:16px; box-shadow:var(--shadow-sm);">
          <h3 style="font-size:14px; font-weight:700; margin-bottom:12px; display:flex; align-items:center; gap:8px; color:var(--text-primary);">
            <i class="fas fa-clock" style="color:var(--primary);"></i> Chọn giờ
          </h3>
          <div id="time-slots" style="display:grid; grid-template-columns:repeat(4,1fr); gap:8px;">
            ${timeSlots.map(t => `
              <div onclick="selectBookingTime('${t}')" style="padding:8px 4px; border:1.5px solid ${t === selectedTime ? 'var(--primary)' : 'var(--border)'}; border-radius:var(--radius-sm); text-align:center; cursor:pointer; font-size:13px; font-weight:${t === selectedTime ? '700' : '500'}; color:${t === selectedTime ? 'var(--primary)' : 'var(--text-secondary)'}; background:${t === selectedTime ? 'var(--primary-light)' : 'transparent'}; transition:all 0.2s;" data-time="${t}">
                ${t}
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Section: Address -->
        <div style="margin:12px 16px 0; background:white; border-radius:var(--radius-lg); padding:16px; box-shadow:var(--shadow-sm);">
          <h3 style="font-size:14px; font-weight:700; margin-bottom:12px; display:flex; align-items:center; gap:8px; color:var(--text-primary);">
            <i class="fas fa-map-marker-alt" style="color:var(--primary);"></i> Địa chỉ phục vụ
          </h3>
          <div style="position:relative;">
            <i class="fas fa-home" style="position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--text-tertiary); font-size:15px;"></i>
            <input type="text" id="booking-address" value="${AppState.customer.data.address}" 
              style="width:100%; height:46px; border:1.5px solid var(--border); border-radius:var(--radius-md); padding:0 14px 0 42px; font-family:inherit; font-size:14px; outline:none;"
              placeholder="Nhập địa chỉ...">
          </div>
          <div style="margin-top:8px; display:flex; gap:6px;">
            ${['Nhà riêng', 'Văn phòng', 'Khác'].map((t, i) => `
              <span onclick="selectAddressType(this, '${t}')" style="padding:5px 12px; border:1.5px solid ${i === 0 ? 'var(--primary)' : 'var(--border)'}; border-radius:var(--radius-full); font-size:12px; font-weight:600; color:${i === 0 ? 'var(--primary)' : 'var(--text-secondary)'}; cursor:pointer; transition:all 0.2s;">${t}</span>
            `).join('')}
          </div>
        </div>
        
        <!-- Section: Note -->
        <div style="margin:12px 16px 0; background:white; border-radius:var(--radius-lg); padding:16px; box-shadow:var(--shadow-sm);">
          <h3 style="font-size:14px; font-weight:700; margin-bottom:12px; display:flex; align-items:center; gap:8px; color:var(--text-primary);">
            <i class="fas fa-sticky-note" style="color:var(--primary);"></i> Mô tả vấn đề
          </h3>
          <textarea id="booking-note" placeholder="Ví dụ: Bị chập điện phòng khách, đèn nhấp nháy, ổ cắm bị hỏng..." 
            style="width:100%; min-height:80px; padding:12px; border:1.5px solid var(--border); border-radius:var(--radius-md); font-family:inherit; font-size:14px; resize:none; outline:none; line-height:1.5;"></textarea>
          
          <!-- Image upload -->
          <div style="margin-top:10px;">
            <div style="font-size:12px; color:var(--text-tertiary); margin-bottom:6px;">Thêm ảnh (nếu có)</div>
            <div id="upload-area" onclick="pickImages()" style="border:2px dashed var(--border); border-radius:var(--radius-md); padding:16px; text-align:center; cursor:pointer; transition:all 0.2s;">
              <i class="fas fa-camera" style="font-size:24px; color:var(--text-tertiary); margin-bottom:6px; display:block;"></i>
              <p style="font-size:13px; color:var(--text-tertiary);">Chụp ảnh hiện trường</p>
            </div>
            <div id="image-previews" style="display:flex; gap:8px; margin-top:8px; flex-wrap:wrap;"></div>
          </div>
        </div>
        
        <!-- Section: Voucher -->
        <div style="margin:12px 16px 0; background:white; border-radius:var(--radius-lg); padding:16px; box-shadow:var(--shadow-sm);">
          <div style="display:flex; align-items:center; justify-content:space-between; cursor:pointer;" onclick="showScreen('customer-vouchers')">
            <div style="display:flex; align-items:center; gap:10px;">
              <div style="width:36px; height:36px; background:var(--primary-light); border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px;">🏷️</div>
              <div>
                <div style="font-size:14px; font-weight:700;">Mã giảm giá</div>
                <div style="font-size:12px; color:var(--primary);" id="voucher-selected">Chọn mã giảm giá</div>
              </div>
            </div>
            <i class="fas fa-chevron-right" style="color:var(--text-tertiary);"></i>
          </div>
        </div>
        
        <!-- Price Summary -->
        <div style="margin:12px 16px 0; background:white; border-radius:var(--radius-lg); padding:16px; border:1px solid var(--border-light); box-shadow:var(--shadow-sm);">
          <h3 style="font-size:14px; font-weight:700; margin-bottom:12px; color:var(--text-primary);">Tóm tắt chi phí</h3>
          <div style="display:flex; justify-content:space-between; padding:6px 0; font-size:14px; color:var(--text-secondary);">
            <span>Phí dịch vụ</span>
            <span style="font-weight:600; color:var(--text-primary);">${formatCurrency(service.basePrice)}</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding:6px 0; font-size:14px; color:var(--text-secondary);">
            <span>Phí di chuyển</span>
            <span style="font-weight:600; color:var(--success);">Miễn phí (≤3km)</span>
          </div>
          <div style="display:flex; justify-content:space-between; padding:6px 0; font-size:14px; color:var(--text-secondary);">
            <span>Giảm giá</span>
            <span style="font-weight:600; color:var(--danger);" id="discount-val">-0đ</span>
          </div>
          <div style="border-top:1px dashed var(--border); margin:8px 0; padding-top:12px; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:15px; font-weight:700; color:var(--text-primary);">Tổng cộng</span>
            <span style="font-size:20px; font-weight:800; color:var(--primary);" id="total-price">${formatCurrency(service.basePrice)}</span>
          </div>
        </div>
        
      </div>
      
      <!-- Confirm Button -->
      <div style="position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:430px; background:white; padding:12px 16px; border-top:1px solid var(--border-light); box-shadow:0 -4px 20px rgba(0,0,0,0.1); z-index:150;">
        <button class="btn btn-primary" onclick="confirmBooking()">
          <i class="fas fa-check-circle"></i> Xác nhận đặt dịch vụ
        </button>
      </div>
    </div>
  `;
}

// ---- BOOKING CONFIRMATION ----
function renderBookingConfirm() {
  const booking = AppState.customer.booking;
  const service = booking.service || MOCK_DATA.services[0];

  return `
    <div class="screen active" id="screen-booking-confirm" style="background:var(--bg-secondary); min-height:100vh; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:32px;">
      
      <!-- Success Animation -->
      <div style="text-align:center; margin-bottom:32px;">
        <div style="width:100px; height:100px; background:linear-gradient(135deg, #27AE60 0%, #2ECC71 100%); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 20px; box-shadow:0 8px 24px rgba(39,174,96,0.35); animation:bounceIn 0.5s ease;">
          <i class="fas fa-check" style="font-size:48px; color:white;"></i>
        </div>
        <h2 style="font-size:24px; font-weight:800; color:var(--text-primary); margin-bottom:8px;">Đặt dịch vụ thành công!</h2>
        <p style="font-size:14px; color:var(--text-secondary); line-height:1.6;">Đơn hàng của bạn đã được tiếp nhận.<br>Thợ sẽ liên hệ xác nhận trong vài phút.</p>
      </div>
      
      <!-- Order Info -->
      <div style="background:white; border-radius:var(--radius-xl); padding:20px; width:100%; max-width:340px; box-shadow:var(--shadow-md); margin-bottom:24px;">
        <div style="text-align:center; margin-bottom:16px; padding-bottom:16px; border-bottom:1px dashed var(--border);">
          <span style="font-size:13px; color:var(--text-tertiary);">Mã đơn hàng</span>
          <div style="font-size:22px; font-weight:800; color:var(--primary); letter-spacing:1px;">#TD-10${Math.floor(260 + Math.random() * 10)}</div>
        </div>
        ${[
      ['Dịch vụ', service.name],
      ['Thời gian', `${booking.timeSlot || '09:00'} - ${booking.date || 'Hôm nay'}`],
      ['Địa chỉ', booking.address || MOCK_DATA.customer.address],
      ['Tổng tiền', formatCurrency(service.basePrice)],
    ].map(([label, val]) => `
          <div style="display:flex; justify-content:space-between; margin-bottom:10px; font-size:14px;">
            <span style="color:var(--text-tertiary);">${label}</span>
            <span style="font-weight:600; color:var(--text-primary); text-align:right; max-width:200px;">${val}</span>
          </div>
        `).join('')}
        
        <div style="background:var(--primary-light); border-radius:var(--radius-sm); padding:10px 12px; display:flex; align-items:center; gap:8px; margin-top:4px;">
          <i class="fas fa-info-circle" style="color:var(--primary); font-size:14px;"></i>
          <p style="font-size:12px; color:var(--primary-dark); line-height:1.4;">Thợ sẽ gọi xác nhận trước khi đến. Hãy bật thông báo để không bỏ lỡ!</p>
        </div>
      </div>
      
      <div style="display:flex; flex-direction:column; gap:10px; width:100%; max-width:340px;">
        <button class="btn btn-primary" onclick="navigateCustomer('orders')">
          <i class="fas fa-receipt"></i> Xem đơn hàng
        </button>
        <button class="btn btn-outline" onclick="navigateCustomer('home')">
          <i class="fas fa-home"></i> Về trang chủ
        </button>
      </div>
      
    </div>
  `;
}

// ---- ORDERS ----
function renderCustomerOrders() {
  const orders = AppState.customer.orders;

  return `
    <div class="screen active" id="screen-customer-orders" style="background:var(--bg-secondary); min-height:100vh; display:flex; flex-direction:column;">
      
      ${buildHeader({ title: 'Đơn hàng của tôi', showBack: false, style: 'orange', showRight: true, rightIcon: 'fa-bell', rightAction: "showScreen('customer-notifications')" })}
      
      <!-- Tab Bar -->
      <div style="display:flex; background:white; border-bottom:1px solid var(--border-light); position:sticky; top:56px; z-index:50;">
        ${[['Tất cả', 'all'], ['Đang thực hiện', 'active'], ['Hoàn thành', 'completed'], ['Đã hủy', 'cancelled']].map(([label, val], i) => `
          <button onclick="filterOrders('${val}', this)" style="flex:1; padding:12px 4px; text-align:center; font-size:12px; font-weight:600; color:${i === 0 ? 'var(--primary)' : 'var(--text-tertiary)'}; cursor:pointer; border:none; background:none; border-bottom:2px solid ${i === 0 ? 'var(--primary)' : 'transparent'}; font-family:inherit; transition:all 0.2s; white-space:nowrap;">
            ${label}
          </button>
        `).join('')}
      </div>
      
      <div class="scroll-content pb-nav" style="flex:1; overflow-y:auto; padding:16px 0;">
        
        <!-- Active indicator -->
        ${orders.some(o => o.status === 'in-progress') ? `
          <div style="margin:0 16px 12px; background:linear-gradient(90deg, var(--primary) 0%, #FF9A40 100%); border-radius:var(--radius-md); padding:12px 14px; display:flex; align-items:center; gap:10px; cursor:pointer;" onclick="viewOrder('TD-10255')">
            <div style="width:10px; height:10px; background:white; border-radius:50%; animation:pulse 1.5s infinite;"></div>
            <div style="flex:1; color:white;">
              <div style="font-size:12px; opacity:0.85;">Đơn đang thực hiện</div>
              <div style="font-size:14px; font-weight:700;">${orders.find(o => o.status === 'in-progress')?.service || 'Sửa điện dân dụng'}</div>
            </div>
            <i class="fas fa-chevron-right" style="color:rgba(255,255,255,0.8);"></i>
          </div>
        ` : ''}
        
        <!-- Orders list -->
        ${orders.length > 0 ? `
          ${orders.map(order => buildOrderCard(order)).join('')}
        ` : `
          <div class="empty-state">
            <div class="empty-icon">📋</div>
            <div class="empty-title">Chưa có đơn hàng</div>
            <div class="empty-desc">Hãy đặt dịch vụ đầu tiên của bạn</div>
            <button class="btn btn-primary" style="margin-top:16px; width:auto;" onclick="navigateCustomer('booking')">Đặt dịch vụ ngay</button>
          </div>
        `}
        
      </div>
      
      ${buildCustomerNav('orders')}
    </div>
  `;
}

// ---- ORDER DETAIL ----
function renderOrderDetail() {
  const orderId = AppState.customer.selectedOrderId;
  const order = MOCK_DATA.orders.find(o => o.id === orderId) || MOCK_DATA.orders[0];
  const worker = MOCK_DATA.workers.find(w => w.id === order.worker?.id) || MOCK_DATA.workers[0];

  const steps = order.statusHistory || [
    { status: 'placed', time: '08:00', label: 'Đơn đã đặt', done: true },
    { status: 'confirmed', time: '08:05', label: 'Thợ xác nhận', done: true },
    { status: 'going', time: '08:30', label: 'Thợ đang đến', done: order.status !== 'pending' },
    { status: 'in-progress', time: '09:10', label: 'Đang thực hiện', active: order.status === 'in-progress' },
    { status: 'completed', time: '', label: 'Hoàn thành', done: order.status === 'completed' },
  ];

  return `
    <div class="screen active" id="screen-order-detail" style="background:var(--bg-secondary); min-height:100vh; display:flex; flex-direction:column;">
      
      ${buildHeader({ title: `Đơn #${order.id}`, showBack: true, style: 'orange', showRight: true, rightIcon: 'fa-ellipsis-v' })}
      
      <div class="scroll-content" style="flex:1; overflow-y:auto; padding-bottom:120px;">
        
        <!-- Status Banner -->
        <div style="background:var(--primary-gradient); padding:16px 20px; display:flex; align-items:center; gap:12px;">
          <div style="font-size:28px;">${order.status === 'completed' ? '✅' : order.status === 'cancelled' ? '❌' : '🔧'}</div>
          <div style="color:white;">
            <div style="font-size:14px; opacity:0.85; margin-bottom:2px;">${STATUS_LABELS[order.status] || order.status}</div>
            <div style="font-size:18px; font-weight:800;">${order.service}</div>
          </div>
        </div>
        
        <!-- Worker Card -->
        <div style="margin:16px 16px 0; background:white; border-radius:var(--radius-lg); padding:16px; box-shadow:var(--shadow-sm);">
          <div style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; color:var(--text-tertiary); margin-bottom:12px;">Thợ phụ trách</div>
          <div style="display:flex; align-items:center; gap:12px;">
            ${buildWorkerAvatar(worker, 56)}
            <div style="flex:1;">
              <div style="font-size:16px; font-weight:700; margin-bottom:2px;">${worker.name}</div>
              <div style="font-size:13px; color:var(--text-tertiary); margin-bottom:6px;">${worker.service} • ${worker.experience}</div>
              <div style="display:flex; align-items:center; gap:8px;">
                <span style="display:flex; align-items:center; gap:3px; font-size:13px;"><i class="fas fa-star" style="color:#FFB800;"></i>${worker.rating}</span>
                <span style="font-size:13px; color:var(--text-tertiary);">${worker.totalJobs} đơn</span>
              </div>
            </div>
            <div style="display:flex; gap:8px;">
              <button onclick="openChat('conv01')" style="width:40px; height:40px; background:var(--primary-light); color:var(--primary); border:none; border-radius:50%; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center;">
                <i class="fas fa-comment"></i>
              </button>
              <a href="tel:${worker.phone || '0987654321'}" style="width:40px; height:40px; background:#E8F5E9; color:var(--success); border:none; border-radius:50%; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; text-decoration:none;">
                <i class="fas fa-phone"></i>
              </a>
            </div>
          </div>
        </div>
        
        <!-- Tracking Progress -->
        <div style="margin:12px 16px 0; background:white; border-radius:var(--radius-lg); padding:16px; box-shadow:var(--shadow-sm);">
          <div style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; color:var(--text-tertiary); margin-bottom:16px;">Tiến độ</div>
          <div class="tracking-progress">
            ${steps.map((step, i) => `
              <div class="tracking-step ${step.active ? 'active' : ''} ${step.done ? 'done' : ''}" style="display:flex; gap:12px; position:relative; padding-bottom:${i < steps.length - 1 ? '24px' : '0'};">
                ${i < steps.length - 1 ? `<div style="position:absolute; left:17px; top:36px; bottom:0; width:1px; background:${step.done || step.active ? 'var(--primary)' : 'var(--border)'};"></div>` : ''}
                <div style="width:36px; height:36px; border-radius:50%; background:${step.done ? 'var(--success)' : step.active ? 'var(--primary)' : 'var(--bg-secondary)'}; border:2px solid ${step.done ? 'var(--success)' : step.active ? 'var(--primary)' : 'var(--border)'}; display:flex; align-items:center; justify-content:center; font-size:14px; color:${step.done || step.active ? 'white' : 'var(--text-tertiary)'}; flex-shrink:0; z-index:1; ${step.active ? 'box-shadow:0 2px 8px rgba(255,123,0,0.35);' : ''}">
                  <i class="fas ${step.done ? 'fa-check' : step.active ? 'fa-spinner fa-spin' : 'fa-circle'}" style="font-size:${step.active && !step.done ? '11px' : '12px'};"></i>
                </div>
                <div style="padding-top:6px;">
                  <div style="font-size:14px; font-weight:700; color:${step.done || step.active ? 'var(--text-primary)' : 'var(--text-tertiary)'};">${step.label}</div>
                  ${step.time ? `<div style="font-size:12px; color:var(--text-tertiary);">${step.time}</div>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Order Details -->
        <div style="margin:12px 16px 0; background:white; border-radius:var(--radius-lg); padding:16px; box-shadow:var(--shadow-sm);">
          <div style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; color:var(--text-tertiary); margin-bottom:12px;">Chi tiết đơn hàng</div>
          ${[
      ['Mã đơn', `#${order.id}`],
      ['Ngày đặt', order.date],
      ['Giờ hẹn', order.timeSlot],
      ['Địa chỉ', order.address],
      ['Ghi chú', order.note || 'Không có'],
    ].map(([label, val]) => `
            <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-light); font-size:14px;">
              <span style="color:var(--text-tertiary);">${label}</span>
              <span style="font-weight:600; color:var(--text-primary); text-align:right; max-width:60%;">${val || '-'}</span>
            </div>
          `).join('')}
          <div style="display:flex; justify-content:space-between; align-items:center; padding-top:12px;">
            <span style="font-size:15px; font-weight:700;">Tổng thanh toán</span>
            <span style="font-size:20px; font-weight:800; color:var(--primary);">${formatCurrency(order.totalPrice)}</span>
          </div>
        </div>
        
      </div>
      
      <!-- CTA Footer -->
      <div style="position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:430px; background:white; padding:12px 16px; border-top:1px solid var(--border-light); z-index:150;">
        ${order.status === 'completed' ? `
          <button class="btn btn-primary" onclick="showRatingDialog('${order.id}', '${order.worker?.name || 'Thợ'}')">
            <i class="fas fa-star"></i> Đánh giá dịch vụ
          </button>
        ` : order.status === 'in-progress' || order.status === 'confirmed' ? `
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <button class="btn btn-outline" onclick="openChat('conv01')"><i class="fas fa-comment"></i> Chat thợ</button>
            <button class="btn btn-primary" onclick="showToast('Đã gọi cho thợ', 'success')"><i class="fas fa-phone"></i> Gọi thợ</button>
          </div>
        ` : order.status === 'pending' ? `
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <button class="btn btn-outline" onclick="cancelOrder('${order.id}')"><i class="fas fa-times"></i> Hủy đơn</button>
            <button class="btn btn-primary" onclick="showToast('Đang tìm thợ...', 'info')"><i class="fas fa-search"></i> Trạng thái</button>
          </div>
        ` : `
          <button class="btn btn-primary" onclick="bookService('${MOCK_DATA.services[0].id}')">
            <i class="fas fa-redo"></i> Đặt lại dịch vụ
          </button>
        `}
      </div>
    </div>
  `;
}

// ---- CHAT ----
function renderCustomerChat() {
  const conversations = MOCK_DATA.chatConversations;
  const unreadCount = conversations.reduce((acc, c) => acc + (c.unread || 0), 0);

  return `
    <div class="screen active" id="screen-customer-chat" style="background:var(--bg-secondary); min-height:100vh; display:flex; flex-direction:column;">
      
      ${buildHeader({ title: `Tin nhắn${unreadCount > 0 ? ' (' + unreadCount + ')' : ''}`, showBack: false, style: 'orange' })}
      
      <div class="scroll-content pb-nav" style="flex:1; overflow-y:auto;">
        <div style="background:white;">
          ${conversations.map(conv => buildChatItem(conv)).join('')}
        </div>
        
        ${conversations.length === 0 ? `
          <div class="empty-state">
            <div class="empty-icon">💬</div>
            <div class="empty-title">Chưa có tin nhắn</div>
            <div class="empty-desc">Khi bạn đặt dịch vụ, bạn có thể chat trực tiếp với thợ</div>
          </div>
        ` : ''}
      </div>
      
      ${buildCustomerNav('chat')}
    </div>
  `;
}

// ---- CHAT MESSAGES ----
function renderChatMessages() {
  const convId = AppState.customer.selectedConvId;
  const conv = MOCK_DATA.chatConversations.find(c => c.id === convId) || MOCK_DATA.chatConversations[0];
  const messages = MOCK_DATA.chatMessages[convId] || MOCK_DATA.chatMessages['conv01'];
  const color = getAvatarColor(conv.name);

  return `
    <div class="screen active" id="screen-chat-messages" style="background:var(--bg-secondary); min-height:100vh; min-height:100dvh; display:flex; flex-direction:column;">
      
      <!-- Chat Header -->
      <div style="background:var(--primary-gradient); padding:12px 16px; display:flex; align-items:center; gap:12px; position:sticky; top:0; z-index:100;">
        <button onclick="goBack()" style="background:rgba(255,255,255,0.2); width:36px; height:36px; border-radius:50%; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:white; font-size:16px; flex-shrink:0;">
          <i class="fas fa-chevron-left"></i>
        </button>
        <div style="width:40px; height:40px; border-radius:50%; background:${color.bg}; color:${color.color}; display:flex; align-items:center; justify-content:center; font-size:16px; font-weight:700; flex-shrink:0;">
          ${getInitials(conv.name)}
        </div>
        <div style="flex:1;">
          <div style="font-size:15px; font-weight:700; color:white; margin-bottom:1px;">${conv.name}</div>
          <div style="font-size:11px; color:rgba(255,255,255,0.75);">Liên quan đến đơn ${conv.orderId || ''}</div>
        </div>
        <button style="background:rgba(255,255,255,0.2); width:36px; height:36px; border-radius:50%; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:white; font-size:16px;">
          <i class="fas fa-phone"></i>
        </button>
      </div>
      
      <!-- Messages -->
      <div id="messages-container" style="flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:12px; background:var(--bg-secondary);">
        
        <div style="text-align:center; font-size:12px; color:var(--text-tertiary); margin:8px 0;">Hôm nay, ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</div>
        
        ${messages.map(msg => `
          <div style="display:flex; flex-direction:column; align-items:${msg.type === 'sent' ? 'flex-end' : 'flex-start'};">
            <div style="max-width:75%; padding:10px 14px; border-radius:${msg.type === 'sent' ? '16px 16px 4px 16px' : '16px 16px 16px 4px'}; font-size:14px; line-height:1.5; ${msg.type === 'sent' ? 'background:var(--primary-gradient); color:white;' : 'background:white; color:var(--text-primary); box-shadow:var(--shadow-sm);'}">
              ${msg.text}
            </div>
            <div style="font-size:10px; color:var(--text-tertiary); margin-top:3px; ${msg.type === 'sent' ? 'text-align:right;' : ''}">${msg.time}</div>
          </div>
        `).join('')}
        
      </div>
      
      <!-- Input bar -->
      <div style="display:flex; gap:10px; padding:10px 16px; background:white; border-top:1px solid var(--border-light); align-items:center;">
        <button onclick="showToast('Tính năng đang phát triển', 'info')" style="width:38px; height:38px; background:var(--bg-secondary); color:var(--text-tertiary); border:none; border-radius:50%; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
          <i class="fas fa-paperclip"></i>
        </button>
        <input type="text" id="chat-input" placeholder="Nhập tin nhắn..." 
          style="flex:1; height:40px; border:1.5px solid var(--border); border-radius:var(--radius-full); padding:0 16px; font-family:inherit; font-size:14px; outline:none; background:var(--bg-secondary);"
          onkeydown="if(event.key==='Enter') sendMessage()">
        <button onclick="sendMessage()" style="width:40px; height:40px; background:var(--primary-gradient); color:white; border:none; border-radius:50%; cursor:pointer; font-size:16px; display:flex; align-items:center; justify-content:center; flex-shrink:0; box-shadow:var(--shadow-orange);">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  `;
}

// ---- PROFILE ----
function renderCustomerProfile() {
  const user = AppState.customer.data;

  const menuGroups = [
    {
      items: [
        { icon: '📋', bg: '#FFF3E8', label: 'Lịch sử đơn hàng', sub: `${user.totalOrders} đơn hàng`, action: "navigateCustomer('orders')" },
        { icon: '⭐', bg: '#FFF3C4', label: 'Điểm thưởng', sub: `${formatNumber(user.loyaltyPoints)} điểm • Hạng ${user.memberLevel}`, action: "showToast('Tính năng điểm thưởng', 'info')" },
        { icon: '🏷️', bg: '#E8F5E9', label: 'Voucher của tôi', sub: `${MOCK_DATA.vouchers.filter(v => v.status === 'active').length} voucher hiệu lực`, action: "showScreen('customer-vouchers')" },
      ]
    },
    {
      items: [
        { icon: '📍', bg: '#E3F2FD', label: 'Địa chỉ đã lưu', sub: '2 địa chỉ', action: "showToast('Quản lý địa chỉ', 'info')" },
        { icon: '💳', bg: '#F3E5F5', label: 'Phương thức thanh toán', sub: 'Tiền mặt, Chuyển khoản', action: "showToast('Phương thức thanh toán', 'info')" },
        { icon: '🔔', bg: '#FFF8E1', label: 'Thông báo', sub: '3 chưa đọc', action: "showScreen('customer-notifications')", badge: 3 },
      ]
    },
    {
      items: [
        { icon: '📞', bg: '#E8F5E9', label: 'Hỗ trợ khách hàng', sub: 'Hotline: 0869.159.615', action: "showToast('Đang kết nối hỗ trợ', 'info')" },
        { icon: '⭐', bg: '#FFF3C4', label: 'Đánh giá ứng dụng', sub: '5 sao cho chúng tôi!', action: "showToast('Cảm ơn bạn!', 'success')" },
        { icon: '🔒', bg: '#FFEBEE', label: 'Đổi mật khẩu / Bảo mật', sub: '', action: "showToast('Bảo mật tài khoản', 'info')" },
        { icon: '🚪', bg: '#FFEBEE', label: 'Đăng xuất', sub: '', action: 'handleLogout()', danger: true },
      ]
    }
  ];

  return `
    <div class="screen active" id="screen-customer-profile" style="background:var(--bg-secondary); min-height:100vh; display:flex; flex-direction:column;">
      
      <div class="scroll-content pb-nav" style="flex:1; overflow-y:auto;">
        
        <!-- Profile Header -->
        <div style="background:var(--primary-gradient); padding:40px 20px 60px; text-align:center; position:relative; overflow:hidden;">
          <div style="position:absolute; top:-40px; right:-40px; width:160px; height:160px; background:rgba(255,255,255,0.08); border-radius:50%;"></div>
          <div style="position:absolute; bottom:-60px; left:-30px; width:140px; height:140px; background:rgba(255,255,255,0.06); border-radius:50%;"></div>
          
          <div style="position:relative; z-index:1;">
            <div onclick="showToast('Đổi ảnh đại diện', 'info')" style="width:88px; height:88px; border-radius:50%; border:3px solid rgba(255,255,255,0.5); margin:0 auto 12px; overflow:hidden; cursor:pointer; background:rgba(255,255,255,0.2); display:flex; align-items:center; justify-content:center; font-size:36px; font-weight:700; color:white; position:relative;">
              ${getInitials(user.name)}
              <div style="position:absolute; bottom:2px; right:2px; width:24px; height:24px; background:var(--primary-dark); border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid white;">
                <i class="fas fa-camera" style="font-size:9px; color:white;"></i>
              </div>
            </div>
            <h2 style="font-size:22px; font-weight:800; color:white; margin-bottom:4px;">${user.name}</h2>
            <p style="font-size:13px; color:rgba(255,255,255,0.82);">${formatPhone(user.phone)}</p>
            <span style="display:inline-block; margin-top:6px; background:rgba(255,255,255,0.2); color:white; font-size:12px; font-weight:700; padding:3px 10px; border-radius:var(--radius-full);">🥇 ${user.memberLevel}</span>
          </div>
          
          <div style="display:grid; grid-template-columns:repeat(3,1fr); margin-top:20px; border-top:1px solid rgba(255,255,255,0.2); padding-top:16px; position:relative; z-index:1;">
            ${[
      [user.totalOrders, 'Đơn hàng'],
      [formatNumber(user.loyaltyPoints), 'Điểm thưởng'],
      ['4.9 ⭐', 'Đánh giá'],
    ].map(([val, label]) => `
              <div style="text-align:center; padding:0 8px; border-right:1px solid rgba(255,255,255,0.2);">
                <div style="font-size:20px; font-weight:800; color:white;">${val}</div>
                <div style="font-size:11px; color:rgba(255,255,255,0.75); margin-top:2px;">${label}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Body -->
        <div style="margin:-28px 16px 0; position:relative; z-index:10;">
          
          <!-- Quick actions -->
          <div style="background:white; border-radius:var(--radius-lg); padding:16px; margin-bottom:12px; box-shadow:var(--shadow-sm);">
            <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:8px;">
              ${[
      ['📋', 'Lịch sử', "navigateCustomer('orders')"],
      ['🏷️', 'Voucher', "showScreen('customer-vouchers')"],
      ['📍', 'Địa chỉ', "showToast('Địa chỉ đã lưu', 'info')"],
      ['🔔', 'Thông báo', "showScreen('customer-notifications')"],
    ].map(([icon, label, action]) => `
                <div onclick="${action}" style="display:flex; flex-direction:column; align-items:center; gap:5px; cursor:pointer; padding:8px 4px; border-radius:var(--radius-sm); transition:background 0.2s;">
                  <div style="width:48px; height:48px; background:var(--primary-light); border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; font-size:22px;">
                    ${icon}
                  </div>
                  <span style="font-size:11px; font-weight:600; color:var(--text-secondary); text-align:center;">${label}</span>
                </div>
              `).join('')}
            </div>
          </div>
          
          <!-- Menu Groups -->
          ${menuGroups.map(group => `
            <div style="background:white; border-radius:var(--radius-lg); overflow:hidden; margin-bottom:12px; box-shadow:var(--shadow-sm);">
              ${group.items.map((item, i) => `
                <button onclick="${item.action}" style="display:flex; align-items:center; gap:12px; padding:14px 16px; width:100%; border:none; background:none; cursor:pointer; text-align:left; font-family:inherit; border-bottom:${i < group.items.length - 1 ? '1px solid var(--border-light)' : 'none'}; transition:background 0.2s;">
                  <div style="width:38px; height:38px; background:${item.bg}; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0;">
                    ${item.icon}
                  </div>
                  <div style="flex:1;">
                    <div style="font-size:14px; font-weight:600; color:${item.danger ? 'var(--danger)' : 'var(--text-primary)'};">${item.label}</div>
                    ${item.sub ? `<div style="font-size:12px; color:var(--text-tertiary); margin-top:1px;">${item.sub}</div>` : ''}
                  </div>
                  ${item.badge ? `<span style="background:var(--danger); color:white; font-size:11px; font-weight:700; min-width:20px; height:20px; border-radius:10px; display:flex; align-items:center; justify-content:center; padding:0 5px;">${item.badge}</span>` : ''}
                  <i class="fas fa-chevron-right" style="color:${item.danger ? 'var(--danger)' : 'var(--text-tertiary)'}; font-size:12px;"></i>
                </button>
              `).join('')}
            </div>
          `).join('')}
          
          <div style="text-align:center; padding:16px 0 32px; font-size:12px; color:var(--text-tertiary);">
            Thợ Đụng v1.0 MVP • TD Services JSC<br>Hotline CSKH: 0869.159.615<br>Điều khoản • Chính sách bảo mật
          </div>
        </div>
        
      </div>
      
      ${buildCustomerNav('profile')}
    </div>
  `;
}

// ---- VOUCHERS ----
function renderCustomerVouchers() {
  const vouchers = MOCK_DATA.vouchers;

  return `
    <div class="screen active" id="screen-customer-vouchers" style="background:var(--bg-secondary); min-height:100vh; display:flex; flex-direction:column;">
      
      ${buildHeader({ title: 'Mã giảm giá', showBack: true, style: 'orange' })}
      
      <!-- Input voucher code -->
      <div style="padding:12px 16px; background:white; border-bottom:1px solid var(--border-light);">
        <div style="display:flex; gap:8px;">
          <div style="position:relative; flex:1;">
            <i class="fas fa-tag" style="position:absolute; left:14px; top:50%; transform:translateY(-50%); color:var(--primary); font-size:15px;"></i>
            <input type="text" id="voucher-code-input" placeholder="Nhập mã voucher..." 
              style="width:100%; height:44px; border:1.5px solid var(--border); border-radius:var(--radius-md); padding:0 14px 0 42px; font-family:inherit; font-size:14px; outline:none; text-transform:uppercase;">
          </div>
          <button onclick="applyVoucherCode()" style="height:44px; padding:0 20px; background:var(--primary-gradient); color:white; border:none; border-radius:var(--radius-md); font-size:14px; font-weight:700; cursor:pointer; font-family:inherit; white-space:nowrap;">
            Áp dụng
          </button>
        </div>
      </div>
      
      <!-- Tab Bar -->
      <div style="display:flex; background:white; border-bottom:1px solid var(--border-light);">
        <button id="tab-available" onclick="switchVoucherTab('available')" style="flex:1; padding:12px; text-align:center; font-size:13px; font-weight:600; color:var(--primary); cursor:pointer; border:none; background:none; border-bottom:2px solid var(--primary); font-family:inherit;">
          Có thể dùng (${vouchers.filter(v => v.status === 'active').length})
        </button>
        <button id="tab-expired" onclick="switchVoucherTab('expired')" style="flex:1; padding:12px; text-align:center; font-size:13px; font-weight:600; color:var(--text-tertiary); cursor:pointer; border:none; background:none; border-bottom:2px solid transparent; font-family:inherit;">
          Đã hết hạn (${vouchers.filter(v => v.status === 'expired').length})
        </button>
      </div>
      
      <div class="scroll-content" style="flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:12px;" id="voucher-list">
        ${vouchers.filter(v => v.status === 'active').map(v => buildVoucherCard(v)).join('')}
      </div>
    </div>
  `;
}

// ---- NOTIFICATIONS ----
function renderCustomerNotifications() {
  const notifs = MOCK_DATA.notifications;

  return `
    <div class="screen active" id="screen-customer-notifications" style="background:var(--bg-secondary); min-height:100vh; display:flex; flex-direction:column;">
      
      ${buildHeader({ title: 'Thông báo', showBack: true, style: 'orange', showRight: true, rightIcon: 'fa-check-double', rightAction: "markAllRead()" })}
      
      <div class="scroll-content" style="flex:1; overflow-y:auto;">
        <div style="background:white;">
          ${notifs.map(n => buildNotifItem(n)).join('')}
        </div>
        
        ${notifs.length === 0 ? `
          <div class="empty-state">
            <div class="empty-icon">🔔</div>
            <div class="empty-title">Không có thông báo</div>
            <div class="empty-desc">Bạn sẽ nhận thông báo khi có cập nhật về đơn hàng</div>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// ---- WORKER DETAIL (Customer views worker) ----
function renderWorkerDetail() {
  const workerId = AppState.customer.selectedWorkerId;
  const worker = MOCK_DATA.workers.find(w => w.id === workerId) || MOCK_DATA.workers[0];
  const color = getAvatarColor(worker.name);

  return `
    <div class="screen active" id="screen-worker-detail" style="background:var(--bg-secondary); min-height:100vh; display:flex; flex-direction:column;">
      
      <!-- Hero Header -->
      <div style="background:var(--primary-gradient); padding:60px 20px 80px; text-align:center; position:relative; overflow:hidden;">
        <div style="position:absolute; top:-40px; right:-40px; width:160px; height:160px; background:rgba(255,255,255,0.08); border-radius:50%;"></div>
        
        <button onclick="goBack()" style="position:absolute; top:16px; left:16px; background:rgba(255,255,255,0.2); width:36px; height:36px; border-radius:50%; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; color:white; font-size:16px;">
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <div style="width:84px; height:84px; border-radius:50%; border:3px solid rgba(255,255,255,0.5); margin:0 auto 12px; background:${color.bg}; display:flex; align-items:center; justify-content:center; font-size:36px; font-weight:700; color:${color.color};">
          ${getInitials(worker.name)}
        </div>
        <h2 style="font-size:22px; font-weight:800; color:white; margin-bottom:4px;">${worker.name}</h2>
        <p style="font-size:14px; color:rgba(255,255,255,0.85); margin-bottom:8px;">${worker.service} • ${worker.experience}</p>
        <div style="display:flex; justify-content:center; gap:6px;">
          ${worker.verified ? `<span style="background:rgba(255,255,255,0.2); color:white; font-size:11px; font-weight:700; padding:3px 10px; border-radius:20px; display:flex; align-items:center; gap:4px;"><i class="fas fa-check-circle"></i> Đã xác minh</span>` : ''}
          <span class="status-badge ${worker.isOnline ? 'online' : 'offline'}" style="font-size:11px; padding:3px 10px;">${worker.isOnline ? 'Đang sẵn sàng' : 'Đang bận'}</span>
        </div>
      </div>
      
      <div style="height:28px; background:var(--primary-dark); border-radius:0; overflow:hidden; position:relative; margin-top:-1px;">
        <div style="height:100%; background:var(--bg-secondary); border-radius:24px 24px 0 0;"></div>
      </div>
      
      <!-- Stats -->
      <div style="margin:-20px 16px 0; position:relative; z-index:10;">
        <div style="background:white; border-radius:var(--radius-lg); padding:16px; display:grid; grid-template-columns:repeat(3,1fr); box-shadow:var(--shadow-md); margin-bottom:12px;">
          ${[
      [worker.rating + ' ⭐', 'Đánh giá'],
      [worker.totalJobs, 'Đơn đã làm'],
      [worker.distance + 'km', 'Khoảng cách'],
    ].map(([val, label]) => `
            <div style="text-align:center; padding:0 8px; border-right:1px solid var(--border-light);">
              <div style="font-size:18px; font-weight:800; color:var(--text-primary); margin-bottom:2px;">${val}</div>
              <div style="font-size:11px; color:var(--text-tertiary);">${label}</div>
            </div>
          `).join('')}
        </div>
        
        <!-- Reviews -->
        <div style="background:white; border-radius:var(--radius-lg); padding:16px; margin-bottom:12px; box-shadow:var(--shadow-sm);">
          <div style="font-size:14px; font-weight:700; margin-bottom:12px;">Đánh giá khách hàng</div>
          ${[
      { name: 'Nguyễn Thị Mai', rating: 5, text: 'Thợ làm nhanh, sạch sẽ, giá cả hợp lý. Sẽ tiếp tục ủng hộ!', time: '2 ngày trước' },
      { name: 'Lê Văn Bình', rating: 4, text: 'Tay nghề tốt, thái độ thân thiện.', time: '1 tuần trước' },
    ].map(r => `
            <div style="margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid var(--border-light);">
              <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
                <div style="width:32px; height:32px; border-radius:50%; background:var(--primary-light); display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; color:var(--primary);">${getInitials(r.name)}</div>
                <div>
                  <div style="font-size:13px; font-weight:700;">${r.name}</div>
                  <div style="display:flex; gap:2px;">${[...Array(r.rating)].map(() => '<i class="fas fa-star" style="font-size:11px; color:#FFB800;"></i>').join('')}${[...Array(5 - r.rating)].map(() => '<i class="far fa-star" style="font-size:11px; color:#FFB800;"></i>').join('')}</div>
                </div>
                <span style="margin-left:auto; font-size:11px; color:var(--text-tertiary);">${r.time}</span>
              </div>
              <p style="font-size:13px; color:var(--text-secondary); line-height:1.5;">${r.text}</p>
            </div>
          `).join('')}
        </div>
      </div>
      
      <!-- CTA -->
      <div style="padding:12px 16px; background:white; border-top:1px solid var(--border-light); display:grid; grid-template-columns:1fr 2fr; gap:10px;">
        <button onclick="showToast('Đang kết nối', 'info')" style="height:48px; background:var(--bg-secondary); color:var(--text-primary); border:1.5px solid var(--border); border-radius:var(--radius-md); font-size:14px; font-weight:700; cursor:pointer; font-family:inherit; display:flex; align-items:center; justify-content:center; gap:6px;">
          <i class="fas fa-phone" style="color:var(--success);"></i> Gọi
        </button>
        <button onclick="bookWorker('${worker.id}')" style="height:48px; background:var(--primary-gradient); color:white; border:none; border-radius:var(--radius-md); font-size:14px; font-weight:700; cursor:pointer; font-family:inherit; display:flex; align-items:center; justify-content:center; gap:6px; box-shadow:var(--shadow-orange);">
          <i class="fas fa-calendar-check"></i> Đặt lịch ngay
        </button>
      </div>
    </div>
  `;
}

// ---- ALL WORKERS ----
function renderWorkersList() {
  const workers = MOCK_DATA.workers;

  return `
    <div class="screen active" id="screen-customer-workers" style="background:var(--bg-secondary); min-height:100vh; display:flex; flex-direction:column;">
      
      ${buildHeader({ title: 'Tìm thợ gần bạn', showBack: true, style: 'orange' })}
      
      <!-- Filter -->
      <div style="padding:10px 16px; background:white; border-bottom:1px solid var(--border-light); overflow-x:auto;">
        <div style="display:flex; gap:8px; min-width:max-content;">
          ${['Tất cả', 'Điện', 'Nước', 'Điện lạnh', 'Dọn dẹp', 'Đồ gỗ'].map((f, i) => `
            <button style="padding:6px 14px; border-radius:var(--radius-full); font-size:13px; font-weight:600; cursor:pointer; border:1.5px solid ${i === 0 ? 'var(--primary)' : 'var(--border)'}; background:${i === 0 ? 'var(--primary)' : 'transparent'}; color:${i === 0 ? 'white' : 'var(--text-secondary)'}; font-family:inherit;">
              ${f}
            </button>
          `).join('')}
        </div>
      </div>
      
      <div class="scroll-content" style="flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:10px;">
        ${workers.map(w => buildWorkerCard(w)).join('')}
      </div>
    </div>
  `;
}

// ---- CUSTOMER EVENT HANDLERS ----

window.navigateCustomer = function (tab) {
  AppState.customer.activeTab = tab;

  const screenMap = {
    'home': 'customer-home',
    'booking': 'customer-booking',
    'orders': 'customer-orders',
    'chat': 'customer-chat',
    'profile': 'customer-profile',
  };

  showScreen(screenMap[tab] || 'customer-home');
};

window.selectCategory = function (catId) {
  AppState.customer.selectedCategoryId = catId;
  showScreen('customer-booking');
};

window.filterCategory = function (catId) {
  AppState.customer.selectedCategoryId = catId;
  showScreen('customer-booking');
};

window.bookService = function (serviceId) {
  const service = MOCK_DATA.services.find(s => s.id === serviceId) || MOCK_DATA.services[0];
  AppState.customer.booking.service = service;
  AppState.customer.booking.date = getCurrentDates()[0].full;
  AppState.customer.booking.timeSlot = '09:00';
  showScreen('booking-form');
};

window.bookWorker = function (workerId) {
  AppState.customer.selectedWorkerId = workerId;
  bookService(MOCK_DATA.services[0].id);
};

window.selectBookingDate = function (date) {
  AppState.customer.booking.date = date;
  document.querySelectorAll('[data-date]').forEach(el => {
    const isSelected = el.dataset.date === date;
    el.style.borderColor = isSelected ? 'var(--primary)' : 'var(--border)';
    el.style.background = isSelected ? 'var(--primary)' : 'transparent';
    el.querySelectorAll('div').forEach(d => {
      d.style.color = isSelected ? (d.style.fontSize === '18px' ? 'white' : 'rgba(255,255,255,0.85)') : '';
    });
  });
};

window.selectBookingTime = function (time) {
  AppState.customer.booking.timeSlot = time;
  document.querySelectorAll('[data-time]').forEach(el => {
    const isSelected = el.dataset.time === time;
    el.style.borderColor = isSelected ? 'var(--primary)' : 'var(--border)';
    el.style.background = isSelected ? 'var(--primary-light)' : 'transparent';
    el.style.color = isSelected ? 'var(--primary)' : 'var(--text-secondary)';
    el.style.fontWeight = isSelected ? '700' : '500';
  });
};

window.selectAddressType = function (el, type) {
  el.parentElement.querySelectorAll('span').forEach(s => {
    s.style.borderColor = 'var(--border)';
    s.style.color = 'var(--text-secondary)';
  });
  el.style.borderColor = 'var(--primary)';
  el.style.color = 'var(--primary)';
};

window.confirmBooking = async function () {
  showLoading();

  try {
    const booking = AppState.customer.booking;
    if (window.api) {
      const orderData = {
        serviceName: booking.service?.name || 'Dịch vụ',
        price: booking.service?.basePrice || 150000,
        address: document.getElementById('booking-address')?.value || booking.address || 'Địa chỉ mặc định',
        lat: 10.7769, // Mock default loc
        lng: 106.7009,
        note: document.getElementById('booking-note')?.value || ''
      };

      const newOrder = await api.orders.create(orderData);
      AppState.customer.orders.unshift(newOrder); // Update local state for immediate render
    } else {
      // Fallback to mock
      await delay(1200);
      const newId = 'TD-' + Math.floor(10000 + Math.random() * 90000);

      const newOrder = {
        id: newId,
        service: booking.service?.name || 'Dịch vụ',
        worker: { name: MOCK_DATA.workers[0].name, id: MOCK_DATA.workers[0].id },
        status: 'pending',
        date: booking.date || new Date().toISOString(),
        timeSlot: booking.timeSlot || '09:00',
        address: document.getElementById('booking-address')?.value || booking.address,
        totalPrice: booking.service?.basePrice || 150000,
        note: document.getElementById('booking-note')?.value || '',
      };

      const newJobRequest = {
        id: newId,
        service: booking.service?.name || 'Dịch vụ',
        customerName: AppState.customer.data.name || 'Khách hàng',
        address: document.getElementById('booking-address')?.value || booking.address || 'Địa chỉ',
        distance: '1.5',
        scheduledTime: booking.timeSlot || '10:30',
        scheduledDate: booking.date || 'Hôm nay',
        price: booking.service?.basePrice || 150000,
        timeRemaining: 30,
        description: document.getElementById('booking-note')?.value || '',
      };

      // Update global MOCK_DATA so the Worker role can read it
      MOCK_DATA.jobRequests.unshift(newJobRequest);
      MOCK_DATA.orders.unshift(newOrder);

      // Sync to AppState as well for local rendering
      AppState.customer.orders.unshift(newOrder);

      // Sync to Storage
      if (typeof syncMockDataToStorage === 'function') {
        syncMockDataToStorage();
      }
    }

    hideLoading();
    showScreen('booking-confirm');
  } catch (e) {
    hideLoading();
    showToast(e.message || 'Lỗi đặt đơn', 'error');
  }
};

window.viewOrder = function (orderId) {
  AppState.customer.selectedOrderId = orderId;
  showScreen('order-detail');
};

window.cancelOrder = async function (orderId) {
  if (!confirm('Bạn có chắc muốn hủy đơn này?')) return;

  const order = AppState.customer.orders.find(o => o.id === orderId);
  if (order) order.status = 'cancelled';

  showToast('Đã hủy đơn hàng', 'info');
  showScreen('customer-orders');
};

window.filterOrders = function (status, el) {
  el.parentElement.querySelectorAll('button').forEach(b => {
    b.style.color = 'var(--text-tertiary)';
    b.style.borderBottomColor = 'transparent';
  });
  el.style.color = 'var(--primary)';
  el.style.borderBottomColor = 'var(--primary)';
};

window.openChat = function (convId) {
  AppState.customer.selectedConvId = convId;
  showScreen('chat-messages');
};

window.sendMessage = function () {
  const input = document.getElementById('chat-input');
  const text = input?.value?.trim();
  if (!text) return;

  const convId = AppState.customer.selectedConvId || 'conv01';
  if (!MOCK_DATA.chatMessages[convId]) MOCK_DATA.chatMessages[convId] = [];

  MOCK_DATA.chatMessages[convId].push({
    id: 'm' + Date.now(),
    text,
    type: 'sent',
    time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
  });

  if (input) input.value = '';

  // Re-render messages
  const container = document.getElementById('messages-container');
  if (container) {
    const msgs = MOCK_DATA.chatMessages[convId];
    const lastMsgs = msgs.slice(-10);

    const newBubble = document.createElement('div');
    newBubble.style.cssText = 'display:flex; flex-direction:column; align-items:flex-end;';
    newBubble.innerHTML = `
      <div style="max-width:75%; padding:10px 14px; border-radius:16px 16px 4px 16px; font-size:14px; line-height:1.5; background:var(--primary-gradient); color:white;">
        ${text}
      </div>
      <div style="font-size:10px; color:var(--text-tertiary); margin-top:3px;">${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</div>
    `;
    container.appendChild(newBubble);
    container.scrollTop = container.scrollHeight;

    // Auto reply
    setTimeout(() => {
      const replyBubble = document.createElement('div');
      replyBubble.style.cssText = 'display:flex; flex-direction:column; align-items:flex-start;';
      replyBubble.innerHTML = `
        <div style="max-width:75%; padding:10px 14px; border-radius:16px 16px 16px 4px; font-size:14px; line-height:1.5; background:white; color:var(--text-primary); box-shadow:var(--shadow-sm);">
          Vâng, tôi đã nhận được. Cảm ơn!
        </div>
        <div style="font-size:10px; color:var(--text-tertiary); margin-top:3px;">vừa xong</div>
      `;
      container.appendChild(replyBubble);
      container.scrollTop = container.scrollHeight;
    }, 1000);
  }
};

window.viewWorkerDetail = function (workerId) {
  AppState.customer.selectedWorkerId = workerId;
  showScreen('worker-detail');
};

window.pickImages = function () {
  showToast('Tính năng chụp ảnh cần thiết bị thực', 'info');
  const previews = document.getElementById('image-previews');
  if (previews) {
    for (let i = 0; i < 2; i++) {
      const div = document.createElement('div');
      div.style.cssText = `width:72px; height:72px; border-radius:8px; background:var(--primary-gradient); display:flex; align-items:center; justify-content:center; font-size:28px;`;
      div.innerHTML = i === 0 ? '📷' : '🖼️';
      previews.appendChild(div);
    }
  }
};

window.handleNotifClick = function (notifId) {
  const notif = MOCK_DATA.notifications.find(n => n.id === notifId);
  if (notif?.orderId) viewOrder(notif.orderId);
  else showToast(notif?.title || 'Thông báo', 'info');
};

window.markAllRead = function () {
  MOCK_DATA.notifications.forEach(n => n.unread = false);
  showToast('Đã đánh dấu tất cả đã đọc', 'success');
};

window.switchVoucherTab = function (tab) {
  const vouchers = MOCK_DATA.vouchers.filter(v => tab === 'available' ? v.status === 'active' : v.status === 'expired');
  const list = document.getElementById('voucher-list');
  if (list) list.innerHTML = vouchers.map(v => buildVoucherCard(v)).join('');

  ['available', 'expired'].forEach(t => {
    const btn = document.getElementById(`tab-${t}`);
    if (btn) {
      btn.style.color = t === tab ? 'var(--primary)' : 'var(--text-tertiary)';
      btn.style.borderBottomColor = t === tab ? 'var(--primary)' : 'transparent';
    }
  });
};

window.applyVoucherCode = function () {
  const input = document.getElementById('voucher-code-input');
  const code = input?.value?.trim().toUpperCase();
  const voucher = MOCK_DATA.vouchers.find(v => v.code === code && v.status === 'active');

  if (voucher) {
    showToast(`Đã áp dụng ${voucher.code} - ${voucher.name}`, 'success');
    AppState.customer.booking.voucher = voucher;
    if (input) input.value = '';
  } else {
    showToast('Mã voucher không hợp lệ hoặc đã hết hạn', 'error');
  }
};

window.handleLogout = function () {
  AppState.isLoggedIn = false;
  AppState.currentRole = null;
  showScreen('splash');
  showToast('Đã đăng xuất', 'info');
};
