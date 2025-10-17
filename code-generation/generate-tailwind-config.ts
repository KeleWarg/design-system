import fs from 'fs/promises';

async function generateTailwindConfig(tokensFile: string, outputFile: string) {
  const tokens = JSON.parse(await fs.readFile(tokensFile, 'utf-8'));
  
  const config = `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: ${JSON.stringify(tokens.colors, null, 6)},
      fontSize: ${JSON.stringify(tokens.typography, null, 6)},
      spacing: ${JSON.stringify(tokens.spacing, null, 6)},
      borderRadius: ${JSON.stringify(tokens.radii, null, 6)},
      boxShadow: ${JSON.stringify(tokens.shadows, null, 6)},
    },
  },
  plugins: [],
}
  `.trim();
  
  await fs.writeFile(outputFile, config);
  console.log('✅ Generated Tailwind config');
}

export { generateTailwindConfig };

