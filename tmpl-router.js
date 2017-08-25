/*!
 * 
 *          tmpl-router.js v1.0.1
 *          (c) 2016-2017 Blue
 *          https://github.com/azhanging/tmpl
 *          Released under the MIT License.
 *      
 */

(function(global, factory) {
	if(typeof _require === 'function') {
		_require.defineId('tmpl-router', factory);
	} else if(typeof exports === 'object' && typeof module === 'object') {
		module.exports = factory();
	} else if(typeof define === 'function' && define.amd) {
		define("tmpl-router", [], factory);
	} else {
		(global ? (global.TmplRouter = factory()) : {});
	}
})(typeof window !== 'undefined' ? window : this, function() {

	

	

	

	

	

	

	

	

	

	

	
});