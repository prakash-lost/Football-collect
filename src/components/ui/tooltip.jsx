import React, { useState, useId } from "react";
import { cn } from "../../lib/utils";

function Tooltip({
  content,
  children,
  position = "top",
  className,
  delay = 150,
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const tooltipId = useId();

  const showTooltip = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId);
    setIsVisible(false);
  };

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-1.5",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-1.5",
    left: "right-full top-1/2 -translate-y-1/2 mr-1.5",
    right: "left-full top-1/2 -translate-y-1/2 ml-1.5",
  }[position] || "bottom-full left-1/2 -translate-x-1/2 mb-1.5";

  if (!content) return children;

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      aria-describedby={isVisible ? tooltipId : undefined}
    >
      {children}
      {isVisible && (
        <div
          id={tooltipId}
          role="tooltip"
          className={cn(
            "absolute z-50 whitespace-nowrap rounded px-2 py-1 text-[11px] font-medium leading-tight",
            "bg-surface-elevated border border-border text-foreground shadow-md pointer-events-none",
            "animate-in fade-in zoom-in-95 duration-100",
            positionClasses,
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}

export { Tooltip };

