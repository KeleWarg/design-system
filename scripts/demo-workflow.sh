#!/bin/bash

# Demo Workflow - Adding a Card Component
# This script demonstrates the complete workflow for adding a new component

echo "🎯 Demo: Adding a Card Component to Your Design System"
echo "========================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Create the component
echo -e "${BLUE}Step 1: Creating component files...${NC}"
npm run add-component "Card" "A container component for grouping related content" "layout"
echo ""

# Step 2: Validate
echo -e "${BLUE}Step 2: Validating component structure...${NC}"
npm run test:validate Card
echo ""

# Step 3: Test prompts
echo -e "${BLUE}Step 3: Testing AI prompts...${NC}"
npm run test:prompts Card
echo ""

# Step 4: Show next steps
echo -e "${GREEN}✅ Card component created successfully!${NC}"
echo ""
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo ""
echo "1. Customize the component:"
echo "   code docs/components/ui/card.tsx"
echo ""
echo "2. Enhance the prompts:"
echo "   code docs/content/components/card.json"
echo ""
echo "3. Add to navigation:"
echo "   Edit: docs/components/layout/sidebar.tsx"
echo "   Add: { name: \"Card\", href: \"/docs/components/card\" }"
echo ""
echo "4. View in browser:"
echo "   cd docs && npm run dev"
echo "   Open: http://localhost:3000/docs/components/card"
echo ""
echo "5. Deploy to MCP:"
echo "   npm run build"
echo "   Restart Claude Desktop"
echo ""
echo -e "${GREEN}🎉 Component ready for use!${NC}"

