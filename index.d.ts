import {ReactNode} from "react";
import {FiberRoot} from "./react-reconciler/types";

type DOMContainer = Element | DocumentFragment | null
type Container = DOMContainer & {
  _reactRootContainer?: RootType
}

// 跟定义
type RootType = {
  render(children: ReactNode): void,
  unmount(): void,
  _internalRoot: FiberRoot,
  [key: string]: any
}

/**
 *
 */
export enum RootTag {
  LegacyRoot = 0,
  BlockingRoot = 1,
  ConcurrentRoot = 2
}

export type RootOptions = {
  hydrate?: boolean,
  hydrationOptions?: {
    onHydrated?: (suspenseNode: Comment) => void,
    onDeleted?: (suspenseNode: Comment) => void,
    [key: string]: any
  },
  [key: string]: any
}

export type SuspenseHydrationCallbacks = {
  onHydrated?: (suspenseInstance: SuspenseInstance) => void,
  onDeleted?: (suspenseInstance: SuspenseInstance) => void,
  [key: string]: any
}