# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal writing/blog site built with Next.js 15, focusing on minimalist design and custom-built components. The site renders MDX notes with custom components and features a newsletter subscription system powered by Resend.

## Core Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build production bundle with Turbopack
- `npm start` - Start production server
- `npm run lint` - Lint code using Biome
- `npm run format` - Format code using Biome

## Architecture

### MDX Content System

The site's core architecture revolves around MDX notes stored in `src/notes/`. The system works as follows:

1. **Content Loading** (`src/utils/fetch-mdx.ts`):
   - `getNote(fileName)` - Loads and compiles a single MDX file with frontmatter
   - `getNotes()` - Loads all notes from `src/notes/` directory
   - Uses `next-mdx-remote/rsc` for server-side MDX compilation
   - Frontmatter is validated using Zod schema (`NoteSchema`)

2. **Routing**:
   - Homepage (`src/app/page.tsx`) - Displays all notes sorted by publish date
   - Individual note pages (`src/app/[id]/page.tsx`) - Renders single note with dynamic route matching MDX filename

3. **Custom MDX Components**:
   All custom components are registered in `fetch-mdx.ts` and available in MDX files:
   - `<Aside>` - Side annotations (visible on large screens only, positioned absolutely)
   - `<NoteImage>` - Optimized images with captions
   - `<Callout>` - Highlighted callout boxes with optional type
   - `<CenterQuote>` - Centered quote styling
   - `<Container>` - Layout wrapper component
   - `<a>` - Custom link component (`ATag`) with styling

### Frontmatter Schema

All MDX notes must include these frontmatter fields:
```yaml
title: string (required)
description: string (optional)
published: string (required, ISO date format)
updated: string (required, ISO date format)
readingTime: string (required)
tags: array of strings (defaults to [])
redirectUrl: string (optional)
coverImage: string (optional)
coverImageAlt: string (optional)
backgroundCoverImage: string (optional)
backgroundCoverImageAlt: string (optional)
```

### Component Structure

- `src/components/notes/` - MDX-specific components (Aside, Callout, etc.)
- `src/components/structure/` - Layout components (Header, MainLayout, ArticleList, etc.)
- `src/components/design/` - Design elements (FeaturedNote)
- `src/components/ui/` - Reusable UI components (Dialog, Input - Radix UI based)

### Environment Variables

Required environment variables (validated in `src/env.ts`):
- `RESEND_API_KEY` - API key for Resend email service
- `RESEND_AUDIENCE_ID` - Resend audience ID for newsletter subscriptions

### Styling

- Uses Tailwind CSS v4 with PostCSS
- Custom fonts loaded via `src/utils/fonts.ts` (titleFont, bodyFont)
- Typography plugin for prose styling
- Custom utility function `cn()` in `src/lib/utils.ts` for conditional classnames

### Image Handling

- Next.js Image component with remote pattern configured for `lhfsdw7dl5.ucarecd.net`
- Custom `NoteImage` component handles image optimization and captions

## Development Workflow

### Adding a New Note

1. Create a new `.mdx` file in `src/notes/`
2. Include required frontmatter at the top
3. Use custom components as needed (`<Aside>`, `<Callout>`, etc.)
4. File will be automatically picked up by `getNotes()` and routed via `[id]/page.tsx`

### Modifying MDX Components

When adding or modifying custom MDX components:
1. Create/edit component in `src/components/notes/`
2. Register component in `src/utils/fetch-mdx.ts` in the `components` object
3. Component is now available globally in all MDX files

### Server Actions

Newsletter subscription is handled via server action at `src/app/actions/resend.ts`. Uses Resend API to add contacts to audience.

## Code Style

- Uses Biome for linting and formatting (configured in `biome.json`)
- 2-space indentation
- Next.js and React recommended rules enabled
- Import organization on save
