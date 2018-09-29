// eslint 选项
var options = {
    cache: false,             // 缓存 eslint 结果，true 将缓存到 ./node_modules/.cache，或缓存目录路径的字符串
    emitWarning: false,       // true 为始终返回警告
    emitError: false,         // true 则始终返回错误
    quiet: false,             // 只会处理和报告错误，true 则忽略警告
    failOnWarning: false,     // 有 eslint 警告，true 则模块构建失败
    failOnError: false,       // 有 eslint 错误，true 则模块构建失败
    outputReport: false,      // 错误保存到指定文件 { filePath: 'checkstyle.xml', formatter: require('eslint/lib/formatters/checkstyle') }

    /**
     * formatter 格式化规则
     * formatter, eslintPath, .eslintrc 定义格式化规则
     */
    // several examples !

    // default value
    formatter: require("eslint/lib/formatters/stylish"),

    // community formatter
    formatter: require("eslint-friendly-formatter"),

    // custom formatter
    formatter: function (results) {
        // `results` format is available here
        // http://eslint.org/docs/developer-guide/nodejs-api.html#executeonfiles()

        // you should return a string
        // DO NOT USE console.*() directly !
        return "OUTPUT"
    },

    eslintPath: path.join(__dirname, "reusable-eslint"),
};

// eslint 使用 .eslintrc 配置
var eslint = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: options    // eslint-loader 的 eslint 选项
            }
        ]
    }
};

module.exports = eslint;
