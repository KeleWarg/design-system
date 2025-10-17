/**
 * Design Tokens - Single Source of Truth for Design System
 * 
 * Update these values to make global changes across all components.
 * Export to Figma via Tokens Studio or manually sync with design files.
 */

export const designTokens = {
  // Color Tokens
  colors: {
    // Brand Colors
    brand: {
      primary: '173 80% 40%',      // Teal-600
      primaryHover: '173 80% 35%',  // Teal-700
      primaryActive: '173 80% 30%', // Teal-800
      secondary: '220 14% 96%',     // Gray-100
      secondaryHover: '220 13% 91%', // Gray-200
      secondaryActive: '216 12% 84%', // Gray-300
    },
    
    // Semantic Colors
    semantic: {
      success: '142 76% 36%',       // Green-600
      successHover: '142 72% 29%',  // Green-700
      warning: '38 92% 50%',        // Orange-500
      warningHover: '32 95% 44%',   // Orange-600
      error: '0 84% 60%',           // Red-500
      errorHover: '0 72% 51%',      // Red-600
      info: '217 91% 60%',          // Blue-500
      infoHover: '217 91% 54%',     // Blue-600
    },
    
    // Neutral Colors
    neutral: {
      50: '210 40% 98%',
      100: '210 40% 96%',
      200: '214 32% 91%',
      300: '213 27% 84%',
      400: '215 20% 65%',
      500: '215 16% 47%',
      600: '215 19% 35%',
      700: '215 25% 27%',
      800: '217 33% 17%',
      900: '222 47% 11%',
      950: '222 84% 5%',
    },
    
    // State Colors
    state: {
      hover: '0 0% 0% / 0.05',
      active: '0 0% 0% / 0.1',
      focus: '173 80% 40%',
      disabled: '0 0% 0% / 0.38',
      disabledBg: '0 0% 0% / 0.12',
    },
    
    // Background Colors
    background: {
      primary: '0 0% 100%',
      secondary: '210 40% 98%',
      tertiary: '210 40% 96%',
      inverse: '222 47% 11%',
    },
    
    // Text Colors
    text: {
      primary: '222 84% 5%',
      secondary: '215 16% 47%',
      tertiary: '215 20% 65%',
      inverse: '210 40% 98%',
      disabled: '215 20% 65%',
      link: '217 91% 60%',
      linkHover: '217 91% 54%',
    },
    
    // Border Colors
    border: {
      default: '214 32% 91%',
      strong: '213 27% 84%',
      subtle: '210 40% 96%',
      inverse: '222 47% 11%',
    },
  },
  
  // Typography Tokens
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      mono: ['JetBrains Mono', 'Monaco', 'Courier New', 'monospace'],
    },
    
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px
      sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
      base: ['1rem', { lineHeight: '1.5rem' }],     // 16px
      lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
      xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
      '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px
    },
    
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    
    letterSpacing: {
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
    },
  },
  
  // Spacing Tokens
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
  },
  
  // Border Radius Tokens
  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    base: '0.375rem', // 6px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },
  
  // Shadow Tokens
  boxShadow: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  
  // Icon Tokens
  icon: {
    size: {
      xs: '0.875rem',  // 14px
      sm: '1rem',      // 16px
      base: '1.25rem', // 20px
      lg: '1.5rem',    // 24px
      xl: '2rem',      // 32px
      '2xl': '2.5rem', // 40px
    },
    
    strokeWidth: {
      thin: '1',
      normal: '1.5',
      thick: '2',
    },
  },
  
  // Component-specific Tokens
  components: {
    button: {
      height: {
        sm: '2rem',    // 32px
        base: '2.5rem', // 40px
        lg: '3rem',    // 48px
      },
      
      padding: {
        sm: '0.75rem',  // 12px
        base: '1rem',   // 16px
        lg: '1.5rem',   // 24px
      },
    },
    
    badge: {
      height: '1.25rem', // 20px
      padding: '0.25rem 0.5rem', // 4px 8px
      fontSize: '0.75rem', // 12px
    },
    
    card: {
      padding: '1.5rem', // 24px
      borderRadius: '0.5rem', // 8px
    },
  },
  
  // Animation Tokens
  animation: {
    duration: {
      fast: '150ms',
      base: '200ms',
      slow: '300ms',
    },
    
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },
}

/**
 * Helper function to convert design tokens to CSS variables
 */
export function generateCSSVariables(tokens: typeof designTokens) {
  const cssVars: Record<string, string> = {}
  
  // Colors
  Object.entries(tokens.colors.brand).forEach(([key, value]) => {
    cssVars[`--color-brand-${key}`] = value
  })
  
  Object.entries(tokens.colors.semantic).forEach(([key, value]) => {
    cssVars[`--color-semantic-${key}`] = value
  })
  
  Object.entries(tokens.colors.neutral).forEach(([key, value]) => {
    cssVars[`--color-neutral-${key}`] = value
  })
  
  return cssVars
}

/**
 * Type-safe token access
 */
export type DesignTokens = typeof designTokens
export type ColorToken = keyof typeof designTokens.colors
export type SpacingToken = keyof typeof designTokens.spacing
export type BorderRadiusToken = keyof typeof designTokens.borderRadius

