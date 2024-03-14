---
title: "Know your limits"
date: "2024-03-08"
classes: wide
comments: true
excerpt: "A selection of math problems involving limits."
usekatex: true
categories:
- "nontech"
- "math"
tags:
- "2023"
---

# The Problems

---

**1.** <sup><sup>medium</sup></sup> If the sequence of real numbers $$x_n$$, with $$x_0 \gt 0$$ is defined by the following [recurrence relationship](https://en.wikipedia.org/wiki/Recurrence_relation): $$x_{n+1}=x_{n}+\frac{1}{\sqrt{x_{n}}}$$, compute: $$lim_{x \to \infty} \frac{x_n^3}{n^2}$$. <sup><sup>[Hint](#hint-1) &  [Answer](#answer-1)</sup></sup>

---

# Hints

## Hint 1

Have you considered using the [Stolz-Cesaro Theorem](https://en.wikipedia.org/wiki/Stolz%E2%80%93Ces%C3%A0ro_theorem)?

# Answers 

## Answer 1

This exercise is easily solvable using the [Stolz-Cesaro Theorem](https://en.wikipedia.org/wiki/Stolz%E2%80%93Ces%C3%A0ro_theorem).

If $$(a_n)_{n \ge 1}$$ and $$(b_n)_{n \ge 1}$$ are two sequences of real numbers, and $$b_n$$ is strictly monotone, then:

$$
\lim_{n \to \infty} \frac{a_{n+1}-a_{n}}{b_{n+1}-b_{n}}= \lim_{n \to \infty} \frac{a_{n}}{b_{n}}
$$

Let's compute $$\lim_{n \to \infty} \frac{\sqrt{x_n^3}}{n}$$ first. 

Applying the theorem, the limit becomes:

$$
\lim_{n \to \infty} \frac{\sqrt{x_n^3}}{n}=\lim_{n \to \infty} \frac{\sqrt{x_{n+1}^3} - \sqrt{x_n^3}}{n+1-n}
$$ 

If we substitute $$x_n \rightarrow y$$, the new limit we want to compute is:

$$
\lim_{y \to \infty} \sqrt{(y+\frac{1}{\sqrt{y}})^3} - \sqrt{y^3}
$$

This form already looks more approachable. We can write our limit as:

$$
\lim_{y \to \infty} \frac{(\sqrt{(y+\frac{1}{\sqrt{y}})^3} - \sqrt{y^3})(\sqrt{(y+\frac{1}{\sqrt{y}})^3} + \sqrt{y^3})}{\sqrt{(y+\frac{1}{\sqrt{y}})^3} + \sqrt{y^3}}
$$

Which leads to a simpler form:

$$
\lim_{y \to \infty} \frac{(y+\frac{1}{\sqrt{y}})^3 - y^3}{\sqrt{(y+\frac{1}{\sqrt{y}})^3} + \sqrt{y^3}}
$$

Now, we are only interested in the biggest powers of $$y$$, so we can mentally think of our limit as:

$$
\lim_{y \to \infty} \frac{3*y^{\frac{3}{2}}+....}{2*y^{\frac{3}{2}}+...} = \frac{3}{2}
$$

Of course, nothing stops us from using [L'Hospital](https://en.wikipedia.org/wiki/L'H%C3%B4pital's_rule).

The final answer is $$\frac{9}{4}$$.

