import React from "react";
import { cn } from "../../lib/utils";

function Spinner({
  className,
  size = "default",
  color = "primary",
  ...props
}) {
  const sizeClasses = {
    xs: "size-3 border-[1.5px]",
    sm: "size-4 border-2",
    default: "size-5 border-2",
    lg: "size-8 border-3",
  }[size] || "size-5 border-2";

  const colorClasses = {
    primary: "border-primary border-t-transparent",
    muted: "border-muted-foreground border-t-transparent",
    current: "border-current border-t-transparent",
  }[color] || "border-primary border-t-transparent";

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        "inline-block rounded-full animate-spin",
        sizeClasses,
        colorClasses,
        className
      )}
      {...props}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export { Spinner };

