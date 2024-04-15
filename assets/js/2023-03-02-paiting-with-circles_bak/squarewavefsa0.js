const sqaureWaveFA0 = (s) => {
    addShowFps(s);
    addPaintGrid(s);
    addLineDashed(s);
    addArrow(s);
    addPauseLoop(s);

    const d = 50;
    const r = d / 2;
    const w = 400;
    const h = 200;

    let canvas;
    let vG;
    let buff;
    let i = 1.2;

    s.setup = () => {
        canvas = s.createCanvas(w, h);
        canvas.parent('square-wave-f-a0-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate/theme.frameRate);
        vG = s.createVector(w / 4, h / 2);
        buff = s.createGraphics(w, 8 * r);
        s.paintGrid(buff, w, 8 * r, vG, r, 2, {
            showOrigin: true,
            showX: true,
            showY: true,
        });
        buff.push();
        buff.text(" 1", vG.x - 15, vG.y - 3 * r);
        buff.circle(vG.x, vG.y - 3 * r, 3);
        buff.text("-1", vG.x - 15, vG.y + 3 * r);
        buff.circle(vG.x, vG.y + 3 * r, 3);
        buff.text(" 0", vG.x - 15, vG.y - 3);
        buff.text("A0=S1+S2", r / 2, vG.y - 2 * r);
        buff.fill(theme.cosineColor);
        buff.text("f(x)", vG.x+30 , vG.y-3*r-10);
        buff.pop();

        s.background(theme.bkgColor);
        s.image(buff, 0, 0);

        s.push();
        s.stroke(theme.cosineColor);
        s.strokeWeight(4);
        s.line(vG.x, vG.y - 3 * r, vG.x + 4 * r * i, vG.y - 3 * r);
        s.line(vG.x + 4 * r * i, vG.y + 3 * r, vG.x + 8 * r * i, vG.y + 3 * r);
        s.pop();

        // numbers
        // Ls on X
        s.push();
        s.lineDash(canvas, [4, 4], vG.x, vG.y + 3 * r, vG.x, vG.y);
        s.lineDash(canvas, [4, 4], vG.x + 8 * r * i, vG.y, vG.x + 8 * r * i, vG.y - 3 * r);
        s.lineDash(canvas, [4, 4], vG.x - 4 * r * i, vG.y + 3 * r, vG.x, vG.y + 3 * r);
        s.lineDash(canvas, [4, 4], vG.x + 8 * r * i, vG.y - 3 * r, vG.x + 12 * r * i, vG.y - 3 * r);
        s.lineDash(canvas, [4, 4], vG.x, vG.y, vG.x, vG.y - 3 * r); //?
        s.lineDash(canvas, [4, 4], vG.x + 8 * r * i, vG.y + 3 * r, vG.x + 8 * r * i, vG.y);
        s.lineDash(canvas, [4, 4], vG.x + 4 * r * i, vG.y - 3 * r, vG.x + 4 * r * i, vG.y + 3 * r);
        s.strokeWeight(0);
        s.fill(theme.lightGreen);
        s.rect(vG.x, vG.y - 3 * r, 4 * r * i, 3 * r);
        s.fill(theme.lightRed)
        s.rect(vG.x + 4 * r * i, vG.y, 4 * r * i, 3 * r);
        s.pop();

        s.push();
        s.fill(theme.textColor);
        s.circle(vG.x + 2 * r * i, vG.y, 3);
        s.circle(vG.x + 4 * r * i, vG.y, 3);
        s.text("L=" + i.toFixed(2), vG.x + 4 * r * i + 5, vG.y - 10);
        s.circle(vG.x + 6 * r * i, vG.y, 3);
        s.circle(vG.x + 8 * r * i, vG.y, 3);
        s.text("S1", vG.x + 2 * r * i / 2, vG.y - 1.5 * r);
        s.text("S2", vG.x + 6 * r * i, vG.y + 1.5 * r);
        s.pop();

        s.noLoop();
    }
}

let sqaureWaveFA0Sketch =
    new p5(sqaureWaveFA0, 'square-wave-f-a0-sketch');