---
title: "A surprising matrix problem"
date: "2024-02-23"
classes: wide
comments: true
excerpt: "A surprising math problem from the Spanish Math Olympiad of 1988"
usekatex: true
categories:
- "nontech"
- "math"
tags:
- "matrix"
---

In this short article, I will discuss a *cute* mathematical problem that I discovered while reading ["Polya's Footsteps: Miscellaneous Mathematical Expositions"](https://www.amazon.com/Polyas-Footsteps-Miscellaneous-Mathematical-Expositions/dp/0883853264) by the Canadian mathematician [Ross Honsberger](https://en.wikipedia.org/wiki/Ross_Honsberger). If you're not familiar with Honsberger's work, he is a well-known author in the field of [recreational mathematics](https://en.wikipedia.org/wiki/Recreational_mathematics). The one and only [Edsger W. Dijkstra](https://en.wikipedia.org/wiki/Edsger_W._Dijkstra), referred to Honsberger's work as "delightful".

The problem was asked during the First Round of the Spanish Math Olympiad in 1988, and if you own the book, you can find it at page 9.

---

The integers $$1,2,3,...,n^2$$ are arranged to form the $$n \times n$$ matrix:

$$
A=\begin{pmatrix} 
1 & 2 & ... & n\\
n+1 & n+2 & ... & 2n \\
... & ... & ... & ... \\
(n-1)n+1 & ... & ... & n^2
\end{pmatrix}
$$

A sum $$S_A$$ is constructed as follows:

* The first term $$x_1$$ in $$S$$ is chosen at random from the entries of $$A$$;
* After selecting $$x_1$$, $$x_1$$'s row and column are deleted.
* The second term $$x_2$$ is chosen randomly from the remaining entries in $$A$$, after which $$x_2$$'s row and column are deleted.
* We carry similar selections and deletions until $$A$$ is exhausted.

Prove that the sum $$S$$ builds up to the exact total no matter what entries ($$x_1, x_2, ...$$) might be taken. So the sum $$S$$ is always the same.

---  

Excellent problem, isn't it?

The first thing I did was check and see how everything worked, so I started with a $$3 \times 3$$ matrix:

$$
A=\begin{pmatrix} 
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9 \\
\end{pmatrix}
$$

I randomly selected $$3$$, then removed its row and column. The matrix $$A$$ becomes: $$\begin{pmatrix} 4 & 5 \\ 7 & 8 \end{pmatrix}$$. Then I randomly selected $$7$$, removed its row and column, so that $$A$$ becomes $$A=\begin{pmatrix} 5 \end{pmatrix}$$. On this run the sum $$S_A=3+7+5=15$$.

I did try a second run $$S_A=5+1+9$$, and a third run $$S_A=6+2+7$$. 


For a $$3 \times 3$$ matrix, the sum is $$S_A=15$$, no matter what we do.

At this point, it's worth noting that if we examin things from a column perspective, each time we select numbers from a different column. Similarly, if we look at it from a row perspective, each time we select a number from a different row than the previous ones.

So, the intuition says there's something to do with the positions of the numbers and not the numbers themselves.

For example, if we pick a matrix $$B$$ that's *slightly different* than $$A$$, and comes in the form:

$$
B=\begin{pmatrix} 
1 & 2 & 3 & ... & n \\
1 & 2 & 3 & ... & n \\
... & ... & ... & ... & ... \\
1 & 2 & 3 & ... & n \\
\end{pmatrix}
$$

If we apply the the same algorithm to $$B$$, our sum will always be:

$$S_B=1+2+3+...+n=\frac{n(n+1)}{2}$$

The reason is simple: before we exhaust matrix $$B$$, we visit all the possible columns without repetition. Of course, the order can differ, but the sum remains the same (addition is commutative).

So, half of the problem is solved. We know that the sum is constant for a matrix $$B$$. We need to find a relationship between the terms of $$B$$ and $$A$$ and show that something similar is happening for $$A$$.

The relationship between the two matrices is the following:
* Each term from the first row of $$A$$ is identical to its corresponding term on the first row of $$B$$;
* Each term from the second row of $$A$$ is $$n$$ more than its corresponding term on the second row of $$B$$;
* Each term from the third row of $$A$$ is $$2*n$$ more than its corresponding term on the third row of $$B$$;

We can generalize:
* Each term on the k<sup>th</sup> row of $$A$$ is $$k*n$$ more than its corresponding term on the k<sup>th</sup> row of $$B$$.

So if consider $$a_1, a_2, ..., a_n$$ the chosen elements from $$S_A$$ and the corresponding $$b_1, b_2, ..., b_n$$ from $$S_B$$, we see the following pattern:

* $$a_1 = b_1$$ ;
* $$a_2 = b_2 + n$$ ;
* $$a_3 = b_3 + 2*n$$ ;
* $$a_4 = b_4 + 3*n$$ ;
* ... and so on

Is we sum $$S_A = a_1 + a_2 + ... + a_n$$ we obtain:

$$
S_A = (b_1+0*n) + (b_2 + n) + (b_3 + 2*n) + ... + (b_n + (n-1)*n) \Leftrightarrow \\ 
S_A = S_B + n(1+2+3...+(n-1)) \Leftrightarrow \\
S_A = \frac{n(n+1)}{2} + n*\frac{n(n-1)}{2} \Leftrightarrow \\
S_A = \frac{n(n^2+1)}{2} \\
$$

So $$S_A$$ is a constant that depends on $$n$$.

This explains why the result was always 15 for the $$3 \times 3$$ matrix we've picked.

--- 

#### Personal observation, an exercise left for the reader

If you give the problem some thought, you will see that the problem holds not only for consecutive numbers but for all the numbers in arithmetical progression.

So, as long as the matrix $$A$$ is in this form: 

$$
A=\begin{pmatrix} 
a_1 & a_2 & a_3 & ... & a_n \\
a_{n+1} & ... & ... & ... & a_{2n} \\
... & ... & ... & ... & ... \\
... & ... & ... & ... & a_{n^2} \\
\end{pmatrix}
$$

And $$a_1, a_2, ..., a_{n^2}$$ are in arithmetic progression, so that $$a_k=a_{k-1}+d$$, and is $$d$$ is the common difference, the sum $$S_A$$ (as previously defined) is constant.

If we pick a $$3 \times 3$$ example of a matrix $$A$$ with numbers in an arithmetical progression:

$$
A=\begin{pmatrix} 
1 & 3 & 5 \\
7 & 9 & 11 \\
13 & 15 & 17
\end{pmatrix}
$$

We observe that the sum, $$S_A$$, is constant: $$S_A^1=1+9+17$$, $$S_A^2=5+9+13$$, $$S_A^3=9+17+1$$, etc. They are all 27.

Proving this is an exercise left for the reader.
