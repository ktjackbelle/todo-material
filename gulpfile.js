'use strict';

var path = require('path');
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./src/app/webpack.config.js');

var ROOT = __dirname;
var SRC_DIR = path.join(ROOT, 'src');
var STATIC_PATH = path.join(SRC_DIR, 'static', '**', '*');
var APP_PATH = path.join(SRC_DIR, 'app', '**', '*');
var BUILD_DIR = path.join(ROOT, 'dist');

gulp.task('default', [ 'watch' ]);

gulp.task('build', [
  'static',
  'webpack',
]);

gulp.task('watch', [
  'static.watch',
  'webpack.watch',
  'server',
  'livereload',
]);

gulp.task('static', function() {
  return gulp.src(STATIC_PATH)
    .pipe(gulp.dest(BUILD_DIR));
});
gulp.task('static.watch', [ 'static' ], function() {
  gulp.watch(STATIC_PATH, [ 'static' ]);
});

gulp.task('webpack', function(done) {
  webpack(webpackConfig, done);
});
gulp.task('webpack.watch', [ 'webpack' ], function() {
  gulp.watch(APP_PATH, [ 'webpack' ]);
});

gulp.task('server', function(done) {
  var app = express();

  app.use(express.static(BUILD_DIR));
  app.listen(8000, done);
});

gulp.task('livereload', function() {
  livereload.listen();
  gulp.watch(path.join(BUILD_DIR, '**', '*'), function(event) {
    livereload.changed(event.path);
  });
});
