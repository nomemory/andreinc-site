const rotatingPi = (styles) => {

return (s) => {

    const canvasX = 600;
    const canvasY = 200;
    const hLineRatio = 7/8;
    const diam = 100;
    const radius = diam/2;
    const step = radius;
    const rulerOffset = 70;
    const frameRate = 40;
    const rulerY = canvasY * hLineRatio;

    let vCircle;
    let vMovCircle;
    let movingCircleAngle;

    s.initConditions = () => {
        vCircle = s.createVector(rulerOffset, rulerY-diam/2);
        vMovCircle = s.createVector(vCircle.x, vCircle.y-diam/2);
        movingCircleAngle = 180;
    }

    s.circleOnRuler = () => {
        let xCoord = (i) => i * s.PI * radius + rulerOffset;
        let numCircles = (s.width-rulerOffset) / radius / s.PI;
        for(let i = 0; i < numCircles; ++i) {
            if (vCircle.x - rulerOffset > i * (s.PI * radius)) {
                pCircle(s, xCoord(i), rulerY, 5, styles.thetaColor, styles.thetaColor);
                if (i!=0) {
                    pLine(s, 
                        xCoord(i-1) + 5, 
                        rulerY - 10, 
                        xCoord(i) - 5, 
                        rulerY - 10, 
                        styles.thetaColor, 
                        styles.thetaColor
                    );
                    let midPoint = xCoord(i-1) + (xCoord(i) - xCoord(i-1))/2;
                    pText(s, "π ≈ 3.14", midPoint-12, rulerY - 15, styles.color);
                }
            } 
        }
    }

    s.setup = () => { 
        // Create Canvas of given size 
        const canvas = s.createCanvas(canvasX, canvasY); 
        canvas.parent('rotating-PI-sketch')
        s.textFont(styles.textFont);
        s.setAttributes('antialias', true);
        s.frameRate(styles.frameRate);
        s.initConditions();
    };

    s.draw = () => {
        s.background(styles.bkgColor);      

        // Draw horizontal line (ruler)
        pLine(s, 0, rulerY, s.width, rulerY, styles.coordSysColor);

        // Ruler on the horizontal line
        for(let i = rulerOffset, j = 0; i < s.width; i+=step, j++) {
            pCircle(s, i, rulerY, 3, styles.coordSysColor);
            pText(s, j, i-4, rulerY + 15, styles.coordSysColor, styles.coordSysColor);
        }

        // Draw main moving circle
        pCircle(s, vCircle.x, vCircle.y, diam, styles.circleColor);
        pCircle(s, vCircle.x, vCircle.y, 3, styles.circleColor);

        // Draw smaller circle and its projection
        pCircle(s, vMovCircle.x, vMovCircle.y, 4, styles.thetaColor, styles.thetaColor);
        pCircle(s, vMovCircle.x, rulerY, 4, styles.thetaColor, styles.thetaColor);
        pLine(s, vCircle.x, vCircle.y, vMovCircle.x, vMovCircle.y, styles.circleColor);


        // Increment the new positions for the moving circles
        vMovCircle = s.createVector(
            vCircle.x + Math.sin(s.radians(movingCircleAngle))*radius,
            vCircle.y + Math.cos(s.radians(movingCircleAngle))*radius
        );
        vCircle = s.createVector(
            vCircle.x + (s.radians(1)*diam/2),
            vCircle.y
        );

        // Reset angle
        movingCircleAngle--;
        if (movingCircleAngle==0) {
            movingCircleAngle=360;
        }

        // Let the pi points marked down
        s.circleOnRuler();

        // Reset animation
        // Loop again
        if (vMovCircle.x>s.width-radius) {
            s.frameRate(0);
            setTimeout(() => {
                s.frameRate(frameRate);
                s.initConditions();
                }, 4000);
        }
    };
};

};

let rotatingPISketch = new p5(rotatingPi(styles), 'rotating-PI-sketch');