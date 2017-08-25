/*
 *	动态加载模板 
 * */

export default function getTmpl(hash) {

	const fn = this.constructor.fn;

	const tmpl = this.constructor.tmpl;

	const _this = this;
    
    //查看当前的路由 模板是否加载回来了
	if((!this.router[hash]) || this.router[hash]['view'].length > 0 || this.router[hash]['temp'].childNodes.length > 0) return; 

	const tmplUrl = this.router[hash]['tmplUrl']; //获取请求的url

	const tmplId = this.router[hash]['tmplId']; //获取静态模板的id

	/*动态模板*/
	if(tmplUrl) {
		try {
			$.ajax({
				async: false,
				url: tmplUrl,
				success: function(data) {
					_this.router[hash]['temp'].appendChild(tmpl.create(data.tmpl));
					filterTextNode.call(_this, _this.router[hash]['temp']);
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
					_this.router[hash]['temp'].appendChild(tmpl.create(data.tmpl));
					filterTextNode.call(_this, _this.router[hash]['temp']);
					_this.changeRoutereStatus(false);
				},
				error: function(data) {
					_this.changeRoutereStatus(true);
				}
			});
		}
	} else if(tmplId) {
		try {
			this.router[hash]['temp'].appendChild(tmpl.create(tmpl.html(fn.getEl(tmplId)))); //非动态模板	
		} catch(e) {
			this.router[hash]['temp'].appendChild(tmpl.create(''));
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