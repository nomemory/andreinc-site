---
title: "The sinusoidal tetris"
date: "2024-02-06"
classes: wide
usemathjax: false
usekatex: true
usep5js: true
custom-defer-javascript-list:
    - "/assets/js/2024-02-06-the-sinusoidal-tetris/tetris.js"
  
comments: true
excerpt: "A tetris game with a twist"
categories:
- "math"
tags:
- "fun"
- "games"

---

Let's play Tetris, but with a twist. No geometrical figures will *fall from the sky*. Instead, you control a [sinusoid](https://en.wikipedia.org/wiki/Sine_wave), defined by: $$f(x)=A*sin(\omega x + \varphi)$$:

<div id="tetris-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}/assets/js/2024-02-06-the-sinusoidal-tetris/tetris.js)</sup></sup>

Controls
* To increase the angular frequency, $$\omega$$, press: `s`;
* To decrease the angular frequency, $$\omega$$, press: `x`;
* To increase the amplitude, $$A$$, press: `a`;
* To decrease the amplitude, $$A$$, press: `z`;
* To increase the phase: $$\varphi$$, press: `q`;
* To decrease the phase: $$\varphi$$, press: `w`;
* To *drop* the sinusoid, press `p`;

To win, you need to survive. The $$\sum$$ of your sinusoids shouldn't spike outside the canvas. If you are a savant, you can compute the *Fourier Series* coefficients in your head and keep the signal at 0. Good luck! 

Remember, each time *you win some, you lose some*. Don't be a loser.

There's a heathen path of alternating phases; everything stagnates. Don't follow this path, or you will spend an eternity in boredom.

---

<sup>This game is a joke I put together during a weekend. I'm sorry for the graphics.</sup>

<sup>Playing on mobile it's not supported, you need to play it in a proper browser. I will add some on-screen buttons in the next *release*.</sup>