import React from "react";
import { cn } from "../../lib/utils";

const Table = React.forwardRef(function Table(
  { className, containerClassName, ...props },
  ref
) {
  return (
    <div
      className={cn(
        "relative w-full overflow-x-auto rounded-lg border border-border bg-background",
        containerClassName
      )}
    >
      <table
        ref={ref}
        data-slot="table"
        className={cn("w-full caption-bottom text-xs sm:text-sm border-collapse text-left", className)}
        {...props}
      />
    </div>
  );
});

const TableHeader = React.forwardRef(function TableHeader(
  { className, ...props },
  ref
) {
  return (
    <thead
      ref={ref}
      data-slot="table-header"
      className={cn(
        "border-b border-border bg-surface-elevated text-muted-foreground font-semibold text-[11px] uppercase tracking-wider",
        className
      )}
      {...props}
    />
  );
});

const TableBody = React.forwardRef(function TableBody(
  { className, ...props },
  ref
) {
  return (
    <tbody
      ref={ref}
      data-slot="table-body"
      className={cn("divide-y divide-border", className)}
      {...props}
    />
  );
});

const TableFooter = React.forwardRef(function TableFooter(
  { className, ...props },
  ref
) {
  return (
    <tfoot
      ref={ref}
      data-slot="table-footer"
      className={cn("border-t border-border bg-surface-elevated/50 font-medium text-foreground", className)}
      {...props}
    />
  );
});

const TableRow = React.forwardRef(function TableRow(
  { className, ...props },
  ref
) {
  return (
    <tr
      ref={ref}
      data-slot="table-row"
      className={cn(
        "hover:bg-surface-elevated/60 transition-colors data-[state=selected]:bg-surface-elevated",
        className
      )}
      {...props}
    />
  );
});

const TableHead = React.forwardRef(function TableHead(
  { className, ...props },
  ref
) {
  return (
    <th
      ref={ref}
      data-slot="table-head"
      className={cn(
        "h-10 px-3 text-left align-middle font-semibold text-muted-foreground whitespace-nowrap",
        className
      )}
      {...props}
    />
  );
});

const TableCell = React.forwardRef(function TableCell(
  { className, ...props },
  ref
) {
  return (
    <td
      ref={ref}
      data-slot="table-cell"
      className={cn("py-2.5 px-3 align-middle text-foreground", className)}
      {...props}
    />
  );
});

const TableCaption = React.forwardRef(function TableCaption(
  { className, ...props },
  ref
) {
  return (
    <caption
      ref={ref}
      data-slot="table-caption"
      className={cn("mt-3 text-xs text-muted-foreground text-center", className)}
      {...props}
    />
  );
});

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};

