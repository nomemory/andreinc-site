---
title: "Getting started with Zig"
date: "2023-03-01"
classes: wide
comments: true
excerpt: "Documenting my progress in learning zig"
categories:
- "zig"
tags:
- "tutorial"
---

# Installation

# Hello world

First impression after the `"Hello world"` program:

```zig
const std = @import("std");

pub fn main() void {
    std.debug.print("Hello, {s}\n", .{"World"});
}
```

Let's start with the first line: `const std = @import("std")`. I suppose this is how we are importing functions from the standard (`"std"`) library. I suppose *we are binding* the standard library to a constant (?!) variable of type unknown (!?), probably inferred, called `const std`. Let's make it look as *verbose* as Java then:

```zig
const System = @import("std"); 

pub fn main() void {
    System.debug.print("Hello, {s}\n", .{"World"});
}

// It works!
```

I am kidding, let's turn it back. `std` is much shorter, and programmers are already immune (by *absentia*) to the [*std jokes*](https://en.wikipedia.org/wiki/Sexually_transmitted_infection).

I still don't get what the `.{ }` syntax is all about!? We will probably see shortly what it means.

`pub fn main() void` - That's zig's way of saying the `main()` `fn` is `pub`, and returns `void` (nothing). It's nice that we have access modifiers. 

`std.debug.print` - It seems the `print` function is already some sort of `printf` because it knows how to print formatted strings. Does it support named arguments? Let's find out:


```zig
const std = @import("std");

pub fn main() void {
    const world = "World";       
    std.debug.print("Hello {world}", world);
}
```

But if I try to compile it, it gives me the following error:

```
/opt/homebrew/Cellar/zig/0.10.1/lib/zig/std/fmt.zig:86:9: error: expected tuple or struct argument, found *const [5:0]u8
        @compileError("expected tuple or struct argument, found " ++ @typeName(ArgsType));
```

Let me wrap inside inside the `.{}`:

```zig
const std = @import("std");

pub fn main() void {
    const world = "World";       
    std.debug.print("Hello {world}", world);
}
```



It works, the placeholder `"{world}"` gets replaced with the value of the constant `world`, that's a modern feature to like! Oh, and it seems commenting code is the same as in the C family of languages. `// Neat!`

First impressions:
- Zig seems to be a little more verbose than I anticipated;
- It gives you a *modern-programming-language* feel;
- All good, nothing fancy or unexpected.
