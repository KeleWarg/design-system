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
        const cleanKey = this.cleanPropertyName(key);
        const cleanValues = (value.variantOptions || []).map((v: string) => this.cleanVariantValue(v));
        variants[cleanKey] = cleanValues;
      }
    });
    
    return variants;
  }

  private generateProps(spec: ComponentSpec): string {
    const props: string[] = [];
    
    Object.entries(spec.properties).forEach(([key, value]: [string, any]) => {
      // Clean up property names to be valid TypeScript identifiers
      const cleanKey = this.cleanPropertyName(key);
      
      if (value.type === 'BOOLEAN') {
        props.push(`${cleanKey}?: boolean;`);
      } else if (value.type === 'VARIANT') {
        const options = value.variantOptions || [];
        const cleanOptions = options.map((o: string) => this.cleanVariantValue(o));
        props.push(`${cleanKey}?: ${cleanOptions.map((o: string) => `"${o}"`).join(' | ')};`);
      } else if (value.type === 'TEXT') {
        props.push(`${cleanKey}?: string;`);
      }
    });
    
    return props.join('\n  ');
  }

  private cleanPropertyName(name: string): string {
    // Remove special characters and make valid TypeScript identifier
    return name
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/^[0-9]/, '_$&')
      .replace(/^$/, 'prop');
  }

  private cleanVariantName(name: string): string {
    // Clean variant names to be valid object keys
    return name
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/^[0-9]/, '_$&')
      .replace(/^$/, 'variant');
  }

  private cleanVariantValue(value: string): string {
    // Clean variant values to be valid object keys
    return value
      .replace(/[^a-zA-Z0-9]/g, '')
      .replace(/^[0-9]/, '_$&')
      .replace(/^$/, 'value');
  }

  private renderTemplate(
    name: string,
    variants: Record<string, string[]>,
    props: string
  ): string {
    const variantConfig = this.generateVariantConfig(variants);
    
    const variantKeys = Object.keys(variants);
    const hasVariants = variantKeys.length > 0;
    
    return `import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

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
  ({ className${hasVariants ? ', ' + variantKeys.join(', ') : ''}, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(${name.toLowerCase()}Variants({ ${hasVariants ? variantKeys.join(', ') + ', ' : ''}className }))}
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
        const cleanValue = this.cleanVariantValue(value);
        config[key][cleanValue] = this.mapVariantToClasses(key, value);
      });
    });
    
    return JSON.stringify(config, null, 6).replace(/"([^"]+)":/g, '$1:');
  }

  private mapVariantToClasses(variant: string, value: string): string {
    // Map Figma variants to Tailwind classes
    // This is highly customizable based on your design system
    
    const mappings: Record<string, Record<string, string>> = {
      Type: {
        Primary: 'bg-blue-600 text-white hover:bg-blue-700',
        Secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        Ghost: 'bg-transparent text-gray-900 hover:bg-gray-100',
        White: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
      },
      Size: {
        Base: 'px-4 py-2 text-sm',
        Large: 'px-6 py-3 text-base',
        Small: 'px-3 py-1 text-xs'
      },
      State: {
        Enabled: 'opacity-100',
        Hover: 'hover:opacity-90',
        Focused: 'focus:ring-2 focus:ring-blue-500',
        Pressed: 'active:scale-95',
        Disabled: 'opacity-50 cursor-not-allowed'
      },
      Icon: {
        None: '',
        Left: 'flex-row',
        Right: 'flex-row-reverse'
      },
      Property1: {
        DesktopCollapsed: 'w-64',
        DesktopExpanded: 'w-96',
        MobileCollapsed: 'w-full',
        MobileExpanded: 'w-full',
        Variant3: 'w-80',
        Variant5: 'w-72',
        Variant6: 'w-56'
      }
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
      Alert: 'relative w-full rounded-lg border p-4',
      Avatar: 'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      Checkbox: 'peer h-4 w-4 shrink-0 rounded-sm border border-primary',
      Radio: 'h-4 w-4 border border-primary text-primary',
      Switch: 'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
      Textarea: 'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
    };
    
    return baseClasses[name] || 'rounded-md border';
  }

  private getDefaultVariants(variants: Record<string, string[]>): string {
    const defaults: Record<string, string> = {};
    
    Object.entries(variants).forEach(([key, values]) => {
      if (values.length > 0) {
        // Use first value as default, cleaned to match the variant config
        const firstValue = values[0];
        const cleanValue = this.cleanVariantValue(firstValue);
        defaults[key] = cleanValue;
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

export { ComponentGenerator };
