---
title: "Getting started with Apache Maven and Eclipse"
date: "2013-09-09"
categories: 
  - "eclipse-2"
  - "java-programming-languages"
  - "maven"
tags: 
  - "eclipse"
  - "maven"
---

[Apache Maven](http://maven.apache.org/) is a popular build automation tool, for large Java Projects.

All major Java IDEs ([IntelliJ IDEA](http://www.jetbrains.com/idea/), [Eclipse](http://www.eclipse.org/) and [Netbeans](https://netbeans.org/)) fully support Maven integration, by default or via plugins.

In order to get started with Maven you will need to:

**1.** Download Apache Maven from the original site, which is: [http://maven.apache.org/](http://maven.apache.org/) . Check for the _Download_ section:

[![Image 1](images/Image-1.png)](http://andreinc.net/wp-content/uploads/2013/08/Image-1.png)

**2**. Extract the .zip file in your desired location (Eg. _D:javatoolsapache-maven-3.1.0_ )

[![Image 2](images/Image-2.png)](http://andreinc.net/wp-content/uploads/2013/08/Image-2.png)**3.** The next step will be to setup the following system variables M2, M2\_HOME, JAVA\_HOME and also add the Maven _bin_ directory to System Path. For managing the System Variables on my station I am using a dedicated software called [Rapid Environment Editor](http://www.rapidee.com/):

[![Image 3](images/Image-3.png)](http://andreinc.net/wp-content/uploads/2013/08/Image-3.png)

 

If you don't want to install Rapid Environment Editor, you can use the Windows built-in feature to edit System Variables: _Control Panel -> System and Security -> System -> Advanced System Settings -> Advanced / Environment Variables ._

[![Image 4](images/Image-4.png)](http://andreinc.net/wp-content/uploads/2013/08/Image-4.png)

 

**4.** Modify the location of Maven repository - this is the location where Maven installs all its artifacts (jars, etc.) . By default the location for this folder is _${user.home}/.m2/repository_ . On Windows machines this may raise issues, as most users keep their C: partition small enough and dedicated only for their Operation System. In order to modify this behavior edit _%M2\_HOME%\\\\confsettings.xml_ . In my case this location is _D:\\\\java\\\\tools\\\\apache-maven-3.1.0\\\\conf\\\\settings.xml_. The property you need to modify is called: **_localRepository_** :

[![Image 5](images/Image-5.png)](http://andreinc.net/wp-content/uploads/2013/08/Image-5.png)

 

In my case the new value for this property is: _D:\\\\java\\\\tools\\\\apache-maven-3.1.0-repo ._

**5.** The next step will be to test if maven was successfully installed. Open up a Command Prompt and type:

mvn -version

If you've followed all the above mentioned steps the output should look like:

[![Image 6](images/Image-6.png)](http://andreinc.net/wp-content/uploads/2013/08/Image-6.png)

 

**6.** One of the cool features of Maven are the so-called [_Archetypes_](http://maven.apache.org/guides/introduction/introduction-to-archetypes.html) _._ Those are project structure / architecture templates that can save you a lot of time when you are defining boilerplate-like code. Right now Maven offers am impressive list of archetypes for defining all kinds of projects: JDBC Projects, Spring Projects etc. But in this tutorial we will use this feature in order to create a simple Java Project that are we going to import later into Eclipse. 

In order to create a simple project use this command:

mvn archetype:generate -DgroupId=net.andreinc.tutorial -DartifactId=Tutorial -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false

- _groupId_ is be the package name ;
- _artifactId_ is the name of the project ;
- _archetypeArtifactId_ is the type of the archetype (in our case a simple Java Project).

If everything was successful (after some downloads in your repository) you will probably see something similar to :

[![Image 7](images/Image-7.png)](http://andreinc.net/wp-content/uploads/2013/08/Image-7.png)

 

If you analyze your folder structure you will see something like this:

[![Image 2](images/Image-2.png)](http://andreinc.net/wp-content/uploads/2013/09/Image-2.png)

 

**7.** The last step will be to generate the necessary descriptors for Eclipse so that our newly generated project skeleton will be recognized as an Eclipse project. In the project root folder:

mvn eclipse:eclipse

**[![Image 3](images/Image-3.png)](http://andreinc.net/wp-content/uploads/2013/09/Image-3.png)**

 

 

**8.** The next step will be to import the project into Eclipse (File -> Import -> Existing Projects into Workspace):

[![Image 4](images/Image-4.png)](http://andreinc.net/wp-content/uploads/2013/09/Image-4.png)

 

 

And everything is done.
