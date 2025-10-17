#!/bin/bash

# MCP Server Setup Script for Claude Desktop

echo "🚀 Setting up MCP Server for Claude Desktop..."
echo ""

# Build the MCP server
echo "📦 Building MCP server..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix any errors and try again."
    exit 1
fi

echo "✅ Build successful"
echo ""

# Get the absolute path
CURRENT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVER_PATH="$CURRENT_DIR/dist/mcp-server/server.js"

# Claude Desktop config path
CLAUDE_CONFIG_DIR="$HOME/Library/Application Support/Claude"
CLAUDE_CONFIG_FILE="$CLAUDE_CONFIG_DIR/claude_desktop_config.json"

echo "📝 MCP Server Configuration:"
echo "----------------------------"
echo "Server Path: $SERVER_PATH"
echo "Config File: $CLAUDE_CONFIG_FILE"
echo ""

# Create the config JSON
CONFIG_JSON=$(cat <<EOF
{
  "mcpServers": {
    "design-system": {
      "command": "node",
      "args": [
        "$SERVER_PATH"
      ]
    }
  }
}
EOF
)

echo "📋 Configuration to add:"
echo "$CONFIG_JSON"
echo ""

# Check if Claude config directory exists
if [ ! -d "$CLAUDE_CONFIG_DIR" ]; then
    echo "⚠️  Claude Desktop config directory not found."
    echo "   Please install Claude Desktop first: https://claude.ai/download"
    echo ""
    echo "   After installing, run this script again or manually add the configuration."
    exit 1
fi

# Check if config file exists
if [ -f "$CLAUDE_CONFIG_FILE" ]; then
    echo "⚠️  Config file already exists at:"
    echo "   $CLAUDE_CONFIG_FILE"
    echo ""
    echo "   Please manually merge this configuration:"
    echo ""
    echo "$CONFIG_JSON"
    echo ""
    echo "   Or backup your existing config and overwrite it."
    read -p "   Do you want to overwrite the existing config? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo ""
        echo "❌ Setup cancelled. Please manually update your config."
        exit 0
    fi
fi

# Write the config
echo "$CONFIG_JSON" > "$CLAUDE_CONFIG_FILE"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ MCP Server configuration added successfully!"
    echo ""
    echo "📌 Next Steps:"
    echo "1. Restart Claude Desktop completely (Quit and reopen)"
    echo "2. Test the connection by asking Claude:"
    echo "   \"List my design system components\""
    echo "   \"Show me the Button component\""
    echo ""
    echo "3. Start using prompts like:"
    echo "   \"Give me a Primary Large button with a left icon\""
    echo "   \"Create form submit buttons using my design system\""
    echo ""
    echo "📚 Documentation:"
    echo "   - MCP Setup: ./MCP_INTEGRATION.md"
    echo "   - Usage Guide: ./USING_COMPONENTS_WITH_AI.md"
    echo "   - Component Prompts: http://localhost:3000/docs/components/button"
    echo ""
else
    echo ""
    echo "❌ Failed to write config file. Please add manually:"
    echo "$CONFIG_JSON"
    exit 1
fi

