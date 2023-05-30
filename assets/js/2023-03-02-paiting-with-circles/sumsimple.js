const sumSimple = (s) => {
    addPaintGrid(s);
    addLineDashed(s);
    addShowFps(s);

    const d = 100;
    const r = d / 2;
    const w = 800;
    const h = 700;
    const tf = theme.frequency / 20;
    let tph = s.HALF_PI;

    let fBuff;  // the buffer where we plot the two sinusoids
    let sBuff;  // the buffer where we plot the sum of the two sinusoids

    let vGf;    // the center of the grid for the two sinusoids
    let vGs;    // the sum of the grid for the sum of the two sinusoids

    let y1f;    // y1(x)
    let y2f;    // y2(x)
    let yf;     // y1(x) + y2(x)

    s.initConditions = () => {
        vGf = s.createVector(2*r, 3*r);
        vGs = s.createVector(2*r, 10*r);
        fBuff = s.createGraphics(w, 6*r);
        s.paintGrid(fBuff, w, 6*r, vGf, r, 1, {
            showUnits: true,
            hideUnitsXNeg: true,
            showOrigin: true
        });
        sBuff = s.createGraphics(w, 6*r);
        s.paintGrid(sBuff, w, 6*r, vGf, r, 1, {
            showUnits: true,
            hideUnitsXNeg: true,
            showOrigin: true
        });
         // Paiting y1f and y2f on the 'fBuff'
        for(let cAngl = 0, px = vGf.x; px < w; px+=tf*r, cAngl+=tf) {
            fBuff.push();
            fBuff.stroke(theme.sineColor);
            fBuff.point(px, vGf.y - y1f(cAngl));
            fBuff.stroke(theme.cosineColor);
            fBuff.point(px, vGf.y - y2f(cAngl));
            fBuff.pop();
        }
        // Paiting y1f + y2f on the 'sBuff'
        for(let cAngl = 0, px = vGf.x; px < w; px+=tf*r, cAngl+=tf) {
            sBuff.push();
            sBuff.stroke(theme.thetaColor);
            sBuff.point(px, vGf.y - yf(cAngl));
            sBuff.pop();
        }
        // Adding text to 'fBuff'
        fBuff.push();
        fBuff.textFont(theme.textFont);
        fBuff.fill(theme.sineColor);
        fBuff.text("y1(x) =  9/10 * sin(7x + π/2)", vGf.x + 30, vGf.y + 3*r - 20);
        fBuff.fill(theme.cosineColor);
        fBuff.text("y2(x) = 12/10 * sin(3x - 2)", vGf.x + 30, vGf.y + 3*r - 3);
        fBuff.pop();

        // Adding text to 'sBuff'
        sBuff.push();
        sBuff.textFont(theme.textFont);
        sBuff.fill(theme.thetaColor);
        sBuff.text("y(x) = y1(x) + y2(x)", vGf.x + 30, vGf.y + 3*r - 20);
        sBuff.pop();
    };

    s.setup = () => {
        // Create Canvas of given size 
        canvas = s.createCanvas(w, h);
        canvas.parent('sum-simple-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);
        // Define the functions to plot
        y1f = (angl) => 0.9 * s.sin(angl*7 + s.HALF_PI) * r;
        y2f = (angl) => 1.2 * s.sin(angl*3 - 2) * r;
        yf = (angl) => y1f(angl) + y2f(angl)
        s.initConditions();
    }


    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(fBuff, 0, 0);
        s.image(sBuff, 0, 7*r);
    }
}

let sumSimpleSketch = new p5(sumSimple, 'sum-simple-sketch');