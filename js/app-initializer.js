/* ============================================
   APP INITIALIZER - Application Bootstrap
   Purpose: Initialize and start the application
   ============================================ */

const AppInitializer = {
    // Initialize the entire application
    init() {
        console.log('🚀 Initializing Messenger Application...');

        try {
            // Initialize Socket Connection
            const socket = SocketConnection.init();

            // Initialize Chat Module
            ChatMessaging.init(socket);

            // Initialize Video Call Module
            WebRTCVideoCall.init(socket);

            console.log('✅ Application initialized successfully');

        } catch (error) {
            console.error('❌ Failed to initialize application:', error);
            UIController.handleError(error, 'Application Initialization');
        }
    }
};

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        AppInitializer.init();
    });
} else {
    AppInitializer.init();
}
