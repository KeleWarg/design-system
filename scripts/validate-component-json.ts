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
      
      console.log(`   📋 Basic prompts: ${doc.prompts.basic?.length || 0}`)
      console.log(`   🚀 Advanced prompts: ${doc.prompts.advanced?.length || 0}`)
      console.log(`   🎯 Use cases: ${doc.prompts.useCases?.length || 0}`)
    }
    
    console.log('✅ JSON file exists and is valid')
  } catch (e: any) {
    errors.push(`Failed to read/parse JSON: ${e.message}`)
  }
  
  // Check component file exists
  try {
    await fs.access(componentPath)
    console.log('✅ Component file exists')
  } catch {
    errors.push('Component file not found at: ' + componentPath)
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
  process.exit(errors.length > 0 ? 1 : 0)
}

const componentName = process.argv[2] || 'Button'
validateComponent(componentName).catch(console.error)

