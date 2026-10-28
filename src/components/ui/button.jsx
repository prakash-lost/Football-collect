import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-md text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-hover active:scale-[0.98]",
        secondary:
          "bg-surface-elevated border border-border text-foreground hover:border-primary/60 hover:text-foreground active:scale-[0.98]",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-surface-elevated active:scale-[0.98]",
        ghost:
          "text-muted-foreground hover:text-foreground hover:bg-surface-elevated active:scale-[0.98]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-[0.98]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 gap-2 px-3.5",
        xs: "h-7 gap-1 px-2 text-[11px]",
        sm: "h-8 gap-1.5 px-2.5 text-xs",
        lg: "h-10 gap-2.5 px-5 text-sm font-bold",
        icon: "size-9",
        "icon-xs": "size-7",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(function Button(
  {
    className,
    variant = "default",
    size = "default",
    loading = false,
    disabled = false,
    asChild = false,
    children,
    ...props
  },
  ref
) {
  const classes = cn(buttonVariants({ variant, size, className }));

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: cn(classes, children.props.className),
      ref,
      "aria-disabled": disabled || loading ? true : undefined,
      ...props,
    });
  }

  return (
    <button
      ref={ref}
      data-slot="button"
      disabled={disabled || loading}
      aria-busy={loading}
      className={classes}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin -ml-0.5 size-3.5 text-current shrink-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button, buttonVariants };
