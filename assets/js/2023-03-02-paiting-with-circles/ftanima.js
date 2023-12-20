
const ftAnima = (s) => {

    addPaintGrid(s);

    const r = 10;
    const BA = 6;
    const f = theme.frequency;
    const numFreq = 15;
    const infty = 2000;
    const paintGridProps = {
        showUnits: true,
        hideUnitsXNeg: true,
        showOrigin: true,
        showY: true,
        showX: true,
    };


    // absolute center of the coordinate system
    let vC; 
    let cfont; 
    // angle starts with a phase
    let angl = 0+s.HALF_PI; 

    // Information about sampled frequencies
    let sampFreq = [
    ];

    // Buffers
    // The G(w) buffer, where we plot the sinc function
    let sincBuffer;
    const sincBufferW = 2 * numFreq * r;
    const sincBufferH = BA * 2 * r;

    s.preload = () => {
        // WebGL requires to load a font before using s.text
        cfont = s.loadFont('/assets/js/2023-03-02-paiting-with-circles/consola-mono.ttf');
    }

    s.initSampFreq = () => {
        for (let i = 1; i <= numFreq; i++) {
            sampFreq[i] = {
                /* for each freq pre-compute the magnitutde */
                mag: s.Gf(i, BA),
            };
        }
    }

    s.initSincBuffer = () => {
        sincBuffer = s.createGraphics(sincBufferW, sincBufferH);
        sincBuffer.push();
        sincBuffer.stroke(theme.sineColor);
        sincBuffer.beginShape();
        sincBuffer.noFill();
        sincBuffer.vertex(0, - BA * r); // (0,0)
        // positive
        for (let cX = 0, cY = 0, i = 1; i <= numFreq; i++) {
            cX = i * r;
            cY = sampFreq[i].mag*r;
            sincBuffer.vertex(cX, cY);
        }
        sincBuffer.endShape();
        sincBuffer.beginShape();
        sincBuffer.noFill();
        sincBuffer.vertex(0, - BA * r);
        for (let cX = 0, cY, i = 1; i <= numFreq; i++) {
            cX = i * r;
            cY = sampFreq[i].mag*r;
            sincBuffer.vertex(-cX, -cY);
        }
        s.endShape();
        sincBuffer.pop();
    }

    s.setup = () => {
        s.createCanvas(800, 500, s.WEBGL);
        s.frameRate(10);
        s.textFont(cfont);
        vC = s.createVector(0, 0, 0);
        vR = s.createVector(0, 0);
        mP = s.createVector(0, 0, 0);
        s.initSampFreq();
        s.initSincBuffer();
    };

    // Fourier transform function
    s.Gf = (W, A) => {
        return A  * s.sin(W / 2) / W * 2;
    }

    s.draw = () => {
        s.background(theme.bkgColor);
        s.translate(vC.x, vC.y, 0);
        // s.rotateY(s.frameCount * 0.005);
        s.orbitControl();

        // Draw coordinates system
        s.push();
        s.smooth();
        s.translate(vC.x, vC.y, 0);
        s.fill(255, 255, 255);
        vR.x = s.sin(angl) * r;
        vR.y = s.cos(angl) * r;
        s.stroke(theme.radiusColorLight);
        s.line(-s.width, 0, 0, s.width, 0, 0); // x
        s.stroke(theme.radiusColorLight);
        s.line(0, -s.height, 0, 0, s.height, 0); // y
        s.stroke(theme.radiusColorLight);
        s.line(0, 0, -infty, 0, 0, infty); // z
        s.line(s.TWO_PI * r * 3, 0, -infty, s.TWO_PI * r * 3, 0, infty) // second z
        s.pop();

        // Plot G(w)
        s.image(sincBuffer, -sincBufferW/2, -sincBufferH/2);

        // // Draw the circles
        // s.push();
        // s.noFill();
        // for (let i = 1; i < 15; i += 1) {
        //     s.translate(r * i, 0);
        //     s.rotateY(s.HALF_PI);
        //     s.circle(-BA * r, 0, 2 * s.Gf(i, BA) * r * 1 / s.PI);
        //     s.fill(theme.radiusColor);
        //     s.noFill();
        //     s.circle(-BA * r, 0, 3);
        //     s.resetMatrix();
        // }
        // s.pop();

        // // Draw the moving radiuses
        // // For each circle
        // s.push();
        // let sp = [];
        // for (let i = 1; i < 16; i += 1) {
        //     s.translate(r * i, 0);
        //     s.rotateY(s.HALF_PI);
        //     if (i < 15) {
        //         let mX = -BA * r + s.sin(angl * i) * (s.Gf(i, BA) * r);
        //         let mY = s.cos(angl * i) * (s.Gf(i, BA) * r);
        //         s.line(-BA * r, 0, mX, mY);
        //         // s.fill(theme.cosineColor);
        //         // s.circle(mX, mY, 3);
        //         // Draw sinusoid for each circle
        //         s.beginShape();
        //         s.noFill();
        //         for (let j = s.HALF_PI, k=0; j < angl; j += f, k++) {
        //             let cx = (j - s.HALF_PI) * r;
        //             let cy = 1 / s.PI * s.cos(j * i) * (s.Gf(i) * BA * r);
        //             if (typeof sp[k] === 'undefined') {
        //                 sp[k] = { x: cx, y: cy };
        //             }
        //             sp[k] = { x: cx, y: sp[k].y + cy };
        //             s.vertex(cx, cy);
        //         }
        //         s.endShape();
        //     }
        //     else {
        //         s.translate(s.TWO_PI * 3, 0);
        //         s.beginShape();
        //         for (let k = 0; k < sp.length; k++) {
        //             s.vertex(sp[k].x, sp[k].y);
        //         }
        //         s.endShape();
        //     }
        //     s.resetMatrix();
        // }
        // s.pop();

        angl += f;
        if (angl > 3 * (s.HALF_PI + s.TWO_PI)) {
            angl = s.HALF_PI;
        }
    };
}

let ftAnimaSketch = new p5(ftAnima, 'ft-anima-sketch');