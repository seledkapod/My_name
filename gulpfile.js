var syntax        = 'sass'; // Syntax: sass or scss;

// var gulp          = require('gulp'),
// 		gutil         = require('gulp-util' ),
// 		sass          = require('gulp-sass'),
// 		browsersync   = require('browser-sync'),
// 		concat        = require('gulp-concat'),
// 		uglify        = require('gulp-uglify'),
// 		cleancss      = require('gulp-clean-css'),
// 		rename        = require('gulp-rename'),
// 		autoprefixer  = require('gulp-autoprefixer'),
// 		notify        = require("gulp-notify"),
// 		rsync         = require('gulp-rsync');

var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		pug            = require('gulp-pug'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		// JpegOptim      = require('imagemin-jpegoptim'),
		Pngcrush       = require('imagemin-pngcrush'),
		pngquant       = require('imagemin-pngquant'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		fileinclude    = require('gulp-file-include'),
		gulpRemoveHtml = require('gulp-remove-html'),
		// ftp            = require('vinyl-ftp'),
		notify         = require("gulp-notify"),
		rsync          = require('gulp-rsync')



gulp.task('browser-sync', function() {
	browserSync({

//для использования без сервера.

		server: {
			baseDir: 'app'
		},
		notify: false,

		open: true
		// tunnel: true,
		// tunnel: "baz24", //Demonstration page: http://projectmane.localtunnel.me

//для использования с сервером

		// proxy: "project",
		// notify: false

	});
});



//Для PUG

gulp.task('pug', function () {
	gulp.src([
		// 'dev/pug/**/**/*.pug',				// Все страницы
		// 'dev/pug/**/index.pug',				// Главная
		
		// News
		// 'dev/pug/**/info.pug',				// Информация для СМИ
		// 'dev/pug/**/news.pug',				// Новости кампании
		// 'dev/pug/**/newspage.pug',			// Новости пордобнее
		// 'dev/pug/**/photo.pug',				// Photo
		// 'dev/pug/**/video.pug',				// Video

		// About
		// 'dev/pug/**/about.pug',				// О компании
		// 'dev/pug/**/aboutdirector.pug',		// Руководство
		// 'dev/pug/**/gendir.pug',				// Генеральный директор
		// 'dev/pug/**/cancellation.pug',		// Отмена доверенности
		// 'dev/pug/**/security.pug',			// Охрана труда и безопасность
		// 'dev/pug/**/disclosure.pug',			// Раскрытие информации
		// 'dev/pug/**/corruption.pug',			// Противодействие корупции
		'dev/pug/**/map-zones.pug',			// Карта зон присутствия
		
		// Consumers
		// 'dev/pug/**/tarifs.pug',				// Тарифы
		// 'dev/pug/**/proposals.pug',			// Предложения о тарифах в сфере теплоснабжения
		// 'dev/pug/**/contracting.pug',		// Информация для заключения договоров
		// 'dev/pug/**/what.pug',  				// Чаво

		// Вакансии
		// 'dev/pug/**/vacancies.pug',  		// Вакансии
		// 'dev/pug/**/vacancies-det.pug',		// Вакансии подробнее

		// Технологическое присоединение
		// 'dev/pug/**/techno1.pug',  			// Техно 1
		// 'dev/pug/**/techno2.pug',  			// Техно 2
		// 'dev/pug/**/techno3.pug',  			// Техно 3
		// 'dev/pug/**/techno4.pug',  			// Техно 4
		// 'dev/pug/**/techno5.pug',  			// Техно 5
		// 'dev/pug/**/techno6.pug',  			// Техно 6
		// 'dev/pug/**/techno7.pug',  			// Техно 7

		// procurement
		// 'dev/pug/**/procurement.pug',		// Закупки
		// 'dev/pug/**/procurement-man.pug',	// Управление закупочной деятельностью
		// 'dev/pug/**/information-sme.pug',	// Информация для субъектов МСП
		// 'dev/pug/**/contact-info.pug',		// Контактная информация
		// 'dev/pug/**/procurement-not.pug',	// Извещения о закупках
		])
		// .pipe(pug({pretty: "\t"}).on('error', function(e){
		// 	console.log(e);
		// }))
		.pipe(pug({pretty: "\t"}).on('error', notify.onError()))
		.pipe(gulp.dest('app'))
		.pipe(browserSync.reload({ stream: true 
		}))
});

gulp.task('pug_build', function () {
	gulp.src('dev/pug/**/*.pug')
		// .pipe(pug({pretty: "\t"}).on('error', function(e){
		// 	console.log(e);
		// }))
		.pipe(pug({pretty: "\t"}).on('error', notify.onError()))
		.pipe(gulp.dest('app'))
		.pipe(browserSync.reload({ stream: true }))
});



gulp.task('styles_build', function() {
	return gulp.src('dev/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({
		outputStyle: 'expanded',
		indentType: 'tab',
		indentWidth: 1
	}).on("error", notify.onError()))
	// .on('error', function(e){
	// 	console.log(e);
	// }))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer({ cascade: false }))
	.pipe(cleanCSS( {level: { 1: { specialComments: 'all' } } }).on("error", notify.onError()))
	.pipe(gulp.dest('app/assets/css'))
	.pipe(browserSync.reload({ stream: true }))
});



gulp.task('styles', function() {
	return gulp.src('dev/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({
		outputStyle: 'expanded',
		indentType: 'tab',
		indentWidth: 1
	}).on("error", notify.onError()))
	// .on('error', function(e){
	// 	console.log(e);
	// }))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	// .pipe(cleanCSS( {level: { 1: { specialComments: 'all' } } }).on("error", notify.onError()))
	.pipe(gulp.dest('app/assets/css'))
	.pipe(browserSync.reload({ stream: true }))
});



gulp.task('js', function() {
	return gulp.src([
		'dev/js/common.js', // Always at the end // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	.pipe(gulp.dest('app/assets/js'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('main_js', function() {
	return gulp.src([
		'dev/js/main.js', // Always at the end // Всегда в конце
		])
	.pipe(concat('main.min.js'))
	.pipe(gulp.dest('app/assets/js'))
	.pipe(browserSync.reload({ stream: true }))
});



gulp.task('js_build', function() {
	return gulp.src([
		// 'app/assets/libs/jquery/dist/jquery.min.js',
		// 'app/assets/libs/date_picker/jquery-ui.js',
		// 'app/assets/js/jquery.maskedinput.min.js',
		// 'app/assets/libs/owl_carousel/owl.carousel.min.js',
		// 'app/assets/libs/materialize/js/bin/materialize.js',
		// 'app/assets/libs/sliderpro/jquery.sliderPro.min.js',
		// 'app/assets/libs/datatables/datatables.min.js',
		// 'app/assets/libs/jquery-form-validator/form-validator/jquery.form-validator.js',
		// 'dev/js/main.js',
		'dev/js/common.js', // Always at the end // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify().on('error', function(e){
	// 	console.log(e);
	// })) // Minify js (opt.) // Минимизировать весь js (на выбор)
	// .pipe(uglify().on("error", notify.onError()))
	.pipe(gulp.dest('app/assets/js'))
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('mainjs_build', function() {
	return gulp.src([
		'dev/js/main.js', // Always at the end // Всегда в конце
		])
	.pipe(concat('main.min.js'))
	// .pipe(uglify().on('error', function(e){
	// 	console.log(e);
	// })) // Minify js (opt.) // Минимизировать весь js (на выбор)
	// .pipe(uglify().on("error", notify.onError()))
	.pipe(gulp.dest('app/assets/js'))
	.pipe(browserSync.reload({ stream: true }))
});



gulp.task('imagemin', function() {
	return gulp.src('app/assets/img/**/*')
	.pipe(cache(imagemin([
		imagemin.gifsicle({interlaced: true}),
		imagemin.jpegtran({progressive: true}),

//		JpegOptim({
//			max: 85,	//90
//		}),

		imagemin.svgo({removeViewBox: false}),
		imagemin.optipng(),

		// pngquant()
		// Pngcrush()

	],{
		verbose: true
	})))
	.pipe(gulp.dest('public_html/assets/img'));
});



gulp.task('rsync', function() {
	return gulp.src('dist/**')
	.pipe(rsync({
		root: 'dist/',
		hostname: 'admin_aistweb@aistweb.htmlup.ru',
		destination: 'public_html/',
		// include: ['*.htaccess'], // Includes files to deploy //включенные файлы при выгрузке
		exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy //исключенные файлы при выгрузке
		recursive: true,
		archive: true,
		silent: false,
		compress: true
	}))
});



gulp.task('watch', ['styles', 'pug', 'js', 'main_js', 'browser-sync'], function() {//Для PUG

// gulp.task('watch', ['styles', 'js', 'browser-sync'], function() {//Без PUG

	gulp.watch('dev/'+syntax+'/**/*.'+syntax+'', ['styles']);
	gulp.watch(['app/assets/libs/**/*.js', 'dev/js/common.js'], ['js']);
	gulp.watch(['app/assets/libs/**/*.js', 'dev/js/main.js'], ['main_js']);
	gulp.watch('dev/**/*.pug', ['pug']);//Для PUG
	// gulp.watch('app/*.html', browserSync.reload);
	// gulp.watch('app/.htaccess', browserSync.reload);
	// gulp.watch('app/**/*.php', browserSync.reload);
	// gulp.watch('app/**/*.html', browserSync.reload);
	gulp.watch('app/assets/libs/**/*.css', browserSync.reload);

});



gulp.task('buildhtml', function() {
	gulp.src(['app/**/*.html'])
		.pipe(fileinclude({
			prefix: '@@'
		}))
		.pipe(gulpRemoveHtml())
		.pipe(gulp.dest('public_html/'));
});



gulp.task('removedist', function() { return del.sync('public_html'); });



// gulp.task('build', ['clear', 'removedist', 'buildhtml', 'styles', 'js'], function() {//раскоментировать для новых проэктов

gulp.task('build', ['removedist', 'pug_build', 'imagemin', 'styles_build', 'js_build', "mainjs_build"], function() {//раскоментировать для новых проэктов

//gulp.task('build', ['clear', 'removedist', /*'imagemin', */'my-js', 'my-css'], function() {//закоментировать для новых проэктов

	var buildFiles = gulp.src([
		'app/.htaccess',
		'app/*.php',
		]).pipe(gulp.dest('public_html'));

	var buildCss = gulp.src([
		'app/assets/css/*.css',
		]).pipe(gulp.dest('public_html/assets/css'));

	var buildJs = gulp.src([
		'app/assets/js/scripts.min.js',
		'app/assets/js/main.js',
		]).pipe(gulp.dest('public_html/assets/js'));

	// var buildMainJs = gulp.src([
	// 	'app/assets/js/main.js',
	// 	]).pipe(gulp.dest('public_html/assets/js'));

	var buildJquery = gulp.src([
		'app/assets/libs/jquery/dist/jquery.min.js',
		'app/assets/libs/jquery/dist/jquery.min.map',
		]).pipe(gulp.dest('public_html/assets/libs/jquery/dist'));

	// var buildImages = gulp.src([
	// 	'app/assets/css/images/**/*',
	// 	]).pipe(gulp.dest('public_html/assets/css/images'));

	var buildBootstrap = gulp.src([
		'app/assets/libs/bootstrap/js/bootstrap.min.js',
		'app/assets/libs/bootstrap/js/bootstrap.min.js.map',
		]).pipe(gulp.dest('public_html/assets/libs/bootstrap/js'));

	var buildPopper = gulp.src([
		'app/assets/libs/popper/dist/umd/popper.min.js',
		'app/assets/libs/popper/dist/umd/popper.min.js.map',
		]).pipe(gulp.dest('public_html/assets/libs/popper/dist/umd'));

	// var buildValid = gulp.src([
	// 	'app/assets/libs/jquery-form-validator/form-validator/**/*.js',
	// 	]).pipe(gulp.dest('public_html/assets/libs/jquery-form-validator/form-validator'));

	// var buildRespond = gulp.src([
	// 	'app/libs/respond/*.js',
	// 	]).pipe(gulp.dest('public_html/libs/respond'));

	var buildFonts = gulp.src([
		'app/assets/fonts/**/*',
		]).pipe(gulp.dest('public_html/assets/fonts'));

	gulp.start('buildhtml');

});



gulp.task('clear', function () { return cache.clearAll(); });



gulp.task('default', ['watch']);