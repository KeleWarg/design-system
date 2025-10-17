# [Component Name]

> **Created**: YYYY-MM-DD  
> **Designer**: Name  
> **Status**: Draft | In Review | Approved

---

## Overview

Brief description of the component and its purpose. Include:
- What problem it solves
- When to use it
- When NOT to use it

---

## Variants

### [Variant Name 1] (e.g., Type, Style, Appearance)
- **Option 1**: Description (e.g., Primary - Main call-to-action)
- **Option 2**: Description (e.g., Secondary - Secondary actions)
- **Option 3**: Description

### [Variant Name 2] (e.g., Size)
- **Small**: Description with specs (h: 32px, px: 12px, text: 12px)
- **Base**: Description with specs (h: 40px, px: 16px, text: 14px)
- **Large**: Description with specs (h: 48px, px: 24px, text: 16px)

### [Variant Name 3] (e.g., State)
- **Enabled**: Default interactive state
- **Hover**: Mouse hover state (visual feedback)
- **Focused**: Keyboard focus (ring + offset for accessibility)
- **Pressed**: Active click state
- **Disabled**: Non-interactive (opacity 40%, no pointer events)

---

## Props / API

| Prop | Type | Default | Required | Description |
|------|------|---------|----------|-------------|
| variant | "option1" \| "option2" | "option1" | No | Visual style variant |
| size | "sm" \| "base" \| "lg" | "base" | No | Component size |
| disabled | boolean | false | No | Disabled state |
| children | ReactNode | - | Yes | Content to display |

---

## Design Tokens

### Colors
Map to CSS variables for theme support:
- **Primary**: `hsl(173, 80%, 40%)` → CSS var `--primary`
- **Primary Hover**: `hsl(173, 80%, 35%)` → CSS var `--primary-hover`
- **Primary Active**: `hsl(173, 80%, 30%)` → CSS var `--primary-active`

### Typography
- **Font Family**: Inter, sans-serif → CSS var `--font-sans`
- **Font Size (sm)**: 12px → Tailwind `text-xs`
- **Font Size (base)**: 14px → Tailwind `text-sm`
- **Font Size (lg)**: 16px → Tailwind `text-base`
- **Font Weight**: 500 → Tailwind `font-medium`

### Spacing
- **Height (sm)**: `2rem` → CSS var `--button-height-sm`
- **Height (base)**: `2.5rem` → CSS var `--button-height-base`
- **Height (lg)**: `3rem` → CSS var `--button-height-lg`
- **Padding X (sm)**: `0.75rem` → Tailwind `px-3`
- **Padding X (base)**: `1rem` → Tailwind `px-4`
- **Padding X (lg)**: `1.5rem` → Tailwind `px-6`
- **Border Radius**: `0.375rem` → Tailwind `rounded-md`

### Effects
- **Transition Duration**: `200ms` → CSS var `--duration-base`
- **Transition Timing**: ease-in-out
- **Focus Ring**: 2px offset, 2px width
- **Hover Scale**: none (use opacity/color changes)
- **Active Scale**: 0.98 (subtle press feedback)

---

## Accessibility

- **ARIA Role**: button (semantic `<button>` element)
- **Keyboard Navigation**: Tab (focus), Enter/Space (activate)
- **Focus Indicator**: Visible ring with offset
- **Color Contrast**: Minimum 4.5:1 for text (WCAG AA)
- **Screen Reader**: Descriptive text, avoid icon-only buttons without labels
- **Disabled State**: `aria-disabled="true"` or `disabled` attribute

---

## Examples

### Basic Usage
```tsx
<ComponentName>Default content</ComponentName>
```

### With Variants
```tsx
<ComponentName variant="primary" size="lg">
  Large Primary
</ComponentName>

<ComponentName variant="secondary" size="sm">
  Small Secondary
</ComponentName>
```

### Real-World Example
```tsx
// Hero section CTA
<div className="flex gap-4">
  <ComponentName variant="primary" size="lg">
    Get Started
  </ComponentName>
  <ComponentName variant="secondary" size="lg">
    Learn More
  </ComponentName>
</div>
```

---

## AI Prompts

### Basic Prompts
Simple, single-variant requests:
- "Give me a [component name]"
- "Create a primary [component]"
- "Show me a large [component]"
- "I need a small secondary [component]"

### Advanced Prompts
Multi-variant or complex requests:
- "Create a primary large [component] with [feature]"
- "Give me a [component] with [specific state/variant]"
- "Show me a group of [components] in different sizes"

### Use Case Prompts
Real-world scenarios with expected output:

**Scenario**: Hero Section CTA
- **Prompt**: "Create primary and secondary CTA buttons for my hero section"
- **Expected Output**:
  ```tsx
  <div className="flex gap-4">
    <Button variant="primary" size="lg">Get Started</Button>
    <Button variant="secondary" size="lg">Learn More</Button>
  </div>
  ```

**Scenario**: Form Actions
- **Prompt**: "Create submit and cancel buttons for a form"
- **Expected Output**:
  ```tsx
  <div className="flex gap-2 justify-end">
    <Button variant="ghost" type="button">Cancel</Button>
    <Button variant="primary" type="submit">Submit</Button>
  </div>
  ```

---

## Visual Reference

Include screenshots, mockups, or Figma embeds:
- All variants side-by-side
- Different states (hover, focus, disabled)
- Size comparisons
- Use in real UI contexts

Attach images or link to Figma:
- `![Component Variants](./images/component-variants.png)`
- [Figma Link](https://figma.com/file/...)

---

## Implementation Notes

### Developer Guidelines
- Use semantic HTML (`<button>` not `<div>`)
- Forward refs for flexibility
- Support all native button attributes (`onClick`, `type`, etc.)
- Use CSS variables for all theme-able properties
- Implement all variants via CVA (class-variance-authority)

### Testing Checklist
- [ ] All variants render correctly
- [ ] Keyboard navigation works
- [ ] Focus indicator visible
- [ ] Disabled state prevents interaction
- [ ] Responsive on mobile
- [ ] Dark mode support
- [ ] Screen reader accessible

### Dependencies
```json
{
  "dependencies": [
    "class-variance-authority",
    "clsx",
    "tailwind-merge"
  ]
}
```

---

## Changelog

### v1.0.0 (YYYY-MM-DD)
- Initial spec created
- Defined all variants and states
- Added design tokens

### v1.1.0 (YYYY-MM-DD)
- Added new variant
- Updated color tokens
- Refined accessibility requirements

