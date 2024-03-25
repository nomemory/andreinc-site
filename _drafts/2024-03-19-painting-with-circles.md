---
title: "Painting with Circles, Epycicles and Fourier Transforms"
date: "2024-03-19"
classes: wide
usemathjax: false
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
    - "/assets/js/2023-03-02-paiting-with-circles/simplecirclewithpi.js"
    - "/assets/js/2023-03-02-paiting-with-circles/imnum.js"
    - "/assets/js/2023-03-02-paiting-with-circles/triangleincircle.js"
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
    - "/assets/js/2023-03-02-paiting-with-circles/sumepi2.js"
    - "/assets/js/2023-03-02-paiting-with-circles/simpleyxplotsketch.js"
    # # - "/assets/js/2023-03-02-paiting-with-circles/someepis.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/aflower.js"
    - "/assets/js/2023-03-02-paiting-with-circles/renums.js"
    - "/assets/js/2023-03-02-paiting-with-circles/cmplxnums.js"
    - "/assets/js/2023-03-02-paiting-with-circles/simplerotatingcirclecmp.js"
    - "/assets/js/2023-03-02-paiting-with-circles/cmplrotation.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/threedcomplex.js"
    - "/assets/js/2023-03-02-paiting-with-circles/squarewavef.js"
    - "/assets/js/2023-03-02-paiting-with-circles/squarewavefsa0.js"
    - "/assets/js/2023-03-02-paiting-with-circles/squarewavean.js"
    - "/assets/js/2023-03-02-paiting-with-circles/squarewavebn.js"
    - "/assets/js/2023-03-02-paiting-with-circles/tightfourier.js"
    - "/assets/js/2023-03-02-paiting-with-circles/tightfourieravg.js"
    - "/assets/js/2023-03-02-paiting-with-circles/tighttriangle.js"
    - "/assets/js/2023-03-02-paiting-with-circles/pishift.js"
    - "/assets/js/2023-03-02-paiting-with-circles/tightsawtooth.js"
    - "/assets/js/2023-03-02-paiting-with-circles/theboxfunction.js"
    - "/assets/js/2023-03-02-paiting-with-circles/theboxfunctionft.js"
    - "/assets/js/2023-03-02-paiting-with-circles/fmachinery.js"

comments: true
excerpt: "The nature of reality"
categories:
- "math"
tags:
- "fun"
---

# Disclaimer

I began working on this article almost one year ago (on and off) in my (now) limited spare time. Inspired by [this video](https://www.youtube.com/watch?v=r6sGWTCMz2k), and having my *math passion* re-ignited, I planned to draw some epicycles and be done with it. Applying the formulas is simple, so I assumed I would finish fast and jump into a different rabbit hole. But then I decided to write a more extensive article, sharing my findings, creating the visuals I never had, and hopefully coming up with something more original than drawing Homer Simpson with circles.


# What is a Circle? (short math recap) 

Over ~~a hundred~~ thousand years ago, [Plato](https://en.wikipedia.org/wiki/Plato), the ancient Greek philosopher, extensively wrote about *The Circle* in his philosophical works. For him, the circle is the ultimate perfect shape because it is consistent and uniform in all directions. It's eternal because it closes and permanently opens without a beginning or an end. In this work, [Timaeus](https://en.wikipedia.org/wiki/Timaeus_(dialogue)), Plato says: *"The circle symbolises eternity because it has no beginning or end"*.

In his best well-known Socratic Dialogue, [The Republic](https://en.wikipedia.org/wiki/Republic_(Plato)), he emphasises: *"The circle symbolises unity and wholeness because all points on the circumference are equidistant from the centre."* [Aristotle](https://en.wikipedia.org/wiki/Aristotle), a student of Plato, argued that the Circle was the basis for all the other geometrical figures. He was right, but in a subtler way than you (and him) would normally expect. 

And then there are the mystics; let me tell you, mystics love *circles* just as much mathematicians do. 

In Hinduism and Buddhism, [the mandalas](https://en.wikipedia.org/wiki/Mandala) are intricate geometric designs in the shape of a *circle*; they represent unity, wholeness, and the Universe. 

![img]({{site.url}}/assets/images/2023-07-02-painting-with-circles/mandala.png) 
<sub><sub>Mandala by [i-am-courtney](https://www.deviantart.com/i-am-courtney/gallery)</sub></sub>

Native American cultures use [*Sacred Circles*](https://www.inspirationforthespirit.com/native-american-symbolic-circles/) (or *Medicine Wheels*) as ceremonial structures consisting of a *circular* alignment of rocks, representing life and the interconnectedness of all things. 

![img]({{site.url}}/assets/images/2023-07-02-painting-with-circles/medicinewheel.jpg)
<sub><sub>Medicine Wheel Park, Valley City, ND</sub><sub>

[The Ouroboros](https://en.wikipedia.org/wiki/Ouroboros) is an ancient symbol depicting a dragon eating its own tail (recursion :P), forming a *circle*. It represents renewal and eternal life, death, and rebirth. 

![img]({{site.url}}/assets/images/2023-07-02-painting-with-circles/Chrysopoea_of_Cleopatra_1.png)
<sub><sub>Image from Chrysopoeia of [Cleopatra](https://en.wikipedia.org/wiki/Cleopatra_the_Alchemist)</sub></sub>

In [Zen](https://en.wikipedia.org/wiki/Zen) Buddhism, the *Ensō* symbolizes absolute illumination, elegance, the Universe, and the void ([mu](https://en.wikipedia.org/wiki/Mu_(negative))). 

![img]({{site.url}}/assets/images/2023-07-02-painting-with-circles/Enso.jpg)
<sub><sub>Enso, [Kanjuro Shibata XX](https://en.wikipedia.org/wiki/Kanjuro_Shibata_XX)</sub></sub>

And then there's nature, which loves circles in a way that is not obvious, but there are [helices](https://en.wikipedia.org/wiki/Helix) everywhere, especially if you study ["low level" biology](https://en.wikipedia.org/wiki/Nucleic_acid_double_helix).

But, enough philosophical and mystical speculation, let's get back to basic mathematics. Illuminated or not, I suppose everyone knows what a circle is:

<div id="simple-circle-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/simplecircle.js)</sup></sup>

It's a geometric figure with a *center* point $$P(a,b)$$, and radius ($$r$$). Nothing more, nothing less. Based on this, we can come up with a *numeric definition* for the culprit:

$$
\forall (x,y) \in \mathbb{R}^{2}, (x-a)^{2} + (y-b)^{2} = r^2 \\
\text{where a and b are the coordinates } \\
\text{of the centre of the Circle} 
$$

If we pick the circle's centre as the centre of the [*Cartesian Grid*](https://en.wikipedia.org/wiki/Cartesian_coordinate_system) $$(a=0,b=0)$$, and the circle's radius to be $$1$$, the relationship becomes $$x^2 + y^2 = 1$$. This is the [*Unit Circle*](https://en.wikipedia.org/wiki/Unit_circle), where each point is *one unit* away from the origin (centre).

So (the unit) circle is composed of an infinity of dimensionless points $$P(x_{i}, y_{i})$$, for which their coordinates satisfy the simple *Pythagorean* condition: $$x_{i}^2 + y_{i}^2=1$$.

<div id="simple-circle-rotating-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/simplecirclerotating.js)</sup></sup>

The key to the circle's symmetry stems from the fact that $$\forall x \in \mathbb{R}, x^{2} = (-x)^2$$, so every point is perfectly reflected on the *other side*, regardless of the *quadrant*:

<div id="triangle-in-circle-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/triangleincircle.js)</sup></sup>

For example, if a take a point $$A(x,y)$$, its reflection on the other side (the opposite quadrant) will be $$A^{'}(-x, -y)$$. Because $$x^2+y^2=(-x)^2 + (-y)^2$$, then we can say that both $$A$$ and $$A^{'}$$ are on the same circle. Pick two symmetrical points, rotate them around, and you will obtain a circle. *Opposition creates symmetry*. 

But speaking of Pythagoras, if we look closer at the *equation* defining the Circle, $$x^2 + y^2 = 1$$, we can intuitively feel there's a *strong connection* between this, the cartesian system, and the right triangle: what if $$x$$ and $$y$$ are the legs of the triangle, and the hypotenuse is $$1$$ (hypotenuse == radius)?

This means we can *trap* an infinity of right triangles inside a circle. To make things simpler, we also can define `sine` and `cosine` in relationship with the *Unit Circle*:

<div id="simple-circle-rotating-triangle-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/simplecirclerotatingtriangle.js)</sup></sup>

Where:
* $$\theta$$ is the angle formed by the radius, $$r$$ and the $$x$$ axis, at every given point. 
* The `sine` function is defined as the y-coordinate of a point on the *Unit Circle*;
* The `cosine` function is the x-coordinate of the same point on the *Unit Circle*. 

As the point moves around the circle in a counterclockwise direction, the values of the `sine` and `cosine` functions change, creating a wave-like pattern, where *the wave's motion* is created by the *pulsating radius* rotating clockwise.

> Because what happens on the circle stays on the circle, the equation $$x^2+y^2=1$$ is now equivalent to a fundamental trigonometrical identity: $$sin^2(x)+cos^2(x)=1$$, $$\forall (x,y) \in \mathbb{R}^{2}$$.

Defining `sine` and `cosine` in the context of a square triangle is limiting. What if the angle ($$\theta$$) becomes greater or equal to $$90^\circ$$? That doesn't make sense because we already have a $$90^\circ$$ angle... 

If we use the *Unit Circle* as the underlying foundation to think about the two functions, we no longer have this problem. Our definition broadens, and `sine` and `cosine` suddenly make sense for $$\theta \geq 90^\circ$$. 

# Radians and the number $$\pi$$

> Have you ever wondered why do we use $$360°$$, and not another number? What makes $$360°$$ special, compared to, let's say, $$800°$$? Here are some potential [answers](https://hsm.stackexchange.com/questions/1884/origin-of-360-degrees).

In practice, we rarely see angles expressed in degrees; usually, we represent them in relation to the number $$\pi$$: $$\pi$$, $$\frac{\pi}{2}$$, $$\frac{\pi}{3}$$, $$\frac{\pi}{4}$$, etc.; where $$\pi$$ (or `PI`) is the ratio of a circle's circumference to its diameter, and it approximates `π ≈ 3.14`. The `radian` (or `rad`) is the *actual* unit we use to measure angles. An intimate relationship exists between the `radian` and the number $$\pi$$.

Unfortunately for us, $$\pi$$ is *irrational*, meaning its decimal expansion never repeats or terminates. You cannot express $$\pi$$ as a ratio between two numbers. $$\pi$$ is endless. In this regard, it's scary to think we can only approximate the area or the length of a circle up to a certain decimal point; but don't worry, there are no perfect circles in the material universe, and if there are, we won't be able to tell for sure - *infinity* is disarming. 

To better understand "what is $$\pi$$?", let's look at the following animation. If we roll a *Unit Circle* over a *flat surface* (the $$x$$ axis), a complete rotation leaves a trail with a length equal to $$2*\pi$$. 

If we roll a circle with a $$radius \neq 1$$ instead, the trail (*perimeter*) will be $$2*\pi*r$$ (where $$r$$ is the radius).

<div id="rotating-PI-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/rotatingpi.js)</sup></sup>

So, the angles expressed in degrees can also be described by the circle's *rolling projection* on the $$x$$ axis. The following animation is interactive; hold the mouse pressed in the middle of the circle and move it left or right to see the correspondence between radians and degrees:

<div id="rotating-PI-w-PI-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/rotatingpiwpi.js)</sup></sup>

To transform an angle measured in degrees ($$360°$$) to radians, the algorithm is simple: we multiply the angle by $$\pi$$, and then we divide the result by $$180$$. To transform back an angle measured from radians to degrees, we do the inverse operations, multiply the angle by $$180$$, and divide everything by $$\pi$$.
If we put all the information back into *The Unit Circle* animation, things are going to look like this:

<div id="simple-circle-with-pi-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/simplecirclewithpi.js)<sup></sup>

<table>
    <tr>
        <td> 
            <table>
                <thead>
                    <tr>
                        <td>$$\theta^\circ$$</td>
                        <td>$$\theta$$</td>
                        <td>$$sin(\theta)$$</td>
                        <td>$$cos(\theta)$$</td>
                    </tr>
                </thead>
                <tbody>
                    <tr id="angle_30">
                        <td>$$30^\circ$$</td>
                        <td>$$\frac{\pi}{6}$$</td>                       
                        <td>$$\frac{1}{2}$$</td>
                        <td>$$\frac{\sqrt{3}}{2}$$</td>
                    </tr>
                    <tr id="angle_45">
                        <td>$$45^\circ$$</td>
                        <td>$$\frac{\pi}{4}$$</td>
                        <td>$$\frac{\sqrt{2}}{2}$$</td>
                        <td>$$\frac{\sqrt{2}}{2}$$</td>
                    </tr>
                    <tr id="angle_60">
                        <td>$$60^\circ$$</td>
                        <td>$$\frac{\pi}{3}$$</td>
                        <td>$$\frac{\sqrt{3}}{2}$$</td>
                        <td>$$\frac{1}{2}$$</td>
                    </tr>
                    <tr id="angle_90">
                        <td>$$90^\circ$$</td>
                        <td>$$\frac{\pi}{2}$$</td>
                        <td>$$1$$</td>
                        <td>$$0$$</td>
                    </tr>                       
                </tbody>
            </table>                    
        </td>
         <td> 
            <table>
                <thead>
                    <tr>
                        <td>$$\theta^\circ$$</td>
                        <td>$$\theta$$</td>
                        <td>$$sin(\theta)$$</td>
                        <td>$$cos(\theta)$$</td>
                    </tr>
                </thead>
                <tbody>
                    <tr id="angle_120">
                        <td>$$120^\circ$$</td>
                        <td>$$\frac{2\pi}{3}$$</td>
                        <td>$$\frac{\sqrt{3}}{2}$$</td>
                        <td>$$-\frac{1}{2}$$</td>
                    </tr>
                    <tr id="angle_135">
                        <td>$$135^\circ$$</td>
                        <td>$$\frac{3\pi}{4}$$</td>
                        <td>$$\frac{\sqrt{2}}{2}$$</td>
                        <td>$$-\frac{\sqrt{2}}{2}$$</td>
                    </tr>
                    <tr id="angle_150">
                        <td>$$150^\circ$$</td>
                        <td>$$\frac{5\pi}{6}$$</td>
                        <td>$$\frac{1}{2}$$</td>
                        <td>$$-\frac{\sqrt{3}}{2}$$</td>
                    </tr>
                    <tr id="angle_180">
                        <td>$$180^\circ$$</td>
                        <td>$$\frac{\pi}{1}$$</td>
                        <td>$$0$$</td>
                        <td>$$-1$$</td>
                    </tr>
                </tbody>
            </table>                                           
        </td>
        <td>
            <table>
                <thead>
                    <tr>
                        <td>$$\theta^\circ$$</td>
                        <td>$$\theta$$</td>
                        <td>$$sin(\theta)$$</td>
                        <td>$$cos(\theta)$$</td>
                    </tr>
                </thead>
                <tbody>
                    <tr id="angle_210">
                        <td>$$210^\circ$$</td>
                        <td>$$\frac{7\pi}{6}$$</td>
                        <td>$$-\frac{1}{2}$$</td>
                        <td>$$-\frac{\sqrt{3}}{2}$$</td>
                    </tr>
                    <tr id="angle_225">
                        <td>$$225^\circ$$</td>
                        <td>$$\frac{5\pi}{4}$$</td>
                        <td>$$-\frac{\sqrt{2}}{2}$$</td>
                        <td>$$-\frac{\sqrt{2}}{2}$$</td>
                    </tr>
                    <tr id="angle_240">
                        <td>$$240^\circ$$</td>
                        <td>$$\frac{4\pi}{3}$$</td>
                        <td>$$-\frac{\sqrt{3}}{2}$$</td>
                        <td>$$-\frac{1}{2}$$</td>
                    </tr>
                    <tr id="angle_270">
                        <td>$$270^\circ$$</td>
                        <td>$$\frac{3\pi}{2}$$</td>
                        <td>$$-1$$</td>
                        <td>$$0$$</td>
                    </tr>
                </tbody>
            </table>                    
        </td>
        <td> 
            <table>
                <thead>
                    <tr>
                        <td>$$\theta^\circ$$</td>
                        <td>$$\theta$$</td>
                        <td>$$sin(\theta)$$</td>
                        <td>$$cos(\theta)$$</td>
                    </tr>
                </thead>
                <tbody>
                    <tr id="angle_300">
                        <td>$$300^\circ$$</td>
                        <td>$$\frac{\pi}{6}$$</td>
                        <td>$$-\frac{\sqrt{3}}{2}$$</td>
                        <td>$$\frac{1}{2}$$</td>
                    </tr>
                    <tr id="angle_315">
                        <td>$$315^\circ$$</td>
                        <td>$$\frac{5\pi}{3}$$</td>
                        <td>$$-\frac{\sqrt{2}}{2}$$</td>
                        <td>$$\frac{\sqrt{2}}{2}$$</td>
                    </tr>
                    <tr id="angle_330">
                        <td>$$330^\circ$$</td>
                        <td>$$\frac{11\pi}{4}$$</td>
                        <td>$$-\frac{1}{2}$$</td>
                        <td>$$\frac{\sqrt{3}}{2}$$</td>
                    </tr>
                    <tr id="angle_360">
                        <td>$$360^\circ$$</td>
                        <td>$$\frac{2\pi}{1}$$</td>
                        <td>$$0$$</td>
                        <td>$$1$$</td>
                    </tr>
                </tbody>
            </table>                    
        </td>                
    </tr>
</table>

If you like math, it is good you memorise the values. If not, they can easily be determined.

# A look into sine and cosine functions

The *moving* radius inside the Unit Circle is the *moving element* that helps us plot the $$sin$$ function. Sine is like a wave that oscillates in the interval $$[-1, 1]$$, from $$-\infty$$ to $$\infty$$, regardless of the input. In a way, $$sine$$ *unrolls* the circle in/with time. Given the circle's symmetry, sine is a *periodic function* that repeats every $$2\pi$$ unit. 

<div id="simple-osc-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/simpleosc.js)</sup></sup>

At this point, it will be unfair for cosine not to plot it on the same graph:

<div id="simple-osc-cos-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/simpleosccos.js)</sup></sup>

If you put $$sin$$ and $$cos$$ on the same graph, you will soon realise they are not so different; they are almost the same function, with a phase shift between them.

So, if we have this relationship $$sin(x + a) = cos(a)$$, which we know is true $$\forall a$$, how do we find $$x$$? There's a visual solution to this, but we can also use a simple trigonometrical identity to find the answer.

We do know that $$sin(x+a)= sin(x)*cos(a)+ cos(x)*sin(a)$$. Thus our equation becomes: $$cos(a)=sin(x)*cos(a) + cos(x)*sin(a)$$.

But we know this is true, no matter how we pick $$a$$. So why don't we pick $$a=0$$ ($$sin(0)=0$$ and $$cos(0)=1$$). Replacing this in our equation, we obtain $$1=sin(x)$$.

Now, let's choose $$a=\frac{\pi}{2}$$, then our relationship becomes, $$cos(\frac{\pi}{2})=sin(x)*cos(\frac{\pi}{2})+cos(x)*sin(\frac{\pi}{2})$$, which is equivalent to: $$0=cos(x)$$. 

The $$x$$ for which $$sin(x)=1$$ and $$cos(x)=1$$ is $$x=\frac{\pi}{2}$$. Sorry $$cos$$, you are not very original, because $$sin(a+\frac{\pi}{2})=cos(a)$$... it's only a phase, they say. Remember I've told you sine and cosine are periodic functions, so there are multiple solutions for $$x$$. To generalize further we can say that $$sin(a+\underbrace{(\frac{\pi}{2}+2k\pi)}_{x})=sin(a+\frac{\pi}{2})=cos(a)$$, $$\forall k \in \mathbb{Z}$$.

This is, of course, obvious if we plot the functions side by side:

<div id="sin-cos-side-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/sincosside.js)</sup></sup>

Because the cosine function has a small headstart ($$\frac{\pi}{2}$$) to the sine function, it's said that the *cosine leads the sine*, or that *sine lags the cosine*. Whenever we refer to a *sinusoid*, we mean both sine and cosine (without discrimination). I insist on this concept, because later in the article you will see *cosine* used as a *sinusoid*, so don't expect naming it a *cosinusoid* because such things don't exist, mathematically speaking. 

> *In a world of sines, always struggle to be the cosine!*

# The parity of the sine and cosine functions

The *parity* of mathematical functions generally refers to whether a function is *even*, *odd*, or *neither*. If it's *even* or *odd*, it has a few remarkable properties that can be useful in various contexts, especially in mathematical analysis (or calculus).

A function $$f(x)$$ is *even* if it satisfies a simple condition: $$f(x)=f(-x)$$, for all of its domain. From a geometrical standpoint, the function's graph is symmetric concerning the $$y$$ axis. For example, $$f(x)=x^2$$ is even.

A function $$f(x)$$ is *odd* if it satisfies the condition: $$-f(x)=f(-x)$$ for all the domain of $$f$$. Thus, the function is symmetrical with respect to the origin. For example, $$f(x)=x^3$$ is odd.

Following the same idea, $$f(x)=x+\pi$$ is neither odd nor even.

On the other hand, we've said the circle is the *essence* of symmetry, so we would typically expect that the *sine* and the *cosine* are *symmetrical* to... something.

Well, the intuition is correct. The *cosine* is *even*, meaning $$cos(x)=cos(-x)$$:

<div id="cosine-parity-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/cosineparity.js)</sup></sup>

And the *sine* is odd, meaning $$sin(-x)=-sin(x)$$, or $$sin(x)=-sin(-x)$$:

<div id="sine-parity-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/sineparity.js)</sup></sup>

# "Customising" the sine function (sinusoids)

As Software Engineers, our first reflex is to make our code more extensible and customizable, so why don't we introduce a few more parameters to our sine function so that we can "control" its behavior further?

So why don't we introduce $$y(t)$$, as a function of "time" where:

$$y(t) = A * sin(2\pi ft + \varphi) = A * sin(\omega t + \varphi)$$

This function is called a *sinusoidal wave*, or simply a *sinusoid*, and it often occurs in physics (and mathematics), engineering and signal processing. Altering the function's parameters alters its representation on the Cartesian Grid.

But speaking of params:
* $$A$$ is called the *amplitude*, representing the maximum deviation of the function from zero. The deviation can be both negative and positive.
* $$f$$ is called *ordinary frequency* (not in a derogatory way) and denotes the number of oscillations (the radius moving inside the circle) occurring each second.
* $$\omega=2\pi f$$ is called the *angular frequency*, it's the same thing as *ordinary frequency* but it's expressed in $$\frac{radians}{second}$$;
* $$\varphi$$ is called *phase* (measured in radians);

If we consider *time* to be the x-axis, the sinusoid becomes:

$$y=f(x)=A * sin(\omega x + \varphi)$$

If we pick $$A=1$$, and $$\omega=1$$ (and $$\varphi=0$$ or $$\varphi=\frac{\pi}{2}$$) we get our $$sin$$ and $$cos$$ functions back. But in the name of science, let's see how our *sinusoid* behaves under different circumstances. 

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
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/sinusoids.js)</sup></sup>

Observations:
* The value of $$A$$ corresponds to the radius of the circle *generating* the oscilation. If we increase the amplitutde we increase the radius of the circle;
* By increasing $$\omega$$ more "waves" will be squeezed together inside the $$2\pi$$ interval than for a normal sine/cosine wave.
* By setting $$\varphi=\frac{\pi}{2}$$ the sine becomes a cosine.

Even if it's counterintuitive from a physical sense, frequencies can have negative values. A positive angular frequency ($$\omega>0$$) is associated with counterclockwise rotation, while a negative angular frequency ($$\omega<0$$) will result in a clockwise rotation. The magnitude of the angular frequency determines the speed of rotation, and its sign determines the direction.

For example, two sinusoids in phase and with the same amplitudes but opposite frequencies nullify themselves. 

<div id="one-negative-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/onenegative.js)</sup></sup>

This can also be explained by the fact *sine* is an odd function, so that $$sin(x) = -sin(-x)$$ and $$-sin(x)=sin(-x)$$.

# Adding sinusoids

At this point, things will become more fascinating. If you start summing up sinusoids, new oscillating patterns will appear. The more sinusoids we sum up, the more complex the patterns will be. If we have enough sinusoids around to play, we can start "painting" (approximating) real-world shapes. 

Philosophically speaking, if we have an infinity of sinusoids at our disposal, and with just a little mathematical imagination, we can "draw" exactly everything (*there's a catch to it!*). And remember, it all started with the circle; maybe Aristotle was right.

But let's take it slowly and sum up a few sinusoids to see what's happening. Visually speaking, adding two sinusoids is just like adding two "normal" mathematical functions. 


So let's plot two arbitrary selected sinusoids $$y_{1}(x)$$ and $$y_{2}(x)$$, where:
* $$y_{1}(x) = \frac{9}{10} * sin(7x + \frac{\pi}{2})$$, and 
* $$y_{2}(x) = \frac{12}{10} * sin(3x - 2)$$ .

The sum $$y(x)=y_{1}(x) + y_{2}(x)$$ already looks more "fascinating".

<div id="sum-simple-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/sumsimple.js)</sup></sup>

To make it easier to visualize, let's add random sinusoids to an existing one (with $$A=1$$, $$\omega=1$$, $$\varphi=1$$)  and observe the *beautiful* patterns that are created:


<div id="drop-sinusoid-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/dropsinusoid.js)</sup></sup>

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
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/squarewave.js)</sup></sup>

Except for those small overshoot "spikes" at the corners of the square ([Gibbs phenomenon](https://en.wikipedia.org/wiki/Gibbs_phenomenon)), adding more sinusoids in the picture makes the "square" approximation more convincing. The reason for this phenomenon stems from the fact that a "jumping" function is hard to approximate using a "smooth" and "tame" sinusoid.

Pick <select id="sumEpiSins" onchange="updateSumEpi()">
        <option value="1">k=1</option>
        <option value="2">k=2</option>
        <option value="3" selected>k=3</option>
        <option value="4">k=4</option>
        <option value="7">k=7</option>
        <option value="9">k=9</option>
        <option value="15">k=15</option>
        <option value="20">k=20</option>
    </select> and $$\omega$$=<select id="sumEpiFreq" onchange="updateSumEpi()">
        <option value="1" selected>1</option>
        <option value="2">2</option>
        <option value="3">3</option>
    </select> to plot the circles and the corresponding $$y_k(x)$$ functions:


<div id="sum-epi-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/sumepi2.js)</sup></sup>

Wait a minute,  adding sinusoids means "stitching" their associated circles so that the centre of each subsequent circle is moving along the previous larger one. How is that even working? The components of this marvellous "machinery" describing the behaviour of $$y(x)$$ are called [Epycicles](https://en.wikipedia.org/wiki/Deferent_and_epicycle).

There's an intuitive proof to this: each epicycle corresponds to a specific sinusoid; when we talk about combining the sinusoids, we are talking about summing their positions at each point in time, and eventually, this operation reduces to subsequent vector additions.

Let's take a simple example by introducing three arbitrarily picked sinusoids and their associated *point vectors* (or *position vectors*): 
* $$y_{1}(x)=1.4sin(x + 1)$$, with the associated position vector $$\vec{u_{1}}$$;
* $$y_{2}(x)=0.8sin(2*x)$$, with the associated position vector $$\vec{u_{2}}$$;
* $$y_{3}(x)=0.5sin(3*x)$$, with the associated position vector $$\vec{u_{3}}$$.

Their sum is $$y(x) = y_{1}(x) + y_{2}(x) + y_{3}(x) = 1.4sin(x + 1) + =0.8sin(2*x) + 0.5sin(3*x)$$. 

A position vector represents the displacement from the origin $$(0, 0)$$ to a specific point in space. In our case, the vector $$(x, y_{k}(x))$$ represents the position or location of a point on the graph of the function(s) $$y_{k}(x)$$ at a particular $$x$$ value.

If we plot $$y(x)$$ on the cartesian grid we obtain something like: 

<div id="simple-yx-plot-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/simpleyxplotsketch.js)</sup></sup>

At each given point $$x$$, we can say for certain that $$\vec{u} = \vec{u_{1}} + \vec{u_{2}} + \vec{u_{3}}$$. This is why "epicycles" work like this; isn't this *amazing*?

Now, let's briefly forget about the cartesian representation of our sums of sinusoids. Let's concentrate on the *left side* of our sketches and follow the graphic patterns created by the arbitrary sinusoids represented as epicycles.

<div id="some-epis-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/someepis.js)</sup></sup>

As you can see, the shapes can become quite "irregular" and wild. With enough luck, we can paint a flower, a dog, a sketch portrait of [Wilhelm Leibniz](https://en.wikipedia.org/wiki/Gottfried_Wilhelm_Leibniz), or a circle (look at the last sketch).

> As a side rule (easy to demonstrate trigonometrically), if you sum up sinusoids that share the same frequency, the result will be a sinusoid. So, it's safe to assume that the fourth sketch is a sum of sinusoids sharing the same frequency - it's a CIRCLE.

# Adding sinusoids - The sinusoidal tetris

# A flower 

Let's start with a flower:

<div id="a-flower-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/aflower.js)</sup></sup>

Can you guess the individual sinusoids behind each epicycle for each of the four sketches or the ones behind the *flower*? 

Well, you can try guessing. First of all, you need to count how many circles each illustration has; this will give you the number of sinusoids at play. Afterward, you can assume their frequencies, depending on how fast they rotate. Additionally, based on the initial positions, you guess the phase of each sinusoid. But that's an empirical approach; who does that?

What if there's a mathematical method to determine those individual sinusoids (and their associated epicycle) only by "following" the path they describe as they move? 

# Complex numbers

Before discussing the actual mathematical principle used to determine the sinusoids that summed together approximate a given *shape*, we need to make a slight detour in the marvellous world of Complex Numbers.

When we think about numbers, we usually think of [*real numbers*](https://en.wikipedia.org/wiki/Real_number) ($$\mathbb{R}$$), mainly numbers that are used to measure continuous one-dimensional quantities. They come in *infinities*. Some of them are [*natural*](https://en.wikipedia.org/wiki/Natural_number) ($$\mathbb{N}$$), some of them are [*integer*](https://en.wikipedia.org/wiki/Integer) ($$\mathbb{Z}$$), some of them are [*rational*](https://en.wikipedia.org/wiki/Rational_number) ($$\mathbb{Q}$$), and some are [*irrational*](https://en.wikipedia.org/wiki/Irrational_number) ($$\mathbb{R}\setminus\mathbb{Q}$$), but regardless of their nature, they behave similarly. Except for the *irrationals* all others are easy to grasp and understand. Irrationals are only good for [*transcendental number*](https://en.wikipedia.org/wiki/Transcendental_number) meditation.

To represent real numbers we only need the $$Re$$ axis (one dimensional, rebranding of the $$X$$ axis of the Cartesian System):

<div id="renums-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/renums.js)</sup></sup>

> Fun fact: We know that $$\pi$$ and $$e$$ are irrational numbers, but until now, we have no proof that $$e + \pi$$ is irrational. 

But there's a "problem" with *real numbers* (actually, there's none); there's no *real* solution for the equation: $$x^2=-1$$. 
* When we square a positive real number ($$\mathbb{R_{+}}$$), we obtain a positive number;
* If we square 0, we obtain 0;
* If we square a negative real number ($$\mathbb{R_{-}}$$) we obtain also a positive real number;

So, the natural solution was to *imagine* a number like this. We've isolated the "imaginary" part in something we call $$i$$ (from *imaginary*), where $$i$$ is defined as $$i^2=-1$$, or $$i=\sqrt{-1}$$. Problem solved!?

By multiplying $$i$$ with various coefficients, we obtain an infinity of *imaginary* numbers ($$\mathbb{I}$$). For example $$5i$$, $$\pi i$$, $$\sqrt{7}i$$ are all imaginary numbers. Funnily enough, $$0*i = 0$$ can be considered both a *real* and a purely *imaginary* number. Philosophically speaking, reality and imagination start and end at $$0$$. We can represent all the imaginary numbers on a $$Im$$ axis that somehow intersects the axis of the *real* numbers in $$0$$, after all this is what *unites* them:

<div id="imnums-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/imnums.js)</sup></sup>

*Imaginary numbers* are not particularly interesting from a mathematical standpoint; they are just multiples of $$i$$.

Now, we can go further and define *complex* numbers ($$\mathbb{C}$$): they are numbers that have an imaginary part ($$\mathbb{I}$$) and a *real* part ($$\mathbb{R}$$), and we can express them as $$z=a + b*i$$. Complex numbers are suddenly bidimensional, they have a *real* component, additionally, they also have an *imaginary* part. 

For example, in the next sketch, we are going to represent the following complex numbers:
* $$z_{1}=5+πi$$;
* $$z_{2}=2.3+1.5i$$;
* $$z_{3}=-2e+2i$$;
* $$z_{4}=\sqrt{3}-3i$$;
* $$z_{5}=-3.33-2.8i$$.

<div id="cmplxnums-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/cmplxnums.js)</sup></sup>

The two parts, $$Re$$ and $$Im$$, never mix; they stand distinct as *extensions* of the number. So, in this sense, you can treat a complex number as a glorified 2D vector. However, what makes them unique, is that compared to vectors, *complex numbers* have an "inner" algebraic structure that makes them more powerful. 

For example, the *magnitude* of the *complex number* $$a+b*i$$ is given by the absolute value (modulus) of the *complex number*, which is the actual distance from the origin point $$(0,0)$$ to $$(a, b)$$: $$\mid a + b*i \mid=\sqrt{a^2 + b^2}$$;

The *direction of the complex number* is the angle it makes with the $$Re$$ axis (measured counterclockwise). This angle can be calculated using trigronometric functions: $$arg(a+b*i) = arctan(\frac{b}{a})$$.

# Complex Numbers and the Unit Circle

Moving the *Unit Circle* to the *Complex Plane* is only natural. The only difference would be that compared to the *Cartesian System*, the points (on the Unit Circle) are not defined by two coordinates $$(x, y)$$, but by a single *complex number* ($$z=cos(\theta)+i*sin(\theta)$$):

<div id="simple-circle-rotating-circle-cmp-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/simplerotatingcirclecmp.js)</sup></sup>

But do you know what's interesting (and obvious)? Multiplying a *complex number* with *i* is the equivalent of rotating the number counterclockwise with $$\frac{\pi}{2}$$ on an "imaginary circle" with the radius: $$r=\mid a + b*i \mid=\sqrt{a^2 + b^2}$$. For example if we take $$z_{1} \in \mathbb{C}$$ and we multiply it 3 times with $$i$$, we will have it's (*rotated*) in all the four quadrants of the *Complex Plane*:

<div id="cmpl-rotation-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/cmplrotation.js)</sup></sup>

The angle determined by $$(0, z_{1})$$ and $$(0, z_{1}*i)$$ is $$\frac{\pi}{2}$$, while the angle between $$(0, z_{1})$$ and $$(0, z_{1}*i*i)$$ is $$\pi$$. Remember this *rotational behaviour*, because it's the key to visually understanding the connection between $$\pi$$ and another transcendental constant of the *Universe*, $$e$$, as exposed by Euler's formula.

So if $$z_{1}=cos(\theta)+i*sin(\theta)$$, then:
* $$z_{1}^{'}=z_{1}*i=-sin(\theta)+i*cos(\theta)$$ ; 
* $$z_{1}^{''}=z_{1}*i*i=z_{1}*(-1)=-cos(\theta)-i*sin(\theta)$$ ;
* $$z_{1}^{'''}=z_{1}*i*i*i=z_{1}*(-i)=sin(\theta)-i*cos(\theta)$$ ;
* $$z_{1}^{''''}=z_{1}*i*i*i*i=z_{1}$$ - we've come full-circle.

> As an Electrical Engineer myself, I was "forced" to play a lot with Complex Numbers during my University years. Check [this video](https://www.youtube.com/watch?v=FCNHN7B9iDM) to find out why do Electrical / Electronics Engineers love them so much.

# The number $$e$$

The natural exponential function, often denoted as $$f(x)=e^{x}$$, is a special case of the exponential function where the base is $$e$$, also known as *Euler's Number* ($$e \approx 2.71828$$). $$e$$, just like its brother $$\pi$$, is an irrational and transcedental number, that was probably introduced to you using various formulas:

$$e=\sum_{n=0}^{\infty}(\frac{1}{n!})=\frac{1}{0!} + \frac{1}{1!}+\frac{1}{2!}+...$$

$$e=\lim_{x \to \infty}(1+\frac{1}{x})^x$$

$$e=\lim_{x \to 0}(x+1)^{\frac{1}{x}}$$

Okay, but what does this number have to do with the Circle? Well, it gets better. 

The *natural exponentiation* function is an [*eigenfunction*](https://en.wikipedia.org/wiki/Eigenfunction) for [differentiation](https://en.wikipedia.org/wiki/Derivative). An eigenfunction in this context is a function that, when differentiated, yields a constant multiple of itself:

$$\frac{d}{dx} e^{x} = e^{x}$$

If we add a constant ($$a \in C$$), and we derivate again $$\frac{d}{dx}e^{ax}=a * e^ax$$. Now, we can use our imagination and make $$a=i$$. So for a function $$f(x) = e^{ix}$$ subsequently derivation looks like this:

$$\frac{d}{dx}f(x) = \frac{d}{dx} (e^{ix}) = i * e^{ix}$$

$$\frac{d^2}{dx^2}f(x) = \frac{d^2}{dx^2} (e^{ix}) = \frac{d}{dx} (i * e^{ix}) = -e^{ix}$$

$$\frac{d^3}{dx^3}f(x) = \frac{d^3}{dx^3} (e^{ix}) = \frac{d}{dx} (-e^{ix}) = -i * e^{ix}$$

$$\frac{d^4}{dx^4}f(x) = \frac{d^4}{dx^4} (e^{ix}) = \frac{d}{dx} (-i*e^{ix}) = e^{ix} = f(x)$$

In simple terms, after we derivate $$f(x)$$ 4 times ($$f'(x), f''(x), f'''(x), f''''(x)$$), our function does a *full circle*. It's the same pattern described in the previous section when we multiplied our $$z_{1}$$ with $$i$$. Subsequently deriving $$e^{ix}$$ is the equivalent of subsequently multiplying $$e^{ix}$$ with $$i$$. Multiplying a complex number with $$i$$ means to *rotate* that number in the *Complex Plane* with $$\frac{\pi}{2}$$. 

But what is a derivative of a function at a certain point? It's the rate of change of that function at that particular point. But we've just said that the derivative of $$e^{ix}$$ is equivalent to a *rotation*. I hope you see where I am going: the rate of change is rotational. It means that we can intuitively feel that the function $$e^{ix}$$ describes an actual... circle. There's no other possible solution. So we can boldly affirm that $$e^{ix} = cos(x) + i*sin(x)$$ (which is the formula discovered by Euler).

Of course, this is not a rigorous demonstration; we were bold and appealed to your *visual intuition* (if there's such a thing).

# Euler's formula, the connection between $$e$$, $$\pi$$ and $$i$$

Euler's formula is a thing of marvel:

$$e^{ix}=cos(x) + i * sin(x)$$

If we chose $$x=\pi$$, then we get this exciting identity.

$$e^{i\pi}+1=0$$

With this simple mathematical *magic formula* we've just linked the circle (through the *irrational* number $$\pi$$ and it's associated trigonometric functions) with the imaginary ($$i$$) and with Euler's transcendental number $$e$$. Somehow, mathematics works in areas that are not necessarily *rational* or *real* in a material sense but are... ontological.

> Another bold statement: Some would say that $$\pi$$ and $$e$$ don't care about the geometry of the circles, their connection comes from a *higher* more abstract place, [check this answer on quora](https://affinemess.quora.com/What-is-math-pi-math-and-while-were-at-it-whats-math-e-math?__snids__=1596646755&__nsrc__=2).

> I know I am comparing apples with oranges, but sometimes it hurts me to see $$e=m*c^{2}$$ more prevalent in pop-culture than $$e^{i\pi}=-1$$.

For nostalgic reasons, we can also demonstrate Euler's formula through a more standard approach, using the Maclaurin series (a particular case of the [Taylor series](https://en.wikipedia.org/wiki/Taylor_series)). This is not exactly a necessary step for this article, but it's interesting to see that there are *numerical* in which we can demonstrate something that comes intuitively. 

The *Maclaurin series* is a clever way to represent a function as an infinite sum of terms. It's instrumental in mathematics to approximate various functions. Expressing a function as an infinite sum of "well-behaved" terms is crucial in mathematics. 

In its general form, the Maclaurin series, for a function $$f(x)$$ is:

$$f(x)=\sum_{n=0}^{\infty}\frac{\frac{d^n}{dx^n}f(0)}{n!}x^n$$

If $$f(x)=sin(x)$$, then the Maclaurin series is:

$$sin(x) = \textcolor{red}{sin(0)} + \frac{\textcolor{green}{\frac{d}{dx}sin(0)}}{1!} + \frac{\textcolor{blue}{\frac{d^2}{dx^2}sin(0)}}{2!} + \frac{\textcolor{orange}{\frac{d^3}{dx^3}sin(0)}}{3!} +...$$

But we know that: $$\textcolor{red}{sin(0)=0}$$, $$\textcolor{green}{\frac{d}{dx}sin(0)=cos(0)=1}$$, $$\textcolor{blue}{\frac{d^2}{dx^2}sin(0)=-sin(0)=0}$$, $$\textcolor{orange}{\frac{d^3}{dx^3}sin(0)=-cos(0)=-1}$$, and *the circle* is now complete. Computing derivates further, will be render the same repeating results $$\textcolor{red}{0}, \textcolor{green}{1}, \textcolor{blue}{0}, \textcolor{orange}{-1}, ...$$. Every even term of the series is $$0$$, and the odd ones that remain have alternating signs. It's the same *rotational* pattern all over again, the one you could see in the visual representation of the circle, with complex numbers when we were multiplying them with $$i$$, and when we were computing the derivative(s) of $$f(x)=e^{ix}$$. 

After we exclude the terms with $$\textcolor{red}{0}$$ and $$\textcolor{blue}{0}$$, the Maclaurin series for $$sin(x)$$ is:

$$sin(x)=\sum_{n=0}^{\infty}\frac{(-1)^n}{(2n+1)!}*x^{2n+1}$$

In a highly similar fashion we would be getting a very similar Maclaurin series for $$cos(x)$$:

$$cos(x)=\sum_{n=0}^{\infty}\frac{(-1)^n}{(2n)!}*x^{2n}$$

The Maclaurin series for $$e^{ix}$$ is simple to determine, so we will start by writing the Maclaurin series for $$e^x$$ first:

$$e^{x}=1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\frac{x^4}{4!}+...$$

And then we simply change the $$x$$ to $$ix$$:

$$e^{ix}=1+ix+\frac{(ix)^2}{2!}+\frac{(ix)^3}{3!}+\frac{(ix)^4}{4!}+\frac{(ix)^5}{5!}+...$$

We know that $$i^2=-1$$, $$i^3=-i$$, $$i^4=1$$, $$i^5=i$$, ...:

$$e^{ix}=1+ix-\frac{x^2}{2!}-\frac{ix^3}{3!}+\frac{x^4}{4!}+\frac{ix^5}{5!}+...$$

Once we group and factor, the terms that contain $$i$$, things become:

$$e^{ix}=\underbrace{(1-\frac{x^2}{2!}+\frac{x^4}{4!}+...)}_{cos(x)=\sum_{n=0}^{\infty}\frac{(-1)^n}{(2n)!}*x^{2n}}+ i * \underbrace{(x-\frac{x^3}{3!}+\frac{x^5}{5!}+...)}_{\sin(x)=\sum_{n=0}^{\infty}\frac{(-1)^n}{(2n+1)!}*x^{2n+1}}$$

And now we have it, Euler's formula, a thing to marvel:

$$e^{ix}=cos(x)+i*sin(x)$$

By substituting $$x \rightarrow -x$$ we will obtain a new equality:

$$e^{-ix}=cos(x)-i*sin(x)$$ 

If we add/subtract the two equalities, we will obtain the definition of the sine and cosine functions in their exponential form:

$$cos(x) = \frac{e^{ix} + e^{-ix}}{2}$$

$$sin(x) = \frac{e^{ix} - e^{-ix}}{2*i}$$

Linking back Euler's equality to the complex plane, things start to look much more enjoyable. All points of the circle are determined by a functon $$z(x)$$, where: 

$$z(x)=e^{ix}=\underbrace{cos(x)}_{Re(x)}+\underbrace{i*sin(x)}_{Im(x)}$$

$$x$$ represents the actual angle $$\theta \in \mathbb{R}$$, so $$z(\theta)=e^{i\theta}=cos(\theta)+i*sin(\theta)$$.

You've seen that we've interchanged $$x$$ with $$t$$ and $$\theta$$ throughout the article. It's confusing, but don't get confused. We are the ones to decide how to look at $$x$$, as an angle or as time. 

# Complex sinusoids

Remember when we "customized" the *simple sinusoid* to have more *control* over it, and we came up with this:

 $$y(t) = A * sin(2\pi ft + \varphi) = A * sin(\omega t + \varphi)$$

Of course, we can do the same for the *complex sinusoid*,  but with Euler's identity in mind. Given $$e^{i\theta}=cos(\theta)+i*sin(\theta)$$, we multiply each side with $$A \geq 0$$ (the *Amplitude*): 

$$A*e^{i\theta}=A*(cos(\theta)+i*sin(\theta))$$

If we substitute $$\theta$$ with $$\theta=\omega t + \varphi$$, where $$t$$ is the time in seconds, $$\omega$$ is the radian frequency and $$\varphi$$ is the phase (offset), we obtain what we call the *complex sinusoid*:

$$s(t)=A*e^{i(\omega t + \varphi)} = A * cos(\underbrace{\omega t + \varphi}_{\theta}) + i * A * sin(\underbrace{\omega t + \varphi}_{\theta})$$

Philosophically speaking, a *complex sinusoid* captures the behavior of two sinusoids (one cosine and one sine) on both its axes; on the real part, it behaves like a cosine, while on its imaginary part, it behaves like a sine, the two are *in sync* as they both depend on the free variable $$\theta$$, expressed as $$\theta=\omega t + \varphi$$.

We can plot a complex sinusoid in 3D, where the Z-axis is the time, the X-axis is the real axis, and the Y-axis is the imaginary part of our complex sinusoid. The representation is going to be a particular case of a [helix](https://en.wikipedia.org/wiki/Helix). But helices aside, this idea allows us to plot whatever shapes we want in a 2D plane: we will project a complex "3D" function in a 2D plane (defined by the X-axis and Y-axis).

Two interesting observations:
* If we project the complex sinusoid on the plane determined by the Y-axis and Z-axis, we will plot a *sine* (the Imaginary part);
* If we project the complex sinusoid on the plane determined by the X-axis and Z-axis, we will plot a *cosine* (the Real part);

<div id="three-d-complex-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/threedcomplex.js)</sup></sup>

If we step back, we might ask what's so unique about $$\mathbb{C}$$, why the *Unit Circle* from the *Complex Plane* is suddenly more interesting than the one we've introduced at the beginning of the article. Why do we use $$\mathbb{C}$$ and not $$\mathbb{R}^{2}$$? After all, $$\mathbb{R}^{2}$$ _has_ points; they are the *same points* as in $$\mathbb{C}$$, and the circles look the same, regardless of the formalism.

Well, there's a subtle *secret* to it. The points $$p_{i} \in \mathbb{R}^{2}$$ can be expressed as $$p_{i} = (x_{i}, y_{i})$$, where $$x_{i} \in \mathbb{R}$$ and $$y_{i} \in \mathbb{R}$$. They are *tuples*, like python tuples. The points $$z_{i} \in \mathbb{C}$$ are numbers, not tuples, and they can be expressed as such $$z_{i} = x_{i} + i*y_{i}$$. They *exhibit* an addition that links the imaginary part with the real part. 

Multiplication with a scalar in $$\mathbb{R}^2$$ is $$\mathbb{R} \times \mathbb{R}^2 \to \mathbb{R}^2$$, while in $$\mathbb{C}$$ the multiplication is $$\mathbb{C} \times \mathbb{C} \to \mathbb{C}$$. You can divide numbers (or points) in $$\mathbb{C}$$, but you absolutely cannot divide points in $$\mathbb{R}^{2}$$. To put it briefly, because of those additional properties of $$\mathbb{C}$$, the game of calculus is much simpler on $$\mathbb{C}$$ than on the *alternative*. We operate on *numbers*, which are also *points*... [and always have been](https://www.youtube.com/watch?v=i4lMfhlr9Cs).

If you've read so far, you should realize that we can use *Complex Sinusoids* to draw shapes in a 2D plane. The 2D plane we will use is the plane determined by the X-axis and the Y-axis. The other dimension, the time, that's a dimension we keep hidden. Remember [the flower](#a-flower) we've drawn a few chapters back? Well, that flower is nothing more than the projection of the sum of multiple Complex Sinusoids. 

# Fourier Series

*Fourier Series* is the mathematical process through which we take an arbitrary function (that needs to have a few properties) and expand it as a sum of trigonometric functions. Remember the **Maclaurin series** (for decomposing $$f(x)$$) we used to prove Euler's Identity a few chapters back: 

$$f(x)=\sum_{n=0}^{\infty}\frac{\frac{d^n}{dx^n}f(0)}{n!}x^n$$

It's the same concept, but our expansion will use cosines and sines this time.

We can make an even more artistic observation. Do you remember the [Pink Floyd's](https://en.wikipedia.org/wiki/Pink_Floyd) album cover for the [*Dark Side of The Moon*](https://en.wikipedia.org/wiki/The_Dark_Side_of_the_Moon):

![img]({{site.url}}/assets/images/2023-07-02-painting-with-circles/darksideofthemoon.jpg)

Imagine our function $$f(x)$$ is the light itself, [the prism](https://en.wikipedia.org/wiki/Prism_(optics)) is essentially *Fourier Mathematics*, and the spectral colors emanating from the prism are our sines and cosines. 

If we were to keep the analogy (it's only an analogy!) and write the formula, this would look like this:

$$\underbrace{f(x)}_{\text{ light itself}}=\underbrace{A_{0} + \sum_{n=1}^{\infty} [A_{n} cos(\frac{2\pi nx}{P}) + B_{n} sin(\frac{2\pi nx}{P})]}_{\text{the spectral components}}$$

Where $$A_{n}$$ and $$B_{n}$$ are called *Fourier Coefficients* are defined by the following integrals:

$$A_{0} = \frac{1}{P} \int_{- \frac{P}{2}}^{+\frac{P}{2}} f(x) dx$$

$$A_{n} = \frac{2}{P} \int_{- \frac{P}{2}}^{+ \frac{P}{2}} f(x) * cos(\frac{2\pi nx}{P}) dx$$

$$B_{n} = \frac{2}{P} \int_{- \frac{P}{2}}^{+ \frac{P}{2}} f(x) * sin(\frac{2\pi nx}{P}) dx$$

The integer $$n$$ from the formulas represents the number of cycles the corresponding sinusoid makes in the interval $$P$$.

With the help of Euler's Formula and by changing the sine and cosine functions in their exponential forms, we can also express the Fourier Series of a function as a sum of *Complex Sinusoids*:

$$f(x) = \sum_{n=-N}^{N} C_{n} e ^ {i2\pi \frac{n}{P}x}$$

Where:

$$
C_{n} = \begin{cases}
            A_{0} & \text{if } n = 0 \\
            \frac{1}{2} (A_{n} - i * B_{n}) &  \text{if } n > 0 \\
            \frac{1}{2} (A_{n} + i * B_{n}) & \text{if } n < 0 \\
        \end{cases}
$$

If we do additional substitutions, the final form of $$C_{n}$$ is:

$$
C_{n} = \frac{1}{P} \int_{-\frac{P}{2}}^{\frac{P}{2}} e^{-i2\pi\frac{n}{P}x} f(x) dx
$$

## Fourier series for the Square wave

Remember the *Square Wave* we've approximated with sinusoids [in this section](#adding-sinusoids)? At that point, we used the following formula to express the *Square* as a sum of sinusoidal components:

$$
y(x) = \frac{4}{\pi}\sum_{k=1}^{\infty}\frac{sin(2\pi(2k-1)fx)}{2k-1}
$$

Or, to keep things simpler, by substituting $$\omega=2\pi f$$ ($$\omega$$ is the angular frequency):

$$
y(x) = \frac{4}{\pi}\sum_{k=1}^{\infty}\frac{sin((2k-1)\omega x)}{2k-1}
$$

It's time to understand how we've devised such an approximation. 

In *isolation*, the *Square Wave*, $$f(x)$$ looks like this:

<div id="square-wave-f-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/squarewavef.js)</sup></sup>

Throughout the interval  `[0, 2L]`, $$f(x)$$ can be written as:

$$
f(x) = 2 [H(\frac{x}{L})-H(\frac{x}{L}-1)] - 1
$$

Where $$H(x)$$ is called the [*Heavisde Step Function*](https://mathworld.wolfram.com/HeavisideStepFunction.html) and has the following definition:

$$
H(x) =  \begin{cases}
        0 & \text{if } x \lt 0 \\
        1 & \text{if } x \ge 0 \\
        \end{cases}
$$

If we start substituting values for $$x$$, you will see that the definition of $$f(x)$$ works just fine:


```js
let h = (x) => {
    if (x == 0) return 0.5;
    else if (x > 0) return 1
    else return 0;
}
let sq = (x, L) => { return 2 * (h(x / L) - h(x / L - 1)) - 1; }

let r = [];
const L = 10;
for (let i = 0; i <= 2*L; i+=0.5) {
    r.push(sq(i, L));
}
console.log(r);

// Output
// [
//    0,  --> starts from 0 [x = 0]
//
//    1,  1,  1,  1,  1,  1,  1,  1,  1,
//    1,  1,  1,  1,  1,  1,  1,  1,  1,  1,
//
//    0, --> goes again through 0 [x=L]
//
//    -1, -1, -1, -1, -1, -1, -1, -1, -1,
//    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
// ]
```

To determine the Fourier series $$s(x)$$ for $$f(x)$$, we will have to compute the coefficients$$A_{0}$$, $$A_{n}$$ and $$B_{n}$$. It's much simpler than you might think for this well-behaved but unnatural function. I am calling it *unnatural* because it has a nice discontinuity, a gap, a thing that doesn't appear in *nature*, at least if we are in the camp that the nature of our Universe is continuous and infinities are ontological. 

It's worth mentioning that the *Fourier Expansion* for smooth functions usually converges to the initial functions (sooner or later), still, for functions with *discontinuities*, we will probably be dealing with *mere approximations*.

First of all, let's look at $$A_{0} = \frac{1}{2L} \int_{0}^{2L} f(x) dx$$. Notice how we've changed the interval from $$[-\frac{P}{2}, \frac{P}{2}]$$ to $$[0, 2L]$$ to match our example. This will be reflected in the formulas.

Well, this coefficient ($$A_{0}$$) is a fancy way to express the average of $$f(x)$$ over the interval (in our case `[0, 2L]`). In the same time $$A_{0}$$ is the area determined by $$f(x)$$ over `[0, 2L]` then divided by $$2L$$. But if you look at the plot again, you will see that the net area is  $$0$$, because the green area (S1) nullifies the red area (S2), regardless of $$L$$.

<div id="square-wave-f-a0-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/squarewavefa0.js)</sup></sup>

Secondly, let's compute the $$A_{n} = \frac{1}{L} \int_{0}^{2L} f(x) * cos(\frac{\pi nx}{L}) dx$$ coefficients. An important observation is that $$f(n)$$ is odd, and its average value on the interval is $$0$$; we can safely say all the coefficients $$A_{n}$$ also vanish. 

Visually speaking, regardless of how you pick $$n$$ or $$L$$, the net area determined by the $$A_{n}$$ integral will always be zero. It's visually obvious if we *plot* $$A_n$$. For example plotting $$A_{1}$$, $$A_{2}$$, $$A_{3}$$, $$A_{4}$$ looks like this:

<div id="square-wave-f-an-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/squarewavean.js)</sup></sup>

Similar symmetrical patterns will emerge if you increase the $$n$$ in $$A_{n}$$ and plot them.

Thirdly, we need to compute:

 $$B_{n} = \frac{1}{L} \int_{0}^{2L} f(x) * sin(\frac{\pi nx}{L}) dx$$

 If we plot a $$B_{1}$$, $$B_{2}$$, $$B_{3}$$ and, let's say, $$B_{4}$$ we can intuitively *feel* what's happening with $$B_{n}$$:

<div id="square-wave-f-bn-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/squarewavebn.js)</sup></sup>

If you have a keen eye for geometrical representations, you will notice that every even $$B_{n}$$ is also 0. The red and green areas nullify, so the net area described by the integral is $$0$$. The odd terms will be $$2 * \text{something}$$, so let's calculate that $$\text{something}$$.

We will need to split the integral on two sub-intervals $$[0, L]$$ and $$[L, 2L]$$ (there's a *chasm* at $$L$$), but given the fact $$f(x)$$ and $$sin(x)$$ are odd, $$B_{n}$$ can we written as:

 $$B_{n} = 2 * [\frac{1}{L} \int_{0}^{L} f(x) * sin(\frac{\pi nx}{L}) dx]$$

We can now perform [u-substition](https://en.wikipedia.org/wiki/Integration_by_substitution), so we can write:

$$B_{n} = \frac{2}{L} \int_{0}^{nL\pi} \frac{sin(\frac{u}{L})}{n\pi}du$$

After we take the constant out, we compute the integral, use the intervals, and take into consideration the periodicity of cosine:

$$B_{n} = \frac{2}{n\pi}(1-(-1)^n)$$

And now we see it, $$B_{n}$$ is exactly $$0$$ if $$n$$ is even, and $$B_{n}=2 * \frac{2}{n\pi}$$ is $$n$$ is odd.

Putting all back into the master formula of the *Fourier Series*:

$$f(x)=\underbrace{A_{0}}_{0} + \sum_{n=1}^{\infty} [\underbrace{A_{n} cos(\frac{\pi nx}{L})}_{0} + B_{n} sin(\frac{\pi nx}{L})]$$

Things become:

$$f(x)=\frac{4}{\pi} \sum_{n=1,3,5...}^{+\infty} (\frac{1}{n} * sin(\frac{\pi nx}{L}))$$

If we substitute $$n \rightarrow 2k-1$$ and consider, we obtain the initial formula:

$$f(x)=\frac{4}{\pi} \sum_{k=1}^{+\infty} (\frac{sin(\frac{\pi (2k-1)x}{L})}{(2k-1)})$$

To obtain the initial formula, we substitute $$L \rightarrow \frac{1}{2f}$$, and $$2\pi f \rightarrow \omega$$, basically we create an interdependence between $$L$$ (half of the interval) and $$\omega$$, $$L=\frac{\pi}{\omega}$$:

$$
f(x) = \frac{4}{\pi}\sum_{k=1}^{\infty}\frac{sin((2k-1)\omega x)}{2k-1}
$$

Unfortunately, there's no way we can go to $$+\infty$$, so let's consider $$s(x)$$ as an approximation of $$f(x)$$ that depends on $$n$$.

$$
s(x) = \frac{4}{\pi}\sum_{k=1}^{n}\frac{sin((2k-1)\omega x)}{2k-1} \approx f(x)
$$

In the next animation, you will see that by increasing $$n$$, the accuracy of our approximation gets better and better, and the *gaps* are slowly closed:

<div id="tight-fourier-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/tightfourier.js)</sup></sup>

To understand how adding more coefficients improves the approximation, let's look back again at a few of our coefficients $$s_{1}(x)$$, $$s_{2}(x)$$, $$s_{3}(x)$$, $$s_{4}(x)$$ and $$s_{5}(x)$$ (we will pick $$\omega=\frac{\pi}{2}$$, so that $$2L=1$$):

$$s_{1}(x) = \frac{4}{\pi} sin(\frac{\pi x}{2})$$

$$s_{2}(x) = \frac{4}{3\pi} sin(\frac{3\pi x}{2})$$

$$s_{3}(x) = \frac{4}{5\pi} sin(\frac{5\pi x}{2})$$

$$s_{4}(x) = \frac{4}{7\pi} sin(\frac{7\pi x}{2})$$

$$s_{5}(x) = \frac{4}{9\pi} sin(\frac{9\pi x}{2})$$

Each of the 5 terms is a sinusoid, with $$\frac{4}{\pi}$$, $$\frac{4}{3\pi}$$, etc. amplitudes, and $$\frac{\pi}{2}$$, $$\frac{3\pi}{2}$$, etc. frequencies.

So, if we were to approximate a *Square Wave* with its fifth partial sum (the red dot), we would obtain something like this:

<div id="tight-fourier-avg-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/tightfourieravg.js)</sup></sup>

Notice how *obsessed* the *red dot* is with the *blue dot* (the actual function) and how closely it follows it. 

We can always add more terms to the partial sum to help the *red dot* in its *holy mission*, improving the approximation until nobody cares anymore.

## Fourier series of the triangle wave

Without dealing with all the associated math, the *Fourier Series* decomposition for a triangle-wave is:

$$
s(x)=\frac{8}{\pi^2}\sum_{k=1}^{N}\frac{(-1)^{k-1}}{(2k-1)^2}*sin((2k-1)x)
$$

Plotting the function $$s(x)$$, we will see that things converge smoothly and fast. As soon as $$n$$ approaches $$6$$, we can already observe the triangle:

<div id="tight-triangle-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/tighttriangle.js)</sup></sup>

Let's compute the first terms six terms of the $$\sum$$, so that:

$$
s(x) \approx s_1(x) + s_2(x) + s_3(x) + s_4(x) + s_5(x) + s_6(x)
$$

Where:
* The first term is $$s_1(x)=\frac{8}{\pi^2}*sin(x)$$, where $$A=\frac{8}{\pi^2}$$, $$\omega=1$$, $$\varphi=0$$;
* The second term is $$s_2(x)=-\frac{8}{3^2\pi^2}*sin(3x)$$, where $$A=-\frac{8}{3^2\pi^2}$$, $$\omega=3$$, $$\varphi=0$$;
* The third term is $$s_3(x)=\frac{8}{5^2\pi^2}*sin(5x)$$, where $$A=\frac{8}{5^2\pi^2}$$, $$\omega=5$$, $$\varphi=0$$;
* The fourth term is $$s_4(x)=-\frac{8}{7^2\pi^2}*sin(7x)$$, where $$A=-\frac{8}{7^2\pi^2}$$, $$\omega=7$$, $$\varphi=0$$;
* The fifth term is $$s_5(x)=\frac{8}{9^2\pi^2}*sin(9x)$$, where $$A=\frac{8}{9^2\pi^2}$$, $$\omega=9$$, $$\varphi=0$$;
* The sixth term is $$s_6(x)=-\frac{8}{11^2\pi^2}*sin(11x)$$, where $$A=-\frac{8}{11^2\pi^2}$$, $$\omega=11$$, $$\varphi=0$$;

A keen eye will see will observe the that $$s_2(x)$$, $$s_4(x)$$, $$s_6(x)$$ and all the even terms are *negative*. 

A negative amplitude doesn't make too much sense, at least not in a physical sense. What are we going to do with the *minus sign*?

We have two options:
1. Because $$sin(-x)=-sin(x)$$, nobody stops us to make the *frequency* negative. For example, $$s_2(x)=\frac{8}{3^2\pi^2}*sin(-3x)$$, so that the $$\omega=-3$$. But again, why would we want a *negative frequency*? This also doesn't make sense in a physical sense.
2. We can use $$\vert A \vert$$ and shift the signal with $$\pi$$, so that $$\varphi=\pi$$. 

In practice, we will go with 2. as it's more practical and gives us more control, but the two options are equivalent so that we can write $$s_2(x)$$ in both ways:

$$
s_2(x)=-\frac{8}{3^2\pi^2}*sin(3x)
$$
 
$$
s_2(x)=\frac{8}{3^2\pi^2}*sin(3x + \pi)
$$

Visually speaking, the results will not be surprising if we plot $$sin(-x)$$ and $$sin(x+\pi)$$ side by side; the two are equivalent:

<div id="pi-shift-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/pishift.js)</sup></sup>

If we consider this, the even terms of $$s(x)$$ will become:

* $$s_2(x)=\frac{8}{3^2\pi^2}*sin(3x+\pi)$$ ;
* $$s_4(x)=\frac{8}{7^2\pi^2}*sin(7x+\pi)$$ ;
* $$s_6(x)=\frac{8}{11^2\pi^2}*sin(11x+\pi)$$ ;
* ...and so on

## Fourier series of a sawtooth function

Shamelessly skipping the math demonstration, a reverse-sawtooth function has the following form:

$$
s(x)=\frac{2}{\pi}\sum_{k=1}^{N}(-1)^k*\frac{sin(kx)}{k}
$$

Plotting $$s(x)$$, while increasing $$n$$, things look like this:

<div id="tight-sawtooth-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/tightsawtooth.js)</sup></sup>

## A Fourier Series Machinery

To better visualize what's happening, let's look at a *Fourier Series Machinery* and how the *circles move* to create *~~beautiful~~ practical patterns*. 

You can pick the shape of the desired signal from here: <select id="fm-wave" onchange="updateFmWave()">
        <option value="sawtooth" selected>sawtooth wave</option>
        <option value="triangle">triangle wave</option>
        <option value="square">square wave</option>
    </select> and the sketch will change accordingly.

<div id="fmachinery-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/fmachinery.js)</sup></sup>

...A bunch of spinning circles on a stick, where each circle corresponds to exactly one term of the series - this is the marvelous *Fourier Series Machinery*. 

![img]({{site.url}}/assets/images/2023-07-02-painting-with-circles/fmachinery.jpg) 

If we run our signal through the *Fourier Series Machinery*, we will obtain *The Amplitude* ($$A$$) and *The Phase* ($$\varphi$$) for each Frequency ($$\omega$$) from $$1$$ to $$N$$. Isn't it amazing? And it all comes down to a bunch of spinning circles... on a stick.

# Fourier transform

There's only one limitation to what *Fourier series* can do: they only work on periodic functions. 

So, we must introduce a new concept that allows us to shift from the bounded interval $$P=2*L$$ on which *Fourier Series* works to the infinite domain of $$\mathbb{R}$$. This concept is called a *Fourier Transform*.

So let's consider a periodic function $$f(x)$$ with period $$P$$ again. In exponential form, the *Fourier Series* representation of $$f(x)$$ is:

$$
f(x) = \sum_{n=-\infty}^{\infty} C_{n} e ^ {i2\pi \frac{n}{P}x} \\
C_{n} = \frac{1}{P} \int_{-\frac{P}{2}}^{\frac{P}{2}} e^{-i2\pi\frac{n}{P}x} f(x) dx 
$$

Let's be *imaginative* and substitute $$\triangle f = \frac{1}{P}$$

Our relationships become:

$$
f(x) = \sum_{n=-\infty}^{\infty} C_{n} e ^ {i2\pi n \triangle fx} \\
C_{n} = \triangle f \int_{-\frac{P}{2}}^{\frac{P}{2}} f(x) e^{-i2\pi n \triangle fx} dx 
$$

Substituting $$C_{n}$$ in the first relationship becomes:

$$
f(x) = \sum_{n=-\infty}^{\infty} [\int_{-\frac{P}{2}}^{\frac{P}{2}} f(x) e^{-i2\pi n \triangle fx} dx] e ^ {i2\pi n \triangle fx} \triangle f\\
$$

The above formula looks scary; I have to admit that. But it's just an intermediary step, and I promise things will become much simpler.

We've said we want to extend the *Fourier Series* to $$\infty$$ and back. So let's assume $$P$$ approaches infinity: $$P \rightarrow \infty$$. Then, our $$\triangle f$$ becomes a continuous variable $$f$$, and summation becomes integration.

$$
f(x) = \lim\limits_{P \to \infty} \{\sum_{n=-\infty}^{\infty} [\int_{-\frac{P}{2}}^{\frac{P}{2}} f(x) e^{-i2\pi n \triangle fx} dx] e ^ {i2\pi n \triangle fx} \triangle f\}
$$

If we substitute the ordinary frequency with the angular frequency ($$\omega=2\pi f$$), our relationship is:

$$
f(x) = \frac{1}{2\pi} \int_{-\infty}^{\infty} [\underbrace{\int_{-\infty}^{\infty} f(x) e^{-i\omega x} dx}_{F(\omega)}] * e ^ {i\omega x} d\omega
$$

So, a function $$f(x)$$ can be written as:

$$
f(x) = \frac{1}{2\pi} \int_{-\infty}^{\infty} F(\omega) e^{i\omega x} d\omega \\
F(\omega) = \int_{-\infty}^{\infty} f(x) * e^{-i\omega x} dx
$$

Think of $$F(\omega)$$ as the $$C_{n}$$ coefficients of the *Fourier Series*. $$F( \omega )$$ is *Fourier Transform*, a continuum generalization of the $$C_{n}$$of the *Fourier Series*.

If you prefer to use the *ordinary frequency*, $$f$$, there is a cleaner formula for this. Engineers usually prefer $$\omega$$:

$$
f(x) = \int_{-\infty}^{\infty} F(f) e^{i2\pi fx} df \\
F(f) = \int_{-\infty}^{\infty} f(x) * e^{-i2\pi fx} dx
$$

$$F(\omega)$$ allows us to look at a function from a different angle. No, there's no pun; it's **literally** a different *angle*.

# The Fourier Transform of the Box Function

The math can look a little overwhelming. And it's hard to make a visual connection without seeing how the *Fourier Transform* works in practice.

Let's define the *Box Function*, $$g(x)$$:

$$
g(x) = \begin{cases}
           A &  \text{if } -\frac{1}{2} \lt x \lt \frac{1}{2} \\
           0 & \text{otherwise} \\
        \end{cases}
$$

It looks like this:

<div id="the-box-function-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/theboxfunction.js)</sup></sup>

The *Fourier Transform* of $$g(x)$$, $$G(\omega)$$, can be written as:

$$
G(\omega) = \int_{-\infty}^{+\infty} g(x) * e^{-i\omega x} dx
$$

Because the function *operates* only between $$(-\frac{1}{2}, \frac{1}{2})$$ we can *restrict* the integral to:

$$
G(\omega) = \int_{-\frac{1}{2}}^{\frac{1}{2}} A * e^{-i\omega x} dx = A * \frac{e^{-i\omega x}}{-i\omega}\Bigr|_{-\frac{1}{2}}^{\frac{1}{2}} = A * \frac{e^{\frac{i\omega}{2}} - e^{\frac{-i\omega}{2}}}{i\omega}
$$

If you look closer, the result looks suspiciously similar to the sine function expressed in exponential form: $$sin(x) = \frac{e^{ix} - e^{-ix}}{2*i}$$. So we can safely say:

$$
G(\omega) = A * \frac{2}{\omega} * sin(\frac{\omega}{2}) = A * \frac{sin(\frac{\omega}{2})}{\frac{\omega}{2}}
$$

For the mathematically inclined, the function $$G(\omega)$$ is continuous at $$0$$, don't worry about that.

Plotting $$G(\omega)$$ gives us the following graph:

<div id="the-box-function-ft-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/theboxfunctionft.js)</sup></sup>

If we do the inverse *Fourier Transform*, we can express $$g(x)$$ as:

$$
g(x)=\frac{1}{2\pi}\int_{-\infty}^{+\infty} G(\omega) * e ^{i\omega x} d\omega
$$

Remember how a [*Complex Sinsuoid*](#complex-sinusoids) is written as $$A * e^{i(\omega x + \varphi)}$$. Then, if we look at our *Fourier Transform*, we can see that it is a continuous sum of *complex inusoids* over infinity:

$$
g(x)=\frac{1}{2\pi}\int_{-\infty}^{+\infty} \underbrace{G(\omega) * e ^{i\omega x}}_{\text{complex sinusoid(s)}} d\omega
$$

This Wikipedia animation best describes the math formula:

![Transform](https://upload.wikimedia.org/wikipedia/commons/a/a3/Continuous_Fourier_transform_of_rect_and_sinc_functions.gif)

Or my take on it:

# Discrete Fourier Transform


# References

* [Radians](https://www.mathsisfun.com/geometry/radians.html)
* [$$\mathbb{R^2}$$ vs. $$\mathbb{C}$$ ](https://math.stackexchange.com/questions/364044/difference-between-mathbb-c-and-mathbb-r2)
