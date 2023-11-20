const oneNegative = (s) => {
    addPaintGrid(s);
    addLineDashed(s);
    addShowFps(s);

    const d = 100;
    const r = d / 2;
    const w = 800;
    const h = 300;
    const tf = theme.frequency / 5;
    let tph = s.HALF_PI;

    let canvas;
    let angls = 0;

    let vC; // standard circle center
    let vR; // standard circle moving radius
    let vRN; // negative frequency moving radius
    let vG; // the grid center for the standard circle
    let vMP; // moving point for the main circle
    let vMPN; // moving point for negative frequency
    let vMPS; // moving point for the sum

    let stdBuff; // graphics buffer for the standard circle

    let lsx, lsy, lsnx, lsny, lex, ley;


    s.initConditions = () => {
        vC = s.createVector(2 * r, 2 * r);
        vG = s.createVector(vC.x + 2 * r, vC.y);
        vMPS = s.createVector(vG.x, vG.y);
        lex = vMPS.x;
        ley = vMPS.y;
        stdBuff = s.createGraphics(w, 4 * r);
        vMP = s.createVector(vG.x, vC.y);
        lsx = vMP.x;
        lsy = vMP.y;
        vMPN = s.createVector(vG.x, vG.y);
        lsnx = vMPN.x;
        lsny = vMPN.y;
        vR = s.createVector(
            vC.x + s.sin(angls + tph) * r,
            vC.y + s.cos(angls + tph) * r
        );
        vRN = s.createVector(
            vC.x + s.sin(-angls + tph) *r,
            vC.y + s.cos(-angls + tph) *r
        );        
        // Paint the grid(s) on the graphical buffers
        s.paintGrid(stdBuff, w, 4 * r, vG, r, 1, {
            showUnits: true,
            hideUnitsXNeg: true,
            showOrigin: true
        });

        // Paint the standard circle
        s.push();
        stdBuff.circle(vC.x, vC.y, 3);
        stdBuff.circle(vC.x, vC.y, d);
        s.pop();
    }

    s.setup = () => {
        // Create Canvas of given size 
        canvas = s.createCanvas(w, h);
        canvas.parent('one-negative-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);
        s.initConditions();
    }

    s.draw = () => {
        s.background(theme.bkgColor);

        // Paint the two graphical buffers
        s.image(stdBuff, 0, 0);
        s.noFill();

        // Moving radius for standard
        s.push();
        s.stroke(theme.sineColor);
        s.line(vC.x, vC.y, vR.x, vR.y);
        s.circle(vR.x, vR.y, 3);
        s.stroke(theme.cosineColor);
        s.line(vC.x, vC.y, vRN.x, vRN.y);
        s.circle(vRN.x, vRN.y, 3);
        s.pop();

        // Moving Points
        stdBuff.push();
        stdBuff.stroke(theme.sineColor);
        stdBuff.line(vMP.x, vMP.y, lsx, lsy);
        lsx = vMP.x;
        lsy = vMP.y;
        stdBuff.stroke(theme.cosineColor);
        stdBuff.line(vMPN.x, vMPN.y, lsnx, lsny);
        lsnx = vMPN.x;
        lsny = vMPN.y;
        stdBuff.pop();

        // Movign circles
        s.push();
        s.fill(theme.sineColor);
        s.stroke(theme.sineColor);
        s.circle(vMP.x, vMP.y, 3);
        s.fill(theme.cosineColor);
        s.stroke(theme.cosineColor);
        s.circle(vMPN.x, vMPN.y, 3);
        s.fill(theme.thetaColor);
        s.circle(vMPS.x, vMPS.y, 3);
        s.pop();

        // Connecting the moving red circles with the moving radiuses
        s.push();
        s.stroke(theme.radiusColorLight);
        s.lineDash(canvas, [3, 3], vMP.x, vMP.y, vR.x, vR.y);
        s.lineDash(canvas, [3, 3], vMPN.x, vMPN.y, vRN.x, vRN.y);
        s.pop();

        // Adding the sum
        stdBuff.push();
        stdBuff.stroke(theme.thetaColor);
        stdBuff.line(lex, ley, vMPS.x, vMPS.y);
        lex = vMPS.x;
        stdBuff.pop();


        // Moving text near the points
        s.push();
        s.fill(theme.sineColor);
        s.text("sin(x)", vMP.x + 5, vMP.y + 5);
        s.fill(theme.cosineColor);
        s.text("sin(-x)", vMPN.x + 5, vMPN.y + 5);
        s.fill(theme.thetaColor);
        s.text("sin(x)+sin(-x)=0", vMPS.x + 5, vMPS.y + 5);
        s.pop();

        // Animation increments
        vR.x = vC.x + s.sin(angls + tph) * r;
        vR.y = vC.y + s.cos(angls + tph) * r;
        vRN.x = vC.x + s.sin(-angls + tph) *r;
        vRN.y = vC.y + s.cos(-angls + tph) *r;
        vMP.x += tf * r;
        vMP.y = vC.y - s.sin(angls) * r;
        vMPN.x += tf * r;
        vMPN.y = vC.y - s.sin(-angls) * r;
        vMPS.x += tf*r;
        angls += tf;
        if (vMP.x > w) {
            s.initConditions();
        }

        s.showFps();
    }
}

let oneNegativeSketch =
    new p5(oneNegative, 'one-negative-sketch');