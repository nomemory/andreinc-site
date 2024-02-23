let dropSinusoid = (s) => {

    addPaintGrid(s);
    addShowFps(s);

    const r = 50;
    const w = 800;
    const h = 400;
    const inc = 0.1;
    const sLen = (w - 2 * r) / r / inc;

    const minA = 0.5;
    const maxA = 1;
    const minF = 0.5;
    const maxF = 5;
    const minP = 0;
    const maxP = 2 * 3.14;
    const nSinMax = 7;

    // used to draw the animation
    const states = Object.freeze({
        DROP: 1,
        MERGE: 2,
        STOP: 3
    });

    let mBuff;
    let vC;
    let state = states.DROP;
    let cDrop;
    let cSum;
    let mIdx = 0;
    let nSin = 1;

    // Computes the samples for the dropping sinusoid
    let computeSamples = (dS) => {
        for (let i = 0, cAngl = 0; i < sLen; i += 1, cAngl += inc) {
            dS.samples[i] = s.sin(dS.freq * cAngl + dS.phase) * dS.amp * r;
        }
    }

    // The dropping sinusoid, i had to name it like this
    let createDrop = (amp, freq, phase) => {
        let r = {};
        r.amp = amp;
        r.freq = freq;
        r.phase = phase;
        r.y = 0;
        r.samples = [];
        computeSamples(r);
        return r;
    }

    // Constructor-like function to create a random sinuscreateDefDrop().samples;oid
    let createRandomDrop = () => {
        return createDrop(
            s.random(minA, maxA),
            s.random(minF, maxF),
            s.random(minP, maxP),
        );
    }

    let createDefDrop = () => {
        return createDrop(1, 1, 0);
    }

    let merge = () => {
        for (let i = 0; i < sLen; i++) {
            cSum[i] += cDrop.samples[i];
        }
    }

    let drawMerge = () => {
        let sum = cDrop.samples[mIdx] + cSum[mIdx];
        let half = h / 2;
        let x1 = 2*r + mIdx * inc * r;
        let y1 = half - cSum[mIdx];
        let x2 = x1;
        let y2 = half - (cSum[mIdx] + (sum - cSum[mIdx]));
        let cColor = (sum > cSum[mIdx]) ? 'green' : 'red';
        mBuff.push();
        mBuff.stroke(cColor);
        mBuff.line(x1, y1, x2, y2);
        mBuff.pop();
    }

    let drawCDrop = () => {
        s.push();
        s.noFill();
        s.stroke('blue');
        s.beginShape();
        for (let i = 0, cx = 0; i < sLen; i++, cx += inc) {
            let x = 2 * r + cx * r;
            let y = cDrop.y - cDrop.samples[i];
            s.vertex(x, y);
        }
        s.endShape();
        s.pop();
        s.push();
        s.fill('blue');
        s.text("s" + nSin + "(x)=" + cDrop.amp.toFixed(1) + "*sin(" + cDrop.freq.toFixed(1)+ "*x + " + cDrop.phase.toFixed(1) +")", w/2, cDrop.y + maxA*r + 15);
        s.pop();
    }

    let drawCSum = () => {
        mBuff.push();
        mBuff.noFill();
        mBuff.beginShape();
        for (let i = 0, cx = 0; i < sLen; i++, cx += inc) {
            let x = 2 * r + cx * r;
            let y = vC.y - cSum[i];
            mBuff.vertex(x, y);
        }
        mBuff.endShape();
        mBuff.pop();
    }

    let initMBuff = () => {
        mBuff.clear();
        s.paintGrid(mBuff, w, h, vC, r, 1, {
            showUnits: true,
            hideUnitsXNeg: true,
            showOrigin: true
        });
        drawCSum();
    }

    s.setup = () => {
        const canvas = s.createCanvas(w, h);
        canvas.parent('drop-sinusoid-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);
        mBuff = s.createGraphics(w, h);
        vC = s.createVector(2 * r, 4 * r);
        cDrop = createRandomDrop();
        cSum = createDefDrop().samples;
        initMBuff();
        drawCSum();
    };

    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(mBuff, 0, 0);
        if (state === states.DROP) {
            cDrop.y += 4;
            if (cDrop.y >= h / 2) {
                state = states.MERGE;
            }
        } else if (state === states.MERGE) {
            drawMerge();
            mIdx++;
            if (mIdx > sLen) {
                merge();
                nSin++;
                state = states.DROP;
                cDrop = createRandomDrop();
                mIdx = 0;
                initMBuff();
                drawCSum();
                if (nSin > nSinMax) {
                    s.frameRate(0);
                    setTimeout(() => {
                        nSin = 1;
                        cSum = createDefDrop().samples;
                        initMBuff();
                        drawCSum();
                        s.frameRate(theme.frameRate);
                    }, 3000);
                }
            }
        }
        drawCDrop();
    };
};

let dropSinusoidSketch = new p5(dropSinusoid, 'drop-sinusoid-sketch');