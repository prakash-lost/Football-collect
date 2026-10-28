import React, { useEffect, useCallback } from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

function Dialog({ open, onOpenChange, children }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape" && open) {
        onOpenChange?.(false);
      }
    },
    [open, onOpenChange]
  );

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, handleKeyDown]);

  if (!open) return null;

  return (
    <div
      data-slot="dialog-portal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-in fade-in duration-150"
      onClick={() => onOpenChange?.(false)}
    >
      {children}
    </div>
  );
}

function DialogContent({
  className,
  size = "lg",
  children,
  onClose,
  ...props
}) {
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-3xl",
    "2xl": "max-w-4xl",
    full: "max-w-6xl",
  }[size] || "max-w-2xl";

  return (
    <div
      role="dialog"
      aria-modal="true"
      data-slot="dialog-content"
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "relative w-full rounded-xl border border-border bg-card p-4 sm:p-6 md:p-8 shadow-2xl text-foreground flex flex-col gap-5 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150",
        sizeClasses,
        className
      )}
      {...props}
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-1.5 rounded-md bg-surface-elevated border border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-primary"
        >
          <X className="size-4 shrink-0" />
        </button>
      )}
      {children}
    </div>
  );
}

function DialogHeader({ className, ...props }) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-1 pr-6", className)}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }) {
  return (
    <h2
      data-slot="dialog-title"
      className={cn("text-xl sm:text-2xl font-black text-foreground tracking-tight", className)}
      {...props}
    />
  );
}

function DialogDescription({ className, ...props }) {
  return (
    <p
      data-slot="dialog-description"
      className={cn("text-xs sm:text-sm text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2.5 pt-4 border-t border-border", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
};

