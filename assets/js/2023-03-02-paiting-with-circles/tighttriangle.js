const tightTriangle = (s) => {
    addShowFps(s);
    addPaintGrid(s);
    addLineDashed(s);
    addArrow(s);
    addPauseLoop(s);

    const d = 50;
    const r = d / 2;
    const w = 400;
    const h = 200;
    const limit = 4 * s.PI;

    let canvas;
    let vG;
    let buff;

    let n = 1;

    s.setup = () => {
        canvas = s.createCanvas(w, h);
        canvas.parent('tight-triangle-sketch');
        s.textFont(theme.textFont);
        s.frameRate(1);
        vG = s.createVector(4 * r, h / 2);
        buff = s.createGraphics(w, h);
        s.paintGrid(buff, w, h, vG, r, 2, {
            showOrigin: true,
            showX: true,
            showY: true,
        });
    }

    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(buff, 0, 0);

        s.push();
        s.beginShape();
        s.noFill();
        for (let x = 0; x < limit; x += 0.02) {
            s.stroke(theme.sineColor);
            s.vertex(vG.x + x * r, vG.y + s.trF(n, x) * r);
        }
        s.endShape();
        s.pop();

        // s(x)
        s.push();
        s.fill(theme.sineColor);
        s.text("s(x), n=" + n, vG.x + 5 * r - 8, vG.y + 1.5 * r);
        s.pop();

        n++;
        if (n > 6) n = 1;
    }

    s.trF = (n, x) => {
        let sum = 0;
        for (let i = 1; i <= n; i++) {
            let sign = (i % 2 == 0 ? -1 : 1);
            sum += sign * (1 / (2 * i - 1) / (2 * i - 1)) * s.sin((2 * i - 1) * x);
        }
        return sum * 8 / s.PI / s.PI;
    }
}

let tightTriangleSketch =
    new p5(tightTriangle, 'tight-triangle-sketch');