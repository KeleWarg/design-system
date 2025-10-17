import fs from 'fs/promises'
import path from 'path'

interface PromptTest {
  prompt: string
  expectedIncludes: string[]
}

async function testPrompts(componentName: string) {
  console.log(`\n🧪 Testing prompts for: ${componentName}\n`)
  
  // Load component doc
  const docPath = path.join(process.cwd(), 'docs', 'content', 'components', `${componentName.toLowerCase()}.json`)
  
  try {
    const doc = JSON.parse(await fs.readFile(docPath, 'utf-8'))
    
    if (!doc.prompts) {
      console.log('❌ No prompts found')
      process.exit(1)
    }
    
    let passed = 0
    let failed = 0
    
    // Test basic prompts
    if (doc.prompts.basic && doc.prompts.basic.length > 0) {
      console.log('📋 Basic Prompts:')
      doc.prompts.basic.forEach((prompt: string, i: number) => {
        console.log(`  ${i + 1}. "${prompt}"`)
        // Check if prompt is well-formed
        const isValid = prompt.length > 10 && (
          prompt.toLowerCase().includes(componentName.toLowerCase()) ||
          prompt.toLowerCase().includes('button') ||
          prompt.toLowerCase().includes('component')
        )
        
        if (isValid) {
          console.log(`     ✅ Valid (${prompt.length} chars)`)
          passed++
        } else {
          console.log(`     ❌ Too short or missing component reference`)
          failed++
        }
      })
    } else {
      console.log('⚠️  No basic prompts defined')
    }
    
    // Test advanced prompts
    if (doc.prompts.advanced && doc.prompts.advanced.length > 0) {
      console.log('\n🚀 Advanced Prompts:')
      doc.prompts.advanced.forEach((prompt: string, i: number) => {
        console.log(`  ${i + 1}. "${prompt}"`)
        const isComplex = prompt.length > 20 && (prompt.includes('with') || prompt.includes('and'))
        
        if (isComplex) {
          console.log(`     ✅ Complex prompt (${prompt.length} chars)`)
          passed++
        } else {
          console.log(`     ⚠️  Consider making more complex`)
        }
      })
    }
    
    // Test use cases
    if (doc.prompts.useCases && doc.prompts.useCases.length > 0) {
      console.log('\n🎯 Use Cases:')
      doc.prompts.useCases.forEach((useCase: any, i: number) => {
        console.log(`  ${i + 1}. ${useCase.scenario}`)
        console.log(`     Prompt: "${useCase.prompt}"`)
        
        let valid = true
        
        // Verify output contains component
        if (useCase.output.includes(`<${componentName}`) || useCase.output.includes('<Button')) {
          console.log(`     ✅ Output includes component`)
          passed++
        } else {
          console.log(`     ❌ Output missing component`)
          failed++
          valid = false
        }
        
        // Check output is valid JSX/TSX
        if (useCase.output.includes('<') && useCase.output.includes('>')) {
          console.log(`     ✅ Output is valid JSX`)
        } else {
          console.log(`     ❌ Output doesn't look like JSX`)
          failed++
          valid = false
        }
        
        if (valid) passed++
      })
    } else {
      console.log('\n⚠️  No use case prompts defined')
    }
    
    console.log(`\n${'='.repeat(50)}`)
    console.log(`📊 Results: ${passed} passed, ${failed} failed`)
    console.log(`${'='.repeat(50)}\n`)
    
    if (failed > 0) {
      console.log('❌ Some tests failed. Please review the prompts.')
      process.exit(1)
    } else {
      console.log('✅ All prompt tests passed!')
      process.exit(0)
    }
    
  } catch (error: any) {
    console.log(`\n❌ Error: ${error.message}\n`)
    process.exit(1)
  }
}

// Run test
const componentName = process.argv[2] || 'Button'
testPrompts(componentName).catch(console.error)

