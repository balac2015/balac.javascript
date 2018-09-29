angular.module('app', ['ionic'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('account', {
                url: '/account',
                templateUrl: '<div>这是测试路由</div>',
                controller: function($scope, $stateParams) {
                    console.log( 222222222 )
                }
            });
        $urlRouterProvider
            //.otherwise('home');
            .when('', '/home');
    })