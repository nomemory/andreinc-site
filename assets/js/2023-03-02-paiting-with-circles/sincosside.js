const sinCosSide = (s) => {

    addPaintGrid(s);
    addLineDashed(s);
    addShowFps(s);

    const w = 800;
    const h = w / 4;

    const d = w / 8;
    const r = d / 2;
    const f = theme.frequency / 3;
    let phase = s.HALF_PI;
    let angl = 0;

    let vC, vMS, vMC;
    let cBuff;
    let canvas;

    s.initConditions = () => {
        vC = s.createVector(2 * r, h / 2);
        vMS = s.createVector(vC.x + s.HALF_PI*r, vC.y);
        vMC = s.createVector(vC.x, vC.y - r);
        cBuff = s.createGraphics(w, h);
        s.paintGrid(cBuff, w, h, vC, r, 1, {
            showUnits: true,
            showOrigin: true
        });
        // Paint the sine function in the negative area
        let vSP = s.createVector(vC.x, vC.y + s.sin(angl) * r);
        for (let cAngl = 0; vSP.x > 0; vSP.x -= f * r, vSP.y = vC.y + s.sin(cAngl) * r, cAngl += f) {
            cBuff.push();
            cBuff.stroke(theme.sineColor);
            cBuff.point(vSP.x, vSP.y);
            cBuff.pop();
        }
        // Paint the sine function in the positive area
        vSP = s.createVector(vC.x, vC.y - s.sin(angl) * r);
        for(let cAngl = 0; vSP.x < w; vSP.x += f * r, vSP.y = vC.y - s.sin(cAngl)*r, cAngl += f) {
            cBuff.push();
            cBuff.stroke(theme.sineColor);
            cBuff.point(vSP.x, vSP.y);
            cBuff.pop();
        }
        // Paint the cosine function in the negative area
        let vCP = s.createVector(vC.x, vC.y - s.cos(angl)*r);
        for(let cAngl =0; vCP.x > 0; vCP.x -=f*r, vCP.y = vC.y - s.cos(cAngl) * r, cAngl +=f) {
            cBuff.push();
            cBuff.stroke(theme.cosineColor);
            cBuff.point(vCP.x, vCP.y);
            cBuff.pop();
        }
        // Paint the cosine function in the positive area
        vCP = s.createVector(vC.x, vC.y - s.cos(angl)*r);
        for(let cAngl = 0; vCP.x < w; vCP.x += f*r, vCP.y = vC.y - s.cos(cAngl) *r, cAngl +=f) {
            cBuff.push();
            cBuff.stroke(theme.cosineColor);
            cBuff.point(vCP.x, vCP.y);
            cBuff.pop();
        }
        // Static text 
        angl = 0;
    };

    s.setup = () => {
        canvas = s.createCanvas(w, h);
        canvas.parent("sin-cos-side-sketch");
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);
        s.initConditions();
    }

    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(cBuff, 0, 0);   

        // Paint the moving sine and cosine circles
        s.push();
        s.stroke(theme.sineColor);
        s.fill(theme.sineColor);
        s.circle(vMS.x, vMS.y, 3);
        s.stroke(theme.cosineColor);
        s.fill(theme.cosineColor);
        s.circle(vMC.x, vMC.y, 3);
        s.pop();

        // Paint line connecting the two circles
        s.push();
        s.stroke(theme.radiusColorLight);
        s.line(vMS.x, vMS.y, vMC.x, vMC.y);
        s.pop();

        // Paint HALF_PI label on the line
        s.push();
        s.text("π/2", vMS.x + (vMC.x - vMS.x)/2 - 7, vMC.y - 5);
        s.pop();

        // Legends
        s.push();
        s.fill(theme.sineColor);
        s.text("sin(x)", vC.x + 30, vC.y + 1.6*r);
        s.fill(theme.cosineColor);
        s.text("cos(x)", vC.x + 30, vC.y + 1.6*r + 20);
        s.pop();

        // Incremenent and reset movement when needed
        vMS.x += f * r;
        vMS.y = vC.y - s.sin(angl+s.HALF_PI)*r;
        vMC.x += f * r;
        vMC.y = vC.y - s.cos(angl)*r;
        angl += f;
        if (vMS.x > w) {
            vMS = s.createVector(vC.x + s.HALF_PI*r, vC.y);
            vMC = s.createVector(vC.x, vC.y - r);
            angl = 0;
        } 
        s.showFps();
    }
};

let sinCosSideSketch =
    new p5(sinCosSide, "sin-cos-side-sketch"); 