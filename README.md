# Messenger App


A real-time messaging application with video call functionality using WebRTC and Socket.IO.

## Features

- 💬 Real-time text messaging
- 📹 Video calling with WebRTC
- 🎨 Modern, responsive UI
- 🔄 Live connection status

## Installation

1. Install Node.js if you haven't already (https://nodejs.org/)

2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the server:
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

3. Open another browser window/tab (or use a different device on the same network) to test the chat and video call features.

## How to Use

### Chat
1. Type your message in the text area at the bottom
2. Press Enter or click "Send" to send the message
3. Messages will appear in the chat window

### Video Call
1. Click "Start Call" to initiate a video call
2. Grant camera and microphone permissions when prompted
3. The other user will automatically receive the call
4. Click "End Call" to terminate the call

## Requirements

- Node.js (v14 or higher)
- Modern web browser with WebRTC support (Chrome, Firefox, Safari, Edge)
- Camera and microphone access for video calls

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express
- **Real-time Communication**: Socket.IO
- **Video Calling**: WebRTC

## Notes

- For local testing, you can open multiple browser tabs
- For testing across devices, ensure they're on the same network
- The application uses Google's free STUN servers for WebRTC
- For production use, consider adding a TURN server for better connectivity

## Troubleshooting

**Video call not working?**
- Make sure you've granted camera/microphone permissions
- Check if your browser supports WebRTC
- Ensure both users have started the call

**Messages not sending?**
- Check if the server is running
- Verify the Socket.IO connection in browser console

## License

ISC License
