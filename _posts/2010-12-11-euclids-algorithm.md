---
title: "Euclid's Algorithm"
date: "2010-12-11"
classes: wide
categories: 
  - "c"
  - "algorithms"
tags: 
  - "algorithm"
  - "c-2"
  - "c-code"
  - "c-implementation"
  - "c-source"
  - "euclid"
  - "euclids-algorithm"
  - "gcd"
  - "greatest-comon-divisor"
---

Recently I've started to implement (or reimplement) the most common algorithms a software developer should know . One of the nicest books I found on this topic is [Algorithms in C](http://www.amazon.com/Algorithms-Parts-1-4-Fundamentals-Structures/dp/0201314525) (Robert Sedgewick) . 

Of course, there is [this](http://www.amazon.com/Art-Computer-Programming-Volumes-Boxed/dp/0201485419) and [this](http://www.amazon.com/Introduction-Algorithms-Second-Thomas-Cormen/dp/0262032937), but lately I am more interested on the "implementation" side of things than on maths and theory .

# Algorithm Description

**Euclid's Algorithm** is an efficient method for calculating the greatest common divisor of two numbers (aka _GCD_) . The _GCD_ of two numbers is considered the largest number that divides both of them (without leaving a reminder) .

Euclid's algorithm is based on the principle that given two numbers `a` and `b`, if `a` is greater than `b` than the greatest common divisor of `a` and `b` is the same with the common divisor of `b` and `(b - a)` . 

If we transform the above property into "code" (_pseudo-code_) the algorithm looks like this:

```
FUNCTION GCD(num1, num2)
	WHILE num1 > 0
		IF num1 < num2
			SWAP (num1, num2)
		num1 := num1 - num2
	RETURN num2
```

The above pseudo-code is called the _subtraction-variant_ . We can of course replace the repetitive subtractions with one division . 

The division-based version looks like this (_pseudo-code_):

```
FUNCTION GCD(num1, num2)
	WHILE num1 > 0
		tmp  := num1
		num1 := num2 MOD num1
		num2 := tmp
	RETURN num2
```

There is also a recursive version of the algorithm:

```
FUNCTION GCD(num1, num2)
	IF num1 <> 0 THEN
		RETURN GCD(num2 MOD num1, num1)
	RETURN num2
```

# Algorithm Implementation

For this implementation I've written 4 functions that do the same thing (calculate the greatest common divisor) but in a slightly different manner:

| Method | Description |
| ------ | ----------- |
| `int gcd1(a, b)` | The naive implementation, using repeated subtractions. |
| `int gcd2(a, b)` | Uses division instead of repeated subtractions. |
| `int gcd3(a, b)` | Alternative implementation using a `for` loop. |
| `int gcd4(a, b)` | The recursive version. |

Code:

```c
#include <stdio.h> 
#include <stdlib.h>

//
// @author Andrei Ciobanu
// @date DEC 11, 2010
//

int gcd1(int num1, int num2);
int gcd2(int num1, int num2);
int gcd3(int num1, int num2);
int gcd4(int num1, int num2);

//
// Calculates the greatest common divisor .
// @param num1
// @param num2
// @return The greatest common divisor of num1 and num2
//
int gcd1(int num1,int num2)
{
	int tmp;
	while(num1 > 0) {
		if (num1 < num2) {
			// Swap
			tmp = num1;
			num1 = num2;
			num2 = tmp;
		}
		num1 -= num2;
	}
	return num2;
}

//
// Calculates the greatest common divisor . (Instead of using multiple
// substractions we use division)
// @param num1
// @param num2
// @return The greatest common divisor of num1 and num2
//
int gcd2(int num1, int num2)
{
	int tmp;
	while (num1 > 0) {
		tmp = num1;
		num1 = num2 % num1;
		num2 = tmp;
	}
	return num2;
}

//
// Calculates the greatest common divisor . (The same as gcd2 but instead
// using a FOR loop)
// @param num1
// @param num2
// @return The greatest common divisor of num1 and num2
//
int gcd3(int num1, int num2)
{
	int tmp;
	for(num1 = abs(num1), num2 = abs(num2); num1 > 0; tmp = num1,
		num1 = num2 % num1, num2 = tmp);
	return num2;
}

//
// Calculates the greatest common divisor . (Recursive way)
// @param num1
// @param num2
// @return The greatest common divisor of num1 and num2
//
int gcd4(int num1, int num2)
{
	if (num1) {
		return gcd4(num2 % num1, num1);
	}
	return num2;
}

int main(int argc, char *argv[])
{
	printf("gcd1(%u, %u) = %u\n", 10, 25, gcd1(10, 25));
	printf("gcd1(%u, %u) = %u\n", 100, 24, gcd1(100, 24));

	printf("gcd2(%u, %u) = %u\n", 10, 25, gcd2(10, 25));
	printf("gcd2(%u, %u) = %u\n", 100, 24, gcd2(100, 24));

	printf("gcd3(%u, %u) = %u\n", 10, 25, gcd3(10, 25));
	printf("gcd3(%u, %u) = %u\n", 100, 24, gcd3(100, 24));

	printf("gcd4(%u, %u) = %u\n", 10, 25, gcd4(10, 25));
	printf("gcd4(%u, %u) = %u\n", 100, 24, gcd4(100, 24));
	return (0);
} 
```

Output:

```
gcd(10, 25) = 5
gcd(100, 24) = 4
gcd2(10, 25) = 5
gcd2(100, 24) = 4
gcd3(10, 25) = 5
gcd3(100, 24) = 4
gcd4(10, 25) = 5
gcd4(100, 24) = 4
```

**Note:**

If you are interested to read about a more performance-wise way to find the greatest common divisor of two numbers you can read this article on [Stein's Algorithm](/2010/12/12/binary-gcd-steins-algorithm-in-c/) .
