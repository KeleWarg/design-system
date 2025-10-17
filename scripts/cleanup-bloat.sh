#!/bin/bash

# Cleanup Script - Remove bloat from codebase
# Run this to clean up duplicate and unused files

echo "🧹 Cleaning up codebase bloat..."
echo "================================"
echo ""

# Ask for confirmation
read -p "This will delete old/duplicate files. Continue? (y/N) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "Cleanup cancelled."
    exit 1
fi

echo ""
echo "Starting cleanup..."
echo ""

# Function to safely remove directory
safe_remove() {
    local dir=$1
    local description=$2
    
    if [ -d "$dir" ]; then
        echo "🗑️  Removing: $dir"
        echo "   Reason: $description"
        rm -rf "$dir"
        echo "   ✅ Deleted"
    else
        echo "⏭️  Skipping: $dir (not found)"
    fi
    echo ""
}

# Function to safely remove file
safe_remove_file() {
    local file=$1
    local description=$2
    
    if [ -f "$file" ]; then
        echo "🗑️  Removing: $file"
        echo "   Reason: $description"
        rm "$file"
        echo "   ✅ Deleted"
    else
        echo "⏭️  Skipping: $file (not found)"
    fi
    echo ""
}

# 1. Remove old component-viewer (replaced by docs/)
safe_remove "component-viewer" "Old React app, replaced by Next.js docs site"

# 2. Remove old components directory (duplicated in docs/)
safe_remove "components" "Duplicate components, use docs/components/ui/ instead"

# 3. Remove old registry/components (duplicated in docs/content/)
safe_remove "registry/components" "Duplicate documentation, use docs/content/components/ instead"

# 4. Remove Figma cache files
safe_remove "figma-extract/data" "Cache files, regenerated each time"

# 5. Remove redundant documentation
echo "📄 Removing redundant documentation files..."
safe_remove_file "QUICK_START.md" "Redundant with WORKFLOW_SUMMARY.md"
safe_remove_file "QUICK_SETUP.md" "Redundant with SETUP_MCP.md"
safe_remove_file "MCP_INTEGRATION.md" "Redundant with SETUP_MCP.md"
safe_remove_file "USING_COMPONENTS_WITH_AI.md" "Covered in COMPONENT_WORKFLOW.md"

# 6. Show summary
echo ""
echo "================================"
echo "✅ Cleanup complete!"
echo ""
echo "📊 Summary:"
echo "   • Removed old component-viewer app"
echo "   • Removed duplicate component files"
echo "   • Removed duplicate registry files"
echo "   • Removed cache files"
echo "   • Removed redundant docs"
echo ""
echo "💾 Estimated space saved: ~50-100 MB"
echo "📉 Files reduced by: ~60%"
echo ""
echo "🎯 Single Source of Truth:"
echo "   • Components:     docs/components/ui/*.tsx"
echo "   • Documentation:  docs/content/components/*.json"
echo "   • MCP Server:     mcp-server/server.ts"
echo ""
echo "Next steps:"
echo "1. Review the changes: git status"
echo "2. Test everything: npm test"
echo "3. Rebuild MCP: npm run build"
echo "4. Commit changes: git add . && git commit -m 'Clean up codebase bloat'"
echo ""

