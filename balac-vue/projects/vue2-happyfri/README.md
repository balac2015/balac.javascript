# 说明

>  非常简单的一个 vue2 + vuex + vue-router 的入门练习项目，整个流程一目了然，麻雀虽小，五脏俱全，适合作为入门练习。

>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

>  或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

>  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍

>  开发环境 macOS 10.12.3  Chrome 56 nodejs 6.10.0


## 项目运行（nodejs 6.0+）
``` bash
# 克隆到本地
git clone https://github.com/bailicangdu/vue2-happyfri.git

# 进入文件夹
cd vue2-happyfri

# 安装依赖
npm install

# 开启本地服务器localhost:8088
npm run dev

# 发布环境
npm run build
```



# 效果演示


[demo地址](http://cangdu.org/happyfri/)（请用chrome手机模式预览）
   
### 移动端扫描下方二维码
<img src='https://github.com/bailicangdu/vue2-happyfri/blob/master/src/images/ewm.png' width="300" height="300" />



## 路由配置
```js
import App from '../App'

export default [{
    path: '/',
    component: App,
    children: [{
        path: '',
        component: r => require.ensure([], () => r(require('../page/home')), 'home')
    }, {
        path: '/item',
        component: r => require.ensure([], () => r(require('../page/item')), 'item')
    }, {
        path: '/score',
        component: r => require.ensure([], () => r(require('../page/score')), 'score')
    }]
}]

```
