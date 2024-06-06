---
title: "13 problems with logarithms"
date: "2024-06-06"
classes: wide
comments: true
excerpt: "A 13 problems set with logarithms"
usekatex: true
categories:
- "nontech"
- "math"
tags:
- "math"
- "logarithms"
---

As a side hobby, I like to compose math problems. Solving exercises is one game; creating exercises is another world. It's fun because you never know where you are going or what you wish to obtain, but sometimes, you can unravel interesting relationships between numbers. 

This problem set is *an original endeavor*, meaning I haven't purposely copied the problems from an existing book or paper. However, the more straightforward exercises are just "natural" extensions of existing formulas, and I am sure somebody else proposed them first. For example, exercise 4 appears under different forms in various problems you can find online, and exercise 5 is a variation of an existing exercise from the classical Romanian "culegere de probleme" Nastasescu & Nita. I found exercise 8 solved on YouTube with a slight twist: $$a=10, b=e$$.

---

> Note: Nobody other than me has reviewed the problems. If you see any issues with them (they might be totally wrong for some reason, don't hesitate to contact me).

---

# The exercises

1. <sup><sup>[very easy]</sup></sup> If $$a,b,c \in (0, \infty) \setminus \{1\}$$, $$abc \neq 1$$, $$x=\log_ba$$, and $$y=\log_ca$$, then compute $$\log_{abc}a$$. <sup><sup>[solution](#exercise-1)</sup></sup>

2. <sup><sup>[easy]</sup></sup> If $$a,b \in (0, \infty) \setminus \{1\}$$, $$a^x=(ab)^n$$ and $$b^y=(ab)^n$$ prove that $$\frac{1}{x}+\frac{1}{y}=\frac{1}{n}$$. <sup><sup>[solution](#exercise-2)</sup></sup>

3. <sup><sup>[easy]</sup></sup> Prove that $$\sum_{i=2}^{n}(\frac{1}{\log_i n}) = \prod_{i=n+1}^{n!}(\log_{i-1}i)$$, where $$n \gt 2$$ and $$n \in \mathbb{N}$$. <sup><sup>[solution](#exercise-3)</sup></sup>

4. <sup><sup>[easy]</sup></sup> If $$a^{\log_m x} * x^{\log_m b} = ab$$, prove that $$x=m$$. <sup><sup>[solution](#exercise-4)</sup></sup>

5. <sup><sup>[medium]</sup></sup> If $$2\log_b x = \log_c x - \log_a x$$, prove that $$c^2=(\frac{a}{c})^{\log_a b}$$. <sup><sup>[solution](#exercise-5)</sup></sup>

6. <sup><sup>[hard]</sup></sup> If $$\rvert \log_a x \log_b x \lvert=\lvert \log_b x \log_c x + \log_a x \log_c x + \log_a x \log_b x\rvert$$, prove that $$c=(abc)^{\log_c(abc)}$$. <sup><sup>[solution](#exercise-6)</sup></sup>

7.  <sup><sup>[easy]</sup></sup> Find $$x$$ if $$a,b,c \in (0,1) \cup (1, \infty)$$, and $$a^{\ln\frac{b}{c}}*b^{\ln\frac{c}{a}}*c^{\ln\frac{a}{x}}=1$$.<sup><sup>[solution](#exercise-7)</sup></sup>

8. <sup><sup>[hard]</sup></sup> Solve $$(\log_ax)^{\log_bx} = (\log_bx)^{\log_ax}$$.<sup><sup>[solution](#exercise-8)</sup></sup>

9. <sup><sup>[easy]</sup></sup> If $$a,b,m \in (0,1)$$ or $$a,b,m \in (1, \infty)$$, prove that $$\frac{\log_{ab}m}{\sqrt{\log_am*\log_bm}} \le 1$$. <sup><sup>[solution](#exercise-9)</sup></sup>

10. <sup><sup>[easy]</sup></sup> If $$a,b,m \in (0,1)$$ or $$a,b,m \in (1, \infty)$$, prove $$\frac{1}{\log_{(a+b)}m} \ge \frac{1}{\log_2m} + \frac{1}{2}(\frac{1}{\log_am}+\frac{1}{\log_bm})$$. <sup><sup>[solution](#exercise-10)</sup></sup>

11. <sup><sup>[medium]</sup></sup> If $$x_i \in (0,1)$$ or $$x_i \in (1, \infty)$$, prove $$\sum_{i=1}^{n-1}\log_{x_{i}}{x_{i+1}} \ge n - \log_{x_n}x_1$$, $$\forall n \in \mathbb{N}, n \ge 2$$.<sup><sup>[solution](#exercise-11)</sup></sup>

12.<sup><sup>[medium]</sup></sup> If $$x=\log_b c$$, $$y=\log_a c$$, and $$m=\log_{abc} c$$, prove that $$(\frac{1}{m \sqrt{3}}-1)(\frac{1}{m \sqrt{3}}+1) \le \frac{1}{x^2} + \frac{1}{y^2}$$.<sup><sup>[solution](#exercise-12)</sup></sup>

13.<sup><sup>[medium]</sup></sup> If $$a,b,m \in (0,1)$$ or $$a,b,m \in (1, \infty)$$, prove $$\sum_{i=2}^{n-1}\log_i(i+1)\ge \sum_{i=2}^{n-1}\log_i2+\frac{n-2}{2}$$.<sup><sup>[solution](#exercise-13)</sup></sup>

# Solutions

## Exercise 1

$$\log_{abc}a=\frac{1}{log_a(abc)}=\frac{1}{\log_aa+\log_ab+\log_ac} = \frac{1}{1 + \frac{1}{x}+\frac{1}{y}}=\frac{xy}{xy+x+y}$$.

## Exercise 2

If $$a^x=(ab)^n \Rightarrow x = \log_{a}(a^nb^n) = n + n\log_ab = n(1+\log_ab)$$.
        
In a similar fashion, if $$b^y=(ab)^n \Rightarrow y = \log_{b}(a^nb^n) = n + n\log_ba = n(1+\log_ba) = \frac{n(\log_ab+1)}{\log_ab}$$.
        
With this in mind, $$\frac{1}{x}+\frac{1}{y}=\frac{1}{n(1+\log_ab)} + \frac{log_ab}{n(1+\log_ab)} = \frac{1+\log_ab}{n(1+\log_ab)}=\frac{1}{n}$$.

## Exercise 3

We start with the sum:

$$
\sum_{i=2}^{n}(\frac{1}{\log_i n}) = \frac{1}{\log_2 n} + \frac{1}{\log_3 n} + ... + \frac{1}{\log_n n} \Leftrightarrow \\
\sum_{i=2}^{n}(\frac{1}{\log_i n}) = \log_n 2 + \log_n 3 + ... + \log_n n \Leftrightarrow \\
\sum_{i=2}^{n}(\frac{1}{\log_i n}) = \log_n n!
$$

Then we compute the product:

$$
\prod_{i=n+1}^{n!}[\log_{i-1}i] = \underbrace{\underbrace{\log_n(n+1) * \log_{n+1}(n+2)}_{=\log_n(n+2)} * .}_{=\log_nk}.. * \log_{n!-1}(n!) \Leftrightarrow \\
\prod_{i=n+1}^{n!}[\log_{i-1}i] = \log_n(n!)
$$

As we can see the sum and product are equal.

## Exercise 4

We know that: $$a^{\log_m x} * x^{\log_m b} = ab$$.

Let's write $$x^{\log_m b}=k$$. 

This would be equivalent to: 

$$
\log_m(x^{\log_m b})=\log_m k \Leftrightarrow \\
\log_m b * \log_m x =\log_m k \Leftrightarrow \\
\log_m x * \log_m b =\log_m k \Leftrightarrow \\
\log_m (b^{\log_m x})=\log_m k \Leftrightarrow \\
b^{\log_m x} = k
$$

So we can re-write our initial relationship as:

$$
a^{\log_m x} * b^{\log_m x} = ab \Leftrightarrow \\
(ab)^{\log_m x} = (ab)^1 \Rightarrow \\
\log_m x = 1 \Rightarrow \\
x = m
$$

## Exercise 5

$$2\log_b x = \log_c x - \log_a x$$ is equivalent to:
        
$$
\frac{2}{\log_x b}=\frac{\log_x a - \log_x c}{\log_x a \log_x c}
$$

We re-write everything as: 

$$
2*\log_x c = \frac{\log_x b}{\log_x a}*(\log_x a - \log_x c)
$$

The latest is equivalent to: 

$$
\log_x c^2 = \log_a b * \log_x \frac{a}{c} \Leftrightarrow \
\log_x c^2 = \log_x (\frac{a}{c})^{\log_a b} 
$$

Finally, we have proven:

$$
c^2=(\frac{a}{c})^{\log_a b}
$$

## Exercise 6

The modulus is there as a hint that you can square both sides.

$$
|\log_a x \log_b x|=|\log_b x \log_c x + \log_a x \log_c x + \log_a x \log_b x| \Leftrightarrow \\ \\
(\log_a x \log_b x)^2=(\log_b x \log_c x + \log_a x \log_c x + \log_a x \log_b x)^2 \Leftrightarrow \\ \\
\frac{\log_c x}{\log_c x} (\log_a x \log_b x)^2 = (\log_b x \log_c x + \log_a x \log_c x + \log_a x \log_b x)^2 \Leftrightarrow \\ \\
\frac{1}{\log_c x} = \frac{(\log_b x \log_c x + \log_a x \log_c x + \log_a x \log_b x)}{\log_a x \log_b x \log_c x} *  \frac{(\log_b x \log_c x + \log_ax \log_cx + \log_ax \log_bx)}{\log_ax \log_bx}\Leftrightarrow \\ \\
\frac{1}{\log_c x}=(\frac{1}{log_a x} + \frac{1}{\log_b x} + \frac{1}{\log_c x})(\frac{\log_c x}{\log_a x}  + \frac{\log_c x}{\log_b x} + 1) \Leftrightarrow \\ \\
\log_x c = (\log_x a + \log_x b + \log_x c)(\frac{log_x a}{log_x c} + \frac{\log_x b}{\log_x c} + \frac{\log_x c}{\log_x c}) \Leftrightarrow \\ \\
\log_x c = (\log_x a + \log_x b + \log_x c)(\log_c a + \log_c b + \log_c c) \Leftrightarrow \\ \\
\log_x c = \log_x(abc) * \log_c(abc) \Leftrightarrow \\ \\
c = (abc)^{\log_c(abc)}
$$

## Exercise 7

$$
\ln a*\ln\frac{b}{c} + \ln b*\ln\frac{c}{a} + \ln c*\ln{a}{x}=0 \Leftrightarrow \\
\ln a(\ln b-\ln c) + \ln b (\ln c - \ln a) + \ln (\ln a - \ln x) = 0
$$

After reducing the terms further:

$$
\ln c(\ln b - \ln x) = 0 \Rightarrow x = b
$$

## Exercise 8

Not all the math questions have nice answers.

$$
(\log_ax)^{\log_bx} = (\log_bx)^{\log_ax} \Leftrightarrow \\
\log_b[(\log_ax)^{\log_bx}] = \log_b[(\log_bx)^{\log_ax}] \Leftrightarrow \\
(\log_bx)*\log_b(\log_ax) = \log_ax*\log_b(\log_bx) \Leftrightarrow \\
(\log_bx)*\log_b(\log_ax) = \frac{\log_bx}{\log_ba}*\log_b(\log_bx) \Leftrightarrow \\
\log_b(\frac{\log_bx}{\log_ba}) = \frac{\log_b(\log_bx)}{\log_ba} \Leftrightarrow \\
\log_b(\log_bx)-\log_b(\log_ba) = \frac{\log_b(\log_bx)}{\log_ba} \Leftrightarrow \\
\log_b(\log_bx) - \frac{\log_b(\log_bx)}{\log_ba} = \log_b(\log_ba) \Leftrightarrow \\
\log_b(\log_bx)(1-\frac{1}{\log_ba}) = \log_b(\log_ba) \Leftrightarrow \\
\log_b(\log_bx) = \frac{\log_b(\log_ba) \log_ba}{log_ba-1} \Leftrightarrow \\
x = b^{b^{\frac{\log_b(\log_ba) \log_ba}{log_ba-1}}}
$$

## Exercise 9

$$
\frac{\log_{ab}m}{\sqrt{\log_am*\log_bm}} \le 1 \Leftrightarrow \\ \\
\log_{ab}m \le \sqrt{\log_am*\log_bm} \Leftrightarrow \\ \\
\frac{1}{\log_m(ab)} \le \sqrt{\log_am*\log_bm} \Leftrightarrow \\ \\
\frac{1}{\log_ma + \log_mb} \le \sqrt{\log_am*\log_bm} \Leftrightarrow \\ \\
\frac{1}{\frac{1}{\log_am} + \frac{1}{\log_bm}} \le \sqrt{\log_am*\log_bm}
$$

## Exercise 10

$$
\frac{1}{\log_{(a+b)}m} \ge \frac{1}{\log_2m} + \frac{1}{2}(\frac{1}{\log_am}+\frac{1}{\log_bm}) \Leftrightarrow \\
\log_m(a+b) \ge \log_m2 + \frac{1}{2}(\log_ma + \log_mb) \Leftrightarrow \\
\log_m(a+b) - \log_m2 \ge \log_m\sqrt{ab} \Leftrightarrow \\
\log_m(\frac{a+b}{2}) \ge \log_m\sqrt{ab} 
$$


## Exercise 11

$$
\sum_{i=1}^{n-1}\log_{x_{i}}{x_{i+1}} \ge n  \Leftrightarrow \\
\sum_{i=1}^{n-1}\log_{x_{i}}{x_{i+1}} + \log_{x_n}x_1 \ge n 
$$

From the QM-AM-GM inequality:

$$
\frac{\sum_{i=1}^{n-1}\log_{x_{i}}{x_{i+1}} + \log_{x_n}x_1}{n} \ge (\log_{x_n}x_1*\underbrace{\prod_{i=1}^{n-1}\log_{x_{i}}{x_{i+1}}}_{=\log_{x_{1}}x_n})^{\frac{1}{n}} \Leftrightarrow \\
\frac{\sum_{i=1}^{n-1}\log_{x_{i}}{x_{i+1}} + \log_{x_n}x_1}{n} \ge (\underbrace{\log_{x_n}x_1 * \log_{x_1}x_n}_{=1})^{\frac{1}{n}}\Leftrightarrow \\
\sum_{i=1}^{n-1}\log_{x_{i}}{x_{i+1} + \log_{x_n}x_1}{n} \ge n \Leftrightarrow \\
\sum_{i=1}^{n-1}\log_{x_{i}}{x_{i+1} \ge n - \log_{x_n}x_1}{n}
$$


## Exercise 12

$$
m=\log_{abc} c  \Leftrightarrow \\
\frac{1}{m}=\frac{1}{log_{abc} c} \Leftrightarrow \\
\frac{1}{m}=\log_c(abc) \Leftrightarrow \\
\frac{1}{m}=\log_c a + \log_c b + 1 \Leftrightarrow \\
\frac{1}{m}=\frac{1}{\log_a c} + \frac{1}{log_b c} + 1
$$

So we can conclude that $$\frac{1}{m}=\frac{1}{x} + \frac{1}{y} + 1$$.

Applying the Cauchy-Schwartz inequality:

$$
(\frac{1}{x}*1 + \frac{1}{y}*1 + 1*1)^2 \le (\frac{1}{x^2} + \frac{1}{y^2}+1)(1^2 + 1^2 + 1^2)
$$

Leads to:

$$
\frac{1}{m^2} \lt 3(\frac{1}{x^2} + \frac{1}{y^2}+1) \Leftrightarrow \\
(\frac{1}{m \sqrt{3}}-1)(\frac{1}{m \sqrt{3}}+1) \le \frac{1}{x^2} + \frac{1}{y^2}
$$

## Exercise 13

The solution is left to the reader.

