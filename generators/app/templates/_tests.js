const gulp = require('gulp');
const gutil = require('gulp-util');
const mocha = require('gulp-mocha');
const istanbul = require('gulp-istanbul');
const isparta = require('isparta');
const runSequence = require('run-sequence');

// transform all required files
require('babel-core/register');

// Files to process
const TEST_FILES = 'tests/**/*.js';
const SRC_FILES = 'app/**/*.js';

/*
 * Instrument files using istanbul and isparta
 */
gulp.task('coverage:instrument', function() {
  return gulp.src(SRC_FILES)
    .pipe(istanbul({
      instrumenter: isparta.Instrumenter // Use the isparta instrumenter (code coverage for ES6)
      // Istanbul configuration (see https://github.com/SBoudrias/gulp-istanbul#istanbulopt)
      // ...
    }))
    .pipe(istanbul.hookRequire()); // Force `require` to return covered files
});

/*
 * Write coverage reports after test success
 */
gulp.task('coverage:report', function() {
  return gulp.src(SRC_FILES, {read: false})
    .pipe(istanbul.writeReports({
      // Istanbul configuration (see https://github.com/SBoudrias/gulp-istanbul#istanbulwritereportsopt)
      // ...
    }));
});

/**
 * Run unit tests
 */
gulp.task('test', function() {
  return gulp.src(TEST_FILES, {read: false})
    .pipe(mocha({
      require: ['./node_modules/jsdom/lib/jsdom'] // Prepare environement for React/JSX testing
    }));
});

gulp.task('test:single', function() {
  console.log(process.argv[4]);
  return gulp.src(process.argv[4], {read: false})
    .pipe(mocha({
      require: ['./tests/test_helper.js', './node_modules/jsdom/lib/jsdom'] // Prepare environement for React/JSX testing
    }));
});

/**
 * Run unit tests with code coverage
 */
gulp.task('test:coverage', function() {
  runSequence('coverage:instrument', 'test', 'coverage:report');
});

/**
 * Watch files and run unit tests on changes
 */
gulp.task('tdd', function() {
  gulp.watch([
    TEST_FILES,
    SRC_FILES
  ], ['test']).on('error', gutil.log);
});
