import React from "react";
import { cn } from "../../lib/utils";

const TabsContext = React.createContext({
  value: "",
  onValueChange: () => {},
});

function Tabs({
  value,
  defaultValue,
  onValueChange,
  children,
  className,
  ...props
}) {
  const [activeTab, setActiveTab] = React.useState(value || defaultValue || "");

  React.useEffect(() => {
    if (value !== undefined) {
      setActiveTab(value);
    }
  }, [value]);

  const handleTabChange = React.useCallback(
    (newValue) => {
      if (value === undefined) {
        setActiveTab(newValue);
      }
      onValueChange?.(newValue);
    },
    [value, onValueChange]
  );

  return (
    <TabsContext.Provider value={{ value: activeTab, onValueChange: handleTabChange }}>
      <div data-slot="tabs" className={cn("w-full flex flex-col gap-4", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function TabsList({ className, children, ...props }) {
  const listRef = React.useRef(null);

  const handleKeyDown = (e) => {
    const tabs = listRef.current?.querySelectorAll('[role="tab"]:not([disabled])');
    if (!tabs || tabs.length === 0) return;

    const currentTab = document.activeElement;
    const currentIndex = Array.from(tabs).indexOf(currentTab);

    if (e.key === "ArrowRight") {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % tabs.length;
      tabs[nextIndex]?.focus();
      tabs[nextIndex]?.click();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      tabs[prevIndex]?.focus();
      tabs[prevIndex]?.click();
    } else if (e.key === "Home") {
      e.preventDefault();
      tabs[0]?.focus();
      tabs[0]?.click();
    } else if (e.key === "End") {
      e.preventDefault();
      tabs[tabs.length - 1]?.focus();
      tabs[tabs.length - 1]?.click();
    }
  };

  return (
    <div
      ref={listRef}
      role="tablist"
      onKeyDown={handleKeyDown}
      className={cn(
        "inline-flex items-center gap-1 overflow-x-auto p-1 rounded-lg bg-surface-base border border-border max-w-full scrollbar-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function TabsTrigger({
  value,
  className,
  disabled = false,
  children,
  ...props
}) {
  const { value: currentVal, onValueChange } = React.useContext(TabsContext);
  const isSelected = currentVal === value;

  return (
    <button
      type="button"
      role="tab"
      disabled={disabled}
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      onClick={() => onValueChange(value)}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors outline-none",
        "focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
        isSelected
          ? "bg-surface-elevated text-primary border border-border shadow-xs"
          : "text-muted-foreground hover:text-foreground hover:bg-surface-elevated/50 border border-transparent",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, className, children, ...props }) {
  const { value: currentVal } = React.useContext(TabsContext);
  if (currentVal !== value) return null;

  return (
    <div
      role="tabpanel"
      tabIndex={0}
      className={cn("outline-none animate-in fade-in-50 duration-150", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };

