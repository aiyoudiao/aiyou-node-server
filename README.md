# aiyou-node-server
整理一个纯nodejs的服务模板，支持增删改查，但是得写sql语句噢。

## 目录解构

### bin

nodejs 服务入口

### config

一些和数据库、登录授权相关的配置

### controller

存放不同模块的业务处理

### db

存放数据库操作的相关文件

### middlewares

存放一些nodejs服务的过滤器

### model

存放 响应输出的模板

### public

存放第三方静态资源

### routes

存放所有路由

### sql

存放sql语句

### utils

存放辅助工具类

### views

存放一些错误模板页

### app.js

nodejs 应用文件

### chat.js

websocket 应用文件