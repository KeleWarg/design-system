"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { CodeBlock } from "./code-block"

interface ComponentPreviewProps {
  name: string
  code: string
  children: React.ReactNode
}

export function ComponentPreview({
  name,
  code,
  children,
}: ComponentPreviewProps) {
  return (
    <Tabs defaultValue="preview" className="relative mt-6 w-full">
      <div className="flex items-center justify-between pb-3">
        <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
          <TabsTrigger
            value="preview"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
          >
            Code
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="preview" className="relative rounded-md border">
        <div className="flex min-h-[350px] items-center justify-center p-10">
          {children}
        </div>
      </TabsContent>
      <TabsContent value="code">
        <CodeBlock code={code} filename={`${name.toLowerCase()}.tsx`} />
      </TabsContent>
    </Tabs>
  )
}


