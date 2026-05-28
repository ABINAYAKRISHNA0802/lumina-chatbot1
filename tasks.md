# Lumina Chatbot — Implementation Tasks

## Phase 1: Project Scaffolding

- [x] T-01: Create folder structure (`client/src/components`, `client/src/context`, `client/src/types`, `server/src/routes`, `server/src/services`)
- [x] T-02: Create `client/package.json` with React 18, TypeScript, Vite, Tailwind, react-markdown, remark-gfm, axios
- [x] T-03: Create `server/package.json` with Express, TypeScript, @anthropic-ai/sdk, dotenv, cors
- [x] T-04: Create `client/vite.config.ts`
- [x] T-05: Create `client/tailwind.config.ts`
- [x] T-06: Create `client/index.html`
- [x] T-07: Create `server/tsconfig.json`
- [x] T-08: Create `client/tsconfig.json`

## Phase 2: Type Definitions

- [x] T-09: Create `client/src/types/index.ts` — `Message`, `ChatRequest`, `ChatResponse` interfaces

## Phase 3: Backend

- [x] T-10: Create `server/src/services/anthropic.ts` — wraps Anthropic SDK, exports `getChatReply(messages)`
- [x] T-11: Create `server/src/routes/chat.ts` — POST `/api/chat` route handler
- [x] T-12: Create `server/src/index.ts` — Express app setup, CORS, JSON middleware, route mounting, port 3001

## Phase 4: Frontend Context

- [x] T-13: Create `client/src/context/ChatContext.tsx` — `ChatProvider`, `useChatContext` hook, `messages`, `isLoading`, `sendMessage`, `clearChat`

## Phase 5: Frontend Components

- [x] T-14: Create `client/src/components/MessageBubble.tsx` — user (right/purple) and assistant (left/gray) bubbles with markdown rendering
- [x] T-15: Create `client/src/components/ChatWindow.tsx` — scrollable message list, auto-scroll to bottom
- [x] T-16: Create `client/src/components/SuggestionsPanel.tsx` — 4 suggestion buttons, hidden after first message
- [x] T-17: Create `client/src/components/InputBar.tsx` — textarea with Enter/Shift+Enter handling, send button

## Phase 6: App Entry Points

- [x] T-18: Create `client/src/App.tsx` — full-screen dark layout, header, ChatWindow, SuggestionsPanel, InputBar
- [x] T-19: Create `client/src/main.tsx` — React DOM render with `<App />`

## Phase 7: Config & Environment

- [x] T-20: Create `client/.env.local` — `VITE_API_URL=http://localhost:3001`
- [x] T-21: Create `server/.env` — `ANTHROPIC_API_KEY=your_api_key_here`
- [x] T-22: Create `client/vercel.json` — Vercel deployment config with SPA rewrite rules
- [x] T-23: Create `server/render.yaml` — Render deployment config

## Phase 8: Documentation

- [x] T-24: Create `README.md` — setup instructions, environment variables, running locally, deployment guide
