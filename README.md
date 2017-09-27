# gulp 基本运用
#### gulp-less + gulp-livereload + http-server + Chrome 实现本地热更新。
#### 压缩图片、转换小图片为base64并压缩css、压缩js、压缩html打包项目。

##### [gulp 中文网地址 http://www.gulpjs.com.cn/](http://www.gulpjs.com.cn/)

## 基本步骤
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

## 本地运行
1、安装Chrome IiveReload 运行环境 [下载地址](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)

2、安装完成后，在浏览器右上角会出现 ![](./src/images/mk.png) , 点击图标启动改插件(中间空心点会变为实心点)

3、在项目目录启动本地服务(http-server)，并通过启动地址+端口进行访问，详情：[https://www.npmjs.com/package/http-server](https://www.npmjs.com/package/http-server)

4、安装less插件

详情 [https://www.npmjs.com/package/gulp-less](https://www.npmjs.com/package/gulp-less)
```js
npm install gulp-less --save-dev
```
```js
//本地less -> css热更新
gulp.task('changeLess', function () {
  return gulp.src(path.devOutput.less)
    .pipe(less({
      paths: [pathUrl.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest(path.devOutput.css))
    .pipe(livereload());
});
```
5、添加html,js 更改的监听
```js
//本地html热更新监听
gulp.task('changeHtml', function () {
  gulp.src(path.input.html)
    .pipe(gulp.dest(path.devOutput.html))
    .pipe(livereload());
});
//本地js热更新监听
gulp.task('changeJS', function () {
  gulp.src(path.input.js)
    .pipe(gulp.dest(path.devOutput.js))
    .pipe(livereload());
});
```
6、添加热更新命令和本地运行命令
```js
//热更新
gulp.task('hot', function () {
  livereload.listen();
  gulp.watch(path.root, ['changeLess', 'changeHtml', 'changeJS']);
});
//本地运行
gulp.task('dev', ['hot'], function () {
  console.log('dev...');
});
```
7、运行本地运行命令即可
```js
gulp dev
```


## 打包项目
1、压缩图片 (gulp-imagemin)

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


2、转换小图片为 base64 并压缩css

base64详情 [https://www.npmjs.com/package/gulp-base64](https://www.npmjs.com/package/gulp-base64)

压缩css详情 [https://www.npmjs.com/package/gulp-clean-css](https://www.npmjs.com/package/gulp-clean-css)
```js
npm install gulp-base64 --save-dev
npm install gulp-clean-css --save-dev
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

3、压缩js

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
4、压缩html

详情 [https://www.npmjs.com/package/gulp-htmlmin/](https://www.npmjs.com/package/gulp-htmlmin)

```js
//压缩Html
gulp.task('formatHtml', function () {
  return gulp.src(path.input.html)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(path.buildOutput.html));
});
```

5、整合上面所有任务, 运行打包命令
```javascript
//打包命令
gulp.task('build', ['minImages', 'minCss', 'formatJS', 'copyOther', 'formatHtml'], function () {
  console.log('build...');
});

```
6、生成的'dist` 文件夹即为打包文件
```js
gulp build
```
