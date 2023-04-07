const triangleInCircle = (styles) => {    

return (s) => {

    const gridStep = 40;
    const initAngle = 120;
    const maxAngle = 170;
    const radius = 80;

    let angle;
    let angleIncr;

    s.setup = () => {
        const canvas = s.createCanvas(styles.canvasX, styles.canvasY); 
        s.textFont(styles.textFont);
        s.frameRate(styles.frameRate);
        s.setAttributes('antialias', true);
        angle = initAngle;
        angleIncr = +1;
    };

    s.draw = () => {
        s.background(styles.bkgColor);
        let vCenter = s.createVector(s.width/2, s.height/2);
        paintGrid(s, styles.canvasX, 
            styles.canvasY, 
            styles.coordSysColor, 
            styles.gridColor, 
            vCenter, 
            styles.textSize, 
            gridStep);
        
        // First qudrant
        let vSqT =  s.createVector(
            vCenter.x + Math.sin(s.radians(angle))*radius,
            vCenter.y + Math.cos(s.radians(angle))*radius
        );
        pCircle(s, vCenter.x, vCenter.y, 2 * radius, styles.gridColor);
        pArc(s, vCenter.x, vCenter.y, radius/3, radius/3, s.radians(90-angle), s.radians(0), styles.thetaColor, styles.thetaColorLight);
        pLine(s, vCenter.x, vCenter.y, vSqT.x, vSqT.y, styles.lineColor);            
        pLine(s, vSqT.x, vSqT.y, vSqT.x, vCenter.y, styles.lineColor);
        pLine(s, vCenter.x, vCenter.y, vSqT.x, vCenter.y, styles.lineColor);
        pArc(s, vCenter.x, vCenter.y, radius*2, radius*2, s.radians(90-angle), s.radians(90-initAngle), styles.circleColor);
        pText(s, "A", vSqT.x + 5, vSqT.y - 5, styles.textColor);
        
        // Second quadrant
        vSqT = s.createVector(vSqT.x - 2 * Math.sin(s.radians(angle))*radius, vSqT.y);
        pArc(s, vCenter.x, vCenter.y, radius/3, radius/3, s.radians(180), s.radians(90+angle), styles.thetaColor, styles.thetaColorLight);
        pLine(s, vCenter.x, vCenter.y, vSqT.x, vSqT.y, styles.lineColor);            
        pLine(s, vSqT.x, vSqT.y, vSqT.x, vCenter.y, styles.lineColor);
        pLine(s, vCenter.x, vCenter.y, vSqT.x, vCenter.y, styles.lineColor);
        pArc(s, vCenter.x, vCenter.y, radius*2, radius*2, s.radians(90+initAngle), s.radians(90+angle), styles.circleColor);
        pText(s, "B'", vSqT.x - 5, vSqT.y - 5, styles.textColor);


        //Third quadrant
        vSqT = s.createVector(vSqT.x, vSqT.y - 2 * Math.cos(s.radians(angle))*radius);
        pArc(s, vCenter.x, vCenter.y, radius/3, radius/3, s.radians(90-(angle-180)), s.radians(90+angle), styles.thetaColor, styles.thetaColorLight);
        pLine(s, vCenter.x, vCenter.y, vSqT.x, vSqT.y, styles.lineColor);            
        pLine(s, vSqT.x, vSqT.y, vSqT.x, vCenter.y, styles.lineColor);
        pLine(s, vCenter.x, vCenter.y, vSqT.x, vCenter.y, styles.lineColor);
        pArc(s, vCenter.x, vCenter.y, radius*2, radius*2, s.radians(90-(angle-180)), s.radians(90-(initAngle-180)), styles.circleColor);
        pText(s, "A'", vSqT.x - 5, vSqT.y + 10, styles.textColor);

        // Fourth quadrant
        vSqT = s.createVector(vSqT.x + 2 * Math.sin(s.radians(angle))*radius, vSqT.y);
        pArc(s, vCenter.x, vCenter.y, radius/3, radius/3, s.radians(360), s.radians(90+(angle-180)), styles.thetaColor, styles.thetaColorLight);
        pLine(s, vCenter.x, vCenter.y, vSqT.x, vSqT.y, styles.lineColor);            
        pLine(s, vSqT.x, vSqT.y, vSqT.x, vCenter.y, styles.lineColor);
        pLine(s, vCenter.x, vCenter.y, vSqT.x, vCenter.y, styles.lineColor);
        pArc(s, vCenter.x, vCenter.y, radius*2, radius*2, s.radians(90+(initAngle-180)), s.radians(90+(angle-180)), styles.circleColor);
        pText(s, "B", vSqT.x - 5, vSqT.y + 10, styles.textColor);

        angle+=angleIncr;
        if (angle==maxAngle) {
            angleIncr=-1;
        } else if (angle==initAngle) {
            angleIncr=+1;
        }
    };
};

};

// let triangleInCircleSketch = new p5(triangleInCircle(styles), 'triangle-in-circle-sketch');