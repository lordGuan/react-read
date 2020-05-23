import {RootTag} from "../index";

// 这里是一个简化的FiberRoot定义
export type FiberRoot = Fiber & {
  current: Fiber,
  hydrate: boolean,
  containerInfo: any,
}

export enum WorkTag {
  FunctionComponent,
  ClassComponent,
  IndeterminateComponent,    // 不确定型 可能FunctionComponent也可能ClassComponent
  HostRoot,   // 宿主根
  HostPortal,
  HostComponent,
  HostText,
  Fragment,
  Mode,
  ContextConsumer
  // ...还有很多其他类型
}

export type SideEffectTag = number;

// Fiber结构核心结构
export type Fiber = {
  tag: WorkTag | RootTag, // 本质是数字，有重叠部分，由于写成了枚举，这里就融合一下
  key: null | string,
  type: any,
  stateNode: any,

  return: Fiber | null,

  // 单链表树结构用的指针
  child: Fiber | null,
  sibling: Fiber | null,

  // Effect
  effectTag: SideEffectTag,

  // 单链表结构快速遍历那些有副作用的fiber
  nextEffect: Fiber | null,

  // 用于快速访问effect list
  firstEffect: Fiber | null,
  lastEffect: Fiber | null,

  [key: string]: any, // 省略其他的属性
}

/**
 * react 模式
 */
export enum TypeOfMode {
  NoMode = 0,
  StrictMode = 1,
  BlockingMode = 2,
  ConcurrentMode = 4,
  ProfileMode = 8,
  DebugTracingMode = 16
}
