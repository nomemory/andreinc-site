const someEpis = (s) => {

    addPaintGrid(s);
    addLineDashed(s);
    addShowFps(s);
    addArrow(s);

    const d = 100;
    const r = d / 2;
    const w = 800;
    const h = 700;
    const tf = theme.frequency / 10;

    let buff1, buff2, buff3, buff4;
    let vC1, vC2, vC3, vC4;

    let ykcolors = [
        "#00CED1", "#B22222",
        "#FF1493", "#2F4F4F",
        "#FFA500", "#F4A460",
    ]

    let sinusoids1 = [];
    let sinusoids2 = [];
    let sinusoids3 = [];
    let sinusoids4 = [];

    let canvas;

    s.initConditions = () => {
        vC1 = s.createVector(3 * r, 3 * r);
        vC2 = s.createVector(3 * r, 3 * r);
        vC3 = s.createVector(3 * r, 3 * r);
        vC4 = s.createVector(3 * r, 3 * r);

        buff1 = s.createGraphics(6 * r, 6 * r);
        buff2 = s.createGraphics(6 * r, 6 * r);
        buff3 = s.createGraphics(6 * r, 6 * r);
        buff4 = s.createGraphics(6 * r, 6 * r);

        s.paintGrid(buff1, 6 * r, 6 * r, vC1, r, 1, {
            showUnits: false,
            showOrigin: true
        });
        s.paintGrid(buff2, 6 * r, 6 * r, vC2, r, 1, {
            showUnits: false,
            showOrigin: true
        });
        s.paintGrid(buff3, 6 * r, 6 * r, vC3, r, 1, {
            showUnits: false,
            showOrigin: true
        });
        s.paintGrid(buff4, 6 * r, 6 * r, vC4, r, 1, {
            showUnits: false,
            showOrigin: true
        });

        sinusoids1[0] = new Sinusoid(s, vC1, s.createVector(vC1.x + r, vC1.y), 0, 1.4, 1, 1, theme.radiusColorLight, tf, r);
        sinusoids1[1] = new Sinusoid(s, sinusoids1[0].vR, s.createVector(sinusoids1[0].vR.x + r, sinusoids1[0].vR.y), 0, 0.8, 2, 0, theme.radiusColorLight, tf, r);
        sinusoids1[2] = new Sinusoid(s, sinusoids1[1].vR, s.createVector(sinusoids1[1].vR.x + r, sinusoids1[1].vR.y), 0, 0.5, 3, 0, theme.radiusColorLight, tf, r);

        sinusoids2[0] = new Sinusoid(s, s.createVector(vC2.x + 7 *r, vC2.y), s.createVector(vC2.x + r + 7 * r, vC2.y), 0, 1.3, 2, 1, theme.radiusColorLight, tf, r);
        sinusoids2[1] = new Sinusoid(s, sinusoids2[0].vR, s.createVector(sinusoids2[0].vR.x + r + 7 * r, sinusoids2[0].vR.y), 0, 0.8, 3, 0, theme.radiusColorLight, tf, r);
        sinusoids2[2] = new Sinusoid(s, sinusoids2[1].vR, s.createVector(sinusoids2[1].vR.x + r + 7 * r, sinusoids2[1].vR.y), 0, 0.5, 4, 0, theme.radiusColorLight, tf, r);
        sinusoids2[3] = new Sinusoid(s, sinusoids2[2].vR, s.createVector(sinusoids2[2].vR.x + r + 7 * r, sinusoids2[2].vR.y), 0, 0.3, 8, 0, theme.radiusColorLight, tf, r);
        sinusoids2[4] = new Sinusoid(s, sinusoids2[3].vR, s.createVector(sinusoids2[3].vR.x + r + 7 * r, sinusoids2[3].vR.y), 0, 0.2, 12, 0, theme.radiusColorLight, tf, r);

        sinusoids3[0] = new Sinusoid(s, s.createVector(vC3.x, vC2.y + 7 * r), s.createVector(vC3.x + r, vC3.y + 7 * r), 0, 1.5, 1, 1, theme.radiusColorLight, tf, r);
        sinusoids3[1] = new Sinusoid(s, sinusoids3[0].vR, s.createVector(sinusoids3[0].vR.x + r, sinusoids3[0].vR.y + 7 * r), 0, 0.8, 3, 0, theme.radiusColorLight, tf, r);
        sinusoids3[2] = new Sinusoid(s, sinusoids3[1].vR, s.createVector(sinusoids3[1].vR.x + r, sinusoids3[1].vR.y + 7 * r), 0, 0.5, 5, 3, theme.radiusColorLight, tf, r);
        sinusoids3[3] = new Sinusoid(s, sinusoids3[2].vR, s.createVector(sinusoids3[2].vR.x + r, sinusoids3[2].vR.y + 7 * r), 0, 0.2, 8, 5, theme.radiusColorLight, tf, r);
        sinusoids3[4] = new Sinusoid(s, sinusoids3[3].vR, s.createVector(sinusoids3[3].vR.x + r, sinusoids3[3].vR.y + + 7 * r), 0, 0.1, 14, 10, theme.radiusColorLight, tf, r);

        sinusoids4[0] = new Sinusoid(s, s.createVector(vC4.x + 7 * r, vC4.y + 7 * r), s.createVector(vC4.x + r + 7 * r, vC4.y + 7 * r), 0, 2, 1, 1, theme.radiusColorLight, tf, r);
        sinusoids4[1] = new Sinusoid(s, sinusoids4[0].vR, s.createVector(sinusoids4[0].vR.x + r + 7 * r, sinusoids4[0].vR.y + 7 * r), 0, 0.8, 2, 0, theme.radiusColorLight, tf, r);
        sinusoids4[2] = new Sinusoid(s, sinusoids4[1].vR, s.createVector(sinusoids4[1].vR.x + r + 7 * r, sinusoids4[1].vR.y + 7 * r), 0, 0.5, 2, 3, theme.radiusColorLight, tf, r);
    };

    s.setup = () => {
        // Create Canvas of given size 
        canvas = s.createCanvas(w, h);
        canvas.parent('some-epis-sketch');
        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);
        s.initConditions();
    }


    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(buff1, 0, 0);
        s.image(buff2, 7 * r, 0);
        s.image(buff3, 0, 7 * r);
        s.image(buff4, 7 * r, 7 * r);

        for(let i = 0; i < sinusoids1.length; i++) {
            if (i!==0) {
                sinusoids1[i].update(sinusoids1[i-1]);
            } else {
                sinusoids1[i].update();
            }
            sinusoids1[i].draw();
            buff1.push();
            buff1.point(sinusoids1[2].vR.x, sinusoids1[2].vR.y);
            buff1.pop();
        }

        for(let i = 0; i < sinusoids2.length; i++) {
            if (i!==0) {
                sinusoids2[i].update(sinusoids2[i-1]);
            } else {
                sinusoids2[i].update();
            }
            sinusoids2[i].draw();
            buff2.push();
            buff2.point(sinusoids2[sinusoids2.length-1].vR.x - 7 * r, sinusoids2[sinusoids2.length-1].vR.y);
            buff2.pop();
        }

        for(let i = 0; i < sinusoids3.length; i++) {
            if (i!==0) {
                sinusoids3[i].update(sinusoids3[i-1]);
            } else {
                sinusoids3[i].update();
            }
            sinusoids3[i].draw();
            buff3.push();
            buff3.point(sinusoids3[sinusoids3.length-1].vR.x, sinusoids3[sinusoids3.length-1].vR.y - 7 * r);
            buff3.pop();
        }

        for(let i = 0; i < sinusoids4.length; i++) {
            if (i!==0) {
                sinusoids4[i].update(sinusoids4[i-1]);
            } else {
                sinusoids4[i].update();
            }
            sinusoids4[i].draw();
            buff4.push();
            buff4.point(sinusoids4[sinusoids4.length-1].vR.x - 7 * r, sinusoids4[sinusoids4.length-1].vR.y - 7 * r);
            buff4.pop();
        }

        // console.log(s.frameRate());
    }
};

let someEpisSketch = new p5(someEpis, 'some-epis-sketch');