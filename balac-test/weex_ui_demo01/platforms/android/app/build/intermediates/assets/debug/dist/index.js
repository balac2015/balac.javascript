// { "framework": "Vue"} 

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 23);
/******/ })
/************************************************************************/
/******/ ({

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(24)
)

/* script */
__vue_exports__ = __webpack_require__(25)

/* template */
var __vue_template__ = __webpack_require__(26)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "E:\\my-test\\weex_ui_demo01\\src\\index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-8a1340be"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__
module.exports.el = 'true'
new Vue(module.exports)


/***/ }),

/***/ 24:
/***/ (function(module, exports) {

module.exports = {
  "wrapper": {
    "justifyContent": "center",
    "alignItems": "center"
  },
  "logo": {
    "width": "145",
    "height": "49"
  },
  "form-box": {
    "justifyContent": "space-between",
    "borderBottomWidth": "2",
    "borderStyle": "solid",
    "borderColor": "#41b883"
  },
  "btn-submit": {
    "width": "500",
    "paddingTop": "20",
    "paddingRight": 0,
    "paddingBottom": "20",
    "paddingLeft": 0,
    "marginTop": "98",
    "marginRight": 10,
    "marginBottom": 0,
    "marginLeft": 10,
    "textAlign": "center",
    "borderWidth": "2",
    "borderStyle": "solid",
    "borderColor": "#41b883"
  }
}

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var modal = weex.requireModule('modal');
var navigator = weex.requireModule('navigator');
var stream = weex.requireModule('stream');
exports.default = {
    data: function data() {
        return {
            logo: 'http://erdpsit.e-lead.cn//static/images/logo.jpg',
            user: '',
            password: ''
        };
    },

    methods: {
        login: function login() {
            var param = 'rememberMe=true';

            if (!this.user) {
                return modal.toast({
                    message: '没有输入用户名',
                    duration: 0.5
                });
            }
            param += '&userName=' + this.user;

            if (!this.password) {
                return modal.toast({
                    message: '没有输入密码',
                    duration: 0.5
                });
            }
            param += '&password=' + this.password;

            stream.fetch({
                method: 'POST',
                type: 'json',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: param,
                url: 'http://erdpsit.e-lead.cn/passport/v1/login'
            }, function (res) {
                if (res.ok) {
                    navigator.push({
                        url: 'http://192.168.2.35:8080/pages/profile/index.js',
                        animated: 'true'
                    });
                }
            });
        }
    }
};

/***/ }),

/***/ 26:
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('image', {
    staticClass: ["logo"],
    attrs: {
      "src": _vm.logo
    }
  }), _c('div', {
    staticClass: ["login-form"]
  }, [_c('div', {
    staticClass: ["form-box"]
  }, [_c('input', {
    staticClass: ["form-control"],
    attrs: {
      "type": "text",
      "placeholder": "登录名",
      "value": (_vm.user)
    },
    on: {
      "input": function($event) {
        _vm.user = $event.target.attr.value
      }
    }
  })]), _c('div', {
    staticClass: ["form-box"]
  }, [_c('input', {
    staticClass: ["form-control"],
    attrs: {
      "type": "password",
      "placeholder": "密码",
      "value": (_vm.password)
    },
    on: {
      "input": function($event) {
        _vm.password = $event.target.attr.value
      }
    }
  })]), _c('div', {
    staticClass: ["btn-submit"],
    on: {
      "click": _vm.login
    }
  }, [_c('text', [_vm._v("登录")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })

/******/ });