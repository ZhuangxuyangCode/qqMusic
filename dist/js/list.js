(function($, root){

	function renderList(data){
		data.forEach(function(ele, index){
			console.log(ele, index);
		})
	}

	root.list = {
		renderList: renderList
	}


}(window.Zepto, window.player || (window.player = {})))