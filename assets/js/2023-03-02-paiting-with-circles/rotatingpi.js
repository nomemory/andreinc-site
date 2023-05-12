const rotatingPi = (s) => {

    addShowFps(s);
    addPaintGrid(s);
    addPauseLoop(s);

    const w = 425;
    const h = 175;
    const d = 100;
    const r = d / 2; // diameter of the moving center
    const f = theme.frequency / 3; // we slow down by /3
    const xOff = r; // the offset of x for the grid system

    let ang = 0; // angle used for computing sin and cos
    let vC, vM;  // center of the circle and the moving smaller circle
    let buff;    // graphics buffer for painting the grid

    s.setup = () => {
        // Create Canvas of given size 
        const canvas = s.createCanvas(w, h);
        canvas.parent('rotating-PI-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);
        // Initialise vectors
        vC = s.createVector(xOff, h / 2);
        vM = s.createVector(
            vC.x + s.sin(ang * f) * r,
            vC.y + s.cos(ang * f) * r
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
        s.pop();

        // Moving circle
        s.push();
        s.fill(theme.thetaColor);
        s.stroke(theme.thetaColor)
        s.circle(vM.x, vM.y, 5);
        //s.line(vC.x, vC.y, vM.x, vM.y);
        s.pop();

        // Green line on x-axis
        s.push();
        s.stroke(theme.thetaColor);
        s.strokeWeight(3);
        s.line(xOff, h / 2 + r, vC.x, h / 2 + r);
        s.pop();

        // Updating values
        vC.x += f * r;
        vM.x = vC.x + s.sin(ang * f) * r;
        vM.y = vC.y + s.cos(ang * f) * r;
        ang--;
        if (vC.x > (s.TWO_PI * r) + xOff) {
            // Once the rolling is > 2*PI
            // We display for 3000ms the text label 2*π
            // We stop the animation for 3000ms
            // We reset the animation
            s.push();
            s.fill(theme.thetaColor)
            s.text("2π", xOff + s.PI * r, h / 2 + r - 15);
            s.pop();
            s.frameRate(0);
            setTimeout(() => {
                vC.x = xOff;
                vM.x = vC.x;
                vM.y = vC.y - r;
                ang = 0;
                s.frameRate(theme.frameRate);
            }, 3000);
        }
        s.showFps();
    };
}

let rotatingPISketch = new p5(rotatingPi, 'rotating-PI-sketch');