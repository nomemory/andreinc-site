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
    - "/assets/js/2023-03-02-paiting-with-circles/sumsimple.js"
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

Everyone knows what a circle is:

<div id="simple-circle-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/simplecircle.js)</sup></sup>

It's a geometric figure, with a *center* point $$P(a,b)$$, and radius ($$r$$). Nothing more, nothing less. Based on this, we can come up with a *numeric definition* for the culprit:

$$
\forall (x,y) \in \mathbb{R}^{2}, (x-a)^{2} + (y-b)^{2} = r^2 \\
\text{where a and b are the coordinates } \\
\text{of the centre of the Circle} 
$$

If we pick the circle's centre to be the centre of the [*Cartesian Grid*](https://en.wikipedia.org/wiki/Cartesian_coordinate_system) $$(a=0,b=0)$$, and the circle's radius to be $$1$$, the relationship becomes $$x^2 + y^2 = 1$$. This is the [*Unit Circle*](https://en.wikipedia.org/wiki/Unit_circle), where each point is *one unit* away from the origin (centre).

So (the unit) circle is composed of an infinity of dimensionless points $$P(x_{i}, y_{i})$$, for which their coordinates satisfy the simple *Pythagorean* condition: $$x_{i}^2 + y_{i}^2=1$$.

<div id="simple-circle-rotating-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/simplecirclerotating.js)</sup></sup>

The key to the circle's symmetry stems from the fact that $$\forall x \in \mathbb{R}, x^{2} = (-x)^2$$, so every point is perfectly reflected on the *other side*, regardless of the *quadrant*:

<div id="triangle-in-circle-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/triangleincircle.js)</sup></sup>

For example, if a take a point $$A(x,y)$$, its reflection on the other side (the opposite quadrant), will be $$A^{'}(-x, -y)$$. Because $$x^2+y^2=(-x)^2 + (-y)^2$$, then we can say that both $$A$$ and $$A^{'}$$ are on the same circle. Pick two symetrical points, rotate them around, and you will obtain a circle.

But speaking of Pythagoras, if we look closer at the *equation* defining the Circle, $$x^2 + y^2 = 1$$, we can intuitively feel there's a *strong connection* between this, the cartesian system, and the right triangle: what if $$x$$ and $$y$$ are the legs of the triangle, and the hypotenuse is $$1$$ (the radius)?

What it means is that we can *trap* an infinity of right triangles inside a circle. To make things simpler, we also can define `sine` and `cosine` in relationship with the *Unit Circle*:

<div id="simple-circle-rotating-triangle-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/simplecirclerotatingtriangle.js)</sup></sup>

Where:
* $$\theta$$ is the angle formed by the radius, $$r$$ and the $$x$$ axis, at every given point. 
* The `sine` function is defined as the y-coordinate of a point on the *Unit Circle*;
* The `cosine` function is the x-coordinate of the same point on the *Unit Circle*. 

As the point moves around the circle in a counterclockwise direction, the values of the `sine` and `cosine` functions change, creating a wave-like pattern, where *the motion* of the *wave* is created by the *pulsating radius* rotating clockwise.

> Because what happens on the circle stays on the circle, the equation $$x^2+y^2=1$$ is now equivalent to a fundamental trigonometrical identity: $$sin^2(x)+cos^2(x)=1$$, $$\forall (x,y) \in \mathbb{R}^{2}$$.

Defining `sine` and `cosine` in the context of a square triangle is limiting. What if the angle ($$\theta$$) becomes greater or equal to $$90^\circ$$? That doesn't make sense because we already have a $$90^\circ$$ angle... If we use the *Unit Circle* as the underlying foundation to think about the two functions, we don't have this problem anymore, our definition broadens, and `sine` and `cosine` suddenly make sense for $$\theta \geq 90^\circ$$. 

# Radians and the number $$\pi$$

> Have you ever wondered why do we use $$360°$$, and not another number? What makes $$360°$$ special, compared to, let's say, $$800°$$? Here are some potential [answers](https://hsm.stackexchange.com/questions/1884/origin-of-360-degrees).

In practice, we rarely see angles expressed in degrees; usually, we represent them in relation to the number $$\pi$$: $$\pi$$, $$\frac{\pi}{2}$$, $$\frac{\pi}{3}$$, $$\frac{\pi}{4}$$, etc.; where $$\pi$$ (or `PI`) is the ratio of a circle's circumference to its diameter, and it approximates `π ≈ 3.14`. The `radian` (or `rad`) is the *true* unit we use to measure angles. There is an intimate relationship between the `radian` and the number $$\pi$$. 

Unfortunately for us, $$\pi$$ is an [*irrational number*](https://en.wikipedia.org/wiki/Irrational_number); meaning its decimal expansion never repeats or terminates. You cannot express $$\pi$$ as a ratio between two numbers. $$\pi$$ is endless. In this regard, it's scary to think we can only approximate the area or the length of a circle up to a certain decimal point; but don't worry, there are no perfect circles in the material universe, and if there are, we won't be able to tell for sure - *infinity* is disarming. 

To better understand "what is $$\pi$$?", let's look at the following animation. If we roll a *Unit Circle* over a *flat surface* (the $$x$$ axis), a complete rotation leaves a trail with a length equal to $$2*\pi$$. 

If we roll a circle with a $$radius \neq 1$$ instead, the trail (*perimeter*) will be $$2*\pi*r$$.

<div id="rotating-PI-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/rotatingpi.js)</sup></sup>

So, the angles expressed in degrees can also be described by circle's rolling *projection* on the $$x$$ axis. The following animation is interactive, hold the mouse pressed in the middle of the circle, and move it left or right to see the correspondence between radians and degrees:

<div id="rotating-PI-w-PI-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/rotatingpiwpi.js)</sup></sup>

To transform an angle measured in degrees ($$360°$$) to radians, the algorithm is simple, we multiply the angle by $$\pi$$, and then we divide the result by $$180$$. To transform back an angle measured from radians to degrees, we do the inverse operations, multiply the angle by $$180$$, and divide everything by $$\pi$$.

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

If you like math, is good you memorize the values. If not, they can easily be determined.

# A look into sine and cosine functions

The *moving* radius inside the Unit Circle is the *moving element* that helps us plot the $$sin$$ function. Sine is like a wave that oscillates in the interval $$[-1, 1]$$, from $$-\infty$$ to $$\infty$$, regardless of the input. In a way, $$sine$$ *unrolls* the circle in/with time. Given the circle's symmetrical nature, sine is a periodical function, that repeats every $$2\pi$$ units. 

<div id="simple-osc-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/simpleosc.js)</sup></sup>

At this point it will be unfair for cosine not to plot it on the same graph:

<div id="simple-osc-cos-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/simpleosccos.js)</sup></sup>

If you put $$sin$$ and $$cos$$ on the same graph, you will soon realize they are not so different after all, they are almost the same function, with a phase shift between them.

So, if we have this relationship $$sin(x + a) = cos(a)$$, which we know it's true $$\forall a$$, how do we find $$x$$? There's a visual solution to this, but we can also use a simple trigonometrical identity to find the answer.

We do know that $$sin(x+a)= sin(x)*cos(a)+ cos(x)*sin(a)$$. Thus our equation becomes: $$cos(a)=sin(x)*cos(a) + cos(x)*sin(a)$$.

But we know this is true, no matter how we pick $$a$$. So why don't we pick $$a=0$$ ($$sin(0)=0$$ and $$cos(0)=1$$). Replacing this in our equation, we obtain $$1=sin(x)$$.

Now, let's choose $$a=\frac{\pi}{2}$$, then our relationship becomes, $$cos(\frac{\pi}{2})=sin(x)*cos(\frac{\pi}{2})+cos(x)*sin(\frac{\pi}{2})$$, which is equivalent to: $$0=cos(x)$$. 

The $$x$$ for which $$sin(x)=1$$ and $$cos(x)=1$$ is $$x=\frac{\pi}{2}$$. Sorry $$cos$$, you are not very original, because $$sin(a+\frac{\pi}{2})=cos(a)$$... it's only a phase they say. But hey, remember I've told you sine and cosine are periodical functions, then there are multiple solutions for $$x$$, so to generalize further we can say that $$sin(a+\underbrace{(\frac{\pi}{2}+2k\pi)}_{x})=sin(a+\frac{\pi}{2})=cos(a)$$, $$\forall k \in \mathbb{Z}$$.

This is of course obvious if we plot the functions side by side:

<div id="sin-cos-side-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/sincosside.js)</sup></sup>

Because the cosine function has a small headstart ($$\frac{\pi}{2}$$) to the sine function, it's said that the *cosine leads the sine*, or that *sine lags the cosine*. All in all, don't get lost in details, whenever we refer to the term *sinusoid* we refer to both sine and cosine, without discrimination. *In a world of sines, always struggle to be the cosine!*

# "Customising" the sine function (sinusoids)

As Software Engineers, our first reflex is to make our code more extensible and customisable, so why don't we introduce a few more parameters to our sine function so that we can "control" it's behavior further.

So why don't we introduce $$y(t)$$, as a function of "time" where:

$$y(t) = A * sin(2\pi ft + \varphi) = A * sin(\omega t + \varphi)$$

This function is called a *sinusoidal wave*, or simply a *sinusoid*, and it often occurs in physics (and mathematics), engineering and signal processing. Altering the parameters of the function, alters the way we plot it on the Cartesian Grid.

But speaking of params:
* $$A$$ is called the *amplitutde*, and represents the maximum deviation of the function from zero. The deviation can be both negative and positive.
* $$f$$ is called *ordinary frequency* (not in a pejorative way), and denotes the number of oscilations (the radius moving inside the circle) that occur each second of time.
* $$\omega=2\pi f$$ is called the *angular frequency*, it's same as *ordinary frequency* but it's expressed in $$\frac{radians}{second}$$;
* $$\varphi$$ is called *phase* (measured in radians);

If we consider *time* to be the x-axis the sinusoid is:

$$y=f(x)=A * sin(\omega x + \varphi)$$

If we pick $$A=1$$, and $$\omega=1$$ (and $$\varphi=\frac{\pi}{2}$$) we get our $$sin$$ and $$cos$$ functions back. But in the name of science, let's see how our *sinusoid* behaves under different circumstances. 

The following animation is interactive. You can choose the values of $$A=$$ 
    <select id="sinusoid_A" onchange="updateSinusoids()">
        <option value="0.5">0.5</option>
        <option value="1">1</option>
        <option value="2" selected>2</option>
    </select>
    , $$\omega=$$
        <select id="sinusoid_omega" onchange="updateSinusoids()">
        <option value="1">1</option>
        <option value="2" selected>2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
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

* $$A$$ actually corresponds to the radius of the circle used to generate the oscilation. If we increase the amplitutde we increase the radius of the circle;
* $$\omega$$ increases the frequency. This means more "waves" will be squeezed together inside the $$2\pi$$ interval than for a normal sine/cosine wave.
* $$\varphi$$ increases the phase. If for example we set $$\varphi=\frac{\pi}{2}$$, our sine becomes a cosine.

# Adding sinusoids

At this point things will become more interesting. If you start suming up sinusoids, new oscillating patterns will appear. The more sinusoids we sum-up, the more complex the patterns are going to be. If we have enough sinusoids around, we can start "painting" (approximating) real-world shapes. Philosophicall speaking, if we have an infinity of sinusoids at our disposal, and with just a little mathematical imagination, we can "draw" the exact everything. And remember, it all started with the circle.

But, let's take it slowly and sum-up a few sinusoids to see what's happening. Visually speaking, adding two sinusoids is just like adding two "normal" mathematical functions. 


So let's plot two arbitrary selected sinusoids $$y_{1}(x)$$ and $$y_{2}(x)$$, where:
* $$y_{1}(x) = \frac{1}{2} * sin(7x + \frac{\pi}{2})$$, and 
* $$y_{2}(x) = \frac{7}{10} * sin(3x - 2)$$ .

The sum $$y(x)=y_{1}(x) + y_{2}(x)$$ already looks more "fascinating".

<div id="sum-simple-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/sumsimple.js)</sup></sup>

# Complex numbers and circles (short math recap)

Complex numbers are numbers that consist of a *real* part. An imaginary part, usually written in the form $$a+b*i$$, where $$a, b \in \mathbb{R}$$, and $$i$$ is the imaginary unit, so that $$i^2=-1$$.

Complex numbers can also be represented geometrically as points in the complex plane. The real part of a complex number corresponds to the $$x$$-coordinate of the point, while the imaginary part corresponds to the $$y$$-coordinate. $$x$$ becomes $$Re$$ (gets its name from the word *Real*) and $$y$$ becomes $$Im$$ (gets its name from the word *Imaginary*).

The following animation plots random imaginary numbers into the complex plane, there's nothing particularly complicated about this:

<div id="in-num-sketch"></div>
<sup><sup>[(Source code)]({{site.url}}//assets/js/2023-03-02-paiting-with-circles/imnum.js)</sup></sup>

# References

* [Radians](https://www.mathsisfun.com/geometry/radians.html)