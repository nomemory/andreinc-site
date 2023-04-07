const styles = {
    canvasX : 400,
    canvasY: 400,
    frameRate: 60,
    
    bkgColor : '#F6F8FA',
    circleColor : 'black',
    lineColor: 'black',
    sineColor: 'red',
    cosineColor: 'blue',
    imColor: 'red',
    reColor: 'blue',
    thetaColor: 'green',
    thetaColorLight: '#b0ffd0',
    gridColor: 'lightgray',
    coordSysColor: 'gray',
    radiusColor: 'black',

    textFont : "monospace",
    textColor : 'black',
    textSize : 12,
}

// Shapes
function pPoint(s, x, y, stroke) {
    s.stroke(stroke);
    s.point(x,y);
    s.noFill();
}
function pCircle(s, x, y, r, stroke, fill) {
    s.stroke(stroke);
    if (fill!=undefined) {
        s.fill(fill);
    } else {
        s.noFill();
    }
    s.circle(x,y,r);
    s.noFill();
}

function pLine(s, x1, y1, x2, y2, stroke, strokeWeight) {
    if (strokeWeight!==undefined) {
        s.strokeWeight(strokeWeight);
    }
    s.stroke(stroke);
    s.line(x1, y1, x2, y2);
    s.noFill();
    s.strokeWeight(1);
}

function pLineDashed(s, canvas, pattern, x1, y1, x2, y2, stroke) {
    canvas.drawingContext.setLineDash(pattern);
    s.stroke(stroke);
    s.line(x1, y1, x2, y2);
    s.noFill();
    canvas.drawingContext.setLineDash([]);
}

function pText(s, text, x, y, textColor, textSize) {
    if (textSize==undefined) 
        textSize = styles.textSize;
    if (textColor==undefined) 
        textColor = styles.lineColor;
    s.textSize(textSize);
    s.noStroke();
    s.fill(textColor);
    s.text(text, x, y);
    s.noFill();
}

function pArc(s, x, y, xl, yl, ang1, ang2, stroke, fill) {
    if (fill==undefined) {
        s.noFill();
    } else {
        s.fill(fill);
    }
    s.stroke(stroke);
    s.arc(x, y, xl, yl, ang1, ang2);
}

function pauseLoop(s, condition, droppedRate, frameRate, timeOut, runThis) {
    if (condition) {
        s.frameRate(droppedRate);
        setTimeout(() => {
            s.frameRate(frameRate);
            if (runThis!==undefined) {
                runThis();
            }
        }, timeOut);
    }
}

function paintGrid(s, canvasX, canvasY, coordSysColor, gridColor, center, textSize, gridStep, xLabel, yLabel) {
    if (undefined===xLabel) { xLabel="x"; }
    if (undefined===yLabel) { yLabel="y"; }

    s.stroke(coordSysColor);
    s.fill(coordSysColor);
    s.line(0, center.y, canvasX, center.y); // horizontal;

    s.fill(coordSysColor);
    s.stroke(coordSysColor);
    s.line(center.x, 0, center.x, canvasY); // vertical;

    s.textSize(textSize);
    s.stroke(coordSysColor);
    s.fill(coordSysColor);
    s.text(xLabel, canvasX - s.textSize() - 5, center.y - 10);

    s.textSize(textSize);
    s.stroke(coordSysColor);
    s.fill(coordSysColor);
    s.text(yLabel, center.x - s.textSize() - 12, 15);

    // Painting the grid
    for(let i = gridStep; i < canvasX; i+=gridStep) {
        s.stroke(gridColor);
        s.line(i, 0, i,canvasY); // vertical lines
    }
    for(let i = gridStep; i < canvasY; i+=gridStep) {
        s.stroke(gridColor);
        s.line(0,i,canvasX,i); // horizontal lines
    }
    for(let i = gridStep; i < canvasX; i+=gridStep) {
        for(let j = gridStep; j < canvasY; j+=gridStep) {
            s.stroke(gridColor);
            s.circle(i,j,3);
        }
    }
    
    let hCells = (center.x / (2*gridStep));
    let vCells = (center.y / (2*gridStep));
    
    s.stroke(coordSysColor);
    s.text(0, center.x + 10, center.y + 15);
    for(let i = 1; i < hCells; i++) {
        //x gradation
        s.stroke(coordSysColor);
        s.text(i, center.x + i*2*gridStep + 5, center.y + 15);
        s.text(-i, center.x - i*2*gridStep -15, center.y +15);
    }
    for(let i = 1; i < vCells; i++) {
        //y gradtion
        s.stroke(coordSysColor);
        s.text(i, center.x + 10, center.y - i*2*gridStep - 5);
        s.text(-i, center.x + 5, center.y + i*2*gridStep + 5);
    }
}   