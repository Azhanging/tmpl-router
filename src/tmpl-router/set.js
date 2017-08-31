//设置路由的路径
export function setRouter(routers, path) {

	const fn = this.constructor.fn,
		_path = (path ? path : '');

	fn.each(routers, (router, key) => {
		if(fn.isObj(router.modules)) {
			setRouter.apply(this, [router.modules, _path + key]);
		}
		this.router[_path + key] = router;
		delete router['modules'];
	});
}

//设置data和methods方法
export function setInstance(type) {

	const fn = this.constructor.fn,
		get = this.config[type];

	if(!fn.isObj(get)) {
		return;
	}

	fn.each(get, (_get, key) => {
		this[key] = _get;
	});
}

/*设置路由的状态是够允许跳转*/
export function setRouterLinkStatus() {

	const fn = this.constructor.fn;

	const tmpl = this.constructor.tmpl;

	this.changeRoutereStatus(true);

	const routerBtns = fn.getEls(this.config.routerLink); //获取路由绑定的节点

	fn.each(routerBtns, (routerBtn, index) => {
		fn.on(routerBtn, 'click', (event) => {
			const path = tmpl.attr(routerBtn, 'href'),
				hash = this.getHash(path);
			if(!(this.lastRouter === hash)){				
				//点击路由链接触发的钩子
				fn.run(this.config.triggerRouter, this, [path, routerBtn]);
			}
			if(!this.routerStatus) {
				event.preventDefault();
			}
		});
	});
}

/*设置路由的锚点形式*/
export function setRouterAnchor(time) {
	const fn = this.constructor.fn,
		tmpl = this.constructor.tmpl;

	function stopScroll(event) {
		event.preventDefault();
	}

	//获取路由绑定的节点
	tmpl.on(document, this.config.routerAnchor, 'click', (event, el) => {

		const anchorId = tmpl.attr(el, this.config.routerAnchorAttr),
			anchorEl = fn.getEl(anchorId);

		let anchorOffsetTop = tmpl.attr(el, this.config.routerAnchorTop);

		anchorOffsetTop = fn.isNum(anchorOffsetTop) ? Number(anchorOffsetTop) : 0;

		if(fn.isEl(anchorEl)) {
			//定义滑动阻止默认动作
			window.addEventListener('mousewheel', stopScroll);

			tmpl.animate(document, {
				'scrollTop': tmpl.offset(anchorEl).top + anchorOffsetTop
			}, time, function() {
				window.removeEventListener('mousewheel', stopScroll);
			});
		}
	});
}

/*设置保持状态*/
export function setkeepLive() {
	const fn = this.constructor.fn;
	if(!this.config.keepLive) return;
	fn.on(window, 'scroll', (event) => {
		if(this.router[this.currentRouter] && this.router[this.currentRouter]['keepLive']) {
			this.router[this.currentRouter]['scrollTop'] = document.body.scrollTop || document.documentElement.scrollTop;
		}
	});
}

//初始处理路由信息
export function setPaths(routes) {

	const fn = this.constructor.fn;

	this.alias = {};

	fn.each(routes, (router, path) => {

		const alias = router.alias;

		this.router[path]['view'] = []; //设置视图节点

		//如果设置了全局的keepLive，就会默认设置保持节点为true,全局设定状态的时候是支持保持状态的
		if(this.config.keepLive && this.router[path]['keepLive'] === undefined) {
			this.router[path]['keepLive'] = true;
		}

		this.router[path]['temp'] = document.createDocumentFragment(); //设置临时存放节点

		//存在别名
		if(alias) {
			this.alias[alias] = path;
		}
	});
}

//设置hash
export function setHashEvent() {

	const tmpl = this.constructor.tmpl;

	if(!this.constructor.hasTmplRouter) {
		//修改hash时触发修改
		window.onhashchange = (event) => {
			this.hashChange();
			tmpl.preventDefault(event);
		}
		this.constructor.hasTmplRouter = true;
	}
}