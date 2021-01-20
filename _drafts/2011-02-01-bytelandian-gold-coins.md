---
title: "Bytelandian gold coins"
date: "2011-02-01"
categories: 
  - "programming-languages"
  - "python-programming-languages"
tags: 
  - "bytelandian-gold-coins"
  - "codechef"
  - "easy"
  - "exercises"
  - "programming-challenges-2"
  - "programming-exercises"
---

A nice programming challenge (easy/medium difficulty) comes from [http://www.codechef.com/](http://www.codechef.com/) and it is being called: ["Bytelandian gold coins"](http://www.codechef.com/problems/COINS/).

From this exercise I've learnt that the most elegant solutions are **recursive** .

In this challenge our task is to resolve the currency issues in a imaginary country, Byteland:

> Each Bytelandian gold coin has an integer number written on it. A coin n can be exchanged in a bank into three coins: n/2, n/3 and n/4. But these numbers are all rounded down (the banks have to make a profit).
> 
> You can also sell Bytelandian coins for American dollars. The exchange rate is 1:1. But you can not buy Bytelandian coins.
> 
> You have one gold coin. What is the maximum amount of American dollars you can get for it?
> 
> The input will contain several test cases (not more than 10). Each testcase is a single line with a number n, 0 <= n <= 1 000 000 000. It is the number written on your coin.
> 
> For each test case output a single line, containing the maximum amount of American dollars you can make.
> 
> ### ([...more here](http://www.codechef.com/problems/COINS/))

My first attempt (which seemed natural at that point) was working "flawlessly" on my local machine but **[codechef](http://www.codechef.com/)** was insistingly reporting **Time Limit Exceed:**

import sys

#dnd -> do not divide any further
dnd = set(\[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 15, 17, 19, 23\])

def diver(num):
    return \[(num / 2), (num / 3), (num / 4)\]

def change(num):
    if num in dnd:
        #I won't divide any further
        return num
    else:
        #Will be used as a stack
        divs = diver(num)
        sum  = 0
        while len(divs) > 0:
            elem = divs.pop()
            if elem in dnd:
                sum += elem
            else:
                divs.extend(diver(elem))
    return sum

#For codechef to test
if \_\_name\_\_ == "\_\_main\_\_":
    while True:
        try:
            num = int(raw\_input())
            sys.stdout.write("%dn" % change(num))
        except:
            break

Eventually the recursive solution rendered a smile on my face, making me saying: "That wasn't so hard...":

import sys

cache = {0:0}

def change(num):
    if num in cache:
        return cache\[num\]
    else:
        cache\[num\] = max(num, change(num / 4) + change(num / 3) + change(num / 2))
        return cache\[num\]

#For codechef to test
if \_\_name\_\_ == "\_\_main\_\_":
    while True:
        try:
            num = int(raw\_input())
            sys.stdout.write("%dn" % change(num))
        except:
            break
