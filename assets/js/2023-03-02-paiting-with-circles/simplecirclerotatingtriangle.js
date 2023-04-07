const simpleCircleRotatingTriangle = (styles) => {

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
        canvas.parent('simple-circle-rotating-triangle-sketch');
        
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

        // Draw the moving arc
        pArc(s, vCircle.x,   // in the middle of the center
               vCircle.y, 
               arcRd1,   
               arcRd2, 
               s.radians(90-angle), 
               arcAng, 
               styles.thetaColor, 
               styles.thetaColor);

        // Paint sine and cosine moving projections
        let vSineProj = s.createVector(vRad.x, vCircle.y); 
        pLine(s, vRad.x, vRad.y, vSineProj.x, vSineProj.y, styles.sineColor);
        let vCosineProj = s.createVector(vRad.x, vCircle.y);
        pLine(s, vCircle.x, vCircle.y, vCosineProj.x, vCosineProj.y, styles.cosineColor);

        // Moving labels for sin(θ) and cost(θ)
        const sineLabelOffset = (angle >= 180 && angle<360) ? -32 : 2;
        const cosLabelffset = (angle >= 90 && angle<270) ? 15 : (-5);
        let vSineLabel = s.createVector(vRad.x + sineLabelOffset, (vCircle.y + vRad.y)/2);
        let vCosineLabel = s.createVector((vCircle.x + vRad.x)/2-10, vCircle.y + cosLabelffset);
        pText(s, "sin(θ)", vSineLabel.x, vSineLabel.y, styles.sineColor);
        pText(s, "cos(θ)", vCosineLabel.x, vCosineLabel.y, styles.cosineColor);

        // Bottom left-side numbers
        let angleTextFix = (angle-90) > 0 ? (angle-90) : (270+angle);
        let vAngleText = s.createVector(10, s.width-60);
        let vSineText = s.createVector(10, s.width-45);
        let vCosineText = s.createVector(10, s.width-30);
        let sinThetaValue = Math.sin(s.radians(angle-90)).toFixed(2);
        let cosThetaValue = Math.cos(s.radians(angle-90)).toFixed(2);
        pText(s, "    θ  = " + angleTextFix + "°", vAngleText.x, vAngleText.y, styles.thetaColor);
        pText(s, "sin(θ) = " + sinThetaValue, vSineText.x, vSineText.y, styles.sineColor);
        pText(s, "cos(θ) = " + cosThetaValue, vCosineText.x, vCosineText.y, styles.cosineColor);

        // Moving radius coordinates
        pText(s, "(", vRad.x + 2, vRad.y, styles.radiusColor);
        pText(s, "sin(θ)", vRad.x + 7, vRad.y, styles.sineColor);
        pText(s, ", ", vRad.x + 48, vRad.y, styles.radiusColor);
        pText(s, "cos(θ)", vRad.x + 60, vRad.y, styles.cosineColor);
        pText(s, ")", vRad.x + 100, vRad.y, styles.radiusColor);
    };

};

}

// let simpleCircleRotatingTriangleSketch = 
//     new p5(simpleCircleRotatingTriangle(styles), 'simple-circle-rotating-triangle-sketch');

