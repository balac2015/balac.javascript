<template>
    <div id="app">
        <theme-picker></theme-picker>
        <side-nav :data="navs" :base="base"></side-nav>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                msg: '消息',
                base: '',
                navs: [
                    {
                        href: 'https://www.baidu.com',
                        name: '百度'
                    }
                ]
            };
        }
    };
</script>