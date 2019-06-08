//页面渲染 img + info + like-btn
//立即执行函数: 封闭作用域，防止变量冲突

(function($, root){

	//渲染图片
	function renderImg(src){
		var oImg = new Image();
		oImg.src = src;
		oImg.onload = function(){
			$('.img-box img').attr('src', src);
			root.blurImg(oImg, $('body'));
		}
	}

	//渲染歌曲信息
	function renderInfo(info){
		var str = '<div class="song-name">' + info.song + '</div>\
			<div class="singer-name">' + info.singer + '</div>\
			<div class="album-name">' + info.album + '</div>'
		$('.song-info').html(str);
	}

	//渲染是否喜欢
	function renderIsLike(isLike){
		if(isLike){
			$('.like').addClass('liking');
		}else{
			$('.like').removeClass('liking');
		}
	}

	//向外暴露render函数: 调用以上渲染函数
	root.render = function(data){
		renderImg(data.image);
		renderInfo(data);
		renderIsLike(data.isLike);
	}

}(window.Zepto, window.player || (window.player = {})));