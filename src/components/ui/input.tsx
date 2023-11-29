import * as React from "react";
import { cn } from "@/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative flex items-center gap-2 h-10 w-full rounded-md border-2 border-black bg-background px-1 sm:px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:border-blue-500 focus-within:border-2 transition-colors duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
      >
        <input
          type={type}
          className="flex-1 py-2 text-sm bg-transparent focus:outline-none"
          ref={ref}
          {...props}
        />
        {children}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
