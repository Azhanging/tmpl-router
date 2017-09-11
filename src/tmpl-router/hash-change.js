/*
 *	路由中的hash方法处理
 * */
export default function protoHashChange() {

	const fn = this.constructor.fn;

	const path = window.location.hash.replace('#', '');

	let hash = this.getHash(path); //获取hash

	const routerBtns = fn.getEls(this.config.routerLink); //获取路由绑定的节点

	let hasAlias = false; //是否有别名

	if(hash === '') hash = '/'; //如果不存在hash设置为根目录

	//走别名路由
	if(this.alias[hash]) {
		hasAlias = true;
		hash = getPathAlias.apply(this, [(hash === '/' ? hash : path), null]); //判断是不是别名的路由	
	}

	if(routerBtns.length === 0) return this; //存在路由绑定

	if(!this.alias[hash] && !this.router[hash]) { //error页面
		fn.run(this.config.error, this);
		return;
	}

	/*路由进入的钩子*/
	fn.run(this.config.routerEnter, this, [path]);

	/*如果是存在别名路径，返回代理的那个路径*/
	hashChange.apply(this, [routerBtns, (hasAlias ? hash : path)]);
}

/*hashChange的处理*/
function hashChange(routerBtns, path) {

	const fn = this.constructor.fn,
		tmpl = this.constructor.tmpl,
		hash = this.getHash(path);

	let alinkEl = null;

	this.getTmpl(hash); //默认动态加载模块

	//是否存在最后一个路由地址
	if(this.lastRouter) {
		/*如果不是匹配的路由视图，则不显示在路由视图中*/
		hideTmplEl.call(this, this.lastRouter);
	}

	this.lastRouter = hash; //记录最后的路由路径

	showTmplEl.apply(this, [hash]); //显示路由的view

	setRouterStatus.call(this, hash); //设置路由的链接状态

	//修改对应的状态
	fn.each(routerBtns, (el, index) => {
		const path = tmpl.attr(el, 'href'),
			href = this.getHash(path);

		if(href === hash) {
			this.currentRouter = href; //保存当前的路由

			alinkEl = el; //保存按钮节点

			tmpl.addClass(el, this.config.routerLinkActive); //修改路由link的样式

			/*是否使用了保存之前的状态*/
			if(this.config.keepLive && this.router[href]['keepLive']) {
				setScrollTop.call(this, this.router[href]['scrollTop']);
			} else {
				setScrollTop.call(this, 0);
			}
		} else {
			/*存在配置路由*/
			if(this.router[href]) {
				hideTmplEl.call(this, href); //如果不是匹配的路由视图，则不显示在路由视图中
			}
			tmpl.removeClass(el, this.config.routerLinkActive);
		}

		/*如果设置的节点没有绑定到对应的节点上*/
		if(!alinkEl) {
			this.currentRouter = hash;
		}
	});
	//调用钩子
	fn.run(this.config.routerEntered, this, [path, alinkEl]);
}

/*检查当前路径是否存在别名*/
function getPathAlias(path, el) {

	const fn = this.constructor.fn,
		hash = this.getHash(path),
		alias = this.alias[hash];

	//别名触发钩子
	if(this.router[hash]) {
		fn.run(this.config.routerEnter, this, [path, el]);
		fn.run(this.config.routerEntered, this, [path, el]);
	}

	//如果别名存在别名，递归使用
	if(this.alias[alias]) {
		return getPathAlias.apply(this, [alias, el]);
	} else {
		return alias;
	}
}

/*保存节点信息*/
function hideTmplEl(hash) {
	const fn = this.constructor.fn;
	/*如果不是匹配的路由视图，则不显示在路由视图中*/
	fn.each(this.router[hash]['view'], (el, index) => {
		this.router[hash]['temp'].appendChild(el);
	});
	this.router[hash]['view'] = [];
}

/*显示节点信息*/
function showTmplEl(hash) {

	const fn = this.constructor.fn,
		tmpl = this.constructor.tmpl,
		view = this.routerView;

	view.appendChild(this.router[hash]['temp']); //更新view层

	fn.each(tmpl.children(view), (el, index) => { //保存view层节点
		this.router[hash]['view'].push(el);
	});
}

/* 设置路由的状态，针对没有方法加载的路由模板中存在方法的 */
function setRouterStatus(hash) {
	/*修改路由状态*/
	if(this.router[hash]['routerStatus'] == true) {
		this.changeRoutereStatus(true);
	}
}

/*设置scrollTop*/
function setScrollTop(num) {
	const fn = this.constructor.fn;
	if(!fn.isNum(num)) return 0;
	try {
		document.body.scrollTop = parseFloat(num);
	} catch(e) {
		document.documentElement.scrollTop = parseFloat(num);
	}
}