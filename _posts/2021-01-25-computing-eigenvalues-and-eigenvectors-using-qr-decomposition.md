---
title: "Computing Eigenvalues and Eigenvectors using QR Decomposition"
date: "2021-01-25"
classes: wide
excerpt: "A short tutorial on how to compute Eigenvalues and Eigenvectors using QR Matrix Decomposition. Python code included."
usemathjax: true
categories:
- "c"
- "python"  
- "mathematics"
tags:
- "linear-algebra"
- "algorithm"
- "computer-science"
- "eigenvalues"
- "eigenvector"
---

> In my last two articles, I've tried to explore some fundamental topics in linear algebra: [QR Decomposition](/2021/01/20/writing-your-own-linear-algebra-matrix-library-in-c#qr-decomposition), [linear transformations](/2021/01/20/eigenvalues-and-eigenvectors-explained#linear-transformations) and [Eigenvalues/Eigenvectors](/2021/01/20/eigenvalues-and-eigenvectors-explained#eigenvalues-and-eigenvectors). In case you haven't done so, I recommend you to read the linked sub-chapters first, as it will be easier to follow through.  

Even if it's not very obvious, the QR Decomposition ($$A = Q * R$$) of a matrix $$A$$ is useful to compute the eigenvalues/eigenvectors associated with $$A$$.

But, let's recap. A matrix $$A$$ can be decomposed like: $$A = Q * R$$, where $$R$$ is an upper triangular matrix, and Q is an orthonormal matrix.

Because $$Q$$ is orthonormal, it has a few unique properties:

$$
Q^{T} * Q = Q * Q^{T} = I \\
Q^{T} = Q^{-1} 
$$

From a computational perspective, this leads to some advantages because the inverse of an orthonormal matrix is the same as its transpose.

Now, let's go further. We define two matrices $$A$$ and $$B$$ as being **similar** if there exists a non-singular matrix $$X$$ such that: $$B=X^{-1}*A*X$$.

Moreover, If $$X$$ is non-singular, then $$A$$ and $$X^{-1}*A*X$$ have the same eigenvalues. 

> This means that two similar matrices $$A$$ and $$B$$ have the same eigenvalues.

Now, there's a type of factorization called **Schur Factorization** that says that $$A$$ can be written as: $$A = Q * U * Q^{*} = Q * U * Q^{-1}$$, where Q is a unitary matrix and T is an upper triangular matrix. Additionally, every square matrix $$A$$ has a **Schur Factorization**.

> Because $$Q$$ is a unitary matrix, its conjugate transpose $$Q^{*}=Q^{-1}$$. I am adding this because, in some manuals, you will see the Shur Factorization expressed as: $$A = Q * U * Q^{*}$$. 

So good so far. Looking at the **Schur Factorization** it looks like matrix $$A$$ and $$U$$ are what we call **similar**; this mean they have the same **eigenvalues**. 

From a computational perspective, this again is great. Because, as we've discussed in my previous article, the **eigenvalues** for an upper diagonal matrix are the elements of the first diagonal.

## Using QR decomposition to determine the eigenvalues and eigenvectors of a matrix

The algorithm in its most basic form looks like this:

```
for <a number of iterations>
    (Q, R) = decompose_qr(A)
    A = R @ Q 
```

Eventually, under desired conditions, $$A$$ will converge to the Schur Form of $$A$$ (which is $$U$$ from the formula $$A=Q * U * Q^{-1}$$). 

Why does it work?

Let's re-write the algorithm again using indices this time:

```
A_{0} = A
for k in 1,2....(infinity?!),
    Q_{k}, R_{k} = decompose_qr(A)
    A_{k} = R_{k}*Q_{k}
```

Mathematically speaking, let's try to visualize how $$A_{k}$$, $$R_{k}$$ and $$Q_{k}$$ are "sequencing".

We know $$A_{k} = Q_{k} * R_{k}$$. Multiplying each side with $$Q^{-1}_{k}$$ we obtain: $$Q^{-1}_{k} * A_{k} = R_{k}$$ (this works because $$Q$$ is orthonormal).

From the last relationship we can say: $$Q^{-1}_{k} * A_{k} * Q^{k} = R_{k} * Q_{k}$$, which can be written as: $$A_{k}=Q^{-1}_{1} * Q^{-1}_{2} \ldots Q_{k} * A * Q_{1} * Q_{2} \ldots Q_{k}$$.

I know that all the math can look convoluted at this point, but if you put everything on paper, it will be more precise.

In any case, after an infinite number of iterations, the $$A_{k}$$ will converge to a solution. In practice, it will converge (or not) much sooner than infinity to acceptable values that can be considered the eigenvalues of the initial matrix $$A$$.

Implementing the "naive algorithm" using [numpy](https://numpy.org/) looks like this:

```python
import numpy as np
from tabulate import tabulate

# A is a square random matrix of size n
n = 5
A = np.random.rand(n, n)
print("A=")
print(tabulate(A))

def eigen_qr_simple(A, iterations=500000):
    Ak = np.copy(A)
    n = A.shape[0]
    QQ = np.eye(n)
    for k in range(iterations):
        Q, R = np.linalg.qr(Ak)
        Ak = R @ Q
        QQ = QQ @ Q
        # we "peek" into the structure of matrix A from time to time
        # to see how it looks
        if k%10000 == 0:
            print("A",k,"=")
            print(tabulate(Ak))
            print("\n")
    return Ak, QQ

# We call the function    
eigen_qr_simple(A)

# We compare our results with the official numpy algorithm
print(np.linalg.eigvals(A))
```

**RUN1**

```
A 470000 =
-------  ---------  -------------  -------------  ----------
2.73187  -0.405685  -0.12444       -0.311421      -0.430222
0         0.361051   0.546097       0.487334      -0.454846
0         0         -0.171246       0.0124246     -0.402849
0         0         -4.94066e-324  -0.114055       0.465533
0         0          0              4.94066e-324   0.0659463
-------  ---------  -------------  -------------  ----------


A 480000 =
-------  ---------  -------------  -------------  ----------
2.73187  -0.405685  -0.12444       -0.311421      -0.430222
0         0.361051   0.546097       0.487334      -0.454846
0         0         -0.171246       0.0124246     -0.402849
0         0         -4.94066e-324  -0.114055       0.465533
0         0          0              4.94066e-324   0.0659463
-------  ---------  -------------  -------------  ----------


A 490000 =
-------  ---------  -------------  -------------  ----------
2.73187  -0.405685  -0.12444       -0.311421      -0.430222
0         0.361051   0.546097       0.487334      -0.454846
0         0         -0.171246       0.0124246     -0.402849
0         0         -4.94066e-324  -0.114055       0.465533
0         0          0              4.94066e-324   0.0659463
-------  ---------  -------------  -------------  ----------
```

And the real eigenvalues computed using numpy (`np.linalg.eigvals(A)`) were:

```
[ 2.73186984  0.36105086  0.06594633 -0.11405473 -0.17124638]
```

So after 490000 iterations, the results were not terrible. 

$$A_{k}$$ started to look "upper-triangularish", and if we look at it's first diagonal we even got the eigenvalues correct.

* `A[0][0] = 2.73187` vs. `2.73186984`
* `A[1][1] = 0.361051` vs. `0.361051`
* `A[2][2] = -0.171246` vs. `-0.17124638`
* `A[3][3] = -0.114055` vs. `-0.11405473`
* `A[4][4] = -0.11405473` vs. `-0.11405473`

This was a happy case, sometimes it's worse, and it's definitely slow.

Let's run it again, but this time for a `8x8` matrix.

**RUN2**

```
A 490000 =
-------  -------------  ----------  -------------  -------------  -----------  ----------  ----------
4.26025  -0.0561474     -0.0593904   0.322899      -0.361925       0.100844    -0.604486   -0.40794
0         0.796223       0.39731     0.389067       0.181738      -0.33868      0.0760547  -0.480106
0        -0.643044       0.499454   -0.0734042      0.0650266      0.641249    -0.112954    0.0699411
0         4.94066e-324   0          -0.287478      -0.533995      -0.00559464   0.0305304  -0.182998
0         4.94066e-324   0           0.202293      -0.357162       0.064508    -0.0990373   0.257881
0        -4.94066e-324   0          -4.94066e-324   4.94066e-324   0.34292     -0.258795   -0.0554286
0         0              0           0              0              0            0.104959    0.392977
0         0              0           0              0              0           -0.109613   -0.0544417
-------  -------------  ----------  -------------  -------------  -----------  ----------  ----------
```

With the correct "eigenvalues" being:

```
[ 4.26024551+0.j          0.64783878+0.48318708j  0.64783878-0.48318708j
 -0.32231998+0.32681716j -0.32231998-0.32681716j  0.34291986+0.j
  0.02525882+0.1916334j   0.02525882-0.1916334j ]
```

This time we were not that close, but we managed to find a few eigenvalues.

And it was even slower. Plus, the temperature of my CPU increased drastically.

# Improving our naive algorithm - QR with shifts (Practical QR)

The "naive QR algorithm" works flawlessly in theory, but in practice, not so good.

So people implementing linear algebra algorithms found a few tricks. One of those tricks is called "shifts".

So we play a little with our initial decomposition $$A_{k} = Q_{k} * R_{k}$$, by "attacking" the first diagonal like:

$$ 
\text{ we subtract the "value"}: \\
\\
A_{k} - s_{k}*I = Q_{k}*R_{k} \\
\text{ and then we put the "value" back in:} \\
\\
A_{k+1} = R_{k} * Q_{k} + s_k * I
$$

A possible value for $$s_{k}$$ can be the last element of the first diagonal of matrix $$A_{k}$$.

Having said this, our "smarter qr algorithm with shifts looks like:"

```python
import numpy as np
from tabulate import tabulate

# A is a square random matrix of size n
n = 5
A = np.random.rand(n, n)
print("A=")
print(tabulate(A))

ef eigen_qr_practical(A, iterations=500000):
Ak = np.copy(A)
n = Ak.shape[0]
QQ = np.eye(n)
for k in range(iterations):
    # s_k is the last item of the first diagonal
    s = Ak.item(n-1, n-1)
    smult = s * np.eye(n)
    # pe perform qr and subtract smult
    Q, R = np.linalg.qr(np.subtract(Ak, smult))
    # we add smult back in
    Ak = np.add(R @ Q, smult)
    QQ = QQ @ Q
    if k % 10000 == 0:
        print("A",k,"=")
        print(tabulate(Ak))
        print("\n")
return Ak, QQ

#Print results
eigen_qr_practical(A)

#Print the results of the "official" numpy algorithm
print(np.linalg.eigvals(A))
```

Running the new algorithm will yield the following results:

```
A 490000 =
-------  -------------  ------------  ----------  ----------
2.44343  -0.240571      -0.189644      0.615036   -0.501964
0         0.660489      -0.530664     -0.140285   -0.143883
0        -4.94066e-324  -0.531766      0.0900106  -0.297511
0         4.94066e-324   1.7737e-321   0.352584    0.488774
0         0              0             0          -0.0891101
-------  -------------  ------------  ----------  ----------
```

Compared with the "official ones":

```
[ 2.44343021 -0.53176643  0.66048936  0.35258393 -0.08911005]
```

We can see that our matrix converged quite nicely.

# More improvements

Before changing even further the algorithm, we need to discuss what a **Hessenberg** matrix is.

A **Hessenberg Matrix** is a "lousy-upper diagonal matrix", that has zeroes under the first **sub**-diagonal:

$$
H_{\text{essenberg}} =
\begin{bmatrix}
\ldots & \ldots & \ldots & \ldots & \ldots \\
\ldots & \ldots & \ldots & \ldots & \ldots \\
\textbf{0} & \ldots & \ldots & \ldots & \ldots \\
\textbf{0} & \textbf{0} & \ldots & \ldots & \ldots \\
\textbf{0} & \textbf{0} & \textbf{0} & \ldots & \ldots \\
\end{bmatrix}
$$

There is a theorem that states that every square matrix is similar to one in the upper Hessenberg form.

If we somehow manage to transform $$A$$ to an upper Hessenberg form, and then we run the previous algorithm, the convergence will be increased. 

To compute the Hessenberg Matrix from an initial matrix $$A$$ you can follow [this tutorial](https://www.youtube.com/watch?v=t_bj3V9Ubac).

In python, you can use the [following method](https://docs.scipy.org/doc/scipy/reference/generated/scipy.linalg.hessenberg.html) to compute the Hessenberg form of a Matrix:

```python
# https://docs.scipy.org/doc/scipy/reference/generated/scipy.linalg.hessenberg.html
from scipy.linalg import hessenberg
A = np.array([[2, 5, 8, 7], [5, 2, 2, 8], [7, 5, 6, 6], [5, 4, 4, 8]])
H, Q = hessenberg(A, calc_q=True)
```

# But what about the eigenvectors

After finding out the **eigenvalues**, obtaining the **eigenvectors** is a matter of solving a linear system of equations.

Let's take as example, the matrix I've used in [my previous article](/2021/01/20/eigenvalues-and-eigenvectors-explained#eigenvalues-and-eigenvectors): $$A = \begin{bmatrix} 3 & 1 \\ 0 & 1 \end{bmatrix}$$.

We already computed the *eigenvalues* for it, namely $$\lambda_{1}=3, \lambda_{2}=1$$.

To find the **eigenvectors** is a matter of solving two linear systems of equations of the form $$A * x = b$$:

$$
\begin{bmatrix}
3 - 1 & 1 \\
0 & 1 - 1
\end{bmatrix}
*
\begin{bmatrix}
v_{1x} \\
v_{1y}
\end{bmatrix}
=
\begin{bmatrix}
0 \\
0
\end{bmatrix}
\\
\begin{bmatrix}
3 - 3 & 1 \\
0 & 1 - 3
\end{bmatrix}
*
\begin{bmatrix}
v_{2x} \\
v_{2y}
\end{bmatrix}
=
\begin{bmatrix}
0 \\
0
\end{bmatrix}
$$

From a code perspective, if you want to do it in C, you take a look at my "academical" called [nml](/2021/01/20/writing-your-own-linear-algebra-matrix-library-in-c#solving-linear-systems-of-equations). The algorithms related to solving a linear system of equations are also described there. 

Or we can do it in python, using numpy's [`numpy.linalg.eig()`](https://numpy.org/doc/stable/reference/generated/numpy.linalg.eig.html) method.














