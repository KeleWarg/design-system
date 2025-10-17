# Theming Guide - Design Tokens & Global Customization

## Overview

Your design system uses **CSS variables** (design tokens) as a single source of truth for colors, typography, spacing, and icons. This allows you to make global updates without modifying individual components.

## 📍 Where to Make Changes

### 1. CSS Variables (Primary Method)
**File:** `docs/app/globals.css`

This is where you define all your design tokens. Changes here automatically propagate to all components.

```css
:root {
  /* Change primary brand color globally */
  --primary: 173 80% 40%;        /* Teal-600 */
  --primary-hover: 173 80% 35%;   /* Teal-700 */
  --primary-active: 173 80% 30%;  /* Teal-800 */
  
  /* Change button sizes globally */
  --button-height-sm: 2rem;
  --button-height-base: 2.5rem;
  --button-height-lg: 3rem;
  
  /* Change icon sizes globally */
  --icon-sm: 1rem;
  --icon-base: 1.25rem;
  --icon-lg: 1.5rem;
}
```

### 2. Design Tokens Config (TypeScript)
**File:** `docs/lib/design-tokens.ts`

Use this for programmatic access to tokens and for documentation purposes.

```typescript
export const designTokens = {
  colors: {
    brand: {
      primary: '173 80% 40%',
      primaryHover: '173 80% 35%',
      // ...
    }
  }
}
```

## 🎨 Making Global Theme Changes

### Change Primary Brand Color

**Example: Change from Teal to Purple**

```css
/* docs/app/globals.css */
:root {
  /* Old: Teal */
  /* --primary: 173 80% 40%; */
  
  /* New: Purple */
  --primary: 271 91% 65%;        /* Purple-500 */
  --primary-hover: 271 91% 60%;  /* Purple-600 */
  --primary-active: 271 91% 55%; /* Purple-700 */
}
```

**Result:** All Primary buttons, badges, and components automatically update.

### Change Button Heights Globally

```css
:root {
  /* Make all buttons taller */
  --button-height-sm: 2.25rem;   /* Was 2rem */
  --button-height-base: 2.75rem; /* Was 2.5rem */
  --button-height-lg: 3.5rem;    /* Was 3rem */
}
```

**Result:** All buttons across the system are now taller.

### Change Icon Sizes Globally

```css
:root {
  /* Make all icons larger */
  --icon-sm: 1.125rem;  /* Was 1rem */
  --icon-base: 1.5rem;  /* Was 1.25rem */
  --icon-lg: 1.75rem;   /* Was 1.5rem */
}
```

### Change Border Radius Globally

```css
:root {
  /* Make everything more rounded */
  --radius: 0.75rem; /* Was 0.5rem */
}
```

## 🎯 Component-Specific Tokens

### Button Component

The Button component uses these tokens:

```css
/* Button Colors */
--primary           /* Primary button background */
--primary-hover     /* Primary button hover state */
--primary-active    /* Primary button active state */
--secondary         /* Secondary button background */
--success           /* Success button background */
--warning           /* Warning button background */
--destructive       /* Destructive button background */

/* Button Sizes */
--button-height-sm   /* Small button height */
--button-height-base /* Default button height */
--button-height-lg   /* Large button height */

/* Animation */
--duration-base     /* Transition duration */
```

**Component File:** `docs/components/ui/button.tsx`

```typescript
const buttonVariants = cva(
  "... duration-[var(--duration-base)] ...",
  {
    variants: {
      Type: {
        Primary: "bg-primary hover:bg-primary-hover active:bg-primary-active",
        Success: "bg-success hover:bg-success-hover",
        // Uses CSS variables!
      },
      Size: {
        Small: "h-[var(--button-height-sm)] ...",
        Base: "h-[var(--button-height-base)] ...",
        Large: "h-[var(--button-height-lg)] ...",
        // Uses CSS variables!
      }
    }
  }
)
```

### Badge Component

The Badge component uses these tokens:

```css
/* Badge Colors */
--primary           /* Default badge */
--success           /* Success badge */
--warning           /* Warning badge */
--destructive       /* Error badge */
--info              /* Info badge */
--secondary         /* Secondary badge */

/* Animation */
--duration-base     /* Transition duration */
```

**Component File:** `docs/components/ui/badge.tsx`

```typescript
const badgeVariants = cva(
  "... duration-[var(--duration-base)] ...",
  {
    variants: {
      variant: {
        default: "bg-primary hover:bg-primary-hover",
        success: "bg-success hover:bg-success-hover",
        warning: "bg-warning hover:bg-warning-hover",
        // Uses CSS variables!
      }
    }
  }
)
```

## 🌓 Dark Mode Support

All tokens automatically support dark mode. When you change a token, update both light and dark variants:

```css
:root {
  /* Light mode */
  --primary: 173 80% 40%;
  --primary-hover: 173 80% 35%;
}

.dark {
  /* Dark mode - adjust for better visibility */
  --primary: 173 70% 50%;
  --primary-hover: 173 70% 55%;
}
```

## 📦 Available Design Tokens

### Color Tokens

| Token | Purpose | Example Value |
|-------|---------|---------------|
| `--primary` | Primary brand color | `173 80% 40%` (Teal) |
| `--primary-hover` | Primary hover state | `173 80% 35%` |
| `--primary-active` | Primary active state | `173 80% 30%` |
| `--secondary` | Secondary color | `220 14% 96%` (Gray) |
| `--success` | Success/positive actions | `142 76% 36%` (Green) |
| `--warning` | Warning/caution | `38 92% 50%` (Orange) |
| `--error` / `--destructive` | Error/danger | `0 84% 60%` (Red) |
| `--info` | Informational | `217 91% 60%` (Blue) |
| `--background` | Page background | `0 0% 100%` (White) |
| `--foreground` | Text color | `222 84% 5%` (Dark) |
| `--border` | Border color | `214 32% 91%` |
| `--border-strong` | Emphasized borders | `213 27% 84%` |
| `--ring` | Focus ring color | `173 80% 40%` |

### Size Tokens

| Token | Purpose | Example Value |
|-------|---------|---------------|
| `--button-height-sm` | Small button height | `2rem` (32px) |
| `--button-height-base` | Default button height | `2.5rem` (40px) |
| `--button-height-lg` | Large button height | `3rem` (48px) |
| `--icon-xs` | Extra small icon | `0.875rem` (14px) |
| `--icon-sm` | Small icon | `1rem` (16px) |
| `--icon-base` | Default icon | `1.25rem` (20px) |
| `--icon-lg` | Large icon | `1.5rem` (24px) |
| `--icon-xl` | Extra large icon | `2rem` (32px) |

### Border Radius Tokens

| Token | Purpose | Example Value |
|-------|---------|---------------|
| `--radius-sm` | Small radius | `0.25rem` (4px) |
| `--radius-base` | Default radius | `0.375rem` (6px) |
| `--radius-md` | Medium radius | `0.5rem` (8px) |
| `--radius-lg` | Large radius | `0.75rem` (12px) |
| `--radius` | Global default | `0.5rem` (8px) |

### Animation Tokens

| Token | Purpose | Example Value |
|-------|---------|---------------|
| `--duration-fast` | Fast transitions | `150ms` |
| `--duration-base` | Default transitions | `200ms` |
| `--duration-slow` | Slow transitions | `300ms` |

## 🔄 Workflow for Adding New Components

When creating new components, always use design tokens:

### ✅ Good (Uses tokens)

```typescript
const myComponent = cva(
  "bg-primary text-primary-foreground hover:bg-primary-hover duration-[var(--duration-base)]",
  {
    variants: {
      size: {
        sm: "h-[var(--button-height-sm)]",
        lg: "h-[var(--button-height-lg)]"
      }
    }
  }
)
```

### ❌ Bad (Hardcoded values)

```typescript
const myComponent = cva(
  "bg-blue-600 text-white hover:bg-blue-700",
  {
    variants: {
      size: {
        sm: "h-8",
        lg: "h-12"
      }
    }
  }
)
```

## 🎨 Creating Custom Themes

### Example: Create a "Sunset" Theme

1. **Define your colors:**
   ```css
   /* docs/app/globals.css */
   .theme-sunset {
     --primary: 14 100% 57%;        /* Orange */
     --primary-hover: 14 100% 52%;
     --success: 45 93% 47%;         /* Yellow */
     --info: 271 91% 65%;           /* Purple */
   }
   ```

2. **Apply the theme:**
   ```tsx
   <body className="theme-sunset">
     {/* All components use sunset colors */}
   </body>
   ```

### Example: Create a "High Contrast" Theme

```css
.theme-high-contrast {
  --primary: 0 0% 0%;              /* Pure black */
  --primary-foreground: 0 0% 100%; /* Pure white */
  --border: 0 0% 0%;
  --border-strong: 0 0% 20%;
}
```

## 🔧 Tailwind Configuration

The design tokens are also available in Tailwind via the `@theme` directive:

```css
@theme inline {
  --color-primary: hsl(var(--primary));
  --color-primary-hover: hsl(var(--primary-hover));
  /* etc. */
}
```

This allows you to use them in Tailwind classes:

```tsx
<div className="bg-primary text-primary-foreground">
  Automatically themed!
</div>
```

## 📚 Best Practices

1. **Always use tokens** - Never hardcode colors, sizes, or durations
2. **Test dark mode** - Update both light and dark variants when changing tokens
3. **Use semantic names** - Use `--success` instead of `--green`
4. **Document changes** - Update `design-tokens.ts` when you modify CSS variables
5. **Test thoroughly** - Preview all components after theme changes
6. **Version control** - Commit token changes separately from component changes

## 🚀 Quick Reference

### Change Primary Color
```css
:root { --primary: YOUR_COLOR; }
.dark { --primary: YOUR_COLOR_DARK; }
```

### Change Button Size
```css
:root { --button-height-base: YOUR_SIZE; }
```

### Change Icon Size
```css
:root { --icon-base: YOUR_SIZE; }
```

### Change Animation Speed
```css
:root { --duration-base: YOUR_DURATION; }
```

## 🔗 Related Files

- **CSS Variables:** `docs/app/globals.css`
- **Token Config:** `docs/lib/design-tokens.ts`
- **Button Component:** `docs/components/ui/button.tsx`
- **Badge Component:** `docs/components/ui/badge.tsx`
- **Component Workflow:** `COMPONENT_WORKFLOW.md`

---

**Remember:** Any change to CSS variables in `globals.css` automatically updates ALL components that use those tokens. This is the power of design tokens! 🎉

