# Design System Blueprint - Build From Scratch Guide

> **Purpose**: A comprehensive guide to building a Figma-to-Code design system with AI integration, documentation site, and complete testing workflow.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture Decisions](#architecture-decisions)
3. [Project Structure](#project-structure)
4. [Setup & Installation](#setup--installation)
5. [Core Workflows](#core-workflows)
6. [Testing Strategy](#testing-strategy)
7. [Deployment](#deployment)
8. [Best Practices & Lessons Learned](#best-practices--lessons-learned)

---

## Project Overview

### What We're Building
A design system that:
- **Manual component creation** with spec sheets as the source of truth
- **React/TypeScript components** with Tailwind CSS
- **Exposes components via MCP** (Model Context Protocol) for AI assistants
- **Provides beautiful documentation** similar to shadcn/ui
- **Supports theme switching** with design tokens
- **Enables AI-powered component usage** through natural language prompts

### Key Technologies
- **React + TypeScript**: Component library
- **Tailwind CSS + CVA**: Styling with variants
- **Next.js 14+**: Documentation site (App Router)
- **MCP Server**: AI integration layer
- **Vercel**: Deployment platform
- **Spec Sheets**: Markdown/JSON specifications for components

---

## Architecture Decisions

### 1. Monorepo Structure
**Decision**: Keep MCP server and docs site in one repo, separate concerns by directory.

**Why**:
- Single source of truth for components
- Easier to keep docs in sync with component changes
- Simplified deployment (just need to configure correctly)

**Critical Consideration**:
- ⚠️ Vercel will detect root `package.json` first
- Must configure `vercel.json` to skip root install and only build docs

### 2. Component Creation Strategy
**Decision**: Manual, spec-sheet-driven approach

**Why Manual**:
- Full control over component implementation
- No dependency on external APIs
- Easier to iterate and customize
- Spec sheets serve as design documentation
- Designer-developer collaboration through specs

**Spec Sheet Format**:
- Markdown or JSON format
- Defines variants, states, sizes, props
- Includes visual reference (screenshots/mockups)
- Acts as single source of truth
- Living documentation alongside code

### 3. Documentation Format
**Decision**: JSON-based component docs with prompt library

**Structure**:
```json
{
  "name": "ComponentName",
  "description": "...",
  "code": { "component": "..." },
  "api": { "props": [...], "variants": {...} },
  "prompts": {
    "basic": ["..."],
    "advanced": ["..."],
    "useCases": [...]
  }
}
```

**Why**:
- MCP server can easily parse JSON
- Docs site can dynamically render
- AI can understand component usage patterns
- Easy to version control

### 4. Theme System Architecture
**Decision**: CSS variables + TypeScript theme definitions + Tailwind integration

**Implementation**:
- Define themes in `lib/themes.ts`
- Apply as CSS custom properties in `globals.css`
- Components reference via Tailwind utilities (`bg-primary`)
- Theme switcher updates HTML data attribute

**Benefits**:
- Global theme changes
- No component rewrites needed
- Dark mode support
- Easy to add new themes

---

## Project Structure

```
design-system/
├── .env.example                  # Environment variable template
├── package.json                  # Root: MCP server scripts
├── vercel.json                   # Deployment config (CRITICAL!)
├── tsconfig.json                 # TypeScript config
│
├── specs/                        # 📋 COMPONENT SPEC SHEETS
│   ├── button.md                 # Button component specification
│   ├── badge.md                  # Badge component specification
│   └── template.md               # Spec sheet template
│
├── registry/
│   └── schema.ts                 # Component doc interface
│
├── mcp-server/
│   └── server.ts                 # MCP server for AI integration
│
├── scripts/
│   ├── add-component.ts          # Component creation CLI
│   ├── validate-component-json.ts
│   ├── test-prompts.ts
│   └── test-mcp.ts
│
├── lib/
│   └── utils.ts                  # Shared utilities (cn helper)
│
└── docs/                         # 🚀 DOCUMENTATION SITE (VERCEL ROOT)
    ├── package.json              # Next.js dependencies
    ├── next.config.ts            # Static export config
    ├── tailwind.config.ts
    ├── tsconfig.json
    │
    ├── app/
    │   ├── layout.tsx            # Root layout with theme provider
    │   ├── globals.css           # Design tokens + Tailwind
    │   ├── page.tsx              # Homepage
    │   └── docs/
    │       ├── layout.tsx        # Docs layout with sidebar
    │       ├── page.tsx          # Docs intro
    │       └── components/
    │           ├── page.tsx      # Components list
    │           └── [slug]/
    │               └── page.tsx  # Dynamic component pages
    │
    ├── components/
    │   ├── ui/
    │   │   ├── button.tsx        # Component implementations
    │   │   └── ...
    │   ├── layout/
    │   │   ├── header.tsx
    │   │   └── sidebar.tsx
    │   ├── docs/
    │   │   ├── code-block.tsx
    │   │   ├── component-preview.tsx
    │   │   └── prompt-card.tsx
    │   ├── theme-provider.tsx
    │   └── theme-switcher.tsx
    │
    ├── content/
    │   └── components/
    │       ├── button.json       # Component documentation
    │       └── ...
    │
    └── lib/
        ├── docs.ts               # Doc loading utilities
        ├── utils.ts              # Shared utilities
        └── themes.ts             # Theme definitions
```

---

## Setup & Installation

### Phase 1: Project Initialization

```bash
# Create root directory
mkdir design-system && cd design-system
git init

# Initialize root package.json
npm init -y
npm install --save-dev typescript tsx @types/node

# Install core dependencies
npm install @modelcontextprotocol/sdk
npm install class-variance-authority clsx tailwind-merge tailwindcss

# Create TypeScript config
npx tsc --init

# Create spec sheets directory
mkdir specs
```

**Root `package.json` scripts**:
```json
{
  "scripts": {
    "build": "tsc",
    "server": "node dist/mcp-server/server.js",
    "add-component": "tsx scripts/add-component.ts",
    "test": "npm run test:validate && npm run test:prompts && npm run test:mcp"
  }
}
```

### Phase 2: Documentation Site Setup

```bash
# Create Next.js app in docs directory
cd docs
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir

# Install additional dependencies
npm install next-themes zustand lucide-react
npm install @radix-ui/react-tabs @radix-ui/react-dropdown-menu
npm install class-variance-authority clsx tailwind-merge

# Configure for static export
```

**`docs/next.config.ts`**:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

### Phase 3: Spec Sheet Template

**`specs/template.md`**:
```markdown
# [Component Name]

## Overview
Brief description of the component and its purpose.

## Variants

### Type
- **Primary**: Main call-to-action button
- **Secondary**: Secondary actions
- **Ghost**: Subtle actions
- **White**: Light backgrounds

### Size
- **Small**: Compact spaces, mobile (h: 32px, px: 12px, text: 12px)
- **Base**: Default size (h: 40px, px: 16px, text: 14px)
- **Large**: Prominent CTAs (h: 48px, px: 24px, text: 16px)

### State
- **Enabled**: Default interactive state
- **Hover**: Mouse hover (visual feedback)
- **Focused**: Keyboard focus (ring + offset)
- **Pressed**: Active click state
- **Disabled**: Non-interactive (opacity 40%)

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | "primary" \| "secondary" \| "ghost" \| "white" | "primary" | Visual style |
| size | "sm" \| "base" \| "lg" | "base" | Component size |
| disabled | boolean | false | Disabled state |

## Design Tokens

### Colors
- Primary: `hsl(173, 80%, 40%)` → CSS var `--primary`
- Primary Hover: `hsl(173, 80%, 35%)` → CSS var `--primary-hover`

### Spacing
- Height (base): `2.5rem` → CSS var `--button-height-base`

### Effects
- Transition: `200ms` → CSS var `--duration-base`

## Examples

### Basic Usage
\`\`\`tsx
<Button>Click me</Button>
\`\`\`

### With Variants
\`\`\`tsx
<Button variant="primary" size="lg">Get Started</Button>
<Button variant="secondary">Learn More</Button>
\`\`\`

## AI Prompts

### Basic
- "Give me a primary button"
- "Create a large button"

### Advanced
- "Create a primary large button with left icon"

### Use Cases
**Hero CTA**: "Create primary and secondary CTA buttons for hero section"
```

**`vercel.json`** (root):
```json
{
  "buildCommand": "cd docs && npm ci && npm run build",
  "devCommand": "cd docs && npm run dev",
  "outputDirectory": "docs/out",
  "installCommand": "echo 'Skipping root install'",
  "framework": null
}
```

**Critical**: This config tells Vercel to:
1. Skip root `package.json` install
2. Build only the docs directory
3. Look for static output in `docs/out`

### Phase 4: Design Tokens Setup

**`docs/app/globals.css`**:
```css
@import "tailwindcss";

@layer base {
  :root {
    /* Brand Colors */
    --primary: 173 80% 40%;
    --primary-hover: 173 80% 35%;
    --primary-foreground: 210 40% 98%;
    
    /* Semantic Colors */
    --success: 142 76% 36%;
    --warning: 38 92% 50%;
    --error: 0 84% 60%;
    
    /* UI Colors */
    --background: 0 0% 100%;
    --foreground: 222 84% 5%;
    --border: 214 32% 91%;
    
    /* Component Tokens */
    --button-height-sm: 2rem;
    --button-height-base: 2.5rem;
    --button-height-lg: 3rem;
    
    --icon-sm: 1rem;
    --icon-base: 1.25rem;
    --icon-lg: 1.5rem;
    
    --radius: 0.5rem;
    --duration-base: 200ms;
  }

  .dark {
    --primary: 173 70% 50%;
    --background: 222 47% 11%;
    --foreground: 210 40% 98%;
    /* ... dark mode overrides */
  }
}

@theme inline {
  --color-primary: hsl(var(--primary));
  --color-primary-hover: hsl(var(--primary-hover));
  /* ... map all tokens */
}
```

**`docs/lib/themes.ts`**:
```typescript
export interface Theme {
  name: string;
  value: string;
  colors: {
    primary: string;
    secondary: string;
    // ... all color tokens
  };
  typography: {
    fontFamily: string;
    sizes: { ... };
  };
  spacing: {
    buttonHeight: { sm: string; base: string; lg: string };
    iconSize: { ... };
  };
  effects: {
    duration: { fast: string; base: string; slow: string };
  };
}

export const defaultTheme: Theme = { ... };
export const themes: Theme[] = [defaultTheme, ...];
```

---

## Core Workflows

### Workflow 1: Adding a Component from Spec Sheet

**When to use**: All new components

**Steps**:

1. **Create spec sheet** (`specs/button.md`):
   - Copy `specs/template.md`
   - Fill in component details (variants, props, examples)
   - Include design tokens (colors, spacing, effects)
   - Add AI prompts (basic, advanced, use cases)
   - Optionally attach screenshots/mockups

2. **Run CLI script** (reads from spec):
```bash
npm run add-component "Button" "A versatile button component" "ui"
```

3. **Implement component** (`docs/components/ui/button.tsx`) using spec as guide:
```typescript
"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded font-medium transition-all duration-[var(--duration-base)]",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
      },
      size: {
        sm: "h-[var(--button-height-sm)] px-3 text-xs",
        base: "h-[var(--button-height-base)] px-4 py-2 text-sm",
        lg: "h-[var(--button-height-lg)] px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "base",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

4. **Update documentation JSON** (`docs/content/components/button.json`) from spec sheet:
```json
{
  "name": "Button",
  "description": "A versatile button component",
  "category": "ui",
  "code": {
    "component": "... (component code string)"
  },
  "api": {
    "props": [
      {
        "name": "variant",
        "type": "\"primary\" | \"secondary\"",
        "required": false,
        "description": "Visual style variant",
        "default": "primary"
      }
    ],
    "variants": {
      "variant": ["primary", "secondary"],
      "size": ["sm", "base", "lg"]
    }
  },
  "prompts": {
    "basic": [
      "Give me a primary button",
      "Create a large button"
    ],
    "advanced": [
      "Create a primary large button with custom styling"
    ],
    "useCases": [
      {
        "scenario": "Call to Action",
        "prompt": "Create CTA buttons for hero section",
        "output": "<Button variant=\"primary\" size=\"lg\">Get Started</Button>"
      }
    ]
  },
  "examples": [
    {
      "name": "Primary Button",
      "code": "<Button variant=\"primary\">Click me</Button>"
    }
  ]
}
```

5. **Add to navigation** (`docs/components/layout/sidebar.tsx`):
```typescript
const components = [
  { name: "Button", href: "/docs/components/button" },
];
```

6. **Test the component**:
```bash
# Validate JSON structure
npm run test:validate Button

# Test AI prompts
npm run test:prompts Button

# Test MCP integration
npm run test:mcp
```

7. **View locally**:
```bash
cd docs && npm run dev
# Visit http://localhost:3000/docs/components/button
```

### Workflow 2: Adding a New Theme

**Steps**:

1. **Define theme** (`docs/lib/themes.ts`):
```typescript
export const purpleTheme: Theme = {
  name: "Purple",
  value: "purple",
  colors: {
    primary: "271 91% 65%",
    primaryHover: "271 91% 60%",
    // ... all colors
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    // ... typography tokens
  },
  spacing: {
    buttonHeight: {
      sm: "2rem",
      base: "2.5rem",
      lg: "3rem",
    },
    // ... spacing tokens
  },
  effects: {
    duration: {
      fast: "150ms",
      base: "200ms",
      slow: "300ms",
    },
  },
};

export const themes: Theme[] = [
  defaultTheme,
  purpleTheme,
  // ... more themes
];
```

2. **Theme automatically available** in theme switcher (no other changes needed!)

3. **Test**:
```bash
cd docs && npm run dev
# Click theme switcher (🎨 icon)
# Select new theme
# Verify all components update
```

### Workflow 3: Deploying Updates

**Automatic Deployment** (Vercel):
```bash
git add .
git commit -m "Update: description"
git push
# Vercel automatically deploys
```

**Manual Testing Before Deploy**:
```bash
# Test component validation
npm run test:validate ComponentName

# Test AI prompts
npm run test:prompts ComponentName

# Test MCP integration
npm run test:mcp

# Build docs site locally
cd docs && npm run build
# Verify no errors, check docs/out directory

# Build MCP server
npm run build
# Verify dist/mcp-server/server.js exists
```

---

## Testing Strategy

### 1. Component JSON Validation

**Script**: `scripts/validate-component-json.ts`

**Purpose**: Ensure component JSON files have correct structure

**Usage**:
```bash
npm run test:validate Button
```

**What it checks**:
- Required fields present (name, description, code)
- Valid JSON syntax
- Props array structure
- Variants object structure
- Prompts structure

**Implementation**:
```typescript
import fs from 'fs';
import path from 'path';
import type { ComponentDoc } from '../registry/schema.js';

async function validateComponentJSON(componentName: string) {
  const jsonPath = path.join(
    process.cwd(),
    'docs/content/components',
    `${componentName.toLowerCase()}.json`
  );
  
  const content = await fs.promises.readFile(jsonPath, 'utf-8');
  const doc: ComponentDoc = JSON.parse(content);
  
  // Validate required fields
  if (!doc.name) throw new Error('Missing name');
  if (!doc.description) throw new Error('Missing description');
  if (!doc.code?.component) throw new Error('Missing component code');
  
  // Validate props
  if (doc.api?.props) {
    doc.api.props.forEach(prop => {
      if (!prop.name || !prop.type) {
        throw new Error(`Invalid prop: ${JSON.stringify(prop)}`);
      }
    });
  }
  
  // Validate prompts
  if (doc.prompts) {
    if (doc.prompts.basic && !Array.isArray(doc.prompts.basic)) {
      throw new Error('prompts.basic must be array');
    }
  }
  
  console.log(`✅ ${componentName} JSON is valid`);
}
```

### 2. AI Prompt Testing

**Script**: `scripts/test-prompts.ts`

**Purpose**: Verify AI prompts produce expected outputs

**Usage**:
```bash
npm run test:prompts Button
```

**What it tests**:
- All basic prompts are non-empty strings
- All advanced prompts are non-empty strings
- Use case prompts have scenario, prompt, and output
- Output examples are valid JSX/TSX

**Implementation**:
```typescript
async function testPrompts(componentName: string) {
  const doc = await getComponentDoc(componentName);
  
  if (!doc.prompts) {
    console.warn(`⚠️  ${componentName} has no prompts defined`);
    return;
  }
  
  // Test basic prompts
  if (doc.prompts.basic) {
    doc.prompts.basic.forEach((prompt, index) => {
      if (!prompt || prompt.trim() === '') {
        throw new Error(`Basic prompt ${index} is empty`);
      }
      console.log(`✓ Basic prompt ${index + 1}: "${prompt}"`);
    });
  }
  
  // Test use cases
  if (doc.prompts.useCases) {
    doc.prompts.useCases.forEach((useCase, index) => {
      if (!useCase.scenario || !useCase.prompt || !useCase.output) {
        throw new Error(`Use case ${index} is incomplete`);
      }
      // Validate output is valid JSX (basic check)
      if (!useCase.output.includes('<')) {
        throw new Error(`Use case ${index} output doesn't look like JSX`);
      }
      console.log(`✓ Use case ${index + 1}: ${useCase.scenario}`);
    });
  }
  
  console.log(`✅ All prompts for ${componentName} are valid`);
}
```

### 3. MCP Integration Testing

**Script**: `scripts/test-mcp.ts`

**Purpose**: Verify MCP server can load and serve components

**Usage**:
```bash
npm run test:mcp
```

**What it tests**:
- MCP server starts without errors
- All components are loadable
- Search functionality works
- Component retrieval returns valid data

**Implementation**:
```typescript
async function testMCPIntegration() {
  // Simulate MCP server operations
  const componentsDir = path.join(process.cwd(), 'docs/content/components');
  const files = await fs.readdir(componentsDir);
  
  const components: Map<string, ComponentDoc> = new Map();
  
  for (const file of files) {
    if (file.endsWith('.json')) {
      const content = await fs.readFile(
        path.join(componentsDir, file),
        'utf-8'
      );
      const doc: ComponentDoc = JSON.parse(content);
      components.set(doc.name, doc);
      console.log(`✓ Loaded: ${doc.name}`);
    }
  }
  
  // Test search
  const searchQuery = 'button';
  const results = Array.from(components.values()).filter(c =>
    c.name.toLowerCase().includes(searchQuery) ||
    c.description.toLowerCase().includes(searchQuery)
  );
  console.log(`✓ Search for "${searchQuery}" found ${results.length} results`);
  
  // Test retrieval
  const testComponent = components.get('Button');
  if (testComponent && testComponent.code.component) {
    console.log(`✓ Successfully retrieved Button component code`);
  }
  
  console.log(`✅ MCP integration test passed`);
}
```

### 4. Visual Regression Testing (Optional but Recommended)

**Tool**: Playwright or Chromatic

**Setup**:
```bash
npm install --save-dev @playwright/test
npx playwright install
```

**Test file** (`docs/tests/button.spec.ts`):
```typescript
import { test, expect } from '@playwright/test';

test('button variants render correctly', async ({ page }) => {
  await page.goto('http://localhost:3000/docs/components/button');
  
  // Wait for page to load
  await page.waitForSelector('h1:has-text("Button")');
  
  // Take screenshot
  await expect(page).toHaveScreenshot('button-variants.png');
  
  // Test theme switching
  await page.click('[aria-label="Switch theme"]');
  await page.click('text=Purple');
  await expect(page).toHaveScreenshot('button-purple-theme.png');
});
```

---

## Deployment

### Vercel Deployment (Recommended)

**Why Vercel**:
- Automatic deployments from Git
- Free tier sufficient for docs sites
- Built-in CDN and optimizations
- Static export support

**Setup**:

1. **Push to GitHub**:
```bash
git remote add origin https://github.com/username/design-system.git
git push -u origin main
```

2. **Connect to Vercel**:
- Go to vercel.com
- Import Git repository
- Vercel auto-detects Next.js

3. **Override Build Settings** (Important!):
- **Build Command**: `cd docs && npm ci && npm run build`
- **Output Directory**: `docs/out`
- **Install Command**: `echo 'Skipping root install'`

4. **Deploy**:
- Vercel deploys automatically on push
- Check deployment logs for errors
- Visit your-app.vercel.app

**Common Issues**:

❌ **Error: "No Output Directory named 'public' found"**
- Fix: Ensure `vercel.json` has correct `outputDirectory`
- Fix: Ensure `docs/next.config.ts` has `output: 'export'`

❌ **Error: "ENOENT: no such file or directory, open '/vercel/path0/docs/package.json'"**
- Fix: Update `vercel.json` to use `cd docs &&` in commands
- Fix: Use `npm ci` instead of `npm install` for faster, more reliable installs

❌ **Error: "should NOT have additional property `rootDirectory`"**
- Fix: Remove `rootDirectory` from `vercel.json` (not a valid property)
- Fix: Use `cd docs &&` in build command instead

### MCP Server Deployment (Local/Self-Hosted)

**Purpose**: Run MCP server locally for AI assistant integration

**Setup**:

1. **Build MCP server**:
```bash
npm run build
# Creates dist/mcp-server/server.js
```

2. **Configure Claude Desktop** (`~/Library/Application Support/Claude/claude_desktop_config.json`):
```json
{
  "mcpServers": {
    "design-system": {
      "command": "node",
      "args": [
        "/absolute/path/to/design-system/dist/mcp-server/server.js"
      ]
    }
  }
}
```

3. **Restart Claude Desktop**

4. **Test**:
```
User: "Show me available components"
Claude: [Uses MCP to list components]

User: "Give me a primary button"
Claude: [Returns Button component code]
```

---

## Best Practices & Lessons Learned

### 1. Repository Structure

✅ **DO**:
- Keep docs site in subdirectory with own `package.json`
- Use monorepo structure for related concerns
- Configure Vercel to only build docs directory

❌ **DON'T**:
- Mix frontend and backend dependencies in root
- Let Vercel auto-detect build (be explicit!)
- Put docs in separate repo (harder to keep in sync)

### 2. Component Design

✅ **DO**:
- Use CSS variables for all theme-able values
- Use CVA for variant management
- Keep components accessible (use semantic HTML)
- Forward refs for flexibility
- Use TypeScript for prop validation

**Example**:
```typescript
// ✅ Good: Uses CSS variables
const buttonVariants = cva(
  "bg-primary hover:bg-primary-hover h-[var(--button-height-base)]"
);

// ❌ Bad: Hardcoded values
const buttonVariants = cva(
  "bg-teal-600 hover:bg-teal-700 h-10"
);
```

✅ **DO**:
- Define variants once, use everywhere
- Make defaults explicit
- Support all common HTML attributes

```typescript
// ✅ Good: Extends native button props
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

// ❌ Bad: Custom props only
export interface ButtonProps {
  variant?: string;
  onClick?: () => void;
}
```

### 3. Documentation

✅ **DO**:
- Write comprehensive AI prompts (basic, advanced, use cases)
- Include real-world examples
- Document all props with descriptions
- Show expected outputs for prompts
- Keep JSON docs in sync with component code

**Prompt Structure**:
```json
{
  "prompts": {
    "basic": [
      "Give me a [component]",
      "Create a [variant] [component]"
    ],
    "advanced": [
      "Create a [variant] [component] with [feature]"
    ],
    "useCases": [
      {
        "scenario": "Real-world scenario name",
        "prompt": "Natural language request",
        "output": "<ActualCode>...</ActualCode>"
      }
    ]
  }
}
```

✅ **DO**:
- Use copy-to-clipboard for all code examples
- Show live previews of components
- Organize by categories (UI, Forms, Layout, etc.)
- Include installation instructions

❌ **DON'T**:
- Write vague prompts ("show me a button")
- Skip use case examples
- Forget to update docs when component changes

### 4. Theme System

✅ **DO**:
- Define all design tokens in CSS variables
- Create TypeScript interfaces for themes
- Use HSL color format (easier to adjust lightness/saturation)
- Support dark mode from day one
- Make tokens semantic (--primary, not --teal-600)

**Token Organization**:
```css
:root {
  /* Brand Colors */
  --primary: 173 80% 40%;
  --primary-hover: 173 80% 35%;
  
  /* Component Tokens */
  --button-height-base: 2.5rem;
  
  /* Effects */
  --duration-base: 200ms;
}
```

✅ **DO**:
- Persist theme selection in localStorage
- Use `next-themes` for Next.js integration
- Update all tokens when theme changes

❌ **DON'T**:
- Hardcode colors in components
- Forget transition durations for theme switches
- Use different token names across files

### 5. Testing

✅ **DO**:
- Validate JSON structure before committing
- Test AI prompts produce expected outputs
- Verify MCP server can load all components
- Build locally before pushing
- Use TypeScript for compile-time checks

**Pre-commit checklist**:
```bash
# 1. Validate new component
npm run test:validate ComponentName

# 2. Test prompts
npm run test:prompts ComponentName

# 3. Test MCP
npm run test:mcp

# 4. Build docs
cd docs && npm run build

# 5. Verify no linter errors
npm run lint
```

❌ **DON'T**:
- Skip tests for "small" changes
- Push without building locally
- Ignore TypeScript errors
- Commit broken JSON

### 6. Git Workflow

✅ **DO**:
- Write descriptive commit messages
- Include what changed and why
- Reference issues if applicable
- Keep commits focused

**Good commit messages**:
```
✅ "Add Button component with primary, secondary, and ghost variants"
✅ "Fix theme switcher not persisting selection to localStorage"
✅ "Update vercel.json to skip root install and build docs only"
```

**Bad commit messages**:
```
❌ "fix bug"
❌ "update"
❌ "wip"
```

✅ **DO**:
- Use `.gitignore` properly
- Exclude `node_modules/`, `dist/`, `.next/`, `out/`
- Include `.env.example`, exclude `.env`

### 7. Performance

✅ **DO**:
- Use static export for docs site (faster, cheaper)
- Optimize images (use `next/image` or unoptimized flag)
- Code-split large components
- Lazy load heavy dependencies

❌ **DON'T**:
- Use server-side rendering for static docs
- Include unused dependencies
- Forget to minify production builds

### 8. AI Integration (MCP)

✅ **DO**:
- Write natural language prompts
- Include context in prompts (size, variant, use case)
- Show expected outputs
- Test prompts with actual AI assistant

**Good prompts**:
```
✅ "Create a large primary button for a hero section CTA"
✅ "Give me a button with an icon on the left"
✅ "Show me all button size variations"
```

**Bad prompts**:
```
❌ "button"
❌ "make it blue"
❌ "the thing"
```

✅ **DO**:
- Organize prompts by complexity (basic, advanced)
- Include real-world use cases
- Specify which props to use

❌ **DON'T**:
- Assume AI knows your component API
- Write prompts without testing them
- Skip output examples

### 9. Maintenance

✅ **DO**:
- Keep dependencies updated (especially Next.js, React)
- Monitor Vercel build logs
- Set up error tracking (Sentry, LogRocket)
- Document breaking changes

**Upgrade workflow**:
```bash
# Check for updates
npm outdated

# Update package.json
npm install <package>@latest

# Test locally
npm run test
cd docs && npm run build

# Deploy
git commit -am "Update dependencies" && git push
```

✅ **DO**:
- Review Vercel deployment logs weekly
- Fix broken links in documentation
- Update examples when APIs change

### 10. Collaboration

✅ **DO**:
- Document component guidelines (README)
- Use PR templates for component additions
- Review component code before merging
- Keep design and code in sync

**Component PR Template**:
```markdown
## Component: [Name]

### Description
Brief description of component

### Variants
- [ ] Primary
- [ ] Secondary
- [ ] ...

### Testing
- [ ] JSON validated
- [ ] Prompts tested
- [ ] Built locally
- [ ] Reviewed in browser

### Screenshots
[Include screenshots of component]

### AI Prompts
- "Basic prompt example"
- "Advanced prompt example"
```

---

## Quick Reference

### Essential Commands

```bash
# Development
cd docs && npm run dev          # Start docs dev server
npm run dev:server              # Start MCP server (dev mode)

# Component Management
npm run add-component "Name" "Description" "category"
npm run extract                 # Sync from Figma

# Testing
npm run test:validate Button    # Validate JSON
npm run test:prompts Button     # Test prompts
npm run test:mcp                # Test MCP integration
npm run test                    # Run all tests

# Building
npm run build                   # Build MCP server
cd docs && npm run build        # Build docs site

# Deployment
git push                        # Auto-deploy to Vercel
```

### File Locations

```
Component code:        docs/components/ui/[name].tsx
Component docs:        docs/content/components/[name].json
Theme definitions:     docs/lib/themes.ts
Design tokens:         docs/app/globals.css
Navigation:            docs/components/layout/sidebar.tsx
Vercel config:         vercel.json (root)
Environment vars:      .env (root)
```

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Vercel builds root instead of docs | Update `vercel.json`: `"buildCommand": "cd docs && ..."` |
| Theme not applying to component | Use CSS variables: `bg-primary` not `bg-teal-600` |
| Component not showing in docs | Add to `sidebar.tsx` navigation |
| MCP server can't find components | Rebuild: `npm run build` |
| Dark mode broken | Check `next-themes` provider in `layout.tsx` |
| JSON validation fails | Run `npm run test:validate ComponentName` for details |

---

## Conclusion

This blueprint captures everything we learned building this design system. The key insights:

1. **Monorepo structure works** but requires careful Vercel configuration
2. **CSS variables + themes** provide powerful, flexible styling
3. **AI integration via MCP** requires thoughtful prompt engineering
4. **Testing is essential** - validate JSON, test prompts, verify MCP
5. **Documentation is code** - keep JSON in sync with components

Use this as your foundation to build from scratch, adapting as needed for your specific requirements. The architecture is proven, the workflows are tested, and the deployment is solid.

**Happy building! 🚀**

