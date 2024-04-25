const reNums = (s) => {
    addShowFps(s);
    addPaintGrid(s);
    addLineDashed(s);
    addArrow(s);

    const d = 100;
    const r = d / 2;
    const w = 800;
    const h = 400;
    const foff = 12;

    const e = 2.718281828459;
    const stwX = w/2+s.sqrt(2)*r;
    const piX = w/2+s.PI*r;
    const eX = w/2+e*r;
    const tfX = w/2+3/4*r;
    const fX = w/2+5*r;
    const mttX = w/2-10/3*r;
    const msthX = w/2-s.sqrt(3)*r;

    let canvas;

    let vG;
    let buff;

    s.setup = () => {
        // Create Canvas of given size 
        canvas = s.createCanvas(w, h);
        canvas.parent('renums-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);
        vG = s.createVector(w/2, h/2);
        buff = s.createGraphics(w, 8 * r);
        s.paintGrid(buff, w, 8 * r, vG, r, 1, {
            showUnits: true,
            hideUnitsYPos: true,
            hideUnitsYNeg: true,
            showOrigin: true,
            showX: true,
            hideYLabel: true,
            xLabel: "Re"
        });

        addLineDashed(buff);
        addArrow(buff);
        
        // π
        buff.push();
        buff.fill(255);
        buff.circle(piX, vG.y, 5);
        s.arrowDashed(canvas, [3,3], piX, vG.y + 2*r - foff, piX, vG.y + 5);
        buff.fill(theme.radiusColor);
        buff.text("π", piX - 3, vG.y + 2*r + 3);
        buff.text("≈3.14, (π ∈ R\\Q)", piX + 13, vG.y + 2*r + 3);
        buff.pop();

        
        // e
        buff.push();
        buff.fill(255);
        buff.circle(eX, vG.y, 5);
        s.arrowDashed(canvas, [3,3], eX, vG.y - 2*r + foff, eX, vG.y - 5);
        buff.fill(theme.radiusColor);
        buff.text("e", eX - 3, vG.y - 2*r + 3);
        buff.text("≈2.71 (e ∈ R\\Q)", eX + 13, vG.y - 2*r + 3);
        buff.pop();

        // sqrt(2)
        buff.push();
        buff.fill(255);
        buff.circle(stwX, vG.y, 5);
        s.arrowDashed(canvas, [3,3], stwX, vG.y + 3*r - foff, stwX, vG.y + 5);
        buff.fill(theme.radiusColor);
        buff.text("√2",stwX - 5, vG.y + 3*r + 3);
        buff.text("≈1.41 (√2 ∈ R\\Q)",stwX + 15, vG.y + 3*r + 3);
        buff.pop();

        // 3/4
        buff.push();
        buff.fill(255);
        buff.circle(tfX, vG.y, 5);
        s.arrowDashed(canvas, [3,3], tfX, vG.y - 3*r + foff, tfX, vG.y - 5);
        buff.fill(theme.radiusColor);
        buff.text("3/4", tfX - 9, vG.y - 3*r + 5);
        buff.text("≈0.75 (0.75 ∈ Q)", tfX + 17, vG.y - 3*r + 5);
        buff.pop();

        // 5
        buff.push();
        buff.fill(255);
        buff.circle(fX, vG.y, 5);
        s.arrowDashed(canvas, [3,3], fX, vG.y - r + foff, fX, vG.y - 5);
        buff.fill(theme.radiusColor);
        buff.text("5", fX - 3, vG.y - r + 3);
        buff.text("(5 ∈ N ⊂ Z)", fX + 13, vG.y - r + 3);
        buff.pop();

        // -3,3(3) = -10/3
        buff.push();
        buff.fill(255);
        buff.circle(mttX, vG.y, 5);
        s.arrowDashed(canvas, [3,3], mttX, vG.y - 3*r + foff, mttX, vG.y - 5);
        buff.fill(theme.radiusColor);
        buff.text("-10/3", mttX - 18, vG.y - 3*r - 3, 40);
        buff.text("≈3,33 (-10/3 ⊂ Q)", mttX + 22 , vG.y - 3*r + 5);
        buff.pop();

        // -sqrt(3)
        buff.push();
        buff.fill(255);
        buff.circle(msthX, vG.y, 5);
        s.arrowDashed(canvas, [3,3], msthX, vG.y + 3*r - foff, msthX, vG.y + 5);
        buff.fill(theme.radiusColor);
        buff.text("√3", msthX - 6, vG.y + 3*r + 3);
        buff.text("≈1.73 (√3 ∈ R\\Q)", msthX + 13, vG.y + 3*r + 3);
        buff.pop();

        s.image(buff, 0, 0);
    }
}

let reNumsSketch =
    new p5(reNums, 'renums-sketch');