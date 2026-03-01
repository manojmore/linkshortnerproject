# UI Components & Form Patterns

Guidelines for building React components and forms in the Link Shortener project using shadcn/ui, Tailwind CSS, and Next.js patterns.

## Component Fundamentals

### shadcn/ui Only
**ALL UI elements must use shadcn/ui components.** Do NOT create custom styled components.

- Use existing shadcn/ui components: `Button`, `Input`, `Card`, `Dialog`, `Form`, etc.
- Apply branding through Tailwind CSS classes on shadcn/ui components
- If a needed component doesn't exist in shadcn/ui, suggest adding it rather than creating custom HTML

### File Organization
```
/components
  /ui                    # shadcn/ui components (auto-generated)
  my-component.tsx       # Feature components (PascalCase)
  link-card.tsx
  url-form.tsx
```

### Component File Template
```typescript
'use client'; // Add only if component uses hooks/interactivity

import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MyComponentProps {
  title: string;
  description?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Brief description of what the component does
 * @param title - Main heading
 * @param description - Optional supporting text
 * @param onClick - Callback for button action
 */
export function MyComponent({
  title,
  description,
  onClick,
  className,
}: MyComponentProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <h2 className="text-lg font-semibold">{title}</h2>
      {description && <p className="text-sm text-gray-600">{description}</p>}
      <Button onClick={onClick}>Action</Button>
    </div>
  );
}
```

## Server vs Client Components

### Use Server Components (Default)
- Layout components
- Data fetching (direct database queries)
- Authentication checks
- Static content rendering
- Components that don't need React hooks

```typescript
// app/links/page.tsx (Server Component)
import { LinkCard } from '@/components/link-card';
import { getAllUserLinks } from '@/db/queries';
import { auth } from '@clerk/nextjs/server';

export default async function LinksPage() {
  const { userId } = auth();
  const links = await getAllUserLinks(userId);

  return (
    <div className="space-y-4">
      {links.map((link) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
}
```

### Use Client Components ('use client')
- Forms with React Hook Form
- Interactive elements (click handlers, state changes)
- Components using hooks: `useState`, `useEffect`, `useCallback`
- Real-time validation or debouncing
- Client-side filtering/searching

```typescript
'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchLinks() {
  const [query, setQuery] = useState('');

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Search links..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button>Search</Button>
    </div>
  );
}
```

## Form Handling with React Hook Form

### Form Structure Pattern
```typescript
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Define validation schema
const formSchema = z.object({
  longUrl: z
    .string()
    .url('Please enter a valid URL')
    .min(1, 'URL is required'),
  customSlug: z
    .string()
    .min(2, 'Slug must be at least 2 characters')
    .regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens')
    .optional()
    .or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateLinkFormProps {
  onSuccess?: (shortUrl: string) => void;
}

export function CreateLinkForm({ onSuccess }: CreateLinkFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      longUrl: '',
      customSlug: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const error = await response.json();
        form.setError('root', { message: error.message });
        return;
      }

      const data = await response.json();
      form.reset();
      onSuccess?.(data.shortUrl);
    } catch (error) {
      console.error('Form submission error:', error);
      form.setError('root', { message: 'Something went wrong. Please try again.' });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="longUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Original URL</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://example.com/very/long/url"
                  type="url"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The full URL you want to shorten
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customSlug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Custom Slug (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="my-link"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Custom short identifier. Leave blank for auto-generated.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Creating...' : 'Create Short Link'}
        </Button>

        {form.formState.errors.root && (
          <div className="text-sm text-red-600">
            {form.formState.errors.root.message}
          </div>
        )}
      </form>
    </Form>
  );
}
```

## Component Best Practices

### Props & TypeScript
- Always define `Props` interface for component props
- Use optional props with `?` when appropriate
- Add JSDoc comments for public components
- Export types for consumers: `export type MyComponentProps = {...}`

```typescript
interface CardProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function Card({ title, description, actions }: CardProps) {
  // ...
}
```

### Styling with Tailwind
- Use Tailwind classes, not inline styles
- Use `cn()` utility from `@/lib/utils` to merge class names conditionally

```typescript
import { cn } from '@/lib/utils';

export function Button({ variant = 'primary', className }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-md font-medium transition-colors',
        variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'outline' && 'border border-gray-300 hover:bg-gray-50',
        className
      )}
    >
      {/* ... */}
    </button>
  );
}
```

### Component Composition
- Keep components small and focused (single responsibility)
- Use composition over prop drilling
- Extract complex logic into custom hooks

```typescript
// ❌ Avoid deep prop drilling
<ParentComponent 
  isLoading={isLoading}
  isError={isError}
  error={error}
  onRetry={onRetry}
  className={className}
>
  ...
</ParentComponent>

// ✅ Use composition
<Card>
  <Card.Header title="Links" />
  <Card.Content>
    {isLoading ? <Skeleton /> : <LinkList links={links} />}
  </Card.Content>
  <Card.Footer>
    {isError && <ErrorAlert onRetry={onRetry} />}
  </Card.Footer>
</Card>
```

### Performance Optimization
- Use `React.memo()` for components that receive complex props
- Use `useCallback` for event handlers passed as props
- Use `useMemo` for expensive calculations
- Lazy load components when appropriate

```typescript
import { memo, useCallback } from 'react';

interface LinkItemProps {
  link: Link;
  onDelete: (id: string) => void;
}

export const LinkItem = memo(function LinkItem({ link, onDelete }: LinkItemProps) {
  const handleDelete = useCallback(() => {
    onDelete(link.id);
  }, [link.id, onDelete]);

  return (
    <div className="p-4 border rounded">
      <p>{link.shortUrl}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
});
```

## Form Validation

### Zod Schema Pattern
- Define schemas at module level (not inside components)
- Reuse schemas in multiple places (client forms + server routes)
- Keep validation logic DRY

```typescript
// lib/schemas.ts
import { z } from 'zod';

export const createLinkSchema = z.object({
  longUrl: z
    .string()
    .url('Invalid URL format')
    .min(1, 'URL is required')
    .max(2048, 'URL is too long'),
  customSlug: z
    .string()
    .min(2, 'Slug too short')
    .max(50, 'Slug too long')
    .regex(/^[a-z0-9-]+$/, 'Invalid slug format')
    .optional()
    .or(z.literal('')),
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>;
```

### Server-Side Validation
Always validate on the server, even if client-side validation exists.

```typescript
// app/api/links/route.ts
import { createLinkSchema } from '@/lib/schemas';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate
    const validatedData = createLinkSchema.parse(body);
    
    // Process...
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        { errors: error.errors },
        { status: 400 }
      );
    }
    throw error;
  }
}
```

## Accessibility (a11y)

All components must meet WCAG 2.1 Level AA standards:

- Use semantic HTML elements (`<button>`, `<input>`, `<label>`, etc.)
- Include proper labels for form inputs
- Add ARIA labels for icon-only buttons
- Ensure keyboard navigation works
- Maintain sufficient color contrast
- Use `shadcn/ui` which has built-in accessibility

```typescript
// ✅ Good: Proper labels and semantic HTML
<div className="space-y-2">
  <label htmlFor="link-url" className="text-sm font-medium">
    Short Link
  </label>
  <input
    id="link-url"
    type="text"
    readOnly
    value={shortUrl}
  />
</div>

// ✅ Good: Icon button with aria-label
<button
  aria-label="Copy link to clipboard"
  onClick={copyToClipboard}
>
  <Copy className="h-4 w-4" />
</button>
```

## Common Components to Use

| Use Case | shadcn/ui Component |
|----------|-------------------|
| Call-to-action | `Button` |
| Input fields | `Input` |
| Dropdowns | `Select` |
| Checkboxes | `Checkbox` |
| Radio buttons | `RadioGroup` |
| Text display | `Card`, `Alert` |
| Navigation | `Breadcrumb`, `NavigationMenu` |
| Modals | `Dialog` |
| Loading states | `Skeleton` |
| Error handling | `Alert`, `AlertDialog` |
| Menus | `DropdownMenu` |

## Quick Checklist

- [ ] Component has proper TypeScript types
- [ ] Using only shadcn/ui components (no custom components)
- [ ] Forms use React Hook Form + Zod validation
- [ ] Server/Client component split is correct
- [ ] Accessibility standards met (labels, semantic HTML, keyboard navigation)
- [ ] Error handling implemented (client + server validation)
- [ ] Performance optimizations applied (memo, useCallback)
- [ ] Tailwind CSS classes used (no inline styles)
- [ ] JSDoc comments for public APIs
- [ ] No console.log in production code

---

**Last Updated:** February 2026  
**Related Docs:** [Authentication & Routing](authentication-routing.md), [AGENTS.md](../AGENTS.md)
