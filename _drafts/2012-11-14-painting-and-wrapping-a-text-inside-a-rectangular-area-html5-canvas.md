---
title: "Painting and wrapping a text inside a rectangular area (html5 canvas)"
date: "2012-11-14"
categories: 
  - "javascripthtml"
tags: 
  - "canvas"
  - "html5"
  - "html5-canvas"
  - "javascript"
  - "measurtext"
  - "wrap"
  - "wrap-text"
  - "wrapp"
---

Recently I had a small requirement for a project I am currently working at in my spare time: centralize a text inside a given rectangular area (if I already know the x, y, w, h dimensions of the rectangle).

The main idea was to use the `context.measureText(text).width;` method, as it returns the width of the specified text in pixels - exactly what I needed.

Eventually I've came up with the following code:

/\*\*
 \* @param canvas : The canvas object where to draw . 
 \*                 This object is usually obtained by doing:
 \*                 canvas = document.getElementById('canvasId');
 \* @param x     :  The x position of the rectangle.
 \* @param y     :  The y position of the rectangle.
 \* @param w     :  The width of the rectangle.
 \* @param h     :  The height of the rectangle.
 \* @param text  :  The text we are going to centralize
 \*/
paint\_centered = function(canvas, x, y, w, h, text) {
    // The painting properties 
    // Normally I would write this as an input parameter
    var Paint = {
        RECTANGLE\_STROKE\_STYLE : 'black',
        RECTANGLE\_LINE\_WIDTH : 1,
        VALUE\_FONT : '12px Arial',
        VALUE\_FILL\_STYLE : 'red'
    }
    
    // Obtains the context 2d of the canvas 
    // It may return null
    var ctx2d = canvas.getContext('2d');
    
    if (ctx2d) {
        // draw rectangular
        ctx2d.strokeStyle=Paint.RECTANGLE\_STROKE\_STYLE;
        ctx2d.lineWidth = Paint.RECTANGLE\_LINE\_WIDTH;
        ctx2d.strokeRect(x, y, w, h);
        
        // draw text (this.val)
        ctx2d.textBaseline = "middle";
        ctx2d.font = Paint.VALUE\_FONT;
        ctx2d.fillStyle = Paint.VALUE\_FILL\_STYLE;
        // ctx2d.measureText(text).width/2 
        // returns the text width (given the supplied font) / 2
        textX = x+w/2-ctx2d.measureText(text).width/2;
        textY = y+h/2;
        ctx2d.fillText(text, textX, textY);
    } else {
        // Do something meaningful
    }
}

And I thought it was working perfectly:

window.onload = function() {
    // x y w h
    canvas = document.getElementById('c1');
    paint\_centered(canvas, 30, 20, 50, 30, "Test");
    paint\_centered(canvas, 30, 70, 80, 40, "Centered text doesn't get wrapped");
}   

... until I realized that I have to find a way to wrap the text inside. After some few refinements the new `paint_centered` method is:

/\*\*
 \* @param canvas : The canvas object where to draw . 
 \*                 This object is usually obtained by doing:
 \*                 canvas = document.getElementById('canvasId');
 \* @param x     :  The x position of the rectangle.
 \* @param y     :  The y position of the rectangle.
 \* @param w     :  The width of the rectangle.
 \* @param h     :  The height of the rectangle.
 \* @param text  :  The text we are going to centralize.
 \* @param fh    :  The font height (in pixels).
 \* @param spl   :  Vertical space between lines
 \*/
paint\_centered\_wrap = function(canvas, x, y, w, h, text, fh, spl) {
    // The painting properties 
    // Normally I would write this as an input parameter
    var Paint = {
        RECTANGLE\_STROKE\_STYLE : 'black',
        RECTANGLE\_LINE\_WIDTH : 1,
        VALUE\_FONT : '12px Arial',
        VALUE\_FILL\_STYLE : 'red'
    }
    /\*
     \* @param ctx   : The 2d context 
     \* @param mw    : The max width of the text accepted
     \* @param font  : The font used to draw the text
     \* @param text  : The text to be splitted   into 
     \*/
    var split\_lines = function(ctx, mw, font, text) {
        // We give a little "padding"
        // This should probably be an input param
        // but for the sake of simplicity we will keep it
        // this way
        mw = mw - 10;
        // We setup the text font to the context (if not already)
        ctx2d.font = font;
        // We split the text by words 
        var words = text.split(' ');
        var new\_line = words\[0\];
        var lines = \[\];
        for(var i = 1; i < words.length; ++i) {
           if (ctx.measureText(new\_line + " " + words\[i\]).width < mw) {
               new\_line += " " + words\[i\];
           } else {
               lines.push(new\_line);
               new\_line = words\[i\];
           }
        }
        lines.push(new\_line);
        // DEBUG 
        // for(var j = 0; j < lines.length; ++j) {
        //    console.log("line\[" + j + "\]=" + lines\[j\]);
        // }
        return lines;
    }
    // Obtains the context 2d of the canvas 
    // It may return null
    var ctx2d = canvas.getContext('2d');
    if (ctx2d) {
        // draw rectangular
        ctx2d.strokeStyle=Paint.RECTANGLE\_STROKE\_STYLE;
        ctx2d.lineWidth = Paint.RECTANGLE\_LINE\_WIDTH;
        ctx2d.strokeRect(x, y, w, h);
        // Paint text
        var lines = split\_lines(ctx2d, w, Paint.VALUE\_FONT, text);
        // Block of text height
        var both = lines.length \* (fh + spl);
        if (both >= h) {
            // We won't be able to wrap the text inside the area
            // the area is too small. We should inform the user 
            // about this in a meaningful way
        } else {
            // We determine the y of the first line
            var ly = (h - both)/2 + y + spl\*lines.length;
            var lx = 0;
            for (var j = 0, ly; j < lines.length; ++j, ly+=fh+spl) {
                // We continue to centralize the lines
                lx = x+w/2-ctx2d.measureText(lines\[j\]).width/2;
                // DEBUG 
                console.log("ctx2d.fillText('"+ lines\[j\] +"', "+ lx +", " + ly + ")");
                ctx2d.fillText(lines\[j\], lx, ly);
            }
        }
    } else {
    // Do something meaningful
    }
}

The new refined `paint_centered_wrap` method is more or less the same as the initial one (the logic is the same), but with one important addition: we split the text to be painted into an array of strings, each element of this array having it's width smaller than than the width of the rectangle. Take a look at the inner function called `split_lines` - that's the one responsible with the "intelligent" string splitting.

The results are now more or less as we expected:

window.onload = function() {
    // x y w h
    canvas = document.getElementById('c2');
    paint\_centered\_wrap(canvas, 30, 70, 100, 90, "Adon olam, asher malakh, bterem kol yetzir nivra", 12, 2);
}

<script>bpost__paint_centered = function(canvas, x, y, w, h, text) { // The painting properties // Normally I would write this as an input parameter var Paint = { RECTANGLE_STROKE_STYLE : 'black', RECTANGLE_LINE_WIDTH : 1, VALUE_FONT : '12px Arial', VALUE_FILL_STYLE : 'red' } // Obtains the context 2d of the canvas // It may return null var ctx2d = canvas.getContext('2d'); if (ctx2d) { // draw rectangular ctx2d.strokeStyle=Paint.RECTANGLE_STROKE_STYLE; ctx2d.lineWidth = Paint.RECTANGLE_LINE_WIDTH; ctx2d.strokeRect(x, y, w, h); // draw text (this.val) ctx2d.textBaseline = "middle"; ctx2d.font = Paint.VALUE_FONT; ctx2d.fillStyle = Paint.VALUE_FILL_STYLE; // ctx2d.measureText(text).width/2 // returns the text width (given the supplied font) / 2 textX = x+w/2-ctx2d.measureText(text).width/2; textY = y+h/2; ctx2d.fillText(text, textX, textY); } else { // Do something meaningful } } /** * @param canvas : The canvas object where to draw . * This object is usually obtained by doing: * canvas = document.getElementById('canvasId'); * @param x : The x position of the rectangle. * @param y : The y position of the rectangle. * @param w : The width of the rectangle. * @param h : The height of the rectangle. * @param text : The text we are going to centralize. * @param fh : The font height (in pixels). * @param spl : Vertical space between lines */ bpost__paint_centered_wrap = function(canvas, x, y, w, h, text, fh, spl) { // The painting properties // Normally I would write this as an input parameter var Paint = { RECTANGLE_STROKE_STYLE : 'black', RECTANGLE_LINE_WIDTH : 1, VALUE_FONT : '12px Arial', VALUE_FILL_STYLE : 'red' } /* * @param ctx : The 2d context * @param mw : The max width of the text accepted * @param font : The font used to draw the text * @param text : The text to be splitted into */ var split_lines = function(ctx, mw, font, text) { // We give a little "padding" // This should probably be an input param // but for the sake of simplicity we will keep it // this way mw = mw - 10; // We setup the text font to the context (if not already) ctx2d.font = font; // We split the text by words var words = text.split(' '); var new_line = words[0]; var lines = []; for(var i = 1; i < words.length; ++i) { if (ctx.measureText(new_line + " " + words[i]).width < mw) { new_line += " " + words[i]; } else { lines.push(new_line); new_line = words[i]; } } lines.push(new_line); // DEBUG // for(var j = 0; j < lines.length; ++j) { // console.log("line[" + j + "]=" + lines[j]); // } return lines; } // Obtains the context 2d of the canvas // It may return null var ctx2d = canvas.getContext('2d'); if (ctx2d) { // draw rectangular ctx2d.strokeStyle=Paint.RECTANGLE_STROKE_STYLE; ctx2d.lineWidth = Paint.RECTANGLE_LINE_WIDTH; ctx2d.strokeRect(x, y, w, h); // Paint text var lines = split_lines(ctx2d, w, Paint.VALUE_FONT, text); // Block of text height var both = lines.length * (fh + spl); if (both >= h) { // We won't be able to wrap the text inside the area // the area is too small. We should inform the user // about this in a meaningful way } else { // We determine the y of the first line var ly = (h - both)/2 + y + spl*lines.length; var lx = 0; for (var j = 0; j < lines.length; ++j, ly+=fh+spl) { // We continue to centralize the lines lx = x+w/2-ctx2d.measureText(lines[j]).width/2; // DEBUG console.log("ctx2d.fillText('"+ lines[j] +"', "+ lx +", " + ly + ")"); ctx2d.fillText(lines[j], lx, ly); } } } else { // Do something meaningful } } var $j = jQuery.noConflict(); $j(function(){ canvas = document.getElementById('c1'); bpost__paint_centered(canvas, 30, 20, 50, 30, "Test"); bpost__paint_centered(canvas, 30, 70, 80, 40, "Centered text doesn't get wrapped"); canvas2 = document.getElementById('c2'); bpost__paint_centered_wrap(canvas2, 30, 30, 100, 90, "Adon olam, asher malakh, bterem kol yetzir nivra", 12, 2); });</script>
