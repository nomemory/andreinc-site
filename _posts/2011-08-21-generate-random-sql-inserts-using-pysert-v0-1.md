---
title: "Generate random SQL inserts using pysert"
date: "2011-08-21"
classes: wide
categories: 
- "python"
tags:
- "random-data"
- "sql-inserts"
---

**[pysert](https://github.com/nomemory/pysert)** (with lowercase 'p') is a python script capable of generating random SQL data (INSERTS) from predefined templates . Actually, it can generate all kinds of structured data like `JSON`, `XML` or `YAML`.

For a more complex solution, please check [www.mockneat.com](www.mockneat.com) - a Java library that does exactly what this script does, and much more.

For using the script you need to have `python3.x` on your machine.

After cloning it from github:

```shell
gh repo clone nomemory/pysert
```

The usage is:


```python
python3 pysert.py -i tmpl.xml -o out.txt
```

Where `tmpl.xml` is the template based on which the script will generate the data.

For example:

```xml
<pysert iterations="20">
	<!--  Declarative area -->
	<dataset name="id" type="Sequence" start="300" increment="1"/>
	<dataset name="fname" type="PersonalName" firstname="True" lastname="False"/>
	<dataset name="lname" type="PersonalName" firstname="False" lastname="True"/>
	<dataset name="jobid" type="RandomNumber" floating="False" min="100" max="200"/>
	<dataset name="salary" type="RandomNumber" floating="False" min="1000" max="15000"/>
	<!--  Actual template to be converted -->
	<template>
INSERT INTO EMPLOYEES
	(EMPLOYEE_ID, FIRST_NAME, LAST_NAME, EMAIL, JOB_ID, SALARY)
VALUES
	(#{id}, '#{fname}', '#{lname}', '#{fname}_#{lname}@domain.com', #{jobid},
	#{salary})
	</template>
 </pysert>
```

After running the script with this `tmpl.xml` file the output will be like:

```sql
INSERT INTO EMPLOYEES
	(EMPLOYEE_ID, FIRST_NAME, LAST_NAME, EMAIL, JOB_ID, SALARY)
VALUES
	(300, 'Paula', 'Chehachkov', 'Paula_Chehachkov@domain.com', 175,
	8439)


INSERT INTO EMPLOYEES
	(EMPLOYEE_ID, FIRST_NAME, LAST_NAME, EMAIL, JOB_ID, SALARY)
VALUES
	(301, 'Gabriel', 'Vlas', 'Gabriel_Vlas@domain.com', 183,
	11362)


INSERT INTO EMPLOYEES
	(EMPLOYEE_ID, FIRST_NAME, LAST_NAME, EMAIL, JOB_ID, SALARY)
VALUES
	(302, 'Mia', 'Fugger', 'Mia_Fugger@domain.com', 181,
	2080)

// (... and so on)  
```

Currently, there are a number of "pre-defined datasets" from which you can choose:

* `RandomNumber`:
    - `"name"`: `<string value>`
    - `"floating"` : `"<boolean value>"`
    - `"min"`: `"<integer value>"`
    - `"max"`: `"<integer value>"`
* `LoremIpsum`:
    - `"name"` : `<string value>`
    - `"length"` : `"<integer value>"`
* `PersonalName`:
    - `"name"` : `<string value>`
    - `"firstname"` : `"<boolean value>"`
    - `"lastname"` : `"<boolean value>"`
* `Sequence` :
    - `"name"` : `<string value>`
    - `"start"` : `"<integer value>"`
    - `"increment"` : `"<integer value>"`
  
If this is not enough, for adding your own dataset type you have to modify the script:

1. Extend the class `AbstractDataSet`
2. Override the method `def validation_list(self):` by including the properties of the DataSet - script will validate the input `xml` based on that.
3. Override the method `def next_value(self):`. Here you define the "arbitrary" / "random" behavior of the data set.

