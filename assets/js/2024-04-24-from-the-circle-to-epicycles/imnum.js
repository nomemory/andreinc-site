const imNums = (s) => {
    addShowFps(s);
    addPaintGrid(s);
    addLineDashed(s);
    addArrow(s);

    const d = 100;
    const r = d / 2;
    const w = 400;
    const h = 600;
    const foff = 12;

    const e = 2.718281828459;
    const tpfY = h/2 - 3.5 * r;
    const sqrt7Y = h/2 - s.sqrt(7) * r;
    const meY = h/2 + e * r;

    let canvas;

    let vG;
    let buff;

    s.setup = () => {
        // Create Canvas of given size 
        canvas = s.createCanvas(w, h);
        canvas.parent('imnums-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);
        vG = s.createVector(2*r, h/2);
        buff = s.createGraphics(6*r, h);
        s.paintGrid(buff, 6*r, h, vG, r, 1, {
            showUnits: true,
            hideUnitsXPos: true,
            hideUnitsXNeg: true,
            showOrigin: true,
            showX: true,
            hideXLabel: true,
            yLabel: "Im",
            complexSystem: true
        });

        // addLineDashed(buff);
        // addArrow(buff);
        
        // 3,5
        buff.push();
        buff.fill(255);
        buff.circle(vG.x, tpfY, 5);
        s.arrowDashed(canvas, [3,3], vG.x + 2*r, tpfY, vG.x + 5, tpfY);
        buff.fill(theme.radiusColor);
        buff.text("3.5i", vG.x + 2*r + 10, tpfY);
        buff.pop();

        // sqrt 7
        buff.push();
        buff.fill(255);
        buff.circle(vG.x, sqrt7Y, 5);
        s.arrowDashed(canvas, [3,3], vG.x + 2*r, sqrt7Y, vG.x + 5, sqrt7Y);
        buff.fill(theme.radiusColor);
        buff.text("√7i", vG.x + 2*r + 10, sqrt7Y);
        buff.pop();

        // -e
        buff.push();
        buff.fill(255);
        buff.circle(vG.x, meY, 5);
        s.arrowDashed(canvas, [3,3], vG.x + 2*r, meY, vG.x + 5, meY);
        buff.fill(theme.radiusColor);
        buff.text("-ei", vG.x + 2*r + 10, meY);
        buff.pop();

        s.image(buff, 0, 0);
    }
}

let imNumsSketch =
    new p5(imNums, 'imnums-sketch');