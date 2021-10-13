---
title: "Hashing and Hashtables in C"
date: "2021-10-02"
classes: wide
usemathjax: true
categories:
- "c"
tags:
- "hashing"
- "hash"
- "hashtables"
- "hashmap"
- "hash functions"
- "djb2"
- "multiplicative hashing"
- "division hashing"
---

> Outside the domain of computers, the word **hash** means to **chop**/**mix** something. 

In Computer Science, a *hash table* is a fundamental data structure that associates a **set of keys** with a **set of values**. Each pair `<key, value>` is an entry in our hashtable. Given a **key** we can get the **value**. Not only that but we can add and remove `<key, value>` pairs whenever it's needed.

> Not be confused with [hash trees](https://en.wikipedia.org/wiki/Hash_tree) or [hash lists](https://en.wikipedia.org/wiki/Hash_list). 

In a way, a hash table share some similarities with the average "array", so let's look at the following code:

```c
int arr[] = {100, 200, 300};
printf("%d\n", arr[1]);
```

If we were to run it, the output will be `200`. As we write `arr[<index>]` we are "peeping" at the value associated with the given `<index>`, and in our case the value associated with `1` is `200`. 

In this regard, a hash table can act very similar to an array, as it will allow us to "map" a **value** to a given **key**. But there's a catch, compared to an array, the **key** can be "everything" - we're not limited to sorted numerical indexes.

Most modern computer programming languages have a hash table implementation in their standard libraries. The names can be different, but the end results are the same.

For example in C++, we have something called [`std::unorderd_map`](https://www.cplusplus.com/reference/unordered_map/unordered_map/):

```cpp
#include <iostream>
#include <string>
#include <unordered_map>

int main() {
    
    std::unordered_map<std::string, std::string> colors = {
        /* associates to the key: */ {"RED", /* the value: */ "#FF0000"},
        {"GREEN", "#00FF00"},
        {"BLUE", "#0000FF"}
    };

    std::cout << colors["RED"] << std::endl;
}
// Output: #FF0000
```

In the Java world there's `HashMap`:

```java
import java.util.Map;
import java.util.HashMap;

public class HashMapExample {
    public static void main(String[] args) {
        Map<String, String> colors = new HashMap<>();

        colors.put("RED", "#FF0000");
        colors.put("GREEN", "#00FF00");
        colors.put("BLUE", "#0000FF");

        System.out.println(colors.get("RED"));
    }
}
// Output: #FF0000
```

Or in languages like python, support for hash tables is "built-in" in the language itself:

```python
colors = {
        "RED" :  "#FF0000",
        "GREEN" : "#00FF00",
        "BLUE" :"#0000FF"
}

print(colors["RED"])
# Output: #FF0000
```

So regardless the name (`unordered_map` in C++, `HashMap` in Java or `dict` in python), if we run all three code snippets, the result will be the same: `"#FF0000"`.

> Size doesn't really matter.

What is amazing about hash tables is they are very "efficient" in terms of (average) time complexities. Given a **key**, we are able to return the **value** associated with in (almost) constant time, no matter how many pairs we have previously inserted. So they scale extremely well with size. In a way, for a hashtable "size doesn't matter", as long as we keep things under control:

Think of it for a moment. For a binary tree, searching for an element is `O(logn)`, if the trees grow, `n` grows, so searching for an element "takes more time". But no, not for a hash tables. As long as we know the "key" we can have an almost "instant" access to the stored value.

| Operation | Average Time Complexity | Worst-case scenario |
|-- | -- | -- |
| Getting a **value** | `O(1)` | `O(n)` |
| Adding a new pair `<key, value>` | `O(1)` | `O(n)` |
| Updating a pair `<key, value>` | `O(1)` | `O(n)` |
| Removing a pair `<key, value>` | `O(1)` | `O(n)` |

This remarkable data-structure is internally powered by clever mathematical functions: called **hash functions**. They are the "force" behind the remarkable properties of hash tables: the ability to scale even if the number of pairs increases.

At this point it wouldn't be wise to jump directly to the implementation of a hash table, so we are going to make a short mathematical detour into the wonderful world of **hash functions**. They are less scary than you would normally expect, well at least on the surface.

# Hash Functions

In *English*, A **hash function** is a function that "chops" data of arbitrary size to data of fixed size.

From a mathematical perspective, A **hash function** is a function $$H : X \rightarrow [0, M)$$, that takes an element in $$x \in X$$ and associates to it a positive integer $$H(x) = m$$, where $$m \in [0, M)$$. 

$$X$$ can be bounded or an *un*-bounded set of values, while $$M$$ is always a positive finite number $$0 < M < \infty$$.

Let's take a look at the following example:

![png]({{site.url}}/assets/images/2021-10-02-hashing-and-hashtables-in-c/hashfunction.png)

In the above diagram `Paris`, `Berlin`, `Warsaw`, `Bucharest`, `Athens` are all capitals that $$\in X$$, where $$X$$ is a set containing all European Capitals, so $$n(X) = 48$$. 

Our hashing function is $$H : X \rightarrow [0, 16)$$, so that:

* `H("Paris")` returns `00`;
* `H("Berlin)` returns `01`;
* `H("Warsaw)` returns `04`;
* `H("Bucharest)` returns `03`;
* `H("Athens")` returns `04`;

In total there are around 48 countries in Europe, each with its own capital. So the number of elements in $$X$$ is 48, while $$M = 16$$ so that the possible values are in the interval $$[0, 1, 2, ... 16)$$. 

Because $$48>16$$, no matter how we write $$H$$ there will be European Capital Cities that will share the same number $$m \in [0,1, ... 16)$$. 

For our hypothetical example we can see that happening for `H("Warsaw) = H("Athens") = 4`.

Whenever we have two elements $$x_{1}, x_{2} \in X$$ so that $$H(x_{1}) = H(x_{2}) = m_{x}$$, we say we have a **hash collision**.  

In our example we can say that $$H$$ has a **hash collision** for $$x_{1}=Warsaw$$ and $$x_{2}=Athens$$, because $$H(x_{1}) = H(x_{2}) = 4$$.

**Hash Collisions** are not something game-breaking per-se, as long as the $$ n(X) > M$$ they might happen. But it's important to understand that a *good* **hash function** creates fewer **hash collisions** than a *bad* one.

Basically the worst hash function we can write is a function that returns a constant value, so that $$H(x_{1}) = H(x_{2}) = ... = H(x_{n}) = c$$, where $$n = n(X)$$, and $$c \in [0, M)$$. This is just another way of saying that every element $$x \in X$$ will collide with the others.

Another way we can shoot ourselves in the foot, is to pick a **hash function** that is not deterministic. When we call $$H(x)$$ a subsequent number of times, it should render the same results without being in any way affected by external factors.

> **Cryptographic hash functions** are a special family of **hash functions**. For security reasons they exhibit an extra set of properties. The functions used in **hash table** implementations are significantly less "pretentious".  

Another important aspect when picking the right **hash function** is to pick something that it's not computational intensive. Preferably it should be something close to `O(1)`. **Hash tables** are making use of **hash functions** intensively, so we don't want to complicate things too much from a complexity perspective.

Picking the right hash function is a tedious job. It involves a lot of statistics, number theory and empiricism, but generally speaking when we look for a hash function we should take in consideration the following requirements:
* It should have a reduced number of collisions;
* It should disperse the hashes uniformly in the $$[0, M)$$ interval;
* It should be fast to compute;


We can talk about "families" of hashing functions. One hand you have **cryptographic hash functions** that are computationally complex, and have to be resistant to [preimage attacks](https://en.wikipedia.org/wiki/Preimage_attack) (that's a topic for another day), and then you have simpler **hash functions** that are suitable to be used to implement **hash tables**:
- Cryptographic hash functions;
- All-around / general functions used for **hash table** implementations:
  - [Division hashing](#division-hashing);
  - Bit shift hash functions
  - [Multiplicative hashing](#multiplicative-hashing);

The advanced math behind **hash functions** eludes me. I am simple engineer, no stranger to math, but definitely not an expert. There are [PHD](https://en.wikipedia.org/wiki/Doctor_of_Philosophy) papers on the subject, and for a select group of people this is their actual job: finding better and faster ways of **hashing** stuff. So, in the next two paragraphs I will try to keep things as simple as possible, by avoiding to make things more mathematical than are actually needed.   
  
## Division hashing

The simplest **hash function** that we can write uses the [mod](https://en.wikipedia.org/wiki/Modulo_operation) `%` operation, and it's called **division hashing**.

It works on positive numbers, so let's suppose we can represent our initial input data $$x_{1}, x_{2}, ... x_{n} \in X \subset N$$ as a non-negative integers. 

Then, the formula for our hash function is $$H_{division}(x) = x \mod M$$, where $$H_{division} : X \rightarrow [0, M)$$. In English this means that the hash of a given value $$x$$ is the remainder of $$x$$ divided with M. 

Writing this function in C is trivial:

```c
uint32_t hashf_division(uint32_t x, uint32_t M) {
    return x % M;
};
```

On the surface `hashf_division()` checks all the requirements for a good **hashing function**.

And it's actually a good hashing function as long as the input data ($$x_{1}, x_{2}, ..., x_{n}$$) is guaranteed to be perfectly random, without obvious numerical patterns.

So let's test how it behaves if we pick:
* `M=4`;
* `1000000` uniformly distributed positive integers as input ($$X$$)

Without writing any code we would infer that all the input is going to be evenly distributed between 4 hash values: `0`, `1`, `2` and `3`. There are going to be collisions (as $$n(X)$$ is 250000 bigger than `4`), but theoretically we can reduce them by increasing `M` further down the road.

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#define M_VAL 4
#define X_VAL 1000000

uint32_t hashf_division(uint32_t x, uint32_t M) {
    return x % M;
};

int main(int argc, char* argv[]){

    // initiate rand
    srand(time(0));

    unsigned int i, hash;

    // buckets
    int buckets[M_VAL];
    
    for(i = 0; i < X_VAL; i++) {
        hash = hashf_division(rand(), M_VAL);
        buckets[hash]++;
    }

    for(i = 0; i < M_VAL; i++) {
        printf("bucket[%u] has %u elements\n", i, buckets[i]);
    }
}
```

If we run the above program a possible output would be:

```
bucket[0] has 250146 elements
bucket[1] has 249361 elements
bucket[2] has 250509 elements
bucket[3] has 249984 elements
```

The results are apparently OK:
- All input has been evenly distributed between the 4 values (buckets);
- The `%` operation is quite efficient (although it's usually two times more expensive than multiplication);
- Collisions are definitely there, but they can be controlled by increasing the value `M` to accommodate the size of the input.

> We call the resulting hashes **buckets**, and once we will start implementing the actual hash table this will actually make more sense. 

But what happens if our (input) data is not that random after all. What if the data follows a certain obvious (or not so obvious) pattern ? How is this pattern going to affect the distribution of computed hashes ?

Let's change this line:

```c
hash = hashf_division(rand(), M_VAL);
```

To this: 

```c
hash = hashf_division(rand()&-2, M_VAL)
```

Now, all our *randomly generated* numbers will be even. If that's not an obvious pattern, I don't know what is.

Let's see how our hashing function behaves in this scenario, and how well the hashes are distributed:

```
bucket[0] has 500810 elements
bucket[1] has 0 elements
bucket[2] has 499190 elements
bucket[3] has 0 elements
```

We see that value `1` and `3` are never used, which is unfortunate, but a normal consequence normal of the way our input was constructed. If all the input numbers are even, then their remainder is either `0` or `2`.

Mathematically we can prove there's not a single $$x_{i} \in X \subset N $$, for our function $$H_{division}(x)=x \mod 4$$, where $$H : X \rightarrow [0, 4)$$, so that $$H_{division}(x_{i})=1$$ or $$H_{division}(x_{i})=3$$.  

So this means our function is not so good after all because it's extremely sensitive to "input patterns" ?

Well the answer is not that simple, but what's for sure is that changing `M=4` to `M=7` will render different results.

This time, the output will be:

```
bucket[0] has 142227 elements
bucket[1] has 143056 elements
bucket[2] has 143592 elements
bucket[3] has 142721 elements
bucket[4] has 142722 elements
bucket[5] has 142662 elements
bucket[6] has 143020 elements
```

The results look promising again. The hash values are now again "evenly" distributed, but all kinds of (subtle) problems can appear based on our choice of `M`.

Normally `M` should be a prime number, and some prime numbers will work in practice better than others, e.g.:

$$
H_{division}^{'}(x) = x \mod 127
\\
H_{division}^{''}(x) = x \mod 511
\\
H_{division}^{'''}(x) = x \mod 2311
$$

To make the results even better, [Donald Knuth](https://en.wikipedia.org/wiki/Donald_Knuth), proposed an alternative solution, where $$H_{division}^{Knuth}(x) = x ( x + 3) \mod M$$.

In practice, **division hashing** is not that commonly used. The reason is simple, even the results are satisfactory (especially when `M` is chosen wisely), division and modulo operations are more "expensive" compared to let's say addition or multiplication.

## Multiplicative hashing

A common (and practical) approach for generating fairly uniform hash values is called **multiplicative hashing**.

Similar to **division hashing** the formula works for positive integers. So we assume that we have a mechanism in place that converts our input space to positive numbers only.

A **multiplicatie hash** function is usually described by the following formula:

$$H_{multip}(x) = \frac{M}{W} * (Ax \mod W)$$, where $$H_{multip} : X \in N \rightarrow [0, M)$$.

* $$A \in R_{*}^{+}$$ is a constant;
* M is usually a power of `2`, so that $$M = 2^m$$.
* $$W = 2^w$$, where $$w$$ is the [machine word size](https://en.wikipedia.org/wiki/Word_(computer_architecture)). In C we can look for the max value of an `unsigned int` in the header file `limits.h`: `UINT_MAX`. In this case `W=UINT_MAX+1`.

So our function becomes:

$$H_{multip}(x) = \frac{2^m}{2^w} * (Ax \mod 2^w) = 2^{m-w} * (Ax \mod 2^w) = \frac{Ax \mod 2^w}{2^{w-m}}$$

By the magic of bitwise operations $$Ax \mod 2^w$$ is just a way of getting the $$w$$ low order bits of $$Ax$$. Think of it for a second, `x % 2` returns the last bit of x, `x % 4` returns the last 2 bits of x, etc. 

Dividing a number $$b$$ by $$2^{w-m}$$ actually means shifting right `w-m` bits. So our method actually becomes:

$$H_{multip}(x) = A * x \text{ >> } (w -m)$$ 

If we were to write this in C:

```c
uint32_t hashf_multip(uint32_t x, uint32_t p, uint32_t w, uint32_t m, uint32_t A)  {
    return (x * A) >> (w-m);
}
```

I won't get into all the mathematical details, but a good choice for $$A$$ is $$A=\phi * 2^w$$, where $$w$$ is the word [machine word size](https://en.wikipedia.org/wiki/Word_(computer_architecture)),
and $$\phi$$ (phi) is the [golden ratio](https://en.wikipedia.org/wiki/Golden_ratio). 

$$\phi$$, just like its more famous brother $$\pi$$ ([pi](https://en.wikipedia.org/wiki/Pi)), is an irrational number, $$\phi \in Q{'}$$, that is a solution to the equation: $$x^2-x-1=0 => \phi \approx 0.6180339887498948482045868343656$$.

Depending on the word size, $$A$$ can be computed as follows:

| $$w$$ | $$A=2^w * \phi \approx$$ |
| ----- | ------ |
| 16 | 40,503 |
| 32 | 2,654,435,769 |
| 64 | 11,400,714,819,323,198,485 |

When we pick $$A=\phi * 2^w$$, our general **multiplicative hash function** is called a [**Fibonacci hash function**](https://en.wikipedia.org/wiki/Hash_function#Fibonacci_hashing). 

Having this said, we can now simplify the signature of our C function. We don't need `A`, `m`, `w` anymore as input params, because they can be `#defined` as constants. 

After the signature change, our function becomes:

```c
#define hash_a (uint32_t) 2654435769
#define hash_w 32
#define hash_m 3

uint32_t hashf_multip(uint32_t x, uint32_t m) {
    return (x * hash_a) >> (hash_w - m);
}
```

As it's mentioned [here](https://probablydance.com/2018/06/16/fibonacci-hashing-the-optimization-that-the-world-forgot-or-a-better-alternative-to-integer-modulo/), **Fibonacci Hashing** has one "small" issue. Poor diffusion happens as higher-value bits do not affect lower value bits. In this regard it can further be improved by shifting the span of retained higher bits and then `XOR`ing them to key, before the actual **hash multiplication** happens:

```c
#define hash_a (uint32_t) 2654435769
#define hash_w 32
#define hash_m 3

uint32_t hashf_multip2(uint32_t x, uint32_t m) {
    x ^= x >> (hash_w - m);
    return (x * hash_a) >> (hash_w - m);
}
```

With `hashf_multip2()` we achieve better diffusion, with a price: more operations.

## Hashing strings

Converting non-numerical data to positive integers (`uint3_t`) is quite simple. Afterall, everything is sequence of bits. 

In [K&R Book](https://en.wikipedia.org/wiki/The_C_Programming_Language) (1st ed) a simple (and uneffective) hashing algorithm was proposed: *What if sum the numerical values of all characters from a string?*

```c
uint32_t hashf_krlose(char *str) {
    uint32_t hash = 0;
    char c;
    while((c=*str++)) {
        hash+=c;
    } 
    return hash;
}
```

Unfortunately, the output for `hashf_krlose` will be "extremely" sensitive to input patterns. It's easy apply a little [**Gematria**](https://en.wikipedia.org/wiki/Gematria) ourselves to create input that will return the same hashes over and over again.

For example:

```c
char* input[] = { "IJK", "HJL", "GJM", "FJN" };
uint32_t i;
for(i = 0; i < 4; i++) {
    printf("%d\n", hashf_krlose(input[i]));
}
```

The hash values for `"IJK"`, `"HJL"`, `"GJM"`, `"FJN"` are all `222`. 

A proposal to improve the function is is to replace `+=` (summing) with `^=` (xoring), so that `hash+=c` becomes `hash^=c`. But again, patterns that break our **hash function** easy to create, so it doesn't make a big practical difference.

The good news is that there's a common type of **hash functions** that work quite well with strings (`char*`). 

The *template* for those functions look like:

```c
#define INIT <some_value>
#define MULTIP <some_value>

uint32_t hashf_generic(char* str) {
    uint32_t hash = INIT;
    char c;
    while((c*=str++)) {
        hash = MULTIP * hash + c;
    }
    return hash;
}
```

### djb2

If `INIT=5381` and `MULT=33` then the function is called **Bernstein hash djb2**, a function that dates back to 1991. 

> If you find better values, chances are your name will remain in the history books of Computer Science.

Implementing it in C is quite straight-forward:

```c
#define INIT 5381
#define MULT 33

uint32_t hashf_djb2_m(char *str) {
    uint32_t hash = INIT;
    char c;
    while((c=*str++)) {
        hash = hash * MULT + c;
    }
    return hash;
}
```

If you look over the internet for **djb2** you will find a different implementation that uses one clever simple trick. The code would be:

```c
#define INIT 5381

uint32_t hashf_djb2(char *str) {
    uint32_t hash = INIT;
    char c;
    while((c=*str++)) {
        hash = ((hash << 5) + hash) + c;
    }
    return hash;
}
```

If we write `a << x`, we are shifting `x` bits of `a` to the left. By the magic of bitwise operations this is equivalent of multiplying `a * 2^x`. 

So, our expression `hash = ((hash << 5) + hash) + c` is equivalent to `hash = (hash * 2^5) + hash + c`, that is equivalent to `hash = hash * (2^5 + 1) + c`, that is equivalent `hash = hash * 33 +c`. 

This is **not** just a fancy way of doing things. Historically speaking, most CPUs were performing bitshifts faster than multiplication or division. They still do.

In modern times, modern compilers are capable of performing all kinds of optimisations, this one included, but not guaranteed. So it's up to you to decide if making things harder to read is worth it, also some benchmarking is recommended. 

### sdbm

If you search the internet for **sdbm** you won't find a lot of details, [except](http://www.cse.yorku.ca/~oz/hash.html):

> This algorithm was created for sdbm (a public-domain reimplementation of ndbm) database library. it was found to do well in scrambling bits, causing better distribution of the keys and fewer splits. it also happens to be a good general hashing function with good distribution. 

The function looks like this:

```c
uint32_t hashf_sdbm(char *str) {
    uint32_t hash = 0;
    char c;
    while((c=*str++)) {
        hash = c + (hash << 6) + (hash << 16) - hash;
    }
    return hash;
}
```

## More explorarion

What we've discussed so far about **hash functions** only scratches the surface of a vast subject. There are hundreds of functions, some of them better than others. But, as Software Engineers we need to be pragmatic, know about them, ponder over their pros and cons... and in the end take things for granted. Most of the times, simple is better.

For high(er)-level programming languages (C++, C#, Java, python) the "hashing" problem is already sorted-out at "language" or "standard library" level, so we rarely have to write (or copy paste) a hash function by hand. 

If you want to explore this topic more, I suggest you also take a look at the following articles:

* [FNV Hash](http://www.isthe.com/chongo/tech/comp/fnv/) - a popular **hash function** designed to be fast, while maintaining a low collision rate. 
* [Zobrist Hashing](https://en.wikipedia.org/wiki/Zobrist_hashing) - a **hash function** used in computer programs that play abstract board games, such as chess and Go, to implement transposition tables, a special kind of hash table that is indexed by a board position and used to avoid analyzing the same position more than once.
* [Integer hash function](https://gist.github.com/badboy/6267743)
* [4-byte Integer hashing](http://burtleburtle.net/bob/hash/integer.html)


# Again, hash tables

As we previously stated, **hash tables** are fundamental data structures that associates a set of keys with a set of values. **Hash tables** support by default INSERT (or `put`), DELETE and FIND (or `get`) operations with expected `O(1)` complexities. The main idea behind **hash tables** is to use a **hash function** that maps a large input set (keyspace) to smaller domain of array indices. 

Let's represent in a visual way a **hash table** that associates the capitals of europe to their countries:

| European Capital | European Country |
| -- | --- |
| "Paris" | "France" |
| "Berlin" | "Germany" |
| "Warsaw" | "Poland" |
| "Bucharest" | "Romania" |
| "Athens" | "Greece" |

The `key` $$\in$$ `{"Paris", "Berlin", ...}` and the `value` $$\in$$ `{"France", "Germany", ...}` etc.


![png]({{site.url}}/assets/images/2021-10-02-hashing-and-hashtables-in-c/hashtable.png)

Each of our keys is a `chr*`. We can use something like [djb2](#djb2) to hash the string to a `uint32_t` value. We already know that **djb** works well with string inputs.

After we translate our key to the `uint32_t` space, we will need to map it to an a "bucket" (an index in our array of indices). To achieve this, for **simplicity** we will use `% <num_buckets>`, just like we did for [division hashing](#division-hashing). When we add the entry to the bucket, we include both the `key` and the `value` (they might be part of the same `struct`).

At this point, we need to decide how we are going to tackle *collisions*, as two or more entries might have the same **hash value**. 

Ther are two strategies for this:

* Separate Chaining : each *bucket* in the array is modeled by a [**linked list**](https://en.wikipedia.org/wiki/Linked_list) that might contain more than one pair. To lookup an entry, we identify the bucket, then we simply *traverse* the linked list.
* Open addressing : all pairs live directly in the *bucket array*, with exactly one *pair* per *bucket*. If two entries collide, we "probe" the array for finding a new suitable index, and so on. 










