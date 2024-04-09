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
 * @description Permet de compiler tous les fichiers SCSS en CSS
 * @returns {PassThrough}
 */
function sass() {
    return gulp.src('sass/style.+(scss|sass)').pipe(gulpSass().on('error', gulpSass.logError)).pipe(prefix()).pipe(minify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('css')).pipe(browserSync.stream())
}

/**
 * @description Détecte les changements et compile en live en faisant appel à la méthode sass()
 */
function watch() {
    gulp.watch('sass/**/*.+(scss|sass)', sass);
}

/**
 * @description Détecte les changements et compile en live en faisant appel à la méthode sass() et recharge automatiquement
 * la page du navigateur. Il exécute aussi le reload JS
 */
function reload() {
    browserSync.init({
        proxy: {target: 'https://www.lesjardinsdetouraine.fr'}
    });
    gulp.watch('sass/**/*.+(scss|sass)').on('change', browserSync.reload);
    gulp.watch('../js/**/*.js').on('change', browserSync.reload);
}

/**
 * Définition des différentes tasks à appeler pour exécuter les commandes
 * @type {function(): PassThrough}
 */
exports.sass = sass;
exports.watch = gulp.series(sass, watch);
exports.reload = gulp.series(sass, reload);