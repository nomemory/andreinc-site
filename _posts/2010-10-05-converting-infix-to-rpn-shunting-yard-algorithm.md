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

If you've tried to write your own calculator (something in the style of [calculator](https://wiki.gnome.org/action/show/Apps/Calculator?action=show&redirect=Calculator)) you've probably had to build a simple converter for your mathematical expressions from [infix notation](http://en.wikipedia.org/wiki/Infix_notation) to [RPN](http://en.wikipedia.org/wiki/Postfix_notation) (Reverse Polish Notation).

Before jumping directly into code, we first need to define the first two terms:

> **[Infix notation](http://en.wikipedia.org/wiki/Infix_notation)** is the common arithmetic and logical formula notation, in which operators are written infix-style between the operands they act on. Unfortunately what seems natural for us, is not as simple to parse by computers as prefix or RPN notations.
> 
> **[RPN](http://en.wikipedia.org/wiki/Postfix_notation)** also known as the Reverse Polish Notation is mathematical notation wherein every operator (eg. + - * %) follows all of its operands. Examples:
> 
> <table border="1">
> <tbody>
> <tr><td><strong>Infix notation</strong></td><td><strong>Reverse Polish Notation</strong></td></tr>
> <tr><td>A + B</td><td>A B +</td></tr>
> <tr><td>A ^ 2 + 2 * A * B + B ^ 2</td><td>A 2 ^ 2 A * B * + B 2 ^ +</td></tr>
> <tr><td>( ( 1 &nbsp;+ 2 ) / 3 ) ^ 4</td><td>1 &nbsp;2 + 3 / 4 ^</td></tr>
> <tr><td>( 1 + 2 ) * ( 3 / 4 ) ^ ( 5 + 6 )</td><td>1 2 + 3 4 / 5 6 + ^ *</td></tr>
> </tbody></table>

In order to parse and convert a given infix mathematical expression to RPN we will use the _**[shunting-yard algorithm](http://en.wikipedia.org/wiki/Shunting-yard_algorithm)**_ . Just like the evaluation of RPN, the algorithm is stack-based . For the conversion we will use two buffers (one for input, and one for output).

Additionally, we will use a stack for operators that haven't been yet added to the output.

<table border="1"><tbody><tr><td>A <strong>simplified</strong> version of the <strong>Shunting-yard algorithm </strong>(complete&nbsp;<a href="http://en.wikipedia.org/wiki/Shunting-yard_algorithm#The_algorithm_in_detail">version</a>)</td></tr><tr><td><ul><li>For all the input tokens <sup>[S1]</sup>:<ul><li>Read the next token <sup>[S2]</sup>;</li><li>If token is an operator <strong>(x) </strong><sup>[S3]</sup>:<ul><li>While there is an operator <strong>(y)</strong> at the top of the operators stack and either <strong>(x)</strong> is <a href="http://en.wikipedia.org/wiki/Operator_associativity" target="_blank">left-associative</a> and its <a href="http://en.wikipedia.org/wiki/Order_of_operations" target="_blank">precedence</a> is less or equal to that of <strong>(y),</strong> or&nbsp;<strong>(x)</strong> is <a href="http://en.wikipedia.org/wiki/Operator_associativity" target="_blank">right-associative</a> and its precedence is less than <strong>(y) </strong><sup>[S4]</sup>:<ul><li>Pop <strong>(y) </strong>from the stack&nbsp;<sup>[S5]</sup>;</li><li>Add <strong>(y) </strong>output buffer&nbsp;<sup>[S6]</sup>;</li></ul></li><li>Push (x) on the stack&nbsp;<sup>[S7]</sup>;</li></ul></li><li>Else If token is left&nbsp;parenthesis, then push it on the stack&nbsp;<sup>[S8]</sup>;</li><li>Else If token is a right&nbsp;parenthesis&nbsp;<sup>[S9]</sup>:<ul><li>Until the top token (from the stack) is left parenthesis, pop from the stack to the output buffer&nbsp;<sup>[S10]</sup>;</li><li>Also pop the left&nbsp;parenthesis&nbsp;but don't include it in the output buffer&nbsp;<sup>[S11]</sup>;</li></ul></li><li>Else add token to output buffer&nbsp;<sup>[S12]</sup>.</li></ul></li><li>While there are still operator tokens in the stack, pop them to output<sup> [S13]</sup></li></ul>Note: <sup>[SN] </sup>Relate with code.</td></tr></tbody></table>

# Implementation

The code is on [git](https://github.com/nomemory/blog-java-shunting-yard), and can be cloned using this command:

```
gh repo clone nomemory/blog-java-shunting-yard
```

_Note: The following implementation of the shunting-yard algorithm does not impose any validations. The input should be a valid mathematical expression or else the program may end abruptly or perform incorrectly._

## The Operators

Operators can have either LEFT [Associativity](https://en.wikipedia.org/wiki/Operator_associativity) (`+`, `-`, `*`, `/`, `%`), or RIGHT [Associativity](https://en.wikipedia.org/wiki/Operator_associativity) (`^`), so we are going to use an `Enum` with two possible values `Left` and `Right`:

```java
public enum Associativity {
    LEFT,
    RIGHT
}
```

Moreover, operators have various [precedence](https://en.wikipedia.org/wiki/Order_of_operations?oldformat=true) over the others. 

So we are going to create another `Enum` to describe Operators. 

The Operators can be compared by their precedence (that's why we implement `Comparable<Operator>`):

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

For example `+` has a lesser precedence than `%`, and `^` has a bigger precedence than `%`.

## The algorithm

_Note:  The S[x] notation follows the steps of the algorithm directly in the code._

```java
package net.andreinc.shunting.yard;

import java.util.*;

import static net.andreinc.shunting.yard.Associativity.LEFT;
import static net.andreinc.shunting.yard.Associativity.RIGHT;


class ShuntingYard {

// ***

final static Map<String, Operator> OPS = new HashMap<>();

static {
    // We build a map with all the existing Operators by iterating over the existing Enum
    // and filling up the map with:
    // <K,V> = <Character, Operator(Character, Associativity, Precedence)>
    for (Operator operator : Operator.values()) {
        OPS.put(operator.symbol, operator);
    }
}

public static List<String> shuntingYard(List<String> tokens) {

    List<String> output = new LinkedList<>();
    Stack<String> stack = new Stack<>();

    // For all the input tokens [S1] read the next token [S2]
    for (String token : tokens) {
        if (OPS.containsKey(token)) {
            // Token is an operator [S3]
            while (!stack.isEmpty() && OPS.containsKey(stack.peek())) {
                // While there is an operator (y) at the top of the operators stack and 
                // either (x) is left-associative and its precedence is less or equal to 
                // that of (y), or (x) is right-associative and its precedence 
                // is less than (y)
                // 
                // [S4]:
                Operator cOp = OPS.get(token); // Current operator
                Operator lOp = OPS.get(stack.peek()); // Top operator from the stack
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
            // Else If token is left parenthesis, then push it on the stack S[8]
            stack.push(token);
        } else if (")".equals(token)) {
            // Else If the token is right parenthesis S[9]
            while (!stack.isEmpty() && !stack.peek().equals("(")) {
                // Until the top token (from the stack) is left parenthesis, pop from 
                // the stack to the output buffer
                // S[10]
                output.add(stack.pop());
            }
            // Also pop the left parenthesis but don't include it in the output 
            // buffer S[11]
            stack.pop();
        } else {
            // Else add token to output buffer S[12]
            output.add(token);
        }
    }

    while (!stack.isEmpty()) {
        // While there are still operator tokens in the stack, pop them to output S[13]
        output.add(stack.pop());
    }

    return output;
}

/***/

}
```

## Testing the code

Two tests have been written to assess the values are correct:

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