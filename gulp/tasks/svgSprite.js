import svgSprite from "gulp-svg-sprite";

export const svgIcons = () => {
    return app.gulp.src(app.path.src.svgIcons, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                type: "SVG_SPRITE",
                message: "Error <%= error.message %>"
            })
        ))
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: `../icons/icons.svg`,
                    example: true
                }
            }
        }))
        .pipe(app.gulp.dest(app.path.build.images))

};