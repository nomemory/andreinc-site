---
title: "Converting infix to RPN (shunting-yard algorithm)"
date: "2010-10-05"
classes: wide
categories: 
  - "algorithms"
  - "java-programming-languages"
  - "programming-languages"
  - "python-programming-languages"
tags: 
  - "algorithm"
  - "algorithms-2"
  - "calculator"
  - "conversion"
  - "converter"
  - "gcalctool"
  - "how-to"
  - "infix"
  - "infix-to-rpn"
  - "infix-to-rpn-conversion"
  - "interpretor"
  - "java-implementation"
  - "mathematical-expressions"
  - "notation"
  - "operators"
  - "programming-challenges-2"
  - "programming-exercise"
  - "python"
  - "reverse-polish-notation"
  - "rpn"
  - "shunting-yard-algorithm"
  - "spoj"
---

If you've tried to write your own calculator (something in the style of [gcalctool](http://live.gnome.org/Gcalctool)) you've probably had to build a simple converter for your mathematical expressions from [infix notation](http://en.wikipedia.org/wiki/Infix_notation) to  [RPN](http://en.wikipedia.org/wiki/Postfix_notation) (Reverse Polish Notation).

Inspired by this classical [SPOJ](http://www.spoj.pl/problems/ONP/) challenge I wanted to write my own simplified version of an expression converter.If this topic is new for you, or you need to refresh your memory please don't skip the following paragraph.

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

**I) Java Implementation**

The following implementation of the shunting-yard algorithm does not impose any validations. The input should be a valid mathematical expression or else the program may end abruptly or perform incorrectly.

_Step 1 : Declaring and defining operators (and everything related to them)_

```java
// Associativity constants for operators
private static final int LEFT_ASSOC = 0;
private static final int RIGHT_ASSOC = 1;
```

```java
// Supported operators
private static final Map OPERATORS = new HashMap();
static {
    // Map<"token", []{ precendence, associativity }>
    OPERATORS.put("+", new int[] { 0, LEFT_ASSOC });
    OPERATORS.put("-", new int[] { 0, LEFT_ASSOC });
    OPERATORS.put("*", new int[] { 5, LEFT_ASSOC });
    OPERATORS.put("/", new int[] { 5, LEFT_ASSOC });
    OPERATORS.put("%", new int[] { 5, LEFT_ASSOC });
    OPERATORS.put("^", new int[] { 10, RIGHT_ASSOC });
}
```

```java
/**
 * Test if a certain is an operator .
 * @param token The token to be tested .
 * @return True if token is an operator . Otherwise False .
 */
private static boolean isOperator(String token) {
    return OPERATORS.containsKey(token);
}
```

```java
/**
 * Test the associativity of a certain operator token
 * 
 * @param token The token to be tested (needs to operator).
 * @param type LEFT_ASSOC or RIGHT_ASSOC
 * @return True if the tokenType equals the input parameter type .
 */
private static boolean isAssociative(String token, int type) {
    if (!isOperator(token)) {
        throw new IllegalArgumentException("Invalid token: " + token);
    }
    if (OPERATORS.get(token)[1] == type) {
        return true;
    }
    return false;
}
```

```java
/**
 * Compare precedence of two operators.
 * 
 * @param token1 The first operator .
 * @param token2 The second operator .
 * @return A negative number if token1 has a smaller precedence than token2,
 * 0 if the precedences of the two tokens are equal, a positive number
 * otherwise.
 */
private static final int cmpPrecedence(String token1, String token2) {
    if (!isOperator(token1) || !isOperator(token2)) {
        throw new IllegalArgumentException("Invalied tokens: " + token1
                + " " + token2);
    }
    return OPERATORS.get(token1)[0] - OPERATORS.get(token2)[0];
} 
```

_Step 2 : Parsing expression_

The input in this case should an array of strings, where every string from the array is a token. 
The output will also be an array of strings but in RPN order. (Take a look at the code comments, and the algorithm references **[Sn]**).


```java
class RPN {

// ....
    
public static String[] infixToRPN(String[] inputTokens) {
    ArrayList out = new ArrayList();
    Stack stack = new Stack();
    // For all the input tokens [S1] read the next token [S2]
    for (String token : inputTokens) {
        if (isOperator(token)) {
            // If token is an operator (x) [S3]
            while (!stack.empty() && isOperator(stack.peek())) {
                // [S4]
                if ((isAssociative(token, LEFT_ASSOC) && 
                        cmpPrecedence(token, stack.peek()) <= 0) || 
                        (isAssociative(token, RIGHT_ASSOC) && 
                        cmpPrecedence(token, stack.peek()) < 0)) {
                    out.add(stack.pop());    // [S5] [S6]
                    continue;
                }
                break;
            }
            // Push the new operator on the stack [S7]
            stack.push(token);
        } else if (token.equals("(")) {
            stack.push(token);    // [S8]
        } else if (token.equals(")")) {
            // [S9]
            while (!stack.empty() && !stack.peek().equals("(")) {
                out.add(stack.pop()); // [S10]
            }
            stack.pop(); // [S11]
        } else {
            out.add(token); // [S12]
        }
    }
    while (!stack.empty()) {
        out.add(stack.pop()); // [S13]
    }
    String[]output = new String[out.size()];
    return out.toArray(output);
}

//....

}
```

_Step 3 : Testing the working converter_

```java
public static void main(String[] args) {
    String[] input = "( 1 + 2 ) * ( 3 / 4 ) ^ ( 5 + 6 )".split(" ");
    String[] output = infixToRPN(input);
    for (String token : output) {
        System.out.print(token + " ");
    }
}
```

Output:

```
1 2 + 3 4 / 5 6 + ^ *
```

**II) Python Implementation**

The python implementation is a complete "translation" of the previous Java implementation (only the syntax was changed).

_Step 1 : Declaring and defining operators_

```python
#Associativity constants for operators
LEFT_ASSOC = 0
RIGHT_ASSOC = 1

#Supported operators
OPERATORS = {
    '+' : (0, LEFT_ASSOC),
    '-' : (0, LEFT_ASSOC),
    '*' : (5, LEFT_ASSOC),
    '/' : (5, LEFT_ASSOC),
    '%' : (5, LEFT_ASSOC),
    '^' : (10, RIGHT_ASSOC)
}
```

```python
#Test if a certain token is operator
def isOperator(token):
    return token in OPERATORS.keys()

#Test the associativity type of a certain token
def isAssociative(token, assoc):
    if not isOperator(token):
        raise ValueError('Invalid token: %s' % token)
    return OPERATORS[token][1] == assoc

#Compare the precedence of two tokens
def cmpPrecedence(token1, token2):
    if not isOperator(token1) or not isOperator(token2):
        raise ValueError('Invalid tokens: %s %s' % (token1, token2))
    return OPERATORS[token1][0] - OPERATORS[token2][0]

```

_Step 2 : Parsing expression_

Just like in the previous example, the algorithm does not impose any validation. The input expression should be composed of valid tokens, or else the program may malfunction or end abruptly.

```python
#Transforms an infix expression to RPN
def infixToRPN(tokens):
    out = []
    stack = []
    #For all the input tokens [S1] read the next token [S2]
    for token in tokens:
        if isOperator(token):
            # If token is an operator (x) [S3]
            while len(stack) != 0 and isOperator(stack[-1]):
                # [S4]
                if (isAssociative(token, LEFT_ASSOC)
                    and cmpPrecedence(token, stack[-1]) <= 0) or
                    (isAssociative(token, RIGHT_ASSOC)
                    and cmpPrecedence(token, stack[-1]) < 0):
                    # [S5] [S6]
                    out.append(stack.pop())
                    continue
                break
            # [S7]
            stack.append(token)
        elif token == '(':
            stack.append(token) # [S8]
        elif token == ')':
            # [S9]
            while len(stack) != 0 and stack[-1] != '(':
                out.append(stack.pop()) # [S10]
            stack.pop() # [S11]
        else:
            out.append(token) # [S12]
    while len(stack) != 0:
        # [S13]
        out.append(stack.pop())
    return out
```


_Step 3 : Testing the converter_

```python
if __name__ == '__main__':
    input = "( 1 + 2 ) * ( 3 / 4 ) ^ ( 5 + 6 )".split(" ")
    output = infixToRPN(input)
    print output
```

And the output:

```
['1', '2', '+', '3', '4', '/', '5', '6', '+', '^', '*']
```