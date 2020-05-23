import React, {Component, ReactElement, ReactNode} from "react";
import {Container, RootType} from "../index";
import {createLegacyRoot} from "../react-dom";
import {FiberRoot} from "../react-reconciler/types";

// DOM环境下应用的"容器"
const container = document.getElementById('root')

// App要么是函数组件本体，要么是类组件构造函数，这里指代一下
const App: React.FC = function App(props) {
  /*...*/
  return React.createElement('span')
}

render(React.createElement(App), container)

// jsx被翻译成createElement调用
// ReactDOM.render(
//   React.createElement(App), // JSX=>createElement调用=>ReactElement集合
//   container
// )

//
function render(
  element: ReactElement, // React的ts声明中，有多个重载，支持ReactElement[]
  container: Container, // 一般是DOM元素
  callback?: Function,
) {
  // ...省略条件判断和DEV错误提示

  return legacyRenderSubtreeIntoContainer(
    null,
    element,
    container,
    false,
    callback,
  );
}

function legacyRenderSubtreeIntoContainer(
  parentComponent: Component<any, any>,
  children: ReactNode,
  container: Container,
  forceHydrate: boolean,
  callback?: Function,
) {
  // ...开发模式的一些检查

  // _reactRootContainer用于判断该DOM容器是不是根容器，后续会为其附加
  let root: RootType = container._reactRootContainer
  let fiberRoot: FiberRoot;
  if (!root) {
    // 初始化挂载--会在根容器上挂载一个_reactRootContainer，表示在这个容器上挂载过
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      forceHydrate, // 这里是force
    );
    // container._reactRootContainer._internalRoot 是一个FiberRootNode类型的实例
    fiberRoot = root._internalRoot;
    // ...没有callback省略一些内容

    // 初始化挂载不被批量处理
    // unbatchedUpdates(() => {
    //   updateContainer(children, fiberRoot, parentComponent, callback);
    // });
  } else {
    // ...暂时不关注非初始化挂载的情况
  }
  // 相当于返回
  // getPublicRootInstance(fiberRoot)
  return fiberRoot.current.child.stateNode
}

function legacyCreateRootFromDOMContainer(
  container: Container,
  forceHydrate: boolean, // 这里也是false
): RootType {
  const shouldHydrate = false /*forceHydrate || shouldHydrateDueToLegacyHeuristic(container)*/;
  // 清空容器的内容
  if (!shouldHydrate) {
    let warned = false;
    let rootSibling;
    while ((rootSibling = container.lastChild)) {
      // ...省略DEV内容
      container.removeChild(rootSibling);
    }
  }
  // ...省略DEV内容

  // 返回一个ReactDOMBlockingRoot实例
  // react-dom 包
  return createLegacyRoot(
    container,
    undefined
  );
}




