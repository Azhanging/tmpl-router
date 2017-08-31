//初始化
import init from './init';
//hashChange
import hashChange from './hash-change';
//动态加载模板
import getTmpl from './get-tmpl';

/*
 * 路由构造
 * 
 * */
class TmplRouter {
	constructor(opts) {
		//如果已经实例化了一次，直接返回实例化的路由
		if(this.constructor.hasTmplRouter) {
			return this.constructor.tmplRouter;
		};
		this.init(opts);
	}

	//安装插件
	static install(Tmpl) {

		//检查是否安装过路由了
		if(this.installed) {
			return this;
		}

		this.installed = true;

		this.tmpl = new Tmpl({});

		this.fn = this.tmpl.fn;
	}

	init(opts) {
		init.call(this, opts)
	}

	/*设置路由路径*/
	set(routerOpts) {
		const fn = this.constructor.fn;
		if(fn.isObj(routerOpts)) {
			fn.each(routerOpts, (opt, key) => {
				this.router[key] = opt;
			});
		}
		//设置路由配置
		setPaths.call(this, routerOpts);
		return this;
	}

	//hash改变调用
	hashChange() {
		hashChange.call(this);
	}

	go(page) {
		const fn = this.constructor.fn;
		if(fn.isNum(page)) history.go(page);
	}

	redirect(hash) {
		hash = hash.replace('#', '');
		const href = location.href.split('#');
		if(hash === '/') {
			location.href = href[0];
		} else {
			href[1] = hash;
			location.href = href.join('#');
		}
	}

	/*获取模板*/
	getTmpl(hash) {
		getTmpl.call(this, hash);
	}

	/*返回参数对象*/
	query(searchs) {
		const fn = this.constructor.fn;
		if(!fn.isStr(searchs)) return {};
		const query = {},
			search = searchs.split('&');
		fn.each(search, function(_search, index) {
			var temp = _search.split('=');
			if(temp.length !== 1) {
				var key = temp[0];
				var value = temp[1];
				query[key] = value;
			}
		});
		return query;
	}

	/*获取|设置hash-url参数*/
	search(el, search) {

		const fn = this.constructor.fn,
			tmpl = this.constructor.tmpl;

		let path = '';

		try {
			path = tmpl.attr(el, 'href').split('?');
		} catch(e) {
			path = el.split('?');
		}

		if(search) {
			if(fn.isObj(search)) {
				search = fn.serialize(search);
			}
			path[1] = search;
			tmpl.attr(el, {
				href: path.join('?')
			});
		} else {
			return path[1];
		}
	}

	/*分离hash和hash-search，只取hash*/
	getHash(hash) {
		if(hash === undefined) {
			hash = window.location.hash.replace('#', '');
		}
		const path = hash.replace('#', '').split('?');
		return path[0];
	}

	/* 修改路由link的点击的状态 */
	changeRoutereStatus(status) {
		this.routerStatus = status;
	}
}

//查看是否在全局中存在插件
if(window.Tmpl && typeof Tmpl === 'function') {
	TmplRouter.install(Tmpl);
}

export default TmplRouter;