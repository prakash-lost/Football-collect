import React from "react";
import { cn } from "../../lib/utils";

function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  children,
  ...props
}) {
  return (
    <div
      data-slot="empty-state"
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-xl border border-dashed border-border bg-card/50",
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="size-11 rounded-lg bg-surface-elevated border border-border text-muted-foreground flex items-center justify-center mb-3.5 shrink-0">
          <Icon className="size-5 shrink-0" />
        </div>
      )}
      {title && (
        <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight">
          {title}
        </h3>
      )}
      {description && (
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-sm leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-4">{action}</div>}
      {children}
    </div>
  );
}

export { EmptyState };

