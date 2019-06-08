var root = window.player;
var dataList = [];
var len = 0;
var audio = root.audioManager;
var controlIndex = null;
var timer = null;

//获取数据
function getData(url) {
	$.ajax({
		type: 'GET',
		url: url,
		success: function(data) {
			// console.log(data);
			dataList = data;
			len = data.length;
			controlIndex = new root.controlIndex(len);
			bindEvent();
			bindTouch();
            root.playList.renderList(data);
			$('body').trigger('play:change', 0);
		},
		error: function() {
			console.log('error');
		}
	})
}

function bindEvent() {
	//绑定改变歌曲时自动渲染新页面事件
	$('body').on('play:change', function(e, index) {
		root.render(dataList[index]);
		audio.getAudio(dataList[index].audio);
		root.pro.renderAllTime(dataList[index].duration);
		audio.playTo(0);
		root.pro.update(0);
		root.pro.stop(0);
		if (audio.status == 'play') {
			audio.play();
			root.pro.start();
			rotated(0);
		}

		//切换歌曲 || 第一首歌曲，图片旋转角度初始化
		$('.img-box').attr('data-deg', 0);
		$('.img-box').css({
			transform: 'rotateZ(' + 0 + 'deg)',
			transition: 'none'
		})
	})

	// 切换歌曲触发事件 
	$('.prev').on('click', function(e) {
		var i = controlIndex.prev();
		$('body').trigger('play:change', i);
		root.pro.start(0);
		if (audio.status == 'pause') {
			root.pro.stop();
		}
	})

	$('.next').on('click', function(e) {
		var i = controlIndex.next();
		$('body').trigger('play:change', i);
		root.pro.start(0);
		if (audio.status == 'pause') {
			root.pro.stop();
		}
	})

	//绑定play pause事件
	$('.play').on('click', function(e) {
		if (audio.status == 'pause') {
			audio.play();
			root.pro.start();
			var deg = $('.img-box').attr('data-deg') || 0;
			rotated(deg);
		} else {
			audio.pause();
			root.pro.stop();
			clearInterval(timer);
		}
		$('.play').toggleClass('playing');
	})

	//绑定点击歌曲列表事件
	$('.list').on('click', function(e){
		root.playList.show(controlIndex);
	})
}

function bindTouch() {
	var $spot = $('.spot');
	var bottom = $('.pro-bottom').offset();
	var l = bottom.left;
	var w = bottom.width;
	$spot.on('touchstart', function() {
		root.pro.stop();
	}).on('touchmove', function(e) {
			var x = e.changedTouches[0].clientX;
			var per = (x - l) / w;
			if (per >= 0 && per <= 1) {
				root.pro.update(per);
			}
		}).on('touchend', function(e) {
			var x = e.changedTouches[0].clientX;
			var per = (x - l) / w;
			if (per >= 0 && per <= 1) {
				var time = per * dataList[controlIndex.index].duration;
				root.pro.start(per);
				audio.playTo(time);
				if (audio.status == 'play') {
					audio.play();
					$('.play').addClass('playing');
					root.pro.start();
				} else {
					audio.pause();
					$('.play').removeClass('playing');
					root.pro.stop();
				}
				
			}
		});
}

function rotated(deg) {
	//执行该函数先clearInterval: 防止定时器叠加
	clearInterval(timer);
	deg = parseInt(deg); //类型转换
	timer = setInterval(function() {
		deg += 2;
		//data-deg: 记录当前转动角度
		$('.img-box').attr('data-deg', deg);
		$('.img-box').css({
			transform: 'rotateZ(' + deg + 'deg)',
			transition: 'transform 0.2s linear'
		})
	}, 200);
}
getData('../mock/data.json');