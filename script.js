/* ============================================
   SERVER - Express & Socket.IO Server
   Purpose: Handle server-side operations
   ============================================ */

const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

// Initialize Express App
const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// ============================================
// Middleware & Static Files
// ============================================

// Serve static files from root directory
app.use(express.static(__dirname));

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ============================================
// Socket.IO Event Handlers
// ============================================

io.on('connection', (socket) => {
    console.log(`✅ User connected: ${socket.id}`);

    // Handle chat messages
    socket.on('message', (data) => {
        console.log(`💬 Message from ${socket.id}:`, data.text);
        io.emit('message', data);
    });

    // Handle WebRTC offer
    socket.on('offer', (offer) => {
        console.log(`📤 Offer from ${socket.id}`);
        socket.broadcast.emit('offer', offer);
    });

    // Handle WebRTC answer
    socket.on('answer', (answer) => {
        console.log(`📥 Answer from ${socket.id}`);
        socket.broadcast.emit('answer', answer);
    });

    // Handle ICE candidates
    socket.on('ice-candidate', (candidate) => {
        console.log(`🧊 ICE candidate from ${socket.id}`);
        socket.broadcast.emit('ice-candidate', candidate);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`❌ User disconnected: ${socket.id}`);
    });
});

// ============================================
// Start Server
// ============================================

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    // console.log('========================================');
    console.log('🚀 Messenger Server Started');
    console.log(`📍 Server: http://localhost:${PORT}`);
    console.log('📝 Open multiple browser windows to test');
    // console.log('========================================');
});
