var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('ts:watch', () => {

    return gulp.watch('src/**/*.ts', shell.task('tsc'));
});

gulp.task('copy', function() {

    return gulp.src([
        './src/*.json'
    ])
        .pipe(gulp.dest('build/'));
});