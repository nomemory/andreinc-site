let sumEpiK = 3;
let sumEpiOmega = 1;

const sumEpi = (s) => {

    addPaintGrid(s);
    addLineDashed(s);
    addShowFps(s);
    addArrow(s);

    const d = 100;
    const r = d / 2;
    const w = 800;
    const h = 700;
    const tf = theme.frequency;

    let fBuff;  // the buffer where we plot the two sinusoids
    let sBuff;  // the buffer where we plot the sum of the two sinusoids
    let vGf;    // the center of the grid for the sinusoids y1(x), ..., yk(x)
    let vCf;    // the center of all the circles from the functions grid
    let vCs;    // the center for grid for the sum
    let vGs;    // the sum of the grid for the sum of the two sinusoids

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
    let sinusoidEpy = [];
    let movingPoints = [];
    let movingPointEpy;
    let sinLp = [];
    let sinEpyLp;

    let canvas;

    s.initConditions = () => {
        vGf = s.createVector(6 * r, 3 * r);
        vGs = s.createVector(6 * r, 10 * r);
        vCf = s.createVector(3 * r, 3 * r);
        vCs = s.createVector(3 * r, 10 * r);

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
            movingPoints[i] = s.createVector(vGf.x, sinusoids[i].vR.y);
            if (i === 0) {
                sinusoidEpy[i] = new Sinusoid(
                    s, //s
                    vCs, //the center of the center of the sinusoid
                    s.createVector(vCs.x + r, vCs.y), // the current point of the moving radius
                    0, // initial angle
                    4/(s.PI*(2*(i+1)-1)), // ampl
                    (2*(i+1)-1)*sumEpiOmega, // freq
                    0, // phase
                    ykcolors[i], // color
                    tf, // tf
                    r   // tr
                );
            } else {
                sinusoidEpy[i] = new Sinusoid(
                        s, 
                        sinusoidEpy[i-1].vR, 
                        s.createVector(sinusoidEpy[i-1].vR.x + sinusoidEpy[i-1].ampl, sinusoidEpy[i-1].vR.y), 
                        0, 
                        4/(s.PI*(2*(i+1)-1)), 
                        (2*(i+1)-1)*sumEpiOmega,
                        0, 
                        ykcolors[i],
                        tf, 
                        r
                    );  
            }                 
        }
        movingPointEpy = s.createVector(vGs.x, vGs.y);

        // Adding text to the two buffers 
        fBuff.push();
        fBuff.fill(theme.textColor);
        fBuff.text("Concentric circles associated", r, fBuff.height-30);
        fBuff.text("with each of the sinusoids yk(x)", r, fBuff.height - 15);
        fBuff.text("Individual sinusoids: y1(x), y2(x), ... , yk(x), side-by-side", vGf.x + r + 5, fBuff.height-30);
        fBuff.pop();
        sBuff.push();
        sBuff.fill(theme.textColor);
        sBuff.text("The epycicles corresponding to", r, sBuff.height-30);
        sBuff.text("to the actual sum of the sinusoids", r, sBuff.height-15);
        sBuff.text("The sum of sinusoids y(x) =  y1(x) + y2(x) +  ... + yk(x) + ...", vGs.x + r + 5, sBuff.height-30);
        sBuff.pop();

        // Last point for sinusoids
        for (let i = 0; i < sumEpiK; i++) {
            sinLp[i] = s.createVector(vGf.x, vGf.y);
        }
        sinEpyLp = s.createVector(vGs.x, vGs.y);
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
        // Individual functions y1(x), y2(x), y3(x)... and so on
        for (let i = 0; i < sumEpiK; i++) {
            sinusoids[i].draw();
            sinusoids[i].update();
            // Draw moving point(s)
            fBuff.push();
            fBuff.stroke(sinusoids[i].color);
            fBuff.line(movingPoints[i].x, movingPoints[i].y, sinLp[i].x, sinLp[i].y);
            sinLp[i].x = movingPoints[i].x;
            sinLp[i].y = movingPoints[i].y;
            fBuff.pop();
            // Draw moving circle on s
            s.push();
            s.stroke(sinusoids[i].color);
            s.circle(movingPoints[i].x, movingPoints[i].y, 3);
            s.pop();
            // Connect line with from vR to movingPoints[i]
            s.push();
            s.stroke(theme.radiusColorLight);
            s.lineDash(canvas, [3, 3], sinusoids[i].vR.x, sinusoids[i].vR.y, movingPoints[i].x, movingPoints[i].y);
            s.pop();
            // Increment moving points
            movingPoints[i].x += sinusoids[i].tf * r;
            movingPoints[i].y = sinusoids[i].vR.y;
        }
        // The sum of functions y(x) = y1(x), y2(x), y3(x) ... and so on
        for (let i = 0; i < sumEpiK; i++) {
            if (i!=0) {
                sinusoidEpy[i].update(sinusoidEpy[i-1]);
            } else {
                sinusoidEpy[i].update();
            }
            sinusoidEpy[i].draw();
            if (i==sumEpiK-1) {
                // Draw moving points
                sBuff.push();
                sBuff.stroke(theme.radiusColor);
                // sBuff.point(movingPointEpy.x, movingPointEpy.y - 7*r);
                sBuff.line(movingPointEpy.x, movingPointEpy.y - 7 * r, sinEpyLp.x, sinEpyLp.y - 7 * r);
                sinEpyLp.x = movingPointEpy.x;
                sinEpyLp.y = movingPointEpy.y;
                sBuff.pop();
                // Draw a moving circle on s
                s.push();
                s.circle(movingPointEpy.x, movingPointEpy.y, 3);
                s.pop();
                // Connect a tine with the moving point
                s.push();
                s.stroke(theme.radiusColorLight);
                s.lineDash(canvas, [3, 3], sinusoidEpy[i].vR.x, sinusoidEpy[i].vR.y, movingPointEpy.x, movingPointEpy.y);
                s.pop();
                // Increment moving point
                movingPointEpy.x += sinusoidEpy[i].tf * r;
                movingPointEpy.y = sinusoidEpy[i].vR.y;
            }
            s.push();
            sBuff.stroke(theme.radiusColorLight);
            sBuff.point(sinusoidEpy[sumEpiK-1].vR.x, sinusoidEpy[sumEpiK-1].vR.y - 7*r);
            s.pop();
        }
        // Reset the sketch once the moving point(s) are exiting the canvas
        if (movingPoints[0].x > s.width) {
            s.initConditions();
        }
    }
};

let sumEpiSketch = new p5(sumEpi, 'sum-epi-sketch');


const updateSumEpi = () => {
    sumEpiK = parseInt(document.getElementById('sumEpiSins').value);
    sumEpiOmega = parseInt(document.getElementById("sumEpiFreq").value);
    sumEpiSketch.remove();
    sumEpiSketch = new p5(sumEpi, 'sum-epi-sketch');
};    
