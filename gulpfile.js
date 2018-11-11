/* ----------------------------------------------------
  Common commands

  gulp dev
  gulp custom-bootstrap
  gulp copy-vendors


---------------------------------------------------- */

// 'tfs' per esportare nella root del progetto
// 'local' per esportare in _source/build
const devEnvironment = 'local';

const destFolder = (function () {
  if (devEnvironment === 'local') return 'build';
  else return '../';
}()); 



/* ----------------------------------------------------
  Requires
---------------------------------------------------- */
const gulp = require('gulp'),
      sass = require('gulp-sass'),
      data = require('gulp-data'),      
      stylus = require('gulp-stylus'),
      sourcemaps = require('gulp-sourcemaps'),
      babel = require('gulp-babel'),
      webserver = require('gulp-webserver'),
      concat = require('gulp-concat'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      browserSync = require('browser-sync').create(),
      ready = require("gulp-file-ready"),
      rename = require('gulp-rename'),
      nunjucksRender = require('gulp-nunjucks-render'),
      tfs = require('gulp-tfs-checkout')
;
 

 
/* ----------------------------------------------------
  Nunjucks
---------------------------------------------------- */
gulp.task('nunjucks', function() {

  return gulp
    .src(['src/pages/**/*.+(html|nunjucks|njk)'])
    // Renders template with nunjucks
    .pipe(nunjucksRender({
      path: ['src'],
      envOptions: {
        tags: {
          variableStart: '{$',
          variableEnd: '$}',
        }
      } 
    }))
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest(destFolder))
    .pipe(browserSync.stream())
  ;
});



/* ----------------------------------------------------
  Sass
---------------------------------------------------- */
gulp.task('sass', () => {
  return setTimeout( () => {
    return gulp
      .src('src/css/scss/**/*.scss')
      .pipe(sass())
      .pipe(sourcemaps.write(destFolder))    
      .pipe(postcss([
        autoprefixer({ browsers: ['last 2 versions'] })])
      ) 
      .pipe(gulp.dest(destFolder))
      .pipe(browserSync.stream())
    ;
  }, 1000); 
}); 



/* ----------------------------------------------------
  Stylus
---------------------------------------------------- */
gulp.task('stylus', () => {
  return gulp.src(['src/css/global.styl', 'src/components/**/*.styl', 'src/pages/**/*.styl'], {base: 'src'})
    .pipe(sourcemaps.init()) 
    .pipe(stylus())
    .on('error', err => console.log(err))
    .pipe(postcss([
      autoprefixer({ browsers: ['last 3 versions'] })])
    ) 
    .pipe(sourcemaps.write('.'))  
    .pipe(gulp.dest(destFolder))
    .pipe(browserSync.stream())
  ;
});


/* ----------------------------------------------------
  Babel
---------------------------------------------------- */
gulp.task('babel', () => {
  return gulp
    .src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({ 
      // plugins: ['transform-runtime'],
      presets: ['env'] 
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(destFolder))
    .pipe(browserSync.stream())
  ;
}); 



/* ----------------------------------------------------
  Custom bootstrap
---------------------------------------------------- */
gulp.task('custom-bootstrap', () => {
  return gulp.src('src/css/bootstrap/scss/**/*.scss')
    .pipe(sass())
    .pipe(sourcemaps.init())     
    .pipe(postcss([autoprefixer]))
    .pipe(sourcemaps.write()) 
    .pipe(gulp.dest(destFolder + '/css/bootstrap/'))
  ;
});



/* ----------------------------------------------------
  Webserver
---------------------------------------------------- */
gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      fallback:   'index.html',
      livereload: true,
      directoryListing: true,
      port: 8080,
      open: 'http://localhost:8080/build/index.html' 
    }));
});



/* ----------------------------------------------------
  Copy vendor files from /node_modules into /vendor
---------------------------------------------------- */
gulp.task('copy-vendors', function() {
  
  // [ node folder, /Subfolder to include]
  // [ node folder, '/' ] to include all files in the root 
  const folders = [
    ['@fancyapps', '/fancybox/dist'],
    ['animejs', '/'],
    ['animate.css', '/'],
    ['bootstrap', '/dist'],
    ['font-awesome', ''],
    ['jquery', '/dist'],
    ['jquery-ui-dist', '/'],
    ['scrollreveal', '/dist'],
    ['slick-carousel', '/slick'],
    ['stickyfilljs', '/dist'],
    ['vue', '/dist'],
  ];

  
  folders.forEach( item => {
    gulp
    .src([`node_modules/${item[0] + (item[1] || '')}/**/*`])
    .pipe(gulp.dest(destFolder + `/vendor/${item[0] + (item[1] || '')}`))
    ;
  });
  
  // Per copiare solo i singoli file
  // [ folder, filename ]
  const files = [
    ['jasmine-jquery', 'lib/jquery.easing.min.js'],    
    ['jquery.easing', 'jquery.easing.min.js'],    
    ['lodash', 'lodash.min.js'],    
    ['requirejs', 'require.js'],
  ];

  files.forEach( item => {
    gulp
      .src([`node_modules/${item[0]}/${item[1]}`])
      .pipe(gulp.dest(destFolder + `/vendor/${item[0]}`))
    ;
  });

});


/* ----------------------------------------------------
  Browser Sync
---------------------------------------------------- */
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: '/build'
    },
  })
}); 





/* ----------------------------------------------------
  Copy full build folder
---------------------------------------------------- */
gulp.task('copyBuild', function() {
  gulp.src(['build/**/*.*', '!build/**/*.njk', '!build/**/img/*.*'])
    .pipe( gulp.dest('../'))
  ;
});


/* ----------------------------------------------------
  Copy compiled JS
---------------------------------------------------- */
gulp.task('copyJS', function() {
  if(wsDev) {
    gulp.src(['build/**/*.js', 'build/**/*.js.map'])
      .pipe( gulp.dest('../'))
    ;
  }
});


/* ----------------------------------------------------
  Copy compiled CSS
---------------------------------------------------- */
gulp.task('copyCSS', function() {
  if(wsDev) {
    gulp.src(['build/**/*.css', 'build/**/*.css.map'])
      .pipe( gulp.dest('../'))
    ;
  }
});


/* ----------------------------------------------------
  TFS CHECKOUT
  *** NON FUNZIONA ***
  * ERRORE DI SCRITTURA SUI FILE *
---------------------------------------------------- */
gulp.task('checkout', function () {
  if (devEnvironment === 'tfs') {
    return;
  } else {

    return gulp
      .src([
        './_source/**/*',
        './components/**/*',
        './css/**/*',
        './pages/**/*',
      ])
      .pipe(tfs.checkout())
    ;
  }
});


/* ----------------------------------------------------
  Static Server + watching files
---------------------------------------------------- */
gulp.task('dev', ['stylus'], function () {
  browserSync.init({
      server: "./build"
  }); 
  
  gulp.watch('src/**/*.js', ['babel']);
  gulp.watch('src/**/*.njk', ['nunjucks']);
  gulp.watch('src/css/bootstrap/**/*.scss', ['custom-bootstrap']);
  gulp.watch("build/*.html").on('change', browserSync.reload);
  gulp.watch('src/**/*.styl', ['stylus']);


});    