# AI Design System

> Figma-powered design system with React, TypeScript, and Tailwind CSS. Built with AI-first workflows and global theming.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 🎨 Overview

A production-ready design system that:
- **Syncs with Figma** - Components extracted from your design files
- **Global Theming** - CSS variables for instant theme changes
- **AI-Powered** - MCP server integration for Claude and AI tools
- **Type-Safe** - Full TypeScript support
- **Beautiful Docs** - Next.js documentation site with live previews

## ✨ Features

### 🎨 Design Tokens (CSS Variables)
Change one variable → all components update globally:
- **Colors**: `--primary`, `--secondary`, `--success`, `--warning`, etc.
- **Sizes**: `--button-height-*`, `--icon-*`, `--radius`
- **Animation**: `--duration-fast`, `--duration-base`, `--duration-slow`
- **Dark Mode**: Automatic light/dark variants

### 🔧 Theme Switcher
Live preview of 5 color themes:
- Default (Teal)
- Purple
- Blue
- Rose
- Emerald

### 🤖 MCP Server Integration
Expose your components to Claude and other AI tools:
```bash
# List components
"List my design system components"

# Generate component code
"Give me a Primary Large button with left icon"
```

### 📚 Components

#### Button
4 visual types from Figma:
- **Primary** - Main actions (teal)
- **Secondary** - Secondary actions (gray)
- **Ghost** - Subtle actions (transparent)
- **White** - Contrast on colored backgrounds

**Variants:**
- 3 sizes: Small, Base, Large
- 5 states: Enabled, Hover, Focused, Pressed, Disabled
- 3 icon positions: None, Left, Right

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/KeleWarg/design-system.git
cd design-system

# Install dependencies
npm install
```

### Run Documentation Site

```bash
cd docs
npm install
npm run dev
```

Visit http://localhost:3000

### Set Up MCP Server (Optional)

```bash
# Configure for Claude Desktop
./setup-mcp.sh
```

Restart Claude Desktop, then try:
```
"List my design system components"
"Give me a Primary button"
```

## 📖 Documentation

- **[Theming Guide](THEMING_GUIDE.md)** - Complete theming documentation
- **[Component Workflow](COMPONENT_WORKFLOW.md)** - Adding new components
- **[MCP Setup](SETUP_MCP.md)** - AI integration guide
- **[Quick Start](THEMING_QUICK_START.md)** - Visual quick reference

## 🎯 Usage

### Change Theme Globally

Edit `docs/app/globals.css`:

```css
:root {
  /* Change primary color */
  --primary: 271 91% 65%;  /* Purple instead of Teal */
  --primary-hover: 271 91% 60%;
}
```

All Primary buttons, badges, and focus rings update automatically!

### Use Button Component

```tsx
import { Button } from "@/components/ui/button"

// Primary button
<Button Type="Primary" Size="Base">
  Click me
</Button>

// Large button with icon
<Button Type="Primary" Size="Large" Icon="Left">
  <IconPlus />
  Add Item
</Button>

// Secondary small button
<Button Type="Secondary" Size="Small">
  Cancel
</Button>
```

### Add New Component

```bash
npm run add-component "Input" "Text input field" "form"
```

Follow the prompts to create your component with proper theming.

## 🏗️ Architecture

```
design-system/
├── docs/                      # Next.js documentation site
│   ├── components/ui/         # Component implementations
│   ├── content/components/    # Component JSON docs
│   └── app/                   # Next.js app
├── mcp-server/               # MCP server for AI
├── scripts/                  # Automation scripts
├── figma-extract/            # Figma API integration
└── code-generation/          # Component generators
```

## 🎨 Customization

### Create Custom Theme

```css
/* docs/app/globals.css */
.theme-sunset {
  --primary: 14 100% 57%;        /* Orange */
  --primary-hover: 14 100% 52%;
  --success: 45 93% 47%;         /* Yellow */
}
```

Apply:
```tsx
<body className="theme-sunset">
  {/* All components use sunset colors */}
</body>
```

### Adjust Button Sizes

```css
:root {
  --button-height-base: 3rem;  /* Taller buttons */
}
```

## 🧪 Testing

```bash
# Validate all components
npm test

# Test specific component
npm run test:validate Button
npm run test:prompts Button
npm run test:mcp
```

## 🔗 Figma Integration (Optional)

1. Get Figma API token
2. Add to `.env`:
   ```
   FIGMA_ACCESS_TOKEN=your_token
   FIGMA_FILE_KEY=your_file_key
   ```
3. Run sync:
   ```bash
   npm run sync
   ```

## 📦 Build

```bash
# Build documentation site
cd docs && npm run build

# Build MCP server
npm run build
```

## 🤝 Contributing

Contributions welcome! Please read [COMPONENT_WORKFLOW.md](COMPONENT_WORKFLOW.md) for the workflow.

## 📄 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Component variants with [CVA](https://cva.style/)
- Inspired by [shadcn/ui](https://ui.shadcn.com/)

---

**Questions?** Check the [documentation](THEMING_GUIDE.md) or open an issue.

**Live Demo:** Visit http://localhost:3000 after running `npm run dev`
