# resume_template

> 简历生成应用，A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

#下载element-ui
npm install --save element-ui

#导出pdf功能的依赖
npm install html2canvas jspdf --save

#简历模块拖拽功能
npm install vuedraggable --save
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

我的简历生成应用。样式参考：[全民简历](https://www.qmjianli.com/)

- 有换肤功能，即更换简历颜色主题。darkerColor的颜色是rgb的10进制值各减40
- 可以导出为pdf，pdf是截图的形式
- 可以调字体和文字大小
- 支持通过拖拽简历模块，调整模块顺序
- 可以隐藏模块
- 目前可以编辑基本信息~
