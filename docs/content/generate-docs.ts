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

  private extractProps(figmaSpec: any): Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
    default?: any;
  }> {
    const props: Array<{
      name: string;
      type: string;
      required: boolean;
      description: string;
      default?: any;
    }> = [];
    
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
  ): Array<{
    name: string;
    description: string;
    code: string;
  }> {
    const examples: Array<{
      name: string;
      description: string;
      code: string;
    }> = [
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

  private inferCategory(name: string): 'ui' | 'form' | 'layout' | 'feedback' | 'navigation' | 'data' | undefined {
    const categories: Record<string, 'ui' | 'form' | 'layout' | 'feedback' | 'navigation' | 'data'> = {
      Button: 'ui',
      Input: 'form',
      Textarea: 'form',
      Select: 'form',
      Checkbox: 'form',
      Radio: 'form',
      Switch: 'form',
      Card: 'layout',
      Container: 'layout',
      Alert: 'feedback',
      Toast: 'feedback',
      Tabs: 'navigation',
      Breadcrumb: 'navigation',
      Badge: 'ui',
      Avatar: 'ui',
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
      Checkbox: [
        'Proper ARIA labels required',
        'Keyboard accessible',
        'Screen reader support',
      ],
      Radio: [
        'Group association required',
        'Keyboard navigation support',
        'Screen reader announcements',
      ],
      Switch: [
        'ARIA checked state',
        'Keyboard toggle support',
        'Screen reader feedback',
      ],
    };
    
    return notes[componentName] || [
      'Ensure proper ARIA labels',
      'Support keyboard navigation',
      'Maintain color contrast',
    ];
  }

  private generateTags(componentName: string): string[] {
    const category = this.inferCategory(componentName);
    const tags = [componentName.toLowerCase()];
    if (category) {
      tags.push(category);
    }
    tags.push('component');
    return tags;
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

export { DocumentationGenerator };
