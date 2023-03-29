const rotatingPIwPI = (s) => {
    const hLineRatio = 6/8;
    const radiusRatio = 1/8;
    const movingCircleColor = s.color('red');
    const rulerColor = s.color('black');
    const vertLineColor = s.color('silver');
    const angleColor = s.color('green');
    const diam = 100;
    const rulerOffset = 70;
    const frameRate = 101;
    
    const coef = [
        [0, "0 * π", "0°"],
        [1/6, "1/6 * π", "30°" ], [1/4, "1/4 * π", "45°" ], [1/3, "1/3 * π", "60°" ], [1/2, "1/2 * π", "90°"], 
        [2/3, "2/3 * π", "120°"], [3/4, "3/4 * π", "135°"], [5/6, "5/6 * π", "150°"], [1, "π", "180°"],
        [7/6, "7/6 * π", "210°" ], [5/4, "5/4 * π", "225°" ], [4/3, "4/3 * π", "240°" ], [3/2, "3/2 * π", "270°"],
        [5/3, "5/3 * π", "300°" ], [7/4, "7/4 * π", "315°" ], [11/6, "11/6 * π", "330°"], [2, "2 * π", "360°"]
    ];

    const coefXMap = {
        30:0, 45:0, 60:2, 90:3,
        120:4, 135:5, 150:6, 180:7,
        210:8, 225:9, 240:10, 270:11,
        300:12, 315:13, 330:14, 360:15
    };

    let ccenter;
    let step;
    let rulerY;
    let movingCircle;
    let movingCircleAngle;
    let coefIdx;

    s.initConditions = () => {
        ccenter = s.createVector(rulerOffset, rulerY-diam/2);
        movingCircle = s.createVector(ccenter.x, ccenter.y-diam/2);
        movingCircleAngle = 180;
        coefIdx = 0;
    }

    s.setup = () => { 
        // Create Canvas of given size 
        const canvas = s.createCanvas(500, 200); 
        canvas.parent('rotating-PI-w-PI-sketch');
        s.setAttributes('antialias', true);
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
            s.textSize(14);
            s.text(j, i-4, rulerY + 15);
            s.noFill();
        }

        // Adding pi on the horizontal line
        // s.stroke(movingCircleColor);
        // s.fill(movingCircleColor);
        // for(let i = 0; i < coef.length; i++) {
        //     s.circle(rulerOffset + coef[i][0] * s.PI * diam/2, rulerY, 3);
        // }
        // s.noFill();

        // console.log(coefXMap);

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

        // Line from the projection the current point to the projection
        s.stroke(vertLineColor)
        s.line(movingCircle.x, movingCircle.y, movingCircle.x, rulerY);
        s.noFill();

        // A horizontal line
        s.stroke(vertLineColor)
        s.line(ccenter.x, ccenter.y, ccenter.x, ccenter.y-diam);
        s.noFill()

        // The moving arc
        s.fill(angleColor);
        s.stroke(angleColor);
        s.arc(ccenter.x, ccenter.y, diam/4, diam/4, s.radians(270), s.radians(90-movingCircleAngle));
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

        if (movingCircleAngle==0) {
            s.frameRate(0);
            setTimeout(() => {
                s.frameRate(frameRate);
                }, 500);
        }

        if (movingCircleAngle in coefXMap) {
            s.stroke(vertLineColor);
            s.fill(vertLineColor);
            s.line(movingCircle.x, rulerY, movingCircle.x-20, rulerY+40);
            s.noFill();
            s.stroke(rulerColor);
            s.fill(rulerColor);
            s.text("("+coef[coefIdx][1] + ") → " + coef[coefIdx][2], movingCircle.x-10, rulerY+40);
            s.noFill();
            s.frameRate(0);
            setTimeout(() => {
                s.frameRate(frameRate);
                }, 1000);
            coefIdx++;                                        
        }

        // Reset angle
        movingCircleAngle--;
        if (movingCircleAngle==0) {
            movingCircleAngle=360;
        }

        // Reset animation
        // Loop again
        if (coefIdx==17) {
            s.frameRate(0);
            setTimeout(() => {
                s.frameRate(frameRate);
                s.initConditions();
                }, 500);
        }
    };
};

let rotatingPIwPISketch = new p5(rotatingPIwPI, 'rotating-PI-w-PI-sketch');