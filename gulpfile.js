var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var sass         = require('gulp-sass');
var webserver    = require('gulp-webserver');
var autoprefixer = require('gulp-autoprefixer');
 
var sourcePaths = {
  styles: ['scss/**/*.scss']
};
 
var distPaths = {
  styles: 'public/css'
};
 
var server = {
  host: 'localhost',
  port: '3000'
}
 
// Compile scss files to css
gulp.task('sass', function () {
  gulp.src( sourcePaths.styles )
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: true
    }))
    .pipe(gulp.dest( distPaths.styles ));
});
 
// Run a local webserver 
gulp.task('webserver', function() {
  gulp.src('.')
    .pipe(webserver({
      host: server.host, 
      port: server.port, 
      livereload: true,
      directoryListing: false
    }));
});
 
gulp.task('watch', function() {
  gulp.watch(sourcePaths.styles, ['sass']);
});
 
gulp.task('build', ['sass']);
 
gulp.task('default', ['build', 'webserver', 'watch']);