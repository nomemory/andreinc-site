const simpleCircleRotatingTriangle = (s) => {

    let p;
    let center;
    let arc;
    let angle;
    let gridStep;

    let sinusColor = s.color('red');
    let cosinusColor = s.color('blue');
    let thetaColor = s.color('green');

    s.setup = () => { 
        p = simpleRotatingCircleProps(s);
        // Create Canvas of given size 
        const canvas = s.createCanvas(p.canvasX, p.canvasY); 
        canvas.parent('simple-circle-rotating-triangle-sketch');
        
        s.setAttributes('antialias', true);
        s.frameRate(p.frameRate);
        s.textSize(p.textSize);

        center = s.createVector(s.width/2, s.height/2);
        arc = s.createVector(p.radius/4, p.radius/4);
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

        // Draw the moving radius
        let rad = s.createVector(
                center.x+Math.sin(s.radians(angle)*p.frequency)*p.radius,
                center.y+Math.cos(s.radians(angle)*p.frequency)*p.radius
        );
        angle+=1;
        if (angle>360) {
            angle = 0;
        }        
        // Drawing θ arc
        s.fill(thetaColor);
        s.stroke(thetaColor);
        s.arc(center.x, center.y, p.radius/2, p.radius/2, s.radians(90-angle), s.radians(0));
        s.noFill();
        s.stroke(p.radiusColor);
        s.fill(p.radiusColor);
        s.line(center.x, center.y, rad.x, rad.y);
        s.circle(rad.x, rad.y, 3);
        s.noFill();

        // Moving projection
        s.stroke(sinusColor); // red
        s.fill(sinusColor);
        s.line(rad.x, rad.y, rad.x, center.y); // sinus 
        s.stroke(cosinusColor); // blue
        s.fill(cosinusColor);
        s.line(center.x, center.y, rad.x, center.y); // cosinus
        s.noFill();

        // Moving sin(θ), cost(θ)
        // let xn= ((rad.x-center.x)/p.radius);
        // let yn = ((center.y-rad.y)/p.radius); 
        s.textSize(p.textSize-2);
        s.stroke(p.textColor);
        s.text("(", rad.x + 2, rad.y);
        s.stroke(sinusColor);
        s.fill(sinusColor);
        s.text("sin(θ)", rad.x + 7, rad.y);
        s.stroke(p.textColor);
        s.fill(p.textColor);
        s.text(", ", rad.x + 37, rad.y);
        s.stroke(cosinusColor);
        s.fill(cosinusColor);
        s.text("cos(θ)", rad.x + 42, rad.y);
        s.stroke(p.textColor);
        s.fill(p.textColor);
        s.text(")", rad.x + 76, rad.y);
        s.noFill();
    

        // Moving labels for sin(θ) and cost(θ)
        s.stroke(sinusColor);
        s.fill(sinusColor);
        let sinffset = (angle >= 180 && angle<370) ? -32 : 2;
        s.text("sin(θ)", rad.x + sinffset, (center.y+rad.y)/2); // sinus 
        s.noFill();
        s.stroke(cosinusColor);
        s.fill(cosinusColor);
        let cosffset = (angle >= 90 && angle<270) ? 15 : (-5);
        s.text("cos(θ)", (center.x+rad.x)/2 - 10, center.y + cosffset); // cosinus
        s.noFill();

        // Text tabels
        s.textSize(p.textSize);
        s.stroke(thetaColor);
        s.fill(thetaColor);
        let angleVal = (angle-90) > 0 ? (angle-90) : (270+angle);
        s.text("θ=" + angleVal+"°", 10, p.canvasY-60);
        s.noFill();
        s.stroke(sinusColor);
        s.fill(sinusColor);
        s.text("sin(θ)=" + Math.sin(s.radians(angle-90)).toFixed(2), 10, p.canvasY-45);
        s.noFill();
        s.stroke(cosinusColor);
        s.fill(cosinusColor);
        s.text("cos(θ)=" + Math.cos(s.radians(angle-90)).toFixed(2), 10, p.canvasY-30);
        s.noFill();
        s.text
    };

};

let simpleCircleRotatingTriangleSketch = new p5(simpleCircleRotatingTriangle, 'simple-circle-rotating-triangle-sketch');

