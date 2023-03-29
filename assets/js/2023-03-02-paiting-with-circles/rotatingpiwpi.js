const rotatingPIwPI = (styles) => {

return (s) => {

    const canvasX = 500;
    const canvasY = 200;
    const hLineRatio = 6/8;
    const diam = 100;
    const radius = diam/2;
    const step = radius;
    const rulerY = canvasY * hLineRatio;
    const rulerOffset = 70;

    let tex;
    
    const coef = [
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

    let vCircle;
    let vMovCircle;
    let movCircleAngle;
    let coefIdx;

    s.initConditions = () => {
        vCircle = s.createVector(rulerOffset, rulerY-diam/2);
        vMovCircle = s.createVector(vCircle.x, vCircle.y-diam/2);
        movCircleAngle = 179;
        coefIdx = 0;
    }

    s.setup = () => { 
        const canvas = s.createCanvas(canvasX, canvasY); 
        canvas.parent('rotating-PI-w-PI-sketch')
        s.textFont(styles.textFont);
        s.setAttributes('antialias', true);
        s.frameRate(styles.frameRate); 

        // Tex
      
        // Init properties
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

        // Draw main circle
        pCircle(s, vCircle.x, vCircle.y, diam, styles.circleColor);
        pCircle(s, vCircle.x, vCircle.y, 3, styles.circleColor);

        // The moving arc
        s.strokeWeight(3);
        pArc(s, vCircle.x, vCircle.y, diam, diam, 
            s.radians(270), s.radians(90-movCircleAngle), 
            styles.thetaColor, styles.thetaColorLight);
        s.strokeWeight(1);
        pLine(s, vCircle.x, vCircle.y, vMovCircle.x, vMovCircle.y, styles.coordSysColor);
        pLine(s, vCircle.x, vCircle.y, vCircle.x, vCircle.y-radius, styles.coordSysColor);

        // Compute the new coordinates for the circles
        // the moving one, used to define the arc
        vMovCircle = s.createVector(
            vCircle.x + Math.sin(s.radians(movCircleAngle))*radius,
            vCircle.y + Math.cos(s.radians(movCircleAngle))*radius
        );

        // Main circle
        vCircle = s.createVector(vCircle.x + (s.radians(1)*radius), vCircle.y);

        let vMovAngle = s.createVector(
            vCircle.x + Math.sin(s.PI/2+s.radians(movCircleAngle)/2)*radius/8,
            vCircle.y + Math.cos(s.PI/2+s.radians(movCircleAngle)/2)*radius/8
        );
        let movAngleTxt = movCircleAngle < 180 ? (180-movCircleAngle) : (540-movCircleAngle);
        pText(s, "θ=" + (movAngleTxt)+ "°", vMovAngle.x, vMovAngle.y, styles.thetaColor);

        if (movCircleAngle in coefXMap) {
            pLine(s, vCircle.x, rulerY, vCircle.x-20, rulerY+30, styles.gridColor);
            pText(s, "θ = ("+coef[coefIdx][1] + ") → " + coef[coefIdx][2], vCircle.x-50, rulerY+40, styles.lineColor);
            pauseLoop(s, true, 0, styles.frameRate, 2000);
            pLine(s, rulerOffset, rulerY + 3, vCircle.x, vCircle.y + radius + 3, styles.thetaColor);
            coefIdx++;                                        
        }

        // Reset angle
        movCircleAngle--;
        if (movCircleAngle==0) movCircleAngle=360;

        // Reset animation back to the initial conditions
        pauseLoop(s, (coefIdx==16), 0, styles.frameRate, 2000, () => {
            s.initConditions();
        });;
    
    };
};

};

let rotatingPIwPISketch = new p5(rotatingPIwPI(styles), 'rotating-PI-w-PI-sketch');