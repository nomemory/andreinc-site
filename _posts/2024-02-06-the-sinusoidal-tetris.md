---
title: "The sinusoidal tetris"
date: "2024-02-06"
classes: wide
usemathjax: false
usekatex: true
usep5js: true
custom-defer-javascript-list:
    - "/assets/js/2024-02-06-the-sinusoidal-tetris/tetris.js"
custom-css-list:
    - "/assets/css/2024-02-06-the-sinusoidal-tetris/tetris.css"
comments: true
excerpt: "A tetris game with a twist"
categories:
- "math"
tags:
- "fun"
- "games"

---

Let's play Tetris, but with a twist. No geometrical figures will *fall from the sky*. Instead, you control a [sinusoid](https://en.wikipedia.org/wiki/Sine_wave), defined by: $$f(x)=A*sin(\omega x + \varphi)$$:

|--|--|
| <input type="checkbox" id="suggestions" name="suggestions" value="yes" checked> | Free suggestions in the beginning. If you follow all of them, you win. |
| <input type="checkbox" id="turnBased" name="turnBased" value="no"> | Turn-Based Mode (the sinusoid doesn't drop automatically) |

---

|--|--|
| <input type="checkbox" id="suggestions" name="suggestions" value="yes" checked> | Free suggestions in the beginning. If you follow all of them, you win. |
| <input type="checkbox" id="turnBased" name="turnBased" value="no"> | Turn-Based Mode (the sinusoid doesn't drop automatically) |


<div id="tetris-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}/assets/js/2024-02-06-the-sinusoidal-tetris/tetris.js)</sup></sup>

---

Controls
* To increase the angular frequency, $$\omega$$, press: `s`;
* To decrease the angular frequency, $$\omega$$, press: `x`;
* To increase the amplitude, $$A$$, press: `a`;
* To decrease the amplitude, $$A$$, press: `z`;
* To increase the phase: $$\varphi$$, press: `q`;
* To decrease the phase: $$\varphi$$, press: `w`;
* To *drop* the sinusoid, press `p`;

---

To win the game, you need to reduce the signal as close to zero as possible. It's hard but not impossible. There's a current threshold of `unit * 0.3`. Surviving is not winning. The *Path of the Alternating Phases* is boredom.

You lose if the original signal spikes outside the game buffer (canvas).

A professional player turns off the suggestions, now enabled by default. If you are a savant, you can compute the [*Fourier Series Coefficients*](https://en.wikipedia.org/wiki/Fourier_series) in your head. Cancel that noise!

--- 

The game was developed using [p5js](https://p5js.org/).

The source code [(here)]({{site.url}}/assets/js/2024-02-06-the-sinusoidal-tetris/tetris.js) is not something I am particularly proud of. 

---

Some discussion from around the web:

* [Hacker News](https://news.ycombinator.com/item?id=39275715)
* [Lobste.rs](https://lobste.rs/s/h1y3ql/sinusoidal_tetris)
* [Museum Of Screens](https://museumofscreens.wordpress.com/2024/02/07/web-game-of-the-day-sinusoidal-tetris/)
* [hackaday - tetris goes full circle](khttps://hackaday.com/2024/02/07/tetris-goes-full-circle/#comments)
* [microsiervos](https://www.microsiervos.com/archivo/juegos-y-diversion/tetris-sinusoidal-existe-encanto-matematicamente-especial.html)

---

<sup>This game is a joke I put together during a weekend. I'm sorry for the graphics.</sup>