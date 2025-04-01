
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-gradient-tech text-primary-foreground hover:opacity-95 shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary/10 text-secondary-foreground border border-secondary/20 hover:bg-secondary/20",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-success text-success-foreground hover:bg-success/90",
        tech: "tech-gradient-border bg-background text-foreground hover:bg-muted/10 data-animation",
        highlight: "bg-gradient-highlight text-primary-foreground hover:opacity-95 shadow-sm",
        glass: "glass-tech text-foreground hover:bg-card/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      glow: {
        default: "",
        cyan: "shadow-neon-cyan hover:shadow-neon-cyan",
        purple: "shadow-neon-purple hover:shadow-neon-purple",
        magenta: "shadow-neon-magenta hover:shadow-neon-magenta",
        none: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      glow: "none",
    },
    compoundVariants: [
      {
        variant: "default",
        glow: "cyan",
        className: "shadow-neon-cyan hover:shadow-neon-cyan",
      },
      {
        variant: "tech",
        glow: "cyan",
        className: "shadow-neon-cyan hover:shadow-neon-cyan",
      },
    ],
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, glow, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, glow, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
