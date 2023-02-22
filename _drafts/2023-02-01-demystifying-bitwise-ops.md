---
title: "Demystifying bitwise operations"
date: "2023-02-01"
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

Bitwise operations are a fundamental part of Computer Science. They help Software Engineers to have a deeper understanding of how computers represent and manipulate data, and they are crucial when writing performance-critical code. Truth being said, nowadays, they are rarely used in the business code we write, and they stay hidden in libraries, frameworks, or low-level system programming codebases. The reason is simple: writing code that operates on bits can be tedious, less readable, not always portable, and, most importantly, error-prone. Modern programming languages nowadays have higher-level abstractions that replace the need for bitwise operations and "constructs", and trading (potential) small performance and memory gains for readability is not such a bad deal. Plus, compilers are more intelligent nowadays and can optimise your code in ways you (and I) cannot even imagine. 

To better understand my arguments, not so long ago, [I've written a snake in C]({{site.url}}/2022/05/01/4-integers-are-enough-to-write-a-snake-game) that uses only bitwise operations and squeezes everything into only a handful of `uint32_t` and `uint64_t` variables. [The results (after macro expansions)]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/snake.png) are not that readable, even for an initiated eye.

In any case, this article is not about why we shouldn't ever touch them; on the contrary, it is about why they are cool and how they can make specific code snippets orders of magnitude faster than the "higher-level-readable-modern approach". If you are a programmer who enjoys competitive programming, knowing a little about bitwise operations (in case you don't know about them already) can significantly help you get superior execution times.

Again, knowing about bitwise operations is necessary if you plan a career in system programming or embedded software development.

# Number systems

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/hand.png){:height="40%" width="40%"} 

Nature gifted humankind 10 fingers. As a direct consequence of Nature's decision, our Math (and numbers) are almost always expressed in base 10. If math is discovered by an alien specie with eight fingers, they will probably use base 8 (octal). And... to make it short, computers love base 2 (binary) because computers have only two fingers: 1 and 0, or one and none.

In mathematics, a base refers to the number of distinct symbols we use to represent and store numbers. 

In our case (decimal), those symbols are `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, and `9`. We must “recombine” the existing symbols to express more significant numbers. For example, `127` is expressed by *re-using* `1`, `2`, and `7`. The three symbols are combined to express a more significant quantity that cannot be described using mere fingers.

By far, the most popular number system bases are:

| Number System | Base | Symbols |
| ----- | ----- | ---- | ------- |
| Binary | `2` | [`0`, `1`] |
| Octal  | `8` | [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7` ] |
| Decimal | `10` | [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`] |
| Hexadecimal | `16` | [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `A`, `B`, `C`, `D`, `E`, `F`]

To make things more generic, if $$b$$ is the base, to write the number natural number $$a$$ in base $$b$$ (notation is $$a_{b}$$), then the formula is: $$a_{b}=a_{0}*b^{0}+a_{1}*b^{1}+a_{2}*b^{2}+...+a_{n}*b^{n}$$, where $$a_{n}$$, $$a_{n-1}$$, ..., $$a_{2}$$, $$a_{1}$$, $$a_{0}$$ are the symbols in descending order, and $$a_{i} \lt b$$.

For example, `1078` in base `10` can be written as:

$$1078_{10} = 1 * 10^3 + 0 * 10^2 + 7 * 10^1 + 8 * 10^0$$

If we were to change the base and write `1078` from base `10` to base `7`, then $$b=7$$ and $$a_{i} \in \{0,1,2,3,4,5,6\}$$ (we only have seven fingers numerotated from `0` to `6`):

$$1078_{10} = 3 * 7^3 + 1 * 7^2 + 0 * 7^1 + 0 * 7^0 = 3100_{7}$$

If we are to change the base and write `1078` from base `10` to base `2`, then $$b=2$$ and $$a_{i} \in \{0,1\}$$:

$$
1078_{10} = \\
1 * 2^{10} + 0 * 2^9  + 0 * 2^8 + 0 * 2^7 + 0 * 2^6 + \\
1 * 2^5 + 1 * 2^4 + 0 * 2^3 + 1 * 2^2 + 1 * 2^1 + 0 * 2^0 \\
= 10000110110_{2}
$$

As we've said earlier, computer store numbers in binary, so better visualise how our memory looks like, let's take a look at the following diagram:

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/bitrep.png)

As you can see, to identify the bits (the sequence of zeroes and ones which are the acceptable symbols in binary) comprising the number, we have to find an algorithm to determine the numbers $$a_{i}$$. Luckily for us, such an algorithm exists, and it's straightforward to implement. It works the same, no matter what base we pick.

Based on the above picture, another important observation is that to represent the number 1078 in binary, we need at least ten memory cells (bits) for it (look at the biggest power of 2 used, which is 10). As a side rule, the fewer symbols we have for our base, the more we have to repeat existing symbols. If we want to go extreme and pick `b=1`, we will have a [Unary Numeral System](https://en.wikipedia.org/wiki/Unary_numeral_system), where representing a number `N` is equivalent to repeating the unique symbol of the system `N` times. 

The algorithm for transitioning a number to any base $$b$$ is as follows:
1. We convert the number to the decimal base (the one we commonly use as people);
2. We divide the decimal representation of the number by the base $$b$$;
3. We record the reminder to the division (this will be a digit in the base $$b$$ representation);
4. We continue dividing the quotient with base $$b$$ and keep recording the remainder;
5. If the quotient becomes `0` at some point, we stop.

The base $$b$$ representation of the decimal number will be the sequence of remainders (in reverse order).

For example, let's convert 35 to base 2:

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/bitalgo.png)

After applying the algorithm, $$35_{10}=100011_{2}$$. It's easy to test if things are correct. We take each bit and multiply its corresponding power of `b=2`: $$35_{10}=1*2^{5}+0*2^{4}+0*2^{3}+0*2^{2}+1*2^{1}+1*2^{0}$$.

Converting a number from the decimal system to the hexadecimal number system is a little bit trickier; the algorithm remains the same, but because the hexadecimal system has 16 symbols, and we only have ten digits (`0`, `1`,..., `9`) we need to add additional characters to our set, the letters from `A` to `F`. `A` corresponds to 10, `B` corresponds to `11`, `C` corresponds to `12`, `D` corresponds to `13`, `E` corresponds to `14`, and `F` corresponds to `15`.

For example, let's convert `439784` to hexadecimal to see how it looks:

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/bitrep2.png)

As you can see, $$439784_{10}=6B5E8_{16}$$. Another popular notation for hexadecimal numbers is `0x6B5E8`; you will see the `0x` prefix before the number. Similarly, for binary, there's the `0b` prefix before the actual number representation (C doesn't support this). 

Because numbers in the binary numerical system take so much "space" to be represented, you will rarely see them printed in binary, but you will see them in hexadecimal.

Personally, when I have to "translate" from binary to hexadecimal, and vice-versa, I don't apply any "mathematical" algorithm. There's a simple "visual" correspondence we can use:

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/bin2hex.png)

As you can see, each symbol from the hexadecimal format can be represented as a sequence of 4 bits in binary. `8` is `1000`, `E` is `1110`, and so on... When you concatenate everything, you have the binary representation of the number from hexadecimal to binary. The reverse operation also works. With a little *bit* of experience (no pun intended), you can do the "transformation" in your head and become one of the guys from [The Matrix](https://en.wikipedia.org/wiki/The_Matrix).

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/matrix.jpeg)

If you don't have experience with the hexadecimal number systems, write the digits on a piece of paper a few times until you memorise them:

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/hexadigits.png)

# A certain symmetry and patterns

Numbers, especially when represented in binary, have a certain symmetry associated with them. The most obvious pattern is the way odd and even numbers have to alternate `0` and `1` as their last (least significant) bit:

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/hexadigits_sym1.png)

There's no magic; this is the way numbers operate. If we move one column to the left (the bits corresponding to $$2^1$$), you will see every two ($$2^1$$) bits alternating: `00` alternates with `11`. 

If we move one more column to the left (to the bits corresponding to $$2^2$$), you will see every four bits ($$2^2$$) alternating: `0000` alternates with `1111`.

If we move just another column to the left (to the bits corresponding to $$2^3$$), you will see every eight bits ($$2^3$$) alternating: `00000000` alternates with `11111111`.

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/hexadigits_sym2.png)

Another interesting way to look at the numbers in binary is to "cut" their representation in half and observe a "mirroring" effect:

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/hexadigits_sym3.png)

If we were to use our imagination, we could even fold the "bit surface”; we would get only a "surface" of `1` bits, as the upper chunk will fill up the gaps in the lower one:

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/hexadigits_sym4.png)

Another interesting pattern is looking at a "ladder" forming up, where each step is double the size of the previous one (look at the green line from the image below):

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/hexadigits_sym5.png)

"The ladder" changes its step whenever it encounters a power of two. Also, if you look closer, every power of two has only one bit of `1` at the power's position in the number. 

# Numbers and Data Types in C

The C programming language provides numeric data types to store numbers in the computer’s memory. As previously mentioned, they are stored in binary (as a sequence of zeroes and ones). I am sure you've heard about `char`, `int`, `unsigned int`, `long`, `long long`, `float`, etc. If you want to revamp your knowledge in this area, I guess [this Wikipedia](https://en.wikipedia.org/wiki/C_data_types) article is more than enough. The biggest problem with the "classic" types was that their size could differ from one machine to another.

For example, `char` is defined in the standard as an integer type (that can be signed or unsigned) that contains `CHAR_BIT` bits of information. On most machines, `CHAR_BIT` is `8`, but there were machines where for reasons beyond the scope of this article, `CHAR_BIT` was `7`. Working on the bits of a `char` and assuming they are `8` (99.99% of the cases) would create portability problems on the much fewer systems where `CHAR_BIT` is `7`. (*Note: `CHAR_BIT` is a macro defined in [`limits.h`](https://en.cppreference.com/w/c/types/limits)*)

The same goes for the typical `int`. In the C standard, `int` doesn't have a fixed size in terms of the bits it contains, only a lower bound, meaning it should be a least `16` bits long; on my machine is `32`, so again, portability issues are in sight.

With [C99](https://en.wikipedia.org/wiki/C99), new fixed-length data types were introduced to increase the portability of the software we write. They can be found in the header file `inttypes.h` (and in `stdint.h`). Those are the types I prefer to use nowadays when I write C code:

* `int8_t` : signed integer with 8 bits;
* `int16_t` : signed integer with 16 bits;
* `int32_t` : signed integer with 32 bits;
* `int64_t` : signed integer with 64 bits;

For each `intN_t` signed integer, there is also an `uintN_t` counterpart (unsigned integer, `N=8,16,32,64`). For this reason, we will use the fixed-size integers from `stdint.h` in our code.

Letting signed integers aside for a moment (as we will discuss later how negative numbers are represented), if we were to visually represent `uint8_t`, `uint16_t` and `uint32_t` (skipping `uint64_t`), they look like this:

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/typesize.png)

The maximum value an `uint8_t` variable can take is when all its bits are set to 1:

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/maxuint8_t.png)

To determine the maximum unsigned integer we can hold in a variable of type `uint8_t`, we add all the powers of two like this:

$$ 
m = 1 * 2^7 + 1 * 2^6 + 1 * 2^5 + 1 * 2^4 + 1 * 2^3 + 1 * 2^2 + 1 * 2^1 + 1 * 2^0 = \\
= 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = \\
= 255
$$

Or, we can use this formula: $$\sum_{i=0}^{n} 2^i =2^{n+1}-1$$, so for each `uintN_t` we can up with this table:

| Unsigned Fixed Type | Maximum Value | C Macro |
| --- | --- | --- |
| `uint8_t` | 2<sup>8</sup>-1=255 | `UINT8_MAX` |
| `uint16_t` | 2<sup>16</sup>-1=65535 | `UINT16_MAX` |
| `uint32_t` | 2<sup>32</sup>-1=4294967295 | `UINT32_MAX` |
| `uint64_t` | 2<sup>64</sup>-1=18446744073709551615 | `UINT64_MAX` |

Yes, you've read well; there are also macros for all the maximum values. When you are programming, you don't have to compute anything; it will be a waste of CPU time to redo the math all over again. So everything is stored as *macro constants* (if such a thing exists):

```cpp
#include <stdio.h>
#include <stdint.h> // macros are included here

int main(void) {
    printf("%hhu\n", UINT8_MAX);
    printf("%hu\n", UINT16_MAX);
    printf("%u\n", UINT32_MAX);
    printf("%llu\n", UINT64_MAX);
    return 0;
}
```

Output:

```
255
65535
4294967295
18446744073709551615
```

# Transforming numbers from the decimal to other number systems (binary, hexadecimal, etc.)

For this exercise, we will write a C function that takes an `uint16_t` and prints its representation in other numerical systems to `stdout`.

For everything bigger than base `10`, we will use the letters from the alphabet. If the base is bigger than `36` (`10` digits + `26` letters), we will print an error to the `stderr`. We will start by defining an "alphabet" of symbols that map every number from `0..35` to the digits and letters that we have available:

```cpp
#define MAX_BASE 36
char symbols[MAX_BASE] = {
    '0', '1', '2', '3', '4', '5', '6', '7', '8',
    '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q',
    'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
};
// For 0, symbols[0] = '0'
// ...
// For 11, symbol[11] = 'B'
// ...
// For 35, symbol[35] = 'Z'
```

The next step is to write a function that implements the basic algorithm described in the first section of the article.

```cpp
#define MAX_BASE 36
char symbols[MAX_BASE] = { /** numbers and letters here */ };
void print_base_iter1(uint16_t n, uint8_t base) {
    // Sanity check
    if (base >= MAX_BASE){
        fprintf(stderr, "Base %d is bigger than the possible accepted base", base);
        return;
    }
    uint16_t r;
    while (n>0) { // While quotient is bigger than 0
        r = n % base; // Compute the remainder
        n /= base; // Divide with base again
        fprintf(stdout, "%c", symbols[r]); // Print the symbol
                                           // Associated with the remainder
    }
}
```

Everything looks good, but if we run the function, we will see a slight inconvenience; the symbols are printed in the reverse order we want them to be. For example, calling: `print_base_iter1(1078, 2);` will yield the result: `01101100001`, which is technically correct, but only if we read the number from right to left or use a mirror. Jokes aside, the correct answer is `10000110110`.

Now let's try to convert a number from decimal to hexadecimal to see some letters by printing `print_base_iter1(44008, 16);`, the result given by our function is `8EBA`, again if we read it from right to left, it's "the excellent" result.

To fix this inconvenience, we can write the results in an intermediary, `char*` (string), to control the order in which we show the characters. Or we can use a Stack data structure, where we push the remainders individually and then print them while we pop them out.

Another simpler solution is to use recursion + the only stack real programmers use (that was a joke!):

```cpp
#define MAX_BASE 36
char symbols[MAX_BASE] = { /** */ };
static void print_base_rec0(uint16_t n, uint8_t base, uint16_t rem) {
    if (n>0) {
        uint16_t r=n%base;
        print_base_rec0(n/base, base, r); // calls the method again
                                          // printing the character from the next line
                                          // doesn't happen until the previous call to 
                                          // the method is finished
        fprintf(stdout, "%c",symbols[r]);
    }
}
void print_base_rec(uint16_t n, uint8_t base) {
    if (base>=MAX_BASE) {
        fprintf(stderr, "Base %d is bigger than the possible accepted base", base);
        return; 
    }
    print_base_rec0(n, base, 0);
}
```

To simplify things, C supports *hexadecimal literals* (but not binary!), so we can assign numbers in hexadecimal to variables. In C, a hexadecimal literal is written with the prefix `0x` (or `0X`) followed by one or more hexadecimal symbols (digits). Both uppercase and lowercase work.

For example, we can write: 

```cpp
uint32_t x = 0x3F;    // 0x3F is 63  
                      // another way of writing: 
                      //
                      //            uint32_t x = 63

uint32_t y = 0xABCD;  // 0xABCD is 43981
                      // another way of writing: 
                      //            
                      //            uint32_t x = 43981
```

We can also print the hexadecimal representation of a number using `"%X"` (uppercase letters) or `"%x"` (lowercase letters) as the format specifier:

```cpp
int main(void) {
    printf("%x\n", 63);
    printf("%X\n", 43981);
    return 0;
}

// Output;
// 3f
// ABCD
```

Hexadecimal literals allow us to insert easter eggs in our code base. For example, this simple line can act as a warning for developers just about to join your project:

```cpp
printf("%x %x %x %x\n", 64206, 10, 2989, 49374);

// Output:
// face a bad c0de  
```

Unfortunately, in C, there's no binary literal...

# Bitwise operations

Bitwise operations are mathematical operations that manipulate the individual bits of a number (or set of numbers). As the name suggests, they work on bits. 

The operations are:

| Symbol | Operation  | 
| --- |---            |
| `&` | bitwise `AND` |
| `|` | bitwise `OR`  |
| `^` | bitwise `XOR` |
| `~` | bitiwse `NOT` |

Additionally, you have two more operations to shift bits (right or left) inside a number.

| Symbols | Operation |
| --- |---            |
| `<<` | left `SHIFT`  |
| `>>` | right `SHIFT` |

## Bitwise AND

In the C programming language, the `bitwise AND` operator, denoted as `&` (not to be confused with `&&`), is a binary operator that operates on two integer operands and returns an integer operand. The operation is performed for each pair of corresponding bits of the operands. The result is a new integer in which each bit position is set to `1` only if the corresponding bits of both operands are also `1`. Otherwise, the result bit is set to `0`. 

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/bitwise_and.png)

Let's give it a try in code:

```c
uint8_t a = 0x0A, b = 0x0B;
printf("%x", a&b);

// Output
// a
```

Explanation: `0x0A`is `0b00001010`, while `0x0B` is `0b00001011`, and if we were to put bits side by side and apply `&` between them, we would get the following:

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/bitwise_and_01.png)

As you can see, only the `1` bits are *selected*, so the result is `0x0A`.

Trying to apply bitwise operations to `double` or `float` types won't work:

```cpp
double a = 0.0;
printf("%x", a&1);
```

Error:

```
bits.c:120:19: error: invalid operands to binary & (have 'double' and 'double')
  120 |     printf("%x", a&1.0);
      |                   ^
```

One thing to take into consideration is the fact that `&` is both associative and commutative. 

The *associative* property means that the grouping of operands does not affect the result. So, if we have three or more operands, we can group them in any way we choose, but the result will remain the same:

```cpp
// Associativity "smoke test"
uint8_t a=0x0A, b=0x30, c=0x4f;
printf("%s\n", (((a&b)&c) == (a&(b&c))) ? "True" : "False");

// Output:
// True
```

Visually it's quite an intuitive property, so let's put `a=0x0A`, `b=0x30`, and `c=0x4f` side by side and see what things look like:

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/andassoc.png)

No matter how we group the operands, the results will always be the same: `0x00` because there's no column containing only `1` bits. A single `0` in a column invalidates everything. 

The *commutative* property means that the order of operands doesn't affect the result. So, for example, writing `a&b` renders the same result as writing `b&a`. 

```cpp
// Commutativity "smoke test"
uint8_t a=0x0A, b=0x30;
printf("%s\n", ((a&b)==(b&a)) ? "True" : "False");

// Output: 
// True
```

## Bitwise OR

The `bitwise OR` (with its symbol: `|`) is a binary operator that compares the corresponding bits of two integer operands a produces a new value in which each bit is set to 1 if either (or both) of the corresponding bits in the operand are one.

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/bitwise_or.png)

Again, let's try using `|` in our code:

```cpp
uint8_t a = 0xAA, b=0x03;
printf("%x", a|b);

// Output
// AB
```

Explanation `0xAA` is `0b10101010`, while `0x03` is `0b00000011`. If you put the two numbers side by side and apply `|` to their bits, we get the result `0xAB`. Visually, things look like this:

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/bitwise_or_O1.png)

If we look at the columns, and there's at least one bit of `1`, the result on that column will be `1`, regardless of the possible `0` (zeroes). For this reason, `|` is both *associative* and *commutative*.

## Bitwise XOR

The `bitwise XOR` operator (`^`) is a binary operator that compares the corresponding bits of two operands and returns a new value where each bit is set to `1` if the corresponding bits of the operand are different, and `0` if they are the same.

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/bitwise_xor.png)

Two identical numbers `a` and `b` will always `XOR` to `0`, because all the identical bits will nullify themselves.

So, if `a==b` then `a^b==0`:

```cpp
uint8_t a = 0xAF, b=0xAF;
printf("a==b is %s\n", (a==b) ? "True" : "False");
printf("a^b=0x%x\n", a^b);

// Output
// a==b is True
// a^b=0x0
```

Because we like patterns we can also `0xAA ^ 0x55 == 0xFF`, visually it's more satisfying:

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/bitwise_xor_o1.png)

Just like `&` and `|` before, `^` is both an associative and commutative operation. So, another useless, but interesting, observation we can make, is that `XOR`ing all the numbers in a loop up to a power of two (`>=2`) is always `0`:

```cpp
void xoring_power_two() {
    // An array containing a few powers of 2
    uint8_t pof2[4] = {4, 8, 16, 32};
    // For each power of two
    for(int i = 0; i < 4; i++) {
        uint8_t xored = 0;
        // XOR all numbers < the current power of two
        for(int j = 0; j < pof2[i]; j++) {
            printf(" 0x%x %c", j, (j!=(pof2[i]-1)) ? '^' : 0);
            xored^=j;
        }
        // Print the final result `= xored`
        printf("= 0x%x\n", xored);
    } 
}

// Output
// 0x0 ^ 0x1 ^ 0x2 ^ 0x3 = 0x0
// 0x0 ^ 0x1 ^ 0x2 ^ 0x3 ^ 0x4 ^ 0x5 ^ 0x6 ^ 0x7 = 0x0
// 0x0 ^ 0x1 ^ 0x2 ^ 0x3 ^ 0x4 ^ 0x5 ^ 0x6 ^ 0x7 ^ 0x8 ^ 0x9 ^ 0xa ^ 0xb ^ 0xc ^ 0xd ^ 0xe ^ 0xf = 0x0
// 0x0 ^ 0x1 ^ 0x2 ^ 0x3 ^ 0x4 ^ 0x5 ^ 0x6 ^ 0x7 ^ 0x8 ^ 0x9 ^ 0xa ^ 0xb ^ 0xc ^ 0xd ^ 0xe ^ 0xf ^ 0x10 ^ 0x11 ^ 0x12 ^ 0x13 ^ 0x14 ^ 0x15 ^ 0x16 ^ 0x17 ^ 0x18 ^ 0x19 ^ 0x1a ^ 0x1b ^ 0x1c ^ 0x1d ^ 0x1e ^ 0x1f = 0x0
```

## Bitwise NOT

In the C Programming language, the `bitwise NOT` it's a unary operator denoted by the `~` character. It works on a single operand, negating all the bits of the operand, by changing `1` to `0` and `0` to `1`.

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/bitwise_not.png)

Negating `0b0001` is `0b1110`, negating `0b0000` is `0b1111` and so on...

For example:

```cpp
uint16_t a = 0xAAAA; // a = 1010 1010 1010 1010 == 0xAAAA
uint16_t b = ~a;     // b = 0101 0101 0101 0101 == 0x5555
printf("0x%X\n", a);
printf("0x%X\n", b);

// Output
// 0xAAAA
// 0x5555
```
And visually things look like this:

![png]({{site.url}}/assets/images/2023-02-01-demystifying-bitwise-ops/bitwise_not_01.png)

## Left Shift

