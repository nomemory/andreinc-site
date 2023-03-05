---
title: "Writing your own linear algebra matrix library in C"
date: "2021-01-20"
classes: wide
usemathjax: true
excerpt: "A step-by-step guide on how to implement a matrix library in pure C."
categories:
- "c"
- "mathematics"
- "algorithms"
tags:
- "algorithm"
- "computer-science"
- "linear-algebra"
- "qr"
- "matrix-inverse"
- "matrix-determinant"
---

Table of Contents
=================

* [Disclaimer](#disclaimer)
* [Math, math](#math-math)
* [The library](#the-library)
* [The data: nml_matrix](#the-data-nml_matrix)
  * [Allocating / De-allocating memory for the nml_mat matrix](#allocating--de-allocating-memory-for-the-nml_mat-matrix)
    * [Creating a random matrix](#creating-a-random-matrix)
    * [Creating a square matrix](#creating-a-square-matrix)
    * [Creating an identity matrix](#creating-an-identity-matrix)
    * [Creating a matrix from a FILE](#creating-a-matrix-from-a-file)
* [Matrix methods](#matrix-methods)
  * [Checking for equality](#checking-for-equality)
  * [Printing the matrix](#printing-the-matrix)
  * [Accessing and modifying matrix elements](#accessing-and-modifying-matrix-elements)
    * [Retrieving / Selecting a column](#retrieving--selecting-a-column)
    * [Retrieving / Selecting a row](#retrieving--selecting-a-row)
    * [Setting values](#setting-values)
    * [Multiplying a row with a scalar](#multiplying-a-row-with-a-scalar)
    * [Multiplying a column with a scalar](#multiplying-a-column-with-a-scalar)
    * [Adding two rows](#adding-two-rows)
    * [Multiplying the matrix with a scalar](#multiplying-the-matrix-with-a-scalar)
  * [Modifying the nml_mat internal structure](#modifying-the-nml_mat-internal-structure)
    * [Removing a column](#removing-a-column)
    * [Removing a row](#removing-a-row)
    * [Swapping Rows](#swapping-rows)
    * [Swapping columns](#swapping-columns)
    * [Horizontal Concatenation of two matrices](#horizontal-concatenation-of-two-matrices)
    * [Vertical concatenation](#vertical-concatenation)
  * [Basic Matrix Operations](#basic-matrix-operations)
    * [Add two matrices](#add-two-matrices)
    * [Subtracting two matrices](#subtracting-two-matrices)
    * [Multiplying two matrices](#multiplying-two-matrices)
  * [Row Echelon Form](#row-echelon-form)
    * [Example](#example)
    * [Code implementation](#code-implementation)
  * [Reduced Row Echelon Form](#reduced-row-echelon-form)
    * [Code Implementation](#code-implementation-1)
  * [LU(P) Decomposition](#lup-decomposition)
    * [The LU(P) algorithm as an example](#the-lup-algorithm-as-an-example)
    * [Code implementation](#code-implementation-2)
  * [Solving linear systems of equations](#solving-linear-systems-of-equations)
    * [Forward substitution](#forward-substitution)
    * [Backward substitution](#backward-substitution)
    * [Solving linear systems using LU(P) decomposition](#solving-linear-systems-using-lup-decomposition)
  * [Calculating the inverse of the matrix using LU(P) decomposition](#calculating-the-inverse-of-the-matrix-using-lup-decomposition)
  * [Calculating the determinant of the matrix using LU(P) decomposition](#calculating-the-determinant-of-the-matrix-using-lup-decomposition)
  * [QR Decomposition](#qr-decomposition)
* [References](#references)

# Disclaimer

> This article is in an early stage. 
> If you see any error in the code or in the mathematical formulas, don't hesitate to contact me or to create a PR directly.
> The article source is on github, link [here](https://github.com/nomemory/andreinc-site/blob/main/_posts/2021-01-20-writing-your-own-linear-algebra-matrix-library-in-c.md).

# Math, math

Linear algebra is the branch of mathematics focused on:
* linear equations: $$a_{1}*x_{1} + ... + a_{n}*x_{n} = b$$
* linear maps: $$(x_{1},...,x_{n}) \rightarrow a_{1}*x_{1} + ... + a_{n}*x_{n}$$
    -  and their representation in _vector spaces_ through matrices;
  
A finite set of linear equations with a finite set of variables is called a **system of linear equations** or a **linear system**.

Linear systems are a fundamental part of linear algebra. Historically speaking, the math behind matrix theory has been developed for solving such systems. In the modern context, many real-world problems may be interpreted in terms of matrices and linear systems.

To see the connection between matrices and linear systems of equations, let's look at the following example:

$$ 
2x_{1} + x_{2} + 3x_{3} = 1 \\
2x_{1} + 6x_{2} + 8x_{3} = 3 \\
6x_{1} + 8x_{2} + 18x_{3} = 5
$$

For this linear system composed of 3 linear equations we can associate the matrix `A[3x3]`:

$$A=
\begin{bmatrix}
2 & 1 & 3\\
2 & 6 & 8\\
6 & 8 & 18
\end{bmatrix}
$$

And the vector of solutions `B[3x1]`:

$$B=
\begin{bmatrix}
1 \\
3 \\
5 \\
\end{bmatrix}
$$


We can now define our system in terms of matrices as $$A * x = B$$, or:

$$
\begin{bmatrix}
2 & 1 & 3\\
2 & 6 & 8\\
6 & 8 & 18
\end{bmatrix}
*
\begin{bmatrix}
x_{1}\\
x_{2}\\
x_{3}
\end{bmatrix}
=
\begin{bmatrix}
1 \\
3 \\
5 \\
\end{bmatrix}
$$

Or, we can use this notation, S:

$$S=
\left(\begin{array}{@{}ccc|c@{}}
2 & 1 & 3 & 1 \\
2 & 6 & 8 & 3 \\
6 & 8 & 18 & 5
\end{array}\right)
$$

The interesting aspect is that performing simple row operations (swap rows, add rows, multiply rows with scalars) on `S` we can transform the system into an equivalent form:

For example, after applying the following row operations on S:

> $$-1*Row1 + Row2$$
>
> $$-3*Row1 + Row3$$
>
> $$-1*Row1 + Row3$$
>
> $$\frac{1}{4}*Row3$$
>
> $$\frac{1}{2}*Row1$$
>
> $$\frac{1}{5}*Row2$$

`S` becomes:

$$S=
\left(\begin{array}{@{}ccc|c@{}}
1 & \frac{1}{2} & \frac{3}{2} & \frac{1}{2} \\
0 & 1 & 1 & \frac{2}{5} \\
0 & 0 & 1 & 0
\end{array}\right)
$$

Notice how our `M` matrix became an upper diagonal matrix (all elements under the first diagonal are `0`). The more advanced algorithms we will implement in our C library are all about creating equivalent matrices that are upper or lower diagonal.

After all the basic row transformations on `S` matrix are performed, our initial linear system "morphs" into an equivalent system that is trivial to solve by means of substitution:

$$
x_{1} + \frac{1}{2}x_{2} + \frac{3}{2}x_{3} = \frac{1}{2} \\
x_{2} + x_{3} = \frac{2}{5} \\
x_{3} = 0
$$

Because `M` is an upper diagonal matrix, we can instantly determine the value of $$x_{3}=0$$; then we substitute $$x_{3}$$ in the second equation to find $$x_{2}=\frac{2}{5}$$ and so on. 

From a computational perspective, solving linear systems of equations and having around upper/lower diagonal matrices in place is essential.

# The library

Now, let's say you are one of the few Engineering/Computer Science students that are passionate about [linear algebra](https://en.wikipedia.org/wiki/Linear_algebra), [numerical analysis](https://en.wikipedia.org/wiki/Numerical_analysis) and writing code in a low-level language. Or you are just curious about what's behind the [`lu(A)`](https://www.mathworks.com/help/matlab/ref/lu.html) method in Matlab. Or you are passionate about A.I., and you know you cannot learn A.I. algorithms without a good foundation in linear algebra. 

I believe the best exercise you can do is to try to write your (own) Matrix library in a low-level programming language (like [C](https://en.wikipedia.org/wiki/C_(programming_language)), [C++](https://en.wikipedia.org/wiki/C%2B%2B) or even [D](https://dlang.org/)).

This tutorial is precisely this, a step-by-step explanation of writing a C Matrix library that implements the "basic" and "not-so-basic" numerical analysis algorithms that will allow us in the end to solve linear systems of equations.

All code in this tutorial is available on GitHub in the repository called [neat-matrix-library](https://github.com/nomemory/neat-matrix-library). 

To clone it (using GitHub CLI):

```sh
gh repo clone nomemory/neat-matrix-library
```

The code is not meant to be "efficient", but relatively easy to follow and understand.

The tutorial assumes that the reader can write C code, understand pointers and dynamic memory allocation, and is familiar with the C standard library. 

# The data: `nml_matrix`

The first step is to model the data our library will work with: "matrices". So we are going to define our first `struct`, called `nml_mat` which models a matrix:

```c
typedef struct nml_mat_s {
  unsigned int num_rows;
  unsigned int num_cols;
  double **data;
  int is_square;
} nml_mat;
```

The properties of this `struct` have self-explanatory names:
* `unsigned int num_rows` - represents the number of rows of the matrix. `0` is not an acceptable value;
* `unsigned int num_cols` - represents the number of columns of the matrix. `0` is not an acceptable value;
* `double **data` - is "multi-dimensional array" that stores data in rows and columns;
* `int is_square` - is a `"boolean"` value that determines if the matrix is square (has the same number of rows and columns) or not.

From a performance perspective, it's better to keep the matrix elements in a `double*` using the conversion:

```c
data[i][j] <=> array[i * m + j]
```

To better understand how to store multi-dimensional arrays in _linear storage_ please refer to [this StackOverflow question](https://stackoverflow.com/questions/14015556/how-to-map-the-indexes-of-a-matrix-to-a-1-dimensional-array-c), or read the [wikipedia article](https://en.wikipedia.org/wiki/Row-_and_column-major_order) on the topic.

Even if it might sound like a "controversial" decision, for the sake of simplicity, we will use the `double **` multi-dimensional storage. 

## Allocating / De-allocating memory for the `nml_mat` matrix

Unlike "higher-level" programming languages (Java, Python, etc.), that manage memory allocation for you, in C, you need to explicitly ask for memory and explicitly free the memory once you no longer need it.

In this regard, the next step is to create "constructor-like" and "destructor-like" functions for the `nml_mat` struct defined above. There's an unwritten rule that says: "Every [malloc()](https://www.cplusplus.com/reference/cstdlib/malloc/) has its _personal_ [free()](https://www.cplusplus.com/reference/cstdlib/free/)". 

```c
// Constructor-like 
// Allocates memory for a new matrix
// All elements in the matrix are 0.0
nml_mat *nml_mat_new(unsigned int num_rows, unsigned int num_cols);

// Destructor-like
// De-allocates the memory for the matrix
void nml_mat_free(nml_mat *matrix);
```

Implementing the `nml_mat_new()` is quite straightforward:

```c
nml_mat *nml_mat_new(unsigned int num_rows, unsigned int num_cols) {
  if (num_rows == 0) {
    NML_ERROR(INVALID_ROWS);
    return NULL;
  }
  if (num_cols == 0) {
    NML_ERROR(INVALID_COLS);
    return NULL;
  }
  nml_mat *m = calloc(1, sizeof(*m));
  NP_CHECK(m);
  m->num_rows = num_rows;
  m->num_cols = num_cols;
  m->is_square = (num_rows == num_cols) ? 1 : 0;
  m->data = calloc(m->num_rows, sizeof(*m->data));
  NP_CHECK(m->data);
  int i;
  for(i = 0; i < m->num_rows; ++i) {
    m->data[i] = calloc(m->num_cols, sizeof(**m->data));
    NP_CHECK(m->data[i]);
  }
  return m;
}
```

_Notes:_
* `NML_ERROR`, `NP_CHECK` are macros defined in [nml_util.h](https://github.com/nomemory/neat-matrix-library/blob/main/nml_util.h).
* `NML_ERROR()` or `NML_FERROR()` are logging utils, that helps us print error message on `stderr`;
* `NP_CHECK` checks if the newly allocated memory chunk is not `NULL`. In case it's `NULL` it aborts the program. 

Explanation:
1. First step is to check if `num_rows == 0` or `num_cols == 0`. If they are, we consider the input as invalid, and we print on `stderr` an error. Afterwards `NULL` is returned;
2. This line: `nml_mat *m = calloc(1, sizeof(*m))` allocates memory for `1` (one) `nml_mat` structure;
3. For a multi-dimensional array (`double**`), we allocate memory in two steps: 
  - `m->data = calloc(m->num_rows, sizeof(*m->data))` - this allocates memory for the `column` array;
  -  Then, we allocate memory for each row. By using [`calloc()`](https://www.cplusplus.com/reference/cstdlib/calloc/) the data is initialized with `0.0`. 

Freeing the matrix is even more straightforward. The implementation for `nml_mat_free()`:

```c
void nml_mat_free(nml_mat *matrix) {
  int i;
  for(i = 0; i < matrix->num_rows; ++i) {
    free(matrix->data[i]);
  }
  free(matrix->data);
  free(matrix);
}
```

It's important to note, that given the multidimensional nature of `double** data`, we need to:
* de-allocate each row individually: `free(matrix->data[i])`;
* then the column vector: `free(matrix->data)`; 
* and lastly the actual struct: `free(matrix)`. 

At this point, it's a good idea to add more methods to help the potential user of the library to create various `nml_mat` structs, with various properties.

| Method | Description |
| ------ | ----------- |
| `nml_mat_rnd()` | A method to create a random matrix. |
| `nml_mat_sqr()` | A method to create a square matrix with elements `0.0`. |
| `nml_mat_eye()` | A method to create an identity matrix. |
| `nml_mat_cp()`  | A method to copy the content of a matrix into another matrix. |
| `nml_mat_fromfile()` | A method to read the matrix from a `FILE`.|

### Creating a random matrix

Writing a method like `nml_mat_rnd()` it's easy, once we have `nml_mat_new()` in place:

```c
nml_mat *nml_mat_rnd(unsigned int num_rows, unsigned int num_cols, double min, double max) {
  nml_mat *r = nml_mat_new(num_rows, num_cols);
  int i, j;
  for(i = 0; i < num_rows; i++) {
    for(j = 0; j < num_cols; j++) {
      r->data[i][j] = nml_rand_interval(min, max);
    }
  }
  return r;
}
```

The input params `min` and `max` represent the interval boundaries in which the random numbers are being generated.

The `nml_rand_interval(min, max)`, the method responsible for generating the random value, looks like this:

```c
#define	RAND_MAX	0x7fffffff
double nml_rand_interval(double min, double max) {
  double d;
  d = (double) rand() / ((double) RAND_MAX + 1);
  return (min + d * (max - min));
}
```

### Creating a square matrix

A square matrix has the same number of columns and rows.

For example, `A` is square `3x3` matrix:

$$ A =
\begin{matrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 3.0\\
2.0 & 1.0 & 9.0
\end{matrix}
$$

B is **not** a square matrix:

$$ B =
\begin{matrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 3.0
\end{matrix}
$$

Implementing this is as simple as calling the existing `nml_mat_new()` function with `rows=cols`:

```c
nml_mat *nml_mat_sqr(unsigned int size) {
  return nml_mat_new(size, size);
}
```

Similarly, you can write a method that is generating a random square matrix:

```c
nml_mat *nml_mat_sqr_rnd(unsigned int size, double min, double max) {
  return nml_mat_rnd(size, size, min, max);
} 
```

### Creating an identity matrix

An identity matrix is square (`NxN`) matrix that has `1.0` on the first diagonal, and `0.0` elsewhere:

$$ \mathbf{I}_n = \left.\left(
\vphantom{\begin{array}{c}1\\1\\1\\1\\1\end{array}}
\smash{\underbrace{
\begin{array}{ccccc}
1&0&0&\cdots &0\\
0&1&0&\cdots &0\\
0&0&1&\cdots &0\\
\vdots&&&\ddots&\\
0&0&0&\cdots &1
\end{array}
}_{n\text{ columns}}}
\right)\right\}
\,n\text{ rows}
$$

<br/>

A matrix multiplied with its inverse is equal to the identity matrix: $$ A^{-1} * A = A * A^{-1} = I $$

From a programming perspective, the first diagonal represents the series of matrix elements for which the indexes `i` and `j` are equal (`i`==`j`).

`i` represents the row index, while `j` represents the column index.

Having said this, our method looks like this:

```c
nml_mat *nml_mat_eye(unsigned int size) {
  nml_mat *r = nml_mat_new(size, size);
  int i;
  for(i = 0; i < r->num_rows; i++) {
    r->data[i][i] = 1.0;
  }
  return r;
}
```

To find out the reasons why the identity method is named `eye()` please read this [math exchange post](https://math.stackexchange.com/questions/3028394/what-is-the-motivation-behind-naming-identity-matrix-as-eye/3028999).

### Creating a matrix from a `FILE`

Instead of having to write something like the code bellow to set the elements of the matrix:

```c
nml_mat *m = ...
m->data[0][0] = 1.0;
m->data[1][0] = 2.0;
m->data[2][0] = 4.0;
// etc. 
```

It's more convenient to allow the user of our library to be able to read the matrix elements from an input text file.

The input file should be formatted in a certain way, e.g.:

`matrix01.data`
```
4 5
0.0     1.0     2.0     5.0     3.0
3.0     8.0     9.0     1.0     4.0
2.0     3.0     7.0     1.0     1.0
0.0     0.0     4.0     3.0     8.0
```

* The first row of the file `4 5` represents the numbers of rows (`=4`) and columns (`=5`);
* The rest of the rows are the elements (`20`) of the matrix.

The C code that is able to read this file is:

```c
nml_mat *nml_mat_fromfilef(FILE *f) {
  int i, j;
  unsigned int num_rows = 0, num_cols = 0;
  fscanf(f, "%d", &num_rows);
  fscanf(f, "%d", &num_cols);
  nml_mat *r = nml_mat_new(num_rows, num_cols);
  for(i = 0; i < r->num_rows; i++) {
    for(j = 0; j < num_cols; j++) {
      fscanf(f, "%lf\t", &r->data[i][j]);
    }
  }
  return r;
} 
```

Where:

* `fscanf(f, "%d", &num_rows)` and `fscanf(f, "%d", &num_cols)` reads the first line;
* The `fscanf(f, "%lf\t", &r->data[i][j])` line inside the `for` loops read the remaining elements of the matrix. 

This method can also be used to read user input from the keyboard, by calling the method like this:

```c
nml_mat_fromfilef(stdin);
```

# Matrix methods

## Checking for equality

It will be nice for the users of our library to be able to compare two matrices and see if they are equal, meaning they have the same number of rows and columns and identical elements.

In practice, it's good to be able to check if two matrices are "almost equal", meaning that their elements are "almost equal" within an accpetable tolerance.

Writing a method like this it's trivial. We basically have to iterate over all the elements and check for their equality:

```c
// Checks if two matrices have the same dimesions
int nml_mat_eqdim(nml_mat *m1, nml_mat *m2) {
  return (m1->num_cols == m2->num_cols) &&
          (m1->num_rows == m2->num_rows);
}

// Checks if two matrices have the same dimensions, and the elements
// are all equal to each other with a given tolerance;
// For exact equality use tolerance = 0.0
int nml_mat_eq(nml_mat *m1, nml_mat *m2, double tolerance) {
  if (!nml_mat_eqdim(m1, m2)) {
    return 0;
  }
  int i, j;
  for(i = 0; i < m1->num_rows; i++) {
    for(j = 0; j < m1->num_cols; j++) {
      if (fabs(m1->data[i][j] - m2->data[i][j]) > tolerance) {
        return 0;
      }
    }
  }
  return 1;
}
```

[`fabs(x)`](https://www.cplusplus.com/reference/cmath/fabs/) returns the [absolute value](https://en.wikipedia.org/wiki/Absolute_value) of `x`: `|x|`.

## Printing the matrix

Printing the matrix is _trivial_. 

We just need to iterate through all the elements and use `fprintf()` to show the matrix in `stdout`:

```c
void nml_mat_print(nml_mat *matrix) {
  nml_mat_printf(matrix, "%lf\t\t");
}

// Prints the matrix on the stdout (with a custom formatting for elements)
void nml_mat_printf(nml_mat *matrix, const char *d_fmt) {
  int i, j;
  fprintf(stdout, "\n");
  for(i = 0; i < matrix->num_rows; ++i) {
    for(j = 0; j < matrix->num_cols; ++j) {
      fprintf(stdout, d_fmt, matrix->data[i][j]);
    }
    fprintf(stdout, "\n");
  }
  fprintf(stdout, "\n");
} 
```

## Accessing and modifying matrix elements

### Retrieving / Selecting a column

Some advanced numerical analysis algorithms (e.g.: QR decomposition) are working extensively on columns, so it's a good idea to be pro-active about it and create a method that selects/retrieves a column from a given matrix.

We will define this method as: 

```c
nml_mat *nml_mat_col_get(nml_mat *m, unsigned int col)
```

From a mathematical perspective calling our method on given matrix retrieves another column matrix:

$$\text{nml_mat_col_get(}
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 3.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
 \text{,1)=}
\begin{bmatrix}
2.0\\
2.0\\
1.0
\end{bmatrix}
$$

The C code for `nml_mat_col_get` looks like this:

```c
nml_mat *nml_mat_col_get(nml_mat *m, unsigned int col) {
  if (col >= m->num_cols) {
    NML_FERROR(CANNOT_GET_COLUMN, col, m->num_cols);
    return NULL;
  }
  nml_mat *r = nml_mat_new(m->num_rows, 1);
  int j;
  for(j = 0; j < r->num_rows; j++) {
    r->data[j][0] = m->data[j][col];
  }
  return r;
} 
```

Observations:
* The resulting matrix has only one column: `nml_mat *r = nml_mat_new(m->num_rows, 1)`;
* We copy all elements from column `[col]` to the only column of the resulting matrix `[0]`: `r->data[j][0] = m->data[j][col]`.

### Retrieving / Selecting a row

To keep the API "consistent" we can write a similar method for retrieving a row:

`nml_mat *nml_mat_row_get(nml_mat *m, unsigned int row)`

This will work similar to the `nml_mat_col_get(...)`, but instead of retrieving a column we will retrieve a row:

$$\text{nml_mat_row_get(}
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 3.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
\text{,1)=}
\begin{bmatrix}
0.0 & 2.0 & 3.0
\end{bmatrix}
$$

The C implementation for this method looks like this:

```c
nml_mat *nml_mat_row_get(nml_mat *m, unsigned int row) {
  if (row >= m->num_rows) {
    NML_FERROR(CANNOT_GET_ROW, row, m->num_rows);
    return NULL;
  }
  nml_mat *r = nml_mat_new(1, m->num_cols);
  memcpy(r->data[0], m->data[row], m->num_cols * sizeof(*r->data[0]));
  return r;
} 
```

This time we write the code differently. Given the fact the memory per row is contiguous we can make use of [memcpy()](https://www.cplusplus.com/reference/cstring/memcpy/).

No loops are needed this time. This line of code is enough to achieve what we want:

```c
memcpy(r->data[0], m->data[row], m->num_cols * sizeof(*r->data[0]));
```

At this point we've created a new row matrix from the initial one (`m`).

### Setting values

To set the element of the matrix to a given value, we can simply access the `data` field of the `nml_mat*` struct:

```c
nml_mat *m = ...
m->data[i][j] = 2.0; 
```

In addition, we can write helper methods to:
* Set all the elements to a given value: `void nml_mat_all_set(nml_mat *matrix, double value)`
* Set all the elements of the fist diagonal to a given value: `int nml_mat_diag_set(nml_mat *m, double value)`

The C code for those two is somewhat trivial:

```c
// Sets all elements of a matrix to a given value
void nml_mat_all_set(nml_mat *matrix, double value) {
  int i, j;
  for(i = 0; i < matrix->num_rows; i++) {
    for(j = 0; j < matrix->num_cols; j++) {
      matrix->data[i][j] = value;
    }
  }
}

// Sets all elements of the matrix to given value
int nml_mat_diag_set(nml_mat *m, double value) {
  if (!m->is_square) {
    NML_FERROR(CANNOT_SET_DIAG, value);
    return 0;
  }
  int i;
  for(i = 0; i < m->num_rows; i++) {
    m->data[i][i] = value;
  }
  return 1;
} 
```

### Multiplying a row with a scalar

Multiplying a row in the matrix (`nml_mat`) can be useful when implementing more numerical analysis advanced algorithms.

The idea is simple, we will define a method with the following signature:

```c
int nml_mat_row_mult_r(nml_mat *m, unsigned int row, double num); 
```

This method will work directly through reference on the matrix `m`. That's where the `_r` stands for.

From a mathematical perspective this method will do the following:


$$\text{nml_mat_row_mult_r(}
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 3.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
\text{,1, 2.0)=}
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
\textbf{0.0} & \textbf{4.0} & \textbf{6.0}\\
2.0 & 1.0 & 9.0
\end{bmatrix}
$$

The code implementation looks like this:

```c
int nml_mat_row_mult_r(nml_mat *m, unsigned int row, double num) {
  if (row>= m->num_rows) {
    NML_FERROR(CANNOT_ROW_MULTIPLY, row, m->num_rows);
    return 0;
  }
  int i;
  for(i=0; i < m->num_cols; i++) {
    m->data[row][i] *= num;
  }
  return 1;
}
```

Notice how we select the row: `m->data[row][i] *= num`, where `i = 0 .. m->num_cols`. 

An alternative method, that instead of referencing `m` will retrieve a new `nml_mat *r`, can be written like this:

```c
nml_mat *nml_mat_row_mult(nml_mat *m, unsigned int row, double num) {
  nml_mat *r = nml_mat_cp(m);
  if (!nml_mat_row_mult_r(r, row, num)) {
    nml_mat_free(r);
    return NULL;
  }
  return r;
} 
```

Notice how the `_r` ending has dropped. This is a common pattern in C.

### Multiplying a column with a scalar

Multiplying a column is also quite similar with what we described above. 

We are going to end-up with two methods:

* `int nml_mat_col_mult_r(nml_mat *m, unsigned int col, double num)`
   - This will modify the matrix `m` through reference;
* `nml_mat *nml_mat_col_mult(nml_mat *m, unsigned int col, double num)`
   - This will return a new `nml_mat *r` matrix
 
From a math perspective:

$$\text{nml_mat_col_mult_r(}
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 3.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
\text{,0, 2.0)=}
\begin{bmatrix}
\textbf{2.0} & 2.0 & 3.0\\
\textbf{0.0} & 2.0 & 3.0\\
\textbf{4.0} & 1.0 & 9.0
\end{bmatrix}
$$

The C code for both of the methods looks like this:

```c
nml_mat *nml_mat_col_mult(nml_mat *m, unsigned int col, double num) {
  nml_mat *r = nml_mat_cp(m);
  if (!nml_mat_col_mult_r(r, col, num)) {
    nml_mat_free(r);
    return NULL;
  }
  return r;
}

int nml_mat_col_mult_r(nml_mat *m, unsigned int col, double num) {
  if (col>=m->num_cols) {
    NML_FERROR(CANNOT_COL_MULTIPLY, col, m->num_cols);
    return 0;
  }
  int i;
  for(i = 0; i < m->num_rows; i++) {
    m->data[i][col] *= num;
  }
  return 1;
} 
```

Notice how we select the column: `m->data[i][col] *= num` , where `i = 0 .. m->num_rows`.

### Adding two rows

The ability to add one row to another, is am important method used later for the implementation of more advanced algorithms: LUP Decomposition, Row Echelon Form, Reduced Row Echelon Form, etc.

In addition, before adding one row to another we should also offer the possibility to multiply the row with a given scalar.

We define the following method(s):

```c
// We add all elements from row 'row' to row 'where'. 
// The elements from row 'row' are muliplied using the 'multiplier'
//
// This one works through reference, modifying the `m` matrix; 
int nml_mat_row_addrow_r(nml_mat *m, unsigned int where, 
unsigned int row, double multiplier);

// We add all elements from row 'row' to row 'where'. 
// The elements from row 'row' are muliplied using the 'multiplier'
//
// This one returns a new matrix, `nml_mat *r`, after the row addition is performed    
* nml_mat *nml_mat_row_addrow(nml_mat *m, unsigned int where, unsigned int row, 
double multiplier);
```    

To better visualise:

$$\text{nml_mat_row_addrow_r(}
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 4.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
\text{, 0, 1, 0.5)=}
\\
\begin{bmatrix}
1.0 + 0 * 0.5 & 2.0 + 2.0 * 0.5 & 3 + 4.0 * 0.5\\
0.0 & 2.0 & 3.0\\
4.0 & 1.0 & 9.0
\end{bmatrix}
\text{=}
\\
\begin{bmatrix}
1.0 & 3.0 & 5.0\\
0.0 & 2.0 & 3.0\\
4.0 & 1.0 & 9.0
\end{bmatrix}
$$

The corresponding C code for the two methods is:

```c
nml_mat *nml_mat_row_addrow(nml_mat *m, unsigned int where, 
unsigned int row, double multiplier) {
  nml_mat *r = nml_mat_cp(m);
  if (!nml_mat_row_addrow_r(m, where, row, multiplier)) {
    nml_mat_free(r);
    return NULL;
  }
  return r;
}

int nml_mat_row_addrow_r(nml_mat *m, unsigned int where, 
unsigned int row, double multiplier) {

  if (where >= m->num_rows || row >= m->num_rows) {
    NML_FERROR(CANNOT_ADD_TO_ROW, multiplier, row, where, m->num_rows);
    return 0;
  }
  int i = 0;
  for(i = 0; i < m->num_cols; i++) {
    m->data[where][i] += multiplier * m->data[row][i];
  }
  return 1;
} 
```

Notice how we are selecting the rows:  `m->data[where][i] += multiplier * m->data[row][i]` , where `i = 0 .. i < m->num_cols`.

In case it's not obvious, if the user simply wants to add two rows, without any multiplication, the multiplier should be kept as `1.0`.

### Multiplying the matrix with a scalar

The mathematical formula for multiplying the matrix with a scalar is simple:

$$s * 
\begin{bmatrix}
a_{01} & a_{02} & ... && a_{0n}\\
a_{11} & a_{12} & ... && a_{1n}\\
... & ... & ... && ...\\
a_{m1} & a_{m2} & ... && a_{mn}\\
\end{bmatrix}
=
\begin{bmatrix}
s * a_{01} & s * a_{02} & ... && s * a_{0n}\\
s * a_{11} & s * a_{12} & ... && s * a_{1n}\\
... & ... & ... && ...\\
s * a_{m1} & s * a_{m2} & ... && s * a_{mn}\\
\end{bmatrix}
$$

So, just like the formula, the code equivalent is simple:

```c
nml_mat *nml_mat_smult(nml_mat *m, double num) {
  nml_mat *r = nml_mat_cp(m);
  nml_mat_smult_r(r, num);
  return r;
}

int nml_mat_smult_r(nml_mat *m, double num) {
  int i, j;
  for(i = 0; i < m->num_rows; i++) {
    for(j = 0; j < m->num_cols; j++) {
      m->data[i][j] *= num;
    }
  }
  return 1;
} 
```

For each element `m->data[i][j]` we perform the multiplication with the scalar `num`:  `m->data[i][j] *= num` where `i = 0 .. num_rows` and `j = 0 .. num_cols`.

## Modifying the `nml_mat` internal structure

The next set of functionalities we can write to help our ~potential~ library users to modify the `nml_mat` matrix structure are:
* Remove a columns and rows and return a new matrix;
* Swap rows inside a given matrix;
* Swap columns inside a given matrix;
* Concatenate vertically and horizontally two matrices;

### Removing a column

Removing a column from a`M[n x m]` matrix, involves the creation of a new `[n x (m-1)]` matrix.

The method signature looks like this:

```c
nml_mat *nml_mat_col_rem(nml_mat *m, unsigned int column);
```

For this particular use-case it would be overkill to try to create a "by-reference" (`_r`) version of the method.

Calling the `nml_mat_col_rem` on a matrix yields the following results:

$$
\text{nml_mat_col_rem(}
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 4.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
\text{, 1)=}
\begin{bmatrix}
1.0 & 3.0\\
0.0 & 4.0\\
2.0 & 9.0
\end{bmatrix}
$$

The code implementation: 

```c
nml_mat *nml_mat_col_rem(nml_mat *m, unsigned int column) {
  if(column >= m->num_cols) {
    NML_FERROR(CANNOT_REMOVE_COLUMN, column, m->num_cols);
    return NULL;
  }
  nml_mat *r = nml_mat_new(m->num_rows, m->num_cols-1);
  int i, j, k;
  for(i = 0; i < m->num_rows; i++) {
    for(j = 0, k=0; j < m->num_cols; j++) {
      if (column!=j) {
        r->data[i][k++] = m->data[i][j];
      }
    }
  }
  return r;
}
```

Observations:
* The resulting `r` matrix has the number of columns `m->num_cols-1`;
* We keep a separate column index for the `r` matrix that we name `k`;  
* When copying the elements from `m` to `r` we skip the column `column` by adding this condition `(column!=j)`:
    - Then we increment `k`, using `k++` inside the `r->data[i][k++]` statement;
    - From this moment onwards `k-j == 1`, meaning `k` and `j` are no longer in sync, because we've skipped the column.
    
### Removing a row

Removing a column from a`M[n x m]` matrix, involves the creation of a new `[(n-1) x m]` matrix.

The method signature looks like this:

```c
nml_mat *nml_mat_row_rem(nml_mat *m, unsigned int row);
```

Calling the `nml_mat_row_rem` on a matrix yields the following results:

$$
\text{nml_mat_row_rem(}
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 4.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
\text{, 1)=}
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
$$

The code implementation:

```c 
nml_mat *nml_mat_row_rem(nml_mat *m, unsigned int row) {
  if (row >= m->num_rows) {
    NML_FERROR(CANNOT_REMOVE_ROW, row, m->num_rows);
    return NULL;
  }
  nml_mat *r = nml_mat_new(m->num_rows-1, m->num_cols);
  int i, j, k;
  for(i = 0, k = 0; i < m->num_rows; i++) {
    if (row!=i) {
      for(j = 0; j < m->num_cols; j++) {
        r->data[k][j] = m->data[i][j];
      }
      k++;
    }
  }
  return r;
}
```

Observations:
* The resulting matrix `r` has the same number of columns as m (`m->num_cols`), but a smaller number of rows (`r->num_rows`);
* We keep a separate row index `k` for the resulting matrix 'r';
* Initially `k` is in sync with `i`, as long as `(row!=i)`;
* When `row==i`, `k` is no longer incremented, so the sync is lost and `i - k == 1`. This is how the row gets skipped.

### Swapping Rows

This functionality will prove useful later when we re going to implement the Row Echelon Form and LU Decomposition algorithms.

In this case we can define two methods:

```c
// Returns a new matrix with row1 and row2 swapped
nml_mat *nml_mat_row_swap(nml_mat *m, unsigned int row1, unsigned int row2);

// Modifies the existing matrix m, by swapping the two rows row1 and row2
int nml_mat_row_swap_r(nml_mat *m, unsigned int row1, unsigned int row2);
```

Visually the method works like this:

$$
\text{nml_mat_row_swap_r(}
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 4.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
\text{, 0, 1)=}
\begin{bmatrix}
0.0 & 2.0 & 4.0\\
1.0 & 2.0 & 3.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
$$

The C implementation makes use of the fact that rows are contiguous memory blocks can be swapped without having to access each element of the rows in particular:

```c
int nml_mat_row_swap_r(nml_mat *m, unsigned int row1, unsigned int row2) {
  if (row1 >= m->num_rows || row2 >= m->num_rows) {
    NML_FERROR(CANNOT_SWAP_ROWS, row1, row2, m->num_rows);
    return 0;
  }
  double *tmp = m->data[row2];
  m->data[row2] = m->data[row1];
  m->data[row1] = tmp;
  return 1;
} 
```

As for the `nml_mat_row_swap(..)` this can be written by re-using `nml_mat_row_swap_r(...)`:

```c
nml_mat *nml_mat_row_swap(nml_mat *m, unsigned int row1, unsigned int row2) {
  nml_mat *r = nml_mat_cp(m);
  if (!nml_mat_row_swap_r(r, row1, row2)) {
    nml_mat_free(r);
    return NULL;
  }
  return r;
} 
```

### Swapping columns

This functionality might not be as useful as the previous one (`nml_mat_row_swap(...)`), but for sake of having a robust API for our ~potential~ users, we will implement it.

We define again two methods, one that is returning a new `nml_mat` matrix, and one that operates on the given on:

```c
nml_mat *nml_mat_col_swap(nml_mat *m, unsigned int col1, unsigned int col2);
int nml_mat_col_swap_r(nml_mat *m, unsigned int col1, unsigned int col2); 
```

Visually the two methods are working like this:

$$
\text{nml_mat_col_swap_r(}
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 4.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
\text{, 0, 1)=}
\begin{bmatrix}
2.0 & 1.0 & 4.0\\
2.0 & 0.0 & 3.0\\
1.0 & 2.0 & 9.0
\end{bmatrix}
$$

Compared to the previous two functions (for swapping rows) the code is slightly different. Columns are not contiguous blocks of memory, so we will need to swap each element one by one:

```c
int nml_mat_col_swap_r(nml_mat *m, unsigned int col1, unsigned int col2) {
  if (col1 >= m->num_cols || col2 >= m->num_cols) {
    NML_FERROR(CANNOT_SWAP_ROWS, col1, col2, m->num_cols);
    return 0;
  }
  double tmp;
  int j;
  for(j = 0; j < m->num_rows; j++) {
    tmp = m->data[j][col1];
    m->data[j][col1] = m->data[j][col2];
    m->data[j][col2] = tmp;
  }
  return 1;
} 
```

Writing the `nml_mat_col_swap(...)` version of the method will simply re-use the previous "`_r`" one:

```c
nml_mat *nml_mat_col_swap(nml_mat *m, unsigned int col1, unsigned int col2) {
  nml_mat *r = nml_mat_cp(m);
  if (!nml_mat_col_swap_r(r, col1, col2)) {
    nml_mat_free(r);
    return NULL;
  }
  return r;
} 
```

### Horizontal Concatenation of two matrices

This functionality is probably not very useful from a "scientific" point of view, but it's a nice exercise we can solve, and a neat "utility" we can add to the library.

We would like to write a function, that takes a variable number of matrices (`nml_mat**`) and returns a new matrix that represents the horizontal concatenation of those matrices.

It's important that all the input matrices have the same number of columns, otherwise the horizontal concatenation won't work.

Our C function will have the following signature:

```c
nml_mat *nml_mat_cath(unsigned int mnum, nml_mat **marr); 
```

Where:
* `unsigned int mnum` - represents the total number of matrices we want to (horizontally) concatenate;
* `nml_mat **marr` - are the matrices we want to (horizontally) concatenate;

Visually, the function works like this:

$$
A=
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 4.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
\\
B=
\begin{bmatrix}
4.0 & 0.0 & 9.0\\
\end{bmatrix}
\\
C=
\begin{bmatrix}
3.0 & -1.0 & 1.0\\
2.0 & 0.0 & -5.0
\end{bmatrix}
$$

Calling the method `nml_mat_cath(3, **[A, B, C])` will yield the following result:

$$
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 4.0\\
2.0 & 1.0 & 9.0\\
4.0 & 0.0 & 9.0\\
3.0 & -1.0 & 1.0\\
2.0 & 0.0 & -5.0
\end{bmatrix}
$$

The corresponding C code for this implementation looks like this:

```c
nml_mat *nml_mat_cath(unsigned int mnum, nml_mat **marr) {
  if (0==mnum) {
    // No matrices, nothing to return
    return NULL;
  }
  if (1==mnum) {
    // We just return the one matrix supplied as the first param
    // no need for additional logic
    return nml_mat_cp(marr[0]);
  }
  // We calculate the total number of columns to know how to allocate memory
  // for the resulting matrix
  int i,j,k,offset;
  unsigned int lrow, ncols;
  lrow = marr[0]->num_rows;
  ncols = marr[0]->num_cols;
  for(k = 1; k < mnum; k++) {
    if (NULL == marr[k]) {
      NML_FERROR(INCONSITENT_ARRAY, k, mnum);
      return NULL;
    }
    if (lrow != marr[k]->num_rows) {
      NML_FERROR(CANNOT_CONCATENATE_H, lrow, marr[k]->num_rows);
      return NULL;
    }
    ncols+=marr[k]->num_cols;
  }
  // At this point we know how the resulting matrix looks like,
  // we allocate memory for it accordingly
  nml_mat *r = nml_mat_new(lrow, ncols);
  for(i = 0; i < r->num_rows; i++) {
    k = 0;
    offset = 0;
    for(j = 0; j < r->num_cols; j++) {
      // If the column index of marr[k] overflows
      if (j-offset == marr[k]->num_cols) {
        offset += marr[k]->num_cols;
        // We jump to the next matrix in the array
        k++;
      }
      r->data[i][j] = marr[k]->data[i][j - offset];
    }
  }
  return r;
}
```

Observations:
* `i`, `j` are used to iterate over the resulting matrix (`r`);
* `k` is the index of the current we are concatenating;
* `offset` is useful to determine we need to jump to next matrix that needs concatenation.

### Vertical concatenation

Just like the horizontal concatenation, this functionality is not very useful for the more complex algorithms we are going to implement later in this tutorial. But, for the sake of our ~potential~ library users, and because it's a nice exercise we will implement it.

The main idea is to write a function, that takes a variable number of matrices (`nml_mat**`) and returns a new matrix that represents the vertical concatenation of those matrices.

It's important that all the input matrices have the same number of rows, otherwise the vertical concatenation won't work.

The method signature looks like:

`nml_mat *nml_mat_catv(unsigned int mnum, nml_mat **marr);`

Where:
* `unsigned int mnum` - represents the total number of matrices we want to (horizontally) concatenate;
* `nml_mat **marr` - are the matrices we want to (horizontally) concatenate;

Visually the method works like this:

$$
A=
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 4.0\\
\end{bmatrix}
\\
B=
\begin{bmatrix}
4.0 & 0.0 & 9.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
\\
$$

Calling `nml_mat_catv(2, **[A, B])` will return the following result:

$$
\begin{bmatrix}
1.0 & 2.0 & 3.0 & 4.0 & 0.0 & 9.0\\
0.0 & 2.0 & 4.0 & 2.0 & 1.0 & 9.0
\end{bmatrix}
$$

The code implementation looks like this:

```c 
// Concatenates a variable number of matrices into one.
// The concentation is done vertically this means the matrices need to have
// the same number of columns, while the number of rows is allowed to
// be variable
nml_mat *nml_mat_catv(unsigned int mnum, nml_mat **marr) {
  if (0 == mnum) {
    return NULL;
  }
  if (1 == mnum) {
    return nml_mat_cp(marr[0]);
  }
  // We check to see if the matrices have the same number of columns
  int lcol, i, j, k, offset;
  unsigned int numrows;
  nml_mat *r;
  lcol = marr[0]->num_cols;
  numrows = 0;
  for(i = 0; i < mnum; i++) {
    if (NULL==marr[i]) {
      NML_FERROR(INCONSITENT_ARRAY, i, mnum);
      return NULL;
    }
    if (lcol != marr[i]->num_cols) {
      NML_FERROR(CANNOT_CONCATENATE_V,lcol,marr[i]->num_cols);
      return NULL;
    }
    // In the same time we calculate the resulting matrix number of rows
    numrows+=marr[i]->num_rows;
  }
  // At this point we know the dimensions of the resulting Matrix
  r = nml_mat_new(numrows, lcol);
  // We start copying the values one by one
  for(j = 0; j < r->num_cols; j++) {
    offset = 0;
    k = 0;
    for(i = 0; i < r->num_rows; i++) {
      if (i - offset == marr[k]->num_rows) {
        offset += marr[k]->num_rows;
        k++;
      }
      r->data[i][j] = marr[k]->data[i-offset][j];
    }
  }
  nml_mat_print(r);
  return r;
}
```

Observations:
* `i`, `j` are used to iterate over the resulting matrix (`r`);
* Compared to our previous method (`nml_mat_cath(..)`) this time we start by iterating though the columns;
* `k` is the index of the current matrix we are concatenating;
* `offset` is useful to determine we need to jump to next matrix that needs concatenation

## Basic Matrix Operations

### Add two matrices

From a mathematical perspective the formula for adding two matrices A and B is quit simple:

$$
\begin{bmatrix}
a_{01} & a_{02} & ... && a_{0n}\\
a_{11} & a_{12} & ... && a_{1n}\\
... & ... & ... && ...\\
a_{m1} & a_{m2} & ... && a_{mn}\\
\end{bmatrix}
+
\begin{bmatrix}
b_{01} & b_{02} & ... && b_{0n}\\
b_{11} & b_{12} & ... && b_{1n}\\
... & ... & ... && ...\\
b_{m1} & b_{m2} & ... && b_{mn}\\
\end{bmatrix}
=
\\
\begin{bmatrix}
a_{01} + b_{01} & a_{02} + b_{02} & ... && a_{0n} + b_{0n}\\
a_{11} + b_{11} & a_{12} + b_{12} & ... && a_{1n} + b_{1n}\\
... & ... & ... && ...\\
a_{m1} + b_{m1} & a_{m2} + b_{m2} & ... && a_{mn} +  b_{mn}\\
\end{bmatrix}
$$

Basically each element from the first matrix gets added with the corresponding element from the second matrix.

The corresponding C code is straightforward:

```c
nml_mat *nml_mat_add(nml_mat *m1, nml_mat *m2) {
  nml_mat *r = nml_mat_cp(m1);
  if (!nml_mat_add_r(r, m2)) {
    nml_mat_free(r);
    return NULL;
  }
  return r;
}

int nml_mat_add_r(nml_mat *m1, nml_mat *m2) {
  if (!nml_mat_eqdim(m1, m2)) {
    NML_ERROR(CANNOT_ADD);
    return 0;
  }
  int i, j;
  for(i = 0; i < m1->num_rows; i++) {
    for(j = 0; j < m1->num_rows; j++) {
      m1->data[i][j] += m2->data[i][j];
    }
  }
  return 1;
}
```

### Subtracting two matrices

This is very similar with to the addition, except this time each element from `m2` is subtracted from the corresponding element from `m1`:

```c
nml_mat *nml_mat_sub(nml_mat *m1, nml_mat *m2) {
  nml_mat *r = nml_mat_cp(m2);
  if (!nml_mat_sub_r(r, m2)) {
    nml_mat_free(r);
    return NULL;
  }
  return r;
}

int nml_mat_sub_r(nml_mat *m1, nml_mat *m2) {
  if (!nml_mat_eqdim(m1, m2)) {
    NML_ERROR(CANNOT_SUBTRACT);
    return 0;
  }
  int i, j;
  for(i = 0; i < m1->num_rows; i++) {
    for(j = 0; j < m1->num_cols; j++) {
      m1->data[i][j] -= m2->data[i][j];
    }
  }
  return 1;
} 
```

### Multiplying two matrices

Having a matrix `A[m x n]` and a matrix `B[n x p]`:

$$ A = 
\begin{bmatrix}
a_{11} & a_{12} & ... && a_{1n}\\
a_{21} & a_{22} & ... && a_{2n}\\
... & ... & ... && ...\\
a_{m1} & a_{m2} & ... && a_{mn}\\
\end{bmatrix}
, B =
\begin{bmatrix}
b_{11} & b_{12} & ... && b_{1p}\\
b_{11} & b_{12} & ... && b_{2p}\\
... & ... & ... && ...\\
b_{n1} & b_{n2} & ... && b_{np}\\
\end{bmatrix}
$$

We define the product $$A * B = C$$, where `C [m x p]`:

$$ C =
\begin{bmatrix}
c_{11} & c_{12} & ... && c_{1p}\\
c_{11} & c_{12} & ... && c_{2p}\\
... & ... & ... && ...\\
c_{m1} & c_{m2} & ... && c_{mp}\\
\end{bmatrix}
$$

Where:

$$c_{ij} = a_{i1} * b_{1j} + a_{i2} * b_{2j} + ... + a_{in} * b_{nj} = \sum_{k=1}^{n} a_{ik} * b_{kj}$$, for $$i \rightarrow 1..m$$ and $$j \rightarrow 1..p$$.

The product $$A*B$$ is defined if and only if the number of columns in `A` equals the number of rows in `B`, which is `n`.

The resulting product matrix will then "inherit" the number of rows from `A` and the number of columns from `B`.

The formula is more easy to digest if we follow a simple example:


$$
A=
\begin{bmatrix}
1 & 2 & 3\\
0 & 0 & 4
\end{bmatrix}
\\
B=
\begin{bmatrix}
2 & 3 \\
2 & 1 \\
1 & 5
\end{bmatrix}
\\
$$

$$A*B$$ exists because `A[2x3]` and `B[3x2]`. The resulting matrix `C` will be `2x2`.

$$
C=
\begin{bmatrix}
1 * 2 + 2 * 2 + 3 * 1 & 1 * 3 + 2 * 1 + 3 * 5 \\
0 * 2 + 0 * 2 + 4 * 1 & 0 * 3 + 0 * 1 + 4 * 5 \\
\end{bmatrix}
=
\begin{bmatrix}
9 & 20 \\
4 & 20 \\
\end{bmatrix}
$$

The naive C implementation for this algorithm looks like:

```c 
nml_mat *nml_mat_dot(nml_mat *m1, nml_mat *m2) {
  if (!(m1->num_cols == m2->num_rows)) {
    NML_ERROR(CANNOT_MULITPLY);
    return NULL;
  }
  int i, j, k;
  nml_mat *r = nml_mat_new(m1->num_rows, m2->num_cols);
  for(i = 0; i < r->num_rows; i++) {
    for(j = 0; j < r->num_cols; j++) {
      for(k = 0; k < m1->num_cols; k++) {
        r->data[i][j] += m1->data[i][k] * m2->data[k][j];
      }
    }
  }
  return r;
}
```

Better algorithms exists for matrix multiplications, if you want to find out more please check this wikipedia [article](https://en.wikipedia.org/wiki/Matrix_multiplication_algorithm).

## Row Echelon Form 

A matrix `A` is in _Row Echelon Form_ if it has the shape resulting from a Gaussian Elimination. 

Additionally, the matrix `A` is in Row Echelon form if:
* The first non-zero element for each row is exactly `1.0`;
* Rows with all `0.0` elements are bellow rows that have at least one non-zero element.
* Each leading entry (pivot) is in a column to the right of the leading entry in the previous row.


All the bellow matrices are examples of matrices that have been "morphed" into Row Echelon Form:

$$
A=
\begin{bmatrix}
1 & 2 & 3 & 4 \\
0 & 0 & 1 & 3 \\
0 & 0 & 0 & 1 
\end{bmatrix}
\\
B=
\begin{bmatrix}
1 & 2 & 3 & 4 \\
0 & 0 & 1 & 3 \\
0 & 0 & 0 & 1 \\
0 & 0 & 0 & 0
\end{bmatrix}
\\
C=
\begin{bmatrix}
1 & 2 \\
0 & 1 \\
0 & 0 \\
0 & 0
\end{bmatrix}
\\
$$

Every matrix can be transformed into a Row Echelon, by using _elementary row operations_:
* Interchanging (swapping) two rows. See `nml_mat_row_swap_r(...)` implemented before;
* Multiply each element in a row by a non-zero number (scalar multiplication of rows). See `nml_mat_row_mult_r(...)` implemented before;
* Multiply a row by a non-zero number and add the result to another row (row addition). See `nml_mat_row_addrow_r(...)` implemented before;

The algorithm to transform the matrix in a Row Echelon Form is as follows:
1. Find the "pivot", the first non-zero entry from the first column of the matrix;
    - If the column has only zero elements, jump to the next column;
2. Interchange rows, moving the pivot row to become the first row;
3. Multiply each element in the pivot by the inverse of the pivot $$\frac{1}{pivot}$$ so that the pivot equals `1.0`;
4. Add multiplies of the pivot row to each of the pivot rows, so every element in the pivot column will equal `0.0`.
5. Continue the process until there are no more pivots to process.

*Note:* A matrix can have multiple Row Echelon Forms, but you will see in the next chapter, there's only one Reduced Row Echelon Form.

### Example

Let's take for example the following matrix, `A[3x3]`. `REF(A)` is also a `3x3` matrix. The transitions are:

$$
A=
\begin{bmatrix}
0 & 1 & 2 \\
1 & 2 & 1 \\
2 & 7 & 8
\end{bmatrix}
\rightarrow
A_{1}=
\begin{bmatrix}
1 & 2 & 1 \\
0 & 1 & 2 \\
2 & 7 & 8
\end{bmatrix}
\rightarrow
A_{2} =
\begin{bmatrix}
1 & 2 & 1 \\
0 & 1 & 2 \\
0 & 3 & 6
\end{bmatrix}
\rightarrow
\\
A_{ref}  =
\begin{bmatrix}
1 & 2 & 1 \\
0 & 1 & 2 \\
0 & 0 & 0
\end{bmatrix}
$$


$$A \rightarrow A_{1}$$: We found out that the first non-zero element of the first `column[0]` is `1` on `row[1]` so we've swapped `row[0]` with `row[1]`. Using our code this means:

$$
\text{nml_mat_row_swap_r(}
\begin{bmatrix}
0 & 1 & 2 \\
1 & 2 & 1 \\
2 & 7 & 8
\end{bmatrix}
\text{, 0, 1)=}
\begin{bmatrix}
1 & 2 & 1 \\
0 & 1 & 2 \\
2 & 7 & 8
\end{bmatrix}
$$

$$A_{1} \rightarrow A_{2}$$: For $$A_{1}$$ we've multiplied each element of `row[0]` with `-2` and added the result to `row[2]`. Using our code this means:

$$
\text{nml_mat_row_addrow_r(}
\begin{bmatrix}
1 & 2 & 1 \\
0 & 1 & 2 \\
2 & 7 & 8
\end{bmatrix}
\text{, 2, 0, -2.0)=}
\begin{bmatrix}
1 & 2 & 1 \\
0 & 1 & 2 \\
0 & 3 & 6
\end{bmatrix}
$$

$$A_{2} \rightarrow A_{ref}$$: For $$A_{2}$$ we've multiplied `row[1]` with `-3` and added the result to `row[2]`. Using the code this means:

$$
\text{nml_mat_row_addrow_r(}
\begin{bmatrix}
1 & 2 & 1 \\
0 & 1 & 2 \\
0 & 3 & 6
\end{bmatrix}
\text{, 2, 1, -2.0)=}
\begin{bmatrix}
1 & 2 & 1 \\
0 & 1 & 2 \\
0 & 0 & 0
\end{bmatrix}
$$

### Code implementation

Most of the bits and pieces for assembling the algorithm, were already implemented before: `nml_mat_row_swap_r(...)`, `nml_mat_row_mult_r(...)`, `nml_mat_row_addrow_r(...)`. 

What we are missing at this moment to assemble the algorithm is to write the "pivot function". We are going to call this: `_nml_mat_pivotidx(...)`:

```c 
// Finds the first non-zero element on the col column, under the row row.
// This is used to determine the pivot in gauss Elimination
// If not pivot is found, returns -1
int _nml_mat_pivotidx(nml_mat *m, unsigned int col, unsigned int row) {
  // No validations are made, this is an API Method
  int i;
  for(i = row; i < m->num_rows; i++) {
    if (fabs(m->data[i][col]) > NML_MIN_COEF) {
      return i;
    }
  }
  return -1;
}
```

At this point the algorithm is straight-forward to implement:

```c
// Retrieves the matrix in Row Echelon form using Gauss Elimination
nml_mat *nml_mat_ref(nml_mat *m) {
  nml_mat *r = nml_mat_cp(m);
  int i, j, k, pivot;
  j = 0, i = 0;
  // We iterate until we exhaust the columns and the rows
  while(j < r->num_cols && i < r->num_cols) {
    // Find the pivot - the first non-zero entry in the first column of the matrix
    pivot = _nml_mat_pivotidx(r, j, i);
    if (pivot<0) {
      // All elements on the column are zeros
      // We move to the next column without doing anything
      j++;
      continue;
    }
    // We interchange rows moving the pivot to the first row that doesn't have
    // already a pivot in place
    if (pivot!=i) {
      nml_mat_row_swap_r(r, i, pivot);
    }
    // Multiply each element in the pivot row by the inverse of the pivot
    nml_mat_row_mult_r(r, i, 1/r->data[i][j]);
    // We add multiplies of the pivot so every element on the column equals 0
    for(k = i+1; k < r->num_rows; k++) {
      if (fabs(r->data[k][j]) > NML_MIN_COEF) {
        nml_mat_row_addrow_r(r, k, i, -(r->data[k][j]));
      } 
    }
    i++;
    j++;
  }
  return r;
} 
```

`1/r->data[i][j]` might pose a risk. If `r->data[i][j]` becomes very small, (like, 0.0000...01), we might overflow when multiplying witg `1/r->data[i][j]`. 
In this regard I've introduced a "guard" value called `NML_MIN_COEF`. 

We consider every number smaller than `NML_MIN_COEF` to be `0.0`. That's why we perform this additional check: `if (fabs(r->data[k][j]) > NML_MIN_COEF)` in our algorithm.

## Reduced Row Echelon Form

A matrix $$A$$ is in Reduced Row Echelon Form, $$A_{rref}$$ if all the conditions of being in Row Echelon Form are satisfied, and the leading entry in each row is the only non-zero entry in this column.

For example the following matrices are in Reduced Row Echelon Form (Rref):

$$
A=
\begin{bmatrix}
1 & 2 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1
\end{bmatrix}
\\
B=
\begin{bmatrix}
1 & 2 & 0 & 0 \\
0 & 0 & 1 & 0 \\
0 & 0 & 0 & 1 \\
0 & 0 & 0 & 0
\end{bmatrix}
\\
C=
\begin{bmatrix}
1 & 0 \\


0 & 1 \\
0 & 0 \\
0 & 0
\end{bmatrix}
\\
$$

Compared to the previous algorithm, an additional step is performed:

1. We identify the last row having a pivot equal to `1`;
2. We mark this as the pivot row;
3. We add multiplies of the pivot row to each of it's upper rows, until every element above it remains `0.0`;
4. We repeat the process from bottom-up.

*Note:* A matrix has only `RREF` form, but can have many `REF` forms. 

## Code Implementation

To make the algorithm more stable from a "computational" perspective we will change the "pivoting method" used above. We introduce a new one:

```c
// Find the max element from the column "col" under the row "row"
// This is needed to pivot in Gauss-Jordan elimination
// If pivot is not found, return -1
int _nml_mat_pivotmaxidx(nml_mat *m, unsigned int col, unsigned int row) {
  int i, maxi;
  double micol;
  double max = fabs(m->data[row][col]);
  maxi = row;
  for(i = row; i < m->num_rows; i++) {
    micol = fabs(m->data[i][col]);
    if (micol>max) {
      max = micol;
      maxi = i;
    }
  }
  return (max < NML_MIN_COEF) ? -1 : maxi;
} 
```

Compared to the previous one, this one will return the biggest element on the column under row `row`. 
This will be picked as pivot.

The C code:

```c
// Retrieves the matrix in Row Echelon form using Gauss Elimination
nml_mat *nml_mat_ref(nml_mat *m) {
  nml_mat *r = nml_mat_cp(m);
  int i, j, k, pivot;
  j = 0, i = 0;
  while(j < r->num_cols && i < r->num_cols) {
    // Find the pivot - the first non-zero entry in the first column of the matrix
    pivot = _nml_mat_pivotidx(r, j, i);
    if (pivot<0) {
      // All elements on the column are zeros
      // We move to the next column without doing anything
      j++;
      continue;
    }
    // We interchange rows moving the pivot to the first row that doesn't have
    // already a pivot in place
    if (pivot!=i) {
      nml_mat_row_swap_r(r, i, pivot);
    }
    // Multiply each element in the pivot row by the inverse of the pivot
    nml_mat_row_mult_r(r, i, 1/r->data[i][j]);
    // We add multiplies of the pivot so every element on the column equals 0
    for(k = i+1; k < r->num_rows; k++) {
      if (fabs(r->data[k][j]) > NML_MIN_COEF) {
        nml_mat_row_addrow_r(r, k, i, -(r->data[k][j]));
      } 
    }
    i++;
    j++;
  }
  return r;
} 
```

## LU(P) Decomposition

LU Decomposition, also named LU Factorisation refers to the factorisation of a matrix A, into two factors `L` and `U`.

Normally the factorisation looks like this:

$$
\begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33} 
\end{bmatrix}
=
\begin{bmatrix}
1 & 0 & 0 \\
l_{21} & 1 & 0 \\
l_{31} & l_{32} & 1
\end{bmatrix} 
* 
\begin{bmatrix}
u_{11} & u_{12} & u_{13} \\
0 & u_{22} & u_{23} \\
0 & 0 & u_{33}
\end{bmatrix}
$$

In practice, however, this type of factorisation might fail to materialise without swapping various rows of A during the computation. In this case, we need to introduce into the equation a new matrix `P` where we keep track of all the row changes that are happening during the LU process.

Thus, the decomposition is called _LU Factorisation with partial pivoting_, and the new equation becomes:

$$P * A = L * U$$

Where:
* `P` represents any valid (row) permutation of the Identity `I` matrix, and it's computed during the process;
* `L` is a lower diagonal matrix, with all the elements of the first diagonal `==1`;
* `U` is an upper diagonal matrix.

There's another factorisation where not only the rows are pivoted, but also columns, this is called _LU Factorisation with full pivoting_ but we are not going to implement this.

If the `A` matrix is square (`nxn`), it can always be decomposed like : $$P * A = L * U$$.

To compute the LU(P) decomposition we will need to basically implement a modified version of the Gauss Elimination algorithm (see Row Echelon Form). This is probably the most popular implementation, and it requires around $$\frac{2}{3}*n^{3}$$ floating point operations.

Other algorithms involve direct recursion or randomization. We are not going to implement those versions. 

Computing the $$P * A = L * U$$ decomposition of matrix `A` is instrumental for computing the determinant of matrix `A`, the inverse of matrix `A` and solving linear systems of equations.

### The LU(P) algorithm as an example

LU(P) factorisation (or decomposition) can be obtained by adjusting the idea of Gaussian Elimination (see Row Echelon Form and Reduced Row Echelon Form).

The algorithm starts like this:
* We allocate memory for the L, U, P matrices
  * `L` starts as zero matrix;
  * `P` is the identity matrix;
  * `U` is an exact copy of A;
* We start iterating the matrix `U` by columns
  * For each column we look for the pivot value (the biggest value of the column in absolute)
    * If needed we swap the corresponding rows in `U`, `L` and `P`, so that the pivot is position on the first diagonal;
    * If no swap is needed we start creating zeroes on the column by the means of row addition. $$Row{x} + multiplier * Row{y}$$. 
      * We record the `multiplier` in matrix `L`
  * We repeat for every column until `U` has only zero elements under the first diagonal.
  
Let's look at the decomposition for a matrix `A[3x3]`:

$$
P=
\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1  
\end{bmatrix}
, A =
\begin{bmatrix}
2 & 1 & 5 \\
4 & 4 & -4 \\
1 & 3 & 1  
\end{bmatrix}
, L =
\begin{bmatrix}
0 & 0 & 0 \\
0 & 0 & 0 \\
0 & 0 & 0  
\end{bmatrix}
, U = 
\begin{bmatrix}
2 & 1 & 5 \\
4 & 4 & -4 \\
1 & 3 & 1  
\end{bmatrix}
$$

* **Step1**: Because `4>2`, we swap $$Row_{0}$$ with $$Row_{1}$$. After this row operation we have:

$$
P=
\begin{bmatrix}
0 & 1 & 0 \\
1 & 0 & 0 \\
0 & 0 & 1  
\end{bmatrix}
, L =
\begin{bmatrix}
0 & 0 & 0 \\
0 & 0 & 0 \\
0 & 0 & 0  
\end{bmatrix}
, U =
\begin{bmatrix}
4 & 4 & -4 \\
2 & 1 & 5 \\
1 & 3 & 1  
\end{bmatrix}
$$

* **Step 2**: We want to start creating zeroes on the first column. So we apply the following operation, $$Row_{1}-(\frac{1}{2})Row_{0}$$. We record the multiplier $$\frac{1}{2}$$ in `L[1][0]`, and we compute the basic row operation on `U`:

$$
P=
\begin{bmatrix}
0 & 1 & 0 \\
1 & 0 & 0 \\
0 & 0 & 1  
\end{bmatrix}
, L =
\begin{bmatrix}
0 & 0 & 0 \\
\frac{1}{2} & 0 & 0 \\
0 & 0 & 0  
\end{bmatrix}
, U =
\begin{bmatrix}
4 & 4 & -4 \\
0 & -1 & 7 \\
1 & 3 & 1  
\end{bmatrix}
$$

* **Step 3**: We continue to create zeroes on the first column, by applying: $$Row_{2} - \frac{1}{4}Row_{0}$$. We record the multiplier $$\frac{1}{4}$$ in `L[2][0]`, and we compute the row operation on `U`:

$$
P=
\begin{bmatrix}
0 & 1 & 0 \\
1 & 0 & 0 \\
0 & 0 & 1  
\end{bmatrix}
, L =
\begin{bmatrix}
0 & 0 & 0 \\
\frac{1}{2} & 0 & 0 \\
\frac{1}{4} & 0 & 0  
\end{bmatrix}
, U =
\begin{bmatrix}
4 & 4 & -4 \\
0 & -1 & 7 \\
0 & 2 & 2  
\end{bmatrix}
$$

* **Step 4**: We've finished with the first column, we skip to the next one. Because `-1<2` we swap $$Row_{1}$$ with $$Row_{2}$$. The idea is to always have the biggest pivot. `P`, `L` and `U` are affected by this swap:

$$
P=
\begin{bmatrix}
0 & 1 & 0 \\
0 & 0 & 1 \\
1 & 0 & 0 
\end{bmatrix}
, L =
\begin{bmatrix}
0 & 0 & 0 \\
\frac{1}{4} & 0 & 0 \\
\frac{1}{2} & 0 & 0 
\end{bmatrix}
, U =
\begin{bmatrix}
4 & 4 & -4 \\
0 & 2 & 2  \\
0 & -1 & 7 
\end{bmatrix}
$$

* **Step 5**: We want to create the last `0.0` on the second column. In this regard we apply $$Row_{2} - (-\frac{1}{2}) * Row_{1}$$:

$$
P=
\begin{bmatrix}
0 & 1 & 0 \\
0 & 0 & 1 \\
1 & 0 & 0
\end{bmatrix}
, L =
\begin{bmatrix}
0 & 0 & 0 \\
\frac{1}{4} & 0 & 0 \\
\frac{1}{2} & -\frac{1}{2} & 0
\end{bmatrix}
, U =
\begin{bmatrix}
4 & 4 & -4 \\
0 & 2 & 2  \\
0 & 0 & 8
\end{bmatrix}
$$

* **Step 6**: We modify L by adding `1`s on the first diagonal.

In conclusion, the $$P*A=L*U$$ factorization of `A` looks like:

$$
\begin{bmatrix}
0 & 1 & 0 \\
0 & 0 & 1 \\
1 & 0 & 0
\end{bmatrix}
*
\begin{bmatrix}
2 & 1 & 5 \\
4 & 4 & -4 \\
1 & 3 & 1  
\end{bmatrix}
=
\begin{bmatrix}
1 & 0 & 0 \\
\frac{1}{4} & 1 & 0 \\
\frac{1}{2} & -\frac{1}{2} & 1
\end{bmatrix}
*
\begin{bmatrix}
4 & 4 & -4 \\
0 & 2 & 2  \\
0 & 0 & 8
\end{bmatrix}
$$

There's also a video with this example, link [here](https://www.youtube.com/watch?v=f6RT4BI4S7M).

## Code implementation

The best way to model the results of the `LU(P)` computation is to create a `struct` called `nml_mat_lup` containing references to all three resulting matrices: `L`, `U`, `P`.

```c
typedef struct nml_mat_lup_s {
  nml_mat *L;
  nml_mat *U;
  nml_mat *P;
  unsigned int num_permutations;
} nml_mat_lup;
```

The property `num_permutations` records the number of row permutations we've done during the factorization process.
This value it's useful when computing the determinant of the matrix, so it's better to track it now.

To reduce memory consumption, the two matrices `L` and `U` can be kept in single matrix `LU` that looks like this:

$$
\begin{bmatrix}
u_{11} & u_{12} & u_{13} \\
l_{21} & u_{22} & u_{23} \\
l_{31} & l_{32} & u_{33}
\end{bmatrix}
$$

In our implementation, for simplicity and readability, we will keep them separated.

Following the same recipe as for `nml_mat` we are going to write "constructor-like"/"destructor-like" methods for managing the memory allocation for a `nml_mat_lup` structure. 

```c
nml_mat_lup *nml_mat_lup_new(nml_mat *L, nml_mat *U, nml_mat *P, unsigned int num_permutations) {
  nml_mat_lup *r = malloc(sizeof(*r));
  NP_CHECK(r);
  r->L = L;
  r->U = U;
  r->P = P;
  r->num_permutations = num_permutations;
  return r;
}

void nml_mat_lup_free(nml_mat_lup* lu) {
  nml_mat_free(lu->P);
  nml_mat_free(lu->L);
  nml_mat_free(lu->U);
  free(lu);
} 
```

The code that is performing the factorization:

```c
nml_mat_lup *nml_mat_lup_solve(nml_mat *m) {
  if (!m->is_square) {
    NML_FERROR(CANNOT_LU_MATRIX_SQUARE, m->num_rows, m-> num_cols);
    return NULL;
  }
  nml_mat *L = nml_mat_new(m->num_rows, m->num_rows);
  nml_mat *U = nml_mat_cp(m);
  nml_mat *P = nml_mat_eye(m->num_rows);

  int j,i, pivot;
  unsigned int num_permutations = 0;
  double mult;

  for(j = 0; j < U->num_cols; j++) {
    // Retrieves the row with the biggest element for column (j)
    pivot = _nml_mat_absmaxr(U, j);
    if (fabs(U->data[pivot][j]) < NML_MIN_COEF) {
      NML_ERROR(CANNOT_LU_MATRIX_DEGENERATE);
      return NULL;
    }
    if (pivot!=j) {
      // Pivots LU and P accordingly to the rule
      nml_mat_row_swap_r(U, j, pivot);
      nml_mat_row_swap_r(L, j, pivot);
      nml_mat_row_swap_r(P, j, pivot);
      // Keep the number of permutations to easily calculate the
      // determinant sign afterwards
      num_permutations++;
    }
    for(i = j+1; i < U->num_rows; i++) {
      mult = U->data[i][j] / U->data[j][j];
      // Building the U upper rows
      nml_mat_row_addrow_r(U, i, j, -mult);
      // Store the multiplier in L
      L->data[i][j] = mult;
    }
  }
  nml_mat_diag_set(L, 1.0);

  return nml_mat_lup_new(L, U, P, num_permutations);
} 
```

## Solving linear systems of equations

### Forward substitution

Forward substitution is the process of solving linear systems of equations $$L*x=B$$ if `L` is a lower diagonal coefficient matrix. 

$$
\begin{bmatrix}
l_{11} & 0 & ... && 0\\
l_{21} & l_{22} & ... && 0\\
... & ... & ... && ...\\
l_{m1} & l_{m2} & ... && l_{mm}\\
\end{bmatrix}
*
\begin{bmatrix}
x_{1} \\
x_{2} \\
...   \\
x_{m}
\end{bmatrix}
=
\begin{bmatrix}
b_{1} \\
b_{2} \\
...   \\
b_{m}
\end{bmatrix}
$$

In this case the resulting formulas for $$x_{1}, x_{2}, ..., x_{m}$$ are:

$$
x_{1} = \frac{b_{1}}{l_{11}} \\
x_{2} = \frac{b_{2}-l_{21}*x_{1}}{l_{22}} \\
... \\
x_{m} = \frac{b_{m}-\sum_{i=1}^{m-1} l_{mi}*x_{i}}{l_{mm}}
$$

Using the mathematical formulas, the code is easy to write:

```c
// Forward substitution algorithm
// Solves the linear system L * x = b
//
// L is lower triangular matrix of size NxN
// B is column matrix of size Nx1
// x is the solution column matrix of size Nx1
//
// Note: In case L is not a lower triangular matrix, the algorithm will try to
// select only the lower triangular part of the matrix L and solve the system
// with it.
//
// Note: In case any of the diagonal elements (L[i][i]) are 0 the system cannot
// be solved
//
// Note: This function is usually used with an L matrix from a LU decomposition
nml_mat *nml_ls_solvefwd(nml_mat *L, nml_mat *b) {
  nml_mat* x = nml_mat_new(L->num_cols, 1);
  int i,j;
  double tmp;
  for(i = 0; i < L->num_cols; i++) {
    tmp = b->data[i][0];
    for(j = 0; j < i ; j++) {
      tmp -= L->data[i][j] * x->data[j][0];
    }
    x->data[i][0] = tmp / L->data[i][i];
  }
  return x;
}
```

### Backward substitution

Backward substitution is the process of solving linear systems of equations $$U*x=Y$$ if `U` is an upper diagonal coefficient matrix.

$$
\begin{bmatrix}
u_{11} & u_{12} & ... && u_{1m}\\
0 & u_{22} & ... && u_{2m} \\
... & ... & ... && ...\\
0 & 0 & ... && u_{mm}\\
\end{bmatrix}
*
\begin{bmatrix}
x_{1} \\
x_{2} \\
...   \\
x_{m}
\end{bmatrix}
=
\begin{bmatrix}
y_{1} \\
y_{2} \\
...   \\
y_{m}
\end{bmatrix}
$$

Similar to the example above, the code implementation is straight-forward after we compute the mathematical formula:

```c
// Back substition algorithm
// Solves the linear system U *x = b
//
// U is an upper triangular matrix of size NxN
// B is a column matrix of size Nx1
// x is the solution column matrix of size Nx1
//
// Note in case U is not an upper triangular matrix, the algorithm will try to
// select only the upper triangular part of the matrix U and solve the system
// with it
//
// Note: In case any of the diagonal elements (U[i][i]) are 0 the system cannot
// be solved
nml_mat *nml_ls_solvebck(nml_mat *U, nml_mat *b) {
  nml_mat *x = nml_mat_new(U->num_cols, 1);
  int i = U->num_cols, j;
  double tmp;
  while(i-->0) {
    tmp = b->data[i][0];
    for(j = i; j < U->num_cols; j++) {
      tmp -= U->data[i][j] * x->data[j][0];
    }
    x->data[i][0] = tmp / U->data[i][i];
  }
  return x;
} 
```

### Solving linear systems using LU(P) decomposition

Knowing the $$P * A = L * U$$ factorisation of a matrix allows us to solve a liniar system of equations in the form: $$A*x=B$$ by using a combination of backward and forward substitution.

$$
A * x = B <=> \\
P * A * x = P * b <=> \\
L * U * x = P * b 
$$

To make use of the previous two algorithms (`nml_ls_solvebck(...)`, `nml_ls_solvefwd(...)`) we can introduce an auxiliary system of equations: $$y=U*x$$.

If $$y = U * x$$ => $$ L * y = P * b $$. This means that we need to solve two systems of equations:

* $$ L * y = P * b$$ - forward substition, because `L` is lower triangular matrix;
* $$ U * x = y$$ - backward substitution, becuase `U` is an upper triangular matrix.

Translating this into code is simple: 

```c
nml_mat *nml_ls_solve(nml_mat_lup *lu, nml_mat* b) {
  if (lu->U->num_rows != b->num_rows || b->num_cols != 1) {
    NML_FERROR(CANNOT_SOLVE_LIN_SYS_INVALID_B,
      b->num_rows,
      b->num_cols,
      lu->U->num_rows,
      1);
      return NULL;
  }
  nml_mat *Pb = nml_mat_dot(lu->P, b);

  // We solve L*y = P*b using forward substition
  nml_mat *y = nml_ls_solvefwd(lu->L, Pb);

  // We solve U*x=y
  nml_mat *x = nml_ls_solvebck(lu->U, y);

  nml_mat_free(y);
  nml_mat_free(Pb);
  return x;
} 
```

## Calculating the inverse of the matrix using LU(P) decomposition

A matrix $$A$$ is called invertible, if there exists a matrix $$A^{-1}$$ so that $$A * A^{-1} = I$$.

We call $$A^{-1}$$ the inverse of the matrix $$A$$. The equality $$A*A^{-1}=I$$ in matrix form looks like:

$$
\begin{bmatrix}
A_{11} & A_{12} & A_{13} \\
A_{21} & A_{22} & A_{23} \\
A_{31} & A_{32} & A_{33}
\end{bmatrix}
*
\begin{bmatrix}
A_{11}^{-1} & A_{12}^{-1} & A_{13}^{-1} \\
A_{21}^{-1} & A_{22}^{-1} & A_{23}^{-1} \\
A_{31}^{-1} & A_{32}^{-1} & A_{33}^{-1}
\end{bmatrix}
=
\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}
$$

To find $$A_{ij}^{-1}$$ we solve 3 systems of linear equations in the form:

$$
\begin{cases}
\begin{bmatrix}
A_{11} & A_{12} & A_{13} \\
A_{21} & A_{22} & A_{23} \\
A_{31} & A_{32} & A_{33}
\end{bmatrix}
*
\begin{bmatrix}
A_{11}^{-1}  \\
A_{21}^{-1}  \\
A_{31}^{-1}
\end{bmatrix}
=
\begin{bmatrix}
1 \\
0 \\
0 
\end{bmatrix}
\\
\begin{bmatrix}
A_{11} & A_{12} & A_{13} \\
A_{21} & A_{22} & A_{23} \\
A_{31} & A_{32} & A_{33}
\end{bmatrix}
*
\begin{bmatrix}
A_{12}^{-1}  \\
A_{22}^{-1}  \\
A_{32}^{-1}
\end{bmatrix}
=
\begin{bmatrix}
0 \\
1 \\
0
\end{bmatrix}
\\
\begin{bmatrix}
A_{11} & A_{12} & A_{13} \\
A_{21} & A_{22} & A_{23} \\
A_{31} & A_{32} & A_{33}
\end{bmatrix}
*
\begin{bmatrix}
A_{13}^{-1}  \\
A_{23}^{-1}  \\
A_{33}^{-1}
\end{bmatrix}
=
\begin{bmatrix}
0 \\
0 \\
1
\end{bmatrix}
\end{cases}
\rightarrow
\begin{cases}
A * A_{col1}^{-1} = I_{col1} \\
A * A_{col2}^{-1} = I_{col2} \\
A * A_{col3}^{-1} = I_{col3} \\
\end{cases}
$$

This means we need to solve actually three systems of type: $$A * x_{i} = B_{i}$$ where $$x_{i}$$ represents the column `i` of $$A^{-1}$$, and $$B_{i}$$ represents the column `i` of $$I$$.  

Having said this, the C code implementing the algorithm is as follows:

```c
// Calculates the inverse of a matrix
nml_mat *nml_mat_inv(nml_mat_lup *lup) {
  unsigned n = lup->L->num_cols;
  nml_mat *r = nml_mat_sqr(n);
  nml_mat *I = nml_mat_eye(lup->U->num_rows);
  nml_mat *invx;
  nml_mat *Ix;
  int i,j;
  for(j =0; j < n; j++) {
    Ix = nml_mat_col_get(I, j);
    invx = nml_ls_solve(lup, Ix);
    for(i = 0; i < invx->num_rows; i++) {
      r->data[i][j] = invx->data[i][0];
    }
    nml_mat_free(invx);
    nml_mat_free(Ix);
  }
  nml_mat_free(I);
  return r;
} 
```

## Calculating the determinant of the matrix using LU(P) decomposition

The determinant of the product of two matrices is the product of their determinants. After LU(P) decomposition we have $$P * A = L * U => det(P) * det(A) = det(L) * det(U)$$.

Because `P` is a permutation of `I`:

$$
det(P) = (-1)^{n} = f(n)
\begin{cases}
1, \text{n is even} \\
-1, \text{n is odd}
\end{cases}
$$

`n` represents the total number of permutations of I. This value is already computed and stored in `nml_mat_lup->num_permutations`.

`L` is a lower triangular matrix. The determinant of a lower triangular matrix is the product of its diagonal elements $$=> det(L) = 1$$.

`U` is an upper triangular matrix. The determinant of an upper triangular matrix is the product of its diagonal elements $$=> det(U) = \prod_{i=1}^{N} U_{ii}$$.

So, our initial relationship: $$det(P) * det(A) = det(L) * det(P) <=> det(A) = \frac{\prod_{i=1}^{N} U_{ii}}{\text{f(num_permutations)}}$$.

This means that the determinant of matrix `A` is actually the product of the diagonal elements of matrix `U` multiplied with *(-1)* in case the number of row permutations is odd. 

Putting this into code is as simple as:

```c
// After the LU(P) factorisation the determinant can be easily calculated
// by multiplying the main diagonal of matrix U with the sign.
// the sign is -1 if the number of permutations is odd
// the sign is +1 if the number of permutations is even
double nml_mat_det(nml_mat_lup* lup) {
  int k;
  int sign = (lup->num_permutations%2==0) ? 1 : -1;
  nml_mat *U = lup->U;
  double product = 1.0;
  for(k = 0; k < U->num_rows; k++) {
    product *= U->data[k][k];
  }
  return product * sign;
}
```

## QR Decomposition

Any square matrix `A` can be decomposed as: $$ A = Q * R $$ where `Q` is an orthogonal matrix, and `R` is an upper triangular matrix.

A matrix is orthogonal if its columns are orthogonal unit vectors, meaning: $$Q * Q^{T} = Q^{T} * Q = I$$. Where $$Q^{T}$$ is the transpose of $$Q$$. $$Q_{T} = Q_{-1}$$ for an orthogonal matrix.

The process of computing $$A = Q * R$$ is called the Gram–Schmidt algorithm.

If LU(P) factorization works mainly by applying basic matrix operations on rows, the QR decomposition is more focused on columns.

So we consider:

$$ 
A = 
\begin{bmatrix}
| & | & | \\
a_{1} & a_{2} & a_{3} \\
| & | & |
\end{bmatrix}
\text{, where } a_{i} \text{ are the column vectors of A}
\\
Q = 
\begin{bmatrix}
| & | & | \\
q_{1} & q_{2} & q_{3} \\
| & | & |
\end{bmatrix}
\text{, where } q_{i} \text{ are the column vectors of Q}
$$

Because all the vectors in matrix `Q` should have length `1`, we have to normalize the columns in `A`. 

This gives the following formulas:

$$
\begin{cases}
q_{1} = \frac{a_{1}}{\lVert a_{1} \rVert} \\
q_{2} = \frac{a^{\bot}_{2}}{\lVert a^{\bot}_{2} \rVert} \text{ where, } a^{\bot}_{2} = a_{2} - \langle a_{2}, q_{1} \rangle * q_{1} \\
q_{3} = \frac{a^{\bot}_{3}}{\lVert a^{\bot}_{3} \rVert} \text{ where, } a^{\bot}_{3} = a_{3} - \langle a_{3}, q_{1} \rangle * q_{1} - \langle a_{3}, q_{2} \rangle * q_{2}
\end{cases}
$$ 

Basically our QR decomposition looks like this:

$$
\begin{bmatrix}
| & | & | \\
a_{1} & a_{2} & a_{3} \\
| & | & |
\end{bmatrix}
=
\begin{bmatrix}
| & | & | \\
\frac{a_{1}}{\lVert a_{1} \rVert} & \frac{a^{\bot}_{2}}{\lVert a^{\bot}_{2} \rVert} & \frac{a^{\bot}_{3}}{\lVert a^{\bot}_{3} \rVert} \\
| & | & |
\end{bmatrix}
*
\begin{bmatrix}
\lVert a_{1} \rVert &  \langle a_{2}, q_{1} \rangle & \langle a_{3}, q_{1} \rangle \\
0 & \lVert a^{\bot}_{2} \rVert &  \langle a_{3}, q_{2} \rangle \\
0 & 0 & \lVert a^{\bot}_{3} \rVert
\end{bmatrix}
$$

The formulas can be generalized for every `nxn` matrix.

In case you are wondering what represents the $$\langle a_{i}, q_{j} \rangle$$ notation. This is called the dot product of two vectors, and it's calculated like this:

$$
a = [a_{1}, a_{2}, a_{3}, ..., a_{n}] \\
b = [b_{1}, b_{2}, b_{3}, ..., b_{n}] \\
\langle a, b \rangle = a_{1} * b_{1} + a_{2} * b_{2} + ... + a_{n} * b_{n} = \sum a_{i} * b_{i}
$$

From a code perspective this can be implemented as:

```c
// Useful for QR decomposition
// Represents the (dot) product of two vectors:
// vector1 = m1col column from m1
// vector2 = m2col column from m2
double nml_vect_dot(nml_mat *m1, unsigned int m1col, nml_mat *m2, unsigned m2col) {
  if (m1->num_rows!=m2->num_rows) {
    NML_FERROR(CANNOT_VECT_DOT_DIMENSIONS, m1->num_rows, m2->num_rows);
  }
  if (m1col >= m1->num_cols) {
    NML_FERROR(CANNOT_GET_COLUMN, m1col, m1->num_cols);
  }
  if (m2col >= m2->num_cols) {
    NML_FERROR(CANNOT_GET_COLUMN, m2col, m2->num_cols);
  }
  int i;
  double dot = 0.0;
  for(i = 0; i < m1->num_rows; i++) {
    dot += m1->data[i][m1col] * m2->data[i][m2col];
  }
  return dot;
} 
```

In case you are wondering what represents the $$\lVert a_{i} \rVert$$ this is called the $$L_{2}$$ Euclidean norm and it's computed by the formula:

$$
\lVert a \rVert = \sqrt{a^{2}_{1} + a^{2}_{2} + ... + a^{2}_{n}}
$$

From a code perspective this can be implemented as:

```c
// Calculates the l2 norm for a colum in the matrix
double nml_mat_col_l2norm(nml_mat *m, unsigned int col) {
  if (col >= m->num_cols) {
    NML_FERROR(CANNOT_COLUMN_L2NORM, col, m->num_cols);
  }
  double doublesum = 0.0;
  int i;
  for(i = 0; i < m->num_rows; i++) {
    doublesum += (m->data[i][col]*m->data[i][col]);
  }
  return sqrt(doublesum);
}

// Calculates the l2norm for each column
// Keeps results into 1 row matrix
nml_mat *nml_mat_l2norm(nml_mat *m) {
  int i, j;
  nml_mat *r = nml_mat_new(1, m->num_cols);
  double square_sum;
  for(j = 0; j < m->num_cols; j++) {
    square_sum = 0.0;
    for(i = 0; i < m->num_rows; i++) {
      square_sum+=m->data[i][j]*m->data[i][j];
    }
    r->data[0][j] = sqrt(square_sum);
  }
  return r;
} 
```

The code for the process of normalization is:

```c 
nt nml_mat_normalize_r(nml_mat *m) {
  nml_mat *l2norms = nml_mat_l2norm(m);
  int j;
  for(j = 0; j < m->num_cols; j++) {
    if (l2norms->data[0][j] < NML_MIN_COEF) {
      NML_FERROR(VECTOR_J_DEGENERATE, j);
      nml_mat_free(l2norms);
      return 0;
    }
    nml_mat_col_mult_r(m, j, 1/l2norms->data[0][j]);
  }
  nml_mat_free(l2norms);
  return 1;
}

nml_mat_qr *nml_mat_qr_new() {
  nml_mat_qr *qr = malloc(sizeof(*qr));
  NP_CHECK(qr);
  return qr;
}
```

And the code for the QR algorithm described by this relantionship:

$$
\begin{bmatrix}
| & | & | \\
a_{1} & a_{2} & a_{3} \\
| & | & |
\end{bmatrix}
=
\begin{bmatrix}
| & | & | \\
\frac{a_{1}}{\lVert a_{1} \rVert} & \frac{a^{\bot}_{2}}{\lVert a^{\bot}_{2} \rVert} & \frac{a^{\bot}_{3}}{\lVert a^{\bot}_{3} \rVert} \\
| & | & |
\end{bmatrix}
*
\begin{bmatrix}
\lVert a_{1} \rVert &  \langle a_{2}, q_{1} \rangle & \langle a_{3}, q_{1} \rangle \\
0 & \lVert a^{\bot}_{2} \rVert &  \langle a_{3}, q_{2} \rangle \\
0 & 0 & \lVert a^{\bot}_{3} \rVert
\end{bmatrix}
$$

is:

```c
nml_mat_qr *nml_mat_qr_solve(nml_mat *m) {

  nml_mat_qr *qr = nml_mat_qr_new();
  nml_mat *Q = nml_mat_cp(m);
  nml_mat *R = nml_mat_new(m->num_rows, m->num_cols);

  int j, k;
  double l2norm;
  double rkj;
  nml_mat *aj;
  nml_mat *qk;
  for(j=0; j < m->num_cols; j++) {    
    rkj = 0.0;
    aj = nml_mat_col_get(m, j);
    for(k = 0; k < j; k++) {
       rkj = nml_vect_dot(m, j, Q, k);
       R->data[k][j] = rkj;
       qk = nml_mat_col_get(Q, k);
       nml_mat_col_mult_r(qk, 0, rkj);
       nml_mat_sub_r(aj, qk);
       nml_mat_free(qk);
    }
    for(k = 0; k < Q->num_rows; k++) {
      Q->data[k][j] = aj->data[k][0];
    }
    l2norm = nml_mat_col_l2norm(Q, j);
    nml_mat_col_mult_r(Q, j, 1/l2norm);
    R->data[j][j] = l2norm;
    nml_mat_free(aj);
  }
  qr->Q = Q;
  qr->R = R;
  return qr;
} 
```

# References

* https://stattrek.com/matrix-algebra/echelon-transform.aspx?tutorial=matrix
* http://lampx.tugraz.at/~hadley/num/ch2/2.3a.php
* https://www.youtube.com/watch?v=FAnNBw7d0vg
* https://en.wikipedia.org/wiki/Norm_(mathematics)
* https://en.wikipedia.org/wiki/Dot_product
