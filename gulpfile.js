var gulp = require("gulp");
var babel = require("gulp-babel");
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');

gulp.task('jscompress', function() {
   return gulp.src('js_es5/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('csscompress', function() {
   return gulp.src('css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('htmlcompress', function() {
   	return gulp.src('html/*.html')
        .pipe(gulp.dest('dist/html'));
});

gulp.task('imgcompress', function() {
   	return gulp.src('images/*/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

gulp.task('auto',function(){
	gulp.watch('html/*.html',['htmlcompress']);
	gulp.watch('js_es5/*.js',['jscompress']);
	gulp.watch('css/*.css',['csscompress']);
	gulp.watch('images/*/*.*',['imgcompress']);
});


gulp.task('default', ['auto']);