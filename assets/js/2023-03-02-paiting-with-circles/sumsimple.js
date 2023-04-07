const sumSimple = (styles) => {

return (s) => {

    const height = 520;
    const width = 600;
    const radiusScale = 50;
    const initAngle = 0;

    let vGridTopCenter;
    let vGridBotCenter;
    let dInc = s.radians(1) * radiusScale;

    let y1Points = [];
    let y2Points = [];
    let yPoints = [];

    let y1Color = 'red';
    let y2Color = 'blue';
    let yColor = 'green';

    let vLineIdx = 0;

    s.setup = () => {

        canvas = s.createCanvas(width, height); 
        canvas.parent('sum-simple-sketch');
        p5.disableFriendlyErrors = true;
        
        s.textFont(styles.textFont);
        s.frameRate(styles.frameRate);

        vGridTopCenter = s.createVector(50, 100);
        vGridBotCenter = s.createVector(50, 400);

        // Precomputing y1,y2,y for plotting
        for(let x = vGridBotCenter.x, angle = 0, p, y1v, y2v; x < width; x+=dInc, angle++) {
            p = {};
            p.x = x;
            y1v = 0.5 * Math.sin(7 * s.radians(angle) + Math.PI/2) * radiusScale;
            p.y = vGridTopCenter.y - y1v;
            y1Points.push(p);
            p = {}
            p.x = x;
            y2v = 0.7 * Math.sin(3 * s.radians(angle) - 2) * radiusScale;
            p.y = vGridTopCenter.y - y2v;
            y2Points.push(p);
            p = {};
            p.x = x;
            p.y = vGridBotCenter.y - (y1v+y2v);
            yPoints.push(p);
        }
    };

    s.draw = () => {
        s.background(styles.bkgColor);

        // Painting the two origins
        pCircle(s, vGridTopCenter.x, vGridTopCenter.y, 3, styles.coordSysColor);
        pCircle(s, vGridBotCenter.x, vGridBotCenter.y, 3, styles.coordSysColor);
        // Painting x-axis
        pLine(s, 0, vGridTopCenter.y, width, vGridTopCenter.y, styles.gridColor);
        pLine(s, 0, vGridBotCenter.y, width, vGridBotCenter.y, styles.gridColor);
        // Painting y-axisvGridTopCenter
        pLine(s, vGridTopCenter.x, 0, vGridTopCenter.x, 200, styles.gridColor, styles.gridColor);
        pLine(s, vGridBotCenter.x, 300, vGridTopCenter.x, height, styles.gridColor, styles.gridColor);
        let maxHOffset = width - radiusScale; 
        for(let offset = radiusScale, i = 1; offset < maxHOffset; offset+=radiusScale, i++) {
            pCircle(s, vGridTopCenter.x+offset, vGridTopCenter.y, 3, styles.coordSysColor);
            pText(s, " "+i, vGridTopCenter.x + offset - 10, vGridTopCenter.y+15, styles.textColor, 10);
            pCircle(s, vGridBotCenter.x+offset, vGridBotCenter.y, 3, styles.coordSysColor);
            pText(s, " "+i, vGridBotCenter.x + offset - 10, vGridBotCenter.y+15, styles.textColor, 10);
        }
        let maxVOffset = 150;
        for(let offset = radiusScale, j = 1; offset < maxVOffset; offset+=radiusScale, j++) {
            pCircle(s, vGridTopCenter.x, vGridTopCenter.y - offset, 3, styles.coordSysColor);
            pCircle(s, vGridTopCenter.x, vGridTopCenter.y + offset, 3, styles.coordSysColor);
            pCircle(s, vGridBotCenter.x, vGridBotCenter.y - offset, 3, styles.coordSysColor);
            pCircle(s, vGridBotCenter.x, vGridBotCenter.y + offset, 3, styles.coordSysColor);
        }
        pText(s, " 1", vGridTopCenter.x, vGridTopCenter.y - radiusScale, styles.textColor, 10);
        pText(s, "-1", vGridTopCenter.x, vGridTopCenter.y + radiusScale, styles.textColor, 10);
        pText(s, " 1", vGridBotCenter.x, vGridBotCenter.y - radiusScale, styles.textColor, 10);
        pText(s, "-1", vGridBotCenter.x, vGridBotCenter.y + radiusScale, styles.textColor, 10);

        // Plot y1, y2, y
        for(let i = 0; i < y1Points.length; i++) {
            pPoint(s, y1Points[i].x, y1Points[i].y, y1Color);
            pPoint(s, y2Points[i].x, y2Points[i].y, y2Color);
            pPoint(s, yPoints[i].x, yPoints[i].y, yColor);
        }

        // Moving vertical line
        let yrr = [y1Points[vLineIdx].y, y2Points[vLineIdx].y, vGridTopCenter.y, yPoints[vLineIdx].y, vGridBotCenter.y];
        yrr.sort((a,b) => a-b);
        pLine(s, y1Points[vLineIdx].x, 0, y1Points[vLineIdx].x, yrr[0], styles.gridColor);
        pLine(s, y1Points[vLineIdx].x, y1Points[vLineIdx].y, y1Points[vLineIdx].x, vGridTopCenter.y, y1Color);
        pLine(s, y2Points[vLineIdx].x, y2Points[vLineIdx].y, y2Points[vLineIdx].x, vGridTopCenter.y, y2Color);
        pLine(s, y2Points[vLineIdx].x, yrr[2], yPoints[vLineIdx].x, yrr[3], styles.gridColor);
        pLine(s, yPoints[vLineIdx].x, yrr[3], yPoints[vLineIdx].x, yrr[4], yColor);
        pLine(s, yPoints[vLineIdx].x, yrr[4], yPoints[vLineIdx].x, height, styles.gridColor);

        // Text
        let y1X = (-(y1Points[vLineIdx].x - vGridTopCenter.x)/radiusScale).toFixed(2);
        let y1Y = (-(y1Points[vLineIdx].y - vGridTopCenter.y)/radiusScale).toFixed(2);
        pText(s, "y1(" + y1X + ")=" + y1Y, vGridTopCenter.x + radiusScale, vGridTopCenter.y + radiusScale + 20, s.color(y1Color), 10);
        let y2X = (-(y2Points[vLineIdx].x - vGridTopCenter.x)/radiusScale).toFixed(2);
        let y2Y = (-(y2Points[vLineIdx].y - vGridTopCenter.y)/radiusScale).toFixed(2);
        pText(s, "y1(" + y2X + ")=" + y2Y, vGridTopCenter.x + radiusScale, vGridTopCenter.y + radiusScale + 40, s.color(y2Color), 10);
        let yX = (-(yPoints[vLineIdx].x - vGridBotCenter.x)/radiusScale).toFixed(2);
        let yY = (-(yPoints[vLineIdx].y - vGridBotCenter.y)/radiusScale).toFixed(2);
        pText(s, "y(" + yX + ") = y1(" + y1X + ") + y2(" + y2X + ")=" + yY, vGridBotCenter.x + radiusScale, vGridBotCenter.y + radiusScale + 40, s.color(yColor), 10);

        pText(s, s.frameRate().toFixed(2) + "fps", width-60, height-30, styles.textColor, 10);

        vLineIdx++;
        if (vLineIdx==y1Points.length) vLineIdx=0;
    };
}

};

// let sumSimpleSketch = new p5(sumSimple(styles), 'sum-simple-sketch'); 