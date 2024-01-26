
const simpleCircle = (s) => {

    addPaintGrid(s);
    
    const d = 250;
    const r = d/2;

    let vC, vR, vTxtAb, vTxtRad;

    s.setup = () => { 
        let canvas = s.createCanvas(theme.canvasX, theme.canvasY);
        canvas.parent('simple-circle-sketch');
        vC = s.createVector(s.width/2, s.height/2);
        vR = s.createVector(vC.x+r, vC.y);
        buff = s.createGraphics(theme.canvasX, theme.canvasY);
        vTxtAb = s.createVector(vC.x - 12, vC.y + 12);
        vTxtRad = s.createVector(vC.x + r/2 - 20, vC.y - 12);
        s.paintGrid(buff, s.width, s.height, vC, r/5, 5);
        s.noLoop();
    }; 

    s.draw = () => {
        // Sets up the background color
        s.background(theme.bkgColor);
        s.image(buff, 0, 0);

        // Draw a circle
        s.noFill();
        s.circle(vC.x, vC.y, d);
        s.circle(vC.x, vC.y, 3);
        s.circle(vR.x, vR.y, 3);

        // // Draw the radius
        s.stroke(1);
        s.line(vC.x, vC.y, vR.x, vR.y);

        // Draw the origin text
        s.noStroke();
        s.fill('black');
        s.text("P(a,b)", vTxtAb.x, vTxtAb.y);
        s.text("r (radius)", vTxtRad.x, vTxtRad.y);
    };
}

let simpleCircleSketch = new p5(simpleCircle, 'simple-circle-sketch');