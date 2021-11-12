---
title: "A tale of Java Hash Tables"
date: "2021-11-08"
classes: wide
usemathjax: true
categories:
- "java"
- "algorithms"
tags:
- "hashing"
- "hash"
---

In Java, the main *hash table* implementation , `HashMap<K,V>`, uses the classical *Separate Chaining* technique (with a critical optimizations that reduce read times in case of collisions). 

But, as described [here](https://rcoh.me/posts/hash-map-analysis/), the decision to use *Separate Chaining* vs. *Open Addressing* is not unanimously accepted by programming languages designers. For example, in python, ruby, and rust, the standard hash tables are implemented using *Open Addressing*, while Java, go, C#, C++ are all more conservatory and use *Separate Chaining*.

| Programming Language | Hash table algorithm | Source(s) |
|--- |---- |--- |
| Python | Open Addressing | [dictobject.c](https://github.com/python/cpython/blob/main/Objects/dictobject.c) |
| Ruby | Open Addressing | [st.c](https://github.com/ruby/ruby/blob/master/st.c) |
| Rust | Open Addressing | [map.rs](https://github.com/rust-lang/rust/blob/master/library/std/src/collections/hash/map.rs) |
| Java | Separate Chaining | [HashMap.java](https://github.com/openjdk/jdk/blob/master/src/java.base/share/classes/java/util/HashMap.java) 
| Go | Separate Chaining | [maphash.go](https://github.com/golang/go/blob/master/src/hash/maphash/maphash.go)
| C#  | Separate Chaining | [Dictionary.cs]((https://github.com/dotnet/runtime/blob/main/src/libraries/System.Private.CoreLib/src/System/Collections/Generic/Dictionary.cs))
| C++ | Separate Chaining | [hashtable.h](https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/hashtable.h) |

There are of course, nice *hash table* implementations, that sit outside the standard libraries. So, if you are looking for good read, check out this Facebook (or should I say Meta) Engineering [article](https://engineering.fb.com/2019/04/25/developer-tools/f14/) about their very fast F14 implementation. Or, if you are more of a Google type of person, you can read about their [Sparsehash](https://smerity.com/articles/2015/google_sparsehash.html) efficient *hash table*.

In this article, I will show you how to implement a few hash tables in Java, using *Open Addressing* and then benchmark them against the reference `HashMap<K,V>` implementation that uses *Separate Chaining*. I've decided to stay away from [Hopscotch](https://en.wikipedia.org/wiki/Hopscotch_hashing), although I did got inspired by it, and Cuckoo Hashing (still, you can find a draft version in the code repo). I've also skipped Quadratic probing, because I consider cpython's approach *smarter*. 

My implementations will be entirely academic, and I am sure a person with more experience optimizing Java code manually will do a better job than me. 

Also, given the complex nature of benchmarking Java code, please feel free to comment on the results. I've used [`jmh`](https://openjdk.java.net/projects/code-tools/jmh/), but I am more than happy to explore other alternatives.

For the moment, we are going to implement four `Map<K,V>` and benchmark their (reading) speed against `HashMap<K,V>`:

| Java Class | Description |
| --- | ---- |
| `OALinearProbingMap<K,V>` | A classic Open Addressing implementation that uses Linear Probing |
| `OALinearProbingRadarMap<K,V>` | An Open Addressing implementation that uses a separate vector (`radar`) to determine where to search for items. It uses the same idea as *Hopscotch Hashing* |
| `OAPyPerturbMap<K,V>` | An Open Addressing implementation that uses the python's *perturbator* algorithm instead of linear probing |
| `OARobinHoodMap<K,V>` | An Open Addressing implementation that uses linear probing with *Robin Hood Hashing* |

All four implementations use *tombstones* to mark deleted elements; no elements are shifted on deletion.

Before jumping straight into the code, let's make a short recap regarding the two techniques. In this regard, I've already covered a little bit of the theory in my previous article: [Implementing Hash Tables in C]({{site.url}}/2021/10/02/implementing-hash-tables-in-c-part-1), so if you want to have a deeper dive, I recommend you to to read it first.

# HashMap<K,V> (Separate Chaining)

The [`HashMap<K<V>`](https://github.com/openjdk/jdk/blob/master/src/java.base/share/classes/java/util/HashMap.java) is a straightforward *Separate Chaining* implementation of the `Map<K,V>` interface; but with a twist:

> If the number of collisions per bucket increases, we change the underlying bucket structure from a *Linked List* to a *Red-Black Tree*. 

In this regard, if we use a *inefficient* hash function that generates a lot of collisions, finding an element in a bucket will remain in *logarithmic bounds* (in regards to the number of elements from that bucket). That's a nice optimization.

So if we are to visually represent a `HashMap<K,V>` let's look at the following diagram:









