const simpleRotatingCircleProps = (s) => {
     // Defaults
     return {
        initialAngle : 90,
        frequency : 1,
        canvasX : 400,
        canvasY : 400,
        frameRate : 30,
        radius : 100,
        circleColor : s.color(0,0,0),
        radiusColor : s.color(0,0,0),
        gridColor : s.color(220,220,220),
        coordSysColor : s.color(100,100,100),
        textColor : s.color(0,0,0),
        textSize : 14
     };
};

function arrowHead(start, vector){
    push()   //start new drawing state
    var norm = createVector(vector.x, vector.y)
    norm.normalize()
    // applyMatrix(1,0,0,1,vector.x - start.x,vector.y - start.y)
    applyMatrix(norm.x,norm.y,-norm.y, norm.x, vector.x - start.x,vector.y - start.y)
  
    triangle(0,6,12,0,0,-6)
    pop()
}

function paintGrid(s, canvasX, canvasY, coordSysColor, gridColor, center, textSize, gridStep) {
    s.stroke(coordSysColor);
    s.fill(coordSysColor);
    s.line(0, center.y, canvasY, center.y); // horizontal;

    s.fill(coordSysColor);
    s.stroke(coordSysColor);
    s.line(center.x, 0, center.x, canvasY); // vertical;

    s.textSize(textSize);
    s.stroke(coordSysColor);
    s.fill(coordSysColor);
    s.text("x", canvasX - 10, center.y - 10);

    s.textSize(textSize);
    s.stroke(coordSysColor);
    s.fill(coordSysColor);
    s.text("y", center.x - 12, 15);

    // Painting the grid
    for(let i = 0; i < canvasX; i+=gridStep) {
        s.stroke(gridColor);
        s.line(i, 0, i,canvasY); // vertical lines
    }
    for(let i = 0; i < canvasY; i+=gridStep) {
        s.stroke(gridColor);
        s.line(0,i,canvasX,i); // horizontal lines
    }
    for(let i = 0; i < canvasX; i+=gridStep) {
        for(let j = 0; j < canvasY; j+=gridStep) {
            s.stroke(gridColor);
            s.circle(i,j,3);
        }
    }
    s.stroke(coordSysColor);
    s.text("1", center.x + 2*gridStep + 5, center.y + 15);
    s.stroke(coordSysColor);
    s.text("1", center.x + 5, center.y - 2*gridStep - 5);
    s.stroke(coordSysColor);
    s.text("-1", center.x - 2*gridStep - 15, center.y - 10);
    s.stroke(coordSysColor);
    s.text("-1", center.x - 15, center.y + 2*gridStep + 15);
}

function dropFrameRate(s, condition, mili) {
    // Drop framerate and then recover it
    if (condition()) {      
        s.frameRate(1);
        setTimeout(() => {
            s.frameRate(p.frameRate);
        }, mili);
    }
}