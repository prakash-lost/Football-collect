import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

const Select = React.forwardRef(function Select(
  {
    className,
    error,
    disabled = false,
    children,
    size = "default",
    ...props
  },
  ref
) {
  const sizeClasses = {
    sm: "h-8 text-xs pl-2.5 pr-8",
    default: "h-9.5 text-xs sm:text-sm pl-3 pr-8",
    lg: "h-11 text-sm pl-3.5 pr-9",
  }[size] || "h-9.5 text-xs sm:text-sm pl-3 pr-8";

  return (
    <div className="relative w-full inline-block">
      <select
        ref={ref}
        disabled={disabled}
        aria-invalid={!!error}
        className={cn(
          "w-full appearance-none rounded-md bg-background border border-border text-foreground",
          "cursor-pointer transition-colors outline-none",
          "focus:border-primary focus:ring-1 focus:ring-primary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-destructive focus:border-destructive focus:ring-destructive",
          sizeClasses,
          className
        )}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-2.5 flex items-center text-muted-foreground">
        <ChevronDown className="size-4 shrink-0" />
      </div>
    </div>
  );
});

Select.displayName = "Select";

export { Select };

