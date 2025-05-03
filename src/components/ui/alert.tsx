import * as React from "react";
export function Alert({ variant, children }: { variant?: string; children: React.ReactNode }) {
  let color = "bg-red-100 text-red-800 border-red-200";
  if (variant === "destructive") color = "bg-red-100 text-red-800 border-red-200";
  return <div className={`border rounded-md px-4 py-3 ${color} mb-2`}>{children}</div>;
}
export function AlertDescription({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
