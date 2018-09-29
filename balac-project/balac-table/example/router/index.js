import Vue from 'vue';
import VueRouter from 'vue-router';

const routes = [];

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes
});

export default router;