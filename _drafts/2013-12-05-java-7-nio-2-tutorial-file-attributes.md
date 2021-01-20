---
title: "File Attributes int the NIO.2 API"
date: "2013-12-05"
categories: 
  - "java-programming-languages"
  - "nio"
tags: 
  - "acl"
  - "aclacl"
  - "aclowner"
  - "aclfileattributeview"
  - "basic"
  - "basiccreationtime"
  - "basicfilekey"
  - "basicisdirectory"
  - "basicisother"
  - "basicisregularfile"
  - "basicissymboliclink"
  - "basiclastaccesstime"
  - "basiclastmodifiedtime"
  - "basicsize"
  - "basicfileattributeview"
  - "dos"
  - "dosarchive"
  - "doshidden"
  - "dosreadonly"
  - "dossystem"
  - "dosfileattributeview"
  - "fileownerattributeview"
  - "getattribute"
  - "java-nio-file-attribute"
  - "nio-2"
  - "owner"
  - "posixgroup"
  - "posixpermissions"
  - "posixfileattributeview"
  - "readattributes"
  - "supportsfileattributeview"
  - "user"
  - "userdefinedfileattributeview"
---

#### Introduction

With NIO.2 we can easily determine the attributes of a file by using the _java.nio.file.attribute_ package.

Various file systems have different properties associated with files but NIO.2 groups the attributes into views, each view is specific to a particular file system implementation.

NIO.2 comes with a set of views:

- [BasicFileAttributeView](http://docs.oracle.com/javase/7/docs/api/java/nio/file/attribute/BasicFileAttributeView.html): This view contains a set of common attributes supported by all filesystem implementations. The inner name of the attribute view is 'basic'.

- [DosFileAttributeView](http://docs.oracle.com/javase/7/docs/api/java/nio/file/attribute/DosFileAttributeView.html): This view contains a set of attributes specific to filesystems that implement DOS attributes. The inner name of the attribute view is 'dos'.

- [PosixFileAttributeView](http://docs.oracle.com/javase/7/docs/api/java/nio/file/attribute/PosixFileAttributeView.html): This view contains a set of attributes specific to file systems that support the [POSIX](http://en.wikipedia.org/wiki/POSIX) standards. The inner name of the attribute view is 'posix'.

- [AclFileAttributeView](http://docs.oracle.com/javase/7/docs/api/java/nio/file/attribute/AclFileAttributeView.html): This view is supported by all filesystems implementations that have the concept of ACL. The inner name of the attribute is 'acl'.

- [FileOwnerAttributeView](http://docs.oracle.com/javase/7/docs/api/java/nio/file/attribute/FileOwnerAttributeView.html): This view is supported by all filesystems implementations that have the concept of "ownership" over a file. The inner name of the attribute is 'owner'.

- [UserDefinedFileAttributeView](http://docs.oracle.com/javase/7/docs/api/java/nio/file/attribute/UserDefinedFileAttributeView.html)

* * *

### How do we determine what are the views supported by our filesystem ?

import java.nio.file.FileSystem;
import java.nio.file.FileSystems;
import java.util.Set;

public class MainClass {

	public static void main(String argv\[\]) {
		// Retrieves the default file system
		FileSystem fileSystem = FileSystems.getDefault();
		Set fileSystemViews = fileSystem.supportedFileAttributeViews();

		// We iterate over the available file attribute views
		// of a file system
		for (String fileSystemView : fileSystemViews) {
			System.out.println(fileSystemView);
		}
	}
} 

Output (I am using a Windows 7 machine):

acl
basic
owner
user
dos

Everytime we want to access the view attributes of a file/folder, it is advisable to check if the file system supports the particular view. NIO.2 allows us to test this using the FileSystem.supportedFileAttributeViews() method .

Eg.:

package mainpack;

import java.nio.file.FileStore;
import java.nio.file.FileSystem;
import java.nio.file.FileSystems;
import java.nio.file.attribute.AclFileAttributeView;
import java.nio.file.attribute.BasicFileAttributeView;
import java.nio.file.attribute.DosFileAttributeView;
import java.nio.file.attribute.FileOwnerAttributeView;
import java.nio.file.attribute.PosixFileAttributeView;

public class MainClass {

	public static void main(String argv\[\]) {
		// Retrieves the default file system
		FileSystem fileSystem = FileSystems.getDefault();
		Iterable fileStores = fileSystem.getFileStores();

		for (FileStore fileStore : fileStores) {
			// Test if it supports BasicFileAttributeView
			System.out.println(String.format(
				"Filestore %s supports (%s) : %s",
				fileStore,
				BasicFileAttributeView.class.getSimpleName(),
				fileStore.supportsFileAttributeView(BasicFileAttributeView.class)));
			
			// Test if supports DosFileAttributeView
			System.out.println(String.format(
				"Filestore %s supports (%s) : %s",
				fileStore,
				DosFileAttributeView.class.getSimpleName(),
				fileStore.supportsFileAttributeView(DosFileAttributeView.class)));
			
			// Test if supports PosixFileAttributeView
			System.out.println(String.format(
				"Filestore %s supports (%s) : %s",
				fileStore,
				PosixFileAttributeView.class.getSimpleName(),
				fileStore.supportsFileAttributeView(PosixFileAttributeView.class)));
			
			// Test if supports AclFileAttributeView
			System.out.println(String.format(
				"Filestore %s supports (%s) : %s",
				fileStore,
				AclFileAttributeView.class.getSimpleName(),
				fileStore.supportsFileAttributeView(AclFileAttributeView.class)));
			
			// Test if supports FileOwnerAttributeView
			System.out.println(String.format(
				"Filestore %s supports (%s) : %s",
				fileStore,
				FileOwnerAttributeView.class.getSimpleName(),
				fileStore.supportsFileAttributeView(FileOwnerAttributeView.class)));
			
			System.out.println();
		}
	}
} 

Output:

Filestore (C:) supports (BasicFileAttributeView) : true
Filestore (C:) supports (DosFileAttributeView) : true
Filestore (C:) supports (PosixFileAttributeView) : false
Filestore (C:) supports (AclFileAttributeView) : true
Filestore (C:) supports (FileOwnerAttributeView) : true

Filestore (D:) supports (BasicFileAttributeView) : true
Filestore (D:) supports (DosFileAttributeView) : true
Filestore (D:) supports (PosixFileAttributeView) : false
Filestore (D:) supports (AclFileAttributeView) : true
Filestore (D:) supports (FileOwnerAttributeView) : true

* * *

#### Supported file attributes

Every view support file attributes.

**[BasicFileAttributeView](http://docs.oracle.com/javase/7/docs/api/java/nio/file/attribute/BasicFileAttributeView.html)**

<table class="table table-bordered"><tbody><tr><td><strong>Attribute</strong></td><td><strong>Returned Type</strong></td><td><strong>Comments</strong></td></tr><tr><td>"basic:creationTime"</td><td><a href="http://docs.oracle.com/javase/7/docs/api/java/nio/file/attribute/FileTime.html" target="_blank">FileTime</a></td><td>The exact time when the file was created.</td></tr><tr><td>"basic:fileKey"</td><td><a href="http://docs.oracle.com/javase/7/docs/api/java/lang/Object.html" target="_blank">Object</a></td><td>An object that uniquely identifies a file or null if a file key is not available.</td></tr><tr><td>"basic:isDirectory"</td><td><a href="http://docs.oracle.com/javase/7/docs/api/java/lang/Boolean.html" target="_blank">Boolean</a></td><td>Returns true if the file is a directory.</td></tr><tr><td>"basic:isRegularFile"</td><td><a href="http://docs.oracle.com/javase/7/docs/api/java/lang/Boolean.html" target="_blank">Boolean</a></td><td>Returns true if a file is not a directory.</td></tr><tr><td>"basic:isSymbolicLink"</td><td><a href="http://docs.oracle.com/javase/7/docs/api/java/lang/Boolean.html" target="_blank">Boolean</a></td><td>Returns true if the file is considered to be a symbolic link.</td></tr><tr><td>"basic:isOther"</td><td><a href="http://docs.oracle.com/javase/7/docs/api/java/lang/Boolean.html" target="_blank">Boolean</a></td><td></td></tr><tr><td>"basic:lastAccessTime"</td><td><a href="http://docs.oracle.com/javase/7/docs/api/java/nio/file/attribute/FileTime.html" target="_blank">FileTime</a></td><td>The last time when the file was accesed.</td></tr><tr><td>"basic:lastModifiedTime"</td><td><a href="http://docs.oracle.com/javase/7/docs/api/java/nio/file/attribute/FileTime.html" target="_blank">FileTime</a></td><td>The time when the file was last modified.</td></tr><tr><td>"basic:size"</td><td><a href="http://docs.oracle.com/javase/7/docs/api/java/lang/Long.html" target="_blank">Long</a></td><td>The file size.</td></tr></tbody></table>

**[DosFileAttributeView](http://docs.oracle.com/javase/7/docs/api/java/nio/file/attribute/DosFileAttributeView.html)**

<table class="table table-bordered"><tbody><tr><td><strong>Attribute</strong></td><td><strong>Returned Type</strong></td><td><strong>Comments</strong></td></tr><tr><td>"dos:archive"</td><td><a href="http://docs.oracle.com/javase/7/docs/api/java/lang/Boolean.html" target="_blank">Boolean</a></td><td>Return true if a file is archive or not.</td></tr><tr><td>"dos:hidden"</td><td><a href="http://docs.oracle.com/javase/7/docs/api/java/lang/Boolean.html" target="_blank">Boolean</a></td><td>Returns true if the file/folder is hidden.</td></tr><tr><td>"dos:readonly"</td><td><a href="http://docs.oracle.com/javase/7/docs/api/java/lang/Boolean.html" target="_blank">Boolean</a></td><td>Returns true if the file/folder is read-only.</td></tr><tr><td>"dos:system"</td><td><a href="http://docs.oracle.com/javase/7/docs/api/java/lang/Boolean.html" target="_blank">Boolean</a></td><td>Returns true if the file/folder is system file.</td></tr></tbody></table>

**[PosixFileAttributeView](http://docs.oracle.com/javase/7/docs/api/java/nio/file/attribute/PosixFileAttributeView.html)**

<table class="table table-bordered"><tbody><tr><td><strong>Attribute</strong></td><td><strong>Returned Type</strong></td><td><strong>Comments</strong></td></tr><tr><td>"posix:permissions"</td><td>Set&lt;<a href="http://docs.oracle.com/javase/7/docs/api/java/nio/file/attribute/PosixFilePermission.html">PosixFilePermission</a>&gt;</td><td>The file permissions.</td></tr><tr><td>"posix:group"</td><td><a href="http://docs.oracle.com/javase/7/docs/api/java/nio/file/attribute/GroupPrincipal.html">GroupPrincipal</a></td><td>Used to determine access rights to objects in a file system</td></tr></tbody></table>

**[AclFileAttributeView](http://docs.oracle.com/javase/7/docs/api/java/nio/file/attribute/AclFileAttributeView.html)**

<table class="table table-bordered"><tbody><tr><td><strong>Attribute</strong></td><td><strong>Returned Type</strong></td></tr><tr><td>"acl:acl"</td><td>List&lt;<a href="http://docs.oracle.com/javase/7/docs/api/java/nio/file/attribute/AclEntry.html">AclEntry</a><a>&gt;</a></td></tr><tr><td>"acl:owner"</td><td><a href="http://docs.oracle.com/javase/7/docs/api/java/nio/file/attribute/UserPrincipal.html">UserPrincipal</a></td></tr></tbody></table>

* * *

#### Retrieving file/folder attributes

There are two ways to extract those attributes:

- Getting a bulk of attributes using readAttributes() method ;
- Getting single attributes using getAttribute() method .

Retrieving bulk attributes:

package mainpack;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.attribute.BasicFileAttributes;

public class MainClass {

	public static void main(String argv\[\]) {
		// File path
		Path path = Paths.get(System.getProperty("user.home"), "Downloads",
				"file1.txt");
		
		// Getting bulk attributes
		BasicFileAttributes attributes = null;
		try {
			attributes = Files.readAttributes(path, BasicFileAttributes.class);
		} catch(IOException ioe) {
			ioe.printStackTrace();
		}
		
		// Retrieving information
		StringBuilder outBuff = new StringBuilder();
		
		outBuff.append("File: " + path);
		outBuff.append("\\n");
		outBuff.append("\\t").append("tsize: " + attributes.size());
		outBuff.append("\\n");
		outBuff.append("\\t").append("creationTime: " + attributes.creationTime());
		outBuff.append("\\n");
		outBuff.append("\\t").append("lastAccessTime: " + attributes.lastAccessTime());
		outBuff.append("\\n");
		outBuff.append("\\t").append("lastModifiedTime: " + attributes.lastModifiedTime());
		outBuff.append("\\n");
		outBuff.append("\\t").append("isRegularFile: " + attributes.isRegularFile());
		outBuff.append("\\n");
		outBuff.append("\\t").append("isDirectory: " + attributes.isDirectory());
		outBuff.append("\\n");
		outBuff.append("\\t").append("isSymbolicLink: " + attributes.isSymbolicLink());
		outBuff.append("\\n");
		outBuff.append("\\t").append("isOther: " + attributes.isOther());
		outBuff.append("\\n");
		
		System.out.println(outBuff.toString());
	}
}

Output:

File: C:\\Users\\IBM\_ADMIN\\Downloads\\file1.txt
	tsize: 0
	creationTime: 2013-12-03T15:55:06.208828Z
	lastAccessTime: 2013-12-03T15:55:06.208828Z
	lastModifiedTime: 2013-12-03T15:55:06.208828Z
	isRegularFile: true
	isDirectory: false
	isSymbolicLink: false
	isOther: false

We can also retrieve single attributes. Example:

...
// The second parameter which is composed by two sections
// \[inner-view-name\]:\[supported attribute\]
Long size = (Long) Files.getAttribute(path, "basic:size", NOFOLLOW\_LINKS);
FileTime creationTime = (FileTime) Files.getAttribute(path, "basic:creationTime");
System.out.println("Size is: " + size);
System.out.println("Creation time: " + creationTime);
...

* * *

#### Updating file/folder attributes

The simplest way to update file attributes is by using the Files.setAttribute method. In the following example we are going to modify the creation time of a given file:

...
// BEFORE 
FileTime before = (FileTime) Files.getAttribute(path, "basic:creationTime");
System.out.println("Creation time (BEFORE): " + before);
	
// AFTER
Files.setAttribute(path, "basic:creationTime", FileTime.fromMillis(System.currentTimeMillis()), NOFOLLOW\_LINKS);
FileTime after = (FileTime) Files.getAttribute(path, "basic:creationTime");
System.out.println("Creation time (AFTER): " + after);
...

Output:

Creation time (BEFORE): 2013-12-03T15:55:06.208828Z
Creation time (AFTER): 2013-12-05T13:45:04.058Z

* * *

#### Getting attributes of FileStores

To determine the default FileStore object we can invoke FileSystems.getDefault(), but it's also possible to obtain the list of FileStores by iterating over the list we obtain calling FileSystem.getFileStores() .

Each file store object has dedicated methods for obtaining the name, type, totalSpace etc.

import java.io.IOException;
import java.nio.file.FileStore;
import java.nio.file.FileSystem;
import java.nio.file.FileSystems;

public class MainClass {

	public static void main(String argv\[\]) {
		// Obtaining the default file System
		FileSystem fileSystem = FileSystems.getDefault();
		
		// Iterating over the list of existing file stores 
		// and retrieve their informations 
		StringBuilder outBuff = null;
		for (FileStore fileStore : fileSystem.getFileStores()) {
			try {
				// Initializing buffer
				outBuff = new StringBuilder();
				outBuff.append("File store - ").append(fileStore).append("\\n");
				
				// Obtaining the total space
				outBuff.append("\\t").append("Total space: ");
				outBuff.append(fileStore.getTotalSpace() / 1024);
				outBuff.append("\\n");
				
				// Obtaining used space
				outBuff.append("\\t").append("Used space: ");
				outBuff.append((fileStore.getTotalSpace() - fileStore
						.getUnallocatedSpace()) / 1024);
				outBuff.append("\\n");
				
				// Available space
				outBuff.append("\\t").append("Available space: ");
				outBuff.append(fileStore.getUsableSpace() / 1024);
				outBuff.append("\\n");
				
				// File store is readonly
				outBuff.append("\\t").append("Read-Only: ");
				outBuff.append(fileStore.isReadOnly());
				outBuff.append("\\n");
				
				System.out.println(outBuff.toString());
				
			} catch (IOException e) {
				System.err.println(e);
			}
		}
	}
}

Output:

File store - (C:)
	Total space: 102399996
	Used space: 47860936
	Available space: 54539060
	Read-Only: false

File store - (D:)
	Total space: 210168828
	Used space: 28760504
	Available space: 181408324
	Read-Only: false
