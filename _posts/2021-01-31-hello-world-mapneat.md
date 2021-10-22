---
title: "Hello world, mapneat!"
date: "2021-01-31"
classes: wide
categories:
- "java"
- "kotlin"
tags:
- "json-to-json"
- "xml-to-json"
---

One of the most common scenarios I had to solve during my Software Engineering career is manipulating data, applying some logic on top, eventually changing the way the data is structured, and then serializing it to JSON to be consumed by other systems.

[**mapneat**](https://github.com/nomemory/mapneat) does precisely this; it provides an easy to use [DSL](https://en.wikipedia.org/wiki/Domain-specific_language) for transforming `JSON` to `JSON`, `XML` to `JSON`, `POJO`(s) to `JSON` in a declarative way. The library is written in [Kotlin](https://kotlinlang.org/) (JVM), but it can be easily used from Java.

Under the hood, **mapneat** uses:
* [jackson](https://github.com/FasterXML/jackson) and [json-path](https://github.com/json-path/JsonPath) for JSON querying and processing;
* [JSON In Java](https://github.com/stleary/JSON-java) for converting from XML to JSON;
* [JSONAssert](http://jsonassert.skyscreamer.org/) for making JSON assertions (testing purposes).

The library is available in the [JCenter repo](https://bintray.com/nomemory/maven/mapneat).

But, let's jump directly into the code:

# A simple example

Let's start with the following class structure:

```kotlin
class User(
    val id: Long,
    val firstName: String,
    val lastName: String,
    val birthDate: String,
    val friends: MutableList<Long>,
    val visits: Set<Visit>,
    val creditCards: Set<CreditCardInfo>,
    val pwd: String,
    val email: String,
    val userName: String
)

class Visit(
    val id: Long,
    val country: String,
    val enter: String
)

class CreditCardInfo(
    val number: String,
    val cvv: String,
    val expirationDate: String
)
```
 
This hierarchy describes a possible system where `User`(s) have associated to them financial information (`val creditCards: Set<CreditCardInfo>`), and all the countries they visited so far (`val visits: Set<Visit>`). Additionally, `User`(s) can also befriend other users (`val friends: MutableList<Long>`).

Now, let's say we are writing a [REST](https://en.wikipedia.org/wiki/Representational_state_transfer) API, and we want to allow others/other systems to query our piece of software. 

Of course, we won't want to share any kind of secret information (passwords), or any financial information.

But, if we were to serialize the `User` directly into a `JSON` format, a possible output will look like this:

```json
{
  "id" : 490,
  "firstName" : "Rhea",
  "lastName" : "Orlich",
  "birthDate" : "1925-07-09",
  "friends" : [ 380, 290, 470 ],
  "visits" : [ {
    "id" : 25700,
    "country" : "Saint Lucia",
    "enter" : "1970-08-14"
  }, {
    "id" : 25500,
    "country" : "Lesotho",
    "enter" : "2006-10-18"
  }, {
    "id" : 25800,
    "country" : "Kenya",
    "enter" : "1972-01-01"
  }, {
    "id" : 25600,
    "country" : "Malawi",
    "enter" : "2014-06-30"
  }, {
    "id" : 25900,
    "country" : "Falkland Islands (malvinas)",
    "enter" : "2016-08-17"
  } ],
  "creditCards" : [ {
    "number" : "4158272054910622",
    "cvv" : "077",
    "expirationDate" : "2035-11-11"
  }, {
    "number" : "373725891728967",
    "cvv" : "862",
    "expirationDate" : "2021-04-21"
  } ],
  "pwd" : "genomes",
  "email" : "crinedbotfly@msn.com",
  "userName" : "fainleif"
}
```

Here intervenes **mapneat**. 

The library can work directly on top of the object and morph it into a (JSON) format of our choosing.

For example, instead of showing the `User` in the format above, let's say we want to:
* Remove the `pwd` field and everything related to `creditCards`. We don't want the world to know about them;
* Show only the visited countries, without the visiting date or the id; 
    - In case the user has visited a country multiple times, we show it once;
* We want to _uppercase_ the `lastName` of the user;
* Instead of showing the `id` of his friends, we want to retrieve their full name.

The equivalent **mapneat** transformation that performs what we've listed above is the following:

```kotlin
val users : Map<Long, User> = getUsers(100)
val aRandomUser = users[10]

val out = json(fromObject(aRandomUser)) {
    "" *= "$"
    - "visits"
    - "creditCards"
    - "pwd"
    "visited" *= {
        expression = "$.visits[*].country"
        processor = {
            val result = HashSet<String>()
            result.addAll(it as LinkedList<String>)
            result
        }
    }
    "lastName" /= { targetCtx().read<String>("$.lastName").toUpperCase() }
    "friends" /= {
        targetCtx()
            .read<ArrayList<Long>>("$.friends")
            .map { (users[it]?.firstName + " " + users[it]?.lastName) }
            .toList()
    }
}
println(out)
```

If we were to run the code above, the "morphed" output is:

```json
{
  "id" : 490,
  "firstName" : "Rhea",
  "lastName" : "ORLICH",
  "birthDate" : "1925-07-09",
  "friends" : [ "Bunny Winstanley", "Dianna Imaizumi", "Verdell Aguillar" ],
  "email" : "crinedbotfly@msn.com",
  "userName" : "fainleif",
  "visited" : [ "Saint Lucia", "Falkland Islands (malvinas)", "Malawi", "Kenya", "Lesotho" ]
}
```

# A simple example (Explanation)

A **mapneat** _Transformation_ has always the format, and wraps a series of _Operations_:

```kotlin
json(source = /* ... */) {
  // operation1
  // operation2
  // ...  
} 
```

The first operation we've performed was: `"" *= "$"`. 

`*=` is called the _Shift Operation_ and allows us to query an object/json/xml using a [json-path](https://github.com/json-path/JsonPath) notation.

The line expresses: _Copy everything (`$`) you find in the `aRandomUser` source and put it inside the target_.

The next three lines (_Operations_) are discarding the information we don't really need:

```kotlin
- "visits"
- "creditCards"
- "pwd"
```

`-` is called the _Delete Operation_ and does exactly what it says; it deletes a node and all of its children.

The next operation is also a shift (`*=`):

```kotlin
"visited" *= {
    expression = "$.visits[*].country"
    processor = {
        val result = HashSet<String>()
        result.addAll(it as LinkedList<String>)
        result
    }
}
```

We query the source using a [json-path](https://github.com/json-path/JsonPath) expression, and from the `visits` object we select only the `country` names (`"$.visits[*].country"`).

To avoid possible duplications, we keep the results into a `Set<String>`.

The next operation:

```kotlin
 "lastName" /= { targetCtx().read<String>("$.lastName").toUpperCase() }
```

Is called an _Assign Operation_ that normally allows us to retrieve information from a lambda expression. 

In our case, the `lastName` information is already in the target (remember `"" *= "$"`), so we read it from the target context, and then we just capitalize the `String`.

And the last operation is an _Assign_ (as we already have the `friends` ids in the target context) that returns the `User`'s friends:

```kotlin
"friends" /= {
    targetCtx()
        .read<ArrayList<Long>>("$.friends")
        .map { (users[it]?.firstName + " " + users[it]?.lastName) }
        .toList()
}
```

# Moving forward

**mapneat** already offers extensive [documentation](https://github.com/nomemory/mapneat), and that details every supported _Operation_ (there are more!).

If this article was an interesting read, also check the [existing examples](https://github.com/nomemory/mapneat-examples).


