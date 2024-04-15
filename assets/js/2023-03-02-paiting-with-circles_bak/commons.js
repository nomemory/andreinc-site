const theme = {
    canvasX: 400,
    canvasY: 400,
    frameRate: 10,
    frequency: 0.05,

    bkgColor: '#F6F8FA',
    lightCircleColor: 'silver',
    circleColor: 'black',
    lineColor: 'black',
    sineColor: 'red',
    cosineColor: 'blue',
    imColor: 'red',
    reColor: 'blue',
    thetaColor: 'green',
    thetaColorLight: '#b0ffd0',
    radiusColor: 'black',
    radiusColorLight: '#92b9b9',
    intervalLight: 'green',

    primaryAxis: '#c1d7d7',
    secondaryAxis: '#e0ebeb',
    intersections: '#92b9b9',

    lightGreen: '#e0fcee',
    lightRed: '#fcb8b8',

    textFont: "monospace",
    textColor: 'black',
    textSize: 12,
    webGLFont: '/assets/js/2023-03-02-paiting-with-circles/consola-mono.ttf',
}
const addPaintGrid = (s) => {

    s.paintGrid = (gridBuff, w, h, o, uSize, eUnit, props) => {
        gridBuff.push();
        gridBuff.noFill();
        let mx = "-";
        let px = " ";
        let my = "-";
        let py = " ";
        let xLabel = "x";
        let yLabel = "y";
        let hideXLabel = false;
        let hideYLabel = false;
        let hideLabels = false;
        let complexSystem = false;

        if (props !== undefined && props.invertX !== undefined && props.invertX === true) {
            mx = " "; px = "-";
        }
        if (props !== undefined && props.invertY !== undefined && props.invertY === true) {
            my = " "; py = "-";
        }
        if (props !== undefined && props.xLabel !== undefined) {
            xLabel = props.xLabel;
        }
        if (props !== undefined && props.yLabel !== undefined) {
            yLabel = props.yLabel;
        }
        if (props !== undefined && props.hideLabels !== undefined) {
            hideLabels = props.hideLabels;
        }
        if (props !== undefined && props.hideXLabel !== undefined) {
            hideXLabel = props.hideXLabel;
        }
        if (props !== undefined && props.hideYLabel !== undefined) {
            hideYLabel = props.hideYLabel;
        }
        if (props !== undefined && props.complexSystem !== undefined) {
            complexSystem = props.complexSystem;
        }

        gridBuff.push();
        gridBuff.noFill();
        gridBuff.textFont(theme.textFont)

        // Primary axis (OX, OY)
        gridBuff.push();
        gridBuff.stroke(s.color(theme.primaryAxis));
        gridBuff.strokeWeight(2);
        // Y AXIS -> ORIGIN TOP
        gridBuff.line(o.x, o.y, o.x, 0);
        // Y AXIS -> ORIGIN BOTTOM
        gridBuff.line(o.x, o.y, o.x, h);
        // X AXIS -> ORIGIN LEFT
        gridBuff.line(o.x, o.y, 0, o.y);
        // X AXIS -> ORIGIN RIGHT
        gridBuff.line(o.x, o.y, w, o.y);
        gridBuff.pop();

        // Secondary axis
        gridBuff.push();
        gridBuff.stroke(s.color(theme.secondaryAxis));
        for (let i = o.x; i < w; i += uSize)  gridBuff.line(i, 0, i, h);
        for (let i = o.x; i >= 0; i -= uSize) gridBuff.line(i, 0, i, h);
        for (let i = o.y; i < h; i += uSize) gridBuff.line(0, i, w, i);
        for (let i = o.y; i > 0; i -= uSize) gridBuff.line(0, i, w, i);
        gridBuff.pop();

        // Adding units
        if (props !== undefined && props.showUnits === true) {
            gridBuff.push();
            gridBuff.fill(theme.textColor);

            // X Positive Units
            if (props.hideUnitsXPos === undefined || props.hideUnitsXPos === false) {
                for (let i = eUnit, lb = 1, q1x = (w - o.x) / uSize; i < q1x; i += eUnit, lb++) {
                    gridBuff.text(px + lb, (o.x + i * uSize) + 5, o.y + 15);
                    gridBuff.push();
                    gridBuff.noFill();
                    gridBuff.stroke(theme.intersections); s
                    gridBuff.circle(o.x + i * uSize, o.y, 3);
                    gridBuff.pop();
                }
            }

            // X Negative Units
            if (props.hideUnitsXNeg === undefined || props.hideUnitsXNeg === false) {
                for (let i = eUnit, lb = 1, q2x = o.x / uSize; i < q2x; i += eUnit, lb++) {
                    gridBuff.text(mx + lb, (o.x - i * uSize) - 15, o.y + 15);
                    gridBuff.push();
                    gridBuff.noFill();
                    gridBuff.stroke(theme.intersections);
                    gridBuff.circle(o.x - i * uSize, o.y, 3);
                    gridBuff.pop();
                }
            }

            // Y Positive Units
            if (props.hideUnitsYPos === undefined || props.hideUnitsYPos === false) {
                for (let i = eUnit, lb = 1, q1y = o.y / uSize; i < q1y; i += eUnit, lb++) {
                    gridBuff.text((py + lb)+((complexSystem)?"i":""), o.x + 5, o.y - i * uSize - 5);
                    gridBuff.push();
                    gridBuff.noFill();
                    gridBuff.stroke(theme.intersections);
                    gridBuff.circle(o.x, o.y - i * uSize, 3);
                    gridBuff.pop();
                }
            }

            // Y Negative Units
            if (props.hideUnitsYNeg === undefined || props.hideUnitsYNeg === false) {
                for (let i = eUnit, lb = 1, q2y = (h - o.y) / uSize; i < q2y; i += eUnit, lb++) {
                    gridBuff.text((my + lb)+((complexSystem)?"i":""), o.x + 5, o.y + i * uSize + 15);
                    gridBuff.push();
                    gridBuff.noFill();
                    gridBuff.stroke(theme.intersections);
                    gridBuff.circle(o.x, o.y + i * uSize, 3);
                    gridBuff.pop();
                }
            }
        }

        // The origin of the grid
        if (props !== undefined && props.showOrigin === true) {
            gridBuff.push();
            gridBuff.fill(theme.radiusColor);
            gridBuff.textFont(theme.textFont);
            gridBuff.circle(o.x, o.y, 3);
            gridBuff.text("0", o.x + 5, o.y + 15);
            gridBuff.pop();
        }
        gridBuff.pop();

        // Labels
        if (!hideLabels) {
            gridBuff.push();
            gridBuff.fill(theme.radiusColor);
            gridBuff.textFont(theme.textFont);
            if (hideXLabel==false) {
                let tWidth = s.textWidth(xLabel);
                gridBuff.text(xLabel, w-tWidth-10, o.y - 10);
            }
            if (hideYLabel==false) {
                gridBuff.text(yLabel, o.x + 10, 15);
            }
            gridBuff.pop();
        }
        gridBuff.pop();
    };
};

const addPauseLoop = (s) => {
    s.pauseLoop = (condition, droppedRate, frameRate, timeOut, runThisBefore, runThisAfter) => {
        if (condition) {
            runThisBefore();
            s.frameRate(droppedRate);
            setTimeout(() => {
                s.frameRate(frameRate);
                if (runThisAfter !== undefined) {
                    runThisAfter();
                }
            }, timeOut);
        }
    };
};

const addShowFps = (s) => {
    s.showFps = () => {
        s.text(s.frameRate().toFixed(1) + "fps", s.width - 55, s.height - 5);
    };
}

const addLineDashed = (s) => {
    s.lineDash = (c, pattern, x1, y1, x2, y2) => {
        c.drawingContext.setLineDash(pattern);
        s.line(x1, y1, x2, y2);
        c.drawingContext.setLineDash([]);
    }
}

const addArrow = (s) => {
    s.arrow = (x1, y1, x2, y2) => {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const angle = s.atan2(dy, dx);
        const d = s.dist(x1, y1, x2, y2);
        const arrowSize = d / 10;
        s.push();
        s.translate(x1, y1);
        s.rotate(angle);
        s.line(0, 0, d, 0);
        s.triangle(d, 0,
                    d - arrowSize, -arrowSize / 3,
                    d - arrowSize, arrowSize / 3);
        s.pop();
    },
    s.arrowCt = (x1, y1, x2, y2, size) => {
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
    },
    s.arrowBezier = (x1, y1, x2, y2, x3, y3, x4, y4, size) => {
        s.bezier(x1, y1, x2, y2, x3, y3, x4, y4);
        // arrowhead
        let ahx1 = x4 - (x4 - x2) * size;
        let ahy1 = y4 - (y4 - y2) * size;
        let ahx2 = x4 - (x4 - x3) * size;
        let ahy2 = y4 - (y4 - y3) * size;
        s.line(x4, y4, ahx1, ahy1);
        s.line(x4, y4, ahx2, ahy2);
    },
    s.arrowDashed = (canvas, pattern, x1, y1, x2, y2) => {
        const dx = x2 - x1;
        const dy = y2 - y1;
        const angle = s.atan2(dy, dx);
        const d = s.dist(x1, y1, x2, y2);
        const arrowSize = d / 10;
        s.push();
        s.translate(x1, y1);
        s.rotate(angle);
        s.lineDash(canvas, pattern, 0, 0, d, 0);
        s.triangle(d, 0,
                    d - arrowSize, -arrowSize / 3,
                    d - arrowSize, arrowSize / 3);
        s.pop();
    }
}

/**
 * 
 * @param {*} s The drawing function
 * @param {*} vC The center of the circle creating the sinusoid
 * @param {*} vR The current point of the moving radius
 * @param {*} radius The radius 
 * @param {*} angle The amplititude
 * @param {*} ampl The amplititude
 * @param {*} freq The frequency
 * @param {*} phase The phase
 * @param {*} color The color used to draw
 * @param {*} tf The incremenet for the angle
 * @param {*} tr 
 */

function Sinusoid(s, vC, vR, angle, ampl, freq, phase, color, tf, tr) {
    this.s = s;
    this.vC = vC;
    this.vR = vR;
    this.ampl = ampl;
    this.freq = freq;
    this.phase = phase;
    this.color = color;
    this.angle = angle;
    this.tf = tf;
    this.tr = tr;
}

const SinusoidPrototype = {

    draw() {
        // Actual Circle 
        this.s.push();
        this.s.noFill();
        this.s.stroke(this.color);
        this.s.circle(this.vC.x, this.vC.y, 2*this.ampl*this.tr);
        this.s.pop();
        // Moving Radius
        this.s.push();
        this.s.stroke(theme.radiusColorLight);
        this.s.line(this.vC.x, this.vC.y, this.vR.x, this.vR.y);
        this.s.pop();
    },

    update(fromEpi) {
        if (fromEpi!==undefined) {
            this.vC.x = fromEpi.vR.x;
            this.vC.y = fromEpi.vR.y;
        }
        this.vR.x = this.vC.x + this.ampl * this.s.sin(this.angle * this.freq + this.phase + this.s.HALF_PI) * (this.tr);
        this.vR.y = this.vC.y + this.ampl * this.s.cos(this.angle * this.freq + this.phase + this.s.HALF_PI) * (this.tr);
        this.angle+=this.tf;
    }
}

Object.assign(Sinusoid.prototype, SinusoidPrototype);

// -- DFT Related

// Complex numbers
function Complex(re, im) {
    this.re = re;
    this.im = im;
}
const ComplexPrototype = {
    add(cn) {
        this.re += cn.re;
        this.im += cn.im;
    },
    prd(cn) {
        return new Complex(
            this.re * cn.re - this.im * cn.im,
            this.re * cn.im + this.im * cn.re    
        );
    }
}
Object.assign(Complex.prototype, ComplexPrototype);

// DFT

const addDft = (s) => {
    s.dft = (vals) => {
        let coefs = [];
        for(let i = 0; i < vals.length; ++i) {
            let sum = new Complex(0, 0);
            for(let j = 0; j < vals.length; ++j) {
                let phi = 2 * s.PI * i * j / vals.length;
                sum.add(vals[j].prd(new Complex(s.cos(phi), -s.sin(phi))));
            }
            sum.re = sum.re / vals.length;
            sum.im = sum.im / vals.length;
            coefs[i] = {
                freq: i,
                amp: s.sqrt(sum.re * sum.re + sum.im * sum.im),
                phase: s.atan2(sum.im, sum.re)
            };
        }
        return coefs;
    },
    s.dftFreqSort = (vals) => {
        return s.dft(vals).sort((a, b) => b.freq - a.freq);
    }
    s.dftAmpSort = (vals) => {
        return s.dft(vals).sort((a, b) => b.amp - a.amp);
    }
}
  
const addEpiCycles = (s) => {
    s.epiCycles = (x, y, coef, rot, ang, settings) => {
        for(let i = 0, prevX=x, prevY=y; i < coef.length; i++, prevX=x, prevY=y) {
            x += coef[i].amp * s.cos(coef[i].freq * ang + coef[i].phase + rot);
            y += coef[i].amp * s.sin(coef[i].freq * ang + coef[i].phase + rot);
            s.push();
            s.noFill();
            s.stroke(theme.radiusColorLight);
            s.circle(prevX, prevY, coef[i].amp * 2);
            s.line(prevX, prevY, x, y);  
            s.pop();
        }
        return s.createVector(x, y);
    }
}

const addEpiCyclesPath = (s) => {
    s.epiCyclesPath = (path, settings) => {
        s.push();
        s.beginShape();
        s.noFill();
        s.stroke(theme.radiusColor);
        for (let i = 0; i < path.length; i++) {
          s.vertex(path[i].x, path[i].y);
        }
        s.endShape();
        s.pop();
    }
}