# Messenger Application

> A professional real-time messaging and video communication platform built with modern web technologies.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js](https://img.shields.io/badge/Node.js-v14+-green.svg)](https://nodejs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-v4.8.1-orange.svg)](https://socket.io/)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [API Documentation](#api-documentation)
- [Configuration](#configuration)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

The Messenger Application is a full-stack, real-time communication platform that enables users to engage in instant text messaging and peer-to-peer video calls. Built with a modular architecture, the application leverages WebSocket technology for low-latency communication and WebRTC protocols for high-quality video streaming.

**Live Demo:** http://localhost:3000 (after starting the server)

---

## ✨ Features

### Core Functionality

#### 💬 **Real-Time Messaging**
- Instant message delivery with bi-directional communication
- Message synchronization across all connected clients
- Character limit enforcement (500 characters)
- Message timestamping and sender identification
- Auto-scroll to latest messages
- Enter key and button send options

#### 📹 **Peer-to-Peer Video Calling**
- WebRTC-based video communication with NAT traversal
- High-definition video and audio streaming
- STUN/TURN server support for connectivity
- Local and remote video stream management
- One-click call initiation and termination
- Real-time call status indicators
- Automatic camera and microphone access handling

#### 🎨 **Modern User Interface**
- Responsive design for desktop and mobile devices
- Clean, intuitive layout with separated chat and video modules
- Smooth animations and transitions
- Visual feedback for user interactions
- Gradient backgrounds and modern aesthetics
- Accessibility-focused design patterns

#### 🔄 **Real-Time Connection Management**
- Socket.IO powered persistent connections
- Automatic reconnection handling
- Connection status monitoring
- Multi-client support with message broadcasting
- Efficient event-driven architecture

#### 🏗️ **Modular Architecture**
- Separation of concerns with dedicated modules
- Config-based application settings
- Independent socket connection management
- Isolated chat messaging logic
- Dedicated WebRTC video call handling
- Centralized UI controller
- Application initialization module

---

## 🏛️ Architecture

### System Design

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  ┌───────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │   HTML/CSS    │  │  JavaScript  │  │   WebRTC API    │  │
│  │   (View)      │  │   Modules    │  │   (Media)       │  │
│  └───────┬───────┘  └──────┬───────┘  └────────┬────────┘  │
└──────────┼──────────────────┼───────────────────┼───────────┘
           │                  │                   │
           └──────────────────┼───────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │   Socket.IO       │
                    │   Connection      │
                    └─────────┬─────────┘
                              │
┌─────────────────────────────▼─────────────────────────────┐
│                       Server Layer                         │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐ │
│  │   Express    │  │  Socket.IO   │  │   WebRTC        │ │
│  │   Server     │  │  Event Hub   │  │   Signaling     │ │
│  └──────────────┘  └──────────────┘  └─────────────────┘ │
└────────────────────────────────────────────────────────────┘
```

### Client-Side Modules

| Module | Responsibility |
|--------|---------------|
| `config.js` | Application configuration and constants |
| `socket-connection.js` | WebSocket connection establishment |
| `chat-messaging.js` | Chat message handling and rendering |
| `webrtc-video-call.js` | Video call peer connection management |
| `ui-controller.js` | DOM manipulation and event binding |
| `app-initializer.js` | Application bootstrap and initialization |

---

## 📦 Prerequisites

Before installing the Messenger Application, ensure your system meets the following requirements:

### System Requirements

- **Node.js**: v14.0.0 or higher ([Download](https://nodejs.org/))
- **npm**: v6.0.0 or higher (bundled with Node.js)
- **Operating System**: Windows, macOS, or Linux

### Browser Requirements

- **Chrome**: v80+ (Recommended)
- **Firefox**: v75+
- **Safari**: v14+
- **Edge**: v80+

**Note:** WebRTC support is required for video calling functionality.

### Network Requirements

- Open port 3000 (or custom port specified in configuration)
- For cross-device testing: devices on the same local network
- For production: TURN server for NAT traversal in restricted networks

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd msgr
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- `express`: ^4.21.2 - Web server framework
- `socket.io`: ^4.8.1 - Real-time bidirectional communication
- `nodemon`: ^2.0.22 - Development auto-reload (devDependency)

### Step 3: Verify Installation

```bash
npm list
```

Expected output should show all dependencies installed without errors.

---

## 🎮 Usage

### Starting the Server

#### Production Mode

```bash
npm start
```

#### Development Mode (with auto-reload)

```bash
npm run dev
```

The server will start on **http://localhost:3000**

### Accessing the Application

1. Open your web browser
2. Navigate to `http://localhost:3000`
3. Grant camera and microphone permissions when prompted

### Testing with Multiple Users

#### Local Testing (Same Machine)
1. Open the application in one browser tab/window
2. Open a new incognito/private window or another browser
3. Navigate to `http://localhost:3000` in both
4. Start chatting or initiate a video call

#### Network Testing (Different Devices)
1. Find your local IP address:
   - Windows: `ipconfig`
   - macOS/Linux: `ifconfig` or `ip addr`
2. On other devices, navigate to `http://<your-ip>:3000`
3. Ensure all devices are on the same network

### Using Chat Features

1. **Send a Message:**
   - Type your message in the text area (max 500 characters)
   - Press `Enter` or click the "Send" button
   - Message appears in the chat window

2. **Receive Messages:**
   - Messages from other users appear automatically
   - Chat window auto-scrolls to show latest messages

### Using Video Call Features

1. **Start a Call:**
   - Click the "📹 Start Call" button
   - Allow camera and microphone access when prompted
   - Your local video appears in the bottom-right corner
   - Remote user's video appears in the main window

2. **End a Call:**
   - Click the "❌ End Call" button
   - All video streams are stopped
   - Media tracks are released

---

## 📂 Project Structure

```
msgr/
├── 📄 index.html                    # Main HTML entry point
├── 📄 script.js                     # Express & Socket.IO server
├── 📄 package.json                  # Project dependencies & scripts
├── 📄 package-lock.json             # Dependency lock file
├── 📄 .gitignore                    # Git ignore patterns
├── 📄 README.md                     # Project documentation (this file)
├── 📄 QUICK_START.md                # Quick start guide
├── 📄 RESTRUCTURE_SUMMARY.md        # Architecture documentation
│
├── 📁 js/                           # Client-side JavaScript modules
│   ├── config.js                    # Configuration constants
│   ├── socket-connection.js         # Socket.IO client setup
│   ├── chat-messaging.js            # Chat functionality
│   ├── webrtc-video-call.js         # WebRTC peer connection
│   ├── ui-controller.js             # UI event handlers
│   └── app-initializer.js           # Application bootstrap
│
├── 📁 styles/                       # CSS stylesheets
│   ├── base.css                     # Base styles & layout
│   ├── chat.css                     # Chat module styles
│   └── video.css                    # Video module styles
│
├── 📁 node_modules/                 # Dependencies (not in version control)
└── 📁 .vscode/                      # VS Code configuration
```

### File Descriptions

| File | Purpose |
|------|---------|
| `index.html` | Application entry point with HTML structure |
| `script.js` | Node.js server with Express and Socket.IO setup |
| `package.json` | NPM configuration and dependency management |
| `js/config.js` | Centralized configuration for client-side code |
| `js/socket-connection.js` | Socket.IO connection initialization |
| `js/chat-messaging.js` | Chat message sending and rendering logic |
| `js/webrtc-video-call.js` | WebRTC peer connection and media stream handling |
| `js/ui-controller.js` | DOM event listeners and UI updates |
| `js/app-initializer.js` | Application startup and module coordination |
| `styles/base.css` | Global styles, layout, and typography |
| `styles/chat.css` | Chat module specific styling |
| `styles/video.css` | Video call module specific styling |

---

## 🛠️ Technology Stack

### Frontend Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| HTML5 | - | Semantic markup and structure |
| CSS3 | - | Styling, animations, and responsive design |
| JavaScript (ES6+) | - | Client-side logic and interactivity |
| Socket.IO Client | 4.2.0 | Real-time bidirectional communication |
| WebRTC API | - | Peer-to-peer video and audio streaming |

### Backend Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 14+ | JavaScript runtime environment |
| Express | ^4.21.2 | Web application framework |
| Socket.IO | ^4.8.1 | WebSocket server for real-time events |
| HTTP Module | - | HTTP server creation |

### Development Tools

| Tool | Version | Purpose |
|------|---------|---------|
| nodemon | ^2.0.22 | Auto-restart server on file changes |
| npm | 6+ | Package management |

---

## 📡 API Documentation

### Socket.IO Events

#### Client → Server Events

| Event | Payload | Description |
|-------|---------|-------------|
| `message` | `{ text: string, sender: string, timestamp: number }` | Send a chat message |
| `offer` | `RTCSessionDescriptionInit` | Send WebRTC offer for call initiation |
| `answer` | `RTCSessionDescriptionInit` | Send WebRTC answer to accept call |
| `ice-candidate` | `RTCIceCandidateInit` | Send ICE candidate for NAT traversal |

#### Server → Client Events

| Event | Payload | Description |
|-------|---------|-------------|
| `message` | `{ text: string, sender: string, timestamp: number }` | Receive a chat message |
| `offer` | `RTCSessionDescriptionInit` | Receive WebRTC offer from peer |
| `answer` | `RTCSessionDescriptionInit` | Receive WebRTC answer from peer |
| `ice-candidate` | `RTCIceCandidateInit` | Receive ICE candidate from peer |

### WebRTC Configuration

```javascript
{
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
}
```

---

## ⚙️ Configuration

### Server Configuration

Edit `script.js` to modify server settings:

```javascript
const PORT = process.env.PORT || 3000;  // Server port
```

### Client Configuration

Edit `js/config.js` for client-side settings:

```javascript
const CONFIG = {
  socketURL: window.location.origin,
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' }
  ]
};
```

### Environment Variables

Create a `.env` file for environment-specific configuration:

```bash
PORT=3000
NODE_ENV=production
```

---

## 🧪 Testing

### Manual Testing Checklist

#### Chat Functionality
- [ ] Messages send successfully
- [ ] Messages appear for all connected clients
- [ ] Character limit enforced (500 chars)
- [ ] Enter key sends messages
- [ ] Send button works correctly
- [ ] Auto-scroll to latest messages

#### Video Call Functionality
- [ ] Camera and microphone permissions requested
- [ ] Local video displays correctly
- [ ] Remote video displays after connection
- [ ] Call initiates successfully
- [ ] Call ends cleanly
- [ ] Multiple reconnections work

#### Connection Handling
- [ ] Socket connects on page load
- [ ] Reconnection after network interruption
- [ ] Multiple clients can connect simultaneously

### Browser Compatibility Testing

Test the application in:
- ✅ Chrome (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile)
- ✅ Edge (Desktop)

---

## 🔧 Troubleshooting

### Common Issues and Solutions

#### Issue: Video call not working

**Symptoms:** Video doesn't appear, call doesn't connect

**Solutions:**
1. Ensure camera/microphone permissions are granted
2. Check if browser supports WebRTC (chrome://webrtc-internals)
3. Verify both users clicked "Start Call"
4. Check browser console for WebRTC errors
5. Try using Google Chrome (best WebRTC support)
6. Disable browser extensions that might block media

#### Issue: Messages not sending

**Symptoms:** Messages don't appear, no response from server

**Solutions:**
1. Verify server is running (`npm start`)
2. Check Socket.IO connection status in console
3. Ensure port 3000 is not blocked by firewall
4. Restart the server and refresh the page
5. Clear browser cache and cookies

#### Issue: Connection issues across devices

**Symptoms:** Can't connect from different devices on network

**Solutions:**
1. Verify all devices are on the same network
2. Check firewall settings allow port 3000
3. Use IP address instead of localhost
4. Ensure server is listening on `0.0.0.0` not `localhost`
5. For production, configure TURN server

#### Issue: Port already in use

**Symptoms:** `EADDRINUSE: address already in use`

**Solutions:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/macOS
lsof -ti:3000 | xargs kill
```

#### Issue: Module not found errors

**Symptoms:** `Cannot find module 'express'`

**Solutions:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes with descriptive commits
4. Test thoroughly across browsers
5. Submit a pull request

### Code Style Guidelines

- Use ES6+ JavaScript features
- Follow consistent indentation (2 spaces)
- Comment complex logic
- Use meaningful variable names
- Keep functions small and focused

### Commit Message Convention

```
type(scope): subject

body (optional)

footer (optional)
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

---

## 📄 License

This project is licensed under the **ISC License**.

```
ISC License

Copyright (c) 2025 Messenger Application

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
```

---

## 📞 Support

For questions, issues, or feature requests:

- **Issues:** [GitHub Issues](<repository-url>/issues)
- **Documentation:** See [QUICK_START.md](QUICK_START.md) for quick setup
- **Architecture:** See [RESTRUCTURE_SUMMARY.md](RESTRUCTURE_SUMMARY.md) for technical details

---

## 🙏 Acknowledgments

- Socket.IO team for real-time communication library
- WebRTC community for peer-to-peer video protocols
- Express.js team for the web framework
- Google for providing free STUN servers

---

## 🗺️ Roadmap

Future enhancements planned:

- [ ] User authentication and registration
- [ ] Message persistence with database
- [ ] File sharing and image support
- [ ] Group chat functionality
- [ ] Screen sharing capability
- [ ] End-to-end encryption
- [ ] Mobile application (React Native)
- [ ] Docker containerization
- [ ] CI/CD pipeline setup

---

**Built with ❤️ using Node.js, Express, Socket.IO, and WebRTC**
