import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "bg-primary text-primary-foreground hover:bg-primary/80": variant === "default",
          "bg-secondary text-secondary-foreground hover:bg-secondary/80": variant === "secondary",
        },
        className
      )}
      {...props}
    />
  )
})
Badge.displayName = "Badge"

export { Badge } 