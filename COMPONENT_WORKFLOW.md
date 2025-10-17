# Component Workflow - Adding Components to Your Design System

This document defines the complete workflow for adding components to your AI-powered design system.

---

## 🎯 Overview

**Goal:** Add a new component from Figma (or manually) with full documentation, AI prompts, and MCP integration.

**Time per component:** 15-30 minutes

**What you get:**
- ✅ React component with TypeScript
- ✅ Tailwind CSS + CVA variants
- ✅ Complete documentation
- ✅ 10-15 AI prompts
- ✅ Live preview in docs
- ✅ MCP server integration
- ✅ Automated tests

---

## 📋 The Workflow

### **Phase 1: Design → Code** (5-10 min)

#### Option A: From Figma (Automated)

```bash
# 1. Extract from Figma
npm run extract

# This will:
# - Pull component from Figma
# - Generate React component
# - Create base documentation
# - Generate Tailwind config
```

#### Option B: Manual Creation (This Guide)

```bash
# 1. Create component file
npm run add-component

# Follow prompts:
# - Component name: "Card"
# - Category: "layout"
# - Has variants: yes
```

**This creates:**
- `docs/components/ui/card.tsx` (component)
- `docs/content/components/card.json` (documentation)

---

### **Phase 2: Define Component** (5 min)

#### 1. Edit Component File (`docs/components/ui/[name].tsx`)

**Template:**
```tsx
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "border-gray-200",
        elevated: "border-none shadow-lg",
        outlined: "border-2 border-gray-300"
      },
      padding: {
        none: "p-0",
        small: "p-4",
        medium: "p-6",
        large: "p-8"
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "medium"
    }
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, className }))}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

export { Card, cardVariants }
```

**Key principles:**
- ✅ Always use `"use client"` directive
- ✅ Use CVA for variants
- ✅ Use `cn()` utility for class merging
- ✅ Export both component and variants
- ✅ Use React.forwardRef for DOM refs

---

### **Phase 3: Write Documentation** (5-10 min)

#### 2. Edit Documentation JSON (`docs/content/components/[name].json`)

**Template Structure:**
```json
{
  "name": "Card",
  "description": "A container component for grouping related content",
  "category": "layout",
  
  "installation": {
    "dependencies": [
      "class-variance-authority",
      "clsx",
      "tailwind-merge"
    ],
    "setupSteps": [
      "Copy the Card component code to `components/ui/card.tsx`",
      "Ensure you have the `cn` utility function in `lib/utils.ts`",
      "Component is ready to use"
    ]
  },
  
  "code": {
    "component": "... (paste component code) ...",
    "types": "export interface CardProps..."
  },
  
  "api": {
    "props": [
      {
        "name": "variant",
        "type": "\"default\" | \"elevated\" | \"outlined\"",
        "required": false,
        "description": "Visual style of the card",
        "default": "default"
      },
      {
        "name": "padding",
        "type": "\"none\" | \"small\" | \"medium\" | \"large\"",
        "required": false,
        "description": "Internal padding amount",
        "default": "medium"
      }
    ]
  },
  
  "prompts": {
    "basic": [
      "Give me a Card component",
      "Create a default Card",
      "Show me an elevated Card",
      "I need an outlined Card",
      "Create a Card with no padding"
    ],
    "advanced": [
      "Create an elevated Card with large padding",
      "Give me an outlined Card with custom content",
      "Show me a Card grid layout with 3 cards",
      "Create a pricing Card with header and footer",
      "Build a product Card with image and details"
    ],
    "useCases": [
      {
        "scenario": "Pricing Card",
        "prompt": "Create a pricing card for my SaaS product",
        "output": "<Card variant=\"elevated\" padding=\"large\">\n  <div className=\"space-y-4\">\n    <h3 className=\"text-2xl font-bold\">Pro Plan</h3>\n    <p className=\"text-4xl font-bold\">$29<span className=\"text-sm\">/mo</span></p>\n    <ul className=\"space-y-2\">...</ul>\n    <Button>Get Started</Button>\n  </div>\n</Card>"
      },
      {
        "scenario": "Feature Card",
        "prompt": "Create a card to showcase a product feature",
        "output": "<Card variant=\"outlined\" padding=\"medium\">\n  <div className=\"space-y-3\">\n    <Icon className=\"w-8 h-8 text-blue-500\" />\n    <h4 className=\"font-semibold\">Fast Performance</h4>\n    <p className=\"text-sm text-gray-600\">Lightning fast load times</p>\n  </div>\n</Card>"
      },
      {
        "scenario": "Dashboard Widget",
        "prompt": "Create a dashboard widget card",
        "output": "<Card variant=\"default\" padding=\"small\">\n  <div className=\"space-y-2\">\n    <p className=\"text-sm text-gray-500\">Total Revenue</p>\n    <p className=\"text-3xl font-bold\">$45,231</p>\n    <p className=\"text-xs text-green-600\">+20.1% from last month</p>\n  </div>\n</Card>"
      }
    ]
  },
  
  "examples": [
    {
      "name": "Default Card",
      "code": "<Card>\n  <h3>Card Title</h3>\n  <p>Card content goes here</p>\n</Card>"
    },
    {
      "name": "Elevated Card",
      "code": "<Card variant=\"elevated\">\n  <h3>Elevated Card</h3>\n</Card>"
    }
  ]
}
```

**Prompt Writing Guidelines:**

1. **Basic Prompts** (5-7 prompts):
   - Simple, single-property requests
   - Natural language
   - Component name + variant
   - Examples: "Give me a [variant] [Component]"

2. **Advanced Prompts** (5-7 prompts):
   - Multiple properties
   - Composition requests
   - Complex layouts
   - Examples: "Create a [variant] [Component] with [feature]"

3. **Use Cases** (3-6 scenarios):
   - Real-world usage
   - Complete code examples
   - Include context (pricing, dashboard, etc.)
   - Show component in action

---

### **Phase 4: Add to Navigation** (1 min)

#### 3. Update Sidebar (`docs/components/layout/sidebar.tsx`)

```tsx
const components = [
  { name: "Badge", href: "/docs/components/badge" },
  { name: "Button", href: "/docs/components/button" },
  { name: "Card", href: "/docs/components/card" },  // Add this
]
```

---

### **Phase 5: Test Everything** (3-5 min)

```bash
# 1. Validate structure
npm run test:validate Card

# 2. Test prompts
npm run test:prompts Card

# 3. Visual test
cd docs && npm run dev
# Visit: http://localhost:3000/docs/components/card

# 4. Rebuild MCP server
npm run build

# 5. Test with Claude (after restart)
# Ask: "Give me a Card component"
```

---

### **Phase 6: Version Control** (1 min)

```bash
git add .
git commit -m "Add Card component with AI prompts"
git push
```

---

## 🚀 Quick Reference Commands

### Starting a New Component

```bash
# Method 1: Interactive (recommended)
npm run add-component

# Method 2: From Figma
npm run extract

# Method 3: Manual
# 1. Create files manually
# 2. Follow template structure above
```

### Testing

```bash
# Quick test
npm run test:validate ComponentName
npm run test:prompts ComponentName

# Full test
npm test

# Visual test
cd docs && npm run dev
```

### Deploying

```bash
# Build MCP server
npm run build

# Update docs (if needed)
npm run update-docs

# Restart Claude Desktop to load new components
```

---

## 📊 Component Checklist

Use this checklist for every new component:

### **Development**
- [ ] Component file created (`docs/components/ui/[name].tsx`)
- [ ] Uses `"use client"` directive
- [ ] Uses CVA for variants
- [ ] Uses `cn()` utility
- [ ] Exports component and variants
- [ ] TypeScript types defined

### **Documentation**
- [ ] JSON file created (`docs/content/components/[name].json`)
- [ ] Name and description filled
- [ ] Category assigned
- [ ] Installation steps documented
- [ ] Component code included
- [ ] Props/API documented

### **Prompts**
- [ ] 5-7 basic prompts
- [ ] 5-7 advanced prompts
- [ ] 3-6 use case scenarios
- [ ] All use cases have expected output
- [ ] Prompts use natural language

### **Navigation**
- [ ] Added to sidebar navigation
- [ ] Component appears in docs

### **Testing**
- [ ] `npm run test:validate` passes
- [ ] `npm run test:prompts` passes
- [ ] Visual test in browser looks good
- [ ] All variants render correctly
- [ ] MCP server builds successfully
- [ ] Tested with Claude Desktop

### **Version Control**
- [ ] Changes committed
- [ ] Pushed to repository

---

## 🎯 Component Priority Template

Recommended order for building your design system:

### **Phase 1: Core UI (Foundation)**
1. ✅ Button - Done!
2. ✅ Badge - Done!
3. Card
4. Input
5. Select

### **Phase 2: Layout**
6. Container
7. Grid
8. Stack
9. Divider

### **Phase 3: Forms**
10. Form
11. Label
12. Checkbox
13. Radio
14. Switch
15. Textarea

### **Phase 4: Feedback**
16. Alert
17. Toast
18. Progress
19. Spinner
20. Skeleton

### **Phase 5: Navigation**
21. Tabs
22. Breadcrumb
23. Pagination
24. Menu
25. Dropdown

### **Phase 6: Data Display**
26. Table
27. Avatar
28. Tooltip
29. Modal/Dialog
30. Popover

---

## 💡 Pro Tips

### **Writing Great Prompts**

**✅ DO:**
- Use natural language
- Be specific about variants
- Include use case context
- Show complete examples
- Test with Claude

**❌ DON'T:**
- Use technical jargon
- Be too vague ("make a card")
- Skip expected output
- Use incomplete code examples

### **Component Design Patterns**

**Composition over Configuration:**
```tsx
// ✅ Good: Composable
<Card>
  <CardHeader>...</CardHeader>
  <CardContent>...</CardContent>
  <CardFooter>...</CardFooter>
</Card>

// ❌ Avoid: Too many props
<Card 
  hasHeader={true}
  hasFooter={true}
  headerContent="..."
  footerContent="..."
/>
```

**Keep Variants Simple:**
```tsx
// ✅ Good: Clear variants
variant: "default" | "elevated" | "outlined"

// ❌ Avoid: Too many options
variant: "default" | "elevated" | "outlined" | "flat" | 
         "bordered" | "ghost" | "primary" | "secondary"
```

### **Testing Strategy**

1. **Write component first** - Get it working
2. **Add basic prompts** - Test with Claude
3. **Refine based on AI output** - Adjust prompts
4. **Add use cases** - Real-world examples
5. **Visual test** - Make it look good
6. **Iterate** - Improve based on usage

---

## 🔄 Iteration Workflow

After you've added several components:

### **Weekly Review**
```bash
# 1. Test all components
for comp in Button Badge Card Input; do
  npm run test:validate $comp
  npm run test:prompts $comp
done

# 2. Review Claude interactions
# - Which prompts are used most?
# - Which prompts confuse Claude?
# - What's missing?

# 3. Update prompts based on usage
# 4. Rebuild and test
npm run build
```

### **Monthly Maintenance**
- Review component usage
- Add missing use cases
- Update dependencies
- Improve prompt quality
- Add new components based on needs

---

## 📚 Resources

- **Component Templates:** See `docs/components/ui/` for examples
- **Prompt Examples:** See `docs/content/components/button.json`
- **Testing Guide:** See `TESTING_GUIDE.md`
- **Manual Addition:** See `MANUAL_COMPONENTS.md`

---

## 🎉 Success Metrics

Your design system is healthy when:

- ✅ All components pass validation
- ✅ All prompts pass testing
- ✅ Claude can generate code for all components
- ✅ Components render correctly in docs
- ✅ New components take < 30 minutes to add
- ✅ Team uses AI prompts regularly

---

## 🚀 Next: Let's Add Your Next Component!

Ready to add a new component? Run:

```bash
npm run add-component
```

And follow this workflow! 🎨

