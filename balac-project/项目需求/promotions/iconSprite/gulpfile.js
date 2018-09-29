var gulp      = require('gulp'),
	plumber   = require('gulp-plumber'),
	clean     = require('gulp-clean'),
	replace   = require('gulp-replace'),
	rename    = require('gulp-rename'),
	svgSprite = require('gulp-svg-sprite');

	
	
var svgConfig                  = {
    shape               : {
        dimension       : {         // Set maximum dimensions
            maxWidth    : 32,
            maxHeight   : 32
        },
        spacing         : {         // Add padding
            padding     : 10
        }
    },
    mode                : {
        css            : {         // Activate the «view» mode
            bust        : false,
            render      : {
                css    : true      // Activate Sass output (with default options)
            }
        },
        symbol          : true      // Activate the «symbol» mode
    }
};
	
var time = new Date().getTime();	

gulp.task('clean', function() {  
  return gulp.src( 'assets/out', {read: false})
      .pipe(clean());
      //.pipe(notify({ message: 'clean origin task complete' }));
});

gulp.task('svg',['clean'],function(){
	console.log('concating svg file....');
	return gulp.src('*.svg', {cwd: 'originsvg'})
	.pipe(plumber())
    .pipe(svgSprite(svgConfig))
    .pipe(gulp.dest('assets/out'));
});

gulp.task('default',['svg'],function(){
	
	return gulp.src('assets/out/css/**.css')
	.pipe(gulp.dest('assets/out/css'));
})


