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

// Core components to extract (5-10 components)
const CORE_COMPONENTS = [
  'Button',
  'Input', 
  'Card',
  'Badge',
  'Alert',
  'Avatar',
  'Checkbox',
  'Radio',
  'Switch',
  'Textarea'
];

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
        // Filter for core components only
        const isCoreComponent = CORE_COMPONENTS.some(coreName => 
          node.name.toLowerCase().includes(coreName.toLowerCase())
        );
        
        if (isCoreComponent) {
          components.push({
            id: node.id,
            name: node.name,
            type: node.type,
            description: node.description || '',
            properties: node.componentPropertyDefinitions || {},
            styles: this.extractStyles(node),
          });
        }
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
    if (styles.meta && styles.meta.styles) {
      Object.entries(styles.meta.styles).forEach(([key, style]: [string, any]) => {
        if (style.style_type === 'FILL') {
          // Convert Figma color to hex
          const color = this.figmaColorToHex(style);
          if (color && color !== '#000000') {
            colors[this.normalizeTokenName(style.name)] = color;
          }
        }
      });
    }

    // Extract colors from fills in the document
    const traverse = (node: any) => {
      if (node.fills && Array.isArray(node.fills)) {
        node.fills.forEach((fill: any) => {
          if (fill.type === 'SOLID' && fill.visible !== false && fill.color) {
            const color = this.figmaColorToHex({ color: fill.color });
            const name = node.name ? this.normalizeTokenName(node.name) : null;
            if (color && name && !colors[name]) {
              colors[name] = color;
            }
          }
        });
      }
      if (node.children) {
        node.children.forEach(traverse);
      }
    };

    traverse(file.document);

    return colors;
  }

  private extractTypography(file: any, styles: any) {
    const typography: Record<string, any> = {};

    if (styles.meta && styles.meta.styles) {
      Object.entries(styles.meta.styles).forEach(([key, style]: [string, any]) => {
        if (style.style_type === 'TEXT') {
          const typographyStyle: any = {};
          if (style.fontFamily) typographyStyle.fontFamily = style.fontFamily;
          if (style.fontSize) typographyStyle.fontSize = `${style.fontSize}px`;
          if (style.fontWeight) typographyStyle.fontWeight = style.fontWeight;
          if (style.lineHeight) {
            typographyStyle.lineHeight = typeof style.lineHeight === 'object'
              ? `${style.lineHeight.value}${style.lineHeight.unit || 'px'}`
              : style.lineHeight;
          }
          if (style.letterSpacing) {
            typographyStyle.letterSpacing = typeof style.letterSpacing === 'object'
              ? `${style.letterSpacing.value}${style.letterSpacing.unit || 'px'}`
              : style.letterSpacing;
          }

          // Only add if we have actual properties
          if (Object.keys(typographyStyle).length > 0) {
            typography[this.normalizeTokenName(style.name)] = typographyStyle;
          }
        }
      });
    }

    // Extract from text nodes in the document
    const traverse = (node: any) => {
      if (node.type === 'TEXT' && node.style) {
        const name = this.normalizeTokenName(node.name);
        if (!typography[name]) {
          const typographyStyle: any = {};
          if (node.style.fontFamily) typographyStyle.fontFamily = node.style.fontFamily;
          if (node.style.fontSize) typographyStyle.fontSize = `${node.style.fontSize}px`;
          if (node.style.fontWeight) typographyStyle.fontWeight = node.style.fontWeight;
          if (node.style.lineHeightPx) typographyStyle.lineHeight = `${node.style.lineHeightPx}px`;
          if (node.style.letterSpacing) typographyStyle.letterSpacing = `${node.style.letterSpacing}px`;

          if (Object.keys(typographyStyle).length > 0) {
            typography[name] = typographyStyle;
          }
        }
      }
      if (node.children) {
        node.children.forEach(traverse);
      }
    };

    traverse(file.document);

    return typography;
  }

  private extractSpacing(file: any) {
    // Extract from Auto Layout spacing values
    const spacingValues = new Set<number>();

    const traverse = (node: any) => {
      // Only extract meaningful spacing values (>= 0 and reasonable)
      if (node.itemSpacing && node.itemSpacing >= 0 && node.itemSpacing < 1000) {
        spacingValues.add(Math.round(node.itemSpacing));
      }
      if (node.paddingLeft && node.paddingLeft >= 0 && node.paddingLeft < 1000) {
        spacingValues.add(Math.round(node.paddingLeft));
      }
      if (node.paddingRight && node.paddingRight >= 0 && node.paddingRight < 1000) {
        spacingValues.add(Math.round(node.paddingRight));
      }
      if (node.paddingTop && node.paddingTop >= 0 && node.paddingTop < 1000) {
        spacingValues.add(Math.round(node.paddingTop));
      }
      if (node.paddingBottom && node.paddingBottom >= 0 && node.paddingBottom < 1000) {
        spacingValues.add(Math.round(node.paddingBottom));
      }
      if (node.children) node.children.forEach(traverse);
    };

    traverse(file.document);

    // Create spacing scale - only add values that don't already exist in default Tailwind
    // Default Tailwind spacing: 0, 1 (0.25rem = 4px), 2 (0.5rem = 8px), 3 (0.75rem = 12px), etc.
    const spacing: Record<string, string> = {};
    const sortedValues = Array.from(spacingValues).sort((a, b) => a - b);

    sortedValues.forEach((value) => {
      // Create semantic names for common values
      if (value === 0) return; // Skip 0, covered by default
      if (value <= 96 && value % 4 === 0) return; // Skip standard Tailwind values (0-96px in 4px increments)

      // Use the px value as the key for non-standard spacings
      spacing[`${value}px`] = `${value}px`;
    });

    return spacing;
  }

  private extractRadii(file: any) {
    const radiiValues = new Set<number>();

    const traverse = (node: any) => {
      // Only extract reasonable border radius values (0-100px)
      if (node.cornerRadius && node.cornerRadius >= 0 && node.cornerRadius <= 100) {
        radiiValues.add(Math.round(node.cornerRadius));
      }
      if (node.children) node.children.forEach(traverse);
    };

    traverse(file.document);

    const radii: Record<string, string> = {};
    const sortedValues = Array.from(radiiValues).sort((a, b) => a - b);

    // Map to semantic names based on typical design system values
    sortedValues.forEach((value) => {
      if (value === 0) {
        radii['none'] = '0px';
      } else if (value <= 4) {
        radii['sm'] = `${value}px`;
      } else if (value <= 8) {
        radii['DEFAULT'] = `${value}px`;
      } else if (value <= 12) {
        radii['md'] = `${value}px`;
      } else if (value <= 16) {
        radii['lg'] = `${value}px`;
      } else if (value <= 24) {
        radii['xl'] = `${value}px`;
      } else if (value <= 32) {
        radii['2xl'] = `${value}px`;
      } else if (value <= 48) {
        radii['3xl'] = `${value}px`;
      } else {
        radii['full'] = `${value}px`;
      }
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
    // Simplified implementation - in production, you'd want proper color conversion
    if (color.color) {
      const { r, g, b, a } = color.color;
      const toHex = (n: number) => Math.round(n * 255).toString(16).padStart(2, '0');
      const alpha = a < 1 ? Math.round(a * 255).toString(16).padStart(2, '0') : '';
      return `#${toHex(r)}${toHex(g)}${toHex(b)}${alpha}`;
    }
    return '#000000';
  }

  private figmaEffectToCSS(effect: any): string {
    // Convert Figma effect to CSS shadow
    // Simplified implementation
    if (effect.effects && effect.effects.length > 0) {
      const shadow = effect.effects[0];
      if (shadow.type === 'DROP_SHADOW') {
        const { offset, radius, color } = shadow;
        return `${offset.x}px ${offset.y}px ${radius}px ${this.figmaColorToHex({ color })}`;
      }
    }
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

export { FigmaExtractor, type FigmaComponent };

