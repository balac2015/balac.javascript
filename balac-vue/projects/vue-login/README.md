https://molunerfinn.com/Vue+Koa/#%E9%A1%B9%E7%9B%AE%E7%94%A8%E5%88%B0%E7%9A%84%E4%B8%80%E4%BA%9B%E5%85%B3%E9%94%AE%E4%BE%9D%E8%B5%96

http://www.ruanyifeng.com/blog/2017/08/koa.html





# vue-login

> A Vue.js project

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

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



基于koa2+es6/7打造的高质量Restful API

// class + async/await，更好的组织api的逻辑层，语义更清晰，结构更清晰，代码量更少更轻，更容易维护
// 接口层：
// /server/router.js 组织 api 的接口层
const router = require('koa-router')();
const userctrl = require('../controllers/users/UserController');    // 引入用户模块逻辑层
router
    // 用户模块 api
    .post('/api/user/login', userctrl.login)        // 用户登录
    .post('/api/user/register', userctrl.register)  // 用户注册
    .get('/api/user/logout', userctrl.logout)      // 用户退出
    .put('/api/user/put', userctrl.put)            // 更改用户资料
    .put('/api/user/resetpwd', userctrl.resetpwd)  // 重置用户密码
    .delete('/api/user/deluser', userctrl.deluser)  // 删除用户

// 逻辑层
// /server/users/UserController.js 用户模块
import mongoose from 'mongoose';
import md5 from 'md5';
const UserModel = mongoose.model('User');
class UserController {
    // 用户注册
    static register (ctx) {
        // await...
    }
    // 用户登录
    static login (ctx) {
        // await...
    }
    // 用户退出
    static logout (ctx) {
        // await...
    }
    // 更改用户资料
    static put (ctx) {
        // await...
    }
    // 删除用户
    static deluser (ctx) {
        // await...
    }
    // 重置密码
    static resetpwd (ctx) {
        // await...
    }
}
export default UserController();

static 静态方法并不需要实例化就可以访问，也就意味着，使用static，你不需要new，你可以减少内存的损耗。

避免在每个接口逻辑层中使用try/catch，而是封装一个try/catch中间件来处理它们，这样可以减少代码量，工作量，以及减少空间的占用。

把一些公共方法抽离出来，同样用class来组织它们，使用也很简单，你可以单独引进，也可以使用extends来继承公共方法的class类，以访问父类方法的方式来获取它们。
