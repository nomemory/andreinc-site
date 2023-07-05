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
    let vCf;   // the center of all the circles from the functions grid

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

    let vRk = [];
    let vMk = [];
    let vUoids = [];

    let canvas;

    s.ykx = (k, x) => {
        return (4 / s.PI / (2 * k - 1)) * s.sin((2 * k - 1) * x * sumEpiOmega) * r;
    }

    s.ykxwph = (k, x) => {
        return (4 / s.PI / (2 * k - 1)) * s.sin((2 * k - 1) * x * sumEpiOmega + tph) * r;
    }

    s.ykxCos = (k, x) => {
        return (4 / s.PI / (2 * k - 1)) * s.cos((2 * k - 1) * x * sumEpiOmega) * r;
    }

    s.ykxwphCos = (k, x) => {
        return (4 / s.PI / (2 * k - 1)) * s.cos((2 * k - 1) * x * sumEpiOmega + tph) * r;
    }

    s.yx = (x) => {
        let result = 0;
        for (let i = 1; i < sumEpiK + 1; i++) {
            result += s.ykx(i, x);
        }
        return result;
    }
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

        // Ading circles to fBuff
        fBuff.push();
        fBuff.circle(vCf.x, vCf.y, 3);
        fBuff.pop();
        for (let i = 1; i < sumEpiK + 1; i++) {
            fBuff.push();
            fBuff.noFill();
            fBuff.stroke(ykcolors[i - 1]);
            fBuff.circle(vCf.x, vCf.y, (4 / s.HALF_PI / (2 * i - 1)) * r);
            fBuff.pop();
        }

        angl = 0;

        // Allocate memory for all the moving radiuses
        // for the yk(x) functions and their corresponding moving
        // points
        for (let i = 1; i < sumEpiK + 1; i++) {
            vRk[i - 1] = s.createVector(
                vCf.x + s.ykx(i, angl),
                vCf.y + s.ykxCos(i, angl)
            );
            vMk[i - 1] = s.createVector(
                vGf.x,
                vGf.y - s.ykx(i, 0)
            );
        }
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

        // Paint and update the moving parts
        for (let i = 1; i < sumEpiK + 1; i++) {
            // moving radius
            s.push();
            s.stroke(theme.radiusColorLight);
            s.line(vCf.x, vCf.y, vRk[i - 1].x, vRk[i - 1].y);
            s.pop();
            // plotting the function
            fBuff.push();
            fBuff.stroke(ykcolors[i - 1]);
            fBuff.point(vMk[i - 1].x, vMk[i - 1].y);
            fBuff.pop();
            vRk[i - 1].x = vCf.x + s.ykxwph(i, angl);
            vRk[i - 1].y = vCf.y + s.ykxwphCos(i, angl);
            vMk[i - 1].x += tf * r;
            vMk[i - 1].y = vCf.y - s.ykx(i, angl);
            // moving point
            s.push();
            s.fill(ykcolors[i - 1]);
            s.stroke(ykcolors[i - 1]);
            s.circle(vMk[i - 1].x, vMk[i - 1].y, 3);
            s.pop();
            // connecting the moving point
            s.push();
            s.stroke(theme.radiusColorLight);
            s.lineDash(canvas, [3, 3], vRk[i - 1].x, vRk[i - 1].y, vMk[i - 1].x, vMk[i - 1].y);
            s.pop();
        }
        if (vMk[0].x > w) {
            s.initConditions();
        }
        angl += tf;

        // console.log(s.frameRate());
    }
}

let sumEpiSketch = new p5(sumEpi, 'sum-epi-sketch');


const updateSumEpi = () => {
    sumEpiK = parseInt(document.getElementById('sumEpiSins').value);
    sumEpiOmega = parseInt(document.getElementById("sumEpiFreq").value);
    sumEpiSketch.remove();
    sumEpiSketch = new p5(sumEpi, 'sum-epi-sketch');
};    
