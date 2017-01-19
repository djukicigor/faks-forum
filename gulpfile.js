var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');
var cssnano = require('gulp-cssnano');


// Preparing tasks

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
});

gulp.task('sass', function() {
    return gulp.src('app/scss/style.scss')
        .pipe(sass())
        .on('error', swallowError)
        .pipe(cssnano())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', function (){
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

function swallowError (error) {

    // If you want details of the error in the console
    console.log(error.toString())

    this.emit('end')
}

// Build part

// Optimizing CSS and JavaScript
gulp.task('minify-css', function() {
    return gulp.src('app/css/style.css')
        .pipe(cssnano())
        .pipe(gulp.dest('app/css/style.min.css'));
});

gulp.task('default', function(callback) {
    runSequence(['sass', 'minify-css', 'browserSync'], 'watch',
        callback
    )
});