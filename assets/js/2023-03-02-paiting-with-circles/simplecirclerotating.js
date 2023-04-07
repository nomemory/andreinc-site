const simpleCircleRotating = (styles) => {

return (s) => {

    // Constants
    const d = 200;      // circle diameter
    const r = d/2;      // radius
    const frm = 30;     // fixed frame rate
    const f = 1/10;     // frequency

    // Angle
    let angl = 0;

    // Vectors
    let vC, vR, vCoord, vRLab; 

    // Buffers
    let cBuff;

    /**
     * 
     * @param {*} gridBuff The buffer 
     * @param {*} w The width of the buffer
     * @param {*} h The height of the buffer
     * @param {*} o The origin of the grid as a vector
     * @param {*} unit The size of the unit
     * @param {*} x The label of the x axis
     * @param {*} y The label of the y axis
     */
    s.paintGrid = (gridBuff, w, h, o, unit, x, y) => {
        gridBuff.noFill();
        gridBuff.stroke(1);

        // The number of steps to paint on the bottom side of the grid
        let yBotSteps = (h-o.y)/unit;
        for(let i = 0; i < yBotSteps; i++) s.circle(o.x, o.y+i*unit, 3);
        // The number of steps to paint on the top side of the grid
        let yTopSteps = o.y/unit;
        for(let i = 0; i < yTopSteps; i++) s.circle(o.x, o.y-i*unit, 3);
        // Origin
        s.circle(o.x, o.y, 3); 
    };

    s.setup = () => { 
        // Create Canvas of given size 
        s.createCanvas(styles.canvasX, styles.canvasY); 

        s.textFont(styles.textFont);
        s.frameRate(frm);

        // Initialise circle in the center of the canvas
        cBuff = s.createGraphics(styles.canvasX, styles.canvasY);
        vC = s.createVector(s.width/2, s.height/2);
        vCoord = s.createVector(0, 0);
        vRLab = s.createVector(0, 0);

        // Draw the main circle exactly once on the buffer
        cBuff.noFill();
        cBuff.circle(vC.x, vC.y, d);
        cBuff.circle(vC.x, vC.y, 3);

        // Draw the grid on the buffer
        s.paintGrid(cBuff, s.width, s.height, vC, r, "x", "y");
    }; 

    s.draw = () => {
        s.background(styles.bkgColor);
        s.image(cBuff, 0, 0);


        // Painting the lines, adding a 'stroke' of 1
        s.stroke(1);

        // Updating and rendering the moving radius vector
        vR = s.createVector(
            vC.x+s.sin(angl*f)*r,
            vC.y+s.cos(angl*f)*r
        );
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
        s.text("r (radius)", vRLab.x, vRLab.y, styles.circleColor);

        // Show sum at the bottom of the canvas
        let sqrX=(vCoord.x*vCoord.x).toFixed(2);
        let sqrY=(vCoord.y*vCoord.y).toFixed(2);
        s.text("x² + y² = " + sqrX + " + " + sqrY + " = 1", 5, vC.y + s.width/2 - 10);

        angl+=f;
        if (angl>s.TWP_PI*1/f) angl = 0; // reset angle once the circle is complete
        s.text(s.frameRate(), s.width-50, s.height-50);
    };
};

}

let simpleCircleRotatingSketch = 
    new p5(simpleCircleRotating(styles), 'simple-circle-rotating-sketch');