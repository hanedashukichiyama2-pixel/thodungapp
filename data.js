// =============================================
// THỢ ĐỤNG APP - MOCK DATA
// =============================================

const MOCK_DATA = {
  // Current user (customer)
  customer: {
    id: 'U001',
    name: 'Nguyễn Văn An',
    phone: '0869159615',
    email: 'an.nguyen@gmail.com',
    address: '123 Lê Lợi, Quận 1, TP.HCM',
    avatar: null,
    loyaltyPoints: 1250,
    totalOrders: 18,
    memberLevel: 'Gold',
    joinDate: '2023-06-15',
  },

  // Worker profile
  worker: {
    id: 'W001',
    name: 'Trần Văn Hùng',
    phone: '0987654321',
    email: 'hung.tran@gmail.com',
    avatar: null,
    serviceName: 'Thợ điện dân dụng',
    rating: 4.8,
    totalJobs: 312,
    experience: '5 năm kinh nghiệm',
    isOnline: false,
    todayEarnings: 850000,
    weekEarnings: 4200000,
    monthEarnings: 12500000,
    completedToday: 2,
    cancelledToday: 0,
  },

  // Admin profile
  admin: {
    id: 'A001',
    name: 'Admin Thợ Đụng',
    level: 'Super Admin',
  },

  // Service categories
  categories: [
    { id: 'cat01', name: 'Điện', icon: '⚡', color: '#FFF3C4', iconColor: '#F59E0B' },
    { id: 'cat02', name: 'Nước', icon: '🔧', color: '#DBEAFE', iconColor: '#3B82F6' },
    { id: 'cat03', name: 'Điện lạnh', icon: '❄️', color: '#D1FAE5', iconColor: '#10B981' },
    { id: 'cat04', name: 'Đồ gỗ', icon: '🪚', color: '#FED7AA', iconColor: '#F97316' },
    { id: 'cat05', name: 'Vệ sinh', icon: '🧹', color: '#EDE9FE', iconColor: '#8B5CF6' },
    { id: 'cat06', name: 'Sơn nhà', icon: '🖌️', color: '#FCE7F3', iconColor: '#EC4899' },
    { id: 'cat07', name: 'Xây dựng', icon: '🏗️', color: '#F3F4F6', iconColor: '#6B7280' },
    { id: 'cat08', name: 'Khác', icon: '🔨', color: '#F5F3FF', iconColor: '#7C3AED' },
  ],

  // Services list
  services: [
    {
      id: 'svc01',
      name: 'Sửa điện dân dụng',
      category: 'cat01',
      icon: '⚡',
      basePrice: 150000,
      priceUnit: '/công thợ',
      description: 'Sửa điện sinh hoạt, thay dây điện, lắp ổ cắm, CB...',
      rating: 4.8,
      totalBookings: 1240,
      workers: ['w001', 'w002', 'w003'],
      estimatedTime: '1-2 giờ',
    },
    {
      id: 'svc02',
      name: 'Điện lạnh & Điều hòa',
      category: 'cat03',
      icon: '❄️',
      basePrice: 200000,
      priceUnit: '/lần',
      description: 'Vệ sinh điều hòa, sửa chữa, nạp gas, lắp mới...',
      rating: 4.9,
      totalBookings: 980,
      workers: ['w004', 'w005'],
      estimatedTime: '1-3 giờ',
    },
    {
      id: 'svc03',
      name: 'Sửa đường nước',
      category: 'cat02',
      icon: '🔧',
      basePrice: 150000,
      priceUnit: '/công thợ',
      description: 'Thông cống, sửa vòi nước, lắp đường ống, chống thấm...',
      rating: 4.7,
      totalBookings: 750,
      workers: ['w006', 'w007'],
      estimatedTime: '1-2 giờ',
    },
    {
      id: 'svc04',
      name: 'Dọn dẹp vệ sinh',
      category: 'cat05',
      icon: '🧹',
      basePrice: 200000,
      priceUnit: '/ca',
      description: 'Vệ sinh nhà ở, văn phòng, sau xây dựng, định kỳ...',
      rating: 4.6,
      totalBookings: 620,
      workers: ['w008', 'w009', 'w010'],
      estimatedTime: '2-4 giờ',
    },
    {
      id: 'svc05',
      name: 'Sửa chữa đồ gỗ',
      category: 'cat04',
      icon: '🪚',
      basePrice: 180000,
      priceUnit: '/công thợ',
      description: 'Sửa ghế sofa, bàn gỗ, tủ gỗ, cửa gỗ...',
      rating: 4.7,
      totalBookings: 410,
      workers: ['w011', 'w012'],
      estimatedTime: '1-3 giờ',
    },
    {
      id: 'svc06',
      name: 'Sơn nhà',
      category: 'cat06',
      icon: '🖌️',
      basePrice: 300000,
      priceUnit: '/ngày',
      description: 'Sơn tường, sơn trần, sơn cửa, sơn sắt...',
      rating: 4.8,
      totalBookings: 290,
      workers: ['w013'],
      estimatedTime: 'Theo diện tích',
    },
  ],

  // Workers list
  workers: [
    {
      id: 'w001',
      name: 'Nguyễn Văn A',
      avatar: null,
      initial: 'A',
      service: 'Thợ điện',
      rating: 4.9,
      reviews: 234,
      distance: '1.2',
      totalJobs: 890,
      isOnline: true,
      experience: '7 năm',
      verified: true,
    },
    {
      id: 'w002',
      name: 'Trần Văn B',
      avatar: null,
      initial: 'B',
      service: 'Thợ điện lạnh',
      rating: 4.8,
      reviews: 189,
      distance: '2.4',
      totalJobs: 652,
      isOnline: true,
      experience: '5 năm',
      verified: true,
    },
    {
      id: 'w003',
      name: 'Lê Thị C',
      avatar: null,
      initial: 'C',
      service: 'Dịch vụ dọn dẹp',
      rating: 4.7,
      reviews: 156,
      distance: '0.8',
      totalJobs: 421,
      isOnline: false,
      experience: '3 năm',
      verified: true,
    },
    {
      id: 'w004',
      name: 'Phạm Văn D',
      avatar: null,
      initial: 'D',
      service: 'Thợ nước',
      rating: 4.8,
      reviews: 201,
      distance: '3.1',
      totalJobs: 588,
      isOnline: true,
      experience: '6 năm',
      verified: true,
    },
    {
      id: 'w005',
      name: 'Hoàng Thị E',
      avatar: null,
      initial: 'E',
      service: 'Thợ mộc',
      rating: 4.9,
      reviews: 98,
      distance: '1.7',
      totalJobs: 203,
      isOnline: false,
      experience: '4 năm',
      verified: false,
    },
  ],

  // Banners
  banners: [
    {
      id: 'b01',
      tag: 'Ưu đãi mới',
      title: 'Giảm 50%\nĐơn đầu tiên',
      desc: 'Áp dụng cho tất cả dịch vụ điện',
      gradient: 'linear-gradient(135deg, var(--primary) 0%, #FF4500 100%)',
    },
    {
      id: 'b02',
      tag: 'Flash Sale',
      title: 'Vệ sinh máy lạnh\nChỉ 99k',
      desc: 'Còn 3 ngày - Đặt ngay',
      gradient: 'linear-gradient(135deg, #1A1A2E 0%, #2D2D44 100%)',
    },
    {
      id: 'b03',
      tag: 'Mới',
      title: 'Dịch vụ sơn nhà\nTrọn gói',
      desc: 'Báo giá miễn phí tại nhà',
      gradient: 'linear-gradient(135deg, #00B4D8 0%, #0077B6 100%)',
    },
  ],

  // Customer orders
  orders: [
    {
      id: 'TD-10255',
      service: 'Sửa điện dân dụng',
      worker: { name: 'Nguyễn Văn A', id: 'w001' },
      customer: { name: 'Nguyễn Văn An', id: 'U001' },
      status: 'in-progress',
      date: '2026-04-12',
      timeSlot: '09:00 - 11:00',
      address: '123 Lê Lợi, Quận 1',
      totalPrice: 350000,
      note: 'Bị chập điện phòng khách, đèn não nhấp nháy',
      createdAt: '2026-04-12T08:00:00',
      statusHistory: [
        { status: 'placed', time: '08:00', label: 'Đơn đã đặt' },
        { status: 'confirmed', time: '08:05', label: 'Thợ xác nhận' },
        { status: 'going', time: '08:30', label: 'Thợ đang đến' },
        { status: 'in-progress', time: '09:10', label: 'Đang thực hiện', active: true },
      ],
    },
    {
      id: 'TD-10240',
      service: 'Vệ sinh điều hòa',
      worker: { name: 'Trần Văn B', id: 'w002' },
      customer: { name: 'Nguyễn Văn An', id: 'U001' },
      status: 'completed',
      date: '2026-04-08',
      timeSlot: '14:00 - 16:00',
      address: '123 Lê Lợi, Quận 1',
      totalPrice: 280000,
      note: '',
      createdAt: '2026-04-08T13:00:00',
    },
    {
      id: 'TD-10201',
      service: 'Thông cống',
      worker: { name: 'Phạm Văn D', id: 'w004' },
      customer: { name: 'Nguyễn Văn An', id: 'U001' },
      status: 'completed',
      date: '2026-04-01',
      timeSlot: '10:00 - 12:00',
      address: '123 Lê Lợi, Quận 1',
      totalPrice: 220000,
      note: '',
      createdAt: '2026-04-01T09:00:00',
    },
    {
      id: 'TD-10180',
      service: 'Dọn dẹp nhà',
      worker: { name: 'Lê Thị C', id: 'w003' },
      customer: { name: 'Nguyễn Văn An', id: 'U001' },
      status: 'cancelled',
      date: '2026-03-28',
      timeSlot: '08:00 - 12:00',
      address: '123 Lê Lợi, Quận 1',
      totalPrice: 400000,
      note: '',
      createdAt: '2026-03-28T07:00:00',
    },
  ],

  // Worker job requests
  jobRequests: [
    {
      id: 'TD-10260',
      service: 'Sửa điện dân dụng',
      customerName: 'Hoàng Thị Mai',
      address: 'Số 45, Trần Hưng Đạo, Q5',
      distance: '1.8',
      scheduledTime: '10:30',
      scheduledDate: 'Hôm nay',
      price: 250000,
      timeRemaining: 28,
      description: 'Bị chập điện ổ cắm phòng ngủ',
    },
  ],

  // Worker jobs (assigned)
  workerJobs: [
    {
      id: 'TD-10255',
      service: 'Sửa điện dân dụng',
      customerName: 'Nguyễn Thị Mai',
      address: '123 Lê Lợi, Q1',
      distance: '1.2',
      scheduledTime: '09:00',
      scheduledDate: 'Hôm nay',
      status: 'confirmed',
      price: 350000,
    },
    {
      id: 'TD-10248',
      service: 'Lắp ổ cắm',
      customerName: 'Lê Văn Bình',
      address: '78 Điện Biên Phủ, Q3',
      distance: '3.4',
      scheduledTime: '14:00',
      scheduledDate: 'Hôm nay',
      status: 'confirmed',
      price: 150000,
    },
  ],

  // Vouchers
  vouchers: [
    {
      code: 'THODUNG50',
      name: 'Giảm 50% đơn đầu tiên',
      discount: '50%',
      type: 'percent',
      value: 50,
      maxDiscount: 100000,
      minOrder: 150000,
      expiry: '31/12/2026',
      used: 130,
      limit: 200,
      status: 'active',
    },
    {
      code: 'WELCOME10',
      name: 'Giảm 10% không giới hạn',
      discount: '10%',
      type: 'percent',
      value: 10,
      maxDiscount: 20000,
      minOrder: 100000,
      expiry: '30/11/2026',
      used: 250,
      limit: 1000,
      status: 'active',
    },
    {
      code: 'SUMMER23',
      name: 'Giảm 20.000đ mùa hè',
      discount: '20k',
      type: 'fixed',
      value: 20000,
      maxDiscount: 20000,
      minOrder: 200000,
      expiry: '01/08/2026',
      used: 500,
      limit: 500,
      status: 'expired',
    },
  ],

  // Notifications
  notifications: [
    {
      id: 'n01',
      type: 'order',
      icon: '🔧',
      iconBg: '#FFF3E8',
      title: 'Thợ đang trên đường đến',
      message: 'Anh Nguyễn Văn A đang di chuyển đến địa chỉ của bạn. Dự kiến đến lúc 09:10',
      time: '5 phút trước',
      unread: true,
      orderId: 'TD-10255',
    },
    {
      id: 'n02',
      type: 'promo',
      icon: '🎉',
      iconBg: '#FFF3C4',
      title: 'Ưu đãi đặc biệt tuần này!',
      message: 'Giảm 30% dịch vụ vệ sinh điều hòa. Áp dụng đến 15/04/2026',
      time: '1 giờ trước',
      unread: true,
      orderId: null,
    },
    {
      id: 'n03',
      type: 'system',
      icon: '✅',
      iconBg: '#D1FAE5',
      title: 'Đơn hàng hoàn thành',
      message: 'Đơn #TD-10240 đã hoàn thành. Hãy đánh giá dịch vụ để giúp thợ nhận thêm việc nhé!',
      time: '2 giờ trước',
      unread: false,
      orderId: 'TD-10240',
    },
    {
      id: 'n04',
      type: 'points',
      icon: '⭐',
      iconBg: '#EDE9FE',
      title: 'Nhận được 350 điểm thưởng',
      message: 'Bạn đã nhận 350 điểm từ đơn hàng #TD-10240. Điểm hiện tại: 1.250',
      time: 'Hôm qua',
      unread: false,
      orderId: null,
    },
  ],

  // Admin statistics
  adminStats: {
    revenue: { value: '150.0 tr', change: 12, trend: 'up' },
    profit: { value: '15.0 tr', change: 5, trend: 'up' },
    orders: { value: '320', change: -2, trend: 'down' },
    avgPrice: { value: '468k', change: 8, trend: 'up' },
    commission: 20,
  },

  // Admin orders (all)
  adminOrders: [
    { id: 'TD-10260', customer: 'Hoàng Thị Mai', worker: 'Nguyễn Văn A', service: 'Sửa điện', status: 'pending', price: 250000, date: '12/04' },
    { id: 'TD-10255', customer: 'Nguyễn Văn An', worker: 'Trần Văn A', service: 'Sửa điện', status: 'in-progress', price: 350000, date: '12/04' },
    { id: 'TD-10240', customer: 'Lê Thanh Tùng', worker: 'Phạm Văn C', service: 'ĐH', status: 'completed', price: 280000, date: '08/04' },
    { id: 'TD-10220', customer: 'Trần Thị Thu', worker: 'Đỗ Văn M', service: 'Nước', status: 'cancelled', price: 180000, date: '05/04' },
    { id: 'TD-10201', customer: 'Nguyễn Văn An', worker: 'Phạm Văn D', service: 'Nước', status: 'completed', price: 220000, date: '01/04' },
  ],

  // Admin workers list
  adminWorkers: [
    { id: 'w001', name: 'Nguyễn Văn A', service: 'Điện', rating: 4.9, jobs: 890, revenue: '24.5 tr', status: 'active', verified: true },
    { id: 'w002', name: 'Trần Văn B', service: 'Điện lạnh', rating: 4.8, jobs: 652, revenue: '18.2 tr', status: 'active', verified: true },
    { id: 'w003', name: 'Lê Thị C', service: 'Dọn dẹp', rating: 4.7, jobs: 421, revenue: '15.9 tr', status: 'active', verified: true },
    { id: 'w004', name: 'Phạm Văn D', service: 'Nước', rating: 4.8, jobs: 588, revenue: '19.3 tr', status: 'inactive', verified: true },
    { id: 'w005', name: 'Hoàng E', service: 'Mộc', rating: 4.9, jobs: 203, revenue: '9.8 tr', status: 'active', verified: false },
  ],

  // Chat messages
  chatConversations: [
    {
      id: 'conv01',
      name: 'Nguyễn Văn A (Thợ điện)',
      lastMessage: 'Tôi sẽ đến lúc 9 giờ sáng ạ',
      time: '08:32',
      unread: 2,
      orderId: 'TD-10255',
    },
    {
      id: 'conv02',
      name: 'Trần Văn B (Thợ điện lạnh)',
      lastMessage: 'Dạ cảm ơn khách ạ, hẹn gặp lại!',
      time: 'Hôm qua',
      unread: 0,
      orderId: 'TD-10240',
    },
    {
      id: 'conv03',
      name: 'Hỗ trợ khách hàng',
      lastMessage: 'Chúng tôi đã nhận được phản ánh của bạn...',
      time: '2 ngày',
      unread: 0,
      orderId: null,
    },
  ],

  chatMessages: {
    conv01: [
      { id: 'm01', text: 'Chào anh, tôi là thợ được phân công đơn hàng TD-10255', type: 'received', time: '08:20' },
      { id: 'm02', text: 'Chào anh, anh đến lúc mấy giờ?', type: 'sent', time: '08:22' },
      { id: 'm03', text: 'Dạ tôi đang chuẩn bị đồ nghề, khoảng 9h tôi có mặt ạ', type: 'received', time: '08:25' },
      { id: 'm04', text: 'Tôi sẽ đến lúc 9 giờ sáng ạ', type: 'received', time: '08:32' },
    ],
    conv02: [
      { id: 'm01', text: 'Máy lạnh đã sạch và hoạt động tốt ạ', type: 'received', time: 'Hôm qua 16:30' },
      { id: 'm02', text: 'Cảm ơn anh nhiều nhé!', type: 'sent', time: 'Hôm qua 16:35' },
      { id: 'm03', text: 'Dạ cảm ơn khách ạ, hẹn gặp lại!', type: 'received', time: 'Hôm qua 16:40' },
    ],
    conv03: [
      { id: 'm01', text: 'Tôi muốn phản ánh về chất lượng dịch vụ', type: 'sent', time: '2 ngày trước' },
      { id: 'm02', text: 'Chúng tôi đã nhận được phản ánh của bạn. Đội ngũ sẽ liên hệ lại trong 24h.', type: 'received', time: '2 ngày trước' },
    ],
  },

  // Complaints / Reviews
  complaints: [
    {
      id: 'KN-4503',
      orderId: 'TD-10240',
      type: 'Thái độ phục vụ',
      content: '"Thợ nói chuyện cộc lốc, không hướng dẫn sử dụng sau khi sửa chữa..."',
      customer: 'Lê Thanh Tùng',
      worker: 'Phạm Văn Cường',
      status: 'Trung bình',
      statusColor: 'warning',
    },
    {
      id: 'KN-4508',
      orderId: 'TD-10255',
      type: 'Đơn trễ giờ hẹn',
      content: '"Thợ đến trễ 30 phút so với giờ hẹn nhưng không gửi thông báo trước..."',
      customer: 'Hoàng Thị Lan',
      worker: 'Đỗ Văn Minh',
      status: 'Thấp',
      statusColor: 'success',
    },
    {
      id: 'KN-4490',
      orderId: 'TD-10201',
      type: 'Hướng giờ đạc',
      content: '"Tính nguyên Thêm 50% cho khách hàng mà không báo trước..."',
      customer: 'Trần Văn Bình',
      worker: 'Lê Văn Nam',
      status: 'Đã đóng',
      statusColor: 'info',
    },
  ],
};

// Utility: Format currency VND
function formatCurrency(amount) {
  if (!amount) return '0đ';
  if (amount >= 1000000) {
    return (amount / 1000000).toFixed(1).replace('.0', '') + ' tr';
  }
  return amount.toLocaleString('vi-VN') + 'đ';
}

// Utility: Format date
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

// Status labels
const STATUS_LABELS = {
  'pending': 'Chờ xác nhận',
  'confirmed': 'Đã xác nhận',
  'in-progress': 'Đang thực hiện',
  'going': 'Thợ đang đến',
  'completed': 'Hoàn thành',
  'cancelled': 'Đã hủy',
};

// =============================================
// STORAGE SYNC (Local State interconnect)
// =============================================

function loadMockDataFromStorage() {
  const customOrders = localStorage.getItem('thodung_orders');
  if (customOrders) {
    MOCK_DATA.orders = JSON.parse(customOrders);
  }

  const customJobRequests = localStorage.getItem('thodung_jobRequests');
  if (customJobRequests) {
    MOCK_DATA.jobRequests = JSON.parse(customJobRequests);
  }

  const customWorkerJobs = localStorage.getItem('thodung_workerJobs');
  if (customWorkerJobs) {
    MOCK_DATA.workerJobs = JSON.parse(customWorkerJobs);
  }
}

function syncMockDataToStorage() {
  localStorage.setItem('thodung_orders', JSON.stringify(MOCK_DATA.orders));
  localStorage.setItem('thodung_jobRequests', JSON.stringify(MOCK_DATA.jobRequests));
  localStorage.setItem('thodung_workerJobs', JSON.stringify(MOCK_DATA.workerJobs));
}

// Initial hydration
loadMockDataFromStorage();
