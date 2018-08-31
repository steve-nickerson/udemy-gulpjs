var gulp = require('gulp')
var uglify = require('gulp-uglify')
var pump = require('pump')
var livereload = require('gulp-livereload')
var concat = require('gulp-concat')
var minifyCss = require('gulp-minify-css')
// var autoprefixer = require('gulp-autoprefixer')
var sourcemaps = require('gulp-sourcemaps')
var sass = require('gulp-sass')
var babel = require('gulp-babel')
var postcss = require('gulp-postcss')
var autoprefixer = require('autoprefixer')

var DIST_PATH = 'public/dist'
var SCRIPTS_PATH = 'public/scripts/**/*.js'
var CSS_PATH = 'public/css/**/*.css'


// gulp.task('styles', function() {
//     console.log('Starting styles...')
//     pump([
//         gulp.src(['public/css/reset.css', CSS_PATH]),
//         autoprefixer({
//             browsers: ['last 4 versions']
//         }),
//         sourcemaps.init(),
//         concat('styles.css'),
//         minifyCss(),
//         sourcemaps.write(),
//         gulp.dest(DIST_PATH),
//         livereload()
//     ], function (err) {
//         if (err !== undefined) { console.log('Styles Task Error...\n\n', err) }
//     })
// })

gulp.task('styles', function() {
    console.log('Starting styles...')
    pump([
        gulp.src('public/scss/styles.scss'),
        postcss([autoprefixer({
            browsers: ['last 4 versions']
        })]),
        // autoprefixer({
        //     browsers: ['last 4 versions']
        // }),
        sourcemaps.init(),
        sass({
            outputStyle: 'compressed'
        }),
        sourcemaps.write(),
        gulp.dest(DIST_PATH),
        livereload()
    ], function (err) {
        if (err !== undefined) { console.log('Styles Task Error...\n\n', err) }
    })
})

gulp.task('scripts', function() {
    pump([
        gulp.src(SCRIPTS_PATH),
        sourcemaps.init(),
        babel({
            presets: ['env']
        }),
        uglify(),
        concat('scripts.js'),
        sourcemaps.write(),
        gulp.dest('public/dist'),
        livereload()        
    ], function (err) {
        if (err !== undefined) { console.log('Scripts Task Error...\n\n', err) }
    })
})

gulp.task('images', function() {
    console.log('Starting images')
})

gulp.task('templates', function () {
    
})

gulp.task('default', ['images', 'templates', 'styles', 'scripts'], function() {
    console.log('Starting default task')
})

gulp.task('watch', ['default'], function () {
    console.log('Starting watch task...')
    require('./server.js')
    livereload.listen()
    gulp.watch(SCRIPTS_PATH, ['scripts'])
    gulp.watch('public/scss/**/*.scss', ['styles'])
})