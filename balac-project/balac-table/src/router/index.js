import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './config.js';
import title from '../i18n/title.json';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash',
    base: __dirname,
    routes
});

router.afterEach((route) => {
    const data = title[route.meta.lang];

    for (let val in data) {

        if (new RegExp('^' + val, 'g').test(route.name)) {
            document.title = data[val];

            return;
        }
    }
    document.title = 'Element';
});

export default router;
