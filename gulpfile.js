'use strict';
var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    runSequence = require('run-sequence'),
    ui5preload = require('gulp-ui5-preload'),
    uglify = require('gulp-uglify'),
    stripDebug = require('gulp-strip-debug'),
    prettydata = require('gulp-pretty-data'),
    gulpif = require('gulp-if'),
    del = require('del'),
    replace = require('gulp-replace'),
    Karma = require('karma').Server,
    DIST, SRC, files, paths;

DIST = 'dist';
SRC = 'webapp';
files = {
    all: SRC + '/**/*',
    dist: DIST + '/**/*',
    dist_common: DIST + '/common/**/*',
    dist_test: DIST + '/test/**/*'
};
paths = {
    common: SRC + '/common/',
    test: SRC + '/test/',
    dist: DIST + '/',
    dist_test: DIST + '/test/'
};
gulp.task('setup', function () {
    console.log('[Task Info] This task changes the reporter prefixes in karma-spec-reporter plugin on windows platform.');
    gulp.src([__dirname + '/node_modules/karma-spec-reporter/index.js'])
        .pipe(replace('\\u221A\'', '\\u221A \''))
        .pipe(replace('\\u00D7\'', '\\u00D7 \''))
        .pipe(gulp.dest(__dirname + '/node_modules/karma-spec-reporter'));
    console.log('[Task Info] This task make the logs folder for karma logs.');
    gulp.src('README')
        .pipe(gulp.dest('./logs'));
});

gulp.task('server:src', function () {
    return browserSync.init({
        browser: 'chrome',
        logLevel: 'silent',
        server: {
            baseDir: './webapp'
        },
        startPath: 'index.html'
    });

});

gulp.task('server:dist', function () {
    return browserSync.init({
        browser: 'chrome',
        logLevel: 'silent',
        port: 8089,
        server: {
            baseDir: './dist'
        },
        startPath: 'index.html'
    });
});

gulp.task('watch:src', function () {
    gulp.watch(files.all, ['reload']);
});

gulp.task('reload', function () {
    gulp.src(files.all)
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('test', function (done) {
    new Karma({
        configFile: __dirname + '/karma_test.conf.js'
    }, function () {
        done();
    }).start();
});


gulp.task('clean:dist', function () {
    return del([paths.dist]);
});

// minify all process
gulp.task('build:all', function () {
    return gulp.src(files.all)
        .pipe(gulpif('*.js', stripDebug()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.xml', prettydata({ type: 'minify' })))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('preload:all', function () {
    return gulp.src(files.dist)
        .pipe(ui5preload({ base: paths.dist, namespace: 'sap.ui.demo.cart' }))
        .pipe(gulp.dest(paths.dist));
});
gulp.task('prod', ['server:dist']);
gulp.task('build', function () {
    runSequence('clean:dist', 'build:all', 'preload:all');
});
// default task
gulp.task('default', ['server:src', 'watch:src']);
