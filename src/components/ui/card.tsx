
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border bg-card text-card-foreground shadow-sm",
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

interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  flipOnHover?: boolean;
  flipOnClick?: boolean;
  isFlipped?: boolean;
  height?: string;
  width?: string;
  className?: string;
  onClick?: () => void;
}

const FlipCard = React.forwardRef<HTMLDivElement, FlipCardProps>(
  ({ frontContent, backContent, flipOnHover = false, flipOnClick = true, isFlipped = false, height = "100%", width = "100%", className, onClick, ...props }, ref) => {
    const [internalIsFlipped, setInternalIsFlipped] = React.useState(false);
    
    // Use the external isFlipped prop if provided, otherwise use internal state
    const flipped = isFlipped !== undefined ? isFlipped : internalIsFlipped;
    
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      console.log("FlipCard clicked, current flipped state:", flipped);
      
      if (onClick) {
        onClick();
      } else if (flipOnClick) {
        setInternalIsFlipped(!internalIsFlipped);
      }
    };

    // Add custom CSS for the flip card animation
    React.useEffect(() => {
      const styleId = 'flip-card-styles';
      if (!document.getElementById(styleId)) {
        const styleElement = document.createElement('style');
        styleElement.id = styleId;
        styleElement.textContent = `
          .perspective-1000 {
            perspective: 1000px;
          }
          .transform-style-3d {
            transform-style: preserve-3d;
          }
          .backface-hidden {
            backface-visibility: hidden;
          }
          .rotate-y-180 {
            transform: rotateY(180deg);
          }
          .hover-flip:hover .transform-style-3d {
            transform: rotateY(180deg);
          }
        `;
        document.head.appendChild(styleElement);
      }
    }, []);
    
    return (
      <div
        ref={ref}
        className={cn(
          "perspective-1000 relative cursor-pointer",
          flipOnHover && "hover-flip",
          className
        )}
        style={{ height, width }}
        onClick={handleClick}
        {...props}
      >
        <div
          className={cn(
            "w-full h-full transition-transform duration-500 transform-style-3d",
            flipped ? "rotate-y-180" : ""
          )}
        >
          <div className="absolute w-full h-full backface-hidden rounded-xl">
            {frontContent}
          </div>
          <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl">
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
