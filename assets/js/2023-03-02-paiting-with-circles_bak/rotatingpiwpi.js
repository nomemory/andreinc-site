const rotatingWPi = (s) => {

    addShowFps(s);
    addPaintGrid(s);
    addPauseLoop(s);

    const w = 425;
    const h = 200;
    const d = 100;
    const r = d / 2;  // diameter of the moving center
    const rThet = r/2;
    const xOff = r; // the offset of x for the grid system

    let ang = 0; // angle used for computing sin and cos
    let vC, vM;  // center of the circle and the moving smaller circle
    let vThet;   // vector associated with drawing theta
    let buff;    // graphics buffer for painting the grid

    s.setup = () => {
        // Create Canvas of given size 
        const canvas = s.createCanvas(w, h);
        canvas.parent('rotating-PI-w-PI-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);
        // Initialise vectors
        vC = s.createVector(xOff, h / 2);
        vM = s.createVector(
            vC.x + s.sin(ang) * r,
            vC.y + s.cos(ang) * r
        );
        vThet = s.createVector(
            vC.x + s.sin(ang/2) * rThet,
            vC.y + s.cos(ang/2) * rThet
        );
        // Circle Buffer
        buff = s.createGraphics(w, h);
        // Draw horizontal line
        buff.push();
        let vPgo = s.createVector(vC.x, vC.y + r);
        let pGProps = {
            showUnits: true,
            showOrigin: true,
            showY: false,
            showX: true
        };
        s.paintGrid(buff, s.width, s.height, vPgo, r / 2, 2, pGProps);
        buff.pop();
    };

    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(buff, 0, 0);

        // Painting rotating circle
        s.push();
        s.noFill();
        s.circle(vC.x, vC.y, d);
        s.circle(vC.x, vC.y, 3);
        s.pop();

        // Moving circle
        s.push();
        s.fill(theme.thetaColor);
        s.stroke(theme.thetaColor)
        s.circle(vM.x, vM.y, 5);
        s.line(vC.x, vC.y, vM.x, vM.y);
        s.pop();

        // Green line on x-axis
        s.push();
        s.stroke(theme.thetaColor);
        s.strokeWeight(3);
        s.line(xOff, h / 2 + r, vC.x, h / 2 + r);
        s.pop();

        // Horizontal line going through the midle of the circle
        s.push();
        s.stroke(theme.primaryAxis);
        s.line(vC.x, vC.y, vC.x, w);
        s.pop();

        // Angle
        s.push();
        s.stroke(theme.thetaColor);
        s.fill(theme.thetaColorLight);
        s.arc(vC.x, vC.y, d, d, s.HALF_PI, -s.PI-(s.HALF_PI+ang));
        s.noStroke();
        s.fill(theme.thetaColor);
        let tInD = (-1)*(ang*180/s.PI).toFixed(2)
        s.text("θ = "+ tInD+"°", vThet.x, vThet.y);
        s.text("θ = "+ (-1)*ang.toFixed(2) + " (rad)", vC.x + 5, h/2 + r + 40);
        s.pop();

        if (s.mouseIsPressed) {
            if (s.dist(s.mouseX, s.mouseY, vC.x, vC.y) < r) {
                if (s.mouseX - r >= 0 && s.mouseX - xOff < s.TWO_PI * r) {
                    vC.x = s.mouseX;
                    ang = -(vC.x - xOff)/r;
                    vM.x = vC.x + s.sin(ang) * r;
                    vM.y = vC.y + s.cos(ang) * r;
                    vThet.x = vC.x + s.sin(ang/2) * rThet;
                    vThet.y = vC.y + s.cos(ang/2) * rThet;
                }
            }
        }

        s.showFps();
    };
}

let rotatingWPISketch = new p5(rotatingWPi, 'rotating-PI-w-PI-sketch');