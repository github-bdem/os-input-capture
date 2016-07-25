'use strict';

var gulp = require('gulp');
var del = require('del');
var babel = require('gulp-babel');

gulp.task('default', ['clean', 'build']);

gulp.task('clean', () => {
    return del([
        './lib/*'
    ]);
});

gulp.task('build', () => {
    return gulp.src(['src/*.js'])
               .pipe(babel())
               .pipe(gulp.dest('./lib'));
});
