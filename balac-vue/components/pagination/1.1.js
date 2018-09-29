import Test from './1.js';
console.log( Test )
/* istanbul ignore next */
Test.install = function(Vue) {
  Vue.component('test', Test);
};

export default Test;