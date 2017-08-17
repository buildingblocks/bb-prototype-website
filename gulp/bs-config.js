"use strict";
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    tap = require('gulp-tap'),
    path = require('path'),
    jsonModify = require("gulp-json-modify"),
    rename = require('gulp-rename'),
    grayMatter = require('gray-matter'),
    fs = require('fs');

var scenarios = new Array();

gulp.task('buildConfig', ['getFiles'], function () {
  gulp.start('jsonModify');
});

gulp.task('getFiles', function(cb){
  return gulp.src('src/pages/**/*.hbs')
    .pipe(tap(function (file,t) {
      var filename = path.basename(file.path);
      filename = filename.replace('.hbs', '.html');

      var originalPath = file.path,
          contents = fs.readFileSync(path.relative(process.cwd(), originalPath), 'utf8'),
          pageData = grayMatter(contents),
          pageTitle = pageData.data.title;

        // gutil.log(pageTitle, filename);

      var obj = {
        "label": pageTitle,
        "url": "http://localhost:1985/" + filename,
        "hideSelectors": [],
        "removeSelectors": [],
        "selectorExpansion": true,
        "selectors": [],
        "readyEvent": null,
        "delay": 0,
        "misMatchThreshold" : 0.1,
        "requireSameDimensions" : true,
        "onBeforeScript": "onBefore.js",
        "onReadyScript": "onReady.js"
      };
      scenarios.push(obj);
      gutil.log(scenarios.length);
    }));
});

gulp.task('jsonModify', function () {
 
  return gulp.src([ 'backstopDefault.json' ])
    .pipe(jsonModify({
      key: 'scenarios',
      value: scenarios
    }))
    .pipe(rename("backstop.json"))
    .pipe(gulp.dest(""));
});