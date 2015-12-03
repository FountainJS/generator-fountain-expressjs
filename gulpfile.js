'use strict';

const path = require('path');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const excludeGitignore = require('gulp-exclude-gitignore');
const istanbul = require('gulp-istanbul');
const mocha = require('gulp-mocha');
const nsp = require('gulp-nsp');
const gutil = require('gulp-util');

gulp.task('prepublish', nspCheck);
gulp.task('default', gulp.series(eslintCheck, gulp.series(istanbulCover, mochaTest)));

function eslintCheck() {
  return gulp.src(['**/*.js', '!**/templates/**'])
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function istanbulCover() {
  return gulp.src(['**/*.js', '!**/templates/**'])
    .pipe(excludeGitignore())
    .pipe(istanbul({
      includeUntested: true
    }))
    .pipe(istanbul.hookRequire());
}

function mochaTest() {
  return gulp.src('test/**/*.js')
    .pipe(mocha({reporter: 'spec'}))
    .once('error', function errorHandler(err) {
      gutil.log(gutil.colors.red('[Mocha]'), err.toString());
      process.exit(1);
    })
    .pipe(istanbul.writeReports());
}

function nspCheck(cb) {
  nsp({package: path.resolve('package.json')}, cb);
}
