var gulp = require('gulp'),
		less = require('gulp-less'),
		autoprefixer = require('gulp-autoprefixer'),
		cleanCSS = require('gulp-clean-css'),
		browserSync = require('browser-sync').create(),
		plumber = require('gulp-plumber'),
		imagemin = require('gulp-imagemin');

var config = {
	path:{
		index: './app/index.html',
		styles: './app/styles/main.less',
		images: './app/images/**/*.+(png|jpg|gif|svg)'
	},
	src: './app',
	dist: './dist',
};

//browserSync task to start the server

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: config.src
    },
  })
});


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

//image minification

gulp.task('images', function(){
  return gulp
  .src(config.path.images)
  .pipe(imagemin())
  .pipe(gulp.dest(config.dist + '/images'))
});


// watch for changes and reload

gulp.task('watch',['browserSync','css','html','images'], function(){
	gulp.watch(config.path.styles, ['css']);
	gulp.watch(config.path.index, ['html']);
	gulp.watch(config.path.images, ['images']);
});

// gulp default to run like just GULP from the terminal
gulp.task('default',['watch']);



