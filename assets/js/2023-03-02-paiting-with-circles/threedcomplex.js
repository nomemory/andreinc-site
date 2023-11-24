
const threeDComplex = (s) => {

    const r = 60;
    let vC, vR, mP;
    let angl;
    let reset;
    let f;
    let cfont;

    let points = [];

    s.preload = () => {
        cfont = s.loadFont('/assets/js/2023-03-02-paiting-with-circles/consola-mono.ttf');
    }

    s.setup = () => {
        s.createCanvas(800, 500, s.WEBGL);
        s.frameRate(30);
        s.textFont(cfont);
        f = 0.03;
        angl = s.PI / 2;
        vC = s.createVector(0, 0);
        vR = s.createVector(0, 0);
        mP = s.createVector(0, 0, 0);
    };

    s.draw = () => {
        s.background(theme.bkgColor);
        s.translate(vC.x, vC.y, 0);
        s.rotateY(s.frameCount * 0.005);
        s.orbitControl();

        // Draw coordinates
        s.push();
        s.smooth();
        s.translate(vC.x, vC.y, 0);
        s.fill(255, 255, 255);
        vR.x = s.sin(angl) * r;
        vR.y = s.cos(angl) * r;
        s.stroke(theme.radiusColorLight);
        s.line(-s.width, 0, 0, s.width, 0, 0); // x
        s.stroke(theme.radiusColorLight);
        s.line(0, -s.height, 0, 0, s.height, 0); // y
        s.stroke(theme.radiusColorLight);
        s.line(0, 0, -2000, 0, 0, 2000); // z
        s.pop();

        s.push();
        s.stroke('black');
        s.line(0, 0, 0, vR.x, vR.y, 0);
        s.circle(vR.x, vR.y, 3);
        mP.x = vR.x;
        mP.y = vR.y;
        mP.z += f * r;
        points.push([vR.x, mP.y, mP.z]);
        s.pop();

        // Draw the spiral
        s.push();
        s.stroke('gray');
        s.beginShape(s.POINTS);
        for (let i = 0; i < points.length; i += 1) {
            s.vertex(points[i][0], points[i][1], points[i][2]);
        }
        s.endShape();
        s.pop();

        // Draw the sine
        s.push();
        s.stroke(theme.sineColor);
        s.translate(2 * r, 0, 0);
        s.rotateY(s.PI / 2);
        s.beginShape(s.POINTS);
        for (let i = 0; i < points.length; i++) {
            s.vertex(-points[i][2], points[i][1]);
        }
        s.endShape();
        s.pop();

        // Draw the cosine
        s.push();
        s.stroke(theme.cosineColor);
        s.translate(0, 2 * r, 0);
        s.rotateX(s.HALF_PI);
        s.beginShape(s.POINTS);
        for (let i = 0; i < points.length; i++) {
            s.vertex(points[i][0], points[i][2]);
        }
        s.endShape();
        s.pop();

        // Draw projections
        s.push();
        s.line(vR.x, vR.y, 0, mP.x, mP.y, mP.z);
        s.line(mP.x, mP.y, mP.z, 2 * r, mP.y, mP.z);
        s.line(mP.x, mP.y, mP.z, mP.x, 2 * r, mP.z);
        s.point(mP.x, mP.y, mP.z);
        s.fill(theme.secondaryAxis);
        s.circle(0, 0, 2 * r);
        s.pop();

        // Draw the time that increases
        s.push();
        s.stroke(theme.thetaColor);
        s.line(0, 0, 0, 0, 0, mP.z);
        s.pop();

        // sine plane
        s.push();
        s.translate(2 * r, 0, 0);
        s.rotateY(s.PI / 2);
        s.fill(theme.secondaryAxis);
        s.rect(0, r, -4 * s.TWO_PI * r, -2 * r);
        s.stroke(theme.primaryAxis);
        s.line(0, 0, -4 * s.TWO_PI * r, 0);
        s.fill(theme.textColor);
        s.rotateY(s.PI);
        s.text(" 1", 5, -r, 0);
        s.text("-1", 5, r - 3, 0);
        s.text("0", 0, -10, 0);
        s.fill(theme.radiusColor);
        s.circle(s.HALF_PI * r, 0, 3);
        s.text("π/2", s.HALF_PI * r, -10);
        s.circle( s.PI * r, 0, 3);
        s.text("π", s.PI * r, -10);
        s.circle((s.HALF_PI + s.PI) * r, 0, 3);
        s.text("3π/2", (s.HALF_PI + s.PI) * r, -10);
        s.circle(s.TWO_PI * r, 0, 3);
        s.text("2π", s.TWO_PI * r, -10);
        s.pop();

        // cosine plane
        s.push();
        s.translate(0, 2 * r, 0);
        s.rotateX(s.PI / 2);
        s.fill(theme.secondaryAxis);
        s.rect(-r, 0, 2 * r, 4 * s.TWO_PI * r);
        s.stroke(theme.primaryAxis);
        s.line(0, 0, 0, 4 * s.TWO_PI * r);
        s.fill(theme.radiusColor);
        s.text(" 1", r - 25, 15);
        s.text("-1", -r + 15, 15);
        s.fill(theme.radiusColor);
        s.circle(0, s.HALF_PI * r, 3);
        s.text("π/2", -10, s.HALF_PI * r);
        s.circle(0, s.PI * r, 3);
        s.text("π", -10, s.PI * r);
        s.circle(0, (s.HALF_PI + s.PI) * r, 3);
        s.text("3π/2", -10, (s.HALF_PI + s.PI) * r);
        s.circle(0, s.TWO_PI * r, 3);
        s.text("2π", -10, s.TWO_PI * r);
        s.pop();

        // text labels
        s.push();
        s.smooth();
        s.fill(theme.textColor);
        s.text("O", 0, 0, 0);
        s.line(mP.x, mP.y, mP.z, 2 * r, mP.y, mP.z);
        s.fill(theme.sineColor);
        s.text("sin(x)", r, mP.y, mP.z);
        s.line(mP.x, mP.y, mP.z, mP.x, 2 * r, mP.z);
        s.fill(theme.cosineColor);
        s.text("cos(x)", mP.x, 2 * r, mP.z);
        s.pop();

        angl += f;
        if (angl > 4 * s.TWO_PI) {
            angl = s.PI / 2;
            mP = s.createVector(0, 0, 0);
            points = [];
        }
    };
}

let threeDComplexSketch = new p5(threeDComplex, 'three-d-complex-sketch');