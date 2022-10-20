"use strict";

import { paths } from "../gulpfile.babel";
import gulp from "gulp";
import gulpif from "gulp-if";
import webp from "gulp-webp";
import debug from "gulp-debug";
import browsersync from "browser-sync";
import yargs from "yargs";

const plumber = require("gulp-plumber");
const notify = require("gulp-notify");

const argv = yargs.argv,
    production = !!argv.production;

gulp.task("webp", () => {
    return gulp.src(paths.webp.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: "Images",
                message: error.message
            }))
        }))
        .pipe(gulp.dest(paths.webp.dist))
        .pipe(webp(gulpif(production, imageminWebp({
            lossless: true,
            quality: 100,
            alphaQuality: 100
        }))))
        .pipe(debug({
            "title": "Images"
        }))
        .on("end", browsersync.reload);
});