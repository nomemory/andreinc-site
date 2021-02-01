---
title: "XML to JSON using MapNeat"
date: "2021-02-01"
classes: wide
categories:
- "java"
- "kotlin"
tags:
- "json-to-json"
- "xml-to-json"
---

Following my [previous article](/2021/01/31/hello-world-mapneat), I wanted to expand on the capabilities of the [**mapneat**](https://github.com/nomemory/mapneat) library. 

In this tutorial I am going to show you how can you transform an existing XML source into a/the desired JSON format.

Let's start with the following XML structure:

```xml
<customer>
    <firstname>Mike</firstname>
    <lastname>Smith</lastname>
    <visits count="3">
        <visit>
            <country>France</country>
            <date>2010-01-22</date>
        </visit>
        <visit>
            <country>Italy</country>
            <date>1983-01-22</date>
        </visit>
        <visit>
            <country>Romania</country>
            <date>2010-01-22</date>
        </visit>
        <visit>
            <country>Bulgaria</country>
            <date>2010-01-25</date>
        </visit>        
    </visits>
    <email type="business">mail@bsi.com</email>
    <email type="personal">mail@pers.com</email>
    <age>67</age>
</customer>
```

From it, we want to obtain a JSON like:

```json
{
  "person" : {
    "firstName" : "Mike",
    "lastName" : "Smith",
    "personalEmails" : [ "mail@pers.com" ],
    "businessEmails" : [ "mail@bsi.com" ],
    "hasVisitedRomania" : "true"
  },
  "visits" : {
    "yearsActive" : [ "2010", "1983" ],
    "countries" : [ "France", "Italy", "Romania", "Bulgaria" ]
  }
}
```

Basically we want to morph the source XML into a JSON that:
* Has two separated nodes for `person` and `visits`;
* Has the customer's mails grouped into two separated arrays based on their type (`<email type="...">`);
* Has an optional `hasVisistedRomania` field in case Romania appears in the visits list;
* Has an array containing all the years during which the customer was active (visited countries around the globe) - no duplications accepted
* Has an array containing all the countries the customer has visited - no duplications allowed

The corresponding **mapneat** transformation might look like:

```kotlin
json(MapNeatSource.fromXml(xml)) {
    "person" /= json {
        "firstName" *= "$.customer.firstname"
        "lastName" *= "$.customer.lastname"
        "personalEmails" *= "$.customer.email[?(@.type == 'personal')].content"
        "businessEmails" *= "$.customer.email[?(@.type == 'business')].content"
        if (sourceCtx().read<MutableList<String>>("$.customer.visits.visit[*].country").contains("Romania")) {
            "hasVisitedRomania" /= "true"
        }
    }
    "visits" /= json {
        "yearsActive" *= {
            expression = "$.customer.visits.visit[*].date"
            processor = {
                (it as MutableList<String>)
                    .map { ds -> LocalDate.parse(ds, df).year.toString() }
                    .toSet()
            }
        }
        "countries" *= "$.customer.visits.visit[*].country"
    }
}
```

# Explanation

Under the hood, **mapneat** uses the [JSON-java](https://github.com/stleary/JSON-java) library to automatically convert an XML Source to an intermediary JSON Source.

This step si done automatically when `MapNeatSource.fromXml(xml)` is invoked.

At this point, any XML information / reference will be "forever" lost. 

For debugging purposes, if you want to see how the intermediary JSON source looks like, especially for debugging purposes, you can do the following:

```kotlin
json(MapNeatSource.fromXml(xml)) {
    copySourceToTarget()
    println(this)
}
```

Running the above code on our input XML, would return this:

```json
{
  "customer" : {
    "visits" : {
      "count" : 3,
      "visit" : [ {
        "date" : "2010-01-22",
        "country" : "France"
      }, {
        "date" : "1983-01-22",
        "country" : "Italy"
      }, {
        "date" : "2010-01-22",
        "country" : "Romania"
      }, {
        "date" : "2010-01-25",
        "country" : "Bulgaria"
      } ]
    },
    "firstname" : "Mike",
    "email" : [ {
      "type" : "business",
      "content" : "mail@bsi.com"
    }, {
      "type" : "personal",
      "content" : "mail@pers.com"
    } ],
    "age" : 67,
    "lastname" : "Smith"
  }
}
```

This is the actual JSON source, that we morph into our desired format.

Now, looking at the following operations:

```kotlin
    "person" /= json {
        "firstName" *= "$.customer.firstname"
        "lastName" *= "$.customer.lastname"
        "personalEmails" *= "$.customer.email[?(@.type == 'personal')].content"
        "businessEmails" *= "$.customer.email[?(@.type == 'business')].content"
// ....
```

First we observe that we can have `json{}` inside `json{}`. 

This behavior allows us to even merge various sources into a single file.

Creating an inner `json{}` inside of an outer `json{}` is done using the assign operation: `/=`.

`"$.customer.email[?(@.type == 'personal')].content"` is a [json-path](https://github.com/json-path/JsonPath) expression, that not only selects all emails, but also filters them by their type.

> Retrieving information from the source is usually done using `*=` Shift Operations.

Next, given Kotlin's excellent DSL features, we can actually mix control statements (if/else/case) inside our transformation:

```kotlin
 if (sourceCtx().read<MutableList<String>>("$.customer.visits.visit[*].country").contains("Romania")) {
    "hasVisitedRomania" /= "true"
}
```

The above code will make sure, the optional field `hasVisitedRomania` only appears if the list of visited countries (`"$.customer.visits.visit[*].country"`) contains `"Romania"`.

The last part:

```kotlin

val df = DateTimeFormatter.ofPattern("yyyy-MM-dd", Locale.US)

//....

"yearsActive" *= {
    expression = "$.customer.visits.visit[*].date"
    processor = {
        (it as MutableList<String>)
            .map { ds -> LocalDate.parse(ds, df).year.toString() }
            .toSet()
    }
}
```

Iterates of all the visits, extracts the year of the visit, and collects element to a `Set` (in order to avoid duplications).



