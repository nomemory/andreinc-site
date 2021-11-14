---
title: "Euclid's Algorithm: Reducing fraction to lowest terms"
date: "2010-12-13"
classes: wide
excerpt: "The Euclid algorithm explained and implemented in C."
categories: 
  - "c"
  - "algorithms"
tags: 
  - "algorithm"
  - "c-2"
  - "c-code"
  - "c-implementation"
  - "c-sourcecode"
  - "euclid"
  - "euclids-algorithm"
  - "gcd"
  - "greatest-common-divisor"
  - "lowest-terms"
  - "programming-challenge"
  - "programming-exercise"
  - "reduce-fraction"
  - "reduce-given-fraction-to-lowest-terms"
---

In the [last article](/2010/12/11/euclids-algorithm/) I've described **Euclid's algorithm** for finding the greatest common divisor of two given numbers.

A simple programming exercise I found in the book called "[Algorithms in C](http://www.informit.com/store/product.aspx?isbn=0201314525)" (Sedgewick) asks us to reduce a given fraction to lowest terms, using the Euclid's Algorithm .

> E.g.
> 
> Reducing `36 / 120` it becomes `3 / 10`.

# Implementation

## Encapsulating the fraction using a `struct{}`

```c
//
// Fraction data-structure:
// f = numerator / denominator
//
typedef struct s_fraction {
	int numerator;
	int denominator;
} Fraction;
```

## Creating a `constructor()`-like and `destructor()`-like functions

```c
//
// Allocates memory for a fraction structure .
// Initialize fraction structure .
// @param numerator
// @param denominator
// @return A pointer to the fraction structure on heap . 
// (memmory should be de-allocated manually)
//
Fraction *fraction_new(int numerator, int denominator)
{
	Fraction *f = NULL;
	if (!denominator) {
		fprintf(stderr, "Invalid fraction. Denominator cannot be 0 (zero)\n");
		return (f);
	}
	f = malloc(sizeof(*f));
	if (!f) {
		MALLOC_FAIL;
	}
	f->numerator = numerator;
	f->denominator = denominator;
	return (f);
}

//
// De-allocates the memory associated with a given fraction .
// @param f The fraction to be free'd .
//
void fraction_delete(Fraction *f)
{
	if (f) {
		free(f);
	}
}
```

The `fraction_new()` function fails if a `0` (zero) denominator is supplied.

## Reducing the fraction to the lowest terms using the `gcd()` algorithm

On this step we will write a function that reduces the fraction to the lowest terms . 

For this we will also need to determine the greatest common divisor of the fraction's denominator and numerator in order to divide the fraction by it .

```c
//
// Calculates the greatest common divisor.
// @param num1
// @param num2
// @return GCD
//
int util_gcd(int num1, int num2)
{
	int tmp;
	num1 = abs(num1);
	num2 = abs(num2);
	while (num1 > 0) {
		tmp = num1;
		num1 = num2 % num1;
		num2 = tmp;
	}
	return num2;
}

//
// Reduce a fraction to the lowest terms
// @param f The fraction to be reduced .
//
void fraction_reduce(Fraction *f)
{
	int gcd;
	gcd = util_gcd(f->numerator, f->denominator);
	f->numerator /= gcd;
	f->denominator /= gcd;
}
```

## Main method

The last step will be to test our function . The main function is:

```c
int main(int argc, char *argv[])
{
	Fraction *f = NULL;
	f = fraction_new(36,120);

	printf("f = %d/%d", f->numerator, f->denominator);
	fraction_reduce(f);

	printf(" = %d/%dn", f->numerator, f->denominator);

	fraction_delete(f);
	return (EXIT_SUCCESS);
}
```

Output:

```
f = 36/120= 3/10
```

## Full source-code:

```c
#include <stdio.h>
#include <stdlib.h>

#define MALLOC_FAIL abort()

//
// Fraction data-structure:
// f = numerator / denominator
//
typedef struct s_fraction {
	int numerator;
	int denominator;
} Fraction;

int util_gcd(int num1, int num2);
Fraction *fraction_new(int numerator, int denominator);
void fraction_delete(Fraction *f);
void fraction_reduce(Fraction *f);

//
// Allocates memory for a fraction structure .
// Initialize fraction structure .
// @param numerator
// @param denominator
// @return A pointer to the fraction structure on heap .
// (memmory should be de-allocated manually)
//
Fraction *fraction_new(int numerator, int denominator)
{
	Fraction *f = NULL;
	if (!denominator) {
		fprintf(stderr, "Invalid fraction. Denominator cannot be 0 (zero)\n");
		return (f);
	}
	f = malloc(sizeof(*f));
	if (!f) {
		MALLOC_FAIL;
	}
	f->numerator = numerator;
	f->denominator = denominator;
	return (f);
}

//
// De-allocates the memory associated with a given fraction .
// @param f The fraction to be free'd .
//
void fraction_delete(Fraction *f)
{
	if (f) {
		free(f);
	}
}

//
// Calculates the greatest common divisor.
// @param num1
// @param num2
// @return GCD
//
int util_gcd(int num1, int num2)
{
	int tmp;
	num1 = abs(num1);
	num2 = abs(num2);
	while (num1 > 0) {
		tmp = num1;
		num1 = num2 % num1;
		num2 = tmp;
	}
	return num2;
}

//
// Reduce a fraction to the lowest terms
// @param f The fraction to be reduced .
//
void fraction_reduce(Fraction *f)
{
	int gcd;
	gcd = util_gcd(f->numerator, f->denominator);
	f->numerator /= gcd;
	f->denominator /= gcd;
}

int main(int argc, char *argv[])
{
	Fraction *f = NULL;
	f = fraction_new(36,120);

	printf("f = %d/%d", f->numerator, f->denominator);
	fraction_reduce(f);

	printf(" = %d/%dn", f->numerator, f->denominator);

	fraction_delete(f);
	return (EXIT_SUCCESS);
}
```

_Note: As an alternative to Euclid's Algorithm take a look on [Stein's Algorithm](/2010/12/12/binary-gcd-steins-algorithm-in-c)._
