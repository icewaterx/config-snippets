var gulp = require("gulp");
var nodeSass = require("gulp-sass");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var htmlReplace = require('gulp-html-replace');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');


//使用node-sass编译,提升速度,这里没有使用autoprefixer
gulp.task('styles', function() {

    gulp.src('src/stylesheets/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(nodeSass({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('src/stylesheets/sass-build'))
        .pipe(livereload());

});

//js处理 没有经过jslint
gulp.task('scripts', function() {

    gulp.src(['src/javascripts/2.js','src/javascripts/1.js'])
        .pipe(concat('app.js',{newLine: ';'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/javascripts'));

});

//处理发布后的html
gulp.task('html', function() {

    gulp.src(['src/*.html'],{base: "src"})
        .pipe(htmlReplace({
            'css': 'stylesheets/app.css',
            'js': 'javascripts/app.js'
        }))
        .pipe(gulp.dest('dist'));

});

//清理发布时的目录
gulp.task('clean', function(cb) {
    del(['dist/**/*'], cb);
});


//文件复制
gulp.task('copy', function() {

    gulp.src(['src/fonts/**','src/html/**','src/images/**','src/lib/**'],{base: 'src'})
        .pipe(gulp.dest('dist'));

    gulp.src('src/stylesheets/sass-build/app.css',{base:'src/stylesheets/sass-build'})
        .pipe(gulp.dest('dist/stylesheets'))

});

//开发阶段
gulp.task('dev', function() {
    gulp.start('watch');
});

//文件变化
gulp.task('watch', function() {

    //liveload 需要服务器环境
    livereload.listen();
    gulp.watch('src/stylesheets/sass/**/*.scss',['styles']);

});

//发布 发布前先清理dist目录
gulp.task('build', ['clean'] , function() {

    //start 并发异步执行
    gulp.start('styles','scripts','html');

});

gulp.task('depoly',['build'], function() {

    gulp.start('copy');

});

