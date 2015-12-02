const gulp = require('gulp'); // used to run gulp
const sass = require('gulp-sass'); // used to compile scss files to css
const autoprefixer = require('gulp-autoprefixer'); // used to parse css files and add vendor prefixes based on the last versions of all the browsers
const eslint = require('gulp-eslint'); // used to lint all javascript using eslinter
const webpack = require('webpack'); // used to transpile ES6 to ES5 using Babel
const webpackConfig = require('./webpack.config'); // config needed for webpack
const del = require('del'); // used to create gulp tasks that delete files
const runSequence = require('run-sequence'); // used to make sure certain tasks run in sequence, rather than parralel
const fs = require('fs');
const realFavicon = require('gulp-real-favicon');
const path = require('path');
const change = require('gulp-change');
const gls = require('gulp-live-server');
const portInService = require('port-in-service');

require('./test.js');


const config = {
  app_name: 'React Stack Boilerplate',
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
    favicon_data: 'app/assets/favicon_data.json',
    favicon_src: 'app/assets/images/favicon.png',
    layout_file: 'app/components/Layout.jsx',
  },
};

gulp.task('process-scripts', function(callback) {
  webpack(webpackConfig, function() {
    callback();
  });
});

// Task for processing sass files. Uses gulp-sass to create a single css file
// in the destination folder. Autoprefixer will automatically write prefixes on
// css for last 2 versions.
gulp.task('process-styles', function() {
  return gulp.src(config.paths.main_style_src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(config.paths.styles_dest));
});

// Task for processing static content such as images and fonts. Will just copy
// the files from source to destination.
gulp.task('process-images-and-fonts', function() {
  gulp.src(config.paths.fonts_src)
    .pipe(gulp.dest(config.paths.fonts_dest));
  gulp.src(config.paths.images_src)
    .pipe(gulp.dest(config.paths.images_dest));
});

// Task for cleaning up the build folder. Thus we make sure the build folder is
// emtpy before we build the project.
gulp.task('cleanup', function() {
  return del([
    'build/*',
  ]);
});

// Task for linting all our javascript inside our application.
gulp.task('lint-scripts', function() {
  return gulp.src(config.paths.scripts_src)
    .pipe(eslint())
    .pipe(eslint.format());
});

// Task for fixing all linting errors which can be auto-fixed.
gulp.task('lint:fix', function() {
  return gulp.src(config.paths.scripts_src, {base: '.'})
    .pipe(eslint({fix: true}))
    .pipe(gulp.dest('.'))
    .pipe(eslint.format());
});

// Generate favicons via realfavicongenerator.com API
gulp.task('process-favicon', function(done) {
  realFavicon.generateFavicon({
    masterPicture: config.paths.favicon_src,
    dest: config.paths.images_dest,
    iconsPath: '/images',
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#ffffff',
        margin: '21%'
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'whiteSilhouette',
        backgroundColor: '#da532c',
        onConflict: 'override'
      },
      androidChrome: {
        pictureAspect: 'noChange',
        themeColor: '#ffffff',
        manifest: {
          name: config.app_name,
          display: 'browser',
          orientation: 'notSet',
          onConflict: 'override'
        }
      },
      safariPinnedTab: {
        pictureAspect: 'silhouette',
        themeColor: '#5bbad5'
      }
    },
    settings: {
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false
    },
    markupFile: config.paths.favicon_data,
  }, function() {
    // Replace existing {fav} block content with newly created tags
    const replaced = '{/* fav */}\n' + JSON.parse(fs.readFileSync(config.paths.favicon_data)).favicon.html_code.replace(/>/g, ' />') + '\n{/* /fav */}';

    gulp.src(config.paths.layout_file)
    .pipe(change(function(content) {
      const changed = content.replace(/{\/\* fav \*\/}(.|\n)*{\/\* \/fav \*\/}/, replaced);
      return changed;
    }))
    .pipe(gulp.dest(path.dirname(config.paths.layout_file)));

    // Cleanup favicon data file
    del(config.paths.favicon_data);
    done();
  });
});


// Serve, watch and reload
gulp.task('dev-server', function() {
  // Start the server at the beginning of the task
  const server = gls.new('run.js');
  server.start();

  gulp.watch('build/**/*', function(file) {
    // Restart Express server
    server.start.bind(server)();

    // Check availability of port 3000, to determine if server is up
    function checkServerUp() {
      portInService(3000, function(up) {
        if (up) {
          server.notify.apply(server, [file]);
        } else {
          setTimeout(checkServerUp, 100);
        }
      });
    }
    checkServerUp();
});


// Task that watches if any of the files inside a certain directory have changed.
// If so, kick off the corresponding task to make sure everything in the build folder
// is up-to-date.
gulp.task('watch', function() {
  gulp.watch([config.paths.images_src, config.paths.fonts_src], ['process-images-and-fonts']);
  gulp.watch(config.paths.styles_src, ['process-styles']);
  gulp.watch(config.paths.scripts_src, ['lint-scripts', 'process-scripts']);
  gulp.watch(config.paths.favicon_src, ['process-favicon']);
});

// Task that will build the app. runSequence is used to make sure the build folder is
// cleaned first. When cleanup is done, all the other tasks will be executed parallel.
gulp.task('build', function(callback) {
  runSequence('cleanup', ['process-favicon', 'process-images-and-fonts', 'process-styles'], 'process-scripts', callback);
});

// Default tasks that are executed when you enter gulp in the command line.
gulp.task('default', function(callback) {
  runSequence('build', 'lint-scripts', 'dev-server', 'watch', callback);
});
