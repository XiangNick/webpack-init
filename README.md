# React系列技术——电影列表项目

## 前台快速开始
- 安装依赖
  + `npm  install`
- 开始开发环境
  + `npm  run develop`
- 项目发布
  + `npm  run publish`
- gulp和webpack集成
  + `npm run  deploy`

## 后台快速开始
- [server下载地址](https://git.oschina.net/shiguoqing/Hera_server)
  + `npm  install`
  + `nodemon  index.js`


# 项目构建流程
## 搭建项目结构
1. `npm init`生成package.json
2. 生成项目结构文件夹
3. 构建webpack的开发和发布配置文件
4. 构建gulp配置文件和webpack集成使用
5. 添加.gitignore文件忽略不上传的文件
6. `git  init`用git进行版本控制


## 项目构建
### 前端项目构建注意点

* 从外往内抽取，从大往小抽取组件。组件是不可能一次性抽取完美的，需要根据部署之后的实际痛点去从新构建。
* React项目如果很小，代码量会个很大，但是当你有很多的组件资源之后，构建项目会非常的快速
* React里面视图和展示和视图上的一些行为都是通过组件的props和state进行改变的，所以在项目开发中这两个属性要配合的非常好
* 只要你理解文件分层的目的是方便维护，结构清晰，提高可读性，方便形同开发。那么什么MVC什么单向数据流完全可以不用，按照你自己的结构区划分就行了
* 一定要注意命名规范和代码健壮性
* react这些技术都比较新，版本跟新比较快，所以最好的方式是看官网，如果你看网上的文章，一定要看发布时间。
* 思想的转变：工程化，要用工具去构建项目，模板思想，下载好之后去按照自己的需求进行修改      主题森林

### 后台项目构建
* 用express作为后台服务，后台服务请求不涉及跨域，但是你需要子啊后台设置cors跨域请求头
```
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
```



















