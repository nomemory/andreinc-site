---
title: "RPN Calculator (using Haskell)"
date: "2011-01-06"
categories: 
  - "haskell"
  - "programming-languages"
tags: 
  - "calculator"
  - "functional-programming"
  - "haskell-2"
  - "programming-challenge"
  - "programming-exercise"
  - "programming-praxis"
  - "rpn"
  - "rpn-calculator"
  - "sourcecode"
---

In my [last article](http://andreinc.net/2011/01/03/rpn-calculator-using-python-scala-and-java/) I've presented some solutions ([scala](http://andreinc.net/2011/01/03/rpn-calculator-using-python-scala-and-java#scala-implementation), [java](http://andreinc.net/2011/01/03/rpn-calculator-using-python-scala-and-java#implementation-java), [python](http://andreinc.net/2011/01/03/rpn-calculator-using-python-scala-and-java#implementation-python)) for the [RPN Calculator](http://programmingpraxis.com/2009/02/19/rpn-calculator/) exercise from [Programming Praxis](http://programmingpraxis.com/) . Today I am going to present you the solution in [Haskell](http://www.haskell.org/haskellwiki/Haskell) .

_\[ Disclaimer: I know only basic **Haskell**, as I never had the patience and determination to really grasp this "atrocious" tool . In fact even the source-code highlighting plugin fails when it tries to color the **Haskell** syntax . There's something profoundly wrong with this language . \]_

_rpncalc.hs_

import qualified Data.List as List
import qualified Data.Map as Map

{-- List of supported Operators -> mapping with functions --}
ops = Map.fromList \[("+", (+)),
					("-", flip (-)),
					("\*", (\*)),
					("/", flip (/))\]

{-- Calculates value based on the operator string and two number args --}
opsEval :: String -> Float -> Float -> Float
opsEval key n1 n2 = case (Map.lookup key ops) of
							Just op -> op n1 n2
							Nothing -> error("Invalid operator" ++ key)

{-- The first two elements from the list are poped from the stack, and based
on the operator, the result is pushed back onto the stack --}
evalStack :: \[Float\] -> String -> \[Float\]
evalStack \[\] key = \[\]
evalStack \[x\] key = \[x\]
evalStack (x:y:xs) key = (opsEval key x y) : xs

{-- The recursive function to evaluate the expression --}
evalRpnExprRec :: \[Float\] -> \[String\] -> Float
evalRpnExprRec stack \[\] = List.head stack
evalRpnExprRec stack (tok:toks)
	| Map.member tok ops = evalRpnExprRec (evalStack stack tok) toks
	| otherwise	= let tokVal = read tok :: Float
				  in evalRpnExprRec (tokVal: stack) toks

{-- Evaluates RPN Expression --}
evalRpnExpr :: String -> Float
evalRpnExpr raw = evalRpnExprRec \[\] (List.words raw)

The code can be loaded in the interpreter and tested:

\*Main> evalRpnExpr "19 2.14 + 4.5 2 4.3 / - \*"
85.29743

And now some short explanations:

1). Just like in the python version for example, we are going to keep a map (**ops**) where the operators are kept as String keys, and the actual functions are the items .

2). The **opsEval** is used to compute two input arguments based on the operator type . For example, if we use this function independently we will get the following results:

\[sourcecode lang="text"\] \*Main> opsEval "+" 134 643 777.0 \*Main> opsEval "\*" 3 23 69.0

3). The **evalStack** function is responsible with the managing the stack needed for the RPN Calculator algorithm . This will pop out the head and the second element, will compute their results based on the operator, and put the result back onto the stack .

If you have any suggestions on how to improve the code to make it more _haskellesque_ please don't hesitate to comment .
