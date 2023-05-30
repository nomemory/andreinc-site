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
    intervalLight: 'green',

    primaryAxis: '#c1d7d7',
    secondaryAxis: '#e0ebeb',
    intersections: '#92b9b9',

    textFont: "monospace",
    textColor: 'black',
    textSize: 12,
}

const addPaintGrid = (s) => {

    s.paintGrid = (gridBuff, w, h, o, uSize, eUnit, props) => {

        let mx = "-";
        let px = " ";
        let my = "-";
        let py = " ";

        if (props !== undefined && props.invertX !== undefined && props.invertX === true) {
            mx = " "; px = "-";
        }
        if (props !== undefined && props.invertY !== undefined && props.invertY === true) {
            my = " "; py = "-";
        }

        gridBuff.push();
        gridBuff.noFill();
        gridBuff.textFont(theme.textFont)

        // Primary axis (OX, OY)
        gridBuff.push();
        gridBuff.stroke(s.color(theme.primaryAxis));
        gridBuff.strokeWeight(2);
        // Y AXIS -> ORIGIN TOP
        gridBuff.line(o.x, o.y, o.x, 0);
        // Y AXIS -> ORIGIN BOTTOM
        gridBuff.line(o.x, o.y, o.x, h);
        // X AXIS -> ORIGIN LEFT
        gridBuff.line(o.x, o.y, 0, o.y);
        // X AXIS -> ORIGIN RIGHT
        gridBuff.line(o.x, o.y, w, o.y);
        gridBuff.pop();

        // Secondary axis
        gridBuff.push();
        gridBuff.stroke(s.color(theme.secondaryAxis));
        for (let i = o.x; i < w; i += uSize)  gridBuff.line(i, 0, i, h);
        for (let i = o.x; i >= 0; i -= uSize) gridBuff.line(i, 0, i, h);
        for (let i = o.y; i < h; i += uSize) gridBuff.line(0, i, w, i);
        for (let i = o.y; i > 0; i -= uSize) gridBuff.line(0, i, w, i);
        gridBuff.pop();

        // Adding units
        if (props !== undefined && props.showUnits === true) {
            gridBuff.push();
            gridBuff.fill(theme.textColor);

            // X Positive Units
            if (props.hideUnitsXPos === undefined || props.hideUnitsXPos === false) {
                for (let i = eUnit, lb = 1, q1x = (w - o.x) / uSize; i < q1x; i += eUnit, lb++) {
                    gridBuff.text(px + lb, (o.x + i * uSize) + 5, o.y + 15);
                    gridBuff.push();
                    gridBuff.noFill();
                    gridBuff.stroke(theme.intersections); s
                    gridBuff.circle(o.x + i * uSize, o.y, 3);
                    gridBuff.pop();
                }
            }

            // X Negative Units
            if (props.hideUnitsXNeg === undefined || props.hideUnitsXNeg === false) {
                for (let i = eUnit, lb = 1, q2x = o.x / uSize; i < q2x; i += eUnit, lb++) {
                    gridBuff.text(mx + lb, (o.x - i * uSize) - 15, o.y + 15);
                    gridBuff.push();
                    gridBuff.noFill();
                    gridBuff.stroke(theme.intersections);
                    gridBuff.circle(o.x - i * uSize, o.y, 3);
                    gridBuff.pop();
                }
            }

            // Y Positive Units
            if (props.hideUnitsYPos === undefined || props.hideUnitsYPos === false) {
                for (let i = eUnit, lb = 1, q1y = o.y / uSize; i < q1y; i += eUnit, lb++) {
                    gridBuff.text(py + lb, o.x + 5, o.y - i * uSize - 5);
                    gridBuff.push();
                    gridBuff.noFill();
                    gridBuff.stroke(theme.intersections);
                    gridBuff.circle(o.x, o.y - i * uSize, 3);
                    gridBuff.pop();
                }
            }

            // Y Negative Units
            if (props.hideUnitsYNeg === undefined || props.hideUnitsYNeg === false) {
                for (let i = eUnit, lb = 1, q2y = (h - o.y) / uSize; i < q2y; i += eUnit, lb++) {
                    gridBuff.text(my + lb, o.x + 5, o.y + i * uSize + 15);
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
            gridBuff.push();
            gridBuff.circle(o.x, o.y, 3);
            gridBuff.text("0", o.x + 5, o.y + 15);
            gridBuff.pop();
        }
        gridBuff.pop();
    };
};

const addPauseLoop = (s) => {
    s.pauseLoop = (condition, droppedRate, frameRate, timeOut, runThisBefore, runThisAfter) => {
        if (condition) {
            runThisBefore();
            s.frameRate(droppedRate);
            setTimeout(() => {
                s.frameRate(frameRate);
                if (runThisAfter !== undefined) {
                    runThisAfter();
                }
            }, timeOut);
        }
    };
};

const addShowFps = (s) => {
    s.showFps = () => {
        s.text(s.frameRate().toFixed(1) + "fps", s.width - 55, s.height - 5);
    };
}

const addLineDashed = (s) => {
    s.lineDash = (c, pattern, x1, y1, x2, y2) => {
        c.drawingContext.setLineDash(pattern);
        s.line(x1, y1, x2, y2);
        c.drawingContext.setLineDash([]);
    }
}
