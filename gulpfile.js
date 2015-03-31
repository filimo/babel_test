// npm install --save-dev gulp gulp-babel babelify through2 gulp-rename gulp-load-plugins

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var through2 = require('through2');
var babelify = require('babelify');
var browserSync = require("browser-sync");

var srcApp = './src/app.js';
var srcWatchPath = './src/**/*.js'
var distAppPath = './dist';
var distAppFile = 'app.js';

gulp.task('build', function() {
    return gulp.src(srcApp)
        .pipe(through2.obj(function(file, enc, next) {
            browserify(file.path, {
                //debug: process.env.NODE_ENV === 'development'
                debug: true
            })
            .transform(babelify)
            .bundle(function(err, res) {
                if (err) return next(err);

                file.contents = res;
                next(null, file);
            });
        }))
        .on('error', function(error) {
            console.log(error.stack);
            this.emit('end');
        })
        .pipe($.rename(distAppFile))
        .pipe(gulp.dest(distAppPath));
});

gulp.task('js-watch', ['build'], browserSync.reload);

gulp.task('serve', ['build'], function() {
    browserSync({
        sever: {
            baseDir: './dist'
        }
    })

    gulp.watch(srcWatchPath, ['js-watch']);
})


gulp.task('watch', function() {
    gulp.watch(srcWatchPath, ['build']);
});

gulp.task('default', ['serve']);