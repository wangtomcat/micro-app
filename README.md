### 微前端
> 使用 [wepack5](https://webpack.docschina.org/) 中的 [模块联邦](https://webpack.docschina.org/concepts/module-federation/) 对微前端的实现

### 技术
> webpack、react、typescript、sass

### 目录
```text
- host (微前端框架)
- remote-home (微前端应用)
- remote-detail (微前端应用)
- remote-modules (微前端模块)
```

### 目标
```text
Host为微前端框架的基础，其它微应用（平台/功能）加入到框架中来，并通过微模块（公共组件）辅助，完成一个基本的微前端架构
```