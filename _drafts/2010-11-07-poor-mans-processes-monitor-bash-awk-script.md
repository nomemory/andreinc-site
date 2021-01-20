---
title: "Poor man's processes monitor (bash & awk script)"
date: "2010-11-07"
categories: 
  - "bash"
  - "programming-languages"
tags: 
  - "awk-v"
  - "command"
  - "cpu"
  - "declare"
  - "grep"
  - "hanging"
  - "mem"
  - "monitor"
  - "pid"
  - "processes"
  - "ps"
  - "running"
  - "wc"
---

Recently a member of the [Romanian Ubuntu Community](http://forum.ubuntu.ro/) asked for a script to monitor the running processes on his server . He didn't requested for anything fancy, just a small utility that will be able to detect a _hanging application_ (a process that is "eating" more than 80% of the CPU for a long period of time) and then log the results .

I am no sysadmin, but I am sure there are a lot of dedicated open-source solutions for monitoring a server .Still the functionality he asked for can be easily achieved by combining [bash](http://en.wikipedia.org/wiki/Bash_(Unix_shell)) and [awk](http://en.wikipedia.org/wiki/AWK) .

One of the things I like Linux for is the power of the shell and the full-control over the your system . You can write a script for every repeating task that arise as bash is easy to learn but of course, hard to master .  More as an exercise for myself I've proposed the following solution :

#!/bin/bash

#DATE: Nov 5, 2010
#AUTHOR: nomemory

#Maximum memory for a process (%)
declare -i MEM\_LIMIT=1

#Maximum CPU for a process (%)
declare -i CPU\_LIMIT=1

#Loop sleep interval
declare -i SEC\_INT=30

while true; do
ps aux | awk -v MEM\_LIMIT=${MEM\_LIMIT} 
				-v CPU\_LIMIT=${CPU\_LIMIT} 
				-v CDATE="\`date\`" '{
					if ($3 > CPU\_LIMIT) {
						printf "%s \[ %10s %d %40s \] CPU LIMIT EXCEED: %2.2f (MAX: %2.2f) n", 
							CDATE, $1, $2, $11, $3, CPU\_LIMIT
					}
					if ($4 > MEM\_LIMIT) {
						printf "%s \[ %10s %d %40s \] MEM LIMIT EXCEED: %2.2f (MAX: %2.2f) n", 
							CDATE, $1, $2, $11, $4, MEM\_LIMIT
					}
				}'
sleep ${SEC\_INT}
done

If you run this script the output will probably look similar to this one :

Mon Nov  8 00:01:08 EET 2010 \[     andrei 1718         /opt/google/chrome/google-chrome \] MEM LIMIT EXCEED: 2.20 (MAX: 1.00)
Mon Nov  8 00:01:08 EET 2010 \[     andrei 1726                                   pidgin \] MEM LIMIT EXCEED: 1.40 (MAX: 1.00)
Mon Nov  8 00:01:08 EET 2010 \[     andrei 1853                /opt/google/chrome/chrome \] CPU LIMIT EXCEED: 5.70 (MAX: 1.00)
Mon Nov  8 00:01:08 EET 2010 \[     andrei 1853                /opt/google/chrome/chrome \] MEM LIMIT EXCEED: 2.70 (MAX: 1.00)
Mon Nov  8 00:01:08 EET 2010 \[     andrei 2054                           gnome-terminal \] CPU LIMIT EXCEED: 1.50 (MAX: 1.00)
Mon Nov  8 00:01:08 EET 2010 \[     andrei 2058                                     bash \] CPU LIMIT EXCEED: 1.70 (MAX: 1.00)

The output can then be redirected to a file (>>) and interpreted as:

> \[  \] MEM/CPU LIMIT EXCEED:  (max: MAXIMUM\_LIMIT for CPU/MEM)

In this form the script support the following variables:

<table border="1"><tbody><tr><td><pre>MEM_LIMIT</pre></td><td>A float number (integers are accepted)&nbsp;representing&nbsp;the maximum memory percent a process can use before triggering the alarm .</td></tr><tr><td><pre>CPU_LIMIT</pre></td><td>A float number (integers are accepted) representing the maximum</td></tr><tr><td><pre>SEC_INT</pre></td><td>The pause in the main loop . Every SEC_INT the process will be scanned</td></tr></tbody></table>

Those variables are passed as awk variables whilst using the ' -v ' flag .

The shortcomings of the script are obvious: sometimes a process can have a short spike of CPU consumption, so false positives may appear . Probably the best thing to do will be to write another script to analyze the log, and see how many times a certain command is repeated . For example the log should be 'grep'ed to find a certain command, then use the 'wc' utility the count how many times the process triggered the alarm . All in all the problem worthed a try !
