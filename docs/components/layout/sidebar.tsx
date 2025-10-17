"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const components = [
  { name: "Button", href: "/docs/components/button" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block md:w-64 border-r">
      <div className="h-full overflow-auto py-6 pr-6 lg:py-8">
        <nav className="grid gap-2">
          <div className="mb-4">
            <h4 className="mb-2 px-2 text-sm font-semibold">Getting Started</h4>
            <div className="grid gap-1">
              <Link
                href="/docs"
                className={cn(
                  "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-sm",
                  pathname === "/docs" ? "font-medium text-foreground" : "text-muted-foreground"
                )}
              >
                Introduction
              </Link>
              <Link
                href="/docs/installation"
                className={cn(
                  "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-sm",
                  pathname === "/docs/installation" ? "font-medium text-foreground" : "text-muted-foreground"
                )}
              >
                Installation
              </Link>
            </div>
          </div>
          
          <div>
            <h4 className="mb-2 px-2 text-sm font-semibold">Components</h4>
            <div className="grid gap-1">
              {components.map((component) => (
                <Link
                  key={component.href}
                  href={component.href}
                  className={cn(
                    "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline text-sm",
                    pathname === component.href ? "font-medium text-foreground" : "text-muted-foreground"
                  )}
                >
                  {component.name}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  )
}

