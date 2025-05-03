import * as React from "react";
export function Select({ value, onValueChange, children, ...props }: any) {
  return (
    <select
      value={value}
      onChange={e => onValueChange(e.target.value)}
      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:outline-none"
      {...props}
    >
      {children}
    </select>
  );
}
export function SelectTrigger({ children }: any) {
  return <div className="w-full">{children}</div>;
}
export function SelectValue(props: any) {
  return null;
}
export function SelectContent({ children }: any) {
  return <>{children}</>;
}
export function SelectItem({ value, children }: any) {
  return <option value={value}>{children}</option>;
}
