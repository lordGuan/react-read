import {RootTag, SuspenseHydrationCallbacks} from "../index";
import {Fiber, FiberRoot, SideEffectTag, TypeOfMode, WorkTag} from './types'

/**
 * 简化版FiberRootNode
 * type FiberRoot 对应 FiberRootNode实例
 */
export class FiberRootNode implements FiberRoot, Fiber {
  public containerInfo: any
  current: Fiber;
  public tag: RootTag
  public hydrate: boolean
  child: Fiber | null;
  effectTag: SideEffectTag;
  firstEffect: Fiber | null;
  key: string | null;
  lastEffect: Fiber | null;
  nextEffect: Fiber | null;
  return: Fiber | null;
  sibling: Fiber | null;
  stateNode: any;
  type: any;

  // ...还有很多其他字段

  constructor(
    containerInfo: any,
    tag: RootTag,
    hydrate: boolean
  ) {
    this.containerInfo = containerInfo
    this.tag = tag
    this.hydrate = hydrate

    this.current = null // 这是后续挂上去的
  }
}

/**
 * 简化版FiberNode
 * type Fiber 对应 FiberNode实例
 */
export class FiberNode implements Fiber {
  public tag: WorkTag;
  public pendingProps: any;
  public key: null | string;
  public mode: TypeOfMode;
  child: Fiber | null;
  effectTag: SideEffectTag;
  firstEffect: Fiber | null;
  lastEffect: Fiber | null;
  nextEffect: Fiber | null;
  return: Fiber | null;
  sibling: Fiber | null;
  stateNode: any;
  type: any;

  // ...还有很多其他属性

  constructor(
    tag: WorkTag,
    pendingProps: any,
    key: null | string,
    mode: TypeOfMode
  ) {
    this.tag = tag
    this.pendingProps = pendingProps
    this.key = key
    this.mode = mode
  }


}

export function createFiberRoot(
  containerInfo: any, // container
  tag: RootTag, // RootTag.LegacyRoot
  hydrate: boolean, // false
  hydrationCallbacks: null | SuspenseHydrationCallbacks, // null
): FiberRoot {
  const root: FiberRoot = new FiberRootNode(containerInfo, tag, hydrate)
  // ...忽略细节

  // Cyclic construction. This cheats the type system right now because
  // stateNode is any.
  const uninitializedFiber = createHostRootFiber(tag); // mark=fiber_001
  root.current = uninitializedFiber; //
  uninitializedFiber.stateNode = root;
  //

  // 为uninitializedFiber挂上一个更新队列，这里不关注，updateQueue属性

  return root;
}

/**
 * 创建宿主根对应的Fiber
 * @param tag
 */
export function createHostRootFiber(tag: RootTag): Fiber {
  // ...省略mode的判断逻辑

  return createFiber(WorkTag.HostRoot, null, null, RootTag.BlockingRoot);
}

/**
 * 创建Fiber的工厂
 * @param tag
 * @param pendingProps
 * @param key
 * @param mode
 */
const createFiber = function (
  tag: WorkTag,
  pendingProps: any,
  key: null | string,
  mode: number, // RootTag和TypeOfMode本质都是数字，方便起见写成了枚举，这里用number统一
): Fiber {
  // FiberNode的实例，符合type Fiber
  return new FiberNode(tag, pendingProps, key, mode)
};
