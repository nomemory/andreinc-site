---
title: "Serialize java objects using GZip streams (GZIPInputStream and GZIPOutputStream)"
classes: wide
date: "2010-12-12"
categories: 
  - "java"
tags: 
  - "2d-array"
  - "conversion"
  - "fileinputstream"
  - "fileoutputstream"
  - "graphs"
  - "gzip"
  - "gzipinputstream"
  - "gzipoutputstream"
  - "java-2"
  - "java-io-serializable"
  - "marker-interface"
  - "objectinputstream"
  - "objectoutputstream"
  - "programming-2"
  - "programming-language"
  - "serializable"
  - "serialization"
  - "very-large-objects"
---

> The code from this article was refactored on `2021-01-03`. It now makes use of the ["Try with resources"](https://docs.oracle.com/javase/tutorial/essential/exceptions/tryResourceClose.html) Java feature. 

The process of converting an object into an associated sequence of bits, so that we can store it in a file, a memory buffer or share it across a network, with the sole purpose of later _resurrecting_ it, is called **Serialization** . Wikipedia offers a nice insight of what serialization is, so if you have time, please check this **[article](http://en.wikipedia.org/wiki/Serialization)** . If this is the first time you hear about this concept you can check the [official java documentation](http://download.oracle.com/javase/6/docs/platform/serialization/spec/serialTOC.html) on this topic .

Recently I had to write a Serialization mechanism for a _hobby_ application of mine . I had some very big objects ([graphs](http://en.wikipedia.org/wiki/Graph_(data_structure)) represented as matrices) that had to be somehow stored as files for later usage .

Instead of writing them directly on the disk, I preferred to zip them in the process.

The objects must support serialization, so our class implements [`java.io.Serializable`](http://download.oracle.com/javase/6/docs/api/java/io/Serializable.html) . 

`java.io.Serializable` is a "marker interface", this means it doesn't contain any abstract methods, so there's nothing to implement.

```java
package net.andreinc.gzipserialization;

import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;

import static net.andreinc.mockneat.unit.types.Ints.ints;

// The class to be serialised
public class BigOne implements Serializable  {

    // Randomly generates a list<list<int>>
    // every int value from is either 0 or 1
    // rows = 1<<12 = 4096
    // cols = 1<<12 = 4096
    //
    // See www.mockneat.com 
    public final List<List<Integer>> bigOne =
            ints().from(new int[]{0, 1})
                    .list(1<<12)
                    .list(LinkedList::new, 1<<12)
                    .get();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        BigOne bigOne1 = (BigOne) o;
        return bigOne.equals(bigOne1.bigOne);
    }

    @Override
    public int hashCode() {
        return Objects.hash(bigOne);
    }
}
```

The `BigOne` class (not a recommended name for a class) encapsulates a bi-dimensional List of size `[1 << 12][1 << 12]`. 

This means the array has `4096 * 4096 = 1 << 24 elements = 16777216` elements (it's enough to prove the point).

And the Serializer class:

```java
package net.andreinc.gzipserialization;

import java.io.*;
import java.util.zip.GZIPInputStream;
import java.util.zip.GZIPOutputStream;

import static net.andreinc.mockneat.unit.types.Ints.ints;

public abstract class Serializer {

    enum Type {
        CLASSIC,
        GZIP;
    }

    /**
     * Serialize an object {@code T} on the disk.
     *
     * @param type If 'GZIP' the object will be also zipped before serialisation.
     * @param object The object to be serialised
     * @param path The path where to save the object
     * @param <T> The generic type of the object
     *
     * @throws IOException If there are access problems with the specified path
     */
    public static <T> void save(Type type, T object, String path) throws IOException {
        try(ObjectOutputStream oos = (type == Type.GZIP) ?
                new ObjectOutputStream(new GZIPOutputStream(new FileOutputStream(path))) :
                new ObjectOutputStream(new FileOutputStream(path));
        ) {
            oos.writeObject(object);
            oos.flush();
        }
    }

    /**
     * Loads an object from the disk
     *
     * @param type If 'GZIP' the object will be first unzipped before deserialization
     * @param c The class of the object for safe-casting
     * @param path The path from where to read the object
     * @param <T> The generic type fo the object
     * @return The object from the disk
     *
     * @throws IOException
     * @throws ClassNotFoundException
     */
    public static <T> T load(Type type, Class<T> c, String path) 
            throws IOException, ClassNotFoundException {
        try(ObjectInputStream ois = (type == Type.GZIP) ? 
                new ObjectInputStream(new GZIPInputStream(new FileInputStream(path))) :
                new ObjectInputStream(new FileInputStream(path));
        ) {
            return c.cast(ois.readObject());
        }
    }

    public static void main(String[] args) throws IOException, ClassNotFoundException {

        BigOne bigOne = new BigOne();

        String classic = "classic.out";
        String gzip = "gzip.out";

        // Saves the same object twice on the disk
        Serializer.save(Type.CLASSIC, bigOne, classic);
        Serializer.save(Type.GZIP, bigOne, gzip);

        // Loads the objects from the disk
        BigOne bigOne1 = Serializer.load(Type.GZIP, BigOne.class, gzip);
        BigOne bigOne2 = Serializer.load(Type.CLASSIC, BigOne.class, classic);

        // Compares for equality all the 3 objects
        System.out.println("bigOne .eq bigOne1 ->" + bigOne1.equals(bigOne));
        System.out.println("bigOne .eq bigOne2 ->" + bigOne2.equals(bigOne));
    }
}
```

The `Serializer` class has two methods (`save(...)` and `load(...)`), that can serialize/deserialize objects with or without the additional "gzip" layer.

Depending on the input, the ZIP algorithm can drastically reduce the de size of the input. So it's expected the file `gzip.out` to be smaller (size) than "classic.out".

The code is available on [github](https://github.com/nomemory/blog-gzip-stream-serialization). To clone it:

```shell
gh repo clone nomemory/blog-gzip-stream-serialization
```