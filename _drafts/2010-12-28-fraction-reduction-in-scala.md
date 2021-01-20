---
title: "Fraction reduction in Scala (first contact)"
date: "2010-12-28"
categories: 
  - "programming-languages"
  - "scala-programming-languages"
---

After a failed attempt to grasp [**Haskell**](http://www.haskell.org/haskellwiki/Haskell), but somewhat seduced by the concise and elegant ways of **[Functional Programming](http://en.wikipedia.org/wiki/Functional_programming)**, I've started to look for alternatives . Knowing Java, and having an everyday interaction with the JVM the obvious choices were [**Clojure**](http://clojure.org/) or [**Scala**](http://www.scala-lang.org/) . I never had the chance to try **Clojure**, probably because right now I enjoy **Scala** so much (_the butterflies..._) . Of course I cannot say that **Scala** scales, or if **Scala** is the next **Java,** or Scala is the answer, but from what I've experienced so far, things look good and I am optimistic that some day Scala will receive the attention it deserves .

There are [a lot good books](http://www.scala-lang.org/node/959) on **Scala,** but probably the most popular is "[Programming in Scala, A comprehensive step-by-step guide](http://www.artima.com/shop/programming_in_scala)" by [Martin Odersky](http://lamp.epfl.ch/~odersky/) (Scala's creator), [Lex Spoon](http://blog.lexspoon.org/), and [Bill Venners](http://www.artima.com/weblogs/index.jsp?blogger=bv) .

In a chapter there, the authors give us an insight on how to create _Functional Objects_ -> objects that are immutable . The materialization of the concept is a _Rational_ class_,_ that encapsulates the idea of [rational numbers](http://en.wikipedia.org/wiki/Rational_number) . It allows us to be add, subtract, multiply, compare etc. rational numbers .  At some point in the example the fraction is reduced to the lowest terms.

Reducing the fraction to its lowest terms  (also known as normalization) is probably one of the simplest programming exercises we all start with . The actual problem is to [determine the greatest common divisor](http://andreinc.net/2010/12/11/euclids-algorithm/) of the fraction's denominator and numerator, and divide those numbers by it . Not long ago I've written a [solution for this exercise in **C**](http://andreinc.net/2010/12/11/euclids-algorithm-reducing-fraction-to-lowest-terms/), but we all know **C** is far from being an elegant peace of technology.

Inspired (a lot!) by the example in the book, I've come with this solution:

_Fraction.scala_

class Fraction(n: Int, d: Int) {
	// It makes no sense to have the denominator 0
	require(d != 0)

	private val g = gcd(n, d)
	val numerator : Int = n / g
	val denominator : Int = d / g

	// Determines the greatest common divisor of two numbers
	private def gcd(a: Int, b: Int) : Int =
		if (b == 0) a else gcd(b, a % b)

	override def toString =
		numerator + "/" + denominator
}

_MainObject.scala_

// Singleton Object
object MainObject {
	def main(args: Array\[String\]) = {
		val f = new Fraction(25, 100)
		println(f)
	}
}

To compile and run the above we can use **scalac** (the equivalent of **javac**) as:

\> scalac MainObject.scala Fraction.scala
> scala MainObject
1 / 4
>

Or we can use **fsc** which is the Scala _compiler daemon ._ Usually compilation with **scalac** has a certain delay as the **jvm** needs to initialize itself, scan the .jar contents of the scala distribution you have installed, etc . So **fsc** will create a local server (has a port attached to itself) . The server will remain open so any subsequent compilation won't require a reinitialization . Except the inner cuisine, **fsc** is very similar to **scalac,** so the compilation syntax is the same:

\> fsc MainObject.scala Fraction.scala
> scala MainObject
1 / 4
>

  

Now let's focus on some explanations . I am sure the syntax is somehow familiar but you probably noticed that:

- Apparently in the Fraction.scala there's no constructor . Actually there's one, as classes can take input parameters directly ;
- Input validations (checked preconditions) can be done using require . If the preconditions fails, an exception is thrown (_IllegalArgumentException_) ;
- When we override a method (in our case toString()), we need to explicitly use the **override** keyword, otherwise the class won't compile ;
- In Scala semicolons(;) are in the majority of cases optional . (You need to write a semicolon when you have multiple expressions sharing the same line of code) ;
- If a function doesn't have any input parameters (eg. toString()) there's no need to write the brackets ;
- There's a difference between a **val** and **var** . In our case **numerator** and **denominator** are read-only kind of fields, as they are defined using a **val** instead of **var,** so the object cannot change, thus the immutability .
- Scala has [type inference](http://en.wikipedia.org/wiki/Type_inference) so in the majority of cases you won't need to write redundant constructs .
- **MainObject** is a _[singleton object](http://en.wikipedia.org/wiki/Singleton_pattern)_ . From what I understand, Scala doesn't support static functions inside classes, so this construct "singleton object" is preferable instead of the classical approach .

The above example  was very simple, and doesn't proves much of the functional power of Scala. It's just a small glimpse of the syntax, and the fact that a **Java** programmer, can start small, and later adapt his style to become more functional-oriented .

Right now I am giving **Scala** a chance, and I am almost sure I'll be satisfied .
