---
title: "RPN Calculator (using Scala, python and Java)"
date: "2011-01-03"
categories: 
  - "algorithms"
  - "java-programming-languages"
  - "programming-languages"
  - "python-programming-languages"
  - "scala-programming-languages"
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

**1\. Description**

One of the earliest [Programming Praxis](http://programmingpraxis.com/) challenges is called [RPN Calculator](http://programmingpraxis.com/2009/02/19/rpn-calculator/) . Our task is to write a RPN module capable of evaluating simple RPN expressions and return the right result . The exact requirment:

> Implement an RPN calculator that takes an expression like `19 2.14 + 4.5 2 4.3 / - *` which is usually expressed as `(19 + 2.14) * (4.5 - 2 / 4.3)` and responds with 85.2974. The program should read expressions from standard input and print the top of the stack to standard output when a newline is encountered. The program should retain the state of the operand stack between expressions.
> 
> _Programming Praxis_

The natural algorithm to resolve this exercise is _stack-based_ :

<table border="0"><tbody><tr><td>The first step is to tokenize the expression .If the expression is "19 2.14 + 4.5 2 4.3 / - *" after the tokenization the resulting structure will be an array of operands and operators, for example an array of Strings {"19", "2.14", "+", "4.5", "2", "4.3", "/", "-", "*"} .</td></tr><tr><td>At the second step we iterate over the array of tokens .If the token:<ul><li>Is an operand (number, variable) - we push in onto the stack .</li><li>Is an operator (we apriopri know the operator takes <strong>N </strong>arguments), we pop <strong>N</strong> values from the stack, we evaluate the operator with those values as input parameters, we push the result back onto the stack .</li></ul></td></tr><tr><td>If the RPN expression is valid, after we apply the previous steps, the stack would contain only one value, which is the result of the calculation .</td></tr></tbody></table>

**2\. Implementation**

I will implement the solutions for this challenge using three different languages: **Scala**, **python** and **Java** .

**2.1 Scala Solution**

import scala.collection.mutable.Stack
import scala.io.Source
import java.lang.Double.parseDouble

/\*\*
\* RPN Calculator .
\*
\* @author Andrei Ciobanu
\* @date JAN 2, 2011
\*\*/

object RPNCalc {
	// Maps an operator to a function .
	val ops = Map("+" -> ((\_:Double) + (\_:Double)),
				  "-" -> (-(\_:Double) + (\_:Double)),
				  "\*" -> ((\_:Double) \* (\_:Double)),
				  "/" -> (1/(\_:Double) \* (\_:Double)))

	// Evaluate RPN expr (given as string of tokens)
	def evalTokens(tokens: Array\[String\]) : Double = {
		val stack = new Stack\[Double\]
		tokens.foreach(tok => {
			if (ops.contains(tok)) stack.push(ops(tok)(stack.pop, stack.pop))
			else stack.push(parseDouble(tok))
		})
		stack.pop
	}

	// Main	function
	def main(args: Array\[String\]) = {
		// Read line by line from stdin + tokenize line + evaluates line
		Source.fromInputStream(System.in).getLines.foreach(l =>
			printf("exp=%2.2fn", evalTokens(l.split(" "))))
	}
}

And if we compile and run the above code:

:~/Workspace/scala$ fsc RPNCalc.scala
:~/Workspace/scala$ scala RPNCalc
5 1 2 + 4 \* 3 - +
exp=14.00
19 2.14 + 4.5 2 4.3 / - \*
exp=85.30

And now some short explanations:

<table border="0"><tbody><tr><td><span style="text-decoration: underline;"><strong>RPNCalc</strong></span> is called a singleton object . I believe this is the official Scala "work-around" for defining static utilities functions . Anyways, pretty elegant for an work-around (being ironic) .</td></tr><tr><td><span style="text-decoration: underline;"><strong>ops</strong></span> is&nbsp;<em>HashMap</em>-<em>like</em> data-structure that maps a given string (in our case operators "+", "-", "*", "/") with an associated function literal . Thus we can use the map's elements just like "normal" functions, for example: <strong>ops("+")(1, 3)</strong> evaluates to <strong>4</strong> .You may wonder what's with the : ((_:Double) + (_:Double)) syntax . This is a concise way of saying ((a:Double, b:Double) =&gt; a + b), so the <strong><span style="text-decoration: underline;">ops</span> </strong>can anytime be rewritten as:<div><pre lang="scala">	val ops = Map("+" -&gt; ((a:Double, b:Double) =&gt; a + b),
				  "-" -&gt; ((a:Double, b:Double) =&gt; b - a),
				  "*" -&gt; ((a:Double, b:Double) =&gt; a * b),
				  "/" -&gt; ((a:Double, b:Double) =&gt; b / a))
</pre><div></div></div></td></tr><tr><td><span style="text-decoration: underline;">evalTokens(tokens: Array[String])</span> works exactly as described in the algorithm presentation, the only notable thing about it, is that it uses the mutable version of a Stack data structure .</td></tr><tr><td>And in the main function:<div><pre lang="scala">Source.fromInputStream(System.in).getLines.foreach(l =&gt; function(l))
</pre><div></div></div>Is the same as saying:<div><pre lang="java">        Scanner sc = new Scanner(System.in);
        while(sc.hasNext()){
            function(sc.nextLine());
        }
</pre><div></div></div>in Java (read line by line from standard input) .</td></tr></tbody></table>

**2.2 Python Solution**

At a first glimpse the **python** implementation looks very similar to the **Scala** implementation . Still there are some subtle differences, as **python** doesn't have all the functional characteristics, and the programming style is a little different .

#!/usr/bin/env python

# author: Andrei Ciobanu
# date: JAN 3, 2010

import sys
import re

# dictionary - OPS = {
		'+' : (lambda x, y: x + y),
		'-' : (lambda x, y: y - x),
		'\*' : (lambda x, y: x \* y),
		'/' : (lambda x, y: y / x)
}

def evalTokens(tokens):
	''' Evaluate RPN expr (given as string of tokens) '''
	stack = \[\]
	for token in tokens:
		if token in OPS:
			stack.append(OPS\[token\](stack.pop(), stack.pop()))
		else:
			stack.append(float(token))
	return stack.pop()

if \_\_name\_\_=="\_\_main\_\_":
	while True:
		# Read line by line from stdin + tokenize line + evaluates line
		tokens = re.split(" \*", sys.stdin.readline().strip())
		print tokens
		if not tokens:
			break
		sys.stdout.write("exp=%2.2fn" % evalTokens(tokens)) 

**2.3 Java Solution**

This solution is probably the most verbose, as **Java** has the more strict and primitive syntax, when compared to its counterparts .

In this particular case I wanted to imitate the previous solutions: have a map (dictionary) with operators and the corresponding anonymous functions . Unfortunately **Java** doesn't have support for such constructs (lambda functions, clojures, etc.), so I had to somehow find a work-around .

The first **Java** solution:

import java.util.HashMap;
import java.util.Map;
import java.util.LinkedList;
import java.util.Scanner;

public class RPNCalc {

	// Helper interface needed to immitate anonymous functions
	public static interface Operation {
		public Double eval(Double e1, Double e2);
	}

	public static Map OPS = new HashMap();

	static {
		OPS.put("+", new Operation(){ public Double eval(Double e1, Double e2){ return e1 + e2; }});
		OPS.put("-", new Operation(){ public Double eval(Double e1, Double e2){ return e2 - e1; }});
		OPS.put("\*", new Operation(){ public Double eval(Double e1, Double e2){ return e1 \* e2; }});
		OPS.put("/", new Operation(){ public Double eval(Double e1, Double e2){ return e2 / e1; }});
	};

	// Evaluate RPN expr (given as array of tokens)
	public static Double eval(String\[\] tokens) {
		LinkedList stack = new LinkedList();
		for(String token : tokens) {
			if (OPS.containsKey(token)) {
				stack.push(OPS.get(token).eval(stack.pop(), stack.pop()));
			}
			else {
				stack.push(Double.parseDouble(token));
			}
		}
		return stack.pop();
	}

	// Main	function
	public static void main(String args\[\]) {
		Scanner sc = new Scanner(System.in);
		while(sc.hasNext()) {
			String line = sc.nextLine();
			System.out.println("exp=" + eval(line.split(" ")));
		}
	}
} 

Ok, but having an inner interface + some anonymous classes is a little overkill for our particular case . Maybe a more natural approach for **Java** would be to use functions instead:

import java.util.HashMap;
import java.util.Map;
import java.util.LinkedList;
import java.util.Scanner;

public class RPNCalc2 {

	// List of supported operators
	public static final String\[\] OPERATORS = { "+", "-", "\*", "/" };

	// Test if a token is operator
	public static Boolean isOperator(String token) {
		for(String op : OPERATORS) {
			if(op.equals(token)) {
				return true;
			}
		}
		return false;
	}

	// Operation based on operator
	public static Double operation(String op, Double e1, Double e2) {
		if(op.equals("+")) {
			return e1 + e2;
		}
		else if(op.equals("-")) {
			return e2 - e1;
		}
		else if(op.equals("\*")) {
			return e1 \* e2;
		}
		else if(op.equals("/")) {
			return e2 / e1;
		} else {
			throw new IllegalArgumentException("Invalid operator.");
		}
	}

	// Evaluate RPN expr (given as array of tokens)
	public static Double eval(String\[\] tokens) {
		LinkedList stack = new LinkedList();
		for(String token : tokens) {
			if (isOperator(token)) {
				stack.push(operation(token, stack.pop(), stack.pop()));
			}
			else {
				stack.push(Double.parseDouble(token));
			}
		}
		return stack.pop();
	}

	// Main	function
	public static void main(String args\[\]) {
		Scanner sc = new Scanner(System.in);
		while(sc.hasNext()) {
			String line = sc.nextLine();
			System.out.println("exp=" + eval(line.split(" ")));
		}
	}
} 

**Conclusions:**

Every language has its strength and weaknesses . **Python** is easy to learn, to read, to write and more important is fun . **Java** is verbose, but fast, and **Scala, Scala** is something new .

If you have any suggestions don't hesitate to comment .

You may find interesting the following article: [Shunting Yard Algorithm](http://andreinc.net/2010/10/05/converting-infix-to-rpn-shunting-yard-algorithm/) (how to convert infix expressions to Reverse Polish Notation).
