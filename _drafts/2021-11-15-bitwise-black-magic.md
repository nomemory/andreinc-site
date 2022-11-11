---
title: "Bitwise black-magic. A friendly guide."
date: "2022-07-08"
classes: wide
comments: true
usemathjax: false
excerpt: ""
categories:
- "c"
- "algorithms"
tags:
- "bitwise"
---

# Bitwise Operations

## SHIFT RIGHT

## SHIFT LEFT

## XOR

# Pratical Examples

## Checking if two numbers are equal

## Checking if a number is odd

## Setting the n<sup>th</sup> bit of x

## Multiplying an integer with the n<sup>th</sup> power of `2`

## Dividing an integer with the n<sup>th</sup> power of `2`

## Swapping two variables

## Retriving the max of two integers

## Retrieving the min of two integers

## Check if an integer is a power of two

# Bonus problems solved using bitwise operations

## The solitary integer

[`the_solitary_integer.c`](...)

```c
#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int a[11] = {1, 10, 9, 8, 100, 100, 10, 17, 8, 9, 1};
    int solitary=0;
    for(int i = 0; i < 11; i++) {
        solitary^=a[i];
    }
    printf("solitary integer: %d\n", solitary);
    return 0;
}

// Output: 17
```

