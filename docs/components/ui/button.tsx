"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded font-medium transition-all duration-[var(--duration-base)] focus-visible:outline-none disabled:pointer-events-none",
  {
    variants: {
      Type: {
        // Uses CSS variables from design tokens
        Primary: "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
        Secondary: "border-2 border-border bg-secondary text-secondary-foreground hover:bg-secondary-hover hover:border-border-strong active:bg-secondary-active",
        Ghost: "bg-transparent text-foreground hover:bg-accent active:bg-muted",
        White: "bg-background text-foreground border border-border hover:bg-accent active:bg-muted shadow-sm"
      },
      Icon: {
        None: "gap-0",
        Left: "flex-row gap-2",
        Right: "flex-row-reverse gap-2"
      },
      State: {
        Enabled: "opacity-100 cursor-pointer",
        Hover: "",
        Focused: "ring-2 ring-ring ring-offset-2",
        Pressed: "scale-[0.98]",
        Disabled: "opacity-40 cursor-not-allowed"
      },
      Size: {
        // Uses CSS variables for consistent sizing
        Small: "h-[var(--button-height-sm)] px-3 text-xs",
        Base: "h-[var(--button-height-base)] px-4 py-2 text-sm",
        Large: "h-[var(--button-height-lg)] px-6 py-3 text-base"
      }
    },
    defaultVariants: {
      Type: "Primary",
      Icon: "None",
      State: "Enabled",
      Size: "Base"
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, Type, Icon, State, Size, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || State === "Disabled"}
        className={cn(buttonVariants({ Type, Icon, State, Size, className }))}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
