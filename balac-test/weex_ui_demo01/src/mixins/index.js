const navigator = weex.requireModule('navigator');
// import config from '../configs/config.js';

export default {
    methods: {
        jumpPage (to) {
            // return new Promise ((resolve, reject) => {
            //     navigator.push({
            //         url: config.host + to,
            //         animated: 'true'
            //     }, (event) => {
            //         resolve(event);
            //     });
            // });
        },
        jumpRouter (to) {}
    }
};
