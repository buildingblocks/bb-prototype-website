'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);
var wrench = require('wrench');
var del = require('del');
var environments = require('gulp-environments');
var gutil = require('gulp-util');
var connect = require('gulp-connect');
var livereload = require('gulp-livereload');

var config = require('./gulp/config');

// build tasks
var build = function(callback) {
    runSequence(
        'clean:everything',
        'markup',
        'styles',
        'scripts',
        'assets',
        'pagelist',
        callback
    );
};

var prodBuild = function(callback) {
    runSequence(
        'clean:everything',
        'markup',
        'styles',
        'minify-css',
        'scripts',
        'assets',
        'pagelist',
        callback
    );
};

/**
 *  This will load all js files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
    return (/\.(js)$/i).test(file);
}).map(function(file) {
    require('./gulp/' + file);
});

gulp.task('clean:everything', function() {
    return del('dist');
});


// DEV build
gulp.task('build', function(callback) {
    environments.current(environments.development);
    build(callback);
});

// PROD build
gulp.task('production', function(callback) {
    environments.current(environments.production);
    prodBuild(callback);
});

// WATCH TASK
gulp.task('watch', ['build'], function() {
    livereload.listen();
    gulp.watch(config.paths.styles.src + '**/*.scss', ['styles', 'assets']);
    gulp.watch(config.paths.scripts.src + '**/*.js', ['scripts']);
    gulp.watch([
        config.paths.views.src + '**/*',
        config.paths.views.pages + '**/*',
        config.paths.data.src + '**/*'
    ], ['build']);
});


// SERVE TASK
gulp.task('serve', ['watch'], function(callback) {
    var open = require('open');
    var serverPort = Math.floor((Math.random() * 1000) + 3000);
    var localhost = 'http://localhost:' + serverPort;

    connect.server({
        host: 'localhost',
        port: serverPort,
        livereload: true,
        root: config.basePaths.dist
    });

    open(localhost, 'google chrome');

});

/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['build']);