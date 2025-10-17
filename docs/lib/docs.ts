import fs from 'fs/promises'
import path from 'path'

export interface ComponentDoc {
  name: string
  description: string
  category?: string
  installation?: {
    dependencies: string[]
    setupSteps: string[]
  }
  code: {
    component: string
    types?: string
  }
  api?: {
    props: Array<{
      name: string
      type: string
      required: boolean
      description: string
      default?: string
    }>
    variants?: Record<string, string[]>
  }
  prompts?: {
    basic?: string[]
    advanced?: string[]
    useCases?: Array<{
      scenario: string
      prompt: string
      output: string
    }>
  }
  examples?: Array<{
    name: string
    code: string
  }>
  usage?: {
    import: string
    basic: string
    examples: Array<{
      name: string
      description: string
      code: string
    }>
  }
  metadata?: {
    version: string
    lastUpdated: string
    status: string
    accessibility: string[]
    relatedComponents: string[]
    tags: string[]
  }
}

export async function getComponentDoc(slug: string): Promise<ComponentDoc> {
  const filePath = path.join(process.cwd(), 'content/components', `${slug}.json`)
  const content = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(content)
}

export async function getAllComponents(): Promise<string[]> {
  const dir = path.join(process.cwd(), 'content/components')
  const files = await fs.readdir(dir)
  return files
    .filter(file => file.endsWith('.json'))
    .map(file => file.replace('.json', ''))
}

export async function getComponentsByCategory(): Promise<Record<string, ComponentDoc[]>> {
  const components = await getAllComponents()
  const docs = await Promise.all(
    components.map(slug => getComponentDoc(slug))
  )
  
  const byCategory: Record<string, ComponentDoc[]> = {}
  
  docs.forEach(doc => {
    const category = doc.category || 'uncategorized'
    if (!byCategory[category]) {
      byCategory[category] = []
    }
    byCategory[category].push(doc)
  })
  
  return byCategory
}


