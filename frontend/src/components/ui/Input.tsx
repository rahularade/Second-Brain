import React from "react";
import { cn } from "../../lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({type, className, error, ...props}, ref) => {
  return <input
        ref={ref}
        type={type}
        className={cn(
          "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          error && "border-destructive focus-visible:ring-destructive/50",
          className,
        )}
        {...props}
      />;
})
Input.displayName = "Input"
export default Input;