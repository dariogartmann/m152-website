var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var prompt = require('gulp-prompt');
var ftp = require( 'vinyl-ftp' );
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');
 
gulp.task('css', function () {
    return gulp.src('./source/**/*.+(css|scss)')
        .pipe(sass())
        .pipe(concat('app.css'))
        .pipe(autoprefixer({
           browsers: ['last 2 versions', 'ie 11', '> 10%'],
           cascade: false
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest('assets/css/'))
        .pipe(browserSync.stream());
 
});
 
gulp.task('js', function () {
    return gulp.src('./source/**/*.js')
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/'))
        .pipe(browserSync.stream());
 
});
 
gulp.task('serve', ['js','css'], function() {
 
    browserSync.init({
        server: "./"
    });
 
    gulp.watch("./source/styles/**/*.+(css|scss)", ['css']);
    gulp.watch("./source/js/**/*.js", ['js']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});
 
gulp.task('default',['serve']);