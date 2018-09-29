angular.module('wechat.filter', [])
    .filter('test', [function() {
        return function(str) {
            return str;
        };
    }])