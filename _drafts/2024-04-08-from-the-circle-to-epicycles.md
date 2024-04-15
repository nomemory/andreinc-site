---
title: "From the Circle to Epicycles - A visual tutorial"
date: "2024-04-08"
classes: wide
usekatex: true
usep5js: true
custom-javascript-list:
    - "/assets/js/2023-03-02-paiting-with-circles/commons.js"
custom-defer-javascript-list:
    - "/assets/js/2023-03-02-paiting-with-circles/tetris.js"
    - "/assets/js/2023-03-02-paiting-with-circles/simplecircle.js"
    - "/assets/js/2023-03-02-paiting-with-circles/simplecirclerotating.js"
    - "/assets/js/2023-03-02-paiting-with-circles/simplecirclerotatingtriangle.js"
    - "/assets/js/2023-03-02-paiting-with-circles/rotatingpi.js"
    - "/assets/js/2023-03-02-paiting-with-circles/rotatingpiwpi.js"
    - "/assets/js/2023-03-02-paiting-with-circles/simpleosc.js"
    - "/assets/js/2023-03-02-paiting-with-circles/simpleosccos.js"
    - "/assets/js/2023-03-02-paiting-with-circles/sincosside.js"
    - "/assets/js/2023-03-02-paiting-with-circles/sineparity.js"
    - "/assets/js/2023-03-02-paiting-with-circles/cosineparity.js"
    - "/assets/js/2023-03-02-paiting-with-circles/sinusoids.js"
    - "/assets/js/2023-03-02-paiting-with-circles/onenegative.js"
    - "/assets/js/2023-03-02-paiting-with-circles/sumsimple.js"
    - "/assets/js/2023-03-02-paiting-with-circles/dropsinusoid.js"
    - "/assets/js/2023-03-02-paiting-with-circles/squarewave.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/simplecirclewithpi.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/imnum.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/triangleincircle.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/sincosside.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/sineparity.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/cosineparity.js"    
    # - "/assets/js/2023-03-02-paiting-with-circles/sumepi2.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/simpleyxplotsketch.js"
    # # - "/assets/js/2023-03-02-paiting-with-circles/someepis.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/aflower.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/renums.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/cmplxnums.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/simplerotatingcirclecmp.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/cmplrotation.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/threedcomplex.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/squarewavef.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/squarewavefsa0.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/squarewavean.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/squarewavebn.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/tightfourier.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/tightfourieravg.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/tighttriangle.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/pishift.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/tightsawtooth.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/theboxfunction.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/theboxfunctionft.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/fmachinery.js"

comments: true
excerpt: "The nature of reality"
categories:
- "math"
tags:
- "fun"
---

# The Circle

It all starts with *The Circle*:

<div id="simple-circle-sketch"></div>

The Circle is a geometrical figure with a center $$P(a, b)$$, and a radius $$r$$. It has the following associated equation:

$$
\forall (x,y) \in \mathbb{R}^{2}, (x-a)^{2} + (y-b)^{2} = r^2 
$$

If $$a=0, b=0$$ and $$r=1$$, the circle becomes less generic, so we call it *The Unit Circle*:

<div id="simple-circle-rotating-sketch"></div>

One could argue *The Circle* is the epitome of symmetry. Pick one point, $$A$$, then its reflection *on the other side*, $$A^{'}$$, and start rotating:

<div id="triangle-in-circle-sketch"></div>

What happens on *The Circle*, stays on *The Circle*.

# The number $$\pi$$

In practice, we rarely see angles expressed in degrees; usually, we represent them in relation to the number $$\pi$$: $$\pi$$, $$\frac{\pi}{2}$$, $$\frac{\pi}{3}$$, $$\frac{\pi}{4}$$, etc.; where $$\pi$$ (or `PI`) is the ratio of a circle's circumference to its diameter, and it approximates `π ≈ 3.14`.

But visually speaking *Who is $$\pi$$* ? If we roll a *Unit Circle* ($$r=1$$) on a flat surface (the $$x$$ axis), the trail (*perimeter*) will be $$2*\pi$$:

<div id="rotating-PI-sketch"></div>

If $$r \neq 1$$, the circle's perimeter is $$P=2\pi r$$, while the area is $$A=\pi r^2$$. Both $$A$$ and $$P$$ depend on $$\pi$$.

# Radians

The `radian` (or `rad`) is the *actual* unit we use to measure angles. An intimate relationship exists between the `radian` and the number $$\pi$$.

<div id="rotating-PI-w-PI-sketch"></div>

To transform an angle measured in degrees ($$360°$$) to radians, the algorithm is simple: we multiply the angle by $$\pi$$, then divide the result by $$180$$.


# The sine and the cosine

*The Circle* traps an infinity of *right triangles*. It also means we can define the *sine* and *cosine* in relationship with *The Unit Circle*:

<div id="simple-circle-rotating-triangle-sketch"></div>

* $$\theta$$ is the angle formed by the radius, $$r$$ and the $$x$$ axis, at every given point. 
* The `sine` function is defined as the y-coordinate of a point on the *Unit Circle*;
* The `cosine` function is the x-coordinate of the same point on the *Unit Circle*. 

In a way, $$\sin$$ (and $$\cos$$) *unrolls* the circle in/with time. 

Given the circle's symmetry, $$\sin$$ and $$\cos$$ are *periodic functions* with the period $$2\pi$$.

<div id="simple-osc-sketch"></div>

At this point, it will be unfair for $$\cos$$ not to plot it on the same graph:

<div id="simple-osc-cos-sketch"></div>

# The $$\cos$$ leads the $$\sin$$

If you look closely, you will soon realise that $$cos$$ and $$sin$$ are not that different:

$$
\sin(x+\frac{\pi}{2})=\cos(x)
$$

We say that $$\cos$$ leads the $$\sin$$ with $$\frac{\pi}{2}$$:

<div id="sin-cos-side-sketch"></div>

# The parity of $$\cos$$ and $$\sin$$

The *parity* of mathematical functions generally refers to whether a function is *even*, *odd*, or *neither*.

A function $$f(x)$$ is *even* if it satisfies a simple condition: $$f(x)=f(-x)$$, for all of its domain. From a geometrical standpoint, the function's graph is symmetric concerning the $$y$$ axis. 

A function $$f(x)$$ is *odd* if it satisfies the condition: $$-f(x)=f(-x)$$ for all the domain of $$f$$. Thus, the function is symmetrical with respect to the origin. 

The circle is the *essence* of symmetry, so we would typically expect that the *sine* and the *cosine* are *symmetrical* to... something.

The *cosine* is *even*, meaning $$\cos(x)=\cos(-x)$$:

<div id="cosine-parity-sketch"></div>

And the *sine* is odd, meaning $$\sin(-x)=-\sin(x)$$, or $$\sin(x)=-\sin(-x)$$:

<div id="sine-parity-sketch"></div>

# The sinusoid

Why don't we make the $$\sin$$ and $$\cos$$ more generic by introducing a few additional parameters that can alter their behavior:

Let's introduce $$y(t)$$, as a function of "time" where:

$$
y(t) = A * \sin(2\pi ft + \varphi) = A * \sin(\omega t + \varphi)
$$

* $$A$$ is called the *amplitude*, representing the maximum deviation of the function from zero.
* $$f$$ is called *ordinary frequency* and denotes the number of oscillations (the radius moving inside the circle) occurring each second.
* $$\omega=2\pi f$$ is called the *angular frequency*; it's the same thing as *ordinary frequency*, but we measure it $$\frac{radians}{second}$$;
* $$\varphi$$ is called *phase offset*; it's measured in radians.

If we consider *time* to be the $$x$$-axis, and $$y(t)$$ the $$y$$-axis, the sinusoid becomes:

$$
y=f(x)=A * sin(\omega x + \varphi)
$$

# Sinusoids are *flexible*

The following animation is interactive. You can choose the values of $$A=$$ 
    <select id="sinusoid_A" onchange="updateSinusoids()">
        <option value="0.5">0.5</option>
        <option value="1">1</option>
        <option value="1.5" selected>1.5</option>
        <option value="2">2</option>
    </select>
    , $$\omega=$$
        <select id="sinusoid_omega" onchange="updateSinusoids()">
        <option value="-2">-2</option>
        <option value="-1">-1</option>
        <option value="1">1</option>
        <option value="2" selected>2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
    </select> 
    and $$\varphi=$$ 
    <select id="sinusoid_phi" onchange="updateSinusoids()">
        <option value="0" selected>0</option>
        <option value="0.5">π/2</option>
        <option value="1">π</option>
        <option value="1.5">3π/2</option>
    </select> 
    to plot the sinusoid (if you pick $$\varphi=\frac{\pi}{2}$$ a cosine is plotted):

<div id="sinusoids-sketch"></div>

# Sinusoids can nullify themselves

Two sinusoids in phase and with the same amplitudes but opposite frequencies nullify themselves. 

<div id="one-negative-sketch"></div>

# Adding sinusoids leads to complexity

Let's plot two arbitrary selected sinusoids $$y_{1}(x)$$ and $$y_{2}(x)$$, where:
* $$y_{1}(x) = \frac{9}{10} * sin(7x + \frac{\pi}{2})$$, and 
* $$y_{2}(x) = \frac{12}{10} * sin(3x - 2)$$ .

The sum $$y(x)=y_{1}(x) + y_{2}(x)$$ already looks more "fascinating".

<div id="sum-simple-sketch"></div>

# Adding random sinusoids for fun

Let's add random sinusoids to an existing one (with $$A=1$$, $$\omega=1$$, $$\varphi=1$$)  and observe the *beautiful* patterns created:

<div id="drop-sinusoid-sketch"></div>

# Playing Sinusoidal tetris for fun

Not so long ago, [I've re-imagined the game of Tetris]({{site.url}}/2024/02/06/the-sinusoidal-tetris). It's now possible to play Tetris with Sinusoids:

[![img]({{site.url}}/assets/images/2024-04-08-from-the-circle-to-epicycles/sinusoida-tetris.png)]({{site.url}}/2024/02/06/the-sinusoidal-tetris)

# A square wave and sinusoids

We can even express "square waves" as a sum of sinusoids. Let's take, for example, the following formula:

$$
y(x) = \frac{4}{\pi}\sum_{k=1}^{\infty}\frac{sin(2\pi(2k-1)fx)}{2k-1}
$$

Don't worry if you feel the formula feels like it's being *parachuted* in the article. We will shortly see how we can rigorously determine it. But for the moment, accept it as it is.

If we expand it and use the angular frequency ($$\omega=2\pi f$$), we will obtain something like this:

$$
y(x) =  \underbrace{\frac{4}{\pi}sin(\omega x)}_{y_{1}(x)} + \underbrace{\frac{4}{3\pi}sin(3\omega x)}_{y_{2}(x)} + ... + \underbrace{\frac{4}{(2k-1)\pi}{sin((2k-1)\omega x)}}_{y_k(x)} + ...>
$$

$$y_1(x), y_2(x), y_3(x), ..., y_k(x)$$ are all the individual sinusoids with a life of their own. If we add them up, *a square wave* will "unfold" (a miracle!). The higher we pick $$k$$, the better the approximation.

Choose how many sinusoids you want to use, and let's see how the functions look like for <select id="numSins" onchange="updateSins()">
        <option value="1">k=1</option>
        <option value="2">k=2</option>
        <option value="3">k=3</option>
        <option value="4">k=4</option>
        <option value="7" selected>k=7</option>
        <option value="9">k=9</option>
        <option value="15">k=15</option>
        <option value="20">k=20</option>
    </select> (and $$\omega$$=<select id="sinsFreq" onchange="updateSins()">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
    </select>):

<div id="square-wave-sketch"></div>







