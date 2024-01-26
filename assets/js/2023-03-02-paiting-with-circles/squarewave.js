let squareWaveK = 7;
let squareWaveOmega = 1;

const squareWave = (s) => {

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

    s.ykx = (k,x) => {
        return (4/s.PI/(2*k-1)) * s.sin((2*k-1)*x*squareWaveOmega) * r;
    }
    
    s.yx = (x) => {
        let result = 0;
        for(let i = 1; i < squareWaveK+1; i++) {
            result += s.ykx(i, x);
        }   
        return result;
    }
    s.initConditions = () => {
        vGf = s.createVector(2*r, 3*r);
        vGs = s.createVector(2*r, 10*r);
        fBuff = s.createGraphics(w, 6*r);
        s.paintGrid(fBuff, w, 6*r, vGf, r, 1, {
            showUnits: true,
            hideUnitsXNeg: true,
            showOrigin: true
        });
        sBuff = s.createGraphics(w, 6*r);
        s.paintGrid(sBuff, w, 6*r, vGf, r, 1, {
            showUnits: true,
            hideUnitsXNeg: true,
            showOrigin: true
        });
        // Paiting y1f and y2f on the 'fBuff'
        for(let cAngl = 0, px = vGf.x; px < w; px+=tf*r, cAngl+=tf) {
            for(let i = 1; i < squareWaveK+1; i++) {
                fBuff.push();
                fBuff.stroke(ykcolors[(i-1)%ykcolors.length]);
                fBuff.point(px, vGf.y - s.ykx(i, cAngl));
                fBuff.pop();
            }
        }

        // Painting yf on the sBuff
        let lx = vGf.x;
        let ly = vGf.y - s.yx(0);
        for(let cAngl = 0, px = vGf.x; px < w; px+=tf*r, cAngl+=tf) {
            sBuff.push();
            sBuff.line(px, vGf.y - s.yx(cAngl), lx, ly);
            lx = px;
            ly = vGf.y - s.yx(cAngl);   
            sBuff.pop();
        }
        // Adding the labels to fBuff
        fBuff.push();
        fBuff.textFont(theme.textFont);
        let roff=-15;
        for(let i = 1; i < squareWaveK+1; i++) {
            fBuff.fill(ykcolors[i-1]);
            fBuff.text("y"+i+"(x)", 10, i*15);
        }
        fBuff.pop();
    };

    s.setup = () => {
        // Create Canvas of given size 
        canvas = s.createCanvas(w, h);
        canvas.parent('square-wave-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);
        s.initConditions();
        s.noLoop();
    }


    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(fBuff, 0, 0);
        s.image(sBuff, 0, 7*r);
    }
}

let squareWaveSketch = new p5(squareWave, 'square-wave-sketch');

const updateSins = () => {
    squareWaveK = parseInt(document.getElementById('numSins').value);
    squareWaveOmega = parseInt(document.getElementById("sinsFreq").value);
    squareWaveSketch.remove();
    squareWaveSketch = new p5(squareWave, 'square-wave-sketch');
};    
