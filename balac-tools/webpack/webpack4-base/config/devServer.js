const config = {
    // 配置开发服务器
    devServer: {
        contentBase: path.join(__dirname, "dist"), //静态文件根目录
        port: 9090,             // 端口
        host: 'localhost',
        overlay: true,
        compress: true          // 服务器返回浏览器的时候是否启动gzip压缩
    }
};

module.exports = config;