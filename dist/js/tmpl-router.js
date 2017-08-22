/*!
 * 
 * 			tmpl-router.js v1.0.2
 * 			(c) 2016-2017 Blue
 * 			Released under the MIT License.
 * 			https://github.com/azhanging/tmpl-router
 * 
 * 		
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("TmplRourt", [], factory);
	else if(typeof exports === 'object')
		exports["TmplRourt"] = factory();
	else
		root["TmplRourt"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	__webpack_require__.p = "./dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*默认配置*/
var config = {
        routerLink: 'tmpl-router', //.tmpl-router                       
        routerLinkActive: 'tmpl-router-active', //.tmpl-router-active
        routerView: 'tmpl-router-view', //#tmpl-router-view
        routerAnchor: 'tmpl-router-anchor', //锚点用的class
        anchorTime: 1000, //默认锚点路由 1000/17
        data: {},
        methods: {}
};

var _Tmpl = null,
    tmpl = null,
    fn = null,
    lastRouter = null;

var TmplRouter = function () {
        function TmplRouter(opts) {
                _classCallCheck(this, TmplRouter);

                if (window.hasTmplRouter) return {};

                this.init(opts);
        }

        //安装插件


        _createClass(TmplRouter, null, [{
                key: 'install',
                value: function install(Tmpl) {

                        if (this.installed) return this;

                        this.installed = true;

                        _Tmpl = Tmpl;

                        tmpl = new _Tmpl({});

                        fn = tmpl.fn;
                }
        }]);

        return TmplRouter;
}();

//查看是否在全部中存在插件E


if (window.Tmpl && typeof Tmpl === 'function') {
        TmplRouter.install(Tmpl);
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; //Tmpl 文件入口


var _tmplRouter = __webpack_require__(0);

var _tmplRouter2 = _interopRequireDefault(_tmplRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function (global, factory) {
    if (typeof _require === 'function') {
        _require.defineId('tmpl-router', factory);
    } else if (( false ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else {
        global ? global.TmplRouter = factory() : {};
    }
})(typeof window !== 'undefined' ? window : undefined, function () {

    _tmplRouter2.default.version = "v1.0.3";

    return _tmplRouter2.default;
});

/***/ })
/******/ ]);
});