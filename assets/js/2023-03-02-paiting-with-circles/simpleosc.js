const simpleOsc = (styles) => {

return (s) => {

    const height = 200;
    const width = 600;
    const radius = 40;
    const initAngle = 90;

    let canvas;
    let angle = initAngle;
    let vPosGrid, vCircle, vRadius;
    

    s.initConditions = () => {
        vPosGrid = s.createVector(height/2 + 2*radius, height/2);
        vCircle = s.createVector(height/2, height/2);
        vRadius = s.createVector(
            vCircle.x + Math.sin(s.radians(angle))*radius,
            vCircle.y + Math.cos(s.radians(angle))*radius,
        );
        angle = initAngle;
    }

    s.setup = () => {
        // Create Canvas of given size 
        canvas = s.createCanvas(width, height); 
        canvas.parent('simple-osc-sketch');
        
        s.textFont(styles.textFont);
        s.setAttributes('antialias', true);
        s.frameRate(styles.frameRate);

        s.initConditions();
    }
    
    s.draw = () => {
        s.background(styles.bkgColor);

        // Moving Circle
        vRadius.x = vCircle.x + Math.sin(s.radians(angle))*radius;
        vRadius.y = vCircle.y + Math.cos(s.radians(angle))*radius;
        pCircle(s, vCircle.x, vCircle.y, 2*radius, styles.circleColor);
        pCircle(s, vCircle.x, vCircle.y, 3, styles.circleColor);
        pCircle(s, vRadius.x, vRadius.y, 3, styles.circleColor);
        pLine(s, vCircle.x, vCircle.y, vRadius.x, vRadius.y, styles.lineColor);
        pLine(s, vRadius.x, vRadius.y, vRadius.x, vCircle.y, styles.sineColor);
        let vSineLabel = s.createVector(vRadius.x, (vCircle.y + vRadius.y)/2);
        const sineLabelOffset = ((angle%360) >= 180 && (angle%360)<360) ? -65 : 5;
        let angleTextFix = ((angle-90) > 0 ? (angle-90) : (270+angle))%360;
        pText(s, "sin("+angleTextFix+"°)", vSineLabel.x + sineLabelOffset, vSineLabel.y, styles.sineColor);

        // Grid Lines
        let startGrid = height/2+2*radius;
        pLine(s, 0, vCircle.y, width, vCircle.y, styles.coordSysColor);
        pLine(s, startGrid, 0, startGrid, height, styles.coordSysColor);
        let hUnits = (width-startGrid)/radius;
        for(let i = 0; i < hUnits; i++) {
            pCircle(s, startGrid+i*radius, vCircle.y, 3, styles.coordSysColor);
            pText(s, i, startGrid+i*radius-3, vCircle.y+15, styles.textColor);
        }
        pCircle(s, startGrid, vCircle.y-radius, 3, styles.coordSysColor);
        pCircle(s, startGrid, vCircle.y+radius, 3, styles.coordSysColor);
        pText(s, " 1", startGrid - 20, vCircle.y-radius, styles.textColor);
        pText(s, "-1", startGrid - 20, vCircle.y+radius, styles.textColor);
        
        // Vertical oscilation line
        pLine(s, vRadius.x, vRadius.y, width, vRadius.y, styles.coordSysColor);

        // Moving sine vertical line
        pLine(s, vPosGrid.x, vPosGrid.y, vPosGrid.x, vRadius.y, styles.sineColor);
        vPosGrid.x = vPosGrid.x + s.radians(1)*radius;

        // Paint sinus function
        let sinAngle =0;
        for(let x = height/2 + 2*radius; x < vPosGrid.x; sinAngle++, x+=s.radians(1)*radius) {
            pPoint(s, x, height/2 - radius*Math.sin(s.radians(sinAngle)), styles.lineColor);            
        }

        if (s.radians(sinAngle)>Math.PI/2) {
            let pi2X = startGrid+(Math.PI/2)*radius;
            pLineDashed(s, canvas, [5,5], pi2X, vCircle.y, pi2X, vCircle.y-radius, styles.coordSysColor);
            pLineDashed(s, canvas, [5,5], pi2X, vCircle.y-radius, startGrid, vCircle.y-radius, styles.coordSysColor);
            pText(s, "π/2", pi2X, vCircle.y + 35, styles.textColor)       
        }
        if (s.radians(sinAngle)>Math.PI) {
            let piX = startGrid + Math.PI * radius;
            pText(s, "π", piX, vCircle.y + 35, styles.textColor);
        }
        if (s.radians(sinAngle)>(3/2)*Math.PI) {
            let tpi2X = startGrid + Math.PI * (3/2) * radius;
            pLineDashed(s, canvas, [5,5], tpi2X, vCircle.y + radius, startGrid, vCircle.y+radius, styles.coordSysColor);
            pLineDashed(s, canvas, [5,5], tpi2X, vCircle.y, tpi2X, vCircle.y + radius, styles.coordSysColor);
            pText(s, "3π/2", tpi2X, vCircle.y - 35, styles.textColor);
        }
        if (s.radians(sinAngle)>2*Math.PI) {
            let tpiX = startGrid + Math.PI * 2 * radius;
            pText(s, "2π", tpiX, vCircle.y + 35, styles.textColor);
        }

        angle++;
        if (vPosGrid.x > width) {
            s.initConditions();
        }
    };
};

};
    
let simpleOscSketch = 
        new p5(simpleOsc(styles), 'simple-osc-sketch');
    
    