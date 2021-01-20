---
title: "Writing a simple file/folder monitor using the Watch Service API"
date: "2013-12-06"
categories: 
  - "java-programming-languages"
  - "nio"
tags: 
  - "java-7"
  - "register"
  - "standardwatcheventkinds-entry_delete"
  - "standardwatcheventkinds-entry_create"
  - "standardwatcheventkinds-entry_modify"
  - "standardwatcheventkinds-overflow"
  - "watch-service"
  - "watchservice"
---

The Watch Service was introduced in Java 7 as a "thread-safe" service responsible for watching objects for changes.

The most popular use of this API would be to use it as way to monitor a folder of files for changes such as: addition of new files, deletion of files, file renames, etc.

* * *

#### Implementing a WatchService

The WatchService is dependent on the FileSystem, the first step of creating a new Service is to obtain the underlying file system:

// Create a new Watch Service
WatchService watchService = FileSystems.getDefault().newWatchService();

Every object needs to be explicitly registered with the newly created service. In our particular case we will register a Path instance (a folder).

After we register the object, we also need to specific events the service need to watch.

Eg.:

- [StandardWatchEventKinds](http://docs.oracle.com/javase/7/docs/api/java/nio/file/StandardWatchEventKinds.html).ENTRY\_CREATE: This event triggers when a folder entry is created, or a new entry is moved or renamed.

- [StandardWatchEventKinds](http://docs.oracle.com/javase/7/docs/api/java/nio/file/StandardWatchEventKinds.html)..ENTRY\_DELETE: This event is triggered when a folder/file is deleted, moved or renamed.

- [StandardWatchEventKinds](http://docs.oracle.com/javase/7/docs/api/java/nio/file/StandardWatchEventKinds.html).ENTRY\_MODIFY: This event is pretty-platform dependent. Usually is triggered when the contents of a file is modified. But on some file systems it can also trigger when the attributes of that particular file are modified.

- [StandardWatchEventKinds](http://docs.oracle.com/javase/7/docs/api/java/nio/file/StandardWatchEventKinds.html).OVERFLOW: Indicates that an event has been lost.

The following code will register ENTRY\_CREATE, ENTRY\_DELETE and ENTRY\_MODIFY to the home folder:

// Folder we are going to watch
Path folder = Paths.get(System.getProperty("user.home"));

// Create a new Watch Service
WatchService watchService = FileSystems.getDefault().newWatchService();

// Register events
folder.register(watchService, 
		StandardWatchEventKinds.ENTRY\_CREATE,
		StandardWatchEventKinds.ENTRY\_MODIFY,
		StandardWatchEventKinds.ENTRY\_DELETE);
	
// Closes a watch service
watchService.close();

For every Path instance we are registering we will receive an [WatchKey](http://docs.oracle.com/javase/7/docs/api/java/nio/file/class-use/WatchKey.html) instance.

To wait for incoming events we will need to write an infinite loop:

for(;;) {}

while(true) {}

In this loop we will be able to poll for obtaining WatchKey instances.

while(true) {
	// Obtaining watch keys
	final WatchKey key = watchService.poll();
	// key value can be null if no event was triggered
}

We can also add a timing interval for polling (if we don't need an instant feedback on the events):

while(true) {
	// Obtaining watch keys every 10 seconds
	final WatchKey key = watchService.poll(10, TimeUnit.SECONDS);
	// key value can be null if no event was triggered
}

A WatchKey can have the following states:

- Ready: The WatchKey is ready to accept events.

- Signaled: In this state the WatchKey has at least one event that occurred and it was queued.

- Invalid: In this state the key is considered to be no longer valid.

So the next step will be to retrieve the pending events from the WatchKey. There can be multiple events that were triggered. Those events are queued. The code to retrieve the pending events is:

for (WatchEvent watchEvent : key.pollEvents()) {
	final Kind kind = watchEvent.kind();
	// Overflow event
	if (StandardWatchEventKinds.OVERFLOW == kind) {
		continue; // loop
	}
}

To obtain the Path from the watchEvent we will need to do something like this:

final WatchEvent wePath = ( WatchEvent) watchEvent;
final Path path = wePath.context(); 

The last step of the implementation is to put key back into it's Ready step.

// Inside the loop
if(key.reset()) { break; }

Also you should also take in consideration that if the loops break (eg.: because of an error) you need to explicitly close the Watch Service:

watchService.close();

Or, since Java 7, include the opening of the WatchService in the new try() block:

try (WatchService watchService = FileSystems.getDefault().newWatchService()) {
…
}

* * *

#### Putting all the code togheter

Please take in consideration that in our particular case we are only going to watch the Home folder, and **not** the whole sub-tree of folders. If you wish to watch the whole sub-tree for modifications you will need to register a watch service for every folder in the tree.

To obtain the list of sub-folders of a given folder, I recommend you to read my previous article called: [Java 7 NIO.2 – Recursive folder walks](/2013/12/06/java-7-nio-2-recursive-folder-walks/)

Also you will need to maintain the collection of watchers in the case you are creating/deleting new/existing sub-folders.

The Watch Service API is a low-level approach, so maybe it's best for you if you write your own high-level mechanism, or use an already-existing solution.

package mainpack;

import static java.nio.file.LinkOption.NOFOLLOW\_LINKS;
import static java.nio.file.StandardWatchEventKinds.ENTRY\_CREATE;
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
					"basic:isDirectory", NOFOLLOW\_LINKS);
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

I will create new files/folders inside my home directory the output will look like:

Watching path: C:\\Users\\IBM\_ADMIN
New path created: New Text Document.txt
New path created: test1.txt
New path created: New Text Document.txt
New path created: test2.txt
