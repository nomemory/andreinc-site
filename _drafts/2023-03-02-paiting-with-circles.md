---
title: "Painting with Circles, Epycicles and Fourier Transforms"
date: "2023-03-01"
classes: wide
usemathjax: true
custom-javascript-list:
    - "/assets/js/2023-03-02-paiting-with-circles/p5.min.js"
    - "/assets/js/2023-03-02-paiting-with-circles/commons.js"
    - "/assets/js/2023-03-02-paiting-with-circles/simplecircle.js"
    - "/assets/js/2023-03-02-paiting-with-circles/simplecirclerotating.js"
    - "/assets/js/2023-03-02-paiting-with-circles/simplecirclerotatingtriangle.js"
    - "/assets/js/2023-03-02-paiting-with-circles/rotatingpi.js"
    - "/assets/js/2023-03-02-paiting-with-circles/rotatingpiwpi.js"
comments: true
excerpt: "The nature of reality"
categories:
- "math"
tags:
- "fun"
---

# What is a Circle? (short math recap) 

Two thousand four hundred years ago, [Plato](https://en.wikipedia.org/wiki/Plato), the ancient Greek philosopher, extensively wrote about *The Circle* in his philosophical works. For him, the circle is the ultimate perfect shape because it is consistent and uniform in all directions. It's eternal because it closes and permanently opens without a beginning or an end. 

In this work [Timaeus](https://en.wikipedia.org/wiki/Timaeus_(dialogue)), he says:
* *"The circle symbolises eternity because it has no beginning or end."*
* *"God ever geometrizes."*

In his best well-known Socratic Dialogue, [The Republic](https://en.wikipedia.org/wiki/Republic_(Plato)), he emphasize:
* *"The circle symbolises unity and wholeness because all points on the circumference are equidistant from the centre."*

[Aristotle](https://en.wikipedia.org/wiki/Aristotle), a student of Plato, argued that the Circle was the basis for all the other geometrical figures. In a way, this is true. And this is what this article is all about. But, enough philosophy, and let's get back to basic mathematics.

The circle is (such) a *basic geometrical shape*, every human child should be able to recognise from a young age:

<div id="simple-circle-sketch"></div>

It has *center* point $$P(a,b)$$, and radius ($$r$$). That's it. Based on two attributes, we can define the following *equation* describing circles:

$$
\forall (x,y) \in \mathbb{R}^{2}, (x-a)^{2} + (y-b)^{2} = r^2 \\
\text{where a and b are the coordinates } \\
\text{of the centre of the Circle} 
$$

If we pick the circle's centre to be the centre of the [*Cartesian Grid*](https://en.wikipedia.org/wiki/Cartesian_coordinate_system) $$(a=0,b=0)$$, and the circle's radius to be $$1$$, the relationship becomes $$x^2 + y^2 = 1$$. This is the [*Unit Circle*](https://en.wikipedia.org/wiki/Unit_circle); each point is *one unit* away from the origin.

So (the unit) circle is composed of an infinity of dimensionless points $$P(x_{i}, y_{i})$$, for which their coordinates satisfy the simple *Pythagorean* condition: $$x_{i}^2 + y_{i}^2=1$$.

<div id="simple-circle-rotating-sketch"></div>
<sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/simplecirclerotating.js)</sup>

The key to the circle's symmetry stems from the fact that $$\forall x \in \mathbb{R}, x^{2} = (-x)^2$$, so every point is perfectly reflected on the *other side*, regardless of the *quadrant*. 

But speaking at Pythagoras, if we look closer at the *equation* defining the Circle, $$x^2 + y^2 = 1$$, we can intuitively feel there's a *strong connection* between this, the cartesian system, and the right triangle: what if $$x$$ and $$y$$ are the legs of the triangle, and the hypotenuse is $$1$$ (the radius). What it means is that we can *trap* an infinity of right triangles inside, and we also can define `sine` and `cosine` in relationship with the *Unit Circle*:

<div id="simple-circle-rotating-triangle-sketch"></div>
<sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/simplecirclerotatingtriangle.js)</sup>

Where:
* $$\theta$$ is the angle formed by the radius, $$r$$ and the $$x$$ axis, at every given point. 
* The `sine` function is defined as the y-coordinate of a point on the *Unit Circle*;
* The `cosine` function is the x-coordinate of the same point on the *Unit Circle*. 

As the point moves around the circle in a counterclockwise direction, the values of the `sine` and `cosine` functions change, creating a wave-like pattern, where *the motion* of the *wave* is created by the *pulsating radius* rotating clockwise.

> Because what happens on the circle stays on the circle, the equation $$x^2+y^2=1$$ is now equivalent to a fundamental trigonometrical identity: $$sin^2(x)+cos^2(x)=1$$, $$\forall (x,y) \in \mathbb{R}^{2}$$.

Defining `sine` and `cosine` in the context of a square triangle is limiting. What if the angle ($$\theta$$) becomes greater or equal to $$90^\circ$$? That doesn't make sense because we already have a $$90^\circ$$ angle... If we use the *Unit Circle* as the underlying foundation to think about the two functions, we don't have this problem anymore, our definition broadens, and `sine` and `cosine` suddenly make sense for $$\theta \geq 90^\circ$$. 

# The number PI

In practice, we rarely see angles expressed in degrees; usually, we represent them in relationship to the number $$\pi$$: $$\pi$$, $$\frac{\pi}{2}$$, $$\frac{\pi}{3}$$, $$\frac{\pi}{4}$$, etc. Take a look at the animation below:

$$\pi$$ (or `PI`) is the ratio of a circle's circumference to its diameter, and it approximates `π ≈ 3.14`.

<div id="rotating-PI-sketch"></div>

If we roll a *Unit Circle* over a *flat surface* (the $$x$$ axis), a complete rotation leaves a trail with its length equal to $$2*\pi$$. Unfortunately for us, $$\pi$$ is an [*irrational number*](https://en.wikipedia.org/wiki/Irrational_number); its decimal expansion never repeats or terminates. 

<div id="rotating-PI-w-PI-sketch"></div>

# Complex numbers and circles (short math recap)

Complex numbers, are numbers that consist of *real* part, and an imaginary part, usually written in the form $$a+b*i$$, where $$a, b \in \mathbb{R}$$, and $$i$$ is the imaginary unit, $$i^2=-1$$ (or, for the less rigourous, $$\sqrt{i}=-1$$).

Complex numbers can also be represented geometrically as points in the complex plane. The real part of a complex number corresponds to the $$x$$-coordinate of the point, while the imaginary part corresponds to the $$y$$-coordinate. 

# Waves and circles

Speaking of waves, they all come from circles.

<div id="circle-waves-sketch"></div>
<sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/circlewaves.js)</sup>
