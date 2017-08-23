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

gulp.task('deploy', ['js','css'], function() {
    gulp.src('/').pipe(prompt.prompt({
        type: 'password',
        name: 'pass',
        message: 'Please enter your password'
    }, function(res){
        var conn = ftp.create( {
            host:     'ftp.dariogartmann.ch',
            user:     'thehid8',
            password: res.pass,
            parallel: 10
        } );

        var globs = [
            'assets/**',
            'index.html',
            '.htaccess'
        ];

        // using base = '.' will transfer everything to /public_html correctly
        // turn off buffering in gulp.src for best performance
        return gulp.src( globs, { base: '.', buffer: false } )
            .pipe( conn.newer( '/www/dariogartmann.ch/' ) ) // only upload newer files
            .pipe( conn.dest( '/www/dariogartmann.ch/' ) );
    }));
    
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