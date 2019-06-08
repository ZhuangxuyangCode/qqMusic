var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var htmlclean = require("gulp-htmlclean");
var uglify = require("gulp-uglify");
var stripDebug = require("gulp-strip-debug");
var concat = require("gulp-concat");
var deporder = require('gulp-deporder');
var less = require("gulp-less");

var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var connect = require("gulp-connect");


var folder = {
	src: "src/",
	dist: "dist/"
}

var devMode = process.env.NODE_ENV !== "production"; //不是生产环境时为true

//流操作 task runinng
gulp.task("html", function(){
	var page = gulp.src(folder.src + "html/*")
				   .pipe(connect.reload()); //监测到页面变化，重新刷新页面
	if(!devMode){ //生产环境
		page.pipe(htmlclean());
	}
	page.pipe(gulp.dest(folder.dist + "html/"));
})

gulp.task("css", function(){
	var css = gulp.src(folder.src + "css/*")
				   .pipe(connect.reload())
				   .pipe(less());
	var options = [autoprefixer()];
	if(!devMode){
		options.push(cssnano());
	}

	css.pipe(postcss(options))
	   .pipe(gulp.dest(folder.dist + "css/"))
})

gulp.task("images", function(){
	var img = gulp.src(folder.src + "images/*")
				  .pipe(imagemin())
				  .pipe(gulp.dest(folder.dist + "images/"));
})

gulp.task("js", function(){
	var js = gulp.src(folder.src + "js/*")
				 .pipe(connect.reload());
	if(!devMode){
		js.pipe(uglify())
		  .pipe(stripDebug());
	}
	js.pipe(gulp.dest(folder.dist + "js/"));
})

gulp.task("watch", function(){
	gulp.watch(folder.src + "html/*", ["html"]);
	gulp.watch(folder.src + "css/*", ["css"]);
	gulp.watch(folder.src + "js/*", ["js"]);
	gulp.watch(folder.src + "images/*", ["images"]);
})

gulp.task("server", function(){
	connect.server({
		port: "9090",
		livereload: true
	})
})

gulp.task("default", ["html","css","js","images","watch","server"]);