'use strict';

var gulp = require('gulp');
var del = require('del');
var babel = require('gulp-babel');

gulp.task('default', ['clean', 'build']);
gulp.task('dev', ['clean', 'build', 'buildExamples']);
gulp.task('clean', () => {
    return del([
        './lib/*/*',
        './lib/*'

    ]);
});

gulp.task('build', () => {
    return gulp.src(['src/*.js'])
               .pipe(babel())
               .pipe(gulp.dest('./lib'));
});

gulp.task('buildExamples', () => {
    return gulp.src(['examples/*.js'])
               .pipe(babel())
               .pipe(gulp.dest('./lib/examples'));
});
