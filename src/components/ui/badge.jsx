import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 font-semibold leading-none select-none transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground",
        secondary:
          "bg-surface-elevated border border-border text-foreground",
        outline:
          "border border-border bg-transparent text-muted-foreground",
        success:
          "bg-surface-elevated border border-success/40 text-success",
        warning:
          "bg-surface-elevated border border-warning/40 text-warning",
        destructive:
          "bg-surface-elevated border border-destructive/40 text-destructive",
        info:
          "bg-surface-elevated border border-info/40 text-info",
      },
      size: {
        sm: "text-[10px] px-1.5 py-0.5 rounded",
        default: "text-[11px] px-2 py-0.5 rounded-md",
        lg: "text-xs px-2.5 py-1 rounded-md",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "default",
    },
  }
);

function Badge({ className, variant = "secondary", size = "default", ...props }) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Badge, badgeVariants };

