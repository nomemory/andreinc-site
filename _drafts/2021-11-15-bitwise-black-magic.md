---
title: "Bitwise black-magic. A friendly guide."
date: "2021-11-08"
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

# XOR

## Swapping two variables

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