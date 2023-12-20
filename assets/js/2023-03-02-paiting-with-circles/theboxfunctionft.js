const theBoxFunctionFt = (s) => {
    addShowFps(s);
    addPaintGrid(s);
    addLineDashed(s);
    addArrow(s);

    const d = 20;
    const r = d / 2;
    const w = 600;
    const h = 300;

    let canvas;
    let vG;
    let buff;

    s.setup = () => {
        // Create Canvas of given size 
        canvas = s.createCanvas(w, h);
        canvas.parent('the-box-function-ft-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);
        vG = s.createVector(w / 2, h / 2);
        buff = s.createGraphics(w, h);
        s.paintGrid(buff, w, h, vG, r, 2, {
            showOrigin: true,
            showX: true,
            showY: true,
            xLabel: 'w',
            yLabel: 'F(w)',
            showOrigin: true
        });
        buff.push();
        buff.stroke(theme.sineColor);
        buff.strokeWeight(2);
        let pX, pY, i;

        // right side of the sinc
        buff.beginShape(s.LINES);
        i = 0.1;
        pX = i * 2 * r;
        pY = s.Gf(i) * 2 * r;
        for (let cX, cY; i < s.TWO_PI * 5; i += 0.1) {
            cX =  i * 2 * r;
            cY =  s.Gf(i) * 2 * r;
            buff.vertex(vG.x + cX, vG.y - cY);
            buff.vertex(vG.x + pX, vG.y - pY);
            pX = cX;
            pY = cY;
        }
        buff.endShape();

        // left side of the sinc
        buff.beginShape(s.LINES);
        i = 0.1;
        pX = i * 2 * r;
        pY = s.Gf(i) * 2 * r;
        for (let cX, cY; i < s.TWO_PI * 5; i += 0.1) {
            cX =  i * 2 * r;
            cY =  s.Gf(i) * 2 * r;
            buff.vertex(vG.x - cX, vG.y - cY);
            buff.vertex(vG.x - pX, vG.y - pY);
            pX = cX;
            pY = cY;
        }
        buff.endShape();
        buff.pop();

        // text
        buff.push();
        buff.textFont(theme.textFont);
        buff.fill(theme.sineColor);
        buff.text("G(w)", vG.x + 8 * r, vG.y - 6 * r);
        buff.text("A", vG.x + 10, vG.y - 12 * r);
        buff.circle(vG.x, vG.y - 12 * r, 4);
        buff.pop();
    
        s.image(buff, 0, 0);
    }
    
    s.Gf = (W) => {
        return 6*s.sin(W / 2) / W * 2;
    }
}

let theBoxFunctionFtSketch =
    new p5(theBoxFunctionFt, 'the-box-function-ft-sketch');