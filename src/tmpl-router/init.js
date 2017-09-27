//配置参数
import config from './config';
//设置的handler
import {
	setRouter,
	setInstance,
	setRouterLinkStatus,
	setRouterAnchor,
	setkeepLive,
	setPaths,
	setHashEvent
} from './set';
//路由初始
export default function init(opts) {

	const fn = this.constructor.fn,
	   tmpl = this.constructor.tmpl;
	
	this.routes = {};
	
	//把第一次的实例对象挂在到构造上
	this.constructor.tmplRouter = this;
	
	//只有一次路由实例，挂载到tmpl上
	this.constructor.tmpl.constructor.router = this;

	this.config = fn.extend(fn.copy(config), opts);
	
	this.routerView = tmpl.getEl(this.config.routerView);

	setRouter.call(this, this.config.routes ? this.config.routes : {});

	setInstance.call(this, 'methods'); //设置methods

	setInstance.call(this, 'data'); //设置data

	setRouterLinkStatus.call(this); //设置路由链接的状态

	setRouterAnchor.call(this, this.config.anchorTime); //设置路由的锚点形式

	setkeepLive.call(this); //设置保持状态

	setPaths.call(this, this.routes); //处理路由详情 

	setHashEvent.call(this); //设置hash

	fn.run(this.config.created, this); //所有创建后的钩子

	this.hashChange(); //初始化好了初始化hash

	fn.run(this.config.mounted, this); //所有完毕后的钩子

};