export interface ComponentDoc {
  name: string;
  description: string;
  category?: 'ui' | 'form' | 'layout' | 'feedback' | 'navigation' | 'data';
  
  installation?: {
    dependencies: string[];
    setupSteps: string[];
  };
  
  code: {
    component: string;
    types?: string;
  };
  
  api?: {
    props: Array<{
      name: string;
      type: string;
      required: boolean;
      description: string;
      default?: any;
    }>;
    variants?: Record<string, string[]>;
  };
  
  prompts?: {
    basic?: string[];
    advanced?: string[];
    useCases?: Array<{
      scenario: string;
      prompt: string;
      output: string;
    }>;
  };
  
  examples?: Array<{
    name: string;
    code: string;
  }>;
  
  usage?: {
    import: string;
    basic: string;
    examples: Array<{
      name: string;
      description: string;
      code: string;
    }>;
  };
  
  metadata?: {
    version: string;
    lastUpdated: string;
    status: 'stable' | 'beta' | 'deprecated';
    accessibility: string[];
    relatedComponents: string[];
    tags: string[];
  };
}
