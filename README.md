# OmiseBiz Frontend

Restaurant Management Platform - Frontend Application

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Material UI (MUI)
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running on `http://localhost:4000`

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth pages (login, register)
│   ├── (dashboard)/       # Protected dashboard pages
│   ├── r/[slug]/          # Public restaurant pages
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # Reusable UI components
│   ├── forms/             # Form components
│   ├── restaurant/        # Restaurant-specific components
│   ├── layout/            # Layout components
│   └── providers/         # Context providers
└── lib/
    ├── api.ts             # API client
    ├── store.ts           # Zustand stores
    ├── types.ts           # TypeScript types
    ├── utils.ts           # Utility functions
    ├── constants.ts       # Constants
    └── validations.ts     # Zod schemas
```

## 🌍 Environment Variables

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 📚 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 🎨 Features

### Phase 1: ✅ Infrastructure
- Next.js setup with TypeScript
- MUI theme configuration
- API client with interceptors
- Auth store with Zustand
- Route protection middleware

### Phase 2: 🚧 Authentication (In Progress)
- Login page
- Register page
- User session management

### Phase 3: 📋 Dashboard
- Restaurant list
- Create/Edit forms
- Delete functionality

### Phase 4: 🍽️ Public Pages
- Public restaurant pages
- SEO optimization
- Social sharing

## 📖 Documentation

- [Manifest](./docs/manifest.md) - Project overview
- [Backend Roadmap](./docs/roadmap.md) - Backend development plan
- [Frontend Roadmap](./docs/frontend-roadmap.md) - Frontend development plan
- [API Reference](./docs/backend-api-reference.md) - Backend API documentation

## 🔗 Backend

Make sure the backend is running:
```bash
# In backend directory
npm run dev
```

Backend should be available at `http://localhost:4000`

## 🧑‍💻 Development

1. Start backend server (port 4000)
2. Start frontend dev server: `npm run dev`
3. Open browser at `http://localhost:3000`

## 📄 License

ISC
