---
title: "How to use SeekableByteChannel interface for Random Access to Files (RAF)"
date: "2013-12-09"
categories: 
  - "java-programming-languages"
  - "nio"
tags: 
  - "bytebuffer"
  - "bytebuffers"
  - "filechannel"
  - "java-2"
  - "java-7"
  - "java-nio-2"
  - "nio-2"
  - "seekablebytechannel"
---

RAFs, Random Access Files permit asynchronous (random) access to a file contents. To access a file randomly we open the file, seek a particular position, and then we read or write to that file.

Java NIO.2 introduces a new interface - [SeekableByteChannel](http://docs.oracle.com/javase/7/docs/api/java/nio/channels/SeekableByteChannel.html) for working with Random Access Files. Also improves the well-known [FileChannel](http://docs.oracle.com/javase/7/docs/api/java/nio/channels/FileChannel.html) class by implementing this interface.

Before we start to talk about about FileChannel and SeekableByteChannel it is advisable to first talk a little bit about ByteBuffers and Channels.

* * *

#### ByteBuffers

A byte-buffer is an in-memory array of bytes. It usually contains data that was recently read, or that will be written from/to a destination.

A buffer has three important properties:

- The buffer's _capacity_ represents the "maximum amount of information" that can be stored in the buffer.
- The buffer's _position_ represents how much data has been read or written. The position is an index in the buffer's array, and cannot have a negative value or a value bigger than the buffer's capacity.
- The buffer's _limit_ is the difference between buffer's capacity and the buffer's position.

* * *

#### Channels

Channels are in a way similar with the classical I/O streams, the difference is that while streams are one-way directed (read or write), channels can support both operations in the same time. Also Channels allow you to write and read asynchronously.

* * *

#### Using SeekableByteChannel to write / read to / from files

The SeekableByteChannel interface has 6 methods:

- [position()](http://docs.oracle.com/javase/7/docs/api/java/nio/channels/SeekableByteChannel.html#position()): Returns the channels current position.
- [position(long)](http://docs.oracle.com/javase/7/docs/api/java/nio/channels/SeekableByteChannel.html#position(long)): Sets the channel position to the specified value. The value needs to be a positive number.
- [truncate(long)](http://docs.oracle.com/javase/7/docs/api/java/nio/channels/SeekableByteChannel.html#truncate(long)): Truncates the entity connected to the SeekableByteChannel to the specified value.
- [read(ByteBuffer)](http://docs.oracle.com/javase/7/docs/api/java/nio/channels/SeekableByteChannel.html#read(java.nio.ByteBuffer)): Reads into the buffer (from the channe).
- [write(ByteBuffer)](http://docs.oracle.com/javase/7/docs/api/java/nio/channels/SeekableByteChannel.html#write(java.nio.ByteBuffer)): Writes bytes from the buffer to the channel.
- [size()](http://docs.oracle.com/javase/7/docs/api/java/nio/channels/SeekableByteChannel.html#size()): Returns the current size of the entity to which the channel is connected.

To open a SeekableByteChannel we will need to use the the two methods from the [java.nio.file.Files](http://docs.oracle.com/javase/7/docs/api/java/nio/file/Files.html) class:

public static SeekableByteChannel newByteChannel(Path path, OpenOption... options);

Or:

public static SeekableByteChannel newByteChannel(Path path, Set options, 
FileAttribute... attrs);

As you can see to open a seekable channel you need to supply as input the Path you want to open (basically the file) and also open options, which are enum constants.

The possible enum options are as follow:

<table class="table table-striped  table-bordered"><tbody><tr><td><strong>READ</strong></td><td>The file is opened with READ access.</td></tr><tr><td><strong>WRITE</strong></td><td>The file is opened with WRITE access.</td></tr><tr><td><strong>CREATE</strong></td><td>Creates the file if the file does not already exist.</td></tr><tr><td><strong>CREATE_NEW</strong></td><td>Creates the file if the file does not already exist. If the file exists throw an exception.</td></tr><tr><td><strong>APPPEND</strong></td><td>Appends to the file. It is used in conjunction with CREATE and WRITE.</td></tr><tr><td><strong>DELETE_ON_CLOSE</strong></td><td>Deletes the file after the channel is closed. Use this when creating and editing / reading from temporary files.</td></tr><tr><td><strong>TRUNCATE_EXISTING</strong></td><td>Truncates the file to size 0. It is used in conjunction with WRITE and it's useful when you want to clean the contents of a file.</td></tr><tr><td><strong>SPARSE</strong></td><td>Usually used in conjunction with CREATE or CREATE_NEW. On some file systems large files that have big "data gaps" are stored in a more efficient way.</td></tr><tr><td><strong>SYNC</strong></td><td>File content + metadata is synchronized with the underlying file system.</td></tr><tr><td><strong>DSYNC</strong></td><td>File content is synchronized with the underlying file system.</td></tr></tbody></table>

* * *

#### Reading a file using a SeekableByteChannel

Please follow the comments:

package mainpack;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.SeekableByteChannel;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.EnumSet;

import static java.nio.file.StandardOpenOption.READ;

public class HideAndSeek {
	public static void main(String... args) {
		// We create a Path out the file we are going to read
		Path file = Paths.get(System.getProperty("user.home"), "file.txt");

		// We open the file in order to read it ()
		try (SeekableByteChannel sbc = Files.newByteChannel(file,
				EnumSet.of(READ))) {
			
			// We use a ByteBuffer to read (2^5 size = 32)
			ByteBuffer buff = ByteBuffer.allocate(1<<5);
			// Position is set to 0
			buff.clear();
			
			// We use the current encoding to read 
			String encoding = System.getProperty("file.encoding");
			
			// While the number of bytes from the channel are > 0
			while(sbc.read(buff)>0) {
				
				// Prepare the data to be written
				buff.flip();
				
				// Usins the current enconding we decode the bytes read
				System.out.print(Charset.forName(encoding).decode(buff));
				
				// Prepare the buffer for a new read
				buff.clear();
			}
			
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
	}
}

Output:

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctu.

* * *

#### Writing a file using SeekableByteChannel

Please follow the comments:

package mainpack;

import static java.nio.file.StandardOpenOption.APPEND;
import static java.nio.file.StandardOpenOption.WRITE;
import static java.nio.file.StandardOpenOption.CREATE;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.SeekableByteChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.EnumSet;

public class HideAndSeek2 {

	public static void main(String... args) {
		// The path were we are going to write
		Path file = Paths.get(System.getProperty("user.home"), "file2.txt");

		// We open the file in APPEND mode with CREATE
		try (SeekableByteChannel sbc = Files.newByteChannel(file,
				EnumSet.of(CREATE, APPEND, WRITE))) {

			// We create the buffer with the text we are going to write
			ByteBuffer buff = ByteBuffer.wrap("Writing text\\n".getBytes());
			
			// Write the byte buffer contents to the file and show
			// how many bytes were written
			System.out.println("Bytes written: " + sbc.write(buff));
			buff.clear();
			
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
	}
}

If we are going to open the file called "file2.txt" from our home folder the content will be:

Writing text

If we run multiple times the program the content of the file will look like this (the text is appended):

Writing text
Writing text
...
Writing text

* * *

#### Using the SeekableByteChannel to read characters from different file locations

Given the following [acrostic](http://en.wikipedia.org/wiki/Acrostic):

JANet was quite ill one day.
FEBrile trouble came her way.
MARtyr-like, she lay in bed;
APRoned nurses softly sped.
MAYbe, said the leech judicial
JUNket would be beneficial.
JULeps, too, though freely tried,
AUGured ill, for Janet died.
SEPulchre was sadly made.
OCTaves pealed and prayers were said.
NOVices with ma'y a tear
DECorated Janet's bier.

We want to read the first 3 letters at the beginning of every word and print on the standard output.

Code example:

package mainpack;

import static java.nio.file.StandardOpenOption.READ;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.SeekableByteChannel;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.EnumSet;
import java.util.LinkedList;
import java.util.List;

public class HideAndSeek3 {

	// This list contains indexes for every beginning of the
	// rows
	public static List indexes = new LinkedList();
	static {
		indexes.add(0L); // start index for row 1 - JAN
		indexes.add(30L); // start index for row 2 - FEB
		indexes.add(61L); // start index for row 3 - MAR
		indexes.add(91L); // start index for row 4 - APR
		indexes.add(120L); // start index for row 5 - MAY
		indexes.add(152L); // start index for row 6 - JUN
		indexes.add(181L); // start index for row 7 - JUL
		indexes.add(216L); // start index for row 8 - AUG
		indexes.add(246L); // start index for row 9 - SEP
		indexes.add(273L); // start index for row 10 - OCT
		indexes.add(312L); // start index for row 11 - NOV
		indexes.add(338L); // start index for row 12 - DEC
	}

	public static void main(String... args) {
		// The path we are going to open - the file containing the acrostic
		Path acrostic = Paths.get(System.getProperty("user.home"),
				"acrostic.txt");

		// The ByteBuffer is an array of 3 characters
		ByteBuffer buff = ByteBuffer.allocate(3);

		// Obtain encoding
		String encoding = System.getProperty("file.encoding");

		// We open the file in READ mode
		try (SeekableByteChannel sbc = Files.newByteChannel(acrostic,
				EnumSet.of(READ))) {

			// We jump on every index using position , we read the characters
			// in the buffer and we print them on the screen.
			for (Long idx : indexes) {
				sbc.position(idx);
				sbc.read(buff);
				buff.flip();
				System.out.print(Charset.forName(encoding).decode(buff)+" ");
				buff.rewind();
			}

			// Clear buffer
			buff.clear();
		} catch (IOException ioe) {
			ioe.printStackTrace();
		}
	}
}

And the output of the code:

JAN FEB MAR APR MAY JUN JUL AUG SEP OCT NOV DEC
