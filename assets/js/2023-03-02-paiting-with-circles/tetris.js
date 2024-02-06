const tetris = (s) => {

    // -----------------------------------------------------------------------
    // Game constants
    // -----------------------------------------------------------------------

    const frameRate = 30; // the current framerate of the animation
    const unit = 50; // the unit size (imagine this to be the grid size)
    const radius = unit; // the radius is the same as the unit, we just use a different variable name in the context of the circle
    const increment = 0.05; // the animation increment

    const canPId = "tetris-sketch"; // the parent canvas id in the html file
    const canW = 16 * unit; // the width of the canvas 
    const canH = 16 * unit; // the height of the canvas
    const canFront = "monospace"; // the font of the canvas

    const mBuffW = canW; // the width of the main buffer 
    const mBuffH = canH; // the height of the main buffer
    const mBuffBorderStrokeWeight = 1; // the line weight for the main buffer
    const gBuffW = 8 * unit; // the width of the game buffer
    const gBuffH = 12 * unit; // the height of the game buffer
    const gBuffBorderStrokeWeight = 1; // the line weight for the game buffer
    const cBuffW = 4 * unit; // the circle buffer width
    const cBuffH = 6 * unit; // the height of the circle buffer
    const cBuffBorderStrokeWeight = 1; // the line weight of the circle buffer
    const sBuffW = 4 * unit;
    const sBuffH = 4 * unit;
    const sBuffBorderStrokeWeight = 1;

    // Buffers orientation
    const mBuffTTO = s.createVector(0, 0); // translation vector for the mainbuffer
    const gBuffTTO = s.createVector(6 * unit, 2 * unit); // translation vector for the game buffer
    const cBuffTTO = s.createVector(unit, 2 * unit); // translation vector for the circle buffer
    const sBuffTTO = s.createVector(unit, 10  * unit); // translation vector for the score buffer

    const defDropSinsA = 1; // default amplitude of the dropping sinusoid
    const defDropSinsFreq = 1; // default frequency of the dropping sinsuoid
    const defDropSinsPhase = 0; // default phase of the dropping sinusoid
    const defDropSinsAngl = 0; // default angle of the dropping sinsuoid
    const dropInc = 0.5; // the increment used for the dropping animation, increase if you want to make the game harder
    const dropSinsFreqInc = 0.1; // the frequency increase increment when we press the key
    const dropSinsAInc = 0.1; // the amplitude increase increment when we press the key
    const dropSinsPhaseInc = 0.1; // the phase increase increment when we press the key
    const dropSinsMaxA = 1.5; // the maximum amplitude accepted
    const dropSinsMinA = 0.5; // the minimum amplitude accepted
    const dropSinsMaxFreq = 10; // the maximum frequency accepted
    const dropSinsMinFreq = 0.1; // the minimum frequency accepted
    const dropSinsMaxPhase = s.TWO_PI; // the maximum phase
    const dropSinsSamplesLen = gBuffW / unit / increment; // the numbers of samples to use
    const dropSinsMinPhase = 0; // the minimum phase accepted
    const dropSinsCenterDiam = 3; // the diameter of the center of circle
    const defDropSinsX = cBuffW / 2; // default value of the center (X) of the dropping sin
    const defDropSinsY = dropSinsMaxA * radius; // default value of the center (Y) of the dropping sin

    const arrowHead = 7; // the size of the head of the arrow
    const twoSqrt = Math.sqrt(2).toFixed(2); // needed to compute the position of the arrow

    // Color pallet
    const colors = {
        background: '#F6F8FA',
        gBuffBorder: 'black',
        gBufAxis: '#c1d7d7',
        mBuffBorder: 'black',
        cBuffBorder: 'black',
        sBuffBorder: 'black',
        cBuffGraphLine: '#c1d7d7',
        dropSinsCircle: 'red',
        dropSinsCirclePhase: '#b0ffd0',
        dropSinsCircleCenter: 'green',
        dropSinsMovingPoint: 'green',
        dropSinsRadius: '#c1d7d7',
        dropSins: 'red',
        dropSinsOX: '#c1d7d7',
        residSins: 'black',
        gBuffAxis: '#c1d7d7',
        mergePlus: 'green',
        mergeMinus: 'red',
        conLine: '#c1d7d7',
        textColor: 'black'
    };

    // Key codes
    const keys = {
        a: 65,
        z: 90,
        s: 83,
        x: 88,
        q: 81,
        w: 87,
        p: 80
    }

    // The game states 
    // used to draw the animation
    const gameStates = Object.freeze({
        DROP: 1,
        MERGE: 2
    });

    // -----------------------------------------------------------------------
    // Game related-functions and state variables
    // -----------------------------------------------------------------------

    let canvas; // the canvas where everything happens
    let mBuff; // a buffer on top of the main canvas
    let gBuff; // a game buffer
    let cBuff; // the circle buffer
    let sBuff;  // the score buffer
    let cDropSins; // information about the current dropping sinusoid
    let cResidSins = []; // the resiudes
    let cResidMax = 0;
    let cMergeIdx = 0; // used for the merge animation
    let cGameState = gameStates.DROP; // the default state when the game starts
    let lScore = 0; // last score
    let lStage = 0; // last stage
    let cStage = 0; // current stage
    let cScore = 0; // current score

    // Computes the samples for the dropping sinusoid
    let computeDropSinsSamples = (dS) => {
        for (let i = 0, cAngl = 0; i < dropSinsSamplesLen; i += 1, cAngl += increment) {
            dS.samples[i] = s.sin(dS.freq * cAngl + dS.phase) * dS.amp * radius;
        }
    }

    // Computes the position of the moving radius for the circle
    let computeDropSinsMovingRadius = (dS) => {
        dS.movRad = {};
        dS.movRad.x = dS.pos.x + s.cos(dS.angl * dS.freq + dS.phase) * dS.amp * radius;
        dS.movRad.y = dS.pos.y - s.sin(dS.angl * dS.freq + dS.phase) * dS.amp * radius;
    }

    // The dropping sinusoid, i had to name it like this
    let createDropSins = (amp, freq, phase, pos, angl) => {
        let r = {}; const defDropSinsPhase = 0;
        r.amp = amp;
        r.freq = freq;
        r.phase = phase;
        r.pos = pos;
        r.angl = angl;
        r.samples = [];
        computeDropSinsSamples(r);
        computeDropSinsMovingRadius(r);
        return r;
    }

    // Constructor-like function to create a default sinusoid
    let createDefaultDropSins = () => {
        return createDropSins(
            defDropSinsA,
            defDropSinsFreq,
            defDropSinsPhase,
            {
                x: defDropSinsX + unit,
                y: defDropSinsY + defDropSinsA * radius
            },
            defDropSinsAngl,
        );
    }

    // Constructor-like function to create a random sinusoid
    let createRandomDropSins = () => {
        return createDropSins(
            random(dropSinsMinA, dropSinsMaxA),
            random(dropSinsMinFreq, dropSinsMaxFreq),
            random(dropSinsMinPhase, dropSinsMaxPhase),
            {
                x: defDropSinsX + unit,
                y: defDropSinsY + defDropSinsA * radius
            },
            defDropSinsAngl
        );
    }

    // Constructor-like function to creat the residue signal
    let createRandomResidSins = () => {
        let r = new Array(dropSinsSamplesLen).fill(0);
        for (let j = 0; j < 2; j++) {
            const dS = createRandomDropSins();
            for (let i = 0; i < dropSinsSamplesLen; i += 1) {
                r[i] += dS.samples[i];
                if (Math.abs(r[i]) > cResidMax) {
                    cResidMax = Math.abs(r[i]);
                }
            }
        }
        return r;
    }

    let updateRandomResidSins = (r) => {
        let dS = createDropSins();
        for (let i = 0; i < dropSinsSamplesLen; i++) {
            r[i] += dS.samples[i];
        }
    }

    let mergeResidSinsWithDropSins = () => {
        for (let i = 0; i < dropSinsSamplesLen; i++) {
            cResidSins[i] += cDropSins.samples[i];
            cScore += gBuffH / 2 - Math.abs(cResidSins[i]);
            if (Math.abs(cResidSins[i]) > cResidMax) {
                cResidMax = Math.abs(cResidSins[i]);
            }
        }
        cStage++;
    }

    let initCanvas = () => {
        canvas = s.createCanvas(canW, canH);
        canvas.parent(canPId);
        s.textFont(canFront);
        s.frameRate(frameRate);
    }

    let initMainBuffer = () => {
        mBuff = s.createGraphics(mBuffW, mBuffH);
        drawBorderToBuff(mBuff, mBuffW, mBuffH, colors.mBuffBorder, mBuffBorderStrokeWeight);
    }

    let initGameBuffer = () => {
        gBuff = s.createGraphics(gBuffW, gBuffH);
    }

    let initCircleBuffer = () => {
        cBuff = s.createGraphics(cBuffW, cBuffH);
        drawBorderToBuff(cBuff, cBuffW, cBuffH, colors.cBuffBorder, cBuffBorderStrokeWeight);
    }

    let initScoreBuffer = () => {
        sBuff = s.createGraphics(sBuffW, sBuffH);
        drawBorderToBuff(sBuff, sBuffW, sBuffH, colors.sBuffBorder, sBuffBorderStrokeWeight);
    }

    /**
     * Draws the spinning circle
     */
    let drawCircleBuffer = () => {
        cBuff.push();
        cBuff.stroke(colors.cBuffGraphLine);
        let halfW = cBuffW / 2;
        cBuff.line(halfW, 0, halfW, cBuffH);
        cBuff.pop();
        drawCoordinatesToBuffer(cBuff, cBuffW, cBuffH, unit, cBuffW / 2, cBuffH / 2);
    }

    /**
     * Draw the current dropping sinusoid (cDropSin)
     */
    let drawDropSins = () => {
        // draw arc
        s.push();
        s.fill(colors.dropSinsCirclePhase);
        s.stroke(colors.dropSinsCircle);
        s.arc(cDropSins.pos.x, cDropSins.pos.y, cDropSins.amp * 2 * unit - 2, cDropSins.amp * 2 * unit - 2, -cDropSins.phase, 0);
        s.pop();
        // draw lines to match the actula dropping sinusoid
        s.push();
        const x1 = cDropSins.pos.x;
        const y1 = cDropSins.pos.y - cDropSins.amp * unit;
        const x2 = cDropSins.pos.x + gBuffW / 2 + unit + gBuffW;
        const y2 = y1;
        const x3 = cDropSins.pos.x;
        const y3 = cDropSins.pos.y + cDropSins.amp * unit;
        const x4 = cDropSins.pos.x + gBuffW / 2 + unit + gBuffW;
        const y4 = y3;
        s.beginShape(s.LINES);
        s.noFill();
        s.stroke(colors.conLine);
        s.vertex(x1, y1);
        s.vertex(x2, y2);
        s.vertex(x3, y3);
        s.vertex(x4, y4);
        s.endShape();
        s.pop();
        // draw the ox axis for the dropping sinusoid
        s.push();
        s.stroke(colors.dropSinsOX);
        s.strokeWeight(2);
        s.translate(gBuffTTO.x, 0);
        s.line(0, cDropSins.pos.y, gBuffW, cDropSins.pos.y);
        s.pop();
        // draw the dropping circle
        s.push();
        s.noFill();
        s.stroke(colors.dropSinsCircle);
        s.circle(cDropSins.pos.x, cDropSins.pos.y, cDropSins.amp * radius * 2);
        s.stroke(colors.dropSinsCircleCenter);
        s.circle(cDropSins.pos.x, cDropSins.pos.y, dropSinsCenterDiam);
        s.pop();
        // draw the moving radius around the circle
        s.push();
        s.line(cDropSins.pos.x, cDropSins.pos.y, cDropSins.movRad.x, cDropSins.movRad.y);
        s.pop();
        // draw the dropping sinusoid
        s.push();
        s.translate(gBuffTTO.x, gBuffTTO.y);
        s.stroke(colors.dropSins);
        s.noFill();
        s.beginShape();
        for (let i = 0, cx = 0; i < dropSinsSamplesLen; i++, cx += increment) {
            s.vertex(cx * radius, cDropSins.pos.y - 2 * unit - cDropSins.samples[i]);
        }
        s.endShape();
        s.pop();
        // draw the amplitude text
        s.push();
        s.fill(colors.textColor);
        const textX = cDropSins.pos.x + gBuffW / 2 + gBuffW - unit / 2;
        const textY = cDropSins.pos.y - cDropSins.amp * unit - 10;
        s.text("A = " + cDropSins.amp.toFixed(2), textX, textY);
        s.pop();
        // draw the amplitude arrow(s)
        s.push();
        s.fill(colors.textColor);
        s.stroke(colors.textColor);
        const arrowX1 = textX - 10;
        const arrowY1 = textY + 10;
        const arrowX2 = arrowX1;
        const arrowY2 = textY - unit / 2;
        arrow(arrowX2, arrowY2, arrowX1, arrowY1, arrowHead);
        const arrowX3 = arrowX1;
        const arrowY3 = cDropSins.pos.y + cDropSins.amp * unit;
        const arrowX4 = arrowX1;
        const arrowY4 = cDropSins.pos.y + cDropSins.amp * unit + unit / 2;
        arrow(arrowX4, arrowY4, arrowX3, arrowY3, arrowHead);
        s.pop();
        // draw the phase text 
        s.push()
        s.fill(colors.textColor);
        const phTxtX = cDropSins.pos.x + cDropSins.amp * unit + 10;
        const phTxtY = cDropSins.pos.y;
        s.text("φ= " + cDropSins.phase.toFixed(2), phTxtX, phTxtY);
        s.pop();
        // draw frequency arrow
        s.push();
        s.fill(colors.textColor);
        s.text("ω= " + cDropSins.freq.toFixed(2), cDropSins.movRad.x + 5, cDropSins.movRad.y + 5);
        s.pop();
    }

    /**
     * If draws the curent state of the game buffer
     * The function doesn't perform any animation update
     * So we need to manually increase the drop ( cDropSins.pos.y) and
     * pontetially the spinning circle (cDropSins.angl)
     */
    let drawGameBuffer = () => {
        gBuff.clear();
        drawCoordinatesToBuffer(gBuff, gBuffW, gBuffH, unit, gBuffW / 2, gBuff / 2);
        drawBorderToBuff(gBuff, gBuffW, gBuffH, colors.gBuffBorder, gBuffBorderStrokeWeight);
        // Draw middle line
        let halfBuffer = gBuffH / 2;
        gBuff.push();
        gBuff.noFill();
        gBuff.stroke(colors.gBufAxis);
        gBuff.strokeWeight(2);
        gBuff.line(0, halfBuffer, gBuffW, halfBuffer);
        gBuff.pop();
        // Draw residues
        gBuff.push();
        gBuff.noFill();
        gBuff.stroke(colors.residSins);
        gBuff.beginShape();
        for (let i = 0, cx = 0; i < dropSinsSamplesLen; i++, cx += increment) {
            s.vertex(cx * radius, halfBuffer - cResidSins[i]);
        }
        gBuff.endShape(); arrow
        gBuff.pop();
    }

    let drawScoreBuffer = () => {
        sBuff.clear();
        drawBorderToBuff(sBuff, sBuffW, sBuffH, colors.sBuffBorder, sBuffBorderStrokeWeight);
        sBuff.push();
        sBuff.fill(colors.textColor);
        sBuff.text("Current Score: " + (cScore/1000).toFixed(2), 10, unit / 2);
        sBuff.text("Current Stage: " + cStage, 10, 2* unit / 2);
        sBuff.text("Current Speed: " + dropInc, 10, 3* unit / 2);
        sBuff.text("Last Game Score: " + (lScore/1000).toFixed(2), 10, 4* unit / 2);
        sBuff.text("Last Game Stages:" + lStage, 10, 5* unit / 2);
        sBuff.pop();
    }

    /**
     * When the game enters the merge state it takes each sample
     * and computes the increase or decrease of the sample.
     * 
     * If there's an increase it adds on the canvas a colors.mergePlus line
     * If there's an increaseit adds on the canvas a colors.mergeMinus line
     * 
     * The function doesn't perform an increment on the animation, so we need 
     * to manuall cMergeIdx++, where cMergeIdx is the index of the sample
     */
    let drawMerge = () => {
        let sum = cDropSins.samples[cMergeIdx] + cResidSins[cMergeIdx];
        let halfBuffer = gBuffH / 2;
        let x1 = cMergeIdx * increment * unit;
        let y1 = halfBuffer - cResidSins[cMergeIdx];
        let x2 = x1;
        let y2 = halfBuffer - (cResidSins[cMergeIdx] + (sum - cResidSins[cMergeIdx]));
        let cColor = (sum > cResidSins[cMergeIdx]) ? colors.mergePlus : colors.mergeMinus;
        gBuff.push();
        gBuff.stroke(cColor);
        gBuff.line(x1, y1, x2, y2);
        gBuff.pop();
    }

    let dropped = () => {
        return cDropSins.pos.y >= canH / 2;
    }

    let merged = () => {
        return cMergeIdx >= dropSinsSamplesLen;
    }

    let defeat = () => {
        return cResidMax > gBuffH / 2;
    }

    s.keyPressed = () => {
        if (s.keyCode == keys.p) {
            cDropSins.pos.y = canH / 2;
        }
    }

    let keyboardChange = () => {
        if (s.keyIsDown(keys.a)) {
            if (cDropSins.amp < dropSinsMaxA) {
                cDropSins.amp += dropSinsAInc;
                computeDropSinsSamples(cDropSins);
                computeDropSinsMovingRadius(cDropSins);
            }
        } else if (s.keyIsDown(keys.z)) {
            if (cDropSins.amp > dropSinsMinA) {
                cDropSins.amp -= dropSinsAInc;
                computeDropSinsSamples(cDropSins);
                computeDropSinsMovingRadius(cDropSins);
            }
        } else if (s.keyIsDown(keys.s)) {
            if (cDropSins.freq < dropSinsMaxFreq) {
                cDropSins.freq += dropSinsFreqInc;
                computeDropSinsSamples(cDropSins);
                computeDropSinsMovingRadius(cDropSins);
            }
        } else if (s.keyIsDown(keys.x)) {
            if (cDropSins.freq > dropSinsMinFreq) {
                cDropSins.freq -= dropSinsFreqInc;
                computeDropSinsSamples(cDropSins);
                computeDropSinsMovingRadius(cDropSins);
            }
        } else if (s.keyIsDown(keys.q)) {
            if (cDropSins.phase < dropSinsMaxPhase) {
                cDropSins.phase += dropSinsPhaseInc;
                computeDropSinsSamples(cDropSins);
                computeDropSinsMovingRadius(cDropSins);
            }
        } else if (s.keyIsDown(keys.w)) {
            if (cDropSins.phase > dropSinsMinPhase) {
                cDropSins.phase -= dropSinsPhaseInc;
                computeDropSinsSamples(cDropSins);
                computeDropSinsMovingRadius(cDropSins);
            }
        }
    };

    // -----------------------------------------------------------------------
    // p5.js functions
    // -----------------------------------------------------------------------

    s.setup = () => {
        cDropSins = createDefaultDropSins();
        cResidSins = createRandomResidSins();

        initCanvas();
        initMainBuffer();
        initGameBuffer();
        initCircleBuffer();
        initScoreBuffer();

        drawCircleBuffer();
        drawGameBuffer();
        drawScoreBuffer();
    }

    s.draw = () => {
        s.background(colors.background);
        s.image(mBuff, 0, 0);
        s.image(gBuff, 6 * unit, 2 * unit);
        s.image(cBuff, unit, 2 * unit);
        s.image(sBuff, unit, 10 * unit);

        if (cGameState === gameStates.DROP) {
            // Drawing the dropping sinusoid
            drawDropSins();
            // Increment animation variables
            // increment the drop
            computeDropSinsMovingRadius(cDropSins);
            cDropSins.pos.y += dropInc;
            cDropSins.angl += increment;
            // Check key movements
            keyboardChange();
            // If dropped move to the merging state 
            if (dropped()) {
                drawScoreBuffer();
                cGameState = gameStates.MERGE;
            }
        } else if (cGameState === gameStates.MERGE) {
            // We keep drawing the dropping sinusoid
            // without incrementing anything
            drawDropSins();
            // The merge "animation"
            drawMerge();
            // Incremeting the animation
            cMergeIdx++;
            // If merged is finished, we go back to 
            // the drop state
            if (merged()) {
                // We actually merge the two objects
                mergeResidSinsWithDropSins();
                // We create another random dropping sinusoid
                cDropSins = createRandomDropSins();
                // We draw the game buffer
                drawGameBuffer();
                // Update score
                drawScoreBuffer();
                // We reset the merge animation for next time
                cMergeIdx = 0;
                if (defeat()) {
                    cDropSins = createDefaultDropSins();
                    cResidMax = 0;
                    cResidSins = createRandomResidSins();
                    drawGameBuffer();
                    lScore = cScore;
                    lStage = cStage;
                    cScore = 0;
                    cStage = 1;
                }
                // We change the actual state of the animation
                cGameState = gameStates.DROP;
            }
        }
    }

    // -----------------------------------------------------------------------
    // General, non-game related utilities
    // -----------------------------------------------------------------------

    /**
     * Caching the sine values for some performance gains
     */
    const sinVals = {};

    let cSin = (x) => {
        if (x in sinVals) {
            return sinVals[x];
        }
        // Math.sin is a little faster than p5js sin
        // At least on Chrome
        sinVals[x] = Math.sin(x);
        return sinVals[x];
    }

    /**
     * Surronds an image buffer with a line border
     */
    let drawBorderToBuff = (buff, w, h, color, strokeWeight) => {
        buff.push();
        buff.stroke(color);
        buff.noFill();
        buff.strokeWeight(strokeWeight);
        buff.rect(0, 0, w, h);
        buff.pop();
    }

    let drawCoordinatesToBuffer = (buff, buffW, buffH, unit, centerX, centerY) => {
        // horizontal
        let hSteps = buffH / unit;
        buff.push();
        buff.noFill();
        buff.stroke(colors.gBufAxis);
        buff.beginShape(s.LINES);
        for (let i = 0; i < hSteps; i++) {
            buff.vertex(0, i * unit);
            buff.vertex(buffW, i * unit);
        }
        buff.endShape();
        buff.pop();

        // vertical
        let vSteps = buffW / unit;
        buff.push();
        buff.noFill();
        buff.stroke(colors.gBufAxis);
        buff.beginShape(s.LINES);
        for (let i = 0; i < vSteps; i++) {
            buff.vertex(i * unit, 0);
            buff.vertex(i * unit, buffH);
        }
        buff.endShape();
        buff.pop();
    }


    /**
     * Returns a random value in a given interval 
     */
    let random = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    // Draws an arrow
    let arrow = (x1, y1, x2, y2, size) => {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const angle = s.atan2(dy, dx);
        const d = s.dist(x1, y1, x2, y2);;
        s.push();
        s.translate(x1, y1);
        s.rotate(angle);
        s.line(0, 0, d, 0);
        s.triangle(d, 0,
            d - size, -size / 3,
            d - size, size / 3);
        s.pop();
    }

    // -----------------------------------------------------------------------
}

let tetrisSketch =
    new p5(tetris, tetris.canPId);