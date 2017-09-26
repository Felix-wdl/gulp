//引入插件
var gulp = require('gulp'),
  htmlmin = require('gulp-htmlmin'),
  cleanCSS = require('gulp-clean-css'),
  base64 = require('gulp-base64'),
  uglify = require('gulp-uglify'),
  imagemin = require('gulp-imagemin');
//声明打包位置
var path = {
  input: { //入口
    html: ['./src/*.html'],
    images: ['./src/images/*'],
    css: ['./src/css/*.css'],
    js: ['./src/js/*.js'],
    plugins: ['./src/plugins/*']
  },
  output: { //出口
    html: 'dist',
    images: 'dist/images',
    css: 'dist/css',
    js: 'dist/js',
    plugins: 'dist/plugins'
  }
};

//压缩图片
gulp.task('minImages', function () {
  gulp.src(path.input.images)
    .pipe(imagemin())
    .pipe(gulp.dest(path.output.images));
  console.log('build images');
});
//图片转base64+压缩css
gulp.task('minCss', function () {
  gulp.src(path.input.css)
    .pipe(base64())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(path.output.css));
  console.log('build css');
});

//压缩js
gulp.task('formatJS', function () {
  gulp.src(path.input.js)
    .pipe(uglify())
    .pipe(gulp.dest(path.output.js));
  console.log('build js');
});

//copy第三方js
gulp.task('copyOther', function () {
  gulp.src(path.input.plugins)
    .pipe(gulp.dest(path.output.plugins));
  console.log('copy other');
});
//压缩Html
gulp.task('formatHtml', function () {
  var options = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: true,//压缩HTML
    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true//压缩页面CSS
  };
  gulp.src(path.input.html)
    .pipe(htmlmin(options))
    .pipe(gulp.dest(path.output.html));
  console.log('build html');
});
//打包命令
gulp.task('build', ['minImages', 'minCss', 'formatJS', 'copyOther', 'formatHtml'], function () {
  console.log('build...');
});
