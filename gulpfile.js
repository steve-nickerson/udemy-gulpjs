var gulp = require('gulp')
var uglify = require('gulp-uglify')
var pump = require('pump')
var livereload = require('gulp-livereload')

var SCRIPTS_PATH = 'public/scripts/**/*.js'

gulp.task('styles', function() {
    console.log('Starting styles...')
})

gulp.task('scripts', function(cb) {
    pump([
        gulp.src(SCRIPTS_PATH),
        uglify(),
        gulp.dest('public/dist'),
        livereload()        
    ], cb)
})

gulp.task('images', function() {
    console.log('Starting images')
})

gulp.task('default', function() {
    console.log('Starting default task')
})

gulp.task('watch', function () {
    console.log('Starting watch task...')
    require('./server.js')
    livereload.listen()
    gulp.watch(SCRIPTS_PATH, ['scripts'])
})