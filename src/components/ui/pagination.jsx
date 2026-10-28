import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "../../lib/utils";
import { buttonVariants } from "./button";

function Pagination({ className, ...props }) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }) {
  return (
    <ul
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ className, ...props }) {
  return <li className={cn("", className)} {...props} />;
}

function PaginationLink({
  className,
  isActive = false,
  size = "icon-sm",
  disabled = false,
  children,
  ...props
}) {
  return (
    <button
      type="button"
      aria-current={isActive ? "page" : undefined}
      disabled={disabled}
      className={cn(
        buttonVariants({
          variant: isActive ? "default" : "outline",
          size,
        }),
        isActive && "cursor-default pointer-events-none",
        disabled && "opacity-40 pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function PaginationPrevious({
  className,
  label = "Previous",
  ...props
}) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="sm"
      className={cn("gap-1 pl-2.5", className)}
      {...props}
    >
      <ChevronLeft className="size-4 shrink-0" />
      <span className="hidden sm:inline">{label}</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  label = "Next",
  ...props
}) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="sm"
      className={cn("gap-1 pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:inline">{label}</span>
      <ChevronRight className="size-4 shrink-0" />
    </PaginationLink>
  );
}

function PaginationEllipsis({ className, ...props }) {
  return (
    <span
      aria-hidden="true"
      className={cn("flex size-8 items-center justify-center text-muted-foreground", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};

