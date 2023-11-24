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

    let i = 1;

    s.setup = () => {
        canvas = s.createCanvas(w, h);
        canvas.parent('square-wave-f-a0-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);
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
        buff.pop();
    }

    s.draw = () => {
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
        s.lineDash(canvas, [4, 4], vG.x + 8 * r*i, vG.y + 3 * r, vG.x + 8 * r * i, vG.y);
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
        s.circle(vG.x + 6 * r * i, vG.y, 3);
        s.circle(vG.x + 8 * r * i, vG.y, 3);
        s.pop();

        s.pauseLoop(true, 0, theme.frameRate, 3000, () => { }, () => {
            i+=0.25;
            console.log(i);
        })
        if (i == 1.5) i = 0;
    }
}

let sqaureWaveFA0Sketch =
    new p5(sqaureWaveFA0, 'square-wave-f-a0-sketch');