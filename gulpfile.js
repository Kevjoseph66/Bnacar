const {src,dest,watch,series} = require('gulp');

//Compilar css
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');


//Imagenes
const imagemin = require('gulp-imagemin');

function css(done) {
    
    src('src/scss/app.scss')///Identificar el archivoprincipal
     .pipe( sass() )   /// Compilar SASS
     .pipe(dest('build/css') ) /// Exportarlo o guardarlo en una ubicacion
 

    done();
}

function cssbuild(done) {

    src('build/css/app.css')
    .pipe( rename({
        suffix: '.min',
    }))
    .pipe( purgecss({
        content: ['index.html','noticias.html','noticia.html','servicios.html','faq.html']
    }))
    .pipe(dest('build/css'))


    done();
    
}

function dev() {
    watch('src/scss/**/*.scss',css)
}

function imagenes(done) {
    
    src('src/img/**/*')///Identificar el archivoprincipal
     .pipe( imagemin({ optimizationLevel:3}) )   /// Compilar imagemin
     .pipe(dest('build/img') ) /// Exportarlo o guardarlo en una ubicacion
 
    done();
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.default = series( imagenes, css, dev  );
exports.build = series( cssbuild  );