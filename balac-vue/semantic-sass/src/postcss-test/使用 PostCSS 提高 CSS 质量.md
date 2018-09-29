保持 CSS 质量最佳的 PostCSS 插件：

postcss-reporter 插件，PostCSS插件，用于console.log()其他PostCSS插件注册的消息（警告等）。

Can I Use: https://caniuse.com/

Do I Use是一个插件，可以帮助您确保目标浏览器支持您编写的CSS

npm i

    postcss-reporter # （https://github.com/postcss/postcss-reporter）

    stylelint   # https://github.com/stylelint/stylelint

    stylelint-config-standard   # https://github.com/stylelint/stylelint-config-standard

    doiuse  # https://github.com/anandthakker/doiuse

        doiuse({        // 配置
            browsers: ['ie >= 9', 'last 2 versions']    // 目标是支持每个浏览器的最后两个主要版本，以及IE9和更新版本。
        })

    postcss-import

    immutable-css

// Stylelint 规则：.stylelintrc 文件
{
    "extends": "stylelint-config-standard"
}

CSS 统计信息和列表选择器

    https://cssstats.com/   # https://github.com/cssstats/postcss-cssstats

    https://github.com/davidtheclark/list-selectors