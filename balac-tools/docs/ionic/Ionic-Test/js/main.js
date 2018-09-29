/**
 * @file 文件的描述
 * @author ytp <tianping.yan@partner.midea.com.cn>
 * @copyright Midea Co.Ltd 1968-2016
 * @license Released under the Commercial license.
 * @version 16/5/19
 */
require(['app_angular'], function(app) {
    'use strict';

    var setActionSheet = {
        cssClass: 'my-actionsheet',
        titleText: 'Ionic ActionSheet 例子',
        buttons: [{
            text: '<b>Shaare</b> Tish'
        }, {
            text: 'Move'
        }],
        destructiveText: 'Delete',
        cancelText: 'Cancel',
        /**
         * buttons 中按钮，destructive，cancel 对应点击事件
         * @param index buttons 数组对应下标
         * @returns {boolean} true 时会退出，cancel 事件后默认退出
         */
        buttonClicked: function(index) {
            console.log('buttonClicked' + index);
        },
        destructiveButtonClicked: function() {
            console.log('destructive');
        },
        cancel: function() {
            console.log('cancel');
        }
    };

    $scope.views = {
        /**
         * 调用 $ionicActionSheet 操作表
         */
        onActionSheet: function() {
            $timeout(function() {
                $ionicActionSheet.show(setActionSheet);
            }, 800);
        },
        /**
         * $ionicBackdrop 背景
         */
        onBackdrop: function() {
            $ionicBackdrop.retain();
            $timeout(function() {
                $ionicBackdrop.release();
            }, 1000);
        }
    };

    app.start();
});