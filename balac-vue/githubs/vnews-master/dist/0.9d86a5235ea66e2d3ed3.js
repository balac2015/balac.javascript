webpackJsonp([0],{

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = createListView;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ItemList_vue__ = __webpack_require__(66);


var camelize = function camelize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// This is a factory function for dynamically creating root-level list views,
// since they share most of the logic except for the type of items to display.
// They are essentially higher order components wrapping ItemList.vue.
function createListView(type) {
  return {
    name: type + '-view',

    asyncData: function asyncData(_ref) {
      var store = _ref.store;

      return store.dispatch('FETCH_LIST_DATA', { type: type });
    },


    title: camelize(type),

    render: function render(h) {
      return h(__WEBPACK_IMPORTED_MODULE_0__ItemList_vue__["a" /* default */], { props: { type: type } });
    }
  };
}

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Item_vue__ = __webpack_require__(69);
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



/* harmony default export */ __webpack_exports__["a"] = ({
    name: 'item-list',

    components: {
        Item: __WEBPACK_IMPORTED_MODULE_0__components_Item_vue__["a" /* default */]
    },

    props: {
        type: String
    },

    data: function data() {
        var currentTypeItems = this.$store.state.lists[this.type];
        return {
            transition: 'slide-right',
            displayedPage: Number(this.$route.params.page) || 1,
            displayedItems: currentTypeItems.entrylist
        };
    },

    computed: {
        prevDisabled: function prevDisabled() {
            return this.rankIndex.length <= 1;
        },
        rankIndex: function rankIndex() {
            return this.$store.state.rankIndex[this.type];
        }
    },

    methods: {
        next: function next() {
            var _this = this;

            this.$bar.start();
            var displayedItemsLength = this.displayedItems.length;
            var lastDisplayItem = this.displayedItems[displayedItemsLength - 1];
            var before = lastDisplayItem && lastDisplayItem.rankIndex || undefined;
            console.log('before...', before);
            this.$store.dispatch('FETCH_LIST_DATA', {
                type: this.type,
                index: before,
                action: 'next'
            }).then(function () {
                var currentTypeItems = _this.$store.state.lists[_this.type];
                _this.transition = 'slide-right';
                _this.displayedItems = currentTypeItems.entrylist;
                _this.$bar.finish();
            });
        },
        prev: function prev() {
            var _this2 = this;

            this.$bar.start();
            var rankIndexList = this.rankIndex;
            var before = rankIndexList[rankIndexList.length - 2] || undefined;
            this.$store.dispatch('FETCH_LIST_DATA', {
                type: this.type,
                index: before,
                action: 'prev'
            }).then(function () {
                var currentTypeItems = _this2.$store.state.lists[_this2.type];
                _this2.transition = 'slide-left';
                _this2.displayedItems = currentTypeItems.entrylist;
                _this2.$bar.finish();
            });
        }
    }
});

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_filters__ = __webpack_require__(16);
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



/* harmony default export */ __webpack_exports__["a"] = ({
  name: 'news-item',
  props: ['item'],
  // http://ssr.vuejs.org/en/caching.html#component-level-caching
  serverCacheKey: function serverCacheKey(_ref) {
    var _ref$item = _ref.item,
        id = _ref$item.id,
        __lastUpdated = _ref$item.__lastUpdated,
        time = _ref$item.time;

    return id + '::' + __lastUpdated + '::' + Object(__WEBPACK_IMPORTED_MODULE_0__util_filters__["timeAgo"])(time);
  }
});

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_13_7_2_vue_loader_lib_selector_type_script_index_0_ItemList_vue__ = __webpack_require__(64);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_13_7_2_vue_loader_lib_template_compiler_index_id_data_v_84cf98b6_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_13_7_2_vue_loader_lib_selector_type_template_index_0_ItemList_vue__ = __webpack_require__(73);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(67)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_13_7_2_vue_loader_lib_selector_type_script_index_0_ItemList_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_13_7_2_vue_loader_lib_template_compiler_index_id_data_v_84cf98b6_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_13_7_2_vue_loader_lib_selector_type_template_index_0_ItemList_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\views\\ItemList.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-84cf98b6", Component.options)
  } else {
    hotAPI.reload("data-v-84cf98b6", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(68);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("62cb738b", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/.0.28.11@css-loader/index.js?sourceMap!../../node_modules/.13.7.2@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-84cf98b6\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/.3.0.2@stylus-loader/index.js!../../node_modules/.13.7.2@vue-loader/lib/selector.js?type=styles&index=0!./ItemList.vue", function() {
     var newContent = require("!!../../node_modules/.0.28.11@css-loader/index.js?sourceMap!../../node_modules/.13.7.2@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-84cf98b6\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/.3.0.2@stylus-loader/index.js!../../node_modules/.13.7.2@vue-loader/lib/selector.js?type=styles&index=0!./ItemList.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(true);
// imports


// module
exports.push([module.i, "\na {\n  cursor: pointer;\n}\n.disabled {\n  pointer-events: none;\n}\n.news-view {\n  padding-top: 45px;\n}\n.news-list-nav,\n.news-list {\n  background-color: #fff;\n  border-radius: 2px;\n}\n.news-list-nav {\n  padding: 15px 30px;\n  position: fixed;\n  text-align: center;\n  top: 55px;\n  left: 0;\n  right: 0;\n  z-index: 998;\n  -webkit-box-shadow: 0 1px 2px rgba(0,0,0,0.1);\n          box-shadow: 0 1px 2px rgba(0,0,0,0.1);\n}\n.news-list-nav a {\n  margin: 0 1em;\n}\n.news-list-nav .disabled {\n  color: #ccc;\n}\n.news-list {\n  position: absolute;\n  margin: 30px 0;\n  width: 100%;\n  -webkit-transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);\n  -o-transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);\n  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);\n}\n.news-list ul {\n  list-style-type: none;\n  padding: 0;\n  margin: 0;\n}\n.slide-left-enter,\n.slide-right-leave-to {\n  opacity: 0;\n  -webkit-transform: translate(30px, 0);\n      -ms-transform: translate(30px, 0);\n          transform: translate(30px, 0);\n}\n.slide-left-leave-to,\n.slide-right-enter {\n  opacity: 0;\n  -webkit-transform: translate(-30px, 0);\n      -ms-transform: translate(-30px, 0);\n          transform: translate(-30px, 0);\n}\n.item-move,\n.item-enter-active,\n.item-leave-active {\n  -webkit-transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);\n  -o-transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);\n  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);\n}\n.item-enter {\n  opacity: 0;\n  -webkit-transform: translate(30px, 0);\n      -ms-transform: translate(30px, 0);\n          transform: translate(30px, 0);\n}\n.item-leave-active {\n  position: absolute;\n  opacity: 0;\n  -webkit-transform: translate(30px, 0);\n      -ms-transform: translate(30px, 0);\n          transform: translate(30px, 0);\n}\n@media (max-width: 600px) {\n.news-list {\n    margin: 10px 0;\n}\n}\n", "", {"version":3,"sources":["D:/balac-vue/githubs/vnews-master/src/views/src/views/ItemList.vue","D:/balac-vue/githubs/vnews-master/src/views/ItemList.vue"],"names":[],"mappings":";AAsFA;EACI,gBAAA;CCrFH;ADsFD;EACI,qBAAA;CCpFH;ADqFD;EACI,kBAAA;CCnFH;ADqFD;;EACI,uBAAA;EACA,mBAAA;CClFH;ADoFD;EACI,mBAAA;EACA,gBAAA;EACA,mBAAA;EACA,UAAA;EACA,QAAA;EACA,SAAA;EACA,aAAA;EACA,8CAAA;UAAA,sCAAA;CClFH;ADmFG;EACI,cAAA;CCjFP;ADkFG;EACI,YAAA;CChFP;ADkFD;EACI,mBAAA;EACA,eAAA;EACA,YAAA;EACA,2DAAA;EAAA,sDAAA;EAAA,mDAAA;CChFH;ADiFG;EACI,sBAAA;EACA,WAAA;EACA,UAAA;CC/EP;ADiFD;;EACI,WAAA;EACA,sCAAA;MAAA,kCAAA;UAAA,8BAAA;CC9EH;ADgFD;;EACI,WAAA;EACA,uCAAA;MAAA,mCAAA;UAAA,+BAAA;CC7EH;AD+ED;;;EACI,2DAAA;EAAA,sDAAA;EAAA,mDAAA;CC3EH;AD6ED;EACI,WAAA;EACA,sCAAA;MAAA,kCAAA;UAAA,8BAAA;CC3EH;AD6ED;EACI,mBAAA;EACA,WAAA;EACA,sCAAA;MAAA,kCAAA;UAAA,8BAAA;CC3EH;AD6EsB;AACnB;IACI,eAAA;CC3EL;CACF","file":"ItemList.vue","sourcesContent":["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\na\n    cursor pointer\n.disabled\n    pointer-events none\n.news-view\n    padding-top 45px\n\n.news-list-nav, .news-list\n    background-color #fff\n    border-radius 2px\n\n.news-list-nav\n    padding 15px 30px\n    position fixed\n    text-align center\n    top 55px\n    left 0\n    right 0\n    z-index 998\n    box-shadow 0 1px 2px rgba(0, 0, 0, .1)\n    a\n        margin 0 1em\n    .disabled\n        color #ccc\n\n.news-list\n    position absolute\n    margin 30px 0\n    width 100%\n    transition all .5s cubic-bezier(.55, 0, .1, 1)\n    ul\n        list-style-type none\n        padding 0\n        margin 0\n\n.slide-left-enter, .slide-right-leave-to\n    opacity 0\n    transform translate(30px, 0)\n\n.slide-left-leave-to, .slide-right-enter\n    opacity 0\n    transform translate(-30px, 0)\n\n.item-move, .item-enter-active, .item-leave-active\n    transition all .5s cubic-bezier(.55, 0, .1, 1)\n\n.item-enter\n    opacity 0\n    transform translate(30px, 0)\n\n.item-leave-active\n    position absolute\n    opacity 0\n    transform translate(30px, 0)\n\n@media (max-width 600px)\n    .news-list\n        margin 10px 0\n","a {\n  cursor: pointer;\n}\n.disabled {\n  pointer-events: none;\n}\n.news-view {\n  padding-top: 45px;\n}\n.news-list-nav,\n.news-list {\n  background-color: #fff;\n  border-radius: 2px;\n}\n.news-list-nav {\n  padding: 15px 30px;\n  position: fixed;\n  text-align: center;\n  top: 55px;\n  left: 0;\n  right: 0;\n  z-index: 998;\n  box-shadow: 0 1px 2px rgba(0,0,0,0.1);\n}\n.news-list-nav a {\n  margin: 0 1em;\n}\n.news-list-nav .disabled {\n  color: #ccc;\n}\n.news-list {\n  position: absolute;\n  margin: 30px 0;\n  width: 100%;\n  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);\n}\n.news-list ul {\n  list-style-type: none;\n  padding: 0;\n  margin: 0;\n}\n.slide-left-enter,\n.slide-right-leave-to {\n  opacity: 0;\n  transform: translate(30px, 0);\n}\n.slide-left-leave-to,\n.slide-right-enter {\n  opacity: 0;\n  transform: translate(-30px, 0);\n}\n.item-move,\n.item-enter-active,\n.item-leave-active {\n  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);\n}\n.item-enter {\n  opacity: 0;\n  transform: translate(30px, 0);\n}\n.item-leave-active {\n  position: absolute;\n  opacity: 0;\n  transform: translate(30px, 0);\n}\n@media (max-width: 600px) {\n  .news-list {\n    margin: 10px 0;\n  }\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_13_7_2_vue_loader_lib_selector_type_script_index_0_Item_vue__ = __webpack_require__(65);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_13_7_2_vue_loader_lib_template_compiler_index_id_data_v_387ed0ba_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_13_7_2_vue_loader_lib_selector_type_template_index_0_Item_vue__ = __webpack_require__(72);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(70)
}
var normalizeComponent = __webpack_require__(8)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_13_7_2_vue_loader_lib_selector_type_script_index_0_Item_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_13_7_2_vue_loader_lib_template_compiler_index_id_data_v_387ed0ba_hasScoped_false_preserveWhitespace_false_buble_transforms_node_modules_13_7_2_vue_loader_lib_selector_type_template_index_0_Item_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\components\\Item.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-387ed0ba", Component.options)
  } else {
    hotAPI.reload("data-v-387ed0ba", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),

/***/ 70:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(71);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(7)("462684d3", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/.0.28.11@css-loader/index.js?sourceMap!../../node_modules/.13.7.2@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-387ed0ba\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/.3.0.2@stylus-loader/index.js!../../node_modules/.13.7.2@vue-loader/lib/selector.js?type=styles&index=0!./Item.vue", function() {
     var newContent = require("!!../../node_modules/.0.28.11@css-loader/index.js?sourceMap!../../node_modules/.13.7.2@vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-387ed0ba\",\"scoped\":false,\"hasInlineConfig\":true}!../../node_modules/.3.0.2@stylus-loader/index.js!../../node_modules/.13.7.2@vue-loader/lib/selector.js?type=styles&index=0!./Item.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(6)(true);
// imports


// module
exports.push([module.i, "\n.news-item {\n  background-color: #fff;\n  padding: 20px 30px 20px;\n  border-bottom: 1px solid #eee;\n  position: relative;\n  line-height: 20px;\n}\n.news-item .title {\n  font-weight: 700;\n}\n.news-item .meta,\n.news-item .host {\n  font-size: 0.85em;\n  color: #828282;\n}\n.news-item .meta .tag,\n.news-item .host .tag {\n  border: 1px solid #828282;\n  border-radius: 2px;\n  margin-right: 10px;\n}\n.news-item .meta a,\n.news-item .host a {\n  color: #828282;\n  text-decoration: underline;\n}\n.news-item .meta a:hover,\n.news-item .host a:hover {\n  color: #f60;\n}\n", "", {"version":3,"sources":["D:/balac-vue/githubs/vnews-master/src/components/src/components/Item.vue","D:/balac-vue/githubs/vnews-master/src/components/Item.vue"],"names":[],"mappings":";AA6BA;EACE,uBAAA;EACA,wBAAA;EACA,8BAAA;EACA,mBAAA;EACA,kBAAA;CC5BD;AD6BC;EACE,iBAAA;CC3BH;AD4BC;;EACE,kBAAA;EACA,eAAA;CCzBH;AD0BG;;EACE,0BAAA;EACA,mBAAA;EACA,mBAAA;CCvBL;ADwBG;;EACE,eAAA;EACA,2BAAA;CCrBL;ADsBK;;EACE,YAAA;CCnBP","file":"Item.vue","sourcesContent":["\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.news-item\n  background-color #fff\n  padding 20px 30px 20px\n  border-bottom 1px solid #eee\n  position relative\n  line-height 20px\n  .title\n    font-weight 700\n  .meta, .host\n    font-size .85em\n    color #828282\n    .tag\n      border 1px solid #828282\n      border-radius 2px\n      margin-right 10px\n    a\n      color #828282\n      text-decoration underline\n      &:hover\n        color #ff6600\n",".news-item {\n  background-color: #fff;\n  padding: 20px 30px 20px;\n  border-bottom: 1px solid #eee;\n  position: relative;\n  line-height: 20px;\n}\n.news-item .title {\n  font-weight: 700;\n}\n.news-item .meta,\n.news-item .host {\n  font-size: 0.85em;\n  color: #828282;\n}\n.news-item .meta .tag,\n.news-item .host .tag {\n  border: 1px solid #828282;\n  border-radius: 2px;\n  margin-right: 10px;\n}\n.news-item .meta a,\n.news-item .host a {\n  color: #828282;\n  text-decoration: underline;\n}\n.news-item .meta a:hover,\n.news-item .host a:hover {\n  color: #f60;\n}\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 72:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("li", { staticClass: "news-item" }, [
    _c("span", { staticClass: "title" }, [
      _c(
        "a",
        {
          attrs: {
            href: _vm.item.originalUrl,
            target: "_blank",
            rel: "noopener"
          }
        },
        [_vm._v(_vm._s(_vm.item.title))]
      )
    ]),
    _c("br"),
    _c("span", { staticClass: "meta" }, [
      _c("span", [
        _vm._v(
          "\n      " +
            _vm._s(_vm.item.collectionCount) +
            "收藏 | " +
            _vm._s(_vm.item.commentsCount) +
            "评论\n    "
        )
      ])
    ]),
    _c("p", [_vm._v(_vm._s(_vm.item.content))])
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-387ed0ba", esExports)
  }
}

/***/ }),

/***/ 73:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "news-view" },
    [
      _c("transition", { attrs: { name: _vm.transition } }, [
        _vm.displayedPage > 0
          ? _c(
              "div",
              { key: _vm.displayedPage, staticClass: "news-list" },
              [
                _c(
                  "transition-group",
                  { attrs: { tag: "ul", name: "item" } },
                  _vm._l(_vm.displayedItems, function(item) {
                    return _c("item", {
                      key: item.objectId,
                      attrs: { item: item }
                    })
                  })
                )
              ],
              1
            )
          : _vm._e()
      ]),
      _c("div", { staticClass: "news-list-nav" }, [
        _c(
          "a",
          { class: { disabled: _vm.prevDisabled }, on: { click: _vm.prev } },
          [_vm._v("< prev")]
        ),
        _c("a", { on: { click: _vm.next } }, [_vm._v("next >")])
      ])
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-84cf98b6", esExports)
  }
}

/***/ })

});
//# sourceMappingURL=0.9d86a5235ea66e2d3ed3.js.map