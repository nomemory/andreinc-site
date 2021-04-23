---
title: "A deep dive into Java Concurrency"
date: "2021-03-18"
classes: wide
categories:
- "java"
tags:
- "concurrency"
- "threads"
---

# Introduction

In 2005, the year I was starting University, [Herb Sutter](https://github.com/hsutter), Software Architect at Microsoft and Chair of the ISO C++ Committee, wrote a famous article called: ["The free lunch is over"](http://www.gotw.ca/publications/concurrency-ddj.htm). In this paper he "prophesized" a paradigm shift in the way we will approach **Parallelism** and **Concurrency** in the coming decades (our times now).

> If you haven’t done so already, now is the time to take a hard look at the design of your application, determine what operations are CPU-sensitive now or are likely to become so soon, and identify how those places could benefit from concurrency. Now is also the time for you and your team to grok concurrent programming’s requirements, pitfalls, styles, and idioms.

His assumptions were simple - [with silicon pushed to it physical limits](https://www.sheffield.ac.uk/news/nr/next-electronics-revolution-silicon-1.498610) and serial-processing speed of a single-core processor capped:

* CPU manufacturers will shift their focus on products that support multi-threading;
* Programming Languages will natively support multithreaded programming, to make better use the innovations in the Hardware world;
* Software Developers will be forced to develop multithreaded programs, while efficiency and performance optimization will get more, not less, important.

Looking back to what happened in the last 15 years or so, he was right. We've constantly introduced more and more abstractions on how to make things work in parallel. In the same time the programming languages who have "threads" as first class citizens thrived. 

When I've started programming "buzzword"-concepts like: *Promises*, *Futures*, *Reactive Streams*, *Actors*, *Non-Blocking*, *Event-Loop* did not exist. The Java API had only the `Thread` class and the `Runnable` interface. 

There was no `Future` (😄), `CompletableFuture`, `ExecutorService`, `ConcurrentMap` or `BlockingQueue` or any of nicer abstractions we are currently using. Oh, and people were still using `Hashtable<K,V>`, because it was more "safe".

But things are changing fast, and this article is a deep-dive into the wonderful *World of Java Concurrency* of the *present*.

> The information presented in this article assumes the reader is already familiar with the Java Programming Language: OOP, Collections, Functional Interfaces, etc.

# Threads 

## Threads vs. Processes

In the beginning (בְּרֵאשִׁית), when Operating Systems were not yet born, computers were huge ([ENIAC](https://en.wikipedia.org/wiki/ENIAC) had 162 m<sup>2</sup>) but simple leviathans. They would run exactly one program at a time, from the beginning till the end, and that program would have full-control of all the resources of that machine. But this didn't stay for long. 

Eventually Operating Systems were born, and they evolved into letting Engineers to run more than one program at a time. This was a pragmatic evolution of how computers operated: time is money. A program that was blocking an entire machine just because it was waiting some sort of input was a huge waste of time.   

The concept of **process** was introduced. This is how we call a program that was loaded into the memory, along with all the resources it needs to operate. Processes were initially isolated and independent, but mechanisms allowing process inter-communication were developed: sockets, signal handlers, shared memory, files, semaphores, etc..

At this moment in history, computers could run more than one process, but programs were still sequential. This is actually the "natural" way of doing this from a human perspective. As humans, we are supposed to one action at a time, and then another, and another. This reflected into the way we wrote (and still write) programs: as a series of instructions. For our minds it's not natural to think in terms of parallelism, race conditions or deadlocks. I believe this is also the reason why bugs that involve concurrency are so hard to debug, detect and prevent. In this regard, just like the computers from the past, we are simple beasts.

As programs grew more complex, and required a certain degree of internal parallelization of their own, a new concept was introduced: `Threads`.

`Threads` are pseudo-lightweight processes, co-existing inside a "real" process. Threads share process-wide resources (such as memory and file handles), but in the same time they manage their own stack and local variables. Processes have at least one-running `Thread`.

The majority of JVMs run as a single process. If needed, you can create additional processes by using the `ProcessBuilder` class. But, we rarely have to do so.

In recent times, most modern operating systems consider threads the "basic unit of scheduling" (not processes).

Generally speaking, creating a new `Thread` requires significantly fewer resources than creating a new process.

What's important to note, is that every Java application has at least one `Thread`, called `main` (yes, `Threads` have names):

```java
public class MainThreadExample {
    public static void main(String[] args) {
        System.out.println(Thread.currentThread().getName());
    }
}
```

Output:

```text
main
```

There are also JVM System `Threads` for signal handling and memory management, but we shouldn't interfere with those.

Just out of curiosity, we can list the actual threads that are running in parallel on my JVM using the following code:

```java
public class AllThreads {
    public static void main(String[] args) {
        Thread.getAllStackTraces().keySet().forEach(thread -> {
            System.out.printf("%-40s \t %-20s \t %-2s \t %s \n",
                    thread.getName(),
                    thread.getState(),
                    thread.getPriority(),
                    thread.isDaemon() ? "Daemon" : "Normal");
        });
    }
}
```

The Output is JVM dependent:

```text
Reference Handler                        	 RUNNABLE             	 10 	 Daemon 
Finalizer                                	 WAITING              	 8  	 Daemon 
Signal Dispatcher                        	 RUNNABLE             	 9  	 Daemon 
Common-Cleaner                           	 TIMED_WAITING        	 8  	 Daemon 
main                                     	 RUNNABLE             	 5  	 Normal 
JVMCI-native CompilerThread0             	 RUNNABLE             	 9  	 Daemon 
```

* `Reference Handler` - This thread checks for objects that are no longer used by the JVM, puts them on a `Queue`, which is processed afterwards by the `Finalizer` thread;
* `Finalizer` - Performs finalisation for objects that are no longer needed by the JVM (calls [finalize()](https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html#finalize--));
* `Singal Dispatcher` - Usually handles native signals sent by the Operating System to the VM and routes them to appropriate handler;
* etc.

The internals of the JVMs are probably not in the scope of this article, but what is interesting to see is that `Threads` have a few relevant properties: `state`, `priority`, `daemon=true/false`, things we will discuss later.

## Creating threads

In the Java language there are two idioms for defining and starting a new `Thread`:

* Extending the `java.lang.Thread` class;
* Implementing the `java.lang.Runnable` interface.

`java.lang.*` is probaly the most important package of the whole Java API, so we don't have to explicitly import anything from it in the code, as everything is imported by default. The javadoc also states:

> Provides classes that are fundamental to the design of the Java programming language.

This is how important `Threads` are in Java 😄.

### Extending the `Thread` class:

```java
public class CustomThread extends Thread {
    @Override
    public void run() {
        System.out.printf("Hello from thread: %s\n", Thread.currentThread().getName());
    }
    public static void main(String[] args) {
        for(int i = 0; i < 10; i++) {
            new CustomThread().start();
        }
    }
}
```

Output:

```text
Hello from thread: Thread-0
Hello from thread: Thread-9
Hello from thread: Thread-8
Hello from thread: Thread-7
Hello from thread: Thread-6
Hello from thread: Thread-5
Hello from thread: Thread-4
Hello from thread: Thread-3
Hello from thread: Thread-1
Hello from thread: Thread-2
```

We can also make use of an `Anonymous` class, but the code looks less readable in my opinion:

```java
public class CustomThreadAnonymous {
    public static void main(String[] args) {
        int i = 10;
        while(i-->0) {
            new Thread() {
                @Override
                public void run() {
                    System.out.printf("Hello from thread: %s\n", 
                            Thread.currentThread(),getName());
                }
            }.start();
        }
    }
}
```

I won't list the output, as it similar with the previous one. 

All in all, it's important to notice the fact that each time we are extending `Thread` we need to `@Override` the `run()` method. `void run()` is where we keep our logic. 

This idiom is rarely used nowadays. Given the fact Java doesn't support [Multiple Inheritance](https://en.wikipedia.org/wiki/Multiple_inheritance) (and hopefully never will), extending the `Thread` class limit the ability of our class to `extend` further classes. In a way, we are condemning our code to be forever the "descendant" of `Thread`. 

## Implementing `Runnable`

This is the recommended approach. A class can implement as many interfaces as it needs to, so we won't limit ourselves like in the previous examples.

```java
public class CustomRunnable implements Runnable {
    @Override
    public void run() {
        System.out.printf("Hello from thread: %s\n", Thread.currentThread().getName());
    }
    public static void main(String[] args) {
        new Thread(new CustomRunnable()).start();
    }
}
```

As you can seem, we are still using `Thread.start()` as a mechanism to execute the task, but using `Runnable` allows us to decouple the actual task from the actual mechanics of Thread Management.

> An interface that has exact one abstract method is called `@FunctionalInterface`.

Good news, `Runnable` is a `@FunctionalInterface`, as it has exactly one abstract method: `void run()`, so we can use the `lambda` syntax to pass it around:

```java
Runnable runnable = () -> System.out.println("Hello world!");
new Thread(runnable).start();

// Or directly

new Thread(() -> System.out.println("Hello world!")).start();
```

A "rookie" mistake is to call `run()` on the `Thread` instance, instead of `start()`. This will call the `run()` logic synchronously.

# What's actually happening when we start a new `Thread`

A `Thread` is a way to "split" the `main` timeline of the program and separate it into various timelines. They are all executed in (pseudo) parallel, meaning they get CPU time.  

Let's look at the following code as an example:

```java
public class WhatIsHappening {
    public static void print(String s) {
        System.out.printf("[%s] %s\n", Thread.currentThread().getName(), s);
    }
    public static void main(String[] args) {
        print("A");
        new Thread(() -> {
            print("B");
            print("C");
            print("D");
            print("E");
        }).start();
        print("F");
        new Thread(() -> print("G")).start();
        print("H");
        new Thread(() -> {
            print("I");
            print("J");
            print("K");
            print("L");
        }).start();
        print("M");
    }
}
```

Running the code a few times, will render "inconsistent" results. This happens because `Threads` work in a non-deterministic way. It's not of course the [quantic indeterminancy](https://en.wikipedia.org/wiki/Quantum_indeterminacy) physics teaches us about, but it's rather related to the way CPUs and Operating Systems work. All kinds of "delays" can appear at the software/hardware level that will make the execution of multithreaded programs impossible to predict.  

For example, the output after the first run (on my machine) was:

```text
[main] A
[main] F
[Thread-0] B
[Thread-0] C
[Thread-0] D
[Thread-1] G
[main] H
[Thread-0] E
[main] M
[Thread-2] I
[Thread-2] J
[Thread-2] K
[Thread-2] L
```

Visually, the result (which is only one of the possible many), can be explained like this:

![gif]({{site.url}}/assets/images/2021-03-18-a-deep-dive-into-java-concurrency/howthreadswork.png)

When we are writing `new Thread(() -> { /* code here */ }).start();` the `main` timeline splits. But because it's impossible to predict when a `Thread` gets CPU time compared to the others, the output won't be `A B C D E F G H I J K L M`, as in a single-threaded program. The letters can appear in almost any possible order, with some letter configurations being more probable than the others. 

The reason I've said "almost any possible order", it's because instructions inside a `Thread` are still executed sequentially. So in our case `A` will always be printed before `F`, which will always printed before `H`, which will always be printed before `M`. The same rule applies for the other two sequences `B`, `C`, `D`, `E` (`Thread-0`) and `I`, `J`, `K`, `L` (`Thread-2`).

# Creating daemon threads

> [Daemon](https://en.wikipedia.org/wiki/Daemon_(classical_mythology)) is the Latin word for the Ancient Greek daimon (δαίμων: "god", "godlike", "power", "fate"), which originally referred to a lesser deity or guiding spirit such as the daemons of ancient Greek religion and mythology and of later Hellenistic religion and philosophy.

As of now, the JVM has two types of threads:
* "normal", "user" threads;
* "daemon" threads;

"Normal" threads and "daemon" threads are not that different, the only exception is the "lesser" treatment `daemons` get from the JVM.

When JVM starts up, all the system `Threads` are `daemons`. The only exception is `main`, which is a "normal" `Thread`. There is a rule that whenever we create a `Thread` it inherits the `daemon=true/false` status of its parent `Thread`. 

Whenever a `Thread` exits, the JVM checks to see if the only `Threads` that are left running are `daemons`. If this is the case, the JVM initiates a gracious shut-down. All the remaining `daemons` are "abandoned". The JVM simply halts.

`Daemon Threads` should be used less frequently. In practice, few activities can be simply abandoned at any time without proper "cleaning".  

Example of scenarios where we can use `daemons`:

* A `Thread` that gathers non-critical system statistics;
* A `Thread` that is responsible with cache-eviction for expired entries;
* A `Thread` that resizes a Connection Pool after a peek moment;
* A `Thread` that acts like a [heartbeat](https://en.wikipedia.org/wiki/Heartbeat_(computing));
* etc.

Let's modify the previous example (`WhatIsHappening.java`), but instead of using "normal" `Threads` let's create `daemons`:

```java
public class WhatIsHappeningDaemons {
    public static void print(String s) {
        System.out.printf("[%s] %s\n", Thread.currentThread().getName(), s);
    }
    // Creates and starts a daemon thread from a Runnable
    public static void startDaemon(Runnable runnable) {
        Thread t = new Thread(runnable);
        t.setDaemon(true);
        t.start();
    }
    public static void main(String[] args) {
        print("A");
        startDaemon(() -> {
            print("B");
            print("C");
            print("D");
            print("E");
        });
        print("F");
        startDaemon(() -> print("G"));
        print("H");
        startDaemon(() -> {
            print("I");
            print("J");
            print("K");
            print("L");
        });
        print("M");
    }
}
```

> To mark a `Thread` as a `daemon` simply set the flag: `thread.setDaemon(true)`.

This time the output is the following:

```text
[main] A
[main] F
[Thread-0] B
[Thread-0] C
[Thread-0] D
[Thread-1] G
[main] H
[Thread-0] E
[main] M
[Thread-2] I
[Thread-2] J
[
```

Notice how everything ended abruptly.
 
The `main Thread` finished exactly after `M` was printed. With `main` finishing, the JVM decide it's time to shut-down. Poor `Thread-2` was abandoned before managing to print the last two letters (`K` and `L`).

# Thread Safety

Threads are wild constructs. Being able to do things in parallel (which is clearly not something us humans are good at), comes up with a lot of challenges. I'm not exaggerating when I say it's an "art" to use `Threads` in a smart way. If we are doing it right, our programs will be more efficient and elegant. If we are doing it wrong, we will walk on a minefield of bugs, some of which will be very hard to reproduce or fix.

> In computer programming jargon, a [heisenbug](https://en.wikipedia.org/wiki/Heisenbug) is a software bug that seems to disappear or alter its behavior when one attempts to study it. The term is a pun on the name of Werner Heisenberg, the physicist who first asserted the observer effect of quantum mechanics, which states that the act of observing a system inevitably alters its state. In electronics the traditional term is probe effect, where attaching a test probe to a device changes its behavior.

Normally, there's no real definition of `Thread Safety`, but we can say that if a method (or a datatype) behaves "correctly" in a multi-threaded program, without additional effort to control the execution flow, is called `Thread Safe`. 

But maybe it's better to show what "incorrect" means, before jumping into describing "correctly".

# What can go wrong ?

`Threads` allows us to split our programs into (pseudo) parallel series of instructions. All good, but the non-deterministic way a threads get CPU time ensures chaos. Without proper control, the same multithreaded program running multiple times can yield different and very surprising results. Similarly, without smart design and control, a multithreaded application can suffer from performance problems (the irony!).

Let's take a look at the following code:

> Don't get scared if the code doesn't look familiar, we will explain how new threads are being created in the following section

```java
import java.util.Iterator;
import java.util.List;

public class ChaoticIteration {
    public static void main(String[] args) {
        List<String> list = List.of("A", "B", "C", "D", "E", "F", "G");
        Iterator<String> it = list.iterator();
        Runnable runnable;
        while(it.hasNext()) {
            // Here we split the main control flow
            runnable = () -> System.out.print(it.next());
            new Thread(runnable).start();
        }
    }
}
```

It's a "wonderful" example of what could go wrong if we don't take care of the way we're writing our multi-threaded code. After 3 runs, on my machine the results were:

```text
ACDBEFG
Exception in thread "Thread-7" java.util.NoSuchElementException
	at java.base/java.util.ImmutableCollections$ListItr.next(ImmutableCollections.java:247)
	at ChaoticIteration.lambda$main$0(ChaoticIteration.java:10)
	at java.base/java.lang.Thread.run(Thread.java:834)
```

```text
ADCFBEG
Exception in thread "Thread-7" java.util.NoSuchElementException
	at java.base/java.util.ImmutableCollections$ListItr.next(ImmutableCollections.java:247)
	at ChaoticIteration.lambda$main$0(ChaoticIteration.java:10)
	at java.base/java.lang.Thread.run(Thread.java:834)
```

```text
ADCBFEG
Exception in thread "Thread-7" java.util.NoSuchElementException
	at java.base/java.util.ImmutableCollections$ListItr.next(ImmutableCollections.java:247)
	at ChaoticIteration.lambda$main$0(ChaoticIteration.java:10)
	at java.base/java.lang.Thread.run(Thread.java:834)
```

So not only that each run generated different results `ACDBEFG` != `ADCFBEG` != `ADCBFEG`, but the code constantly fails with a *nice* `RuntimeException`.

And the results are not surprising. First, there is no guarantee which `Thread` is executed first, so the order in which the list is iterated is different for each run. That's not a bad thing per-se. Don't expect **order** when you are randomly spamming new `Thread`s.

The `java.util.NoSuchElementException` exception is more problematic. In this case it translates to "sloppy multi-threaded programming". 

The reason is simple:

- `it.hasNext()` is being constantly called in the main execution `Thread`;
- `it.next()` on the other hand, is called inside different threads; 
- So when `it.hasNext()` is called the result is `true` and the loop continues. Immediately after, in a separate thread, `it.next()` is being called, and we reach the end of the `Iterator<String>`. It's too late now, we are inside the loop creating a `Thread` that will soon call `it.next()` on an `Iterator<String>` that reached its end. An exception soon follows.

# References

* [http://www.gotw.ca/publications/concurrency-ddj.htm](http://www.gotw.ca/publications/concurrency-ddj.htm)
* [https://docs.oracle.com/javase/tutorial/essential/concurrency/index.html](https://docs.oracle.com/javase/tutorial/essential/concurrency/index.html)
* [https://www.sheffield.ac.uk/news/nr/next-electronics-revolution-silicon-1.498610](https://www.sheffield.ac.uk/news/nr/next-electronics-revolution-silicon-1.498610)
