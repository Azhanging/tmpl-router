//Tmpl 文件入口
import TmplRouter from './tmpl-router/tmpl-router';

(function(global, factory) {
    if(typeof _require === 'function') {
        _require.defineId('tmpl-router', factory);
    }
})(typeof window !== 'undefined' ? window : this, function() {

    TmplRouter.version = "v1.0.3";

    return TmplRouter;
});