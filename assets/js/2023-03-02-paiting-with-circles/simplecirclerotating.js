const simpleCircleRotating = (s) => {

    addPaintGrid(s);
    addShowFps(s);

    // Constants
    const d = 200;      
    const r = d/2;  
    const f = theme.frequency;
    const rColor = s.color(theme.radiusColorLight);     

    // Angle
    let angl = 0;
    let reset = s.TWP_PI*(1/f);

    // Vectors
    let vC, vR, vCoord, vRLab; 

    // Buffers
    let cBuff;

    s.setup = () => { 
        // Create Canvas of given size 
        const canvas = s.createCanvas(theme.canvasX, theme.canvasY); 
        canvas.parent("simple-circle-rotating-sketch");

        s.textFont(theme.textFont);
        s.frameRate(theme.frameRate);

        // Initialise circle in the center of the canvas
        cBuff = s.createGraphics(s.width, s.height);
        vC = s.createVector(s.width/2, s.height/2);
        vCoord = s.createVector(0, 0);
        vRLab = s.createVector(0, 0);

        // Draw the main circle exactly once on the buffer
        cBuff.noFill();
        s.paintGrid(cBuff, s.width, s.height, vC, r/5, 5, 
            {showUnits:true, showOrigin:true, showY: true, showX: true});
        cBuff.circle(vC.x, vC.y, d);
    }; 

    s.draw = () => {
        s.background(theme.bkgColor);
        s.image(cBuff, 0, 0);

        // Painting the lines, adding a 'stroke' of 1
        s.stroke(1);

        // Updating and rendering the moving radius vector
        vR = s.createVector(
            vC.x+s.sin(angl*f)*r,
            vC.y+s.cos(angl*f)*r
        );
        s.stroke(rColor);
        s.line(vC.x, vC.y, vR.x, vR.y);
        s.circle(vR.x, vR.y, 3);

        // At this point we are painting text, so we remove the 'stroke'
        s.noStroke();

        // Paint moving coordinates
        vCoord.x = (vR.x-vC.x)/r;
        vCoord.y = (vR.y-vC.y)/r;
        s.text("(x="+vCoord.x.toFixed(2)+",y=" + vCoord.y.toFixed(2)+")", vR.x, vR.y);

        // Show Radius*frequency
        vRLab.x = (vC.x + vR.x)/2;
        vRLab.y = (vC.y + vR.y)/2;
        s.text("r (radius)", vRLab.x, vRLab.y);

        // Show sum at the bottom of the canvas
        let sqrX=(vCoord.x*vCoord.x).toFixed(2);
        let sqrY=(vCoord.y*vCoord.y).toFixed(2);
        s.text("x² + y² = " + sqrX + " + " + sqrY + " = 1", 5, s.height-5);

        angl+=f;
        if (angl>reset) angl = 0; // reset angle once the circle is complete
        s.showFps();
    };
};

let simpleCircleRotatingSketch = 
    new p5(simpleCircleRotating, 'simple-circle-rotating-sketch');