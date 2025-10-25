/* ============================================
   WEBRTC VIDEO CALL - Video Call Functionality
   Purpose: Handle WebRTC peer-to-peer video calls
   ============================================ */

const WebRTCVideoCall = {
    socket: null,
    peerConnection: null,
    localStream: null,
    remoteStream: null,
    isCallActive: false,

    // Initialize video call module
    init(socket) {
        this.socket = socket;
        this.setupEventListeners();
        this.setupSocketListeners();
    },

    // Setup DOM event listeners
    setupEventListeners() {
        const startButton = document.getElementById('startCallButton');
        const endButton = document.getElementById('endCallButton');

        startButton.addEventListener('click', () => this.startCall());
        endButton.addEventListener('click', () => this.endCall());
    },

    // Setup socket listeners for WebRTC signaling
    setupSocketListeners() {
        this.socket.on('offer', (offer) => this.handleOffer(offer));
        this.socket.on('answer', (answer) => this.handleAnswer(answer));
        this.socket.on('ice-candidate', (candidate) => this.handleIceCandidate(candidate));
    },

    // Start a video call
    async startCall() {
        if (this.isCallActive) {
            console.log('⚠️ Call already active');
            return;
        }

        try {
            console.log('📞 Starting call...');
            UIController.updateCallStatus(AppConfig.messages.callStarting, 'connecting');

            // Get local media stream
            this.localStream = await navigator.mediaDevices.getUserMedia(AppConfig.media);
            this.displayLocalVideo();

            // Create peer connection
            this.createPeerConnection();

            // Create and send offer
            const offer = await this.peerConnection.createOffer();
            await this.peerConnection.setLocalDescription(offer);

            console.log('📤 Sending offer');
            this.socket.emit('offer', offer);

            this.isCallActive = true;
            UIController.updateCallStatus(AppConfig.messages.callRinging, 'connecting');

        } catch (error) {
            console.error('❌ Error starting call:', error);
            UIController.updateCallStatus(AppConfig.messages.callFailed, 'error');
            alert('Could not access camera/microphone. Please check permissions.');
        }
    },

    // Handle incoming offer
    async handleOffer(offer) {
        if (this.peerConnection) {
            console.log('⚠️ Already in a call');
            return;
        }

        try {
            console.log('📞 Receiving call...');
            UIController.updateCallStatus(AppConfig.messages.callStarting, 'connecting');

            // Get local media stream
            this.localStream = await navigator.mediaDevices.getUserMedia(AppConfig.media);
            this.displayLocalVideo();

            // Create peer connection
            this.createPeerConnection();

            // Set remote description and create answer
            await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await this.peerConnection.createAnswer();
            await this.peerConnection.setLocalDescription(answer);

            console.log('📤 Sending answer');
            this.socket.emit('answer', answer);

            this.isCallActive = true;

        } catch (error) {
            console.error('❌ Error handling offer:', error);
            UIController.updateCallStatus(AppConfig.messages.callFailed, 'error');
        }
    },

    // Handle incoming answer
    async handleAnswer(answer) {
        try {
            console.log('📥 Received answer');
            await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        } catch (error) {
            console.error('❌ Error handling answer:', error);
        }
    },

    // Handle incoming ICE candidate
    async handleIceCandidate(candidate) {
        try {
            if (this.peerConnection) {
                console.log('🧊 Received ICE candidate');
                await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
            }
        } catch (error) {
            console.error('❌ Error adding ICE candidate:', error);
        }
    },

    // Create RTCPeerConnection
    createPeerConnection() {
        this.peerConnection = new RTCPeerConnection(AppConfig.rtc);

        // Add local stream tracks
        this.localStream.getTracks().forEach(track => {
            this.peerConnection.addTrack(track, this.localStream);
            console.log('➕ Added track:', track.kind);
        });

        // Handle remote tracks
        this.peerConnection.ontrack = (event) => {
            console.log('📺 Received remote track:', event.track.kind);
            this.handleRemoteTrack(event);
        };

        // Handle ICE candidates
        this.peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                console.log('🧊 Sending ICE candidate');
                this.socket.emit('ice-candidate', event.candidate);
            }
        };

        // Handle connection state changes
        this.peerConnection.onconnectionstatechange = () => {
            this.handleConnectionStateChange();
        };
    },

    // Handle remote track
    handleRemoteTrack(event) {
        if (!this.remoteStream) {
            this.remoteStream = new MediaStream();
            document.getElementById('remoteVideo').srcObject = this.remoteStream;
        }
        this.remoteStream.addTrack(event.track);
        UIController.updateCallStatus(AppConfig.messages.callConnected, 'connected');
    },

    // Handle connection state changes
    handleConnectionStateChange() {
        const state = this.peerConnection.connectionState;
        console.log('🔄 Connection state:', state);

        switch (state) {
            case 'connected':
                UIController.updateCallStatus(AppConfig.messages.callConnected, 'connected');
                break;
            case 'disconnected':
                UIController.updateCallStatus(AppConfig.messages.disconnected, 'error');
                break;
            case 'failed':
                UIController.updateCallStatus(AppConfig.messages.callFailed, 'error');
                this.endCall();
                break;
            case 'closed':
                UIController.updateCallStatus(AppConfig.messages.callEnded, 'error');
                break;
        }
    },

    // Display local video
    displayLocalVideo() {
        document.getElementById('localVideo').srcObject = this.localStream;
    },

    // End the call
    endCall() {
        console.log('📴 Ending call...');

        // Stop all local tracks
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => {
                track.stop();
                console.log('⏹️ Stopped track:', track.kind);
            });
        }

        // Close peer connection
        if (this.peerConnection) {
            this.peerConnection.close();
            this.peerConnection = null;
        }

        // Clear video elements
        document.getElementById('localVideo').srcObject = null;
        document.getElementById('remoteVideo').srcObject = null;

        // Reset state
        this.localStream = null;
        this.remoteStream = null;
        this.isCallActive = false;

        UIController.updateCallStatus(AppConfig.messages.callEnded, 'error');
        setTimeout(() => {
            UIController.updateCallStatus(AppConfig.messages.ready, 'ready');
        }, 2000);
    }
};

// Make globally accessible
window.WebRTCVideoCall = WebRTCVideoCall;
