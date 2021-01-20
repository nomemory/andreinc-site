---
title: "The NIO.2 Path Class"
date: "2013-12-05"
categories: 
  - "java-programming-languages"
  - "nio"
tags: 
  - "combining-paths"
  - "fixed-path"
  - "getnamecount"
  - "java-7"
  - "java-nio"
  - "java-nio-file-path"
  - "java-nio-file-paths"
  - "nio-2"
  - "nio2"
  - "path-class"
  - "path-elements"
  - "path-root"
  - "resolve"
  - "resolvesibling"
---

The [Path](http://docs.oracle.com/javase/7/docs/api/java/nio/file/Path.html) class is considered to be the entry point for exploring the NIO.2 API. Basically every I/O operation in NIO.2 will exploit the facilities offered by this class.

Path is basically an upgraded version of the java.io.File class.

**1\. Getting the Path of the Home Directory** When you want to obtain the path that points to a specific file in the Home directory, you can proceed as shown. The returned home directory is dependent on each operating system:

// Returns the folder 'Downloads' from the home directory
Path path = Paths.get(System.getProperty("user.home"), "Downloads");
System.out.println(path);
// Output is C:\\Users\\andreinc\\Downloads

* * *

**2\. Obtaining information about the Path: Path Root and Path Parent** 

// Obtain the Path Root 
Path path1 = Paths.get(System.getProperty("user.home"), "Downloads");
System.out.println(path1.getRoot());
// Output is: 'C:\\'

// Obtain the path parent
Path path2 = Paths.get(System.getProperty("user.home"), "Downloads");
System.out.println(path2.getParent());
// Output is: 'C:\\Users\\andreinc'

* * *

**3\. Splitting a path in its name elements** This is a nice feature that allows the programmer to split the path in it's forming elements. For example if a file has the following path: 'C:\\Users\\andreinc\\Downloads\\file1.txt' the following function will retrieve the forming elements of the path, a List containing the following elements: \['C:\\', 'Users', 'andreinc', 'Downloads', 'file1.txt'\] .

package mainpack;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

public class MainClass {

	public static List getPathElements(Path path) {
		List list = new LinkedList();

		// The root element has to be added separately
		list.add(path.getRoot().toString());

		for (int i = 0; i < path.getNameCount(); ++i) {
			list.add(path.getName(i).toString());
		}
		return list;
	}

	public static void main(String argv\[\]) {
		// The location of the file
		Path path1 = Paths.get(System.getProperty("user.home"), "Downloads",
				"file1.txt");

		List list = getPathElements(path1);
		Iterator it = list.iterator();
		while (it.hasNext())
			System.out.println(it.next());
	}
}

And the output is:

C:\\
Users
andreinc
Downloads
file1.txt

* * *

**4\. Getting the subpath** We can extract a relative path using a subpath method. This method accept two parameters, the start (index) and end (index) in the subsequence of elements.

package mainpack;

import java.nio.file.Path;
import java.nio.file.Paths;

public class MainClass {

	public static void main(String argv\[\]) {

		// The location of the file
		// C:\\Users\\andreinc\\Downloads\\file1.txt

		Path path1 = Paths.get(System.getProperty("user.home"), "Downloads",
				"file1.txt");

		for (int i = 0; i < path1.getNameCount(); ++i) {
			for (int j = i + 1; j < path1.getNameCount(); ++j) {
				System.out.println(String.format("subpath(%d, %d) = %s", i, j,
						path1.subpath(i, j)));
			}
		}
	}
}

And the output is:

subpath(0, 1) = Users
subpath(0, 2) = Users\\andreinc
subpath(0, 3) = Users\\andreinc\\Downloads
subpath(1, 2) = andreinc
subpath(1, 3) = andreinc\\Downloads
subpath(2, 3) = Downloads

* * *

**5\. Combining two paths** This allows you to define a fixed root path and append to it partial paths.

package mainpack;

import java.nio.file.Path;
import java.nio.file.Paths;

public class MainClass {

	public static void main(String argv\[\]) {

		// The location of the file
		// C:\\Users\\andreinc\\Downloads\\file1.txt

		Path fixedPath = Paths.get(System.getProperty("user.home"), "Downloads");
		System.out.println("Fixed path is: " + fixedPath + "\\n");
		
		Path file1 = fixedPath.resolve("file1.txt");
		System.out.println("File1: " + file1);
		
		Path file2 = fixedPath.resolve("file2.txt");
		System.out.println("File2: " + file2);
		
		// You can also resolve a "sibling", a file existing at the same level
		Path file3 = file2.resolveSibling("file3.txt");
		System.out.println("File3: " + file3);
	}
}

Output:

Fixed path is: C:\\Users\\andreinc\\Downloads

File1: C:\\Users\\andreinc\\Downloads\\file1.txt
File2: C:\\Users\\andreinc\\Downloads\\file2.txt
File3: C:\\Users\\andreinc\\Downloads\\file3.txt

* * *

**6\. Comparing two paths** Two paths can be compared as objects, using the "equals()" function. This method is related to the "equals()" method of class Object, thus the compared paths are not required to exist, and this method does not check if the paths are the same file.

But sometimes we want to check if two Path objects represent the same file / folder . In this case we will need to use java.nio.File.Files.isSameFile() method.

Eg.:

// The location of the file
Path fixedPath = Paths.get(System.getProperty("user.home"), "Downloads");
Path file1 = fixedPath.resolve("file1.txt");
Path file2 = fixedPath.resolve("file1.txt");
	
try {
	System.out.println("file1 isSameFile file2: " + Files.isSameFile(file1, file2));
} catch (IOException e) {
	e.printStackTrace();
}

Output:

file1 isSameFile file2: true

The Path class implements the Comparable interface, thus we can compare two paths by using the compareTo() method . The comparation will be lexicographical, so this will be useful for "sorting".

* * *

**7\. Iterating over the elements of a Path**

The Path class implements the Iterable interface, so we can use a foreach to iterate over the elements of a Path.

Eg.:

// The location of the file
Path path = Paths.get(System.getProperty("user.home"), "Downloads", "file1.txt");
for(Path p : path)
	System.out.println(p);

Output:

Users
andreinc
Downloads
file1.txt
