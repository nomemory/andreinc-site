---
title: "Bash Scripting - Best Practices"
date: "2011-09-04"
classes: wide
categories:
  - "shell"  
tags:
  - "bash"
  - "best-practices"
  - "echo-errors"
  - "portable-shebang"
  - "sanity-checks"
  - "shebang"
  - "stderr"
  - "stdout"
  - "test-for-read-write-access"
  - "test-if-program-is-in-path"
  - "test-if-script-is-run-by-user"
---

A list of best practices when writing bash scripts:

# Use a portable shebang

> In computing, a shebang is the character sequence consisting of the characters number sign and exclamation mark (#!) at the beginning of a script. (source [wikipedia](https://en.wikipedia.org/wiki/Shebang_(Unix)))

Use:

```shell
#!/usr/bin/env bash
```

instead of

```shell
#!/bin/bash
```

`bash` can have various locations Eg.: `/sbin/bash` , `/usr/local/bin/bash`, `/usr/bin/bash`

_Note: This is not only to be applied to `bash`, but to other shells or scripting languages._

# Perform "Sanity Checks"

**Sanity checks** are run-time tests that protect the script from running in _unsuitable_ environments .

Before running the actual code of your script, do some checks to assure that nothing unexpected will happen .

Don't forget to include meaningful error messages if one of the sanity checks fails.

Examples of common checks performed in bash scripts:

* [Test if the script is being run by the correct user](#test-if-the-script-is-being-run-by-the-correct-user)
* [Test if you have read / write access in certain locations](#test-if-you-have-read--write-access-in-certain-locations) 
* [Test if everything needed is in `$PATH`](#test-if-everything-needed-is-in-path)

## Test if the script is being run by the correct user

```shell
#!/usr/bin/env bash

# Sanity Check: Test if the script runs as root
if [ "$(whoami)" != root ] ; then
    echo -e "\nPlease run this script as root!\n" >&2
    exit 1
fi

echo -e "\nYou are root!"
```

## Test if you have read / write access in certain locations

```shell
#!/usr/bin/env bash

#!/usr/bin/env bash

#Global declaration area
declare -r T_PATH1="/etc/passwd"

#Sanity check: Test if /etc/passwd file exists and has read access .
if [ ! -r "$T_PATH1" ] ; then
    echo -e "$T_PATH1 is not accesible!"  >&2
    exit 1
else
    echo -e "$T_PATH1 is accesible!"
    exit 0
fi

# ...
```

## Test if everything needed is in `$PATH`

If you are planning to use a "non-standard command", don't forget to test its existence first (in this way you can safely rely on it):

```shell
#!/usr/bin/env bash

#Global declaration area
declare -r T_CMDS="xmlstarlet wget curl someprogram"

#Sanity check: Test if commands are in $PATH
for t_cmd in $T_CMDS
do
    type -P $t_cmd >> /dev/null && : || {
        echo -e "$t_cmd not found in PATH ." >&2
        exit 1
    }
done

#Do something with xmlstarlet, wget, curl and "someprogram"

# ...

# ...
```


# Clean up after yourself

It's a very common for bash scripts to write data in temporary files . Sometimes those temporary files can become rather large (or numerous).

```shell
#!/usr/bin/env bash

#Global declaration area
declare -r T_FILE1="/tmp/bigfile"

# Sanity Checks
# (perform sanity checks)

#Cleanup mechanism
function clean_up {
    rm -rf $T_FILE1
}
#Will trigger clean_up on EXIT or when receiving SIGQUIT, SIGKILL or SIGTERM
trap "clean_up" EXIT SIGQUIT SIGKILL SIGTERM

#Create temporary files (This file will be deleted by the cleaning function
#when the script finishes or receives a "killing signal")
echo -e "Big Data" > $T_FILE1
```

By using trap we will be able to trigger our cleanup function when certain conditions are met .

#  Make good use of stdout and stderr .

It's always a sign of good taste, to echo informational messages to stdout and errors to stderr .

```shell
#!/usr/bin/env bash

#stdout
echo -e "INFO: Life's godd ." >&1

#stderr
echo -e "ERROR: Life's too short ." >&2
```

# Use `"$var"` (double quotes) when working with file variables .

In bash file names are dangerous strings that contain all kinds of "dangerous characters" like spaces, newlines or tabs .

Example:

Let's create a file called: "a file with spaces":

```shell
 $ touch "a file with spaces"
```

Now let's keep this filename in a bash variable called $var1:

```shell
$ var1="a file with spaces"
```

If we use the variable name without quotes, and we try to test the file existence, we will encounter errors:

```shell
$ [ -e $var1 ]
> bash: [: too many arguments
```

So the right approach to avoid these kind of issues if tho use the double quotes:

```shell
$ [ -e "$var1" ]
```
