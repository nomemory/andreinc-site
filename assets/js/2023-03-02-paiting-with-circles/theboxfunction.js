const theBoxFunction = (s) => {
    addShowFps(s);
    addPaintGrid(s);
    addLineDashed(s);
    addArrow(s);

    const d = 20;
    const r = d / 2;
    const w = 600;
    const h = 300;
    const imp = 6 * 2 * r;
    const t = r;

    let vG;
    let buff;

    s.setup = () => {
        // Create Canvas of given size 
        const canvas = s.createCanvas(w, h);
        canvas.parent('the-box-function-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);
        vG = s.createVector(w / 2, h / 2);
        buff = s.createGraphics(w, h);
        s.paintGrid(buff, w, h, vG, r*2, 1, {
            showOrigin: true,
            showX: true,
            showY: true,
        });
        buff.push();
        buff.stroke(theme.cosineColor);
        buff.fill(theme.cosineColor);
        buff.strokeWeight(2);
        buff.line(vG.x - t, vG.y - imp, vG.x + r, vG.y - imp);
        buff.line(0, vG.y, vG.x - t, vG.y);
        buff.line(vG.x + t, vG.y, w, vG.y);
        buff.pop();

        buff.push();
        buff.textFont(theme.textFont);
        buff.fill(theme.textColor);
        buff.text("A", vG.x+5, vG.y - imp - 5);
        buff.fill(theme.cosineColor);
        buff.text("g(x)", vG.x + t + 10, vG.y - 15);
        buff.pop();


        s.push();
        s.stroke(theme.cosineColor);
        s.fill(theme.cosineColor);
        s.strokeWeight(2);
        s.lineDash(canvas, [3, 5, 3], vG.x - t, vG.y - imp, vG.x - r, vG.y);
        s.lineDash(canvas, [3, 5, 3], vG.x + t, vG.y - imp, vG.x + r, vG.y);
        s.pop();
        s.image(buff, 0, 0);
        s.noLoop();
    }
}

let theBoxFunctionSketch =
    new p5(theBoxFunction, 'the-box-function-sketch');