# Button

> **Created**: 2025-10-17  
> **Designer**: Design Team  
> **Status**: Approved

---

## Overview

A versatile button component with multiple variants, sizes, and states. The button is the primary interactive element for user actions and CTAs.

**When to use**:
- Primary actions (sign up, submit, save)
- Navigation triggers
- Form submissions
- Call-to-action elements

**When NOT to use**:
- For navigation links (use Link component)
- For non-interactive text
- When a more subtle action is needed (consider IconButton)

---

## Variants

### Type
- **Primary**: Main call-to-action, highest emphasis (teal background, white text)
- **Secondary**: Secondary actions, medium emphasis (white background, gray border, gray text)
- **Ghost**: Tertiary actions, low emphasis (transparent background, gray text)
- **White**: For use on dark backgrounds (white background, gray text, subtle border)

### Size
- **Small**: Compact spaces, mobile views, secondary actions
  - Height: 32px
  - Padding X: 12px
  - Text Size: 12px (xs)
- **Base**: Default size, most common use case
  - Height: 40px
  - Padding X: 16px
  - Padding Y: 8px
  - Text Size: 14px (sm)
- **Large**: Prominent CTAs, hero sections, emphasis
  - Height: 48px
  - Padding X: 24px
  - Padding Y: 12px
  - Text Size: 16px (base)

### Icon Position
- **None**: Text only (default)
- **Left**: Icon on left side of text (flex-row, gap-2)
- **Right**: Icon on right side of text (flex-row-reverse, gap-2)

### State
- **Enabled**: Default interactive state, full opacity, pointer cursor
- **Hover**: Mouse hover state (darker background for Primary, lighter for others)
- **Focused**: Keyboard focus (2px ring with 2px offset for accessibility)
- **Pressed**: Active click state (scale 0.98 for tactile feedback)
- **Disabled**: Non-interactive (40% opacity, cursor not-allowed, no pointer events)

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| Type | "Primary" \| "Secondary" \| "Ghost" \| "White" | "Primary" | No | Visual style variant |
| Size | "Small" \| "Base" \| "Large" | "Base" | No | Button size |
| Icon | "None" \| "Left" \| "Right" | "None" | No | Icon position relative to text |
| State | "Enabled" \| "Hover" \| "Focused" \| "Pressed" \| "Disabled" | "Enabled" | No | Interaction state |
| disabled | boolean | false | No | Native disabled attribute |
| onClick | MouseEventHandler | - | No | Click event handler |
| type | "button" \| "submit" \| "reset" | "button" | No | Native button type |
| children | ReactNode | - | Yes | Button content (text, icon, etc.) |

---

## Design Tokens

### Colors

#### Primary Variant
- **Background**: `hsl(173, 80%, 40%)` → `bg-primary`
- **Background Hover**: `hsl(173, 80%, 35%)` → `hover:bg-primary-hover`
- **Background Active**: `hsl(173, 80%, 30%)` → `active:bg-primary-active`
- **Text**: `hsl(210, 40%, 98%)` → `text-primary-foreground`

#### Secondary Variant
- **Background**: `hsl(0, 0%, 100%)` → `bg-secondary`
- **Background Hover**: `hsl(220, 13%, 91%)` → `hover:bg-secondary-hover`
- **Background Active**: `hsl(216, 12%, 84%)` → `active:bg-secondary-active`
- **Border**: `hsl(214, 32%, 91%)` → `border-border` (2px)
- **Border Hover**: `hsl(213, 27%, 84%)` → `hover:border-border-strong`
- **Text**: `hsl(222, 47%, 11%)` → `text-secondary-foreground`

#### Ghost Variant
- **Background**: transparent → `bg-transparent`
- **Background Hover**: `hsl(210, 40%, 96%)` → `hover:bg-accent`
- **Background Active**: `hsl(210, 40%, 96%)` → `active:bg-muted`
- **Text**: `hsl(222, 84%, 5%)` → `text-foreground`

#### White Variant
- **Background**: `hsl(0, 0%, 100%)` → `bg-background`
- **Border**: `hsl(214, 32%, 91%)` → `border border-border` (1px)
- **Background Hover**: `hsl(210, 40%, 96%)` → `hover:bg-accent`
- **Background Active**: `hsl(210, 40%, 96%)` → `active:bg-muted`
- **Text**: `hsl(222, 84%, 5%)` → `text-foreground`
- **Shadow**: subtle → `shadow-sm`

### Typography
- **Font Family**: Inter, sans-serif → CSS var `--font-sans`
- **Font Weight**: 500 → `font-medium`
- **Font Size (Small)**: 12px → `text-xs`
- **Font Size (Base)**: 14px → `text-sm`
- **Font Size (Large)**: 16px → `text-base`

### Spacing
- **Height (Small)**: `2rem` (32px) → `h-[var(--button-height-sm)]`
- **Height (Base)**: `2.5rem` (40px) → `h-[var(--button-height-base)]`
- **Height (Large)**: `3rem` (48px) → `h-[var(--button-height-lg)]`
- **Padding X (Small)**: `0.75rem` → `px-3`
- **Padding X (Base)**: `1rem` → `px-4`
- **Padding X (Large)**: `1.5rem` → `px-6`
- **Padding Y (Base)**: `0.5rem` → `py-2`
- **Padding Y (Large)**: `0.75rem` → `py-3`
- **Border Radius**: `0.375rem` → `rounded`
- **Icon Gap**: `0.5rem` → `gap-2`

### Effects
- **Transition Duration**: `200ms` → `duration-[var(--duration-base)]`
- **Transition Timing**: ease-in-out → `transition-all`
- **Focus Ring**: 2px width, 2px offset → `ring-2 ring-ring ring-offset-2`
- **Focus Outline**: none (use ring) → `focus-visible:outline-none`
- **Active Scale**: 0.98 → `active:scale-[0.98]`
- **Disabled Opacity**: 40% → `opacity-40`
- **Disabled Cursor**: not-allowed → `cursor-not-allowed`

---

## Accessibility

- **ARIA Role**: button (native `<button>` element)
- **Keyboard Navigation**: 
  - Tab: Focus the button
  - Enter/Space: Activate the button
  - Tab out: Remove focus
- **Focus Indicator**: Visible 2px ring with 2px offset (meets WCAG 2.1 Level AA)
- **Color Contrast**: 
  - Primary: White text on teal (7:1 ratio - AAA)
  - Secondary: Dark gray text on white (12:1 ratio - AAA)
  - Ghost: Dark gray text (when hovered, meets AA)
  - White: Dark gray text on white (12:1 ratio - AAA)
- **Screen Reader**: Button text must be descriptive
  - ✅ Good: "Submit form", "Add to cart", "Learn more"
  - ❌ Bad: "Click here", "Go", "Button"
- **Disabled State**: Use `disabled` attribute or `aria-disabled="true"`
- **Loading State**: Use `aria-busy="true"` if implementing loading spinner

---

## Examples

### Basic Usage
```tsx
<Button>Click me</Button>
```

### Type Variants
```tsx
<Button Type="Primary">Primary Action</Button>
<Button Type="Secondary">Secondary Action</Button>
<Button Type="Ghost">Subtle Action</Button>
<Button Type="White">On Dark Background</Button>
```

### Size Variants
```tsx
<Button Size="Small">Small</Button>
<Button Size="Base">Base (Default)</Button>
<Button Size="Large">Large</Button>
```

### With Icons
```tsx
// Left icon
<Button Type="Primary" Icon="Left">
  <svg className="w-4 h-4" {...iconProps} />
  Add Item
</Button>

// Right icon
<Button Type="Primary" Icon="Right">
  Next Step
  <svg className="w-4 h-4" {...iconProps} />
</Button>
```

### States
```tsx
<Button State="Enabled">Enabled</Button>
<Button State="Focused">Focused (show ring)</Button>
<Button disabled>Disabled</Button>
```

### Real-World Examples

#### Hero Section CTA
```tsx
<div className="flex gap-4">
  <Button Type="Primary" Size="Large">
    Get Started Free
  </Button>
  <Button Type="White" Size="Large">
    Watch Demo
  </Button>
</div>
```

#### Form Actions
```tsx
<div className="flex gap-2 justify-end">
  <Button Type="Ghost" type="button">
    Cancel
  </Button>
  <Button Type="Primary" type="submit">
    Save Changes
  </Button>
</div>
```

#### Action Group
```tsx
<div className="flex gap-2">
  <Button Type="Primary" Icon="Left" Size="Small">
    <PlusIcon />
    Add
  </Button>
  <Button Type="Secondary" Icon="Left" Size="Small">
    <EditIcon />
    Edit
  </Button>
  <Button Type="Ghost" Size="Small">
    <TrashIcon />
  </Button>
</div>
```

---

## AI Prompts

### Basic Prompts
- "Give me a Primary button"
- "Create a Secondary button"
- "Show me a Large button"
- "I need a Ghost button"
- "Create a Small Primary button"

### Advanced Prompts
- "Create a Primary Large button with a left icon"
- "Give me a Secondary Small button with disabled state"
- "Show me a Ghost button with an icon on the right"
- "Create a button group with Primary, Secondary, and Ghost buttons"
- "Show me all button size variations for Primary type"

### Use Case Prompts

**Scenario**: Hero Section CTA
- **Prompt**: "Create primary and secondary CTA buttons for my hero section"
- **Expected Output**:
  ```tsx
  <div className="flex gap-4">
    <Button Type="Primary" Size="Large">Get Started</Button>
    <Button Type="Secondary" Size="Large">Learn More</Button>
  </div>
  ```

**Scenario**: Form Submission
- **Prompt**: "Create submit and cancel buttons for a form"
- **Expected Output**:
  ```tsx
  <div className="flex gap-2 justify-end">
    <Button Type="Ghost" type="button">Cancel</Button>
    <Button Type="Primary" type="submit">Submit</Button>
  </div>
  ```

**Scenario**: Action with Icon
- **Prompt**: "Give me an 'Add Item' button with a plus icon on the left"
- **Expected Output**:
  ```tsx
  <Button Type="Primary" Icon="Left" Size="Base">
    <PlusIcon className="w-4 h-4" />
    Add Item
  </Button>
  ```

**Scenario**: Loading State
- **Prompt**: "Show me a button in loading state"
- **Expected Output**:
  ```tsx
  <Button Type="Primary" disabled aria-busy="true">
    <SpinnerIcon className="w-4 h-4 animate-spin" />
    Loading...
  </Button>
  ```

---

## Implementation Notes

### Developer Guidelines
- Use semantic `<button>` element (not `<div>`)
- Forward ref for flexibility and parent control
- Support all native button attributes (`onClick`, `type`, `disabled`, etc.)
- Use CSS variables for all colors and spacing (theme support)
- Implement variants via CVA (class-variance-authority)
- Use `cn()` helper to merge class names
- Make component client-side (`"use client"` for Next.js)

### Code Structure
```typescript
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      Type: { /* variants */ },
      Size: { /* variants */ },
      Icon: { /* variants */ },
      State: { /* variants */ },
    },
    defaultVariants: {
      Type: "Primary",
      Size: "Base",
      Icon: "None",
      State: "Enabled",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, Type, Size, Icon, State, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ Type, Size, Icon, State, className }))}
        {...props}
      />
    )
  }
)
```

### Testing Checklist
- [ ] All type variants render with correct colors
- [ ] All size variants render with correct dimensions
- [ ] Icon positioning works (left, right, none)
- [ ] All states work (enabled, hover, focus, pressed, disabled)
- [ ] Keyboard navigation (Tab, Enter, Space)
- [ ] Focus indicator visible and meets WCAG
- [ ] Disabled state prevents interaction
- [ ] Works in light and dark mode
- [ ] Responsive on mobile devices
- [ ] Screen reader announces button correctly
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)

### Dependencies
```json
{
  "dependencies": {
    "react": "^18.0.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  }
}
```

---

## Visual Reference

### All Variants
![Button Variants](../docs/public/button-variants.png)
*Shows Primary, Secondary, Ghost, and White variants in all three sizes*

### States
![Button States](../docs/public/button-states.png)
*Shows Enabled, Hover, Focused, Pressed, and Disabled states*

### Dark Mode
![Button Dark Mode](../docs/public/button-dark.png)
*Shows how buttons appear in dark mode*

### In Context
![Buttons in UI](../docs/public/button-context.png)
*Shows buttons used in real UI scenarios (hero, forms, cards)*

---

## Changelog

### v1.0.0 (2025-10-17)
- Initial button component spec
- Defined 4 type variants (Primary, Secondary, Ghost, White)
- Defined 3 size variants (Small, Base, Large)
- Defined icon positioning (None, Left, Right)
- Defined 5 states (Enabled, Hover, Focused, Pressed, Disabled)
- Added comprehensive design tokens
- Added AI prompts for all use cases
- Documented accessibility requirements
- Created testing checklist

