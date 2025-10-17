import 'dotenv/config';
import { FigmaExtractor } from '../figma-extract/extract.js';
import { ComponentGenerator } from '../code-generation/generate-components.js';
import { DocumentationGenerator } from '../registry/generate-docs.js';
import { generateTailwindConfig } from '../code-generation/generate-tailwind-config.js';
import fs from 'fs/promises';

async function runFullPipeline() {
  console.log('🚀 Starting full pipeline...\n');
  
  const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
  const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;
  
  if (!FIGMA_TOKEN || !FIGMA_FILE_KEY) {
    console.error('❌ Missing required environment variables:');
    console.error('   FIGMA_TOKEN - Your Figma personal access token');
    console.error('   FIGMA_FILE_KEY - Your Figma file key');
    console.error('\nPlease create a .env file with these variables.');
    process.exit(1);
  }
  
  try {
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
    
  } catch (error) {
    console.error('\n❌ Pipeline failed:', error);
    process.exit(1);
  }
}

export { runFullPipeline };

runFullPipeline().catch(console.error);
