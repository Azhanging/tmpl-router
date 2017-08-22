//Tmpl 文件入口
import TmplRouter from './tmpl-router/tmpl-router';

(function(global, factory) {
    if(typeof _require === 'function') {
        _require.defineId('tmpl-router', factory);
    } else if(typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
    } else {
        (global ? (global.TmplRouter = factory()) : {});
    }
})(typeof window !== 'undefined' ? window : this, function() {

    TmplRouter.version = "v1.0.3";

    return TmplRouter;
});