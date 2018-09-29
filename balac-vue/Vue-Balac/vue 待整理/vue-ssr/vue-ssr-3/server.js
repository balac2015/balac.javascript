const express = require('express')
const app = express()
const fs = require('fs');
const path = require('path');
// 这个包必须和vue的版本必须一致，目前都是2.3.2，不管哪个版本，版本号必须严格一致，否则会报warning*
const vueServerRenderer = require('vue-server-renderer');

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200); /*让options请求快速返回*/
    else next();
});

// 可以在访问localhost:5000时能看到效果
app.get('/', function (req, resp) {
	// 读取 bundle.server.js
    const filePath = path.join(__dirname, './build/bundle.server.js')
    const code = fs.readFileSync(filePath, 'utf8');
    // 把上面读取的js文件，传递给vue-ssr，作用是解析bundle.server.js，然后生成HTML
    const bundleRenderer = vueServerRenderer.createBundleRenderer(code);
    // 渲染，最终生成HTML
    bundleRenderer.renderToString((err, html) => {
        if (err) {
            console.log(err.message);
            console.log(err.stack);
        }
        console.log(html);
        resp.send(html)
    });
})
app.listen(5000, () => {
    console.log('Listen 5000')
})