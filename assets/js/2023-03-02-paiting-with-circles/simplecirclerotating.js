const simpleCircleRotating = (styles) => {

return (s) => {

    const diam          = 200;
    const radius        = diam/2;
    const frequency     = 1;
    const initialAngle  = 90;
    const gridStep      = diam/4;
    const arcRd1        = diam/6;
    const arcRd2        = diam/6;
    const arcAng        = s.radians(0);

    let angle           = initialAngle;

    s.setup = () => { 
        // Create Canvas of given size 
        const canvas = s.createCanvas(styles.canvasX, styles.canvasY); 
        canvas.parent('simple-circle-rotating-sketch');

        s.textFont(styles.textFont);
        s.setAttributes('antialias', true);
        s.frameRate(styles.frameRate);
    }; 

    s.draw = () => {
        s.background(styles.bkgColor);

        // Defining and drawing main circle vector + grid
        let vCircle = s.createVector(s.width/2, s.height/2);
        pCircle(s, vCircle.x, vCircle.y, diam, styles.circleColor);
        paintGrid(s, styles.canvasX, styles.canvasY, styles.coordSysColor, 
            styles.gridColor, vCircle, styles.textSize, gridStep);

        // Defining and drawing the moving radius
        let vRad = s.createVector(
            vCircle.x+Math.sin(s.radians(angle)*frequency)*radius,
            vCircle.y+Math.cos(s.radians(angle)*frequency)*radius
        );
        angle++;
        if (angle>360) angle = 0; // reset angle once the circle is complete
        pLine(s, vCircle.x, vCircle.y, vRad.x, vRad.y, styles.radiusColor);
        pCircle(s, vRad.x, vRad.y, 3, styles.circleColor);

        // Paint moving coordinates
        let vMovCoord = s.createVector((vRad.x-vCircle.x)/radius, (vCircle.y-vRad.y)/radius);
        pText(s, "(x="+vMovCoord.x.toFixed(2)+",y=" + vMovCoord.y.toFixed(2)+")", vRad.x, vRad.y);

        // Show Radius
        let vRadLabel = s.createVector(
            (vCircle.x + vRad.x)/2, 
            (vCircle.y + vRad.y)/2
        );
        pText(s, "r (radius)", vRadLabel.x, vRadLabel.y, styles.circleColor);

        // Show sum at the bottom of the canvas
        let sqrX=(vMovCoord.x*vMovCoord.x).toFixed(2);
        let sqrY=(vMovCoord.y*vMovCoord.y).toFixed(2);
        pText(s, "x² + y² = " + sqrX + " + " + sqrY + " = 1", 5, vCircle.y + s.width/2 - 10);
    };
};

}

let simpleCircleRotatingSketch = 
    new p5(simpleCircleRotating(styles), 'simple-circle-rotating-sketch');