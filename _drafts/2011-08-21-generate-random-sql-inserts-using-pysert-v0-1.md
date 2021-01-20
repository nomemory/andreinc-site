---
title: "Generate random SQL inserts using pysert (v0.1)"
date: "2011-08-21"
categories: 
  - "projects"
  - "programming-languages"
  - "python-programming-languages"
tags: 
  - "free"
  - "generate"
  - "inserts"
  - "open"
  - "open-source"
  - "python"
  - "python-3x"
  - "random"
  - "script"
  - "source"
  - "sql"
---

**[pysert](http://code.google.com/p/pysert/)** (with lowercase 'p') is a python script capable of generating random SQL data (INSERTS) from predefined **template**s .

### **How it works:**

Let's suppose you want to in fill the 'Employees' table in your application with 100 random entries . The table has the following columns: (_employee\_id_, _first\_name_, _last\_name_, _email_, _job\_id_, _salary_) .

The first step will be to write the **pysert template** .  The template is a a simple XML file divided into two sections:

- A declarative area - Here you define the data sets from which the data is generated ;
- The template string  - The actual string from which the output is generated .

A possible pysert template for our 'Employees' table will look like this:

_template.xml_

Once the template is ready you can use the script to generate the results . In it's current form the script works perfectly with both python 2.7.x and python 3.2.x series .

python pysert.py --input template.xml

The generated output will be printed directly to [stdout](http://en.wikipedia.org/wiki/Standard_streams) (unless you specify an --output FILE):

INSERT INTO EMPLOYEES
        (EMPLOYEE\_ID, FIRST\_NAME, LAST\_NAME, EMAIL, JOB\_ID, SALARY)
VALUES
        (312, 'Emma', 'Varchol', 'Emma\_Varchol@domain.com', 187,
        5445);
(and more...)

Luckily for us the data was generated and everybody is happy!

**

### Download

**

You can download the latest version from [here](http://code.google.com/p/pysert/downloads/list), or directly from svn:

svn checkout http://pysert.googlecode.com/svn/trunk/ pysert-read-only

The _**pysert.py**_ file on svn can be found [here](http://code.google.com/p/pysert/source/browse/trunk/src/pysert.py) .
