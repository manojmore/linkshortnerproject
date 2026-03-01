# LLM Agent Instructions - Link Shortener Project

This document provides coding standards and guidelines for LLM agents assisting with development on the Link Shortener project. Detailed instructions are organized in separate markdown files in the `/docs` directory.

## Quick Reference

**Project Type:** Next.js Full-Stack Application  
**Primary Language:** TypeScript  
**Package Manager:** npm  
**Node Version:** 18+  
**Database:** Neon (Serverless PostgreSQL with Drizzle ORM)  
**Authentication:** Clerk  
**UI Framework:** React 19 with Tailwind CSS & shadcn/ui  

## Core Development Principles

1. **Type Safety First** - Always use TypeScript with strict mode enabled
2. **Component-Oriented** - Build reusable, testable React components
3. **Server-Side When Possible** - Leverage Next.js server components and API routes
4. **DRY Code** - Avoid repetition; extract reusable utilities and components
5. **Performance Conscious** - Minimize bundle size and optimize rendering
6. **Security Aware** - Follow authentication and data validation best practices
7. **Accessibility First** - Implement WCAG 2.1 Level AA standards
8. **Clean Architecture** - Maintain clear separation of concerns

## Project Structure

```
/app              # Next.js app directory with routes and layouts
/db               # Database schema and migrations
/docs             # Detailed LLM instruction files (this directory!)
/lib              # Shared utilities and helper functions
/public           # Static assets
/components       # Reusable React components (if created)
/api              # API route handlers (under /app)
```

## Technology Stack Details

| Category | Technology | Version |
|----------|-----------|---------|
| Framework | Next.js | 16.1.6 |
| UI Library | React | 19.2.3 |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 4.x |
| Components | shadcn/ui | Latest |
| Database | Drizzle ORM | 0.45.1 |
| Database Backend | Neon | 1.0.2 |
| Auth | Clerk | 6.38.1 |
| Icons | Lucide React | 0.575.0 |
| Linting | ESLint | 9.x |

## Development Workflow

### Before Starting Work
- Review the relevant documentation file in `/docs`
- Check existing similar implementations
- Ensure TypeScript `strict: true` compliance
- Verify ESLint passes before committing

### During Development
- Write self-documenting code with clear naming
- Keep functions small and focused (single responsibility)
- Add JSDoc comments for public APIs
- Use Tailwind CSS classes consistently
- Test accessibility with keyboard navigation

### Code Review Checklist
- [ ] TypeScript strict mode compliant
- [ ] No `any` types without justification
- [ ] Components are properly typed
- [ ] ESLint passes
- [ ] No console.log statements in production code
- [ ] Accessible markup (proper ARIA labels, semantic HTML)
- [ ] Performance optimizations applied (memoization, server components)

## Important Commands

```bash
# Development
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Run production build
npm run lint         # Run ESLint

# Database
npx drizzle-kit push # Push schema changes to database
npx drizzle-kit generate # Generate migrations
```

## Authentication & Security

- **Auth Provider:** Clerk (managed authentication)
- **Protected Routes:** Use Clerk middleware on sensitive routes
- **API Security:** Validate all user input, verify authentication tokens
- **Secrets:** Use `.env.local` for environment variables (never commit secrets)
- **CORS:** Configure appropriately for API routes

## Documentation Files

For detailed guidelines on specific topics, refer to the modular documentation in the `/docs` directory. ALWAYS refer to the relevant .md file before generating any code:

- **[Authentication & Routing](docs/authentication-routing.md)** - Clerk authentication, protected routes, user redirects
- **[UI Components & Form Patterns](docs/ui-component-patterns.md)** - shadcn/ui components, React patterns, form handling with validation



## Key Conventions

### Naming
- **Files:** kebab-case (`user-avatar.tsx`, `api-client.ts`)
- **Components:** PascalCase (`UserAvatar`, `LinkCard`)
- **Functions/Variables:** camelCase (`getUserLinks()`, `isValidUrl`)
- **Constants:** UPPER_SNAKE_CASE (`MAX_URL_LENGTH`, `API_BASE_URL`)

### Imports
- Group imports: Next.js → React → External libs → Local files
- Use path aliases (`@/*` resolves to project root)
- Import only what you use

### Component Structure
```typescript
import { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';

interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

export default function MyComponent({ title, onClick }: MyComponentProps) {
  return <button onClick={onClick}>{title}</button>;
}
```

## Error Handling

- Use try-catch in async operations
- Return meaningful error messages to clients
- Log errors server-side (avoid exposing sensitive info to client)
- Use appropriate HTTP status codes in API routes
- Implement proper error boundaries in components

## Testing Philosophy

- Write tests for critical business logic
- Use component testing for UI interactions
- Mock external services (Clerk, database)
- Aim for meaningful test coverage, not 100%

## Git Workflow

- **Branch naming:** `feature/feature-name`, `fix/bug-name`
- **Commit messages:** Use descriptive, imperative mood ("Add user links feature" not "added")
- **Pull requests:** Include description and reference issues

## Getting Help

When assistance is needed:
1. Check relevant `/docs` file first
2. Review existing similar code in the project
3. Consult TypeScript/Next.js official documentation
4. Ask clarifying questions about requirements

## Agent Behavior Guidelines

As an LLM assisting with this project:
- ✅ Suggest improvements to existing code
- ✅ Implement features following established patterns
- ✅ Add proper TypeScript types to all code
- ✅ Include comments for complex logic
- ✅ Optimize for performance and bundle size
- ❌ Do NOT introduce new dependencies without discussion
- ❌ Do NOT break existing implementations
- ❌ Do NOT add TODO comments without context
- ❌ Do NOT push code without TypeScript/ESLint compliance

---

**Last Updated:** February 2026  
**Project:** Link Shortener (Next.js)  
**Maintainer:** Development Team
