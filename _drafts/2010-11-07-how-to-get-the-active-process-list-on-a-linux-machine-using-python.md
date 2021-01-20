---
title: "How to get the active process list on a Linux machine using python"
date: "2010-11-07"
categories: 
  - "programming-languages"
  - "python-programming-languages"
tags: 
  - "command"
  - "cpu"
  - "error"
  - "exit-codes"
  - "higher-level"
  - "input"
  - "mem"
  - "os-popen"
  - "os-popen2"
  - "os-system"
  - "output"
  - "pid"
  - "pipes"
  - "ps"
  - "ps-aux"
  - "stat"
  - "subprocess"
  - "subprocess-module"
  - "suprocess-popen"
  - "time"
  - "tty"
  - "tutorial-2"
  - "user"
---

To retrieve the active process list on a Linux machine we will use the [subprocess module](http://docs.python.org/library/subprocess.html) . This module will allow us to create new subprocesses, connect to their input / output / error pipes, and eventually retrieve their exit codes .

It offers us a higher level and cleaner approach by defining only one class: [subprocess.Popen()](http://docs.python.org/library/subprocess.html#subprocess.Popen), intended to replace the functionality offered by methods such as: [os.system()](http://docs.python.org/library/os.html#os.system), [os.popen()](http://docs.python.org/library/os.html#os.popen) or [os.popen2()](http://docs.python.org/library/os.html#os.popen2) .

To obtain the active processes and their associated information (USER, PID, CPU, MEM, TTY, STAT, TIME, COMMAND, etc.) we will spawn a _[ps aux](http://en.wikipedia.org/wiki/Ps_(Unix))_ subprocess, connect to its output pipe and parse the results .

But first let's analyze a little the output of _ps aux_ :

andrei@andrei:~$ ps aux
USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root         1  0.0  0.0   2872  1692 ?        Ss   14:15   0:00 /sbin/init
root         2  0.0  0.0      0     0 ?        S    14:15   0:00 \[kthreadd\]
root         3  0.0  0.0      0     0 ?        S    14:15   0:03 \[ksoftirqd/0\]
root         4  0.0  0.0      0     0 ?        S    14:15   0:00 \[migration/0\]
root         5  0.0  0.0      0     0 ?        S    14:15   0:00 \[watchdog/0\]
root         6  0.0  0.0      0     0 ?        S    14:15   0:00 \[migration/1\]
root         7  0.0  0.0      0     0 ?        S    14:15   0:00 \[ksoftirqd/1\]
root         8  0.0  0.0      0     0 ?        S    14:15   0:00 \[watchdog/1\]
root         9  0.0  0.0      0     0 ?        S    14:15   0:00 \[events/0\]
root        10  0.0  0.0      0     0 ?        S    14:15   0:00 \[events/1\]
root        11  0.0  0.0      0     0 ?        S    14:15   0:00 \[cpuset\]
.....................................................................................................

Our first step will be to create a data structure capable of encapsulating the above information . We will write the Proc class that will wrap all the process meta-information present in the '_ps aux_' output :

#!/usr/bin/env python

from subprocess import Popen, PIPE
from re import split
from sys import stdout

class Proc(object):
    ''' Data structure for a processes . The class properties are
    process attributes '''
    def \_\_init\_\_(self, proc\_info):
        self.user = proc\_info\[0\]
        self.pid = proc\_info\[1\]
        self.cpu = proc\_info\[2\]
        self.mem = proc\_info\[3\]
        self.vsz = proc\_info\[4\]
        self.rss = proc\_info\[5\]
        self.tty = proc\_info\[6\]
        self.stat = proc\_info\[7\]
        self.start = proc\_info\[8\]
        self.time = proc\_info\[9\]
        self.cmd = proc\_info\[10\]

    def to\_str(self):
        ''' Returns a string containing minimalistic info
        about the process : user, pid, and command '''
        return '%s %s %s' % (self.user, self.pid, self.cmd)

A list of _Proc objects_ will probably do the job . Now let's see how we are going to create the list:

def get\_proc\_list():
    ''' Return a list \[\] of Proc objects representing the active
    process list list '''
    proc\_list = \[\]
    sub\_proc = Popen(\['ps', 'aux'\], shell=False, stdout=PIPE)
    #Discard the first line (ps aux header)
    sub\_proc.stdout.readline()
    for line in sub\_proc.stdout:
        #The separator for splitting is 'variable number of spaces'
        proc\_info = split(" \*", line)
        proc\_list.append(Proc(proc\_info))
    return proc\_list

And to test the above function:

if \_\_name\_\_ == "\_\_main\_\_":
    proc\_list = get\_proc\_list()
    #Show the minimal proc list (user, pid, cmd)
    stdout.write('Process list:n')
    for proc in proc\_list:
        stdout.write('t' + proc.to\_str() + 'n')

    #Build & print a list of processes that are owned by root
    #(proc.user == 'root')
    root\_proc\_list = \[ x for x in proc\_list if x.user == 'root' \]
    stdout.write('Owned by root:n')
    for proc in root\_proc\_list:
        stdout.write('t' + proc.to\_str() + 'n')

The output may look like:

Process list:
	root 1 /sbin/init
	root 2 \[kthreadd\]
.....
	syslog 978 rsyslog
	root 1101 /usr/lib/gdm/gdm-simple-slave
	root 1106 /usr/sbin/cupsd
	andrei 1407 /usr/bin/dbus-launch
	andrei 1408 /bin/dbus-daemon
	andrei 1413 /usr/lib/libgconf2-4/gconfd-2
.....
Owned by root:
	root 1 /sbin/init
	root 2 \[kthreadd\]
	root 3 \[ksoftirqd/0\]
	root 4 \[migration/0\]
	root 5 \[watchdog/0\]
	root 6 \[migration/1\]
	root 7 \[ksoftirqd/1\]
.....

And putting all togheter (full source of the example):

#!/usr/bin/env python

from subprocess import Popen, PIPE
from re import split
from sys import stdout

class Proc(object):
    ''' Data structure for a processes . The class properties are
    process attributes '''
    def \_\_init\_\_(self, proc\_info):
        self.user = proc\_info\[0\]
        self.pid = proc\_info\[1\]
        self.cpu = proc\_info\[2\]
        self.mem = proc\_info\[3\]
        self.vsz = proc\_info\[4\]
        self.rss = proc\_info\[5\]
        self.tty = proc\_info\[6\]
        self.stat = proc\_info\[7\]
        self.start = proc\_info\[8\]
        self.time = proc\_info\[9\]
        self.cmd = proc\_info\[10\]

    def to\_str(self):
        ''' Returns a string containing minimalistic info
        about the process : user, pid, and command '''
        return '%s %s %s' % (self.user, self.pid, self.cmd)

def get\_proc\_list():
    ''' Retrieves a list \[\] of Proc objects representing the active
    process list list '''
    proc\_list = \[\]
    sub\_proc = Popen(\['ps', 'aux'\], shell=False, stdout=PIPE)
    #Discard the first line (ps aux header)
    sub\_proc.stdout.readline()
    for line in sub\_proc.stdout:
        #The separator for splitting is 'variable number of spaces'
        proc\_info = split(" \*", line.strip())
        proc\_list.append(Proc(proc\_info))
    return proc\_list

if \_\_name\_\_ == "\_\_main\_\_":
    proc\_list = get\_proc\_list()
    #Show the minimal proc list (user, pid, cmd)
    stdout.write('Process list:n')
    for proc in proc\_list:
        stdout.write('t' + proc.to\_str() + 'n')

    #Build & print a list of processes that are owned by root
    #(proc.user == 'root')
    root\_proc\_list = \[ x for x in proc\_list if x.user == 'root' \]
    stdout.write('Owned by root:n')
    for proc in root\_proc\_list:
        stdout.write('t' + proc.to\_str() + 'n')
