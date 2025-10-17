# Theme Token System

## Overview

Your design system uses a **comprehensive token system** where themes control:
- ✅ Colors (brand, semantic, UI)
- ✅ Typography (fonts, sizes, weights)
- ✅ Spacing (button heights, icon sizes, radius)
- ✅ Effects (animation durations, transitions)

**Key Benefit:** Change theme → All tokens update → All components inherit new values automatically.

## 🎨 How It Works

### 1. Theme Definition (`docs/lib/themes.ts`)

Each theme is a complete set of design tokens:

```typescript
export interface Theme {
  name: string;
  value: string;
  colors: {
    // Brand colors
    primary: string;
    primaryHover: string;
    primaryActive: string;
    // ... all color tokens
  };
  typography?: {
    fontFamily?: string;
    fontSize?: { xs, sm, base, lg, xl };
    fontWeight?: { normal, medium, semibold, bold };
  };
  spacing?: {
    buttonHeight?: { sm, base, lg };
    iconSize?: { xs, sm, base, lg, xl };
    radius?: string;
  };
  effects?: {
    duration?: { fast, base, slow };
  };
}
```

### 2. Components Inherit Tokens

```tsx
// Button component uses tokens
const buttonVariants = cva(
  "... duration-[var(--duration-base)] ...",
  {
    variants: {
      Type: {
        Primary: "bg-primary hover:bg-primary-hover",
        // ↑ Uses CSS variable from current theme
      },
      Size: {
        Base: "h-[var(--button-height-base)]",
        // ↑ Uses spacing token from current theme
      }
    }
  }
)
```

### 3. Theme Switcher Applies All Tokens

```typescript
// When user selects a theme:
applyTheme(purpleTheme)

// This updates ALL CSS variables:
--primary: 271 91% 65%         // Color
--button-height-base: 2.5rem   // Spacing
--duration-base: 200ms         // Effects
--font-family: ...             // Typography
```

## 🎯 Available Themes

### Default Theme (Teal)
```typescript
primary: "173 80% 40%"  // Teal
buttonHeight.base: "2.5rem"
duration.base: "200ms"
```

### Purple Theme
```typescript
primary: "271 91% 65%"  // Purple
// Inherits other tokens from default
```

### Blue Theme
```typescript
primary: "217 91% 60%"  // Blue
```

### Rose Theme
```typescript
primary: "330 81% 60%"  // Rose/Pink
```

### Emerald Theme
```typescript
primary: "158 64% 52%"  // Emerald Green
```

## 📝 Token Categories

### Color Tokens

| Token | Purpose | Inherited By |
|-------|---------|--------------|
| `--primary` | Primary brand color | Button (Primary), focus rings |
| `--primary-hover` | Primary hover state | Button hover states |
| `--secondary` | Secondary color | Button (Secondary) |
| `--success` | Success/positive | Future success states |
| `--warning` | Warning/caution | Future warning states |
| `--error` / `--destructive` | Error/danger | Future error states |
| `--background` | Page background | Button (White), layouts |
| `--foreground` | Text color | All text elements |
| `--border` | Border color | All borders |
| `--ring` | Focus ring | Focus states |

### Typography Tokens

| Token | Purpose | Inherited By |
|-------|---------|--------------|
| `--font-family` | Font stack | Body text, all components |
| `--font-size-xs` | Extra small text | Small labels |
| `--font-size-sm` | Small text | Button text (small) |
| `--font-size-base` | Base text | Button text, body |
| `--font-weight-normal` | Regular weight | Body text |
| `--font-weight-semibold` | Semi-bold | Button text |

### Spacing Tokens

| Token | Purpose | Inherited By |
|-------|---------|--------------|
| `--button-height-sm` | Small button | Button (Small) |
| `--button-height-base` | Default button | Button (Base) |
| `--button-height-lg` | Large button | Button (Large) |
| `--icon-xs` | Extra small icon | Small icons |
| `--icon-sm` | Small icon | Button icons |
| `--icon-base` | Default icon | Standard icons |
| `--icon-lg` | Large icon | Hero icons |
| `--radius` | Border radius | All rounded elements |

### Effect Tokens

| Token | Purpose | Inherited By |
|-------|---------|--------------|
| `--duration-fast` | Fast transition | Quick animations |
| `--duration-base` | Default transition | Button, badge animations |
| `--duration-slow` | Slow transition | Page transitions |

## 🔧 Creating Custom Themes

### Example: Create a "Corporate" Theme

```typescript
// docs/lib/themes.ts

export const corporateTheme: Theme = {
  name: "Corporate",
  value: "corporate",
  colors: {
    primary: "210 100% 30%",        // Navy blue
    primaryHover: "210 100% 25%",
    primaryActive: "210 100% 20%",
    primaryForeground: "0 0% 100%",
    
    secondary: "0 0% 95%",          // Light gray
    secondaryHover: "0 0% 90%",
    secondaryActive: "0 0% 85%",
    secondaryForeground: "0 0% 10%",
    
    // Keep semantic colors consistent
    success: "142 76% 36%",
    warning: "38 92% 50%",
    error: "0 84% 60%",
    // ... other colors
  },
  typography: {
    fontFamily: "Roboto, sans-serif",  // Different font!
    fontSize: {
      base: "1rem",
      sm: "0.875rem",
      lg: "1.125rem",
    },
    fontWeight: {
      normal: "400",
      semibold: "600",
      bold: "700",
    },
  },
  spacing: {
    buttonHeight: {
      sm: "2.25rem",    // Slightly taller buttons
      base: "2.75rem",
      lg: "3.5rem",
    },
    iconSize: {
      base: "1.5rem",   // Larger icons
    },
    radius: "0.25rem",  // Sharper corners
  },
  effects: {
    duration: {
      fast: "100ms",    // Snappier animations
      base: "150ms",
      slow: "250ms",
    },
  },
};

// Add to themes array
export const themes: Theme[] = [
  defaultTheme,
  purpleTheme,
  blueTheme,
  roseTheme,
  emeraldTheme,
  corporateTheme,  // ← Add here
];
```

### Result

When users select "Corporate" theme:
- **Colors**: Navy blue primary instead of teal
- **Typography**: Roboto font instead of Inter
- **Spacing**: Taller buttons, larger icons
- **Effects**: Faster animations
- **Borders**: Sharper corners (less rounded)

**All components automatically inherit these changes!**

## 🎨 Theme Inheritance

Themes can inherit tokens from the default theme:

```typescript
export const minimalTheme: Theme = {
  name: "Minimal",
  value: "minimal",
  colors: {
    primary: "0 0% 10%",  // Black
    // ... only override colors
  },
  // Typography, spacing, effects inherit from default
};
```

## 📦 Using Themes in Components

### Automatically Inherited

Components using CSS variables automatically get theme values:

```tsx
// Button already uses tokens
<Button Type="Primary">Click me</Button>
// ↑ Uses --primary from current theme

// When theme changes, button color updates automatically!
```

### Add New Component with Tokens

```tsx
const myComponent = cva(
  "... duration-[var(--duration-base)] ...",
  {
    variants: {
      variant: {
        // Use theme tokens
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary: "bg-secondary text-secondary-foreground",
      },
      size: {
        // Use spacing tokens
        sm: "h-[var(--button-height-sm)] px-3 text-[var(--font-size-sm)]",
        lg: "h-[var(--button-height-lg)] px-6 text-[var(--font-size-lg)]",
      }
    }
  }
)
```

## 🔄 Theme Persistence

Themes are saved to localStorage:

```typescript
// On theme change:
localStorage.setItem('design-system-theme', 'purple')

// On page load:
const savedTheme = localStorage.getItem('design-system-theme')
applyTheme(getTheme(savedTheme))
```

Users' theme preference persists across sessions!

## 🚀 Best Practices

### 1. Always Use Tokens

✅ **Good:**
```css
.my-element {
  color: hsl(var(--primary));
  font-size: var(--font-size-base);
  transition: all var(--duration-base);
}
```

❌ **Bad:**
```css
.my-element {
  color: #0ea5e9;
  font-size: 16px;
  transition: all 200ms;
}
```

### 2. Keep Semantic Colors Consistent

When creating new themes, keep semantic colors consistent:
- `success` should always be green
- `warning` should always be orange/yellow
- `error` should always be red

Only change the brand colors (primary, secondary).

### 3. Test Dark Mode

Always define both light and dark variants in `globals.css`:

```css
:root {
  --primary: 271 91% 65%;  /* Light mode */
}

.dark {
  --primary: 271 91% 70%;  /* Adjusted for dark mode */
}
```

### 4. Document Custom Tokens

If you add custom tokens, document them:

```typescript
export interface Theme {
  // ... existing
  custom?: {
    headerHeight?: string;
    sidebarWidth?: string;
  };
}
```

## 📖 Examples

### Change Button Heights Globally

```typescript
// In your theme:
spacing: {
  buttonHeight: {
    sm: "2.5rem",   // Was 2rem
    base: "3rem",   // Was 2.5rem
    lg: "3.5rem",   // Was 3rem
  }
}
```

All buttons are now taller!

### Change Animation Speed

```typescript
effects: {
  duration: {
    fast: "50ms",   // Was 150ms - faster
    base: "100ms",  // Was 200ms
    slow: "200ms",  // Was 300ms
  }
}
```

All animations are now faster!

### Change Font

```typescript
typography: {
  fontFamily: "Helvetica, Arial, sans-serif",
}
```

All text uses new font!

## 🔗 Related Files

- **Theme Definitions:** `docs/lib/themes.ts`
- **Theme Switcher:** `docs/components/theme-switcher.tsx`
- **CSS Variables:** `docs/app/globals.css`
- **Button Component:** `docs/components/ui/button.tsx`

---

**Remember:** Themes control ALL design tokens. When you switch themes, everything updates - colors, typography, spacing, and effects!

