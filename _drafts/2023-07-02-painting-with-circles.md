---
title: "Painting with Circles, Epycicles and Fourier Transforms"
date: "2023-03-01"
classes: wide
usemathjax: false
usekatex: true
usep5js: true
custom-javascript-list:
    - "/assets/js/2023-03-02-paiting-with-circles/commons.js"
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
    - "/assets/js/2023-03-02-paiting-with-circles/sinusoids.js"
    - "/assets/js/2023-03-02-paiting-with-circles/onenegative.js"    
    - "/assets/js/2023-03-02-paiting-with-circles/sumsimple.js"
    - "/assets/js/2023-03-02-paiting-with-circles/squarewave.js"
    # - "/assets/js/2023-03-02-paiting-with-circles/sumepi.js"
    - "/assets/js/2023-03-02-paiting-with-circles/sumepi2.js"
    - "/assets/js/2023-03-02-paiting-with-circles/simpleyxplotsketch.js"
    - "/assets/js/2023-03-02-paiting-with-circles/someepis.js"
    - "/assets/js/2023-03-02-paiting-with-circles/aflower.js"
    - "/assets/js/2023-03-02-paiting-with-circles/renums.js"
    - "/assets/js/2023-03-02-paiting-with-circles/cmplxnums.js"
    - "/assets/js/2023-03-02-paiting-with-circles/simplerotatingcirclecmp.js"
    - "/assets/js/2023-03-02-paiting-with-circles/cmplrotation.js"
comments: true
excerpt: "The nature of reality"
categories:
- "math"
tags:
- "fun"
---

# What is a Circle? (short math recap) 

Over ~~a hundred~~ thousand years ago, [Plato](https://en.wikipedia.org/wiki/Plato), the ancient Greek philosopher, extensively wrote about *The Circle* in his philosophical works. For him, the circle is the ultimate perfect shape because it is consistent and uniform in all directions. It's eternal because it closes and permanently opens without a beginning or an end. In this work, [Timaeus](https://en.wikipedia.org/wiki/Timaeus_(dialogue)), Plato says: *"The circle symbolises eternity because it has no beginning or end"*.

In his best well-known Socratic Dialogue, [The Republic](https://en.wikipedia.org/wiki/Republic_(Plato)), he emphasises: *"The circle symbolises unity and wholeness because all points on the circumference are equidistant from the centre."*

[Aristotle](https://en.wikipedia.org/wiki/Aristotle), a student of Plato, argued that the Circle was the basis for all the other geometrical figures. He was right, but in a subtler way than you would normally expect. But, enough philosophical speculation; let's get back to basic mathematics. I suppose everyone knows what a circle is:

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

# "Customising" the sine function (sinusoids)

As Software Engineers, our first reflex is to make our code more extensible and customisable, so why don't we introduce a few more parameters to our sine function so that we can "control" its behavior further?

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

We can even express "square waves" as a sum of sinusoids. Let's take, for example, the following formula:

$$
y(x) = \frac{4}{\pi}\sum_{k=1}^{\infty}\frac{sin(2\pi(2x-1)fx)}{2x-1}
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

Of course, this is not a rigorous demonstration; we were simply bold and appealed on your *visual intuition* (if there's such a thing).

# Euler's formula, the connection between $$e$$, $$\pi$$ and $$i$$

Euler's formula is a thing of marvel:

$$e^{ix}=cos(x) + i * sin(x)$$

If we chose $$x=\pi$$, then we get this exciting identity.

$$e^{i\pi}+1=0$$

With this simple mathematical *magic formula* we've just linked the circle (through the *irrational* number $$\pi$$ and it's associated trigonometric functions) with the imaginary ($$i$$) and with Euler's number $$e$$. And remember, we are speaking of numbers that are *irrational*, *transcendental* and *purely imaginary*. Somehow, mathematics works in areas that are not necessarily *rational* or *real* in a material sense, but are true... 

> Another bold statement: Some would say that $$\pi$$ and $$e$$ don't care about the geometry of the circles, their connection comes from a *higher* more abstract place, [check this answer on quora](https://affinemess.quora.com/What-is-math-pi-math-and-while-were-at-it-whats-math-e-math?__snids__=1596646755&__nsrc__=2).

> I know I am comparing apples with oranges, but sometimes it hurts me to see $$e=m*c^{2}$$ more prevalent in pop-culture than $$e^{i\pi}=-1$$.

For nostalgic reasons, we can also demonstrate Euler's formula through a more standard approach, using Maclaurin series (a special case of the [Taylor series](https://en.wikipedia.org/wiki/Taylor_series)). Honestly speaking, this is not exactly a necesary step for the purpose of this article, but nevertheles it's interesting to see that there are *numerical* ways of demonostrating something that starts visually. 

The *Maclaurin series* is a clever way to represent a function as an infinite sums of terms. It's particular useful in mathematics to approximate various functions. Just like the Fourier series we will speak about shortly, the idea of expressing a function as an infinite sum of "well behaved" terms is very important in mathematics. It takes from us the burden of dealing with all kind of *complexities* by compromising on the accuracy of our aproximation. 

In it's general form, the Maclaurin series, for a function $$f(x)$$ looks like:

$$f(x)=\sum_{n=0}^{\infty}\frac{\frac{d^n}{dx^n}f(0)}{n!}x^n$$

If $$f(x)=sin(x)$$, then the Maclaurin series is:

$$sin(x) = \textcolor{red}{sin(0)} + \frac{\textcolor{green}{\frac{d}{dx}sin(0)}}{1!} + \frac{\textcolor{blue}{\frac{d^2}{dx^2}sin(0)}}{2!} + \frac{\textcolor{orange}{\frac{d^3}{dx^3}sin(0)}}{3!} +...$$

But we know that: $$\textcolor{red}{sin(0)=0}$$, $$\textcolor{green}{\frac{d}{dx}sin(0)=cos(0)=1}$$, $$\textcolor{blue}{\frac{d^2}{dx^2}sin(0)=-sin(0)=0}$$, $$\textcolor{orange}{\frac{d^3}{dx^3}sin(0)=-cos(0)=-1}$$, and *the circle* is now complete. Computing derivates further, will be render the same repeating results $$\textcolor{red}{0}, \textcolor{green}{1}, \textcolor{blue}{0}, \textcolor{orange}{-1}, ...$$. Every even term of the series is $$0$$, and the odd ones that remain have alternating signs. It's the same *rotational* pattern all over again, the one you could see in the visual representation of the circle, with complex numbers when we were multiplying them with $$i$$, and when we were computing the derivative(s) of $$f(x)=e^{ix}$$. 

After we exclude the terms with $$\textcolor{red}{0}$$ and $$\textcolor{blue}{0}$$, the Maclaurin series for $$sin(x)$$ is:

$$sin(x)=\sum_{n=0}^{\infty}\frac{(-1)^n}{(2n+1)!}*x^{2n+1}$$

In a highly similar fasion we would be getting a very similar Maclaurin series for $$cos(x)$$:

$$cos(x)=\sum_{n=0}^{\infty}\frac{(-1)^n}{(2n)!}*x^{2n}$$

The Maclaurin series for $$e^{ix}$$ is simple to determine, so we will start by writing the Maclaurin series for $$e^x$$ first:

$$e^{x}=1+x+\frac{x^2}{2!}+\frac{x^3}{3!}+\frac{x^4}{4!}+...$$

And then we simply change the $$x$$ to $$ix$$:

$$e^{ix}=1+ix+\frac{(ix)^2}{2!}+\frac{(ix)^3}{3!}+\frac{(ix)^4}{4!}+\frac{(ix)^5}{5!}+...$$

We know that $$i^2=-1$$, $$i^3=-i$$, $$i^4=1$$, $$i^5=i$$, ...:

$$e^{ix}=1+ix-\frac{x^2}{2!}-\frac{ix^3}{3!}+\frac{x^4}{4!}+\frac{ix^5}{5!}+...$$

Once we group and factor the terms that contain $$i$$, things become:

$$e^{ix}=\underbrace{(1-\frac{x^2}{2!}+\frac{x^4}{4!}+...)}_{cos(x)=\sum_{n=0}^{\infty}\frac{(-1)^n}{(2n)!}*x^{2n}}+ i * \underbrace{(x-\frac{x^3}{3!}+\frac{x^5}{5!}+...)}_{\sin(x)=\sum_{n=0}^{\infty}\frac{(-1)^n}{(2n+1)!}*x^{2n+1}}$$

And now we have it, Euler's formula, a thing to marvel:

$$e^{ix}=cos(x)+i*sin(x)$$

# Complex sinusoids



# Fourier Series

# Fourier Series and Complex Numbers

# The code

# References

* [Radians](https://www.mathsisfun.com/geometry/radians.html)
