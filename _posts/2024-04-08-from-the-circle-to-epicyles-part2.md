---
title: "From the circle to epicycles (Part 2)"
date: "2024-04-08"
classes: wide
usemathjax: false
usekatex: true
usep5js: true
custom-javascript-list:
    - "/assets/js/2023-03-02-paiting-with-circles/commons.js"
custom-defer-javascript-list:
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
excerpt: "A short & visual introduction to Fourier Series"
categories:
- "math"
tags:
- "fun"
---

This is the second part of the article that started [here]({{site.url}}/2024/04/08/from-the-circle-to-epicycles-part1).

---

# Contents

- [Fourier Series](#fourier-series)
   * [Fourier series for the Square wave](#fourier-series-for-the-square-wave)
   * [Fourier series of the triangle wave](#fourier-series-of-the-triangle-wave)
   * [Fourier series of a sawtooth function](#fourier-series-of-a-sawtooth-function)
   * [A Fourier Series Machinery](#a-fourier-series-machinery)

---

# Fourier Series

*Fourier Series* is the mathematical process through which we take an arbitrary function (that needs to have a few properties) and expand it as a sum of trigonometric functions. Remember the **Maclaurin series** (for decomposing $$f(x)$$) we used to prove Euler's Identity a few chapters back: 

$$f(x)=\sum_{n=0}^{\infty}\frac{\frac{d^n}{dx^n}f(0)}{n!}x^n$$

It's the same concept, but our expansion will use cosines and sines this time.

We can make an even more artistic observation. Let's look at [Pink Floyd's](https://en.wikipedia.org/wiki/Pink_Floyd) album cover for the [*Dark Side of The Moon*](https://en.wikipedia.org/wiki/The_Dark_Side_of_the_Moon):

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

Remember the *Square Wave* we've approximated with sinusoids [in this section]({{site.url}}/2024/04/08/from-the-circle-to-epicycles-part1#adding-sinusoids)? At that point, we used the following formula to express the *Square* as a sum of sinusoidal components:

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

---

Thank you for reading so far. There will a third and probably a fourth part soon. 