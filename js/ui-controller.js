/* ============================================
   UI CONTROLLER - User Interface Updates
   Purpose: Handle all UI updates and interactions
   ============================================ */

const UIController = {
    // Update call status display
    updateCallStatus(message, statusClass) {
        const statusElement = document.getElementById('callStatus');
        if (statusElement) {
            statusElement.textContent = message;
            // Remove all status classes
            statusElement.className = 'call-status';
            // Add new status class
            if (statusClass) {
                statusElement.classList.add(`status-${statusClass}`);
            }
        }
    },

    // Show loading state
    showLoading(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.disabled = true;
            element.classList.add('loading');
        }
    },

    // Hide loading state
    hideLoading(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.disabled = false;
            element.classList.remove('loading');
        }
    },

    // Show notification
    showNotification(message, type = 'info') {
        console.log(`[${type.toUpperCase()}] ${message}`);
        // Could be extended to show toast notifications
    },

    // Handle errors
    handleError(error, context) {
        console.error(`❌ Error in ${context}:`, error);
        this.showNotification(`Error: ${error.message}`, 'error');
    }
};

// Make globally accessible
window.UIController = UIController;
