const sinCosSide = (styles) => {

return (s) => {

    const width = 2*styles.canvasY;
    const height = styles.canvasY/2;
    const radius = styles.canvasX/8;
    const dInc = s.radians(1)*radius;

    let vCenter, vMovingSine, vMovingCosine;
    let wavAngle = 90;

    let points = [];

    s.initConditions = () => {
        wavAngle = 90;
        vCenter = s.createVector(width/2, height/2);
        vMovingSine = s.createVector(vCenter.x - radius*(s.TWO_PI - s.HALF_PI), vCenter.y - radius);
        vMovingCosine = s.createVector(vCenter.x - radius * s.TWO_PI, vCenter.y - radius);
    };

    s.setup = () => {
        // Create Canvas of given size 
        canvas = s.createCanvas(width, height);
        canvas.parent('sin-cos-side-sketch');
        s.textFont(styles.textFont);
        s.frameRate(styles.frameRate);
        s.angleMode(s.DEGREES);

        // Init attributes
        s.initConditions();

        // Points to be drawn for sine and cosine
        for(let x = vCenter.x, xn = vCenter.x, localAngle = 0; x < width; x+=dInc, xn-=dInc, localAngle+=1) {
            let p = {};
            let sV = radius*s.sin(localAngle);
            let cV = radius*s.cos(localAngle);
            // Corrdinates of points to be drawn on the canvas
            // composing the sine and cos waves
            p.sineX1 = x;
            p.sineX2 = xn;
            p.sineY1 = vCenter.y - sV;
            p.sineY2 = vCenter.y + sV;
            p.cosineX1 = x;
            p.cosineX2 = xn;
            p.cosineY1 = vCenter.y - cV;
            p.cosineY2 = p.cosineY1;
            points.push(p);
        }
    }

    s.draw = () => {
        s.background(styles.bkgColor); 
    
        paintGrid(s, 
            s.width, 
            s.height, 
            styles.coordSysColor, 
            styles.gridColor,
            vCenter,
            10,
            radius/2
            );
            Math.cos

        for(let i = 0; i < points.length; i++) {
            pPoint(s, points[i].sineX1, points[i].sineY1, styles.sineColor);
            pPoint(s, points[i].sineX2, points[i].sineY2, styles.sineColor);
            pPoint(s, points[i].cosineX1, points[i].cosineY1, styles.cosineColor);
            pPoint(s, points[i].cosineX2, points[i].cosineY2, styles.cosineColor);

        }

        // Moving circles on sine and cosine
        pCircle(s, vMovingSine.x, vMovingSine.y, 3, styles.sineColor);
        pCircle(s, vMovingCosine.x, vMovingCosine.y, 3, styles.cosineColor);
        pText(s, "π/2", vMovingCosine.x + (vMovingSine.x - vMovingCosine.x)/2 - 5, vMovingSine.y- 5, 10, styles.textColor);
        pLine(s, vMovingSine.x, vMovingSine.y, vMovingCosine.x, vMovingCosine.y, styles.lineColor);

        vMovingSine.x += dInc;
        vMovingCosine.x = vMovingSine.x - radius * s.HALF_PI;

        vMovingSine.y = vCenter.y - s.sin(wavAngle) * radius;
        vMovingCosine.y = vMovingSine.y;

        wavAngle++;
        if (vMovingCosine.x>width) 
            s.initConditions();
    }
};

};

// let sinCosSideSketch = 
//     new p5(sinCosSide(styles), "sin-cos-side-sketch"); 