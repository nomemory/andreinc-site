---
title: "How to resolve \"com.sun.deploy.net.JARSigningException: Found unsigned entry in resource:\""
date: "2012-11-13"
categories: 
  - "java-programming-languages"
tags: 
  - "jarsigningexception"
  - "java-2"
  - "programming-2"
  - "signed"
  - "signed-jars"
---

Recently I've encountered a rather strange behaviour related to [Java Web Start](http://en.wikipedia.org/wiki/Java_Web_Start).

If, in your .jnlp file you are referencing some signed jars, sometimes the verification fails miserably with the following stacktrace:

com.sun.deploy.net.JARSigningException: Found unsigned entry in resource: 
	at com.sun.javaws.security.SigningInfo.getCommonCodeSignersForJar(Unknown Source)
	at com.sun.javaws.security.SigningInfo.check(Unknown Source)
	at com.sun.javaws.LaunchDownload.checkSignedResourcesHelper(Unknown Source)
	at com.sun.javaws.LaunchDownload.checkSignedResources(Unknown Source)
	at com.sun.javaws.Launcher.prepareResources(Unknown Source)
	at com.sun.javaws.Launcher.prepareAllResources(Unknown Source)
	at com.sun.javaws.Launcher.prepareToLaunch(Unknown Source)
	at com.sun.javaws.Launcher.prepareToLaunch(Unknown Source)
	at com.sun.javaws.Launcher.launch(Unknown Source)
	at com.sun.javaws.Main.launchApp(Unknown Source)
	at com.sun.javaws.Main.continueInSecureThread(Unknown Source)
	at com.sun.javaws.Main$1.run(Unknown Source)
	at java.lang.Thread.run(Unknown Source)

If you are 100% sure that your jars are correctly signed, check if your JRE setup have "Keep temporary files on my computer" option enabled. That solved the problem for me.

So if you are on Windows: Control Panel -> Java and then:

[![](images/Capture.png "Java_resolve_issue_with_unsigned_resource")](http://andreinc.net/wp-content/uploads/2012/11/Capture.png)

Hope it helps.
