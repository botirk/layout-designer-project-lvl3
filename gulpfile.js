const gulp       	 = require('gulp');
const rename       = require('gulp-rename');
const sass       	 = require('gulp-sass')(require('sass'));
const browserSync  = require('browser-sync').create();
const plumber 		 = require('gulp-plumber');
const pug          = require('gulp-pug');
const svgSprite    = require('gulp-svg-sprite');

gulp.task('browser-sync', (done) => { 
  browserSync.init({
    server: { baseDir: 'build' },
    notify: false,
    port: 8080,
  });
  browserSync.watch('build').on('change', browserSync.reload);
  
  done();
});

// todo
gulp.task('compile svg', (done) => {
  gulp.src('src/images/icons/*.svg')
    .pipe(plumber())
    .pipe(svgSprite())
    .pipe(gulp.dest('build/icons'));

  done();
})

gulp.task('compile pug', (done) => {
  gulp.src('src/pug/index.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest('build'));

  done();
});

gulp.task('compile scss', (done) => {
  gulp.src('src/scss/index.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(rename('index.css'))
    .pipe(gulp.dest('build'));

  done();
});

gulp.task('watch scss', (done) => {
  gulp.watch('src/scss/**/*.scss', gulp.series('compile scss'));
  
  done();
});

gulp.task('watch pug', (done) => {
  gulp.watch('src/pug/**/*.pug', gulp.series('compile pug'));
  
  done();
});

gulp.task('default', gulp.series(gulp.parallel('compile scss', 'compile pug'), gulp.parallel('watch pug', 'watch scss', 'browser-sync')));