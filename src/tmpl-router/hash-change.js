/*
 *	路由中的hash方法处理
 * */

export default function protoHashChange() {

    const fn = this.constructor.fn,
        tmpl = this.constructor.tmpl,
        path = window.location.hash.replace('#', ''),
        routerBtns = tmpl.getEls(this.config.routerLink), //获取路由绑定的节点
        lastRouter = this.$lastRouter;

    let hash = this.getHash(path), //获取hash
        hasAlias = false; //是否有别名

    if(hash === '') hash = '/'; //如果不存在hash设置为根目录

    //走别名路由
    if(this.alias[hash]) {
        hasAlias = true;
        //判断是不是别名的路由
        hash = getPathAlias.apply(this, [(hash === '/' ? hash : path), null]);
    }

    //存在路由绑定
    if(routerBtns.length === 0) return this;

    //error页面
    if(!this.alias[hash] && !this.routes[hash]) {
        fn.run(this.config.error, this);
        return;
    }

    //使用路由中的钩子
    fn.run(this.routes[hash].routerEnter, this, [path, this.$from]);

    /*路由进入的全局钩子*/
    fn.run(this.config.routerEnter, this, [path, this.$from]);

    /*如果是存在别名路径，返回代理的那个路径*/
    hashChange.apply(this, [routerBtns, (hasAlias ? hash : path), path]);
}

/*hashChange的处理*/
function hashChange(routerBtns, path, fullPath) {

    const fn = this.constructor.fn,
        tmpl = this.constructor.tmpl,
        hash = this.getHash(path),
        lastRouter = this.$lastRouter;

    //记录被点击的router-link
    let alinkEl = null;

    //默认动态加载模块
    this.getTmpl(hash);

    //是否存在最后一个路由地址
    if(lastRouter) {
        /*如果不是匹配的路由视图，则不显示在路由视图中*/
        hideTmplEl.call(this, this.getHash(lastRouter));
        this.$from = fullPath;
    }

    //记录最后的路由路径
    this.$lastRouter = path;

    showTmplEl.apply(this, [hash]); //显示路由的view

    //修改对应的状态
    fn.each(routerBtns, (el, index) => {
        const path = tmpl.attr(el, 'href'),
            href = this.getHash(path);

        if(href === hash) {
            this.currentRouter = href; //保存当前的路由

            alinkEl = el; //保存按钮节点

            tmpl.addClass(el, this.config.routerLinkActive); //修改路由link的样式
        } else {
            /*存在配置路由*/
            if(this.routes[href]) hideTmplEl.call(this, href); //如果不是匹配的路由视图，则不显示在路由视图中

            tmpl.removeClass(el, this.config.routerLinkActive);
        }

        /*如果设置的节点没有绑定到对应的节点上*/
        if(!alinkEl) this.currentRouter = hash;
    });

    //设置keeplive
    setRouterScroll.call(this, hash);

    //使用路由中的钩子
    fn.run(this.routes[hash].routerEntered, this, [path, this.$from, alinkEl]);

    //调用全局进入结束钩子
    fn.run(this.config.routerEntered, this, [path, this.$from, alinkEl]);
}

/*检查当前路径是否存在别名*/
function getPathAlias(path, el) {

    const fn = this.constructor.fn,
        hash = this.getHash(path),
        alias = this.alias[hash];

    //别名触发钩子
    /*if(this.routes[hash]) {
        fn.run(this.routes[hash].routerEnter, this, [path]);
        fn.run(this.config.routerEnter, this, [path, el]);
        fn.run(this.routes[hash].routerEntered, this, [path]);
        fn.run(this.config.routerEntered, this, [path, el]);
    }*/

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
    fn.each(this.routes[hash].view, (el, index) => {
        this.routes[hash].temp.appendChild(el);
    });
    this.routes[hash].view = [];
}

/*显示节点信息*/
function showTmplEl(hash) {

    const fn = this.constructor.fn,
        tmpl = this.constructor.tmpl,
        view = this.routerView;

    //更新view层
    view.appendChild(this.routes[hash].temp);

    //保存view层节点
    fn.each(tmpl.children(view), (el, index) => {
        this.routes[hash].view.push(el);
    });
}

//设置路由的scroll
function setRouterScroll(hash) {
    /*是否使用了保存之前的状态*/
    if(this.config.keepLive && this.routes[hash].keepLive) {
        setScrollTop.call(this, this.routes[hash].scrollTop);
    } else {
        setScrollTop.call(this, 0);
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