var rep = require('gulp-replace-image-src');
var gulp = require('gulp');

gulp.task('replace', function() {

    gulp.src('dist/*.inline.html')
        .pipe(rep({
            prependSrc : '//cdn.sunmar.ru/content/cms/russia/uae_excursions/',
            keepOrigin : false
        }))
        .pipe(gulp.dest('dist'));
});