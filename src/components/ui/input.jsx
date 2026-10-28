import React from "react";
import { cn } from "../../lib/utils";

const Input = React.forwardRef(function Input(
  {
    className,
    type = "text",
    leftIcon: LeftIcon,
    rightElement,
    error,
    size = "default",
    disabled = false,
    ...props
  },
  ref
) {
  const sizeClasses = {
    sm: "h-8 text-xs px-2.5",
    default: "h-9.5 text-xs sm:text-sm px-3",
    lg: "h-11 text-sm px-3.5",
  }[size] || "h-9.5 text-xs sm:text-sm px-3";

  return (
    <div className="relative w-full flex items-center">
      {LeftIcon && (
        <div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground">
          <LeftIcon className="size-4 shrink-0" />
        </div>
      )}
      <input
        type={type}
        ref={ref}
        disabled={disabled}
        aria-invalid={!!error}
        className={cn(
          "w-full rounded-md bg-background border border-border text-foreground placeholder:text-muted-foreground",
          "transition-colors outline-none",
          "focus:border-primary focus:ring-1 focus:ring-primary",
          "disabled:cursor-not-allowed disabled:opacity-50",
          LeftIcon && "pl-9",
          rightElement && "pr-9",
          error && "border-destructive focus:border-destructive focus:ring-destructive",
          sizeClasses,
          className
        )}
        {...props}
      />
      {rightElement && (
        <div className="absolute right-2.5 flex items-center">
          {rightElement}
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";

export { Input };

