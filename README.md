# Tmpl-Router 路由插件

##### 更新时间：2017-8-31 11:41:06

支持IE9-IE11, EDGE , chrome , firefox

## 构造对象 TmplRouter

#### new TmplRouter(options)：

##### options中的参数：

**routerLink:**绑定路由的className。默认值：'tmpl-router'

**routerLinkActive:**绑定被选中时候的className，默认值：'tmpl-router-active'

**routerView:**点击路由链接切换的视图容器

**data:**数据存储，data中的所有值都会挂在到实例对象中作为实例属性

**methods:**实例中的方法

**keepLive:**view层中的显示状态是否保持住，比如你在模块中加载了比较长的数据，并且往下滚动了一段距离，如果在切换了路径路径，则重新切回来的时候是保持你原来离开的样子的

**router:**配置路由信息，类型为Object类型，key为路由的路径，value为一个Object，配置信息如下：

* **tmplUrl:**异步加载模块的url地址,返回的数据为。异步模块会自动处理routerStatus的状态，不需要手动设定

```javascript
{
	tmpl:"<div>domString</div>"
}
```
异步的模块会存在一个问题，
假设异步模块中异步加载的dom类型中存在script请求，
这时候还没请求回来的就被切换到下一个路由，
则运行script中的内容会找不到上一个路由view层中的dom节点，存在报错；
所以设定routerStatus的值来判断路由是够允许下一个跳转，这里的routerStatus在tmpl中设置，告诉tmpl是异步操作的。


* **tmplId:**这种的非异步模块，把对应模块script的id写在这个参数，id模块会自动处理routerStatus的状态，不需要设定

* **alias:**别名路径,如果访问的为别名路径，则跳转到对应的路由地址

* **keepLive:**在实例中的keepLive设置为true的情况下，这里的keepLive才会生效，这里的keepLive是为了让部分view层保持状态使用的，false则不保持状态；

* **modules:**这里的modules设置为当前路由路径下一层路径的路由配置，配置信息个router的配置信息一样

```javascript
'/tm1': {
	tmplUrl: "./php/get_tmpl.php?tmpl=tmpl1",
	alias: '/tm2',
	keepLive: true,
	modules: {
		'/tm1-1': {
			tmplUrl: "./php/get_tmpl.php?tmpl=tmpl1",
			alias: '/tm1/index',
			modules: {
				'/tm1-1-1': {
					modules: {
						'/a': {}
					}
				}
			}
		}
	}
}
```
上列的路由会解析为个路径，modules里面的路径都是根据外层的路径累加的：

```javascript
'/tm1'
'/tm1/tm1-1'
'/tm1/tm1-1/tm1-1-1'
```

### 路由钩子

**created:**创建路由成功后的回调信息

**triggerRouter:**点击切换路由链接的时候触发的钩子

**error:**错误的路由指向回调

**routerEnter:**进入路由时触发的钩子，带回参数path

**routerEntered:**hahs更新后的钩子path,  el







