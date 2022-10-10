---
title: "Recursive folder walks using NIO.2 API"
date: "2013-12-06"
excerpt: "Implement recursive folder walks using the Java standard API."
classes: wide
categories: 
  - "java"
tags: 
  - "filevisitor"
  - "filevisitresult"
  - "filevisitresult-continue"
  - "filevisitresult-skip_siblings"
  - "filevisitresult-skip_subtree"
  - "filevisitresult-terminate"
  - "java-2"
  - "java-7"
  - "java-nio-2"
  - "postvisitdirectory"
  - "previsitdirectory"
  - "recursive-folder"
  - "recursive-folder-walks"
  - "simplefilevisitor"
  - "visitfile"
  - "visitfilefailed"
  - "writing-a-file-search-application-based-on-a-criteria"
  - "writing-an-application-that-find-files-bigger-than-a-pre-defined-size"
---

#### FileVisitor Interface
The [`FileVisitor`](http://docs.oracle.com/javase/7/docs/api/java/nio/file/FileVisitor.html) interface allows us to (recursively) traverse file structures - folders, sub-folders, and files.

Every method of this interface can return four possible results (instances of the [`FileVisitResult`](http://docs.oracle.com/javase/7/docs/api/java/nio/file/FileVisitResult.html) enum):

- [`FileVisitResult.CONTINUE`](http://docs.oracle.com/javase/7/docs/api/java/nio/file/FileVisitResult.html#CONTINUE): This means that the traversal process will continue.

- [`FileVisitResult.SKIP_SIBLINGS`](http://docs.oracle.com/javase/7/docs/api/java/nio/file/FileVisitResult.html#SKIP_SIBLINGS): This means that the traversal process will continue without visiting the siblings (files or folders) of that particular Path

- [`FileVisitResult.SKIP_SUBTREE`](http://docs.oracle.com/javase/7/docs/api/java/nio/file/FileVisitResult.html#SKIP_SUBTREE): This means that the traversal process will continue without visiting the rest of the tree entries.

- [`FileVisitResult.TERMINATE`](http://docs.oracle.com/javase/7/docs/api/java/nio/file/FileVisitResult.html#TERMINATE): This means that the traversal process should stop.

This FileVisitor interface has four methods:

- `visitFile()`: The method is invoked for a file. The method should return a FileVisitResult.CONTINUE result or a FileVisitResult.TERMINATE result. The method receives a reference to the file (a [Path](http://docs.oracle.com/javase/7/docs/api/java/nio/file/Path.html) object) and to the [BasicFileAttributes](http://docs.oracle.com/javase/7/docs/api/java/nio/file/attribute/BasicFileAttributeView.html) object associated with the Path.

- `preVisitDirectory()`: This method is invoked for a directory before visiting its children. The method returns FileVisitResult.CONTINUE if we want its children to be visited or FileVisitResult.SKIP\_SUBTREE if we want the process to stop. If we're going to skip visiting the siblings of the directory, we need to return `FileVisitResult.SKIP_SIBLINGS`.

- `postVisitDirectory()`: This method is invoked after we visit all the children of a directory (including other folders and their descendants).

- `visitFileFailed()`:  This method is invoked if a file (or folder) cannot be accessed.

In practice, it is also possible to use the [`SimpleFileVisitor`](http://docs.oracle.com/javase/7/docs/api/java/nio/file/SimpleFileVisitor.html) class if we want to traverse only the directories.

Once we have created the "recursive-walking-mechanism" by implementing [`FileVisitor`](http://docs.oracle.com/javase/7/docs/api/java/nio/file/FileVisitor.html) interface, or by extending the [`SimpleFileVisitor`](http://docs.oracle.com/javase/7/docs/api/java/nio/file/SimpleFileVisitor.html) class, we can start the recursive process by calling the [`walkFileTree()`](http://docs.oracle.com/javase/7/docs/api/java/nio/file/Files.html#walkFileTree(java.nio.file.Path,%20java.nio.file.FileVisitor)) method .

# Example: Writing an application that searches for files bigger than a pre-defined size

In this example, we will implement a `FileVisitor` that walks a folder and logs to `System.out` all files that are bigger than a specific size.

The first step is to write the FileVisitor:

```java
class FileSizeVisitor implements FileVisitor {

	private Long size;

	public FileSizeVisitor(Long size) {
		this.size = size;
	}

	/**
	 * This is triggered before visiting a directory.
	 */
	@Override
	public FileVisitResult preVisitDirectory(Path path,
			BasicFileAttributes attrs) throws IOException {
		return FileVisitResult.CONTINUE;
	}

	/**
	 * This is triggered when we visit a file.
	 */
	@Override
	public FileVisitResult visitFile(Path path, BasicFileAttributes attrs)
			throws IOException {

		long fileSize = attrs.size() / 1024;

		if (fileSize >= this.size) {
			System.out.println("File bigger than " + this.size + "KB  found: "
					+ path);
		}

		return FileVisitResult.CONTINUE;
	}

	/**
	 * This is triggered if we cannot visit a Path We log the fact we cannot
	 * visit a specified path .
	 */
	@Override
	public FileVisitResult visitFileFailed(Path path, IOException exc)
			throws IOException {
		// We print the error
		System.err.println("ERROR: Cannot visit path: " + path);
		// We continue the folder walk
		return FileVisitResult.CONTINUE;
	}

	/**
	 * This is triggered after we finish visiting a specified folder.
	 */
	@Override
	public FileVisitResult postVisitDirectory(Path path, IOException exc)
			throws IOException {
		// We continue the folder walk
		return FileVisitResult.CONTINUE;
	}
} 
```

The main method:

```java
Path homeFolder = Paths.get("C:\\");
FileVisitor fileVisitor = new FileSizeVisitor(new Long(5000));
try {
	Files.walkFileTree(homeFolder, fileVisitor);
} catch (IOException e) {
	e.printStackTrace();
}
```

The sample output:

```
File bigger than 5000  found: C:\\Windows\\System32\\IME\\imekr8\\applets\\mshwkorrIME.dll
File bigger than 5000  found: C:\\Windows\\System32\\IME\\IMETC10\\applets\\MSHWCHTRIME.dll
File bigger than 5000  found: C:\\Windows\\System32\\korwbrkr.lex
ERROR: Cannot visit path: C:\\Windows\\System32\\LogFiles\\WMI\\RtBackup
```

# Example: Writing a file search application based on a criteria

We can extend the example from above and create a more general approach.

The idea is to write an abstract implementation of the FileVisitor interface that contains an abstract method `criteria(Path, BasicFileAttributes)`.

Later we can use anonymous classes to define a new behavior of our visitors, specifying only the criteria and avoiding writing the boiler-plate code necessary to implement a `FileVisitor`.

We will name our `FileVisitor` implementation `FileSearchByCriteriaVisitor`:

`abstract class FileSearchByCriteriaVisitor implements FileVisitor`

This class will have two instance variables called `results` and `failedVisits`:

```java
private List results = new LinkedList();
private List failedVisits = new LinkedList();
public List getResults() {
	return this.results;
}
public List getFailedVisits() {
	return this.failedVisits;
}
``` 

The "criteria(Path, BasicFileAttributes)" mentioned before will be used like this:

```java
// This method will be later implemented
protected abstract Boolean criteria(Path path, BasicFileAttributes attrs);
@Override
public FileVisitResult visitFile(Path file, BasicFileAttributes attrs)
		throws IOException {
	// Everytime we visit a file we check if that particular file matches a
	// criteria .
	if (criteria(file, attrs)) {
		// If the file matches the criteria we add it as a result
		results.add(file);
	}
	return FileVisitResult.CONTINUE;
}
```

Everytime we implement a new `FileSearchByCriteriaVisitor` we must supply an implementation for the abstract method defined before.

Example on how to use the FileSearchByCriteriaVisitor:

```java
// Search all the files bigger than size
final long size = 5000; // KB
// Defining a new visitor criteria
FileSearchByCriteriaVisitor sizeVisitor = new FileSearchByCriteriaVisitor() {
	@Override
	protected Boolean criteria(Path path, BasicFileAttributes attrs) {
		if (attrs.size() / 1024 >= size) {
			return true;
		}
		return false;
	}
};
// Walk don't run
Files.walkFileTree(Paths.get("C:\\\\"), sizeVisitor);
// Evaluate results
evaluate(sizeVisitor.getResults());
```

The results and the paths with errors are available in `sizeVisitor.getResults()` and `sizeVisitor.getFailedVisits()`.