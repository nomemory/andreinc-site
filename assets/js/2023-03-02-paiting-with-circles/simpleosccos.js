const simpleOscCos = (styles) => {

    return (s) => {
    
        const heightCircleArea = 200;
        const widthCircleArea = 200;
        const height = 600;
        const width = 600;
        const radius = 40;
        const initAngle = 90;
    
        let canvas;
        let angle = initAngle;
        let vPosGridSine, vCircle, vRadius;
        
    
        s.initConditions = () => {
            vPosGridSine = s.createVector(widthCircleArea/2 + 2*radius, heightCircleArea/2);
            vPosGridCos = s.createVector(widthCircleArea/2, heightCircleArea/2 + 2*radius);
            vCircle = s.createVector(heightCircleArea/2, heightCircleArea/2);
            vRadius = s.createVector(
                vCircle.x + Math.sin(s.radians(angle))*radius,
                vCircle.y + Math.cos(s.radians(angle))*radius,
            );
            angle = initAngle;
        }
    
        s.setup = () => {
            // Create Canvas of given size 
            canvas = s.createCanvas(width, height); 
            canvas.parent('simple-osc-cos-sketch');
            
            s.textFont(styles.textFont);
            s.setAttributes('antialias', true);
            s.frameRate(styles.frameRate);
    
            s.initConditions();
        }
        
        s.draw = () => {
            s.background(styles.bkgColor);
    
            // Moving Circle
            vRadius.x = vCircle.x + Math.sin(s.radians(angle))*radius;
            vRadius.y = vCircle.y + Math.cos(s.radians(angle))*radius;
            pCircle(s, vCircle.x, vCircle.y, 2*radius, styles.circleColor);
            pCircle(s, vCircle.x, vCircle.y, 3, styles.circleColor);
            pCircle(s, vRadius.x, vRadius.y, 3, styles.circleColor);
            pLine(s, vCircle.x, vCircle.y, vRadius.x, vRadius.y, styles.lineColor);
            pLine(s, vRadius.x, vRadius.y, vRadius.x, vCircle.y, styles.sineColor); // sine
            pLine(s, vCircle.x, vCircle.y, vRadius.x, vCircle.y, styles.cosineColor); // cosine
            let vSineLabel = s.createVector(vRadius.x, (vCircle.y + vRadius.y)/2);
            const sineLabelOffset = ((angle%360) >= 180 && (angle%360)<360) ? -65 : 5;
            let angleTextFix = ((angle-90) > 0 ? (angle-90) : (270+angle))%360;
            pText(s, "sin("+angleTextFix+"°)", vSineLabel.x + sineLabelOffset, vSineLabel.y, styles.sineColor);
    
            // Grid Lines
            // Horizontal
            let startGridSine = heightCircleArea/2 + 2*radius;
            pLine(s, 0, vCircle.y, width, vCircle.y, styles.coordSysColor);
            pLine(s, startGridSine, radius, startGridSine, heightCircleArea-radius, styles.coordSysColor);
            let hUnits = (width-startGridSine)/radius;
            for(let i = 0; i < hUnits; i++) {
                pCircle(s, startGridSine+i*radius, vCircle.y, 3, styles.coordSysColor);
                pText(s, i, startGridSine+i*radius-3, vCircle.y+15, styles.textColor);
            }
            pCircle(s, startGridSine, vCircle.y-radius, 3, styles.coordSysColor);
            pCircle(s, startGridSine, vCircle.y+radius, 3, styles.coordSysColor);
            pText(s, " 1", startGridSine - 20, vCircle.y-radius, styles.textColor);
            pText(s, "-1", startGridSine - 20, vCircle.y+radius, styles.textColor);

            // Grid Lines 
            // Vertical
            let startGridCosine = heightCircleArea/2 + 2*radius;
            pLine(s, vCircle.x, 0, vCircle.x, height, styles.coordSysColor);
            pLine(s, radius, startGridCosine, widthCircleArea-radius, startGridCosine, styles.coordSysColor);
            let vUnits = (height-startGridCosine)/2 + 2*radius;
            for(let i = 0; i < vUnits; i++) {
                pCircle(s, vCircle.x, startGridCosine + i*radius, 3, styles.coordSysColor);
                pText(s, i, vCircle.x + 10, startGridCosine + i*radius + 3, styles.textColor);
            }
            pCircle(s, vCircle.x - radius, startGridCosine, 3, styles.coordSysColor);
            pCircle(s, vCircle.x + radius, startGridCosine, 3, styles.coordSysColor);
            //TODO numbers
            
            // Vertical and horizontal oscilation lines
            pLine(s, vRadius.x, vRadius.y, width, vRadius.y, styles.coordSysColor); // sine
            pLine(s, vRadius.x, vRadius.y, vRadius.x, height, styles.coordSysColor); // cosine
    
            // Moving sine vertical line
            pLine(s, vPosGridSine.x, vPosGridSine.y, vPosGridSine.x, vRadius.y, styles.sineColor); // sine
            pLine(s, vCircle.x, vPosGridCos.y, vRadius.x, vPosGridCos.y, styles.cosineColor); // cosine
            vPosGridSine.x = vPosGridSine.x + s.radians(1)*radius;
            vPosGridCos.y = vPosGridCos.y + s.radians(1)*radius;
    
            // Paint sine
            let wavAngle = 0;
            for(let x = heightCircleArea/2 + 2*radius; x < vPosGridSine.x; wavAngle++, x+=s.radians(1)*radius) {
                pPoint(s, x, heightCircleArea/2 - radius*Math.sin(s.radians(wavAngle)), styles.lineColor);  // sine
                pPoint(s, widthCircleArea/2 + radius*Math.cos(s.radians(wavAngle)), x, styles.lineColor);
            }
            if (s.radians(wavAngle)>Math.PI/2) {
                let pi2X = startGridSine+(Math.PI/2)*radius;
                pLineDashed(s, canvas, [5,5], pi2X, vCircle.y, pi2X, vCircle.y-radius, styles.coordSysColor);
                pLineDashed(s, canvas, [5,5], pi2X, vCircle.y-radius, startGridSine, vCircle.y-radius, styles.coordSysColor);
                pText(s, "π/2", pi2X, vCircle.y + 35, styles.textColor)       
            }
            if (s.radians(wavAngle)>Math.PI) {
                let piX = startGridSine + Math.PI * radius;
                pText(s, "π", piX, vCircle.y + 35, styles.textColor);
            }
            if (s.radians(wavAngle)>(3/2)*Math.PI) {
                let tpi2X = startGridSine + Math.PI * (3/2) * radius;
                pLineDashed(s, canvas, [5,5], tpi2X, vCircle.y + radius, startGridSine, vCircle.y+radius, styles.coordSysColor);
                pLineDashed(s, canvas, [5,5], tpi2X, vCircle.y, tpi2X, vCircle.y + radius, styles.coordSysColor);
                pText(s, "3π/2", tpi2X, vCircle.y - 35, styles.textColor);
            }
            if (s.radians(wavAngle)>2*Math.PI) {
                let tpiX = startGridSine + Math.PI * 2 * radius;
                pText(s, "2π", tpiX, vCircle.y + 35, styles.textColor);
            }

            // // Paine cosine
            // wavAngle = 0;
            // for(let x = widthCircleArea/2 + 2*radius; x < vPosGridCos.y; wavAngle++, y+=s.radians(1)*radius) {
            //     pPoint(s, widthCircleArea/2 + radius*Math.cos(s.radians(wavAngle)), y, styles.lineColor); // cosine
            // }

    
            angle++;
            if (vPosGridSine.x > width) {
                s.initConditions();
            }
        };
    };
    
    };
        
    let simpleOscCosSketch = 
            new p5(simpleOscCos(styles), 'simple-osc-cos-sketch');
        
        