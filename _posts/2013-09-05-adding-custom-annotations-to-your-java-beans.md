---
title: "Adding custom annotations to your java beans"
date: "2013-09-05"
excerpt: "On writing your own annotations"
classes: wide
categories: 
  - "java"
tags: 
  - "annotations"
  - "csv-export"
  - "custom-annotations"
  - "java-2"
  - "java-beans"
  - "refection"
---

Java annotations are syntactic meta-information that can be added to your Java source code. You can annotate classes, methods, variables, method parameters, and even [packages](https://puredanger.github.io/tech.puredanger.com/2007/02/28/package-annotations/).

The great advantage of Java annotations over Javadoc tags is that those bits of information can be reflective. Thus they can be made available to the VM at runtime (using the [Java Reflection API](http://docs.oracle.com/javase/tutorial/reflect/)).

Other than this, modern Java frameworks (like Spring) make heavy annotations to let the developer extend, inject data and configure existent behaviors.

In this article, we will define our custom annotations, and we will use reflection to analyze and enhance the behavior of our Java beans at runtime. So, let's suppose we want to write a mechanism that transforms (let's say serialize) a given collection of java beans instances to a CSV file.

We don't want to "serialize" all the fields, so we will use annotations to mark only the fields we wish to *export*.

The first step will be the write the annotations class. We will call this one `CSVExport.java`:

```java
package net.andreinc.utils;

import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface CSVExport {
}
```

As you can see, all annotations related classes are included in the `java.lang.annotation.*` package. Other than this, we will need to mark this annotation with a RetentionPolicy that will make it available at runtime. We will specify that the annotation can only be used in conjunction with class methods.

The next step is to write Java Bean and to "mark" the getters we want to serialize with our newly defined custom annotation.

```java
package net.andreinc.utils;

public class TestModel {
	public String p1;
	public int p2;
	public Double p3;

	public TestModel(String p1, int p2, Double p3) {
		super();
		this.p1 = p1;
		this.p2 = p2;
		this.p3 = p3;
	}
	@CSVExport
	public String getP1() {
		return p1;
	}
	public void setP1(String p1) {
		this.p1 = p1;
	}
	@CSVExport
	public int getP2() {
		return p2;
	}
	public void setP2(int p2) {
		this.p2 = p2;
	}
	@CSVExport
	public Double getP3() {
		return p3;
	}

	public void setP3(Double p3) {
		this.p3 = p3;
	}
}
```

Only the methods annotated with @CSVExport serialize to the resulting file. If no annotations are present, nothing will be exported.

The next step is to write the actual exporting mechanism.

```java
package net.andreinc.utils;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.io.PrintStream;
import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.lang.annotation.Annotation;
import java.lang.reflect.*;

public class CollectionToCSV {

	private Collection collection;

	public CollectionToCSV(Collection collection) {
		this.collection = (Collection) collection;
	}

	public void export(PrintStream out) {
		out = System.out;
		Iterator iterator = this.collection.iterator();
		while (iterator.hasNext()) {
			try {
				out.println(buildCSVRow(iterator.next()));
			} catch (Exception e) {
				//TODO
			}
		}
	}

	private String buildCSVRow(T element) throws IllegalArgumentException,
			IllegalAccessException, IntrospectionException, InvocationTargetException {
		Method readMethod = null;
		Annotation[] annotations = null;
		Object value = null;
		StringBuilder buff = new StringBuilder("");
		BeanInfo beanInfo = Introspector.getBeanInfo(element.getClass());
		PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
		for (PropertyDescriptor propertyDescriptor : propertyDescriptors) {
			readMethod = propertyDescriptor.getReadMethod();
			if (null != readMethod) {
				annotations = readMethod.getAnnotations();
				for (Annotation annotation : annotations) {
					if (annotation instanceof CSVExport) {
						value = readMethod.invoke(element);
						buff.append(value + ",");
					}
				}
			}
		}
		buff.deleteCharAt(buff.length()-1);
		return buff.toString();
	}

	public static void main(String args[]) throws IllegalArgumentException, IllegalAccessException, IntrospectionException, InvocationTargetException {
		TestModel t1 = new TestModel("a", 1, 2.0);
		TestModel t2 = new TestModel("b", 2, 4.0);
		TestModel t3 = new TestModel("c", 3, 6.0);

		List tl = new LinkedList();
		tl.add(t1);
		tl.add(t2);
		tl.add(t3);

		CollectionToCSV ccsv = new CollectionToCSV(tl);

		ccsv.export(System.out);
	}
}
```

Running the code, the output will be:

```
a,1,2.0
b,2,4.0
c,3,6.0
```

By removing any of the `@CsvExport` annotations from `TestModel`, nothing will be exported.
