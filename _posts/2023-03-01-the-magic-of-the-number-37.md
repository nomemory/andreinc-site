---
title: "The so-called magic of the number 37"
date: "2023-03-01"
classes: wide
usemathjax: true
comments: true
excerpt: "Debunking a meme"
categories:
- "math"
tags:
- "fun"
---

> This post is satire. It may also not make too much sense.

Today I've seen this picture on my LinkedIn wall:

![png]({{site.url}}/assets/images/2023-03-01-the-magic-of-the-number-37/37.png){:width="50%"}

And it triggered me badly. There are people in my network highly sensitive to the *divine nature* of numbers. As a math enthusiast, I won't get it. 

So, for all the people believing in [numerology](https://en.wikipedia.org/wiki/Numerology), let's find the numbers that carry [highly amplified or/and uber-vibrational powers](https://www.keen.com/articles/spiritual/numerology-the-cosmic-vibrations-of-numbers), more than you can imagine. 

Keep in mind `37` is super-weak compared to `15873`:

```
The magic of the number 15873

15873 x 7 	= 111111
15873 x 14 	= 222222
15873 x 21 	= 333333
15873 x 28 	= 444444
15873 x 35	= 555555
15873 x 42 	= 666666
15873 x 49	= 777777
15873 x 56	= 888888
15873 x 63	= 999999

(As you can see, 15873 times a multiple of 7, gives a sextuple Rep Digit,
short for Repeating Digit which carry amplified or vibrational powers.
```

But let me tell you, even `15873` is super-weak compared to other numbers that carry *uber-highly-amplified and/or uber-highly-vibrational powers*. So let's write a small python script that can list more *vibrational powerful numbers* (whatever that is) than `37` and `15873`.

```python
from primefac import primefac
from collections import Counter
import sys

def compute_vibrational_num(vp):
    n, res, vp_ret = 1, 0, vp
    while vp != 0: n, vp = 1000 * n + 1, vp - 1
    n *= 111
    primef = Counter(list(primefac(n))).most_common(2)
    primef = primef[1 if primef[1][0] == 7 else 0]
    magic = primef[0] ** primef[1]
    res=n//magic
    return (magic, int(res), vp_ret)

def print_text(tpl):
    print(f"The magic of the number {tpl[1]}")
    for i in range(1,10):
        print(f"{tpl[1]} x {tpl[0]*i} = {tpl[1] * tpl[0] * i}")
    print(f"""
(As you can see, {tpl[1]} times a multiple of {tpl[0]}, gives a {(tpl[2]+1)*3}nthuple Rep Digit,
short for Repeating Digit which carry amplified or vibrational power.
            """)
```

Yes, I know, it looks bad, and you also have to install a pip package called [primefac](https://pypi.org/project/primefac/) to do the *hard work* for us. Now, the `vp` parameter from our function gives us the *vibrational power* (whatever that is) of the number.

For example, if we call `print_text(compute_vibrational_num(0))`, we get the results from the picture (that's boring):

```
The magic of the number 37
37 x 3 = 111
37 x 6 = 222
37 x 9 = 333
37 x 12 = 444
37 x 15 = 555
37 x 18 = 666
37 x 21 = 777
37 x 24 = 888
37 x 27 = 999

(As you can see, 37 times a multiple of 3, gives a 3nthuple Rep Digit,
short for Repeating Digit which carry amplified or vibrational power.
```

But if we increase the vibrational power of the number to, let's say, `vp=13`, we will get something significantly more powerful:

```
The magic of the number 2267573696145124716553287981859410430839
2267573696145124716553287981859410430839 x 49 = 111111111111111111111111111111111111111111
2267573696145124716553287981859410430839 x 98 = 222222222222222222222222222222222222222222
2267573696145124716553287981859410430839 x 147 = 333333333333333333333333333333333333333333
2267573696145124716553287981859410430839 x 196 = 444444444444444444444444444444444444444444
2267573696145124716553287981859410430839 x 245 = 555555555555555555555555555555555555555555
2267573696145124716553287981859410430839 x 294 = 666666666666666666666666666666666666666666
2267573696145124716553287981859410430839 x 343 = 777777777777777777777777777777777777777777
2267573696145124716553287981859410430839 x 392 = 888888888888888888888888888888888888888888
2267573696145124716553287981859410430839 x 441 = 999999999999999999999999999999999999999999

(As you can see, 2267573696145124716553287981859410430839 times a multiple of 49, gives a 42nthuple Rep Digit,
short for Repeating Digit which carry amplified or vibrational power.
```

*I wish you to find the most vibrational number your hardware allows to.*

---

Repdigits are natural numbers composed of instances of the same digit. The coolest repdigits are the [Mersene primes](https://en.wikipedia.org/wiki/Mersenne_prime). They are prime numbers that, when represented in binary, are composed only of `1`s.

All in all, let's get back to our powerful *vibrational numbers* (whatever that means).

Numbers like `11...1` can sometimes be prime, but if the number of `1` digits is a multiple of 3, we know they aren't. It's a simple proof:

$$
\underbrace{111...111}_\text{3i digits} = 10^0 + 10^1 + 10^2 + ... + 10^{3i-3} + 10^{3i-2} + 10^{3i-1}
$$

If we group the digits `3` by `3`, we'll get the following relationship:s

$$
111...111 = \underbrace{(1 + 10 + 100)}_\text{111} + ... + 10^{3i-3}*\underbrace{(1 + 10 + 100)}_\text{111}
$$

And then if we use `111` as a common factor we obtain:

$$
111...111 = 111 * (1 + ... + 10^{3i-3})
$$

But $$111=3 * 37$$, so repdigits with the number of digits of $$3$$, are always divisible with $$3$$ or $$37$$. 
As an interesting observation, they are from time to time divisible with $$7$$ (but not always).

This is how our code functions:
* It generates numbers like `111..111`;
* It gets their prime factors (we know for certain they are not prime);
* Then it separates the prime factors in a "bigger" *highly vibrational number*, and keeps a multiple of `3` or `7` as the *meme* multiplier;









