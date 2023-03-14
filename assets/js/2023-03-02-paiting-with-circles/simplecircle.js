
const simpleCircle = (s) => {

    s.setup = () => { 
        // Create Canvas of given size 
        const canvas = s.createCanvas(300, 300); 
        canvas.parent('simple-circle-sketch')
        s.noLoop();
    }; 

    s.draw = () => {
        s.background('white');   
        // Draw a circle
        let center = s.createVector(s.width/2, s.width/2);     
        let radius = 125;
        s.circle(center.x, center.y, 2*radius);
        // Draw the center
        s.circle(center.x, center.y, 3); 
        // Draw the radius
        let rad = s.createVector(center.x+radius, center.y);
        s.line(center.x, center.y, rad.x, rad.y);
        s.circle(rad.x, rad.y, 3);
        // Draw the origin text
        s.text("(a,b)", center.x-12, center.y+12);
        // Draw radius text
        s.text("radius (r)", center.x + radius/2 - 20, center.y -12);
    };

};

let simpleCircleSketch = new p5(simpleCircle, 'simple-circle-sketch');