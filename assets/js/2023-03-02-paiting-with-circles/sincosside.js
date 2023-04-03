const sinCosSide = (styles) => {

return (s) => {

    const width = 2*styles.canvasY;
    const height = styles.canvasY/2;
    const radius = styles.canvasX/8;

    let vCenter, vMovingSine, vMovingCosine;
    let wavAngle = 90;

    s.setup = () => {
        // Create Canvas of given size 
        canvas = s.createCanvas(width, height);
        canvas.parent('sin-cos-side-sketch');
        s.textFont(styles.textFont);
        s.setAttributes('antialias', true);
        s.frameRate(styles.frameRate);

        // Init attributes
        vCenter = s.createVector(width/2, height/2);
        vMovingSine = s.createVector(vCenter.x - radius*(2*Math.PI - Math.PI/2), vCenter.y - radius);
        vMovingCosine = s.createVector(vCenter.x - radius * (2*Math.PI), vCenter.y - radius);
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

        for(let x = vCenter.x, xn = vCenter.x, localAngle = 0; x < width; x+=s.radians(1)*radius, xn-=s.radians(1)*radius, localAngle+=1) {
            pPoint(s, x, vCenter.y - radius*Math.sin(s.radians(localAngle)), styles.sineColor);
            pPoint(s, xn, vCenter.y + radius*Math.sin(s.radians(localAngle)), styles.sineColor);
        }

        for(let x = vCenter.x, xn = vCenter.x, localAngle = 0; x < width; x+=s.radians(1)*radius, xn-=s.radians(1)*radius, localAngle+=1) {
            pPoint(s, x, vCenter.y - radius*Math.cos(s.radians(localAngle)), styles.cosineColor);
            pPoint(s, xn, vCenter.y - radius*Math.cos(s.radians(localAngle)), styles.cosineColor);
        }

        // Moving circles on sine and cosine
        pCircle(s, vMovingSine.x, vMovingSine.y, 3, styles.sineColor);
        pCircle(s, vMovingCosine.x, vMovingCosine.y, 3, styles.cosineColor);
        pText(s, "π/2", vMovingCosine.x + (vMovingSine.x - vMovingCosine.x)/2 - 5, vMovingSine.y- 5, 10, styles.textColor);
        pLine(s, vMovingSine.x, vMovingSine.y, vMovingCosine.x, vMovingCosine.y, styles.lineColor);

        vMovingSine.x += s.radians(1) * radius;
        vMovingCosine.x = vMovingSine.x - radius * Math.PI/2;

        vMovingSine.y = vCenter.y - Math.sin(s.radians(wavAngle)) * radius;
        vMovingCosine.y = vMovingSine.y;

        wavAngle++;
        if (vMovingCosine.x>width) {
            wavAngle = 90;
            vMovingSine = s.createVector(vCenter.x - radius*(2*Math.PI - Math.PI/2), vCenter.y - radius);
            vMovingCosine = s.createVector(vCenter.x - radius * (2*Math.PI), vCenter.y - radius);
        }
    }
};

};

let sinCosSideSketch = 
    new p5(sinCosSide(styles), "sin-cos-side-sketch");