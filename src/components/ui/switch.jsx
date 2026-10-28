import React from "react";
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "../../lib/utils";

function Switch({
  className,
  size = "default",
  ...props
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-border transition-colors outline-none cursor-pointer",
        "focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        "data-[size=default]:h-5 data-[size=default]:w-9",
        "data-[size=sm]:h-4 data-[size=sm]:w-7",
        "data-checked:bg-primary data-checked:border-primary",
        "data-unchecked:bg-surface-elevated",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full transition-transform",
          "group-data-[size=default]/switch:size-3.5 group-data-[size=default]/switch:data-checked:translate-x-[18px] group-data-[size=default]/switch:data-unchecked:translate-x-0.5",
          "group-data-[size=sm]/switch:size-2.5 group-data-[size=sm]/switch:data-checked:translate-x-[13px] group-data-[size=sm]/switch:data-unchecked:translate-x-0.5",
          "group-data-checked/switch:bg-primary-foreground group-data-unchecked/switch:bg-muted-foreground"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
