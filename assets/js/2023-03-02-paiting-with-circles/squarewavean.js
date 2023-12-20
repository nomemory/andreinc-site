const sqaureWaveAn = (s) => {
    addShowFps(s);
    addPaintGrid(s);
    addLineDashed(s);
    addArrow(s);

    const d = 50;
    const r = d / 2;
    const w = 1000;
    const h = 500;
    const wBuff = 400;
    const hBuff = 200;
    const step = 3 * r;

    let canvas;
    let buff1, buff1T;
    let buff2, buff2T;
    let buff3, buff3T;
    let buff4, buff4T;

    let inc = 1;
    const f = 0.01;
    let cL = 1.5 * r;
    let i = 0.75;

    s.setup = () => {
        canvas = s.createCanvas(w, h);
        canvas.parent('square-wave-f-an-sketch');
        s.frameRate(theme.frameRate / 3);
        s.textFont(theme.textFont);

        buff1T = s.createVector(2 * r, 4*r);
        buff2T = s.createVector(buff1T.x + wBuff + 50 + 2 * r, buff1T.y);
        buff3T = s.createVector(buff1T.x, buff1T.y + 100 + wBuff / 2);
        buff4T = s.createVector(buff2T.x, buff3T.y);

        buff1 = s.coefficientBuf(1.5, 1);
        buff2 = s.coefficientBuf(1.5, 2);
        buff3 = s.coefficientBuf(1.5, 3);
        buff4 = s.coefficientBuf(1.5, 4);
    }

    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(buff1, 0, 0);
        s.image(buff2, 500, 0);
        s.image(buff3, 0, 300);
        s.image(buff4, 500, 300);

        s.showFps();

        s.drawFsq(buff1, buff1T, cL, 1);
        s.drawFsq(buff2, buff2T, cL, 2);
        s.drawFsq(buff3, buff3T, cL, 3);
        s.drawFsq(buff4, buff4T, cL, 4);

        i += f * inc;
        cL += i * inc;

        if (i > 1.35 || i < 0.75) {
            inc *= -1
        }
    }

    s.h = (x) => {
        return (x > 0) ? 1 : 0;
    }

    s.fsq = (L, x) => {
        return 2 * (s.h(x / L) - s.h(x / L - 1)) - 1;
    }

    s.drawFsq = (buff, buffT, L, n) => {
        // compute An 
        s.push();
        s.fill(theme.cosineColor);
        // painting the sinusoid
        s.beginShape(s.LINES);
        let prev = s.fsq(L, 0) * s.cos(0);
        ys = [];
        ys.push(prev);
        for (let x = 1; x < 2 * L; x += 0.5) {
            let cur = s.fsq(L, x) * s.cos(s.PI * n * x / L);
            s.vertex(buffT.x + (x - 1), buffT.y - prev * step);
            s.vertex(buffT.x + x, buffT.y - cur * step);
            ys.push(cur);
            prev = cur;
        }
        s.endShape();
        //painting areas
        s.beginShape(s.LINES);
        for (let x = 0, i = 0; x < 2 * L; x += 4, i+=8) {
            s.stroke(ys[i] > 0 ? 'green' : 'red');
            let oSet = (ys[i] > 0) ? +1 : -1;
            s.vertex(buffT.x + x, buffT.y - oSet);
            s.vertex(buffT.x + x, buffT.y - ys[i] * step + oSet);
        }
        s.endShape();
        s.pop();

        s.push();
        // drawing the dotted lines
        s.lineDash(canvas, [4, 4], buffT.x - r, buffT.y + step, buffT.x, buffT.y + step);
        s.lineDash(canvas, [4, 4], buffT.x, buffT.y - step, buffT.x, buffT.y + step);
        s.lineDash(canvas, [4, 4], buffT.x + L, buffT.y - step, buffT.x + L, buffT.y + step);
        s.lineDash(canvas, [4, 4], buffT.x + 2 * L, buffT.y - step, buffT.x + 2 * L, buffT.y + step);
        s.lineDash(canvas, [4, 4], buffT.x + 2 * L, buffT.y - step, buffT.x + 2 * L + r, buffT.y - step);
        // L label
        s.text("L=" + (L / r).toFixed(2), buffT.x + L + 5, buffT.y);
        // function lines
        s.strokeWeight(3);
        s.stroke(theme.cosineColor);
        s.fill(theme.cosineColor);
        s.circle(buffT.x + L, buffT.y, 3);
        s.line(buffT.x, buffT.y - step, buffT.x + L, buffT.y - step);
        s.line(buffT.x + L, buffT.y + step, buffT.x + 2 * L, buffT.y + step);
        s.pop();
    }

    s.coefficientBuf = (L, n) => {
        let buff = s.createGraphics(wBuff, hBuff);
        let bC = s.createVector(2*r, hBuff / 2);
        s.paintGrid(
            buff,
            wBuff,
            hBuff,
            bC,
            r,
            1,
            {
                showOrigin: true,
                showX: true,
                showY: true,
            });
        buff.text(" 0", 2 * r - 13, hBuff / 2 - 5);
        buff.text("-1", 2 * r - 13, bC.y + step - 5);
        buff.text(" 1", 2 * r - 13, bC.y - step - 5);
        buff.push();
        buff.fill(theme.cosineColor);
        buff.text("f(x)", bC.x + 25, bC.y - step - 10);
        buff.pop();
        // Areas
        buff.push();
        buff.text("A" + n + "=", bC.x + 2 * step + 3 * r, bC.y - 10);
        buff.stroke(theme.textColor);
        buff.fill(theme.lightRed);
        buff.rect(bC.x + 2 * step + 3 * r + 25, bC.y - r - 5, r);
        buff.noFill();
        buff.strokeWeight(1);
        buff.text("+", bC.x + 2 * step + 5 * r + 10, bC.y - 10);
        buff.stroke(theme.textColor);
        buff.fill(theme.lightGreen);
        buff.rect(bC.x + 2 * step + 5 * r + 30, bC.y - r - 5, r);
        buff.pop();
        return buff;
    }
};

let sqaureWaveAnSketch =
    new p5(sqaureWaveAn, 'square-wave-f-an-sketch');