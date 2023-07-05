let sumEpiK = 3;
let sumEpiOmega = 1;

const sumEpi = (s) => {

    addPaintGrid(s);
    addLineDashed(s);
    addShowFps(s);

    const d = 100;
    const r = d / 2;
    const w = 800;
    const h = 700;
    const tf = theme.frequency / 5;
    let tph = s.HALF_PI;

    let fBuff;  // the buffer where we plot the two sinusoids
    let sBuff;  // the buffer where we plot the sum of the two sinusoids
    let vGf;    // the center of the grid for the two sinusoids
    let vGs;    // the sum of the grid for the sum of the two sinusoids
    let vCf;    // the center of all the circles from the functions grid

    let angl;

    let ykcolors = [
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

    let sinusoids = [];
    let movingPoints = [];

    let canvas;

    s.initConditions = () => {
        vGf = s.createVector(4 * r, 3 * r);
        vGs = s.createVector(4 * r, 10 * r);
        vCf = s.createVector(2 * r, 3 * r);

        fBuff = s.createGraphics(w, 6 * r);
        s.paintGrid(fBuff, w, 6 * r, vGf, r, 1, {
            showUnits: true,
            hideUnitsXNeg: true,
            showOrigin: true
        });
        sBuff = s.createGraphics(w, 6 * r);
        s.paintGrid(sBuff, w, 6 * r, vGf, r, 1, {
            showUnits: true,
            hideUnitsXNeg: true,
            showOrigin: true
        });

        // Adding the labels to fBuff
        fBuff.push();
        fBuff.textFont(theme.textFont);
        for (let i = 1; i < sumEpiK + 1; i++) {
            fBuff.fill(ykcolors[i - 1]);
            fBuff.text("y" + i + "(x)", 10, i * 15);
        }
        fBuff.pop();

        // Initializing sinsuoids
        for(let i = 0; i < sumEpiK; i++) {
            sinusoids[i] = new Sinusoid(
                s, //s
                vCf, //the center of the center of the sinusoid
                s.createVector(vCf.x + r, vCf.y), // the current point of the moving radius
                0, // initial angle
                4/(s.PI*(2*(i+1)-1)), // ampl
                (2*(i+1)-1)*sumEpiOmega, // freq
                0, // phase
                ykcolors[i], // color
                tf, // tf
                r   // tr
            );
            movingPoints[i] = s.createVector(sinusoids[i].vR.x, sinusoids[i].vR.y);
        }
        console.log(sinusoids);
    };

    s.setup = () => {
        // Create Canvas of given size 
        canvas = s.createCanvas(w, h);
        canvas.parent('sum-epi-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);
        s.initConditions();
    }


    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(fBuff, 0, 0);
        s.image(sBuff, 0, 7 * r);
        for (let i = 0; i < sumEpiK; i++) {
            sinusoids[i].draw();
            sinusoids[i].update();
            // Draw moving point(s)
            s.push();

            s.pop();
        }
    }
}

let sumEpiSketch = new p5(sumEpi, 'sum-epi-sketch');


const updateSumEpi = () => {
    sumEpiK = parseInt(document.getElementById('sumEpiSins').value);
    sumEpiOmega = parseInt(document.getElementById("sumEpiFreq").value);
    sumEpiSketch.remove();
    sumEpiSketch = new p5(sumEpi, 'sum-epi-sketch');
};    
