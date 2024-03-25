---
title: "10 algebra problems selected from the Romanian Olympiad (Part 2)"
date: "2024-03-25"
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

# Intro

This article is a continuation of [my previous selection]({{site.url}}/2024/02/23/20-algebra-problems-part-1) of non-trivial algebra problems from the Romanian Math Olympiad for high-school students. However, this time I have included a few harder problems from the National Phase that would definitely provide a challenge to any reader.

Personally, I found problems **5.** and **9.** to be the most difficult.

# The Problems

---

**1.** <sup><sup>easy</sup></sup> Find $$m, n \in \mathbb{Z}$$ if:

$$
9m^2+3n=n^2+8
$$ 

<sup><sup>[Hint](#hint-1) &  [Answer](#answer-1)</sup></sup>

---

**2.** <sup><sup>easy</sup></sup> Find $$x,y,z \in \mathbb{R_{+}^{*}}$$ if:

$$
\begin{cases}
x^3y+3 \le 4z \\
y^3z+3 \le 4x \\
z^3x+3 \le 4y
\end{cases}
$$

<sup><sup>[Hint](#hint-2) &  [Answer](#answer-2)</sup></sup>

---

**3.** <sup><sup>easy</sup></sup> Find $$x \notin \mathbb{Q}$$ so that:

$$x^2+2x \in \mathbb{Q}$$

$$x^3-6x \in \mathbb{Q}$$

<sup><sup>[Hint](#hint-3) &  [Answer](#answer-3)</sup></sup>

---

**4.**  <sup><sup>easy</sup></sup> If $$a, b \in \mathbb{C}$$ prove:

$$
\lvert 1 + ab \rvert + \lvert a+b \rvert \ge \sqrt{\lvert a^2 - 1 \rvert * \lvert b^2 - 1 \rvert}
$$

---

<sup><sup>[Hint](#hint-4) &  [Answer](#answer-4)</sup></sup>

**5.** <sup><sup>hard</sup></sup> Find $$a, b \in \mathbb{R}$$, if $$a+b \in \mathbb{Z}$$ and $$a^2+b^2=2$$.

<sup><sup>[Hint](#hint-5) &  [Answer](#answer-5)</sup></sup>

---

**6.** <sup><sup>easy</sup></sup> Find all numbers $$n \in \mathbb{N}$$ with the following property: $$\exists  (a,b) \in \mathbb{Z}$$ so that $$n^2=a+b$$, and $$n^3=a^2+b^2$$.

<sup><sup>[Hint](#hint-6) &  [Answer](#answer-6)</sup></sup>

---

**7.** <sup><sup>easy</sup></sup> Prove the following inequality:

$$
\frac{a}{x}+\frac{b}{y} \ge \frac{4(ay+bx)}{(x+y)^2}
$$

$$\forall a,b,x,y \gt 0$$

<sup><sup>[Hint](#hint-7) &  [Answer](#answer-7)</sup></sup>

---

**8.** <sup><sup>medium</sup></sup> Prove the following inequality:

$$
\frac{a}{b+2c+d}+\frac{b}{c+2d+a}+\frac{c}{d+2a+b}+\frac{d}{a+2b+c} \ge 1
$$

$$
\forall a,b,c,d \gt 0
$$

<sup><sup>[Hint](#hint-8) &  [Answer](#answer-8)</sup></sup>

---

**9.** <sup><sup>hard</sup></sup> If $$x_1, x_2, ..., x_n$$ are strictly positive numbers prove the following:

$$
\frac{1}{1+x_1}+\frac{1}{1+x_1+x_2}+...+\frac{1}{1+x_1+x_2+...+x_n} \lt \sqrt{\frac{1}{x_1}+\frac{1}{x_2}+...+\frac{1}{x_n}}
$$

<sup><sup>[Hint](#hint-9) &  [Answer](#answer-9)</sup></sup>

---

**10.** <sup><sup>medium</sup></sup> If $$x,y \in \mathbb{N}^{*}$$, $$x \neq y$$. Prove that:

$$
\frac{(x+y)^2}{x^3+xy^2-x^2y-y^3} \notin \mathbb{Z}
$$

<sup><sup>[Answer](#answer-10)</sup></sup>

# Hints

## Hint 1.

Try to find a way to write the expression as a product between two numbers.

## Hint 2.

Even if not obvious, the key to elegantly solving the problem is to use the [QM-AM-GM-HM inequalities](https://en.wikipedia.org/wiki/QM-AM-GM-HM_inequalities).

## Hint 3.

Try to express $$x^3-6x$$ in terms of $$x^2+2x$$.

## Hint 4.

Did you know that $$\lvert a + b \rvert \le \lvert a \rvert + \lvert b \rvert$$ ?

## Hint 5.

Can you use the [QM-AM-GM-HM inequalities](https://en.wikipedia.org/wiki/QM-AM-GM-HM_inequalities)?

## Hint 6.

Can you use the [QM-AM-GM-HM inequalities](https://en.wikipedia.org/wiki/QM-AM-GM-HM_inequalities)?

## Hint 7.

Can you use the [QM-AM-GM-HM inequalities](https://en.wikipedia.org/wiki/QM-AM-GM-HM_inequalities)?

## Hint 8.

Can you please problem 7. ?

## Hint 9.

The key to solving this problem is the [CBS Inequality](https://en.wikipedia.org/wiki/Cauchy-Schwarz_inequality). Unfortunately the solution is much more subtle than anticipated, so don't be upset if you don't see it.

# Answers

## Answer 1.

$$0$$, $$1$$, small and prime numbers are our friends, so if we can find an expression like 

$$(m-\text{something})(n-{something}) = 0 \text{ (or a prime number)}$$

, we would already have put a powerful constraint on the nature of $$m$$ and $$n$$.

Our expression is:

$$
9m^2+3n=n^2+8
$$

If we move all the terms involving $$m$$ and $$n$$ on the left side:

$$
9m^2+3n-n^2=8
$$

Now let's multiply each side with $$4$$:

$$
36m^2-4n^2+12n=32
$$

And, then write the expression as the difference between two square numbers:

$$
36m^2 - (2^2*n^2-2*2n*3+3^2)=23
$$

Our initial expression becomes:

$$
[6^2m^2 - (2n^2-3)^2]=23 \Leftrightarrow \\
(6m-2n+3)(6m+2n-3)=1*23
$$

So there are a few possibilities:

$$
\begin{cases}
6m-2n+3=23 \\
6m+2n-3=1
\end{cases}
$$

Or:

$$
\begin{cases}
6m-2n+3=1 \\
6m+2n-3=23
\end{cases}
$$

Or:

$$
\begin{cases}
6m-2n+3=-1 \\
6m+2n-3=-23
\end{cases}
$$

If we sum $$6m-2n+3+(6m+2n-3)=\pm 24 \Rightarrow m=\pm 2$$


If we substitute $$m=\pm 2$$ back into the initial relationship, we will obtain the values of $$n$$. 

The solutions are:  $$(2,7), (-2,7), (2, -4), (-2, -4)$$.

## Answer 2.

This problem is beautiful; honestly, I had to look for some hints before solving it.

Intuitively, we observe the obvious $$x=y=z=1$$ solution. But what if there are more?

$$
\begin{cases}
x^3y+3 \le 4z \\
y^3z+3 \le 4x \\
z^3x+3 \le 4y
\end{cases}
$$

Becomes:

$$
\begin{cases}
x^3y  \le 4z - 3 \\
y^3z  \le 4x - 3\\
z^3x  \le 4y - 3
\end{cases}
$$

Because $$x,y,z \in \mathbb{R_{+}^{*}}$$ (a significant detail), we can multiply all our three inequalities to obtain:

$$
x^4y^4z^4 \le (4x-3)(4y-3)(4z-3)
$$

And now, the *subtle idea*. According to [QM-AM-GM-HM inequalities](https://en.wikipedia.org/wiki/QM-AM-GM-HM_inequalities), it is obvious:

$$
\frac{x^4+1^4}{2} \ge \sqrt{x^4*1^4} \Rightarrow \\
x^4+1 \ge 2x^2 \Rightarrow \\
x^4+3 \ge 2(x^2+1)
$$

By applying the [QM-AM-GM-HM](https://en.wikipedia.org/wiki/QM-AM-GM-HM_inequalities), it is known:

$$
x^2+1 \ge 2*\sqrt{x^2*1^2} \Rightarrow \\
2(x^2+1) \ge 4x
$$

So we can conclude that: 

$$
x^4+3 \ge 4x \Rightarrow
x^4 \ge 4x-3
$$

The equality holds if $$x=1$$.

Similarly, we obtain:

$$
\begin{cases}
x^4  \ge 4x - 3 \\
y^4  \ge 4y - 3\\
z^4  \ge 4z - 3
\end{cases}
$$

If we multiply all three inequalities, we will obtain:

$$
x^4y^4z^4 \ge (4x-3)(4y-3)(4z-3)
$$

So now we have two inequalities:

$$
\begin{cases}
x^4y^4z^4 \le (4x-3)(4y-3)(4z-3) \\
x^4y^4z^4 \ge (4x-3)(4y-3)(4z-3)
\end{cases}
$$

Isn't it ironic? Because of the opposite signs of the two inequalities, they only happen when equality happens.

So we can now conclude that $$x=y=z=1$$.

## Answer 3.

Let's introduce $$a$$ and $$b$$, so that $$a=x^2+2x \in \mathbb{Q}$$ and $$b=x^3-6x \in \mathbb{Q}$$.

Now we will try to express $$b$$ in terms of $$a$$ and $$x$$:

$$
b=x^3+2x^2-2x^2-4x-2x \Leftrightarrow \\
b=x(x^2+2x)-2(x^2+2x)-2x \Leftrightarrow \\
b=x*a-2a-2x \Leftrightarrow \\
b=x(a-2)-2a
$$

But $$b \in Q$$ and $$x \notin Q$$, then $$a-2=0$$, and $$b=-2a$$.

If $$a-2=0 \Rightarrow a=2$$, then $$x^2+2x-2=0$$. We solve this equation, by finding $$\Delta=12$$, with the final solutions for $$x$$:

$$
x=\frac{-2 \pm 2\sqrt{3}}{2} =-1 \pm \sqrt{3}
$$

## Answer 4.

For this, we need to apply the following fundamental inequality:

$$
\lvert 1 + ab \rvert + \lvert a + b \rvert \ge \lvert 1 + ab + a +  b \rvert \\
\lvert 1 + ab \rvert - \lvert a + b \rvert \ge \lvert 1 + ab - a -  b \rvert \\
$$

If we multiply both inequalities, the problem is solved:

$$
(\lvert 1 + ab \rvert + \lvert a + b \rvert)^2 \ge \lvert 1 + ab + a +  b \rvert * \lvert 1 + ab - a -  b \rvert \Leftrightarrow \\
\lvert 1 + ab \rvert + \lvert a + b \rvert \ge \sqrt{\lvert a^2 - 1 \rvert * \lvert b^2 - 1 \rvert}
$$

## Answer 5.

We need a way to link $$a+b$$ and $$a^2+b^2$$.

If we look at the [QM-AM-GM-HM inequalities](https://en.wikipedia.org/wiki/QM-AM-GM-HM_inequalities), we shall see that:

$$
\frac{x_1+x_2+...+x_n}{n} \le \sqrt{\frac{x_1^2+x_2^2+...+x_n^2}{n}}
$$

For us, this means:

$$
\frac{a+b}{2} \le \sqrt{\frac{a^2+b^2}{2}} \Leftrightarrow \\
(a+b)^2 \le 2(a^2+b^2) \Leftrightarrow \\
(a+b)^2 \le 4 \Leftrightarrow \\
\lvert a + b \rvert \le 2
$$

Luckily for us, $$a+b \in \mathbb{Z}$$ so we can conclude that $$a+b \in \{-2,-1,0,1,2\}$$.

Now, let's try to *create* a second-degree equation in $$a$$:

$$
a^2+b^2=2 \Leftrightarrow \\ 
a^2+b^2+2ab-2ab+2a^2-2a^2=2 \Leftrightarrow \\
2a^2 + (a+b)^2 - 2a(a+b)=2 
$$

I think this trick is the hardest to think of. This type of intuition comes after lots of solved exercises. So don't be upset if you haven't spotted this.

If we substitute $$m=a+b$$, our equation becomes:

$$
2a^2 - 2am + m^2-2=0
$$

We need to find all the possible values of $$a$$ for all the possible values of $$m$$.

For example, if we pick the possible value $$m=-2$$, our equation becomes $$2a^2 + 4a + 2 = 0$$. The solution is $$a=-1 \Rightarrow b=-1$$.

If we substitute all values of $$m$$, we will find all of our solutions: 

$$(-1,-1), (1,1), (\frac{1+\sqrt{3}}{2}, \frac{1-\sqrt{3}}{2}), \text{ ... and so on}$$

## Answer 6.

Because of [QM-AM-GM-HM inequalities](https://en.wikipedia.org/wiki/QM-AM-GM-HM_inequalities), we know that:

$$2(a^2+b^2) \ge (a+b)^2$$

This relationship leads to the simple conclusion: 

$$2*n^3 \ge n^4$$

But because $$n \in \mathbb{N}$$ the only possible values for $$n$$ are $$n \in \{0,1,2\}$$.

If $$n=0$$ then $$a=0$$ and $$b=0$$.

If $$n=1$$ then $$a=1$$ and $$b=0$$.

If $$n=2$$ then $$a=2$$ and $$b=2$$.

## Answer 7.

This one is simple:

$$
\frac{a}{x} + \frac{b}{y} \ge \frac{4(ay+bx)}{(x+y)^2}
$$

Becomes:

$$
\frac{ay+bx}{xy} \ge \frac{4(ay+bx)}{(x+y)^2} \Leftrightarrow \\
\frac{1}{xy} \ge \frac{4}{(x+y)^2} \Leftrightarrow \\
\frac{(x+y)^2}{2^2} \ge xy \Leftrightarrow \\
\frac{x+y}{2} \ge \sqrt{xy}
$$


## Answer 8.

This exercise would be much more laborious without using Problem 7.

But we already know from the previous answer that $$\frac{a}{x}+\frac{b}{y} \ge \frac{4(ay+bx)}{(x+y)^2}$$, $$\forall a,b,x,y \gt 0$$.

So, let's re-group wisely our terms:

$$
\frac{a}{\underbrace{b+2c+d}_{x}}+\frac{c}{\underbrace{d+2a+b}_{y}}+\frac{b}{c+2d+a}+\frac{d}{a+2b+c} \ge 1 \Leftrightarrow 
$$

Because of the previous problem, we know that:

$$
\frac{a}{\underbrace{b+2c+d}_{x}}+\frac{c}{\underbrace{d+2a+b}_{y}} \ge \frac{ 4(a(d+2a+b) + c(b+2c+d)) }{(2a+2b+2c+2d)^2}
$$

This can be further simplified to:

$$
\frac{a}{\underbrace{b+2c+d}_{x}}+\frac{c}{\underbrace{d+2a+b}_{y}} \ge \frac{2a^2+2d^2+ab+bc+cd+da}{(a+b+c+d)^2} \text{ (*)}
$$

In a similar fashion:

$$
\frac{b}{c+2d+a}+\frac{d}{a+2b+c} \ge \frac{2b^2+2d^2+ab+bc+cd+da}{(a+b+c+d)^2} \text{ (**)}
$$

If we sum $$\text{(*)}$$ and $$\text{(**)}$$:

$$
\frac{a}{b+2c+d}+\frac{c}{d+2a+b}+\frac{b}{c+2d+a}+\frac{d}{a+2b+c} \ge  \\
\ge \frac{2a^2+2d^2+ab+bc+cd+da+2b^2+2d^2+ab+bc+cd+da}{(a+b+c+d)^2}
$$

But we know that $$(a+b+c+d)^2=a^2+b^2+c^2+d^2+2(ab+ac+ad+bc+bd+cd)$$.

So, with enough patience, we can group things in the previous fraction as follows:

$$
\frac{a}{b+2c+d}+\frac{c}{d+2a+b}+\frac{b}{c+2d+a}+\frac{d}{a+2b+c} \ge \frac{(a+b+c+d)^2+(a-c)^2+(b-d)^2}{(a+b+c+d)^2} \\
$$

Eventually, we would obtain something like this:

$$
1+\frac{(a-c)^2+(b-d)^2}{(a+b+c+d)^2} \ge 1
$$

The last relationship is obviously true, $$\forall a,b,c,d \gt 0$$.

## Answer 9.

This is by no means an easy problem. Of course, once you see the solution, it doesn't look that hard, but coming up with the idea in the first place is more complicated.

We do the following notation(s):

$$
\begin{cases}
s_1=x_1 \\
s_2=x_2+x_1 \\
s_3=x_3+x_2+x_1 \\
\text{...} \\
s_n=x_n+x_{n-1}+...+x_1
\end{cases}
$$

Because $$x_1, x_2, ..., x_n$$ are strictly positive we can conclude that $$s_1 \lt s_2 \lt s_3 ... \lt s_n$$. 

Another important aspect is the fact:

$$x_k=s_k-s_{k-1}$$, $$\forall k \in N$$.

With this in mind, we can re-write everything as:

$$
\frac{1}{1+s_1}+\frac{1}{1+s_2}+...\frac{1}{1+s_n} \le \sqrt{\frac{1}{s_1}+\frac{1}{s_2-s_1}+...+\frac{1}{s_n-s_{n-1}}}
$$

The above relationship is the equivalent inequality we need to prove.

Now, we can write each term from the right side, $$\frac{1}{1+s_k}$$, as a product:

$$
\frac{1}{1+s_1}=\frac{1}{\sqrt{s_1}}*\frac{\sqrt{s_1}}{1+s_1}
$$


$$
\frac{1}{1+s_k}=\frac{1}{\sqrt{s_k-s_{k-1}}}*\frac{\sqrt{s_k-s_{k-1}}}{1+s_k}
$$

According to [CBS inequality](https://en.wikipedia.org/wiki/Cauchy%E2%80%93Schwarz_inequality) we know the following is true:

$$
(\frac{1}{1+s_1}+...+\frac{1}{1+s_n})^2 \lt (\frac{1}{s_1}+\frac{1}{s_2-s_1}+...+\frac{1}{s_n-s_{n-1}})(\frac{s_1}{(1+s_1)^2}+\frac{s_2-s_1}{(1+s_2)^2}+...+\frac{s_n-s_{n-1}}{(1+s_n)^2})
$$

We can safely square root everything to obtain:

$$
\frac{1}{1+s_1}+...+\frac{1}{1+s_n} \lt \sqrt{(\frac{1}{s_1}+\frac{1}{s_2-s_1}+...+\frac{1}{s_n-s_{n-1}})}*\sqrt{(\frac{s_1}{(1+s_1)^2}+\frac{s_2-s_1}{(1+s_2)^2}+...+\frac{s_n-s_{n-1}}{(1+s_n)^2})}
$$

We are almost there.

If we somehow manage to prove that: $$\frac{s_1}{(1+s_1)^2}+\frac{s_2-s_1}{(1+s_2)^2}+...+\frac{s_n-s_{n-1}}{(1+s_n)^2} \le 1$$, the problem is solved.

But remember $$s_1 \lt s_2 \lt ... \lt s_n$$, so we can safely say:

$$
\frac{s_1}{(1+s_1)^2}+\frac{s_2-s_1}{(1+s_2)^2}+...+\frac{s_n-s_{n-1}}{(1+s_n)^2} \le \frac{s_1}{(1+s_1)} + \frac{s_2-s_1}{(1+s_1)(1+s_2)}+...+\frac{s_n-s_{n-1}}{(1+s_{n-1})(1+s_{n})}
$$

This becomes:

$$
\frac{s_1}{(1+s_1)^2}+\frac{s_2-s_1}{(1+s_2)^2}+...+\frac{s_n-s_{n-1}}{(1+s_n)^2} \lt 1 - \frac{1}{1+s_1} + \frac{1}{1+s_1} -...-\frac{1}{1+s_n} 
$$


Eventually, after reducing the terms one by one:

$$
\frac{s_1}{(1+s_1)^2}+\frac{s_2-s_1}{(1+s_2)^2}+...+\frac{s_n-s_{n-1}}{(1+s_n)^2} \lt 1 - \frac{1}{1+s_n} \lt 1
$$

At this point, everything is proven.

## Answer 10.

We can write our relationship as:

$$
m=\frac{(x+y)^2}{x^3+xy^2-x^2y-y^3} = \frac{(x+y)^2}{(x-y)(x^2+y^2)}.
$$

Let's suppose the opposite and affirm that $$m \in \mathbb{Z}$$.

If $$m \in \mathbb{Z}$$, then $$\frac{(x+y)^2}{x^2+y^2} \in \mathbb{Z}$$. 

But we can write the fraction as:

$$
\frac{(x+y)^2}{x^2+y^2} = 1 + \frac{2xy}{x^2+y^2} \in \mathbb{Z}
$$

Then $$\frac{2xy}{x^2+y^2}$$ must be an integer.

But we know for certain that $$x^2+y^2 \gt 2xy \Rightarrow 0 \lt \frac{2xy}{x^2+y^2} \lt 1$$, but this is a contradiction.

