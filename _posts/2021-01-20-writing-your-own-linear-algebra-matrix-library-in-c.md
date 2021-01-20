---
title: "Writing your own linear algebra matrix library in C"
date: "2021-01-20"
classes: wide
usemathjax: true
categories:
- "c"
tags:
- "algorithm"
- "computer-science"
---

**ARTICLE IS A DRAFT**

# Rationale

Let's say you are one of the few Engineering/Computer Science students that are passionate about [linear algebra](https://en.wikipedia.org/wiki/Linear_algebra), [numerical analysis](https://en.wikipedia.org/wiki/Numerical_analysis) and writing code in a low-level language.

Or you are just curious about what's behind the [`lu(A)`](https://www.mathworks.com/help/matlab/ref/lu.html) method in Matlab.

Or you plan to learn more about A.I. algorithms, and you want to accumulate this knowledge on top of a robust linear algebra foundation.

I believe the best exercise you can do is to try to write your (own) Matrix library in a low-level programming language (like [C](https://en.wikipedia.org/wiki/C_(programming_language)), [C++](https://en.wikipedia.org/wiki/C%2B%2B) or even [D](https://dlang.org/)).

This tutorial is precisely this, a step-by-step explanation of how to write a C Matrix library that implements the "basic" numerical analysis algorithms.

I've already done this exercise myself and the code is available on github in the repository called [neat-matrix-library](https://github.com/nomemory/neat-matrix-library). 

To clone it (GitHub CLI):

```sh
gh repo clone nomemory/neat-matrix-library
```

# Starting with the data

To represent the matrix data we can start by defining the following C `struct`, called `nml_mat`:

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

To better understand how to store multi-dimensional arrays in _linear storage_ please refer to [this stackoverflow question](https://stackoverflow.com/questions/14015556/how-to-map-the-indexes-of-a-matrix-to-a-1-dimensional-array-c), or read the [wikipedia article](https://en.wikipedia.org/wiki/Row-_and_column-major_order) on the topic.

In my example I will keep the `double **` multi-dimensional storage for simplicity. 

## Allocating / De-allocating memory for the `nml_mat` matrix

Unlike "higher-level" programming languages (Java, python, etc.), that manage memory allocation for you, in C you need to explicitly ask for memory and explicitly free the memory once you no longer need it.

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
3. For a multidimensional array (`double**`) we allocate memory in two steps: 
  - `m->data = calloc(m->num_rows, sizeof(*m->data))` - this allocates memory for the `column` array;
  -  Then we allocate memory for each row. By using [`calloc()`](https://www.cplusplus.com/reference/cstdlib/calloc/) the data is initialised with `0.0`. 

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

At this point it's a good idea to add more methods to help the potential user of the library to create various `nml_mat` structs, with various properties.

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

The input params `min` and `max` represent the boundaries of the interval in which the random numbers are being generated.

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
      if (fabs(fabs(m1->data[i][j]) - fabs(m2->data[i][j])) > tolerance) {
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

```c 
nml_mat *nml_mat_row_rem(nml_mat *m, unsigned int row);
nml_mat *nml_mat_row_swap(nml_mat *m, unsigned int row1, unsigned int row2);
int nml_mat_row_swap_r(nml_mat *m, unsigned int row1, unsigned int row2);
nml_mat *nml_mat_col_swap(nml_mat *m, unsigned int col1, unsigned int col2);
int nml_mat_col_swap_r(nml_mat *m, unsigned int col1, unsigned int col2);
nml_mat *nml_mat_cath(unsigned int mnun, nml_mat **matrices);
nml_mat *nml_mat_catv(unsigned int mnum, nml_mat **matrices);
```
