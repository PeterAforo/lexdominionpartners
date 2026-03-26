# Lex AI Chatbot — Documentation

## Overview

**Lex** is an AI-powered legal assistant chatbot built for the Lex Dominion Partners website. It helps visitors book consultations, learn about practice areas, get contact information, and capture leads — all through a conversational interface.

### Enabled Capabilities
| Capability | Status | Description |
|---|---|---|
| General FAQ | ✅ Enabled | Answers questions using a curated knowledge base |
| Lead Capture | ✅ Enabled | Collects name, email, and message from visitors |
| Booking & Appointments | ✅ Enabled | Guides users to the /booking page |
| Content Recommendations | ✅ Enabled | Recommends blog posts and resources |
| Escalation to Human | ✅ Enabled | Detects frustration and offers human connection |
| Order Placement | ❌ Disabled | Not applicable (no e-commerce) |
| Checkout Assistance | ❌ Disabled | Not applicable |
| Newsletter Subscription | ❌ Disabled | Not applicable |
| Event Information | ❌ Disabled | Not applicable |
| Order Tracking | ❌ Disabled | Not applicable |

---

## Setup

### 1. Environment Variables

Add the following to your `.env.local`:

```env
# Required for AI-powered responses (GPT-4o)
OPENAI_API_KEY=your-openai-api-key-here

# Already configured
DATABASE_URL=your-database-url
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000
```

> **Note:** The chatbot works WITHOUT an OpenAI API key using the built-in fallback system (knowledge base + intent detection). Adding the API key enables GPT-4o for more natural, contextual responses.

### 2. No Additional Dependencies

The chatbot uses only existing project dependencies:
- `framer-motion` — animations
- `lucide-react` — icons
- `next` — API routes
- `@prisma/client` — lead capture storage

No new packages need to be installed.

---

## Architecture

```
src/
├── lib/
│   ├── chatbot-config.ts      # Central configuration (identity, capabilities, UI)
│   └── chatbot-knowledge.ts   # Knowledge base (30+ Q&A entries from site content)
├── hooks/
│   └── useChatbot.ts          # React hook (state, API calls, lead capture flow)
├── components/
│   └── chatbot/
│       ├── Chatbot.tsx         # Main component (launcher + chat window)
│       ├── ChatMessage.tsx     # Message bubble with markdown parsing
│       ├── ChatInput.tsx       # Input bar with send button
│       ├── QuickReplies.tsx    # Clickable suggestion chips
│       └── TypingIndicator.tsx # Animated typing dots
├── app/
│   ├── (public)/layout.tsx     # Renders <Chatbot /> on all public pages
│   └── api/ai/
│       ├── chat/route.ts       # Main chat API (OpenAI + fallback)
│       └── lead-capture/route.ts # Lead submission API
```

### Data Flow
1. User sends message → `useChatbot` hook
2. Hook sends to `/api/ai/chat` with message history
3. API route tries OpenAI (if configured), falls back to knowledge base
4. Response includes: `message`, `action`, `quick_replies`
5. Hook processes action (e.g., starts lead capture flow)
6. UI renders message with parsed markdown and quick replies

---

## Customization

### Changing Chatbot Identity

Edit `src/lib/chatbot-config.ts`:

```ts
export const CHATBOT_CONFIG = {
  name: 'Lex',           // Change chatbot name
  tagline: 'AI Legal Assistant',
  greeting: 'Hi there! ...', // Change welcome message
  // ...
}
```

### Changing Personality

Edit the `personality` object in `chatbot-config.ts`:

```ts
personality: {
  tone: 'professional, warm, and authoritative yet approachable',
  style: 'formal but accessible',
  rules: [
    'Never provide specific legal advice',
    // Add or modify rules...
  ],
},
```

### Changing Quick Replies

Edit `quickReplies` in `chatbot-config.ts`:

```ts
quickReplies: [
  { label: '📅 Book Consultation', intent: 'booking', prompt: 'I would like to book a consultation' },
  // Add or modify quick replies...
],
```

### Changing UI Settings

```ts
ui: {
  width: 400,        // Chat window width (px)
  height: 600,       // Chat window max height (px)
  mobileFullScreen: true,
  showTimestamps: true,
  showUnreadBadge: true,
},
```

---

## Adding a New Conversation Flow

1. **Define the intent** in `/api/ai/chat/route.ts` → `detectIntent()`:
```ts
if (msg.includes('your_keyword')) return 'your_intent'
```

2. **Add the response** in `getFallbackResponse()`:
```ts
case 'your_intent':
  return {
    message: 'Your response with **markdown** and [links](/path)',
    action: 'none',
    quick_replies: ['Option 1', 'Option 2'],
  }
```

3. **If using OpenAI**, the system prompt automatically includes all knowledge base entries, so GPT-4o will handle new intents naturally.

---

## Updating the Knowledge Base

Edit `src/lib/chatbot-knowledge.ts` to add new entries:

```ts
{
  id: 'unique_id',
  question: 'What users might ask',
  answer: 'Your formatted answer with **bold** and [links](/path)',
  tags: ['keyword1', 'keyword2'],
  category: 'general' | 'services' | 'team' | 'booking' | 'fees' | 'contact' | 'blog' | 'legal_info',
}
```

The `tags` array is used for fuzzy matching when a user asks a question. Include common synonyms and related words.

---

## Deployment Notes

### Vercel
- Environment variable `OPENAI_API_KEY` must be set in Vercel project settings
- The chatbot works without the API key (fallback mode)
- Rate limiting uses in-memory store (resets on cold start — acceptable for most traffic)

### API Key Security
- API key is **never** exposed to the client
- All OpenAI calls go through `/api/ai/chat/route.ts` (server-side only)
- The client only sends message history to the API route

---

## Cost Estimation

### OpenAI Token Usage (GPT-4o)
- **System prompt:** ~1,500 tokens (includes knowledge base)
- **Per conversation turn:** ~200-500 tokens (input + output)
- **Average conversation:** 5-8 turns = ~2,000-5,000 tokens total

### Monthly Cost Estimates
| Monthly Conversations | Estimated Cost |
|---|---|
| 100 | ~$1-3 |
| 500 | ~$5-15 |
| 1,000 | ~$10-30 |
| 5,000 | ~$50-150 |

> Based on GPT-4o pricing ($2.50/1M input tokens, $10/1M output tokens). Actual costs depend on conversation length and complexity.

### Without OpenAI API Key
The fallback system (knowledge base + intent detection) handles all queries at **$0 cost**. It covers 90%+ of typical visitor questions about the firm.
