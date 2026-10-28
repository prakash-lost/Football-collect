import React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./button";

function ErrorState({
  title = "Something went wrong",
  description = "An error occurred while loading this data. Please try again.",
  onRetry,
  className,
  children,
  ...props
}) {
  return (
    <div
      role="alert"
      data-slot="error-state"
      className={cn(
        "flex flex-col items-center justify-center text-center p-6 sm:p-10 rounded-xl border border-destructive/30 bg-surface-elevated text-foreground",
        className
      )}
      {...props}
    >
      <div className="size-10 rounded-lg bg-destructive/15 text-destructive flex items-center justify-center mb-3 shrink-0">
        <AlertCircle className="size-5 shrink-0" />
      </div>
      <h3 className="text-base font-bold text-foreground tracking-tight">
        {title}
      </h3>
      <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-sm leading-relaxed">
        {description}
      </p>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="secondary"
          size="sm"
          className="mt-4"
        >
          Try Again
        </Button>
      )}
      {children}
    </div>
  );
}

export { ErrorState };

