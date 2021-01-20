---
title: "Problem 22 (Project Euler) python 2.7.x solution"
date: "2012-04-09"
categories: 
  - "python-programming-languages"
---

One of my favorite online resources for programming challenges is called [Project Euler](http://projecteuler.net/) . More than certain you've heard about it, otherwise what would be the reason to visit this page.

Problem 22 is a simple to medium challenge . In order to solve it you'll need basic programming knowledge: reading a line from a file, apply some functions on a string, lambda functions and python list comprehension .

Here is the requirment:

> Using [names.txt](http://projecteuler.net/project/names.txt) (right click and 'Save Link/Target As...'), a 46K text file containing over five-thousand first names, begin by sorting it into alphabetical order. Then working out the alphabetical value for each name, multiply this value by its alphabetical position in the list to obtain a name score.
> 
> For example, when the list is sorted into alphabetical order, COLIN, which is worth 3 + 15 + 12 + 9 + 14 = 53, is the 938th name in the list. So, COLIN would obtain a score of 938 ![×](images/symbol_times.gif) 53 = 49714.
> 
> What is the total of all the name scores in the file?

And this was my "condensed" solution:

#!/usr/bin/env python
# python version: 2.7.x
# Euler Problem 22
# author: Andrei Ciobanu (www.andreinc.net)

in\_file = open('names.txt', 'r')
names = in\_file.readline().replace('\\"','').split(',')
names.sort()
worth = lambda idx, name: idx \* sum(\[ord(x) - ord('A') + 1 for x in name\])
print sum(\[worth(idx+1, name) for (idx, name) in enumerate(names)\])

There's no need for additional comments, the code is pretty straight-forward.
