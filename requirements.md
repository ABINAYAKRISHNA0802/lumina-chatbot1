# Lumina Chatbot — Requirements

## Overview
Lumina is a full-stack AI chatbot web application powered by Anthropic's Claude API. It provides a clean, dark-themed chat interface with markdown rendering and quick-start suggestion prompts.

---

## Functional Requirements

### FR-1: Chat Interface
- The app shall display a full-screen dark-themed chat layout.
- The app shall show a suggestions panel with 4 hardcoded prompts when no messages exist.
- The suggestions panel shall be hidden once the first message is sent.
- The chat window shall auto-scroll to the latest message.

### FR-2: Messaging
- Users shall be able to type messages in a textarea input.
- Pressing Enter shall send the message.
- Pressing Shift+Enter shall insert a newline.
- The send button shall be disabled while a response is loading.
- User messages shall appear on the right side in purple.
- Assistant messages shall appear on the left side in dark gray.
- Assistant messages shall render markdown (bold, code blocks, lists, etc.).

### FR-3: Suggestions Panel
- Four suggestion buttons shall be displayed before any message is sent:
  1. "Explain how React hooks work"
  2. "Write a Python function to sort a list"
  3. "What is the difference between SQL and NoSQL"
  4. "Give me 5 tips for clean code"
- Clicking a suggestion shall send that text as the first message.

### FR-4: Chat State Management
- A React context (ChatContext) shall manage:
  - `messages`: array of message objects with role and content
  - `isLoading`: boolean indicating a pending API call
  - `sendMessage(content: string)`: sends a message and appends the reply
  - `clearChat()`: resets the conversation

### FR-5: Backend API
- The server shall expose a single endpoint: `POST /api/chat`
- Request body: `{ messages: [{ role: "user" | "assistant", content: string }] }`
- Response body: `{ reply: string }`
- The server shall use Anthropic's Claude model: `claude-sonnet-4-20250514`
- Max tokens: 1024
- Temperature: 0.7
- The API key shall be read from the `ANTHROPIC_API_KEY` environment variable.

### FR-6: CORS
- The server shall allow requests from `http://localhost:5173`.

---

## Non-Functional Requirements

### NFR-1: Tech Stack
- **Client**: React 18, TypeScript, Vite, Tailwind CSS, react-markdown, remark-gfm, axios
- **Server**: Node.js, Express, TypeScript, @anthropic-ai/sdk, dotenv, cors

### NFR-2: Ports
- Client dev server: port 5173
- Server: port 3001

### NFR-3: Environment Variables
- Client: `VITE_API_URL` (default: `http://localhost:3001`)
- Server: `ANTHROPIC_API_KEY`

### NFR-4: Deployment
- Client deployable to Vercel (via `vercel.json`)
- Server deployable to Render (via `render.yaml`)

---

## Out of Scope
- Database / persistence
- Authentication / authorization
- File uploads
- WebSockets / streaming
- Redux or other global state libraries
- Docker
- Any feature not listed above
