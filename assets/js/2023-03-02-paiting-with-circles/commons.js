const theme = {
    canvasX: 400,
    canvasY: 400,
    frameRate: 30,
    frequency: 1 / 10,

    bkgColor: '#F6F8FA',
    lightCircleColor: 'silver',
    circleColor: 'black',
    lineColor: 'black',
    sineColor: 'red',
    cosineColor: 'blue',
    imColor: 'red',
    reColor: 'blue',
    thetaColor: 'green',
    thetaColorLight: '#b0ffd0',
    radiusColor: 'black',
    radiusColorLight: '#92b9b9',

    primaryAxis: '#c1d7d7',
    secondaryAxis: '#e0ebeb',
    intersections: '#92b9b9',

    textFont: "monospace",
    textColor: 'black',
    textSize: 12,
}

const addPaintGrid = (s) => {

    s.paintGrid = (gridBuff, w, h, o, uSize, eUnit, props) => {
        gridBuff.noFill();
        gridBuff.push();
        gridBuff.stroke(1);

        // Primary axis (OX, OY)
        gridBuff.push();
        gridBuff.stroke(s.color(theme.primaryAxis));
        gridBuff.line(0, o.y, h, o.y);
        gridBuff.line(o.x, 0, o.x, w);
        gridBuff.pop();

        // Secondary axis
        gridBuff.stroke(s.color(theme.secondaryAxis));
        for (let i = o.x; i < w; i += uSize)  gridBuff.line(i, 0, i, h);
        for (let i = o.x; i >= 0; i -= uSize) gridBuff.line(i, 0, i, h);
        for (let i = o.y; i < h; i += uSize) gridBuff.line(0, i, w, i);
        for (let i = o.y; i > 0; i -= uSize) gridBuff.line(0, i, w, i);

        // Adding units
        if (props !== undefined && props.showUnits === true) {
            gridBuff.push();
            gridBuff.fill(theme.textColor);
            if (props !== undefined && props.showX === true) {
                for (let i = eUnit, lb = 1, q1x = (w - o.x) / uSize; i < q1x; i += eUnit, lb++) {
                    gridBuff.text(" " + lb, (o.x + i * uSize) + 5, o.y + 15);
                    gridBuff.push();
                    gridBuff.noFill();
                    gridBuff.stroke(theme.intersections);
                    gridBuff.circle(o.x + i * uSize, o.y, 3);
                    gridBuff.pop();
                }
                for (let i = eUnit, lb = 1, q2x = o.y / uSize; i < q2x; i += eUnit, lb++) {
                    gridBuff.text("-" + lb, (o.x - i * uSize) - 15, o.y + 15);
                    gridBuff.push();
                    gridBuff.noFill();
                    gridBuff.stroke(theme.intersections);
                    gridBuff.circle(o.x - i * uSize, o.y, 3);
                    gridBuff.pop();
                }
            }
            if (props !== undefined && props.showY === true) {
                for (let i = eUnit, lb = 1, q1y = o.y / uSize; i < q1y; i += eUnit, lb++) {
                    gridBuff.text(" " + lb, o.x + 5, o.y - i * uSize - 5);
                    gridBuff.push();
                    gridBuff.noFill();
                    gridBuff.stroke(theme.intersections);
                    gridBuff.circle(o.x, o.y - i * uSize, 3);
                    gridBuff.pop();
                }
                for (let i = eUnit, lb = 1, q2y = o.y / uSize; i < q2y; i += eUnit, lb++) {
                    gridBuff.text("-" + lb, o.x + 5, o.y + i * uSize + 15);
                    gridBuff.push();
                    gridBuff.noFill();
                    gridBuff.stroke(theme.intersections);
                    gridBuff.circle(o.x, o.y + i * uSize, 3);
                    gridBuff.pop();
                }
            }
        }

        // The origin of the grid
        if (props !== undefined && props.showOrigin === true) {
            gridBuff.circle(o.x, o.y, 3);
            gridBuff.text("0", o.x + 5, o.y + 15);
            gridBuff.pop();
        }
        gridBuff.pop();
    };
    return s;
};

const addPauseLoop = (s) => {
    s.pauseLoop = (condition, droppedRate, frameRate, timeOut, runThisBefore, runThisAfter) => {
        if (condition) {
            runThisBefore();
            s.frameRate(droppedRate);
            setTimeout(() => {
                s.frameRate(frameRate);
                if (runThis !== undefined) {
                    runThisAfter();
                }
            }, timeOut);
        }
    };
    return s;
};

const addShowFps = (s) => {
    s.showFps = () => {
        s.text(s.frameRate().toFixed(1) + "fps", s.width - 55, s.height - 5);
    };
    return s;
}