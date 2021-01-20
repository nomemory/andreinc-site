---
title: "Adding custom annotations to your java beans"
date: "2013-09-05"
categories: 
  - "java-programming-languages"
tags: 
  - "annotations"
  - "csv-export"
  - "custom-annotations"
  - "java-2"
  - "java-beans"
  - "refection"
---

Java annotations are syntactic meta-information that can be added to your Java source code. You can annotate classes, methods, variables, method parameters and even packages.

The great advantage of Java annotations over javadoc tags is that those bits of information can be reflective and thus they can be made available to the VM at runtime (using the the [Java Relection API](http://docs.oracle.com/javase/tutorial/reflect/)).

Other than this, modern Java frameworks (like Spring) make heavy use of annotations in order to let the developer, extend, inject data and configure existent behaviors.

In this article we will define our own custom annotations, and we will use reflection to analyze and enhance the behavior of our Java beans at run-time.

Let's suppose we want to write a mechanism that transforms (let's say serialize) a given collection of java beans instances to a CSV file .CSV stands for Comma Separated Values. If you want to learn more about CSV files please check out this [wikipedia article](http://en.wikipedia.org/wiki/Comma-separated_values).

We don't want to "serialize" all the fields, so will use annotations to mark only the fields we wish to "export".

The first step will be the write the annotations class. We will call this one **_CSVExport.java_** :

package net.andreinc.utils;

import java.lang.annotation.\*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface CSVExport {
}

As you can see all annotations related classes are included in the **_java.lang.annotation.\*_** package. Other than this we will need to mark this annotation with a RetentionPolicy that will make it available at run-time, and we will specify that the annotation can only be used in conjunction with class methods (in our case those methods will be the bean getters).

At this point we will write a "model" java bean and we will mark the getters we want to serialize with our newly defined custom annotation.

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

Only the method that were annotated with @CSVExport will be serialized to the resulting file. If no annotations is present the specified getter method will be ignored.

The next step will be to write the class that actual export our collection. We will call this one _**CollectionToCSV.java**:_

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
import java.lang.reflect.\*;

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
			} catch (IllegalArgumentException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IntrospectionException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

	private String buildCSVRow(T element) throws IllegalArgumentException,
			IllegalAccessException, IntrospectionException, InvocationTargetException {
		Method readMethod = null;
		Annotation\[\] annotations = null;
		Object value = null;
		StringBuilder buff = new StringBuilder("");
		BeanInfo beanInfo = Introspector.getBeanInfo(element.getClass());
		PropertyDescriptor\[\] propertyDescriptors = beanInfo.getPropertyDescriptors();
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

	public static void main(String args\[\]) throws IllegalArgumentException, IllegalAccessException, IntrospectionException, InvocationTargetException {
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

The most important method **_buildCSVRow_ ,** as it iterates through the methods of the T.class (where T appears as a generic type, but in our case will be a TestModel instance), checks if the getter is marked with the @CSVExport annotation, and if the answer is yes the method will be invoked and the result will be included in our serialization.

If we run the main method the result will be:

a,1,2.0
b,2,4.0
c,3,6.0

If in the TestModel class we remove all the getters annotations nothing will be exported.
