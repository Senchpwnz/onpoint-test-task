import fs from "fs";
import fonter from "gulp-fonter";
import ttf2woff2 from "gulp-ttf2woff2";

export const otfToTtf = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                type: "FONTS",
                message: "Error <%= error.message %>"
            })
        ))
        .pipe(fonter({
            formats: ["ttf"]
        }))
}
export const ttfToWoff = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                type: "FONTS",
                message: "Error <%= error.message %>"
            })
        ))
        .pipe(fonter({
            formats: ["woff"]
        }))
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(`${app.path.build.fonts}`));

}
export const fontsStyle = () => {
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;

    fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
        if (fontsFile) {
            if (!fs.existsSync(fontsFile)) {
                fs.writeFile(fontsFile, "", cb);
                let newFileOnly;
                for (let i = 0; i < fontsFiles.length; i++) {
                    let fontFileName = fontsFiles[i].split(".")[0];
                    if (newFileOnly !== fontFileName) {
                        let FontName = fontFileName.split("-")[0] ? fontFileName.split("-")[0] : fontFileName;
                        let FontWeight = fontFileName.split("-")[1] ? fontFileName.split("-")[1] : fontFileName;
                        if (FontWeight.toLowerCase() === "thin") {
                            FontWeight = 100;
                        } else if (FontWeight.toLowerCase() === "extralight") {
                            FontWeight = 200;
                        } else if (FontWeight.toLowerCase() === "light") {
                            FontWeight = 300;
                        } else if (FontWeight.toLowerCase() === "medium") {
                            FontWeight = 500;
                        } else if (FontWeight.toLowerCase() === "semibold") {
                            FontWeight = 600;
                        } else if (FontWeight.toLowerCase() === "bold") {
                            FontWeight = 700;
                        } else if (FontWeight.toLowerCase() === "extrabold") {
                            FontWeight = 800;
                        } else if (FontWeight.toLowerCase() === "black" || FontWeight.toLowerCase() === "heavy") {
                            FontWeight = 900;
                        } else {
                            FontWeight = 400;
                        }
                        fs.appendFile(fontsFile, `@font-face {\n\tfont-family: ${FontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${FontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
                        newFileOnly = fontFileName;
                    }
                }
            } else {
                console.log("File scss/fonts.scss already exists. You have to delete it for update.")
            }
        }
    });

    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() { }
}