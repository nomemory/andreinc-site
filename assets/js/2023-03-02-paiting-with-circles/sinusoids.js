let cusSinusoid = {
    freq: 2,
    phase: 0,
    radius: 1.5
};

const sinusoids = (s) => {
    addPaintGrid(s);
    addLineDashed(s);
    addShowFps(s);

    const d = 100;
    const r = d / 2;
    const w = 800;
    const h = 600;
    const tf = theme.frequency / 6;
    let tph = s.HALF_PI;

    let canvas;
    let angls = 0;
    let anglc = 0;

    let vCStd; // standard circle center
    let vRStd; // standard circle moving radius
    let vGStd; // the grid center for the standard circle
    let vMStd; // moving point for the main circle

    let vCCus; // custom circle center 
    let vRCus; // custom circle moving radius
    let vGCus; // the grid center for the custom circle
    let vMCus; // moving point for the custom circle

    let stdBuff; // graphics buffer for the standard circle
    let cusBuff; // graphics buffer for the custom circle


    s.initConditions = () => {
        vCStd = s.createVector(2 * r, 2 * r);
        vCCus = s.createVector(2 * r, 3 * r);
        vGStd = s.createVector(vCStd.x + 2 * r, vCStd.y);
        vGCus = s.createVector(vCCus.x + 2 * r, vCCus.y);
        stdBuff = s.createGraphics(w, 4 * r);
        cusBuff = s.createGraphics(w, 6 * r);
        vMStd = s.createVector(vGStd.x, vCStd.y);
        vMCus = s.createVector(vGCus.x, vCCus.y);

        vRStd = s.createVector(
            vCStd.x + s.sin(angls + tph) * r,
            vCStd.y + s.cos(angls + tph) * r
        );
        vRCus = s.createVector(
            vCCus.x + s.sin(angls * cusSinusoid.freq + tph + cusSinusoid.phase) * r,
            vCCus.y + s.cos(angls * cusSinusoid.freq + tph + cusSinusoid.phase) * r
        );

        // Paint the grid(s) on the graphical buffers
        s.paintGrid(stdBuff, w, 4 * r, vGStd, r, 1, {
            showUnits: true,
            hideUnitsXNeg: true,
            showOrigin: true
        });
        s.paintGrid(cusBuff, w, 6 * r, vGCus, r, 1, {
            showUnits: true,
            hideUnitsXNeg: true,
            showOrigin: true
        });

        // Paint the standard circle
        s.push();
        stdBuff.circle(vCStd.x, vCStd.y, 3);
        stdBuff.circle(vCStd.x, vCStd.y, d);
        s.pop();

        // Paint the custom circle
        s.push(); s.showFps();
        cusBuff.circle(vCCus.x, vCCus.y, 3);
        cusBuff.circle(vCCus.x, vCCus.y, d * cusSinusoid.radius);
        s.pop();

        // Change the position of the custom circle relative to the 
        // canvas not to the graphical instance
        vCCus.y += 5 * r;
        vGCus.y += 5 * r;
        vRCus.y += 5 * r;

        // Text for the two grids
        stdBuff.push();
        stdBuff.textFont(theme.textFont);
        stdBuff.fill(theme.radiusColor);
        stdBuff.text("Unit Circle: y=f(x)=sin(x), because: A=1, ω=1, φ=0", 4 * r + 25, 4 * r - 10);
        stdBuff.pop();
        cusBuff.push();
        cusBuff.fill(theme.radiusColor);
        cusBuff.textFont(theme.textFont);
        cusBuff.text("'Custom' circle: y=f(x)=" + 
                        cusSinusoid.radius +
                         "*sin(" + cusSinusoid.freq +
                         "*x+" + cusSinusoid.phase.toFixed(2) +
                         "), where " +
                         "A="+cusSinusoid.radius+", " +
                         "ω="+cusSinusoid.freq+", " +
                         "φ="+cusSinusoid.phase.toFixed(2),
                         4 * r + 25, 6 * r - 10);
        cusBuff.pop();
        angls = 0, anglc = 0;
    }

    s.setup = () => {
        // Create Canvas of given size 
        canvas = s.createCanvas(w, h);
        canvas.parent('sinusoids-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);
        s.initConditions();
    }

    s.draw = () => {
        s.background(theme.bkgColor);

        // Paint the two graphical buffers
        s.image(stdBuff, 0, 0);
        s.image(cusBuff, 0, 5 * r);
        s.noFill();

        // Increment the reference for vCCus
        s.push();
        s.fill(theme.sineColor);
        s.circle(vCCus.x, vCCus.y, 3);
        s.pop();


        // Moving radius for standard
        s.push();
        s.stroke(theme.radiusColorLight);
        s.line(vCStd.x, vCStd.y, vRStd.x, vRStd.y);
        s.circle(vRStd.x, vRStd.y, 3);
        s.pop();

        // Moving radius for custom
        s.push();
        s.stroke(theme.radiusColorLight);
        s.line(vCCus.x, vCCus.y, vRCus.x, vRCus.y);
        s.circle(vRCus.x, vRCus.y, 3);
        s.pop();

        // Moving Points
        s.push();
        stdBuff.point(vMStd.x, vMStd.y);
        cusBuff.point(vMCus.x, vMCus.y);
        s.pop();

        // Moving text near the points
        s.push();
        s.fill(theme.sineColor);
        s.text("y=f(x)=1*sin(1*x+0)", vMStd.x + 5, vMStd.y + 5);
        s.text("y=f(x)=" + cusSinusoid.radius + "*sin(" + cusSinusoid.freq + "*x+" + cusSinusoid.phase.toFixed(2) + ")",
            vMCus.x + 5, vMCus.y + 5 * r + 5);
        s.pop();

        // Movign red circles
        s.push();
        s.fill(theme.sineColor);
        s.stroke(theme.sineColor);
        s.circle(vMCus.x, vMCus.y + 5 * r, 3);
        s.circle(vMStd.x, vMStd.y, 3);
        s.pop();

        // Connecting the moving red circles with the moving radiuses
        s.push();
        s.stroke(theme.radiusColorLight);
        s.lineDash(canvas, [3, 3], vMStd.x, vMStd.y, vRStd.x, vRStd.y);
        s.lineDash(canvas, [3, 3], vMCus.x, vMCus.y + 5 * r, vRCus.x, vRCus.y);
        s.pop();

        // Animation increments
        vRStd.x = vCStd.x + s.sin(angls + tph) * r;
        vRStd.y = vCStd.y + s.cos(angls + tph) * r;
        vRCus.x = vCCus.x + s.sin(anglc * cusSinusoid.freq + tph + cusSinusoid.phase) * (r * cusSinusoid.radius);
        vRCus.y = vCCus.y + s.cos(anglc * cusSinusoid.freq + tph + cusSinusoid.phase) * (r * cusSinusoid.radius);
        vMStd.x += tf * r;
        vMStd.y = vCStd.y - s.sin(anglc) * r;
        vMCus.x += tf * r;
        vMCus.y = vCCus.y - 5 * r - s.sin(anglc * cusSinusoid.freq + cusSinusoid.phase) * (r * cusSinusoid.radius);
        angls += tf;
        anglc += tf;

        if (vMCus.x > w || vMStd.x > w) {
            s.initConditions();
        }

        // console.log(s.frameRate());
    }
}

let sinusoidsSketch =
    new p5(sinusoids, 'sinusoids-sketch');

const updateSinusoids = () => {

    let radiusEl = parseFloat(document.getElementById('sinusoid_A').value);
    let freqEl = parseFloat(document.getElementById('sinusoid_omega').value);
    let phaseEl = parseFloat(document.getElementById('sinusoid_phi').value);

    cusSinusoid.radius = radiusEl;
    cusSinusoid.freq = freqEl;
    cusSinusoid.phase = phaseEl * Math.PI
    sinusoidsSketch.remove();
    sinusoidsSketch = new p5(sinusoids, 'sinusoids-sketch');
};    
