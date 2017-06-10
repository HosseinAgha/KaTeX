const fontkit = require('fontkit');
const fs = require('fs');
const vazirFont = fontkit.openSync('Vazir-Code.ttf');

// const font = fontkit.openSync('../static/fonts/KaTeX_Main-Regular.ttf');
// const SarifRegularMetrics = require('../src/fontMetricsData.js')['Main-Regular'];

function generateVazirCodeMetrics() {
    const unitsPerEm = vazirFont.unitsPerEm;
    let glyphs = [];
    for (let i = 0x0600; i <= 0x06FF; i++) {
        glyphs.push(vazirFont.glyphForCodePoint(i));
    }

    let metrics = {};
    for (let i = 0; i < glyphs.length; i++) {
        const cbox = glyphs[i].cbox;
        const height = cbox.maxY / unitsPerEm;
        let minY = 0;
        if (cbox.minY !== 0) {
            minY = -cbox.minY;
        }
        const depth = minY / unitsPerEm;
        let charCode = (0x0600 + i) + "";
        metrics[charCode] = [ depth, height, 0, 0 ];
        // const width = cbox.maxX - cbox.minX;
    }
    return metrics;
}

fs.writeFileSync(
  './fontMetrics.json',
  JSON.stringify(generateVazirCodeMetrics(), null, '\t'),
  'utf-8'
  );
