## Project Overview

Lumina is a full-stack AI-powered chatbot web application that enables 
users to have intelligent, multi-turn conversations with an AI assistant 
through a clean and modern chat interface.

The application is built with a clear separation of concerns — a React 
frontend handles the user interface and conversation state, while a 
Node.js/Express backend securely manages all communication with the 
Google Gemini AI API. This architecture ensures the API key is never 
exposed to the browser.

---

## Problem It Solves

Traditional chatbot interfaces are either too simple (single-turn, no 
memory) or too complex for beginners to understand. Lumina solves this 
by providing:

- A clean, distraction-free chat interface anyone can use
- Full conversation memory — the AI remembers everything said earlier 
  in the session
- Markdown rendering so AI responses with code, lists, and formatting 
  display beautifully
- A beginner-friendly codebase that is easy to read, extend, and deploy

---

## How It Works — Step by Step

### 1. User Opens the App
The user lands on a dark-themed chat screen with 4 suggestion buttons:
- Explain how React hooks work
- Write a Python function to sort a list
- What is the difference between SQL and NoSQL
- Give me 5 tips for clean code

These suggestions help the user start a conversation immediately 
without thinking of a question.

### 2. User Sends a Message
The user either clicks a suggestion or types their own message and 
presses Enter. The message appears instantly on the right side of the 
screen as a purple bubble.

### 3. Frontend Sends Request to Backend
The React frontend collects the full conversation history (all previous 
messages + the new message) and sends it to the Express backend via 
an HTTP POST request to /api/chat.

Sending the full history on every request is what gives the AI memory 
of the entire conversation.

### 4. Backend Calls Gemini API
The Express backend receives the conversation history, formats it into 
the structure Gemini expects, and sends it to the Google Gemini 1.5 
Flash model using the official @google/generative-ai SDK.

The API key is stored securely in a .env file on the server and is 
never sent to or visible in the browser.

### 5. AI Generates a Response
Google Gemini processes the full conversation history and generates a 
contextually aware response. Because the full history is sent every 
time, the AI understands references to earlier messages — for example 
if the user says "explain that in simpler terms", Gemini knows what 
"that" refers to.

### 6. Response Rendered in the UI
The backend sends the AI reply back to the frontend. The frontend adds 
it to the conversation and renders it using react-markdown, which 
converts markdown syntax into formatted HTML — so code blocks look 
like code, bold text looks bold, and bullet lists render as actual 
lists.

### 7. Conversation Continues
The user can keep chatting. Every new message includes the full history 
so the AI always has complete context.

---

## Architecture Diagram

---

## Key Technical Decisions

### Why React with TypeScript?
TypeScript adds type safety to JavaScript which catches bugs before 
they happen. For a chat application where message objects are passed 
between many components, having clearly defined types for Message, 
ChatState, and API responses makes the code more reliable and easier 
to maintain.

### Why a Separate Backend?
The Google Gemini API key must never be exposed in the browser. If the 
API call was made directly from React, anyone could open browser 
DevTools and steal the key. The Express backend acts as a secure proxy 
— the frontend only talks to our own server, and our server talks to 
Gemini with the key stored safely in an environment variable.

### Why Send Full Conversation History?
The Gemini API is stateless — it has no memory between requests. To 
give the AI context of the full conversation, we send all previous 
messages on every request. This is the standard pattern used by all 
major AI chat applications including ChatGPT.

### Why Tailwind CSS?
Tailwind allows building a polished UI quickly without writing 
separate CSS files. Every style is applied directly in the component 
using utility classes which keeps the code in one place and makes it 
easy to understand what each element looks like just by reading the 
component.

### Why react-markdown?
AI responses frequently contain markdown formatting — code wrapped in 
backticks, bold text, numbered lists, and multi-line code blocks. 
Without a markdown renderer these would display as raw symbols. 
react-markdown converts them into properly formatted HTML so responses 
are easy to read.

---

## Component Breakdown

### ChatContext.tsx
The brain of the frontend. Manages the messages array, loading state, 
and exposes sendMessage and clearChat functions to all components via 
React Context. This avoids prop drilling and keeps state management 
clean.

### ChatWindow.tsx
Displays the full conversation as a scrollable list. Auto-scrolls to 
the latest message every time a new one arrives using a useEffect and 
a ref pointing to the bottom of the list.

### MessageBubble.tsx
Renders a single message. User messages appear on the right in purple. 
Assistant messages appear on the left in dark gray. All assistant 
messages are passed through react-markdown for formatted rendering.

### InputBar.tsx
The text input at the bottom. Enter sends the message. Shift+Enter 
adds a new line. The send button and input are disabled while a 
response is loading to prevent duplicate requests.

### SuggestionsPanel.tsx
Shows 4 clickable suggestion buttons when the conversation is empty. 
Clicking one sends that text as the first message. The panel hides 
itself once the first message is sent.

### server/services/anthropic.ts
Contains the getChatReply function which takes the conversation 
history, formats it for the Gemini API, sends it, and returns the 
text response. All AI logic is isolated here — if we ever wanted to 
switch to a different AI provider, this is the only file that needs 
to change.

### server/routes/chat.ts
The single API route POST /api/chat. Validates the incoming request, 
calls getChatReply, and returns the result. Handles errors gracefully 
and returns appropriate HTTP status codes.

