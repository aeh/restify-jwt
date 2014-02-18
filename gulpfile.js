var gulp = require('gulp'),
    jshint = require('gulp-jshint');

var jsFiles = ['./index.js'];

gulp.task('jshint', function() {
  gulp.src(jsFiles)
    .pipe(jshint({ node: true }))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default', function() {
  gulp.run('jshint');
});
