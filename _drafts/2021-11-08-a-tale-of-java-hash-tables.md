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

In Java, the main *hash table* implementation, `HashMap<K,V>`, uses the classical *Separate Chaining* technique (with a critical optimizations that reduce read times in case of collisions). 

But, as described [here](https://rcoh.me/posts/hash-map-analysis/), the decision to use [*Separate Chaining*](https://en.wikipedia.org/wiki/Hash_table#Separate_chaining) vs. [*Open Addressing*](https://en.wikipedia.org/wiki/Hash_table#Open_addressing) is not unanimously accepted by programming languages designers. For example, in python, ruby, and rust, the standard hash tables are implemented using *Open Addressing*, while Java, go, C#, C++ are all more conservatory and use *Separate Chaining*.

| Programming Language | Hash table algorithm | Source(s) |
|--- |---- |--- |
| Python | Open Addressing | [dictobject.c](https://github.com/python/cpython/blob/main/Objects/dictobject.c) |
| Ruby | Open Addressing | [st.c](https://github.com/ruby/ruby/blob/master/st.c) |
| Rust | Open Addressing | [map.rs](https://github.com/rust-lang/rust/blob/master/library/std/src/collections/hash/map.rs) |
| Java | Separate Chaining | [HashMap.java](https://github.com/openjdk/jdk/blob/master/src/java.base/share/classes/java/util/HashMap.java) 
| Go | Separate Chaining | [maphash.go](https://github.com/golang/go/blob/master/src/hash/maphash/maphash.go)
| C#  | Separate Chaining | [Dictionary.cs]((https://github.com/dotnet/runtime/blob/main/src/libraries/System.Private.CoreLib/src/System/Collections/Generic/Dictionary.cs))
| C++ | Separate Chaining | [hashtable.h](https://github.com/gcc-mirror/gcc/blob/master/libstdc%2B%2B-v3/include/bits/hashtable.h) |

> There are, of course, lovely *hash table* implementations that sit outside the standard libraries. So, if you are looking for a good read, check out the Facebook (or should I say Meta) [Engineering Blog](https://engineering.fb.com/2019/04/25/developer-tools/f14/) discussing their super-fast & efficient F14 implementation.

But, this article will show you how to implement a few hash tables in Java, using *Open Addressing* and then benchmark them against the reference `HashMap<K,V>` implementation that uses *Separate Chaining*. I've decided to stay away from [Hopscotch](https://en.wikipedia.org/wiki/Hopscotch_hashing), although I did get inspired by it, and Cuckoo Hashing (still, you can find a draft version in the code repo). I've also skipped Quadratic probing because I consider cpython's approach *brighter*. 

My implementations will be entirely academic, and I am sure a person with more experience optimizing Java code manually will do a better job than me. 

Also, given the complex nature of benchmarking Java code, please feel free to comment on the results. I've used [`jmh`](https://openjdk.java.net/projects/code-tools/jmh/), but I am more than happy to explore other alternatives.

For the moment, we are going to implement five `Map<K,V>` and benchmark their (reading) speed against `HashMap<K,V>`:

| Java Class | Description |
| --- | ---- |
| `LProbMap<K, V>` | A classic Open Addressing implementation that uses Linear Probing |
| `LProbBinsMap<K,V>` | An "almost" classic Open Addressing implementation inspired by ruby's hash table.|
| `LProbRadarMap<K, V>` | An Open Addressing implementation that uses a separate vector (`radar`) to determine where to search for items. It uses the same idea as *Hopscotch Hashing* |
| `PerturbMap<K, V>` | An Open Addressing implementation that uses the python's *perturbator* algorithm instead of linear probing |
| `RobinHoodMap<K, V>` | An Open Addressing implementation that uses linear probing with *Robin Hood Hashing* |

Before jumping directly to the implementation, I recommend you to read [my previous article]({{site.url}}/2021/10/02/implementing-hash-tables-in-c-part-1) on the subject. Even if the code is in C, a few theoretical insights I recommend you to refresh (e.g., hash functions).

# Separate Chaining, or how `HashMap<K,V>` works internally

As I've previously stated, `HashMap<K,V>` is implemented using a typical *Separate Chaining* technique. If you jump straight into [reading the source code](https://github.com/openjdk/jdk/blob/master/src/java.base/share/classes/java/util/HashMap.java), things can be a little confusing, especially if you don't know what you are looking for. But once you understand the main concepts, everything becomes more straightforward.

> Even if this is not the purpose of this article, I believe it's always a good idea to understand how `HashMap<K,V>` works. Many (Java) interviewers love to ask this question. 

If you already understand how `HashMap<K,V>` works, you can skip directly to the [next section](#open-addressing). If you don't, and you are curious about it, please read the following paragraphs.

The `HashMap<K,V` class contains an array of `Node<K,V>`. For simplicity and inertia, we are going to call this array `table`:

```java
// The table, initialized on first use, and resized as necessary. 
// When allocated, length is always a power of two. 
transient Node<K,V>[] table;
```

The `table` is the most *important* structure from the class; it's the *place* where we store our data. 

`Node<K,V>` class has the following composition:

```java
static class Node<K,V> implements Map.Entry<K,V> {
        final int hash;
        final K key;
        V value;
        Node<K,V> next;

        // getters and setters + other goodies       
}
```        

As you rightfully observed, `Node<K,V>` is used to implement a "linked" (or *chained*) data structure. The `next` attribute references the next `Node` in the chain. 

In this regard, think of the `Node<K,V>[] table` as an array of linked data structures. For simplicity, let's suppose those chained structures are *linked lists*.

![png]({{site.url}}/assets/images/2021-11-08-a-tale-of-java-hash-tables/chained-structure.drawio.png)

In order to make things clearer, let's analyse the following example. We define a `HashMap<String, String>`, where keys `K` are European capital cities (`String`), while the values `V` are the corresponding country names (`String`).

Before doing any insert, there will be one empty `table` with the initial capacity set to: `DEFAULT_INITIAL_CAPACITY=1<<4` (by the magic of bitwise operators, `1<<4==16`). The choice of using a power of two is not *accidental*, we will see shortly why.

![png]({{site.url}}/assets/images/2021-11-08-a-tale-of-java-hash-tables/empty-hashmap.drawio.png)

Now let's see what happens when we want to insert the first `<String, String>` entries: `<"Paris", "France">`, `<"Sofia", "Bulgaria">`, `<"Madrid", "Spain">` and `<"Bucharest", "Romania">`.

The `put(K key, V value)` method is called first, eventually *dispatching* the call to `putVal(...)`.

```java
public V put(K key, V value) {
    return putVal(hash(key), key, value, false, true);
}
```

But, before `putVal(...)` is getting called, we need to compute `hash(key)`.

```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

`HashMap<K,V>` accepts `null` keys, so by convention, `hash(null)` is always `0`. 

If the key is not `null`, we `shift` and `xor` the `hashCode()` of the key and return the value. 

The reason for doing that extra bit operation is to improve the diffusion of the `hashCode()` by considering the higher-order bits. If you want to understand more of this magic, please read my previous article: [Implementing Hash Tables in C/Hash functions]({{site.url}}/2021/10/02/implementing-hash-tables-in-c-part-1#hash-functions).

If we were to apply the `hash` method to our input (`"Paris"`, `"Sofia"`, `"Madrid"`, `"Bucharest"`), we obtain the following values:

```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
public static void main(String[] args) {
    System.out.println(hash("Paris"));      // 76885502
    System.out.println(hash("Sofia"));      // 80061639
    System.out.println(hash("Madrid"));     // -1997818570
    System.out.println(hash("Bucharest"));  // -543452922
}
```

The next step is to look at the `putVal(...)` method and see what it's doing:

```java
final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
                boolean evict) {
    Node<K,V>[] tab; 
    Node<K,V> p; 
    int n, i;
    // If the table is empty we simply allocate space for it
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length;
    // Based on the hash we identify an empty slot in the table
    if ((p = tab[i = (n - 1) & hash]) == null) {
        // The slot in the tab is empty so we introduce the <key, value> pair here
        tab[i] = newNode(hash, key, value, null);
    }
    else {
       // The slot is not empty, a collision happened
       // We append the item to the tab
    }
    // More code here
    return null;
}
```

`tab[i = (n - 1) & hash])`, where `n=table.length`, looks like magic, but it's not. 

Because `n` is a power of two we can use `(n-1) & hash` to "project" the values from the interval `[Integer.MIN_VALUE, Integer.MAX_VALUE]` to the `table` indices: `{0, 1, .., n-1}`. 

It's a [simple trick](https://stackoverflow.com/questions/6670715/mod-of-power-2-on-bitwise-operators) that works on the power of twos, helping us avoid `%` (modulo), which is a slow operation.

For our values:

```java
int n = 1<<4;

System.out.println("Paris");
System.out.println(hash("Paris"));          // hash = 76885502
System.out.println((n-1) & hash("Paris"));  // index = 14

System.out.println("Sofia");
System.out.println(hash("Sofia"));          // hash = 80061639
System.out.println((n-1) & hash("Sofia"));  // index = 7

System.out.println("Madrid");
System.out.println(hash("Madrid"));         // hash = -1997818570
System.out.println((n-1) & hash("Madrid")); // index = 6

System.out.println("Bucharest");
System.out.println(hash("Bucharest"));          // hash = -543452922
System.out.println((n-1) & hash("Bucharest"));  // index = 6
```

So now we can visualize what is happening when we try to insert the entries into the `HashMap<K,V>`:

![png]({{site.url}}/assets/images/2021-11-08-a-tale-of-java-hash-tables/insert-hashmap.drawio.png)

1. The first entry to insert is `<"Paris", "France">`.
    * We compute `hash("Paris")=76885502`.
    * We create a new `Node<String, String>` with `hash=76885502`, `key=Paris`, `value=France` and `next=null`.
    * Based on the `hash` we identify the *bucket* from the `table` where we are going to insert the entry.
    * Because `(16-1) & 76885502 = 14`, we insert the newly created node at position `table[14]`.
2. The second entry to insert is `<"Sofia", "Bulgaria">`.
    * We compute `hash("Sofia")=80061639`.
    * We create a new `Node<String, String>` with `hash=80061639`, `key=Sofia`, `value=Bulgaria` and `next=null`.
    * Based on the `hash` we identify the *bucket* from the `table` where we are going to insert the entry.
    * Because `(16-1) & 80061639 = 7`, we insert the newly created node at position `table[7]`.
3.  The third entry to insert is `<Madrid, Spain>`.
    * We compute the `hash("Madrid")=-1997818570`.
    * We create a new `Node<String, String>` with `hash=-1997818570`, `key=Madrid`, `value=Spain` and `next=null`.
    * Based on the `hash` we identify the *bucket* from the `table` where we are going to insert the entry.
    * Because `(16-1) & (-1997818570) = 6`, we insert the newly created node at position `table[6]`.
4. The fourth and last entry to insert is `<Bucharest, Romania>`.
    * We compute the `hash("Bucharest")=-543452922`.
    * We create a new `Node<String, String>` with `hash=-543452922`, `key=Bucharest`, `value=Romania` and `next=null`.
    * Based on the `hash` we identify the *bucket* from the `table` where we are going to insert the entry.
    * Because `(16-1) & (-543452922) = 6`, we want to insert our node to `table[6]`.
        * But the position `table[6]` is already occupied!! This is called a *hash collision*.
        * The solution is to append our newly created node to the last node from the chain (we use `next` to point to our newly created node).


Now retrieving an element by its key is simple; we have to follow the same *trail* as the insertions.

Let's imagine for example we want to `get("Bucharest")`:

![png]({{site.url}}/assets/images/2021-11-08-a-tale-of-java-hash-tables/read-hashmap.drawio.png)

First, we compute the `hash("Bucharest")=-543452922` and the possible index where we might find the item in the `table`, `6 = (16-1) & (-543452922)`.

At position `table[6]`, there seems to be an item already. But we don't know for sure if it's the item we are looking for or another item we've collided with when we were performing the insertions. 

In this regard we compare `hash("Bucharest")` with `table[6].hash`. In our case, the hash values are not equal, so we jump to the next item in the chain: `table[6].next`.

We do the hash comparison again `hash("Bucharest)==table[6].next.hash`, and this time it's `true`.

To be 100% sure we are getting (retrieving) the correct value we do a final comparison `"Bucharest".equals(table[6].next.key)`. If the two are keys are equal, we've found the correct value. If not, we continue the two comparisons until we reach the end of the chain `table[6].next ... .next`.

> There's a slight chance of having two distinct `Strings` with the same `hash(..)` value. That's why we perform the additional comparison using `equals(...)` - to make sure we eliminate this possibility. 

To make things more efficient, the `HashMap<K,V>` performs two types of optimizations while we insert (lots of) elements into the `table`: *Capacity Adjustment* and *Bucket Adjustment*.

In the `HashMap<K,V>` constructor, you can pass a `loadFactor` parameter. If you don't specify a value for it, a default will be used: `DEFAULT_LOAD_FACTOR = 0.75f`. The `loadFactor` is defined as the ratio between the number of items inserted in the `table`, and the actual `table.length` (which, as we know, is a power of two). 

If the `loadFactor` exceeds the given threshold (by default `0.75f`), a new `table` will be allocated with an increased capacity. If the current size of the table is 2<sup>n</sup>, the new size will be 2<sup>n+1</sup> (basically the next power of two). 

After the re-allocation is successful, all of the existing elements will be inserted in the new `Node<K,V>[] table`. Even if this is a costly operation, *having more air to breathe* will increase reading performance (`get(K key)`). Plus, it shouldn't happen very often. Most of the time *Hash Tables* are used for reads than for inserts. 

![png]({{site.url}}/assets/images/2021-11-08-a-tale-of-java-hash-tables/adjust-capacity-hashmap.drawio.png)

Another smart optimization the `HashMap<K,V>` performs is the *Bucket Adjustment*. The idea is simple - if the number of elements colliding inside a `table` slot (bucket) reaches a certain threshold, `TREEIFY_THRESHOLD = 8`, the pairs are re-organized in a [red-black tree](https://en.wikipedia.org/wiki/Red%E2%80%93black_tree). 

Searching in the tree is done in logarithmic time. 

So let's assume this optimization is ignored, and there are 64 elements in a bucket. Searching inside a *linked list* is `O(n)`, so we will have to go through 64 iterations in the worst-case scenario. In a tree, searching is `O(logn)`, so in the worst-case scenario, we will perform log<sub>2</sub>2<sup>5</sup>= 5 operations. 

![png]({{site.url}}/assets/images/2021-11-08-a-tale-of-java-hash-tables/adjust-bucket.drawio.png)

# Open Addressing 

Compared to *Separate Chaining*, *Open Addressing* hash tables are storing only entry per slot. So there are no *buckets*, no *linked lists*, and no *red-black trees*. It's only one big array that has everything it needs to operate.

If the *array* of pairs is sparse enough (operating on a low load factor `< 0.77`), and the *hashing function* has decent diffusion, *hash collisions* should be rare. But even so, they can happen. In this case, we probe the array to find another empty slot for the entry to be inserted. 

The most straightforward *probing* algorithm is called **linear probing**. In case of collision, we iterate over each bucket (starting with the first slot computed), until we find an empty index to make the insertion. If we reach the end of the array, we start again from index `0`.

The advantage of *Open Addressing* over *Separate Chaining* is that cache misses are less frequent because we operate on a single contiguous block of memory (the array itself).

The visual representation for how inserts are working for *Open Addressing* is the following:

![png]({{site.url}}/assets/images/2021-11-08-a-tale-of-java-hash-tables/open-addressing-high-level.drawio.png)

The biggest shortcoming for *Open Addressing* hash tables is that they are susceptible to lousy hash functions. Let think of it for a moment. The absolute worst hash function is one that returns a constant value. If it does so, all elements are going to target a single slot. We will have as many collisions as the number of elements. 

In this case, the performance of `HashMap<K,V>` will have a graceful degrade to `O(logn)`, while the performance of an *Linear Probing* hash table implementation will degrade to `O(n)`.

![png]({{site.url}}/assets/images/2021-11-08-a-tale-of-java-hash-tables/hashmap-vs-open-addressing.drawio.png)

Ok, I must admit, the above example is rather extreme, in practice nobody will use a *hash function* that returns a constant integer. But in case the *hash function* is sub-optimal, an *Open Addressing* (+Linear Probing) implementation is subject to what we call **clustering**: an dense area of occupied slots in our entries array that needs to be traversed in case of inserts/reads and deletes. 

And one more thing before jumping straight to the code. 

Deleting an element from an *Open Addressing* table is a subtle task! For this reason we need to introduce the concept of [**tombstones**](http://localhost:4000/2021/10/02/implementing-hash-tables-in-c-part-1#tombstones) (click on the link for an in-depth explanation).

Basically whenever we delete an entry, we can cannot just empty the slot and make it `null`, because we might break an existing sequence. In this regard we mark the slot as *tombstone*. If we are doing insert operations we consider the tombstone a good potential candidate for the insertion. If we perform read or delete operations we simply skip the tombstone, but we don't stop from our sequence traversal. 

## `LProbMap<K, V>`

This was my first *academical* attempt to implement an *Open Addressing* Map<K,V> in Java. I haven't tried any trick, I've just implemented the corresponding algorithms *by the book*.

The first thing was to `extend Map<K,V>`. As per the interface contract, I had to implement a few abstract methods. For the sake of readability, I won't copy paste the entire code here, but I will focus on the most important methods.

```java
public class LProbMap<K, V> implements Map<K,V> {

    private static final double DEFAULT_MAX_LOAD_FACTOR = 0.6;
    private static final double DEFAULT_MIN_LOAD_FACTOR = DEFAULT_MAX_LOAD_FACTOR / 4;
    private static final int DEFAULT_MAP_CAPACITY_POW_2 = 6;

    private int size = 0;
    private int tombstones = 0;
    private int capPow2 = DEFAULT_MAP_CAPACITY_POW_2;

    public LProbMapEntry<K, V>[] buckets = 
                        new LProbMapEntry[1<< DEFAULT_MAP_CAPACITY_POW_2];

    // More code here
    
}
```    

`DEFAULT_MAX_LOAD_FACTOR` is the maximum load factor my `LProbMap<K,V>` accepts. I've played with various values, and `0.6` clearly improves my read times. In the same time I am wasting `40%` of my `buckets` array on `null` elements. It's a decision that can be easily changed anyway.

The `loadFactor` in for `LProbMap<K,V>` is computed by the following formula: 

```java
final double lf = (double)(size+tombstones) / buckets.length;
```

So compared to `HashMap<K,V>` I also take the potential tombstones into consideration. 


## `PerturbMap<K, V>`

## `LProbBinsMap<K,V>`

## `LProbRadarMap<K, V>`

## `RobinHooThedMap<K, V>`

# Benchmarks