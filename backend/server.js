const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// In-memory Database
const globalState = {
    jobRequests: [],
    orders: []
};

// REST API Endpoints
app.get('/api/data/home', (req, res) => {
    // Stub categories just to bypass frontend check
    res.json({ categories: [], services: [], banners: [] });
});

app.get('/api/user/profile', (req, res) => {
    res.json({ id: 'GUEST', role: 'CUSTOMER', name: 'Guest' }); // Dummy user to allow join
});

app.get('/api/orders', (req, res) => {
    res.json(globalState.orders);
});

app.post('/api/orders', (req, res) => {
    const data = req.body;
    const newId = 'TD-' + Math.floor(10000 + Math.random() * 90000);

    const newOrder = {
        id: newId,
        service: data.serviceName || 'Dịch vụ',
        worker: { name: 'Đang xếp thợ...', id: null },
        status: 'pending',
        date: new Date().toISOString(),
        timeSlot: '10:00',
        address: data.address || 'Địa chỉ mặc định',
        totalPrice: data.price || 150000,
        note: data.note || ''
    };

    const newJobRequest = {
        id: newId,
        service: data.serviceName || 'Dịch vụ',
        customerName: 'Khách hàng Ứng dụng',
        address: data.address || 'Địa chỉ mặc định',
        distance: '1.2',
        scheduledTime: '10:00',
        scheduledDate: 'Hôm nay',
        price: data.price || 150000,
        timeRemaining: 30,
        description: data.note || ''
    };

    globalState.orders.unshift(newOrder);
    globalState.jobRequests.unshift(newJobRequest);

    // Broadcast to all connected workers
    io.emit('new_job_request', newJobRequest);

    res.json(newOrder);
});

// WebSockets
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('join', (data) => {
        console.log(`User joined: Role ${data.role}, ID: ${data.userId}`);
        socket.join(data.role.toLowerCase());
    });

    socket.on('worker_accept_job', (data) => {
        console.log('Worker accepted job:', data);

        // Remove from job requests
        globalState.jobRequests = globalState.jobRequests.filter(j => j.id !== data.jobId);

        // Broadcast to customer that their order was accepted
        io.emit('job_accepted', {
            jobId: data.jobId,
            workerId: data.workerId,
            time: data.time
        });
    });

    socket.on('worker_reject_job', (data) => {
        console.log('Worker rejected job:', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3015;
server.listen(PORT, () => {
    console.log(`ThoDung Backend running on port ${PORT}`);
});
