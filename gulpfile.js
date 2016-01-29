// =====================================
// Required
// =====================================

var gulp            = require('gulp'),
    browserSync     = require('browser-sync'),
    //http://www.browsersync.io/docs/gulp/
    sass            = require('gulp-ruby-sass'),
    //https://github.com/sindresorhus/gulp-ruby-sass
    prefix          = require('gulp-autoprefixer'),
    //https://github.com/sindresorhus/gulp-autoprefixer
    cp              = require('child_process'),
    concat          = require('gulp-concat'),
    //https://github.com/wearefractal/gulp-concat
    changed         = require('gulp-changed'),
    //https://github.com/sindresorhus/gulp-changed
    rename          = require('gulp-rename'),
    //https://github.com/hparra/gulp-rename
    size            = require('gulp-size'),
    //https://github.com/sindresorhus/gulp-size
    sourcemaps      = require('gulp-sourcemaps'),
    //https://github.com/floridoo/gulp-sourcemaps
    uglify          = require('gulp-uglify'),
    //https://github.com/terinjokes/gulp-uglify
    runSequence     = require('run-sequence'),
    //https://github.com/OverZealous/run-sequence
    imagemin        = require('gulp-imagemin'),
    //https://github.com/sindresorhus/gulp-imagemin
    plumber         = require('gulp-plumber'),
    //https://github.com/floatdrop/gulp-plumber
    del             = require('del'),
    //https://github.com/sindresorhus/del
    gulpFilter      = require('gulp-filter'),
    //https://github.com/sindresorhus/gulp-filter
    imageResize     = require('gulp-image-resize'),
    //https://github.com/scalableminds/gulp-image-resize
    htmlmin         = require('gulp-htmlmin'),
    //https://github.com/jonschlinkert/gulp-htmlmin
    jade            = require('gulp-jade');
    //https://github.com/phated/gulp-jade

// Browser Sync
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

// =====================================
// Jekyll Task
// =====================================

// Build the Jekyll Site
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

// Rebuild the Jekyll site and reload the browser
gulp.task('jekyll-rebuild', function () {
    browserSync.reload();
    runSequence('jekyll-build', ['js', 'js:vendor', 'sass', 'img']);
});

// =====================================
// Browser-Sync Task
// =====================================

// Wait for Jekyll, then start server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: 'site'
        },
        notify: false
    });
});

// =====================================
// Sass Task
// =====================================

gulp.task('sass', function () {
    // Don't write Sourcemaps of Sourcemaps
    var filter = gulpFilter(['*.css', '!*.map'], {restore: true});
    return sass('_assets/_scss/main.sass', {style: 'compressed', sourcemap: true })
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(filter) // Don't write Sourcemaps of Sourcemaps
        .pipe(sourcemaps.write())
        .pipe(filter.restore) // Recreate original files
        .pipe(gulp.dest('site/css'))
        .pipe(browserSync.reload({stream:true}))
});

// =====================================
// Jade Task
// =====================================

gulp.task('jade', function(){
  return gulp.src('_src/_jadefiles/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('_src/_includes'));
});

// =====================================
// Scripts Task
// =====================================

gulp.task('js', function(){
    return gulp.src(['_assets/_js/**/*.js', '!_assets/_js/**/*.min.js'])
        .pipe(plumber())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('site/js'))
        .pipe(browserSync.reload({stream:true}));
});

// Compile the files of `_src/_assets/_vendor` to `site/js`, `site/css` etc. (for live injecting)
gulp.task('js:vendor', function(){
    return gulp.src('_assets/_vendor/**/*.js')
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('site/js'))
        .pipe(browserSync.reload({stream:true}));
});

// =====================================
// Image optimization Task
// =====================================

// Delete images in `site`
gulp.task('delimgsite', function(cb) {
    del([
        'site/img/**/*'
    ], cb);
});

// Delete images in `site` and `_assets/_img`
// Die Task delimgsite wird innerhalb von delimg aufgerufen
gulp.task('delimg', ['delimgsite'], function() {
    del([
        '_assets/_img/*-*'
    ], cb);
});


// Optimize images
gulp.task('img', function () {
    return gulp.src(['_assets/_img/*.*'])
        .pipe(changed('site/img'))
        .pipe(imagemin())
        .pipe(gulp.dest('site/img'))
        .pipe(browserSync.reload({stream:true}));
});

// Generate small and large thumbnails
// The task `thumbb` is called inside `thumbnails`
gulp.task('thumbnails', ['thumb', 'img'], function () {
    gulp.src(['_assets/_img/**/*.*', '!_assets/_img/*-*.*'])
        .pipe(imageResize({
            width : 1024,
            height : 768,
            crop : true,
            upscale : false,
            GraphicsMagick: true
        }))
        .pipe(imagemin())
        .pipe(rename({suffix: '-large'}))
        .pipe(gulp.dest('_assets/_img'))
        .pipe(size({showFiles: true}))
        .pipe(gulp.dest('site/img'));
});

// Is called above in `thumbnails`
gulp.task('thumb', function () {
    gulp.src(['_assets/_img/**/*.*', '!_assets/_img/*-*.*'])
        .pipe(imageResize({
            width : 320,
            height : 240,
            crop : true,
            upscale : false,
            GraphicsMagick: true
        }))
        .pipe(imagemin())
        .pipe(rename({suffix: '-thumb'}))
        .pipe(gulp.dest('_assets/_img'))
        .pipe(size({showFiles: true}))
        .pipe(gulp.dest('site/img'));
});

// =====================================
// Minify HTML Task
// =====================================
gulp.task('minify', function() {
  return gulp.src('site/**/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true
    }))
    .pipe(gulp.dest('site'))
});

// =====================================
// Watch Task
// =====================================

gulp.task('watch', function () {
    gulp.watch('_assets/_vendor/**/*.scss', ['sass']);
    gulp.watch('_assets/_scss/**/*.sass', ['sass']);
    gulp.watch(['_assets/_js/**/*.js', '!/_assets/_js/vendor/**/*.js'], ['js']);
    gulp.watch('_assets/_img/**/*', ['img']);
    gulp.watch(['_src/**/*.html', '_src/_includes/*', '_src/_posts/*'], ['jekyll-rebuild']);
    gulp.watch('_src/_jadefiles/*.jade', ['jade']);
    gulp.watch('_config.yml', ['jekyll-rebuild']);
    gulp.watch('_src/_data/**/*.yml', ['jekyll-rebuild']);
});

gulp.task('build', function(callback) {
    runSequence('jekyll-build', ['js', 'js:vendor', 'sass', 'delimgsite', 'img', 'minify']);
});

// =====================================
// Default Task
// =====================================

// Default task. With `gulp` the assets are compiled and the Jekyll site is prepared for upload
gulp.task('default', ['build']);

// With `gulp serve` Sass and the Jekyll site get compiled
// BrowserSync gets started & the files are being watched
gulp.task('serve', function(callback) {
    runSequence('jekyll-build', ['js', 'js:vendor', 'sass', 'img', 'browser-sync'], 'watch');
});
