---
title: "Writing a simple file monitor in Java using Commons IO"
date: "2012-06-30"
categories: 
  - "java-programming-languages"
tags: 
  - "apache"
  - "commons"
  - "commons-io"
  - "commonsio"
  - "file"
  - "filealterationlistener"
  - "filealterationlisteneradaptor"
  - "filealterationmonitor"
  - "filealterationobserver"
  - "io"
  - "java-2"
  - "monitor"
---

In this article I am going to show you how to write a simple file monitor. So even though Java 7 comes with a low-level API to watch for file system changes (article [here](http://java.dzone.com/news/how-watch-file-system-changes)), fow now we will be using using the [Commons IO](http://commons.apache.org/io/) library from the [Apache Foundation](http://www.apache.org/), mainly the [org.apache.commons.io.monitor](http://commons.apache.org/io/api-release/index.html?org/apache/commons/io/monitor/package-summary.html) package.

The first step will be to define the location that we are going to monitor. For this I've created a temporary folder of my desktop, and defined a String constant pointing to that newly created location:

    public static final String FOLDER =
            "/home/skywalker/Desktop/simple-test-monitor/watchdir";

The next step will be to define a polling interval: how often we will "look" for file-system changes. The value is expressed in milliseconds:

        final long pollingInterval = 5 \* 1000;

Now we will have to build a File object out of the folder we are monitoring:

File folder = new File(FOLDER);

At this point [Commons IO](http://commons.apache.org/io/) comes into picture. In order to make the system monitor actually work we will need at least one instance of the following: [FileAlterationObserver](http://commons.apache.org/io/api-release/org/apache/commons/io/monitor/FileAlterationObserver.html), [FilterAlterationMonitor](http://commons.apache.org/io/api-release/org/apache/commons/io/monitor/FileAlterationMonitor.html) and [FileAlterationListenerAdaptor](http://commons.apache.org/io/api-release/org/apache/commons/io/monitor/FileAlterationListenerAdaptor.html) .

        FileAlterationObserver observer = new FileAlterationObserver(folder);
        FileAlterationMonitor monitor =
                new FileAlterationMonitor(pollingInterval);
        FileAlterationListener listener = new FileAlterationListenerAdaptor() {
            // Is triggered when a file is created in the monitored folder
            @Override
            public void onFileCreate(File file) {
                try {
                    // "file" is the reference to the newly created file
                    System.out.println("File created: "
                            + file.getCanonicalPath());
                } catch (IOException e) {
                    e.printStackTrace(System.err);
                }
            }

            // Is triggered when a file is deleted from the monitored folder
            @Override
            public void onFileDelete(File file) {
                try {
                    // "file" is the reference to the removed file
                    System.out.println("File removed: "
                            + file.getCanonicalPath());
                    // "file" does not exists anymore in the location
                    System.out.println("File still exists in location: "
                            + file.exists());
                } catch (IOException e) {
                    e.printStackTrace(System.err);
                }
            }
        };

And then we will proceed to add the listener to the observer, add the observer to the monitor, and start the monitor:

        observer.addListener(listener);
        monitor.addObserver(observer);
        monitor.start();

After compiling & running the resulting code, every change I do in the folder that I monitor is being recorded:

File created: /home/skywalker/Desktop/simple-test-monitor/watchdir/1
File created: /home/skywalker/Desktop/simple-test-monitor/watchdir/test
File created: /home/skywalker/Desktop/simple-test-monitor/watchdir/test2
File removed: /home/skywalker/Desktop/simple-test-monitor/watchdir/test
File still exists in location: false

**The full sourcecode for the simple file monitor:**

package net.andreinc.simplemonitor;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.monitor.FileAlterationListener;
import org.apache.commons.io.monitor.FileAlterationListenerAdaptor;
import org.apache.commons.io.monitor.FileAlterationMonitor;
import org.apache.commons.io.monitor.FileAlterationObserver;

public class SimpleTestMonitor {
    // A hardcoded path to a folder you are monitoring .
    public static final String FOLDER =
            "/home/skywalker/Desktop/simple-test-monitor/watchdir";

    public static void main(String\[\] args) throws Exception {
        // The monitor will perform polling on the folder every 5 seconds
        final long pollingInterval = 5 \* 1000;

        File folder = new File(FOLDER);

        if (!folder.exists()) {
            // Test to see if monitored folder exists
            throw new RuntimeException("Directory not found: " + FOLDER);
        }

        FileAlterationObserver observer = new FileAlterationObserver(folder);
        FileAlterationMonitor monitor =
                new FileAlterationMonitor(pollingInterval);
        FileAlterationListener listener = new FileAlterationListenerAdaptor() {
            // Is triggered when a file is created in the monitored folder
            @Override
            public void onFileCreate(File file) {
                try {
                    // "file" is the reference to the newly created file
                    System.out.println("File created: "
                            + file.getCanonicalPath());
                } catch (IOException e) {
                    e.printStackTrace(System.err);
                }
            }

            // Is triggered when a file is deleted from the monitored folder
            @Override
            public void onFileDelete(File file) {
                try {
                    // "file" is the reference to the removed file
                    System.out.println("File removed: "
                            + file.getCanonicalPath());
                    // "file" does not exists anymore in the location
                    System.out.println("File still exists in location: "
                            + file.exists());
                } catch (IOException e) {
                    e.printStackTrace(System.err);
                }
            }
        };

        observer.addListener(listener);
        monitor.addObserver(observer);
        monitor.start();
    }
}

* * *

_If you are not satisfied with this approach I strongly recommend you to read this tutorial about the new Java NIO.2 Watch Service api. I think this is the desirable approach if you are lucky enough to use version 7:_

**[Java 7 NIO.2 Tutorial – Writing a simple file/folder monitor using the Watch Service API](2013/12/06/java-7-nio-2-tutorial-writing-a-simple-filefolder-monitor-using-the-watch-service-api/)**
