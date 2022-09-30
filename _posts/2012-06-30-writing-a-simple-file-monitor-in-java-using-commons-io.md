---
title: "Writing a simple file monitor in Java using Commons IO"
date: "2012-06-30"
excerpt: "Monitor file changes using Commons IO"
classes: wide
categories: 
  - "java"
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

Even though Java 7 comes with a low-level API to watch for file system changes (article [here](http://java.dzone.com/news/how-watch-file-system-changes)), there's also the option to use the [Commons IO](http://commons.apache.org/io/) library from the [Apache Foundation](http://www.apache.org/), mainly the [org.apache.commons.io.monitor](http://commons.apache.org/io/api-release/index.html?org/apache/commons/io/monitor/package-summary.html) package.

The first step will be to define the location that we are going to monitor:

```java
public static final String FOLDER =
        "/home/skywalker/Desktop/simple-test-monitor/watchdir";
```        

The next step will be to define a polling interval: how often we will "look" for file-system changes. The value is expressed in milliseconds:

```java
final long pollingInterval = 5 * 1000;
```

Now we will have to build a File object out of the folder we are monitoring:

```java
File folder = new File(FOLDER);
```

At this point, [Commons IO](http://commons.apache.org/io/) comes into the picture. 

In order to make the system monitor actually work we will need at least one instance of the following: 
* [FileAlterationObserver](http://commons.apache.org/io/api-release/org/apache/commons/io/monitor/FileAlterationObserver.html);
* [FilterAlterationMonitor](http://commons.apache.org/io/api-release/org/apache/commons/io/monitor/FileAlterationMonitor.html); 
* [FileAlterationListenerAdaptor](http://commons.apache.org/io/api-release/org/apache/commons/io/monitor/FileAlterationListenerAdaptor.html)

```java
FileAlterationObserver observer = new FileAlterationObserver(folder);
FileAlterationMonitor monitor = new FileAlterationMonitor(pollingInterval);
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
}
```

And then, we will proceed to add the listener to the observer, add the observer to the monitor, and start the monitor:

```java
observer.addListener(listener);
monitor.addObserver(observer);
monitor.start();
```

After compiling & running the resulting code, every change will be recorded:

```
File created: /home/skywalker/Desktop/simple-test-monitor/watchdir/1
File created: /home/skywalker/Desktop/simple-test-monitor/watchdir/test
File created: /home/skywalker/Desktop/simple-test-monitor/watchdir/test2
File removed: /home/skywalker/Desktop/simple-test-monitor/watchdir/test
File still exists in location: false
```
