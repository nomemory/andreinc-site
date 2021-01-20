---
title: "Recursive folder walks using NIO.2 API"
date: "2013-12-06"
categories: 
  - "java-programming-languages"
  - "nio"
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

The [FileVisitor](http://docs.oracle.com/javase/7/docs/api/java/nio/file/FileVisitor.html) interface allows us to recursively traverse file structures - folders, sub-folders and files.

Every method of this interface can return 4 possible results (instances of the [FileVisitResult](http://docs.oracle.com/javase/7/docs/api/java/nio/file/FileVisitResult.html) enum):

- [FileVisitResult.CONTINUE](http://docs.oracle.com/javase/7/docs/api/java/nio/file/FileVisitResult.html#CONTINUE): This means that the traversal process will continue.

- [FileVisitResult.SKIP\_SIBLINGS](http://docs.oracle.com/javase/7/docs/api/java/nio/file/FileVisitResult.html#SKIP_SIBLINGS): This means that the traversal process will continue without visiting the siblings (files or folders) of that particular Path

- [FileVisitResult.SKIP\_SUBTREE](http://docs.oracle.com/javase/7/docs/api/java/nio/file/FileVisitResult.html#SKIP_SUBTREE): This means that the traversal process will continue without visiting the rest of the tree entries.

- [FileVisitResult.TERMINATE](http://docs.oracle.com/javase/7/docs/api/java/nio/file/FileVisitResult.html#TERMINATE): This means that the traversal process should stop.

This FileVisitor interface has 4 methods:

- **visitFile()**:  
    The method is invoked for a file. The method should return a FileVisitResult.CONTINUE result or a FileVisitResult.TERMINATE result. The method receive a reference to the file (a [Path](http://docs.oracle.com/javase/7/docs/api/java/nio/file/Path.html) object) and to the [BasicFileAttributes](http://docs.oracle.com/javase/7/docs/api/java/nio/file/attribute/BasicFileAttributeView.html) object associated with the Path.

- **preVisitDirectory()**:  
    This method is invoked for a directory before visiting its children. The method returns FileVisitResult.CONTINUE if we want it's children to be visited or FileVisitResult.SKIP\_SUBTREE if we want the process to stop. If we want to skip visiting the siblings of the directory we need to return FileVisitResult.SKIP\_SIBLINGS .

- **postVisitDirectory()**:  
    This method is invoked after we visit all the children of a directory (including other folders and their descendants).

- **visitFileFailed()**:  
    This method is invoked if a file (or folder) cannot be accessed.

In practice it is also possible to use the [SimpleFileVisitor](http://docs.oracle.com/javase/7/docs/api/java/nio/file/SimpleFileVisitor.html) class if we want to traverse only the directories.

Once we have created the "recursive-walking-mechanism" by implementing [FileVisitor](http://docs.oracle.com/javase/7/docs/api/java/nio/file/FileVisitor.html) interface or by extending the [SimpleFileVisitor](http://docs.oracle.com/javase/7/docs/api/java/nio/file/SimpleFileVisitor.html) class we can start the recursive process by calling the [walkFileTree()](http://docs.oracle.com/javase/7/docs/api/java/nio/file/Files.html#walkFileTree(java.nio.file.Path,%20java.nio.file.FileVisitor)) method .

* * *

#### Example: Writing an application that search for files bigger than a pre-defined size

In this example we are going to implement a FileVisitor that walks a folder and logs to output all files that are bigger than certain amount.

The first step is to write the FileVisitor:

/\*\*
 \* This FileVisitor searches for files bigger than 'size' .
 \* 
 \* If a file matching our criteria is found, we log the results in the stdout .
 \* 
 \* @author AndreICiobanu
 \* 
 \*/
class FileSizeVisitor implements FileVisitor {

	private Long size;

	public FileSizeVisitor(Long size) {
		this.size = size;
	}

	/\*\*
	 \* This is triggered before visiting a directory.
	 \*/
	@Override
	public FileVisitResult preVisitDirectory(Path path,
			BasicFileAttributes attrs) throws IOException {
		return FileVisitResult.CONTINUE;
	}

	/\*\*
	 \* This is triggered when we visit a file.
	 \*/
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

	/\*\*
	 \* This is triggered if we cannot visit a Path We log the fact we cannot
	 \* visit a specified path .
	 \*/
	@Override
	public FileVisitResult visitFileFailed(Path path, IOException exc)
			throws IOException {
		// We print the error
		System.err.println("ERROR: Cannot visit path: " + path);
		// We continue the folder walk
		return FileVisitResult.CONTINUE;
	}

	/\*\*
	 \* This is triggered after we finish visiting a specified folder.
	 \*/
	@Override
	public FileVisitResult postVisitDirectory(Path path, IOException exc)
			throws IOException {
		// We continue the folder walk
		return FileVisitResult.CONTINUE;
	}

} 

The main method:

Path homeFolder = Paths.get("C:\\\\");
FileVisitor fileVisitor = new FileSizeVisitor(new Long(5000));
try {
	Files.walkFileTree(homeFolder, fileVisitor);
} catch (IOException e) {
	e.printStackTrace();
}

And some sample output from my machine:

...
File bigger than 5000  found: C:\\Windows\\System32\\IME\\imekr8\\applets\\mshwkorrIME.dll
File bigger than 5000  found: C:\\Windows\\System32\\IME\\IMETC10\\applets\\MSHWCHTRIME.dll
File bigger than 5000  found: C:\\Windows\\System32\\korwbrkr.lex
ERROR: Cannot visit path: C:\\Windows\\System32\\LogFiles\\WMI\\RtBackup
...

* * *

#### Writing a file search application based on a criteria

We can extend the example from above and create a more general approach.

The idea is to write an abstract implementation of the FileVisitor interface, that contains an abstract method "_criteria(Path, BasicFileAttributes)_".

Later we can use anonymous classes to define a new behavior of our visitors specifying only the criteria and avoiding to write the boiler-plate-code necessary to implement a FileVisitor.

We will name our FileVisitor implementation FileSearchByCriteriaVisitor:

abstract class FileSearchByCriteriaVisitor implements FileVisitor 

This class will have two instance variables called _results_ and _failedVisits_:

private List results = new LinkedList();
private List failedVisits = new LinkedList();
public List getResults() {
	return this.results;
}
public List getFailedVisits() {
	return this.failedVisits;
} 

The "_criteria(Path, BasicFileAttributes)_" mentioned before will be used like this:

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

Now everytime we implement a new FileSearchByCriteriaVisitor we must supply an implementation for the abstract method defined before.

Example how to use the FileSearchByCriteriaVisitor:

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

The results and the paths with errors are available in "_sizeVisitor.getResults()_" and "sizeVisitor.getFailedVisits()".
