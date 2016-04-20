var gulp = require('gulp'),
		less = require('gulp-less'),
		autoprefixer = require('gulp-autoprefixer'),
		cleanCSS = require('gulp-clean-css'),
		browserSync = require('browser-sync').create(),
		plumber = require('gulp-plumber');

var config = {
	path:{
		index: './app/index.html',
		styles: './app/styles/main.less'
	},
	src: './app',
	dist: './dist',
};

// CSS LESS task
gulp.task('css', function(){
return gulp
		.src(config.path.styles)
		.pipe(plumber())
		.pipe(less())
		.pipe(autoprefixer({
				browsers: ['last 15 versions'],
				cascade: false
		}))
		.pipe(gulp.dest(config.src + '/styles'))
		.pipe(cleanCSS())
		.pipe(gulp.dest(config.dist + '/styles'))
		.pipe(browserSync.reload({
      stream: true
    }))
});

// HTML task

gulp.task('html', function(){
	return gulp
			.src(config.path.index)
			.pipe(gulp.dest(config.dist))
			.pipe(browserSync.reload({
      stream: true
    }))
});

//browserSync task to start the server

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: config.src
    },
  })
})

// watch for changes and reload
gulp.task('watch',['browserSync','css','html'], function(){
	gulp.watch(config.path.styles, ['css']);
	gulp.watch(config.path.index, ['html']);
});

// gulp default to run like just GULP from the terminal
gulp.task('default',['watch']);



