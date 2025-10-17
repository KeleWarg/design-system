#!/usr/bin/env tsx
import fs from 'fs/promises';
import path from 'path';

interface ComponentOptions {
  name: string;
  description: string;
  category?: string;
}

async function addManualComponent(options: ComponentOptions) {
  const { name, description, category = 'ui' } = options;
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  
  // Create component file
  const componentCode = `"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const ${name.toLowerCase()}Variants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ${name}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ${name.toLowerCase()}Variants> {}

const ${name} = React.forwardRef<HTMLDivElement, ${name}Props>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(${name.toLowerCase()}Variants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
${name}.displayName = "${name}"

export { ${name}, ${name.toLowerCase()}Variants }
`;

  // Create documentation JSON
  const docJson = {
    name,
    description,
    category,
    installation: {
      dependencies: [
        "class-variance-authority",
        "clsx",
        "tailwind-merge"
      ],
      setupSteps: [
        `Copy the ${name} component code to \`components/ui/${slug}.tsx\``,
        "Ensure you have the \`cn\` utility function in \`lib/utils.ts\`",
        "Component is ready to use"
      ]
    },
    code: {
      component: componentCode,
      types: `export interface ${name}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ${name.toLowerCase()}Variants> {}`
    },
    api: {
      props: [
        {
          name: "variant",
          type: "\"default\" | \"secondary\"",
          required: false,
          description: "The visual style variant of the component",
          default: "default"
        },
        {
          name: "size",
          type: "\"default\" | \"sm\" | \"lg\"",
          required: false,
          description: "The size of the component",
          default: "default"
        }
      ],
      variants: {
        variant: ["default", "secondary"],
        size: ["default", "sm", "lg"]
      }
    },
    prompts: {
      basic: [
        `Give me a ${name} component`,
        `Create a default ${name}`,
        `Show me a secondary ${name}`,
        `I need a small ${name}`,
        `Create a large ${name}`
      ],
      advanced: [
        `Create a secondary ${name} with large size`,
        `Give me a ${name} with custom styling`,
        `Show me a grid of ${name} components`,
        `Create a responsive layout with ${name}`,
        `Build a ${name} group with multiple variants`
      ],
      useCases: [
        {
          scenario: "Default Usage",
          prompt: `Show me how to use a ${name} component`,
          output: `<${name}>Content</${name}>`
        },
        {
          scenario: "With Variants",
          prompt: `Create a ${name} with different variants`,
          output: `<div className="flex gap-4">
  <${name} variant="default">Default</${name}>
  <${name} variant="secondary">Secondary</${name}>
</div>`
        },
        {
          scenario: "Different Sizes",
          prompt: `Show me ${name} in different sizes`,
          output: `<div className="flex items-center gap-4">
  <${name} size="sm">Small</${name}>
  <${name} size="default">Default</${name}>
  <${name} size="lg">Large</${name}>
</div>`
        }
      ]
    },
    examples: [
      {
        name: "Default",
        code: `<${name}>Default</${name}>`
      },
      {
        name: "Secondary",
        code: `<${name} variant="secondary">Secondary</${name}>`
      },
      {
        name: "Small Size",
        code: `<${name} size="sm">Small</${name}>`
      },
      {
        name: "Large Size",
        code: `<${name} size="lg">Large</${name}>`
      }
    ]
  };

  // Write files
  const componentPath = path.join(process.cwd(), 'docs/components/ui', `${slug}.tsx`);
  const docPath = path.join(process.cwd(), 'docs/content/components', `${slug}.json`);

  await fs.writeFile(componentPath, componentCode);
  await fs.writeFile(docPath, JSON.stringify(docJson, null, 2));

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Created component: ${componentPath}`);
  console.log(`✅ Created documentation: ${docPath}`);
  console.log('='.repeat(60));
  
  console.log('\n📋 Next Steps:\n');
  console.log(`1. Edit the component: docs/components/ui/${slug}.tsx`);
  console.log(`   - Customize variants and styling`);
  console.log(`   - Add any additional props\n`);
  
  console.log(`2. Edit the documentation: docs/content/components/${slug}.json`);
  console.log(`   - Add detailed description`);
  console.log(`   - Customize prompts for your use cases`);
  console.log(`   - Add real-world examples\n`);
  
  console.log(`3. Add to navigation: docs/components/layout/sidebar.tsx`);
  console.log(`   { name: "${name}", href: "/docs/components/${slug}" }\n`);
  
  console.log(`4. Test everything:`);
  console.log(`   npm run test:validate ${name}`);
  console.log(`   npm run test:prompts ${name}\n`);
  
  console.log(`5. View in browser:`);
  console.log(`   cd docs && npm run dev`);
  console.log(`   http://localhost:3000/docs/components/${slug}\n`);
  
  console.log(`6. Deploy to MCP:`);
  console.log(`   npm run build\n`);
  
  console.log('📖 See COMPONENT_WORKFLOW.md for detailed instructions\n');
}

// CLI usage
const args = process.argv.slice(2);
if (args.length < 2) {
  console.log('Usage: tsx scripts/add-manual-component.ts <name> <description> [category]');
  console.log('Example: tsx scripts/add-manual-component.ts "Badge" "A badge component" "ui"');
  process.exit(1);
}

addManualComponent({
  name: args[0],
  description: args[1],
  category: args[2] || 'ui'
});


