const tightFourier = (s) => {
    addShowFps(s);
    addPaintGrid(s);
    addLineDashed(s);
    addArrow(s);
    addPauseLoop(s);

    const d = 50;
    const r = d / 2;
    const w = 400;
    const h = 200;
    const L = 2 * r;
    const step = 3 * r;

    let canvas;
    let vG;
    let buff;

    let n = 1;

    s.setup = () => {
        canvas = s.createCanvas(w, h);
        canvas.parent('tight-fourier-sketch');
        s.textFont(theme.textFont);
        s.frameRate(1);
        vG = s.createVector(4 * r, h / 2);
        buff = s.createGraphics(w, h);
        s.paintGrid(buff, w, h, vG, r, 2, {
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
        buff.fill(theme.cosineColor);
        buff.text("f(x)", vG.x + 30, vG.y - 3 * r - 10);
        buff.pop();
    }

    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(buff, 0, 0);

        s.push();
        s.stroke(theme.cosineColor);
        s.strokeWeight(1);
        s.line(vG.x, vG.y - 3 * r, vG.x + 4 * r, vG.y - 3 * r);
        s.line(vG.x + 4 * r, vG.y + 3 * r, vG.x + 8 * r, vG.y + 3 * r);
        s.pop();

        // numbers
        // Ls on X
        s.push();
        s.lineDash(canvas, [4, 4], vG.x, vG.y + 3 * r, vG.x, vG.y);
        s.lineDash(canvas, [4, 4], vG.x + 8 * r, vG.y, vG.x + 8 * r, vG.y - 3 * r);
        s.lineDash(canvas, [4, 4], vG.x - 4 * r, vG.y + 3 * r, vG.x, vG.y + 3 * r);
        s.lineDash(canvas, [4, 4], vG.x + 8 * r, vG.y - 3 * r, vG.x + 12 * r, vG.y - 3 * r);
        s.lineDash(canvas, [4, 4], vG.x, vG.y, vG.x, vG.y - 3 * r); //?
        s.lineDash(canvas, [4, 4], vG.x + 8 * r, vG.y + 3 * r, vG.x + 8 * r, vG.y);
        s.lineDash(canvas, [4, 4], vG.x + 4 * r, vG.y - 3 * r, vG.x + 4 * r, vG.y + 3 * r);
        s.pop();

        // s(x)
        s.push();
        s.fill(theme.sineColor);
        s.text("s(x), n=" + n, vG.x + 5 * r - 8, vG.y + 1.5 *r);
        s.pop();

        s.push();
        s.fill(theme.textColor);
        s.circle(vG.x + 2 * r, vG.y, 3);
        s.circle(vG.x + 4 * r, vG.y, 3);
        s.circle(vG.x + 6 * r, vG.y, 3);
        s.circle(vG.x + 8 * r, vG.y, 3);
        s.pop();
        s.showFps();

        s.push();
        s.beginShape(s.LINES);
        let prev = s.sqf(n, 0);
        for (let x = 0; x < 2*L/r; x += 0.02) {
            let next = s.sqf(n, x);
            s.stroke(theme.sineColor);
            s.vertex(vG.x + x * L, vG.y - prev * step);
            s.vertex(vG.x + x * L, vG.y - next * step);
            prev = next;
        }
        s.endShape();
        s.pop();
        n++;
        if (n > 15) n = 1;
    }


    s.sqf = (n, x) => {
        let sum = 0;
        for (let i = 1; i <= n; i++) {
            sum += s.sin((2 * i - 1) * 0.5*s.PI * x) / (2 * i - 1);
        }
        return sum * 4/s.PI;
    }

}

let tightFourierSketch =
    new p5(tightFourier, 'tight-fourier-sketch');