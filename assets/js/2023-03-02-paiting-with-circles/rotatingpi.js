const rotatingPI = (s) => {

    const hLineRatio = 7/8;
    const radiusRatio = 1/8;
    const movingCircleColor = s.color('red');
    const rulerColor = s.color('black');
    const diam = 100;
    const rulerOffset = 70;
    const frameRate = 40;

    let ccenter;
    let step;
    let rulerY;
    let movingCircle;
    let movingCircleAngle;
    let xStep;

    s.initConditions = () => {
        ccenter = s.createVector(rulerOffset, rulerY-diam/2);
        movingCircle = s.createVector(ccenter.x, ccenter.y-diam/2);
        movingCircleAngle = 180;
    }

    s.circleOnRuler = () => {
        let xCoord = (i) => i * s.PI * diam/2 + rulerOffset;
        let numCircles = (s.width-rulerOffset)/(diam/2)/s.PI;
        for(let i = 0; i < numCircles; ++i) {
            if (ccenter.x - rulerOffset > i * (s.PI * diam/2)) {
                s.fill(movingCircleColor);
                s.stroke(movingCircleColor);
                s.circle(xCoord(i), rulerY, 5);
                s.noFill();
                if (i!=0) {
                    s.line(
                        xCoord(i-1) + 5, rulerY - 10,
                        xCoord(i) - 5, rulerY - 10
                    )
                    let midPoint = xCoord(i-1) + (xCoord(i) - xCoord(i-1))/2;
                    s.color(rulerColor)
                    s.stroke(rulerColor);
                    s.fill(rulerColor);
                    s.text("π ≈ 3.14", midPoint-12, rulerY - 15);
                    s.noFill();
                }
            } 
        }
    }

    s.setup = () => { 
        // Create Canvas of given size 
        const canvas = s.createCanvas(600, 200); 
        canvas.parent('rotating-PI-sketch')
        s.frameRate(frameRate);
        // s.noLoop();

        // Init properties
        step = diam/2;
        rulerY = s.height * hLineRatio;
        s.initConditions();
    };

    s.draw = () => {
        s.background('white');  
        s.textSize(14);

        // Draw horizontal line
        s.stroke(rulerColor);
        s.noFill();
        s.line(0, rulerY, s.width, rulerY);

        // Ruler on the horizontal line
        for(let i = rulerOffset, j = 0; i < s.width; i+=step, j++) {
            s.stroke(rulerColor);
            s.noFill();
            s.circle(i, rulerY, 3);
            s.stroke(rulerColor);
            s.fill(rulerColor);
            s.text(j, i-4, rulerY + 15);
            s.noFill();
        }

        // Draw circles

        s.stroke(rulerColor);
        s.fill(rulerColor);
        s.noFill();
        s.circle(ccenter.x, ccenter.y, diam);

        s.fill(rulerColor);
        s.circle(ccenter.x, ccenter.y, 3);

        s.stroke(movingCircleColor);
        s.fill(movingCircleColor);
        s.circle(movingCircle.x, movingCircle.y, 4);
        s.line(ccenter.x, ccenter.y, movingCircle.x, movingCircle.y);
        // The projection of the moving circle
        s.circle(movingCircle.x, rulerY, 4);
        s.noFill();


        // Compute the new coordinates for the circles
        movingCircle = s.createVector(
            ccenter.x + Math.sin(s.radians(movingCircleAngle))*diam/2,
            ccenter.y + Math.cos(s.radians(movingCircleAngle))*diam/2
        );

        ccenter = s.createVector(
            ccenter.x + (s.radians(1)*diam/2),
            ccenter.y
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
        if (movingCircle.x>s.width-diam/2) {
            s.frameRate(0);
            setTimeout(() => {
                s.frameRate(frameRate);
                s.initConditions();
                }, 4000);
        }
    };
};

let rotatingPISketch = new p5(rotatingPI, 'rotating-PI-sketch');