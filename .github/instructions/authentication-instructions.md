---
description : REad this for security implementation
---

# Authentication & Routing Guidelines

## Authentication Overview

**Authentication Provider:** [Clerk](https://clerk.com/)

All authentication in this application is handled exclusively by Clerk. No alternative authentication methods should be implemented.

- Clerk manages user signup, login, session management, and logout
- Use Clerk's React components and hooks for auth-related UI
- Verify authentication status server-side when needed
- Store user IDs and metadata from Clerk sessions

## Protected Routes

### Dashboard Route (`/dashboard`)

The `/dashboard` page is a **protected route** and requires the user to be authenticated.

**Implementation:**
- Use Clerk's `auth()` helper in server components to check authentication
- Redirect unauthenticated users to the login page
- For client-side protection, use the `useAuth()` hook from `@clerk/nextjs`

Example server-side protection:
```typescript
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }) {
  const { userId } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  return <>{children}</>;
}
```

## Authenticated User Redirects

### Homepage (`/`) Behavior

When an authenticated user accesses the homepage, they should be **automatically redirected** to the `/dashboard` page.

**Implementation:**
```typescript
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function Home() {
  const { userId } = await auth();
  
  if (userId) {
    redirect('/dashboard');
  }
  
  // Show homepage content only for unauthenticated users
  return (
    // landing page content
  );
}
```

## Sign In & Sign Up Components

Sign-in and sign-up flows through Clerk **must always launch as modals**, not full-page redirects.

**Implementation with `<SignInButton>` and `<SignUpButton>`:**
```typescript
import { SignInButton, SignUpButton } from '@clerk/nextjs';

export function AuthButtons() {
  return (
    <>
      <SignInButton mode="modal" />
      <SignUpButton mode="modal" />
    </>
  );
}
```

**Key Settings:**
- Always include `mode="modal"` prop on `SignInButton` and `SignUpButton` components
- Never use `mode="redirect"` for these flows
- Modals maintain context and provide better UX on the current page

For customized modal dialogs, use the `<SignIn />` and `<SignUp />` components wrapped in a modal container:
```typescript
import { SignIn } from '@clerk/nextjs';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export function SignInModal({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <SignIn />
      </DialogContent>
    </Dialog>
  );
}
```

## Clerk Integration Points

### Middleware Configuration

Protect routes using Clerk middleware in `middleware.ts`:

```typescript
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

### Accessing User Information

Use Clerk hooks in client components:
```typescript
import { useAuth, useUser } from '@clerk/nextjs';

export function UserInfo() {
  const { userId } = useAuth();
  const { user } = useUser();
  
  return <p>Welcome, {user?.firstName}</p>;
}
```

## Security Considerations

- Never expose sensitive Clerk configuration in client-side code
- Always verify authentication server-side for API routes handling sensitive data
- Use Clerk's `clerkClient` for server-side operations
- Keep session tokens secure (Clerk manages this automatically)
- Validate user permissions before processing protected operations

## Environment Variables

Required Clerk environment variables in `.env.local`:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

Do not commit `.env.local` to version control.

---

**Last Updated:** February 2026  
**Related:** [AGENTS.md](../AGENTS.md)
