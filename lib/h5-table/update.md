# 2023.9.7 更新

表格性能优化 支持设置最多同时显示多少条数据优化。（开启下拉加载时不支持）
optimized 开启优化 默认时 30+ 40 + 30 超过 100 部分 会动态的计算 是否隐藏掉 核心逻辑在 useHandleScroll 里面（废弃）

# 2023.9.27

1. 修改transform 渲染方式 不经过 vue 派发更新（数据量过大 会有卡顿），直接用原生js 去控制
2. 增加 rootValue 默认75 修复pad 样式问题

# 2024.1.8

修复滑动加载时 滑动太快导致没触发load事件的问题
