import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs/promises'
import path from 'path'

const execAsync = promisify(exec)

async function testMCPServer() {
  console.log('\n🧪 Testing MCP Server\n')
  console.log('='.repeat(50))
  
  let allPassed = true
  
  try {
    // Test 1: Server builds
    console.log('\n1️⃣  Building MCP server...')
    await execAsync('npm run build')
    console.log('   ✅ Build successful')
    
    // Test 2: Server executable exists
    console.log('\n2️⃣  Checking server file...')
    try {
      await fs.access('dist/mcp-server/server.js')
      console.log('   ✅ Server file exists')
    } catch {
      console.log('   ❌ Server file not found')
      allPassed = false
    }
    
    // Test 3: Component JSON files exist
    console.log('\n3️⃣  Checking component JSON files...')
    try {
      const files = await fs.readdir('docs/content/components')
      const jsonFiles = files.filter(f => f.endsWith('.json'))
      console.log(`   ✅ Found ${jsonFiles.length} component(s)`)
      jsonFiles.forEach(f => console.log(`      - ${f}`))
      
      if (jsonFiles.length === 0) {
        console.log('   ⚠️  No components found')
        allPassed = false
      }
    } catch (error: any) {
      console.log(`   ❌ Error reading components: ${error.message}`)
      allPassed = false
    }
    
    // Test 4: Validate each component JSON
    console.log('\n4️⃣  Validating component JSON structure...')
    try {
      const files = await fs.readdir('docs/content/components')
      const jsonFiles = files.filter(f => f.endsWith('.json'))
      
      for (const file of jsonFiles) {
        const content = await fs.readFile(
          path.join('docs/content/components', file),
          'utf-8'
        )
        const doc = JSON.parse(content)
        
        const hasRequired = doc.name && doc.description && doc.code?.component
        const hasPrompts = doc.prompts && (
          doc.prompts.basic?.length > 0 ||
          doc.prompts.useCases?.length > 0
        )
        
        if (hasRequired && hasPrompts) {
          console.log(`   ✅ ${file} - valid structure with prompts`)
        } else if (hasRequired) {
          console.log(`   ⚠️  ${file} - valid but missing prompts`)
        } else {
          console.log(`   ❌ ${file} - missing required fields`)
          allPassed = false
        }
      }
    } catch (error: any) {
      console.log(`   ❌ Validation error: ${error.message}`)
      allPassed = false
    }
    
    // Test 5: Claude config exists
    console.log('\n5️⃣  Checking Claude Desktop config...')
    try {
      const configPath = path.join(
        process.env.HOME || '~',
        'Library/Application Support/Claude/claude_desktop_config.json'
      )
      await fs.access(configPath)
      const config = JSON.parse(await fs.readFile(configPath, 'utf-8'))
      
      if (config.mcpServers?.['design-system'] || config.mcpServers?.['figma-design-system']) {
        console.log('   ✅ Claude config exists with design system server')
      } else {
        console.log('   ⚠️  Claude config exists but server not configured')
        allPassed = false
      }
    } catch {
      console.log('   ❌ Claude config not found')
      console.log('   Run: ./setup-mcp.sh to create it')
      allPassed = false
    }
    
    console.log('\n' + '='.repeat(50))
    
    if (allPassed) {
      console.log('\n✅ All MCP tests passed!\n')
      console.log('📝 Next steps:')
      console.log('   1. Restart Claude Desktop')
      console.log('   2. Ask Claude: "List my design system components"')
      console.log('   3. Test a prompt: "Give me a Primary button"\n')
      process.exit(0)
    } else {
      console.log('\n❌ Some tests failed. Please fix the issues above.\n')
      process.exit(1)
    }
    
  } catch (error: any) {
    console.log('\n❌ Test failed:', error.message)
    process.exit(1)
  }
}

testMCPServer()

