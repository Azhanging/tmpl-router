
/*默认配置*/
const config = {
	routerLink: 'tmpl-router', //.tmpl-router                       
	routerLinkActive: 'tmpl-router-active', //.tmpl-router-active
	routerView: 'tmpl-router-view', //#tmpl-router-view
	routerAnchor: 'tmpl-router-anchor', //锚点用的class
	anchorTime: 1000, //默认锚点路由 1000/17
	data: {},
	methods: {}
};

let _Tmpl = null,
	tmpl = null,
	fn = null,
	lastRouter = null;
	
class TmplRouter{
    constructor(opts){        
        if(window.hasTmplRouter) return {};

        this.init(opts);
    }
    
    //安装插件
    static install(Tmpl){
        
        if(this.installed) return this;

        this.installed = true;

        _Tmpl = Tmpl;

        tmpl = new _Tmpl({});

        fn = tmpl.fn;
        
    }
}

//查看是否在全部中存在插件E
if(window.Tmpl && typeof Tmpl === 'function') {
    TmplRouter.install(Tmpl);
}