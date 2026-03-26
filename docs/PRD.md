# Product Requirements Document (PRD)
# Lex Dominion Partners — Law & Leadership

## 1. Overview

**Product Name:** Lex Dominion Partners Website  
**Tagline:** Law & Leadership  
**Type:** Law Firm Corporate Website with CMS & AI Assistant  
**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, GSAP, Framer Motion, Prisma ORM, PostgreSQL (Neon), NextAuth.js  

## 2. Objectives

- Build a modern, interactive, and professional law firm website
- Implement a complete Content Management System (CMS) for admin control
- Integrate an AI-powered assistant for booking management and client support
- Deliver premium animations using GSAP and Framer Motion
- Ensure mobile-first responsive design with accessibility compliance

## 3. Target Audience

- **Primary:** Prospective clients seeking legal services
- **Secondary:** Existing clients managing appointments
- **Tertiary:** Admin staff managing website content

## 4. Design & Branding

### Color Palette (derived from logo)
| Role | Color | Hex |
|------|-------|-----|
| Primary Gold | Dark Gold | #C5A54E |
| Secondary Gold | Deep Gold | #A38A3B |
| Accent Gold | Light Gold | #E8D48B |
| Primary Dark | Navy | #1B2A4A |
| Secondary Dark | Charcoal | #2D3748 |
| Background Light | Off-White | #FAFAF5 |
| Background Dark | Deep Navy | #0F1B2D |
| Text Primary | Near Black | #1A1A1A |
| Text Secondary | Gray | #6B7280 |

### Typography
- **Headings:** Playfair Display (serif) — conveys authority and tradition
- **Body:** Inter (sans-serif) — modern and highly readable
- **Accent:** Cormorant Garamond (serif) — elegant for taglines

### Logo
- Horizontal logo used in navbar: `h-logo.png`
- Shield + Scales of Justice emblem

## 5. Pages & Features

### 5.1 Public Pages

#### Homepage
- **Hero Section:** Full-screen with parallax, animated text reveal (GSAP), CTA buttons
- **Practice Areas:** Animated cards with hover effects (Framer Motion)
- **About Preview:** Split layout with image and animated counter stats
- **Team Highlights:** Carousel of key attorneys
- **Testimonials:** Auto-scrolling testimonial slider
- **CTA Section:** Consultation booking prompt
- **News/Blog Preview:** Latest 3 articles

#### About Us
- Firm history with timeline animation
- Mission, Vision, Values with scroll-triggered reveals
- Awards & recognitions

#### Practice Areas / Services
- Grid of practice areas with detail pages
- Areas: Corporate Law, Litigation, Real Estate, Family Law, Criminal Defense, Intellectual Property, Immigration, Tax Law

#### Our Team
- Attorney profiles with photos, bios, specializations
- Filter by practice area
- Individual attorney detail pages

#### Blog / Insights
- Article listing with categories and tags
- Individual article pages with rich content
- Search and filter functionality

#### Contact Us
- Contact form with validation
- Office locations with map integration
- Phone, email, social links
- Business hours

#### Booking / Consultation
- Online consultation booking form
- Date/time picker
- Practice area selection
- Confirmation system

### 5.2 AI Assistant
- Floating chat widget on all pages
- Natural language booking creation
- FAQ responses about services, hours, fees
- Handoff to human support option
- Conversation history

### 5.3 CMS Admin Dashboard

#### Authentication
- Secure login with NextAuth.js
- Role-based access (Super Admin, Editor)

#### Content Management
- **Homepage:** Edit hero text, images, CTAs
- **Services:** CRUD for practice areas
- **Team:** CRUD for attorney profiles
- **Blog:** Rich text editor for articles, categories, tags
- **Testimonials:** CRUD for client testimonials
- **Settings:** Site-wide settings (contact info, social links, business hours)
- **Bookings:** View, manage, approve/reject consultation requests
- **Messages:** View contact form submissions
- **Media:** Upload and manage images/documents
- **Analytics:** Basic dashboard with page views and booking stats

## 6. Technical Requirements

### Performance
- Lighthouse score > 90 on all metrics
- Image optimization with Next.js Image component
- Code splitting and lazy loading

### SEO
- Dynamic meta tags per page
- Open Graph and Twitter Card support
- Structured data (JSON-LD) for law firm
- Sitemap and robots.txt

### Security
- CSRF protection
- Input sanitization
- Rate limiting on API routes
- Secure authentication with hashed passwords

### Database
- PostgreSQL via Neon (serverless)
- Prisma ORM for type-safe queries
- Connection pooling enabled

## 7. Animations Strategy

### GSAP
- Hero text reveal animations
- Scroll-triggered section entrances
- Parallax effects on hero images
- Number counter animations
- Page transition effects

### Framer Motion
- Component mount/unmount animations
- Hover and tap interactions on cards
- Layout animations for filtering
- Modal and drawer transitions
- Staggered list animations

## 8. API Structure

```
/api/auth/[...nextauth]  — Authentication
/api/services             — Practice areas CRUD
/api/team                 — Attorney profiles CRUD
/api/blog                 — Blog articles CRUD
/api/testimonials         — Testimonials CRUD
/api/bookings             — Booking management
/api/contact              — Contact form submissions
/api/settings             — Site settings
/api/media                — Media upload/management
/api/ai/chat              — AI Assistant endpoint
```

## 9. Third-Party Integrations

- **Database:** Neon PostgreSQL
- **Authentication:** NextAuth.js
- **AI:** OpenAI API (GPT) for assistant
- **Maps:** Google Maps or Leaflet
- **Email:** Nodemailer for notifications
- **Rich Text:** TipTap editor for CMS

## 10. Success Metrics

- Page load time < 2 seconds
- Mobile responsiveness across all devices
- Full CMS functionality for non-technical staff
- AI Assistant handles 80%+ of common queries
- SEO-optimized for local law firm searches
