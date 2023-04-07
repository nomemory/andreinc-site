
const simpleCircle = (styles) => {

return (s) => {
    
    const diameter = 250;
    let radius = diameter/2;

    s.setup = () => { 
        s.createCanvas(styles.canvasX-100, styles.canvasY-100);
        s.setAttributes('antialias', true); 
        s.noLoop();
    }; 

    s.draw = () => {
        
        // Sets up the background color
        s.background(styles.bkgColor);

        // Draw a circle
        let vCircle = s.createVector(s.width/2, s.height/2);     
        pCircle(s, vCircle.x, vCircle.y, diameter, styles.circleColor, styles.bkgColor);

        // Draw a smaller circle in the center of the previous one
        pCircle(s, vCircle.x, vCircle.y, 3, styles.circleColor);

        // Draw the radius
        let vRad = s.createVector(vCircle.x+radius, vCircle.y);
        pLine(s, vCircle.x, vCircle.y, vRad.x, vRad.y, styles.lineColor);

        // Draw a small circle on the initial bigger circle
        pCircle(s, vRad.x, vRad.y, 3, styles.circleColor);

        // Draw the origin text
        let vTxtAb = s.createVector(vCircle.x - 12, vCircle.y + 12);
        pText(s, "(a,b)", vTxtAb.x, vTxtAb.y);

        // Draw radius text
        let vTxtRad = s.createVector(vCircle.x + radius/2 - 20, vCircle.y - 12);
        pText(s, "r (radius)", vTxtRad.x, vTxtRad.y, styles.textSize, styles.textColor);
    };
}

};

// let simpleCircleSketch = new p5(simpleCircle(styles), 'simple-circle-sketch');