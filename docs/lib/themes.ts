/**
 * Theme System - Comprehensive theme definitions
 * 
 * Each theme includes:
 * - Colors (brand, semantic, UI)
 * - Typography (fonts, sizes, weights)
 * - Spacing (component-specific sizing)
 * - Effects (shadows, transitions)
 */

export interface Theme {
  name: string;
  value: string;
  colors: {
    // Brand Colors
    primary: string;
    primaryHover: string;
    primaryActive: string;
    primaryForeground: string;
    
    secondary: string;
    secondaryHover: string;
    secondaryActive: string;
    secondaryForeground: string;
    
    // Semantic Colors
    success: string;
    successHover: string;
    successForeground: string;
    
    warning: string;
    warningHover: string;
    warningForeground: string;
    
    error: string;
    errorHover: string;
    errorForeground: string;
    
    info: string;
    infoHover: string;
    infoForeground: string;
    
    // UI Colors
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    border: string;
    borderStrong: string;
    ring: string;
  };
  
  typography?: {
    fontFamily?: string;
    fontSize?: {
      xs?: string;
      sm?: string;
      base?: string;
      lg?: string;
      xl?: string;
    };
    fontWeight?: {
      normal?: string;
      medium?: string;
      semibold?: string;
      bold?: string;
    };
  };
  
  spacing?: {
    buttonHeight?: {
      sm?: string;
      base?: string;
      lg?: string;
    };
    iconSize?: {
      xs?: string;
      sm?: string;
      base?: string;
      lg?: string;
      xl?: string;
    };
    radius?: string;
  };
  
  effects?: {
    duration?: {
      fast?: string;
      base?: string;
      slow?: string;
    };
  };
}

/**
 * Default Theme (Teal/Original)
 */
export const defaultTheme: Theme = {
  name: "Default (Teal)",
  value: "default",
  colors: {
    primary: "173 80% 40%",
    primaryHover: "173 80% 35%",
    primaryActive: "173 80% 30%",
    primaryForeground: "210 40% 98%",
    
    secondary: "220 14% 96%",
    secondaryHover: "220 13% 91%",
    secondaryActive: "216 12% 84%",
    secondaryForeground: "222 47% 11%",
    
    success: "142 76% 36%",
    successHover: "142 72% 29%",
    successForeground: "210 40% 98%",
    
    warning: "38 92% 50%",
    warningHover: "32 95% 44%",
    warningForeground: "222 84% 5%",
    
    error: "0 84% 60%",
    errorHover: "0 72% 51%",
    errorForeground: "210 40% 98%",
    
    info: "217 91% 60%",
    infoHover: "217 91% 54%",
    infoForeground: "210 40% 98%",
    
    background: "0 0% 100%",
    foreground: "222 84% 5%",
    muted: "210 40% 96%",
    mutedForeground: "215 16% 47%",
    accent: "210 40% 96%",
    accentForeground: "222 47% 11%",
    border: "214 32% 91%",
    borderStrong: "213 27% 84%",
    ring: "173 80% 40%",
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
  },
  spacing: {
    buttonHeight: {
      sm: "2rem",
      base: "2.5rem",
      lg: "3rem",
    },
    iconSize: {
      xs: "0.875rem",
      sm: "1rem",
      base: "1.25rem",
      lg: "1.5rem",
      xl: "2rem",
    },
    radius: "0.5rem",
  },
  effects: {
    duration: {
      fast: "150ms",
      base: "200ms",
      slow: "300ms",
    },
  },
};

/**
 * Purple Theme
 */
export const purpleTheme: Theme = {
  name: "Purple",
  value: "purple",
  colors: {
    primary: "271 91% 65%",
    primaryHover: "271 91% 60%",
    primaryActive: "271 91% 55%",
    primaryForeground: "210 40% 98%",
    
    secondary: "220 14% 96%",
    secondaryHover: "220 13% 91%",
    secondaryActive: "216 12% 84%",
    secondaryForeground: "222 47% 11%",
    
    success: "142 76% 36%",
    successHover: "142 72% 29%",
    successForeground: "210 40% 98%",
    
    warning: "38 92% 50%",
    warningHover: "32 95% 44%",
    warningForeground: "222 84% 5%",
    
    error: "0 84% 60%",
    errorHover: "0 72% 51%",
    errorForeground: "210 40% 98%",
    
    info: "217 91% 60%",
    infoHover: "217 91% 54%",
    infoForeground: "210 40% 98%",
    
    background: "0 0% 100%",
    foreground: "222 84% 5%",
    muted: "210 40% 96%",
    mutedForeground: "215 16% 47%",
    accent: "210 40% 96%",
    accentForeground: "222 47% 11%",
    border: "214 32% 91%",
    borderStrong: "213 27% 84%",
    ring: "271 91% 65%",
  },
  // Inherits default typography and spacing
};

/**
 * Blue Theme
 */
export const blueTheme: Theme = {
  name: "Blue",
  value: "blue",
  colors: {
    primary: "217 91% 60%",
    primaryHover: "217 91% 54%",
    primaryActive: "217 91% 48%",
    primaryForeground: "210 40% 98%",
    
    secondary: "220 14% 96%",
    secondaryHover: "220 13% 91%",
    secondaryActive: "216 12% 84%",
    secondaryForeground: "222 47% 11%",
    
    success: "142 76% 36%",
    successHover: "142 72% 29%",
    successForeground: "210 40% 98%",
    
    warning: "38 92% 50%",
    warningHover: "32 95% 44%",
    warningForeground: "222 84% 5%",
    
    error: "0 84% 60%",
    errorHover: "0 72% 51%",
    errorForeground: "210 40% 98%",
    
    info: "217 91% 60%",
    infoHover: "217 91% 54%",
    infoForeground: "210 40% 98%",
    
    background: "0 0% 100%",
    foreground: "222 84% 5%",
    muted: "210 40% 96%",
    mutedForeground: "215 16% 47%",
    accent: "210 40% 96%",
    accentForeground: "222 47% 11%",
    border: "214 32% 91%",
    borderStrong: "213 27% 84%",
    ring: "217 91% 60%",
  },
};

/**
 * Rose Theme
 */
export const roseTheme: Theme = {
  name: "Rose",
  value: "rose",
  colors: {
    primary: "330 81% 60%",
    primaryHover: "330 81% 55%",
    primaryActive: "330 81% 50%",
    primaryForeground: "210 40% 98%",
    
    secondary: "220 14% 96%",
    secondaryHover: "220 13% 91%",
    secondaryActive: "216 12% 84%",
    secondaryForeground: "222 47% 11%",
    
    success: "142 76% 36%",
    successHover: "142 72% 29%",
    successForeground: "210 40% 98%",
    
    warning: "38 92% 50%",
    warningHover: "32 95% 44%",
    warningForeground: "222 84% 5%",
    
    error: "0 84% 60%",
    errorHover: "0 72% 51%",
    errorForeground: "210 40% 98%",
    
    info: "217 91% 60%",
    infoHover: "217 91% 54%",
    infoForeground: "210 40% 98%",
    
    background: "0 0% 100%",
    foreground: "222 84% 5%",
    muted: "210 40% 96%",
    mutedForeground: "215 16% 47%",
    accent: "210 40% 96%",
    accentForeground: "222 47% 11%",
    border: "214 32% 91%",
    borderStrong: "213 27% 84%",
    ring: "330 81% 60%",
  },
};

/**
 * Emerald Theme
 */
export const emeraldTheme: Theme = {
  name: "Emerald",
  value: "emerald",
  colors: {
    primary: "158 64% 52%",
    primaryHover: "158 64% 47%",
    primaryActive: "158 64% 42%",
    primaryForeground: "210 40% 98%",
    
    secondary: "220 14% 96%",
    secondaryHover: "220 13% 91%",
    secondaryActive: "216 12% 84%",
    secondaryForeground: "222 47% 11%",
    
    success: "142 76% 36%",
    successHover: "142 72% 29%",
    successForeground: "210 40% 98%",
    
    warning: "38 92% 50%",
    warningHover: "32 95% 44%",
    warningForeground: "222 84% 5%",
    
    error: "0 84% 60%",
    errorHover: "0 72% 51%",
    errorForeground: "210 40% 98%",
    
    info: "217 91% 60%",
    infoHover: "217 91% 54%",
    infoForeground: "210 40% 98%",
    
    background: "0 0% 100%",
    foreground: "222 84% 5%",
    muted: "210 40% 96%",
    mutedForeground: "215 16% 47%",
    accent: "210 40% 96%",
    accentForeground: "222 47% 11%",
    border: "214 32% 91%",
    borderStrong: "213 27% 84%",
    ring: "158 64% 52%",
  },
};

/**
 * All available themes
 */
export const themes: Theme[] = [
  defaultTheme,
  purpleTheme,
  blueTheme,
  roseTheme,
  emeraldTheme,
];

/**
 * Apply theme to document root
 */
export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  
  // Apply colors
  Object.entries(theme.colors).forEach(([key, value]) => {
    const cssVar = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    root.style.setProperty(`--${cssVar}`, value);
  });
  
  // Apply typography
  if (theme.typography) {
    if (theme.typography.fontFamily) {
      root.style.setProperty('--font-family', theme.typography.fontFamily);
    }
    
    if (theme.typography.fontSize) {
      Object.entries(theme.typography.fontSize).forEach(([key, value]) => {
        root.style.setProperty(`--font-size-${key}`, value);
      });
    }
    
    if (theme.typography.fontWeight) {
      Object.entries(theme.typography.fontWeight).forEach(([key, value]) => {
        root.style.setProperty(`--font-weight-${key}`, value);
      });
    }
  }
  
  // Apply spacing
  if (theme.spacing) {
    if (theme.spacing.buttonHeight) {
      Object.entries(theme.spacing.buttonHeight).forEach(([key, value]) => {
        root.style.setProperty(`--button-height-${key}`, value);
      });
    }
    
    if (theme.spacing.iconSize) {
      Object.entries(theme.spacing.iconSize).forEach(([key, value]) => {
        root.style.setProperty(`--icon-${key}`, value);
      });
    }
    
    if (theme.spacing.radius) {
      root.style.setProperty('--radius', theme.spacing.radius);
    }
  }
  
  // Apply effects
  if (theme.effects?.duration) {
    Object.entries(theme.effects.duration).forEach(([key, value]) => {
      root.style.setProperty(`--duration-${key}`, value);
    });
  }
}

/**
 * Get theme by value
 */
export function getTheme(value: string): Theme | undefined {
  return themes.find(theme => theme.value === value);
}

/**
 * Reset to default theme
 */
export function resetTheme() {
  applyTheme(defaultTheme);
}

