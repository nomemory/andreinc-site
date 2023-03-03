---
title: "Essential Computer Science exercises every programmer should (be able to) solve"
date: "2023-01-01"
classes: wide
comments: true
usemathjax: true
excerpt: "A list of computer science exercises with solutions in c, that each programmer should solve."
categories:
- "c"
tags:
- "data-structures"
- "algorithms"
- "exercises"
---

This article is a collection of *highly popular* Computer Science (read Data Structures and Algorithms) exercises that every programmer should solve, or should be able to solve. The solutions are written in the C programming language _from scratch_ without the help of any non-standard library. At this point, you might ask:

> *Why C? Isn't that an outdated, arcane, unsafe programming language?*

The reason is simple. Because C is simple, it doesn't have a standard "Collection API", and it lets you have a close relationship with the "machine" you are operating on.

//TODO The requirements:
- Familiarity with the C programming language;
- Familiarity with basic data structures and algorithms and O(N) notation

**More content here**

# Easy

## Day 1: The solitary integer - Learning about XOR

> Note: I found this exercise, while solving problems on hackerrank. Link [here](https://www.hackerrank.com/challenges/lonely-integer/problem).

This is the first exercise we will solve. Don't worry; it's easy, although the **optimal** solution is not exactly intuitive if you are unfamiliar with [bitwise operations](https://en.wikipedia.org/wiki/Bitwise_operation). The ask is:

```
Given an array of integer values, where all elements **but one** occur twice, 
find the unique element, the so-called _solitary_ integer. 

For example, if `L={1,2,3,3,8,1,9,2,9}`, the unique element is `8`, 
because the rest of the elements come in pairs.
```

The first reflex to solve this exercise would be to brute force the solution by verifying each element with every other to find its pair. But the complexity of doing so is O(n<sup>2</sup>), where n is the size of the input array - not excellent. But, as a rule of thumb, if you receive a question like this at an interview and don't know how to approach it, mentioning the brute-force solution is a good starting point and can buy you some time until you come up with something better.

Visually, brute forcing the solution looks like this:


![png]({{site.url}}/assets/images/2023-01-01-essential-cs-exercises/solitary_integer_bruteforce.drawio.png)

And the associated code might look like this:

```cpp
#include <stdio.h>
#include <stdlib.h>
/**
 * Our function receives the array where we are performing 
 * the search as a pointer to the first element (int *array).
 * 
 * In the C programming language arrays are decaying to pointers
 * when we pass them to functions. Because we don't know where to stop
 * with our search, we also pass the array size (size_t array_size) as
 * an input parameter.
 */
static int brute_force(int *array, size_t array_size) {
    int i = 0;
    // For each element of the array
    for(; i < array_size; ++i) {
        int j = 0;
        // We search it's pair
        for(; j < array_size; ++j) {
            // We found the pair, no need to loook further
            // We break the inner loop
            if (i!=j && array[i]==array[j]) break;
        }
        // If in the previous iteration we coudln't find any pair
        // (size of the array == j) => We've found the solution
        // We can break the outer loop and finish the search
        if (array_size==j) break;
    }
    return array[i];
}
int main(void) {
    int array[9] = {100, 20, 20, 13, 100, 8, 7, 8, 7};
    printf("%d\n", brute_force(array, 9));
    return 0;
}
```

It's simply too many steps to solve such a simple task: we iterate through each number (with the index `i`), and then, with `j`, we iterate again to find the. Surely things can be simpler than that. 

As a general strategy, whenever your problem involves an array, it's worth contemplating what's happening if you sort it. In our case, sorting can solve the task more efficiently because the new configuration will have the pair of numbers sitting side by side. 

Sorting algorithms are out of the scope of the article, but the good news is sorting an array is already part of the C programming language; check [`qsort(...)`](https://en.cppreference.com/w/c/algorithm/qsort) or `qsort_s(...)`. Despite its name, the C standard doesn't require this function to be implemented using [Quicksort](https://en.wikipedia.org/wiki/Quicksort), or give you any stability/complexity guarantees. Just be optimistic, and believe in the good intentions of the engineers who implemented the standard library. There's a high chance the function's complexity is O(logn).

![png]({{site.url}}/assets/images/2023-01-01-essential-cs-exercises/solitary_integer_sorting.png)

After sorting the array, each element will sit next to its pair, except the solitary integer. To find the solution, we just iterate over the array (with +=2 step) and check which element appears only once. To put this new idea into code, it's as simple as:

```cpp
static inline int cmp_integers(const void *a, const void *b) {
    int arg1= *(const int*) a;
    int arg2= *(const int*) b;
    if (arg1<arg2) return -1;
    if (arg1>arg2) return 1;
    return 0;
}
static int with_sorting(int *array, size_t array_size) {
      // We sort the array so that each element is sitting next to it's pair
      qsort(array, array_size, sizeof(*array), cmp_integers);
      // We ensure that when we iterate we don't
      // exit the bounds of the array 
      array_size--;
      for(int i=0; i < array_size; i+=2) {
          if (array[i]!=array[i+1]) {
              return array[i];
          }
      }
      exit(-1);
}
int main(void) {
    int array[9] = {1,2,3,3,8,1,9,2,9};
    printf("%d\n", with_sorting(array, 9));
    return 0;
}
```

Some observations:
* The `qsort(...)` needs a pointer to a function that can compare the data it's sorting. This is why we've defined `cmp_integers(...)`. In C, whenever we sort, we need to write the accompanying comparator function.
* [Generic Programming](https://en.wikipedia.org/wiki/Generic_programming) isn't a first-class citizen in C, so we are technically stuck using `void *` when we pass generic data around. As C programmers, we ensure we give the correct data, as the compiler cannot perform validations. With power comes great responsibility and a neverending source of bugs. This is why the signature of our comparator function is *generic*, in the sense it accepts `void *` as input parameters, and the dev needs to cast data manually. `void *` is the dumbest placeholder.
* At a glance, the `cmp_integers(...)` function can be *slimmer*. Why don't we return the difference between `arg1` and `arg2` directly (`return arg1-arg2`), and instead prefer branching (if statements)? One reason is that historically speaking, simple comparisons were faster than performing subtraction. Meanwhile, compiles have become smarter...

The previous solution has O(logn) complexity without additional space allocated. O(logn) is better than O(n), but we can certainly do better and come-up with an O(n) solution.

Most languages support a set of operations called [*bitwise_ operations*](https://en.wikipedia.org/wiki/Bitwise_operation). Those operations aren't as used in high-level programming languages (like Java or C#). However, they are still used in systems programming and low-level programming, where they can provide significant performance gains. The primary bitwise operations are AND (`&`), OR (`|`), XOR (`^`), NOT (`~`), LEFT SHIT (`<<`), and RIGHT SHIFT (`>>`). Don't worry not knowing about them; we will have to use them in future exercises anyway, but right now we are going to focus on `XOR`.

`XOR` compares each bit of one number to the corresponding bit of another number and returns a new number where each bit is 1 if only one of the corresponding bits is 1.

* `1 XOR 1` is 0  (both bits are `1`);
* `0 XOR 0` is 0  (both bits are `0`);
* `1 XOR 0` is 1  (one of the bits is `1`);
* `0 XOR 1` is 1  (one of the bits is `1`).

So, when two bits are identical, they "nullify" themselves. When the bits are different, `XOR` returns 1. Take a look at the following example, because the bits of 3 (represented as binary) are identical, the result of `3^3` is `0`.

![png]({{site.url}}/assets/images/2023-01-01-essential-cs-exercises/solitary_integer_xor0.drawio.png)

Just like addition, XOR is an [associative operation](https://en.wikipedia.org/wiki/Operator_associativity). For example, if we have a group of numbers: `a1`, `a2`, `a3` (and so on), if we apply XOR between them, the order doesn't affect the final result. `a1 XOR a2 XOR a3` is equivalent to, let's say, `a1 XOR a3 XOR a2`. Because the order is unimportant, imagine we apply XOR between all the input array elements. One by one, the identical bits composing the numbers will "nullify" themselves, leaving only the solitary bits alive. 

Visually the solution looks like this:

![png]({{site.url}}/assets/images/2023-01-01-essential-cs-exercises/solitary_integer_xor1.png)

* The bits of `array[0]` will (eventually) nullify themselves with the bits from `array[5]` => `array[0] ^ array[1] == 0`;
* The bits of `array[1]` will (eventually) nullify themselves with the bits from `array[7]` => `array[1] ^ array[7] == 0`;
* The bits of `array[2]` will (eventually) nullify themselves with the bits from `array[3]` => `array[2] ^ array[3] == 0`;
* The bits of `array[6]` will (eventually) nullify themselves with the bits from `array[8]` -> `array[6] ^ array[8] == 0`;
* The bits of `array[4]` will remain unaltered; they represent the solution;

So, the solution of exercise becomes:

```cpp
static int with_xor(int *array, size_t array_size) {
      int result = 0;
      for(int i = 0; i < array_size; ++i)
          result^=array[i];
      return result;
}
int main(void) {
    int array[9] = {1,2,3,3,8,1,9,2,9};
    printf("%d\n", with_xor(array, 9));
    return 0;
}
```

Everything becomes a `reduce()` exercise, where `result` is the accumulator that keeps the final result, and the operation that changes the accumulator at each iteration is `^` (XOR).

## Day2: The alien language - Letters as indexes

This exercise can be found on [leetcode](https://leetcode.com/problems/verifying-an-alien-dictionary/description/), and on various sites under different names. 

```
In an alien language, surprisingly, they also use English lowercase letters, 
but possibly in a different order.  The order of the alphabet is some permutation 
of lowercase letters.

Given a sequence of words written in the alien language, and the order of the alphabet, 
return true if and only if the given words are sorted lexicographically 
in this alien language.

Input: words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
Output: true
Explanation: As 'h' comes before 'l' in this language, then the sequence is sorted.

Input: words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
Output: false
Explanation: As 'd' comes after 'l' in this language, then words[0] > words[1], 
hence the sequence is unsorted.
```

Before thinking of a solution, we must first understand the requirements well.

In case you aren't familiar with the concept, **Lexicographical comparison** is the process of comparing two strings (`char*`) in a *dictionary-like* manner. This means that the comparison is based purely on the alphabetical order of the letters (characters) composing the string. The first character is the most significant one. If the first characters of the two strings are identical, we compare the next character until we reach the end or we find a difference. This is the default method of many programming languages to sort strings in alphabetical order.

To exemplify, let's compare `"car"` and `"carriage"`. Spoiler alert, `"car"` comes before `"carriage"`:
* The comparison starts with the first character of each letter, which is `"c"` in both cases;
* We move to the next character (`"a"`), which is identical.
* Then, to the next character(`"r"`), ... still identical.
* At this point, we have reached the end of `"car"`, and we can conclude that `"car"` comes first because `"carriage"` still has characters left in it.

Now, let's compare `"cart"` with `"card"`. The first three letters are identical, but `"d"` is lesser than `"t"`. Thus, we can say that `"card"` comes before `"cart"`.

In the C programming language, [`strcmp()`](https://en.cppreference.com/w/c/string/byte/strcmp) performs lexicographical comparisons between two strings. But it only works for English and other human languages, not for aliens, so it's unsuitable for our requirements.

If we were to write a simple comparison function that works on the *human* alphabet, we could implement `lexi_cmp`, a function that takes two strings (`*char`), returns true if the first string is lesser (or equal) than the second and false otherwise:

```cpp
static bool lexi_cmp(char *str1, char *str2) {
    // We iterate until there are characters in each string
    // Strings in C are NULL terminated, their last character is '\0'
    // 
    // So our loop condition can be written like this
    //      while('\0'!=*str1 && '\0'!=*str2)
    // 
    // Because the comparison is a little bit redundant, 
    // we can also the loop like this
    while(*str1 && *str2) { 
        if (*str1!=*str2) {
            // We compare to see if the characters are 
            // in order
            return *str1 < *str2
        }
        // If the the two current characters are equal, we continue
        // incrementing the pointer, and by this we are jumping to the next characters
        ++str1;
        ++str2;
    }
    // If str1 is empty it means that is lexicographically smaller than str2 (or equal) 
    if (!(*str1)) 
        return true;           
    return false;
}
```

Now, what if we redefine the lexicographical order? What if `a` comes after `c` in the *alien language* and `x` is the first letter of their alphabet? Then, we must redefine the order in which we compare the letters. Thew *alien* alphabet is different than ours.

Characters (`char`) in C are numbers, just like `int` values are numbers; good news, numbers can be compared. Printing the english letters on the console will yield the following results:

```cpp
char *alphabet = "abcdefghijklmnopqrstuvwxyz";
int i = 0;
while(*alphabet) {
    printf("%c=%d\t", *alphabet, *alphabet);
    alphabet++;
    i++;
    if (i%5==0)
        printf("\n");
}
```

Output:

```cpp
a=97    b=98    c=99    d=100   e=101
f=102   g=103   h=104   i=105   j=106
k=107   l=108   m=109   n=110   o=111
p=112   q=113   r=114   s=115   t=116
u=117   v=118   w=119   x=120   y=121
z=122
```

Letters are... numbers.

At this point, we can do another trick. Let's suppose we want to use the latin alphabet (the letters) as indices of an array. `'a'` is `97`; we would've preferred `'a'` to be `0`. Changing the code slightly, by using `a` as an offset to be subtracted from each letter will fix the problem.

```cpp
#define CHR_TO_IDX(c) ((c)-'a')
char *alphabet = "abcdefghijklmnopqrstuvwxyz";
int i = 0;
while(*alphabet) {
    printf("%c=%d\t", *alphabet, CHR_TO_IDX(*alphabet));
    alphabet++;
    i++;
    if (i%5==0)
        printf("\n");
}
```

Output:

```cpp
a=0     b=1     c=2     d=3     e=4
f=5     g=6     h=7     i=8     j=9
k=10    l=11    m=12    n=13    o=14
p=15    q=16    r=17    s=18    t=19
u=20    v=21    w=22    x=23    y=24
z=25
```

By subtracting `'a'` from each letter through the `CHR_TO_IDX` macro, our "situation" changes for the better. At this point, we can redefine the order of the alphabet and keep this new information inside an array, where each `CHR_TO_IDX(letter)` represents the indices, and the values represent the new order.

```cpp
#define ORD(c1) (ord_map[CHR_TO_IDX(c1)])
#define CHR_TO_IDX(c) ((c)-'a')
uint8_t ord_map[26];
static void build_ord_map(char *order) {
    for(size_t i=0;*order!='\0';++order,++i) 
        ORD(*order)=i;  
}
```

If the new alphabet is, let's say, `"worldabcefghijkmnpqstuvxyz"`, after executing `build_ord_map("worldabcefghijkmnpqstuvxyz")`, `ord_map` will look like:

```cpp
ord_map[a]=5   ord_map[b]=6   ord_map[c]=7   ord_map[d]=4   ord_map[e]=8
ord_map[f]=9   ord_map[g]=10  ord_map[h]=11  ord_map[i]=12  ord_map[j]=13
ord_map[k]=14  ord_map[l]=3   ord_map[m]=15  ord_map[n]=16  ord_map[o]=1
ord_map[p]=17  ord_map[q]=18  ord_map[r]=2   ord_map[s]=19  ord_map[t]=20
ord_map[u]=21  ord_map[v]=22  ord_map[w]=0   ord_map[x]=23  ord_map[y]=24
ord_map[z]=2
```

This is how we map the new character new order, by filling-up up the `ord_map` array with their new "cardinality":
* `ord_map[a]=5`, because `a` appears at the 5th position in the new alphabet, `"worldabcefghijkmnpqstuvxyz"`;
* `ord_map[b]=6`, because `b` appears at the 6th position in the new alphabet, `"worldabcefghijkmnpqstuvxyz"`;
* and so on...;

To compare the letters, we now look all the time at their corresponding values from `ord_map`.

Solving the exercise is now simple, we need to change the `lexi_cmp()` function to include the new logic by changing the *human* comparison into the *alien* one:

```cpp
#define CHR_TO_IDX(c) ((c)-'a')
#define ORD(c1) (ord_map[CHR_TO_IDX(c1)])
static bool lexi_cmp(char *str1, char *str2) {
    while(*str1 && *str2) { 
        if (*str1!=*str2) {
            // This is how aliens compare characters
            // based on their weird alien alphabet
            return ORD(*str1) < ORD(*str2);
        }
        ++str1;
        ++str2;
    }
    if (!(*str1)) 
        return true;           
    return false;
}
```

After implementing the comparison, we will just have to iterate over the array o strings received as input (e.g.: `["word","world","row"]`), compare the words one by one, and if at any point one string is greater than next one, we return `false`. If we manage to iterate over the array, without any problems, in the end, we  return `true`:

```cpp
bool is_alien_sorted(char **words, int words_len, char *order){
    build_ord_map(order);
    words_len--;
    for(size_t i = 0; i < words_len; ++i) {
        // compare the current string 
        // with the next one
        if (!lexi_cmp(words[i], words[i+1]))
            return false;
    }
    return true;     
}
```

```cpp
// Getting the uppercase letter position in the alpabet
for(char i = 'A'; i <= 'Z'; i++) {
    printf("%c --> %d\n", i, (i & '?'));
}
```

## Day 3 - Isomorphic Strings


