const config = {
    module: {
        rules: [
            {
                test: /\.(sc|le|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    // 'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    }
};

module.exports = config;
