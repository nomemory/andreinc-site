let triangleInCircle = (s) => {

    addPaintGrid(s);
    addShowFps(s);

    const r = 100;
    const d = 2 * r;
    const f = theme.frequency;
    const dotLCol = s.color(theme.radiusColorLight);
    const rCCol = s.color(theme.circleColor);

    let ang = s.HALF_PI;
    let reset = s.PI + s.HALF_PI;
    let vC, vP, vPP, vThet;
    let cBuff;

    s.setup = () => {
        const canvas = s.createCanvas(theme.canvasX, theme.canvasY);
        canvas.parent('triangle-in-circle-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);
        // Initialising vectors
        vC = s.createVector(s.width / 2, s.height / 2);
        vP = s.createVector(
            vC.x + s.sin(ang) * r,
            vC.y + s.cos(ang) * r
        );
        vThet = s.createVector(
            vC.x + s.sin(ang) * r,
            vC.y + s.cos(ang) * r
        );
        vPP = s.createVector(0, 0);
        cBuff = s.createGraphics(s.width, s.height);
        // Painting the grid on the memory buffer
        s.paintGrid(cBuff, s.width, s.height, vC, r / 5, 5, {
            showUnits: true,
            showOrigin: true,
            showY: true,
            showX: true
        });
        // Adding the circle on the memory buffer
        cBuff.stroke(theme.lightCircleColor);
        cBuff.circle(vC.x, vC.y, d);
    };

    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(cBuff, 0, 0);
        let cSin = s.sin(ang) * r;
        let cCos = s.cos(ang) * r;
        // Point
        vP.x = vC.x + cSin;
        vP.y = vC.y + cCos;
        s.circle(vP.x, vP.y, 3);
        // Point projection
        vPP.x = vC.x - cSin;
        vPP.y = vC.y - cCos;
        // Update arcle
        vThet.x = vC.x + s.sin(ang) * r / 2;
        vThet.y = vC.y + s.cos(ang) * r / 2;
        s.circle(vPP.x, vPP.y, 3);
        // Center-point + Center-projection-point
        s.push();
        s.stroke(dotLCol);
        s.line(vC.x, vC.y, vP.x, vP.y);
        s.line(vC.x, vC.y, vPP.x, vPP.y);
        s.pop();
        // Growing Arcs
        s.push();
        s.noFill();
        s.stroke(rCCol);
        s.arc(vC.x, vC.y, d, d, s.HALF_PI - (ang), 0);
        s.arc(vC.x, vC.y, d, d, -s.HALF_PI - (ang), -s.PI);
        s.pop();
        // 180 arc
        s.push();
        s.fill(theme.thetaColorLight);
        s.stroke(theme.thetaColor);
        s.arc(vC.x, vC.y, d / 6, d / 6, (3 / 2) * s.PI - (ang), s.HALF_PI - (ang));
        s.pop();
        // 180 arc text
        s.push();
        s.fill(theme.thetaColor);
        s.text('θ=180°', vThet.x, vThet.y);
        s.pop();
        // A and A'
        s.text('A', vP.x + 5, vP.y + 5);
        s.text('A\'', vPP.x + 5, vPP.y + 5);
        ang += f;

        if (ang > reset) ang = s.HALF_PI;
        s.showFps();
    };
};

let triangleInCircleSketch = new p5(triangleInCircle, 'triangle-in-circle-sketch');