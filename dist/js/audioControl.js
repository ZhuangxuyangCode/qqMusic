(function($, root){

	//创建audio对象
	function AudioManager(){
		this.audio = new Audio();
		this.status = 'pause';
	}

	AudioManager.prototype = {
		getAudio: function(src){
			this.audio.src = src;
			this.audio.load();
		},
		play: function(){
			this.audio.play();
			this.status = 'play';
		},
		pause: function(){
			this.audio.pause();
			this.status = 'pause';
		},
		playTo: function(t){
			this.audio.currentTime = t;
		}
	}

	root.audioManager = new AudioManager();

}(window.Zepto, window.player || (window.player = {})));