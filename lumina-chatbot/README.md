# Lumina — AI Chatbot

Lumina is a full-stack AI chatbot web application that lets you have real conversations with Google's Gemini AI. It has a clean, dark-themed interface, supports markdown responses (so code blocks, bold text, and lists all render properly), and comes with quick-start suggestion buttons to get you going instantly.

---

## What It Looks Like

- Dark themed chat interface (like ChatGPT or Claude)
- Your messages appear on the **right side** in purple
- AI responses appear on the **left side** in dark gray
- Animated loading dots while the AI is thinking
- 4 suggestion buttons on the welcome screen
- A "New chat" button to clear and start over

---

## How It Works

Lumina is split into two parts that work together:

```
You (Browser)  →  Client (React)  →  Server (Express)  →  Gemini AI
                                  ←                    ←
```

1. You type a message and press Enter
2. The **client** (React app) sends it to the **server**
3. The **server** forwards it to **Google Gemini AI**
4. Gemini thinks and sends back a reply
5. The server passes it to the client
6. You see the response in the chat

---

## Project Structure

```
lumina-chatbot/
│
├── client/                        # The website (what you see in the browser)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.tsx     # Displays all messages, auto-scrolls
│   │   │   ├── MessageBubble.tsx  # Individual message (user or AI)
│   │   │   ├── InputBar.tsx       # Text input + send button
│   │   │   └── SuggestionsPanel.tsx  # 4 quick-start buttons
│   │   ├── context/
│   │   │   └── ChatContext.tsx    # Manages all chat state (messages, loading)
│   │   ├── types/
│   │   │   └── index.ts           # TypeScript type definitions
│   │   ├── App.tsx                # Main layout (header + chat + input)
│   │   └── main.tsx               # Entry point, renders the app
│   ├── index.html                 # HTML shell
│   ├── .env.local                 # Client environment variables
│   ├── vite.config.ts             # Vite build config
│   ├── tailwind.config.ts         # Tailwind CSS config
│   └── vercel.json                # Vercel deployment config
│
├── server/                        # The backend (talks to Gemini AI)
│   ├── src/
│   │   ├── routes/
│   │   │   └── chat.ts            # POST /api/chat — handles incoming messages
│   │   ├── services/
│   │   │   └── anthropic.ts       # Connects to Google Gemini API
│   │   └── index.ts               # Express app setup, port, CORS
│   ├── .env                       # Your secret API key lives here
│   ├── package.json               # Server dependencies
│   ├── tsconfig.json              # TypeScript config
│   └── render.yaml                # Render deployment config
│
└── README.md                      # This file
```

---

## Tech Stack

### Frontend (Client)
| Technology | What it does |
|---|---|
| **React 18** | Builds the UI with components |
| **TypeScript** | Adds types to JavaScript — catches bugs early |
| **Vite** | Super fast development server and build tool |
| **Tailwind CSS** | Utility-first CSS — styles everything with class names |
| **react-markdown** | Renders AI responses as formatted markdown |
| **remark-gfm** | Adds support for tables, strikethrough, code blocks |
| **axios** | Makes HTTP requests from browser to server |

### Backend (Server)
| Technology | What it does |
|---|---|
| **Node.js** | JavaScript runtime for the server |
| **Express** | Web framework — handles routes and requests |
| **TypeScript** | Same as above — typed JavaScript |
| **@google/generative-ai** | Official Google Gemini SDK |
| **dotenv** | Loads your API key from the .env file |
| **cors** | Allows the client (port 5173) to talk to the server (port 3002) |

---

## File-by-File Explanation

### `server/src/index.ts`
The entry point for the backend. It:
- Creates the Express app
- Enables CORS so the browser can connect
- Listens on port **3002**
- Mounts the `/api/chat` route

### `server/src/routes/chat.ts`
Handles the single API endpoint `POST /api/chat`. It:
- Receives the array of messages from the client
- Validates that messages exist and have the right format
- Calls the Gemini service
- Returns `{ reply: "..." }` back to the client

### `server/src/services/anthropic.ts`
The bridge to Google Gemini AI. It:
- Connects using your API key from `.env`
- Uses the `gemini-2.0-flash` model
- Converts message history to Gemini's format
- Returns the AI's text response

### `client/src/context/ChatContext.tsx`
The brain of the frontend. It manages:
- `messages` — the full conversation history
- `isLoading` — true while waiting for AI response
- `sendMessage()` — adds your message, calls the server, adds the reply
- `clearChat()` — resets everything for a new conversation

### `client/src/components/ChatWindow.tsx`
Renders all messages in a scrollable container. Automatically scrolls to the bottom whenever a new message arrives.

### `client/src/components/MessageBubble.tsx`
Renders a single message. User messages are purple on the right. AI messages are dark gray on the left and support full markdown rendering (code blocks, bold, lists, links, etc.).

### `client/src/components/InputBar.tsx`
The text input at the bottom. Features:
- Press **Enter** to send
- Press **Shift+Enter** for a new line
- Auto-resizes as you type
- Send button is disabled while AI is responding

### `client/src/components/SuggestionsPanel.tsx`
Shows 4 clickable suggestion buttons on the welcome screen. Disappears the moment you send your first message. The 4 suggestions are:
1. Explain how React hooks work
2. Write a Python function to sort a list
3. What is the difference between SQL and NoSQL
4. Give me 5 tips for clean code

### `client/src/App.tsx`
The main layout component. Puts everything together:
- Header with the Lumina logo and "New chat" button
- Welcome screen (shown before first message)
- Chat window (shown after first message)
- Suggestions panel
- Input bar

---

## Prerequisites

Before running this project you need:

- **Node.js 18 or higher** — download from [nodejs.org](https://nodejs.org)
- **A free Google Gemini API key** — get one at [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey)

---

## Setup & Running Locally

### Step 1 — Add your API key

Open `server/.env` and replace the placeholder with your real key:

```env
GEMINI_API_KEY=AIzaSy_your_real_key_here
```

### Step 2 — Start the server

Open a terminal and run:

```powershell
cd lumina-chatbot/server
npm install
npm run dev
```

You should see:
```
Lumina server running on http://localhost:3002
```

### Step 3 — Start the client

Open a **second terminal** and run:

```powershell
cd lumina-chatbot/client
npm install
npm run dev
```

You should see:
```
➜  Local:   http://localhost:5173/
```

### Step 4 — Open the app

Go to your browser and visit:
**http://localhost:5173**

> Keep both terminals running while using the app. The server and client must both be active.

---

## Environment Variables

### `server/.env`
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### `client/.env.local`
```env
VITE_API_URL=http://localhost:3002
```

---

## API Reference

The server exposes one endpoint:

### `POST /api/chat`

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "Hello!" },
    { "role": "assistant", "content": "Hi! How can I help?" },
    { "role": "user", "content": "What is React?" }
  ]
}
```

**Response:**
```json
{
  "reply": "React is a JavaScript library for building user interfaces..."
}
```

The full conversation history is sent with every request so the AI remembers context.

---

## Deployment

### Deploy Client to Vercel (free)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repo
3. Set root directory to `client`
4. Add environment variable: `VITE_API_URL` = your deployed server URL
5. Click Deploy

### Deploy Server to Render (free)

1. Go to [render.com](https://render.com) and create a new Web Service
2. Connect your GitHub repo
3. Set root directory to `server`
4. Build command: `npm install && npm run build`
5. Start command: `npm start`
6. Add environment variable: `GEMINI_API_KEY` = your API key
7. Click Deploy

After deploying the server, copy its URL (e.g. `https://lumina-server.onrender.com`) and update `VITE_API_URL` in Vercel.

---

## Common Errors & Fixes

| Error | Cause | Fix |
|---|---|---|
| `something went wrong` | API key is wrong or expired | Get a new key from Google AI Studio |
| `EADDRINUSE: port 3001` | Port already in use | Run `netstat -ano \| findstr :3001` then `taskkill /PID xxxx /F` |
| `Cannot find package.json` | Wrong folder in terminal | Use the full `cd` path shown above |
| `ERESOLVE` on npm install | Version conflict | Delete `node_modules` and `package-lock.json`, then `npm install` again |
| Client shows blank page | Server not running | Make sure Terminal 1 (server) is running |

---

## What's Not Included (By Design)

This project is intentionally kept simple:

- No database — conversations are not saved
- No login or accounts
- No file uploads
- No real-time streaming (responses appear all at once)
- No Docker setup

These can all be added later as the project grows.

---

## License

MIT — free to use, modify, and share.
