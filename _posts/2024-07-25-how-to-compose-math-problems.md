---
title: "How to compose math problems"
date: "2024-07-25"
classes: wide
comments: true
excerpt: "How I compose math problems"
usekatex: true
categories:
- "nontech"
- "math"
tags:
- "math"
- "logarithms"
---

When I was a young student (around 12), my math teacher came-up with an unique requirement for his students to not only solve math problems but also to compose them. 

This unconventional approach encouraged his students (me and my classmates) to think creatively and critically, fostering a deeper understanding of the areas we were learning about. While the task was not mandatory, some classmates and I embraced the challenge and worked on developing geometry and algebra exercises from "scratch". I am not sure how original we were, but the efforts paid off when our *little creations* were published in an obscure math magazine I cannot find online.

To this day, I create problems that I rarely publish (one notable exception would be [my previous article]({{site.url}}/2024/06/06/13-problems-with-logarithms)).

In any case, with time, I've developed a taste of what a *beautiful* problem looks like. Of course, *beauty is in the eye of the beholder*, so, for me, a *beautiful math problem* is concise, shows *symmetry*, and is easy to read and understand even if you haven't mastered that particular domain.

Let me give you an example:

> Prove the following inequality:
>
> $$
\frac{a}{b+2c+d}+\frac{b}{c+2d+a}+\frac{c}{d+2a+b}+\frac{d}{a+2b+c} \ge 1
> $$
>
> $$
\forall a,b,c,d \gt 0.
> $$

This is what I call an excellent problem, as it's concise, a 12-year-old can understand the requirement, and moreover, it showcases a certain symmetry that pleases the eye that looks for patterns. And, no, I did not create the problem, nor is it easy to solve (but not impossible if you know how to juggle with fundamental inequalities).

In any case, let's try to create a problem for fun. By the end of the article, I might convince you to try this as a hobby.

## Step 1

Start with a nice and easy problem that caught your attention. It should be something simple, numbers instead of letters. 

Let me give you an example, a sample problem from the admission exam for the [*Academia De Studii Economice, Bucuresti*](https://en.wikipedia.org/wiki/Bucharest_Academy_of_Economic_Studies):

> If $$a=\ln5$$, $$b=a+\ln2$$ and $$T=\log_{20}8$$, prove $$T=\frac{3(b-a)}{2b-a}$$.

I will not ask you to pause for a moment because this is not YouTube, so here is the straight-forward solution: we just change the base for $$T=\log_{20}8=\frac{\ln8}{\ln20}=\frac{3\ln2}{\ln5+2\ln2}$$. 

But, because $$\ln2=b-a$$, $$T$$ can be rewritten as: $$T=\frac{3(b-a)}{2(b-a)+a}=\frac{3(b-a)}{2b-a}$$.

It's a cute problem that checks if the student can apply basic formulas. 

## Step 2

Take a step back and look for some *hidden* information, try to understand the *core* of why the problem works.

One observation to make is that the numbers $$2$$, $$5$$, $$8$$ and $$20$$ were not randomly chosen. $$2$$ and $$5$$ are prime numbers, while $$T=\log_{20}8$$ combines the two, as $$20=2^2 * 5$$ and $$8=2*2*2$$.

This is why we can express $$T$$ as an expression involving $$a$$ and $$b$$.

So we can already generalize a little: if we replace $$2$$ and $$5$$ with two arbitrary prime numbers, we already have a new problem:

> If $$m$$, $$n$$ are prime numbers, $$a=\ln m$$, $$b=a + \ln n$$, and $$T=\log_{(m*n^2)}(n^3)$$, prove $$T=\frac{3(b-a)}{2b-a}$$.

After this first *iteration*, the *new* problem is as concise as before, but it's not exactly original, nor does the expression $$\frac{3(b-a)}{2b-a}$$ looks *symmetrical* enough for my taste, not to mention the ugly $$\log_{(m*n^2)}(n^3)$$.

But what if $$m$$, $$n$$ are not prime numbers? Is it still working? That's a different route we can take.

## Step 3

Let's change $$T$$ into something more *beautiful* and concise. Why not proving $$T=\frac{b-a}{b+a}$$.

At this point, we have to *backtrack* the new value of $$T$$ in its logarithmic form. So if we've picked $$T=\frac{b-a}{b+a}$$, then $$T=\frac{\ln n}{\ln n + \ln m + \ln m}=\frac{\ln n}{\ln (n*m^2)}=\ln_{(n*m^2)}n$$.

So the new problem has just become:

> If $$m$$, $$n$$ are prime numbers, $$a=\ln m$$, $$b=a + \ln n$$, and $$T=\log_{(m*n^2)}n$$, prove $$T=\frac{b-a}{b-a}$$.

The new results are underwhelming. $$T=\log_{(m*n^2)}n$$ still looks bad, and honestly speaking, the problem is still elementary. 

## Step 4

At this point, we can think of new ways of making the problem more difficult, so why aren't we introducing more prime numbers to see how things change? So instead of having $$a$$, and $$b$$, let's introduce $$a, b, c, d$$, where:

$$
\begin{cases}
a=\ln2 \\
b=\ln3 + a \\
c=\ln5 + b \\
d=\ln7 + c
\end{cases}
$$

But hey, there's a pattern we can already spot. Why don't you look at this from a different angle:

$$
\begin{cases}
\ln2=a \\
\ln3=b-a \\
\ln5=c-b \\
\ln7=d-c
\end{cases}
$$

If we sum-up $$\ln2+\ln3+\ln5+\ln7=\ln(2*3*5*7)=a+(b-a)+(c-b)+(d-c)=d$$. The terms are reducing themselves nicely, so we are close to getting something more... *beautiful*.

How about obtaining something like $$T=\frac{d-a}{d+a}$$ ? We already know that $$d=\ln(2*3*5*7)$$. Then $$d-a=\ln(3*5*7)$$, while $$d+a=\ln2+\ln(2*3*5*7)$$.

It's nice, our *new* problem becomes:

> If $$a=\ln2$$, $$b=\ln2+a$$, $$c=\ln5+b$$, $$d=\ln5+c$$, and $$T=\log_{(2*2*3*5*7)}(3*5*7)$$, prove $$T=\frac{d-a}{d+a}$$.

Can you see the pattern $$T=\log_{(2*2*3*5*7)}(3*5*7)$$ ? The base of the algorithm is the product of the first four prime numbers ($$2$$ appears twice), while the argument of the logarithm is the product of the first four prime numbers minus the first one ($$2$$).

## Step 5

Now, it is time for a further generalization, the final touch. 

Let's pick $$n$$ prime numbers $$p_n$$ and their corresponding $$a_n$$.

$$
\begin{cases}
a_1 = \ln p_1 \\
a_2 = a_1 + \ln p_2 \\
a_3 = a_2 + \ln p_3 \\
... \\
a_n = a_{n-1} + \ln p_n
\end{cases}
$$

Or from a different perspective:

$$
\begin{cases}
\ln p_1 = a_1 \\
\ln p_2 = a_2 - a_1 \\
\ln p_3 = a_3 - a_2 \\
... \\
\ln p_n = a_n - a_{n-1}
\end{cases}
$$

Again, if we sum them up, we observe that: $$\sum_{i=1}^n \ln p_i = \ln (\prod_{i=1}^n p_i) = a_n$$. Additionally:

$$
\begin{cases}
a_n - a_1 = \ln (\prod_{i=2}^n p_i) \\
a_n + a_1 = \ln (p_1 * \prod_{i=1}^n p_i) 
\end{cases}
$$

So why don't we formulate our problem in the following manner:

> Given $$P_n=\{p_i \mid p_i \text{ is the ith prime, } i=1,2,3...,n\}$$, and $$a_1=\ln p_1$$, $$a_2=a_1 + \ln p_2$$, ..., $$a_n=a_{n-1}+\ln p_n$$, if $$\log_kt=\frac{a_n-a_1}{a_n+a_1}$$, prove that there is at least one solution so that $$k,t \in \mathbb{N}$$, and $$k,t$$ have consecutive prime factors.

Based on what we discussed, the answer is:

$$
\begin{cases}
k=p_1\prod_{i=1}^n(p_i)\\
t=\prod_{i=2}^n(p_i)
\end{cases}
$$

$$k$$ is the product of the first $$n$$ prime numbers, with $$2$$ appearing twice.

$$t$$ is the product of the first $$n$$ prime numbers, excluding $$2$$.

If we put everything back into the formula, you will see the answer is correct:

$$
\log_kt=\frac{\ln t}{\ln k}=\frac{\ln(\prod_{i=2}^n(p_i))}{\ln(p_1\prod_{i=1}^n(p_i))} = \frac{\ln(p_2 * ... * p_n)}{\ln(p_1*p_1*...*p_n)}=\\
\\
\\
\frac{\ln p_2 + ... + \ln p_n}{\ln p_1 + \ln p_1 + ... + \ln p_n}=\frac{a_n-a_1}{a_n + a_1}
\\
$$

## Conclusion 1

It's nice to see that with enough pattern spotting and a clear plan, you can transform the initial problem:

> If $$a=\ln5$$, $$b=a+\ln2$$ and $$T=\log_{20}8$$, prove $$T=\frac{3(b-a)}{2b-a}$$.

To this:

> Given $$P_n=\{p_i \mid p_i \text{ is prime ith prime, } i=1,2,3...,n\}$$, and $$a_1=\ln p_1$$, $$a_2=a_1 + \ln p_2$$, ..., $$a_n=a_{n-1}+\ln p_n$$, if $$\log_kt=\frac{a_n-a_1}{a_n+a_1}$$, prove that there is at least one solution so that $$k,t \in \mathbb{N}$$, and $$k,t$$ have consecutive prime factors.

They are the same problem if you take that one step back and look closer.

So where is the creative touch, you would ask? I am asking myself the same question.

# Conclusion 2

Is the problem we've come up with a good one? I am not sure; sometimes, our route takes us nowhere. Sometimes, we can "discover" beautiful truths camouflaged as math problems.







































