'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);
var gsgc = require('gulp-sass-generate-contents');
var environments = require('gulp-environments');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var pxtorem = require('gulp-pxtorem');
var rename = require('gulp-rename');
var del = require('del');
var livereload = require('gulp-livereload');
var cssmin = require('gulp-cssmin');

var config = require('./config');

gulp.task('styles', function(callback) {
	runSequence(
		'styles-generate',
		'styles-compile',
		'styles-clear-generated',
		callback
	);
});

gulp.task('styles-generate', function() {
	return gulp.src(config.inputFiles.styles.itcss)
		.pipe(gsgc(config.inputFiles.styles.main, {}, {disableContents: true }))
		.pipe(gulp.dest(config.paths.styles.src));
});

gulp.task('styles-compile', function() {
	return gulp.src(config.inputFiles.styles.main)
	.pipe(environments.development(sourcemaps.init()))
	.pipe(sass({
		sourceMap: environments.development() ? true : false,
		sourceMapEmbed: environments.development() ? true : false,
		outputStyle: environments.development() ? 'nested' : 'compressed',
		sourceMapContents: false,
		sourceComments: false,
		source_map_contents: false,
		source_comments: false
	}))
	.pipe(autoprefixer(config.styleOptions.autoprefixer))
	.pipe(pxtorem(config.styleOptions.pxtorem))
	.pipe(environments.development(sourcemaps.write()))
	.pipe(rename(config.outputFiles.styles.main))
	.pipe(gulp.dest(config.paths.styles.dist))
    .pipe(livereload());
});

gulp.task('minify-css', function () {
	gulp.src(config.paths.styles.dist + '*.css')
        .pipe(cssmin())
        .pipe(gulp.dest(config.paths.styles.dist));
});

gulp.task('styles-clear-generated', function() {
	return del(config.inputFiles.styles.main);
});
