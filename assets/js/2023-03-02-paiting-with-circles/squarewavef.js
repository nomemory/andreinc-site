const sqaureWaveF = (s) => {
    addShowFps(s);
    addPaintGrid(s);
    addLineDashed(s);
    addArrow(s);

    const d = 50;
    const r = d / 2;
    const w = 400;
    const h = 200;

    let canvas;
    let vG;
    let buff;

    s.setup = () => {
        // Create Canvas of given size 
        canvas = s.createCanvas(w, h);
        canvas.parent('square-wave-f-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);
        vG = s.createVector(w / 4, h / 2);
        buff = s.createGraphics(w, 8 * r);
        s.paintGrid(buff, w, 8 * r, vG, r, 2, {
            showOrigin: true,
            showX: true,
            showY: true,
        });
        addLineDashed(buff);
        addArrow(buff);

        buff.push();
        buff.stroke(theme.cosineColor);
        buff.strokeWeight(2);
        buff.line(vG.x, vG.y - 3 * r, vG.x + 4 * r, vG.y - 3 * r);
        buff.line(vG.x + 4 * r, vG.y + 3 * r, vG.x + 8 * r, vG.y + 3 * r);
        buff.pop();
    
        // numbers
        // Ls on X
        buff.push();
        buff.fill(theme.textColor);
        buff.text("L/2", vG.x + 2 * r, vG.y + 15);
        buff.circle(vG.x + 2 * r, vG.y, 3);
        buff.text("L", vG.x + 4 * r + 5, vG.y + 15);
        buff.push();
        buff.fill(theme.cosineColor);
        buff.stroke(theme.cosineColor);
        buff.circle(vG.x + 4 * r, vG.y, 7);
        buff.pop();
        buff.fill(theme.textColor);
        buff.text("3L/2", vG.x + 6 * r, vG.y + 15);
        buff.circle(vG.x + 6 * r, vG.y, 3);
        buff.text("2L", vG.x + 8 * r + 5, vG.y + 15);
        buff.circle(vG.x + 8 * r, vG.y, 3);
        // On y
        buff.text(" 1", vG.x - 15, vG.y - 3 * r);
        buff.circle(vG.x, vG.y - 3 * r, 3);
        buff.text("-1", vG.x - 15, vG.y + 3 * r);
        buff.circle(vG.x, vG.y + 3 * r, 3);
        buff.text(" 0", vG.x - 15, vG.y - 3);
        // f(x)
        buff.fill(theme.cosineColor);
        buff.text("f(x)", vG.x + 40, vG.y-3*r-10);
        buff.pop();
        s.image(buff, 0, 0);

        s.lineDash(canvas, [4, 4], vG.x, vG.y + 3 * r, vG.x, vG.y);
        s.lineDash(canvas, [4, 4], vG.x + 8 * r, vG.y, vG.x + 8 * r, vG.y - 3 * r);
        s.lineDash(canvas, [4, 4], vG.x - 4 * r, vG.y + 3 * r, vG.x, vG.y + 3 * r);
        s.lineDash(canvas, [4, 4], vG.x + 8 * r, vG.y - 3 * r, vG.x + 12 * r, vG.y - 3 * r);
        s.lineDash(canvas, [4, 4], vG.x, vG.y, vG.x, vG.y - 3 * r);
        s.lineDash(canvas, [4, 4], vG.x + 8 * r, vG.y + 3 * r, vG.x + 8 * r, vG.y);
        s.lineDash(canvas, [4, 4], vG.x + 4 * r, vG.y - 3 * r, vG.x + 4 * r, vG.y + 3 * r);
        s.noLoop();
    }
}

let sqaureWaveFSketch =
    new p5(sqaureWaveF, 'square-wave-f-sketch');