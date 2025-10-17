# Figma to Code MCP Pipeline

A complete pipeline that extracts design system components from Figma, generates shadcn-style React components with Tailwind CSS, creates comprehensive documentation with **AI Prompt Libraries**, and exposes them via an MCP server for AI tools.

## 🎯 Overview

This pipeline automates the process of:
1. **Extracting** components and design tokens from Figma
2. **Generating** React components with TypeScript and Tailwind CSS
3. **Creating** shadcn-style documentation with AI Prompt Library
4. **Exposing** components via MCP server for AI tools like Claude Desktop and Cursor

## ✨ New: AI Prompt Library

Each component now includes a curated **Prompt Library** that makes it easy to use AI to build with your design system:
- 📋 **Copy-paste prompts** for instant code generation
- 🎯 **Use-case examples** for common scenarios
- 🔥 **Advanced patterns** for complex features
- 🤖 **MCP integration** for seamless AI workflows

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env` file:

```bash
# Copy the example
cp .env.example .env

# Edit with your credentials
FIGMA_TOKEN=your_personal_access_token_here
FIGMA_FILE_KEY=your_figma_file_key_here
```

**Getting your credentials:**
- **FIGMA_TOKEN**: Go to Figma → Settings → Account → Personal Access Tokens
- **FIGMA_FILE_KEY**: From your Figma file URL: `https://www.figma.com/file/[FILE_KEY]/...`

### 3. Run the Pipeline

```bash
# Extract components and generate everything
npm run extract

# Or run with auto-sync (includes git commit)
npm run sync
```

### 4. Start MCP Server

```bash
# Start the MCP server
npm run server

# Or run in development mode with auto-reload
npm run dev:server
```

## 📁 Project Structure

```
design-system/
├── figma-extract/           # Figma API extraction
│   ├── extract.ts
│   └── data/               # Raw extracted data
├── code-generation/        # Component & config generation
│   ├── generate-components.ts
│   └── generate-tailwind-config.ts
├── components/             # Generated React components
│   └── ui/
├── registry/               # Documentation system
│   ├── schema.ts
│   ├── generate-docs.ts
│   └── components/         # Generated docs
├── mcp-server/            # MCP server for AI tools
│   └── server.ts
├── scripts/               # Pipeline orchestration
│   ├── full-pipeline.ts
│   └── sync-from-figma.ts
└── lib/                   # Utilities
    └── utils.ts
```

## 🛠️ Available Scripts

| Script | Description |
|--------|-------------|
| `npm run extract` | Run full pipeline (extract → generate → document) |
| `npm run sync` | Run pipeline + auto-commit changes to git |
| `npm run server` | Start MCP server |
| `npm run dev:server` | Start MCP server with auto-reload |
| `npm run build` | Build TypeScript to JavaScript |

## 🔧 Configuration

### Core Components

The pipeline is configured to extract 5-10 core components by default:

- Button
- Input
- Card
- Badge
- Alert
- Avatar
- Checkbox
- Radio
- Switch
- Textarea

To modify this list, edit the `CORE_COMPONENTS` array in `figma-extract/extract.ts`.

### Component Styling

Customize component generation by modifying:

- **Base classes**: `getBaseClasses()` in `ComponentGenerator`
- **Variant mappings**: `mapVariantToClasses()` in `ComponentGenerator`
- **Design tokens**: Extracted from your Figma file

## 🤖 MCP Server Usage

The MCP server exposes these tools to AI assistants:

### Available Tools

1. **`search_components`** - Search components by name or tag
2. **`get_component`** - Get full component documentation and code
3. **`list_components`** - List all available components
4. **`get_component_code`** - Get just the component code

### Example Queries

- "Show me the Button component"
- "Search for form components"
- "List all UI components"
- "Get the code for the Card component"

## 🔗 MCP Client Configuration

### Claude Desktop

Add to your Claude Desktop configuration:

```json
{
  "mcpServers": {
    "figma-components": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-server/server.js"]
    }
  }
}
```

### Cursor

Add to your Cursor MCP configuration:

```json
{
  "mcpServers": {
    "figma-components": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-server/server.js"]
    }
  }
}
```

## 🔄 Auto-Sync Workflow

The auto-sync feature keeps your components in sync with Figma:

1. **Manual sync**: `npm run sync`
2. **Automated sync**: Set up a cron job or GitHub Action
3. **Git integration**: Automatically commits changes with descriptive messages

### GitHub Action Example

```yaml
name: Sync from Figma
on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday at 9 AM
  workflow_dispatch:

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run sync
        env:
          FIGMA_TOKEN: ${{ secrets.FIGMA_TOKEN }}
          FIGMA_FILE_KEY: ${{ secrets.FIGMA_FILE_KEY }}
```

## 🎨 Customization

### Adding New Components

1. Add component name to `CORE_COMPONENTS` in `figma-extract/extract.ts`
2. Add base classes in `ComponentGenerator.getBaseClasses()`
3. Add variant mappings in `ComponentGenerator.mapVariantToClasses()`
4. Run `npm run extract`

### Customizing Generated Code

Modify the component template in `ComponentGenerator.renderTemplate()`:

- Change import paths
- Add custom props
- Modify component structure
- Add additional utilities

### Design Token Mapping

Customize how Figma tokens map to Tailwind classes:

- Colors: `extractColors()` in `FigmaExtractor`
- Typography: `extractTypography()` in `FigmaExtractor`
- Spacing: `extractSpacing()` in `FigmaExtractor`

## 🐛 Troubleshooting

### Common Issues

**"Missing environment variables"**
- Ensure `.env` file exists with `FIGMA_TOKEN` and `FIGMA_FILE_KEY`

**"No components found"**
- Check that your Figma file has components with names matching `CORE_COMPONENTS`
- Verify your Figma file key is correct

**"MCP server not connecting"**
- Ensure the server is running: `npm run server`
- Check the file path in your MCP client configuration
- Verify the server builds without errors: `npm run build`

**"Generated components don't look right"**
- Review the base classes in `ComponentGenerator`
- Check your Tailwind configuration
- Verify design tokens are extracted correctly

### Debug Mode

Run with debug logging:

```bash
DEBUG=* npm run extract
```

### Checking Generated Files

```bash
# Check extracted data
cat figma-extract/data/components.json

# Check generated components
ls components/ui/

# Check documentation
ls registry/components/
```

## 📊 Success Metrics

### Week 1: Pipeline Working
- ✅ Extract from Figma successfully
- ✅ Generate 5-10 components
- ✅ Create documentation
- ✅ MCP server running

### Week 2: Quality Components
- ✅ Components match designs
- ✅ Documentation complete
- ✅ AI queries work perfectly
- ✅ Team can use generated code

### Month 1: Production Ready
- ✅ All components generated
- ✅ Automated sync working
- ✅ Code quality high
- ✅ Developer adoption

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

- **Issues**: Create a GitHub issue
- **Documentation**: Check this README
- **Examples**: See the generated components in `components/ui/`

---

**Happy coding!** 🚀

This pipeline transforms your Figma design system into a living, AI-accessible component library. Start with the core components, customize as needed, and watch your design system come to life!

