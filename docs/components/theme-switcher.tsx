"use client"

import * as React from "react"
import { Palette } from "lucide-react"
import { themes, applyTheme as applyThemeToRoot, type Theme } from "@/lib/themes"

/**
 * Theme Switcher Component
 * Allows users to preview different themes with comprehensive token changes
 */

export function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = React.useState("default")
  const [isOpen, setIsOpen] = React.useState(false)

  const handleThemeChange = (theme: Theme) => {
    // Apply all theme tokens (colors, typography, spacing, effects)
    applyThemeToRoot(theme)
    
    // Save preference
    setCurrentTheme(theme.value)
    setIsOpen(false)
    
    // Optionally save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('design-system-theme', theme.value)
    }
  }
  
  // Load saved theme on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('design-system-theme')
      if (savedTheme) {
        const theme = themes.find(t => t.value === savedTheme)
        if (theme) {
          applyThemeToRoot(theme)
          setCurrentTheme(savedTheme)
        }
      }
    }
  }, [])

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Switch theme"
      >
        <Palette className="h-5 w-5" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 z-50 mt-2 w-56 rounded-md border bg-popover p-2 shadow-lg">
            <div className="mb-2 px-2 py-1.5 text-sm font-semibold">
              Color Theme
            </div>
            <div className="space-y-1">
              {themes.map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => handleThemeChange(theme)}
                  className={`flex w-full items-center gap-3 rounded-sm px-2 py-2 text-sm hover:bg-accent ${
                    currentTheme === theme.value ? 'bg-accent' : ''
                  }`}
                >
                  <div 
                    className="h-6 w-6 rounded-full border-2 border-border"
                    style={{ 
                      background: `hsl(${theme.colors.primary})` 
                    }}
                  />
                  <span>{theme.name}</span>
                  {currentTheme === theme.value && (
                    <span className="ml-auto text-xs">✓</span>
                  )}
                </button>
              ))}
            </div>
            
            <div className="mt-3 border-t pt-2 px-2">
              <p className="text-xs text-muted-foreground">
                Changes are temporary. Edit <code className="text-[0.65rem] bg-muted px-1 py-0.5 rounded">globals.css</code> to persist.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

