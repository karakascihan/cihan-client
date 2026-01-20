import { lazy } from "react";

export function lazyWithPreload<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
) {
  const Component = lazy(importFn);
  (Component as any).preload = importFn;
  return Component as typeof Component & { preload: () => Promise<any> };
}
