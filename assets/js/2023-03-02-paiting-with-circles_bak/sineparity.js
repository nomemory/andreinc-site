let sineParity = (s) => {

    addPaintGrid(s);
    addShowFps(s);

    const r = 100;
    const d = 2 * r;
    const ar = d / 6;
    const dotLCol = s.color(theme.radiusColorLight);

    let f = theme.frequency;
    let ang = s.HALF_PI;
    let reset = s.PI;
    let vC, vP, vPP, vThet;
    let cBuff;

    s.setup = () => {
        const canvas = s.createCanvas(theme.canvasX, theme.canvasY);
        canvas.parent('sine-parity-sketch');
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
        vThet.x = vC.x + s.sin(ang / 2) * ar / 1.5;
        vThet.y = vC.y - s.cos(ang / 2) * ar / 1.5;
        s.circle(vP.x, vP.y, 3);

        // Drawing arc text
        s.push();
        s.fill(theme.thetaColor);
        s.text(" x", vThet.x, vThet.y);
        s.pop();

        // Drawing arc text
        s.push();
        s.fill(theme.thetaColor);
        s.text("-x", vThet.x, vC.y + (vC.y - vThet.y) + 10);
        s.pop();

        // Drawing arc
        s.push();
        if (ang > s.HALF_PI) {
            s.stroke(theme.thetaColor);
            s.fill(theme.thetaColorLight);
            s.arc(vC.x, vC.y, ar, ar, s.HALF_PI - ang, 0);
            s.arc(vC.x, vC.y, ar, ar, 0, +ang - s.HALF_PI);
            s.stroke(theme.thetaColor);
            s.line(vC.x, vC.y, vC.x + ar / 2, vC.y);
        }
        s.pop();

        // Point projection symetrical
        vPP.x = vP.x;
        vPP.y = vC.y - cCos;
        s.circle(vPP.x, vPP.y, 3);

        // sinuses
        s.push();
        s.stroke(theme.sineColor);
        s.line(vP.x, vP.y, vP.x, vC.y);
        s.line(vPP.x, vPP.y, vPP.x, vC.y);
        s.pop();

        // Center-point + Center-projection-point
        s.push();
        s.stroke(dotLCol);
        s.line(vC.x, vC.y, vP.x, vP.y);
        s.line(vC.x, vC.y, vPP.x, vPP.y);
        s.circle(vP.x, vC.y, 3);
        s.pop();

        // A and A'
        s.push();
        s.text('A', vP.x + 5, vP.y + 5);
        s.text('A\'', vPP.x + 5, vPP.y + 5);
        s.pop();

        // sin(-x) and sin(x)
        s.push();
        s.fill(theme.sineColor);
        s.text('sin(x)', vP.x + 5, vC.y - (vC.y - vP.y) / 2);
        s.text('sin(-x)=-sin(x)', vP.x + 5, vC.y - (vC.y - vPP.y) / 2);
        s.pop();

        ang += f;
        if (ang >= reset || ang <= s.HALF_PI) {
            f *= -1;
        }
        s.showFps();
    };
};

let sineParitySketch = new p5(sineParity, 'sine-parity-sketch');