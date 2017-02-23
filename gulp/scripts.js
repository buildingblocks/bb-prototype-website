"use strict";

var gulp = require('gulp');
var environments = require('gulp-environments');
var modernizr = require('gulp-modernizr');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var runSequence = require('run-sequence').use(gulp);
var gulpCopy = require('gulp-copy');
var livereload = require('gulp-livereload');

var config = require('./config');
var handleError = require('./handle-error');

gulp.task('scripts', function(callback) {
  runSequence(
    'scripts-lint',
    'scripts-modernizr',
    'scripts-compile',
    'scripts-min',
    'validation-compile',
    'jquery-copy',
    callback
  );
});

gulp.task('scripts-modernizr', function() {
  return gulp.src([
      config.paths.scripts.src + '**/*.js',
      '!' + config.paths.scripts.src + 'modules/**',
      config.paths.styles.src + '**/*.scss'
    ])
    .pipe(modernizr({
      cache: true,
      options: [
        'setClasses',
        'addTest',
        'html5printshiv',
        'testProp',
        'fnBind',
        'prefixed',
        'prefixedCSS'
      ]
    }))
    .pipe(environments.production(uglify()))
    .pipe(gulp.dest(config.paths.scripts.dist));
});

gulp.task('scripts-lint', function() {
  return gulp.src(config.paths.scripts.src + 'modules/**/*.js')
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('scripts-compile', function() {
	return gulp.src([
		config.paths.scripts.src + 'plugins/combine/**/*.js',
    config.paths.scripts.src + 'plugins/modernizr.tests.js',
		config.paths.scripts.src + 'modules/**/*.js',
		config.paths.scripts.src + '_init.js'
	])
	.on('error', handleError)
	.pipe(concat(config.outputFiles.scripts.main))
	.pipe(gulp.dest(config.paths.scripts.dist))
  .pipe(livereload());
});

gulp.task('scripts-min', function() {
  return gulp.src([
    config.paths.scripts.src + 'plugins/combine/**/*.js',
    config.paths.scripts.src + 'plugins/modernizr.tests.js',
    config.paths.scripts.src + 'modules/**/*.js',
    config.paths.scripts.src + '_init.js'
  ])
  .on('error', handleError)
  .pipe(concat(config.outputFiles.scripts.mainMin))
  .pipe(uglify({
    compress: {
         drop_console: true
    }
  }))
  .pipe(gulp.dest(config.paths.scripts.dist));
});

gulp.task('validation-compile', function() {
  return gulp.src([
    config.paths.scripts.src + 'plugins/validation/*.js'
  ])
  .on('error', handleError)
  .pipe(concat(config.outputFiles.scripts.validation))
  .pipe(environments.production(uglify()))
  .pipe(gulp.dest(config.paths.scripts.dist))
  .pipe(livereload());
});

gulp.task('jquery-copy', function() {
  return gulp
    .src(config.paths.node_jquery.src)
    .pipe(gulpCopy(config.paths.scripts.dist, {prefix: 3}));
});
