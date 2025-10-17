# 🚀 Quick MCP Setup

## What You Get

Use AI (Claude/Cursor) to:
- **Search** your component library
- **Get** component code instantly
- **Create** new components automatically
- **Modify** existing components

## 📦 Setup for Claude Desktop

### Step 1: Find Your Claude Config

```bash
open ~/Library/Application\ Support/Claude/
```

Edit `claude_desktop_config.json`

### Step 2: Add This Configuration

```json
{
  "mcpServers": {
    "design-system": {
      "command": "node",
      "args": [
        "/Users/keleibekwe/AIDesignSystem/dist/mcp-server/server.js"
      ]
    }
  }
}
```

### Step 3: Restart Claude Desktop

Close and reopen Claude Desktop completely.

### Step 4: Test It!

Ask Claude:
```
"List all components in my design system"
"Show me the Badge component"
"Create a new Alert component with variants"
```

## 🎯 For Cursor

In Cursor Settings → Features → MCP:

```json
{
  "name": "Design System",
  "command": "node",
  "args": ["/Users/keleibekwe/AIDesignSystem/dist/mcp-server/server.js"]
}
```

## 🧪 Test Locally First

```bash
# Start the MCP server
npm run server

# You should see: "Figma Components MCP server running on stdio"
# Press Ctrl+C to stop
```

## 💡 What You Can Do

### 1. Search Components
```
"Find all button components"
"Search for badge"
```

### 2. Get Component Details
```
"Show me the Badge component code"
"What props does Button have?"
```

### 3. Create New Components
```
"Create a Card component with title and description"
"Add an Alert component with success, error, and warning variants"
```

### 4. List Everything
```
"List all my components"
"What components do I have in the UI category?"
```

## 📁 Current Components

Right now you have:
- **Badge** (manual example)
- **Button** (from Figma)

## 🔄 Workflow

1. **Ask Claude** to create a new component
2. Claude uses **MCP** to:
   - Search existing patterns
   - Get component structure
   - Generate matching code
3. **New component** appears in your docs site automatically

## ⚡ Quick Commands

```bash
# Rebuild MCP server
npm run build

# Test MCP server
npm run server

# Run docs site
cd docs && npm run dev
```

That's it! Configure Claude Desktop and start building with AI! 🎉

