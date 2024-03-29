const simpleOsc = (s) => {

    addPaintGrid(s);
    addLineDashed(s);
    addShowFps(s);

    const h = 180;
    const w = 600;

    const d = 60;
    const r = d / 2;
    const f = theme.frequency;

    let canvas;
    let angl = s.HALF_PI;
    let vG, vC, vR, vMS;
    let cBuff;
    let lastSineX, lastSineY;

    const paintGridProps = {
        showUnits: true,
        hideUnitsXNeg: true,
        showOrigin: true,
        showY: true,
        showX: true,
    };

    s.initConditions = () => {
        vG = s.createVector(h / 2 + r, h / 2);
        vC = s.createVector(h / 2 - r, h / 2);
        vR = s.createVector(
            vC.x + s.sin(angl) * r,
            vC.y + s.cos(angl) * r,
        );
        angl = s.HALF_PI;
        vMS = s.createVector(vG.x, vG.y);
        cBuff = s.createGraphics(w, h);
        s.paintGrid(cBuff, s.width, s.height, vG, r, 1, paintGridProps);
        lastSineX = vG.x;
        lastSineY = vG.y;
    }

    s.setup = () => {
        // Create Canvas of given size 
        canvas = s.createCanvas(w, h);
        canvas.parent('simple-osc-sketch');
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
        vMS.x += f * r;
        vMS.y = vR.y;

        // Horizontal lines at [-1 and 1]
        s.push();
        s.stroke(theme.radiusColorLight);
        s.lineDash(canvas, [3, 3], vC.x, vC.y - r, vG.x, vG.y - r);
        s.lineDash(canvas, [3, 3], vC.x, vC.y + r, vG.x, vG.y + r);
        s.pop();

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

        // The moving point as the sine wave progresses
        cBuff.line(lastSineX, lastSineY, vMS.x, vMS.y);
        lastSineX = vMS.x;
        lastSineY = vMS.y;

        // Red circle(s)
        s.push();
        s.stroke(theme.sineColor);
        s.circle(vR.x, vR.y, 3);
        s.circle(vMS.x, vMS.y, 3);
        s.pop();

        // Text near the red circle sin(x) = v
        s.push();
        s.noStroke();
        s.fill(theme.sineColor);
        s.text("sin(" + (angl-s.HALF_PI).toFixed(2) + ")=" + s.sin(angl-s.HALF_PI).toFixed(2), vMS.x + 5, vMS.y + 5);
        s.pop();

        // Projection on the x-axis
        s.push();
        s.stroke(theme.sineColor);
        s.line(vMS.x, vMS.y, vMS.x, vG.y);
        s.pop();

        // A dashed line to connect the vR with the vMS
        s.push();
        s.stroke(theme.radiusColorLight);
        s.lineDash(canvas, [3, 3], vR.x, vR.y, vMS.x, vMS.y);
        s.pop();

        // Updat the moving sine point coordinates
        angl += f;
        if (vMS.x > w) {
            // The sine exits the canvas, we start again
            s.initConditions();
        }
        s.showFps();
    };
};

let simpleOscSketch =
    new p5(simpleOsc, 'simple-osc-sketch');

