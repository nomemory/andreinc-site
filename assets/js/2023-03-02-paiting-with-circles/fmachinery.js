let crtWave = "sawtooth";

const fMachinery = (s) => {

    addPaintGrid(s);

    // the radius of the circle
    const r = 60;
    // the sampling frequency
    const f = 0.1
    // frequency scaled with r
    const fR = f * r;
    // lol
    const infty = 2000;
    // the number of individual terms to render
    const numTerms = 10;

    // absolute center of the coordinate system
    let vC;
    // center of axis for circles
    let vCC;
    // font used for the 3d canvas
    let cfont;


    // angle starts with a phase
    // initial value of the angle
    let angl = 0;   
    // a phase so i can emulate the unit circle
    let dphs = s.HALF_PI; 
    // the maximum rotations of the circle 
    // afterwards angl is reset to 0
    let maxAngl = 2 * s.TWO_PI + dphs; 
    // the angl scaled to the x-axis (by r)
    let mpX = 0; 

    let someColors = [
        "#00CED1", "#B22222",
        "#FF1493", "#2F4F4F",
        "#FFA500", "#F4A460",
        "#ADFF2F", "#4682B4",
        "#5F9EA0", "#9ACD32",
        "#FF0000", "#696969",
        "#8B4513", "#FF6347",
        "#FFD700", "#000080",
        "#778899", "#48D1CC",
        "#FFFF00", "#20B2AA",
        "#4682B4", "#B0C4DE"
    ]

    s.preload = () => {
        // WebGL requires to load a font before using s.text
        cfont = s.loadFont('/assets/js/2023-03-02-paiting-with-circles/consola-mono.ttf');
    }

    let waves = {
        "sawtooth": {
            impl : {
                amp: (k) => { return 2 / (s.PI * k) },
                freq: (k) => { return k * ((k % 2 == 0) ? (1) : (-1)); },
                phase: (k) => { return 0; },
            },
            vals: [],
            coeffs: [],
            sum: {}
        },
        "square": {
            impl: {
                amp: (k) => { return 4 / s.PI / (2*k-1) },
                freq: (k) => { return  (2*k-1); },
                phase: (k) => { return 0; },
            },
            vals: [],
            coeffs: [],
            sum: {}
        },
        "triangle": {
            impl : {
                amp: (k) => { return 8 / s.PI / s.PI / (2*k-1) / (2*k-1)},
                freq: (k) => { return (2*k-1) * ((k % 2 == 0) ? (-1) : (1)); },
                phase: (k) => { return 0; },
            },
            vals: [],
            coeffs: [],
            sum: {}
        }
    };

    s.initWaves = () => {
        for (let wave in waves) {
            for (let i = 0; i < numTerms; i++) {
                waves[wave].vals[i] = {};
            }
            for (let i = 1; i <= numTerms; i++) {
                waves[wave].coeffs[i - 1] = {
                    amp: waves[wave].impl.amp(i),
                    freq: waves[wave].impl.freq(i),
                    phase: waves[wave].impl.phase(i)
                };
                for (let x = 0; x < maxAngl; x += f) {
                    let yV = -s.sin(waves[wave].coeffs[i - 1].freq * x) * (waves[wave].coeffs[i - 1].amp * r);
                    let xV = x * r;
                    waves[wave].vals[i - 1][xV] = yV;
                    if (!(xV in waves[wave].sum)) {
                        waves[wave].sum[xV] = 0;
                    }
                    waves[wave].sum[xV] += yV;
                }
            }
        }
    }


    s.setup = () => {
        const canvas = s.createCanvas(800, 500, s.WEBGL);
        canvas.parent('fmachinery-sketch');
        s.frameRate(10);
        s.textFont(cfont);
        // absolute center
        vC = s.createVector(0, 0, 0);
        // the center for the moving circles
        vCC = s.createVector(-2 * r, 0, 0);
        s.initWaves();
        s.camera(-200, -200, 200, 0, 0, 0, 0, 1, 0);
    };

    s.draw = () => {
        s.background(theme.bkgColor);
        s.translate(vC.x, vC.y, 0);
        s.orbitControl();

        // Draw coordinates system
        s.push();
        s.smooth();
        s.translate(vC.x, vC.y, 0);
        s.fill(255, 255, 255);
        s.stroke(theme.radiusColorLight);
        // X
        s.line(-s.width, 0, 0, s.width, 0, 0); 
        s.stroke(theme.radiusColorLight);
        s.push();
        s.stroke(theme.textColor);
        s.fill(theme.textColor);
        s.textSize(24);
        s.text("time (t)", 200, +30);
        s.pop();
        // Y
        s.line(0, -s.height, 0, 0, s.height, 0); 
        s.stroke(theme.radiusColorLight);
        s.push();
        s.stroke(theme.textColor);
        s.fill(theme.textColor);
        s.textSize(24);
        s.text("amplitude (A)", 10, -140);
        s.pop();
        // Z
        s.line(0, 0, -infty, 0, 0, infty); 
        // A secondary Z
        s.line(vCC.x, 0, -infty, vCC.x, 0, infty)
        s.pop();

        // Draw circles
        s.push();
        s.noFill();
        for (let i = 0; i < numTerms; i++) {
            // each time we go back to draw a circle
            // that operates at a higher frequnecy
            s.translate(0, 0, -r);
            s.stroke(someColors[i]);
            s.circle(-2 * r, 0, waves[crtWave].coeffs[i].amp * 2 * r);
            s.stroke(theme.textColor);
            s.circle(-2 * r, 0, 3);
            // draw text near circle
            s.push();
            s.fill(someColors[i]);
            s.text("A=" + waves[crtWave].coeffs[i].amp.toFixed(2), -3 * r - 10, 0);
            s.text("ω=" + waves[crtWave].coeffs[i].freq, -3 * r - 10, 15);
            s.pop();
        }
        s.pop();

        // Draw moving radius for each circle
        s.push();
        for (let i = 0; i < numTerms; i++) {
            s.translate(0, 0, -r);
            let localX = -2 * r + waves[crtWave].coeffs[i].amp * r * s.sin(angl * waves[crtWave].coeffs[i].freq + dphs);
            let localY = waves[crtWave].coeffs[i].amp * r * s.cos(angl * waves[crtWave].coeffs[i].freq + dphs);
            s.push();
            s.stroke(someColors[i]);
            s.line(-2 * r, 0, localX, localY);
            s.stroke(theme.sineColor);
            s.circle(localX, localY, 3);
            s.stroke(theme.lightCircleColor);
            s.line(localX, localY, mpX, localY);
            s.stroke(theme.sineColor);
            s.circle(mpX, localY, 3);
            s.pop();
        }
        s.pop();

        // Paint each individual component as the rotation from the circles go
        s.push();
        for (let i = 0; i < numTerms; i++) {
            s.translate(0, 0, -r);
            s.stroke(someColors[i]);
            s.beginShape();
            s.noFill();
            for (let x = 0; x < angl; x += f) {
                let k = x * r;
                s.vertex(k, waves[crtWave].vals[i][k]);
            }
            s.endShape();

            // s.push();
            // s.resetMatrix();
            // s.beginShape();
            // s.noFill();
            // // s.stroke(theme.thetaColorLight);
            // for (let x = 0; x < angl; x += f) {
            //     s.vertex(x * r, sawToothVals[i][x * r]);
            // }
            // s.endShape();
            // s.pop();
        }
        s.pop();

        // Paint the sum of the components
        s.push();
        s.beginShape();
        s.noFill();
        let textX;
        for (let x = 0; x < angl; x += f) {
            k = x * r;
            s.vertex(k, waves[crtWave].sum[k]);
            textX = k;
        }
        s.stroke(theme.sineColor);
        s.endShape();
        s.pop();

        angl += f;
        mpX += fR;
        if (angl > maxAngl) {
            angl = 0;
            mpX = 0;
        }
    };
}

let fMachinerySketch = new p5(fMachinery, 'fmachinery-sketch');

const updateFmWave = () => {
    crtWave = document.getElementById('fm-wave').value;
    fMachinerySketch.remove();
    fMachinerySketch = new p5(fMachinery, 'fmachinery-sketch');
};   