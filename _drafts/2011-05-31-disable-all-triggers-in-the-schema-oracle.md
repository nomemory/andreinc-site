---
title: "Disable/Enable all triggers in the schema (Oracle)"
date: "2011-05-31"
categories: 
  - "plsql"
  - "programming-languages"
tags: 
  - "alter-all-triggers"
  - "alter-trigger"
  - "disable"
  - "enable"
  - "oracle-2"
  - "plsql-2"
  - "sql-procedure"
  - "triggers"
---

Normally If you want to enable/disable a trigger you would use the ALTER statement:

ALTER TRIGGER ENABLE;
ALTER TRIGGER DISABLE; 

But today I had to disable/enable **all triggers** in the schema, in order to freely insert and update some data . For this task I've written a short PL/SQL procedure:

CREATE OR REPLACE PROCEDURE ALTER\_ALL\_TRIGGERS(status VARCHAR2) IS
  CURSOR c\_tr IS (SELECT 'ALTER TRIGGER ' || trigger\_name AS stmnt FROM user\_triggers);
BEGIN
  IF status NOT IN ('ENABLE', 'enable', 'DISABLE', 'disable') THEN
    DBMS\_OUTPUT.PUT\_LINE('ONLY ''ENABLEDISABLE'' ACCEPTED AS PARAMETERS');
    RAISE VALUE\_ERROR;
  END IF;
  FOR tr IN c\_tr LOOP
    EXECUTE IMMEDIATE tr.stmnt || ' ' || status;
  END LOOP;
END;

The idea is pretty simple, we iterate over all the user-defined triggers (see **user\_triggers**), building on-the-way statements that are going to be "EXECUTED IMMEDIATELY" .

To execute the procedure you can do something like this:

  -- EXAMPLE OF USAGE:
EXEC ALTER\_ALL\_TRIGGERS('ENABLE');
EXEC ALTER\_ALL\_TRIGGERS('DISABLE');

Hope it's going to be useful .
