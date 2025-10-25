/* ============================================
   CHAT MESSAGING - Chat Functionality
   Purpose: Handle all chat messaging features
   ============================================ */

const ChatMessaging = {
    socket: null,
    messageInput: null,

    // Initialize chat module
    init(socket) {
        this.socket = socket;
        this.messageInput = document.getElementById('messageInput');
        this.setupEventListeners();
        this.setupSocketListeners();
        this.showEmptyState();
    },

    // Setup DOM event listeners
    setupEventListeners() {
        const sendButton = document.getElementById('sendButton');
        
        // Send button click
        sendButton.addEventListener('click', () => this.sendMessage());

        // Enter key to send (Shift+Enter for new line)
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
    },

    // Setup socket listeners for incoming messages
    setupSocketListeners() {
        this.socket.on('message', (data) => {
            if (data.sender !== this.socket.id) {
                this.displayMessage(data.text, 'received');
            }
        });
    },

    // Send a message
    sendMessage() {
        const message = this.messageInput.value.trim();

        if (message === '') {
            return;
        }

        // Remove empty state if exists
        this.removeEmptyState();

        // Display message locally
        this.displayMessage(message, 'sent');

        // Send to server
        this.socket.emit('message', {
            text: message,
            sender: this.socket.id,
            timestamp: new Date().toISOString()
        });

        // Clear input
        this.messageInput.value = '';
        this.messageInput.style.height = 'auto';
    },

    // Display a message in the chat
    displayMessage(text, type) {
        const chatMessages = document.getElementById('chatMessages');
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${type}`;
        messageDiv.textContent = text;
        
        chatMessages.appendChild(messageDiv);
        
        // Auto-scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    },

    // Show empty state message
    showEmptyState() {
        const chatMessages = document.getElementById('chatMessages');
        if (chatMessages.children.length === 0) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'chat-empty-state';
            emptyDiv.id = 'emptyState';
            emptyDiv.textContent = AppConfig.chat.emptyStateMessage;
            chatMessages.appendChild(emptyDiv);
        }
    },

    // Remove empty state
    removeEmptyState() {
        const emptyState = document.getElementById('emptyState');
        if (emptyState) {
            emptyState.remove();
        }
    }
};

// Make globally accessible
window.ChatMessaging = ChatMessaging;
