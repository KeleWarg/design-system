"use client"

export function PromptCard({ prompt }: { prompt: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt)
  }

  return (
    <div className="group relative rounded-lg border bg-muted/50 p-3 hover:bg-muted transition-colors">
      <div className="flex items-start justify-between gap-4">
        <code className="text-sm">&quot;{prompt}&quot;</code>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 inline-flex h-6 w-6 items-center justify-center rounded-md border bg-background text-xs hover:bg-accent"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
            <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
          </svg>
        </button>
      </div>
    </div>
  )
}

export function PromptOutputCard({ 
  scenario, 
  prompt, 
  output 
}: { 
  scenario: string
  prompt: string
  output: string
}) {
  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <h4 className="font-medium">{scenario}</h4>
      </div>
      <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Prompt:</p>
          <div className="relative">
            <code className="text-sm">&quot;{prompt}&quot;</code>
            <button
              onClick={handleCopyPrompt}
              className="absolute right-0 top-0 inline-flex h-6 w-6 items-center justify-center rounded-md border bg-background text-xs hover:bg-accent"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
              </svg>
            </button>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground mb-2">Expected Output:</p>
          <div className="relative">
            <pre className="text-xs bg-black/5 dark:bg-white/5 rounded p-3 overflow-x-auto">
              <code>{output}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

