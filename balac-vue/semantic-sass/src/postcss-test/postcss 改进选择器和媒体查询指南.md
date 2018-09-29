嵌套规则：

    postcss-nesting 插件 (https://github.com/jonathantneal/postcss-nesting)

        根据 W3C嵌套模块建议 进行样式规则嵌套

        .article {
            color: #333;

            .popular {
                // 不使用 & 指定的选择器将被忽略
            }
            & .title {
                // & 嵌套选择器，必须，且是选择器链中的第一个基本选择器才能启用嵌套。 => .article .title { ... }
            }

            @nest .latest & {
                // @nest 语法，允许将父选择器插入选择器中的任何位置（而不仅仅是开头）。=> .latest .article { ... }
            }
        }

自定义选择器：postcss-custom-selectors 插件

    :--

    @custom-selector :--heading h1, h2, h3, h4, h5, h6;

    :--heading {            // => h1, ..., h6 { ... }
        font-weight: bold;
    }
    .article :--heading .author {   // => .article h1 .author, ..., .article h6 .author { ... }
        color: blue;
    }

    @custom-selector :--links a, a:focus, a:visited, a:hover, a:active;

    article :--heading :--links {   // => article h1 a, article h1 a:focus,..., article h2 a, .... { ... }
        color: #333;
    }     

selectors level 4 (https://drafts.csswg.org/selectors-4) 伪类：

    postcss-selector-matches 插件，:matches()伪类，如果传递多个选择器，则元素必须至少匹配其中一个
    
        button:matches(:hover, :focus) {    // => button:hover, button:focus { ... }
            color: red;
        }

    postcss-selector-not 插件，:not()伪类过滤不符合任何给定的参数元素

        section:not(:first-child, :last-child) {    // => section:not(:first-child):not(:last-child) { ... }
            background: white;
        }

    postcss-pseudo-class-any-link 插件，实现 :any-link，帮助解决:link伪类的混乱。与后者不同，它匹配所有链接 - 包括访问过的链接。

        a:any-link {        // => a:link, a:visited { ... }
            color: blueviolet;
        }

媒体查询改进

    postcss-custom-media 插件，https://github.com/postcss/postcss-custom-media

        实现规范了媒体查询保存到变量的能力。（https://drafts.csswg.org/mediaqueries/#custom-mq）

    postcss-media-minmax 插件，https://github.com/postcss/postcss-media-minmax

        @custom-media --medium-viewport (min-width: 768px) and (max-width: 992px);

        @media (--medium-viewport) {    // => @media (min-width: 768px) and (max-width: 992px) { ... }
            ...
        }

        @custom-media --landscape (orientation: landscape);

        @media (--medium-viewport) and (--landscape) {  // => @media (min-width: 768px) and (max-width: 992px) and (orientation: landscape) { ... }
            ...
        }

    postcss-media-minmax 插件，https://github.com/postcss/postcss-media-minmax

        @custom-media --medium-viewport (768px <= width <= 992px);

        @media (--medium-viewport) { ... }