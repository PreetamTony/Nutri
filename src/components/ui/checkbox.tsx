import * as React from "react";
export const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    type="checkbox"
    ref={ref}
    className={"rounded border border-input bg-background text-primary-600 focus:ring-primary-400 focus:ring-2 focus:outline-none " + (className || "")}
    {...props}
  />
));
Checkbox.displayName = "Checkbox";
