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

Approaching an "inequality" problem requires more than just sheer "mathematical force" (although using techniques from Real Analysis can help); you need to take a step back and come up with clever manipulations, substitutions, and (sometimes) novel ideas. In essence, inequality problems blend "beauty" with "intellectual challenge", and they are embodying so well the spirit of "competitive mathematics". 

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

An *inequation* is all about finding solutions, while inequalities focus on the actual relationship between numbers, a statement of truth that applies for all numbers in a given domain. 

The following are inequalities:
<p>
<div class="mp">
Let \(a, b\) real numbers. Prove that:
<p class="mpc">\(|a+b|\le|a|+|b|\)</p>
<details>
    <summary>Solution</summary>
    <p>We have to consider 4 cases:</p>
    <p class="mpc">
        <ul>
            <li>\(a\ge0, b\ge0 \Rightarrow |a+b|=a+b=|a|+|b|\)</li>
            <li>\(a\le0, b\le0 \Rightarrow |a+b|=-(a+b)=-a+(-b)=|a|+|b|\)</li>
        </ul>
    </p>
    <p>The last two cases are when \(a\) and \(b\) have different signs (and the proof is identical).</p>
    <p>So, let's suppose \(a \ge 0, b \le 0\). We must prove that: \( |a+b| \lt a-b \).</p>
    <p>If:</p>
    <p>
        <ul>
            <li>\(a+b \ge 0 \Rightarrow a+b \le a-b\), which is true because \(b \lt 0\)</li>
            <li>\(a+b \le 0 \Rightarrow -a-b \le a-b\), which is true because \(a \ge 0 \Rightarrow -a \le 0\)</li>
        </ul>
    </p>
    <p>The equality holds when \(a\) and \(b\) have the same signs.</p>
</details>
</div>
</p>

<p>
<div class="mp">
Let \(x\in\mathbb{R}\). Prove that:
<p class="mpc">\(x^2+x+1\gt0\)</p>
<details>
    <summary>Hint 1</summary>
    <p>\(a^2\ge0, \forall a\in\mathbb{R}\)</p>
</details>
<details>
    <summary>Hint 2</summary>
    <p>Multiply each side by 2 or try to complete a square.</p>
</details>
<details>
    <summary>Solution 1</summary>
    <p>We multiply each side by 2:</p>
    <p class="mpc">
    \(
        x^2+x^2+2x+1+1>0 \Leftrightarrow x^2+1+(x+1)^2 > 0
    \)
    </p>
    <p>This is true: \(x^2+1\gt0\) and \((x+1)^2\ge0\).</p>
</details>
<details>
    <summary>Solution 2</summary>
    <p>We can write: \(x^2+x+1=x^2+2*x*\frac{1}{2}+(\frac{1}{2})^2+[1-(\frac{1}{2})^2]=(x+\frac{1}{2})^2+\frac{3}{4}\)</p>
    <p>We know for certain that \((x+\frac{1}{2})^2+\frac{3}{4}>0\).</p>
</details>
</div>
</p>

<p>
    <div class="mp">
        <p>Let \(a,b\) real numbers, \(a+b \ge 0\), prove:</p>
        <p class="mpc">
            \(
                \frac{a}{b^2}+\frac{b}{a^2} \ge \frac{1}{a}+\frac{1}{b}
            \)
        </p>
        <details>
            <summary>Hint 1</summary>
            <p>\(\frac{1}{a}=\frac{a}{a^2}\)</p>
        </details>
        <details>
            <summary>Solution</summary>
            <p>We can rewrite our inequality in the following manner:</p>
            <p class="mpc">
                \(
                    \frac{a}{b^2}-\frac{b}{b^2}+\frac{b}{a^2}-\frac{a}{a^2} \ge 0 \Leftrightarrow \\
                    \frac{a-b}{b^2}-\frac{a-b}{a^2} \ge 0 \Leftrightarrow \\
                    (a-b)[\frac{a^2-b^2}] \ge 0 \Leftrightarrow \\
                    \frac{(a-b)^2*(a+b)}{(ab)^2} \ge 0 
                \)
            </p>
            <p>We know that \((a-b)^2 \ge 0\), \((ab)^2 \ge 0\) and \(a+b \ge 0\), thus we've proven the inequality.</p>
        </details>
    </div>
</p>

Remember the following two inequalities, as they will be useful when solving more complex ones:

<p>
<div class="mp">
Let \(x,y,z \in \mathbb{R}\). Prove that:
<p class="mpc">
\(x^2+y^2+z^2 \ge xy + yz + zx \)
<details> 
    <summary>Hint 1</summary>
    <p>Multiply each side by 2</p>
</details>
<details> 
    <summary>Solution</summary>
    <p>After multiplying each side by two and moving the terms from the RHS to the LHS:</p>
    <p class="mpc">\((x-y)^2+(y-z)^2+(z-x)^2 \ge 0\)</p>
    <p>Equality holds when \(x=y=z\).</p>
</details>
</p>
</div>
</p>

<p>
<div class="mp">
    <p>Let \(a, b\) be positive real numbers. Prove that:</p>
    <p class="mpc">
        \(
            a^3+b^3 \ge ab(a+b)
        \)
    </p>
    <details>
        <summary>Solution</summary>
        <p class="mpc">
            \(
                a^3+b^3-a^2b-ab^2 \ge 0 \Leftrightarrow \\
                a^2(a-b)+b^2(b-a) \ge 0 \Leftrightarrow \\
                (a-b)(a^2-b^2) \ge 0 \Leftrightarrow
                (a-b)(a-b)(a+b) \ge 0 \Leftrightarrow
                (a-b)^2(a+b) \ge 0
            \)
        </p>
    </details>
</div>
</p>

Do you know how to factor your [symmetric polynomials](https://en.wikipedia.org/wiki/Symmetric_polynomial) ?

<p>
<div class="mp">
For \((x,y)\neq(0,0)\), prove:
<p class="mpc">
\(x^4+x^3y+x^2y^2+xy^3+y^4\gt0\)
</p>
<details>
    <summary>Hint 1</summary>
    <p>Did you know about the following formula/identity: \( x^n-y^n=(x-y)(x^{n-1}+x^{n-2}y+\dots+xy^{n-2}+y^{n-1}) \)?</p>
</details>
<details>
    <summary>Solution 1 - Longer proof</summary>
    <p>Using the known identity \(x^n-y^n=(x-y)(x^{n-1}+x^{n-2}y+\dots+xy^{n-2}+y^{n-1}) \) and assuming \(x\neq y\), we can write:</p>
    <p class="mpc">
        \(
            x^4+x^3y+x^2y^2+xy^3+y^4 = \frac{x^5-y^5}{x-y}
        \)
    </p>
    <p>Because \(5\) is an odd number, both \(x^5-y^5\) and \(x-y\) will always have the same sign. This means that our left hand side is always > 0.</p>
    <p>If \(x=y\), then our expression becomes:</p>
    <p class="mpc">\(x^4+x^3y+x^2y^2+xy^3+y^4=4x^4\)</p>
    <p>Because \(4\) is even, we know that \(x^4>0 \Leftrightarrow 4x^2 > 0\) (as long as \(x\neq0\), which happens anyways as \((x,y)\neq(0,0)\))</p>
</details>
<details>
    <summary>Solution 2  - Shorter proof</summary>
    <p>The polynomial can be factored in the following manner:</p>
    <p class="mpc">
        \(
            x^4+x^3y+x^2y^2+xy^3+y^4 = \underbrace{(x+y)^2}_{\gt 0}\underbrace{(x^2+xy+y^2)}_{\gt 0} \gt 0
        \)
    </p>
</details>
</div>
</p>

The following two problems have similar solutions. The idea is *to catch* each term between two fixed numbers:

<p>
<div class="mp">
Let \(n \in \mathbb{N}\). Prove that:
<p class="mpc">\(\frac{1}{2}\lt\frac{1}{n+1}+\frac{1}{n+2}+\dots+\frac{1}{2n}\lt\frac{3}{4}\)</p>
<details> 
    <summary>Hint 1</summary>
    <p>\(\frac{1}{n+j}\gt\frac{1}{2n}, \forall j \lt n\)</p>
</details>
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

<p>
    <div class="mp">
        <p>Let \(n\in\mathbb{N}^{*}\setminus\{1\}\). Prove that:</p>
        <p class="mpc">
            \(
                \frac{1}{2} \lt \frac{1}{n^2+1} + \frac{2}{n^2+2} + \frac{3}{n^2+3} + \dots + \frac{n}{n^2+n} \lt \frac{1}{2} + \frac{1}{2n}
            \)
        </p>
    <details>
        <summary>Hint 1</summary>
        <p>We observe: \(\frac{1}{n^2+1} \lt \frac{1}{n^2}\). What can we say about \(\frac{2}{n^2+2}\)?</p>
    </details>
    <details>
        <summary>Hint 2</summary>
        <p>We observe: \(\frac{1}{n^2+1} \gt \frac{1}{n^2+n}\). What can we say about \(\frac{2}{n^2+2}\)?</p>
    </details>
    <details>
        <summary>Solution</summary>
        <p>On one hand:</p>
        <p class="mpc">
            \(
                \frac{1}{n^2+1} + \frac{2}{n^2+2} + \frac{3}{n^2+3} + \dots + \frac{n}{n^2+n} \lt \frac{1}{n^2}+\dots+\frac{n}{n^2} \Leftrightarrow \\
                \frac{1}{n^2+1} + \frac{2}{n^2+2} + \frac{3}{n^2+3} + \dots + \frac{n}{n^2+n} \lt \frac{1}{n^2}(1+2+\dots+n) = \frac{1}{2}+\frac{1}{2n}
            \)
        </p>
        <p>On the other hand:</p>
        <p class="mpc">
            \(
                \frac{1}{n^2+1} + \frac{2}{n^2+2} + \frac{3}{n^2+3} + \dots + \frac{n}{n^2+n} \gt \frac{1}{n^2+n} + \frac{2}{n^2+n} + \dots + \frac{n}{n^2+n} \Leftrightarrow \\
                \frac{1}{n^2+1} + \frac{2}{n^2+2} + \frac{3}{n^2+3} + \dots + \frac{n}{n^2+n} \gt \frac{1}{n^2+n}(1+2+\dots+n) = \frac{1}{2}
            \)
        </p>
    </details>
    <details>
        <summary>Source</summary>
        <p>RMO-2002, India</p>
    </details>
    </div>
</p>

The next one is the first non-trivial exercise of this article, try to solve it using the generous hints before looking at the actual solution:

<p>
<div class="mp">
    Let \(a,b,c\) positive real numbers such that \(a+b+c\le4\) and \(ab+bc+ca\ge4\). Prove that, at any time, at least two of the following inequalities are true:
<p class="mpc">
    \(
        \begin{cases}
            |a-b| \le 2\\
            |b-c| \le 2\\
            |c-a| \le 2
        \end{cases}
    \)
</p>
<details>
    <summary>Hint 1</summary>
    <p>Why don't you expand \((a+b+c)^2\)</p>
</details>
<details>
    <summary>Hint 2</summary>
    <p>Starting with \( (a+b+c)^2 \le 16 \), can you come-up with the alternate form: \( (a-b)^2 + (b-c)^2 + (c-a)^2 \le 8 \)</p>
</details>
<details>
    <summary>Solution</summary>
    <p>If \(a+b+c\le4\) then \((a+b+c)^2 \le 16\).</p>
    <p>Expanding \((a+b+c)^2\) leads to:</p>
    <p class="mpc">
        \(
            (a+b+c)^2 \le 16 \Leftrightarrow \\
            a^2+b^2+c^2 + 2(ab+bc+ca) \le 16 \Leftrightarrow \\
            a^2+b^2+c^2 \le 8  \Leftrightarrow \\
            a^2+b^2+c^2 - ab - bc - ca \le 4 \Leftrightarrow \\
            a^2 - 2ab + b^2 + b^2 - 2bc + c^2 + c^2 - 2ca + a^2 \le 8 \Leftrightarrow \\
            (a-b)^2 + (b-c)^2 + (c-a)^2 \le 8
        \)
    </p>
    <p>So let's suppose that \(|a-b| \le 2\) and \(|b-c| \le 2\) are false. This means that \(|a-b| \gt 2\) and \(|b-c| \gt 2\), this would lead to a contradiction.</p>
</details>
<details>
    <summary>Source</summary>
    <p>This problem was sourced and adapted from the book: T. Andreescu, Z. Feng - 101 Problems in Algebra. (Korean Mathematics Competition, 2001)</p>
</details>
</div>
</p>

---

# Weak Inequalities

Weak Inequalities are inequalities that include the possibility of equality. They are denoted by the symbols $$\ge$$ or $$\le$$. These contrast with *strict inequalities*, which use $$\gt$$ and $$\lt$$ and do not allow equality.

Weak inequalities are considered more important than inequalities that are strict, because they have a broader applicability, and in a way, they are *more fundamental*. For example if $$ax+b\ge0$$, then $$ax+b\gt0$$ still holds, but not vice-versa. 

The *renaissance* way to understand what a weak inequality is, is to imagine the finger of god, touching Adam's hand. In this regard, the following painting is a strict inequality, because this never happens, at least not in [olam ha-ze](https://www.britannica.com/topic/olam-ha-ze).

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
    <li>\(\hspace{1cm}  x^3-y^3=(x-y)(x^2+xy+y^2) \)</li>
    <li>\(\hspace{1cm}  x^n-y^n=(x-y)(x^{n-1}+x^{n-2}y+\dots+xy^{n-1}+y^n) \)</li>
    <li>\(\hspace{1cm} 2(xy+yz+zx)=(x+y+z)^2-(x^2+y^2+z^2) \)</li>
    <li>\(\hspace{1cm} 3(x+y)(y+z)(z+x)=(x+y+z)^3-(x^3+y^3+z^3) \)</li>
    <li>\(\hspace{1cm} (x+y)(y+z)(z+x)=(x+y+z)(xy+yz+zx)-xyz \)</li>
    <li>\(\hspace{1cm} x^3+y^3+z^3-3xyz=(x+y+z)(x^2+y^2+z^2-xy-yz-zx) \)</li>
    <li>\(\hspace{1cm} (\sqrt{\frac{a}{b}}+\sqrt{\frac{b}{a}})^2 = (a+b)(\frac{1}{a}+\frac{1}{b})\)</li>
    <li>\(\hspace{1cm} \frac{x}{(x-y)(x-z)}+\frac{y}{(y-x)(y-z)}+\frac{z}{(z-x)(z-y)}=0 \)</li>
    <li>\(\hspace{1cm} \frac{x^2}{(x-y)(x-z)}+\frac{y^2}{(y-x)(y-z)}+\frac{z^2}{(z-x)(z-y)}=1 \)</li>
    <li>\(\hspace{1cm} \frac{x^3}{(x-y)(x-z)}+\frac{y^3}{(y-x)(y-z)}+\frac{z^3}{(z-x)(z-y)}=x+y+z \)</li>
</ol>
</div>
</p>

Should you memorize all of these identities? It depends. If you are actively participating in contests, I believe it's worthwhile to memorize them. Otherwise, it’s enough to be aware of their existence. When you encounter similar structures, check if these identities can assist you. In a contest, you can introduce them as lemmas, and for clarity, it’s advisable to provide quick proofs. Fortunately, the proofs are usually straightforward and involve simple algebraic manipulations.

For example, take a look at the following problems:

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

<p>
<div class="mp">
Find all pairs of \((x,y)\) natural numbers such that \(x^3+y^3=(x+y)^2\) and \(|x| \neq |y| \neq 0\).
<details>
    <summary>Hint 1</summary>
    <p>Find a suitable identity to use.</p>
</details>
<details>
    <summary>Hint 2</summary>
    <p>\(x^3+y^3=(x+y)(x^2-xy+y^2)\)</p>
</details>
<details>
    <summary>Solution</summary>
    <p>Using the known identity \(x^3+y^3=(x+y)(x^2-xy+y^2)\), our relationship becomes: \(x+y=x^2-xy+y^2\). (Note: \(x+y\neq0\) so it's fine to simplify with \(x+y\)).</p>
    <p>We will now create a quadratic equation in \(x\):</p>
    <p class="mpc">
        \(
            x^2-(y+1)x+(y^2-y)=0
        \)
    </p>
    <p>We compute the determinant under the condition \(\Delta\gt0\):</p>
    <p class="mpc">
        \(
            \Delta = -3y^2+6y+1 \gt 0
        \)
    </p>
    <p>This leads to:</p>
    <p class="mpc">
        \(
            \frac{3-2\sqrt{3}}{3} \le y \le \frac{3+2\sqrt{3}}{3}
        \)
    </p>
    <p>The possible values are then: \((1,0), (0,1), (1,2), (2,1)\) and \((2,2)\).</p>
</details>
<details>
    <summary>Source</summary>
    <p>This problem was sourced and adapted from the book: T. Andreescu, Z. Feng - 101 Problems in Algebra</p>
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
<p>Let \(x \in \mathbb{R}_{+}\). Prove that \(x+\frac{1}{x} \ge 2\).</p>
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
<p>Let \(x_1,x_2,\dots,x_n \in \mathbb{R}_{+}\). Prove that:</p>
<p class="mpc">\(S=\frac{x_1}{x_2}+\frac{x_2}{x_3}+\dots+\frac{x_{n-1}}{x_n}+\frac{x_n}{x_1} \ge n \)</p>
<details>
    <summary>Hint 1</summary>
    <p>What happens if you multiply each term from the sum ?</p>
</details>
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

Do you know your *Partial fraction decomposition* ?

<p>
<div class="mp">
Prove that \(\frac{1}{1*3}+\frac{1}{3*5}+\dots+\frac{1}{(n-2)n}\gt\frac{1}{\sqrt{n}}-\frac{1}{n}\), \(\forall n \in [5,\infty) \cap \mathbb{N}\).
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
        \frac{1}{1*3}+\frac{1}{3*5}+\dots+\frac{1}{(n-2)n} \gt \frac{1}{\sqrt{n}}-\frac{1}{n} \Leftrightarrow \\
        \frac{1}{2}[\frac{3-1}{1*3}+\frac{5-3}{3*5}+\dots+\frac{n-(n-2)}{(n-2)n}] \gt \frac{1}{\sqrt{n}}-\frac{1}{n} \Leftrightarrow \\
        \frac{1}{2}(1-\frac{1}{3}+\frac{1}{3}-\frac{1}{5}+\frac{1}{5}-\dots-\frac{1}{n}) \gt \frac{1}{\sqrt{n}}-\frac{1}{n} \Leftrightarrow \\
        \frac{1}{2}-\frac{1}{2n}+\frac{1}{n} \gt \frac{1}{\sqrt{n}} \Leftrightarrow \\
        \frac{1}{2}+\frac{1}{2n} \gt \frac{1}{\sqrt{n}} \Leftrightarrow \\
        \frac{1+\frac{1}{n}}{2} \gt \sqrt{1*\frac{1}{n}}
    \)
    </p>
    <p>The last relationship is true because of AM-GM. Equality holds when \(n=1\), but that is not an acceptable value for \(n\).</p>
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
        <p>The last relationship is true (AM-GM), and equality holds whenever \(x=y\).</p>
    </details>
    <details>
        <summary>Source</summary>
        <p>The Romanian Math Olympiad</p>
    </details>
    </div>
</p>

Now, just for fun, let's try some problems that (only!) looks more difficult. The main idea is to help yourself with the additional condition and try to use it when you are proving the main inequality.

<p>
    <div class="mp">
        <p>Let \(a,b,c\) positive real numbers, and \(abc=1\), prove that:</p>
        <p class="mpc">
            \(
                \frac{c+ab+1}{1+a+a^2}+\frac{a+bc+1}{1+b+b^2}+\frac{b+ca+1}{1+c+c^2} \ge 3
            \)
        </p>
        <details>
            <summary>Hint 1</summary>
            <p>Because \(abc=1\), then we can write: \( \frac{c+ab+1}{1+a+a^2}=\frac{abc^2+ab+abc}{1+a+a^2} \)</p>
        </details>
        <details>
            <summary>Solution</summary>
            <p>We make use of the fact \(abc=1\) in the following manner:</p>
            <p class="mpc">
                \(
                    \frac{c+ab+1}{1+a+a^2}+\frac{a+bc+1}{1+b+b^2}+\frac{b+ca+1}{1+c+c^2} = \frac{abc^2+ab+abc}{1+a+a^2}+\frac{a^2bc+bc+abc}{1+b+b^2}+\frac{ab^2c+ca+abc}{1+c+c^2} = \\
                    = ab(\frac{1+c+c^2}{1+a+a^2})+bc(\frac{1+a+a^2}{1+b+b^2})+ca(\frac{1+b+b^2}{1+c+c^2}) \ge 3\sqrt{a^2b^2c^2} = 3
                \)
            </p>
        </details>
    </div>
</p>

---

# Grouping terms

Solving harder inequalities problems involve more than the simple use of the general formula. A common technique is to group the terms in our advantage, apply the AM-GM (or any other known inequality) for each "group", and then combine the resulting inequalities into a bigger one.

After solving a few exercises this technique will come naturally, but at first it might look unintuitive.

Can you solve the next problems without using any hints ?

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
</div>
</p>

<p>
    <div class="mp">
        <p>Let \(x,y,z\) positive real numbers, and \((1+x)(1+y)(1+z)=8\), prove that \(xyz \le 1\).</p>
        <details>
            <summary>Solution</summary>
            <p>We apply the AM-GM inequality for each term of the product from the LHS.</p>
            <p class="mpc">\(8\ge8\sqrt{xyz}\Rightarrow 1 \ge xyz\)</p>
        </details>
    </div>
</p>

<p>
<div class="mp">
If \(x_i \in \mathbb{R}_{+}\),\(n\) is an even natural number, and \(\prod_{i=1}^nx_i=1\), prove that:
<p class="mpc">
\((x_1^2+x_2^2)(x_3^2+x_4^2)\dots(x_{n-1}^2+x_{n}^2)\ge 2^{\frac{n}{2}}\)
</p>
<details>
    <summary>Hint 1</summary>
    <p>The terms are already grouped for us.</p>
</details>
<details>
    <summary>Solution</summary>
    <p>We apply the AM-GM inequality for each parentheses:</p>
    <p class="mpc">
        \(
            \begin{cases}
                x_1^2+x^2 \ge 2x_1x_2 \\
                x_3^2+x^4 \ge 2x_3x_4 \\
                \dots
                x_{n-1}^2+x^{n} \ge 2x_{n-1}x_n
            \end{cases}
        \)
    </p>
    <p>In total there are \(\frac{n}{2}\) groups. We multiply all of them:</p>
    <p class="mpc">
        \(
            (x_1^2+x_2^2)\dots(x_{n-1}^2+x_{n}^2)\ge(\underbrace{2*\dots*2}_{\frac{n}{2}})\sqrt{\prod_{i=1}^n x_i} \Leftrightarrow \\
            (x_1^2+x_2^2)\dots(x_{n-1}^2+x_{n}^2)\ge 2^{\frac{n}{2}}
        \)
    </p>
    <p>Equality holds when \(x_1=x_2=\dots=x_n=1\).</p>
</details>
</div>
</p>

Remember, the key for solving the next problem is to use the additional condition in your advantage (the terms might be already "grouped" for you):

<p>
    <div class="mp">
        <p>Let \(a,b,c\) positive real numbers, and \(a+b+c=1\), prove that:</p>
        <p class="mpc">
            \(
                (\frac{1}{a}-1)(\frac{1}{b}-1)(\frac{1}{c}-1) \ge 8
            \)
        </p>
        <details>
            <summary>Hint 1</summary>
            <p>Because \(a+b+c=1\) we can write \( \frac{1}{a}-1=\frac{b+c}{a} \). The same goes for the rest of terms.</p>
        </details>
        <details>
            <summary>Solution</summary>
            <p>Our inequality can be written as:</p>
            <p class="mpc">
                \(
                    (\frac{1}{a}-1)(\frac{1}{b}-1)(\frac{1}{c}-1) = \frac{b+c}{a} * \frac{a+c}{b} * \frac{a+b}{c} \ge \Leftrightarrow \\
                    \ge \frac{2\sqrt{bc}}{a} * \frac{2\sqrt{ac}}{b} * \frac{2\sqrt{ab}}{c} = 8
                \)
            </p>
        </details>
    </div>
</p>

<p>
    <div class="mp">
        <p>If \(a,b,c \gt 0\) and \(a^3+b^3+c^3\) prove:</p>
        <p class="mpc">
            \(
                \frac{a(1-a)}{(1+b)(1+c)} + \frac{b(1-b)}{(1+a)(1+c)} + \frac{c(1-c)}{(1+a)(1+b)} \le 0
            \)
        </p>
        <details>
            <summary>Hint 1</summary>
            <p>Can you bring the fraction to a common denominator?</p>
        </details>
        <details>
            <summary>Solution</summary>
            <p>After the fraction to a common denominator:</p>
            <p class="mpc">
                \(
                    \frac{(a+b+c)-(a^3+b^3+c^3)}{(1+a)(1+b)(1+c)} \le 0 
                \)
            </p>
            <p>The equivalent inequality we will need to prove is:</p>
            <p class="mpc">
                \(
                    a^3+b^3+c^3 \ge a + b + c
                \)
            </p>
            <p>Using AM-GM:</p>
            <p class="mpc">
                \(
                    \begin{cases}
                        a^3 + 1 + 1 \ge 3a \\
                        b^3 + 1 + 1 \ge 3b \\
                        c^3 + 1 + 1 \ge 3c
                    \end{cases}
                \)
            </p>
            <p>Summing everything:</p>
            <p class="mpc">
            \(
                (a^3+b^3+c^3)+6 \ge 3(a+b+c) \Leftrightarrow \\
                3 + 6 \ge 3 (a+b+c) \Leftrightarrow \\
                3 \ge a+b+c \Leftrightarrow \\
                a^3+b^3+c^3 \ge a+b+c
            \)
            </p>
        </details>
        <details>
            <summary>Source</summary>
            <p>Gheorghe Craciun - Facebook group "Comunitatea Profesorilor De Matematica"</p>
        </details>
    </div>
</p>

We've already solved the next inequality with a different technique, but can you use "grouping" and the AM-GM inequality to prove it again:

<p>
    <div class="mp">
        <p>Let \(x,y,z\) positive real numbers. Prove that:</p>
        <p class="mpc">
            \(
                x^2+y^2+z^2 \ge xy + yz + zx
            \)
        </p>
        <details>
            <summary>Hint 1</summary>
            <p>Multiply each sides by \(2\), but this time group terms and apply the AM-GM inequality for each group.</p>
        </details>
        <details>
            <summary>Solution</summary>
            <p>After we multiply each sides by \(2\), the equivalent inequality is:</p>
            <p class="mpc">
                \(
                    \underbrace{(x^2+y^2)}_{\ge 2xy}+\underbrace{(y^2+z^2)}_{\ge 2yz}+\underbrace{(z^2+x^2)}_{\ge 2zx} \ge 2(xy + yz + zx) Leftrightarrow \\
                \)
            </p>
            <p>Equality holds for \(x=y=z\).</p>
        </details>
    </div>
</p>

<p>
    <div class="mp">
        <p>Let \(x,y,z\) positive real numbers. Prove that</p>
        <p class="mpc">\(x^2+y^2+z^2 \ge x\sqrt{yz}+y\sqrt{zx}+z\sqrt{xy}\)</p>
        <details>
            <summary>Hint 1</summary>
            <p>We've already proven that: \(x^2+y^2+z^2\ge xy+yz+zx\)</p>
        </details>
        <details>
            <summary>Hint 2</summary>
            <p>\(xy+yz \ge 2y\sqrt{xz}\)</p>
        </details>
        <details>
            <summary>Solution</summary>
            <p>We've proven that: \(x^2+y^2+z^2 \ge xy + yz + zx\)</p>
            <p>So let's try proving: \(xy + yz + zx \ge x\sqrt{yz}+y\sqrt{zx}+z\sqrt{xy} \)</p>
            <p>For this we can apply the AM-GM inequality in the following manner:</p>
            <p class="mpc">
            \(
                \begin{cases}
                    xy+yz \ge 2y\sqrt{xz} \\
                    yz+zx \ge 2z\sqrt{xy} \\
                    zx+xy \ge 2x\sqrt{zy}
                \end{cases}
            \)
            </p>
            <p>Summing-up all three inequalities leads to:</p>
            <p class="mpc">
                \(
                    2(xy+yz+zx) \ge 2(x\sqrt{yz}+y\sqrt{zx}+z\sqrt{xy})
                \)
            </p>
            <p>After simplification this is exactly what we had to prove.</p>
            <p>Equality holds for \(x=y=z=1\).</p>
        </details>
    </div>
</p>

<p>
<div class="mp">
    Let \(a,b,c \in \mathbb{R}_{+}\), prove:
    <p class="mpc">
        \(
            a^3+b^3+c^3 \ge \frac{3}{2}(ab+bc+cd-1)
        \)
    </p>
    <details>
        <summary>Hint 1</summary>
        <p>Apply the AM-GM inequality to the following groups \(\{a^3, b^3, \text{?}\}\), \(\{?, b^3, c^3\}\) and \(\{a^3, ?, c^3\}\)</p>
    </details>
    <details>
        <summary>Solution</summary>
        <p>We apply the AM-GM inequality in the following manner:</p>
        <p class="mpc">
            \(
            \begin{cases}
                a^3+b^3+1 \ge 3\sqrt[3]{a^3b^3} = 3ab \\
                b^3+c^3+1 \ge 3\sqrt[3]{b^3c^3} = 3bc \\
                c^3+a^3+1 \ge 3\sqrt[3]{c^3a^3} = 3ca
            \end{cases}
            \)
        </p>
        <p>Summing-up the three relationships:</p>
        <p class="mpc">
            \(
                2(a^3+b^3+c^3) + 6 \ge 3(ab+bc+ca) \Leftrightarrow \\
                a^3+b^3+c^3 \ge \frac{3}{2}(ab+bc+ca-1)
            \)
        </p>
        <p>Equality holds if \(a=b=c=1\)</p>
    </details>
    <details>
        <summary>Source</summary>
        <p>Concursul Gazeta Matematica, 9th grade, 12th edition, Romania</p>
    </details>
</div>
</p>

<p>
    <div class="mp">
        <p>Let \(a,b,c \in \mathbb{R}_+\), prove:</p>
        <p class="mpc">
            \(
                a^3+b^3+c^3 \ge \frac{1}{3} (a+b+c)(ab+bc+ca)
            \)
        </p>
        <details>
            <summary>Hint 1</summary>
            <p>Remember a previous inequality we've already proven: \(a^3+b^3 \ge ab(a+b)\)</p>
        </details>
        <details>
            <summary>Hint 2</summary>
            <p>We know that \(a^3+b^3+c^3\ge 3abc\)</p>
        </details>
        <details>
            <summary>Solution</summary>
            <p>We start with the following inequalities:</p>
            <p class="mpc">
                \(
                    \begin{cases}
                        a^3 + b^3 \ge ab(a+b) \\
                        b^3 + c^3 \ge bc(b+c) \\
                        c^3 + a^3 \ge ca(c+a) \\
                        a^3+b^3+c^3 \ge 3abc
                    \end{cases}
                \)
            </p>
            <p>Summing the 4 inequalities:</p>
            <p class="mpc">
                \(
                    3(a^3+b^3+c^3) \ge ab(a+b) + abc  + bc(b+c) + abc + ca(c+a) + abc \\
                    a^3+b^3+c^3 \ge \frac{1}{3}(a+b+c)(ab+bc+ca)
                \)
            </p>
            <p>Equality holds for \(a=b=c=1\)</p>
        </details>
    </div>
</p>

The next problem can be easily solved using an inequality we'll discuss shortly. However, let's first try solving it with AM-GM, using a strategy similar to the one we applied above:

<p>
<div class="mp">
    <p>Let \(x,y,z \in (0, \infty)\). Prove:</p>
    <p class="mpc">
    \(
        \frac{x^3}{y}+\frac{y^3}{z}+\frac{z^3}{x} \ge x^2 + y^2 + z^2
    \)
    </p>
<details>
    <summary>Hint 1</summary>
    <p>Can we use the fact that: \(\frac{a}{b}+\frac{b}{a} \ge 2 \)</p>
</details>
<details>
    <summary>Solution</summary>
    <p>We start by writing:</p>
    <p class="mpc">
        \(
            \begin{cases}
                \frac{x^3}{y}+xy \ge2 x^2 \\
                \frac{y^3}{z}+yz \ge y^2 \\
                \frac{z^3}{x}+zx \ge z^2
            \end{cases}
        \)
    </p>
    <p>Summing everything up:</p>
    <p class="mpc">
        \(
            \frac{x^3}{y}+\frac{y^3}{z}+\frac{z^3}{x} + (xy+yz+zx) \ge 2(x^2+y^2+z^2) \Leftrightarrow \\
            \frac{x^3}{y}+\frac{y^3}{z}+\frac{z^3}{x} \ge (x^2+y^2+z^2)+\underbrace{[(x^2+y^2+z^2) - (xy+yz+zx)]}_{\ge 0} \Leftrightarrow \\ 
            \frac{x^3}{y}+\frac{y^3}{z}+\frac{z^3}{x} \ge (x^2+y^2+z^2).
        \)
    </p>
    <p>Equality holds if \(x=y=z\)</p>
</details>
<details>
    <summary>Source</summary>
    <p>Concursul Gazeta Matematica si Viitori Olimpici, 9th grade, Edition X, Romania</p>
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

<p>
<div class="mp">
Let \(n\in\mathbb{N}^{*}\) and \(x_1,\dots,x_n \in (0, \infty)\), satisfying \(S_1=\sum_{i=1}^n x_i = 9\) and \(S_2=\sum_{i=1}^n\frac{1}{x_i}=1\). Find \(x_1,\dots,x_n\).
<details>
    <summary>Hint 1</summary>
    <p>Can you use the previous problem?</p>
</details>
<details>
    <summary>Solution</summary>
    <p>We apply the AM-GM inequality to \(S_1\) and \(S_2\) and multiply the two relationships:</p>
    <p class="mpc">
        \(
            (x_1+\dots+x_n)*(\frac{1}{x_1}+\dots+\frac{1}{x_n}) \ge n\sqrt[n]{x_1*\dots*x_n}*n\sqrt[n]{\frac{1}{x_1}*\dots*\frac{1}{x_n}} \\ \Rightarrow
            9 \ge n^2 \Rightarrow n\in\{1,2,3\}
        \)
    </p>
    <p>\(n=1\) would be impossible as there is no \(x_1\) such that \(x_1=9\) and \(\frac{1}{x_1}=1\).</p>
    <p>For \(n=2\) we will need to solve the following system of equations:</p>
    <p class="mpc">
    \(
        \begin{cases}
            x_1+x_2=9 \\
            \frac{1}{x_1}+\frac{1}{x_2}=1
        \end{cases}
    \)
    </p>
    <p>After solving the system we will obtain: \((x_1, x_2)\in\{(\frac{9+3\sqrt{5}}{2}, \frac{9-\sqrt{3}}{5}),(\frac{9-3\sqrt{5}}{2}, \frac{9+\sqrt{3}}{5})\}\).</p>
    <p>For \(n=3\) the inequality becomes an equality and \(x_1=x_2=x_3=3\).</p>
</details>
<details>
    <summary>Source</summary>
    <p>Concursul Gazeta Matematica, 6th Edition, 9th grade, Romania</p>
</details>
</div>
</p>


The next problems are not exactly about *grouping terms* but rather about finding "structures" where you can apply the AM-GM inequality in order to get closer to the result.

<p>
<div class="mp">
    Let \(a,b,c,d \in \mathbb{R}_{+}\) with \(a+b+c+d=k\), prove that:
    <p class="mpc">
    \(
        \frac{ab}{c+d+1}+\frac{bc}{a+d+1}+\frac{cd}{a+b+1}+\frac{da}{b+c+1} \lt k^2
    \)
    </p>
    <details>
        <summary>Hint 1</summary>
        <p>\( ab \le (\frac{a+b}{2})^2 \)</p>
    </details>
    <details>
        <summary>Hint 2</summary>
        <p>\( \frac{ab}{c+d+1} \le (\frac{a+b}{2})^2 * \frac{1}{c+d+1}\)</p>
    </details>
    <details>
        <summary>Hint 3</summary>
        <p>In what way you can use the fact this is a strict inequality?</p>
    </details>
    <details>
        <summary>Solution</summary>
        <p>For each of terms we apply the following:</p>
        <p class="mpc">
            \(
                \frac{ab}{c+d+1} \le \frac{(a+b)^2}{4*(c+d+1)} \lt \frac{(a+b+c+d)^2}{4(c+d+1)} \lt \frac{k^2}{4(c+d+1)} \lt \frac{k^2}{4}
            \)
        </p>
        <p>After summing everything up, the (strict) inequality is proven.</p>
    </details>
</div>
</p>

<p>
<div class="mp">
Let \(x,y,z\) be positive real numbers, prove that:
<p class="mpc">
    \(
        \frac{x}{x+\sqrt{(x+y)(x+z)}}+\frac{y}{y+\sqrt{(y+z)(y+x)}}+\frac{z}{z+\sqrt{(z+x)(z+y)}} \le 1
    \)
</p>
<details>
    <summary>Hint 1</summary>
    <p>Can you prove \(\sqrt{(x+y)(x+z)}\ge\sqrt{xy}+\sqrt{xz}\)</p>
</details>
<details>
    <summary>Solution</summary>
    <p>We start by proving the following relationship \(\sqrt{(x+y)(x+z)}\ge\sqrt{xy}+\sqrt{xz}\) by squaring each side and applying the AM-GM inequality:</p>
    <p class="mpc">
        \(
            \sqrt{(x+y)(x+z)}\ge\sqrt{xy}+\sqrt{xz} \Leftrightarrow \\
            (x+y)(x+z) \ge xy + zx + 2x\sqrt{yz} \Leftrightarrow \\
            x^2 + xz+yx+yz \ge xy + zx + 2x\sqrt{yx} \Leftrightarrow \\
            \frac{x^2+yz}{2} \ge x\sqrt{yz}
        \)
    </p>
    <p>With this proof in mind we can rewrite each term of the LHS as:</p>
    <p class="mpc">
        \(
            \begin{cases}
                \frac{x}{x+\sqrt{(x+y)(x+z)}} \le \frac{x}{x+\sqrt{xy}+\sqrt{xz}} = \frac{\sqrt{x}}{\sqrt{x}+\sqrt{y}+\sqrt{z}} \\
                \frac{y}{y+\sqrt{(y+z)(y+x)}} \le \frac{y}{y+\sqrt{yx}+\sqrt{yz}} = \frac{\sqrt{y}}{\sqrt{x}+\sqrt{y}+\sqrt{z}} \\
                \frac{z}{z+\sqrt{(z+x)(z+y)}} \le \frac{z}{z+\sqrt{zx}+\sqrt{zy}} = \frac{\sqrt{z}}{\sqrt{x}+\sqrt{y}+\sqrt{z}}
            \end{cases}
        \)
    </p>
    <p>Summing-up the three inequalities leads to the proof immediately</p>
</details>
<details>
    <summary>Source</summary>
    <p>This problem was sourced and adapted from the book: T. Andreescu, Z. Feng - 101 Problems in Algebra.</p>
</details>
</div>
</p>

<p>
<div class="mp">
If \(a, b, c\) are real numbers greater than 1, prove for any exponent \(r\gt0\), that the sum:
<p class="mpc">
    \(
        S = (\log_{a}bc)^r + (\log_{b}ca)^r + (\log_{c}ab)^r \ge 3*2^r
    \)
</p>
<details>
    <summary>Hint 1</summary>
    <p>Change the base for each logarithm like this: \(\log_{a}bc=\frac{\ln bc}{\ln a}=\frac{\ln b}{\ln a}+\frac{\ln c}{\ln a}\).</p>
</details>
<details>
    <summary>Solution</summary>
    <p>We have to perform a base change for each logarithm for each term:</p>
    <p class="mpc">
        \(
            \begin{cases}
                \log_{a}bc=\frac{\ln bc}{\ln a}=\frac{\ln b}{\ln a}+\frac{\ln c}{\ln a} \\
                \log_{b}ca=\dots=\frac{\ln c}{\ln b}+\frac{\ln a}{\ln b} \\
                \log_{c}ab=\dots=\frac{\ln a}{\ln c}+\frac{\ln b}{\ln c}
            \end{cases}
        \)
    </p>
    <p>Now, for each term we apply the AM-GM inequality in the following manner:</p>
    <p class="mpc">
        \(
            \begin{cases}
                \log_{a}bc=\frac{\ln b}{\ln a}+\frac{\ln c}{\ln a} \ge 2[\frac{\ln b \ln a}{(\ln c)^2}]^{\frac{1}{2}}\\
                \log_{b}ca=\frac{\ln c}{\ln b}+\frac{\ln a}{\ln b} \ge 2[\frac{\ln c \ln a}{(\ln b)^2}]^{\frac{1}{2}}\\
                \log_{c}ab=\frac{\ln a}{\ln c}+\frac{\ln b}{\ln c} \ge 2[\frac{\ln a \ln b}{(\ln c)^2}]^{\frac{1}{2}}
            \end{cases}
        \)
    </p>
    <p>After raising each relationship to \(r\) we obtain:</p>
    <p class="mpc">
        \(
            \begin{cases}
                (\log_{a}bc)^r \ge 2^r[\frac{\ln b \ln a}{(\ln c)^2}]^{\frac{r}{2}}\\
                (\log_{b}ca)^r \ge 2^r[\frac{\ln c \ln a}{(\ln b)^2}]^{\frac{r}{2}}\\
                (\log_{c}ab)^r \ge 2^r[\frac{\ln a \ln b}{(\ln c)^2}]^{\frac{r}{2}}
            \end{cases}
        \)
    </p>
    <p>If we sum-up the three relationships:</p>
    <p class="mpc">
        \(
            S \ge \frac{2^r(\ln b \ln a)^{\frac{r}{2}}}{(\ln a)^r}+\frac{2^r(\ln c \ln a)^{\frac{r}{2}}}{(\ln b)^r}+\frac{2^r(\ln a \ln b)^{\frac{r}{2}}}{(\ln c)^r}
        \)
    </p>
    <p>If we apply again the AM-GM inequality on the right-hand-side:</p>
    <p class="mpc">
        \(
            S \ge [\frac{2^{3r}(\ln a \ln b \ln c)^r}{(\ln a \ln b \ln c)^r}]^{\frac{1}{3}}=3*2^r
        \)
    </p>
</details>
<details>
    <summary>Source</summary>
    <p>Crux Mathematicorum, 1987, 202 (Proposed by D.S. Mitrinovic, solved by Murray Klamkin)</p>
</details>
</div>
</p>

# Mistakes you shouldn't make



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

<p>
<div class="mp">
Find \(x,y,z \in \mathbb{R}_{+}\) if: 
<p class="mpc">
    \(
        \begin{cases}
            x^3 + 3 \le 4z \\
            y^3 + 3 \le 4x \\
            z^3 + 3 \le 4z
        \end{cases}
    \)
</p>
<details>
    <summary>Hint 1</summary>
    <p>With problems like this, try to find a solution by giving values to \(x,y,z\).</p>
</details>
<details>
    <summary>Hint 2</summary>
    <p>Can you prove that: \(x^4y^4z^4\ge(4x-3)(4y-3)(4z-3)\) ?</p>
</details>
<details>
    <summary>Hint 3</summary>
    <p>Can you prove that \(x^4y^4z^4\le(4x-3)(4y-3)(4z-3)\)?</p>
</details>
<details>
    <summary>Solution</summary>
    <p>Intuitively we can observe that \(x=y=z=1\) is a solution. But what if there are more?</p>
    <p class="mpc">
        \(
            \begin{cases}
                x^3y + 3 \le 4z \\
                y^3z + 3 \le 4x \\
                z^3x + 3 \le 4y \\
            \end{cases} \Leftrightarrow
            \begin{cases}
                x^3y \le 4z - 3 \\
                y^3z \le 4x - 3 \\
                z^3x \le 4y - 3 \\
            \end{cases}
        \)
    </p>
    <p>Because \(x,y,z \in \mathbb{R}_{+}\) we can multiply all three inequalities to obtain:</p>
    <p class="mpc">
        \(
            (xyz)^4 \le (4x-3)(4y-3)(4z-3)
        \)
    </p>
    <p>On the other hand, applying the mean inequality chain:</p>
    <p class="mpc">
        \(
            \begin{cases}
                x^4 + 1 \ge 2x^2 \Rightarrow x^4+3 \ge 2(x^2+1) \ge 4x \Rightarrow x^4 \ge 4x - 3\\
                y^4 + 1 \ge 2y^2 \Rightarrow y^4+3 \ge 2(y^2+1) \ge 4y \Rightarrow y^4 \ge 4y - 3 \\
                z^4 + 1 \ge 2z^2 \Rightarrow z^4+3 \ge 2(z^2+1) \ge 4z \Rightarrow z^4 \ge 4z - 3 \\
            \end{cases}
        \)
    </p>
    <p>Multiplying the last relationships:</p>
    <p class="mpc">
        \((xyz)^4 \ge (4x-3)(4y-3)(4z-3)\)
    </p>
    <p>So on one hand we have: \((xyz)^4 \le (4x-3)(4y-3)(4z-3)\) and on the other: \((xyz)^4 \ge (4x-3)(4y-3)(4z-3)\).</p>
    <p>We can then conclude \(x=y=z=1\) is an unique solution satisfying both inequalities.</p>
</details>
<details>
    <summary>Source</summary>
    <p>The Romanian Math Olympiad</p>
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

# Nesbitt's Inequality

Nesbitt's Inequality is classic and elegant result in inequalities, and its commonly taught in the context of competitive mathematics. Using this, might help you "skip" tedious steps where you would normally have to use AM-GM.

> I was curious to learn more about Nesbitt, but there is little information about him online. Eventually, I came across this [link](https://hsm.stackexchange.com/questions/14733/who-was-a-m-nesbitt-the-eponym-of-nesbitts-inequality).

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
Let \( x,y,z \in (1,\infty) \), prove:
<p class="mpc">
\(\log_{xy}z+\log_{yz}x+\log_{zx}y\ge\frac{3}{2}\)
</p>
<details>
    <summary>Hint 1</summary>
    <p>Can you find a way to change the base of each logarithm?</p>
</details>
<details>
    <summary>Hint 2</summary>
    <p>\(\log_{xy}z=\frac{\log_{n}z}{\log_n{xy}}\)</p>
</details>
<details>
    <summary>Solution</summary>
    <p>We perform a base-change for each logarithm in the LHS expression:</p>
    <p class="mpc">
        \(
            \begin{cases}
                \log_{xy}z=\frac{\log_{n}z}{\log_n{xy}}=\frac{\log_{n}z}{\log_{n}x+\log_{n}y} \\
                \log_{yz}x=\frac{\log_{n}x}{\log_n{yz}}=\frac{\log_{n}x}{\log_{n}y+\log_{n}z} \\
                \log_{zx}y=\frac{\log_{n}y}{\log_n{zx}}=\frac{\log_{n}y}{\log_{n}z+\log_{n}x}
            \end{cases}
        \)
    </p>
    <p>If we do substitutions: \(a \rightarrow \log_{n}x \), \(b \rightarrow \log_{n}y \), \(c \rightarrow \log_{n}z \) and put the results back in the main expression:</p>
    <p class="mpc">
        \(
            \frac{a}{b+c}+\frac{b}{a+c}+\frac{c}{a+b} \ge \frac{3}{2}
        \)
    </p>
    <p>Which we know is true as per Nesbitt's inequality.</p>
    <p>Equality holds true if \(x=y=z\).</p>
</details>
</div>
</p>

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
    <summary>Hint 1</summary>
    <p>Divide each side by \(2\):</p> 
    <p class="mpc">\(\frac{-x+y+z}{2x}+\frac{x-y+z}{2y}+\frac{x+y-z}{2z} \ge \frac{3}{2}\).</p>
</details>
<details>
    <summary>Hint 2</summary>
    <p>What if we do the following substitutions:</p>
    <p class="mpc">
        \(
            \begin{cases}
                a \rightarrow -x+y+z \\
                b \rightarrow x-y+z \\
                c \rightarrow x+y-z
            \end{cases}
        \)
    </p>
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

Can you solve the next problems using Nesbitt's Inequality:

<p>
    <div class="mp">
        <p>Let \(a,b,c\) positve real numbers, prove that:</p>
        <p class="mpc">
        \(
            \frac{a^2+1}{b+c}+\frac{b^2+1}{c+a}+\frac{c^2+1}{a+b} \ge 3
        \)
        </p>
        <details>
            <summary>Hint 1</summary>
            <p>The fact that \(3\) is missing the \(\frac{1}{2}\) tell us something.</p>
        </details>
        <details>
            <summary>Solution</summary>
            <p>
            \(
                \frac{a^2+1}{b+c}+\frac{b^2+1}{c+a}+\frac{c^2+1}{a+b} \overbrace{\ge}^{\text{AM-GM}} \frac{2a}{b+c} + \frac{2b}{c+a} + \frac{2c}{a+b} \ge 3
            \)
            </p>
            <p>The last statement is true, as per Nesbitt's inequality. Equality holds when \(a=b=c=1\).</p>
        </details>
    </div>
</p>


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
        = \frac{1}{a+b+c}(\frac{c}{a+b}+\frac{a}{b+c}+\frac{b}{c+a}+\frac{a+b}{a+b}+\frac{b+c}{b+c}+\frac{c+a}{c+a} = \\
        = \frac{1}{3}(\underbrace{\frac{c}{a+b}+\frac{a}{b+c}+\frac{b}{c+a}}_{\ge\frac{3}{2})}+3)
    \)
    </p>
    <p>So the LHS:</p>
    <p class="mpc">
        \(
            \text{LHS}\ge\frac{1}{3}(\frac{3}{2}+3)=\frac{3}{2}
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

For the next problems, the *Nesbitt structure* is harder to spot, but it's there:

<p>
    <div class="mp">
        <p>Let \(x,y,z\) be positive real numbers, such that \(xyz=1\), prove that:</p>
        <p class="mpc">\(\frac{1}{yz+z}+\frac{1}{zx+y}+\frac{1}{xy+z}\ge\frac{3}{2}\)</p>
        <details>
            <summary>Hint 1</summary>
            <p>Given \(xyz=1\), we can substitute:</p>
            <p class="mpc">
                \(
                    \begin{cases}
                        x = \frac{a}{b} \\
                        y = \frac{b}{c} \\
                        z = \frac{c}{a}
                    \end{cases}
                \)
            </p>
        </details>
        <details>
            <summary>Solution</summary>
            <p>Because \(xyz=1\), we can perform the following substitution:</p>
            <p class="mpc">
                \(
                    \begin{cases}
                        x = \frac{a}{b} \\
                        y = \frac{b}{c} \\
                        z = \frac{c}{a}
                    \end{cases}
                \)                
            </p>
            <p>After this the inequality becomes:</p>
            <p class="mpc">
                \(
                    \frac{a}{b+c}+\frac{b}{c+a}+\frac{c}{a+b} \ge \frac{3}{2}
                \)
            </p>
            <p>Equality holds for \(a=b=c=1\) or \(x=y=z=1\).</p>
        </details>
        <details>
            <summary>Source</summary>
            <p>Kazakhstan Olympiad, 2008</p>
        </details>
    </div>
</p>

<p>
    <div class="mp">
        <p>Let \(a,b,c\) positive real numbers, prove that:</p>
        <p class="mpc">
            \(
                \frac{(a^3+1)^2}{4bc(b+c)}+\frac{(b^3+1)^2}{4ca(c+a)}+\frac{(c^3+1)^2}{4ab(a+b)} \ge \frac{3}{2}
            \)
        </p>
        <details>
            <summary>Hint 1</summary>
            <p>We've already proven \(a^3+b^3 \ge ab(a+b)\)</p>
        </details>
        <details>
            <summary>Hint 2</summary>
            <p>We've already proven \((a+b)^2 \ge 4ab\)</p>
        </details>
        <details>
            <summary>Solution</summary>
            <p>Using the two hints mentioned above we can write:</p>
            <p class="mpc">
                \(
                   \frac{(a^3+1)^2}{4bc(b+c)}+\frac{(b^3+1)^2}{4ca(c+a)}+\frac{(c^3+1)^2}{4ab(a+b)} \ge \frac{4a^3}{4bc(b+c)} + \frac{4b^3}{4ca(c+a)} + \frac{4c^3}{4ab(a+b)} \ge \\
                   \ge \frac{a^3}{b^3+c^3} + \frac{b^3}{c^3+a^3} + \frac{c^3}{a^3+b^3} \overbrace{\ge}^{\text{Nesb.}} \frac{3}{2}
                \)
            </p>
        </details>
        <details>
            <summary>Source</summary>
            <p>This problem is "original" and was created by me in the context of this article.</p>
        </details>
    </div>
</p>

<p>
    <div class="mp">
        <p>Let \(a,b,c\) positive real numbers, prove that:</p>
        <p class="mpc">
            \(
                \frac{1}{a^3+b^3+2abc}+\frac{1}{b^3+c^3+2abc}+\frac{1}{c^3+a^3+2abc} \le \frac{3}{4abc}
            \)
        </p>
        <details>
            <summary>Hint 1</summary>
            <p>In a previous problem we've already proven: \(a^3+b^3 \ge ab(a+b)\). Maybe this can prove useful.</p>
        </details>
        <details>
            <summary>Solution</summary>
            <p>Knowing that: \(a^3+b^3 \ge ab(a+b)\) we can write:</p>
            <p class="mpc">
                \(
                    \frac{1}{a^3+b^3+2abc}+\frac{1}{b^3+c^3+2abc}+\frac{1}{c^3+a^3+2abc} \le \frac{1}{ab(a+b)+2abc} + \frac{1}{bc(b+c)+2abc} + \frac{1}{ca(c+a)+2abc}
                \)
            </p>
            <p>So maybe we can prove the following:</p>
            <p class="mpc">
                \(
                    \frac{1}{ab(a+b)+2abc} + \frac{1}{bc(b+c)+2abc} + \frac{1}{ca(c+a)+2abc} \overbrace{\le}^{?} \frac{3}{4abc} \Leftrightarrow \\
                    \frac{2c}{a+b+2c} + \frac{2a}{b+c+2a} + \frac{2b}{c+a+2b} \overbrace{\le}^{?} \frac{3}{2} \Leftrightarrow \\
                    1 - \frac{a+b}{a+b+2c} + 1 - \frac{b+c}{b+c+2a} + 1 - \frac{c+a}{c+a+2b} \overbrace{\le}^{?} \frac{3}{2} \Leftrightarrow \\
                    \frac{(a+b)}{(a+c)+(b+c)} + \frac{(b+c)}{(b+a)+(c+a)} + \frac{(c+a)}{(c+b)+(a+b)} \overbrace{\ge}^{?} \frac{3}{2}
                \)
            </p>
            <p>The last relationship is true as per Nesbitt's Inequality</p>
        </details>
        <details>
            <summary>Source</summary>
            <p>Stanescu Florin, Concursul Gazeta Matematica si ViitoriOlimpici, Editia a Va, 9th grade, Romania</p>
        </details>
    </div>
</p>

The final problem presents a fascinating inequality that resembles Nesbitt's Inequality structure, though not exactly. Nevertheless, it's an interesting and noteworthy result:

<p>
    <div class="mp">
        <p>Let \(x,y,z\) positive real numbers, with \(x+y+z=3\), prove that:</p>
        <p class="mpc">
            \(
                \frac{\sqrt{x}}{y+z}+\frac{\sqrt{y}}{x+z}+\frac{\sqrt{z}}{y+x} \ge \frac{3}{2}
            \)
        </p>
        <details>
            <summary>Hint 1</summary>
            <p>Maybe it's worth performing a substition like:</p>
            <p class="mpc">
                \(
                    \begin{cases}
                        x = a^2 \\
                        y = b^2 \\
                        z = c^2
                    \end{cases}
                \)
            </p>
            <p>In this case, the additional condition becomes: \(a^2+b^2+c^2=3\).</p>
        </details>
        <details>
            <summary>Solution</summary>
            <p>The solution was provided by Michael Rozenberg on <a href="https://math.stackexchange.com/questions/3430739/inequality-under-condition-xyz-3">math.stackexchange.com</a></p>
            <p>We start by performing the following substition:</p>
            <p class="mpc">
                \(
                    \begin{cases}
                        x = a^2 \\
                        y = b^2 \\
                        z = c^2
                    \end{cases}
                \)
            </p>
            <p>After the substition, the inequality becomes:</p>
            <p class="mpc">
                \(
                    (\frac{a}{3-a^2}-1)+(\frac{b}{3-b^2}-1)+(\frac{c}{3-c^2}-1) \ge 0 \Leftrightarrow \\
                    \frac{1}{2}[\frac{(a-1)(a+3)}{3-b^2}+\frac{(b-1)(b+3)}{3-b^2}+\frac{(c-1)(c+3)}{3-c^2}] \ge 0 \Leftrightarrow \\
                    \frac{1}{2}[\frac{(a-1)(a+3)}{3-b^2}+\frac{(b-1)(b+3)}{3-b^2}+\frac{(c-1)(c+3)}{3-c^2} - (a^2-1) - (b^2-1) - (c^2-1)] \ge 0 \Leftrightarrow \\
                    \frac{1}{2}[\frac{(a-1)^2(a+2)a}{3-a^2}+\frac{(b-1)^2(b+2)b}{3-b^2}+\frac{(c-1)^2(c+2)c}{3-c^2}] \ge 0
                \)
            </p>
            <p>The last inequality is true, because each of the three terms is positive.</p>
            <p>Equality holds for \(x=y=z=1\).</p>
        </details>
        <details>
            <summary>Source</summary>
            <p><a href="https://math.stackexchange.com/questions/3430739/inequality-under-condition-xyz-3">math.stackexchange.com</a></p>
        </details>
    </div>
</p>
 
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
<details>
    <summary>Solution</summary>
    <p>If we expand the sums, the RHS becomes:</p>
    <p class="mpc">
        \(
            R=\sum_{i=1}^n\frac{1}{i^2}*\sum_{i=2}^{n+1}\frac{1}{i^2} = (1+\frac{1}{2^2}+\dots+\frac{1}{n^2})(\frac{1}{2^2}+\dots+\frac{1}{(n+1)^2})
        \)
    </p>
    <p>But, by applying the CBS inequality we know that:</p>
    <p class="mpc">
        \(
            (\frac{1}{1*2}+\frac{1}{2*3}+\dots+\frac{1}{n(n+1)})^2 \le R \Leftrightarrow \\
            (1-\frac{1}{n+1})^2 \le R \Leftrightarrow \\
            (\frac{n}{n+1})^2 \le R
        \)
    </p>
</details>
</div>
</p>

<p>
    <div class="mp">
        <p>Let \(a,b,c\) positive real numbers, and \(a+b+c=3\), prove that:</p>
        <p class="mpc">
            \(
                a^2+b^2+c^2 \ge 3 \ge ab + bc + ca
            \)
        </p>
        <details>
            <summary>Note</summary>
            <p>We already know that \(a^2+b^2+c^2 \ge ab+bc+ca\), but this is insufficient to prove the chain inequality.</p>
        </details>
        <details>
            <summary>Hint 1</summary>
            <p>It might sound obvious, but \(3=1+1+1\).</p>
        </details>
        <details>
            <summary>Hint 2</summary>
            <p>Why don't you apply the CBS inequality for \((1,1,1)\) and \((a^2,b^2,c^2)\)</p>
        </details>
        <details>
            <summary>Solution</summary>
            <p>We apply the CBS inequality in the following manner:</p>
            <p class="mpc">
                \(
                    (1^2+1^2+1^2)(a^2+b^2+c^2) \ge (a+b+c)^2 \Leftrightarrow \\
                    3(a^2+b^2+c^2) \ge 9 \Leftrightarrow \\
                    a^2+b^2+c^2 \ge 3
                \)
            </p>
            <p>Now we have to prove \(3 \ge ab+bc+ca\).</p>
            <p>We use the following identity:</p>
            <p class="mpc">
                \(
                    a^2+b^2+c^2 = (a+b+c)^2 - 2(ab+bc+ca) \ge 3 \Leftrightarrow \\
                    9 - 2(ab+bc+ca) \ge 3 \Leftrightarrow
                    6 \ge 2(ab+bc+ca) \Leftrightarrow 3 \ge ab+bc+ca
                \)
            </p>
        </details>
    </div>
</p>

<p>
    <div class="mp">
        <p>Let \(a,b,c,d,e \in \mathbb{R}\) with \(a^2+b^2+c^2+d^2+e^2=55\), prove that:</p>
        <p class="mpc">\(a+2b+3c+4d+5e \le 55\)</p>
    <details>
        <summary>Hint 1</summary>
        <p>\(1^2+2^2+3^2+4^2+5^2=1+4+9+16+25=55\)</p>
    </details>
    <details>
        <summary>Solution</summary>
        <p>We apply the CBS inequality directly in the following manner:</p>
        <p class="mpc">
            \(
                (1^2+2^2+3^2+4^2+5^2)(a^2+b^2+c^2+d^2+e^2) \ge (a+2b+3c+4d+5e)^2 \Leftrightarrow \\
                55 * 55 \ge (a+2b+3c+4d+5e)^2 \Leftrightarrow \\
                55 \ge |a+2b+3c+4d+5e| \ge a+2b+3c+4d+5e
            \)
        </p>
    </details>
    </div>
</p>

<p>
<div class="mp">
    <p>Let \(a,b\) positive real numbers satisfying \(a+b=1\). Prove that:</p> 
    <p class="mpc">\(\sqrt{1+2a}+\sqrt{1+2b}\le 2\sqrt{2}\)</p>
<details>
    <summary>Solution</summary>
    <p>We apply the CBS inequality like this: </p>
    <p class="mpc">\((1*\sqrt{1+2a}+1*\sqrt{1+2b})^2 \le (1^2+1^2)(1+2a+1+2b)\)</p>
    <p>Eventually \(\sqrt{1+2a}+\sqrt{1+2b}\le2\sqrt{2}\).</p>
</details>
<details>
    <summary>Source</summary>
    <p>Problem author: Ioan V. Maftei, Bucharest, Romania, Concursul Gazeta Matematica, 9th grade</p>
</details>
</div>
</p>

<p>
<div class="mp">
<p>Let \(a,b,c\) positive real numbers, such that: \(a^2+b^2+c^2=1\). Prove that:</p>
<p class="mpc">
    \(a^3+b^3+c^3 \ge \frac{\sqrt{3}}{3}\)
</p>
<details>
    <summary>Hint 1</summary>
    <p>Can you connect \(a^3+b^3+c^3\) with \(a^2+b^2+c^2\) and \(a+b+c\) with \(a^2+b^2+c^3\) by applying the CBS inequality twice?</p>
</details>
<details>
    <summary>Solution</summary>
    <p>We need to connect \(a^3+b^3+c^3\) with \(a^2+b^2+c^2\), so let's apply the CBS inequality in the following manner:</p>
    <p class="mpc">
        \(
            [(\sqrt{a})^2+(\sqrt{b})^2+(\sqrt{c})^2]*[(a\sqrt{a})^2+(b\sqrt{b})^2+(c\sqrt{c})^2]\ge(\sqrt{a}*a\sqrt{a}+\sqrt{b}*b\sqrt{b}+\sqrt{c}*c\sqrt{c})^2 \Leftrightarrow \\
            (a+b+c)(a^3+b^3+c^3) \ge (a^2+b^2+c^2)^2 \Leftrightarrow \\
            (a+b+c)(a^3+b^3+c^3) \ge 1
        \)
    </p>
    <p>Now let's connect \(a+b+c\) and \(a^2+b^2+c^2\) through the CBS inequality:</p>
    <p class="mpc">
        \(
            (1^2+1^2+1^2)(a^2+b^2+c^2)\ge(a*1+b*1+c*1)^2 \Leftrightarrow
            3 \ge (a+b+c)^2 \Leftrightarrow 
            \sqrt{3} \ge a+b+c
        \)
    </p>
    <p>At this point, we can write:</p>
    <p class="mpc">
        \(
            \sqrt{3}*(a^3+b^3+c^3) \ge (a+b+c)*(a^3+b^3+c^3) \ge 1 \Rightarrow \\
            \Rightarrow a^3+b^3+c^3 \ge \frac{\sqrt{3}}{3}
        \)
    </p>
</details>
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


The following problem uses an interesting pattern/trick, can you solve it ?

<p>
<div class="mp">
Let \(a,b,c\) positive real numbers satisfying the following: \(a^2+b^2+c^2\ge4\). Prove:
<p class="mpc">
    \(
        \frac{a^3}{b+3c}+\frac{b^3}{c+3a}+\frac{a^3}{a+3b}\ge1
    \)
</p>
<details>
    <summary>Hint 1</summary>
    <p>In what way you can use the CBS inequality to make use of the fact \(a^2+b^2+c^2\ge4\)?</p>
</details>
<details>
    <summary>Hint 2</summary>
    <p>If \(a_1, a_2, a_3\) and \(b_1, b_2, b_3\) are positive real numbers, can you prove the following useful inequality?</p>
    <p class="mpc">
        \(
            a_1+a_2+a_3 \ge \frac{\sqrt{a_1b_1}+\sqrt{a_2b_2}+\sqrt{a_3b_3}}{b_1+b_2+b_3}
        \)
    </p>
</details>
<details>
    <summary>Solution</summary>
    <p>How can use the fact that \(a^2+b^2+c^2\ge4\)?</p>
    <p>For \(a_1, a_2, a_3, b_1, b_2, b_3\) positive numbers, a direct consequence of the CBS inequality is:</p>
    <p class="mpc">
    \(
        (\sqrt{a_1}*\sqrt{b_1}+\sqrt{a_2}\sqrt{b_2}+\sqrt{a_3}\sqrt{b_3})^2 \le (a_1+a_2+a_3)(b_1+b_2+b_3) \Leftrightarrow \\
        a_1 + a_2 + a_3 \ge \frac{(\sqrt{a_1b_1}+\sqrt{a_2b_2}+\sqrt{a_3b_3})^2}{b_1+b_2+b_3}
    \)
    </p>
    <p>The nice part is that we can "pick" our \(b_1, b_2, b_3\) to match our needs:</p>
    <p class="mpc">
    \(
        \begin{cases}
            a_1 \rightarrow \frac{a^3}{b+3c} \\
            a_2 \rightarrow \frac{a^3}{c+3a} \\
            a_3 \rightarrow \frac{c^3}{a+3b} \\
            b_1 \rightarrow a(b+3c) \\
            b_2 \rightarrow b(c+3a) \\
            b_3 \rightarrow c(a+3b) \\
        \end{cases}
    \)
    </p>
    <p>By applying this to the LHS of our inequality:</p>
    <p class="mpc">
        \(
            \frac{a^3}{b+3c}+\frac{b^3}{c+3a}+\frac{a^3}{a+3b} \ge \frac{[\sqrt{\frac{a^3}{b+3c}*a(b+3c)}+\sqrt{\frac{b^3}{c+3a}*b(c+3a)}+\sqrt{\frac{c^3}{a+3b}*c(a+3b)}]^2}{a(b+3c)+b(c+3a)+c(a+3b)} = \\
            = \frac{(a^2+b^2+c^2)^2}{4(ab+bc+ca)} = \underbrace{\frac{a^2+b^2+c^2}{4}}_{\ge1} * \underbrace{\frac{a^2+b^2+c^2}{ab+bc+ca}}_{\ge1}
        \)
    </p>
    <p>We've already proven that \(a^2+b^2+c^2 \ge ab+bc+ca\), we have thus proven our inequality.</p>
</details>
<details>
    <summary>Source</summary>
    <p>Concursul Gazeta Matematica, Editia a IXa, 9th grade, Romania</p>
</details>
</div>
</p>

<p>
    <div class="mp">
        <p>Let \(\lambda \ge 3\) fixed, \(x,y,z\) positive real numbers, and \(x+y+z=3\). Find the minimum of:</p>
        <p class="mpc">
            \(
                P = \frac{x}{\lambda - x}+\frac{y}{\lambda - y} + \frac{z}{\lambda - z}
            \)
        </p>
        <details>
            <summary>Hint 1</summary>
             <p>If \(a_1, a_2, a_3\) and \(b_1, b_2, b_3\) are positive real numbers, can you prove the following useful inequality?</p>
             <p class="mpc">
                \(
                    a_1+a_2+a_3 \ge \frac{\sqrt{a_1b_1}+\sqrt{a_2b_2}+\sqrt{a_3b_3}}{b_1+b_2+b_3}
                \)
             </p>
        </details>
        <details>
            <summary>Solution</summary>
            <p>We can apply the CBS inequality in the following manner:</p>
            <p class="mpc">
                \(
                    [\frac{x}{\lambda - x}+\frac{y}{\lambda - y} + \frac{z}{\lambda - z}][x(\lambda-x)+y(\lambda-y)+z(\lambda-z)] \ge (x+y+z)^2
                \)
            </p>
            <p>This will be equivalen to:</p>
            <p class="mpc">
                \(
                    \frac{x}{\lambda - x}+\frac{y}{\lambda - y} + \frac{z}{\lambda - z} \ge \frac{9}{\lambda(x+y+z)-(x^2+y^2+z^2)} \Leftrightarrow \\
                    \frac{x}{\lambda - x}+\frac{y}{\lambda - y} + \frac{z}{\lambda - z} \ge \frac{9}{3\lambda - (x^2+y^2+z^2)}
                \)
            </p>
            <p>Now we need to find a lower bound to \(x^2+y^2+z^2\) knowing \(x+y+z=3\). For this we apply the CBS inequality again:</p>
            <p class="mpc">
                \(
                    (x^2+y^2+z^2)(1^2+1^2+1^2)\ge(x+y+z)^2 \Leftrightarrow \\
                    x^2+y^2+z^2 \ge 3
                \)
            </p>
            <p>Knowing this, our previous inequality becomes:</p>
            <p class="mpc">
                \(
                    \frac{x}{\lambda - x}+\frac{y}{\lambda - y} + \frac{z}{\lambda - z} \ge \frac{9}{3\lambda - (x^2+y^2+z^2)} \Leftrightarrow \\
                    \frac{x}{\lambda - x}+\frac{y}{\lambda - y} + \frac{z}{\lambda - z} \ge \frac{9}{3\lambda-3} = \frac{3}{\lambda-1}
                \)
            </p>
            <p>So \(P\ge\frac{3}{\lambda-1}\). Equality holds when \(x=y=z=1\).</p>
        </details>
        <details>
            <summary>Source</summary>
            <p>Mariciu Chiriciu</p>
        </details>
    </div>
</p>

<p>
    <div class="mp">
        <p>Let \(z \in [0, \infty) \), and \(x,y \in [1, \infty) \), prove:</p>
        <p class="mpc">
            \(
                \frac{x+y}{(y+z)(z+x)}+xyz \ge \frac{x+y+z}{xy+yz+zx}
            \)
        </p>
        <details>
            <summary>Hint 1</summary>
            <p>Do you see any similarity between the terms of this inequality the terms of a known identity?</p>
        </details>
        <details>
            <summary>Hint 2</summary>
            <p>Can you use the following identity in your advantage. I mean, it looks suspiciously similar with our inequality, except some things "went south":</p>
            <p class="mpc">
                \(
                    (x+y)(y+z)(z+x)+xyz=(x+y+z)(xy+yz+zx)
                \)
            </p>
        </details>
        <details>
            <summary>Solution</summary>
            <p>We apply the CBS inequality in the following manner:</p>
            <p class="mpc">
            \(
                [\frac{x+y}{(y+z)(z+x)}+xyz][\underbrace{(x+y)(y+z)(z+x)+xyz}_{=(x+y+z)(xy+yz+zx)}]\ge(x+y+xyz)^2 
            \)
            </p>
            <p>With this in mind we can re-write everything as:</p>
            <p class="mpc">
                \(
                    \frac{x+y}{(y+z)(z+x)}+xyz \ge \frac{(x+y+xyz)^2}{(x+y+z)(xy+yz+zx)} \ge \frac{(x+y+z)^2}{(x+y+z)(xy+yz+zx)}
                \)
            </p>
            <p>After we simplify, we have proven the inequality.</p>
        </details>
        <details>
            <summary>Source</summary>
            <p>Andrei N. Ciobanu</p>
        </details>
    </div>
</p>


Can you think of an identity and some algebraic manipulations to solve the next problem:

<p>
<div class="mp">
<p>Let \(x,y,z\) positive real numbers. If:</p>
<p class="mpc">
    \(k=\frac{1}{z}(x+2\sqrt{yz})+\frac{1}{x}(y+2\sqrt{zx})+\frac{1}{y}(z+2\sqrt{xy})\)
</p>
<p>Prove:</p>
<p class="mpc">
    \(
        (1+\frac{y}{x})(1+\frac{z}{y})(1+\frac{x}{z}) \ge k-1
    \)
</p>
<details>
    <summary>Hint 1</summary>
    <p>Start by proving \(k * xyz = (x\sqrt{y}+y\sqrt{z}+z\sqrt{x})^2\)</p>
</details>
<details>
    <summary>Hint 2</summary>
    <p>\((1+\frac{y}{x})(1+\frac{z}{y})(1+\frac{y}{z}) = \frac{(x+y)(y+z)(z+x)}{xyz}\)</p>
</details>
<details>
    <summary>Hint 3</summary>
    <p>How can you express \((x+y)(y+z)(z+x)\) using a known identity.</p>
</details>
<details>
    <summary>Solution</summary>
    <p>We start by working on \(k\), and multiplying each side with \(xyz\):</p>
    <p class="mpc">
        \(
            k * xyz = xy(x+2\sqrt{yz})+yz(y+2\sqrt{zx})+xz(z+2\sqrt{xy}) \Leftrightarrow \\
            k * xyz = x^2y + y^2z + xz^2 + 2(xy\sqrt{yz}+yz\sqrt{zx}+2xz\sqrt{xy}) \Leftrightarrow \\
            k * xyz = (x\sqrt{y}+y\sqrt{z}+z\sqrt{x})^2 \Leftrightarrow
            k = \frac{(x\sqrt{y}+y\sqrt{z}+z\sqrt{x})^2}{xyz}
        \)
    </p>
    <p>So our inequality becomes:</p    >
    <p class="mpc">
        \(
            (1+\frac{y}{x})(1+\frac{z}{y})(1+\frac{x}{z}) \ge \frac{(x\sqrt{y}+y\sqrt{z}+z\sqrt{x})^2}{xyz} - 1 \Leftrightarrow
            (x+y)(y+z)(z+x) \ge (x\sqrt{y}+y\sqrt{z}+z\sqrt{x})^2 - xyz
        \)
    </p>
    <p>In the same time:</p>
    <p class="mpc">
        \(
            (x+y)(y+z)(z+x) = (x+y+z)(xy+yz+zx) - xyz \overbrace{\ge}^{\text{C.B.S}} (x\sqrt{y}+y\sqrt{z}+z\sqrt{x})^2 - xyz
        \)
    </p>
</details>
<details>
    <summary>Source</summary>
    <p>This problem is "original" and was created by me in the context of this article.</p>
</details>
</div>
</p>
 
# An interesting refinement for Nesbitt's inequality

> Refinement of an inequality refers to the process of strengthening or improving an existing inequality by making it sharper or more precise. This typically involves replacing a given inequality with a stronger one that still holds under the same conditions but provides a tighter bound.

I was reading an article about how Nesbitt's inequality can be useful for solving certain geometric inequalities—particularly those involving the sides of a triangle (though we won’t be discussing that topic in this article). During my reading, I came across an interesting refinement: [*A new generalisation of Nesbitt's Inequality*](https://josa.ro/docs/josa_2013_3/a_05_Batinetu.pdf), by D. M. Batinetu-Giurgiu and Neculai Stanciu.

Let's try to prove it:

<p>
    <div class="mp">
        <p>Let \(x,y,z,a,b\) positive real numbers, prove that:</p>
        <p class="mpc">
            \(
                \frac{x}{ay+bz}+\frac{y}{ax+bz}+\frac{z}{ax+by} \ge \frac{3}{a+b}
            \)
        </p>
        <details>
            <summary>Hint 1</summary>
            <p>How can use the fact that \(a^2+b^2+c^2\ge4\)?</p>
            <p>For \(a_1, a_2, a_3, b_1, b_2, b_3\) positive numbers, a direct consequence of the CBS inequality is:</p>
            <p class="mpc">
            \(
                (\sqrt{a_1}*\sqrt{b_1}+\sqrt{a_2}\sqrt{b_2}+\sqrt{a_3}\sqrt{b_3})^2 \le (a_1+a_2+a_3)(b_1+b_2+b_3) \Leftrightarrow \\
                a_1 + a_2 + a_3 \ge \frac{(\sqrt{a_1b_1}+\sqrt{a_2b_2}+\sqrt{a_3b_3})^2}{b_1+b_2+b_3}
            \)
            </p>
        </details>
        <details>
            <summary>Solution</summary>
            <p>As hinted, we apply the CBS inequality in the following manner:</p>
            <p class="mpc">
                \(
                    [\frac{x}{ay+bz}+\frac{y}{ax+bz}+\frac{z}{ax+by}][x(ay+bz)+y(ax+bz)+z(ax+by)] \ge (a+b+c)^2 \Leftrightarrow \\
                    \frac{x}{ay+bz}+\frac{y}{ax+bz}+\frac{z}{ax+by} \ge \frac{(a+b+c)^2}{x(ay+bz)+y(ax+bz)+z(ax+by)} \Leftrightarrow \\
                    \frac{x}{ay+bz}+\frac{y}{ax+bz}+\frac{z}{ax+by} \ge \frac{(a+b+c)^2}{axy+bzx+axy+byz+azx+bzy} \Leftrightarrow \\
                    \frac{x}{ay+bz}+\frac{y}{ax+bz}+\frac{z}{ax+by} \ge \frac{(a+b+c)^2}{a(xy+yz+zx)+b(xy+yz+zx)} \Leftrightarrow \\
                    \frac{x}{ay+bz}+\frac{y}{ax+bz}+\frac{z}{ax+by} \ge \frac{(a+b+c)^2}{(a+b)(xy+yz+xz)} 
                \)
            </p>
            <p>
                We know that \((x+y+z)^2\ge3(xy+yz+xz)\). If we introduce this in the last inequality:
            </p>
            <p class="mpc">
            \(
                \frac{x}{ay+bz}+\frac{y}{ax+bz}+\frac{z}{ax+by} \ge \frac{3(xy+yz+zx)}{(a+b)(xy+yz+zx)} \Leftrightarrow \\
                \frac{x}{ay+bz}+\frac{y}{ax+bz}+\frac{z}{ax+by} \ge \frac{3}{a+b}
            \)
            </p>
        </details>
    </div>
</p>

With this in mind, let's try to solve the following two problems:

<p>
    <div class="mp">
        <p>Let \(x,y,z\) positive real numbers, prove:</p>
        <p class="mpc">
            \(
                \frac{x}{y+xyz^2}+\frac{y}{z+x^2yz}+\frac{z}{x+xy^2z} \ge \frac{3}{1+xyz}
            \)
        </p>    
        <details>
            <summary>Solution</summary>
            <p>It's enough to observe \(a=1\) and \(b=xyz\) and re-use the previous refinement.</p>
        </details>
    </div>
</p>

<p>
    <div class="mp">
        <p>Let \(x,y,z\) positive real numbers, prove:</p>
        <p class="mpc">
            \(
                \frac{x}{2y+z\sqrt{x}}+\frac{y}{2z+x\sqrt{x}}+\frac{z}{2x+y\sqrt{x}} \ge \frac{3}{2+\sqrt{x}}
            \)
        </p>
        <details>
            <summary>Solution</summary>
            <p>It's enough to observe \(a=2\) and \(b=\sqrt{x}\) and re-use the previous refinement.</p>
        </details>        
    </div>
</p>

<!-- <p>
    <div class="mp">
        <p>For any \(a,b,c \gt 0\), and any weights \(m,n,p\), with \(m+n+p=1\), prove that the following inequality holds:</p>
        <p class="mpc">
            \(
                \frac{ma}{b+c}+\frac{nb}{c+a}+\frac{pc}{a+b} \ge \frac{ma+nb+pc}{(n+p)a+(p+m)b+(m+n)c}
            \)
        </p>
        <details>
            <summary>Notes</summary>
            <p>An alternative form is:</p>
            <p class="mpc">
                \(
                    \frac{ma}{b+c}+\frac{nb}{c+a}+\frac{pc}{a+b} \ge \frac{ma+nb+pc}{(1-m)a+(1-n)b+(1-p)c} = \frac{ma+nb+pc}{a+b+c-am-nb-pc}
                \)
            </p>
            <p>If we consider the weighted sum \(\lambda=ma+nb+pc\), we can rewrite everything as:</p>
            <p class="mpc">
            \(
                \frac{ma}{b+c}+\frac{nb}{c+a}+\frac{pc}{a+b} \ge \frac{\lambda}{a+b+c-\lambda}
            \)
            </p>
        </details>
        <details>
            <summary>Hint 1</summary>
        </details>
    </div>
</p> -->

---

# Titu's Lemma 

In 2001, [Titu Alexandrescu](https://en.wikipedia.org/wiki/Titu_Andreescu), who was at that time an USA IMO trainer, gave a lecture on a special case of the Cauchy-Bunyakovsky-Schwartz. Shortly after, one of his results (which was already known in the mathematical world) proved to be extremely effective for solving and "simplifying" difficult inequality questions. The technique was so efficient, that it got the popular name of "Titu's Lemma". Titu's Lemma states:

<p>
<div class="mp">
    <p>For any real numbers \(a_1,\dots,a_n\) and any positive real numbers \(b_1,\dots,b_n\) we have:</p>
    <p class="mpc">
    \(
        \frac{a_1^2}{b_1}+\dots+\frac{a_2^2}{b_n}\ge\frac{(a_1+\dots+a_n)^2}{b_1+\dots+b_n}
    \)
    </p>
</div>
</p>

Why don't you try proving it for two variables:

<p>
<div class="mp">
<p>Let \(a, b \in \mathbb{R}\) and \(x, y \in \mathbb{R}_{+}\), prove:</p>
<p class="mpc">
\(
    \frac{a^2}{x}+\frac{b^2}{y} \ge \frac{(a+b)^2}{x+y}
\)
</p>
<details>
    <summary>Hint 1</summary>
    <p>Move everything to the left and simplify the resulting expression.</p>
</details>
<details>
    <summary>Solution</summary>
    <p>We move everything to the left-hand side and simplify the resulting expression:</p>
    <p class="mpc">
        \(
            \frac{a^2}{x}+\frac{b^2}{y}-\frac{(a+b)^2}{x+y} = \frac{a^2y(x+y)+b^2x(x+y)-xy(a^2+b^2+2ab)}{xy(x+y)} = \\
            = \frac{(ay-bx)^2}{xy(x+y)} \ge 0
        \)
    </p>
</details>
</div>
</p>

Now let's try to prove the Lemma for 3 variables, but this time using the CBS inequality:

<p>
<div class="mp">
<p>Let \(a,b,c \in \mathbb{R}\) and \(x,y,z \in \mathbb{R}_{+}\), prove:</p>
<p class="mpc">
    \(
        \frac{a^2}{x}+\frac{b^2}{y}+\frac{c^2}{z}\ge\frac{(a+b+c)^2}{x+y+z}
    \)
</p>
<details>
    <summary>Hint 1</summary>
    <p>Apply the CBS inequality on \(\frac{a}{\sqrt{x}}, \frac{b}{\sqrt{y}}, \frac{c}{\sqrt{z}}\) and \((\sqrt{x}, \sqrt{y}, \sqrt{z})\)</p>
</details>
<details>
    <summary>Solution</summary>
    <p>Even if it feels "out of the blue", we apply the CBS Inequality on \(\frac{a}{\sqrt{x}}, \frac{b}{\sqrt{y}}, \frac{c}{\sqrt{z}}\) and \((\sqrt{x}, \sqrt{y}, \sqrt{z})\) we prove Titu's Lemma:</p>
    <p class="mpc">
        \(
            (\frac{a}{\sqrt{x}}*\sqrt{x}+\frac{b}{\sqrt{y}}*\sqrt{y}+\frac{c}{\sqrt{z}}*\sqrt{z})^2 \le (\frac{a^2}{x}+\frac{b^2}{y}+\frac{c^2}{z})(x+y+z) \Leftrightarrow \\
            \frac{(a+b+c)^2}{x+y+z} \le \frac{a^2}{x}+\frac{b^2}{y}+\frac{c^2}{z}
        \)
    </p>
</details>
</div>
</p>

Any problem that can be solved using the CBS inequality can be solved just as well—if not more easily—using Titu's Lemma:

<p>
<div class="mp">
    <p>For \(a \in \mathbb{R}\), prove:</p>
    <p class="mpc">
        \( 
            3(a^4+a^2+1) \ge (a^2+a+1)^2
        \)
    </p>
    <details>
        <summary>Solution 1 - CBS</summary>
        <p class="mpc">
            \(
                (1^2+1^2+1^2)[(a^2)^2+a^2+1^2] \ge (1*a^2+1*a+1*1)^2 \Leftrightarrow \\
                3*(a^4+a^2+1) \ge (a^2+a+1)^2
            \)
        </p>
    </details>
    <details>
        <summary>Solution 2 - Titu's Lemma</summary>
        <p class="mpc">
            \(
                \frac{a^4}{1}+\frac{a^2}{1}+\frac{1}{1} \ge \frac{(a^2+a+1)^2}{3} \Leftrightarrow \\
                3*(a^4+a^2+1) \ge (a^2+a+1)^2
            \)
        </p>
    </details>
</div>
</p>

As a cool exercise, try proving Nesbitt's inequality using Titu's Lemma:

<p>
<div class="mp">
    <p>Let \(a,b,c\) positive real numbers, prove:</p>
    <p class="mpc">
        \(
            \frac{a}{b+c}+\frac{b}{a+c}+\frac{c}{a+b}\ge\frac{3}{2}
        \)
    </p>
    <details>
        <summary>Hint 1</summary>
        <p>\(\frac{a}{b+c}=\frac{a^2}{a(b+c)}\)</p>
    </details>
    <details>
        <summary>Solution</summary>
        <p>To match Titu's Lemma structure we perform the following "trick" for each term on the left-hand side:</p>
        <p class="mpc">
            \(
                \frac{a}{b+c}+\frac{b}{a+c}+\frac{c}{a+b}=\frac{a^2}{a(b+c)}+\frac{b^2}{b(a+c)}+\frac{c^2}{c(a+b)}
            \)
        </p>
        <p>So our desired inequality becomes:</p>
        <p class="mpc">
            \(
                \frac{a^2}{a(b+c)}+\frac{b^2}{b(a+c)}+\frac{c^2}{c(a+b)} \ge \frac{(a+b+c)^2}{2(ab+bc+ca)} = \frac{a^2+b^2+c^2+2(ab+bc+ca)}{2(ab+bc+ca)} = \\ 
                = 1 + \frac{a^2+b^2+c^2}{2(ab+bc+ca)} \ge \frac{3}{2}
            \)
        </p>
        <p>The last relationship is true because we've already know that: \(\frac{a^2+b^2+c^2}{2(ab+bc+ca)}\ge\frac{1}{2}\)</p>
    </details>
</div>
</p>

Two of the problems we've solved so far become "one-liners" just by applying Titu's Lemma directly:

<p>
<div class="mp">
<p>Let \(a, b, c\) be positive real numbers, and \(a+b+c=3\). Prove that:</p>
<p class="mpc">
    \(
        \frac{1}{a+b}+\frac{1}{b+c}+\frac{1}{c+a} \ge \frac{3}{2}
    \)
</p>
</div>
</p>

<p>
<div class="mp">
<p>Let \(a,b,c,x,y,z\) be positive real numbers, and \(x+y+z=a+b+c=1\). Prove that:</p>
<p class="mpc">
\(
    \frac{1}{ax+by+cz}+\frac{1}{cx+ay+bz}+\frac{1}{bx+cy+az} \ge 9
\)
</p>
</div>
</p>

To enforce the idea of the power behind Titu's Lemma, let's try to solve some "harder" inequality problems the "hard way" (using tricks and clever manipulations), and then the easy way (using Titu's Lemma):

<p>
<div class="mp">
<p>Let \(x,y,z\) be positive real numbers. Prove that:</p>
<p class="mpc">
\(
    \frac{y^2+z^2}{x}+\frac{z^2+x^2}{y}+\frac{x^2+y^2}{z} \ge 2(x+y+z)
\)
</p>
<details>
    <summary>Hint 1</summary>
    <p>This hint is relevant fors both solutions:</p>
    <p class="mpc">
    \(
        \frac{y^2+z^2}{x}+\frac{z^2+x^2}{y}+\frac{x^2+y^2}{z} = \frac{y^2}{x}+\frac{z^2}{x}+\frac{x^2}{y}+\frac{z^2}{y}+\frac{x^2}{z}+\frac{y^2}{z}
    \)
    </p>
</details>
<details>
    <summary>Solution 1 - Clever Tricks</summary>
    <p>We start by splitting up the fractions</p>
    <p class="mpc">
        \(
         \frac{y^2+z^2}{x}+\frac{z^2+x^2}{y}+\frac{x^2+y^2}{z} = \frac{y^2}{x}+\frac{z^2}{x}+\frac{x^2}{y}+\frac{z^2}{y}+\frac{x^2}{z}+\frac{y^2}{z}           
        \)
    </p>
    <p>Then use one of the listed identities:</p>
    <p class="mpc">
        \(
            x^3+y^3=(x+y)(\underbrace{x^2-xy+y^2}_{\ge xy}) \ge (x+y)xy
        \)
    </p>
    <p>The fact that \(x^2-xy+y^2 \ge xy\) is dirrect consequence of the AM-GM inequality.</p>
    <p>We didivde both sides with \(xy\):</p>
    <p class="mpc">
        \(
            \frac{x^2}{y}+\frac{y^2}{x} \ge x+y
        \)
    </p>
    <p>In a similar fashion:</p>
    <p class="mpc">
    \(
        \begin{cases}
            \frac{y^2}{z}+\frac{z^2}{y} \ge y+z \\
            \frac{z^2}{x}+\frac{x^2}{z} \ge x+z
        \end{cases}
    \)
    </p>
    <p>If we sum-up the three inequalities, the inequality is proven:</p>
    <p class="mpc">
    \(
        \underbrace{\frac{x^2}{y} + \frac{y^2}{x}}_{\ge x+y} + \underbrace{\frac{y^2}{z}+\frac{z^2}{y}}_{\ge z+y} + \underbrace{\frac{z^2}{x}+\frac{x^2}{z}}_{\ge x+z} \ge 2(x+y+z)
    \)
    </p>
</details>
<details>
    <summary>Solution 2 - Titu's Lemma</summary>
    <p>We rewrite the left-hand side:</p>
    <p class="mpc">
    \(
        \frac{y^2+z^2}{x}+\frac{z^2+x^2}{y}+\frac{x^2+y^2}{z} = \frac{y^2}{x}+\frac{z^2}{x}+\frac{x^2}{y}+\frac{z^2}{y}+\frac{x^2}{z}+\frac{y^2}{z}
    \)
    </p>
    <p>After applying Titu's Lemma:</p>
    <p class="mpc">
    \(
        \frac{y^2}{x}+\frac{z^2}{x}+\frac{x^2}{y}+\frac{z^2}{y}+\frac{x^2}{z}+\frac{y^2}{z} \ge \frac{(y+z+x+z+x+y)^2}{x+x+y+y+z+z} \Leftrightarrow \\
        \frac{y^2}{x}+\frac{z^2}{x}+\frac{x^2}{y}+\frac{z^2}{y}+\frac{x^2}{z}+\frac{y^2}{z} \ge \frac{4(x+y+z)^2}{2(x+y+z)} = 2(x+y+z)
    \)
    </p>
</details>
<details>
    <summary>Source</summary>
    <p>RMO 2014, India </p>
</details>
</div>
</p>

The next problems are little more difficult, but Titu's Lemma plays a special role in simplifying them:

<p>
    <div class="mp">
        <p>Let \(a,b,c\) positive real numbers, prove that:</p>
        <p class="mpc">
            \(
                A = \frac{a^2}{(a+b)(a+c)}+\frac{b^2}{(b+c)(c+a)}+\frac{c^2}{(c+a)(c+b)} \ge \frac{3}{4}
            \)
        </p>
        <details>
            <summary>Solution</summary>
            <p>We can dirrectly apply Titu's Lemma:</p>
            <p class="mpc">
                \(
                    A \ge \frac{(a+b+c)^2}{(a^2+b^2+c^2)+3(ab+bc+ca)} \Leftrightarrow \\
                    A \ge \frac{(a+b+c)^2}{(a+b+c)^2 + (ab+bc+ca)} \Leftrightarrow \\
                    A \ge \frac{1}{1+\frac{ab+bc+ca}{(a+b+c)^2}}
                \)
            </p>
            <p>At this step, it's enough to prove: \(3(ab+bc+ca)\le(a+b+c)^2\), which is a direct consequence of \(a^2+b^2+c^2 \ge ab + bc + ca\)</p>
            <p>Equality holds if \(a=b=c=1\).</p>
        </details>
        <details>
            <summary>Source</summary>
            <p>Crotia Math Olympiad, 2004</p>    
        </details>
    </div>
</p>

<p>
    <div class="mp">
        <p>Let \(x_1, x_2, \dots, x_n\) positive real numbers, \(\sum_{i=1}^{n}\frac{1}{x_i}=k\), where is k fixed positive real number, prove that:</p>
        <p class="mpc">
            \(
                \sum_{i=1}^{n}(x_i+\frac{1}{x_i})^2 \ge \frac{(n^2+k^2)^2}{nk^2}
            \)
        </p>
        <details>
            <summary>Hint 1</summary>
            <p>We can apply Titu's Lemma in the following manner:</p>
            <p class="mpc">
            \(
                \sum_{i=1}^{n}\frac{(x_i+\frac{1}{x_i})^2}{1} \ge \frac{(\sum_{i=1}^n x_i + \sum_{i=1}^n \frac{1}{x_i})^2}{\underbrace{1+\dots+1}_{n}}
            \)
            </p>
        </details>
        <details>
            <summary>Solution</summary>
            <p>After applying Titu's Lemma:</p>
            <p class="mpc">
                \(
                    \sum_{i=1}^{n}\frac{(x_i+\frac{1}{x_i})^2}{1} \ge \frac{(\sum_{i=1}^n x_i + \sum_{i=1}^n \frac{1}{x_i})^2}{\underbrace{1+\dots+1}_{n}} \Leftrightarrow \\
                    \sum_{i=1}^{n}\frac{(x_i+\frac{1}{x_i})^2}{1} \ge \frac{(\sum_{i=1}^n x_i + k)^2}{n} \Leftrightarrow \\
                    \sum_{i=1}^{n}\frac{(x_i+\frac{1}{x_i})^2}{1} \ge \frac{(\frac{n^2}{k}+ k)^2}{n} \Leftrightarrow \\
                    \sum_{i=1}^{n}\frac{(x_i+\frac{1}{x_i})^2}{1} \ge \frac{(n^2+k^2)^2}{nk^2}
                \)
            </p>
            <p>Equality holds if \(x_1=\dots=x_n=1\) and \(n=k\).</p>
            <p>If you are wondering why \(\sum_{i=1}^nx_i \ge \frac{n^2}{k}\), apply the CBS inequality between \((x_1,\dots,x_n)\) and \((\frac{1}{x_1},\dots,\frac{1}{x_n})\).</p>
        </details>
        <details>
            <summary>Source</summary>
            <p>Andrei N. Ciobanu</p>
        </details>
    </div>
</p>

<p>
    <div class="mp">
        <p>Let \(a,b,c \in (0, \infty)\), and \(abc=\frac{1}{3}\). Prove:</p>
        <p class="mpc">
            \(
                \frac{2ab}{a+b}+\frac{2bc}{b+c}+\frac{2ca}{c+a} \ge \frac{a+b+c}{a^3+b^3+c^3}
            \)
        </p>
        <details>
            <summary>Hint 1</summary>
            <p>If \(abc=\frac{1}{3}\) then \(ab=\frac{1}{3c}, bc=\frac{1}{3a}, ca=\frac{1}{3b}\). How can we use this?</p>
        </details>
        <details>
            <summary>Hint 2</summary>
            <p>Don't forget the fact \(a^3+b^3 \ge ab(a+b)\).</p>
        </details>
        <details>
            <summary>Solution</summary>
            <p>We can write:</p>
            <p class="mpc">
                \(
                    \frac{2ab}{a+b}+\frac{2bc}{b+c}+\frac{2ca}{c+a} = \frac{2}{3c(a+b)} + \frac{2}{3a(b+c)} + \frac{2}{3b(c+a)} = \\
                    = \frac{2}{3}[\frac{1}{c(a+b)} + \frac{1}{a(b+c)} + \frac{1}{b(c+a)}] = \frac{2}{3}(\frac{1}{ca+cb}+\frac{1}{ab+ac}+\frac{1}{bc+ba})
                    \overbrace{\ge}^{\text{Titu's}} \frac{2}{3}*\frac{(1+1+1)^2}{2(ab+bc+ca)} 
                \)
            </p>
            <p>So let's try proving the following:</p>
            <p class="mpc">
                \(
                    \frac{3}{ab+bc+ca} \overbrace{\ge}^{?} \frac{a+b+c}{a^3+b^3+c^3} \Leftrightarrow \\
                    3(a^3+b^3+c^3) \overbrace{\ge}^{?} (a+b+c)(ab+bc+ca)
                \)
            </p>
            <p>At this point we will use the following inequalities (note: \(a^3+b^3 \ge ab(a+b)\) was already proven as a previous exercise):</p>
            <p class="mpc">
                \(
                    \begin{cases}
                        a^3+b^3 \ge ab(a+b) \\
                        b^3+c^3 \ge bc(b+c) \\
                        c^3+a^3 \ge ca(c+a) \\
                        a^3+b^3+c^3 \ge 3abc
                    \end{cases}
                \)
            </p>
            <p>If we sum-up all inequalities:</p>
            <p class="mpc">
                \(
                    3(a^3+b^3+c^3) \ge ab(a+b)+bc(b+c)+ca(c+a)+3abc \Leftrightarrow \\
                    3(a^3+b^3+c^3) \ge ab(a+b) + abc + bc(b+c) + abc + ca(c+a) + abc \Leftrightarrow \\
                    3(a^3+b^3+c^3) \ge ab(a+b+c)+bc(a+b+c) + ca(a+b+c) \Leftrightarrow \\
                    3(a^3+b^3+c^3) \ge (a+b+c)(ab+bc+ca) 
                \)
            </p>
            <p>Which is the inequality we had to prove.</p>
        </details>
    </div>
</p>

<p>
    <div class="mp">
        <p>Let \(a,b,c\) positive real numbers, prove:</p>
        <p class="mpc">
            \(
                \frac{a^2+1}{b+c}+\frac{b^2+1}{a+c}+\frac{c^2+1}{a+b} \ge 3
            \)
        </p>
        <details>
            <summary>Hint 1</summary>
            <p>Split each term like \(\frac{a^2+1}{b+c}=\frac{a^2}{b+c}+\frac{1}{b+c}\) and apply Titu's Lemma for each group.</p>
        </details>
        <details>
            <summary>Solution</summary>
            <p>After applying Titu's Lemma:</p>
            <p class="mpc">
                \(
                    \frac{a^2+1}{b+c}+\frac{b^2+1}{a+c}+\frac{c^2+1}{a+b} \ge \frac{(a+b+c)^2+9}{2(a+b+c)} 
                \)
            </p>
            <p>So we need to prove:</p>
            <p class="mpc">
                \(
                    \frac{(a+b+c)^2+9}{2(a+b+c)} \ge 3
                \)
            </p>
            <p>We perform the following substitution: \(a+b+c=x\), then:</p>
            <p class="mpc">
                \(
                    x^2-6x+9 \ge 0 \Leftrightarrow (x-3)^3 \ge 0
                \)
            </p>
            <p>It's obvious \((x-3)^2\ge0\).</p>
            <p>Equality holds when \(a+b+c=3\) and \(a=b=c=1\).</p>
        </details>
        <details>
            <summary>Source</summary>
            <p>RMO 2006</p>
        </details>
    </div>
</p>


# Bernouli's Inequality

<p>
<div class="mp">
<p>Let \( a,b,c \in [1, \infty) \). Prove:</p>
<p class="mpc">
\(
    b\ln(\frac{a+1}{\sqrt[b]{b}})+c\ln(\frac{1+b}{\sqrt[c]{c}})+a\ln(\frac{1+c}{\sqrt[a]{a}}) \ge 3\ln 2
\)
</p>
<p>Andrei N. Ciobanu</p>
</div>
</p>
---

# Free resources around the web:

* [Basics Of Olympiad Inequalities, Samin Riasat](https://web.williams.edu/Mathematics/sjmiller/public_html/161/articles/Riasat_BasicsOlympiadInequalities.pdf)
* [Eeshan Banerjee, Titu's Lemma](file:///home/andrei/down/titus_lemma.pdf)
* [Introduction to Olympiad Inequalities, Sanja Simonovikj](https://esp.mit.edu/download/8a5f8efe-59f5-407d-9252-607ace7aa190/M11250_Intro%20to%20ol%20ineq%20hssp.pdf)
* [Titu's Lemma, Pankaj Agarwal](https://aamonline.org.in/ganit-bikash/gb/volume-67/10-titu-s-lemma-Pankaj-Agarwal.pdf)
* [Mathematical Inequalities, Volume 1, Symmetrical Polynomial Inequalities, Vasile Cirtoaje](http://ace.upg-ploiesti.ro/membri/vcirtoaje/math_ineq_1.pdf)
* [Mathematical Inequalities, Volume 2, Symmetric Rational and Nonrational Inequalities, Vasile Cirtoaje](http://ace.upg-ploiesti.ro/membri/vcirtoaje/math_ineq_2.pdf)
* [Mathematical Inequalities, Volume 3, Cyclic and Noncyclic Inequalities, Vasile Cirtoaje](http://ace.upg-ploiesti.ro/membri/vcirtoaje/math_ineq_3.pdf)
* [Mathematical Inequalities, Volume 4, Extensions and Refinements of Jensen's Inequality, Vasile Cirtoaje](http://ace.upg-ploiesti.ro/membri/vcirtoaje/math_ineq_4.pdf)
* [Mathematical Inequalities, Volume 5, Other Recent Methods For Creating and Solving Inequalities, Vasile Cirtoaje](http://ace.upg-ploiesti.ro/membri/vcirtoaje/math_ineq_5.pdf)