import Link from "next/link"
import { getAllComponents, getComponentDoc } from "@/lib/docs"

export default async function ComponentsPage() {
  const components = await getAllComponents()
  const docs = await Promise.all(
    components.map(slug => getComponentDoc(slug))
  )

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Components
        </h1>
        <p className="text-lg text-muted-foreground">
          Browse all available components from your design system.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {components.map((slug) => {
          const doc = docs.find(d => d.name.toLowerCase().replace(/\s+/g, '-') === slug || 
                                      d.name.toLowerCase() === slug.replace(/-/g, ' '))
          if (!doc) return null
          
          return (
            <Link
              key={slug}
              href={`/docs/components/${encodeURIComponent(slug)}`}
              className="group relative overflow-hidden rounded-lg border bg-background p-6 transition-colors hover:bg-accent"
            >
              <div className="space-y-2">
                <h3 className="font-semibold group-hover:text-accent-foreground">
                  {doc.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {doc.description}
                </p>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <span className="text-primary">View component →</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

