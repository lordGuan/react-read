import {Container, RootOptions, RootTag, RootType} from "../index";
import {createFiberRoot} from "../react-reconciler";
import {FiberRoot} from "../react-reconciler/types";

export function createLegacyRoot(
  container: Container,
  options?: RootOptions,
): RootType {
  return new ReactDOMBlockingRoot(container, RootTag.LegacyRoot);
}

// ReactDOMBlockingRoot类型的实例 符合 type RootType
function ReactDOMBlockingRoot(
  container: Container,
  tag: RootTag,
  options?: RootOptions,
) {
  this._internalRoot = createRootImpl(container, tag);
}

function createRootImpl(
  container: Container,
  tag: RootTag,
  options?: RootOptions, // 反正没有
): FiberRoot {
  // Tag is either LegacyRoot or Concurrent Root
  const hydrate = false /*options != null && options.hydrate === true*/;
  const hydrationCallbacks = null /*(options != null && options.hydrationOptions) || null*/;
  // react-reconciler包
  // root是一个FiberRoot
  const root = createFiberRoot(container, tag, hydrate, hydrationCallbacks) /*createContainer(container, tag, hydrate, hydrationCallbacks)*/;
  // 在container上挂一个特殊的字段（运行时生成）
  // markContainerAsRoot(root.current, container);
  container["__reactContainer$" + "randomKey"] = root.current
  const containerNodeType = container.nodeType;

  // 忽略一些内容，ensureListeningTo
  return root;
}