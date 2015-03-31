// npm install --save-dev gulp gulp-babel babelify through2 gulp-rename gulp-load-plugins browser-sync gulp-sass gulp-sourcemaps jquery

var gulp = require('gulp')
var gulpLoad = require('gulp-load-plugins')()

var browserify = require('browserify')
var through2 = require('through2')
var babelify = require('babelify')

var browserSync = require("browser-sync")
var reload = browserSync.reload;

var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')

gulp.task('build', function() {
    return gulp.src('./src/app.js')
        .pipe(through2.obj(function(file, enc, next) {
            browserify(file.path, {
                //debug: process.env.NODE_ENV === 'development'
                debug: true
            })
            .transform(babelify)
            .bundle(function(err, res) {
                if (err) return next(err)

                file.contents = res
                next(null, file)
            })
        }))
        .on('error', function(error) {
            console.log(error.stack)
            this.emit('end')
        })
        .pipe(gulpLoad.rename('app.js'))
        .pipe(gulp.dest('./www'))
})

gulp.task('sass', function () {
    return gulp.src('./src/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./www/css'))
})

gulp.task('html', function() {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./www'))
})


gulp.task('serve', ['sass', 'html', 'build'], function() {
    browserSync({
        sever: {
            baseDir: './www'
        }
    })

    gulp.watch('./src/scss/*.scss', ['sass']).on('change', reload)
    gulp.watch('./src/**/*.html', ['html']).on('change', reload)
    gulp.watch('./src/**/*.js', ['build']).on('change', reload)
})

gulp.task('default', ['serve'])