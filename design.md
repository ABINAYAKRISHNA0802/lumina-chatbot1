# Lumina Chatbot — Design

## Architecture Overview

```
┌─────────────────────────────────────────┐
│              Browser (Client)           │
│                                         │
│  ┌──────────────────────────────────┐   │
│  │           App.tsx                │   │
│  │  ┌────────────────────────────┐  │   │
│  │  │      ChatContext.tsx       │  │   │
│  │  │  (messages, isLoading,     │  │   │
│  │  │   sendMessage, clearChat)  │  │   │
│  │  └────────────┬───────────────┘  │   │
│  │               │                  │   │
│  │  ┌────────────▼───────────────┐  │   │
│  │  │      ChatWindow.tsx        │  │   │
│  │  │  ┌──────────────────────┐  │   │   │
│  │  │  │  MessageBubble.tsx   │  │   │   │
│  │  │  │  (user / assistant)  │  │   │   │
│  │  │  └──────────────────────┘  │   │   │
│  │  └────────────────────────────┘  │   │
│  │  ┌────────────────────────────┐  │   │
│  │  │   SuggestionsPanel.tsx     │  │   │
│  │  │   (hidden after 1st msg)   │  │   │
│  │  └────────────────────────────┘  │   │
│  │  ┌────────────────────────────┐  │   │
│  │  │       InputBar.tsx         │  │   │
│  │  │  (textarea + send button)  │  │   │
│  │  └────────────────────────────┘  │   │
│  └──────────────────────────────────┘   │
└──────────────────┬──────────────────────┘
                   │ HTTP POST /api/chat
                   │ axios
                   ▼
┌─────────────────────────────────────────┐
│              Server (Express)           │
│                                         │
│  src/index.ts  (Express app, port 3001) │
│  src/routes/chat.ts  (POST /api/chat)   │
│  src/services/anthropic.ts              │
│    └─ Anthropic SDK → Claude API        │
└─────────────────────────────────────────┘
```

---

## Component Design

### App.tsx
- Wraps everything in `<ChatProvider>`
- Renders a full-screen dark background (`bg-gray-950`)
- Layout: flex column, full height
- Top: header bar with "Lumina" title and clear button
- Middle: `<ChatWindow />` (flex-grow, scrollable)
- Bottom: `<SuggestionsPanel />` (conditionally rendered) + `<InputBar />`

### ChatContext.tsx
```ts
interface ChatContextValue {
  messages: Message[]
  isLoading: boolean
  sendMessage: (content: string) => Promise<void>
  clearChat: () => void
}
```
- `sendMessage` appends user message, calls `POST /api/chat`, appends assistant reply
- Uses `axios` for HTTP
- API URL from `import.meta.env.VITE_API_URL ?? 'http://localhost:3001'`

### ChatWindow.tsx
- Scrollable container (`overflow-y-auto`)
- Maps `messages` → `<MessageBubble />`
- `useEffect` with `useRef` to scroll to bottom on new messages

### MessageBubble.tsx
- `role === 'user'`: right-aligned, `bg-purple-600`, rounded bubble
- `role === 'assistant'`: left-aligned, `bg-gray-800`, rounded bubble
- Assistant content rendered via `<ReactMarkdown remarkPlugins={[remarkGfm]}>`
- Loading indicator: animated dots shown when `isLoading` and no assistant reply yet

### InputBar.tsx
- `<textarea>` with `onKeyDown`: Enter → send, Shift+Enter → newline
- Send `<button>` disabled when `isLoading` or input is empty
- Auto-resize textarea (up to ~5 rows)

### SuggestionsPanel.tsx
- Rendered only when `messages.length === 0`
- 4 buttons, each calls `sendMessage(suggestionText)`
- Styled as pill buttons with hover effect

---

## API Design

### POST /api/chat

**Request**
```json
{
  "messages": [
    { "role": "user", "content": "Hello!" }
  ]
}
```

**Response (200)**
```json
{
  "reply": "Hi there! How can I help you today?"
}
```

**Response (500)**
```json
{
  "error": "Internal server error"
}
```

---

## Data Types

```ts
// client/src/types/index.ts
export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface ChatRequest {
  messages: { role: 'user' | 'assistant'; content: string }[]
}

export interface ChatResponse {
  reply: string
}
```

---

## File Structure

```
lumina-chatbot/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── InputBar.tsx
│   │   │   └── SuggestionsPanel.tsx
│   │   ├── context/
│   │   │   └── ChatContext.tsx
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── index.html
│   ├── tailwind.config.ts
│   ├── vite.config.ts
│   ├── .env.local
│   └── vercel.json
├── server/
│   ├── src/
│   │   ├── routes/
│   │   │   └── chat.ts
│   │   ├── services/
│   │   │   └── anthropic.ts
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── render.yaml  (or server/render.yaml)
└── README.md
```

---

## Styling Decisions
- Dark theme: `bg-gray-950` background, `bg-gray-900` panels
- User bubbles: `bg-purple-600 text-white`
- Assistant bubbles: `bg-gray-800 text-gray-100`
- Input area: `bg-gray-900 border-gray-700`
- Accent color: purple (`purple-500` / `purple-600`)
- Font: system sans-serif via Tailwind default
