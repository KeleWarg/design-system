export default function DocsPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          Introduction
        </h1>
        <p className="text-lg text-muted-foreground">
          Welcome to your design system documentation. This is a collection of beautifully designed,
          accessible components extracted from your Figma design system.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          About This Design System
        </h2>
        <p className="leading-7">
          This design system is built with React, TypeScript, and Tailwind CSS. All components are
          automatically extracted from your Figma designs and transformed into production-ready code.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Features
        </h2>
        <ul className="ml-6 list-disc [&>li]:mt-2">
          <li>
            <strong>Figma-Powered:</strong> Components automatically extracted from your Figma
            design system
          </li>
          <li>
            <strong>Type-Safe:</strong> Built with TypeScript for complete type safety
          </li>
          <li>
            <strong>Customizable:</strong> Styled with Tailwind CSS and fully customizable
          </li>
          <li>
            <strong>Accessible:</strong> Built with accessibility in mind
          </li>
          <li>
            <strong>Copy & Paste:</strong> No package to install, just copy the code you need
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
          Getting Started
        </h2>
        <p className="leading-7">
          Browse through the components in the sidebar to see what&apos;s available. Each component page
          includes:
        </p>
        <ul className="ml-6 list-disc [&>li]:mt-2">
          <li>Live preview with interactive variants</li>
          <li>Complete source code</li>
          <li>Installation instructions</li>
          <li>API reference with all props</li>
          <li>Usage examples</li>
        </ul>
      </div>
    </div>
  )
}


