---
title: "Evaluate RPN expressions using Haskell, Scala, and python"
date: "2011-01-03"
classes: wide
excerpt: "RPN Calculator in 3 different programming languages"
categories: 
- "scala"
- "python"
- "haskell"
tags: 
  - "algorithm"
  - "code"
  - "expressions"
  - "java-2"
  - "module"
  - "operand"
  - "operator"
  - "programming-praxis"
  - "python"
  - "rpn-calculator"
  - "scala"
  - "solution"
  - "sourc-code"
  - "stack"
  - "stack-based"
  - "token"
  - "tokenization"
---

# Description

One of the earliest [Programming [Praxis](http://programmingpraxis.com/) (the site died, so the link doesn't work anymore) challenges is called the *[RPN Calculator](http://programmingpraxis.com/2009/02/19/rpn-calculator/)*. Our task is to write an RPN module that evaluates simple RPN expressions and returns the correct result. RPN stands for [Reverse Polish Notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation), a mathematical way of describing an expression where operators strictly follow their operands. From a computational perspective, using RPN leads to faster execution because the expressions don't contain any parenthesis (less parsing), and the algorithm to evaluate them is straightforward. 

So, the exact requirement was:

> Implement an RPN calculator that takes an expression like `19 2.14 + 4.5 2 4.3 / - *` which is usually expressed as `(19 + 2.14) * (4.5 - 2 / 4.3)` and responds with 85.2974. The program should read expressions from standard input and print the top of the stack to standard output when a newline is encountered. The program should retain the state of the operand stack between expressions.

If you are new to programming, it's worth reading about Stacks first because the algorithm to solve the exercise is stack-based:

0. Initialize an empty `Stack`;
1. Tokenize the expression. For example, the `String` `"19 2.14 + 4.5 2 4.3 / - *"` becomes an array of `Strings` in the form: `{"19", "2.14", "+", "4.5", "2", "4.3", "/", "-", "*"}`;
2. Iterate over the array of tokens computed at step `1`.
	* If the token is an operand (number) - we `push()` it onto the `Stack` initialized at step 0.
	* If the token is an operator (we should know how many operands it needs, let's say the number of operands is `N`), we `pop()` `N` values from the Stack, we evaluate the operation, and we `push()` the result back onto the `Stack`.
3. At the end of the iteration, if the expression is valid, the `Stack` will contain only **one** value: the actual result.	


# Implementations

For fun, I will implement the solutions for this challenge using three different languages: `Scala`, `python`, `Haskell`, and `Java`.

## Scala

```scala
import scala.collection.mutable.Stack
import scala.io.Source
import java.lang.Double.parseDouble

object RPNCalc {
	// Maps an operator to a function .
	val ops = Map("+" -> ((_:Double) + (_:Double)),
				  "-" -> (-(_:Double) + (_:Double)),
				  "*" -> ((_:Double)  * (_:Double)),
				  "/" -> (1/(_:Double) * (_:Double)))

	// Evaluate RPN expr (given as string of tokens)
	def evalTokens(tokens: Array[String]) : Double = {
		val stack = new Stack[Double]
		tokens.foreach(tok => {
			if (ops.contains(tok)) stack.push(ops(tok)(stack.pop, stack.pop))
			else stack.push(parseDouble(tok))
		})
		stack.pop
	}

	// Main	function
	def main(args: Array[String]) = {
		// Read line by line from stdin + tokenize line + evaluates line
		Source.fromInputStream(System.in).getLines.foreach(l =>
			printf("exp=%2.2fn", evalTokens(l.split(" "))))
	}
}
```

And if we compile and run the above code:

```
:~/Workspace/scala$ fsc RPNCalc.scala
:~/Workspace/scala$ scala RPNCalc
5 1 2 + 4 * 3 - +
exp=14.00
19 2.14 + 4.5 2 4.3 / - *
exp=85.30
```

## Python 

```python
#!/usr/bin/env python

import sys
import re

OPS = {
		'+' : (lambda x, y: x + y),
		'-' : (lambda x, y: y - x),
		'\*' : (lambda x, y: x * y),
		'/' : (lambda x, y: y / x)
}

def evalTokens(tokens):
	stack = []
	for token in tokens:
		if token in OPS:
			stack.append(OPS[token](stack.pop(), stack.pop()))
		else:
			stack.append(float(token))
	return stack.pop()

if __name__=="__main__":
	while True:
		# Read line by line from stdin + tokenize line + evaluates line
		tokens = re.split(" ", sys.stdin.readline().strip())
		print tokens
		if not tokens:
			break
		sys.stdout.write("exp=%2.2fn" % evalTokens(tokens)) 
```

## Haskell

```haskell
import qualified Data.List as List
import qualified Data.Map as Map

{-- List of supported Operators -> mapping with functions --}
ops = Map.fromList [("+", (+)),
					("-", flip (-)),
					("*", (*)),
					("/", flip ())]

{-- Calculates value based on the operator string and two number args --}
opsEval :: String -> Float -> Float -> Float
opsEval key n1 n2 = case (Map.lookup key ops) of
	Just op -> op n1 n2
	Nothing -> error("Invalid operator" ++ key)

{-- The first two elements from the list are poped from the stack, and based
on the operator, the result is pushed back onto the stack --}
evalStack :: [Float] -> String -> [Float]
evalStack [] key = []
evalStack [x] key = [x]
evalStack (x:y:xs) key = (opsEval key x y) : xs

{-- The recursive function to evaluate the expression --}
evalRpnExprRec :: [Float] -> [String] -> Float
evalRpnExprRec stack [] = List.head stack
evalRpnExprRec stack (tok:toks)
	| Map.member tok ops = evalRpnExprRec (evalStack stack tok) toks
	| otherwise	= let tokVal = read tok :: Float
				  in evalRpnExprRec (tokVal: stack) toks

{-- Evaluates RPN Expression --}
evalRpnExpr :: String -> Float
evalRpnExpr raw = evalRpnExprRec [] (List.words raw)
```

