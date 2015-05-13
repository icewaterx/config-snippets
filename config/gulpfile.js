var gulp = require("gulp");
var nodeSass = require("gulp-sass");
var concat = require("gulp-concat");
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var htmlReplace = require('gulp-html-replace');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');


//ʹ��node-sass����,�����ٶ�,����û��ʹ��autoprefixer
gulp.task('styles', function() {

    gulp.src('src/stylesheets/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(nodeSass({outputStyle: 'compressed'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('src/stylesheets/sass-build'))
        .pipe(livereload());

});

//js���� û�о���jslint
gulp.task('scripts', function() {

    gulp.src(['src/javascripts/2.js','src/javascripts/1.js'])
        .pipe(concat('app.js',{newLine: ';'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/javascripts'));

});

//���������html
gulp.task('html', function() {

    gulp.src(['src/*.html'],{base: "src"})
        .pipe(htmlReplace({
            'css': 'stylesheets/app.css',
            'js': 'javascripts/app.js'
        }))
        .pipe(gulp.dest('dist'));

});

//������ʱ��Ŀ¼
gulp.task('clean', function(cb) {
    del(['dist/**/*'], cb);
});


//�ļ�����
gulp.task('copy', function() {

    gulp.src(['src/fonts/**','src/html/**','src/images/**','src/lib/**'],{base: 'src'})
        .pipe(gulp.dest('dist'));

    gulp.src('src/stylesheets/sass-build/app.css',{base:'src/stylesheets/sass-build'})
        .pipe(gulp.dest('dist/stylesheets'))

});

//�����׶�
gulp.task('dev', function() {
    gulp.start('watch');
});

//�ļ��仯
gulp.task('watch', function() {

    //liveload ��Ҫ����������
    livereload.listen();
    gulp.watch('src/stylesheets/sass/**/*.scss',['styles']);

});

//���� ����ǰ������distĿ¼
gulp.task('build', ['clean'] , function() {

    //start �����첽ִ��
    gulp.start('styles','scripts','html');

});

gulp.task('depoly',['build'], function() {

    gulp.start('copy');

});

