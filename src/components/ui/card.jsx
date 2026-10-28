import React from "react";
import { cn } from "../../lib/utils";

const Card = React.forwardRef(function Card(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      data-slot="card"
      className={cn(
        "rounded-xl border border-border bg-card text-card-foreground transition-colors",
        className
      )}
      {...props}
    />
  );
});

const CardHeader = React.forwardRef(function CardHeader(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      data-slot="card-header"
      className={cn("flex flex-col gap-1.5 p-5 sm:p-6", className)}
      {...props}
    />
  );
});

const CardTitle = React.forwardRef(function CardTitle(
  { className, ...props },
  ref
) {
  return (
    <h3
      ref={ref}
      data-slot="card-title"
      className={cn(
        "font-bold text-base sm:text-lg text-foreground tracking-tight leading-snug",
        className
      )}
      {...props}
    />
  );
});

const CardDescription = React.forwardRef(function CardDescription(
  { className, ...props },
  ref
) {
  return (
    <p
      ref={ref}
      data-slot="card-description"
      className={cn("text-xs sm:text-sm text-muted-foreground leading-relaxed", className)}
      {...props}
    />
  );
});

const CardContent = React.forwardRef(function CardContent(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      data-slot="card-content"
      className={cn("p-5 sm:p-6 pt-0", className)}
      {...props}
    />
  );
});

const CardFooter = React.forwardRef(function CardFooter(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      data-slot="card-footer"
      className={cn("flex items-center p-5 sm:p-6 pt-0 border-t border-border mt-auto", className)}
      {...props}
    />
  );
});

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
