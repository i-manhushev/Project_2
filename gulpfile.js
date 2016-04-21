var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    gulpif = require('gulp-if'),
		less = require('gulp-less'),
		autoprefixer = require('gulp-autoprefixer'),
		cleanCSS = require('gulp-clean-css'),
		browserSync = require('browser-sync').create(),
		imagemin = require('gulp-imagemin'),
		useref = require('gulp-useref'),
		uglify = require('gulp-uglify');

// Pathes to my files and assets

var config = {
	path:{
		index: './app/index.html',
		styles: './app/styles/main.less',
		scripts: './app/js/**/*.js',
		images: './app/images/**/*.+(png|jpg|gif|svg)'
	},
	src: './app',
	dist: './dist',
};

//browserSync  to start the server

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: config.src
    },
  });
});

// CSS task

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
		.pipe(browserSync.reload({
      stream: true
    }));
});

 // USEREF task
 gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
      stream: true
    }));
});

//image minification

gulp.task('images', function(){
  return gulp
  .src(config.path.images)
  .pipe(imagemin())
  .pipe(gulp.dest(config.dist + '/images'));
});


// Watch for changes and reload

gulp.task('watch',['browserSync','css','html','images'], function(){
	gulp.watch(config.path.styles, ['css']);
	gulp.watch([config.path.styles, config.path.scripts, config.path.index], ['html']);
	gulp.watch(config.path.images, ['images']);

});

// DEFUALT!

gulp.task('default',['watch']);



