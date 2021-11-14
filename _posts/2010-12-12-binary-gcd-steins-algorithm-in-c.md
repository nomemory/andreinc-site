---
title: "Binary GCD (Stein's Algorithm) in C"
date: "2010-12-12"
excerpt: "The Stein's algorithm explained and implemented in C."
classes: wide
categories: 
  - "c"
  - "algorithms"
tags: 
  - "binary-gcd"
  - "bitwise-operations"
  - "c-code"
  - "c-implementation"
  - "c-sourcecode"
  - "euclid"
  - "gcd"
  - "gcd-optimization"
  - "gcd-optimize"
  - "greatest-common-divisor"
  - "recursive-version"
  - "steins-algorithm"
---

[**Binary GCD**](https://en.wikipedia.org/wiki/Binary_GCD_algorithm?oldformat=true) also known as **Stein's Algorithm** is an algorithm that computes the greatest common divisor of two (positive) numbers . Discovered in 1967 by the Israeli programmer Josef Stein, it's an alternative to the classical [Euclid's Algorithm](/2010/12/11/euclids-algorithm), and is considered to be more efficient than this as it's replacing divisions and multiplications with [bitwise operations](http://en.wikipedia.org/wiki/Bitwise_operation) . The algorithm is recursive by nature, but loops can be used instead of recursion .

_Note that by `B_GCD(num1, num2)` we will refer to a function that returns the greatest common divisor of two positive numbers (`num1` and `num2`)._

> Rules of the algorithm:
> 
> 1. `B_GCD(0,0)` is not defined, but for convenience we will consider it `0`;
> 2. `B_GCD(num1,0) = num1` and `B_GCD(0,num2) = num2`;
> 3. If `num1` and `num2` are even, `B_GCD(num1, num2) = 2 * B_GCD(num1/2, num2/2)`, as 2 is a common divisor
> 4. If `num1` is even and `num2` is odd, `B_GCD(num1, num2) = B_GCD(num1 /2, num2)`, as 2 is not a common divisor . The steps are the same if `num1` is odd and `num2` is even : `B_GCD(num1, num2) = B_GCD(num1, num2/2)`
> 5. If both `num1` and `num2` are odd, then:
> * if `num1 >= num2`  -> `B_GCD(num1, num2) = B_GCD((num1-num2)/2, num2)`
> * else `B_GCD(num1, num2) = B_GCD((num2-num1)/2, num1)`
> 6. Step 4 and 5 are repeated until `num1 = num2`, or `num1 = 0`

We can also use pseudo code to describe the above algorithm.

Recursive Version of Binary GCD (Stein Algorithm):

```
FUNCTION  B_GCD(num1, num2)
	IF num1 = num2 THEN
		RETURN num1
	IF num1 = 0 AND num2 = 0 THEN
		RETURN 0
	IF num1 = 0 THEN
		RETURN num2
	IF num2 = 0 THEN
		RETURN num1
	IF num1 IS EVEN AND num2 IS EVEN THEN
		RETURN (B_GCD(num1/2, num2/2) * 2)
	IF num1 IS EVEN AND num2 IS ODD THEN
		RETURN B_GCD(num1/2, num2)
	IF num1 IS ODD AND num2 IS EVEN THEN
		RETURN B_GCD(num1, num2/2)
	IF num1 IS ODD AND num2 IS ODD THEN
		IF num1 >= num2 THEN
			RETURN B_GCD((num1-num2)/2, num2)
		ELSE
			RETURN B_GCD((num2-num1)/2, num1)
```			

The loop-version of the Binary GCD Algorithm

```
FUNCTION B_GCD(num1, num2)
	power_of_two := 0
	IF (num1 = 0 OR num2 = 0) THEN
		RETURN num1 | num2
	WHILE ((num1 IS EVEN) AND (num2 IS EVEN))
		num1 := num1 / 2
		num2 := num2 / 2
		power_of_two := power_of_two + 1
	DO
		WHILE(num1 IS EVEN)
			num1 := num1 / 2
		WHILE(num2 IS EVEN)
			num2 := num2 / 2
		IF (num1 >= num2) THEN
			num1 := (num1 - num2) / 2
		ELSE
			tmp  := num1
			num1 := (num2 - num1) / 2
			num2 := tmp
	WHILE NOT ((num1 = num2) OR (num1 = 0))
	RETURN num2 * power_of_two
```


# Implementation in C

The code is available in this [github](https://github.com/nomemory/blog-stein-algorithm-c) repo:

```shell
gh repo clone nomemory/blog-stein-algorithm-c
```

## Recursive Version of Binary GCD (Stein Algorithm):

```c
#include <stdio.h>

/**
* Stein's Algorithm .
* @author Andrei Ciobanu
* @date DEC 12, 2010
*/

int b_gcd(int num1, int num2)
{
	if (num1 == num2) {
		return (num1);
	}
	if (!num1 && !num2) {
		/* Convention: GCD(0, 0) = 0 */
		return (0);
	}
	if (!num1 || !num2) {
		// GCD(0, num2) = num2 
		// GCD(num1, 0) = num1
		return (num1 | num2);
	}
	if ( !(num1 & 1) && !(num2 & 1)) {
		// num1 and num2 are even, 
		// then gcd(num1, num2) = 2 * gcd(num1/2, num2/2)
		return (b_gcd(num1 >> 1, num2 >> 1) << 1);
	}
	if ( !(num1 & 1) && (num2 & 1)) {
		// num1 is even, and num2 is odd 
		// then gcd(num1, num2) = gcd(num1/2, num2)
		return b_gcd(num1 >> 1, num2);
	}
	if ( (num1 & 1) && !(num2 & 1)) {
		// num1 is odd, and num2 is even
		// then gcd(num1, num2) = gcd(num1, num2/2)
		return b_gcd(num1, num2 >> 1);
	}
	if ( (num1 & 1) && (num2 & 1)) {
		// num1 and num2 are odd
		if(num1 >= num2) {
			return b_gcd((num1 - num2) >> 1, num1);
		}
		else {
			return b_gcd((num2 - num1) >> 1, num1);
		}
	}
	return (0);
}

int main(int argc, char *argv[])
{
	printf("%dn", b_gcd(9 * 16, 3 * 32));
	return (0);
} 
```

## The loop-version of the Binary GCD Algorithm:

```c
#include <stdio.h> 

/**
* Stein's Algorithm .
* @author Andrei Ciobanu
* @date DEC 12, 2010
*/

int b_gcd(int num1, int num2)
{
	int pof2, tmp;
	if (!num1 || !num2) {
		return (num1 | num2);
	}

	// pof2 is the greatest power of 2 deviding both numbers .
	// We will use pof2 to multiply the returning number .
	pof2 = 0;
	while(!(num1 & 1) && !(num2 & 1)) {
		// gcd(even1, even1) = pof2 * gcd(even1/pof2, even2/pof2)
		num1 >>=1;
		num2 >>=1;
		pof2++;
	}

	do {
		while (!(num1 & 1)) {
			num1 >>=1;
		}
		while (!(num2 & 1)) {
			num2 >>=1;
		}
		// At this point we know for sure that
		// num1 and num2 are odd
		if (num1 >= num2) {
			num1 = (num1 - num2) >> 1;
		}
		else {
			tmp = num1;
			num1 = (num2 - num1) >> 1;
			num2 = tmp;
		}
	} while (!(num1 == num2 || num1 == 0));

	return (num2 << pof2);
}

int main(int argc, char *argv[])
{
	printf("%d", b_gcd(9 * 16, 3 * 32));
	return (0);
}
```

If both cases the output is **48**, and if you look closely, in both cases we've used bitwise operations instead of the standard multiplication / division operators .

**Note:**

If you are interested in the classical Euclid's Algorithm (for finding the greatest common divisor) + pseudocode and implementation please read this article: [Euclid's Algorithm](2010/12/11/euclids-algorithm/) .
