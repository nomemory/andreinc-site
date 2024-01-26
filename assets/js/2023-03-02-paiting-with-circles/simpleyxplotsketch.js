const simpleYxPlot = (s) => {

    addPaintGrid(s);
    addLineDashed(s);
    addShowFps(s);
    addArrow(s);

    const d = 150;
    const r = d / 2;
    const w = 900;
    const h = 600;
    const tf = theme.frequency
        ;

    let fBuff;  // the buffer where we plot the sum of the two sinusoids
    let vGf;    // the center of the grid for the sinusoids y1(x), ..., yk(x)
    let vCf;    // the center of all the circles from the functions grid

    let ykcolors = [
        "#00CED1", "#B22222",
        "#FF1493", "#2F4F4F",
        "#FFA500", "#F4A460",
    ]

    let sinusoids = [];
    let movingPointEpy;
    let lMp;

    let canvas;

    s.initConditions = () => {
        vCf = s.createVector(3 * r, 4 * r);
        vGf = s.createVector(6 * r, 4 * r);

        fBuff = s.createGraphics(w, 8 * r);
        s.paintGrid(fBuff, w, 8 * r, vGf, r, 1, {
            showUnits: true,
            hideUnitsXNeg: true,
            showOrigin: true
        });

        sinusoids[0] = new Sinusoid(s, vCf, s.createVector(vCf.x + r, vCf.y), 0, 1.4, 1, 1, ykcolors[0], tf, r);
        sinusoids[1] = new Sinusoid(s, sinusoids[0].vR, s.createVector(sinusoids[0].vR.x + r, sinusoids[0].vR.y), 0, 0.8, 2, 0, ykcolors[1], tf, r);
        sinusoids[2] = new Sinusoid(s, sinusoids[1].vR, s.createVector(sinusoids[1].vR.x + r, sinusoids[1].vR.y), 0, 0.5, 3, 0, ykcolors[2], tf, r);

        movingPointEpy = s.createVector(vGf.x, sinusoids[2].vR.y);
        lMp = s.createVector(vGf.x, sinusoids[2].vR.y);
    };

    s.setup = () => {
        // Create Canvas of given size 
        canvas = s.createCanvas(w, h);
        canvas.parent('simple-yx-plot-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);
        s.initConditions();
    }


    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(fBuff, 0, 0);
        // s.arrow(0, 0, 100, 100);
        for(let i = 0; i < sinusoids.length; i++) {
            if (i!==0) {
                sinusoids[i].update(sinusoids[i-1]);
            } else {
                sinusoids[i].update();
            }
            sinusoids[i].draw();
            // Drawing vectors
            s.push();
            s.fill(sinusoids[i].color);
            s.stroke(sinusoids[i].color);
            s.arrow(sinusoids[i].vC.x, sinusoids[i].vC.y, sinusoids[i].vR.x, sinusoids[i].vR.y);
            s.pop();
            // Drawing vectors labels
            s.push();
            s.fill(sinusoids[i].color);
            s.text("u"+(i+1), sinusoids[i].vC.x - (sinusoids[i].vC.x - sinusoids[i].vR.x)/2, sinusoids[i].vC.y - (sinusoids[i].vC.y - sinusoids[i].vR.y)/2);
            s.pop();
            // Drawing vector projections as the moving point advances
            s.push()
            s.stroke(sinusoids[i].color);
            s.strokeWeight(2);
            s.line(movingPointEpy.x+2*i+1, sinusoids[i].vR.y, movingPointEpy.x+2*i+1, sinusoids[i].vC.y);
            s.pop();
        }
        // Drawing the sum vector
        s.push();
        s.stroke(theme.radiusColor);
        s.fill(theme.radiusColor);
        s.arrow(sinusoids[0].vC.x, sinusoids[0].vC.y, sinusoids[2].vR.x, sinusoids[2].vR.y);
        s.pop();
        s.push();
        s.fill(theme.radiusColor);
        s.text("u", sinusoids[0].vC.x - (sinusoids[0].vC.x - sinusoids[2].vR.x)/2, sinusoids[0].vC.y - (sinusoids[0].vC.y - sinusoids[2].vR.y)/2  );
        s.pop();

        // Drawing a moving point / circle
        s.push();
        s.fill(theme.radiusColor);
        s.circle(movingPointEpy.x, movingPointEpy.y, 3);
        lMp.x = movingPointEpy.x;
        lMp.y = movingPointEpy.y;
        movingPointEpy.x += sinusoids[2].tf * r;
        movingPointEpy.y = sinusoids[2].vR.y;
        fBuff.line(movingPointEpy.x, movingPointEpy.y, lMp.x, lMp.y);
        s.pop();

        // Connect the moving point with the suming vector
        // through a dotted-line
        s.push();
        s.stroke(theme.radiusColorLight);
        s.lineDash(canvas, [3, 3], sinusoids[2].vR.x, sinusoids[2].vR.y, movingPointEpy.x, movingPointEpy.y);
        s.pop();

        // Drawing horizontal lines through the center of each epicycle
        s.push();
        for(let i = 0; i < 3; i++) {
            s.stroke(sinusoids[i].color);
            s.lineDash(canvas, [3,3], 0, sinusoids[i].vC.y, fBuff.width, sinusoids[i].vC.y);
        }
        s.pop();

        // Draw text 
        s.push();
        s.text("u = ", r+5, 7*r - 5);
        s.fill(sinusoids[0].color);
        s.text("u1",r+35, 7*r - 5);
        s.fill(theme.textColor);;
        s.text("+", r+50, 7*r - 5);
        s.fill(sinusoids[1].color);
        s.text("u2",r+60, 7*r - 5);
        s.fill(theme.textColor);;
        s.text("+", r+75, 7*r - 5);
        s.fill(sinusoids[2].color);
        s.text("u3",r+85, 7*r - 5);
        s.pop();

        if (movingPointEpy.x > fBuff.width) {
            s.initConditions();
        }

        //Drawing the moving point
        fBuff.push();
        fBuff.stroke(theme.radiusColorLight);
        fBuff.point(sinusoids[2].vR.x, sinusoids[2].vR.y);
        fBuff.pop();
    }
};

let simpleYxPlotSketch = new p5(simpleYxPlot, 'simple-yx-plot-sketch');