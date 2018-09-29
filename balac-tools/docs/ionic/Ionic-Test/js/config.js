/**
 * @file ÎÄ¼þµÄÃèÊö
 * @author ytp <tianping.yan@partner.midea.com.cn>
 * @copyright Midea Co.Ltd 1968-2016
 * @license Released under the Commercial license.
 * @version 16/5/19
 */
requirejs.config({
    paths: {
        jquery: 'lib/jquery.min',
        angular: 'lib/angular.min',
        angular_animate: 'lib/angular-animate.min',
        angular_sanitize: 'lib/angular-sanitize.min',
        angular_ui_router: 'lib/angular-ui-router.min',
        ionic: 'lib/ionic.min',
        ionic_angular: 'lib/ionic-angular.min'
    },
    shim: {
        angular: {
            deps: ['jquery'],
            exports: 'angular'
        },
        angular_animate: {
            deps: ['angular'],
            exports: 'angular_animate'
        },
        angular_sanitize: {
            deps: ['angular'],
            exports: 'angular_sanitize'
        },
        angular_ui_router: {
            deps: ['angular'],
            exports: 'angular_ui_router'
        },
        ionic: {
            exports: 'ionic'
        },
        ionic_angular: {
            deps: ['angular', 'angular_animate', 'angular_sanitize', 'angular_ui_router', 'ionic'],
            exports: 'ionic_angular'
        }
    }
});