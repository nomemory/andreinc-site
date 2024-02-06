const piShift = (s) => {

    addPaintGrid(s);
    addShowFps(s);
    addArrow(s);

    const r = 50;
    const twoSqrt = Math.sqrt(2);
    const A = r;
    const d = 2 * r;
    const w = 800;
    const h = 500;
    const f = theme.frequency;
    const limit = 2 * s.TWO_PI;

    let angl = 0;
    let vCN; // negative circle 
    let vCP; // phase shift circle
    let vGN; // negative graph center
    let vGP; // phase shift center
    let vRN; // moving radius for the negative
    let vRP; // moving radius for the phase shifted
    let vMN; // moving point for the negative
    let vMP; // moving point for the phase shifted

    let nBuff;
    let pBuff;

    s.setup = () => {
        // Create Canvas of given size 
        canvas = s.createCanvas(w, h);
        canvas.parent('pi-shift-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);

        vCN = s.createVector(2 * r, 2 * r);
        vGN = s.createVector(vCN.x + 2 * r, vCN.y);
        vCP = s.createVector(vCN.x, vCN.y);
        vGP = s.createVector(vCP.x + 2 * r, vCN.y)
        vMN = s.createVector(vGN.x, vGN.y);
        vMP = s.createVector(vGP.x, vGP.y + 5*r);
        nBuff = s.createGraphics(w, 4 * r);
        pBuff = s.createGraphics(w, 4 * r);
        s.paintGrid(nBuff, w, 4 * r, vGN, r, 1, {
            showUnits: true,
            hideUnitsXNeg: true,
            showOrigin: true
        });
        s.paintGrid(pBuff, w, 4 * r, vGP, r, 1, {
            showUnits: true,
            hideUnitsXNeg: true,
            showOrigin: true
        });

        // Plot negative
        nBuff.push();
        nBuff.noFill();
        nBuff.beginShape();
        for (let i = 0; i < limit; i += f) {
            nBuff.vertex(vGN.x + i * r, vGN.y - s.snF(i));
        }
        nBuff.endShape();
        nBuff.pop();

        // Plot shifted
        pBuff.push();
        pBuff.noFill();
        pBuff.beginShape();
        for (let i = 0; i < limit; i += f) {
            pBuff.vertex(vGP.x + i * r, vGP.y - s.spF(i));
        }
        pBuff.endShape();
        pBuff.pop();

        // drawing arc
        pBuff.push();
        pBuff.stroke(theme.thetaColor);
        pBuff.fill(theme.thetaColorLight);
        pBuff.arc(vCN.x, vCN.y, 2 * r, 2 * r, s.PI, 0);
        pBuff.pop();

        nBuff.push();
        nBuff.circle(vCN.x, vCN.y, 3);
        nBuff.circle(vCN.x, vCN.y, d);
        nBuff.pop();

        pBuff.push();
        pBuff.circle(vCP.x, vCP.y, 3);
        pBuff.circle(vCP.x, vCP.y, d);
        pBuff.pop();

        // VR and VP
        vRN = s.createVector(vCN.x + s.cos(-angl) * r, vCN.y - s.sin(-angl) * r);
        vRP = s.createVector(vCP.y + s.cos(angl + s.PI) * r, vCP.y - s.sin(angl + s.PI) * r);

        // Adding starting points for the rotation
        nBuff.push();
        nBuff.stroke(theme.sineColor);
        nBuff.fill(theme.sineColor);
        nBuff.circle(vRN.x, vRN.y, 3);
        nBuff.pop();

        pBuff.push();
        pBuff.stroke(theme.sineColor);
        pBuff.fill(theme.sineColor);
        pBuff.circle(vRP.x, vRP.y, 3);
        pBuff.pop();

        addArrow(nBuff);

        // Adding an arrow to point up to the direction
        nBuff.push();
        nBuff.arrow(vRN.x, vRN.y, vRN.x, vRN.y + r);
        nBuff.fill(theme.textColor);
        nBuff.text("start",vRN.x + 3, vRN.y + r+10);
        nBuff.pop();

        addArrow(pBuff);

        // Adding an arrow to point up to the direction
        pBuff.push();
        pBuff.arrow(vRP.x, vRP.y, vRP.x, vRP.y + r);
        pBuff.fill(theme.textColor);
        pBuff.text("start",vRP.x + 3, vRP.y + r+10);
        pBuff.pop();

        pBuff.push();
        pBuff.fill(theme.thetaColor);
        pBuff.text("phase= π", vCP.x - 30, vCP.y - 5);
        pBuff.pop();
    }

    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(nBuff, 0, 0);         // Negative freq buffer
        s.image(pBuff, 0, 5 * r);     // Phase shift buffer

        // Moving radius for the negative
        s.push();
        s.stroke(theme.radiusColor);
        s.line(vCN.x, vCN.y, vRN.x, vRN.y);
        s.fill(theme.sineColor);
        s.stroke(theme.sineColor);
        s.circle(vRN.x, vRN.y, 3);
        s.pop();

        // Direction vector for negative
        s.push();
        s.stroke(theme.radiusColorLight);
        s.arrow(vRN.x, vRN.y, vCN.x + s.sin(s.HALF_PI/2-angl)*r*twoSqrt, vCN.y + s.cos(s.HALF_PI/2-angl)*r*twoSqrt);
        s.pop();

        // Direction vector for phase shifted
        s.push();
        s.stroke(theme.radiusColorLight);
        s.arrow(vRP.x, vRP.y + 5*r, vCP.x + s.sin(s.PI + s.HALF_PI/2 - angl)*r*twoSqrt, vCP.y + 5*r - s.cos(s.PI + s.HALF_PI/2-angl)*r*twoSqrt);
        s.pop();

        // Moving radius for the phase shifted 
        s.push();
        s.stroke(theme.radiusColor);
        s.line(vCP.x, vCP.y + 5 * r, vRP.x, vRP.y + 5 * r);
        s.fill(theme.sineColor);
        s.stroke(theme.sineColor);
        s.circle(vRP.x, vRP.y + 5 * r, 3);
        s.pop();

        // Moving point for the negative
        s.push();
        s.stroke(theme.radiusColorLight);
        s.line(vMN.x, vMN.y, vRN.x, vRN.y);
        s.stroke(theme.sineColor);
        s.strokeWeight(3);
        s.fill(theme.sineColor);
        s.line(vMN.x, vCN.y, vMN.x, vMN.y);
        s.pop();

        s.push();
        s.fill(theme.sineColor);
        s.text("sin(-x)", vMN.x + 3, vMN.y);
        s.pop();

        // Moving point for phase shifted
        s.push();
        s.stroke(theme.radiusColorLight);
        s.line(vMP.x, vMP.y, vRP.x, vRP.y+5*r);
        s.stroke(theme.sineColor);
        s.strokeWeight(3);
        s.fill(theme.sineColor);
        s.line(vMP.x, vCP.y + 5*r, vMP.x, vMP.y);
        s.pop();

        s.push();
        s.fill(theme.sineColor);
        s.text("sin(x+π)", vMP.x + 3, vMP.y);
        s.pop();

        // Sine projection negative
        s.push();
        s.stroke(theme.sineColor);
        s.fill(theme.sineColor);
        s.strokeWeight(3);
        s.line(vRN.x, vCN.y, vRN.x, vRN.y);
        s.pop();

        // Sine projection phase
        s.push();
        s.stroke(theme.sineColor);
        s.fill(theme.sineColor);
        s.strokeWeight(3);
        s.line(vRP.x, vCP.y + 5*r, vRP.x, vRP.y + 5*r);
        s.pop();

        s.push();
        s.stroke(theme.radiusColorLight);
        s.line(vRP.x, vRP.y + 5*r, vRN.x, vRN.y);
        s.line(vRN.x, vCN.y, vRP.x, vCP.y + 5*r);
        s.pop();

        // Update coordinates
        vRN.x = vCN.x + s.cos(-angl) * r;
        vRN.y = vCN.y - s.sin(-angl) * r;
        vRP.x = vCP.x + s.cos(angl + s.PI) * r;
        vRP.y = vCP.y - s.sin(angl + s.PI) * r;
        vMN.x +=f*r;
        vMN.y = vRN.y;
        vMP.x = vMN.x;
        vMP.y = vRN.y + 5*r;

        angl += f;
        if (angl > limit) {
            angl = 0;
            vMN.x = vGN.x;
        }
    }

    s.snF = (x) => {
        return A * s.sin(-x);
    }
    s.spF = (x) => {
        return A * s.sin(x + s.PI);
    }
}

let piShiftsSketch =
    new p5(piShift, 'pi-shift-sketch');