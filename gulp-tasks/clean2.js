"use strict";

import gulp from "gulp";
import del from "del";

gulp.task("clean2", () => {
    return del(["./dist/*.content.html"]);
});