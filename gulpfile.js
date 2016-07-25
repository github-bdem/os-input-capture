'use strict';

var gulp = require('gulp');
var del = require('del');
var babel = require('gulp-babel');
var run = require('gulp-run');

gulp.task('default', ['clean', 'build']);

gulp.task('clean', () => {
    return del([
        'os-input-capture.js'
    ]);
});

gulp.task('build', () => {
    return gulp.src(['src/*.js'])
               .pipe(babel())
               .pipe(gulp.dest('./'));
});
