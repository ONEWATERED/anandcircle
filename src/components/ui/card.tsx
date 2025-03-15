
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

// Add FlipCard component
interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  flipOnHover?: boolean;
  flipOnClick?: boolean;
  height?: string;
}

const FlipCard = React.forwardRef<HTMLDivElement, FlipCardProps>(
  ({ className, frontContent, backContent, flipOnHover = false, flipOnClick = true, height = "100%", ...props }, ref) => {
    const [isFlipped, setIsFlipped] = React.useState(false);
    
    const handleClick = () => {
      if (flipOnClick) {
        setIsFlipped(!isFlipped);
      }
    };
    
    return (
      <div
        ref={ref}
        className={cn(
          "perspective-1000 w-full relative cursor-pointer",
          flipOnHover && "hover-flip",
          className
        )}
        style={{ height }}
        onClick={handleClick}
        {...props}
      >
        <div
          className={cn(
            "w-full h-full transition-transform duration-500 transform-style-3d",
            isFlipped ? "rotate-y-180" : ""
          )}
        >
          <div className="absolute w-full h-full backface-hidden">
            {frontContent}
          </div>
          <div className="absolute w-full h-full backface-hidden rotate-y-180">
            {backContent}
          </div>
        </div>
      </div>
    );
  }
);
FlipCard.displayName = "FlipCard";

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  FlipCard 
}
