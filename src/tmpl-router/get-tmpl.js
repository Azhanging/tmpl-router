/*
 *	动态加载模板 
 * */

export default function getTmpl(hash) {

	const fn = this.constructor.fn;

	const tmpl = this.constructor.tmpl;

	const _this = this;
    
    //查看当前的路由 模板是否加载回来了
	if((!this.routes[hash]) || this.routes[hash]['view'].length > 0 || this.routes[hash]['temp'].childNodes.length > 0) return; 

	const tmplUrl = this.routes[hash]['tmplUrl']; //获取请求的url

	const tmplId = this.routes[hash]['tmplId']; //获取静态模板的id

	/*动态模板*/
	if(tmplUrl) {
		try {
			$.ajax({
				async: false,
				url: tmplUrl,
				success: function(data) {
					_this.routes[hash]['temp'].appendChild(tmpl.create(data.tmpl));
					filterTextNode.call(_this, _this.routes[hash]['temp']);
					_this.changeRoutereStatus(false);
				},
				error: function(data) {
					_this.changeRoutereStatus(true);
				}
			});
		} catch(e) {
			fn.ajax({
				async: false,
				url: tmplUrl,
				success: function(data) {
					_this.routes[hash]['temp'].appendChild(tmpl.create(data.tmpl));
					filterTextNode.call(_this, _this.routes[hash]['temp']);
					_this.changeRoutereStatus(false);
				},
				error: function(data) {
					_this.changeRoutereStatus(true);
				}
			});
		}
	} else if(tmplId) {
		try {
			this.routes[hash]['temp'].appendChild(tmpl.create(tmpl.html(tmpl.getEl(tmplId)))); //非动态模板	
		} catch(e) {
			this.routes[hash]['temp'].appendChild(tmpl.create(''));
		}
		this.changeRoutereStatus(true);
	}
}

/*清空空的文本节点*/
function filterTextNode(parentEl) {

	const fn = this.constructor.fn;

	const tmpl = this.constructor.tmpl;

	fn.each(parentEl.childNodes, (el, index) => {
		if(el && el.nodeType === 3 && el.textContent.trim() === '') {
			tmpl.remove(el);
		}
	});
}