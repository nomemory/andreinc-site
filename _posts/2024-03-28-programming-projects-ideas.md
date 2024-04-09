---
title: "My list of challenging software projects some programmers should try"
date: "2024-03-28"
classes: wide
comments: true
excerpt: "Unsolicited advice"
usekatex: true
categories:
- "programming"
- "career"
tags:
- "2024"

---

Before we begin, I'd like to clarify that the project ideas I am about to suggest are mainly intended for those who are interested in exploring new areas of knowledge. However, it's important to note that most of these ideas may not be relevant to today's job market. If you're looking to add something impressive to your portfolio for recruitment purposes, it might be worth considering other options. For example, instead of building yet another TODO app in React (75k repos on GitHub), you might want to focus on back-end or front-end development by cloning a well-known site. Such projects are likely to be more beneficial in terms of knowledge gained and job perspectives.

That said, some developers are more interested in exploring creative fields beyond the traditional job market. For these individuals, programming is more of a hobby than a means of earning a living. If you fall into this category, you may find the following project suggestions more appealing.

You can also check other articles on this topic:
* [Challenging projects every programmer should try](https://austinhenley.com/blog/challengingprojects.html)
* [More challenging projects every programmer should try](https://austinhenley.com/blog/morechallengingprojects.html)
* [Challenging algorithms and data structures every programmer should try](https://austinhenley.com/blog/morechallengingprojects.html)
* [(Even more) challenging programming projects you should try](https://jamesg.blog/2024/02/28/programming-projects/)

---

# My list

- [Lesser Known Data Structures](#lesser-known-data-structures)
- [Write a distributed Hash Table](#write-a-distributed-hash-table)
- [Write a *scientific* calculator](#write-a-scientific-calculator)
- [Write your own HTTP Server in C + POSIX](#write-your-own-http-server-in-c--posix)
- [Write an esoteric programming language](#write-an-esoteric-programming-language)
- [Write your own Virtual Machine](#write-your-own-virtual-machine)
- [Write a game for UXN ](#write-a-game-for-uxn)
- [Write a game for TIC-80](#write-a-game-for-tic-80)
- [Write your original markdown language](#write-your-original-markdown-language)
- [Write a static site-generator](#write-a-static-site-generator)
- [Mandelbrot Set Navigator](#mandelbrot-set-navigator)
- [Simulate various phenomena from physics](#simulate-various-phenomena-from-physics)
- [Experiment with Conway's Game Of Life](#experiment-with-conways-game-of-life)
- [Approximate the reality with polynomials](#approximate-reality-with-polynomials)
- [A calculator for symbolic differentiation](#a-calculator-for-symbolic-differentiation)
- [A slot machine](#a-slot-machine)
- [Write a game engine for text-based adventures](#write-a-game-engine-for-text-based-games)
- [A tiling window manager](#write-a-tiling-window-manager)

---

# Lesser Known Data Structures

For example, [Austin Z. Henley](https://austinhenley.com/) recommends writing your own [Topological Sort](https://en.wikipedia.org/wiki/Topological_sorting), [Recursive Descent Tree Parsing](https://en.wikipedia.org/wiki/Recursive_descent_parser), [Bloom Filter](https://en.wikipedia.org/wiki/Bloom_filter), [Piece Table](https://en.wikipedia.org/wiki/Piece_table), [Splay Tree](https://en.wikipedia.org/wiki/Splay_tree) implementations.

The truth is that many Computer Science curricula have been diluted. In fact, some schools only teach the basics, such as Dynamic Arrays, Linked Lists, Queues, Stacks, and Hash Tables. However, there are many other Data Structures and Algorithms that are worth exploring beyond these fundamental concepts.

Personally, I would also go for: 

* [B-Tree](https://en.wikipedia.org/wiki/B-tree) - I would defintely implement this one. It's an interesting data structure that is used in database systems or filesystems. It also opens you to new ways of thinking about improving your memory and data layout in your applications;
* [Circular Buffer](https://en.wikipedia.org/wiki/Circular_buffer) -  This is a data structure that solves the Consumer-Producer problem elegantly, especially when the Consumer cannot (momentarily) keep up with the Producer.
* [Cuckoo Filter](https://en.wikipedia.org/wiki/Cuckoo_filter) and [Cuckoo Hash Table](https://en.wikipedia.org/wiki/Cuckoo_hashing) - The practicality of the *Cuckoo* approach is yet to be proven, but this is definitely something that's worth your time for fun purposes. Simply put, the idea behind those data structures is fun and creative.
* [Open-Addressing Hash Tables](https://en.wikipedia.org/wiki/Open_addressing) - Most schools and courses focus on the Separate Chaining technique and blatantly ignore the elegant ways of *open addressing*. So why don't you want write a few open-addressing implementations and benchmark them against existing library implementations? Try to make your implementation faster, brag, and learn.

# Write a distributed Hash Table

If you already know how to write your own *Hash Table*, building a [*Distributed Hash Table*](https://en.wikipedia.org/wiki/Distributed_hash_table) won't be an impossible task. Although it might seem like a complicated project, it doesn't necessarily have to be *production-ready* or become the next Redis.

By the end of the project, you will likely become more comfortable with network programming and managing concurrency issues. 

Bonus: Thoroughly testing your DHT will be a journey in itself.

<sup>Don't get demotivated if you get stuck or the result is terrible!</sup>

---

# Write a *scientific* calculator

This is a relatively easy project, but it's worth witnessing the power of the *Stack* data structure. You can do this by learning how to evaluate [RPN expressions](https://en.wikipedia.org/wiki/Reverse_Polish_notation) and implementing the [Shunting Yard algorithm](https://en.wikipedia.org/wiki/Shunting_yard_algorithm). As you work on this project, challenge yourself to learn a new GUI library, one that you haven't touched before.

Once you have a working calculator, start exploring crazy ideas:

1. Implement your own [sine function](https://androidcalculator.com/how-do-calculators-compute-sine/) just for the thrills. 
2. Implement your own big numbers library to operate on huge numbers.
3. Can your calculator handle raising `3` to the power of `2.27`?
4. Write a module that enables users to operate on matrices, including adding, multiplying, calculating the inverse, computing the determinant, and solving systems of linear equations, among other things.
5. Can your calculator check if a number is prime?
6. Can you write a module that gives the user random insights about numbers?

It can also work in the [browser](http://numcalc.com/).

---

# Write your own HTTP Server in C + POSIX

<sup>*First, start learning C if you haven't already. Contrary to popular belief, learning C early in your career will make you a better programmer in the long-run. I am more convinced of this now than I ever was before. However, this is not the time or the article to support my claim.*</sup>

When implementing the HTTP protocol, keep in mind that you don't have to cover everything. The purpose of this exercise is not to write the fastest HTTP server out there. Instead, you do it to:

* Accumulate frustrations that come with dealing with `char*` frequently. Of course, you can create an abstraction over `char*` to solve this problem, and while it may be buggy, it will be uniquely yours!
* Learn about `fork()`, `pthreads`, and all the other low-level knowledge you don't usually have to deal with, except in your Operating Systems course.
* Gain an understanding of how TCP and Networking Programming work.

If mentioning C has offended you, you can always rewrite the project in Rust. That would be *new*.

---

# Write an esoteric programming language

<sup>*An esoteric programming language (sometimes shortened to esolang) is a programming language designed to test the boundaries of computer programming language design, as a proof of concept, as software art, as a hacking interface to another language (particularly functional programming or procedural programming languages), or as a joke. ([source](https://en.wikipedia.org/wiki/Esoteric_programming_language))*</sup>

This is a side project that lets you unleash your creativity. Here are some tips to help you get started:

1. Your language can have a simple grammar, so you don't need to use [a parser generator](https://en.wikipedia.org/wiki/Comparison_of_parser_generators). Write the parser yourself. An [APL](https://en.wikipedia.org/wiki/APL_(programming_language))-like language with a limited set of *special graphic symbols* is not impossible to implement or parse. 
2. Have you heard of [UIUA](https://www.uiua.org/) ?
3. Altough it may seem like a long shot, take a look at [Tsevhu](https://www.reddit.com/r/tsevhu/comments/iserji/tsevhu_key_activity/) and [Koilang](https://gammagames.itch.io/koilang). Tsevhu is not a programming language but a language in itself. Can you create similar with code?
4. Speaking of Koilang, have you checked out [piet](https://www.dangermouse.net/esoteric/piet.html)?
5. It can also be a better joke than the [Albanian Laundry Machine](https://esolangs.org/wiki/Albanian_Laundry_Machine).

For more inspiration, check the esolangs [wiki](https://esolangs.org/wiki/Language_list).

---

# Write your own Virtual Machine

I've personally tackled this challenge (check this [article]({{site.url}}/2021/12/01/writing-a-simple-vm-in-less-than-125-lines-of-c)). However, I regret not designing an original set of instructions and instead implementing the [LC-3](https://en.wikipedia.org/wiki/Little_Computer_3) instruction set.

Your project can be register-based, stack-based, or a hybrid. It can even have a JIT compiler if you are feeling brave.


Whatever you choose to do, the key is to be creative. 

For instance, please look at [uxn](https://100r.co/site/uxn.html), which can run on multiple operating Systems or devices, and has a small community of dans writing [software for it](https://github.com/hundredrabbits/awesome-uxn#applications). Even [tsoding](https://www.twitch.tv/tsoding), one of my favourite Tech Youtubers, recently [implemented Conway's Game Of Life as an uxn program](https://www.youtube.com/watch?v=rTb6NFKUmQU).

---

# Write a game for UXN 

Firstly, understand how [uxn](https://100r.co/site/uxn.html) works by reading the official documentation or by following [this excellent tutorial](https://compudanzas.net/uxn_tutorial.html).

Look at existing examples:
* [flappy bird](https://github.com/keijiro/uxn-sketches/blob/main/flappy.tal)
* [snake](https://git.sr.ht/~rabbits/uxn/tree/main/item/projects/examples/demos/snake.tal)

Come up with an original game idea. 

Everyone seems to prefer Snake, Tetris, Pong, and Space Invaders. But there are other (now forgotten) games that deserve your attention.

Why don't you try implementing something different:
* [Volfied](https://www.retrogames.cz/play_1653-DOS.php);
* [Q*Bert](https://www.retrogames.cz/play_023-NES.php);
* [Jumping Jack](https://www.gamesdatabase.org/game/sinclair-zx-spectrum/jumping-jack)

---

# Write a game for TIC-80

[TIC-80](https://tic80.com/) is a fantasy computer for making, playing, and sharing tiny games. 

If you don't know what game to write, take inspiration from [here](https://tic80.com/play).

This is more of an artistic project than a programming one, but still.

---

# Write your original markdown language

1. Write a markdown language that is not precisely markdown but something alien.

2. Extend an existing markdown implementation. You can get inspiration from [LiaScript](https://liascript.github.io/) or [R Markdown](https://rmarkdown.rstudio.com/).

---

# Write a static site-generator

Yes, it's boring, but something needs to use the newly invented markdown language.

---

# Mandelbrot Set Navigator

You don't have to be [Arthur C. Clarke](https://www.youtube.com/watch?v=5qXSeNKXNPQ) or a mathematican to appreciate the useless beauty of the [Mandelbrot Set](https://en.wikipedia.org/wiki/Mandelbrot_set). 

Have you ever considered building your own Mandelbrot Set Explorer using HTML Canvas? There are plenty of examples on the internet:
* [https://mandelbrot.site/](https://mandelbrot.site/)
* [https://mandelbrot.silversky.dev/](https://mandelbrot.silversky.dev/)
* [https://mandelbrotandco.com/en.hub169.html](https://mandelbrotandco.com/en.hub169.html)
* [https://mandelbrot.page/](https://mandelbrot.page/)
* [https://mandelbrot.jayvv.com/](https://mandelbrot.jayvv.com/)

Add a creative touch! For example:
* To make your Mandelbrot Set Navigator unique, you can incorporate an intelligent coordinate system to help you navigate through infinity.
* Additionally, you can add a bookmark feature so you can save and revisit interesting patterns that you discover during your exploration. For instance, if you stumble upon the [Elephant Valley](https://math.stackexchange.com/questions/2979906/are-there-any-unique-places-in-the-mandelbrot-set-that-have-not-yet-been-seen-gr), you can bookmark the location for future reference and easily share it with others.

---

# Simulate various phenomena from physics

Start with optics; it might be easier, and there are tons of examples on the internet:
* [https://www.oeabt.com/en/dome/](https://www.oeabt.com/en/dome/)
* [https://phet.colorado.edu/sims/html/geometric-optics/latest/geometric-optics_en.html](https://phet.colorado.edu/sims/html/geometric-optics/latest/geometric-optics_en.html)

If you understand what you are doing, jump to other areas:
* [https://github.com/cselab/aphros?tab=readme-ov-file](https://github.com/cselab/aphros?tab=readme-ov-file)

Start small and slowly become [Bartosz Ciechanowski](https://ciechanow.ski/).

---

# Experiment with Conway's Game Of Life

I suppose you are already familiar with [Conway's Game Of Life](https://en.wikipedia.org/wiki/Conway's_Game_of_Life).

Make something creative out of it:
- Change the rules, add more states, add colors, emoticons and animations;
- Put the cells in a labyrinth, add portals, let the cells teleport;
- Write a slot machine that's powered this cellular automaton;
- Interfere with the cells in real-time, see how they react, throw them some meat;

There's so much you can do.

---

# Approximate reality with polynomials

If you've studied computer graphics, you might've encountered the concept of [Bezier Curves](https://en.wikipedia.org/wiki/B%C3%A9zier_curve). Why don't you start approximating *reality* with them?

Some fans of [Pierre Bezier](https://en.wikipedia.org/wiki/Pierre_B%C3%A9zier) and [Jamiroquai](https://en.wikipedia.org/wiki/Jamiroquai) have already played this game:
* [Virtual Insanity but, it's in Desmos Graphing Calculator](https://www.youtube.com/watch?v=P2kkBtmozr4);
* [Virtual Insanity but, it's played on an oscilloscope](https://www.youtube.com/watch?v=zGlZqDHqhR0).
* [Desmos Bezier Renderer](https://github.com/kevinjycui/DesmosBezierRenderer)

Maybe now it's your time to write a different renderer. 

Why don't you pick sines and cosines instead of polynomials? I hope you see where [I am going](https://www.youtube.com/watch?v=-qgreAUpPwM).

---

# A calculator for symbolic differentiation

<sup>To understand what I am referring to, check this question on [StackOverflow](https://stackoverflow.com/questions/43455320/difference-between-symbolic-differentiation-and-automatic-differentiation).</sup>

This is going to be a challenging project, but not as hard as you would imagine. Basically, you need to come up with something WolframAlpha is [already capable of](https://www.wolframalpha.com/input?i=derivative++x%5E2*cos%28x-7%29%2F%28sin%28x%29%29).

You will have to be able to parse mathematical expressions. Then, you will have to (recursively) apply specific rules for differentiation (e.g. the [chain](https://en.wikipedia.org/wiki/Chain_rule) and [product](https://en.wikipedia.org/wiki/Product_rule)). In the end, you will have to *simplify* the resulting expression.

You don't have to implement everything. 

You will have to remember the fundamentals of calculus.

It's going to be fun.

---

# A slot machine 

... In the name of science.

I wouldn't put to much effort into the graphics. It's not like you want to contribute to people's misfortune and addiction. But the [mathematics behind a slot machine](https://www.youtube.com/watch?v=BFlRH99TQOw) can be interesting, plus you can be *creative*:

* Why don't you write a $$\pi$$ slot machine that uses the decimals of $$\pi$$ to give prizes.
* Why don't you use a Game Of Life Slot Machine, where you stop on specific cell configurations and give prizes;
* Why don't you build a Sinusoidal Slot Machine (you can get inspiration from a previous project of mine called [The Sinusoidal Tetris]({{site.url}}/2024/02/06/the-sinusoidal-tetris)).

# Write a game engine for text-based games

<sup>This idea was suggested by @snej on the [lobste.rs](https://lobste.rs/s/5fsjpu/my_list_challenging_software_projects)</sup>

Few of our generation have played *text-based* games, and it's fine - we need to put our hardware to better use than rendering fonts in a terminal. 

But there was a time when games like [Zork](https://playclassic.games/games/adventure-dos-games-online/the-hitchhikers-guide-to-the-galaxy/play/) or [Colossal Cave](https://rickadams.org/adventure/advent/) were extremely popular. 

So why don't you build a game engine for text-based adventures? 

Make the engine *cross-platform* - allow the game to work in the terminal, browser, or an [SDL](https://en.wikipedia.org/wiki/Simple_DirectMedia_Layer) window.

Or leave it terminal only. There are beautiful TUI libraries nowadays, so you don't have to stay cursed because you are stuck with [ncurses](https://en.wikipedia.org/wiki/Ncurses):

* [bubbletea](https://github.com/charmbracelet/bubbletea)
* [CursedGL](https://github.com/saccharineboi/CursedGL)
* ... or check out [this list](https://github.com/rothgar/awesome-tuis?tab=readme-ov-file).

# Write a Tiling Window Manager

Now that [Wayland](https://en.wikipedia.org/wiki/Wayland_(protocol)) is almost here, I am sure there's a lot of *new* room for creativity. Look at [sway](https://swaywm.org/).

Ok, writing a [Tiling Window Manager](https://en.wikipedia.org/wiki/Tiling_window_manager) is not the most approachable project you can think of. But at the same time, you can keep things simple. For example, XMonad, when launched, had roughly 1000 lines of code. 










































