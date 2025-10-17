#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs/promises';
import path from 'path';
import type { ComponentDoc } from '../registry/schema.js';

class ComponentMCPServer {
  private server: Server;
  private components: Map<string, ComponentDoc> = new Map();

  constructor() {
    this.server = new Server(
      {
        name: 'figma-components-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.setupToolHandlers();
  }

  private setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'search_components',
            description: 'Search for components by name or tag',
            inputSchema: {
              type: 'object',
              properties: {
                query: {
                  type: 'string',
                  description: 'Search query for component name or tag',
                },
              },
              required: ['query'],
            },
          },
          {
            name: 'get_component',
            description: 'Get full component documentation and code',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Name of the component to retrieve',
                },
              },
              required: ['name'],
            },
          },
          {
            name: 'list_components',
            description: 'List all available components',
            inputSchema: {
              type: 'object',
              properties: {
                category: {
                  type: 'string',
                  description: 'Optional category filter (ui, form, layout, feedback, navigation, data)',
                },
              },
            },
          },
          {
            name: 'get_component_code',
            description: 'Get just the component code without documentation',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Name of the component to get code for',
                },
              },
              required: ['name'],
            },
          },
        ],
      };
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'search_components':
            return await this.searchComponents(args?.query as string);
          case 'get_component':
            return await this.getComponent(args?.name as string);
          case 'list_components':
            return await this.listComponents(args?.category as string);
          case 'get_component_code':
            return await this.getComponentCode(args?.name as string);
          default:
            throw new Error(`Unknown tool: ${name}`);
        }
      } catch (error) {
        return {
          content: [
            {
              type: 'text',
              text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
            },
          ],
        };
      }
    });
  }

  private async loadComponents() {
    if (this.components.size > 0) return;

    try {
      // Load from docs site content directory
      const componentsDir = path.join(process.cwd(), 'docs', 'content', 'components');
      const files = await fs.readdir(componentsDir);
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(componentsDir, file);
          const content = await fs.readFile(filePath, 'utf-8');
          const component: ComponentDoc = JSON.parse(content);
          this.components.set(component.name, component);
        }
      }
    } catch (error) {
      console.error('Failed to load components:', error);
    }
  }

  private async searchComponents(query: string) {
    await this.loadComponents();
    
    const results = Array.from(this.components.values()).filter(component => 
      component.name.toLowerCase().includes(query.toLowerCase()) ||
      component.description.toLowerCase().includes(query.toLowerCase()) ||
      (component.category && component.category.toLowerCase().includes(query.toLowerCase()))
    );

    return {
      content: [
        {
          type: 'text',
          text: `Found ${results.length} components matching "${query}":\n\n` +
            results.map(component => 
              `- **${component.name}**: ${component.description}${component.category ? `\n  Category: ${component.category}` : ''}`
            ).join('\n\n'),
        },
      ],
    };
  }

  private async getComponent(name: string) {
    await this.loadComponents();
    
    const component = this.components.get(name);
    if (!component) {
      return {
        content: [
          {
            type: 'text',
            text: `Component "${name}" not found. Use list_components to see available components.`,
          },
        ],
      };
    }

    let output = `# ${component.name}\n\n` +
      `**Description:** ${component.description}\n\n`;
    
    if (component.category) {
      output += `**Category:** ${component.category}\n\n`;
    }
    
    if (component.installation) {
      output += `**Installation:**\n` +
        `Dependencies: ${component.installation.dependencies.join(', ')}\n` +
        `Steps:\n${component.installation.setupSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}\n\n`;
    }
    
    if (component.api && component.api.props) {
      output += `**API:**\n` +
        `Props:\n${component.api.props.map(prop => 
          `- \`${prop.name}\` (${prop.type})${prop.required ? ' - required' : ' - optional'}${prop.default ? ` [default: ${prop.default}]` : ''}: ${prop.description}`
        ).join('\n')}\n\n`;
    }
    
    if (component.examples && component.examples.length > 0) {
      output += `**Examples:**\n` +
        component.examples.map(example => 
          `### ${example.name}\n\`\`\`tsx\n${example.code}\n\`\`\``
        ).join('\n\n') + '\n\n';
    }
    
    output += `**Component Code:**\n\`\`\`tsx\n${component.code.component}\n\`\`\``;

    return {
      content: [
        {
          type: 'text',
          text: output,
        },
      ],
    };
  }

  private async listComponents(category?: string) {
    await this.loadComponents();
    
    let components = Array.from(this.components.values());
    
    if (category) {
      components = components.filter(component => component.category === category);
    }

    const grouped = components.reduce((acc, component) => {
      const cat = component.category || 'uncategorized';
      if (!acc[cat]) {
        acc[cat] = [];
      }
      acc[cat].push(component);
      return acc;
    }, {} as Record<string, ComponentDoc[]>);

    const output = Object.entries(grouped).map(([cat, comps]) => 
      `## ${cat.toUpperCase()}\n` +
      comps.map(component => 
        `- **${component.name}**: ${component.description}`
      ).join('\n')
    ).join('\n\n');

    return {
      content: [
        {
          type: 'text',
          text: `Available Components (${components.length} total):\n\n${output}`,
        },
      ],
    };
  }

  private async getComponentCode(name: string) {
    await this.loadComponents();
    
    const component = this.components.get(name);
    if (!component) {
      return {
        content: [
          {
            type: 'text',
            text: `Component "${name}" not found.`,
          },
        ],
      };
    }

    return {
      content: [
        {
          type: 'text',
          text: `# ${component.name} Component Code\n\n\`\`\`tsx\n${component.code.component}\n\`\`\``,
        },
      ],
    };
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Figma Components MCP server running on stdio');
  }
}

const server = new ComponentMCPServer();
server.run().catch(console.error);
