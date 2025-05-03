// Utility functions for the project

// Classnames utility (cn)
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
