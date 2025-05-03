import * as React from "react";
export function Badge({ variant, children }: { variant?: string; children: React.ReactNode }) {
  let style = "inline-block px-2 py-1 rounded bg-primary-100 text-primary-700 border border-primary-200 text-xs font-semibold";
  if (variant === "secondary") style = "inline-block px-2 py-1 rounded bg-primary-200 text-primary-900 border border-primary-300 text-xs font-semibold";
  if (variant === "outline") style = "inline-block px-2 py-1 rounded border border-primary-300 text-primary-700 text-xs font-semibold bg-white";
  return <span className={style}>{children}</span>;
}
