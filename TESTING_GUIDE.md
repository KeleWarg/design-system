# Testing Guide - AI Design System

This guide covers how to test components added to your design system library.

## 🎯 What to Test

When you add a component with a spec sheet (JSON + prompts), you should test:

1. **Component Rendering** - Does it display correctly?
2. **Component Variants** - Do all props/variants work?
3. **AI Prompts** - Do the prompts generate correct code?
4. **Documentation** - Is everything visible in the docs?
5. **MCP Integration** - Can Claude access the component?

---

## 1. 🎨 Visual Testing (Browser)

### Test the Component Live

**Start the docs server:**
```bash
cd docs && npm run dev
```

**Visit your component page:**
```
http://localhost:3000/docs/components/button
```

### What to Check:
- ✅ Component preview renders correctly
- ✅ All variants display (Types, Sizes, States, Icons)
- ✅ Interactive examples work
- ✅ AI Prompts section appears
- ✅ Copy buttons work on hover
- ✅ Code snippets are correct

### Quick Visual Test:
```bash
# Check if page loads without errors
curl -s http://localhost:3000/docs/components/button | grep -i "error" | wc -l
# Should return 0 (no errors)
```

---

## 2. 🧪 Component Functionality Testing

### Manual Testing Checklist

Create a test file to verify all component variants:

**File: `docs/test-pages/button-test.tsx`**

```tsx
import { Button } from "@/components/ui/button"

export default function ButtonTest() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold">Button Component Test</h1>
      
      {/* Test: All Types */}
      <section>
        <h2 className="text-xl mb-4">Types</h2>
        <div className="flex gap-4">
          <Button Type="Primary">Primary</Button>
          <Button Type="Secondary">Secondary</Button>
          <Button Type="Ghost">Ghost</Button>
          <Button Type="White">White</Button>
        </div>
      </section>

      {/* Test: All Sizes */}
      <section>
        <h2 className="text-xl mb-4">Sizes</h2>
        <div className="flex gap-4 items-center">
          <Button Size="Small">Small</Button>
          <Button Size="Base">Base</Button>
          <Button Size="Large">Large</Button>
        </div>
      </section>

      {/* Test: All States */}
      <section>
        <h2 className="text-xl mb-4">States</h2>
        <div className="flex gap-4">
          <Button State="Enabled">Enabled</Button>
          <Button State="Hover">Hover</Button>
          <Button State="Focused">Focused</Button>
          <Button State="Disabled">Disabled</Button>
        </div>
      </section>

      {/* Test: Icons */}
      <section>
        <h2 className="text-xl mb-4">Icons</h2>
        <div className="flex gap-4">
          <Button Icon="Left">
            <span>→</span> Left Icon
          </Button>
          <Button Icon="Right">
            Right Icon <span>→</span>
          </Button>
        </div>
      </section>

      {/* Test: Disabled Prop */}
      <section>
        <h2 className="text-xl mb-4">Disabled Prop</h2>
        <div className="flex gap-4">
          <Button disabled>Disabled via prop</Button>
          <Button State="Disabled">Disabled via State</Button>
        </div>
      </section>

      {/* Test: onClick Handler */}
      <section>
        <h2 className="text-xl mb-4">Interactivity</h2>
        <Button onClick={() => alert('Button clicked!')}>
          Click Me
        </Button>
      </section>
    </div>
  )
}
```

**To test:**
1. Create the file at `docs/app/test/button/page.tsx`
2. Visit `http://localhost:3000/test/button`
3. Verify each section renders correctly
4. Click the interactive button

---

## 3. 🤖 AI Prompt Testing

Test that your prompts generate the correct code.

### Test with Claude Desktop (MCP)

**Prerequisites:**
```bash
# 1. Build MCP server
npm run build

# 2. Verify Claude config
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json

# 3. Restart Claude Desktop
```

### Test Each Prompt Type:

#### **Basic Prompts:**
Ask Claude:
```
"Give me a Primary button"
```

**Expected Output:**
```tsx
<Button Type="Primary">Button</Button>
```

#### **Advanced Prompts:**
Ask Claude:
```
"Create a Primary Large button with a left icon"
```

**Expected Output:**
```tsx
<Button Type="Primary" Size="Large" Icon="Left">
  <IconComponent className="w-4 h-4" />
  Button Text
</Button>
```

#### **Use Case Prompts:**
Ask Claude:
```
"Create primary and secondary CTA buttons for my hero section"
```

**Expected Output:**
```tsx
<div className="flex gap-4">
  <Button Type="Primary" Size="Large">Get Started</Button>
  <Button Type="Secondary" Size="Large">Learn More</Button>
</div>
```

### Automated Prompt Testing:

Create a test script:

**File: `scripts/test-prompts.ts`**

```typescript
import fs from 'fs/promises'
import path from 'path'

interface PromptTest {
  prompt: string
  expectedIncludes: string[]
}

async function testPrompts(componentName: string) {
  console.log(`\n🧪 Testing prompts for: ${componentName}\n`)
  
  // Load component doc
  const docPath = path.join(process.cwd(), 'docs', 'content', 'components', `${componentName}.json`)
  const doc = JSON.parse(await fs.readFile(docPath, 'utf-8'))
  
  if (!doc.prompts) {
    console.log('❌ No prompts found')
    return
  }
  
  let passed = 0
  let failed = 0
  
  // Test basic prompts
  console.log('📋 Basic Prompts:')
  doc.prompts.basic?.forEach((prompt: string, i: number) => {
    console.log(`  ${i + 1}. "${prompt}"`)
    // Check if prompt is well-formed
    if (prompt.length > 10 && prompt.includes(componentName)) {
      console.log(`     ✅ Valid`)
      passed++
    } else {
      console.log(`     ❌ Too short or missing component name`)
      failed++
    }
  })
  
  // Test use cases
  console.log('\n🎯 Use Cases:')
  doc.prompts.useCases?.forEach((useCase: any, i: number) => {
    console.log(`  ${i + 1}. ${useCase.scenario}`)
    console.log(`     Prompt: "${useCase.prompt}"`)
    
    // Verify output contains component
    if (useCase.output.includes(`<${componentName}`)) {
      console.log(`     ✅ Output includes component`)
      passed++
    } else {
      console.log(`     ❌ Output missing component`)
      failed++
    }
  })
  
  console.log(`\n📊 Results: ${passed} passed, ${failed} failed\n`)
}

// Run test
const componentName = process.argv[2] || 'Button'
testPrompts(componentName).catch(console.error)
```

**Run it:**
```bash
tsx scripts/test-prompts.ts Button
```

---

## 4. 📄 Documentation Testing

### Verify JSON Schema

**File: `scripts/validate-component-json.ts`**

```typescript
import fs from 'fs/promises'
import path from 'path'

interface ComponentDoc {
  name: string
  description: string
  category?: string
  installation?: any
  code: { component: string }
  api?: any
  prompts?: {
    basic?: string[]
    advanced?: string[]
    useCases?: Array<{
      scenario: string
      prompt: string
      output: string
    }>
  }
  examples?: any[]
}

async function validateComponent(name: string) {
  console.log(`\n🔍 Validating: ${name}\n`)
  
  const jsonPath = path.join(process.cwd(), 'docs', 'content', 'components', `${name.toLowerCase()}.json`)
  const componentPath = path.join(process.cwd(), 'docs', 'components', 'ui', `${name.toLowerCase()}.tsx`)
  
  const errors: string[] = []
  const warnings: string[] = []
  
  // Check JSON exists
  try {
    const doc: ComponentDoc = JSON.parse(await fs.readFile(jsonPath, 'utf-8'))
    
    // Required fields
    if (!doc.name) errors.push('Missing: name')
    if (!doc.description) errors.push('Missing: description')
    if (!doc.code?.component) errors.push('Missing: code.component')
    
    // Recommended fields
    if (!doc.category) warnings.push('Missing: category')
    if (!doc.installation) warnings.push('Missing: installation')
    if (!doc.api) warnings.push('Missing: api')
    if (!doc.prompts) warnings.push('Missing: prompts')
    if (!doc.examples) warnings.push('Missing: examples')
    
    // Validate prompts
    if (doc.prompts) {
      if (!doc.prompts.basic || doc.prompts.basic.length === 0) {
        warnings.push('No basic prompts defined')
      }
      if (!doc.prompts.useCases || doc.prompts.useCases.length === 0) {
        warnings.push('No use case prompts defined')
      }
      
      // Check use case structure
      doc.prompts.useCases?.forEach((uc, i) => {
        if (!uc.scenario) errors.push(`Use case ${i}: missing scenario`)
        if (!uc.prompt) errors.push(`Use case ${i}: missing prompt`)
        if (!uc.output) errors.push(`Use case ${i}: missing output`)
      })
    }
    
    console.log('✅ JSON file exists and is valid')
  } catch (e) {
    errors.push(`Failed to read/parse JSON: ${e}`)
  }
  
  // Check component file exists
  try {
    await fs.access(componentPath)
    console.log('✅ Component file exists')
  } catch {
    errors.push('Component file not found')
  }
  
  // Report
  if (errors.length > 0) {
    console.log('\n❌ ERRORS:')
    errors.forEach(e => console.log(`   - ${e}`))
  }
  
  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:')
    warnings.forEach(w => console.log(`   - ${w}`))
  }
  
  if (errors.length === 0 && warnings.length === 0) {
    console.log('\n✅ All checks passed!')
  }
  
  console.log()
}

const componentName = process.argv[2] || 'Button'
validateComponent(componentName).catch(console.error)
```

**Run it:**
```bash
tsx scripts/validate-component-json.ts Button
```

---

## 5. 🔌 MCP Server Testing

### Test MCP Tools

**File: `scripts/test-mcp.ts`**

```typescript
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

async function testMCPServer() {
  console.log('\n🧪 Testing MCP Server\n')
  
  try {
    // Test 1: Server builds
    console.log('1. Building MCP server...')
    await execAsync('npm run build')
    console.log('   ✅ Build successful')
    
    // Test 2: Server executable exists
    console.log('\n2. Checking server file...')
    await execAsync('ls dist/mcp-server/server.js')
    console.log('   ✅ Server file exists')
    
    // Test 3: Component JSON files exist
    console.log('\n3. Checking component JSON files...')
    const { stdout } = await execAsync('ls docs/content/components/*.json')
    const files = stdout.trim().split('\n')
    console.log(`   ✅ Found ${files.length} component(s)`)
    files.forEach(f => console.log(`      - ${f.split('/').pop()}`))
    
    // Test 4: Claude config exists
    console.log('\n4. Checking Claude Desktop config...')
    await execAsync('ls ~/Library/Application\\ Support/Claude/claude_desktop_config.json')
    console.log('   ✅ Claude config exists')
    
    console.log('\n✅ All MCP tests passed!\n')
    console.log('📝 Next: Restart Claude Desktop and ask:')
    console.log('   "List my design system components"\n')
    
  } catch (error: any) {
    console.log('\n❌ Test failed:', error.message)
    process.exit(1)
  }
}

testMCPServer()
```

**Run it:**
```bash
tsx scripts/test-mcp.ts
```

---

## 6. 🚀 End-to-End Testing Flow

### Complete Testing Workflow:

```bash
# 1. Validate component JSON
tsx scripts/validate-component-json.ts Button

# 2. Test prompts
tsx scripts/test-prompts.ts Button

# 3. Test MCP server
tsx scripts/test-mcp.ts

# 4. Start docs server
cd docs && npm run dev

# 5. Manual browser testing
open http://localhost:3000/docs/components/button

# 6. Test with Claude
# - Restart Claude Desktop
# - Ask: "List my design system components"
# - Ask: "Give me a Primary button"
# - Verify output matches expected
```

---

## 7. 📊 Testing Checklist

### Before Adding a Component:

- [ ] Component .tsx file created
- [ ] Component JSON doc created with all fields
- [ ] At least 5 basic prompts
- [ ] At least 3 use case prompts with expected output
- [ ] All variants documented in `api.props`

### After Adding a Component:

- [ ] Run JSON validation script
- [ ] Run prompt test script
- [ ] Visual test in browser
- [ ] Test all variants work
- [ ] Test copy-to-clipboard works
- [ ] Rebuild MCP server
- [ ] Test with Claude Desktop
- [ ] Verify Claude can generate code

### Continuous Testing:

```bash
# Add to package.json
"scripts": {
  "test:component": "tsx scripts/validate-component-json.ts",
  "test:prompts": "tsx scripts/test-prompts.ts",
  "test:mcp": "tsx scripts/test-mcp.ts",
  "test:all": "npm run test:component Button && npm run test:prompts Button && npm run test:mcp"
}
```

**Run all tests:**
```bash
npm run test:all
```

---

## 8. 🐛 Common Issues & Fixes

### Issue: Component doesn't render in docs

**Check:**
```bash
# 1. Component exists
ls docs/components/ui/button.tsx

# 2. JSON exists
ls docs/content/components/button.json

# 3. No TypeScript errors
cd docs && npx tsc --noEmit
```

### Issue: Prompts don't work in Claude

**Check:**
```bash
# 1. MCP server built
ls dist/mcp-server/server.js

# 2. JSON has prompts
cat docs/content/components/button.json | grep -A 10 "prompts"

# 3. Claude config correct
cat ~/Library/Application\ Support/Claude/claude_desktop_config.json

# 4. Restart Claude Desktop
```

### Issue: Copy button doesn't work

**Fix:** Check that `prompt-card.tsx` is marked as `"use client"`

---

## 9. 📈 Future: Automated Testing

Consider adding:

1. **Visual Regression Testing** (Chromatic, Percy)
2. **Unit Tests** (Jest, Vitest)
3. **E2E Tests** (Playwright)
4. **Prompt Accuracy Tests** (compare AI output to expected)

---

## 🎉 Quick Start

**Test your Button component right now:**

```bash
# 1. Create validation script
cat > scripts/validate-component-json.ts << 'EOF'
# (paste validation script from section 4)
EOF

# 2. Run validation
tsx scripts/validate-component-json.ts Button

# 3. Test in browser
cd docs && npm run dev
# Visit: http://localhost:3000/docs/components/button

# 4. Test with Claude
npm run build
# Restart Claude Desktop
# Ask: "Give me a Primary button"
```

That's it! Your component is tested and ready to use! 🚀

