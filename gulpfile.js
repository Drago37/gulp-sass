/*
* Use Gulp to compile sass files 
* @date: 2016
* @author: Anthony graule
*
* Need a folder 'assets' containing two folders named 'css' and 'sass'
* gulpfile.js must to be at the same assets level with package.json
* Open nodejs command and use 'npm install' to install node_modules
* nodejs and gulp must to be install before
*/

// Requires gulp
var gulp = require('gulp');
// Include plugins
var plugins = require('gulp-load-plugins')();

//To compile sass in css(dev)
gulp.task('sass', function(){
  return gulp.src('assets/sass/**/*.+(scss|sass)')
    .pipe(plugins.sass())
	.pipe(plugins.csscomb())
	.pipe(plugins.cssbeautify({indent: '  '}))
	.pipe(plugins.autoprefixer())
    .pipe(gulp.dest('assets/css'))
});

//To watch sass (dev)
gulp.task('watch', function(){
  gulp.watch('assets/sass/**/*.+(scss|sass)', ['sass']); 
  // Other watchers
})

// To minify (production)
gulp.task('minify', function () {
  return gulp.src('assets/css/*.css')
    .pipe(plugins.csso())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('assets/css'));
});