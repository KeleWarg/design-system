import { exec } from 'child_process';
import { promisify } from 'util';
import { runFullPipeline } from './full-pipeline.js';

const execAsync = promisify(exec);

async function syncFromFigma() {
  console.log('🔄 Syncing from Figma...\n');
  
  try {
    // Run the full pipeline
    await runFullPipeline();
    
    // Git operations (optional)
    const hasChanges = await checkForChanges();
    
    if (hasChanges) {
      console.log('\n📝 Changes detected, committing...');
      
      const commitMessage = process.env.GIT_COMMIT_MESSAGE_PREFIX || 'Update components from Figma [automated]';
      
      await execAsync('git add components/ registry/ tailwind.config.js');
      await execAsync(`git commit -m "${commitMessage}"`);
      console.log('✅ Changes committed');
    } else {
      console.log('\n✅ No changes detected');
    }
    
  } catch (error) {
    console.error('❌ Sync failed:', error);
    process.exit(1);
  }
}

async function checkForChanges(): Promise<boolean> {
  try {
    const { stdout } = await execAsync('git status --porcelain components/ registry/ tailwind.config.js');
    return stdout.trim().length > 0;
  } catch {
    return false;
  }
}

// Run sync
syncFromFigma().catch(console.error);

