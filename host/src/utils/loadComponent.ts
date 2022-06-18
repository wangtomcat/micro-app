export default function loadComponent(scope, module) {
  return async () => {
    // 初始化共享作用域（shared scope）用提供的已知此构建和所有远程的模块填充它
    let res = await __webpack_init_sharing__('default');
    console.log(__webpack_init_sharing__,"de")
    const container = window[scope]; // 或从其他地方获取容器
    // 初始化容器 它可能提供共享模块
    let re = await container.init(__webpack_share_scopes__.default);
    console.log(re,'mo')
    const factory = await window[scope].get(module);
    console.log(factory,"factory")
    const Module = factory();
    return Module;
  };
}