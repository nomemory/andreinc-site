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

Solving math problems is satisfying, but designing them is a completely different beast.

 It's a side hobby of mine that feels less like following a map and more like wandering in the dark until you stumble onto something interesting. You start messing with variables, not knowing where you're going, and suddenly a pattern clicks.

Most of this collection comes from that process of experimentation. While I didn't copy these from a textbook, math is a crowded room, so I'm sure I'm not the first to land on some of these ideas. 

The simpler exercises, in particular, are natural extensions of standard formulas. To give credit where it's due: `Exercise 4` uses a concept that floats around online in various forms; `Exercise 5` is my own riff on a classic problem from the Romanian Nastasescu & Nita collection; and `Exercise 8` shares DNA with a specific case (a=10,b=e) I once saw on YouTube.

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
    <summary>Solution</summary>
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
</div>
</p>


