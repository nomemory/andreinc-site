---
layout: single
permalink: /portfolio/
classes: wide
---

I love to write open source software. My portfolio:

* [Java](#java): 
    * [`mockneat`](#mockneat) - A modern faker lib;
    * [`neat-sample-database-generators`](#neat-sample-database-generators) - Generate database data;
    * [`markovneat`](#markovneat) - Markov chains;
    * [`neat-chess`](#neat-chess) - UCI client for calling Stockfish from Java;
    * [`JVBE`](#jbve) - Additional annotations for Java Bean Validation API;
    * [`ansiscape`](#ansiscape) - Color your `stdout`.
    * [`aleph-formatter`](#aleph-formatter) - `String.format()` with named arguments; 
    * [`jasuggest`](#jasuggest) - Simple auto-suggesting lib;
    * [`open-addressing-java-maps`](#open-addressing-java-maps) - A bunch of `Map<K,V>` implementations using Open Addressing;
* [Kotlin](#kotlin): 
    * [`mapneat`](#mapneat) - JSON transformers;
    * [`serverneat`](#serverneat) - HTTP Server Stub/Mock;
* [C](#c): 
    * [`nml`](#nml---neat-matrix-library) - Linear algebra library
    * [`lc3-vm`](#lc3-vm) - Simple register based VM 
    * [`nmlib`](#nmlib) - My first open source project, written 12 years ago, filled with bugs.
    * [`c-generic-pqueue`](#c-generic-pqueue) - A generic PQueue in C
    * [`chained-hash-table-c`](#chained-hash-table-c) - Chained Hashtable in C
    * [`open-adressing-hash-table-c`](#open-adressing-hash-table-c) - Open Addressing Hashtable in C
* [python](#python): 
    * [`pysert`](#pysert) - Generate random data based on templates

>

# Java

>

## `mockneat`

[github repo](https://github.com/nomemory/mockneat), [official documentation](https://www.mockneat.com)

> This is probably my most *successful* open-source project, at least in terms of downloads and active repositories currently using it.

MockNeat is a modern faker Java library that helps developers generate arbitrary (random) data for their applications. Various data formats are supported (XML, JSON, CSV, SQL). MockNeat is also a powerful java `Random` substitute.

If you want to know more about it, please read the [tutorial](https://www.mockneat.com/tutorial/), see some [examples](https://www.mockneat.com/examples/), or analyze the [full docs](https://www.mockneat.com/docs/).

For example, the following code generates a random `.json` object:

```java
Gson gson = new Gson().newBuilder().setPrettyPrinting().create();
objectMap()
    .put("firstName", names().first())
    .put("lastName", names().last())
    .put("address",
        objectMap() // object
            .put("line1", addresses().line1())
            .put("line2", addresses().line2())
    )
    .put("financial",
            objectMap() // object
                .put("creditCard", creditCards().masterCard())
                .put("amount", doubles().range(100.0, 10_000.0))
                .put("currency", currencies().code())
    )
    .put("countries", countries().names().set(10)) // array
    .map(gson::toJson)
    .consume(System.out::println);

```

(Possible) Output:

```json
{
  "firstName": "Larae",
  "lastName": "Baher",
  "address": {
    "line2": "Suite 137",
    "line1": "852 Likelihood St"
  },
  "financial": {
    "amount": 1030.729243271901,
    "currency": "BND",
    "creditCard": "2720379840607579"
  },
  "countries": [
    "Russian Federation",
    "Guinea",
    "Ireland",
    "Central African Republic",
    "Chile",
    "Paraguay",
    "Wallis And Futuna",
    "Svalbard And Jan Mayen"
  ]
}
```


## `neat-sample-database-generators`

[github repo](https://github.com/nomemory/neat-sample-databases-generators)

Neat java scripts (!not javascript) to auto-generate data for various sample databases. Internally the scripts are using [mockneat](#mockneat) to generate arbitrary data.

> To run java programs as scripts, please take a look at [jbang](https://www.jbang.dev/). 

## `markovneat`

[github repo](https://github.com/nomemory/markovneat) 

This is a [*Markov Chains*](https://en.wikipedia.org/wiki/Markov_chain) implementation in Java. The library was initially part of [mockneat](#mockneat), but now, it can be used as a standalone module. 

Example for simulating *market conditions*:

```java
 MChain<String> marketMChain = new MChain<>();

// Transitioning from "BULL" to "BULL" has a 90% chance
marketMChain.add(new MState<>("BULL"), "BULL", 0.9);
// Transitioning from "BULL" to "BEAR" has a 7,5% chance
marketMChain.add(new MState<>("BULL"), "BEAR", 0.075);
// Transitioning from "BULL" to "STAGNANT" has a 2,5% chance
marketMChain.add(new MState<>("BULL"), "STAGNANT", 0.025);

marketMChain.add(new MState<>("BEAR"), "BEAR", 0.8);
marketMChain.add(new MState<>("BEAR"), "BULL", 0.15);
marketMChain.add(new MState<>("BEAR"), "STAGNANT", 0.05);

marketMChain.add(new MState<>("STAGNANT"), "STAGNANT", 0.5);
marketMChain.add(new MState<>("STAGNANT"), "BULL", 0.25);
marketMChain.add(new MState<>("STAGNANT"), "BEAR", 0.25);

marketMChain.generate(10000).forEach(System.out::println);
```

Output:

```
STAGNANT
BULL
BULL
BULL
BULL
... and so on
```

In [mockneat](#mockneat) this library is used to generate *Lorem Ipsum* random text: see [markovs()](https://www.mockneat.com/docs/#markovs).

## `neat-chess`

[github repo](https://github.com/nomemory/neat-chess)

This is a Java Client for the [UCI protocol](https://en.wikipedia.org/wiki/Universal_Chess_Interface). It allows you to quickly "speak" with [Stockish](https://stockfishchess.org/) from Java. 

There's a blog article explaining how the "client" was created: *[Writing a Universal Chess Interface (UCI) Client in Java](http://localhost:4000/2021/04/22/writing-a-universal-chess-interface-client-in-java)*.

Example for retrieving the 10 best moves out of a [FEN](https://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation):

```java
var uci = new UCI();
uci.startStockfish();
uci.setOption("MultiPV", "10");

uci.uciNewGame();
uci.positionFen("r1bqkb1r/2pp1ppp/p1n2n2/1p2p3/4P3/1B3N2/PPPP1PPP/RNBQK2R w KQkq - 2 6");
UCIResponse<Analysis> response = uci.analysis(18);
var analysis = response.getResultOrThrow();

// Best move
System.out.println("Best move: " + analysis.getBestMove());
System.out.println("Is Draw: " + analysis.isDraw());
System.out.println("Is Mate: " + analysis.isMate());

// Possible best moves
var moves = analysis.getAllMoves();
moves.forEach((idx, move) -> {
    System.out.println("\t" + move);
});

uci.close();
```

## `JBVE`

[github repo](https://github.com/nomemory/java-bean-validation-extension) 

`JVBE` is a library that extends the [Java Bean Validation API](https://beanvalidation.org/) with additional `@Annotations`.

## `ansiscape`

[github repo](https://github.com/nomemory/ansiscape) 

`ansiscape` is  simple Java library that allows the user to format the output of the applications using ANSI Escape Codes.

Example:

```java
AnsiScapeContext context = new AnsiScapeContext();

// Create new escape classes that can be used as tags inside the text
AnsiClass title = AnsiClass.withName("title").add(AnsiSequence.BOLD);
AnsiClass url = AnsiClass.withName("url").add(AnsiSequence.UNDERLINE, AnsiSequence.BLUE);
AnsiClass text = AnsiClass.withName("text").add(AnsiSequence.RED);

context.add(title).add(url).add(text);

AnsiScape ansiScape = new AnsiScape(context);

String format = 
    ansiScape.format("{title Bold title}\n" +
                        "-{text Some url: {url www.google.com}};\n" +
                        "-{text Some other url: {url {redBg www.redbackground.com}}}");

System.out.println(format);
```

## `aleph-formatter`

[github repo](https://github.com/nomemory/aleph-formatter) 

`aleph-formatter` is a simple and efficient StringFormatter that supports named parameters (with a twist). Oh!, and it works faster than `String.format(...)` sometimes. 

Example:

```java
String s3 = str("#{date.dayOfMonth}-#{date.month}-#{date.year}")
            .arg("date", LocalDate.now())
            .fmt();
System.out.println(s3);

String s4 = str("#{2.simpleName}, #{1}, #{0}, #{aNumber}, #{anArray}", 1, "A", String.class)
            .args("aNumber", 100, "anArray", new int[]{1,2,3,})
            .fmt();
System.out.println(s4);                        

// OUTPUT

// 8-MAY-2018
// String, A, 1, 100, [1, 2, 3]
```

## `jasuggest`

[github repo](https://github.com/nomemory/jasuggest)

The repo contains anA auto-suggest library using a [Trie](https://en.wikipedia.org/wiki/Trie) as the underlying implementation.

Example:

```java
String[] words = { "us", "usa", "use", "useful", "useless", "user", "usurper" };

// All the searches will be cached in a ConcurrentHashMap with a 
// maximum size of 512 elements.
//
// Check: https://github.com/jhalterman/expiringmap
JaCacheConfig jaCacheConfig =
                JaCacheConfig.builder()
                             .maxSize(512)
                             .build();

JaSuggest jaSuggest = JaSuggest.builder()
                               .ignoreCase()
                               .withCache(jaCacheConfig)
                               .buildFrom(words);
                               
List<String> result = jaSuggest.findSuggestions("use");

// [useful, useless, user]
```

## `open-addressing-java-maps`

[github repo](https://github.com/nomemory/open-addressing-java-maps)

A collection of `Map<K,V>` implementations in Java using *Open Addressing* instead of *Separate Chaining*.

There's a blog article explaining the code from this repository: *[A tale of Java Hash Tables]({{site.url}}/2021/11/08/a-tale-of-java-hash-tables)*

>

# Kotlin

>

## `mapneat`

[github repo](https://github.com/nomemory/mapneat)

MapNeat is a JVM library written in Kotlin that provides an easy-to-use DSL (Domain Specific Language) for transforming JSON to JSON, XML to JSON, POJO to JSON in a declarative way.

It currently supports a limited set of default *operations*, but you can extend it easily. 

There are two blogs articles covering `mapneat`:
* [Hello world, mapneat!]({{site.url}}/2021/02/01/xml-to-json-using-mapneat)
* [XML to JSON using MapNeat]({{site.url}}/2021/01/31/hello-world-mapneat)


## `serverneat`

[github repo](https://github.com/nomemory/serverneat)

A Kotlin DSL / Server for creating mock/stub servers. It provides seamless integration with [mockneat](#mockneat).

For example, the following code creates a server that returns a random (but persistent, once generated) `.json` response on `http://localhost:8081/users`:

```kotlin
// DSL For creating a server
// This is valid kotlin code
// It can be run compiled, or a standalone .kts script
server {
    // Server starts on localhost:8081
    httpOptions {
        host = "localhost"
        port = 8081
    }

    // Global headers
    globalHeaders {
        header("Content-Type", "application/json")
    }

    routes {
        get {
            // It responds to GET localhost:8081/users
            path = "/users"
            response {
                statusCode = 200
                // Returns a json response
                json {
                    // generated data will be stored in the file "usersList.json"
                    persistent = true 
                    file = "dyanmic-example/usersList.json"
                    value = obj {
                        "users" value obj {
                            "firstName" value names().first()
                            "lastName" value names().last()
                            "gender" value genders()
                            "financialInformation" value obj {
                                "creditCard1" value creditCards().visa()
                                "creditCard2" value creditCards().amex()
                            }
                            "visits" value obj {
                                "time" value localDates().thisYear()
                                "city" value cities().capitalsEurope()
                            }.list(5)
                        }.list(50)
                    }
                }
            }
        }
    }
}.start()
```

>

# C

>

## `nml - neat matrix library`

[github repo](https://github.com/nomemory/neat-matrix-library) 

A "simple" matrix/numerical analysis library written in pure C. The scope of the library is to highlight various algorithm implementations related to matrices. 

There's a blog article explaining how `nml` was written: *[Writing your own linear algebra matrix library in C]({{site.url}}/2021/01/20/writing-your-own-linear-algebra-matrix-library-in-c)*.

Example for computing the [LU(P) decomposition](https://en.wikipedia.org/wiki/LU_decomposition) of a matrix:

```c
#include <stdlib.h>
#include <stdio.h>

#include "lib/nml.h"

int main(int argc, char *argv[]) {
    nml_mat *m1 = nml_mat_sqr_rnd(4, 0.0, 10.0);
    printf("m1=\n");
    nml_mat_print(m1);

    nml_mat_lup *m1_lup = nml_mat_lup_solve(m1);
    printf("L, U, P:\n");
    nml_mat_lup_print(m1_lup);

    nml_mat_free(m1);
    nml_mat_lup_free(m1_lup);
}
```

## `lc3-vm`

[github repo](https://github.com/nomemory/lc3-vm)

This is a toy-register-based-VM. 

You can read the following article explaining the code: *[Writing a simple 16 bit VM in less than 125 lines of C ]({{site.url}}/2021/12/01/writing-a-simple-vm-in-less-than-125-lines-of-c)*.

## `nmlib`

[github repo](https://github.com/nomemory/nmlib) 

A generic C data structures /algortihms library. 

The code is not tested, and there are probably bugs. This repo has a "sentimental" value. It was my first "open source" project attempt, started 12 years ago, when google code was still a thing, and github didn't not exist.

## `c-generic-pqueue`

[github-repo](https://github.com/nomemory/c-generic-pqueue)

This repo contains a generic [PQueue](https://en.wikipedia.org/wiki/Priority_queue) implementation using [binary heaps](https://en.wikipedia.org/wiki/Binary_heap).

Example:

```c
// A comporator function for determining the priority of 
// int values
int cmp_ints(const void *int1, const void *int2) {
    return *(int*) int1 - *(int*) int2;
}

// Construct the PQUEUE
PQueue* pq = pqueue_new(cmp_ints, 200);
    
int x = 100, y = 50, z = 300, k = 100, w = 1000;
    
pqueue_enqueue(pq, &x);
pqueue_enqueue(pq, &y);
pqueue_enqueue(pq, &z);
pqueue_enqueue(pq, &k);
pqueue_enqueue(pq, &w);
    
int i = 0;
for(;i<5;++i)
     printf("%d\n", *(int*) pqueue_dequeue(pq));

// De-allocate the memory (PQueue only, not the elements)
pqueue_delete(pq);
```

Output:

```
1000
300
100
100
50
```

## `chained-hash-table-c`

[github repo](https://github.com/nomemory/chained-hash-table-c) 

This repo contains a generic implementation of a hash table in C (separate chaining).

Blog article: *[Implementing Hash Tables in C ](http://localhost:4000/2021/10/02/implementing-hash-tables-in-c-part-1)*.

## `open-adressing-hash-table-c`

[github repo](open-adressing-hash-table-c)

This repo contains a generic implementation of a hash table in C (open addressing).

Blog article: *[Implementing Hash Tables in C ](http://localhost:4000/2021/10/02/implementing-hash-tables-in-c-part-1)*.

>

# python

>

## `pysert`

[github repo](https://github.com/nomemory/pysert) 

`pysert` is a python script that generates arbitrary data based on a template. You can customize by adding new data generators. 

E.g.:

Template:
```xml
<pysert iterations="20">
	<!--  Declarative area -->
	<dataset name="id" type="Sequence" start="300" increment="1"/>
	<dataset name="fname" type="PersonalName" firstname="True" lastname="False"/>
	<dataset name="lname" type="PersonalName" firstname="False" lastname="True"/>
	<dataset name="jobid" type="RandomNumber" floating="False" min="100" max="200"/>
	<dataset name="salary" type="RandomNumber" floating="False" min="1000" max="15000"/>
	<!--  Actual template to be converted -->
	<template>
INSERT INTO EMPLOYEES
	(EMPLOYEE_ID, FIRST_NAME, LAST_NAME, EMAIL, JOB_ID, SALARY)
VALUES
	(#{id}, '#{fname}', '#{lname}', '#{fname}_#{lname}@domain.com', #{jobid},
	#{salary})
	</template>
 </pysert>
```

Running the script:
```
python3 pysert.py -i tmpl.xml -o out.txt
```

Output:
```
INSERT INTO EMPLOYEES
	(EMPLOYEE_ID, FIRST_NAME, LAST_NAME, EMAIL, JOB_ID, SALARY)
VALUES
	(300, 'Paula', 'Chehachkov', 'Paula_Chehachkov@domain.com', 175,
	8439)


INSERT INTO EMPLOYEES
	(EMPLOYEE_ID, FIRST_NAME, LAST_NAME, EMAIL, JOB_ID, SALARY)
VALUES
	(301, 'Gabriel', 'Vlas', 'Gabriel_Vlas@domain.com', 183,
	11362)

// etc.
```