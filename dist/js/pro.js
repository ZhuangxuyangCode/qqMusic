(function($, root) {

	var duration, frameId;
	var startTime, lastPer = 0;

	//渲染总时长
	function renderAllTime(allTime) {
		duration = allTime;
		var time = format(duration);
		$('.all-time').html(time);
	}

	//转换时间格式
	function format(t) {
		t = Math.round(t);
		var m = Math.floor(t / 60);
		var s = t - m * 60;
		m = m < 10 ? '0' + m : m;
		s = s < 10 ? '0' + s : s;
		return m + ':' + s;
	}

	//进度条开始运动
	function start(p) {
		cancelAnimationFrame(frameId);
		startTime = new Date().getTime();
		lastPer = p == undefined ? lastPer : p;

		function frame() {
			var curTime = new Date().getTime();
			var per = lastPer + (curTime - startTime) / (duration * 1000);
			if (per <= 1) {
				//更新进度条
				update(per);
			} else {
				cancelAnimationFrame(frameId);
			}
			//屏幕刷新一次就调用一次frame函数
			frameId = requestAnimationFrame(frame);
		}
		frame();
	}

	//更新进度条
	function update(per) {
		var time = format(per * duration);
		$('.cur-time').html(time);
		var x = (per - 1) * 100;
		$('.pro-top').css({
			transform: 'translateX(' + x + '%)'
		})
	}

	//暂停进度条
	function stop(p) {
		cancelAnimationFrame(frameId);
		var stopTime = new Date().getTime();
		// lastPer = lastPer + (stopTime - startTime) / (duration * 1000);
		lastPer = p == undefined ? lastPer + (stopTime - startTime) / (duration * 1000) : p;
	}

	root.pro = {
		renderAllTime: renderAllTime,
		start: start,
		stop: stop,
		update: update
	}

}(window.Zepto, window.player || (window.player = {})))