/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.onlistenerEvent();
    },
    onlistenerEvent: function () {
        $("#bottomNav_show").click(function () {
            cordova.exec(function (success) {
            }, function (error) {
            }, "MideaCommon", "showMenu", []);
        });
        $("#navgation_show").click(function () {
            cordova.exec(function (success) {
            }, function (error) {
            }, "MideaCommon", "showNav", []);
        });
        $("#navgation_hide").click(function () {
            cordova.exec(function (success) {
            }, function (error) {
            }, "MideaCommon", "hideNav", []);
        });

        $("#showPicker_year").click(function () {
            var options = {
                date: new Date(),
                mode: "date",
                type: "year"
            };

            datePicker.show(options, function (date) {
                alert("date result " + date);
            });
        });
        $("#showPicker_month").click(function () {
            var options = {
                date: new Date(),
                mode: "date",
                type: "month"
            };

            datePicker.show(options, function (date) {
                alert("date result " + date);
            });
        });
        $("#showPicker_day").click(function () {
            var options = {
                date: new Date(),
                mode: "date",
                type: "day"
            };

            datePicker.show(options, function (date) {
                alert("date result " + date);
            });
        });
        $("#showPicker_datetime").click(function () {
            var options = {
                date: new Date(),
                mode: "date",
                type: "datetime"
            };

            datePicker.show(options, function (date) {
                alert("date result " + date);
            });
        });
        $("#showPicker_time").click(function () {
            var options = {
                date: new Date(),
                mode: "time",
            };

            datePicker.show(options, function (date) {
                alert("date result " + date);
            });
        });
		
		$("#startMap").click(function () {
            cordova.exec(function (success) {
            }, function (error) {
            }, "MideaOut", "toOldVersion", []);
        });

        $("#exitApp").click(function () {
            cordova.exec(function (success) {
            }, function (error) {
            }, "MideaCommon", "exit", []);
        });

        $("#scan_button").click(function () {
            alert("scan");
            cordova.exec(function (success) {
                    alert("success : " + success.text);
                },
                function (error) {
                    alert("error : " + error);
                }, "MideaBarcode", "scan", []);
        });
        $("#location_button").click(function () {
            alert("location");
            cordova.exec(function (success) {
                alert(success.latitude + "," + success.longitude + "\n" + success.address);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaMap", "location", []);
        });
        $("#getWebViewSize").click(function () {
            alert("location");
            cordova.exec(function (success) {
                alert("w=" + success.webviewWidth + " h=" + success.webviewHeigh);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "webview", []);
        });
        $("#getExtraDemo").click(function () {
            alert("getExtraDemo");
            cordova.exec(function (success) {
                alert(JSON.stringify(success));
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "getExtra", ["com.midea.demo"]);
        });
        $("#getExtraMipTodo").click(function () {
            alert("getExtraMipTodo");
            cordova.exec(function (success) {
                alert(JSON.stringify(success));
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "getExtra", ["com.midea.mip.todo"]);
        });
        $("#driver_button").click(function () {
            alert("driver_button");
            cordova.exec(function (success) {
                alert(JSON.stringify(success));
            }, function (error) {
                alert("Error: " + error);
            }, "MideaAnnto", "getDriverInfo", []);
        });
        $("#user_button").click(function () {
            alert("get user info");
			//获取用户信息
            cordova.exec(function (success) {
				$("#userInfoList").append("<li>登录名 : " + success.uid + "</li>")
                    .append("<li>邮箱 : " + success.mail + "</li>")
                    .append("<li>部门 : " + success.ou + "</li>")
                    .append("<li>员工号 : " + success.employeenumber + "</li>")
                    .append("<li>职位 : " + success.midea_positionName + "</li>")
                    .append("<li>中文名 : " + success.cn + "</li>")
                    .append("<li>唯一标识 : " + success.uniqueIdentifier + "</li>")
                    .append("<li>部门全称 : " + success.midea_departmentName + "</li>")
                    .append("<li>办公电话 : " + success.telephonenumber + "</li>")
                    .append("<li>性别 : " + success.midea_gender + "</li>")
                    .append("<li>手机号 : " + success.mobile + "</li>")
                    .append("<li>ssoToken : " + success.ssoToken + "</li>")
                    .append("<li>cookie : " + success.cookie + "</li>");
            }, function (error) {
                alert("Error: " + error);
            }, "MideaUser", "getUser", []);

        });
        $("#user_button2").click(function () {
            alert("get user info2");
            cordova.exec(function (success) {
                alert(JSON.stringify(success));
            }, function (error) {
                alert("Error: " + error);
            }, "MideaUser", "getUserMap", []);
        });
        $("#showWidget").click(function () {
            alert("showWidget");
            cordova.exec(function (success) {

            }, function (error) {

            }, "MideaCommon", "showWidget", ["com.midea.demo", "args_abc可选"]);
        });
        $("#selectWidget").click(function () {
            alert("selectWidget");
            cordova.exec(function (success) {
                alert(JSON.stringify(success));
            }, function (error) {

            }, "MideaCommon", "selectWidget", []);
        });
        $("#navTo_button").click(function () {
            alert("nav_button");
            cordova.exec(function (success) {
                alert(JSON.stringify(success));
            }, function (error) {
                alert("Error: " + error);
            }, "MideaMap", "navTo", ["113.2045723720553", "23.033276740700192", "广州"]);
        });
        $("#navToWithFrom_button").click(function () {
            alert("nav_button");
            cordova.exec(function (success) {
                alert(JSON.stringify(success));
            }, function (error) {
                alert("Error: " + error);
            }, "MideaMap", "navToWithFrom", ["113.2045723720553", "23.033276740700192", "112.84994614670291", "23.193689802924411", "广州2"]);
        });
        $("#copy_button").click(function () {
            alert("copy_button");
            cordova.exec(function (success) {
                alert("复制内容: " + success);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "copy", ["复制123abc"]);
        });
        $("#paste_button").click(function () {
            alert("paste_button");
            cordova.exec(function (success) {
                alert("粘贴内容: " + success);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "paste", []);
        });
        $("#authPassword").click(function () {
            alert("authPassword_button");
            cordova.exec(function (success) {
                alert("authPassword: " + success);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "authPassword", []);
        });
        $("#logoutId").click(function () {
            cordova.exec(function (success) {
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "logout", []);
        });
        $("#orgChooseId").click(function () {
            alert("orgChoose_button");
            cordova.exec(function (success) {
                alert(JSON.stringify(success));
            }, function (error) {
                alert("Error: " + error);
            }, "MideaUser", "orgChoose", []);
        });
        $("#orgMuChooseId").click(function () {
            alert("orgMuChooseId");
            cordova.exec(function (success) {
                alert(JSON.stringify(success));
            }, function (error) {
                alert("Error: " + error);
            }, "MideaUser", "orgMuChoose", ["hew", "zhangmf3"]);
        });
		$("#orgMuChooseIdNotDel").click(function () {
            alert("orgMuChooseId");
            cordova.exec(function (success) {
                alert(JSON.stringify(success));
            }, function (error) {
                alert("Error: " + error);
            }, "MideaUser", "orgMuChooseNotDel", ["hew", "zhangmf3"]);
        });
        $("#startShake").click(function () {
            alert("startShake_button");
            cordova.exec(function (success) {
                alert("success" + success);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "shake", []);
        });
        $("#endShake").click(function () {
            alert("endShake_button");
            cordova.exec(function (success) {
                alert("stop shake");
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "shakeStop", []);
        });
        $("#startOrder").click(function () {
            alert("startOrder_button");
            cordova.exec(function (success) {
                alert("success" + success);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaAnnto", "startOrder", ["101010", "1", "安得"]);
        });
        $("#stopOrder").click(function () {
            alert("stopOrder_button");
            cordova.exec(function (success) {
                alert("success" + success);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaAnnto", "stopOrder", ["101010"]);
        });

        $("#showFloatId").click(function () {
            cordova.exec(function (success) {
                alert($("#showFloatId").text());
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "showFloat", []);
        });
        $("#hideFloatId").click(function () {
            cordova.exec(function (success) {
                alert($("#hideFloatId").text());
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "hideFloat", []);
        });
        $("#playLocalId").click(function () {
            var path = window.location.pathname;
            path = path.substr(path, path.length - 10);
            alert('localPath :' + path);
            var snd = new Media(path + 'test.wav');
            snd.play();
        });
        $("#languageID").click(function () {
            cordova.exec(function (success) {
                alert("language=" + success.language);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "language", []);

        });
        $("#changeStatusColor").click(function () {
            cordova.exec(function (success) {
                alert(success);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "statusBarColor", [230, 130, 80, 1]);
        });
        $("#mcShare").click(function () {
                                      cordova.exec(function (success) {
                                                   alert(success);
                                                   }, function (error) {
                                                   alert("Error: " + error);
                                                   }, "MideaCommon", "mcShare", [{
                                                           'title':'分享标题_test',                                                                             'subTitle':'分享子标题','action':'openH5',                                                                               'widgetId':'com.midea.demo','widgetExtra':'key1,value1,key2,value2,key3,value3',
                                                           'url':'http://www.baidu.com',
                                                           'imageUrl':'http://pic.nipic.com/2007-11-09/2007119122519868_2.jpg',                    'actionType':'1'}]);
                                      });
        //courseDownload
        $("#courseDownLoad").click(function () {
                                   cordova.exec(function (success) {
                                                alert(success);
                                                }, function (error) {
                                                alert("Error: " + error);
                                                }, "MideaCourse", "courseDownLoad",[{
                                                                                    'name': 'kecheng1',
                                                                                    'list': [
                                                                                             {
                                                                                             'filename': 'name1',
                                                                                             'fileID': 'fileid1',                          'url': 'http://mlouttest.midea.com.cn:8080/mdxieyi/show!play.do?id=201509301428476599cd9354e1d91c21092b&flag=course&sid=URbhU3H5NLJVV7wE0gnOKmvGMHQhuHaActDAEwlPQfd2nstCPgVPGA%3D%3D',
                                                                                             'zipurl': 'http://mlouttest.midea.com.cn:8080/mdxieyi/d.do?id=20151107130334ae8f8aa46140ed8aba0d0b&cid=20151107115029a0dfc33596d48f88f3a8f6&sid=URbhU3H5NLJVV7wE0gnOKmvGMHQhuHaActDAEwlPQfd2nstCPgVPGA%3D%3D',
                                                                                             'type': 'text/html'
                                                                                             },
                                                                                             {
                                                                                             'filename': 'name2',
                                                                                             'fileID': 'fileid2',                                                    'url': 'http://mlouttest.midea.com.cn:8080/mdxieyi/show!play.do?id=20151203103323b5192f4ebb9d44501ed73c&flag=course&sid=URbhU3H5NLJVV7wE0gnOKmvGMHQhuHaActDAEwlPQfd2nstCPgVPGA%3D%3D',
                                                                                             'zipurl': 'http://mmmmm',
                                                                                             'type': 'video/mp4'
                                                                                             }
                                                                                             ]
                                                                                    },
                                                                                    {
                                                                                    'name': 'kecheng2',
                                                                                    'list': [
                                                                                             {
                                                                                             'filename': 'name1',
                                                                                             'fileID': 'fileid3',                          'url': 'http://mlouttest.midea.com.cn:8080/mdxieyi/show!play.do?id=201509301428476599cd9354e1d91c21092b&flag=course&sid=URbhU3H5NLJVV7wE0gnOKmvGMHQhuHaActDAEwlPQfd2nstCPgVPGA%3D%3D',
                                                                                             'zipurl': 'http://mmmmm',
                                                                                             'type': 'video/mp4'
                                                                                             }
                                                                                             ]
                                                                                    }
                                                                                    ]);
                                   });
        $("#coursePlayerOnline").click(function () {
                                       cordova.exec(function (success) {
                                                    alert(success);
                                                    }, function (error) {
                                                    alert("Error: " + error);
                                                    }, "MideaCourse", "coursePlayerOnline", [
                                                                                             
                                                                                             {
                                                                                             'filename': 'name2',
                                                                                             'fileID': 'fileid2',                                                    'url': 'http://mlouttest.midea.com.cn:8080/mdxieyi/show!play.do?id=20151203103323b5192f4ebb9d44501ed73c&flag=course&sid=URbhU3H5NLJVV7wE0gnOKmvGMHQhuHaActDAEwlPQfd2nstCPgVPGA%3D%3D',
                                                                                             'type': 'video/mp4'
                                                                                             }
                                                                                             ]);
                                       });
        $("#getH5ShareInfo").click(function () {
                                     cordova.exec(function (success) {
                                                  alert(JSON.stringify(success));
                                                  }, function (error) {
                                                  alert("Error: " + error);
                                                  }, "MideaCommon", "getH5ShareInfo", []);
                                     });
        $("#departmentChoose").click(function () {
            cordova.exec(function (success) {
                alert(JSON.stringify(success));
            }, function (error) {
                alert("Error: " + error);
            }, "MideaUser", "departmentChoose", [1]);
        });
        $("#departmentMulChoose").click(function () {
            cordova.exec(function (success) {
                alert(JSON.stringify(success));
            }, function (error) {
                alert("Error: " + error);
            }, "MideaUser", "departmentChoose", [0, 100000, 30003353, 2678452590]);
        });
        $("#open_sys_browser_btn").click(function () {
            cordova.exec(function (success) {
            }, function (error) {
            }, "MideaCommon", "openSysBrowser", ["http://www.baidu.com"]);
        });
        $("#orientation1").click(function () {
            cordova.exec(function (success) {
                alert(JSON.stringify(success));
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "orientation", [0]);
        });
        $("#orientation2").click(function () {
            cordova.exec(function (success) {
                alert(JSON.stringify(success));
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "orientation", [1]);
        });
        $("#orientation3").click(function () {
            cordova.exec(function (success) {
                alert(JSON.stringify(success));
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "orientation", [2]);
        });
        $("#orientation4").click(function () {
            cordova.exec(function (success) {
                alert(JSON.stringify(success));
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "orientation", [3]);
        });
        //一卡通充值Demo
        $("#ecardrecharge").click(function () {
            cordova.exec(function (success) {
                if(success.result){
					alert(success.msg + " 10.0元")
				}else{
					alert(success.msg)
				}
            }, function (error) {
                
            }, "MideaWallet", "rechargeEcard", ["10.0"]);
        });
        //钱包余额
        $("#walletbalance").click(function () {
            cordova.exec(function (success) {
				if(success.result){
					alert(success.msg + " " + success.balance)
				}else{
					alert(success.msg)
				}
            }, function (error) {
                alert("Error: " + error);
            }, "MideaWallet", "walletBalance", []);
        });
		//一卡通余额
        $("#ecardbalance").click(function () {
            cordova.exec(function (success) {
				if(success.result){
					alert(success.msg + " " + success.balance)
				}else{
					alert(success.msg)
				}
            }, function (error) {
                alert("Error: " + error);
            }, "MideaWallet", "ecardBalance", []);
        });
		//美信钱包-通用插件-支付
        $("#walletCommonTradePay").click(function () {
			var datetime = new Date();
			var year = datetime.getFullYear();
			var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
			var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
			var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
			var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
			var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
            var out_trade_no = year+""+month+""+date+""+hour+""+minute+""+second;
			var payInfo = {
				"title": "通用插件-支付", //显示标题
				"amount": "0.01",//金额
				"tradeNo": out_trade_no,//交易单号
				"tradeType": 1,//交易类型：检验交易
			};
            cordova.exec(function (success) {
				alert("支付交易成功")
            }, function (error) {
                alert("Error: " + error.msg);
            }, "MideaWallet", "commonTrade", [payInfo]);
        });
		//美信钱包-通用插件-验证
        $("#walletCommonTradeCheck").click(function () {
			var datetime = new Date();
			var year = datetime.getFullYear();
			var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
			var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
			var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
			var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
			var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
            var out_trade_no = year+""+month+""+date+""+hour+""+minute+""+second;
			var payInfo = {
				"title": "通用插件-验证", //显示标题
				"amount": "0.01",//金额
				"tradeNo": out_trade_no,//交易单号
				"tradeType": 2,//交易类型：检验交易
			};
            cordova.exec(function (success) {
				alert("支付验证成功")
            }, function (error) {
                alert("Error: " + error);
            }, "MideaWallet", "commonTrade", [payInfo]);
        });

        $("#annto_updateIdentifyStatus").click(function () {
            //通过底座调用umeng的onevent方法 ，eventname为统计的事件名，模块ID不用自己写入
            cordova.exec(function (success) {
                alert(success);
            }, function (error) {
                alert("Error: " + error);
                //identify_status 0 未认证 1 已认证 2 认证中
            }, "MideaAnnto", "updateIdentifyStatus", ['2']);
        });

        $("#btn_vcard").click(function () {
            //通过底座调用umeng的onevent方法 ，eventname为统计的事件名，模块ID不用自己写入
            cordova.exec(function (success) {
                alert(success);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaUser", "vcard", ['lihj']);
        });
		
		$("#chat").click(function () {
            cordova.exec(function (success) {
                //alert(success);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "chat", ['liangyj3']);
        });

        $("#wifi_button").click(function () {
            cordova.exec(function (success) {
                alert(JSON.stringify(success));
            }, function (error) {
                alert("Error: " + error);
                //第一个为type  AC空调  其他编码非空调（参考编码对照表）  必须
                //第二个为sn码明文  必须
                //第三个ssid 可能没有，可缺省
            }, "MideaSale", "scanWifi", ['1111110000000000015109TT0001844']);
        });

        $("#sn_button").click(function () {
            cordova.exec(function (success) {

                    cordova.exec(function (success) {

                        navigator.notification.confirm(
                            '选择是否wifi模组',
                            function (buttonIndex) {
                                var wifi = (buttonIndex == 1);
                                cordova.exec(function (success) {
                                }, function (error) {
                                    alert("Error: " + error);
                                    //参数1：sn码
                                    //参数2：是否wifi模组
                                }, "MideaSale", "scanWifi", [success.sn, wifi]);
                            },
                            '提示',
                            ['是', '否']
                        );

                    }, function (error) {
                        alert("Error: " + error);
                        //传入扫描后的字符串
                    }, "MideaSale", "snDecode", [success.text]);
                },
                function (error) {
                    alert("error : " + error);
                }, "MideaBarcode", "scan", []);
        });

        $("#onEvent").click(function () {
            //通过底座调用umeng的onevent方法 ，eventname为统计的事件名，模块ID不用自己写入
            cordova.exec(function (success) {
                alert(success);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "onEvent", [
                {'key': 'event1', 'value': '测试样例1'},
                {'key': 'event2', 'value': '测试样例2'},
                {'key': 'event3', 'value': '测试样例3'},
                {'key': 'event4', 'value': '测试样例4'}
            ]);
        });

        $("#onEventJs").click(function () {
            //直接调用umeng.js的统计函数，com.midea.demo为统计模块的id（需要自己写入），eventname为统计的事件名
            onEvent('com.midea.demo', 'eventname');
        });

        //选择手机通讯录号码与人名
        $("#contact_button").click(function () {
            cordova.exec(function (success) {
                alert(JSON.stringify(success));
            }, function (error) {
                alert("Error: " + error);
            }, "MideaUser", "getContact", []);
        });

        //获取是否登陆
        $("#isLogin_button").click(function () {
            cordova.exec(function (success) {
                alert(JSON.stringify(success));
            }, function (error) {
                alert("Error: " + error);
            }, "MideaUser", "isLogin", []);
        });

        
        $("#h5LoginCallBack").click(function () {
            cordova.exec(function (success) {
                alert(JSON.stringify(success));
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "h5LoginCallBack", ["h5LoginCallBackName"]);
        });

        //跳转到登录页
        $("#toLogin_button").click(function () {
            cordova.exec(function (success) {
                alert(JSON.stringify(success));
            }, function (error) {
                alert("Error: " + error);
            }, "MideaUser", "toLogin", []);
        });

        //刷新页面数据
        $("#refresh_button").click(function () {
            cordova.exec(function (success) {
                alert(JSON.stringify(success));
            }, function (error) {
                alert("Error: " + error);
                //productList ：刷新产品列表
            }, "MideaHome", "refresh", ["productList"]);
        });

        $("#apk_button").click(function () {
            cordova.exec(function (success) {
                //true 有
                //false 没有
                alert(success);
            }, function (error) {
                alert("Error: " + error);
                //参数1 ： 包名的id
            }, "MideaCommon", "apk", ["com.midea.mlearning.in.test"]);
        });
        $("#showSetView").click(function () {
                               cordova.exec(function (success) {
                                            //true 有
                                            //false 没有
                                            alert(success);
                                            }, function (error) {
                                            alert("Error: " + error);
                                            }, "MideaCommon", "showSetView", []);
                               });
        $("#showMyView").click(function () {
            cordova.exec(function (success) {
                alert(success);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "showMyView", []);
        });

        $("#showAppView_msg").click(function () {
            cordova.exec(function (success) {
                alert(success);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "showAppView", ["messageView"]);
        });

        $("#showAppView_msg_list").click(function () {
            cordova.exec(function (success) {
                alert(success);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "showAppView", ["messageListView","com.midea.demo"]);
        });
		
        $("#showAppView").click(function () {
            cordova.exec(function (success) {
                alert(success);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "showAppView", ["aboutView"]);
        });
        $("#saveH5Info").click(function () {
            cordova.exec(function (success) {
                alert(success);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "saveH5Info", ["key","keyValue"]);
        });
          $("#getH5Info").click(function () {
            cordova.exec(function (success) {
                alert(success);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "getH5Info", ["key"]);
        });
		$("#getMessageUnread").click(function () {
            cordova.exec(function (unread) {
                alert("未读条数 " + unread);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "getMessageUnread", ["com.midea.demo"]);
        });
        $("#startApp_button").click(function () {
            cordova.exec(function (success) {
                alert(success);
            }, function (error) {
                alert("Error: " + error);
                //参数1 ： 包名的id
                //参数2： 该包名的appkey 用户传输密码密文
            }, "MideaCommon", "startApp", ["com.midea.maptest", "1779d8c8fd110fd5f7caf31652d82e8c"]);
        });

        $("#user_password").click(function () {
		   cordova.exec(function (password) {
				alert(password);
			}, function (error) {
				alert("Error: " + error);
			}, "MideaUser", "getUserPassword", []);
        });
        //==================  健康app ===================//
        $("#snsShare").click(function () {
                             cordova.exec(function (success) {
                                          alert(success);
                                          }, function (error) {
                                          alert("Error: " + error);
                                          }, "SnsShare", "share", ["key"]);
                             });
        $("#snsLoginqq").click(function () {
                             cordova.exec(function (success) {
                                          alert(success);
                                          }, function (error) {
                                          alert("Error: " + error);
                                          }, "SnsLogin", "snsLogin", ["qq"]);
                             });
        $("#snsLoginwx").click(function () {
                             cordova.exec(function (success) {
                                          alert(success);
                                          }, function (error) {
                                          alert("Error: " + error);
                                          }, "SnsLogin", "snsLogin", ["wechat"]);
                             });
		
		//==================  安得直通宝插件开始 ===================//
		$("#annto_alipay").click(function () {
			var datetime = new Date();
			var year = datetime.getFullYear();
			var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
			var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
			var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
			var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
			var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
            var out_trade_no = year+""+month+""+date+"-"+hour+""+minute+""+second;
			var subject = "订单" + out_trade_no + "运输费用";
			var payInfo = {
				"out_trade_no": out_trade_no, //商户网站唯一订单号
				"subject": subject,//商品名称
				"body": "2015-07-20日产生的运费",//商品详情
				"total_fee": "0.01",//商品金额
			};
		   cordova.exec(function () {
				alert("成功");
			}, function (error) {
				alert("Error: " + error);
			}, "MideaAnnto", "alipay", [payInfo]);
        });

		$("#annto_anth").click(function () {
		   alert("即将跳转个人货主认证页面（参数1表示司机认证，参数2表示个人货主认证，参数3表示企业货主认证）");
		   cordova.exec(function () {
				alert("成功");
			}, function (error) {
				alert("Error: " + error);
			}, "MideaAnnto", "authenticationPage", ["2"]);
        });

		$("#annto_update_pwd").click(function () {
		   cordova.exec(function (password) {
				alert("成功");
			}, function (error) {
				alert("Error: " + error);
			}, "MideaAnnto", "updateUserPassword", ["123456"]);
        });

		$("#annto_pwd_encypt").click(function () {
		   cordova.exec(function (encyptPassword) {
				alert(encyptPassword);
			}, function (error) {
				alert("Error: " + error);
			}, "MideaAnnto", "encyptUserPassword", ["123456"]);
        });

		$("#annto_share").click(function () {
			var shareContent = {
				"title": "直通宝分享邀请码", //分享标题
				"content": "直通宝邀请好友有机会得到本田杰德轿车大奖，请前往http://ztbapp.annto.com.cn/下载最新APP",//分享内容
				"targetUrl": "http://ztbapp.annto.com.cn/"//分享跳转地址
			};
		   cordova.exec(function (success) {
				alert("分享成功");
			}, function (error) {
				alert("Error: " + error);
			}, "MideaAnnto", "share", [shareContent]);
        });
		$("#annto_get_sign").click(function () {
		   var params = "idCard=360481198108014016&name=周峰大神";
		   alert("加密的参数为：" + params);
		   cordova.exec(function (success) {
				alert("加密成功：" + success);
			}, function (error) {
				alert("Error: " + error.msg);
			}, "MideaAnnto", "getSign", [params]);
        });
		$("#annto_allinpay").click(function () {
		   	var datetime = new Date();
			var year = datetime.getFullYear();
			var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
			var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
			var hour = datetime.getHours()< 10 ? "0" + datetime.getHours() : datetime.getHours();
			var minute = datetime.getMinutes()< 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
			var second = datetime.getSeconds()< 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
            var out_trade_no = year+""+month+""+date+""+hour+""+minute+""+second;
			var subject = "订单" + out_trade_no + "运输费用";
			var payInfo = {
				"out_trade_no": out_trade_no + "001", //商户网站唯一订单号
				"subject": subject,//商品名称
				"body": "2015-09-01日产生的运费",//商品详情
				"total_fee": "0.01",//商品金额
				"orderDatetime": out_trade_no//订单创建时间
			};
		   cordova.exec(function (success) {
			   if(success.result){
			      alert("支付成功");
			   }else{
			      alert(success.msg);
			   }
			}, function (error) {
				alert(error.msg);
			}, "MideaAnnto", "allinpay", [payInfo]);
        });
		//==================  安得直通宝插件结束 ===================//

        $("#showInput").click(function () {
            cordova.exec(function (success) {
                alert(success);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "showInput", []);
        });

        $("#hideInput").click(function () {
            cordova.exec(function (success) {
                alert(success);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "hideInput", []);
        });

        $("#toggleInput").click(function () {
            cordova.exec(function (success) {
                alert(success);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaCommon", "toggleInput", []);
        });

		//==================  美信对外版插件开始 ===================//
        $("#out_withdraw_page").click(function () {
            cordova.exec(function (success) {
                alert(success);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaOut", "withdrawPage", []);
        });
		$("#out_feedback_page").click(function () {
            cordova.exec(function (success) {
                alert(success);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaOut", "feedbackPage", []);
        });
		$("#out_bank_card_page").click(function () {
            cordova.exec(function (success) {
                alert(success);
            }, function (error) {
                alert("Error: " + error);
            }, "MideaOut", "bankCardListPage", []);
        });
		//==================  美信对外版插件开结束 ===================//
	    $("remoteRequest").click(function () {
            window.location="http://119.29.52.77:88/cordova/index.html"
        });
    }
};