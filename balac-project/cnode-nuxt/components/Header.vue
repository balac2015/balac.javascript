<template>
    <header class="header">
        <h1>
            <a href="/">
                <img class="rounded" src="/cnodejs_light.svg" />
            </a>
        </h1>
        <nav class="">
            <nuxt-link v-for=" nav in mainNav " :key=" nav.link " :to=" nav.link ">{{ nav.name }}</nuxt-link>
        </nav>
    </header>
</template>

<script>
const mainNav = [
    { name: '首页', link: '/' },
    { name: '未读消息', link: '/message' },
    { name: '新手入门', link: '/start' },
    { name: 'API', link: '/api' },
    { name: '关于', link: '/about' }
];
export default {
    name: 'component-header',
    data () {
        return {
            mainNav: mainNav
        }
    }
}
</script>

<style scoped>
    .header {
        display: flex;
        padding-right: 1.5rem;
        padding-left: 1.5rem;
        background: #6c757d;
        box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, .05);
    }
    .header h1 {
        flex-grow: 1;
    }
    img.rounded {
        width: 120px;
        height: 28px;
    }
</style>
