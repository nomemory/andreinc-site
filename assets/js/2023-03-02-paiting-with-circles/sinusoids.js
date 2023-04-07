const defaultInputSinusoid = {
    freq: 2,
    phase: 0,
    radius: 2
};

const sinusoids = (styles, input) => {

return (s) => {

const height = 400;
const width = 700;
const radiusScale = 40;
const initAngle = 0;

// Standard values for the sinusoid
let vSCircle, vSRadius;
const sRadius = 1;
const sFreq = 1;
const sPhase = 0;
let sRadiusS = sRadius * radiusScale;
let sAngle = initAngle;

// Custom values for the sinusoid
let vCCircle, vCRadius;
let cRadius = input.radius;
let cFreq = input.freq;
let cPhase = input.phase;
let cAngle = initAngle;
let cRadiusS = cRadius * radiusScale;

// Others
let gridX;
let canvas;

// Precomputed Sinusoids
let standardSinusoid = [];
let customSinusoid = [];
let ssIdx = 0;

s.setup = () => {
    canvas = s.createCanvas(width, height); 
    canvas.parent('sinusoids-sketch');
    
    s.textFont(styles.textFont);
    s.setAttributes('antialias', true);
    s.frameRate(styles.frameRate);

    // The centers for the two circles
    vSCircle = s.createVector(100, 60);
    vCCircle = s.createVector(100, 260);
    gridX = vSCircle.x + 2*sRadius*radiusScale + 50;

    // s.initConditions();
    vSRadius = s.createVector(
        vSCircle.x + sRadiusS,
        vSCircle.x,
    );
    vCRadius = s.createVector(
        vCCircle.x + cRadiusS,
        vCCircle.y
    );

    // Precompute sinusoids
    // Standard Sinusoid
    let point;
    for(let x = gridX, cAngle=-1; x < width; x+=s.radians(1)*sRadiusS, cAngle++) {
        // standard
        point = {};
        point.x = x;
        point.y = vSCircle.y - sRadiusS * Math.sin(s.radians(cAngle)*sFreq+sPhase);
        standardSinusoid.push(point);
        // custom
        point = {}
        point.x = x;
        point.y = vCCircle.y - cRadiusS * Math.sin(s.radians(cAngle)*cFreq+cPhase);
        customSinusoid.push(point);

    }
};

s.draw = () => {
    s.background(styles.bkgColor);

    // Drawing the two circles
    pCircle(s, vSCircle.x, vSCircle.y, 2 *  sRadiusS, styles.circleColor);
    pCircle(s, vSCircle.x, vSCircle.y, 3, styles.circleColor); // center
    pCircle(s, vCCircle.x, vCCircle.y, 2 * cRadiusS, styles.circleColor);
    pCircle(s, vCCircle.x, vCCircle.y, 3, styles.circleColor); // center
    // Drawing the text above the two circles
    pText(s, "A = 1, ω = 1, φ = 0", vSCircle.x - 70, vSCircle.y-sRadiusS-10);
    pText(s, "A = " + cRadius + ", ω = " + cFreq + ", φ = " + cPhase.toFixed(2), vCCircle.x - 70, vCCircle.y-cRadiusS-10);

    // Drawing the moving radius for the two circles
    pLine(s, vSCircle.x, vSCircle.y, vSRadius.x, vSRadius.y, styles.sineColor);
    pLine(s, vCCircle.x, vCCircle.y, vCRadius.x, vCRadius.y, styles.sineColor);

    // Drawing grid
    pLine(s, gridX, 0, gridX, height, styles.gridColor);
    pLine(s, gridX, vSCircle.y, width, vSCircle.y, styles.gridColor); // x-axis for the "standard" sinusoid
    pLine(s, gridX, vCCircle.y, width, vCCircle.y, styles.gridColor); // x-axis for the "custom" sinusStandard Unit Circleoid
    pCircle(s, gridX, vSCircle.y, 3, styles.coordSysColor, styles.coordSysColor); // origin of the grid for the "standard" sinusoid
    pCircle(s, gridX, vCCircle.y, 3, styles.coordSysColor, styles.coordSysColor); // origin of the grid for the "custom" sinusoid
    pCircle(s, gridX, vSCircle.y - sRadiusS, 3, styles.coordSysColor, styles.coordSysColor); // 1 for "standard"
    pText(s, " 1", gridX - 20, vSCircle.y - sRadiusS);
    pCircle(s, gridX, vSCircle.y + sRadiusS, 3, styles.coordSysColor, styles.coordSysColor); // -1 for "standard"
    pText(s, "-1", gridX - 20, vSCircle.y + sRadiusS);
    pCircle(s, gridX, vCCircle.y -2*sRadiusS, 3, styles.coordSysColor, styles.coordSysColor); // 2 for "custom"
    pText(s, " 2", gridX - 20, vCCircle.y -2*sRadiusS);
    pCircle(s, gridX, vCCircle.y -sRadiusS, 3, styles.coordSysColor, styles.coordSysColor);   // 1 for "custom"
    pText(s, " 1", gridX - 20, vCCircle.y -sRadiusS);
    pCircle(s, gridX, vCCircle.y + 2*sRadiusS, 3, styles.coordSysColor, styles.coordSysColor); // -2 for "custom"
    pText(s, "-2", gridX - 20, vCCircle.y + 2*sRadiusS);
    pCircle(s, gridX, vCCircle.y + sRadiusS, 3, styles.coordSysColor, styles.coordSysColor); // -1 for "custom"
    pText(s, "-1", gridX - 20, vCCircle.y + sRadiusS);
    for(let i = gridX, j = 0; i < width; i+=sRadiusS, j++) {
        pCircle(s, i, vSCircle.y, 3, styles.coordSysColor, styles.coordSysColor);
        pCircle(s, i, vCCircle.y, 3, styles.coordSysColor, styles.coordSysColor);
        pText(s, j, i-3, vCCircle.y+15);
        pText(s, j, i-3, vSCircle.y+15);
    }

    // Paint sinusoids
    // Standard sinusoid
    for(let i = 0; i < standardSinusoid.length; i++) {
        pPoint(s, standardSinusoid[i].x, standardSinusoid[i].y, styles.coordSysColor);
    }
    for(let i = 0; i < customSinusoid.length; i++) {
        pPoint(s, customSinusoid[i].x, customSinusoid[i].y, styles.coordSysColor);
    }
    // Moving line
    // Standard sinusoid
    pLine(s, standardSinusoid[ssIdx].x, standardSinusoid[ssIdx].y, vSRadius.x, vSRadius.y, styles.coordSysColor);
    pLine(s, customSinusoid[ssIdx].x, customSinusoid[ssIdx].y, vCRadius.x, vCRadius.y, styles.coordSysColor);
    ssIdx++;
    if (ssIdx==standardSinusoid.length) {
        ssIdx = 0;
        sAngle = initAngle;
    }
    vSRadius.x = vSCircle.x + sRadiusS * Math.sin(Math.PI/2 + s.radians(sAngle)*sFreq+sPhase); // standard sinusoid
    vSRadius.y = vSCircle.y + sRadiusS * Math.cos(Math.PI/2 + s.radians(sAngle)*sFreq+sPhase);
    vCRadius.x = vCCircle.x + cRadiusS * Math.sin(Math.PI/2 + s.radians(sAngle)*cFreq+cPhase); // custom sinusoid increment
    vCRadius.y = vCCircle.y + cRadiusS * Math.cos(Math.PI/2 + s.radians(sAngle)*cFreq+cPhase);

    // Incremenet moving angle
    sAngle++;
}; 
};
};

// let sinusoidsSketch = new p5(sinusoids(styles, defaultInputSinusoid), "sinusoids-sketch");

const updateSinusoids = () => {

    let radiusEl = parseFloat(document.getElementById('sinusoid_A').value);
    let freqEl = parseFloat(document.getElementById('sinusoid_omega').value);
    let phaseEl = parseFloat(document.getElementById('sinusoid_phi').value);

    let input = {
        radius: radiusEl,
        freq: freqEl,
        phase: phaseEl*Math.PI
    };
    
    sinusoidsSketch.remove();
    sinusoidsSketch = new p5(sinusoids(styles, input), 'sinusoids-sketch');
};