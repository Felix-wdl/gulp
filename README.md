## gulp 基本运用
#### 基于gulp压缩图片、转换小图片为base64并压缩css、压缩js、压缩html等完成项目打包工作。

##### [gulp 中文网地址 http://www.gulpjs.com.cn/](http://www.gulpjs.com.cn/)

### 详情步骤
1、全局安装 gulp
```js
npm install --global gulp
```
2、安装 gulp 依赖
```js
npm install --save-dev gulp
```
3、在项目根目录创建 `gulpfile.js	` 文件, 用于编写 gulp 运行任务
```js
var gulp = require('gulp');
gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});
```
4、压缩图片 (gulp-imagemin)

详情 [https://www.npmjs.com/package/gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)

```js
npm install gulp-imagemin --save-dev
```
```js
//压缩图片
gulp.task('minImages', function () {
  gulp.src(path.input.images)
    .pipe(imagemin())
    .pipe(gulp.dest(path.output.images));
  console.log('build images');
});
```


5、转换小图片为 base64 并压缩css

base64详情 [https://www.npmjs.com/package/gulp-base64](https://www.npmjs.com/package/gulp-base64)

压缩css详情 [https://www.npmjs.com/package/gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)
```js
npm install gulp-base64--save-dev
npm install gulp-clean-css--save-dev
```
```js
//图片转base64+压缩css
gulp.task('minCss', function () {
  gulp.src(path.input.css)
    .pipe(base64())
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(path.output.css));
  console.log('build css');
});
```

6、压缩js

详情 [https://www.npmjs.com/package/gulp-uglify](https://www.npmjs.com/package/gulp-uglify)

```js
npm install gulp-uglify --save-dev
```
```js
//压缩js
gulp.task('formatJS', function () {
  gulp.src(path.input.js)
    .pipe(uglify())
    .pipe(gulp.dest(path.output.js));
  console.log('build js');
});
```
7、压缩html

详情 [https://www.npmjs.com/package/gulp-htmlmin/](https://www.npmjs.com/package/gulp-htmlmin)

```js
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
```

8、运行上面所有任务
```javascript
//打包命令
gulp.task('build', ['minImages', 'minCss', 'formatJS', 'copyOther', 'formatHtml'], function () {
  console.log('build...');
});

```
9、在命令行运行打包命令即可生成 `dist` 文件夹
```js
gulp build
```
#### 附上 `gulpfile.js`

```js
//引入插件
var gulp = require('gulp'),
  minify = require('gulp-minify'),
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

```

#### `package.json`

```js
{
  "devDependencies": {
    "gulp": "^3.9.1",
    "gulp-babel": "^7.0.0",
    "gulp-base64": "^0.1.3",
    "gulp-clean-css": "^3.9.0",
    "gulp-htmlmin": "^3.0.0",
    "gulp-imagemin": "^3.3.0",
    "gulp-minify": "^1.0.0",
    "gulp-uglify": "^3.0.0"
  }
}
```
