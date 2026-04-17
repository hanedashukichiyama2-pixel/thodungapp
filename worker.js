// =============================================
// THỢ ĐỤNG APP - WORKER SCREENS
// =============================================

function renderWorkerHome() {
  if (typeof loadMockDataFromStorage === 'function') loadMockDataFromStorage();

  const worker = AppState.worker.data;
  const isOnline = AppState.worker.isOnline;
  const jobs = AppState.worker.currentJobs;
  const pendingJob = MOCK_DATA.jobRequests[0];

  return `
    <div class="screen active" id="screen-worker-home" style="background:var(--bg-secondary); min-height:100vh; display:flex; flex-direction:column;">
      
      <!-- Worker header -->
      <div style="background:linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%); padding:16px 20px; display:flex; align-items:center; gap:12px;">
        <div style="flex:1;">
          <div style="font-size:12px; color:rgba(255,255,255,0.6); margin-bottom:2px;">Xin chào,</div>
          <h2 style="font-size:18px; font-weight:800; color:white;">${worker.name}</h2>
          <div style="font-size:12px; color:rgba(255,255,255,0.65); margin-top:1px;">${worker.serviceName}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:11px; color:rgba(255,255,255,0.6); margin-bottom:2px;">Thu nhập hôm nay</div>
          <div style="font-size:20px; font-weight:800; color:var(--primary);">${formatCurrency(worker.todayEarnings)}</div>
        </div>
        <div style="width:48px; height:48px; border-radius:50%; background:rgba(255,255,255,0.15); display:flex; align-items:center; justify-content:center; font-size:20px; font-weight:700; color:white; cursor:pointer;" onclick="navigateWorker('profile')">
          ${getInitials(worker.name)}
        </div>
      </div>
      
      <!-- Online toggle -->
      <div style="background:white; padding:14px 20px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid var(--border-light);">
        <div>
          <div style="font-size:15px; font-weight:700; color:var(--text-primary);">${isOnline ? '🟢 Đang nhận việc' : '⚫ Đang ngoại tuyến'}</div>
          <div style="font-size:12px; color:var(--text-tertiary); margin-top:1px;">${isOnline ? 'Đơn hàng sẽ hiển thị khi có yêu cầu' : 'Bật để nhận đơn hàng mới'}</div>
        </div>
        <label class="toggle-switch">
          <input type="checkbox" id="online-toggle" ${isOnline ? 'checked' : ''} onchange="toggleOnlineStatus()">
          <span class="toggle-slider"></span>
        </label>
      </div>
      
      <div class="scroll-content pb-nav" style="flex:1; overflow-y:auto;">
        
        <!-- Map Preview -->
        <div style="height:200px; background:#E8EEF0; position:relative; overflow:hidden;">
          <!-- Fake map grid -->
          <div style="position:absolute; inset:0; background:repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(200,220,240,0.5) 40px, rgba(200,220,240,0.5) 41px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(200,220,240,0.5) 60px, rgba(200,220,240,0.5) 61px); background-color:#E8F0F5;"></div>
          <!-- Roads -->
          <div style="position:absolute; top:50%; left:0; right:0; height:4px; background:white; opacity:0.8;"></div>
          <div style="position:absolute; left:40%; top:0; bottom:0; width:3px; background:white; opacity:0.7;"></div>
          <div style="position:absolute; top:30%; left:0; right:0; height:2px; background:white; opacity:0.5;"></div>
          <div style="position:absolute; top:70%; left:0; right:0; height:2px; background:white; opacity:0.5;"></div>
          
          <!-- My location pin -->
          <div style="position:absolute; top:50%; left:40%; transform:translate(-50%,-50%);">
            <div style="width:14px; height:14px; background:var(--primary); border-radius:50%; border:3px solid white; box-shadow:0 0 0 6px rgba(255,123,0,0.2);"></div>
          </div>
          
          <!-- Nearby customers -->
          <div style="position:absolute; top:30%; left:60%; transform:translate(-50%,-50%); cursor:pointer;">
            <div style="background:var(--info); width:28px; height:28px; border-radius:50% 50% 50% 0; transform:rotate(-45deg); box-shadow:0 2px 8px rgba(52,152,219,0.4); border:2px solid white;"></div>
          </div>
          <div style="position:absolute; top:65%; left:25%; transform:translate(-50%,-50%); cursor:pointer;">
            <div style="background:var(--warning); width:24px; height:24px; border-radius:50% 50% 50% 0; transform:rotate(-45deg); box-shadow:0 2px 8px rgba(243,156,18,0.4); border:2px solid white;"></div>
          </div>
          
          <div style="position:absolute; top:12px; right:12px; background:white; border-radius:50%; width:40px; height:40px; display:flex; align-items:center; justify-content:center; box-shadow:var(--shadow-sm); cursor:pointer; font-size:17px; color:var(--primary);">
            <i class="fas fa-crosshairs"></i>
          </div>
          
          <div style="position:absolute; bottom:0; left:0; right:0; padding:12px 16px; background:linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%); display:flex; justify-content:space-between; align-items:center;">
            <span style="color:white; font-size:12px; font-weight:600;"><i class="fas fa-users" style="margin-right:4px;"></i>3 yêu cầu gần bạn</span>
            <button onclick="navigateWorker('jobs')" style="background:var(--primary); color:white; border:none; padding:6px 12px; border-radius:var(--radius-full); font-size:12px; font-weight:700; cursor:pointer; font-family:inherit;">
              Xem danh sách
            </button>
          </div>
        </div>
        
        <!-- Pending Job Request (if any and online) -->
        ${isOnline ? `
          <div style="margin:12px 16px 0; background:white; border-radius:var(--radius-lg); padding:16px; box-shadow:0 4px 20px rgba(255,123,0,0.2); border:2px solid var(--primary); animation:slideIn 0.3s ease;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <div style="font-size:14px; font-weight:800; color:var(--primary);">🔔 Yêu cầu mới!</div>
              <div id="job-timer" style="display:flex; align-items:center; gap:4px; background:#FFEBEE; color:var(--danger); padding:4px 10px; border-radius:var(--radius-full); font-size:13px; font-weight:700;">
                <i class="fas fa-clock"></i> <span id="timer-text">28s</span>
              </div>
            </div>
            
            <div style="display:flex; gap:10px; align-items:flex-start; margin-bottom:12px;">
              <div style="width:44px; height:44px; background:var(--primary-light); border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; font-size:20px; flex-shrink:0;">⚡</div>
              <div>
                <div style="font-size:15px; font-weight:700; margin-bottom:2px;">${pendingJob.service}</div>
                <div style="font-size:13px; color:var(--text-tertiary); margin-bottom:4px;"><i class="fas fa-map-marker-alt" style="margin-right:3px; color:var(--info);"></i>${pendingJob.address}</div>
                <div style="font-size:12px; color:var(--text-tertiary);">${pendingJob.description}</div>
              </div>
            </div>
            
            <div style="display:flex; gap:12px; margin-bottom:12px;">
              <div style="flex:1; text-align:center; padding:8px; background:var(--bg-secondary); border-radius:var(--radius-sm);">
                <div style="font-size:11px; color:var(--text-tertiary);">Khoảng cách</div>
                <div style="font-size:14px; font-weight:700; color:var(--text-primary);">${pendingJob.distance} km</div>
              </div>
              <div style="flex:1; text-align:center; padding:8px; background:var(--bg-secondary); border-radius:var(--radius-sm);">
                <div style="font-size:11px; color:var(--text-tertiary);">Thời gian</div>
                <div style="font-size:14px; font-weight:700; color:var(--text-primary);">${pendingJob.scheduledTime}</div>
              </div>
              <div style="flex:1; text-align:center; padding:8px; background:var(--primary-light); border-radius:var(--radius-sm);">
                <div style="font-size:11px; color:var(--primary-dark);">Thu nhập</div>
                <div style="font-size:14px; font-weight:700; color:var(--primary);">${formatCurrency(pendingJob.price)}</div>
              </div>
            </div>
            
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
              <button onclick="rejectJob('${pendingJob.id}')" style="height:44px; background:white; color:var(--danger); border:1.5px solid var(--danger); border-radius:var(--radius-md); font-size:14px; font-weight:700; cursor:pointer; font-family:inherit;">
                ✕ Từ chối
              </button>
              <button onclick="acceptJob('${pendingJob.id}')" style="height:44px; background:var(--primary-gradient); color:white; border:none; border-radius:var(--radius-md); font-size:14px; font-weight:700; cursor:pointer; font-family:inherit; box-shadow:var(--shadow-orange);">
                ✓ Chấp nhận
              </button>
            </div>
          </div>
        ` : ''}
        
        <!-- Today's Stats -->
        <div style="margin:12px 16px 0;">
          <div style="font-size:13px; font-weight:700; color:var(--text-tertiary); text-transform:uppercase; letter-spacing:0.5px; margin-bottom:10px;">Hôm nay</div>
          <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px;">
            ${[
      { icon: '✅', label: 'Hoàn thành', value: worker.completedToday, color: 'var(--success)', bg: '#E8F5E9' },
      { icon: '❌', label: 'Từ chối', value: worker.cancelledToday, color: 'var(--danger)', bg: '#FFEBEE' },
      { icon: '💰', label: 'Thu nhập', value: formatCurrency(worker.todayEarnings), color: 'var(--primary)', bg: 'var(--primary-light)' },
    ].map(s => `
              <div style="background:white; border-radius:var(--radius-md); padding:12px; text-align:center; box-shadow:var(--shadow-sm);">
                <div style="font-size:22px; margin-bottom:4px;">${s.icon}</div>
                <div style="font-size:16px; font-weight:800; color:${s.color}; margin-bottom:2px;">${s.value}</div>
                <div style="font-size:11px; color:var(--text-tertiary);">${s.label}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Upcoming Jobs -->
        <div style="margin:16px 16px 0;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
            <div style="font-size:13px; font-weight:700; color:var(--text-tertiary); text-transform:uppercase; letter-spacing:0.5px;">Đơn hôm nay</div>
            <span onclick="navigateWorker('jobs')" style="font-size:13px; color:var(--primary); font-weight:600; cursor:pointer;">Xem tất cả</span>
          </div>
          
          ${jobs.map(job => `
            <div onclick="viewWorkerJob('${job.id}')" style="background:white; border-radius:var(--radius-md); padding:14px; margin-bottom:10px; box-shadow:var(--shadow-sm); cursor:pointer; border-left:3px solid var(--primary);">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px;">
                <div>
                  <div style="font-size:12px; color:var(--text-tertiary);">#${job.id}</div>
                  <div style="font-size:15px; font-weight:700;">${job.service}</div>
                </div>
                ${buildStatusBadge(job.status)}
              </div>
              <div style="display:flex; gap:12px; font-size:13px; color:var(--text-secondary);">
                <span><i class="fas fa-user" style="margin-right:3px; color:var(--info);"></i>${job.customerName}</span>
                <span><i class="fas fa-clock" style="margin-right:3px; color:var(--warning);"></i>${job.scheduledTime}</span>
                <span><i class="fas fa-map-marker-alt" style="margin-right:3px; color:var(--danger);"></i>${job.distance}km</span>
              </div>
            </div>
          `).join('')}
          
          ${jobs.length === 0 ? `<div class="empty-state"><div class="empty-icon">📋</div><div class="empty-title">Chưa có đơn hàng hôm nay</div></div>` : ''}
        </div>
        
      </div>
      
      ${buildWorkerNav('home')}
    </div>
  `;
}

// ---- WORKER JOBS LIST ----
function renderWorkerJobs() {
  const jobs = AppState.worker.currentJobs;

  return `
    <div class="screen active" id="screen-worker-jobs" style="background:var(--bg-secondary); min-height:100vh; display:flex; flex-direction:column;">
      
      ${buildHeader({ title: 'Danh sách công việc', showBack: false, style: 'orange' })}
      
      <!-- Tab filter -->
      <div style="display:flex; background:white; border-bottom:1px solid var(--border-light);">
        ${[['Hôm nay', 'today'], ['Sắp tới', 'upcoming'], ['Đã xong', 'done']].map(([label, val], i) => `
          <button onclick="filterWorkerJobs('${val}', this)" style="flex:1; padding:12px 4px; text-align:center; font-size:13px; font-weight:600; color:${i === 0 ? 'var(--primary)' : 'var(--text-tertiary)'}; cursor:pointer; border:none; background:none; border-bottom:2px solid ${i === 0 ? 'var(--primary)' : 'transparent'}; font-family:inherit;">
            ${label}
          </button>
        `).join('')}
      </div>
      
      <div class="scroll-content pb-nav" style="flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:10px;">
        ${jobs.map(job => `
          <div onclick="viewWorkerJob('${job.id}')" style="background:white; border-radius:var(--radius-lg); padding:16px; box-shadow:var(--shadow-sm); cursor:pointer; border-left:4px solid var(--primary);">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
              <div>
                <div style="font-size:12px; color:var(--text-tertiary); margin-bottom:2px;">#${job.id}</div>
                <div style="font-size:16px; font-weight:700;">${job.service}</div>
              </div>
              ${buildStatusBadge(job.status)}
            </div>
            
            <div style="display:flex; gap:8px; margin-bottom:12px; font-size:13px;">
              <span style="display:flex; align-items:center; gap:3px; color:var(--text-secondary);"><i class="fas fa-user" style="color:var(--info);"></i>${job.customerName}</span>
              <span style="display:flex; align-items:center; gap:3px; color:var(--text-secondary);"><i class="fas fa-clock" style="color:var(--warning);"></i>${job.scheduledTime}</span>
              <span style="display:flex; align-items:center; gap:3px; color:var(--text-secondary);"><i class="fas fa-route" style="color:var(--primary);"></i>${job.distance}km</span>
            </div>
            
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <div style="font-size:13px; color:var(--text-tertiary);"><i class="fas fa-map-marker-alt" style="color:var(--danger); margin-right:4px;"></i>${job.address}</div>
              <div style="font-size:17px; font-weight:800; color:var(--primary);">${formatCurrency(job.price)}</div>
            </div>
            
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:12px;">
              <button onclick="event.stopPropagation(); showMap('${job.address}')" style="height:36px; background:var(--bg-secondary); color:var(--text-primary); border:none; border-radius:var(--radius-sm); font-size:13px; font-weight:600; cursor:pointer; font-family:inherit; display:flex; align-items:center; justify-content:center; gap:5px;">
                <i class="fas fa-directions" style="color:var(--info);"></i> Chỉ đường
              </button>
              <button onclick="event.stopPropagation(); callCustomer('${job.id}')" style="height:36px; background:var(--primary-gradient); color:white; border:none; border-radius:var(--radius-sm); font-size:13px; font-weight:600; cursor:pointer; font-family:inherit; display:flex; align-items:center; justify-content:center; gap:5px;">
                <i class="fas fa-phone"></i> Gọi khách
              </button>
            </div>
          </div>
        `).join('')}
        
        ${jobs.length === 0 ? `
          <div class="empty-state">
            <div class="empty-icon">📋</div>
            <div class="empty-title">Chưa có công việc</div>
            <div class="empty-desc">Bật trạng thái sẵn sàng để nhận đơn</div>
          </div>
        ` : ''}
      </div>
      
      ${buildWorkerNav('jobs')}
    </div>
  `;
}

// ---- WORKER JOB DETAIL ----
function renderWorkerJobDetail() {
  const jobId = AppState.worker.selectedJobId;
  const job = MOCK_DATA.workerJobs.find(j => j.id === jobId) || MOCK_DATA.workerJobs[0];

  return `
    <div class="screen active" id="screen-worker-job-detail" style="background:var(--bg-secondary); min-height:100vh; display:flex; flex-direction:column;">
      
      ${buildHeader({ title: `Đơn #${job.id}`, showBack: true, style: 'orange' })}
      
      <div class="scroll-content" style="flex:1; overflow-y:auto; padding-bottom:120px;">
        
        <!-- Map placeholder -->
        <div style="height:180px; background:#E8EEF0; position:relative; overflow:hidden;">
          <div style="position:absolute; inset:0; background:repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(200,220,240,0.5) 40px, rgba(200,220,240,0.5) 41px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(200,220,240,0.5) 60px, rgba(200,220,240,0.5) 61px); background-color:#E8F0F5;"></div>
          <div style="position:absolute; top:50%; left:55%; transform:translate(-50%,-50%);">
            <div style="width:14px; height:14px; background:var(--info); border-radius:50%; border:3px solid white; box-shadow:0 0 0 8px rgba(52,152,219,0.2);"></div>
          </div>
          <div style="position:absolute; top:40%; left:35%; transform:translate(-50%,-50%);">
            <div style="width:14px; height:14px; background:var(--primary); border-radius:50%; border:3px solid white; box-shadow:0 0 0 6px rgba(255,123,0,0.2);"></div>
          </div>
          <div style="position:absolute; top:40%; left:35%; right:45%; top:40%; height:1px; background:var(--primary); opacity:0.5;"></div>
          
          <div style="position:absolute; bottom:0; left:0; right:0; background:linear-gradient(to top, rgba(0,0,0,0.5), transparent); padding:12px; display:flex; justify-content:space-between; align-items:center;">
            <span style="color:white; font-size:13px; font-weight:600;"><i class="fas fa-route" style="margin-right:4px;"></i>${job.distance} km • ~10 phút</span>
            <button onclick="showMap('${job.address}')" style="background:white; color:var(--primary); border:none; padding:6px 14px; border-radius:var(--radius-full); font-size:12px; font-weight:700; cursor:pointer; font-family:inherit;">
              <i class="fas fa-directions"></i> Chỉ đường
            </button>
          </div>
        </div>
        
        <!-- Job info -->
        <div style="margin:12px 16px 0; background:white; border-radius:var(--radius-lg); padding:16px; box-shadow:var(--shadow-sm);">
          <div style="display:flex; gap:12px; align-items:flex-start; margin-bottom:12px;">
            <div style="width:50px; height:50px; background:var(--primary-light); border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; font-size:24px; flex-shrink:0;">⚡</div>
            <div>
              <h3 style="font-size:16px; font-weight:700; margin-bottom:4px;">${job.service}</h3>
              <span class="chip chip-primary">${buildStatusBadge(job.status)}</span>
            </div>
          </div>
          
          ${[
      ['Khách hàng', job.customerName],
      ['Địa chỉ', job.address],
      ['Thời gian hẹn', job.scheduledDate + ' ' + job.scheduledTime],
      ['Khoảng cách', job.distance + ' km'],
    ].map(([label, val]) => `
            <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-light); font-size:14px;">
              <span style="color:var(--text-tertiary);">${label}</span>
              <span style="font-weight:600; color:var(--text-primary);">${val}</span>
            </div>
          `).join('')}
          
          <div style="display:flex; justify-content:space-between; align-items:center; padding-top:12px;">
            <span style="font-size:15px; font-weight:700;">Dự kiến thu nhập</span>
            <span style="font-size:22px; font-weight:800; color:var(--primary);">${formatCurrency(job.price)}</span>
          </div>
        </div>
        
        <!-- Contact Customer -->
        <div style="margin:12px 16px 0; background:white; border-radius:var(--radius-lg); padding:16px; box-shadow:var(--shadow-sm);">
          <div style="font-size:13px; font-weight:700; color:var(--text-tertiary); text-transform:uppercase; margin-bottom:12px;">Liên hệ khách hàng</div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
            <button onclick="callCustomer('${job.id}')" style="height:44px; background:#E8F5E9; color:var(--success); border:none; border-radius:var(--radius-md); font-size:14px; font-weight:600; cursor:pointer; font-family:inherit; display:flex; align-items:center; justify-content:center; gap:6px;">
              <i class="fas fa-phone"></i> Gọi điện
            </button>
            <button onclick="showToast('Mở chat với khách', 'info')" style="height:44px; background:#E3F2FD; color:var(--info); border:none; border-radius:var(--radius-md); font-size:14px; font-weight:600; cursor:pointer; font-family:inherit; display:flex; align-items:center; justify-content:center; gap:6px;">
              <i class="fas fa-comment"></i> Nhắn tin
            </button>
          </div>
        </div>
        
        <!-- Upload Proof -->
        <div style="margin:12px 16px 0; background:white; border-radius:var(--radius-lg); padding:16px; box-shadow:var(--shadow-sm);">
          <div style="font-size:13px; font-weight:700; color:var(--text-tertiary); text-transform:uppercase; margin-bottom:12px;">Ảnh xác nhận hoàn thành</div>
          <div onclick="pickProofImages()" style="border:2px dashed var(--border); border-radius:var(--radius-md); padding:20px; text-align:center; cursor:pointer;">
            <i class="fas fa-camera-retro" style="font-size:32px; color:var(--text-tertiary); margin-bottom:8px; display:block;"></i>
            <p style="font-size:13px; color:var(--text-tertiary);">Chụp ảnh trước và sau khi sửa</p>
          </div>
          <div id="proof-previews" style="display:flex; gap:8px; margin-top:10px; flex-wrap:wrap;"></div>
        </div>
        
      </div>
      
      <!-- Action Buttons -->
      <div style="position:fixed; bottom:0; left:50%; transform:translateX(-50%); width:100%; max-width:430px; background:white; padding:12px 16px; border-top:1px solid var(--border-light); z-index:150;">
        <div style="display:grid; grid-template-columns:1fr 2fr; gap:10px;">
          <button onclick="showMap('${job.address}')" style="height:48px; background:var(--bg-secondary); color:var(--text-primary); border:1.5px solid var(--border); border-radius:var(--radius-md); font-size:14px; font-weight:600; cursor:pointer; font-family:inherit; display:flex; align-items:center; justify-content:center; gap:5px;">
            <i class="fas fa-directions" style="color:var(--info);"></i> Chỉ đường
          </button>
          <button id="job-cta-btn" onclick="completeJob('${job.id}')" style="height:48px; background:var(--primary-gradient); color:white; border:none; border-radius:var(--radius-md); font-size:14px; font-weight:700; cursor:pointer; font-family:inherit; box-shadow:var(--shadow-orange); display:flex; align-items:center; justify-content:center; gap:6px;">
            <i class="fas fa-check-circle"></i> Xác nhận hoàn thành
          </button>
        </div>
      </div>
    </div>
  `;
}

// ---- WORKER EARNINGS ----
function renderWorkerEarnings() {
  const worker = AppState.worker.data;
  const chartData = [45, 72, 58, 89, 62, 71, 95]; // percentage heights
  const days = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  return `
    <div class="screen active" id="screen-worker-earnings" style="background:var(--bg-secondary); min-height:100vh; display:flex; flex-direction:column;">
      
      ${buildHeader({ title: 'Thu nhập', showBack: false, style: 'orange' })}
      
      <div class="scroll-content pb-nav" style="flex:1; overflow-y:auto;">
        
        <!-- Earnings Summary Card -->
        <div style="margin:16px 16px 0; background:var(--primary-gradient); border-radius:var(--radius-lg); padding:20px; color:white; box-shadow:var(--shadow-orange);">
          <div style="font-size:13px; opacity:0.82; margin-bottom:6px;">Thu nhập tháng này</div>
          <div style="font-size:36px; font-weight:800; letter-spacing:-1px; margin-bottom:4px;">${formatCurrency(worker.monthEarnings)}</div>
          <div style="font-size:12px; opacity:0.75;">
            <i class="fas fa-arrow-up" style="margin-right:3px;"></i>+12% so với tháng trước
          </div>
          
          <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:8px; margin-top:16px;">
            ${[
      ['Hôm nay', formatCurrency(worker.todayEarnings)],
      ['Tuần này', formatCurrency(worker.weekEarnings)],
      ['Đơn HT', worker.completedToday + ' đơn'],
    ].map(([label, val]) => `
              <div style="background:rgba(255,255,255,0.15); border-radius:var(--radius-sm); padding:10px; text-align:center;">
                <div style="font-size:15px; font-weight:800; color:white;">${val}</div>
                <div style="font-size:10px; color:rgba(255,255,255,0.75); margin-top:2px;">${label}</div>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Weekly Chart -->
        <div style="margin:12px 16px 0; background:white; border-radius:var(--radius-lg); padding:16px; box-shadow:var(--shadow-sm);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
            <div style="font-size:14px; font-weight:700;">Biểu đồ 7 ngày qua</div>
            <span style="font-size:12px; color:var(--primary); font-weight:600;">Thu nhập</span>
          </div>
          <div style="display:flex; align-items:flex-end; gap:6px; height:100px;">
            ${chartData.map((h, i) => `
              <div style="flex:1; display:flex; flex-direction:column; align-items:center;">
                <div style="width:100%; background:${i === 6 ? 'var(--primary-gradient)' : 'var(--primary-light)'}; border-radius:4px 4px 0 0; height:${h}px; transition:height 0.5s ease; cursor:pointer;" title="${Math.round(h * 20000)}đ"></div>
                <span style="font-size:10px; color:${i === 6 ? 'var(--primary)' : 'var(--text-tertiary)'}; margin-top:4px; font-weight:${i === 6 ? '700' : '400'};">${days[i]}</span>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Commission Info -->
        <div style="margin:12px 16px 0; background:white; border-radius:var(--radius-lg); padding:16px; box-shadow:var(--shadow-sm);">
          <div style="font-size:14px; font-weight:700; margin-bottom:12px;">Phí & Chiết khấu</div>
          <div style="display:flex; justify-content:space-between; padding:10px; background:var(--primary-light); border-radius:var(--radius-md); margin-bottom:8px;">
            <span style="color:var(--text-secondary); font-size:14px;">Phí sàn (Commission)</span>
            <span style="font-size:22px; font-weight:800; color:var(--primary);">20%</span>
          </div>
          <p style="font-size:12px; color:var(--text-tertiary); line-height:1.5;">Bạn nhận được từ mỗi đơn hàng hoàn thành.</p>
          
          <div style="margin-top:12px; display:flex; flex-direction:column; gap:8px;">
            <div style="font-size:12px; font-weight:700; color:var(--text-tertiary); margin-bottom:4px;">Phí dịch vụ tối thiểu</div>
            ${[
      ['Sửa điện dân dụng', 150000],
      ['Điện lạnh & Điều hòa', 200000],
      ['Sửa đường nước', 150000],
    ].map(([name, price]) => `
              <div style="display:flex; justify-content:space-between; padding:10px 12px; background:var(--bg-secondary); border-radius:var(--radius-sm); font-size:13px;">
                <span style="color:var(--text-secondary);">${name}</span>
                <span style="font-weight:700; color:var(--text-primary);">${formatCurrency(price)}</span>
              </div>
            `).join('')}
          </div>
        </div>
        
        <!-- Withdrawal -->
        <div style="margin:12px 16px 0; background:white; border-radius:var(--radius-lg); padding:16px; box-shadow:var(--shadow-sm);">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
            <div style="font-size:14px; font-weight:700;">Rút tiền</div>
            <span style="font-size:12px; color:var(--success); font-weight:600;">Số dư: ${formatCurrency(worker.monthEarnings * 0.8)}</span>
          </div>
          <button onclick="showToast('Tính năng rút tiền đang phát triển', 'info')" style="width:100%; height:48px; background:var(--primary-gradient); color:white; border:none; border-radius:var(--radius-md); font-size:15px; font-weight:700; cursor:pointer; font-family:inherit; box-shadow:var(--shadow-orange);">
            <i class="fas fa-wallet" style="margin-right:6px;"></i> Rút tiền về tài khoản
          </button>
        </div>
        
        <!-- Pricing Rules -->
        <div style="margin:12px 16px 0; background:white; border-radius:var(--radius-lg); padding:16px; box-shadow:var(--shadow-sm);">
          <div style="font-size:14px; font-weight:700; margin-bottom:12px;">⚡ Quy tắc tổng giá</div>
          <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:var(--bg-secondary); border-radius:var(--radius-sm); margin-bottom:8px;">
            <div>
              <div style="font-size:13px; font-weight:700; color:var(--text-primary); display:flex; align-items:center; gap:6px;">
                <i class="fas fa-clock" style="color:var(--warning);"></i> Giờ cao điểm
              </div>
              <div style="font-size:12px; color:var(--text-tertiary);">17:00 - 19:00 hàng ngày</div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:14px; font-weight:700; color:var(--primary);">+20%</span>
              <div style="width:44px; height:24px; background:var(--border); border-radius:12px; position:relative; cursor:pointer;" onclick="showToast('Hiệu chỉnh bởi Admin', 'info')">
                <div style="width:20px; height:20px; background:white; border-radius:50%; position:absolute; top:2px; left:2px; box-shadow:0 1px 4px rgba(0,0,0,0.2);"></div>
              </div>
            </div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:var(--bg-secondary); border-radius:var(--radius-sm);">
            <div>
              <div style="font-size:13px; font-weight:700; color:var(--text-primary); display:flex; align-items:center; gap:6px;">
                <i class="fas fa-star" style="color:var(--accent);"></i> Ngày Lễ, Tết
              </div>
              <div style="font-size:12px; color:var(--text-tertiary);">Áp dụng theo lịch nhà nước</div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:14px; font-weight:700; color:var(--primary);">+25%</span>
              <div style="width:44px; height:24px; background:var(--border); border-radius:12px; position:relative; cursor:pointer;" onclick="showToast('Hiệu chỉnh bởi Admin', 'info')">
                <div style="width:20px; height:20px; background:white; border-radius:50%; position:absolute; top:2px; left:2px; box-shadow:0 1px 4px rgba(0,0,0,0.2);"></div>
              </div>
            </div>
          </div>
          
          <!-- Distance fee -->
          <div style="margin-top:12px;">
            <div style="font-size:13px; font-weight:700; margin-bottom:8px; display:flex; align-items:center; gap:6px;"><i class="fas fa-motorcycle" style="color:var(--info);"></i> Phí di chuyển</div>
            <div style="display:flex; justify-content:space-between; padding:8px 12px; background:var(--bg-secondary); border-radius:var(--radius-sm); margin-bottom:4px; font-size:13px;">
              <span style="color:var(--text-secondary);">Miễn phí dưới</span>
              <span style="font-weight:700; color:var(--success);">3 km</span>
            </div>
            <div style="display:flex; justify-content:space-between; padding:8px 12px; background:var(--bg-secondary); border-radius:var(--radius-sm); font-size:13px;">
              <span style="color:var(--text-secondary);">Phụ thu mỗi km tiếp theo</span>
              <span style="font-weight:700; color:var(--primary);">5.000đ/km</span>
            </div>
          </div>
        </div>
        
        <!-- Transaction History -->
        <div style="margin:12px 16px 20px; background:white; border-radius:var(--radius-lg); padding:16px; box-shadow:var(--shadow-sm);">
          <div style="font-size:14px; font-weight:700; margin-bottom:12px;">Lịch sử giao dịch</div>
          ${[
      { id: 'TD-10255', service: 'Sửa điện', amount: 350000, date: '12/04', status: 'pending_payout' },
      { id: 'TD-10248', service: 'Lắp ổ cắm', amount: 150000, date: '12/04', status: 'paid' },
      { id: 'TD-10220', service: 'ĐH', amount: 280000, date: '09/04', status: 'paid' },
    ].map(tx => `
            <div style="display:flex; align-items:center; gap:12px; padding:10px 0; border-bottom:1px solid var(--border-light);">
              <div style="width:40px; height:40px; background:${tx.status === 'paid' ? '#E8F5E9' : '#FFF8E1'}; border-radius:var(--radius-md); display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0;">
                ${tx.status === 'paid' ? '✅' : '⏳'}
              </div>
              <div style="flex:1;">
                <div style="font-size:14px; font-weight:600;">${tx.service}</div>
                <div style="font-size:12px; color:var(--text-tertiary);">#${tx.id} • ${tx.date}</div>
              </div>
              <div style="text-align:right;">
                <div style="font-size:15px; font-weight:700; color:${tx.status === 'paid' ? 'var(--success)' : 'var(--warning)'};">+${formatCurrency(tx.amount * 0.8)}</div>
                <div style="font-size:11px; color:var(--text-tertiary);">${tx.status === 'paid' ? 'Đã trả' : 'Chờ thanh toán'}</div>
              </div>
            </div>
          `).join('')}
        </div>
        
      </div>
      
      ${buildWorkerNav('earnings')}
    </div>
  `;
}

// ---- WORKER PROFILE ----
function renderWorkerProfile() {
  const worker = AppState.worker.data;

  const menuItems = [
    { icon: '📋', bg: '#FFF3E8', label: 'Lịch sử đơn hàng', sub: `${worker.totalJobs} đơn`, action: "navigateWorker('jobs')" },
    { icon: '⭐', bg: '#FFF3C4', label: 'Đánh giá & Phản hồi', sub: `${worker.rating}/5 từ khách hàng`, action: "showToast('Xem đánh giá', 'info')" },
    { icon: '🪪', bg: '#E3F2FD', label: 'Hồ sơ & Giấy tờ', sub: 'CCCD, Bằng cấp, Kinh nghiệm', action: "showToast('Cập nhật hồ sơ', 'info')" },
    { icon: '🎓', bg: '#E8F5E9', label: 'Dịch vụ tôi cung cấp', sub: worker.serviceName, action: "showToast('Quản lý dịch vụ', 'info')" },
    { icon: '💳', bg: '#F3E5F5', label: 'Thông tin ngân hàng', sub: 'Để nhận thanh toán', action: "showToast('Cập nhật tài khoản ngân hàng', 'info')" },
    { icon: '🔔', bg: '#FFF8E1', label: 'Cài đặt thông báo', action: "showToast('Cài đặt thông báo', 'info')" },
    { icon: '🚪', bg: '#FFEBEE', label: 'Đăng xuất', action: 'handleLogout()', danger: true },
  ];

  return `
    <div class="screen active" id="screen-worker-profile" style="background:var(--bg-secondary); min-height:100vh; display:flex; flex-direction:column;">
      
      <div class="scroll-content pb-nav" style="flex:1; overflow-y:auto;">
        
        <!-- Profile Header -->
        <div style="background:linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%); padding:40px 20px 60px; text-align:center; position:relative; overflow:hidden;">
          <div style="position:absolute; top:-40px; right:-40px; width:160px; height:160px; background:rgba(255,255,255,0.05); border-radius:50%;"></div>
          
          <div onclick="showToast('Cập nhật ảnh', 'info')" style="width:88px; height:88px; border-radius:50%; border:3px solid rgba(255,255,255,0.3); margin:0 auto 12px; background:var(--primary-gradient); display:flex; align-items:center; justify-content:center; font-size:36px; font-weight:700; color:white; cursor:pointer; position:relative;">
            ${getInitials(worker.name)}
            <div style="position:absolute; bottom:2px; right:2px; width:24px; height:24px; background:var(--primary); border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid #1A1A2E;">
              <i class="fas fa-camera" style="font-size:9px; color:white;"></i>
            </div>
          </div>
          <h2 style="font-size:22px; font-weight:800; color:white; margin-bottom:4px;">${worker.name}</h2>
          <p style="font-size:13px; color:rgba(255,255,255,0.65);">${worker.serviceName} • ${worker.experience}</p>
          <div style="margin-top:8px; display:flex; justify-content:center; gap:8px;">
            <span style="background:rgba(255,255,255,0.1); color:rgba(255,255,255,0.85); font-size:11px; font-weight:700; padding:3px 10px; border-radius:var(--radius-full); display:flex; align-items:center; gap:4px;">
              <i class="fas fa-check-circle" style="color:var(--success);"></i> Đã xác minh
            </span>
            <span style="background:${AppState.worker.isOnline ? 'rgba(39,174,96,0.2)' : 'rgba(255,255,255,0.1)'}; color:${AppState.worker.isOnline ? '#4CD964' : 'rgba(255,255,255,0.6)'}; font-size:11px; font-weight:700; padding:3px 10px; border-radius:var(--radius-full);">
              ${AppState.worker.isOnline ? '🟢 Đang sẵn sàng' : '⚫ Ngoại tuyến'}
            </span>
          </div>
        </div>
        
        <div style="margin:-28px 16px 0; position:relative; z-index:10;">
          
          <!-- Stats -->
          <div style="background:white; border-radius:var(--radius-lg); padding:16px; display:grid; grid-template-columns:repeat(3,1fr); box-shadow:var(--shadow-md); margin-bottom:12px;">
            ${[
      [worker.rating + ' ⭐', 'Đánh giá'],
      [worker.totalJobs, 'Tổng đơn'],
      [formatCurrency(worker.monthEarnings), 'Tháng này'],
    ].map(([val, label]) => `
              <div style="text-align:center; padding:0 6px; border-right:1px solid var(--border-light);">
                <div style="font-size:16px; font-weight:800; color:var(--text-primary); margin-bottom:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${val}</div>
                <div style="font-size:11px; color:var(--text-tertiary);">${label}</div>
              </div>
            `).join('')}
          </div>
          
          <!-- Menu -->
          <div style="background:white; border-radius:var(--radius-lg); overflow:hidden; margin-bottom:12px; box-shadow:var(--shadow-sm);">
            ${menuItems.map((item, i) => `
              <button onclick="${item.action}" style="display:flex; align-items:center; gap:12px; padding:14px 16px; width:100%; border:none; background:none; cursor:pointer; text-align:left; font-family:inherit; border-bottom:${i < menuItems.length - 1 ? '1px solid var(--border-light)' : 'none'}; transition:background 0.2s;">
                <div style="width:38px; height:38px; background:${item.bg}; border-radius:10px; display:flex; align-items:center; justify-content:center; font-size:18px; flex-shrink:0;">
                  ${item.icon}
                </div>
                <div style="flex:1;">
                  <div style="font-size:14px; font-weight:600; color:${item.danger ? 'var(--danger)' : 'var(--text-primary)'};">${item.label}</div>
                  ${item.sub ? `<div style="font-size:12px; color:var(--text-tertiary); margin-top:1px;">${item.sub}</div>` : ''}
                </div>
                <i class="fas fa-chevron-right" style="color:${item.danger ? 'var(--danger)' : 'var(--text-tertiary)'}; font-size:12px;"></i>
              </button>
            `).join('')}
          </div>
          
        </div>
        
      </div>
      
      ${buildWorkerNav('profile')}
    </div>
  `;
}

// ---- WORKER EVENT HANDLERS ----

window.navigateWorker = function (tab) {
  AppState.worker.activeTab = tab;
  const map = {
    'home': 'worker-home',
    'jobs': 'worker-jobs',
    'earnings': 'worker-earnings',
    'chat': 'worker-chat',
    'profile': 'worker-profile',
  };
  showScreen(map[tab] || 'worker-home');
};

window.toggleOnlineStatus = function () {
  AppState.worker.isOnline = !AppState.worker.isOnline;
  const status = AppState.worker.isOnline;
  showToast(status ? '🟢 Bạn đang sẵn sàng nhận việc!' : '⚫ Đã tắt nhận việc', status ? 'success' : 'info');
  // Re-render to update
  showScreen('worker-home');
};

window.acceptJob = async function (jobId) {
  showLoading();
  await delay(800);
  hideLoading();

  const now = new Date();
  const timeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const timestamp = now.toISOString();

  if (window.socket) {
    window.socket.emit('worker_accept_job', {
      jobId: jobId,
      workerId: AppState.worker.data?.id,
      time: timeStr,
      timestamp: timestamp
    });
  }

  // Check storage first to get latest
  if (typeof loadMockDataFromStorage === 'function') loadMockDataFromStorage();

  const jobIndex = MOCK_DATA.jobRequests.findIndex(j => j.id === jobId);
  if (jobIndex > -1) {
    const job = MOCK_DATA.jobRequests[jobIndex];
    MOCK_DATA.workerJobs.unshift({
      ...job,
      status: 'confirmed',
      acceptedAt: timestamp
    });
    // Remove from pending completely
    MOCK_DATA.jobRequests.splice(jobIndex, 1);

    // Update local AppState for the current session to render correctly
    // Normally would fetch again, here we mutate
    if (AppState.worker.currentJobs) {
      AppState.worker.currentJobs = MOCK_DATA.workerJobs;
    }
  }

  if (typeof syncMockDataToStorage === 'function') {
    syncMockDataToStorage();
  }

  showToast('✅ Đã nhận đơn! Hãy đến đúng giờ hẹn.', 'success');
  showScreen('worker-home');
};

window.rejectJob = async function (jobId) {
  showLoading();
  await delay(500);
  hideLoading();

  const now = new Date();
  const timeStr = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  const timestamp = now.toISOString();

  if (window.socket) {
    window.socket.emit('worker_reject_job', {
      jobId: jobId,
      workerId: AppState.worker.data?.id,
      time: timeStr,
      timestamp: timestamp
    });
  }

  if (typeof loadMockDataFromStorage === 'function') loadMockDataFromStorage();

  MOCK_DATA.jobRequests = MOCK_DATA.jobRequests.filter(j => j.id !== jobId);

  if (typeof syncMockDataToStorage === 'function') {
    syncMockDataToStorage();
  }

  showToast('Đã từ chối đơn hàng', 'info');
  showScreen('worker-home');
};

window.viewWorkerJob = function (jobId) {
  AppState.worker.selectedJobId = jobId;
  showScreen('worker-job-detail');
};

window.filterWorkerJobs = function (filter, el) {
  el.parentElement.querySelectorAll('button').forEach(b => {
    b.style.color = 'var(--text-tertiary)';
    b.style.borderBottomColor = 'transparent';
  });
  el.style.color = 'var(--primary)';
  el.style.borderBottomColor = 'var(--primary)';
  showToast(`Lọc: ${filter}`, 'info');
};

window.completeJob = async function (jobId) {
  showLoading();
  await delay(1000);
  hideLoading();

  AppState.worker.data.completedToday++;
  AppState.worker.data.todayEarnings += 280000;

  showToast('🎉 Đơn hoàn thành! +280.000đ', 'success');
  showScreen('worker-jobs');
};

window.callCustomer = function (jobId) {
  showToast('Đang gọi khách hàng...', 'info');
};

window.showMap = function (address) {
  showToast(`Đang mở Google Maps: ${address}`, 'info');
};

window.pickProofImages = function () {
  showToast('Tính năng chụp ảnh cần thiết bị thực', 'info');
  const previews = document.getElementById('proof-previews');
  if (previews && previews.children.length === 0) {
    for (let i = 0; i < 2; i++) {
      const div = document.createElement('div');
      div.style.cssText = `width:72px; height:72px; border-radius:8px; background:${i === 0 ? '#E8F5E9' : '#E3F2FD'}; display:flex; align-items:center; justify-content:center; font-size:28px;`;
      div.innerHTML = i === 0 ? '📸' : '🔧';
      previews.appendChild(div);
    }
  }
};

// Worker Chat (reuse customer chat structure)
window.renderWorkerChat = function () {
  return `
    <div class="screen active" id="screen-worker-chat" style="background:var(--bg-secondary); min-height:100vh; display:flex; flex-direction:column;">
      ${buildHeader({ title: 'Tin nhắn', showBack: false, style: 'orange' })}
      <div class="scroll-content pb-nav" style="flex:1; overflow-y:auto;">
        <div style="background:white;">
          ${MOCK_DATA.chatConversations.map(conv => buildChatItem(conv)).join('')}
        </div>
      </div>
      ${buildWorkerNav('chat')}
    </div>
  `;
};
