/**
 * @description Use Gulp to compile and to minify sass files
 * @date: 2024
 * @author: Anthony graule <anthony.graule@gmail.com>
 *
 * Need a folder 'assets' containing two folders named 'css' and 'sass'
 * gulpfile.js must to be at the same assets level with package.json
 * Open nodejs command and use 'npm install' to install node_modules
 * nodejs 14, python 3 and gulp must to be install before
 */

const gulp = require('gulp');
const gulpSass = require('gulp-sass')(require('sass'));
// Require plugins
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

/**
 * @description To compile scss files to css
 * @returns {PassThrough}
 */
function sass() {
    return gulp.src('sass/style.+(scss|sass)').pipe(gulpSass().on('error', gulpSass.logError)).pipe(prefix()).pipe(minify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('css')).pipe(browserSync.stream())
}

/**
 * @description Inspect changes and if there is changes then sass() called
 */
function watch() {
    gulp.watch('sass/**/*.+(scss|sass)', sass);
}

/**
 * @description Inspect changes and if there is changes then sass() called, and there is a hot reload of CSS and JS files.
 */
function reload() {
    browserSync.init({
        proxy: {target: 'https://www.demo.fr'}
    });
    gulp.watch('sass/**/*.+(scss|sass)').on('change', browserSync.reload);
    gulp.watch('../js/**/*.js').on('change', browserSync.reload);
}

// exports
exports.sass = sass;
exports.watch = gulp.series(sass, watch);
exports.reload = gulp.series(sass, reload);