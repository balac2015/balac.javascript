import Vue from 'vue';
import VueRouter from 'vue-router';
import Modal from './modal.vue';

Vue.use(VueRouter);

const Usage = {
    components: {
        Modal
    },
    template: `
        <div class="usage">
            <button id="show-modal" @click="showModal = true">Show Modal</button>
            <modal v-if="showModal" @close="showModal = false">
                <h3 slot="header">custom header</h3>
                <div slot="body">custom body</div>
                <div slot="footer">custom footer</div>
            </modal>            
        </div>
    `,
    data () {
        return {
            showModal: false
        };
    }
};
const router = new VueRouter({
    mode: 'history',
    base: __dirname,
    routes: [
        { path: '/modal', component: Usage }
    ]
});

new Vue({
    router,
    template: `
        <div id="app">
            <router-view class="view"></router-view>
        </div>
    `
}).$mount('#app');
/*
new Vue({
    components: {
        Modal
    },
    template: `
        <div id="id">
            <button id="show-modal" @click="showModal = true">Show Modal</button>
            <modal v-if="showModal" @close="showModal = false">
                <h3 slot="header">custom header</h3>
                <div slot="body">custom body</div>
                <div slot="footer">custom footer</div>
            </modal>            
        </div>
    `,
    data () {
        return {
            showModal: false
        }
    }
}).$mount('#app');
*/