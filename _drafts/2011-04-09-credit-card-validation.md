---
title: "Credit Card Validation (Python 3.x)"
date: "2011-04-09"
categories: 
  - "algorithms"
  - "programming-languages"
  - "python-programming-languages"
tags: 
  - "credit-card-validation"
  - "functional"
  - "ibm"
  - "list-comprehension"
  - "luhn-algorithm"
  - "programming-praxis"
  - "python"
  - "python-3-x"
  - "solution"
---

If you ever wondered how Credit Card Numbers, [IMEI](International Mobile Equipment Identity) Numbers or Canadian Social Insurance Numbers are validated you can take a look at this [Programming Praxis](http://programmingpraxis.com) **[article](http://programmingpraxis.com/2011/04/08/credit-card-validation/)** . It's all about a simple, tiny, patented (now public domain) algorithm invented by IBM's computer scientist [Hans Peter Luhn](http://en.wikipedia.org/wiki/Hans_Peter_Luhn) .

The validation is pretty simple, and works this way:

1\. Given a number we will consider the last digit a check-digit . 2. Starting from the check digit backwards we will multiply by 2 every even digit . 3. We will sum all digits (both doubled and undoubled) . 4. If the sum is a multiple of 10 then the number is valid, else is invalid .

Example:

<table border="1"><tbody><tr><td><strong>5</strong></td><td>4</td><td><strong>3</strong></td><td>2</td><td><strong>9</strong></td><td>8</td><td><strong>3</strong></td><td>7</td><td><strong>6</strong></td><td></td></tr><tr><td><strong>5</strong></td><td>8</td><td><strong>3</strong></td><td>4</td><td><strong>9</strong></td><td>(1+6)</td><td><strong>3</strong></td><td>(1+4)</td><td><strong>6</strong></td><td>= 50 (which is a muliple of 10, thus the number is valid)</td></tr></tbody></table>

I've written the implementation of this simple algorithm using python 3.x . The solution can become rather elegant if we use the functional programming features that python offers us:

def luhn\_check(num):
    ''' Number - List of reversed digits '''
    digits = \[int(x) for x in reversed(str(num))\]
    check\_sum = sum(digits\[::2\]) + sum((dig//10 + dig%10) for dig in \[2\*el for el in digits\[1::2\]\])
    return check\_sum%10 == 0

if \_\_name\_\_ == "\_\_main\_\_":
    print(luhn\_check(543298376))

And the output:

True

Observations:

1. At line 3 we are using [list comprehension](http://docs.python.org/release/3.1.3/tutorial/datastructures.html#list-comprehensions) to transform the number in a list of digits starting backwards (the check digit is at position 0) .
2. We are using "//" operator for Floor division, as the "/" operator in the 3.x series means True division .
3. (dig//10 + dig%10) this trick works well when we need determine the sum of the digits of a number smaller than 100 . Eg. (19//10 + 19%10) = (1 + 9) = 10 .
