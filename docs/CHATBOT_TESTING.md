# Lex AI Chatbot — Testing Checklist

## Core Functionality
- [ ] Chatbot widget loads on all public pages without breaking layout
- [ ] OpenAI API call succeeds and returns a structured JSON response
- [ ] API key is NOT exposed in browser network requests (check DevTools → Network)
- [ ] Greeting message and quick replies appear on first open
- [ ] Fallback responses work correctly when OpenAI API key is not configured
- [ ] Rate limiting blocks excessive requests (30/minute threshold)

## Conversation Flows
- [ ] **Booking flow:** User says "book consultation" → gets guided to /booking with practice area suggestions
- [ ] **Lead capture flow:** User says "leave a message" → prompted for name → email → message → submission confirmed
- [ ] **Lead capture validation:** Invalid email is rejected with retry prompt
- [ ] **Lead capture cancel:** User can type "Cancel" to exit lead capture flow
- [ ] **FAQ flow:** Questions about services, team, hours, fees return accurate knowledge base answers
- [ ] **Escalation flow:** Frustration keywords trigger empathetic response with contact options
- [ ] **Greeting flow:** "Hi" / "Hello" returns branded greeting with quick replies

## Knowledge Base
- [ ] Practice areas query returns all 8 services with descriptions
- [ ] Team query returns all 8 attorneys with correct names and titles
- [ ] Contact info query returns phone, email, and address
- [ ] Office hours query returns correct weekday, Saturday, and Sunday hours
- [ ] Fee query explains free initial consultation and flexible payments
- [ ] Blog query lists recent articles

## UI/UX
- [ ] Floating button appears in bottom-right corner with pulse animation
- [ ] Unread badge shows on launcher when chat has unread messages
- [ ] Chat window opens with smooth animation
- [ ] Chat window closes with smooth animation
- [ ] Minimize/expand toggle works correctly
- [ ] Messages auto-scroll to bottom on new message
- [ ] Input field auto-focuses when chat opens
- [ ] Quick reply chips are clickable and send the correct message
- [ ] Quick replies only show on the latest assistant message
- [ ] Typing indicator (animated dots) shows while waiting for response
- [ ] Markdown links in messages are rendered as clickable links
- [ ] Bold text in messages is rendered correctly
- [ ] Bullet points are formatted properly
- [ ] Timestamps show on messages with >1 minute gap
- [ ] Character count appears when input exceeds 400 characters

## Mobile
- [ ] Chat window goes full-screen on mobile (<640px)
- [ ] All UI elements are accessible and tappable on mobile
- [ ] Virtual keyboard doesn't obscure input field
- [ ] Scrolling works correctly in message area

## Accessibility
- [ ] ARIA labels present on launcher button, chat window, input, and send button
- [ ] Chat window has `role="dialog"` attribute
- [ ] Keyboard navigation works (Tab through elements)
- [ ] Focus moves to input when chat opens

## Error Handling
- [ ] Graceful error message shown if API call fails
- [ ] Lead capture shows fallback contact info on submission failure
- [ ] Rate limit message shown when threshold exceeded (429 response)

## Security
- [ ] OPENAI_API_KEY only used server-side in /api/ai/chat/route.ts
- [ ] No sensitive data exposed in client-side JavaScript
- [ ] Lead capture data stored via server-side API route
- [ ] Input sanitized (max 500 characters)

## Integration
- [ ] Chatbot renders on homepage
- [ ] Chatbot renders on services pages
- [ ] Chatbot renders on team page
- [ ] Chatbot renders on blog pages
- [ ] Chatbot renders on contact page
- [ ] Chatbot renders on booking page
- [ ] Chatbot does NOT render on admin pages
- [ ] Old AIAssistant component no longer loaded
