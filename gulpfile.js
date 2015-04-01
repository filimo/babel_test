var gulp = require('gulp')
var rename = require('gulp-rename')()

var browserify = require('browserify')
var babelify = require('babelify')

var browserSync = require("browser-sync")
var reload = browserSync.reload;

var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')

var notify = require('gulp-notify')

var source = require('vinyl-source-stream');

var stringify = require('stringify')

var plumber = require('gulp-plumber')
var gutil = require('gulp-util')

var when = require('gulp-if')

module.exports = {
    plumber: function() {
        return plumber(function(error) {
            gutil.log(gutil.colors.red(error.message))
            this.emit('end')
        })
    }
}

gulp.task('build', function() {
    browserify({
            entries: './src/app.js',
            debug: true
            //debug: process.env.NODE_ENV === 'development'
        })
        .transform(babelify)
        .transform(stringify({
            extensions: ['.html'], minify: true
        }))
        .bundle()
        .pipe(plumber())
        .pipe(source('app.js'))
        .pipe(gulp.dest('./www'))
        .pipe(reload({stream: true}))
        .pipe(notify('Js is updated!'))
})

gulp.task('sass', function () {
    gulp.src('./src/scss/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./www/css'))
        .pipe(reload({stream: true}))
        .pipe(notify('Sass is updated!'))
})

gulp.task('html', function() {
    gulp.src('./src/**/*.html')
        .pipe(plumber())
        .pipe(gulp.dest('./www'))
        .pipe(reload({stream: true}))
        .pipe(notify('Html is updated!'))
})


gulp.task('serve', ['sass', 'html', 'build'], function() {
    browserSync({
        sever: {
            baseDir: './www'
        }
    })

    gulp.watch('./src/scss/*.scss', ['sass'])
    gulp.watch('./src/**/*.html', ['html', 'build'])
    gulp.watch('./src/**/*.js', ['build'])
})

gulp.task('default', ['serve'])