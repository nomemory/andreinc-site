const simpleCircleWithPi = (s) => {

    addPaintGrid(s);
    addShowFps(s);
    addPauseLoop(s);

    // Constants
    const d = 200;
    const r = d / 2;
    const ar = d / 8;
    const f = theme.frequency;
    const rColor = s.color(theme.radiusColorLight);
    const t = 0.00001;
    const delay = 3000;

    // Angle
    let angl = 0;
    let ci = 0;
    let phase = s.HALF_PI;
    let reset = s.TWO_PI * (1 / f);

    // Vectors
    let vC, vR, vThet, vSL, vCL;

    let rad = {
        30: [0.52, "π/6", "1/2", "√3/2"],
        45: [0.78, "π/4", "√2/2", "√2/2"],
        60: [1.04, "π/3", "√3/2", "1/2"],
        90: [1.57, "π/2", "1", "0"],
        120: [2.09, "2π/3", "√3/2", "-1/2"],
        135: [2.35, "3π/4", "√2/2", "-√2/2"],
        150: [2.61, "5π/6", "1/2", "-√3/2"],
        180: [3.14, "π", "0", "-1"],
        210: [3.66, "7π/6", "-1/2", "-√3/2"],
        225: [3.92, "5π/4", "-√2/2", "-√2/2"],
        240: [4.18, "4π/3", "-√3/2", "-1/2"],
        270: [4.71, "3π/2", "-1", "0"],
        300: [5.23, "π/6", "-√3/2", "1/2"],
        315: [5.49, "5π/3", "-√2/2", "√2/2"],
        330: [5.75, "11π/4", "-1/2", "√3/2"],
        360: [6.28, "2π", "0", "1"]
    };

    let degr = Object.keys(rad);

    s.setup = () => {
        // Create Canvas of given size 
        const canvas = s.createCanvas(theme.canvasX, theme.canvasY);
        canvas.parent('simple-circle-with-pi-sketch');

        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);

        // Initialise the circle in the center of the canvas
        cBuff = s.createGraphics(s.width, s.height);
        vC = s.createVector(s.width / 2, s.height / 2);
        vR = s.createVector(
            vC.x + s.sin(angl * f + phase) * r,
            vC.y + s.cos(angl * f + phase) * r
        );
        vThet = s.createVector(
            vC.x + s.sin((angl * f + phase) / 2) * ar,
            vC.y + s.cos((angl * f + phase) / 2) * ar
        );
        vCL = s.createVector(0, 0);
        vSL = s.createVector(0, 0);

        // Draw the main circle on the buffer
        cBuff.noFill();
        s.paintGrid(cBuff, s.width, s.height, vC, r / 5, 5,
            { showUnits: false, showOrigin: false, showY: true, showX: true });
        cBuff.circle(vC.x, vC.y, d);
    }

    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(cBuff, 0, 0);

        // Updating and rendering the moving radius vector
        vR.x = vC.x + s.sin(angl * f + phase) * r;
        vR.y = vC.y + s.cos(angl * f + phase) * r;
        vThet.x = vC.x + s.sin((angl * f) / 2 + phase) * ar;
        vThet.y = vC.y + s.cos((angl * f) / 2 + phase) * ar;

        s.stroke(rColor);
        s.line(vC.x, vC.y, vR.x, vR.y);
        s.circle(vR.x, vR.y, 3);

        // Drawing arc
        s.push();
        s.stroke(theme.thetaColor);
        s.fill(theme.thetaColorLight);
        s.arc(vC.x, vC.y, ar, ar, s.TWO_PI - angl * f, 0);
        s.pop();

        // Drawing arc text
        s.push();
        s.noStroke();
        s.fill(theme.thetaColor);
        s.text("θ≅" + (angl * f / s.PI).toFixed(2) + "π", vThet.x, vThet.y);
        s.pop();

        // At this point we are painting text, so we remove the 'stroke'
        s.noStroke();

        // Updating the movement by incrementing the angle
        angl += f;
        if (angl > reset) angl = 0; // reset angle ostopAnglesnce the circle is complete

        // Stop for a moment and highlight
        if (Math.abs(angl * f - rad[degr[ci]][0]) < t) {
            let el = document.getElementById("angle_" + degr[ci]);
            el.style.color = 'red';

            // Draw sine
            s.push();
            s.stroke(theme.sineColor);
            s.line(vR.x, vR.y, vR.x, vC.y);
            s.pop();

            // Draw cosine
            s.push();
            s.stroke(theme.cosineColor);
            s.line(vC.x, vC.y, vR.x, vC.y);
            s.pop();

            // Draw sine label and cosinelabels
            const ca = angl * f + phase;
            const soff = (ca >= s.PI && ca < s.TWO_PI) ? -45 : 2;
            const coff = (ca >= s.HALF_PI && ca) < 1.5 * s.TWO_PI ? 15 : -5;
            vSL.x = vR.x + soff
            vSL.y = (vC.y + vR.y) / 2;
            vCL.x = (vC.x + vR.x) / 2 - 10;
            vCL.y = vC.y + coff;

            // Sine label
            s.push();
            s.fill(theme.sineColor);
            s.text("sin(θ)≅" + s.sin(angl * f).toFixed(2), vSL.x, vSL.y);
            s.pop();

            // Cosine label
            s.push();
            s.fill(theme.cosineColor);
            s.text("cos(θ)≅" + s.cos(angl * f).toFixed(2), vCL.x, vCL.y)
            s.pop();

            // Legend text
            s.push();
            s.noStroke();
            s.fill(theme.thetaColor);
            s.text("    θ  = " + degr[ci] + "° = " + rad[degr[ci]][1], 15, s.width - 80);
            s.fill(theme.sineColor);
            s.text("sin(θ) = " + rad[degr[ci]][2] + " ≅ " + s.sin(angl * f).toFixed(2), 15, s.width - 60);
            s.fill(theme.cosineColor);
            s.text("sin(θ) = " + rad[degr[ci]][3] + " ≅ " + s.cos(angl * f).toFixed(2), 15, s.width - 40);
            s.pop();

            s.setFrameRate(0);
            setTimeout(() => {
                s.frameRate(theme.frameRate);
                el.style.color = '';
            }, delay);
            ci++;
            if (ci == degr.length) ci = 0;
        }
        s.showFps();
    }
};

let simpleCircleWithPiSketch = new p5(simpleCircleWithPi, 'simple-circle-with-pi-sketch');

