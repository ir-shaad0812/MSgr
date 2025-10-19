/* ============================================
   CONFIG - Application Configuration
   Purpose: Central configuration for the app
   ============================================ */

const AppConfig = {
    // WebRTC Configuration
    rtc: {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' },
            { urls: 'stun:stun2.l.google.com:19302' }
        ]
    },

    // Media Constraints
    media: {
        video: {
            width: { ideal: 1280 },
            height: { ideal: 720 }
        },
        audio: true
    },

    // Chat Settings
    chat: {
        maxMessageLength: 500,
        emptyStateMessage: 'No messages yet. Start chatting!'
    },

    // UI Messages
    messages: {
        connecting: 'Connecting...',
        connected: 'Connected',
        disconnected: 'Disconnected',
        callStarting: 'Starting call...',
        callRinging: 'Calling...',
        callConnected: 'Call connected',
        callEnded: 'Call ended',
        callFailed: 'Call failed',
        ready: 'Ready to connect'
    }
};

// Make config globally accessible
window.AppConfig = AppConfig;
