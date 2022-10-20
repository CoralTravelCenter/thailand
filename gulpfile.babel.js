"use strict";

import gulp from "gulp";

const requireDir = require("require-dir"),
    paths = {
        views: {
            src: [
                "./src/views/index.pug",
                "./src/views/pages/*.pug"
            ],
            dist: "./dist/",
            watch: [
                "./src/blocks/**/*.pug",
                "./src/views/**/*.pug"
            ]
        },
        styles: {
            src: [ 
                "./src/styles/main_coral.{scss,sass,styl}",
                "./src/styles/coral.critical.{scss,css,sass,styl}",
                "./src/styles/coral.{scss,css,sass,styl}",
                "./src/styles/coral.dynamic.{scss,css,sass,styl}",
                "./src/styles/coral.reset.{scss,css,sass,styl}",

                "./src/styles/main_sunmar.{scss,sass,styl}",
                "./src/styles/sunmar.{scss,css,sass,styl}",
                "./src/styles/sunmar.critical.{scss,css,sass,styl}",
                "./src/styles/sunmar.dynamic.{scss,css,sass,styl}",
                "./src/styles/sunmar.reset.{scss,css,sass,styl}",
            ],
            dist: "./dist/styles/",
            watch: [
                "./src/blocks/**/*.{scss,sass,styl}",
                "./src/styles/**/*.{css,scss,sass,styl}"
            ]
        },
        scripts: {
            src: [
                "./src/js/index_coral.js",
                "./src/js/index_sunmar.js",
                "./src/js/pages/coral_js.js",
                "./src/js/pages/coral_js2.js",
                "./src/js/pages/sunmar_js.js",
                "./src/js/pages/sunmar_js2.js",
            ],
            dist: "./dist/js/",
            watch: [
                "./src/blocks/**/*.js",
                "./src/js/**/*.js"
            ]
        },
        images: {
            src: [
                "./src/img/**/*.{jpg,jpeg,png,gif,tiff,svg}",
                "!./src/img/favicon/*.{jpg,jpeg,png,gif,tiff}"
            ],
            dist: "./dist/img/",
            watch: "./src/img/**/*.{jpg,jpeg,png,gif,svg}"
        },
        webp: {
            src: [
                "./src/img/**/*.{jpg,jpeg,png,tiff}",
                "!./src/img/favicon/*.{jpg,jpeg,png,gif}"
            ],
            dist: "./dist/img/",
            watch: [
                "./src/img/**/*.{jpg,jpeg,png,tiff}",
                "!./src/img/favicon.{jpg,jpeg,png,gif}"
            ]
        },
        sprites: {
            src: "./src/img/svg/*.svg",
            dist: "./dist/img/sprites/",
            watch: "./src/img/svg/*.svg"
        },
        fonts: {
            src: "./src/fonts/**/*.{woff,woff2}",
            dist: "./dist/fonts/",
            watch: "./src/fonts/**/*.{woff,woff2}"
        },
        video: {
            src: "./src/video/*.{mp4, webm, avi, ogv, flv}",
            dist: "./dist/video/",
            watch: "./src/video/*.{mp4, webm, avi, ogv, flv}"
        },
        inline: {
            src: "./dist/*.content.html",
            dist: "./dist/inline/",
            watch: "./dist/*.content.html"
        },
        gzip: {
            src: "./src/.htaccess",
            dist: "./dist/"
        }
    };

requireDir("./gulp-tasks/");

export { paths };

export const development = gulp.series("clean", "smart-grid",
    gulp.parallel(["views", "styles", "scripts", "images", "sprites", "fonts", "video"]),
    gulp.parallel("inline_coral"),
    gulp.parallel("inline_sunmar"),
    "clean2",
    gulp.parallel("serve"));

export const prod = gulp.series("clean",
    gulp.series(["views", "styles", "scripts", "images", "sprites", "fonts", "video", "gzip", "inline_coral", "inline_sunmar", "clean2"]));

export default development;
