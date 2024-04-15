// const imNum = (styles) => {

// const gridStep = 20;
// const rndOffset = 100;

// return (s) => {
//     s.setup = () => { 
//         const canvas = s.createCanvas(styles.canvasX, styles.canvasY); 
//         canvas.parent('in-num-sketch');
        
//         s.textFont(styles.textFont);
//         s.setAttributes('antialias', true);
//         s.frameRate(styles.frameRate);
//     };

//     s.draw = () => {
//         s.background(styles.bkgColor);
//         let vCenter = s.createVector(styles.canvasX/2, styles.canvasY/2);
//         paintGrid(s, styles.canvasX, 
//                      styles.canvasY, 
//                      styles.coordSysColor, 
//                      styles.gridColor, 
//                      vCenter, 
//                      styles.textSize, 
//                      gridStep,
//                      "Re",
//                      "Im");
        
//         let vRandVect = s.createVector(
//             s.random(rndOffset, styles.canvasX-rndOffset), 
//             s.random(rndOffset, styles.canvasY-rndOffset)
//         );
//         let vRandVectProjRe = s.createVector(vRandVect.x, vCenter.y);
//         let vRandVectProjIm = s.createVector(vCenter.x, vRandVect.y);            
        
//         // Num
//         let vRandVectXLabel = ((vRandVect.x-vCenter.y)/(2*gridStep)).toFixed(2);
//         let vRandVectYLabel = ((vCenter.x-vRandVect.y)/(2*gridStep)).toFixed(2);
        
//         pText(s, "(" + vRandVectXLabel + "," + vRandVectYLabel +")", vRandVect.x, vRandVect.y, styles.lineColor);

//         pLine(s, vCenter.x, vCenter.y, vRandVect.x, vRandVect.y, styles.lineColor);
//         pLine(s, vRandVect.x, vRandVect.y, vRandVectProjIm.x, vRandVectProjIm.y, styles.imColor); // im!!
//         pLine(s, vRandVect.x, vRandVect.y, vRandVectProjRe.x, vRandVectProjRe.y, styles.reColor); // re
//         pauseLoop(s, true, 0, styles.frameRate, 4000);                     
//     }
// };

// };

// let imNumSketch = new p5(imNum(styles), 'in-num-sketch');