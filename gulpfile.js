const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const replace = require("gulp-replace");
const inlineCss = require("gulp-inline-css");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();

const baseDir = "./dist";

// compile sass to css
gulp.task("compileSass", function() {
  return (
    gulp
      .src("./src/sass/**/*.scss")
      // on error, do not break the process
      .pipe(sass().on("error", sass.logError))
      // output to `src/css` folder
      .pipe(gulp.dest("./src/css"))
  );
});

// build complete HTML email template
// compile sass (compileSass task) before running build
gulp.task("build", ["compileSass"], function() {
  return (
    gulp
      // import all email template (name ending with .template.pug) files from src/emails folder
      .src("src/emails/*.pug")
      // replace `.scss` file paths from template with compiled file paths
      .pipe(replace(new RegExp("/sass/(.+).scss", "ig"), "/css/$1.css"))
      // compile using Pug
      .pipe(pug())
      // inline CSS
      .pipe(inlineCss())
      // do not generate sub-folders inside dist folder
      .pipe(rename({ dirname: "" }))
      .pipe(gulp.dest("dist"))
  );
});

// browserSync task to launch preview server
gulp.task("browserSync", function() {
  return browserSync.init({
    reloadDelay: 2000, // delay reload for 2s, so pug recompiles
    server: { baseDir: baseDir }
  });
});

// task to reload browserSync
gulp.task("reloadBrowserSync", function() {
  return browserSync.reload();
});

gulp.task("watch", ["build", "browserSync"], function() {
  return gulp.watch(
    ["src/**/*", "!src/**/*.css"],
    ["build", "reloadBrowserSync"]
  );
});
