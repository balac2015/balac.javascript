// ���� $ionicPopup��.my-popup ����룬Ĭ��û�� popup-head���еĻ��� .has-head �࣬.tip-popup ��Ϊ��ʾ��������.alert ����ֻ��ȷ����ť
.my-popup {  // ���ֲ�
.popup {    // ����
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
             * ionic ������� $ionicPopup��
             * @param template �������ݣ�����Ҫ����ʱ������
             * @param value��string ʱΪ�����������object ʱΪȷ����ȡ�������ʱ�ķ������ã�
             */
            onPopup: function(template, value, options) {
                var showPopup = $ionicPopup.show({
                    cssClass: 'my-popup' || (typeof value === 'string' ? value : 'my-popup'),
                    title: '',
                    template: template,
                    buttons: [
                        {
                            text: 'ȡ��',
                            type: 'btn-cancel',
                            onTap: function(e) {
                                if (value && typeof value === 'object' && value.onCancel) {
                                    value.onCancel();
                                }
                            }
                        },
                        {
                            text: 'ȷ��',
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