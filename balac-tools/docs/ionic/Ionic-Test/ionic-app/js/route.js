angular.module('app', ['ionic'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('account', {
                url: '/account',
                templateUrl: '<div>���ǲ���·��</div>',
                controller: function($scope, $stateParams) {
                    console.log( 222222222 )
                }
            });
        $urlRouterProvider
            //.otherwise('home');
            .when('', '/home');
    })