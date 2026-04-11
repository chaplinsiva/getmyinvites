# Architecture & Strategy

## Project Overview
"MakeMyInvites" is a Next.js (App Router) based application designed to allow users to create, customize, and share digital wedding invitations.

## Tech Stack
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript

## Directory Structure
- `src/app/`: Next.js App Router root. Contains all page routes (`page.tsx`), layouts (`layout.tsx`), and route-specific logic.
- `src/components/layout/`: Global layout components like Header, Footer.
- `src/components/home/`: Components specific to the home page (e.g., Hero, Features overview).
- `src/components/shared/`: Reusable UI components (Buttons, Inputs, Cards).
- `src/components/invitations/`: Components specifically for the invitation viewing, editing, and listing features.
- `src/lib/`: Utility functions, helper classes, and configuration files.

## Future Plans (To Be Implemented)
- **Database/Backend integration** (e.g., Supabase / Vercel Postgres) for storing users, invitation metrics, and customized template data.
- **Authentication system**.
- **Interactive template builder** feature.
