---
title: "Writing a simple file/folder monitor using the Watch Service API"
date: "2013-12-06"
classes: wide
categories: 
  - "java"
tags: 
  - "nio"
  - "file-monitor"
---

The Watch Service was introduced in Java 7 as a "thread-safe" service responsible for watching objects for changes.

The most popular use of this API would be to use it as a way to monitor a folder of files for changes such as the addition of new files, the deletion of others, file renames, etc.

# Implementing a WatchService

The `WatchService` is dependent on the FileSystem, so the first step of creating a new `Service` is to obtain the underlying file system:

```java
// Create a new Watch Service
WatchService watchService = FileSystems.getDefault().newWatchService();
```

Afterward, we can register the following `WatchEvents` to the service:

- [`StandardWatchEventKinds`](http://docs.oracle.com/javase/7/docs/api/java/nio/file/StandardWatchEventKinds.html).`ENTRY_CREATE`: This event triggers when a folder entry is created, or a new entry is moved or renamed.

- [`StandardWatchEventKinds`](http://docs.oracle.com/javase/7/docs/api/java/nio/file/StandardWatchEventKinds.html).`ENTRY_DELETE`: This event is triggered when a folder/file is deleted, moved or renamed.

- [`StandardWatchEventKinds`](http://docs.oracle.com/javase/7/docs/api/java/nio/file/StandardWatchEventKinds.html).`ENTRY_MODIFY`: This event is pretty-platform dependent. Usually is triggered when the contents of a file is modified. But on some file systems it can also trigger when the attributes of that particular file are modified.

- [StandardWatchEventKinds](http://docs.oracle.com/javase/7/docs/api/java/nio/file/StandardWatchEventKinds.html).OVERFLOW: Indicates that an event has been lost.

To watch for the above changes in `user.home`, for example, we simply:

```java
// The folder we are going to watch
Path folder = Paths.get(System.getProperty("user.home"));

// Create a new Watch Service
WatchService watchService = FileSystems.getDefault().newWatchService();

// Register events
folder.register(watchService, 
		StandardWatchEventKinds.ENTRY_CREATE,
		StandardWatchEventKinds.ENTRY_MODIFY,
		StandardWatchEventKinds.ENTRY_DELETE);
	
// Closes a watch service
watchService.close();
```


To wait for incoming events, we will need to write an infinite loop:

```java
while(true) {
	// Obtaining watch keys
	final WatchKey key = watchService.poll();
	// key value can be null if no event was triggered
}
```

We can also add a timing interval for polling (if we don't need an instant feedback on the events):

```java
while(true) {
	// Obtaining watch keys every 10 seconds
	final WatchKey key = watchService.poll(10, TimeUnit.SECONDS);
	// key value can be null if no event was triggered
}
```

A WatchKey can have the following states:

- `Ready`: The WatchKey is ready to accept events.

- `Signaled`: In this state, the `WatchKey` has at least one event that occurred, and it's queued.

- `Invalid`: In this state, the key is no longer valid.

So the next step will be to retrieve the pending events from the WatchKey. There can be multiple events that were triggered. Those events are queued. The code to retrieve the pending events is:

```java
for (WatchEvent watchEvent : key.pollEvents()) {
	final Kind kind = watchEvent.kind();
	// Overflow event
	if (StandardWatchEventKinds.OVERFLOW == kind) {
		continue; // loop
	}
}
```

To obtain the `Path` from the watchEvent we will need to do something like this:

```java
final WatchEvent wePath = ( WatchEvent) watchEvent;
final Path path = wePath.context(); 
```

The last step of the implementation is to put the key back into its `Ready` step.

```java
// Inside the loop
if(key.reset()) { break; }
```

Also, you should take in consideration that if the loops break (e.g.: because of an exception) you need to close the Watch Service explicitly:

```
watchService.close();
```

Since Java 7, you can include the opening of the `WatchService` in the new `try()` block:

```java
try (WatchService watchService = FileSystems.getDefault().newWatchService()) {
…
}
```

# Putting all the code together

Please consider that we will only watch the `user.home`, and **not** its subtrees. 

If you wish to watch the whole sub-tree for modifications, you will need to register a watch service for every folder in the tree. Also, you will need to maintain the collection of watchers in the case you are creating/deleting new/existing sub-folders.

The Watch Service API is a low-level approach, so maybe you should write a high-level mechanism or use an already-existing solution.

```java
package mainpack;

import static java.nio.file.LinkOption.NOFOLLOW_LINKS;
import static java.nio.file.StandardWatchEventKinds.ENTRY_CREATE;
import static java.nio.file.StandardWatchEventKinds.OVERFLOW;

import java.io.IOException;
import java.nio.file.FileSystem;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.WatchEvent;
import java.nio.file.WatchEvent.Kind;
import java.nio.file.WatchKey;
import java.nio.file.WatchService;

public class MainWatch {
	public static void watchDirectoryPath(Path path) {
		// Sanity check - Check if path is a folder
		try {
			Boolean isFolder = (Boolean) Files.getAttribute(path,
					"basic:isDirectory", NOFOLLOW_LINKS);
			if (!isFolder) {
				throw new IllegalArgumentException("Path: " + path + " is not a folder");
			}
		} catch (IOException ioe) {
			// Folder does not exists
			ioe.printStackTrace();
		}
		
		System.out.println("Watching path: " + path);
		
		// We obtain the file system of the Path
		FileSystem fs = path.getFileSystem ();
		
		// We create the new WatchService using the new try() block
		try(WatchService service = fs.newWatchService()) {
			
			// We register the path to the service
			// We watch for creation events
			path.register(service, ENTRY\_CREATE);
			
			// Start the infinite polling loop
			WatchKey key = null;
			while(true) {
				key = service.take();
				
				// Dequeueing events
				Kind kind = null;
				for(WatchEvent watchEvent : key.pollEvents()) {
					// Get the type of the event
					kind = watchEvent.kind();
					if (OVERFLOW == kind) {
						continue; //loop
					} else if (ENTRY\_CREATE == kind) {
						// A new Path was created 
						Path newPath = ((WatchEvent) watchEvent).context();
						// Output
						System.out.println("New path created: " + newPath);
					}
				}
				
				if(!key.reset()) {
					break; //loop
				}
			}	
		} catch(IOException ioe) {
			ioe.printStackTrace();
		} catch(InterruptedException ie) {
			ie.printStackTrace();
		}
		
	}

	public static void main(String\[\] args) throws IOException,
			InterruptedException {
		// Folder we are going to watch
		Path folder = Paths.get(System.getProperty("user.home"));
		watchDirectoryPath(folder);
	}
} 
```

Possible output:

```
Watching path: C:\\Users\\BLA\_ADMIN
New path created: New Text Document.txt
New path created: test1.txt
New path created: New Text Document.txt
New path created: test2.txt
````
