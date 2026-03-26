# Lex Dominion Partners — Law & Leadership

A modern, interactive law firm website built with Next.js 14, featuring GSAP and Framer Motion animations, a complete CMS dashboard, and an AI-powered assistant for bookings and client support.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 (App Router) | React framework with SSR/SSG |
| TypeScript | Type-safe development |
| Tailwind CSS | Utility-first styling |
| GSAP | Advanced scroll & timeline animations |
| Framer Motion | Component-level animations |
| Prisma ORM | Database access layer |
| PostgreSQL (Neon) | Serverless database |
| NextAuth.js | Authentication |
| TipTap | Rich text editor for CMS |
| OpenAI API | AI Assistant |

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database (Neon)

### Installation

```bash
# Clone the repository
cd d:\xampp\htdocs\lexdominion

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database URL and API keys

# Generate Prisma client & push schema
npx prisma generate
npx prisma db push

# Seed the database
npx prisma db seed

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_SECRET` | Random secret for NextAuth |
| `NEXTAUTH_URL` | Base URL (http://localhost:3000) |
| `OPENAI_API_KEY` | OpenAI API key for AI Assistant |

## Project Structure

```
lexdominion/
├── docs/                    # Project documentation
│   ├── PRD.md              # Product Requirements
│   ├── README.md           # This file
│   ├── TASKLIST.md         # Task tracking
│   └── PROJECT_PLAN.md    # Project plan
├── logo/                    # Brand assets
├── prisma/                  # Database schema & migrations
├── public/                  # Static assets
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── (public)/       # Public-facing pages
│   │   ├── admin/          # CMS dashboard
│   │   └── api/            # API routes
│   ├── components/         # Reusable components
│   │   ├── animations/     # GSAP & Framer Motion wrappers
│   │   ├── layout/         # Navbar, Footer, etc.
│   │   ├── sections/       # Homepage sections
│   │   ├── ui/             # UI primitives
│   │   └── ai/             # AI Assistant widget
│   ├── lib/                # Utilities, DB client, auth config
│   ├── hooks/              # Custom React hooks
│   └── types/              # TypeScript type definitions
└── tailwind.config.ts      # Tailwind configuration
```

## Features

### Public Website
- Responsive, mobile-first design
- GSAP scroll-triggered animations
- Framer Motion component animations
- Practice areas showcase
- Attorney profiles
- Blog/Insights section
- Contact form with validation
- Online consultation booking

### CMS Dashboard
- Secure admin authentication
- Manage homepage content
- CRUD for services, team, blog, testimonials
- Booking management
- Contact message inbox
- Media management
- Site settings

### AI Assistant
- Floating chat widget
- Natural language booking
- FAQ responses
- Service information
- Handoff to human support

## Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npx prisma studio  # Open Prisma database GUI
```

## License

Private — Lex Dominion Partners. All rights reserved.
