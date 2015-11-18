const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const eslint = require('gulp-eslint');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const del = require('del');
const runSequence = require('run-sequence');

const config = {
  paths: {
    main_style_src: './app/assets/styles/main.scss',
    styles_src: ['app/assets/styles/**/*.scss'],
    styles_dest: 'build/assets/styles/',
    images_src: 'app/assets/images/*',
    images_dest: 'build/assets/images',
    fonts_src: 'app/assets/fonts/*',
    fonts_dest: 'build/assets/fonts',
    main_script_src: './client.js',
    scripts_src: ['*.js', 'app/**/*.js', 'app/**/*.jsx'],
    scripts_dest: 'build/scripts/',
  },
};

gulp.task('process-scripts', function(callback) {
  webpack(webpackConfig, function() {
    callback();
  });
});

gulp.task('process-styles', function() {
  return gulp.src(config.paths.main_style_src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(config.paths.styles_dest));
});

gulp.task('process-images-and-fonts', function() {
  gulp.src(config.paths.fonts_src)
    .pipe(gulp.dest(config.paths.fonts_dest));
  gulp.src(config.paths.images_src)
    .pipe(gulp.dest(config.paths.images_dest));
});

gulp.task('cleanup', function() {
  return del([
    'build/*',
  ]);
});

gulp.task('lint-scripts', function() {
  return gulp.src(config.paths.scripts_src)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('watch', function() {
  gulp.watch([config.paths.images_src, config.paths.fonts_src], ['process-images-and-fonts']);
  gulp.watch(config.paths.styles_src, ['process-styles']);
  gulp.watch(config.paths.scripts_src, ['lint-scripts', 'process-scripts']);
});

gulp.task('build', function() {
  runSequence('cleanup', ['process-images-and-fonts', 'process-styles', 'process-scripts']);
});

gulp.task('default', ['build', 'watch']);
