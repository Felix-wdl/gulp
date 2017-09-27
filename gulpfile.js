//引入插件
var gulp = require('gulp'),
  imagemin = require('gulp-imagemin'),
  base64 = require('gulp-base64'),
  less = require('gulp-less'),
  cleanCSS = require('gulp-clean-css'),
  uglify = require('gulp-uglify'),
  htmlmin = require('gulp-htmlmin'),
  livereload = require('gulp-livereload'),
  pathUrl = require('path');
//声明打包位置
var path = {
  //本地运行路径
  root: './src/**/*.*',
  devOutput: {
    html: './src',
    images: './src/images',
    less: './src/less/*.less',
    css: './src/css',
    js: './src/js',
    plugins: './src/plugins'
  },
  input: { //打包入口
    html: ['./src/*.html'],
    images: ['./src/images/*'],
    css: ['./src/css/*.css'],
    js: ['./src/js/*.js'],
    plugins: ['./src/plugins/*']
  },
  buildOutput: { //打包出口
    html: 'dist',
    images: 'dist/images',
    css: 'dist/css',
    js: 'dist/js',
    plugins: 'dist/plugins'
  }
};

//本地less -> css热更新
gulp.task('changeLess', function () {
  return gulp.src(path.devOutput.less)
    .pipe(less({
      paths: [pathUrl.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest(path.devOutput.css))
    .pipe(livereload());
});
//本地html热更新
gulp.task('changeHtml', function () {
  gulp.src(path.input.html)
    .pipe(gulp.dest(path.devOutput.html))
    .pipe(livereload());
});
//本地js热更新
gulp.task('changeJS', function () {
  gulp.src(path.input.js)
    .pipe(gulp.dest(path.devOutput.js))
    .pipe(livereload());
});
//热更新
gulp.task('hot', function () {
  livereload.listen();
  gulp.watch(path.root, ['changeLess', 'changeHtml', 'changeJS']);
});
//本地运行
gulp.task('dev', ['hot'], function () {
  console.log('dev...');
});
//----------------------------打包操作-------------------------------
//压缩图片
gulp.task('minImages', function () {
  return gulp.src(path.input.images)
    .pipe(imagemin())
    .pipe(gulp.dest(path.buildOutput.images));
});
//图片转base64+压缩css
gulp.task('minCss', function () {
  return gulp.src(path.input.css)
    .pipe(base64())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(path.buildOutput.css));
});
//压缩js
gulp.task('formatJS', function () {
  return gulp.src(path.input.js)
    .pipe(uglify())
    .pipe(gulp.dest(path.buildOutput.js));
});
//copy第三方js
gulp.task('copyOther', function () {
  return gulp.src(path.input.plugins)
    .pipe(gulp.dest(path.buildOutput.plugins));
});
//压缩Html
gulp.task('formatHtml', function () {
  return gulp.src(path.input.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(path.buildOutput.html));
});
//打包命令
gulp.task('build', ['minImages', 'minCss', 'formatJS', 'copyOther', 'formatHtml'], function () {
  console.log('build...');
});