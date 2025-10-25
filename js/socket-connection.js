/* ============================================
   SOCKET CONNECTION - WebSocket Management
   Purpose: Handle Socket.IO connections
   ============================================ */

const SocketConnection = {
    socket: null,
    isConnected: false,

    // Initialize Socket.IO connection
    init() {
        this.socket = io();
        this.setupListeners();
        return this.socket;
    },

    // Setup socket event listeners
    setupListeners() {
        this.socket.on('connect', () => {
            this.isConnected = true;
            console.log('✅ Connected to server. Socket ID:', this.socket.id);
            UIController.updateCallStatus(AppConfig.messages.connected, 'connected');
        });

        this.socket.on('disconnect', () => {
            this.isConnected = false;
            console.log('❌ Disconnected from server');
            UIController.updateCallStatus(AppConfig.messages.disconnected, 'error');
        });

        this.socket.on('error', (error) => {
            console.error('❌ Socket error:', error);
        });
    },

    // Get socket instance
    getSocket() {
        return this.socket;
    },

    // Check connection status
    isSocketConnected() {
        return this.isConnected && this.socket.connected;
    }
};

// Make globally accessible
window.SocketConnection = SocketConnection;
