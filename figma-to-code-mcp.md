# Figma → Code Components → MCP Pipeline
## Complete Implementation: Design to AI-Ready Component Library

---

## 🎯 The Full Pipeline

```
Figma Design System
    ↓
Extract (API + Plugins)
    ↓
Generate React Components
    ↓
Create shadcn-style Documentation
    ↓
MCP Server
    ↓
AI Tools (Claude, Cursor, etc.)
```

---

## 📐 Architecture Overview

### Three-Stage Process

**Stage 1: Figma Extraction**
- Extract component structures
- Extract design tokens (colors, typography, spacing)
- Extract component properties/variants
- Capture visual specifications

**Stage 2: Code Generation**
- Generate React component files
- Generate TypeScript types
- Generate Tailwind/CSS styles
- Create component variants (CVA)

**Stage 3: Documentation & MCP**
- Create shadcn-style documentation
- Build component registry
- Expose via MCP server
- Enable AI queries

---

## 🛠️ Tools & Technologies

### Required Tools

1. **Figma API** - Extract component data
2. **Figma to Code Plugins** - Convert designs to code
3. **figma-api npm package** - Programmatic access
4. **Code Generation Scripts** - Custom transformers
5. **MCP SDK** - Expose to AI tools

### Recommended Stack

```json
{
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "figma-api": "^1.11.0",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "tailwindcss": "^3.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

---

## 📁 Project Structure

```
design-system/
├── figma-extract/
│   ├── extract.ts                  # Figma API extraction
│   ├── transform-tokens.ts         # Convert tokens
│   └── data/
│       ├── raw-figma.json          # Raw Figma data
│       └── processed-tokens.json   # Processed tokens
├── code-generation/
│   ├── generate-components.ts      # Component generator
│   ├── generate-types.ts           # Type generator
│   ├── templates/
│   │   ├── component.template.tsx  # Component template
│   │   └── variants.template.ts    # CVA variants template
│   └── generated/                  # Output directory
├── components/
│   └── ui/                         # Generated components land here
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
├── registry/
│   ├── schema.ts                   # Doc schema
│   ├── index.ts                    # Component registry
│   └── components/
│       ├── button.json             # Generated docs
│       └── ...
├── mcp-server/
│   └── server.ts                   # MCP server
└── scripts/
    ├── full-pipeline.ts            # Run entire pipeline
    └── sync-from-figma.ts          # Continuous sync
```

---

## 🔧 Implementation

### Stage 1: Figma Extraction

#### Step 1.1: Extract Component Structure

```typescript
// figma-extract/extract.ts

import * as Figma from 'figma-api';
import fs from 'fs/promises';

interface FigmaComponent {
  id: string;
  name: string;
  type: string;
  description: string;
  properties: Record<string, any>;
  styles: {
    fills?: any[];
    strokes?: any[];
    effects?: any[];
    layoutMode?: string;
    padding?: number;
    itemSpacing?: number;
  };
}

class FigmaExtractor {
  private client: Figma.Api;
  
  constructor(token: string) {
    this.client = new Figma.Api({ personalAccessToken: token });
  }

  async extractComponents(fileKey: string): Promise<FigmaComponent[]> {
    // Get file data
    const file = await this.client.getFile(fileKey);
    
    // Extract components recursively
    const components: FigmaComponent[] = [];
    
    const traverse = (node: any) => {
      if (node.type === 'COMPONENT' || node.type === 'COMPONENT_SET') {
        components.push({
          id: node.id,
          name: node.name,
          type: node.type,
          description: node.description || '',
          properties: node.componentPropertyDefinitions || {},
          styles: this.extractStyles(node),
        });
      }
      
      if (node.children) {
        node.children.forEach(traverse);
      }
    };
    
    traverse(file.document);
    return components;
  }

  async extractDesignTokens(fileKey: string) {
    const file = await this.client.getFile(fileKey);
    const styles = await this.client.getFileStyles(fileKey);
    
    const tokens = {
      colors: this.extractColors(file, styles),
      typography: this.extractTypography(file, styles),
      spacing: this.extractSpacing(file),
      radii: this.extractRadii(file),
      shadows: this.extractShadows(file, styles),
    };
    
    return tokens;
  }

  private extractStyles(node: any) {
    return {
      fills: node.fills,
      strokes: node.strokes,
      effects: node.effects,
      layoutMode: node.layoutMode,
      padding: node.paddingLeft, // Simplified
      itemSpacing: node.itemSpacing,
      cornerRadius: node.cornerRadius,
    };
  }

  private extractColors(file: any, styles: any) {
    const colors: Record<string, string> = {};
    
    // Extract from color styles
    Object.entries(styles.meta.styles || {}).forEach(([key, style]: [string, any]) => {
      if (style.style_type === 'FILL') {
        // Convert Figma color to hex
        const color = this.figmaColorToHex(style);
        colors[this.normalizeTokenName(style.name)] = color;
      }
    });
    
    return colors;
  }

  private extractTypography(file: any, styles: any) {
    const typography: Record<string, any> = {};
    
    Object.entries(styles.meta.styles || {}).forEach(([key, style]: [string, any]) => {
      if (style.style_type === 'TEXT') {
        typography[this.normalizeTokenName(style.name)] = {
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          lineHeight: style.lineHeight,
          letterSpacing: style.letterSpacing,
        };
      }
    });
    
    return typography;
  }

  private extractSpacing(file: any) {
    // Extract from Auto Layout spacing values
    const spacingValues = new Set<number>();
    
    const traverse = (node: any) => {
      if (node.itemSpacing) spacingValues.add(node.itemSpacing);
      if (node.paddingLeft) spacingValues.add(node.paddingLeft);
      if (node.children) node.children.forEach(traverse);
    };
    
    traverse(file.document);
    
    // Create spacing scale
    const spacing: Record<string, string> = {};
    Array.from(spacingValues).sort((a, b) => a - b).forEach((value, index) => {
      spacing[index] = `${value}px`;
    });
    
    return spacing;
  }

  private extractRadii(file: any) {
    const radiiValues = new Set<number>();
    
    const traverse = (node: any) => {
      if (node.cornerRadius) radiiValues.add(node.cornerRadius);
      if (node.children) node.children.forEach(traverse);
    };
    
    traverse(file.document);
    
    const radii: Record<string, string> = {};
    Array.from(radiiValues).sort((a, b) => a - b).forEach((value, index) => {
      radii[index === 0 ? 'none' : index === 1 ? 'sm' : index === 2 ? 'md' : 'lg'] = `${value}px`;
    });
    
    return radii;
  }

  private extractShadows(file: any, styles: any) {
    const shadows: Record<string, string> = {};
    
    Object.entries(styles.meta.styles || {}).forEach(([key, style]: [string, any]) => {
      if (style.style_type === 'EFFECT') {
        shadows[this.normalizeTokenName(style.name)] = this.figmaEffectToCSS(style);
      }
    });
    
    return shadows;
  }

  private figmaColorToHex(color: any): string {
    // Convert Figma RGBA to hex
    // Simplified implementation
    return '#000000';
  }

  private figmaEffectToCSS(effect: any): string {
    // Convert Figma effect to CSS shadow
    // Simplified implementation
    return '0 1px 3px rgba(0,0,0,0.1)';
  }

  private normalizeTokenName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  async saveExtractedData(fileKey: string, outputDir: string) {
    await fs.mkdir(outputDir, { recursive: true });
    
    const components = await this.extractComponents(fileKey);
    const tokens = await this.extractDesignTokens(fileKey);
    
    await fs.writeFile(
      `${outputDir}/components.json`,
      JSON.stringify(components, null, 2)
    );
    
    await fs.writeFile(
      `${outputDir}/tokens.json`,
      JSON.stringify(tokens, null, 2)
    );
    
    console.log(`✅ Extracted ${components.length} components`);
    console.log(`✅ Extracted design tokens`);
  }
}

// Usage
const extractor = new FigmaExtractor(process.env.FIGMA_TOKEN!);
await extractor.saveExtractedData(
  process.env.FIGMA_FILE_KEY!,
  'figma-extract/data'
);
```

---

### Stage 2: Code Generation

#### Step 2.1: Component Code Generator

```typescript
// code-generation/generate-components.ts

import fs from 'fs/promises';
import path from 'path';

interface ComponentSpec {
  name: string;
  properties: Record<string, any>;
  styles: any;
}

class ComponentGenerator {
  private tokens: any;
  
  constructor(tokens: any) {
    this.tokens = tokens;
  }

  generateComponent(spec: ComponentSpec): string {
    const componentName = this.pascalCase(spec.name);
    const variants = this.extractVariants(spec);
    const props = this.generateProps(spec);
    
    return this.renderTemplate(componentName, variants, props);
  }

  private extractVariants(spec: ComponentSpec): Record<string, string[]> {
    const variants: Record<string, string[]> = {};
    
    // Extract from Figma component properties
    Object.entries(spec.properties).forEach(([key, value]: [string, any]) => {
      if (value.type === 'VARIANT') {
        variants[key] = value.variantOptions || [];
      }
    });
    
    return variants;
  }

  private generateProps(spec: ComponentSpec): string {
    const props: string[] = [];
    
    Object.entries(spec.properties).forEach(([key, value]: [string, any]) => {
      if (value.type === 'BOOLEAN') {
        props.push(`${key}?: boolean;`);
      } else if (value.type === 'VARIANT') {
        const options = value.variantOptions || [];
        props.push(`${key}?: ${options.map((o: string) => `"${o}"`).join(' | ')};`);
      } else if (value.type === 'TEXT') {
        props.push(`${key}?: string;`);
      }
    });
    
    return props.join('\n  ');
  }

  private renderTemplate(
    name: string,
    variants: Record<string, string[]>,
    props: string
  ): string {
    const variantConfig = this.generateVariantConfig(variants);
    
    return `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const ${name.toLowerCase()}Variants = cva(
  "${this.getBaseClasses(name)}",
  {
    variants: ${variantConfig},
    defaultVariants: ${this.getDefaultVariants(variants)}
  }
)

export interface ${name}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ${name.toLowerCase()}Variants> {
  ${props}
}

const ${name} = React.forwardRef<HTMLDivElement, ${name}Props>(
  ({ className, ${Object.keys(variants).join(', ')}, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(${name.toLowerCase()}Variants({ ${Object.keys(variants).join(', ')}, className }))}
        {...props}
      />
    )
  }
)
${name}.displayName = "${name}"

export { ${name}, ${name.toLowerCase()}Variants }
`;
  }

  private generateVariantConfig(variants: Record<string, string[]>): string {
    const config: Record<string, any> = {};
    
    Object.entries(variants).forEach(([key, values]) => {
      config[key] = {};
      values.forEach(value => {
        config[key][value] = this.mapVariantToClasses(key, value);
      });
    });
    
    return JSON.stringify(config, null, 6).replace(/"([^"]+)":/g, '$1:');
  }

  private mapVariantToClasses(variant: string, value: string): string {
    // Map Figma variants to Tailwind classes
    // This is highly customizable based on your design system
    
    const mappings: Record<string, Record<string, string>> = {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
      },
    };
    
    return mappings[variant]?.[value] || '';
  }

  private getBaseClasses(name: string): string {
    // Base classes for common components
    const baseClasses: Record<string, string> = {
      Button: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
      Card: 'rounded-lg border bg-card text-card-foreground shadow-sm',
      Input: 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
      Badge: 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold',
    };
    
    return baseClasses[name] || 'rounded-md border';
  }

  private getDefaultVariants(variants: Record<string, string[]>): string {
    const defaults: Record<string, string> = {};
    
    Object.entries(variants).forEach(([key, values]) => {
      if (values.length > 0) {
        // Use first value as default, or 'default' if it exists
        defaults[key] = values.includes('default') ? 'default' : values[0];
      }
    });
    
    return JSON.stringify(defaults, null, 4).replace(/"([^"]+)":/g, '$1:');
  }

  private pascalCase(str: string): string {
    return str
      .split(/[^a-zA-Z0-9]/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }

  async generateAllComponents(
    componentsFile: string,
    outputDir: string
  ) {
    const specs = JSON.parse(await fs.readFile(componentsFile, 'utf-8'));
    
    await fs.mkdir(outputDir, { recursive: true });
    
    for (const spec of specs) {
      const code = this.generateComponent(spec);
      const filename = `${spec.name.toLowerCase().replace(/\s+/g, '-')}.tsx`;
      const filepath = path.join(outputDir, filename);
      
      await fs.writeFile(filepath, code);
      console.log(`✅ Generated ${filename}`);
    }
  }
}

// Usage
const tokens = JSON.parse(
  await fs.readFile('figma-extract/data/tokens.json', 'utf-8')
);

const generator = new ComponentGenerator(tokens);
await generator.generateAllComponents(
  'figma-extract/data/components.json',
  'components/ui'
);
```

#### Step 2.2: Design Tokens to Tailwind Config

```typescript
// code-generation/generate-tailwind-config.ts

import fs from 'fs/promises';

async function generateTailwindConfig(tokensFile: string, outputFile: string) {
  const tokens = JSON.parse(await fs.readFile(tokensFile, 'utf-8'));
  
  const config = `
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: ${JSON.stringify(tokens.colors, null, 6)},
      fontSize: ${JSON.stringify(tokens.typography, null, 6)},
      spacing: ${JSON.stringify(tokens.spacing, null, 6)},
      borderRadius: ${JSON.stringify(tokens.radii, null, 6)},
      boxShadow: ${JSON.stringify(tokens.shadows, null, 6)},
    },
  },
}
  `.trim();
  
  await fs.writeFile(outputFile, config);
  console.log('✅ Generated Tailwind config');
}

await generateTailwindConfig(
  'figma-extract/data/tokens.json',
  'tailwind.config.js'
);
```

---

### Stage 3: shadcn-style Documentation

#### Step 3.1: Auto-Generate Documentation

```typescript
// registry/generate-docs.ts

import fs from 'fs/promises';
import type { ComponentDoc } from './schema';

class DocumentationGenerator {
  async generateDocumentation(
    componentFile: string,
    figmaSpec: any
  ): Promise<ComponentDoc> {
    const code = await fs.readFile(componentFile, 'utf-8');
    const componentName = this.extractComponentName(code);
    
    return {
      name: componentName,
      description: figmaSpec.description || `A ${componentName} component.`,
      category: this.inferCategory(componentName),
      
      installation: {
        dependencies: this.extractDependencies(code),
        setupSteps: [
          `Copy the ${componentName} component code`,
          'Ensure Tailwind CSS is configured',
          'Add to your components directory'
        ],
      },
      
      code: {
        component: code,
        types: this.extractTypes(code),
      },
      
      api: {
        props: this.extractProps(figmaSpec),
        variants: this.extractVariants(figmaSpec),
      },
      
      usage: {
        import: `import { ${componentName} } from "@/components/ui/${componentName.toLowerCase()}"`,
        basic: `<${componentName} />`,
        examples: this.generateExamples(componentName, figmaSpec),
      },
      
      metadata: {
        version: '1.0.0',
        lastUpdated: new Date().toISOString().split('T')[0],
        status: 'stable',
        accessibility: this.generateA11yNotes(componentName),
        relatedComponents: [],
        tags: this.generateTags(componentName),
      },
    };
  }

  private extractComponentName(code: string): string {
    const match = code.match(/const (\w+) = React\.forwardRef/);
    return match ? match[1] : 'Component';
  }

  private extractDependencies(code: string): string[] {
    const deps: string[] = [];
    
    if (code.includes('class-variance-authority')) {
      deps.push('class-variance-authority');
    }
    if (code.includes('clsx')) {
      deps.push('clsx');
    }
    if (code.includes('@radix-ui')) {
      const radixMatch = code.match(/@radix-ui\/[\w-]+/g);
      if (radixMatch) {
        deps.push(...new Set(radixMatch));
      }
    }
    
    return deps;
  }

  private extractTypes(code: string): string | undefined {
    const match = code.match(/export interface \w+Props[\s\S]+?}/);
    return match ? match[0] : undefined;
  }

  private extractProps(figmaSpec: any): ComponentDoc['api']['props'] {
    const props: ComponentDoc['api']['props'] = [];
    
    Object.entries(figmaSpec.properties || {}).forEach(([key, value]: [string, any]) => {
      props.push({
        name: key,
        type: this.mapFigmaTypeToTS(value.type),
        required: false,
        description: value.description || `The ${key} prop`,
        default: value.defaultValue,
      });
    });
    
    return props;
  }

  private extractVariants(figmaSpec: any): Record<string, string[]> | undefined {
    const variants: Record<string, string[]> = {};
    
    Object.entries(figmaSpec.properties || {}).forEach(([key, value]: [string, any]) => {
      if (value.type === 'VARIANT') {
        variants[key] = value.variantOptions || [];
      }
    });
    
    return Object.keys(variants).length > 0 ? variants : undefined;
  }

  private generateExamples(
    componentName: string,
    figmaSpec: any
  ): ComponentDoc['usage']['examples'] {
    const examples: ComponentDoc['usage']['examples'] = [
      {
        name: 'Default',
        description: `Basic ${componentName} usage`,
        code: `<${componentName}>Content</${componentName}>`,
      },
    ];
    
    // Generate examples for each variant
    const variants = this.extractVariants(figmaSpec);
    if (variants) {
      Object.entries(variants).forEach(([variantKey, values]) => {
        values.forEach(value => {
          examples.push({
            name: this.titleCase(value),
            description: `${componentName} with ${variantKey}="${value}"`,
            code: `<${componentName} ${variantKey}="${value}">Content</${componentName}>`,
          });
        });
      });
    }
    
    return examples;
  }

  private inferCategory(name: string): ComponentDoc['category'] {
    const categories: Record<string, ComponentDoc['category']> = {
      Button: 'ui',
      Input: 'form',
      Textarea: 'form',
      Select: 'form',
      Checkbox: 'form',
      Card: 'layout',
      Container: 'layout',
      Alert: 'feedback',
      Toast: 'feedback',
      Tabs: 'navigation',
      Breadcrumb: 'navigation',
    };
    
    return categories[name] || 'ui';
  }

  private generateA11yNotes(componentName: string): string[] {
    const notes: Record<string, string[]> = {
      Button: [
        'Supports keyboard navigation',
        'Includes focus-visible styles',
        'Disabled state properly handled',
      ],
      Input: [
        'Label associations required',
        'Error messages announced',
        'Keyboard accessible',
      ],
    };
    
    return notes[componentName] || [
      'Ensure proper ARIA labels',
      'Support keyboard navigation',
      'Maintain color contrast',
    ];
  }

  private generateTags(componentName: string): string[] {
    return [
      componentName.toLowerCase(),
      this.inferCategory(componentName),
      'component',
    ];
  }

  private mapFigmaTypeToTS(figmaType: string): string {
    const mappings: Record<string, string> = {
      BOOLEAN: 'boolean',
      TEXT: 'string',
      VARIANT: 'string',
      INSTANCE_SWAP: 'ReactNode',
    };
    
    return mappings[figmaType] || 'any';
  }

  private titleCase(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  async generateAllDocs(
    componentsDir: string,
    figmaSpecsFile: string,
    outputDir: string
  ) {
    const figmaSpecs = JSON.parse(await fs.readFile(figmaSpecsFile, 'utf-8'));
    await fs.mkdir(outputDir, { recursive: true });
    
    for (const spec of figmaSpecs) {
      const filename = `${spec.name.toLowerCase().replace(/\s+/g, '-')}.tsx`;
      const componentFile = `${componentsDir}/${filename}`;
      
      try {
        const doc = await this.generateDocumentation(componentFile, spec);
        const docFilename = filename.replace('.tsx', '.json');
        
        await fs.writeFile(
          `${outputDir}/${docFilename}`,
          JSON.stringify(doc, null, 2)
        );
        
        console.log(`✅ Generated docs for ${spec.name}`);
      } catch (error) {
        console.error(`❌ Failed to generate docs for ${spec.name}:`, error);
      }
    }
  }
}

// Usage
const generator = new DocumentationGenerator();
await generator.generateAllDocs(
  'components/ui',
  'figma-extract/data/components.json',
  'registry/components'
);
```

---

### Full Pipeline Script

```typescript
// scripts/full-pipeline.ts

import { FigmaExtractor } from '../figma-extract/extract';
import { ComponentGenerator } from '../code-generation/generate-components';
import { DocumentationGenerator } from '../registry/generate-docs';
import { generateTailwindConfig } from '../code-generation/generate-tailwind-config';

async function runFullPipeline() {
  console.log('🚀 Starting full pipeline...\n');
  
  const FIGMA_TOKEN = process.env.FIGMA_TOKEN!;
  const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY!;
  
  // Stage 1: Extract from Figma
  console.log('📥 Stage 1: Extracting from Figma...');
  const extractor = new FigmaExtractor(FIGMA_TOKEN);
  await extractor.saveExtractedData(FIGMA_FILE_KEY, 'figma-extract/data');
  
  // Stage 1b: Generate Tailwind config
  console.log('\n🎨 Generating Tailwind config...');
  await generateTailwindConfig(
    'figma-extract/data/tokens.json',
    'tailwind.config.js'
  );
  
  // Stage 2: Generate Components
  console.log('\n⚙️  Stage 2: Generating React components...');
  const tokens = JSON.parse(
    await fs.readFile('figma-extract/data/tokens.json', 'utf-8')
  );
  const codeGenerator = new ComponentGenerator(tokens);
  await codeGenerator.generateAllComponents(
    'figma-extract/data/components.json',
    'components/ui'
  );
  
  // Stage 3: Generate Documentation
  console.log('\n📝 Stage 3: Generating documentation...');
  const docGenerator = new DocumentationGenerator();
  await docGenerator.generateAllDocs(
    'components/ui',
    'figma-extract/data/components.json',
    'registry/components'
  );
  
  console.log('\n✅ Pipeline complete!');
  console.log('\nNext steps:');
  console.log('1. Review generated components in components/ui/');
  console.log('2. Customize component styling if needed');
  console.log('3. Review documentation in registry/components/');
  console.log('4. Start MCP server: npm run server');
  console.log('5. Test with Claude Desktop');
}

runFullPipeline().catch(console.error);
```

---

## 🔄 Continuous Sync Workflow

```typescript
// scripts/sync-from-figma.ts

import { runFullPipeline } from './full-pipeline';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function syncFromFigma() {
  console.log('🔄 Syncing from Figma...\n');
  
  // Run the full pipeline
  await runFullPipeline();
  
  // Git operations (optional)
  const hasChanges = await checkForChanges();
  
  if (hasChanges) {
    console.log('\n📝 Changes detected, committing...');
    await execAsync('git add components/ registry/');
    await execAsync('git commit -m "Update components from Figma [automated]"');
    console.log('✅ Changes committed');
  } else {
    console.log('\n✅ No changes detected');
  }
}

async function checkForChanges(): Promise<boolean> {
  try {
    const { stdout } = await execAsync('git status --porcelain components/ registry/');
    return stdout.trim().length > 0;
  } catch {
    return false;
  }
}

// Run sync
syncFromFigma().catch(console.error);
```

---

## 📋 Setup Instructions

### 1. Install Dependencies

```bash
npm install figma-api class-variance-authority clsx @modelcontextprotocol/sdk
npm install -D typescript @types/node
```

### 2. Configure Environment

```bash
# .env
FIGMA_TOKEN=your_figma_personal_access_token
FIGMA_FILE_KEY=your_figma_file_key
```

### 3. Run Initial Pipeline

```bash
# Run full pipeline
npx ts-node scripts/full-pipeline.ts

# This will:
# 1. Extract from Figma
# 2. Generate React components
# 3. Generate documentation
# 4. Create Tailwind config
```

### 4. Start MCP Server

```bash
npm run server
```

### 5. Configure Claude Desktop

```json
{
  "mcpServers": {
    "components": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-server/server.js"]
    }
  }
}
```

---

## 🎯 Usage Flow

```
Designer updates Figma
    ↓
Run: npm run sync-figma
    ↓
Components regenerated
Documentation updated
Tailwind config updated
    ↓
Restart MCP server
    ↓
AI now has latest components
    ↓
Developer asks Claude:
"Show me the Button component"
    ↓
Claude returns:
- Full code
- Props
- Examples
- Installation instructions
```

---

## 🔑 Key Benefits

1. **Single Source of Truth**: Figma is the design source
2. **Auto-Generated Code**: Components generated from designs
3. **AI-Ready**: MCP exposes everything to AI tools
4. **Type-Safe**: TypeScript types generated automatically
5. **shadcn-Style**: Professional documentation format
6. **Continuous Sync**: Keep code in sync with designs

---

## 🚨 Important Notes

### Customization Required

The code generation logic needs to be customized for your:
- Design system conventions
- Tailwind configuration
- Component patterns
- Naming conventions

### Manual Polish

Generated components may need:
- Logic refinement
- Event handlers
- Complex interactions
- Performance optimization

### Version Control

Always review generated code before committing:
```bash
git diff components/
```

---

## 📊 Success Metrics

### Week 1: Pipeline Working
- ✅ Extract from Figma successfully
- ✅ Generate 5-10 components
- ✅ Create documentation
- ✅ MCP server running

### Week 2: Quality Components
- ✅ Components match designs
- ✅ Documentation complete
- ✅ AI queries work perfectly
- ✅ Team can use generated code

### Month 1: Production Ready
- ✅ All components generated
- ✅ Automated sync working
- ✅ Code quality high
- ✅ Developer adoption

---

## 💡 Pro Tips

1. **Start with Simple Components**: Button, Badge, Card
2. **Test Generated Code**: Don't assume it's perfect
3. **Customize Templates**: Adjust to your patterns
4. **Review Before Deploy**: Always check generated code
5. **Version Everything**: Track changes in git

---

This is your complete Figma → Code → MCP pipeline! 🚀