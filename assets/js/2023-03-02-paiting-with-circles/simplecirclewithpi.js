const simpleCircleWithPi = (styles) => {

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

    const coefXMap = {
        30:0, 45:0, 60:2, 90:3,
        120:4, 135:5, 150:6, 180:7,
        210:8, 225:9, 240:10, 270:11,
        300:12, 315:13, 330:14, 360:15
    };

    s.setup = () => {
        // Create Canvas of given size 
        const canvas = s.createCanvas(styles.canvasX, styles.canvasY); 
        canvas.parent('simple-circle-with-pi-sketch');
        
        s.textFont(styles.textFont);
        s.setAttributes('antialias', true);
        s.frameRate(styles.frameRate);
    }
    
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
        let thetaInPiValue = (s.radians(angleTextFix)/s.PI).toFixed(2) + "π";
        let sinThetaValue = Math.sin(s.radians(angle-90)).toFixed(2);
        let cosThetaValue = Math.cos(s.radians(angle-90)).toFixed(2);
        pText(s, "        θ  = " + thetaInPiValue + " (" +angleTextFix+ "°)", vAngleText.x, vAngleText.y, styles.thetaColor);
        pText(s, "sin(" +thetaInPiValue+ ") = " + sinThetaValue, vSineText.x, vSineText.y, styles.sineColor);
        pText(s, "cos(" +thetaInPiValue+ ") = " + cosThetaValue, vCosineText.x, vCosineText.y, styles.cosineColor);
        
        if (angleTextFix in coefXMap) {
            let el = document.getElementById("angle_" + angleTextFix);
            el.style.color = 'red';
            pauseLoop(s, true, 0, styles.frameRate, 2000, () => {
                el.style.color='';
            });
        }
    }
};

};

let simpleCircleWithPiSketch = 
    new p5(simpleCircleWithPi(styles), 'simple-circle-with-pi-sketch');

