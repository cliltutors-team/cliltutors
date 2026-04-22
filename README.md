# ClilTutors Monorepo Deployment

This monorepo contains two applications deployed separately on Vercel:

## Applications

### 🌐 Web App (`@cliltutors/web`)

- **Path**: `apps/web/`
- **Framework**: Next.js 15.5.7
- **Build Command**: `bun run build`
- **Output Directory**: `.next/`
- **Port**: 3000 (development)

### 🚀 Landing Page (`@cliltutors/landing`)

- **Path**: `apps/landing/`
- **Framework**: Astro 5.17.1
- **Build Command**: `bun run build`
- **Output Directory**: `dist/`
- **Port**: 4321 (development)

## Vercel Deployment Setup

### Option 1: Separate Vercel Projects (Recommended)

1. **Create two Vercel projects**:
   - Project 1: `cliltutors-web`
   - Project 2: `cliltutors-landing`

2. **Configure each project**:

   **Web App (cliltutors-web)**:
   - Root Directory: `apps/web`
   - Framework Preset: Next.js
   - Build Command: `bun run build`
   - Output Directory: `.next`
   - Install Command: `bun install`

   **Landing Page (cliltutors-landing)**:
   - Root Directory: `apps/landing`
   - Framework Preset: Astro
   - Build Command: `bun run build`
   - Output Directory: `dist`
   - Install Command: `bun install`

3. **Environment Variables**:
   Set in each Vercel project dashboard as needed.

### Option 2: Monorepo Deployment (vercel.json)

This repository includes `vercel.json` for monorepo deployment configuration.

## Local Development

```bash
# Install dependencies
bun install

# Run all apps in development
bun run dev

# Run specific app
bun run dev --filter=@cliltutors/web
bun run dev --filter=@cliltutors/landing

# Build all apps
bun run build

# Lint all apps
bun run lint

# Type check all apps
bun run check-types
```

## Project Structure

```
├── apps/
│   ├── web/              # Next.js web application
│   ├── landing/          # Astro landing page
│   └── docs/             # Documentation site
├── packages/
│   ├── ui/               # Shared UI components
│   ├── tailwind-config/  # Shared Tailwind configuration
│   ├── eslint-config/    # Shared ESLint configuration
│   └── typescript-config/# Shared TypeScript configuration
├── turbo.json            # Turborepo configuration
├── package.json          # Root package.json
└── vercel.json           # Vercel deployment configuration
```

## Shared Packages

### @repo/tailwind-config

Shared Tailwind configuration with font definitions:

```typescript
import { fonts, defaultFont, headingFont } from "@repo/tailwind-config/fonts";
```

### @repo/ui

Shared React components (if any).

### @repo/eslint-config

Shared ESLint rules for consistent code quality.

### @repo/typescript-config

Shared TypeScript configurations for type safety.
