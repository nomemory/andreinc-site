const simpleCircleRotating = (s) => {

    let p;          
    let center;
    let angle;
    let gridStep;

    s.setup = () => { 
        // Create Canvas of given size 
        p = simpleRotatingCircleProps(s);
        const canvas = s.createCanvas(p.canvasX, p.canvasY); 
        canvas.parent('simple-circle-rotating-sketch');
        
        s.setAttributes('antialias', true);
        s.frameRate(p.frameRate);
        s.textSize(p.textSize);

        center = s.createVector(s.width/2, s.height/2);
        angle = p.initialAngle;
        gridStep = p.radius/2;
    }; 

    s.draw = () => {
        s.background('white');
        
        paintGrid(s, p.canvasX, p.canvasY, p.coordSysColor, 
            p.gridColor, center, p.textSize, gridStep);
        
        // Draw the circle
        s.stroke(p.circleColor);
        s.noFill();
        s.circle(center.x, center.y, 2*p.radius);

        // Draw the center of the circle
        s.fill(p.circleColor);
        s.circle(center.x, center.y, 3);
        s.textSize(p.textSize) 
        s.text("(0,0)", center.x-35, center.y+15);

        // Draw the moving radius
        let rad = s.createVector(
                center.x+Math.sin(s.radians(angle)*p.frequency)*p.radius,
                center.y+Math.cos(s.radians(angle)*p.frequency)*p.radius
        );
        angle+=1;
        if (angle>360) {
            angle = 0;
        }        
        s.stroke(p.radiusColor);
        s.line(center.x, center.y, rad.x, rad.y);
        s.circle(rad.x, rad.y, 3);

        // Moving coordinates
        let xn= ((rad.x-center.x)/p.radius);
        let yn = ((center.y-rad.y)/p.radius);
        s.textSize(p.textSize-2)
        s.text(" (x="+xn.toFixed(2)+", y=" + yn.toFixed(2)+")", rad.x, rad.y);

        // Show sum at the bottom of the canvas
        s.textSize(p.textSize+4);
        s.text("x² + y² = " + (xn*xn).toFixed(2) + " + " + (yn*yn).toFixed(2) + " = 1", 5, center.y + s.width/2 - 10);
    };

};

let simpleCircleRotatingSketch = new p5(simpleCircleRotating, 'simple-circle-rotating-sketch');