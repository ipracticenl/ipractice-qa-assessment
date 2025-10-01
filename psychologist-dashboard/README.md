# 🧠 Psychology Dashboard

## 🚀 Installation

```bash
# Install dependencies
npm ci --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build

# Preview build
npm run preview

# Run unit tests
npm test

# Run unit tests in watch mode
npm run test:watch

# Run linting
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui base components
│   ├── client/         # Client-specific components
│   ├── psychologist/   # Psychologist-specific components
├── pages/              # Main page components
│   ├── client-dashboard.tsx
│   ├── psychologist-dashboard.tsx
│   └── landing-page.tsx
├── lib/                # Utility functions and configurations
│   ├── api/            # API functions and hooks
│   ├── context/        # React contexts
│   ├── react-query/    # TanStack Query configuration
│   └── theme/          # Theme configuration
├── types/              # TypeScript type definitions
├── public/             # Static files
├── App.tsx             # Main application component
├── main.tsx            # Entry point
└── globals.css         # Global styles
```
