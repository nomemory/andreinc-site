---
title: "20 algebra problems selected from the Romanian Olympiad (Part 1)"
date: "2024-02-23"
classes: wide
comments: true
excerpt: "A selection of 20 math problems from the Romanian Math Olympiad (solutions included)."
usekatex: true
categories:
- "nontech"
- "math"
tags:
- "2023"
---

# Introduction

> This is a "follow-up" to the previous article: ["The math exams of my life"]({{site.url}}/2024/01/09/the-most-important-math-exams-of-my-life), as some readers were curious to see some examples of Math Olympiad exercises.

This a selection of *cute*, *non-trivial* algebra problems (with a hint of *number theory*) *compiled* from the Romanian Math Olympiad (regional phase or *faza judeteana*) for 8<sup>th</sup>, 9<sup>th</sup>, and 10<sup>th</sup> graders (13-15 years old). 

The solutions are surprising and involve a good understanding of algebraic concepts, pattern spotting, or tricks that, in the long run, help students develop [mathematical intuition](https://en.wikipedia.org/wiki/Logical_intuition#:~:text=Logical%20Intuition%2C%20or%20mathematical%20intuition,to%20solve%20mathematical%20challenges%20efficiently.). 

Depending on your passion for mathematics (or competitive mathematics), the problems should pose enough difficulty to keep you entertained for a few hours. If you are stuck with one problem, try to read the hint instead of going straight to the answer.

In case you want to solve them by yourself, do a short recap on the following subjects:
* [Sets](https://en.wikipedia.org/wiki/Set_(mathematics));
* [Sequences of numbers](https://en.wikipedia.org/wiki/Sequence);
* [Faulhaber's formula](https://en.wikipedia.org/wiki/Faulhaber%27s_formula);
* [Rearrangement inequality](https://en.wikipedia.org/wiki/Rearrangement_inequality)
* [AM-GM Inequality](https://en.wikipedia.org/wiki/AM%E2%80%93GM_inequality);
* [Cauchy–Bunyakovsky–Schwarz Inequality](https://en.wikipedia.org/wiki/Cauchy%E2%80%93Schwarz_inequality);
* [Hermite's Identity](https://en.wikipedia.org/wiki/Hermite%27s_identity);
* [Monotonic functions](https://en.wikipedia.org/wiki/Monotonic_function).

The main topic of this problem set is: "Inequalities".

# Additional note(s)

I have a few notebooks containing solutions for various Math problems I've solved over the years (recreational mathematics).  If time allows, I will publish more lists covering more topics. Currently, I am in the process of grouping them into categories.

![img]({{site.url}}/assets/images/2024-03-10-23-algebra-problems-part-1/notebook.jpeg){:height="75%" width="75%"}

<sup><sup>"Screenshot" from one my notebooks.</sup></sup>

The problems are from the "Regional" Phase of the Romanian Math Olympiad. The truly difficult problems are usually the ones from the "National" phase. I am planning to publish a list of those as well. 

Another important aspect is that I am not a *mathematician*, so if you see that solutions are incorrect or have better solutions, please send me some feedback.

# The Problems

---

**1.** <sup><sup>easy</sup></sup> Compute $$S=1-4+9-16+..+99^2-100^2$$. <sup><sup>[Hint](#hint-1) &  [Answer](#answer-1)</sup></sup>

---

**2.** <sup><sup>easy</sup></sup> Determine the smallest element of the set  $$\{ab \text{ } \lvert \text{ } a,b \in \mathbb{R} \text{ and } a^2 + 2b^2=1\}$$? <sup><sup>[Hint](#hint-2) &  [Answer](#answer-2)</sup></sup>

---

**3.** <sup><sup>easy</sup></sup> What is the [cardinality](https://en.wikipedia.org/wiki/Cardinality) of following set: $$\{x \in \mathbb{R} \lvert [\frac{x+1}{5}]=\{\frac{x-1}{2}\} \}$$. $$\{ a \}$$ is the [fractional part](https://mathworld.wolfram.com/FractionalPart.html) of the number $$a \in \mathbb{R}$$, and $$[a]$$ is the [integer part](https://mathworld.wolfram.com/IntegerPart.html) of $$a \in \mathbb{R} $$.  <sup><sup>[Hint](#hint-3) &  [Answer](#answer-3)</sup></sup>

---

**4.** <sup><sup>easy</sup></sup> Find all the elements of the set $$\{\frac{3}{2x} \lvert x \in \mathbb{R} \text{ and, } \frac{1}{[x]} + \frac{1}{\{x\}}=2x \}$$. $$\{ a \}$$ is the [fractional part](https://mathworld.wolfram.com/FractionalPart.html) of the number $$a \in \mathbb{R}$$, and $$[a]$$ is the [integer part](https://mathworld.wolfram.com/IntegerPart.html) of $$a \in \mathbb{R} $$.  <sup><sup>[Hint](#hint-1) &  [Answer](#answer-1)</sup></sup>

---

**5.** <sup><sup>easy</sup></sup> Given $$a,b,c \in \mathbb{R}^{*}$$, we know that $$(a,b,c)$$ are part of an [arithmetic progression](https://en.wikipedia.org/wiki/Arithmetic_progression), $$(ab, bc, ca)$$ are part a [geometric progression](https://en.wikipedia.org/wiki/Geometric_progression), and $$a+b+c=ab+bc+ca$$. The triplets in the set $$M=\{(a,b,c)\ \lvert a,b,c \in \mathbb{R}^{*}\}$$ satisfy all the conditions mentioned before.

Compute $$\sum_{(a,b,c) \in M} (\lvert a \rvert + \lvert b \rvert + \lvert c \rvert)$$.  <sup><sup>[Hint](#hint-5) &  [Answer](#answer-5)</sup></sup>

---

**6.** <sup><sup>easy</sup></sup> For the following sequence of numbers $$(a_n)_{n \ge 1}$$, $$a_1=1$$ and $$a_2=6$$ and $$a_{n+1}=\frac{a_n}{a_{n-1}}$$, $$n \ge 2$$, compute $$a_{2021}$$.  <sup><sup>[Hint](#hint-6) &  [Answer](#answer-6)</sup></sup>

---

**7.** <sup><sup>medium</sup></sup> Find all numbers $$k \in \mathbb{Z}$$, so that $$a^4+b^4+c^4+d^4+k*abcd \ge 0$$, $$\forall a,b,c,d \in \mathbb{R}^{*}$$.  <sup><sup>[Hint](#hint-7) &  [Answer](#answer-7)</sup></sup>

---

**8.**  <sup><sup>medium</sup></sup> If $$x,y,z,t \in \mathbb{R}$$, and $$(x-3y+6z-t)^2 \ge 2021$$ and $$x^2+y^2+z^2+t^2 \le 43$$, then what is the value of the expression:  $$\lvert x + y + z + t \rvert$$ ?  <sup><sup>[Hint](#hint-8) &  [Answer](#answer-8)</sup></sup>

---

**9.** <sup><sup>medium</sup></sup> Considering $$x^2 + (a+b+c)x + k(ab+bc+ca) = 0$$  where $$a,b,c \in \mathbb{R}_{+}^{*} \text{, and } k \in \mathbb{R}$$ prove that $$\forall k \le \frac{3}{4}$$ the equation has all its solution in $$\mathbb{R}$$. <sup><sup>[Hint](#hint-9) &  [Answer](#answer-9)</sup></sup>

---

**10.** <sup><sup>easy</sup></sup> Prove that $$[\frac{x+3}{6}] - [\frac{x+4}{6}] + [\frac{x+5}{6}] = [\frac{x+1}{2}] - [\frac{x+1}{3}]$$ is true, $$\forall x \in \mathbb{R}$$. <sup><sup>[Hint](#hint-10) &  [Answer](#answer-10)</sup></sup>

---

**11.** <sup><sup>medium</sup></sup> Prove that if $$\sum_{k=1}^{n} a_k = \sum_{k=1}^{n} a_k^2$$ then $$\sum_{k=1}^{n} a_k \le n$$, with $$a_k \in \mathbb{R}_{+}$$. <sup><sup>[Hint](#hint-11) &  [Answer](#answer-11)</sup></sup>

---

**12.** <sup><sup>medium</sup></sup> If $$a^2+b^2+c^2=3$$ prove ($$\lvert a \rvert + \lvert b \rvert + \lvert c \rvert - abc) \le 4$$, where $$a,b,c \in \mathbb{R}$$. <sup><sup>[Hint](#hint-12) &  [Answer](#answer-12)</sup></sup>

---

**13.** <sup><sup>hard</sup></sup> Prove $$\frac{a+b}{c^2}+\frac{b+c}{a^2}+\frac{c+a}{b^2} \ge 2(\frac{1}{a}+\frac{1}{b}+\frac{1}{c})$$ if $$a,b,c \in \mathbb{R}_{+}^{*}$$. <sup><sup>[Hint](#hint-13) &  [Answer](#answer-13)</sup></sup>

---

**14.**  <sup><sup>easy</sup></sup> Prove that if $$x \in \mathbb{R}$$ and $$x^2+x \in \mathbb{Q}$$ and $$x^3+2x \in \mathbb{Q}$$, then $$x \in \mathbb{Q} \subset \mathbb{R}$$.  <sup><sup>[Hint](#hint-14) &  [Answer](#answer-14)</sup></sup>

---

**15.** <sup><sup>medium</sup></sup> Given $$a,b \in \mathbb{R}$$, we know $$3^a+13^b=17^a$$, and $$5^a+7^b=11^b$$. Prove $$a \lt b$$. <sup><sup>[Hint](#hint-15) &  [Answer](#answer-15)</sup></sup>

---
**16.** <sup><sup>medium</sup></sup> For $$n \in \mathbb{N}, n \ge 2$$, let $$u(n)$$ be the biggest prime number $$\le n$$ and $$v(n)$$ be the smallest prime number $$\gt n$$. Prove:

$$
\frac{1}{u(2)*v(2)}+\frac{1}{u(3)*v(3)}+...+\frac{1}{u(2010)*v(2010)}=\frac{1}{2}-\frac{1}{2021}
$$

<sup><sup>[Hint](#hint-16) &  [Answer](#answer-16)</sup></sup>

---

**17.** <sup><sup>medium</sup></sup> Prove $$\frac{1}{x^2+yz}+\frac{1}{y^2+xz}+\frac{1}{z^2+xy} \le \frac{1}{2} (\frac{1}{xy}+\frac{1}{yz}+\frac{1}{xz})$$,  $$\forall x,y,z \in \mathbb{R}_{+}^*$$. <sup><sup>[Hint](#hint-17) &  [Answer](#answer-17)</sup></sup>

---

**18.** <sup><sup>medium</sup></sup> For $$a,b,c \in (0,1) \subset \mathbb{R}$$, $$x,y,z \in (0, \infty) \subset \mathbb{R}$$, if:

$$
\begin{cases}
a^x = bc \\
b^y = ca \\
c^z = ab
\end{cases}
$$

Prove that:

$$
\frac{1}{2+x} + \frac{1}{2+y} + \frac{1}{2+z} \le \frac{3}{4}
$$

<sup><sup>[Hint](#hint-18) &  [Answer](#answer-18)</sup></sup>

---

**19.** <sup><sup>easy</sup></sup> If $$x,y,z \in R_{+}^{*}$$, and $$xy=\frac{z-x+1}{y}=\frac{z+1}{2}$$, prove that one of the numbers is the arithmetical mean of the other two. <sup><sup>[Answer](#answer-19)</sup></sup>

---

**20.** <sup><sup>medium</sup></sup> If $$a,b,c \in (1, \infty) or a,b,c \in (0,1)$$. Prove:

$$
log_a(bc) + log_b(ca) + log_c(ab) \ge 4(log_{ab}(c) + log_{bc}(a) + log_{ca}b)
$$

<sup><sup>[Hint](#hint-20) &  [Answer](#answer-20)</sup></sup>

---

# Hints

## Hint 1.

Try playing with [Faulhaber's formula](https://en.wikipedia.org/wiki/Faulhaber%27s_formula).

## Hint 2.

Find a way to *introduce* $$ab$$ in the given equality $$a^2 + 2b^2=1$$.

## Hint 3.

Try to get rid of the fractional part.

## Hint 4.

Try to do some substitutions based on the fact $$x=[x]+\{x\}$$.

## Hint 5.

Use $$a$$ to express $$b$$ and $$c$$.

## Hint 6.

Look for any patterns by computing the first few terms of the sequence.

## Hint 7.

Give *meaningful* values to $$a,b,c,d$$ and see what's happening.

Have you considered [AM-GM inequality](https://en.wikipedia.org/wiki/AM%E2%80%93GM_inequality)?

## Hint 8.

Can you use the [Cauchy–Bunyakovsky–Schwarz](https://en.wikipedia.org/wiki/Cauchy%E2%80%93Schwarz_inequality) inequality to solve the problem?

## Hint 9.

Can you use the [Rearrangement inequality](https://en.wikipedia.org/wiki/Rearrangement_inequality) to solve the problem?

## Hint 10.

Can you use [Hermite's identity](https://en.wikipedia.org/wiki/Hermite%27s_identity) to solve the problem?

## Hint 11.

Can you use the [Cauchy–Bunyakovsky–Schwarz](https://en.wikipedia.org/wiki/Cauchy%E2%80%93Schwarz_inequality) inequality to solve the problem?

## Hint 12.

Can you use both [CBS](https://en.wikipedia.org/wiki/Cauchy%E2%80%93Schwarz_inequality) and [AM-GM](https://en.wikipedia.org/wiki/AM%E2%80%93GM_inequality) inequalities?

## Hint 13.

Can you prove first $$\frac{x}{y^2}+\frac{y}{x^2} \ge \frac{1}{x} + \frac{1}{y}$$ ?

## Hint 14.

Try expressing $$x$$ as a relationship between two rational numbers.

## Hint 15.

Think in terms of [monotonically increasing](https://en.wikipedia.org/wiki/Monotonic_function) and [monotonically decreasing](https://en.wikipedia.org/wiki/Monotonic_function) functions.

## Hint 16.

How many times a term $$\frac{1}{u(n)*v(n)}$$ appears in the sum ?

## Hint 17.

Can you find a way to use the [AM-GM inequality](https://en.wikipedia.org/wiki/AM%E2%80%93GM_inequality)?

## Hint 18.

Work on the expressions involving logarithms. Consider changing the base of the logarithms to a common one.

## Hint 19.

This exercise is easy, so it doesn't deserve a hint.

## Hint 20.

Consider changing the base of the logarithms to a common one.

# Answers

## Answer 1.

We write our sum as:

$$S=(1^2-2^2)+(3^2-4^2)+...+(99^2-100^2)$$

There is a formula for the difference of two square numbers: 

$$a^2-b^2=(a-b)(a+b)$$

Our $$S$$ is a sum of differences between subsequent square numbers:

$$S=(1-2)(1+2)+(3-4)(3+4)+...+(99-100)(99+100) \Leftrightarrow$$ 

$$S=-3-7-11-...-199$$

If you have a keen eye for observations, you notice the numbers $$3,7,11,...,199$$ have this form $$3+k*4$$, $$k=0..49$$.

$$S=-(3+0*4)-(3+1*4)-(3+2*4)-...-(3+49*4) \Leftrightarrow $$

$$S=-3*50-4(0+1+2+...+49) \Leftrightarrow $$https://en.wikipedia.org/wiki/Rearrangement_inequality

The infinite series whose terms are natural numbers,  $$1+2+3+...+n$$, is divergent. But we know the $$nth$$ partial sum of the series to be: $$\sum_{k=1}^{n}k=\frac{n(n+1)}{2}$$, so:

$$S=-150-4*\frac{49(49+1)}{2}$$

The final answer $$S=-150-4900=-5050$$.

---

# Answer 1.

If you are familiar with [Faulhaber's formula](https://en.wikipedia.org/wiki/Faulhaber%27s_formula), you know that: 

$$\sum_{k=1}^n k = \frac{n(n+1)}{2}$$

$$\sum_{k=1}^n k^2 = \frac{n(n+1)(2n+1)}{6}$$

We can cleverly use the two formulas and reimagine our $$S$$ to be:

$$S=\underbrace{(1^2+2^2+3^2+...+100^2)}_{\sum_{k=1}^{100} k^2} - \underbrace{2*(2^2+4^2+6^2+..+100^2)}_{\sum_{k=1}^{50} (2k)^2} \Leftrightarrow$$

$$S=\frac{100*101*201}{6}-2*(2^2*1^2+2^2*2^2+2^2*3^2+...+2^2*50^2) \Leftrightarrow$$

$$S=\frac{100*101*201}{6}-8*\frac{50*51*101}{6}$$

Final answer $$S=-5050$$.

---

# Answer 2.

The intuition begs us to find a way to link our existing relationship to a term containing $$ab$$. In this regard:

$$1=a^2+2b^2=a^2 + (b\sqrt{2})^2 \Leftrightarrow $$

$$1=a^2 + \underbrace{2*\sqrt{2}ab}_{\text{we add this}} + (b\sqrt{2})^2 - \underbrace{2*\sqrt{2}ab}_{\text{to remove it later}}  \Leftrightarrow $$

$$1=(a+b\sqrt{2})^2 - 2\sqrt{2}ab \Leftrightarrow $$

$$1+2\sqrt{2}ab=(a+b\sqrt{2})^2$$

But we know that:

$$(a+b\sqrt{2})^2 \geq 0 \Rightarrow$$ 

$$1+2\sqrt{2}ab \geq 0 \Rightarrow $$

$$ab \geq \frac{-1}{2\sqrt{2}}$$

But is it possible for $$ab=\frac{-1}{2\sqrt{2}}$$. Yes, $$ab=\frac{-1}{2\sqrt{2}}$$ when $$(a+b\sqrt{2})^2=0$$.

All in all, the smallest element of our set is $$\frac{-1}{2\sqrt{2}}$$.

---

# Answer 3.

If $$a \in \mathbb{R}$$, then: 

$$a=[a]+\{a\} \Leftrightarrow $$

$$\{a\}=a-[a]$$

With this in mind, we want to get rid of *the wild* fractional part $$\{a\}$$ from our relationship:

$$[\frac{x+1}{5}]=\frac{x-1}{2} - [\frac{x-1}{2}] \Leftrightarrow$$

$$\underbrace{[\frac{x+1}{5}]}_{\in \mathbb{Z}}+\underbrace{[\frac{x-1}{2}]}_{\in \mathbb{Z}}=\frac{x-1}{2}$$ 

We can safely say that $$\frac{x-1}{2}=k \in \mathbb{Z}$$.

We substitute $$x=2k+1$$ in the original relation:

$$[\frac{2*k+1+1}{5}] + [\frac{2*k+1-1}{2}] = k \Leftrightarrow $$

$$[\frac{2k+2}{5}] + k = k \Leftrightarrow$$

$$[\frac{2k+2}{5}] = 0$$

Because $$[\frac{2k+2}{5}] = 0$$, then:

 $$0 \leq \frac{2k+2}{5} \lt 1 \Leftrightarrow$$

 $$-1 \leq k \lt \frac{3}{2}$$

There are $$3$$ numbers $$k \in \mathbb{Z}$$ that satisfy the relationship: $$\{-1,0,1\}$$. 

But, $$x=2k+1 \Rightarrow  x \in \{-1, 1, 3\}$$.

Testing our solutions:

$$
x = -1 \Rightarrow [\frac{-1+1}{5}] = \{ \frac{-1-1}{2} \} \Leftrightarrow [0] = \{ -1 \} \text{ is true}
$$

$$
x = 1 \Rightarrow [\frac{1+1}{5}] = \{ \frac{1-1}{2} \} \Leftrightarrow [\frac{2}{5}] = \{ 0 \} \text{ is true}
$$

$$
x = 1 \Rightarrow [\frac{3+1}{5}] = \{ \frac{3-1}{2} \} \Leftrightarrow [\frac{4}{5}] = \{ 1 \} \text{ is true}
$$

So the cardinality is $$3$$.

# Answer 4.

To [avoid division by zero](https://en.wikipedia.org/wiki/Division_by_zero) in $$\frac{3}{2x}$$, we know that $$x \neq 0$$.

> Note: The *fractional part operation* (denoted by $$\{a\}$$) is not distributive over multiplication, meaning $$\{a*b\} \neq \{a\} * \{b\}$$, so avoid making any further assumptions about $$\frac{1}{\{x\}}$$.

Firstly, $$\frac{1}{[x]} + \frac{1}{\{x\}}=2x$$ is equivalent to $$\frac{x}{[x]\{x\}}=2x$$, is equivalent to $$x(2[x]\{x\}-1)=0$$.

Because $$x \neq 0$$, then $$2[x]\{x\}=1$$, or $$\{x\}=\frac{1}{2[x]}$$.

We substitute $$[x]=n$$, so that $$\{x\}=\frac{1}{2n}$$, where $$n \in \mathbb{Z}$$ and $$n \geq 1$$.

$$x=[x]+{x}$$ becomes $$x=n+\frac{1}{2n}=\frac{2n^2+1}{2n}$$.

The term defining the set becomes $$[\frac{3}{2x}] \rightarrow [\frac{3}{2*\frac{2n^2+1}{2n}}]=[\frac{3n}{2n^2+1}]$$.

For $$n \ge 1$$, we know that $$0 \lt \frac{3n}{2n^2+1} \lt 1$$. Without calculus, we can easily prove that for $$n \ge 1$$, $$f(n)=3n$$, and $$g(n)=2n^2+1$$ are increasing functions, with $$g(n)$$ *increasing faster*, so that $$\frac{f(n)}{g(n)} \lt 1$$.

For certain we know that $$0 \lt \frac{3n}{2n^2+1}$$.

After we solve $$\frac{3n}{2n^2+1} \lt 1$$, we obtain $$n \ge 1$$. 

For $$n=1$$, $$[\frac{3}{2x}] \rightarrow 1$$, for $$n \gt 1$$, $$[\frac{3}{2x}] \rightarrow 0$$.

So the set $$\{\frac{3}{2x} \lvert x \in \mathbb{R} \text{ and, } \frac{1}{[x]} + \frac{1}{\{x\}}=2x \} = \{0, 1\}$$

# Answer 5.

$$(a,b,c)$$ are in an [arithmetic progression](https://en.wikipedia.org/wiki/Arithmetic_progression) $$\Rightarrow b=\frac{a+c}{2}$$.

$$(ab, bc, ac)$$ are in a [geometric progression](https://en.wikipedia.org/wiki/Geometric_progression) $$\Rightarrow (bc)^2 = ab*ac$$.

With this in mind, we have the following relationships:

$$
\begin{cases}
        b=\frac{a+c}{2} \\
        (bc)^2 = ab*ac \\
        a+b+c=ab+bc+ca
\end{cases}
$$

It doesn't look like it, but we have enough *information* to determine $$(a,b,c)$$

$$
\begin{cases}
        2b=a+c \\
        bc=a^2 \Leftrightarrow c=\frac{a^2}{b}\\
        3b=ab+bc+ac
\end{cases}
$$

But we can also write $$2b=a+\frac{a^2}{b}$$.

Putting all together in the last equation:

$$
3b=ab+\underbrace{bc}_{a^2}+a\underbrace{c}_{\frac{a^2}{b}} \Leftrightarrow \\
3b=ab+a^2+\frac{a^3}{b} \Leftrightarrow \\
3b=a(\underbrace{a+\frac{a^2}{b}}_{2b})+ab \Leftrightarrow \\
3b=2ab+ab 
$$

But because $$b \in \mathbb{R}^{*}$$, and $$3b=3ab$$, we can safely assume $$a=1$$.

If $$a=1$$, the relationship $$2b=a+c$$ becomes $$2b=1+\frac{1}{b} \Leftrightarrow 2b^2-b-1=0$$.

$$2b^2-b-1=0$$ can also be written as $$2b^2+b-(2b+1)=0$$ or $$b(2b+1)-(2b+1)=0 \Leftrightarrow (b-1)(2b+1)=0$$, so $$b=1$$ or $$b=-\frac{1}{2}$$.

For $$b=1$$, $$c=1$$, and for $$b=-\frac{1}{2}$$, $$c=-2$$.

So our triplets are $$(1,1,1)$$ or $$(1,-\frac{1}{2}, -2)$$.

Computing the sum is trivial: $$\sum=\frac{13}{2}$$.

## Answer 6.

The key to solving this exercise is to compute the first terms of the sequence:

$$
\begin{cases}
    a_1=2 \\
    a_2=6 \\
    a_3=\frac{6}{2}=3 \\
    a_4=\frac{3}{6}=\frac{1}{2} \\
    a_5=\frac{\frac{1}{2}}{3}=\frac{1}{6} \\
    a_6=\frac{\frac{1}{6}}{\frac{1}{3}}=\frac{1}{3} \\
    a_7=\frac{\frac{1}{3}}{\frac{1}{6}}=2 \\
    a_8=\frac{2}{\frac{1}{3}}=6 \\
    \text{... and so on}
\end{cases}
$$

We can see that after every 6 terms, the values repeat themselves. Using mathematical induction, we can prove that our sequence is:

$$
S(n)=
\begin{cases}
    2 \text{   ,}\text{ if }n=6*k+1 \\
    6 \text{   ,}\text{ if }n=6*k+2 \\
    3 \text{   ,}\text{ if }n=6*k+3 \\
    \frac{1}{2} \text{   ,}\text{ if }n=6*k+4 \\
    \frac{1}{6} \text{   ,}\text{ if }n=6*k+5 \\
    \frac{1}{3} \text{   ,}\text{ if }n=6*k 
\end{cases}
\text{, where } k \in \mathbb{N} 
$$

Final answer is: $$a_{2021} = \frac{1}{6}$$

## Answer 7.

When you have problems like this, you need to consider giving specific values to $$a,b,c,d$$ that can help you narrow down your search. 

For example, we know the inequality should hold regardless of $$a, b, c, d$$ ($$\forall$$), so let's assume the following:

$$a=b=c=d=n$$

Then:

$$
4*n^4+k*n^4 \ge 0 \Leftrightarrow \\
k \ge -4
$$

This already tells us that we need to look somewhere in $$k \in [-4, \infty) \cap \mathbb{Z}$$.

> On my first try, I've tried with $$a^2=b^2=m$$ and $$c^2=b^2=n$$, so I've got something like $$(n\sqrt{2} - m\sqrt{2})^2 + mn*(k+4) \ge 0$$. 

Now, we need to find an upper bound for $$k$$. For this, we need to apply some tricks to obtain:

$$
\text{something positive} + (\text{an upper bound}-k)*(\text{something positive}) \ge 0
$$

So why don't we pick:

$$
\begin{cases}
    a=b=c=n \\
    d=-n
\end{cases}
$$

Then our relationship becomes:

$$
4*n^4 - k*n^4 \ge 0 \Leftrightarrow \\
k \le 4
$$

So, at this point, we know that $$k \in [-4, 4] \cap \mathbb{Z}$$. Some would stop here, and that would be wrong.

We need to come up with stronger proof. Our findings, $$k \in [-4, 4] \cap \mathbb{Z}$$ were based on specific values for $$a,b,c,d$$. 

One famous inequality in mathematics is [the inequality of arithmetic and geometric means](https://en.wikipedia.org/wiki/AM%E2%80%93GM_inequality):

$$
(\frac{x_1^n+x_2^n+...+x_n^n}{n})^{\frac{1}{n}} \ge ... \ge \frac{x_1+x_2+...+x_n}{n} \ge (x_1 * x_2 * ... * x_n)^{\frac{1}{n}}
$$

If you are good at spotting patterns, you will see how it resembles our inequality.

$$
\begin{cases}
    x_1 \rightarrow \lvert a \rvert  \\
    x_2 \rightarrow \lvert b \rvert  \\
    x_3 \rightarrow \lvert c \rvert  \\
    x_4 \rightarrow \lvert d \rvert 
\end{cases}
$$

So, if, we consider this:

$$
(\frac{\lvert a \rvert ^4 + \lvert b \rvert ^4 +\lvert c \rvert ^4+\lvert d \rvert ^4}{4})^{\frac{1}{4}} \ge (\lvert a \rvert * \lvert b \rvert * \lvert c \rvert * \lvert d\rvert)^{\frac{1}{4}} \Leftrightarrow \\
a^4+b^4+c^4+d^4 \ge 4 * \lvert abcd \rvert 
$$

- If $$abcd \ge 0$$ 
    - Then $$ a^4+b^4+c^4+d^4 + k*abcd \ge 4*abcd + k*abcd$$;
    - But $$abcd*(k+4) \ge 0$$, for $$k \in [-4,4] \cap \mathbb{Z}$$;
- If $$abcd \lt 0$$
    - Then $$ a^4+b^4+c^4+d^4 + k*abcd \ge -4*abcd + k*abcd$$;
    - But $$-abcd(4-k) \ge 0$$, for $$k \in [-4, 4] \cap \mathbb{Z}$$.

This tells us that the inequality works $$\forall k \in -4, 4 \cap \mathbb{Z}$$.

## Answer 8.

The first observation you should make is that $$2021=43*41$$.

When we have problems like this, it's worth checking if using the two fundamental inequalities, [AM-GM inequality](https://en.wikipedia.org/wiki/AM%E2%80%93GM_inequality) and [Cauchy–Bunyakovsky–Schwarz](https://en.wikipedia.org/wiki/Cauchy%E2%80%93Schwarz_inequality) helps us.

Even if not fully obvious in our case, the one that helps is the [CBS](https://en.wikipedia.org/wiki/Cauchy%E2%80%93Schwarz_inequalit):

$$
(\sum_{i=1}^{n} a_i^2) * (\sum_{i=1}^{n}b_i^2) \ge (\sum_{i=1}^{n}a_i*b_i)^2 \\
\text{ equality holds if } \frac{a_i}{b_i}=k \text{, for } k \in \mathbb{R}
$$

For 3 pair of numbers, $$(a_1, b_1), (a_2, b_2), (a_3, b_3)$$, CBS looks like this:

$$
(a_1*b_1 + a_2*b_2 + a_3*b_3)^2 \le (a_1^2 + a_2^2 + a_3^2) * (b_1^2 + b_2^2 + b_3^2)
$$

Firstly, we know that:
$$2021 \le (1*x+(-3)y+6z+(-1)*t)^2$$

So, thinking in terms of the CBS inequality, why don't we consider the following:

$$
\begin{cases}
    a_1 \rightarrow x \\
    a_2 \rightarrow y \\
    a_3 \rightarrow z \\
    a_4 \rightarrow t \\
\end{cases}
$$

and

$$
\begin{cases}
    b_1 \rightarrow 1 \\
    b_2 \rightarrow -3 \\
    b_3 \rightarrow 6 \\
    b_4 \rightarrow -1 \\
\end{cases}
$$

In this regard, we can write things like this:

$$
2021 \le (x-3y+6z+t)^2 \le \underbrace{(1^2+(-3)^2+6^2+1^2)}_{47}*\underbrace{(x^2+y^2+z^2+t^2)}_{\le 43} \le 2021
$$


This means our expression, $$(x-3y+6z+t)^2$$ is squeezed between $$2021$$ and $$2021$$, so the equality holds true, so:

$$
\frac{x}{1}=\frac{y}{-3}=\frac{z}{6}=\frac{t}{-1}=k \text{ , } k \in \mathbb{R} 
$$

Or:

$$
\begin{cases}
    x=k \\
    y=-3k \\
    z=6k \\
    t=-k
\end{cases}
\text{ , } k \in \mathbb{R}
$$

If we use this substitution:

$$
x^2+y^2+z^2+t^2 \le 43 \Leftrightarrow \\
k^2 + 9k^2+36k^2+k^2 \le 43 \\
47k^2 \le 43 \\
k \le \sqrt{\frac{43}{47}}
$$

And then again:

$$
(x-3y+6z-t)^2 \ge 2021 \\
(k+9k+36k+k)^2 \ge 43*47 \\
47^2*k^2 \ge 43*47 \\
k^2 \ge \frac{43}{47} \\
k \ge \sqrt{\frac{43}{47}}
$$

So we can safely assume that our $$k=\sqrt{\frac{43}{47}}$$. 

Now it's easy to compute the expression: $$\lvert x^2 + y^2 + z^2 + t^2 \rvert=3 * \sqrt{\frac{43}{47}}$$.

## Answer 9.

For 6 numbers: $$x_1 \le x_2 \le x_3$$ and $$y_1 \le y_2 \le y_3$$ the [Rearrangement inequality](https://en.wikipedia.org/wiki/Rearrangement_inequality) can be written as:

$$
x_1*y_2 + x_2*y_3+x_3*y_1 \le x_1*y_1 + x_2*y_2 + x_3*y_3
$$

If we pick:

$$
\begin{cases}
    x_1=y_1=a \\
    x_2=y_2=b \\
    x_3=y_3=c \\
\end{cases}
$$

We obtain:

$$
ab+bc+ca \le a^2 + b^2 + c^2 (*)
$$

Then:

$$
2(ab+bc+ca) + ab+bc+ca \le 2(ab+bc+ca) + a^2 + b^2 + c^2 \Leftrightarrow \\
3(ab+bc+ca) \le (a+b+c)^2 (**)
$$

Now, let's get to our problem. We will compute the $$\Delta$$ for $$x^2 + (a+b+c)x + k(ab+bc+ca) = 0$$:

$$
\Delta=(a+b+c)^2-4k(ab+bc+ca)
$$

For our equation to have solutions in $$\mathbb{R}$$, we need to find $$k$$ so that $$\Delta \ge 0$$.

$$
\Delta = \underbrace{(a+b+c)^2}_{\ge 3(ab+bc+ca)} - 4k(ab+bc+ca) \ge 0 \\
$$

Using (**), we can write:

$$
\Delta \ge 3(ab+bc+ca) - 4k(ab+bc+ca) \ge 0 \Leftrightarrow \\
(3-4k) \ge 0 \Rightarrow
k \le \frac{3}{4}
$$

## Answer 10.

[Hermite's Identity](https://en.wikipedia.org/wiki/Hermite%27s_identity) states that:

$$
\sum_{k=0}^{n-1}[x+\frac{k}{n}] = [nx] \text{ , } \forall x \in \mathbb{R} \text{ ,and } n \in \mathbb{N}
$$

One idea is to make our existing terms (e.g. [$$\frac{x+3}{6}$$]) resemble the terms to Hermite's identity ($$[x+\frac{k}{n}]$$). In this regard we need to find a way to "isolate" the $$x$$ outside the fraction(s).

One idea is to perform the following substitution:

$$
y=\frac{x+1}{6}
$$

So our identity becomes:

$$
[y+\frac{1}{3}] - [y+\frac{1}{2}] + [y+\frac{2}{3}] = [3y] - [2y] \text{    (*)}
$$

But:

$$
\begin{cases}
    [3y] = [y] + [y+\frac{1}{3}] + [y+\frac{2}{3}] \\
    [2y] = [y] + [y+\frac{1}{2}]
\end{cases}
\text{    (**)}
$$

(*) and (**) proves the identity to be correct.

## Answer 11.

Even if it's  not obvious, let's start again with the CBS inequality:

$$
(\sum_{i=1}^{n} a_i^2) * (\sum_{i=1}^{n}b_i^2) \ge (\sum_{i=1}^{n}a_i*b_i)^2 \\
$$

If we pick $$b_1=b_2=b_3=...=b_n=1$$ the inequality becomes:

$$
(\sum_{i=1}^{n} a_i^2) * n \ge (\sum_{i=1}^{n}a_i)^2 
$$

Expanding the sums:

$$
(a_1+a_2+...+a_n)^2 \le n*(a_1^2 + a_2^2 + ...+ a_n^2)
$$

$$a_k \in \mathbb{R}_{+}$$ so we can conclude:

$$
a_1+a_2+...b_n \le n
$$

## Answer 12.

**12.** <sup><sup>easy</sup></sup> If $$a^2+b^2+c^2=3$$ prove ($$\lvert a \rvert + \lvert b \rvert + \lvert c \rvert - abc) \le 4$$, where $$a,b,c \in \mathbb{R}$$. <sup><sup>[Hint](#hint-12) &  [Answer](#answer-13)</sup></sup>

The following is true ($$\forall a,b,c \in \mathbb{R}$$):

$$
a^2 + b^2 + c^2 = \lvert a \rvert^2 + \lvert b \rvert^2 + \lvert c \rvert^2 = 3
$$

Applying [Cauchy–Bunyakovsky–Schwarz](https://en.wikipedia.org/wiki/Cauchy%E2%80%93Schwarz_inequality):

$$
\underbrace{(a^2 + b^2 + c^2)}_{=3} * \underbrace{(1^2 + 1^2 + 1^2)}_{=3} \ge (\lvert a \rvert*1 + \lvert b \rvert*1 + \lvert c \rvert*1)^2
$$

From this $$\Rightarrow 3 \ge (\lvert a \rvert + \lvert b \rvert + \lvert c \rvert)$$ (*).

Applying [AM-GM inequality](https://en.wikipedia.org/wiki/AM%E2%80%93GM_inequality):

$$
\frac{a^2+b^2+c^2}{3} \ge (abc)^{\frac{2}{3}}
$$

We can safely observe $$-abc \le 1$$ (**).

(*) and (**) $$\Rightarrow$$:

$$
\underbrace{\lvert a \rvert + \lvert b \rvert + \lvert c \rvert}_{\le 3} \underbrace{- abc}_{\le 1} \le 4 \text{ is TRUE}
$$

## Answer 13.

Looking at: 

$$
\frac{a+b}{c^2}+\frac{b+c}{a^2}+\frac{c+a}{b^2} \ge 2(\frac{1}{a}+\frac{1}{b}+\frac{1}{c})
$$

We can group things in the following manner:

$$
\underbrace{\frac{a}{b^2}+\frac{b}{a^2}}_{*} + \underbrace{\frac{b}{c^2}+\frac{c}{b^2}}_{**} + \underbrace{\frac{a}{c^2} + \frac{c}{a^2}}_{***} \ge \underbrace{\frac{1}{a} + \frac{1}{b}}_{*} + \underbrace{\frac{1}{b} + \frac{1}{c}}_{**} + \underbrace{\frac{1}{a} + \frac{1}{c}}_{***}
$$

There's a pattern here!! If we manage to solve this inequality: $$\frac{m}{n^2} + \frac{n}{m^2} \ge \frac{1}{n} + \frac{1}{m}$$, $$m,n \in \mathbb{R}_{+}^*$$ we will be able solve our problem.

So let's solve this:

$$
\frac{m}{n^2} + \frac{n}{m^2} \ge \frac{1}{n} + \frac{1}{m} \Leftrightarrow \\
$$

$$
m^3 + n^3 = mn(m+n) \ge 0 \Leftrightarrow \\
$$

$$
m^2(m-n)-n^2(m-n) \ge 0 \Leftrightarrow \\
$$

$$
(m-n)(m^2-n^2) \ge 0 \Leftrightarrow \\
$$

$$
\underbrace{(m-n)^2}_{\ge 0} * \underbrace{(m+n)}_{\gt 0} \ge 0
$$

Now, we know the following:

$$
\begin{cases}
    \frac{a}{b^2}+\frac{b}{a^2} \ge \frac{1}{a} + \frac{1}{b} \\
    \frac{b}{c^2}+\frac{c}{b^2} \ge \frac{1}{b} + \frac{1}{c} \\
    \frac{a}{c^2}+\frac{c}{a^2} \ge \frac{1}{a} + \frac{1}{c}
\end{cases}
$$

If we sum all three inequalities, we've proven the original inequality.

## Answer 14. 

If $$x^2+x \in \mathbb{Q}$$ , then $$x^2+x=a \in \mathbb{Q}$$

If $$x^3+2x \in \mathbb{Q}$$ , then $$x^3+2x=b \in \mathbb{Q}$$.

Our purpose is to try expressing $$x$$ using only $$a$$ and $$b$$ in a way we will prove $$x \in \mathbb{Q}$$.

We start by doing some tricks with $$b=x^3+2x=x^3+\underbrace{(x^2-x^2)}_{=0}+\underbrace{(x-x)}_{=0}+2x$$.

After regrouping terms, $$b$$ becomes $$b=x\underbrace{(x^2+x)}_{=a}-\underbrace{(x^2+x)}_{=a} + x + 2x$$.

So $$b=x(a+3)-a$$, or $$a+b=x(a+3)$$.

We are getting closer to the solution; the only thing remaining is to check if $$a=-3$$.

Let's suppose $$a=-3$$, then $$x^2+x+3=0$$, but this is impossible because the solutions  $$x_1,x_2 \notin \mathbb{R}$$. So, we can safely assume $$a \neq 3$$.

If $$a \neq 3$$, then we can write $$x=\frac{a+b}{a+3}$$. But both $$a+b \in Q$$ and $$a+3 \in Q$$, then for sure $$x \in Q$$.

## Answer 15.

The fact that $$3,5,7,11,13$$ are all prime numbers is just a coincidence, but congratulations if you spot that.

Sometimes, it is easier to disprove, than to prove something, so [ad absurdum](https://en.wikipedia.org/wiki/Reductio_ad_absurdum) let's suppose $$a \ge b$$. 

Firstly, for the function $$f(x)=a^x$$, if $$a$$ is a constant greater than 1, we say that the function is increasing, meaning the value of $$f(x)$$ increases with $$x$$. Secondly, if $$a \lt 1$$, then we say the function is decreasing, meaning the value of $$f(x)$$ decreases while $$x$$ increases.

That being said, if $$a \ge b$$, then $$13^a \ge 13^b$$ and $$5^a \ge 5^b$$.

This means that $$3^a + 13^a \ge 17^a$$, or $$(\frac{3}{17})^a + (\frac{13}{17})^a \ge 1$$.

Let $$g(x) : \mathbb{R} \rightarrow \mathbb{R}$$, $$g(x)=(\frac{3}{17})^x + (\frac{13}{17})^x$$. $$g(x)$$ is stricly decreasing. Also, $$g(1)=\frac{16}{17} \lt 1$$. But $$g(1) \lt g(a)$$ thus, $$a \lt 1$$ `(*)`.

If our initial supposition is correct, then $$5^b+7^b \ge 11^b$$. Following the same principle, we define $$h(x)=(\frac{5}{11})^b+(\frac{7}{11})^b \ge 1$$ and we eventually conclude that $$b \gt 1$$ `(**)`.

`(*)` and `(**)` $$\Rightarrow$$ our supposition is false, so $$a \lt b$$ is true.

## Answer 16.

This problem is easier than it looks.

$$
S=\underbrace{\frac{1}{u(2)*v(2)}}_{=\frac{1}{2*3}}+\underbrace{\frac{1}{u(3)*v(3)}}_{=\frac{1}{3*5}}+\underbrace{\frac{1}{u(4)*v(4)}}_{=\frac{1}{3*5}}+\underbrace{\frac{1}{u(5)*v(5)}}_{=\frac{1}{5*7}}+\underbrace{\frac{1}{u(6)*v(6)}}_{=\frac{1}{5*7}}+\underbrace{\frac{1}{u(7)*v(7)}}_{=\frac{1}{7*11}}...
$$

We see that the terms in our sum repeat themselves a number of times.

For example:
* $$\frac{1}{2*3}$$ appears once;
* $$\frac{1}{3*5}$$ appears two times;
* $$\frac{1}{5*7}$$ appears two times;
* $$\frac{1}{7*11}$$ will appear four times;
* ... and so on.

If $$p, q$$ are consecutive prime numbers, we define the set $$M=\{ n \in \mathbb{N} \lvert q \le n \lt p \}$$. Th cardinal of $$M$$ is exactly $$p-q$$ for a given $$n$$. It means that each term $$\frac{1}{qp}$$ appears exactly $$p-q$$ times in our sum. 

With this in mind, we can re-write our sum as:

$$
S=\frac{3-2}{2*3}+\frac{5-3}{5*3}+\frac{7-5}{5*7}+\frac{11-7}{7*11}+... \Leftrightarrow
$$

$$
S=\frac{1}{2}-\frac{1}{3}+\frac{1}{3}-\frac{1}{5}+\frac{1}{5}+...+\frac{1}{2003}-\frac{1}{2011} \Leftrightarrow
$$

$$
S=\frac{1}{2}-\frac{1}{2011}
$$

## Answer 17.

We use the [AM-GM inequality](https://en.wikipedia.org/wiki/AM%E2%80%93GM_inequality) for each of the following terms:

$$
x^2+yz \le 2\sqrt{x^2yz} = 2x\sqrt{yz} \Leftrightarrow \\
$$

$$
\frac{1}{x^2+yz} \le \frac{\sqrt{yz}}{2xyz} (*) \\
$$

But $$\sqrt{yz} \le \frac{y+z}{2} (**)$$.

$$(*), (**) \Rightarrow$$:

$$
\frac{1}{x^2+yz} \le \frac{\frac{y+z}{2}}{2xyz}
$$

Similarly, for the other terms:

$$
\frac{1}{y^2+xz} \le \frac{\frac{x+z}{2}}{2xyz}
$$

$$
\frac{1}{z^2+xy} \le \frac{\frac{x+y}{2}}{2xyz}
$$

If we sum everything up:

$$
\frac{1}{x^2+yz} + \frac{1}{y^2+xz} + \frac{1}{z^2+xy} \le \frac{\frac{y+z}{2}}{2xyz} + \frac{\frac{x+z}{2}}{2xyz} + \frac{\frac{x+y}{2}}{2xyz} \Leftrightarrow \\
$$

$$
\frac{1}{x^2+yz} + \frac{1}{y^2+xz} + \frac{1}{z^2+xy} \le \frac{1}{2}(\frac{x+y+z}{xyz}) \Leftrightarrow \\
$$


$$
\frac{1}{x^2+yz} + \frac{1}{y^2+xz} + \frac{1}{z^2+xy} \le \frac{1}{2} (\frac{1}{xy} + \frac{1}{yz} + \frac{1}{xz})
$$

## Answer 18.

Let's start by working on the expressions involving logarithms.

$$
\begin{cases}
a^x = bc \Leftrightarrow log_a(a^x) = log_a(bc) \Leftrightarrow x = log_a(b) + log_a(c) \\
b^y = ca \Leftrightarrow log_b(b^y) = log_b(ca) \Leftrightarrow y = log_b(c) + log_b(a) \\
c^z = ab \Leftrightarrow log_c(c^z) = log_c(ab) \Leftrightarrow c = log_c(a) + log_c(b) \\
\end{cases}
$$

Now, [let's change the base for our logarithms](https://en.wikipedia.org/wiki/List_of_logarithmic_identities#Changing_the_base) to a *common* number, $$m \in \mathbb{R}_{+}^{*}$$:

$$
\begin{cases}
x = log_a(b) + log_a(c) = \frac{log_m(b)}{log_m(a)} + \frac{log_m(c)}{log_m(a)} \\
y = log_b(c) + log_b(a) = \frac{log_m(c)}{log_m(b)} + \frac{log_m(a)}{log_m(b)} \\
c = log_c(a) + log_c(b) = \frac{log_m(a)}{log_m(c)} + \frac{log_m(b)}{log_m(c)} \\
\end{cases}
$$

Let's define $$l_a = log_m(a)$$, $$l_b = log_m(b)$$, $$l_c = log_m(c)$$.

We observe that, $$x,y,z$$ can be written as:

$$\begin{cases}
x=\frac{l_b+l_c}{l_a} \\
y=\frac{l_c+l_a}{l_b} \\
z=\frac{l_a+l_b}{l_c}
\end{cases}$$

The expression required to be proven becomes:

$$
\frac{1}{2+\frac{l_b+l_c}{l_a}}+\frac{1}{2+\frac{l_c+l_a}{l_b}}+\frac{1}{2+\frac{l_a+l_b}{l_c}} \le \frac{3}{4} \Leftrightarrow
$$

$$
\frac{l_a}{l_a + \underbrace{(l_a + l_b + l_c)}_{s_l}} + \frac{l_b}{l_b+\underbrace{(l_a+l_b+l_c)}_{s_l}} + \frac{l_c}{l_c+\underbrace{(l_a+l_b+l_c)}_{s_l}} \le \frac{3}{4} \Leftrightarrow
$$

$$
1-\frac{l_a}{l_a+s_l}+1-\frac{l_b}{l_b+s_l}+1-\frac{l_c}{l_c+s_l} \ge 3-\frac{3}{4} \Leftrightarrow
$$

$$
\frac{s_l}{l_a+s_l} + \frac{s_l}{l_b+s_l} + \frac{s_l}{l_c+s_l} \ge \frac{9}{4} \Leftrightarrow
$$

$$
4*s_l(\frac{1}{l_a+s_l} + \frac{1}{l_b+s_l} + \frac{1}{l_c+s_l}) \ge 9
$$

Let's suppose $$l_a \le l_b \le l_c$$, also $$l_a>0$$, then:

$$
4*s_l(\frac{1}{l_a+s_l} + \frac{1}{l_b+s_l} + \frac{1}{l_c+s_l}) \ge 4*s_l(\frac{1}{l_a+s_l} + \frac{1}{l_a+s_l} + \frac{1}{l_a+s_l}) \ge 9
$$

So:

$$
4*s_l(\frac{1}{l_a+s_l}) \ge 3 \Leftrightarrow 
$$

$$
1-s_l(\frac{1}{l_a+s_l}) \le \frac{1}{4} \Leftrightarrow
$$

$$
\frac{l_a}{l_a+l_a+l_b+l_c} \le \frac{l_a}{4*l_a} \le \frac{1}{4}
$$

## Answer 19.

$$z=xy^2+x-1$$, and $$z=2xy-1$$.

We can write $$xy^2+x-1=2xy-1$$. Eventually, this relationship becomes equivalent to $$x(y-1)^2$$. But because $$x \neq 0 \Rightarrow y=1$$.

If $$y=1$$, then $$x=\frac{z+y}{2}$$.

## Answer 20.

We pick a base $$d$$ in the interval of $$a,b,c$$. Basically we as for Problem 18.

After we do the substitution, we need to prove:

$$
\frac{y+z}{x} + \frac{z+x}{y} + \frac{x+y}{z} \ge \frac{4x}{y+z} + \frac{4y}{z+x} + \frac{4z}{x+y}.
$$

Then, we need to prove that inequality holds true for:

$$
\frac{y+z}{x} \ge \frac{4x}{y+z}
$$

Which is easy to prove using AM-GM inequality.

