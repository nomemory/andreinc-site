---
title: "A short introduction to Math Olympiad inequalities"
date: "2024-12-09"
classes: wide
comments: true
excerpt: "Getting started with competitive math inequalities"
usekatex: true
categories:
- "math"
tags:
- "math"
- "competitive"
---

<style type="text/css">
.mp {
    border: solid;
    border-width: thin;
    background-color: #F0F0F0; 
    padding-left: 25px; 
    padding-top: 25px; 
    padding-right: 25px; 
    padding-bottom: 25px;
}

.mpc {
    text-align: center;
    /* padding-top: 10px */
}

</style>


# Introduction

Inequalities are among the most "fascinating" and versatile topics in [competitive mathematics](https://en.wikipedia.org/wiki/List_of_mathematics_competitions) because they challenge solvers to think creatively and intuitively. If you look at the [IMO problem sets](https://artofproblemsolving.com/wiki/index.php/IMO_Problems_and_Solutions), you will find that inequality problems are almost always present, year after year. 

Approaching an "inequality" problem requires more than just sheer "mathematical force"; you need to take a step back and come up with clever manipulations, substitutions, and (sometimes) novel ideas. In essence, inequality problems blend "beauty" with "intellectual challenge", and they are embodying so well the spirit of "competitive mathematics". 

I am a bad salesperson when it comes to selling mathematics, but the main idea is inequality problems are cool.

* For soccer lovers, solving a hard inequality problem feels like scoring a goal after a [long dribbling](https://en.wikipedia.org/wiki/Dribbling). 
* For video-games lovers, solving a hard inequality problem feels like figuring out a hard puzzle in: [Machinarium](https://en.wikipedia.org/wiki/Machinarium) or [The Longest Journey](https://en.wikipedia.org/wiki/The_Longest_Journey). <sup>In the lack of contemporary examples.</sup>
* For chess-lovers, solving a hard inequality problem feels like solving a mate-in-six puzzle.
* For competitive programmers, solving a hard inequality feels like solving a hard problem on [codeforces](https://codeforces.com/).

In case you haven't seen one, this is what a hard inequality problems look like:
<p>
<div class="mp"> 
Let \(x_1, x_2, \dots x_n \in \mathbb{R}_{+}\), prove: \(\sum_{i=1}^n [\frac{1}{1+\sum_{j=1}^i x_j}] \lt \sqrt{\sum_{i=1}^n \frac{1}{x_i}} \)
<details> 
    <summary>Source</summary>
    <p>The Romanian Math Olympiad, The National Phase.</p>
</details>
</div>
</p>

<p>
<div class="mp"> 
Let \(a,b,c\) be positive real numbers. Prove that: 
<p class="mpc">
\( \frac{a}{\sqrt{a^2+8bc}} + \frac{b}{\sqrt{b^2+8ac}} + \frac{c}{\sqrt{c^2+8ab}} \ge 1 \).
</p>
<details> 
    <summary>Source</summary>
    <p>2001 IMO Problems/Problem 2</p>
</details>
</div>
</p>

> It is generally unwise to label something as "hard" or "difficult," especially in mathematics. However, considering that these problems are actual IMO challenges, it is reasonable to label them in this way.

The purpose of this article is to highlight some techniques and methods that can assist math hobbyists, novice problem solvers, and curious undergraduates in approaching seemingly difficult inequality problems. This writing will only touch upon a small portion of this expansive (debatable epithet) class of problems.

> An edgy teacher, names excluded, once said: "In an ideal world people would solve inequality problems instead of Sudoku!". We haven't spoken since, I like Sudoku.

---

# Inequations vs. Inequalities

There is a subtle distinction between an *inequality* and an *inequation*, although the terms are often used interchangeably in everyday mathematical language. 

An inequation, a less common term, behaves just like a mathematical equation involving an inequality symbol. Inequations emphasize the algebraic problem-solving aspect of an inequality. 

This is an inequation:
<p>
<div class="mp">
Solve \(|x^2-9|+|x^2-16| \lt 47\), for \(x\in\mathbb{R}\).
<details> 
    <summary>Graphical Solution</summary>
    <p><img src="/assets/images/2024-12-09-15-A-short-introduction-to-math-olympiad-inequalities/p01.png"/></p>
</details>
</div>
</p>

An inequation is all about finding solutions, while inequalities focus on the actual relationship between numbers, a statement of truth that applies for all numbers in a given domain. 

The following are inequalities:
<p>
<div class="mp">
Let \(x,y,z\) positive real numbers. Prove that:
<p class="mpc">
\(x^2+y^2+z^2 \ge xy + yz + zx \)
<details> 
    <summary>Hint 1</summary>
    <p>Multiply each side by 2</p>
</details>
<details> 
    <summary>Solution</summary>
    <p>After multiplying each side by two:</p>
    <p class="mpc">\((x-y)^2+(y-z)^2+(z-x)^2 \ge 0\)</p>
    <p>Equality holds when \(x=y=z\).</p>
</details>
</p>
</div>
</p>

<p>
<div class="mp">
Let \(n \in \mathbb{N}\). Prove that:
<p class="mpc">\(\frac{1}{2}\lt\frac{1}{n+1}+\frac{1}{n+2}+\dots+\frac{1}{2n}\lt\frac{3}{4}\)</p>
<details> 
    <summary>Solution</summary>
    <p>On one hand:</p>
    <p class="mpc">
    \(\frac{1}{n+1}+\frac{1}{n+2}+\dots+\frac{1}{2n}\gt\frac{1}{2n}+\frac{1}{2n}+\dots+\frac{1}{2n}=\frac{1}{2}\)
    </p>
    <p>On the other hand:</p>
    <p class="mpc">
    \(
    \frac{1}{n+1}+\frac{1}{n+2}+\dots+\frac{1}{2n}=\frac{1}{2}[(\frac{1}{n}+\frac{1}{2n})+(\frac{1}{n+1}+\frac{1}{2n-1})+\dots] = \\
    = \frac{1}{2}[\frac{3n}{2n^2}+\frac{3n}{2n^2+(n-1)}+\dots] < \frac{1}{2}[\frac{3n}{2n^2}+\dots] = \frac{3}{4} + \frac{1}{n} < \frac{3}{4}
    \)
    </p>
</details>

<details> 
    <summary>Source</summary>
    <p>This problem was sourced from "Culegere de probleme pentru liceu", Nastasescu, Nita, Brandiburu, Joita, 1997, a popular math book during my highschool years.</p>
</details>
</div>
</p>

---

# Weak Inequalities

Weak Inequalities are inequalities that include the possibility of equality. They are denoted by the symbols $$\ge$$ or $$\le$$. These contrast with *strict inequalities*, which use $$\gt$$ and $$\lt$$ and do not allow equality.

Weak inequalities are considered more important than inequalities that are strict, because they have a broader applicability, and in a way, they are *more fundamental*. For example if $$ax+b\ge0$$, then $$ax+b\gt0$$ still holds, but not vice-versa. 

The *renaissance* way to understand what a weak inequality is, is to imagine the finger of god, touching Adam's hand. In this regard, the following painting is a strict inequality, because this never happens.

![img]({{site.url}}/assets/images/2024-12-09-15-A-short-introduction-to-math-olympiad-inequalities/adam.jpg)

From a mathematical standpoint, we know, for example, that $$x^2+y^2\ge2xy$$. This is always true because $$(x-y)^2\ge0$$. If we plot both $$x^2+y^2$$, and $$2xy$$, we will a see thin line where the graphical representation "touch". That red line is the key to solve many problems in physics or engineering. This red line is specific to weak inequalities. 

![img]({{site.url}}/assets/images/2024-12-09-15-A-short-introduction-to-math-olympiad-inequalities/p02.png){:height="75%" width="75%"}

All in all, the main idea is that *weak inequalities* are more *interesting* than strict inequalities. 

---

# Useful Identities

Before discussing specific inequalities, it's important to highlight some key identities that problem creators often use when designing their problems. These identities are not only beneficial for understanding inequalities but also useful for solving other types of problems.

My favorite identities are:

<p>
<div class="mp">
<ol type="1">
    <li>\(\hspace{1cm} 2(x^2+y^2)=(x+y)^2+(x-y)^2 \)</li>
    <li>\(\hspace{1cm}  x^3+y^3=(x+y)(x^2-xy+y^2) \)</li>
    <li>\(\hspace{1cm} 2(xy+yz+zx)=(x+y+z)^2-(x^2+y^2+z^2) \)</li>
    <li>\(\hspace{1cm} 3(x+y)(y+z)(z+x)=(x+y+z)^3-(x^3+y^3+z^3) \)</li>
    <li>\(\hspace{1cm} (x+y)(y+z)(z+x)=(x+y+z)(xy+yz+zx)-xyz \)</li>
    <li>\(\hspace{1cm} x^3+y^3+z^3-3xyz=(x+y+z)(x^2+y^2+z^2-xy-yz-zx) \)</li>
    <li>\(\hspace{1cm} \frac{x}{(x-y)(x-z)}+\frac{y}{(y-x)(y-z)}+\frac{z}{(z-x)(z-y)}=0 \)</li>
    <li>\(\hspace{1cm} \frac{x^2}{(x-y)(x-z)}+\frac{y^2}{(y-x)(y-z)}+\frac{z^2}{(z-x)(z-y)}=1 \)</li>
    <li>\(\hspace{1cm} \frac{x^3}{(x-y)(x-z)}+\frac{y^3}{(y-x)(y-z)}+\frac{z^3}{(z-x)(z-y)}=x+y+z \)</li>
</ol>
</div>
</p>

Should you memorize all of these identities? It depends. If you are actively participating in contests, I believe it's worthwhile to memorize them. Otherwise, it’s enough to be aware of their existence. When you encounter similar structures, check if these identities can assist you. In a contest, you can introduce them as lemmas, and for clarity, it’s advisable to provide quick proofs. Fortunately, the proofs are usually straightforward and involve simple algebraic manipulations.

For example, take a look at the following problem:

<p>
<div class="mp"> 
Let \(x,y,z \in \mathbb{R}^{*}\), \(x< y < z\), and \(\frac{x^2}{yz}+\frac{y^2}{xz}+\frac{z^2}{xy}=3\). Prove that the <a href="https://en.wikipedia.org/wiki/Arithmetic_mean">arithmetic mean</a> of \(x,y,z\) is 0.

<details> 
    <summary>Hint 1</summary>
    <p>Multiply each side with \(xyz\)</p>
</details>

<details> 
    <summary>Hint 2</summary>
    <p>Use the following identity:</p>
    <p>\(x^3+y^3+z^3-3xyz=(x+y+z)(x^2+y^2+z^2-xy-yz-zx)\)</p>
</details>

<details> 
    <summary>Solution</summary>
    <p>The arithmetic mean of \(x,y,z\) is \(\frac{x+y+z}{3}=0\), thus we need to prove that \(x+y+z=0\).</p>
    <p>By multiplying each side with \(xyz\), our expression becomes: \(x^3+y^3+z^3-3xyz=0\).</p>
    <p>Using identity 06. we can conclude that:</p>
    <p>\(0=(x+y+z)(x^2+y^2+z^2-xy-yz-zx)\)</p>
    <p>
        This means that:
        \(
            \begin{cases}
            x+y+z=0 \text{ or} \\
            x^2+y^2+z^2-xy-yz-zx=0 \\
            \end{cases}
        \)
    </p>
    <p>Let's suppose:</p>
    <p>
     \(x^2+y^2+z^2-xy-yz-zx=0 \Leftrightarrow \\
     2x^2+2y^2+2z^2-2xy-2yz-2zx=0 \Leftrightarrow \\ 
     x^2-2xy+y^2+y^2-2yz+z^2+z^2-2zx+x^2=0 \Leftrightarrow \\ 
     (x-y)^2+(y-z)^2+(z-x)^2=0\)
     </p>
     <p>This means \((x-y)=0\), \((y-z)=0\), \((z-x)=0\), which leads to \(x=y=z\).</p>
     <p>But this is impossible as \(x \lt y \lt z\), which leads to \(x+y+z=0\) being the only acceptable alternative.</p>
</details>

<details> 
    <summary>Source</summary>
    <p>This problem is "original" and was created by me in the context of this article.</p>
</details>
</div>
</p>

This wasn't an inequality problem, but similar "structures" can appear in various contexts, so knowing your identities can help you reduce the amount of work you need to perform to solve a problem.

If you've enjoyed the previous the previous problem, give the next one a try:

<div class="mp"> 
Let \(x,y,z \in \mathbb{R}\), and \((x+y+z)^3=x^3+y^3+z^3\), prove that \((x+y+z)^{2n+1}=x^{2n+1}+y^{2n+1}+z^{2n+1}\), \( \forall n \in \mathbb{N} \).
<details> 
    <summary>Hint 1</summary>
    <p>Can you find and use an identity that involves \((x+y+z)^3\) and \(x^3+y^3+z^3\)</p>
</details>
<details> 
    <summary>Hint 2</summary>
    <p>Make use of the fact \( (x+y+z)^3 - (x^3+y^3+z^3)=3(x+y)(y+z)(z+x)\)</p>
</details>
<details> 
    <summary>Solution</summary>
    <p>No solution was included. If you want, you can provide one by sending me an email.</p>
</details>
<details> 
    <summary>Source</summary>
    <p>This problem was sourced from "Culegere de probleme pentru liceu", Nastasescu, Nita, Brandiburu, Joita, 1997, a popular math book during my highschool years.</p>
</details>
</div>

---

# The AM-GM Inequality

The AM (*Arithmetic Mean*) - GM (*Geometric Mean*) is a **fundamental** result in algebra that states:

<p>
<div class="mp">
<p>For any set of non-negative real numbers \(a_1, a_2, \dots , a_n\) the arithmetic mean is always greater or equal to the geometric mean:</p>
<p class="mpc">
\(\frac{a_1+a_2+\dots+a_n}{n} \ge \sqrt[n]{a_1*a_2*\dots*a_n}\)
</p>
<p> Or </p>
<p class="mpc">
\( \sum_{i=1}^n a_i \ge n \sqrt[n]{\prod_{i=1}^n a_i}\)
</p>
<p>Equality holds, if, and only if \(a_1=a_2=\dots=a_n\).</p>
</div>
</p>

For $$n=2$$, the inequality can be written as: $$\frac{a+b}{2} \ge \sqrt{ab}$$.

For $$n=3$$, the inequality can be written as: $$\frac{a+b+c}{3} \ge \sqrt[3]{abc}$$.

An interesting result happens when $$\prod_{i=1}^na_i=1$$. In this case, $$\sum_{i=1}a_i \ge n$$, the sum of the numbers is always $$\ge n$$. 

That being said, let's take a look at the following problems:

<p>
<div class="mp">
Let \(x \in \mathbb{R}_{+}\). Prove that \(x+\frac{1}{x} \ge 2\).
<details> 
    <summary>Solution</summary>
    <p>To prove the inequality we simply apply the AM-GM for \(x\), and \(\frac{1}{x}\):</p>
    <p>\( \frac{x+\frac{1}{x}}{2} \ge \sqrt{x*\frac{1}{x}} \Leftrightarrow x + \frac{1}{x} \ge 2 \)</p>
    <p>Equality holds when \(x=\frac{1}{x} \Rightarrow x=1\).</p>
</details>
</div>
</p>

Now, let's "expand" the same idea further by solving the next problems:

<p>
<div class="mp">
Let \(x_1,x_2,\dots,x_n \in \mathbb{R}_{+}\). Prove that:
<p class="mpc">\(S=\frac{x_1}{x_2}+\frac{x_2}{x_3}+\dots+\frac{x_{n-1}}{x_n}+\frac{x_n}{x_1} \ge n \)</p>
<details> 
    <summary>Solution</summary>
    <p>To prove the inequality we simply apply the AM-GM Inequality:</p>
    <p>\( 
        \frac{S}{n} \ge \sqrt[n]{\frac{x_1}{x_2}\frac{x_2}{x_3}\dots\frac{x_n}{x_1}} \Leftrightarrow \\
        S \ge n*\sqrt[n]{1} \Leftrightarrow \\
        S \ge n
    \)
    </p>
    <p>Equality holds if \(x_1=x_2=\dots=x_n\).</p>
</details>
</div>
</p>

<p>
<div class="mp">
Prove that \(\frac{1}{1*3}+\frac{1}{3*5}+\dots+\frac{1}{(n-2)n}\ge\frac{1}{\sqrt{n}}-\frac{1}{n}\), \(\forall n \in \mathbb{N}\).
<details> 
    <summary>Hint 1</summary>
    <p>Did you know that you can write:</p>
    <p>
    \(
        \frac{1}{1*2}+\frac{1}{2*3}+\frac{1}{3*4}+\dots+\frac{1}{(n-1)n}=\frac{2-1}{1*2}+\frac{3-2}{2*3}+\dots+\frac{n-(n-1)}{(n-1)n} = \Leftrightarrow \\
        = \frac{1}{1}-\frac{1}{2}+\frac{1}{2}-\frac{1}{3}+\frac{1}{3}-\dots-\frac{1}{n}=1-\frac{1}{n}
    \)
    </p>
</details>
<details> 
    <summary>Hint 2</summary>
    <p>How we can we use the relationship from Hint 1 in our advantage?</p>
</details>
<details> 
    <summary>Solution</summary>
    <p>
    \(
        \frac{1}{1*3}+\frac{1}{3*5}+\dots+\frac{1}{(n-2)n} \ge \frac{1}{\sqrt{n}}-\frac{1}{n} \Leftrightarrow \\
        \frac{1}{2}[\frac{3-1}{1*3}+\frac{5-3}{3*5}+\dots+\frac{n-(n-2)}{(n-2)n}] \ge \frac{1}{\sqrt{n}}-\frac{1}{n} \Leftrightarrow \\
        \frac{1}{2}(1-\frac{1}{3}+\frac{1}{3}-\frac{1}{5}+\frac{1}{5}-\dots-\frac{1}{n}) \ge \frac{1}{\sqrt{n}}-\frac{1}{n} \Leftrightarrow \\
        \frac{1}{2}-\frac{1}{2n}+\frac{1}{n} \ge \frac{1}{\sqrt{n}} \Leftrightarrow \\
        \frac{1}{2}+\frac{1}{2n} \ge \frac{1}{\sqrt{n}} \Leftrightarrow \\
        \frac{1+\frac{1}{n}}{2} \ge \sqrt{1*\frac{1}{n}}
    \)
    </p>
    <p>The last relationship is true because of AM-GM. Equality holds when \(n=1\).</p>
</details>
</div>
</p>

The AM-GM inequality establishes a beautiful relationship between the $$\sum$$ (sum) and the $$\prod$$ (product) of some positive, real numbers, in this regard, let's try to solve the following problems:

<p>
<div class="mp">
Let \(x_1, x_2, \dots x_n\) be non-negative and positive real numbers. Can you find a value for \(P=\prod_{i=1}^nx_i\) so that \(S=\sum_{i=1}^n x_i \ge \pi\) ?
<details> 
    <summary>Solution</summary>
    <p>If we pick \(P=\prod_{i=1}^n x_i = (\frac{\pi}{n})^n\), then we know for certain that \(\sum_{i=1}^n x_i \ge n \sqrt[n]{(\frac{\pi}{n})^n} = \pi \)</p>
</details> 
</div>
</p>

<p>
    <div class="mp">
    <p>Let \(x,y,a,b \gt 0\), prove that:</p>
    <p class="mpc">
        \(
            \frac{a}{x}+\frac{b}{y} \ge \frac{4(ay+bx)}{(x+y)^2}
        \)
    </p>
    <details>
        <summary>Solution</summary>
        <p>
        \(
            \frac{ay+bx}{xy} \ge \frac{4(ay+bx)}{(x+y)^2} \Leftrightarrow 
            \frac{1}{xy} \ge \frac{4}{(x+y)^2} \Leftrightarrow 
            (\frac{x+y}{2})^2 \ge xy
        \)
        </p>
        <p>The inequality holds true.</p>
    </details>
    <details>
        <summary>Source</summary>
        <p>The Romanian Math Olympiad</p>
    </details>
    </div>
</p>

Now, just for fun, let's try a problem that (only!) looks more difficult:

<div class="mp">
Let \(m \in \mathbb{N}\), and \(x,y,z \in \mathbb{R}_{+}\), \( x \neq y \neq z \). Prove that:
<p class="mpc">\( \frac{mx+x^2+x^3}{(x-y)(x-z)} + \frac{my+y^2+y^3}{(y-x)(y-z)}+\frac{mz+z^2+z^3}{(z-x)(z-y)} \gt 4\sqrt[4]{xyz}\)</p>
<details> 
    <summary>Hint 1</summary>
    <p>If the numbers \(x,y,z\) are positive reals can be a hint for using the AM-GM inequality. Another hint is the \(\sqrt[4]{xyz}\) term on the right-hand-side.</p>
</details> 
<details> 
    <summary>Hint 2</summary>
    <p>What identities can prove useful for solving this problem ?</p>
</details>
<details> 
    <summary>Solution</summary>
    <p>As hinted, the identities from the first chapter are useful in solving the problem.</p>
    <p>
    The identities we are going to use are: 
    \(
    \begin{cases}
        \sum_{\text{cyc}}\frac{x}{(x-y)(x-z)}=0 \\
        \sum_{\text{cyc}}\frac{x^2}{(x-y)(x-z)}=1 \\
        \sum_{\text{cyc}}\frac{x^3}{(x-y)(x-z)}=x+y+z \\
    \end{cases}
    \)
    </p>
    <p> If we sum-up the relationship in the following manner we obtain the following:</p>
    <p>
    \(
    m*\sum_{\text{cyc}}\frac{x}{(x-y)(x-z)}+\sum_{\text{cyc}}\frac{x^2}{(x-y)(x-z)}+\sum_{\text{cyc}}\frac{x^3}{(x-y)(x-z)}=x+y+z+1 \Leftrightarrow \\
    \sum_{\text{cyc}}\frac{mx+x^2+x^3}{(x-y)(x-z)}=1+x+y+z
    \)
    </p>
    <p>At this point we simply apply the AM-GM inequality</p>
    <p>
    \(
    \sum_{\text{cyc}}\frac{mx+x^2+x^3}{(x-y)(x-z)}=1+x+y+z \gt 4\sqrt[4]{xyz}
    \)
    </p>
    <p>Equality cannot hold because it is stated that \(x \neq y \neq z\).</p>
</details> 
<details> 
    <summary>Source</summary>
    <p>This problem is "original" and was created by me in the context of this article.</p>
</details> 
</div>


---

## Grouping terms

Solving harder inequalities problems involve more than the simple use of the general formula. A common technique is to group the terms in our advantage, apply the AM-GM (or any other known inequality) for each "group", and then combine the resulting inequalities into a bigger one.

After solving a few exercises this technique will come naturally, but at first it might look unintuitive.

Can you solve the next problem without using any hints ?

<p>
<div class="mp">
Let \( a,b,c \in \mathbb{R}_{+} \). Prove that: \( (a^2+bc)(b^2+ca)(c^2+ab) \ge 8(abc)^2 \)
<details> 
    <summary>Hint 1</summary>
    <p>Apply the AM-GM Inequality in the following manner (for all terms):</p>
    <p class="mpc">\(a^2+bc\ge2\sqrt{a^2bc}\)</p>
</details>
<details> 
    <summary>Solution</summary>
    <p>This is a "classic" exercise where we have to "group" the terms and apply the AM-GM individually for each term:</p>
    <p class="mpc">
    \(
        \begin{cases}
        a^2+bc\ge2\sqrt{a^2bc} \\
        b^2+ac\ge2\sqrt{b^2ac} \\
        c^2+ab\ge2\sqrt{c^2ab}
        \end{cases}
    \)
    </p>
    <p>After multiplication (we are allowed to do so, as all terms are positive), the inequality is proven:</p>
    <p class="mpc">\((a^2+bc)(b^2+ac)(c^2+ab)\ge8\sqrt{a^4b^4c^4}=8a^2b^2c^2\)</p>
    <p>Equality holds when \(a=b=c=1\).</p>
</details>
<details> 
    <summary>Source</summary>
    <p>This problem is "original" and was created by me in the context of this article.</p>
</details>
</div>
</p>

An important thing to take in consideration is that when we sum/multiply [weak inequalities](https://proofwiki.org/wiki/Definition:Inequality/Weak) involving *interdependent* terms:
* We need to verify conditions across the inequalities to check if they remain consistent;
* If the equality conditions lead to contradictions or undefined values, the summation/multiplication might prove invalid. The summation/multiplication is not invalid in general, it's only invalid as a weak inequality. In such cases we can still use the strict inequality signs ($$>$$ or $$<$$).
* If the equality conditions are consistent, the summation/multiplication is valid, and you can proceed with the combined inequality.

Let's take a look at the following example:

<p>
<div class="mp">
    <p>Let \(a,b,c\) positive real numbers. Let's group the numbers in the following manner, and apply the AM-GM inequality:</p>
    <p class="mpc">
    \(\begin{cases}
        a+2b \ge 2\sqrt{2ab} \\ 
        b+2c \ge 2\sqrt{2bc} \\
        c+2a \ge 2\sqrt{2ac}
    \end{cases}\)
    </p>
    <p>For each of the three inequalities equality holds true if \(a=2b\), \(b=2c\) respectively \(c=2a\). But those conditions cannot be true in the same time, because this would lead to a contradiction, it would require \(a=b=c=0\). </p>
    <p>So, if we sum the three inequalities, we will "inherit" only the strict inequality sign.</p>
    <p>This is incorrect:</p>
    <p class="mpc">\(3(a+b+c) \ge 2\sqrt{2}(\sqrt{ab}+\sqrt{bc}+\sqrt{ac})\)</p>
    <p>This is correct:</p>
    <p class="mpc">\(3(a+b+c) \gt 2\sqrt{2}(\sqrt{ab}+\sqrt{bc}+\sqrt{ac})\)</p>
</div>
</p>

Let's solve the next exercise. How should we group the terms?

<p>
<div class="mp">
Let \( a,b,c \in \mathbb{R}_{+} \), and \(ab+bc+ca=1\). Prove that: 
<p class="mpc">\( a+b+c\gt\frac{2}{3}(\sqrt{1-ab}+\sqrt{1-bc}+\sqrt{1-ac}) \)</p>
<details> 
    <summary>Hint 1</summary>
    <p>Apply the AM-GM Inequality in the following manner (for all terms):</p>
    <p class="mpc">\(\frac{a+(b+c)}{2}\ge\sqrt{a(b+c)}\)</p>
</details>
<details> 
    <summary>Hint 2</summary>
    <p>How can we use the fact that: \(ab+bc+ca=1\) ?</p>
</details>
<details> 
    <summary>Solution</summary>
    <p>We group the terms in the following manner, applying the AM-GM three times:</p>
    <p class="mpc">
    \(
    \begin{cases}
        \frac{a+(b+c)}{2} \ge \sqrt{a(b+c)} = \sqrt{ab+ac} \\
        \frac{b+(a+c)}{2} \ge \sqrt{b(a+c)} = \sqrt{ba+bc} \\
        \frac{c+(a+b)}{2} \ge \sqrt{c(a+b)} = \sqrt{ca+cb}
    \end{cases}
    \)
    </p>
    <p>We sum-up all the inequalities and we obtain:</p>
    <p class="mpc">
    \(
        \frac{3(a+b+c)}{2}\gt\sqrt{ab+bc}+\sqrt{ba+bc}+\sqrt{ca+bc} \Leftrightarrow \\
        \frac{3(a+b+c)}{2}\gt\sqrt{1-bc}+\sqrt{1-ac}+\sqrt{1-ab} \Leftrightarrow \\
        a+b+c\gt\frac{2}{3}(\sqrt{1-bc}+\sqrt{1-ac}+\sqrt{1-ab})
    \)
    </p>
    <p>We've lost the possibility of having an inequality because \(a\neq b \neq c \neq 0\).</p>
</details>
<details> 
    <summary>Source</summary>
    <p>This problem is "original" and was created by me in the context of this article.</p>
</details>
</div>
</p>

Sometimes we need to find original ways to group terms. In won't be able to find the solution, don't worry, this inequality is more difficult to be solved relying only on AM-GM:

<p>
<div class="mp">
Let \(a,b,c \in (0,\infty)\), and \(bc+ac+ca=abc\). Prove that: 
<p class="mpc">\(3\sqrt{abc} \gt 2\sqrt{2}(\sqrt{a}+\sqrt{b}+\sqrt{c})\)</p>
<details> 
    <summary>Hint 1</summary>
    <p>Can you prove: \(\frac{1}{a}+\frac{1}{b}+\frac{1}{c}=1\) ?</p>
</details>
<details> 
    <summary>Hint 2</summary>
    <p>Why don't you perform the following "groupings":</p>
    <p class="mpc">
    \(
        \begin{cases}
        \frac{1}{a}+\frac{1}{a}+\frac{1}{b} = \frac{2}{a}+\frac{1}{b} \ge 2\sqrt{\frac{2}{ab}} \\
        \frac{1}{b}+\frac{1}{b}+\frac{1}{c} = \frac{2}{b}+\frac{1}{c} \ge 2\sqrt{\frac{2}{bc}} \\
        \frac{1}{c}+\frac{1}{c}+\frac{1}{a} = \frac{2}{c}+\frac{1}{a} \ge 2\sqrt{\frac{2}{ca}} 
    \end{cases}
    \)
    </p>
</details>
<details> 
    <summary>Solution</summary>
    <p>If we divide both sides of the expression \(abc=bc+ac+ab\) with \(abc\) we obtain: \(\frac{1}{a}+\frac{1}{b}+\frac{1}{c}=1\)</p>
    <p>Let's apply the AM-GM inequality for the following groups of terms:</p>
    <p class="mpc">
    \(
        \frac{1}{a}+\frac{1}{a}+\frac{1}{b} = \frac{2}{a}+\frac{1}{b} \ge 2\sqrt{\frac{2}{ab}} \\
        \frac{1}{b}+\frac{1}{b}+\frac{1}{c} = \frac{2}{b}+\frac{1}{c} \ge 2\sqrt{\frac{2}{bc}} \\
        \frac{1}{c}+\frac{1}{c}+\frac{1}{a} = \frac{2}{c}+\frac{1}{a} \ge 2\sqrt{\frac{2}{ca}} 
    \)
    </p>
    <p>If we sum all three terms we obtain the following:</p>
    <p class="mpc">
    \(
     3(\frac{1}{a}+\frac{1}{b}+\frac{1}{c}) \gt 2\sqrt{2}(\frac{1}{\sqrt{ab}} + \frac{1}{\sqrt{bc}}+\frac{1}{\sqrt{ca}}) \Leftrightarrow \\
     3 \gt 2\sqrt{2}(\frac{1}{\sqrt{ab}} + \frac{1}{\sqrt{bc}}+\frac{1}{\sqrt{ca}}) \Leftrightarrow \\
     3\sqrt{abc} \gt 2\sqrt{2}(\sqrt{c}+\sqrt{a}+\sqrt{b})
     \)
    </p>
</details>
<details> 
    <summary>Source</summary>
    <p>This problem is "original" and was created by me in the context of this article.</p>
</details>
</div>
</p>

Problems can become even more beautiful when we perform grouping on known identities. In this regard, try to solve the next exercise without using any hints:

<p>
<div class="mp">
Let \(a,b\in(0,\infty)\) and \(a-b\gt0\). Prove that:
<p class="mpc">\(a^3+b^3\gt 4ab\sqrt{b(a-b)}\)</p>
<details> 
    <summary>Hint 1</summary>
    <p>Find an identity involving \(a^3+b^3\)</p>
</details>
<details> 
    <summary>Solution</summary>
    <p>We can write \( a^3+b^3=(a+b)(a^2-ab+b^2) \).</p>
    <p>By applying AM-GM on the first term of the expansion: \( a+b \gt 2\sqrt{ab} \). Equality holds if \(a=b\), but we know for certain this is not possible.</p>
    <p>By applying AM-GM to the second term of the expansion: \((a^2-ab)+b^2 \gt 2b\sqrt{a(a-b)}\).</p>
    <p>If we multiply the two inequalities (we are allowed to do so, as both terms are positive):</p>
    <p class="mpc">
    \( 
        (a+b)(a^2-ab+b^2) \gt 2\sqrt{ab} 2b \sqrt{a(a-b)} \Leftrightarrow \\
        a^3+b^3 \gt 4ab\sqrt{b(a-b)}
    \)
    </p>
</details>
<details> 
    <summary>Source</summary>
    <p>This problem is "original" and was created by me in the context of this article.</p>
</details>
</div>
</p>

In the end of this section let's *re*focus on some nice *weak* inequalities:

<p>
<div class="mp">
Let \(x_1, x_2, \dots, x_n\) be positive real numbers. Prove that:
<p class="mpc">
\(
    1+\sum_{j=2}^n[(\sum_{i=1}^j x_i) * (\sum_{i=1}^j \frac{1}{x_i})] \ge \frac{n(n+1)(2n+1)}{6}
\)
</p>
<details> 
    <summary>Hint 1</summary>
    <p>\(1^2+2^2+\dots+n^2 = \frac{n(n+1)(2n+1)}{6}\)</p>
</details>
<details>
    <summary>Hint 2</summary>
    <p>If we expand the sums, the relationship looks like this:</p>
    <p class="mpc">
    \(
        1+(x_1+x_2)(\frac{1}{x_1}+\frac{1}{x_2})+\dots+(x_1+\dots+x_n)(\frac{1}{x_1}+\dots+\frac{1}{x_n}) \ge \frac{n(n+1)(2n+1)}{6}
    \)
    </p>
</details>
<details>
    <summary>Solution</summary>
    <p>Let's introduce a Lemma (actually this "Lemma" is a direct consequence of the HM-AM or CBS inequalities we will discuss later). Let's prove that for all \(x_1, \dots, x_n\) positive real numbers the following inequality is true:</p>
    <p class="mpc">
        \(
            (x_1+x_2+\dots+x_n)(\frac{1}{x_1}+\frac{1}{x_2}+\dots+\frac{1}{x_n}) \ge n^2
        \)
    </p>
    <p>The solution is simple, we just apply the AM-GM on the two "groups" of terms:</p>
    <p class="mpc">
        \(
            \begin{cases}
            x_1+x_2+\dots+x_n \ge n\sqrt[n]{x_1 * x_2 * \dots * x_n} \\
            \frac{1}{x_1}+\frac{1}{x_2}+\dots+\frac{1}{x_n} \ge n\sqrt[n]{\frac{1}{x_1 * x_2 * \dots * x_n}}
            \end{cases}
        \)
    </p>
    <p>In both cases equality holds for \(x_1=x_2=\dots=x_n\), so after multiplying the two expressions:</p>
    <p class="mpc">
        \(
            (x_1+x_2+\dots+x_n)(\frac{1}{x_1}+\frac{1}{x_2}+\dots+\frac{1}{x_n}) \ge n^2 \sqrt[n]{\frac{x_1*x_2*\dots*x_n}{x_1*x^2*\dots*x_n}} = n^2
        \)
    </p>
    <p>Using the Lemma:</p>
    <p class="mpc">
     \(
        1+\underbrace{(x_1+x_2)(\frac{1}{x_1}+\frac{1}{x_2})}_{\ge 2^2}+\dots+\underbrace{(x_1+\dots+x_n)(\frac{1}{x_1}+\dots+\frac{1}{x_n})}_{\ge n^2} \ge \frac{n(n+1)(2n+1)}{6}
    \)
    </p>
    <p>Equality holds for \(x_1=x_2=\dots=x_n\).</p>
</details>
<details>
    <summary>Source</summary>
    <p>This problem is "original" and was created by me in the context of this article.</p>
</details>
</div>
</p>

# The mean inequality chain

> Also known as the QM-AM-GM-HM Inequalities, or how things are getting more serious.

Before introducing the actual inequality let's define two new means, the *harmonic* mean and the *quadratic mean*:

<p>
<div class="mp">
Let \(x_{i=1\dots n} \in \mathbb{R}_{+}\), then:
<p class="mpc">
\(
\text{Harmonic Mean}=\frac{n}{\frac{1}{x_1}+\dots+\frac{1}{x_n}}=\frac{n}{\sum_{i=1}^n \frac{1}{x_i}} \\ \\ \\
\)
</p>
<p class="mpc">
\(
\text{Quadratic Mean}=\sqrt{\frac{x_1^2+\dots+x_n^2}{n}}=\sqrt{\frac{\sum_{i=1}^n x_i^2}{n}}
\)
</p>
</div>
</p>

This HM-GM-AM-QM inequality is a fundamental result in mathematic involving the *harmonic mean*, *geometric mean*, *arithmetic mean*, and the *quadratic mean*:

<p>
<div class="mp">
Suppose \(x_1, x_2, \dots, x_n\) positive real numbers, then:
<p class="mpc">
\(
    0 \lt \frac{n}{\sum_{i=1}^n \frac{1}{x_i}} \le \underbrace{\sqrt[n]{\prod_{i=1}^n x_i} \le \frac{\sum_{i=1}^n x_i}{n}}_{\text{AM-GM Inequality}} \le \sqrt{\frac{\sum_{i=1}^n x_i^2}{n}}
\)
</p>
<p>Equality holds if \(x_1=x_2=\dots=x_n\).</p>
<p>If \(n=2\), the chain becomes:</p>
<p class="mpc">
\(
    0 \lt \frac{2x_1x_2}{x_1+x_2} \le \sqrt{x_1x_2} \le \frac{x_1+x_2}{2} \le \sqrt{\frac{x_1^2+x_2^2}{2}}
\)
</p>
<p>If \(n=3\), the chain becomes:</p>
<p class="mpc">
\(
    0 \lt \frac{3x_1x_2x_3}{x_1x_2+x_2x_3+x_3x_1} \le \sqrt[3]{x_1x_2x_3} \le \frac{x_1+x_2+x_3}{3} \le \sqrt{\frac{x_1^2+x_2^2+x_3^2}{3}}
\)
</p>
</div>
</p>

We can now solve a few new problems using the newfound relationships. The identities we've seen are still relevant, and so is the "grouping" technique.

<p>
<div class="mp">
Let \(a,b,c\) be positive real numbers, and \(abc=1\). Prove that:
<p class="mpc">\(ab+bc+ca\ge3\)</p>
<details>
    <summary>Solution</summary>
    <p>The HM-GM inequality states that:</p>
    <p class="mpc">
        \(
            \begin{cases}
            \frac{3*abc}{ab+bc+ca} \le \sqrt[3]{abc} \\
            abc=1
            \end{cases} \Rightarrow 3 \le ab+bc+ca
        \)
    </p>
    <p>Equality holds when \(a=b=c=1\).</p>
</details>
</div>
</p>

<p>
<div class="mp">
Let \(a,b,c,x,y,z\) be positive real numbers, and \(x+y+z=a+b+c=1\). Prove that:
<p class="mpc">
\(
    \frac{1}{ax+by+cz}+\frac{1}{cx+ay+bz}+\frac{1}{bx+cy+az} \ge 9
\)
</p>
<details>
    <summary>Hint 1</summary>
    <p>Is there a way to apply the HM-AM inequality to solve the problem?</p>
</details>
<details>
    <summary>Solution</summary>
    <p>We apply the HM-AM inequality in the following manner:</p>
    <p class="mpc">
    \(
        \frac{\frac{1}{ax+by+cz}+\frac{1}{cx+ay+bz}+\frac{1}{bx+cy+az}}{3} \ge \frac{3}{(ax+by+cz)+(cx+ay+bz)+(bx+cy+az)} \Leftrightarrow \\
        \frac{1}{ax+by+cz}+\frac{1}{cx+ay+bz}+\frac{1}{bx+cy+az} \ge \frac{9}{a(x+y+z)+b(x+y+z)+c(x+y+z)} \Leftrightarrow \\
        \frac{1}{ax+by+cz}+\frac{1}{cx+ay+bz}+\frac{1}{bx+cy+az} \ge \frac{9}{a+b+c} \Leftrightarrow \\
        \frac{1}{ax+by+cz}+\frac{1}{cx+ay+bz}+\frac{1}{bx+cy+az} \ge 9
    \)
    </p>
</details>
</div>
</p>

---

# The power of substitutions

Substitutions are powerful mechanisms in mathematics because they simplify complex problems, reveal hidden structures, and transform seemingly impossible problems into more familiar or solvable forms. By changing variables, substitutions allow viewing the same problem from different perspectives, often leading to new insights - or new problems. I assure you, problem creators love substitutions.

In a previous exercise we've proven that $$x+\frac{1}{x}\ge2$$, $$\forall x \in \mathbb{R}_{+}$$. In this regard, can you solve the next problems ?

<p>
<div class="mp">
Let \(a, b\) positive real numbers. Prove that \(\frac{a}{b}+\frac{b}{a}\ge2\).
<details>
    <summary>Solution</summary>
    <p>We substitute \(x \rightarrow \frac{a}{b}\) in \(x+\frac{1}{x}\ge2 \) which we know is a true statement (proven before) \(\Rightarrow \frac{a}{b}+\frac{b}{a}\ge 2\) is also true.</p>
</details>
</div>
</p>

<p>
<div class="mp">
Let \(x,y,z\) be positive real numbers. Prove that:
<p class="mpc">
\(
    3 \ge \frac{2(\sqrt{x}+1)}{2(\sqrt{x}+1)+x} + \frac{2(\sqrt{y}+1)}{2(\sqrt{y}+1)+y} + \frac{2(\sqrt{z}+1)}{2(\sqrt{z}+1)+z}
\)
</p>
<details>
    <summary>Hint 1</summary>
    <p>You can write: \(\frac{2(\sqrt{x}+1)}{2(\sqrt{x}+1)+x}=\frac{2(\sqrt{x}+1)}{(\sqrt{x}+1)^2+1}\)</p>
</details>
<details>
    <summary>Solution</summary>
    <p>For each of the terms we can apply the following trick: \(\frac{2(\sqrt{x}+1)}{2(\sqrt{x}+1)+x}=\frac{2(\sqrt{x}+1)}{(\sqrt{x}+1)^2+1}\). We have to prove: </p>
    <p class="mpc">
    \(
        3 \ge \frac{2(\sqrt{x}+1)}{x+2\sqrt{x}+1+1}+\frac{2(\sqrt{y}+1)}{y+2\sqrt{y}+1+1}+\frac{2(\sqrt{z}+1)}{z+2\sqrt{z}+1+1} \Leftrightarrow \\
        3 \ge \frac{2(\sqrt{x}+1)}{(\sqrt{x}+1)^2+1}+\frac{2(\sqrt{y}+1)}{(\sqrt{y}+1)^2+1}+\frac{2(\sqrt{z}+1)}{(\sqrt{z}+1)^2+1} \Leftrightarrow \\
    \)
    </p>
    <p>We substitute:</p>
    <p class="mpc">
    \(
    \begin{cases}
        \sqrt{x}+1 \rightarrow a \\
        \sqrt{y}+1 \rightarrow b \\
        \sqrt{z}+1 \rightarrow c
    \end{cases}
    \)
    </p>
    <p>After substitution:</p>
    <p class="mpc">
    \(
        3 \ge \frac{2a}{a^2+1}+\frac{2y}{y^2+1}+\frac{2c}{c^2+1} \Leftrightarrow
        3 \ge \frac{2}{a+\frac{1}{a}}+\frac{2}{b+\frac{1}{b}}+\frac{2}{c+\frac{1}{c}}
    \)
    </p>
    <p>We have proven that \(a+\frac{1}{a}\ \ge 2\), so the above inequality is true.</p>
</details>
<details>
    <summary>Source</summary>
    <p>This problem is "original" and was created by me in the context of this article.</p>
</details>
</div>
</p>

## Nesbitt's Inequality

Nesbitt's Inequality is classic and elegant result in inequalities, and its commonly taught in the context of competitive mathematics. Using this, might help you "skip" tedious steps where you would normally have to use AM-GM.

In a generalized form:

<p>
<div class="mp">
If \(x_1, x_2, \dots, x_n\) are positive real numbers, then \(\sum_{i=1}^n \frac{a_i}{S-a_i}\ge\frac{n}{n-1}\), where \(S=\sum_{i=1}^n x_i\). Equality holds if \(x_1=x_2=\dots=x_n\).
</div>
</p>

Most of the times you will apply it for three numbers:

<p>
<div class="mp">
If \(a,b,c\) are positive positive real numbers, then:
<p class="mpc">
\(
    \frac{a}{b+c}+\frac{b}{a+c}+\frac{c}{a+b} \ge \frac{3}{2}
\)
</p>
</div>
</p>

Nesbitt's Inequality can be proven using the substitution technique corroborated with the AM-GM Inequality. So let's prove Nesbitt's inequality for $$n=3$$.

<p>
<div class="mp">
<p>We have to prove: \(\frac{a}{b+c} + \frac{b}{c+a} + \frac{c}{a+b} \ge \frac{3}{2} \), \(\forall a,b,c \in \mathbb{R}_{+}\).</p>
<p>The first step is to perform the following substitutions:</p>
<p class="mpc">
    \(
        \begin{cases}
            x=a+b\\
            y=b+c \\
            z=c+a
        \end{cases}
    \)
</p>
<p>We've already proven that \(\frac{x}{y}+\frac{y}{x}\ge2\), then:</p>
<p class="mpc">\(\underbrace{\frac{x}{y}+\frac{y}{x}}_{\ge2}+\underbrace{\frac{x}{z}+\frac{z}{x}}_{\ge2}+\underbrace{\frac{y}{z}+\frac{z}{y}}_{\ge2}\ge6\)</p>
<p>This also means:</p>
<p class="mpc">\(\frac{x+z}{y}+\frac{y+z}{x}+\frac{x+y}{z}\ge6\)</p>
<p>If we perform the reverse substitution:</p>
<p class="mpc">
\(
    \frac{(a+b)+(c+a)}{b+c}+\frac{(b+c)+(c+a)}{a+b}+\frac{(a+b)+(b+c)}{c+a} \ge 6 \Leftrightarrow \\
    \frac{2a}{b+c}+\frac{b+c}{b+c}+\frac{2c}{a+b}+\frac{a+b}{a+b}+\frac{2b}{c+a}+\frac{c+a}{c+a} \ge 6 \Leftrightarrow \\
    \frac{a}{b+c}+\frac{c}{a+b}+\frac{b}{c+a} \ge \frac{3}{2}
\)
</p>
</div>
</p>

As you just witnessed substitutions are powerful mechanisms through which we can transform and adapt a given structure into a known one. Of course, Nesbitt's Inequality can be proved using other techniques, so, if you are curious, check the official [wikipedia article](https://en.wikipedia.org/wiki/Nesbitt%27s_inequality).

Can you solve the next problems using substitutions and Nesbitt's Inequality ?

<p>
<div class="mp">
Let \(x,y,z\) positive real numbers. Prove that:
<p class="mpc">
\(
    \frac{zy}{x(z+y)}+\frac{zx}{y(z+x)}+\frac{xy}{z(x+y)} \ge \frac{3}{2}
\)
</p>
<details>
    <summary>Solution 1</summary>
    <p>All we need is to substitute \(a \rightarrow \frac{1}{x}, b \rightarrow \frac{1}{y}, c \rightarrow \frac{1}{z}\) in Nesbitt's inequality:</p>
    <p class="mpc">
    \(
        \frac{\frac{1}{x}}{\frac{1}{y}+\frac{1}{z}}+\frac{\frac{1}{y}}{\frac{1}{x}+\frac{1}{z}}+\frac{\frac{1}{z}}{\frac{1}{x}+\frac{1}{y}} \ge \frac{3}{2} \Leftrightarrow \\
        \frac{yz}{x(y+z)}+\frac{xz}{y(x+z)}+\frac{xy}{z(x+y)} \ge \frac{3}{2}
    \)
    </p>
    <p>Equality holds if \(x=y=z\).</p>
</details>
</div>
</p>

For the next one there's any easy solution using the AM-GM inequality, but can you prove it with Nesbitt ?

<p>
<div class="mp">
Let \(x,y,z \in \mathbb{R}_{+}\), prove that:
<p class="mpc">
\(
    \frac{-x+y+z}{x}+\frac{x-y+z}{y}+\frac{x+y-z}{z} \ge 3
\)
</p>
<details>
    <summary>Hint</summary>
    <p>Divide each side by \(2\):</p> 
    <p class="mpc">\(\frac{-x+y+z}{2x}+\frac{x-y+z}{2y}+\frac{x+y-z}{2z} \ge \frac{3}{2}\).</p>
</details>
<details>
    <summary>Solution</summary>
    <p>After we divide each side by two we get the following relationship:</p>
    <p class="mpc">
    \(\frac{-x+y+z}{2x}+\frac{x-y+z}{2y}+\frac{x+y-z}{2z} \ge \frac{3}{2}\).
    </p>
    <p>We perform the following substitutions:</p>
    <p class="mpc">
        \(
            \begin{cases}
            a \rightarrow -x+y+z \\
            b \rightarrow x-y+z \\
            c \rightarrow x+y-z
            \end{cases}
        \)
    </p>
    <p>We observe:</p>
    <p class="mpc">
        \(
            \begin{cases}
            a+b \rightarrow 2z \\
            b+c \rightarrow 2x \\
            c+a \rightarrow 2y \\
            \end{cases}
        \)
    </p>
    <p>With this in mind, our inequality becomes Nesbitt's inequality:</p>
    <p class="mpc">
    \(
        \frac{-x+y+z}{(x-y+z)+(x+y-z)}+\frac{x-y+z}{(-x+y+z)+(x+y-z)}+\frac{x+y-z}{(-x+y+z)+(x-y+z)} \ge \frac{3}{2} \Leftrightarrow \\
        \frac{a}{b+c}+\frac{b}{a+c}+\frac{c}{a+b} \ge \frac{3}{2}
    \)
    </p>
     <p>Equality holds if \(x=y=z\).</p>
</details>
<details>
    <summary>Source</summary>
    <p>This problem is "original" and was created by me in the context of this article.</p>
</details>
</div>
</p>

Can you solve the next problem using Nesbitt's Inequality:

<p>
<div class="mp">
Let \(a, b, c\) be positive real numbers, and \(a+b+c=3\). Prove that:
<p class="mpc">
    \(
        \frac{1}{a+b}+\frac{1}{b+c}+\frac{1}{c+a} \ge \frac{3}{2}
    \)
</p>
<details>
    <summary>Hint 1</summary>
    <p>You can write:\(\frac{1}{a+b}=\frac{a+b+c}{(a+b)(a+b+c)}\)</p>
</details>
<details>
    <summary>Solution</summary>
    <p class="mpc">
    \(
        \text{LHS}=\frac{1}{a+b}+\frac{1}{b+c}+\frac{1}{c+a} = \frac{(a+b)+c}{(a+b)(a+b+c)} + \frac{(b+c)+a}{(b+c)(a+b+c)}+\frac{(c+a)+b}{(c+a)(a+b+c)} = \\ 
        = \frac{1}{\underbrace{a+b+c}_{=3}}(\underbrace{\frac{c}{a+b}+\frac{a}{b+c}+\frac{b}{c+a}}_{\ge\frac{3}{2}}+\underbrace{\frac{a+b}{a+b}+\frac{b+c}{b+c}+\frac{c+a}{c+a}}_{=3}) \ge \frac{3}{2}
    \)
    </p>
</details>
</div>
</p>

The next one looks rather peculiar, but can you solve it using Nesbitt's Inequality and *something else* ?

<p>
<div class="mp">
        Let \(x,y,z\) be positive real numbers, prove that:
        <p class="mpc">
            \(
                \frac{2^{x-y+1}}{1+2^{z-y}}+\frac{2^{y-z+1}}{1+2^{x-z}}+\frac{2^{z-x+1}}{1+2^{y-x}}\ge\frac{2x}{1+x^2}+\frac{2y}{1+y^2}+\frac{2z}{1+z^2}
            \)
        </p>
        <details>
            <summary>Hint 1</summary>
            <p>Can you isolate the Right-Hand Side from the Left-Hand Side?</p>
        </details>
        <details>
            <summary>Hint 2</summary>
            <p>Can you find a way to apply Nesbitt's inequality on the LHS by performing substitutions?</p>
        </details>
        <details>
            <summary>Hint 3</summary>
            <p>Can you find a way to prove that the RHS is \(\le3\)?</p>
        </details>
        <details>
            <summary>Solution</summary>
            <p>Let's start with the RHS, as it can be written as:</p>
            <p class="mpc">
                \(
                    R=\frac{2x}{1+x^2}+\frac{2y}{1+y^2}+\frac{2z}{1+z^2}=\frac{2}{\frac{1}{x}+x}+\frac{2}{\frac{1}{y}+y}+\frac{2}{\frac{1}{z}+z}
                \)
            </p>
            <p>For each of the terms we know that:</p>
            <p class="mpc">
                \(
                    \begin{cases}
                    \frac{2}{\frac{1}{x}+x} \le \sqrt{\frac{1}{x}*x} = 1\\
                    \frac{2}{\frac{1}{y}+y} \le \sqrt{\frac{1}{y}*y} = 1\\
                    \frac{2}{\frac{1}{z}+z} \le \sqrt{\frac{1}{z}*z} = 1
                    \end{cases}
                \)
            </p>
            <p>This means that \(R \le 3\)</p>
            <p>Now let's rewrite the Left-Hand Side:</p>
            <p class="mpc">
                \(
                    L=\frac{2^{x-y+1}}{1+2^{z-y}}+\frac{2^{y-z+1}}{1+2^{x-z}}+\frac{2^{z-x+1}}{1+2^{y-x}}=2[\frac{2^x}{2^y(1+2^{z-y})}+\frac{2^y}{2^z(1+2^{x-z})}+\frac{2^z}{2^x(1+2^{y-x})}] = \\
                    = 2(\frac{2^x}{2^y+2^z}+\frac{2^x}{2^y+2^z}+\frac{2^z}{2^x+2^y})
                \)
            </p>
            <p>In the last form we can recognize a Nesbitt form, so we say that \(L \ge 3\).</p>
            <p>But if \(L \ge 3 \) and \(3 \ge R \), then \(L \ge R \).</p>
        </details>
        <details>
            <summary>Source</summary>
            <p>This problem is "original" and was created by me in the context of this article.</p>
        </details>
</div>
</p>
---
 
# The Cauchy-Bunyakovsky-Schwartz Inequality

Along with the the AM-GM inequality, the CBS Inequality forms the foundation of inequality problems in intermediate or advanced math contests. In it's simplest algebraic form it looks like this:

<p>
<div class="mp">
<p>For the real numbers \(a_{i=1 \dots n}, b_{i=1 \dots n}\) the inequality states:</p>
<p class="mpc">
    \(
        (\sum_{i=1}^n a_i b_i)^2 \le (\sum_{i=1}^n a_i^2)(\sum_{i=1}^n b_i^2)
    \)
</p>
<p>Equality holds if \(a_i = k*b_i\), \(\forall i\).</p>
</div>
</p>

Alternatively, in expanded form:

<p>
<div class="mp">
\(
    (a_1b_1+a_2b_2+\dots+a_nb_n)^2 \le (a_1^2+a_2^2+\dots+a_n^2)(b_1^2+b_2^2+\dots+b_n^2)
\)
</div>
</p>

You would be surprised in *how many ways* the CBS Inequality can be applied. 

Can you solve the next problems using the CBS Inequality ?

<p>
<div class="mp">
<p>Let \(a,b,c\) real numbers. Show that:</p>
<p class="mpc">\(3(a^2+b^2+c^2)\ge(a+b+c)^2\)</p>
<details>
    <summary>Hint 1</summary>
    <p>Why don't you write \(3=1^2+1^2+1^2\)</p>
</details>
<details>
    <summary>Solution</summary>
    <p>After writing \(3=1^2+1^2+1^2\), the next relationships is true by the CBS Inequality</p>
    <p class="mpc">\((1^2+1^2+1^2)(a^2+b^2+c^2)\ge(a*1+b*1+c*1)^2\)</p>
</details>
</div>
</p>

<p>
<div class="mp">
<p>Let \(x, y, z \in \mathbb{R}\), prove that:</p>
<p class="mpc">\(3x^2+10y^2+15z^2 \ge 2(x+y+z)^2\)</p>
<details>
    <summary>Hint 1</summary>
    <p>Did you know that \(\frac{1}{3}+\frac{1}{10}+\frac{1}{15}=\frac{1}{2}\)?</p>
</details>
<details>
    <summary>Solution</summary>
    <p>Let's use \((\frac{1}{\sqrt{3}}, \frac{1}{\sqrt{10}}, \frac{1}{\sqrt{15}})\) and \((x\sqrt{3}, y\sqrt{10}, z\sqrt{15})\) and apply the CBS Inequality:</p>
    <p class="mpc">\((\underbrace{\frac{1}{3}+\frac{1}{10}+\frac{1}{15}}_{=\frac{1}{2}})(3x^2+10y^2+15z^2) \ge (\frac{x\sqrt{3}}{\sqrt{3}}+\frac{y\sqrt{10}}{\sqrt{10}}+\frac{z\sqrt{10}}{\sqrt{10}})^2 \Leftrightarrow \\
        (3x^2+10y^2+15z^2) \ge 2(x+y+z)^2\)</p>
</details>
</div>
</p>

<p>
<div class="mp">
<p>Let \(n\in\mathbb{N}\), prove that:</p>
<p class="mpc">\(\frac{n^2}{(n+1)^2}\le\sum_{i=1}^n\frac{1}{i^2}*\sum_{i=2}^{n+1}\frac{1}{i^2}\)</p>
</div>
</p>

We've already proven Nesbitt's Inequality using the AM-GM inequality, but can you prove it using the CBS Inequality? In case you need help, please follow the generous hints.

<p>
<div class="mp">
    <p>Let \(a,b,c\) positive real numbers. Prove Nesbitt's Inequality using the CBS Inequality:</p>
    <p class="mpc">
        \(
            \frac{a}{b+c}+\frac{b}{a+c}+\frac{c}{a+b} \ge \frac{3}{2}
        \)
    </p>
    <details>
        <summary>Hint 1</summary>
        <p>Try proving an equivalent inequality:</p>
        <p class="mpc">\(\frac{a}{b+c}+1+\frac{b}{a+c}+1+\frac{c}{a+b}+1\ge\frac{9}{2}\)</p>
    </details>
    <details>
        <summary>Hint 2</summary>
        <p>Use substitution to so that:</p>
        <p class="mpc">
        \(
            \begin{cases}
            x \rightarrow \sqrt{a+b} \\
            y \rightarrow \sqrt{b+c} \\
            z \rightarrow \sqrt{c+a}
            \end{cases}
        \)
        </p>
    </details>
    <details>
        <summary>Solution</summary>
        <p>We can start by adding 3 to both sides of the inequality we want proven:</p>
        <p class="mpc">
            \(
                \frac{a}{b+c}+1+\frac{b}{a+c}+1+\frac{c}{a+b}+1\ge\frac{9}{2}
            \)
        </p>
        <p>The neq (equivalent) inequality becomes:</p>
        <p class="mpc">
            \(
                \frac{a}{b+c}+1+\frac{b}{a+c}+1+\frac{c}{a+b}+1\ge\frac{9}{2} \Leftrightarrow \\
                \frac{a+b+c}{b+c}+\frac{a+b+c}{a+c}+\frac{a+b+c}{c+a}\ge\frac{9}{2} \Leftrightarrow \\
                (a+b+c)(\frac{1}{a+b}+\frac{1}{b+c}+\frac{1}{c+a})\ge\frac{9}{2}
            \)
        </p>
        <p>At this point, let's perform the following substitution:</p>
        <p class="mpc">
        \(
            \begin{cases}
            x \rightarrow \sqrt{a+b} \\
            y \rightarrow \sqrt{b+c} \\
            z \rightarrow \sqrt{c+a}
            \end{cases}
        \)
        </p>
        <p>With this in mind, our new inequality becomes:</p>
        <p class="mpc">
            \(
                (x^2+y^2+z^2)(\frac{1}{x^2}+\frac{1}{y^2}+\frac{1}{z^2}) \ge (1+1+1)^2
            \)
        </p>
        <p>Which is true by the CBS inequality.</p>
    </details>
</div>
</p>

---

# Free resources around the web:

* [Basics Of Olympiad Inequalities, Samin Riasat](https://web.williams.edu/Mathematics/sjmiller/public_html/161/articles/Riasat_BasicsOlympiadInequalities.pdf)
* [Introduction to Olympiad Inequalities, Sanja Simonovikj](https://esp.mit.edu/download/8a5f8efe-59f5-407d-9252-607ace7aa190/M11250_Intro%20to%20ol%20ineq%20hssp.pdf)
* [Titu's Lemma, Pankaj Agarwal](https://aamonline.org.in/ganit-bikash/gb/volume-67/10-titu-s-lemma-Pankaj-Agarwal.pdf)
* [Mathematical Inequalities, Volume 1, Symmetrical Polynomial Inequalities, Vasile Cirtoaje](http://ace.upg-ploiesti.ro/membri/vcirtoaje/math_ineq_1.pdf)
* [Mathematical Inequalities, Volume 2, Symmetric Rational and Nonrational Inequalities, Vasile Cirtoaje](http://ace.upg-ploiesti.ro/membri/vcirtoaje/math_ineq_2.pdf)
* [Mathematical Inequalities, Volume 3, Cyclic and Noncyclic Inequalities, Vasile Cirtoaje](http://ace.upg-ploiesti.ro/membri/vcirtoaje/math_ineq_3.pdf)
* [Mathematical Inequalities, Volume 4, Extensions and Refinements of Jensen's Inequality, Vasile Cirtoaje](http://ace.upg-ploiesti.ro/membri/vcirtoaje/math_ineq_4.pdf)
* [Mathematical Inequalities, Volume 5, Other Recent Methods For Creating and Solving Inequalities, Vasile Cirtoaje](http://ace.upg-ploiesti.ro/membri/vcirtoaje/math_ineq_5.pdf)