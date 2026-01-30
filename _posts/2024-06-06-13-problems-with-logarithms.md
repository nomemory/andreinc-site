---
title: "A selection of problems with logarithms"
date: "2024-06-06"
classes: wide
comments: true
excerpt: "A nice selection of problems with logarithms. As the title says."
usekatex: true
custom-css-list:
    - "/assets/css/math.css"
categories:
- "nontech"
- "math"
tags:
- "math"
- "logarithms"
---

In the landscape of the Romanian 10th-grade Math Olympiad, **logarithms** are a distinct and recurring theme. While they don't dominate the entire curriculum, a problem involving them is bound to appear, often requiring a deep understanding of algebraic inequalities and identities.

This collection is curated specifically as a training ground for that level. The problems below are a mix of the new and the battle-tested. Some are original compositions/exercises I designed to explore specific algebraic relationships. 

Others are drawn directly from past Local or Regional contest phases, selected because they capture the rigor required for competition.

Whether you are looking for a fresh challenge or revisiting classic techniques, these exercises are designed to help you spot the patterns necessary for the Olympiad.

---

# The exercises

<p>
<div class="mp" id="plg01">
<p><a class="mpl" href="#plg01">Problem LG01</a></p> 
<p>Let \(a,b,c \in (0, \infty) \setminus \{1\}\) such that \(abc \neq 1\). Given the following relationships:</p>
<p>
    \[
        x = \log_b a
    \]
    \[
        y = \log_c a
    \]
</p>
<p>Express \(\log_{abc} a\) in terms of \(x, y\) (specifically, find the relationship between \(\log_{abc} a\) and the given variables).</p>
<details>
    <summary>Hint 1</summary>
    <p>When dealing with multiple logarithms that share the same argument \(a\), but have different bases \(b, c, abc\), the most effective strategy is to use the Reciprocal Property. This allows to move the common variable \(a\) into the base position, making the addition of terms possible.</p>
</details>
<details> 
    <summary>Solution</summary>
    <p>Using the known property \(\log_n m = \frac{1}{\log_m n}\), we rewrite our known values:</p>
    <p>
        \[
            \log_a b = \frac{1}{\log_b a} = \frac{1}{x}
        \]
        \[
            \log_a c = \frac{1}{\log_c a} = \frac{1}{y}
        \]
    </p>
    <p>Expand using the "Product Rule":</p>
    <p>
        \[
            \log_{abc} a = \frac{1}{\log a (abc)} = \frac{1}{\log_a a  + \log_a b + \log_a c} = 
        \]
        \[
             = \frac{1}{1+\frac{1}{x}+\frac{1}{y}} = \frac{xy}{xy+x+y}
        \]
    </p>
</details>
</div>
</p>

<p>
<div class="mp" id="plg02">
<p><a class="mpl" href="#plg02">Problem LG02</a></p> 
<p>Let \(a,b \in (0, \infty) \setminus \{1\}\). Given the following equations involving a common power of n:</p>
<p>
    \[
        a^x = \left(ab\right)^n = b^y
    \]
</p>
<p>Prove that: \(\frac{1}{x}+\frac{1}{y}=\frac{1}{n}\)</p>
<details>
    <summary>Hint 1</summary>
    <p>When you see variables in exponents (like \(x,y,n\)) and the goal involves their reciprocals \( \left(\frac{1}{x}, \frac{1}{y}, \frac{1}{n}\right)\), the most direct path is to convert the exponential equations into logarithmic form. This moves the variables from the "ceiling" to the "floor", so they can be manipulated algebraically.</p>
</details>
<details> 
    <summary>Solution</summary>
    <p>Starting with the first equation, we use logarithms to "isolate" \(x\) and \(y\):</p>
    <p>
        \[
            a^x = (ab)^n \implies x = \log_a (ab)^n = \log_a \left(a^n\cdot b^n\right) = 
        \]
        \[
            = n \log_a a + n \log_a b = n \cdot \left(1 + \log_a b\right)
        \]
        \[
            b^y = (ab)^n \implies y = \log_b (ab)^n = \log_b \left(a^n \cdot b^n\right) = 
        \]
        \[
            = n \log_b a  + n \log_b b = n \cdot \left(1+ \log_b a\right)
        \]
    </p>
    <p>To make \(x\) "compatible" with \(y\), we convert \(\log_b a\) to \(\frac{1}{\log_a b}\):</p>
    <p>
        \[
            y = n \cdot \left(1+\log_b a\right) = n \cdot \left(1 + \frac{1}{\log_a b}\right) = 
        \]
        \[
            = n \cdot \frac{1+\log_a b}{\log_a b}
        \]
    </p>
    <p>Now we substitute the expressions for \(x\) and \(y\) into the reciprocal sum:</p>
    <p>
        \[
            \frac{1}{x} + \frac{1}{y} = \frac{1}{n \cdot \left(1  + \log_a b \right)} + \frac{\log_a b}{n \cdot \left(1+\log_a b\right)} = 
        \]
        \[
            = \frac{1+\log_a b}{n \cdot \left(1+\log_a b\right)} = \frac{1}{n}
        \]
    </p>
</details>
<details>
    <summary>Note</summary>
    <p>After giving this more thought, a simpler solution without logaritgms exists. Can can you find it ?</p>
</details>
</div>
</p>

<p>
<div class="mp" id="plg03">
<p><a class="mpl" href="#plg03">Problem LG03</a></p> 
<p>Let \(n \in \mathbb{N}\) and \(n > 2\). Prove the following identity:</p>
<p>
    \[
        \sum_{i=2}^n \frac{1}{\log_i n} = \prod_{i=n+1}^{n!} \log_{i-1} i
    \]
</p>
<details> 
    <summary>Solution</summary>
    <p>We analyze the Left-Hand Side (LHS) and Right-Hand Side (RHS) independently.</p>
    <p>
        \[
        \sum_{i=2}^{n} \frac{1}{\log_i n} = \log_n 2 + \log_n 3 + \log_n 4 + \dots + \log_n n =
        \]
        \[
            = \log_n 2  + \log_n 3 + \dots + \log_n n = \log_n (2 \cdot 3 \cdot 4 \cdot \dots \cdot n) = \log_n \left(n!\right)
        \]
    </p>
    <p>At the same time, the product is defined from \(i = n+1\) to \(n!\). Let's expand the first few terms and the final term:</p>
    <p>
    \[
    \prod_{i=n+1}^{n!} \log_{i-1} i = \log_n(n+1) \cdot \log_{n+1}(n+2) \cdot \log_{n+2}(n+3) \dots \log_{n!-1}(n!)
    \]
    </p>
    <p>We apply the Chain Rule for Logarithms, which states that \(\log_a b \cdot \log_b c = \log_a c\). This creates a telescoping effect where the argument of one logarithm cancels the base of the next:</p>
    <p>
    \[
        \prod_{i=n+1}^{n!}[\log_{i-1}i] = \underbrace{\underbrace{\log_n(n+1) * \log_{n+1}(n+2)}_{=\log_n(n+2)} * .}_{=\log_nk}.. * \log_{n!-1}(n!) \Leftrightarrow \\
        \prod_{i=n+1}^{n!}[\log_{i-1}i] = \log_n(n!)
    \]
    </p>
    <p>We can conclude that:</p>
    <p>
    \[
        \sum_{i=2}^n \frac{1}{\log_i n} = \log_n (n!) = \prod_{i=n+1}^{n!} \log_{i-1} i
    \]
    </p>
</details>
</div>
</p>


<p>
<div class="mp" id="plg04">
<p><a class="mpl" href="#plg04">Problem LG04</a></p> 
<p>Let \(a,b,m \in (0, \infty) \setminus \{1\}\). Given the equation:</p>
<p>
    \[
        a^{\log_m x} \cdot x^{\log_m b} = ab
    \]
</p>
<p>Prove that \(x=m\).</p>
<details>
    <summary>Hint 1</summary>
    <p>Rewrite \(a,b,x\) in terms of base \(m\).</p>
</details>
<details> 
    <summary>Solution</summary>
    <p>By the definition of logarithms, any number \(N\) can be written as \(N=m^{\log_m N}\):</p>
    <p>
        \[
            a = m^{\log_m a}
        \]
        \[
            b = m^{\log_m b}
        \]    
        \[
            x = m^{\log_m x}
        \]
        \[
            (ab) = m^{\log_{m} ab}
        \]
    </p>
    <p>Substitute these into the original equation \(a^{\log_m x} \cdot x^{\log_m b}\):</p>
    <p>
        \[
        (m^{\log_m a})^{\log_m x} \cdot (m^{\log_m x})^{\log_m b} = m^{(\log_m a \cdot \log_m x)} \cdot m^{(\log_m x \cdot \log_m b)} =
        \]
        \[
        = m^{(\log_m a \cdot \log_m x) + (\log_m x \cdot \log_m b)} = m^{\log_m x (\log_m a + \log_m b)} =          
        \]
        \[
        = m^{\log_m x \cdot \log_m(ab)}
        \]
    </p>
    <p>Recall that \(ab = m^{\log_m(ab)}\). Our equation is now:</p>
    <p>
        \[
        m^{\log_m x \cdot \log_m(ab)} = m^{\log_m(ab)} \Leftrightarrow
        \]
        \[
        \log_m x \cdot \log_m(ab) = \log_m(ab) \Leftrightarrow
        \]
        \[
        \log_m x = 1 \implies x = m
        \]
    </p>
</details>
</div>
</p>

<p>
<div class="mp" id="plg05">
<p><a class="mpl" href="#plg04">Problem LG05</a></p> 
<p>Let \(a,b,c,x \in (0, \infty) \setminus \{1\}\). Given the relationship:</p>
<p>
    \[
        2 \cdot \log_b x = \log_c x - \log_a x
    \]
</p>
<p>Prove that:</p>
<p>
    \[
        c^2 = \left( \frac{a}{c} \right)^{\log_a b}
    \]
</p>
<details>
    <summary>Hint 1</summary>
    <p>Notice that the variable \(x\) is consistent as the argument across all terms, but the bases (\(a, b, c\)) are mismatched. Logarithms are only additive when their bases are identical.</p>
</details>
<details>
    <summary>Solution</summary>
    <p>Using the "reciprocal property" \(\log_n m = \frac{1}{\log_m n}\), we rewrite the equation to unify the terms under base \(x\):</p>
    <p>
        \[ 
            \frac{2}{\log_x b} = \frac{1}{\log_x c} - \frac{1}{\log_x a} = \frac{\log_x a - \log_x c}{\log_x a \cdot \log_x c}
        \]
    </p>
    <p>To get rid of the fractions we cross-multiply:</p>
    <p>
        \[
            2(\log_x a \cdot \log_x c) = \log_x b (\log_x a - \log_x c) \Leftrightarrow
        \]
        \[
             2\log_x c = \frac{\log_x b}{\log_x a} \cdot (\log_x a - \log_x c) \Leftrightarrow
        \]    
        \[
             2 \log_x c = \log_a b \cdot \log_x \left( \frac{a}{c} \right) \Leftrightarrow
        \]
        \[
            \log_x (c^2) = \log_x \left[ \left( \frac{a}{c} \right)^{\log_a b} \right] \Leftrightarrow
        \]
        \[
            c^2 = \left( \frac{a}{c} \right)^{\log_a b}
        \]
    </p>
</details>
</div>
</p>

<p>
<div class="mp" id="plg06">
<p><a class="mpl" href="#plg04">Problem LG06</a></p> 
<p>Let \(a,b,c \in (0, \infty) \setminus \{1\}\). Find the value of \(x\) that satisfies the following equation:</p>
<p>
    \[
        a^{\ln \frac{b}{c}} \cdot b^{\ln \frac{c}{a}} \cdot c^{\ln \frac{a}{x}} = 1
    \]
</p>
<details>
    <summary>Solution</summary>
    <p>Apply \(\ln\) to the entire equation. Since \(\ln(1) = 0\), we have:</p>
    <p>
        \[ 
            \ln \left( a^{\ln \frac{b}{c}} \cdot b^{\ln \frac{c}{a}} \cdot c^{\ln \frac{a}{x}} \right) = 0 
        \]
    </p>
    <p>Using the rules \(\ln(MN) = \ln M + \ln N\) and \(\ln(M^k) = k \ln M\):</p>
    <p>
        \[ 
            \ln\left(\frac{b}{c}\right)\ln a + \ln\left(\frac{c}{a}\right)\ln b + \ln\left(\frac{a}{x}\right)\ln c = 0 
        \]
    </p>
    <p>Expand the internal fractions using \(\ln(M/N) = \ln M - \ln N\):</p>
    <p>
    \[ 
        (\ln b - \ln c)\ln a + (\ln c - \ln a)\ln b + (\ln a - \ln x)\ln c = 0 \Leftrightarrow
    \]
    \[
        (\ln b \ln a - \ln c \ln a) + (\ln c \ln b - \ln a \ln b) + (\ln a \ln c - \ln x \ln c) = 0 \Leftrightarrow
    \]
    \[ 
        \underbrace{\ln a \ln b - \ln a \ln b}_{0} + \underbrace{\ln a \ln c - \ln a \ln c}_{0} + \ln b \ln c - \ln x \ln c = 0 \Leftrightarrow
    \]
    \[
         \ln b \ln c - \ln x \ln c = 0 \Leftrightarrow
    \]
    \[
        \ln c (\ln b - \ln x) = 0 \Leftrightarrow
    \]
    \[ 
        \ln x = \ln b \Leftrightarrow
    \]
    \[
        x = b
    \]
    </p>
</details>
</div>
</p>

<p>
<div class="mp" id="plg07">
<p><a class="mpl" href="#plg07">Problem LG07</a></p> 
<p>Solve the equation:</p>
<p>
    \[
        (\log_a x)^{\log_b x} = (\log_b x)^{\log_a x}
    \]
</p>
<p>where \(a, b>0\) and \(a, b \neq 1\).</p>
<details>
    <summary>Solution 1</summary>
    <p>Not all math questions have "nice" answers.</p>
    <p>Given:</p>
    <p>
        \[ (\log_a x)^{\log_b x} = (\log_b x)^{\log_a x} \]
    </p>
    <p>Taking \(\log_b\) on both sides:</p>
    <p>
        \[
            \log_b \left[(\log_a x)^{\log_b x}\right] = \log_b \left[(\log_b x)^{\log_a x}\right] \Leftrightarrow
        \]
        \[
            (\log_b x) \cdot \log_b(\log_a x) = (\log_a x) \cdot \log_b(\log_b x)
        \]
    </p>
    <p>Using the change of base formula \(\log_a x = \frac{\log_b x}{\log_b a}\):</p>
    <p>
        \[
             (\log_b x) \cdot \log_b(\log_a x) = \frac{\log_b x}{\log_b a} \cdot \log_b(\log_b x) \Leftrightarrow
        \] 
        \[ 
            (\log_b x) \cdot \log_b(\frac{\log_b x}{\log_b a}) = \frac{\log_b x}{\log_b a} \cdot \log_b(\log_b x) 
        \]
    </p>
    <p>Assuming \(x \neq 1\) (which is a trivial solution), we divide both sides by \(\log_b x\):</p>
    <p>
        \[ 
            \log_b\left(\frac{\log_b x}{\log_b a}\right) = \frac{\log_b(\log_b x)}{\log_b a} \Leftrightarrow
        \]
    </p>
    <p>
        \[ 
            \log_b(\log_b x) - \log_b(\log_b a) = \frac{\log_b(\log_b x)}{\log_b a} 
        \]
    </p>
    <p>Isolate the terms involving \(x\):</p>
    <p>
    \[
        \log_b(\log_b x) \left(1 - \frac{1}{\log_b a}\right) = \log_b(\log_b a) \Leftrightarrow
    \]  
    </p>
    <p>
        \[ 
            \log_b(\log_b x) \left(\frac{\log_b a - 1}{\log_b a}\right) = \log_b(\log_b a) \Leftrightarrow
        \]
    </p>
    <p>
        \[ 
            \log_b(\log_b x) = \frac{\log_b(\log_b a) \cdot \log_b a}{\log_b a - 1} 
        \]
    </p>
    <p>Finally, exponentiate twice to solve for \(x\):</p>
    <p>
        \[ 
            x = b^{b^{\left( \frac{\log_b a \cdot \log_b(\log_b a)}{\log_b a - 1} \right)}} 
        \]
    </p>
    <p>Additionally, \(x = 1\) is a solution for any \(a, b\) where the logarithms are defined.</p>
</details>
<details>
    <summary>Solution 2</summary>
    <p>User @mgologanu actually challenged the fact that not all problems have nice solutions. We can make the answer look nicer, by keeping the symmetry.</p>
    <p>
        First, we take the natural logarithm (\(\ln\)) of both sides to bring the exponents down. The choice of using \(\ln\) belongs to him:
    </p>
    <p>
        \[
            \log_b x \cdot \ln(\log_a x) = \log_a x \cdot \ln(\log_b x) \iff
        \]
    </p>
    <p>
        \[
            \iff \frac{\ln x}{\ln b} \cdot \ln\left(\frac{\ln x}{\ln a}\right) = \frac{\ln x}{\ln a} \cdot \ln\left(\frac{\ln x}{\ln b}\right) \iff
        \]
    </p>
    <p>
        Assuming \(x \neq 1\) (since \(x=1\) is a trivial solution):
    </p>
    <p>
    \[
       \iff \frac{1}{\ln b} \left[ \ln(\ln x) - \ln(\ln a) \right] = \frac{1}{\ln a} \left[ \ln(\ln x) - \ln(\ln b) \right] \iff
    \]
    </p>
    <p>
    \[
        \iff \ln a \left[ \ln(\ln x) - \ln(\ln a) \right] = \ln b \left[ \ln(\ln x) - \ln(\ln b) \right] \iff
    \]
    </p>
    <p>
    \[
        \iff \ln a \ln(\ln x) - \ln b \ln(\ln x) = \ln a \ln(\ln a) - \ln b \ln(\ln b) \iff
    \]
    \[
        \iff \ln(\ln x) (\ln a - \ln b) = \ln a \ln(\ln a) - \ln b \ln(\ln b) \iff
    \]
    </p>
    <p>
        Solve for \(\ln(\ln x)\):
    </p>
    <p>
        \[
            \ln(\ln x) = \frac{\ln a \ln(\ln a) - \ln b \ln(\ln b)}{\ln a - \ln b} \iff
        \]
    </p>
    <p>
        \[
            \iff \ln(\ln x) = \ln(\ln a) \cdot \left[ \frac{\ln a}{\ln a - \ln b} \right] - \ln(\ln b) \cdot \left[ \frac{\ln b}{\ln a - \ln b} \right] \iff
        \]
    </p>
    <p>
        \[
            \iff \ln(\ln x) = \ln(\ln a) \left( \frac{1}{1-\frac{\ln b}{\ln a}} \right) + \ln(\ln b) \left( \frac{1}{1-\frac{\ln a}{\ln b}} \right) \iff
        \]
    </p>
    <p>
        \[
            \iff \ln(\ln x) = \ln(\ln a) \left( \frac{1}{1-\log_a b} \right) + \ln(\ln b) \left( \frac{1}{1-\log_b a} \right) \iff
        \]
    </p>
    <p>
        \[
           \iff  \ln(\ln x) = \ln \left[ (\ln a)^{\frac{1}{1 - \log_a b}} \cdot (\ln b)^{\frac{1}{1 - \log_b a}} \right] \iff
        \]
    </p>
    <p>
        Finally, exponentiate both sides to remove the outer logarithm:
    </p>
    <p>
    \[
        \ln x = (\ln a)^{\frac{1}{1 - \log_a b}} \cdot (\ln b)^{\frac{1}{1 - \log_b a}}
    \]
    </p>
    <p>\(x\) from the solutions is "equivalent".</p>
</details>
</div>
</p>

<p>
<div class="mp" id="plg08">
<p><a class="mpl" href="#plg08">Problem LG08</a></p>
<p>Let \(a,b,m \in (0,1)\) or \(a,b,m \in (1, \infty)\). Prove that:</p>
<p>
    \[
        \frac{2\log_{ab}m}{\sqrt{\log_am \cdot \log_bm}} \le 1
    \]
</p>
<details>
    <summary>Solution</summary>
    <p>Since \( a, b, m \in (0,1) \) or \( (1, \infty) \), all logarithmic terms are positive.</p>
    <p>
        \[
        \begin{aligned}
        \frac{2\log_{ab}m}{\sqrt{\log_am \cdot \log_bm}} \le 1 & \iff 2\log_{ab}m \le \sqrt{\log_am \cdot \log_bm} \\ \\
        & \iff \frac{2}{\log_m(ab)} \le \sqrt{\log_am \cdot \log_bm} \\ \\
        & \iff \frac{2}{\log_ma + \log_mb} \le \sqrt{\log_am \cdot \log_bm} \\ \\
        & \iff \frac{2}{\frac{1}{\log_am} + \frac{1}{\log_bm}} \le \sqrt{\log_am \cdot \log_bm}
        \end{aligned}
        \]
    </p>
    <p>Let \( x = \log_a m \) and \( y = \log_b m \). The inequality becomes:</p>
    <p>
    \[
      \frac{2}{\frac{1}{x} + \frac{1}{y}} \le \sqrt{xy} 
    \]
    </p> 
    <p>The Left Hand Side is the Harmonic Mean of \(x\) and \(y\), and the Right Hand Side is the Geometric Mean.
    Since \( HM \le GM \) for all positive real numbers, the inequality is true (with equality iff \( x=y \)).</p>
</details>
</div>
</p>

<p>
<div class="mp" id="plg09">
<p><a class="mpl" href="#plg09">Problem LG09</a></p>
<p>Let \( a, b, m \in (1, \infty) \), prove that:</p>
<p>
    \[
        \frac{1}{\log_{(a+b)}m} \ge \frac{1}{\log_2m} + \frac{1}{2}\left(\frac{1}{\log_am}+\frac{1}{\log_bm}\right)
    \]
</p>
<details>
    <summary>Solution</summary>
    <p>We start with the inequality we want to prove, and we change the base of all logarithms to \( m \):</p>
    <p>
        \[
            \frac{1}{\log_{a+b}m} \ge \frac{1}{\log_2m} + \frac{1}{2}\left(\frac{1}{\log_am}+\frac{1}{\log_bm}\right) \iff
        \]
        \[
            \iff \log_m(a+b) \ge \log_m 2 + \frac{1}{2}(\log_m a + \log_m b) \iff
        \]
        \[
            \iff \log_m(a+b) - \log_m 2 \ge \log_m\sqrt{ab} \iff
        \]
        \[
            \iff \log_m\left(\frac{a+b}{2}\right) \ge \log_m\sqrt{ab} \iff
        \]
    </p>
    <p>Since the logarithmic function is strictly increasing for a base greater than \(1\), we can compare the arguments directly. This leads to the Arithmetic Mean-Geometric Mean inequality (AM-GM), which is known to be true.</p>
</details>
</div>
</p>

<p>
<div class="mp" id="plg10">
<p><a class="mpl" href="#plg10">Problem LG10</a></p>
<p>Let \(x_1, x_2, \dots, x_n\) be real numbers such that either all \(x_i \in (0,1)\), or all \(x_i \in (1, \infty)\), prove that for any integer \(n \ge 2\):</p>
<p>
    \[
        \sum_{i=1}^{n-1} \log_{x_i} x_{i+1} \ge n - \log_{x_n} x_1
    \]
</p>
<details>
    <summary>Solution</summary>
    <p>We re-arrange the inequality:</p>
    <p>
        \[
            \sum_{i=1}^{n-1} \log_{x_i} x_{i+1} \ge n - \log_{x_n} x_1 \iff
        \]
        \[
            \iff \sum_{i=1}^{n-1} \log_{x_i} x_{i+1} + \log_{x_n} x_1 \ge n
        \]
    </p>
    <p>The left side is now a sum of \( n \) terms. Since all \( x_i \) are in the same interval (either all less than 1 or all greater than 1), every logarithmic term is positive. We can apply the <strong>AM-GM Inequality</strong>:</p>
    <p>
        \[
            \frac{\sum_{i=1}^{n-1} \log_{x_i} x_{i+1} + \log_{x_n} x_1}{n} \ge \sqrt[n]{ \left( \prod_{i=1}^{n-1} \log_{x_i} x_{i+1} \right) \cdot \log_{x_n} x_1 }
        \]
    </p>
    <p>Evaluate the product inside the root using the chain rule for logarithms (\( \log_a b \cdot \log_b c = \log_a c \)):</p>
    <p>
        \[
            \text{Product} = \underbrace{\log_{x_1}x_2 \cdot \log_{x_2}x_3 \cdots \log_{x_{n-1}}x_n}_{\log_{x_1}x_n} \cdot \log_{x_n}x_1 = \log_{x_1}x_n \cdot \log_{x_n}x_1 = 1 \implies
        \]
        \[
            \frac{\text{Sum}}{n} \ge \sqrt[n]{1} = 1 \implies \text{Sum} \ge n
        \]
    </p>
</details>
</div>
</p>

<p>
<div class="mp" id="plg11">
<p><a class="mpl" href="#plg11">Problem LG11</a></p>
<p>Let \( a, b, c \in (0,1) \cup (1, \infty) \). If \( x = \log_b c \), \( y = \log_a c \), and \( m = \log_{abc} c \), prove that:</p>
<p>
    \[
        \left(\frac{1}{m \sqrt{3}} - 1\right) \left(\frac{1}{m \sqrt{3}} + 1\right) \le \frac{1}{x^2} + \frac{1}{y^2}
    \]
</p>
<details>
    <summary>Solution</summary>
    <p>
    First, let's simplify the expression for \( m \) to find a relationship between \( x, y, \) and \( m \).
    </p>
    <p>
    \[
        m = \log_{abc} c \implies \frac{1}{m} = \log_c(abc) \iff
    \]
    \[
        \iff \frac{1}{m} = \log_c a + \log_c b + \log_c c
    \]
    </p>
    <p>Substitute \( x = \log_b c \) and \( y = \log_a c \) using the change of base property \( \log_u v = \frac{1}{\log_v u} \):</p>
    <p>
        \[
            \frac{1}{m} = \frac{1}{\log_a c} + \frac{1}{\log_b c} + 1 \implies \frac{1}{m} = \frac{1}{y} + \frac{1}{x} + 1
        \]
    </p>
    <p>
    Now, apply the <strong>Cauchy-Schwarz Inequality</strong> to the vectors \( \vec{u} = (\frac{1}{x}, \frac{1}{y}, 1) \) and \( \vec{v} = (1, 1, 1) \), this will lead to:
    </p>
    <p>
        \[
            \left( \frac{1}{x} \cdot 1 + \frac{1}{y} \cdot 1 + 1 \cdot 1 \right)^2 \le \left( \frac{1}{x^2} + \frac{1}{y^2} + 1^2 \right) (1^2 + 1^2 + 1^2)
        \]
    </p>
    <p>Substitute \( \frac{1}{m} \) back into the left side:</p>
    <p>
    \[
    \left( \frac{1}{m} \right)^2 \le 3 \left( \frac{1}{x^2} + \frac{1}{y^2} + 1 \right) \iff
    \]
    \[
        \iff \frac{1}{3m^2} \le \frac{1}{x^2} + \frac{1}{y^2} + 1 \iff \frac{1}{3m^2} - 1 \le \frac{1}{x^2} + \frac{1}{y^2} \iff
    \]
    \[
        \left( \frac{1}{m\sqrt{3}} - 1 \right) \left( \frac{1}{m\sqrt{3}} + 1 \right) \le \frac{1}{x^2} + \frac{1}{y^2}
    \]
    </p>
</details>
<details>
    <summary>Source</summary>
    <p>Andrei N. Ciobanu</p>
</details>
</div>
</p>

<p>
<div class="mp" id="plg12">
<p><a class="mpl" href="#plg12">Problem LG12</a></p>
<p>Prove that for any integer \( n \ge 3 \):</p>
<p>
    \[
    \sum_{i=2}^{n-1}\log_i(i+1) \ge \sum_{i=2}^{n-1}\log_i 2 + \frac{n-2}{2}
    \]
</p>
<details>
    <summary>Solution</summary>
    <p>First, bring the two sums together on the left side by subtracting \(\sum_{i=2}^{n-1}\log_i 2\) from both sides:</p>
    <p>
    \[
    \sum_{i=2}^{n-1} \log_i(i+1) - \sum_{i=2}^{n-1} \log_i 2 \ge \frac{n-2}{2}
    \]
    </p>
    <p>Combine the logarithms within the sum:</p>
    <p>
    \[
        \sum_{i=2}^{n-1} \log_i\left(\frac{i+1}{2}\right) \ge \frac{n-2}{2}
    \]
    </p>
    <p>Now, let's analyze the term inside the summation. We can compare the arithmetic mean and geometric mean of the numbers \( i \) and \( 1 \). By the <strong>AM-GM Inequality</strong>:</p>
    <p>
    \[ \frac{i+1}{2} \ge \sqrt{i \cdot 1} = \sqrt{i} = i^{\frac{1}{2}}\]
    </p>
    <p>Since \( i \ge 2 \), the base of the logarithm is greater than 1, so the function is strictly increasing. Taking \( \log_i \) of both sides preserves the inequality:</p>
    <p>
    \[
    \log_i\left(\frac{i+1}{2}\right) \ge \log_i(\sqrt{i}) \implies
    \]
    \[
        \implies \log_i\left(\frac{i+1}{2}\right) \ge \frac{1}{2}
    \]   
    </p>
    <p>Finally, sum this inequality from \( i=2 \) to \( n-1 \). Note that there are exactly \( (n-1) - 2 + 1 = n-2 \) terms in the series:</p>
    <p>
    \[
        \sum_{i=2}^{n-1} \log_i\left(\frac{i+1}{2}\right) \ge \sum_{i=2}^{n-1} \frac{1}{2} = (n-2) \cdot \frac{1}{2} = \frac{n-2}{2}
    \]
    </p>
</details>
<details>
    <summary>Source</summary>
    <p>Andrei N. Ciobanu</p>
</details>
</div>
</p>

<p>
<div class="mp" id="plg13">
<p><a class="mpl" href="#plg13">Problem LG13</a></p>
<p>Consider the set \( M \) defined as:</p>
<p>
    \[
        M = \left\{ x \in (0,1) \cup (1,\infty) \mid 7 \ln^3 x - [\ln x]^3 - \{\ln x\}^3 = \{[\lg x]\} + [\{e^x\}] \right\}
    \]
</p>
<p>Prove that the following inequality holds for any \( x \in M \):</p>
<p>
    \[
        \sum_{k=2}^{2013} \log_k x < \frac{2012^2}{\ln \frac{1}{(2013!)^2}}
    \]
</p>
<p>The notations \([\cdot]\) and \(\{\cdot\}\) represent the integer part (floor) and the fractional part of a real number, respectively.</p>
<details>
    <summary>Solution</summary>
    <p>Before proving the inequality, we have to uncover the actual structure of \(M\), and for that, we need to solve the equation.</p>
    <p>Let's look at the terms on the right side:</p>
    <ul>
        <li>\([\lg x]\) is an integer. The fractional part of any integer is always 0. So, \(\{[\lg x]\} = 0\).</li>
        <li>\(\{e^x\}\) is a fractional part, so by definition it lies in the interval \([0, 1)\). The integer part (floor) of any number in \([0, 1)\) is 0. So, \([\{e^x\}] = 0\).</li>
    </ul>
    <p>In conclusion, \(\{[\lg x]\} + [\{e^x\}]\) is just a fancy way of saying \(0\).</p>
    <p>Thus, the equation can be rewritten as:</p>
    <p>
        \[
            7 \ln^3 x - [\ln x]^3 - \{\ln x\}^3 = 0
        \]
    </p>
    <p>Let's substitute \(a = [\ln x]\) and \(b = \{\ln x\}\). Taking into consideration that \(\ln x = a + b\), we can rewrite the equation as:</p>
    <p>
        \[
            7 (a + b)^3 - a^3 - b^3 = 0 \iff
        \]
        \[
            \iff 6a^3 + 6b^3 + 21ab(a+b) = 0 \iff
        \]
        \[
            \iff 2(a+b)(a^2 - ab + b^2) + 7ab(a+b) = 0 \iff
        \]
        \[
            \iff (a+b)(2a^2 - 2ab + 2b^2) + 7ab(a+b) = 0 \iff
        \]
        \[
            \iff (a+b)(2a^2+5ab+2b^2) = 0 \iff
        \]
        \[
            \iff (a+b)(a+2b)(2a+b) = 0
        \]
    </p>
    <p>It's already good news. We have 3 possible cases where the factors can be zero:</p>
    <p>
        <ul>
            <li>\(a+b=0\), which means that \([\ln x]+\{\ln x\}=\ln x=0 \implies x=1\). We reject this solution, as \(x \in (0,1) \cup (1,\infty)\) per the definition of \(M\);</li>
            <li>\(2a+b = 0 \implies b=-2a\). Since \(b=\{\ln x\} \in [0,1)\) and \(a=[\ln x] \in \mathbb{Z}\), the only solution is when \(a=b=0\). This means \(\ln x = 0 \implies x = 1\), and again this solution is rejected; </li>
            <li>\(a+2b=0\). Since \(b=\{\ln x\} \in [0,1)\) and \(a=[\ln x] \in \mathbb{Z}\), the only valid solution here is \((a=-1, b=\frac{1}{2}) \implies \ln x = -\frac{1}{2} \implies x = \frac{1}{\sqrt{e}}\).</li>
        </ul>
    </p>
    <p>So, in conclusion, \(M=\{\frac{1}{\sqrt{e}}\}\).</p>
    <p>At this point, we need to prove the inequality, taking into consideration that \(\log_k \frac{1}{\sqrt{e}}=\log_k e^{-\frac{1}{2}}=-\frac{1}{2 \ln k}\). The inequality becomes:</p>
    <p>
        \[
            -\frac{1}{2} \sum_{k=2}^{2013} \frac{1}{\ln k} < \frac{2012^2}{\ln \frac{1}{(2013!)^2}} \iff
        \]
        \[
            \iff -\frac{1}{2} \sum_{k=2}^{2013} \frac{1}{\ln k} < - \frac{2012^2}{2 \sum_{k=2}^{2013} \ln k} \iff
        \]
        \[
            \iff \sum_{k=2}^{2013} \frac{1}{\ln k} > \frac{2012^2}{\sum_{k=2}^{2013} \ln k}
        \]
    </p>
    <p>If \(n=2012\) (because mathematicians prefer letters to numbers), the inequality holds thanks to the well-known Cauchy-Schwarz inequality:</p>
    <p>
        \[
            \left( \sum_{k=2}^{n+1} \ln k \right) \left( \sum_{k=2}^{n+1} \frac{1}{\ln k} \right) > (1+1+\dots+1)^2 = n^2
        \]
    </p>
</details>
<details>
    <summary>Source</summary>
    <p>Concursul Județean de Matematică "Cristian S. Calude", ediția XIV-a, Galați, România, 2013</p>
</details>
</div>
</p>

<p>
<div class="mp" id="plg14">
<p><a class="mpl" href="#plg14">Problem LG14</a></p>
<p>Let \( a, b, c, d \in (1, \infty) \). Prove that:</p>
<p>
    \[
        \prod_{\text{cyc}} \log_{\frac{1}{(a+b)^2}} \frac{9}{4\left(\frac{a+b}{2} + c + d\right)^2}  \ge 1
    \]
</p>
<details>
    <summary>Hint 1</summary>
    <p>The notation \(\prod_{\text{cyc}}\) denotes a <strong>cyclic product</strong>. It implies multiplying the given expression by the 3 variations obtained by cyclically shifting the variables \(a \to b \to c \to d \to a\).</p>
    <p>For example, if the first term depends on \((a,b,c,d)\), the second depends on \((b,c,d,a)\), the third on \((c,d,a,b)\), and the last on \((d,a,b,c)\).</p>
    <p>Expanded, the expression is:</p>
    <p>
        \[
        \begin{aligned}
            &\log_{\frac{1}{(a+b)^2}} \frac{9}{4\left(\frac{a+b}{2} + c + d\right)^2} \cdot \log_{\frac{1}{(b+c)^2}} \frac{9}{4\left(\frac{b+c}{2} + d + a\right)^2} \cdot \\
            &\cdot \log_{\frac{1}{(c+d)^2}} \frac{9}{4\left(\frac{c+d}{2} + a + b\right)^2} \cdot \log_{\frac{1}{(d+a)^2}} \frac{9}{4\left(\frac{d+a}{2} + b + c\right)^2} \ge 1
        \end{aligned}
        \]
    </p>
</details>
<details>
    <summary>Hint 2</summary>
    <p>You can simplify the complex terms using the identity: \(\log_{A^n} (B^n) = \log_A B\). This can be derived from standard logarithmic properties.</p>
</details>
<details>
    <summary>Solution</summary>
    <p>We observe that for each term in the product, both the base and the argument can be written as powers with an exponent of \(-2\). We can use Hint 2 to simplify the expressions:</p>
    <p>
        \[
            \begin{aligned}
            \prod_{\text{cyc}} \log_{\frac{1}{(a+b)^2}} \frac{9}{4\left(\frac{a+b}{2} + c + d\right)^2} 
            &= \prod_{\text{cyc}} \log_{\left(\frac{1}{a+b}\right)^2} \left[\frac{3}{2\left(\frac{a+b}{2} + c + d\right)}\right]^2 \\
            &= \prod_{\text{cyc}} \log_{\left(a+b\right)^{-2}} \left[\frac{a+b+2(c+d)}{3}\right]^{-2} \\
            &= \prod_{\text{cyc}} \log_{\left(a+b\right)} \left[\frac{a+b+2c+2d}{3}\right]
            \end{aligned}
        \]
    </p>
    <p>To exploit the symmetry, we regroup the terms in the argument:</p>
    <p>
        \[
            \begin{aligned}
            \prod_{\text{cyc}} \log_{\left(a+b\right)} \left[\frac{a+b+2c+2d}{3}\right] 
            &= \prod_{\text{cyc}} \log_{\left(a+b\right)} \left[\frac{(b+c)+(c+d)+(d+a)}{3}\right]
            \end{aligned}
        \]
    </p>
    <p>Since \( a, b, c, d \in (1, \infty) \), the sums are positive. We apply the <strong>AM-GM inequality</strong> to the argument of the logarithm. Since the base \(a+b > 2\), the logarithm function is increasing, preserving the inequality:</p>
    <p>
        \[
            \begin{aligned}
                \prod_{\text{cyc}} \log_{\left(a+b\right)} \left[\frac{(b+c)+(c+d)+(d+a)}{3}\right] 
                &\geq \prod_{\text{cyc}} \log_{\left(a+b\right)} \sqrt[3]{\left(b+c\right)\cdot\left(c+d\right)\cdot\left(d+a\right)} \\
                &= \prod_{\text{cyc}} \frac{1}{3} \log_{\left(a+b\right)} \left[(b+c)\cdot(c+d)\cdot(d+a)\right] \\
                &= \prod_{\text{cyc}} \left[\frac{\log_{(a+b)} (b+c) + \log_{(a+b)} (c+d) + \log_{(a+b)} (d+a)}{3}\right]
            \end{aligned}
        \]
    </p>
    <p>We now apply the <strong>AM-GM inequality</strong> again, this time to the sum of the logarithms:</p>
    <p>
        \[
            \begin{aligned}
                \prod_{\text{cyc}} \left[\dots\right] 
                &\geq \prod_{\text{cyc}} \sqrt[3]{\log_{(a+b)}(b+c)\cdot\log_{(a+b)}(c+d)\cdot\log_{(a+b)}(d+a)} \\
                &= \sqrt[3]{ \prod_{\text{cyc}} \left( \log_{(a+b)}(b+c)\cdot\log_{(a+b)}(c+d)\cdot\log_{(a+b)}(d+a) \right) }
            \end{aligned}
        \]
    </p>
    <p>Finally, we observe that the terms inside the product cancel out perfectly. We have 12 logarithmic terms that form reciprocal pairs (e.g., \(\log_x y \cdot \log_y x = 1\)):</p>
    <p>
        \[
             = \sqrt[3]{\underbrace{\log_{(a+b)}(c+d) \cdot \log_{(c+d)} (a+b)}_{1} \cdot \dots} = 1
        \]
    </p>
    <p>Since the product is 1, the inequality is proven.</p>
</details>
<details>
    <summary>Source</summary>
    <p>Concursul Interjudețean de Matematică "Cristian S. Calude", ediția a XII-a, Galați, 2011</p>
    <p>Problem authors: Rodica Balan, Dumitru Balan</p>
</details>
</div>
</p>

<p>
<div class="mp" id="plg15">
<p><a class="mpl" href="#plg15">Problem LG15</a></p>
<p>Consider the numbers \( A, B, a, k \) such that \( A > B > a > 1 \) and \( k > 0 \). Prove that:</p>
<p>
    \[
        \log_a \frac{A}{B} + 1 > \log_{B+k} (A+k)
    \]
</p>
<details>
    <summary>Hint 1</summary>
    <p>Try to simplify the inequality by eliminating the \(+1\) from the left side.</p>
</details>
<details>
    <summary>Solution</summary>
    <p>We begin by rewriting the inequality to make the Right-Hand Side (RHS) comparable to the Left-Hand Side (LHS):</p>
    <p>
        \[
            \begin{aligned}
            & \log_a \frac{A}{B} + 1 > \log_{B+k} (A+k) \iff \\
            & \iff \log_a \frac{A}{B} > \log_{B+k} (A+k) - 1 \iff \\
            & \iff \log_a \frac{A}{B} > \log_{B+k} (A+k) - \log_{B+k} (B+k) \iff \\
            & \iff \log_a \frac{A}{B} > \log_{B+k} \left(\frac{A+k}{B+k}\right)
            \end{aligned}
        \]
    </p>
    <p>To prove this strict inequality, we establish an intermediate inequality and then apply the property of transitivity:</p>
    <p>
        \[
            \log_a \frac{A}{B} \overset{\text{?}}{>} \dots > \log_{B+k} \left(\frac{A+k}{B+k}\right)
        \]
    </p>
    <p>Intuitively, we first compare the arguments of the logarithms. We want to check if:</p>
    <p>
        \[ 
            \log_a \frac{A}{B} \overset{\text{?}}{>} \log_a \left(\frac{A+k}{B+k}\right)
        \]
    </p>
    <p>Since the base \(a > 1\), the logarithm is an increasing function. Thus, it suffices to prove that \(\frac{A}{B} > \frac{A+k}{B+k}\):</p>
    <p>
        \[
            \begin{aligned}
            & \frac{A}{B} > \frac{A+k}{B+k} \iff \frac{A}{B}-\frac{A+k}{B+k} > 0 \iff \\
            & \iff \frac{A(B+k)-B(A+k)}{B(B+k)} > 0 \iff \\
            & \iff \frac{AB + Ak - AB - Bk}{B(B+k)} > 0 \iff \\
            & \iff \frac{k(A-B)}{B(B+k)} > 0
            \end{aligned}
        \]
    </p>
    <p>Since \( k > 0 \), \( A > B \) (implies \( A-B > 0 \)), and \( B > 1 \), the fraction \(\frac{k(A-B)}{B(B+k)}\) is strictly positive. Thus, the argument inequality holds.</p>
    <p>Simultaneously, we compare the bases. Since \(B > a\) and \(k > 0\), we have \(B+k > a\). Recall that for a fixed argument greater than 1, a larger base yields a smaller logarithm value. Therefore:</p>
    <p>
        \[
            \log_a \left( \frac{A+k}{B+k} \right) > \log_{B+k} \left( \frac{A+k}{B+k} \right)
        \]
    </p>
    <p>Combining these two results allows us to form the complete chain of inequalities:</p>
    <p>
        \[
             \log_a \frac{A}{B} > \log_a \left( \frac{A+k}{B+k} \right) > \log_{B+k} \left(\frac{A+k}{B+k}\right)
        \]
    </p>
    <p>By transitivity, the original inequality is proven.</p>
</details>
<details>
    <summary>Source</summary>
    <p>Concursul Interjudețean de Matematică "Cristian S. Calude", Ediția a XVII-a, Galați, 5 Noiembrie 2016.</p>
    <p>Clasa a X-a, Problema 1.b.</p>
</details>
</div>
</p>

<p>
<div class="mp" id="plg16">
<p><a class="mpl" href="#plg16">Problem LG16</a></p>
<p>Let \( a, b, c \in (0, 1) \) or \( a, b, c \in (1, \infty) \). Prove the inequality:</p>
<p>
    \[
        \sum_{\text{cyc}} \frac{1}{(\log_b c + \log_c a) \cdot \log_a^3 b} \ge \frac{3}{2}
    \]
</p>
<details>
    <summary>Hint</summary>
    <p>The notation \(\sum_{\text{cyc}}\) stands for a <strong>cyclic sum</strong>. It means you take the first term and add the two other variations formed by shifting the variables in the cycle \(a \to b \to c \to a\).</p>
    <p>So, the expression expands to:</p>
    <p>
        \[
             \underbrace{\frac{1}{(\log_b c + \log_c a) \cdot \log_a^3 b}}_{\text{Original Term}} + 
             \underbrace{\frac{1}{(\log_c a + \log_a b) \cdot \log_b^3 c}}_{\text{Shift } a \to b, b \to c, c \to a} + 
             \underbrace{\frac{1}{(\log_a b + \log_b c) \cdot \log_c^3 a}}_{\text{Shift } b \to c, c \to a, a \to b}
        \]
    </p>
</details>
<details>
    <summary>Solution 1</summary>
    <p>This is a classic problem where substitution works to our advantage. Let's define: \(x = \frac{1}{\log_a b} = \log_b a\), \(y = \frac{1}{\log_b c} = \log_c b\), and \(z = \frac{1}{\log_c a} = \log_a c\). An important thing to notice is that:</p>
    <p>
        \[
            \frac{1}{xyz} = \log_a b \cdot \log_b c \cdot \log_c a = 1 \implies xyz = 1
        \]
    </p>
    <p>At the same time, since \(xyz=1\), the AM-GM inequality tells us that \(\frac{x+y+z}{3} \geq \sqrt[3]{xyz} = 1 \implies x+y+z \geq 3\).</p>
    <p>Substituting these back into the original expression (noting that \(\log_a^3 b = (1/x)^3\)):</p>
    <p>
        \[
            \begin{aligned}
            & \sum_{\text{cyc}} \frac{1}{(\frac{1}{y}+\frac{1}{z})\frac{1}{x^3}} \geq \frac{3}{2} \iff \sum_{\text{cyc}} \frac{1}{\frac{z+y}{yz} \cdot \frac{1}{x^3}} \geq \frac{3}{2} \iff \\
            & \iff \sum_{\text{cyc}} \frac{x^3 yz}{z+y} \geq \frac{3}{2}
            \end{aligned}
        \]
    </p>
    <p>Since \(xyz=1\), we have \(x^3 yz = x^2 (xyz) = x^2\). The inequality simplifies to:</p>
    <p>
        \[
             \sum_{\text{cyc}} {\frac{x^2}{z+y}} \geq \frac{3}{2}
        \]
    </p>
    <p>The resulting inequality is quite well known. To keep things simple (or perhaps a bit magical), we can use AM-GM in the following manner to isolate the variables:</p>
    <p>
        \[
            \sum_{\text{cyc}} \left(\frac{x^2}{z+y}+\frac{z+y}{4} \right) \overset{\text{AM-GM}}{\geq} 2\sqrt{\frac{x^2}{4}} = \sum_{\text{cyc}} x
        \]
    </p>
    <p>Rearranging the terms:</p>
    <p>
        \[
            \sum_{\text{cyc}} \frac{x^2}{z+y} + \frac{1}{4}\sum_{\text{cyc}}(z+y) \geq \sum_{\text{cyc}} x
        \]
    </p>
    <p>Notice that \(\sum_{\text{cyc}}(z+y) = (z+y) + (x+z) + (y+x) = 2(x+y+z)\). Thus:</p>
    <p>
        \[
            \sum_{\text{cyc}} \frac{x^2}{z+y} \geq \sum_{\text{cyc}} x - \frac{2(x+y+z)}{4} = \frac{x+y+z}{2}
        \]
    </p>
    <p>Since we established earlier that \(x+y+z \ge 3\), the final result holds:</p>
    <p>
        \[
            \sum_{\text{cyc}} \frac{x^2}{z+y} \geq \frac{3}{2}
        \]
    </p>
</details>
<details>
    <summary>Solution 2</summary>
    <p>We can solve the problem directly using Titu's Lemma and logarithm manipulation:</p>
    <p>
        \[
            \begin{aligned}
            & \sum_{\text{cyc}} \frac{1}{(\log_b c + \log_c a) \cdot \log_a^3 b} = \sum_{\text{cyc}} \frac{1}{\left(\frac{1}{\log_c b}+\frac{1}{\log_a c}\right) \cdot \frac{1}{\log_b^3 a}} = \\
            & = \sum_{\text{cyc}} \frac{\log_b a \cdot \log_c b \cdot \log_a c \cdot \log_b^2 a}{\log_c b + \log_a c}
            \end{aligned}
        \]
    </p>
    <p>Since \(\log_b a \cdot \log_c b \cdot \log_a c = 1\), the expression simplifies nicely to:</p>
    <p>
        \[
            \sum_{\text{cyc}} \frac{\log_b^2 a}{\log_c b + \log_a c}
        \]
    </p>
    <p>This structure allows us to easily apply Titu's Lemma:</p>
    <p>
        \[
            \sum_{\text{cyc}} \frac{\log_b^2 a}{\log_c b + \log_a c} \overset{\text{Titu's Lemma}}{\geq} \frac{\left( \log_b a + \log_c b + \log_a c\right)^2}{2\left(\log_b a + \log_c b + \log_a c \right)} = 
        \]
        \[
            = \frac{\log_b a + \log_c b + \log_a c}{2}
        \]
    </p>
    <p>Using AM-GM on the three logarithmic terms:</p>
    <p>
        \[
             \frac{\log_b a + \log_c b + \log_a c}{2} \geq \frac{3\sqrt[3]{\log_b a \cdot \log_c b \cdot \log_a c}}{2} = \frac{3}{2}
        \]
    </p>
</details>
<details>
    <summary>Source</summary>
    <p>Concursul Interjudețean de Matematică "Cristian S. Calude", ediția a XVIII-a, Galați, 4 noiembrie 2017</p>
    <p>Clasa a X-a, proposed by Iuliana Duma</p>
</details>
</div>
</p>

