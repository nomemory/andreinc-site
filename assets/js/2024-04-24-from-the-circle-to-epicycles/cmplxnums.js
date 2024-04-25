const cmplxNums = (s) => {

    addShowFps(s);
    addPaintGrid(s);
    addLineDashed(s);

    const e = 2.718281828459;

    const d = 100;
    const r = d / 2;
    const w = 800;
    const h = 400;

    let canvas;

    let nums = [
        { 
            n: new Complex(5, s.PI),
            text: "5+πi"
        },
        {
            n: new Complex(2.3, 1.5),
            text: "2.3+1.5i"
        },
        {
            n: new Complex(-2*e, 2),
            text: "-2e+2i"
        },
        {
            n: new Complex(s.sqrt(3), -3),
            text: "√3-3i"
        },
        {
            n: new Complex(-10/3, -2.8),
            text: "-3.33-2.8i"
        }
    ];

    let vG;
    let buff;

    s.setup = () => {
        // Create Canvas of given size 
        canvas = s.createCanvas(w, h);
        canvas.parent('cmplxnums-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);
        vG = s.createVector(w/2, h/2);
        buff = s.createGraphics(w, h);
        s.paintGrid(buff, w, h, vG, r, 1, {
            showUnits: true,
            showOrigin: true,
            showX: true,
            yLabel: "Im",
            xLabel: "Re",
            complexSystem: true
        });

        for(let i = 0; i < nums.length; ++i) {
            buff.push();
            buff.fill(theme.thetaColor);
            buff.stroke(theme.thetaColor);
            let cx = vG.x + nums[i].n.re*r;
            let cy = vG.y - nums[i].n.im*r;
            buff.circle(cx, cy, 3);
            s.lineDash(canvas, [3,3], cx, cy, vG.x, cy);
            s.lineDash(canvas, [3,3], cx, cy, cx, vG.y);
            buff.text(nums[i].text, cx + 5, cy-5);
            buff.pop();
        }

        s.image(buff, 0, 0);
    }
}

let cmplxNumsSketch =
    new p5(cmplxNums, 'cmplxnums-sketch');