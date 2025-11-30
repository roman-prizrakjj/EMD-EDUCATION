import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
                    {
                        "bg-white text-black hover:bg-white/90": variant === "default",
                        "border border-white/20 bg-transparent hover:bg-white/10": variant === "outline",
                        "h-10 py-2 px-4": size === "default",
                        "h-9 px-3 rounded-md": size === "sm",
                        "h-11 px-8 rounded-md": size === "lg",
                    },
                    className
                )}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
