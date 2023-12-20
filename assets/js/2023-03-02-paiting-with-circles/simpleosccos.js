    const simpleOscCos = (s) => {

    addPaintGrid(s);
    addLineDashed(s);
    addShowFps(s);

    const h = 400;
    const w = 400;

    const d = 60;
    const r = d / 2;
    const f = theme.frequency;

    let canvas;
    let angl = 0;
    let vGS, vGC, vC, vR, vMS, vMC;
    let cBuff;
    let lastSineX, lastSineY, lastCosineX, lastCosineY;

    const paintGridProps = {
        showUnits: true,
        hideUnitsXNeg: true,
        showOrigin: true,
    };

    s.initConditions = () => {
        vC = s.createVector(2 * r, 2 * r);
        vGS = s.createVector(4 * r, vC.y);
        vGC = s.createVector(vC.x, 4 * r);
        vR = s.createVector(
            vC.x + s.sin(angl) * r,
            vC.y + s.cos(angl) * r,
        );
        vMS = s.createVector(vGS.x, vGS.y);
        vMC = s.createVector(vGC.x, vGC.y);
        cBuff = s.createGraphics(w, h);
        s.paintGrid(cBuff, s.width, 4 * r, vGS, r, 1, {
            showUnits: true,
            hideUnitsXNeg: true,
            showOrigin: true,
            hideLabels: true
        });
        lastSineX = vGS.x;
        lastSineY = vGS.y;
        s.paintGrid(cBuff, 4 * r, s.height, vGC, r, 1, {
            showUnits: true,
            hideUnitsYPos: true,
            showOrigin: true,
            invertY: true,
            hideLabels: true
        });
        lastCosineX = vGC.x+r;
        lastCosineY = vGC.y;
        angl = s.HALF_PI;
    }

    s.setup = () => {
        // Create Canvas of given size 
        canvas = s.createCanvas(w, h);
        canvas.parent('simple-osc-cos-sketch');

        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);
        s.initConditions();
    }

    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(cBuff, 0, 0);
        s.noFill();

        // Moving Circle
        vR.x = vC.x + s.sin(angl) * r;
        vR.y = vC.y + s.cos(angl) * r;
        // Moving sine
        vMS.x += f * r;
        vMS.y = vC.y + s.cos(angl) * r;
        // Moving cosine
        vMC.x = vC.x + s.sin(angl) * r;
        vMC.y += f * r

        // Paint the oscilating circle 
        s.push();
        s.noFill();
        s.circle(vC.x, vC.y, 2 * r);    // the actual center
        s.circle(vC.x, vC.y, 3);        // the center of the text
        s.pop();

        // Radius
        s.push();
        s.stroke(theme.radiusColorLight);
        s.line(vC.x, vC.y, vR.x, vR.y);
        s.pop();

        // The sine projection
        s.push();
        s.stroke(theme.sineColor);
        s.line(vR.x, vR.y, vR.x, vC.y);
        s.pop();

        // The cosine projection
        s.push();
        s.stroke(theme.cosineColor);
        s.line(vC.x, vC.y, vR.x, vC.y);
        s.pop();

        // The moving point as the sine wave progresses
        cBuff.line(lastSineX, lastSineY, vMS.x, vMS.y);
        lastSineX = vMS.x;
        lastSineY = vMS.y;
        // The moving point as the cosine wave progresses
        cBuff.line(lastCosineX, lastCosineY, vMC.x, vMC.y);
        lastCosineX = vMC.x;
        lastCosineY = vMC.y;

        // Red circle(s)
        s.push();
        s.stroke(theme.sineColor);
        s.circle(vR.x, vR.y, 3);
        s.circle(vMS.x, vMS.y, 3);
        s.stroke(theme.cosineColor);
        s.circle(vR.x, vC.y, 3);
        s.circle(vMC.x, vMC.y, 3);
        s.pop();

        // Text near the red circle sin(x) = v
        s.push();
        s.noStroke();
        s.fill(theme.sineColor);
        s.text("sin(" + (angl-s.HALF_PI).toFixed(2) + ")=" + s.sin(angl-s.HALF_PI).toFixed(2), vMS.x + 5, vMS.y + 5);
        s.pop();

        // Text near the blue circle cos(x) = v
        s.push();
        s.noStroke();
        s.fill(theme.cosineColor);
        s.text("cos(" + (angl-s.HALF_PI).toFixed(2) + ")=" + s.cos(angl-s.HALF_PI).toFixed(2), vMC.x + 5, vMC.y + 5);
        s.pop();

        // Projection on the x-axis of the sine
        s.push();
        s.stroke(theme.sineColor);
        s.line(vMS.x, vMS.y, vMS.x, vGS.y);
        s.pop();

        // Projection on the x-axis of the cosine
        s.push();
        s.stroke(theme.cosineColor);
        s.line(vMC.x, vMC.y, vGC.x, vMC.y);
        s.pop();

        // A dashed line to connect the vR with the vMS
        s.push();
        s.stroke(theme.radiusColorLight);
        s.lineDash(canvas, [3, 3], vR.x, vR.y, vMS.x, vMS.y);
        s.pop();

        // A dashed line to connect the vR with vMC
        s.push();
        s.stroke(theme.radiusColorLight);
        s.lineDash(canvas, [3, 3], vR.x, vR.y, vMC.x, vMC.y);
        s.pop();

        // increment angle
        angl += f;
        if (vMS.x > w) {
            // The sine exits the canvas, we start again
            s.initConditions();
        }
        s.showFps();
    };
};

let simpleOscCosSketch =
    new p5(simpleOscCos, 'simple-osc-cos-sketch');