import { notFound } from "next/navigation"
import { getComponentDoc, getAllComponents } from "@/lib/docs"
import { ComponentPreview } from "@/components/docs/component-preview"
import { CodeBlock } from "@/components/docs/code-block"
import { PromptCard, PromptOutputCard } from "@/components/docs/prompt-card"

export async function generateStaticParams() {
  const components = await getAllComponents()
  return components.map((slug) => ({ slug }))
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  let doc
  try {
    doc = await getComponentDoc(slug)
  } catch {
    notFound()
  }

  // Dynamically import the component
  let ComponentToPreview
  try {
    const componentModule = await import(`@/components/ui/${slug}`)
    const componentName = Object.keys(componentModule).find(
      key => key !== 'default' && typeof componentModule[key] === 'function'
    )
    ComponentToPreview = componentName ? componentModule[componentName] : componentModule.default
  } catch (error) {
    console.error(`Failed to import component: ${slug}`, error)
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          {doc.name}
        </h1>
        <p className="text-lg text-muted-foreground">
          {doc.description}
        </p>
      </div>

      {/* Preview */}
      {ComponentToPreview && (
        <ComponentPreview
          name={doc.name}
          code={doc.code.component}
        >
          {slug === 'button' ? (
            <div className="space-y-8">
              {/* Types */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">Types</h3>
                <div className="flex flex-wrap gap-4">
                  <ComponentToPreview Type="Primary" Size="Base">
                    Primary
                  </ComponentToPreview>
                  <ComponentToPreview Type="Secondary" Size="Base">
                    Secondary
                  </ComponentToPreview>
                  <ComponentToPreview Type="Ghost" Size="Base">
                    Ghost
                  </ComponentToPreview>
                  <ComponentToPreview Type="White" Size="Base">
                    White
                  </ComponentToPreview>
                </div>
              </div>

              {/* Sizes */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">Sizes</h3>
                <div className="flex flex-wrap items-center gap-4">
                  <ComponentToPreview Type="Primary" Size="Small">
                    Small
                  </ComponentToPreview>
                  <ComponentToPreview Type="Primary" Size="Base">
                    Base
                  </ComponentToPreview>
                  <ComponentToPreview Type="Primary" Size="Large">
                    Large
                  </ComponentToPreview>
                </div>
              </div>

              {/* States */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">States</h3>
                <div className="flex flex-wrap gap-4">
                  <ComponentToPreview Type="Primary" State="Enabled" Size="Base">
                    Enabled
                  </ComponentToPreview>
                  <ComponentToPreview Type="Primary" State="Focused" Size="Base">
                    Focused
                  </ComponentToPreview>
                  <ComponentToPreview Type="Primary" State="Disabled" Size="Base">
                    Disabled
                  </ComponentToPreview>
                </div>
              </div>

              {/* With Icons */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-muted-foreground">With Icons</h3>
                <div className="flex flex-wrap gap-4">
                  <ComponentToPreview Type="Primary" Icon="Left" Size="Base">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Left Icon
                  </ComponentToPreview>
                  <ComponentToPreview Type="Primary" Icon="Right" Size="Base">
                    Right Icon
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </ComponentToPreview>
                </div>
              </div>
            </div>
          ) : slug === 'badge' ? (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Variants</h3>
              <div className="flex flex-wrap gap-2">
                <ComponentToPreview variant="default">Default</ComponentToPreview>
                <ComponentToPreview variant="secondary">Secondary</ComponentToPreview>
                <ComponentToPreview variant="destructive">Destructive</ComponentToPreview>
                <ComponentToPreview variant="outline">Outline</ComponentToPreview>
                <ComponentToPreview variant="success">Success</ComponentToPreview>
                <ComponentToPreview variant="warning">Warning</ComponentToPreview>
              </div>
            </div>
          ) : (
            <ComponentToPreview>
              {doc.name}
            </ComponentToPreview>
          )}
        </ComponentPreview>
      )}

      {/* Installation */}
      {doc.installation && (
        <div className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Installation
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Dependencies</h3>
              <CodeBlock
                code={`npm install ${doc.installation.dependencies.join(" ")}`}
                language="bash"
              />
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Copy Component Code</h3>
              <CodeBlock
                code={doc.code.component}
                filename={`components/ui/${slug}.tsx`}
              />
            </div>
          </div>
        </div>
      )}

      {/* API Reference */}
      {doc.api && doc.api.props && doc.api.props.length > 0 && (
        <div className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            API Reference
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-2 text-left font-medium">Prop</th>
                  <th className="px-4 py-2 text-left font-medium">Type</th>
                  <th className="px-4 py-2 text-left font-medium">Default</th>
                  <th className="px-4 py-2 text-left font-medium">Description</th>
                </tr>
              </thead>
              <tbody>
                {doc.api.props.map((prop) => (
                  <tr key={prop.name} className="border-b">
                    <td className="px-4 py-2 font-mono text-xs">
                      {prop.name}
                      {prop.required && (
                        <span className="ml-1 text-red-500">*</span>
                      )}
                    </td>
                    <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                      {prop.type}
                    </td>
                    <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                      {prop.default || "-"}
                    </td>
                    <td className="px-4 py-2 text-muted-foreground">
                      {prop.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Prompts */}
      {doc.prompts && (
        <div className="space-y-6">
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            🤖 AI Prompts
          </h2>
          <p className="text-muted-foreground">
            Use these prompts with Claude or any AI assistant that has access to your design system via MCP.
          </p>

          {/* Basic Prompts */}
          {doc.prompts.basic && doc.prompts.basic.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Quick Prompts</h3>
              <div className="grid gap-2">
                {doc.prompts.basic.map((prompt, index) => (
                  <PromptCard key={index} prompt={prompt} />
                ))}
              </div>
            </div>
          )}

          {/* Advanced Prompts */}
          {doc.prompts.advanced && doc.prompts.advanced.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Advanced Prompts</h3>
              <div className="grid gap-2">
                {doc.prompts.advanced.map((prompt, index) => (
                  <PromptCard key={index} prompt={prompt} />
                ))}
              </div>
            </div>
          )}

          {/* Use Case Examples */}
          {doc.prompts.useCases && doc.prompts.useCases.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Use Case Examples</h3>
              {doc.prompts.useCases.map((useCase, index) => (
                <PromptOutputCard 
                  key={index}
                  scenario={useCase.scenario}
                  prompt={useCase.prompt}
                  output={useCase.output}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Usage Examples */}
      {doc.examples && doc.examples.length > 0 && (
        <div className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Examples
          </h2>
          {doc.examples.map((example, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-lg font-semibold">{example.name}</h3>
              <CodeBlock code={example.code} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

