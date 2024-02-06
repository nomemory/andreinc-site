const tightFourierAvg = (s) => {
    addShowFps(s);
    addPaintGrid(s);
    addLineDashed(s);
    addArrow(s);
    addPauseLoop(s);

    const d = 160;
    const r = d / 2;
    const w = 800;
    const h = 500;
    const L = r;
    const step = r;

    let vG, vC;
    let buff, buff2;

    let cs = [];
    let angl = 0;

    s.setup = () => {
        const canvas = s.createCanvas(w, h);
        canvas.parent('tight-fourier-avg-sketch');
        s.textFont(theme.textFont);
        s.textSize(theme.textSize);
        s.frameRate(theme.frameRate);
        vG = s.createVector(w / 2, h / 2);
        vC = s.createVector(0, h / 2);
        cs[0] = {
            vC: s.createVector(vG.x - 4 * r, vG.y),
            F: s.PI,
            A: 4 / s.PI * r
        };
        for (let i = 1; i < 5; i++) {
            cs[i] = {
                vC: s.createVector(cs[i - 1].vC.x + r / 2, cs[i - 1].vC.y - cs[i - 1].A),
                F: s.PI * (2 * (i + 1) - 1),
                A: 4 / s.PI / (2 * (i + 1) - 1) * r
            }
        }

        buff = s.createGraphics(w / 2, h);
        buff.textFont(theme.textFont);
        buff.textSize(theme.textSize);
        buff2 = s.createGraphics(w / 2, h);
        buff2.textFont(theme.textFont);
        buff2.textSize(theme.textSize);

        s.paintGrid(buff, w, h, vC, r, 1, {
            showOrigin: true,
            showUnits: true,
            showX: true,
            showY: true,
        });

        buff.push();
        buff.fill(theme.cosineColor);
        buff.stroke(theme.cosineColor);
        buff.strokeWeight(2);
        buff.line(vC.x, vC.y - step, vC.x + L, vC.y - step);
        buff.line(vC.x + step, vC.y + step, vC.x + 2 * L, vC.y + step);
        buff.pop();

        // Draw sinusoids
        buff.push();
        buff.stroke(theme.sineColor);
        buff.beginShape(s.LINES);
        let prev = s.sqf(0);
        for (let i = 0; i <= 2.01; i += 0.01) {
            let next = s.sqf(i);
            buff.vertex(vC.x + i * L, vC.y - prev);
            buff.vertex(vC.x + i * L, vC.y - next);
            prev = next;
        }
        buff.endShape();
        buff.pop();


        // Draw some labels
        buff.push();
        buff.fill(theme.cosineColor);
        buff.text("f(x)", vC.x + L + 5, vC.y - step - 5);
        buff.fill(theme.sineColor);
        buff.text("∑sᵢ(x)", vC.x + 2 * L + 5, vC.y - 5);
        buff.pop();

        // draw the rectangle surrounding si(x)
        buff2.push();
        buff2.fill(theme.lightGreen);
        buff2.rect(r - r / 2, vG.y - 1.5 * step, 2 * step + r + 10, 3 * L + 30);
        buff2.pop();

        // draw the text
        buff2.push();
        buff2.text(" The first 5 terms of s(x) in time", r - r / 2, vG.y + 1.5 * step + 20);
        buff2.pop();

        // labeling each arrow
        buff2.push();
        for (let i = 0; i < cs.length; i++) {
            buff2.text("s" + (i + 1), cs[i].vC.x - 10, cs[0].vC.y - step * 1.3);
        }
        buff2.pop();

        buff2.push();
        buff2.fill(theme.sineColor);
        buff2.stroke(theme.sineColor);
        buff2.circle(r - r / 2, vG.y + 1.5 * step + 50, 5);
        buff2.fill(theme.cosineColor);
        buff2.stroke(theme.cosineColor);
        buff2.circle(r - r / 2, vG.y + 1.5 * step + 85, 5);
        buff2.pop();

        buff2.push();
        buff2.text(" The sum of the first 5 terms of s(x) in time", r - r / 2 + 10, vG.y + 1.5 * step + 55);
        buff2.pop();

        buff2.push();
        buff2.text(" The square function", r - r / 2 + 10, vG.y + 1.5 * step + 90);
        buff2.pop();
    }

    s.sqf = (x) => {
        let sum = 0;
        for (let i = 0; i < cs.length; i++) {
            sum += cs[i].A * s.sin(cs[i].F * x);
        }
        return sum;
    }

    s.drawCircles = () => {

        s.push();
        s.noFill();
        // update centers
        let ly = 0;
        for (let i = 0; i < cs.length; i++) {
            if (i > 0) {
                cs[i].vC.y = cs[i - 1].vC.y - cs[i - 1].A * s.sin(cs[i - 1].F * angl);
                s.push();
                s.stroke(theme.radiusColorLight);
                s.line(cs[i].vC.x, cs[i].vC.y, cs[i - 1].vC.x, cs[i].vC.y);
                s.pop();
            }
            s.fill(theme.textColor);
            s.circle(cs[i].vC.x, cs[i].vC.y, 3);
            let df = cs[i].A * s.sin(cs[i].F * angl)
            ly += df;
            s.arrowCt(cs[i].vC.x, cs[i].vC.y, cs[i].vC.x, cs[i].vC.y - df, 5);
        }
        s.push();
        s.fill(theme.sineColor);
        s.stroke(theme.sineColor);
        s.circle(vG.x - r, vG.y - ly, 5);
        s.circle(vG.x + angl * step, vG.y - ly, 5);
        s.fill(theme.cosineColor);
        s.stroke(theme.cosineColor);
        let yOff = (angl * step) > L ? -step : step;
        s.circle(vG.x + angl * step, vG.y - yOff, 5);
        s.circle(vG.x - 4 / 5 * step, vG.y - yOff, 5);
        s.pop();
        s.pop();
    }

    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(buff, w / 2, 0);
        s.image(buff2, 0, 0);
        s.drawCircles();
        angl += 0.01;
        if (angl > 2) angl = 0;
        s.showFps();
    }
}

let tightFourierAvgSketch =
    new p5(tightFourierAvg, 'tight-fourier-avg-sketch');