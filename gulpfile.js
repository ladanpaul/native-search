const gulp = require('gulp')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const autoprefixer = require('gulp-autoprefixer')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync').create()

gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: "./dist",
    }
  })
})

const paths = {
  src: {
    data: 'src/data/*.json',
    html: 'src/*.html',
    js: 'src/js/**/*.js',
    img: 'src/img/**/*.*',
    css: 'src/scss/**/*.scss',
  },
  dist: {
    data: 'dist/data',
    html: 'dist/',
    js: 'dist/js',
    img: 'dist/img',
    css: 'dist/css',
  }
}

gulp.task('bundleHtml', () => {
  return gulp.src(paths.src.html)
    .pipe(gulp.dest(paths.dist.html))
    .pipe(browserSync.stream())
})

gulp.task('bundleCss', () => {
  return gulp.src(paths.src.css)
    .pipe(sourcemaps.init())
    .pipe(sass({
      errorLogToConsole: true,
      outputStyle: 'compressed',
    }))
    .on('error', console.error.bind(console))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.dist.css))
    .pipe(browserSync.stream())
})

gulp.task('bundleImg', () => {
  return gulp.src(paths.src.img)
    .pipe(gulp.dest(paths.dist.img))
    .pipe(browserSync.stream())
});

gulp.task('bundleData', () => {
  return gulp.src(paths.src.data)
    .pipe(gulp.dest(paths.dist.data))
})

gulp.task('bundleJs', () => {
  return gulp.src(paths.src.js)
    .pipe(gulp.dest(paths.dist.js))
    .pipe(browserSync.stream())
})


gulp.task('watch', () => {
  gulp.watch(paths.src.html, gulp.series('bundleHtml'))
  gulp.watch(paths.src.css, gulp.series('bundleCss'))
  gulp.watch(paths.src.js, gulp.series('bundleJs'))
  gulp.watch(paths.src.img, gulp.series('bundleImg'))
})

gulp.task('default', gulp.parallel(['bundleData', 'bundleHtml', 'bundleCss', 'bundleJs', 'bundleImg', 'browser-sync', 'watch']))