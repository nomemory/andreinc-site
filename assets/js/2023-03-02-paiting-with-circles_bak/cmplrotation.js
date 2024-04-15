const complRotation = (s) => {

    addPaintGrid(s);
    addShowFps(s);
    addLineDashed(s);
    addArrow(s);

    const d = 200;
    const r = d / 2;
    const f = theme.frequency;
    let vC, buff;

    const ic = new Complex(0, 1);

    let fqz = [
        {n: new Complex(s.cos(0.2)*r, s.sin(0.2)*r), label: "z1", color: s.color('red')},
        {n: new Complex(s.cos(s.PI/6)*r, s.sin(s.PI/6)*r), label: "z2", color: s.color('teal')},
        {n: new Complex(s.cos(s.PI/4)*r, s.sin(s.PI/4)*r), label: "z3", color: s.color('yellowgreen')},
        {n: new Complex(s.cos(s.PI/3)*r, s.sin(s.PI/3)*r), label: "z4", color: s.color('lightblue')},
        {n: new Complex(s.cos(s.PI/2-0.2)*r, s.sin(s.PI/2-0.2)*r), label: "z5", color: s.color('lightsalmon')}
    ];

    s.setup = () => {
        // Create Canvas of given size 
        const canvas = s.createCanvas(theme.canvasX, theme.canvasY);
        canvas.parent('cmpl-rotation-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);

        // Initialise
        vC = s.createVector(s.width / 2, s.height / 2);
        buff = s.createGraphics(s.width, s.width);
        s.paintGrid(buff, s.width, s.height, vC, r/5, 5, 
            {
                showUnits: true,
                showOrigin: true,
                showX: true,
                yLabel: "Im",
                xLabel: "Re",
                complexSystem: true
            });
        buff.circle(vC.x, vC.y, d);
        for(let i = 0, nc; i < fqz.length; ++i) {
            // First quadrant
            let zx1 = vC.x + fqz[i].n.re;
            let zy1 = vC.y - fqz[i].n.im;

            buff.push();
            buff.fill(fqz[i].color);
            buff.stroke(fqz[i].color);
            buff.circle(zx1, zy1, 7);
            buff.pop();
            
            s.push();
            s.stroke(fqz[i].color);
            s.lineDash(canvas, [3,3], vC.x, vC.y, zx1, zy1);
            s.pop();

            buff.push();
            buff.fill(fqz[i].color);
            buff.text(fqz[i].label, zx1 + 5, zy1);
            buff.pop();

            // Second quadrant
            nc = fqz[i].n.prd(ic);
            let zx2 = vC.x + nc.re;
            let zy2 = vC.y - nc.im;
            buff.push();
            buff.push();
            buff.fill(fqz[i].color);
            buff.stroke(fqz[i].color);
            buff.circle(zx2, zy2, 7);
            s.push();
            s.stroke(fqz[i].color);
            s.lineDash(canvas, [3,3], vC.x, vC.y, zx2, zy2);
            s.pop();
            buff.pop();
            buff.push();
            buff.fill(fqz[i].color);
            buff.text(fqz[i].label+"*i", zx2-35, zy2-3);
            buff.pop();
            // Third quadrant
            nc = fqz[i].n.prd(ic).prd(ic);
            let zx3 = vC.x + nc.re;
            let zy3 = vC.y - nc.im;
            buff.push();
            buff.push();
            buff.fill(fqz[i].color);
            buff.stroke(fqz[i].color);
            buff.circle(zx3, zy3, 7);
            s.push();
            s.stroke(fqz[i].color);
            s.lineDash(canvas, [3,3], vC.x, vC.y, zx3, zy3);
            s.pop();
            buff.pop();
            buff.push();
            buff.fill(fqz[i].color);
            buff.text(fqz[i].label+"*i*i", zx3-45, zy3+15);
            buff.pop();
            // Fourth quadrant
            nc = fqz[i].n.prd(ic).prd(ic).prd(ic);
            let zx4 = vC.x + nc.re;
            let zy4 = vC.y - nc.im;
            buff.push();
            buff.push();
            buff.fill(fqz[i].color);
            buff.stroke(fqz[i].color);
            buff.circle(zx4, zy4, 7);
            s.push();
            s.stroke(fqz[i].color);
            s.lineDash(canvas, [3,3], vC.x, vC.y, zx4, zy4);
            s.pop();
            buff.pop();
            buff.push();
            buff.fill(fqz[i].color);
            buff.text(fqz[i].label+"*i*i*i", zx4+8, zy4+15);
            buff.pop();
            if (i==0) {
                // Adding arrows
                s.pop();
                s.noFill();
                s.stroke(theme.sineColor);
                s.bezier(zx1, zy1, zx1+100, zy1-100, zx2+100, zy2-100, zx2, zy2);
                s.bezier(zx2, zy2, zx2-100, zy2-100, zx3-100, zy3-100, zx3, zy3);
                s.bezier(zx3, zy3, zx3-100, zy3+100, zx4-100, zy4+100, zx4, zy4);
                s.bezier(zx4, zy4, zx4+100, zy4+100, zx1+100, zy1+100, zx1, zy1);
                s.push();
            }
        }
        s.image(buff,0,0);
    };
};

let complRotationSketch =
    new p5(complRotation, 'cmpl-rotation-sketch');

