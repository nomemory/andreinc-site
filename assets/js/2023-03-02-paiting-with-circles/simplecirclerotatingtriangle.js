const simpleCircleRotatingTriangle = (s) => {

    addPaintGrid(s);
    addShowFps(s);

    const d = 200;
    const r = d / 2;
    const f = theme.frequency;
    const ar = d / 6;
    const reset = s.TWO_PI + s.HALF_PI;

    let angle = s.HALF_PI;
    let bTxtY1, bTxtY2, bTxtY3;
    let buff;
    let vC, vR, vRProj, vSL, vCL, vThet;

    s.setup = () => {
        // Create Canvas of given size 
        const canvas = s.createCanvas(theme.canvasX, theme.canvasY);
        canvas.parent('simple-circle-rotating-triangle-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);

        // Initialise
        vC = s.createVector(s.width / 2, s.height / 2);
        vR = s.createVector(
            vC.x + s.sin(angle) * r,
            vC.y + s.cos(angle) * r
        );
        let halfAngle = angle / 2;
        vThet = s.createVector(
            vC.x + s.sin(halfAngle) * ar,
            vC.y + s.cos(halfAngle) * ar
        );
        vRProj = s.createVector(vR.x, vC.y);
        vSL = s.createVector(0, 0);
        vCL = s.createVector(0, 0);
        buff = s.createGraphics(s.width, s.width);
        s.paintGrid(buff, s.width, s.height, vC, r / 5, 5, {
            showUnits: true,
            showOrigin: true,
            showY: true,
            showX: true
        });
        buff.circle(vC.x, vC.y, d);

        // Initialise bottom text positions
        bTxtY1 = s.height - 5;
        bTxtY2 = bTxtY1 - 15;
        bTxtY3 = bTxtY2 - 15;
    };

    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(buff, 0, 0);

        vR.x = vC.x + s.sin(angle) * r;
        vR.y = vC.y + s.cos(angle) * r;
        vRProj.x = vR.x;

        // Updating movement
        const soff = (angle >= s.PI && angle < s.TWO_PI) ? -45 : 2;
        const coff = (angle >= s.HALF_PI && angle) < 1.5 * s.TWO_PI ? 15 : -5;
        vSL.x = vR.x + soff
        vSL.y = (vC.y + vR.y) / 2;
        vCL.x = (vC.x + vR.x) / 2 - 10;
        vCL.y = vC.y + coff;
        vThet.x = vC.x + s.sin(angle/2) * ar / 1.5;
        vThet.y = vC.y + s.cos(angle/2) * ar / 1.5;

        // Drawing arc
        s.push();
        s.stroke(theme.thetaColor);
        s.fill(theme.thetaColorLight);
        s.arc(vC.x, vC.y, ar, ar, s.HALF_PI-angle, 0);
        s.pop();

        // Drawing arc text
        s.push();
        s.fill(theme.thetaColor);
        s.text("θ", vThet.x, vThet.y);
        s.pop();

        // Moving radius
        s.push();
        s.stroke(theme.radiusColorLight);
        s.line(vC.x, vC.y, vR.x, vR.y);
        s.circle(vR.x, vR.y, 3);
        s.circle(vRProj.x, vRProj.y, 3);
        s.pop();

        // Sine
        s.push();
        s.stroke(theme.sineColor);
        s.line(vRProj.x, vRProj.y, vR.x, vR.y);
        s.pop();

        // Sine label
        s.push();
        s.fill(theme.sineColor);
        s.text("sin(θ)", vSL.x, vSL.y);
        s.pop();

        // Cosine
        s.push();
        s.stroke(theme.cosineColor);
        s.line(vRProj.x, vRProj.y, vC.x, vC.y);
        s.pop();

        // Cosine label
        s.push();
        s.fill(theme.cosineColor);
        s.text("cos(θ)", vCL.x, vCL.y)
        s.pop();

        // Moving Point
        s.push();
        s.text("(", vR.x + 2, vR.y);
        s.fill(theme.sineColor);
        s.text("sin(θ)", vR.x + 7, vR.y)
        s.fill(theme.textColor);
        s.text(", ", vR.x + 48, vR.y);
        s.fill(theme.cosineColor);
        s.text("cos(θ)", vR.x + 60, vR.y);
        s.fill(theme.textColor);
        s.text(")", vR.x + 100, vR.y);
        s.pop();

        // // Bottom left-side numbers
        s.push();
        s.fill(theme.thetaColor);
        s.text("    θ  = " + ((angle-s.HALF_PI)*180/s.PI).toFixed(2) + "°", 5, bTxtY3);
        s.fill(theme.sineColor);
        s.text("sin(θ) = " + s.sin(angle).toFixed(2), 5, bTxtY2);
        s.fill(theme.cosineColor);
        s.text("cos(θ) = " + s.cos(angle).toFixed(2), 5, bTxtY1);
        s.pop();

        // Reset
        angle += f;
        if (angle > reset) {
            angle = s.HALF_PI;
        }

        s.showFps();
    };

};

let simpleCircleRotatingTriangleSketch =
    new p5(simpleCircleRotatingTriangle, 'simple-circle-rotating-triangle-sketch');

