// 弹窗 $ionicPopup，.my-popup 类必须，默认没有 popup-head，有的话加 .has-head 类，.tip-popup 类为提示框类名，.alert 类则只有确定按钮
.my-popup {  // 遮罩层
.popup {    // 弹框
        background-color: @c-white;
    .set(border-radius, 24);
    }
.popup-head {
        display: none;
    }
.popup-body {
    .padding-v(60);
    }
.popup-buttons {
    .set(min-height, 80);
    .padding-a(0);
    .set(border-bottom-right-radius, 24);
    .set(border-bottom-left-radius, 24);
    .fs(36);
        overflow: hidden;

    .button {
        .margin-r(0);
            border-width: 0;
        .border-t;
            color: @blue-11c;

        &:after {
                content: '';
                display: none;
            }

        &:last-child {
            .border-l;
            }
        }
    }

&.has-head {
    .popup-head {
            display: block;
            //border-bottom-width: 0;
        }
    .popup-body {
        .padding-v(20);
        }
    }
&.tip-popup .popup-buttons {
        display: none;
    }
&.alert .btn-cancel {
        display: none;
    }
}

.factory('cFactory', [
    '$ionicPopup',
    '$timeout',
    function($ionicPopup, $timeout) {
        var funs = {
            /**
             * ionic 弹窗组件 $ionicPopup，
             * @param template 弹窗内容，不需要标题时的内容
             * @param value，string 时为传入的类名，object 时为确定、取消、完成时的方法调用，
             */
            onPopup: function(template, value, options) {
                var showPopup = $ionicPopup.show({
                    cssClass: 'my-popup' || (typeof value === 'string' ? value : 'my-popup'),
                    title: '',
                    template: template,
                    buttons: [
                        {
                            text: '取消',
                            type: 'btn-cancel',
                            onTap: function(e) {
                                if (value && typeof value === 'object' && value.onCancel) {
                                    value.onCancel();
                                }
                            }
                        },
                        {
                            text: '确定',
                            type: 'btn-sure',
                            onTap: function(e) {
                                if (value && typeof value === 'object' && value.onSure) {
                                    value.onSure();
                                }
                            }
                        }
                    ]
                });

                showPopup.then(function(res) {
                    if (value && typeof value === 'object' && value.complete) {
                        value.complete();
                    }
                });

                if (value && typeof value === 'number') {
                    $timeout(function() {
                        showPopup.close();
                    }, value);
                }
            }
        };

        return funs;
    }
])