---
title: "Converting infix to RPN (shunting-yard algorithm)"
date: "2010-10-05"
classes: wide
excerpt: "The shunting-yard algorithm implemented in Java."
categories: 
  - "algorithms"
  - "java"
tags: 
  - "algorithm"
  - "calculator"
  - "conversion"
  - "converter"
  - "infix"
  - "infix-to-rpn"
  - "infix-to-rpn-conversion"
  - "java-implementation"
  - "mathematical-expressions"
  - "notation"
  - "operators"
  - "programming-exercise"
  - "python"
  - "reverse-polish-notation"
  - "rpn"
  - "shunting-yard-algorithm"
---

# Introduction

If you've ever tried to write your own calculator, you've probably needed a way to convert mathematical expressions written in the usual *infix* notation into [Reverse Polish Notation (RPN)](http://en.wikipedia.org/wiki/Postfix_notation). This post walks through that conversion using the classic **shunting-yard algorithm**, and shows a (hopefully) compact Java implementation.

Before we jump into the algorithm, let's make sure we're on the same page about the terminology: *infix notation* and *rpn*.

[Infix notation](http://en.wikipedia.org/wiki/Infix_notation): this is the “normal” notation you use every day: operators are written *between* operands (e.g. `A + B`, `3 * (4 + 5)`). It's natural for humans, but surprisingly annoying to parse for computers because you need to consider parentheses and operator precedence.

[RPN (Reverse Polish Notation)](http://en.wikipedia.org/wiki/Postfix_notation): this is the computer friendly notation, as every operator comes *after* its operands. Parentheses are not needed, and evaluation is very straightforward using a stack.

Some examples:

| Infix                            | Reverse Polish Notation (RPN)         |
|----------------------------------|----------------------------------------|
| `A + B`                          | `A B +`                                |
| `A ^ 2 + 2 * A * B + B ^ 2`      | `A 2 ^ 2 A * B * + B 2 ^ +`           |
| `((1 + 2) / 3) ^ 4`              | `1 2 + 3 / 4 ^`                        |
| `(1 + 2) * (3 / 4) ^ (5 + 6)`    | `1 2 + 3 4 / 5 6 + ^ *`               |


Once an expression is in RPN, evaluating it is just a matter of pushing operands onto a stack and applying operators as you encounter them. But first we need a reliable way to **convert** from infix to RPN.

To convert infix expressions to RPN we’ll use the **[shunting-yard algorithm](http://en.wikipedia.org/wiki/Shunting-yard_algorithm)**, designed by the one and only [Edsger Dijkstra](https://en.wikipedia.org/wiki/Edsger_W._Dijkstra).


The "simplified" version of the algorithm states the following:

<table border="1"><tbody><tr><td>A <strong>simplified</strong> version of the <strong>Shunting-yard algorithm </strong>(complete&nbsp;<a href="http://en.wikipedia.org/wiki/Shunting-yard_algorithm#The_algorithm_in_detail">version</a>)</td></tr><tr><td><ul><li>For all input tokens <sup>[S1]</sup>:<ul><li>Read the next token <sup>[S2]</sup>;</li><li>If the token is an operator <strong>(x) </strong><sup>[S3]</sup>:<ul><li>While there is an operator <strong>(y)</strong> at the top of the operators stack and: <strong>(x)</strong> is <a href="http://en.wikipedia.org/wiki/Operator_associativity" target="_blank">left-associative</a> and its <a href="http://en.wikipedia.org/wiki/Order_of_operations" target="_blank">precedence</a> is less or equal to that of <strong>(y),</strong> or&nbsp;<strong>(x)</strong> is <a href="http://en.wikipedia.org/wiki/Operator_associativity" target="_blank">right-associative</a> and its precedence is less than <strong>(y) </strong><sup>[S4]</sup>:<ul><li>Pop <strong>(y) </strong>from the stack&nbsp;<sup>[S5]</sup>;</li><li>Add <strong>(y) </strong>to the output buffer&nbsp;<sup>[S6]</sup>;</li></ul></li><li>Push (x) on the stack&nbsp;<sup>[S7]</sup>;</li></ul></li><li>Else if the token is left&nbsp;parenthesis, then push it on the stack&nbsp;<sup>[S8]</sup>;</li><li>Else if the token is a right&nbsp;parenthesis&nbsp;<sup>[S9]</sup>:<ul><li>Until the top token (from the stack) is left parenthesis, pop from the stack to the output buffer&nbsp;<sup>[S10]</sup>;</li><li>Also pop the left&nbsp;parenthesis&nbsp;but don't include it in the output buffer&nbsp;<sup>[S11]</sup>;</li></ul></li><li>Else add token to output buffer&nbsp;<sup>[S12]</sup>.</li></ul></li><li>While there are still operator tokens in the stack, pop them to output<sup> [S13]</sup></li></ul>Note: <sup>[SN] </sup>Relate with code.</td></tr></tbody></table>

> Note: These step labels `[SN]` will directly appear as comments in the Java code so you can easily match the theory to the implementation.

# Implementation

The code lives on GitHub and can be cloned with:

```
git clone nomemory/blog-java-shunting-yard
```

Important: This implementation assumes the input is already tokenized and represents a valid mathematical expression (matching parentheses, no unknown operators, etc.). If the expression is invalid, the code may throw exceptions or behave incorrectly - there is no validation layer here.

# The Operators

Operators can have either LEFT [Associativity](https://en.wikipedia.org/wiki/Operator_associativity) (`+`, `-`, `*`, `/`, `%`), or RIGHT [Associativity](https://en.wikipedia.org/wiki/Operator_associativity) (`^`), so we are going to use an `Enum` with two possible values `Left` and `Right`:

First, we model associativity. For our simple calculator, we support the following operators:
* Left-associative: `+`, `-`, `*`,`/`, `%` (modulus)
* Right-associative: `^` (exponentiation)

We represent associativity with a simple `enum`:

```java
public enum Associativity {
    LEFT,
    RIGHT
}
```

Moreover, operators have different [precedence](https://en.wikipedia.org/wiki/Order_of_operations?oldformat=true). For example, multiplication and division bind more tightly than addition and subtraction, exponentiation more tightly than both, etc.

We'll model the precendence using another `enum` that stores:

```java
public enum Operator implements Comparable<Operator> {

    ADDITION("+", Associativity.LEFT, 0),
    SUBTRACTION("-", Associativity.LEFT, 0),
    DIVISION("/", Associativity.LEFT, 5),
    MULTIPLICATION("*", Associativity.LEFT, 5),
    MODULUS("%", Associativity.LEFT, 5),
    POWER("^", Associativity.RIGHT, 10);

    final Associativity associativity;
    final int precedence;
    final String symbol;

    Operator(String symbol, Associativity associativity, int precedence) {
        this.symbol = symbol;
        this.associativity = associativity;
        this.precedence = precedence;
    }

    public int comparePrecedence(Operator operator) {
        return this.precedence - operator.precedence;
    }
}
```

For example, `+` has a lower precedence than `%` (modulus), `^` has a higher precedence than `%`. 


# The algorithm

The `S[x]` comments directly correspond to the algorithm steps described earlier.

Please follow the comments:

```java
package net.andreinc.shunting.yard;

import java.util.*;

import static net.andreinc.shunting.yard.Associativity.LEFT;
import static net.andreinc.shunting.yard.Associativity.RIGHT;


class ShuntingYard {
    // A lookup table for operators by symbol, e.g. "+" -> ADDITION, "^" -> POWER
    final static Map<String, Operator> OPS = new HashMap<>();
    static {
        // Build a map with all existing operators by iterating over the enum values
        // and filling the map with:
        // <K, V> = <symbol, Operator(symbol, Associativity, Precedence)>   
        for (Operator operator : Operator.values()) {
        OPS.put(operator.symbol, operator);
        }
    }
    public static List<String> shuntingYard(List<String> tokens) {
        List<String> output = new LinkedList<>();
        Stack<String> stack = new Stack<>();
         // For all the input tokens [S1], read the next token [S2]
        for (String token : tokens) {
            if (OPS.containsKey(token)) {
                 // Token is an operator [S3]
                while (!stack.isEmpty() && OPS.containsKey(stack.peek())) {
                    // While there is an operator (y) at the top of the stack and
                    // either (x) is left-associative and its precedence is less or equal to
                    // that of (y), or (x) is right-associative and its precedence
                    // is less than (y) [S4]:
                    Operator cOp = OPS.get(token); // Current operator (x)
                    Operator lOp = OPS.get(stack.peek()); // Top operator from the stack (y)
                    if ((cOp.associativity == LEFT && cOp.comparePrecedence(lOp) <= 0) ||
                            (cOp.associativity == RIGHT && cOp.comparePrecedence(lOp) < 0)) {
                        // Pop (y) from the stack S[5]
                        // Add (y) output buffer S[6]
                        output.add(stack.pop());
                        continue;
                    }
                    break;
                }
                // Push the new operator on the stack S[7]
                stack.push(token);
            } else if ("(".equals(token)) {
                 // Token is a left parenthesis -> push it on the stack [S8]
                stack.push(token);
            } else if (")".equals(token)) {
                // Token is a right parenthesis [S9]
                while (!stack.isEmpty() && !stack.peek().equals("(")) {
                    // Until the top token is a left parenthesis, pop from stack
                    // to the output buffer [S10]
                    output.add(stack.pop());
                }
                // Pop the left parenthesis and discard it (do not add to output) [S11]
                stack.pop();
            } else {
                // Else add token to output buffer S[12]
                output.add(token);
            }
        }
        // After reading all tokens:
        while (!stack.isEmpty()) {
            // While there are still operator tokens on the stack, pop them to output [S13]
            output.add(stack.pop());
        }
        return output;
    }
}
```

In the example and tests below, expressions are tokenized using a simple `" ".split(" ")`. That means each token (number,  operator, parenthesis) is separated by space. In a *real-world* calculator, you'll typically write a proper tokenizer that can handle: multidigit numbers, decimal points, unary minus, functions or variables names.

# Testing the code

Here are two JUnit tests that validate the implementation:

```java
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static net.andreinc.shunting.yard.ShuntingYard.shuntingYard;
import static org.assertj.core.api.Assertions.assertThat;

public class ShuntingYardTest {

    @Test
    public void test1() {

        List<String> given = Arrays.asList("( 1 + 2 ) * ( 3 / 4 ) ^ ( 5 + 6 )".split(" "));
        List<String> expected = List.of("1", "2", "+", "3", "4", "/", "5", "6", "+", "^", "*");
        List<String> computed = shuntingYard(given);

        System.out.println("infix:" + given);
        System.out.println("rpn (expected):" + expected);
        System.out.println("rpn (computed):" + computed);

        assertThat(computed).isEqualTo(expected);
    }
    @Test
    public void test2() {
        List<String> given = Arrays.asList("A ^ 2 + 2 * A * B + B ^ 2".split(" "));
        List<String> expected = List.of("A", "2", "^", "2", "A", "*", "B", "*", "+", "B", "2", "^", "+");
        List<String> computed = shuntingYard(given);

        System.out.println("infix:" + given);
        System.out.println("rpn (expected):" + expected);
        System.out.println("rpn (computed):" + computed);

        assertThat(computed).isEqualTo(expected);
    }
}
```

Where to go from here:
- This implementation is intentionally small and focused. 
- Possible extensions:
    - Add input validation (unknown tokens, mismatched parentheses, etc.).
    - Implement a full tokenizer (numbers with decimals, unary minus, functions like sin, cos, etc.).
    - Implement an RPN evaluator to go from RPN to a numeric result using a stack.
    - Support additional operators or functions, with their own associativity and precedence.