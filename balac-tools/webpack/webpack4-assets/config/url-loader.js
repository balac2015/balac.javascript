const rules = [
    // 处理图片
    {
        test: /.(png|jpg|gif|ttf|eot|woff(2)?)(?[=a-z0-9]+)?$/,
        use: [
            // url-loader : 依赖于 file-loader ,把图片转换成base64嵌入html,如果超出一定阈值则交给file-loader
            {
                loader: 'url-loader',
                options: {
                    query: {
                        // 阈值 单位byt
                        limit: '8192',
                        name: 'images/[name]_[hash:7].[ext]'
                    }
                }
            }
        ]
    }
];
