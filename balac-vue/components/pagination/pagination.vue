<template>
    <!-- <pager :currentPage="1" :pageCount="100" :pagerCount="7" layout="prev, pager, next"></pager> -->
    <div id="ytp">
        <test></test>
    </div>
</template>

<script>
    // import pager from './pager.vue';
    import Test from './1.1.js';
    import './theme-chalk/src/index.scss'

    export default {
        name: 'pagination',
        components: {
            Test
        }
    }
</script>    