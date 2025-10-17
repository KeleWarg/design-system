# Manual Component Development Guide

## 🎨 Three Ways to Work with Components

### 1. **Create New Component from Scratch**

Use the helper script:

```bash
npm run add-component "Badge" "A badge component for labels and tags"
```

This creates:
- `docs/components/ui/badge.tsx` - Component code
- `docs/content/components/badge.json` - Documentation
- Automatically shows up at `http://localhost:3000/docs/components/badge`

### 2. **Edit Existing Components Directly**

Just edit the component files:

```bash
# Edit component code
code docs/components/ui/button.tsx

# Edit component styles
# Add your custom Tailwind classes or CSS
```

**The docs site auto-reloads!** Your changes appear instantly at `http://localhost:3000`

### 3. **Update from Figma + Manual Edits**

```bash
# Pull latest from Figma
npm run extract

# Copy to docs (this preserves your manual edits if you edit docs/components directly)
npm run update-docs
```

## 📝 Manual Component Template

Create a file in `docs/components/ui/my-component.tsx`:

```tsx
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Define your variants with Tailwind classes
const myComponentVariants = cva(
  "base-classes-here", // Base classes applied to all variants
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-input bg-background",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3 text-sm",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface MyComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof myComponentVariants> {
  // Add custom props here
  customProp?: string
}

const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, variant, size, customProp, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(myComponentVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
MyComponent.displayName = "MyComponent"

export { MyComponent, myComponentVariants }
```

## 📄 Create Documentation JSON

Create `docs/content/components/my-component.json`:

```json
{
  "name": "MyComponent",
  "description": "A brief description of what this component does",
  "category": "ui",
  "installation": {
    "dependencies": ["class-variance-authority"],
    "setupSteps": [
      "Copy the component code",
      "Ensure Tailwind CSS is configured"
    ]
  },
  "code": {
    "component": "// Paste your component code here",
    "types": "export interface MyComponentProps { ... }"
  },
  "api": {
    "props": [
      {
        "name": "variant",
        "type": "string",
        "required": false,
        "description": "The visual style variant",
        "default": "default"
      }
    ],
    "variants": {
      "variant": ["default", "secondary", "outline"],
      "size": ["default", "sm", "lg"]
    }
  },
  "usage": {
    "import": "import { MyComponent } from \"@/components/ui/my-component\"",
    "basic": "<MyComponent>Content</MyComponent>",
    "examples": [
      {
        "name": "Default",
        "description": "Basic usage",
        "code": "<MyComponent>Click me</MyComponent>"
      }
    ]
  },
  "metadata": {
    "version": "1.0.0",
    "lastUpdated": "2024-01-01",
    "status": "stable",
    "accessibility": ["keyboard-navigable"],
    "relatedComponents": [],
    "tags": ["manual"]
  }
}
```

## 🎨 Styling Tips

### Use Tailwind Classes

```tsx
const variants = cva(
  "rounded-lg transition-all duration-200",
  {
    variants: {
      variant: {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
      }
    }
  }
)
```

### Add Custom CSS (if needed)

Create `docs/app/globals.css` and add:

```css
@layer components {
  .my-custom-component {
    /* Your custom CSS */
  }
}
```

## 🔄 Workflow Examples

### Example 1: Quick Edit

```bash
# Edit button component
code docs/components/ui/button.tsx

# Change: bg-blue-600 → bg-purple-600
# Save → Auto-reload shows purple buttons!
```

### Example 2: New Component

```bash
# Create new Badge component
npm run add-component "Badge" "Status badges and labels"

# Edit the generated file
code docs/components/ui/badge.tsx

# View at: http://localhost:3000/docs/components/badge
```

### Example 3: Figma + Manual

```bash
# Pull from Figma
npm run extract

# Manually edit a component
code docs/components/ui/button.tsx

# Copy to docs (keeps your edits)
npm run update-docs
```

## 🎯 Best Practices

1. **Always use CVA** for variant management
2. **Use Tailwind classes** for styling (avoid inline styles)
3. **Make components accessible** (ARIA labels, keyboard nav)
4. **Document all props** in the JSON file
5. **Test dark mode** (use dark: prefix in Tailwind)
6. **Keep components small** and composable

## 🚀 Quick Reference

```bash
# Create new component
npm run add-component "ComponentName" "Description"

# Update docs after Figma sync
npm run update-docs

# Start docs dev server
cd docs && npm run dev

# View components
open http://localhost:3000/docs/components
```

## 💡 Pro Tips

- **Hot Reload**: The docs site auto-reloads on any file change
- **Dark Mode**: Test with the theme toggle in the header
- **Preview**: See live preview in the docs before using in projects
- **Copy Code**: Use the copy button to grab component code
- **Variants**: Add as many variants as you need in the CVA config


