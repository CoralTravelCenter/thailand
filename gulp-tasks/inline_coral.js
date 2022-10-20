var gulp = require('gulp');
var fileInline = require('gulp-file-inline');
var rep = require('gulp-replace-image-src');
import rename from "gulp-rename";
import replace from "gulp-replace";

gulp.task('inline_coral', function() {
    return gulp
        .src('dist/coral*.content.html')
        .pipe(rep({
            prependSrc : '//cdn.coral.ru/content/cms/russia/thailand/',
            keepOrigin : false
        }))
        .pipe(fileInline())
        .pipe(replace("<html><head></head><body>", ""))
        .pipe(replace("</body></html>", ""))
        .pipe(replace("./img/content/coral/", "//cdn.coral.ru/content/cms/russia/thailand/"))
        .pipe(replace("img/content/coral/", "//cdn.coral.ru/content/cms/russia/thailand/"))
        .pipe(rename({ suffix: ".inline" }))
        .pipe(gulp.dest('dist/inline'));
});