# v2ex-nuxt

v2ex: https://www.v2ex.com/

v2ex 官方 api: https://www.v2ex.com/p/7v9TEc53

v2ex github 项目中的 api: https://github.com/ochapman/v2ex/blob/master/v2ex.go

参考：https://orangexc.xyz/2017/06/19/N2ex/#more

## Performance

* Lighthouse [100/100](http://orkj5d055.bkt.clouddn.com/n2ex-sehiddtque.now.sh_2017-06-26_18-43-12.html) - Webpagetest

## Features

* Use vue ssr framework [nuxt](https://github.com/nuxt/nuxt.js)
* Use Element UI library [element](https://github.com/ElemeFE/element)
* Use material Design UI library [muse-ui](https://github.com/museui/muse-ui)（Material 设计风格）
* Use browser and node.js http client [axios](https://github.com/mzabriskie/axios)
* Test runner [ava](https://github.com/avajs/ava)
* Test spies, stubs and mocks [sinon](https://github.com/sinonjs/sinon)
* Unit test [vue-test-utils](https://github.com/vuejs/vue-test-utils)
* Node proxy solve [CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)
* Progressive Web Apps

## page & router

* Hot topic list
* New topic list
* Topic detail with comment
* Node list
* Node detail
* User detail

路由结构根据第三方 API，决定展示的页面

API：热门话题(index.vue)、最新话题(new.vue)、节点列表(node/....vue)、节点信息(node/...vue)、话题详情(topic/...vue)、话题评论(topic/...vue)、用户详情(member/...vue)、用户话题(member/...vue)

## 同时请求多个资源，当多个资源全部请求完成时才返回，axios.all
```
asyncData ({ params, error }) {
  return axios.all([
    axios.get(`https://proxy-uuptfgaypk.now.sh/topics/show.json?id=${params.id}`),
    axios.get(`https://proxy-uuptfgaypk.now.sh/replies/show.json?topic_id=${params.id}`)
  ])
  .then(axios.spread(function (detail, comments) {
    return {
      detail: detail.data[0],
      comments: comments.data
    }
  }))
  .catch(error => console.log(error))
}
```

## CORE 跨域 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)

```
// 不好的做法
const express = require('express')
const request = require('request')
const app = express()
// 转发请求，然后在返回头里加上，Access-Control-Allow-Origin: *
app.use('/', function(req, res) {
  const url = 'https://www.v2ex.com/api' + req.url
  req.pipe(request(url)).pipe(res.set('Access-Control-Allow-Origin', '*'))
})

app.listen(process.env.PORT || 3001)
```

## 部署
打包 npm run build 运行 npm start
node 服务器，安装 [pm2](https://github.com/Unitech/pm2) 跑 node 服务。或 docker
免费跑 node 服务的供应商：heroku、now.sh
nuxt 项目怎么如何跑在这两个服务上官网有写 https://zh.nuxtjs.org/faq/heroku-deployment


## Build Setup

``` bash
# install dependencies
$ yarn # Or npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# eslint
$ npm run lint

# unit tests
$ npm run test
```
