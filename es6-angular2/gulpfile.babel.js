import gulp from 'gulp';
import gutil, { PluginError } from 'gulp-util';
import connect from 'gulp-connect';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

import browserify from 'browserify';
import watchify from 'watchify';
import babelify from 'babelify';

import del from 'del';


gulp.task('clean', () => {
  return del('www');
});

gulp.task('copy', () => {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('www'));
});

gulp.task('build', ['copy'], () => {
  const b = browserify('src/app.js')
    .transform(babelify);
  return bundle(b);
});

gulp.task('watch', () => {
  const b = browserify('src/app.js', watchify.args)
    .transform(babelify);
  const w = watchify(b)
    .on('update', () => bundle(w))
    .on('log', gutil.log);
  return bundle(w)
});

gulp.task('connect', () => {
  connect.server({
    root: 'src/',
    port: 8888
  });
});

gulp.task('connectDist', () => {
  connect.server({
    root: 'www/',
    port: 9999
  });
});


gulp.task('default', ['copy', 'watch']);


function bundle(b) {
  return b.bundle()
    .on('error', (e) => {
      const pe = new PluginError('browserify', e);
      console.log(pe.toString());
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(gulp.dest('www'));
}
