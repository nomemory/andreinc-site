---
title: "4 integers are enough to write a Snake Game"
date: "2022-05-01"
classes: wide
comments: true
usemathjax: true
excerpt: "A snake written in 4 integers"
categories:
- "c"
tags:
- "snake"
- "game"
---

>... actually you can use only 2 but this will make your life a little more miserable.

![png]({{site.url}}/assets/images/2022-05-01-4-integers-are-enough-to-write-a-snake-game/snake.gif)

After *not* implementing a game of snake in ages, I've decided to do my best today, but with some strange and absurd limitations in mind, you know, to spice up things:
* We will store the game map in a `uint32_t` where `1s` will form the reptile's body. The map will contain `4x8` positions. Enough to have fun!
* We will keep another `uint64_t` as a directions array - this will be useful to move the snake around, while keeping its growing shape intact;
* We will squeeze another four 5 bits integers in an `uint32_t` to keep the positions of the `head`, the `tail`, the `apple`, and the (current) `length`. Any input from the keyboard will also be kept here (2 bits will be enough).
* We will keep a 8 bit (`uint8_t`) variable for looping.

Because there's no standard C-way of interacting with the keyboard, I will have to rely on `curses`, so if you want to compile the program, make sure you have the lib installed on your system. If you using the right type of operating system, chances are it's already there. If not you can certainly install it from your favorite package manager. 

Unfortunately,`curses` uses additional memory by itself, but let's be honest, hacking with arcane escape chars and low level system functions is not fun, and certainly not something that I am willing to try by myself. Yes, it's cheating, and this article is a fraud! 

Before continue reading (if you haven't stopped by now), note that the code should be taken as a twisted joke, or as an exercise in minimalism, or as both, probably a joke. Because of the aforementioned limitations, we are going to write some nasty macros to perform bitwise operations, use global variables, reuse the same counter, etc. This is not a good example of readable or elegant code.

# The code

Everything is available on GitHub:

```
git clone git@github.com:nomemory/integers-snake.git
```

To compile and run the program:

```
gcc -Wall snake.c -lcurses && ./a.out
```

## The memory layout

We will start by defining the 4 integers that will hold all our game data:

```cpp
uint32_t map = ...;
uint32_t vars = ...;
uint64_t shape = ...;
int8_t i = ...;    
```

### `map`
`map` is what we are going to display on the screen. The `32` bits of `map` will form a `4x8` grid that will be rendered using curses:

![png]({{site.url}}/assets/images/2022-05-01-4-integers-are-enough-to-write-a-snake-game/map.drawio.png)

To access the memory and set bits to zero or one, we can use the following macros:

```cpp
#define s_is_set(b) ((map&(1<<(b)))!=0)
#define s_tog(b) (map^=(1<<(b)))
#define s_set_0(b) (map&=~(1<<b))
#define s_set_1(b) (map|=(1<<b))
```

### `vars`

`vars` is a `32` bits integer where will keep the following data:

![png]({{site.url}}/assets/images/2022-05-01-4-integers-are-enough-to-write-a-snake-game/vars.drawio.png)

* `hpos` (from bit `0` to `4`) represents the head position of the snake as an offset from the map's LSB;
* `tpos` (from bit `5` to `9`) represents the tail position of the snake as an offset from the map's LSB;
* `len` (from bit `10` to `14`) represents the length of the snake;
* `apos` (from bit `15` to `19`) represents the apple position as an offset from the map's LSB;
* `chdir` (from bit `20` to `21`) represents the last key pressed, `2` bits are enough, because only arrows are registered;
* the remaining bits are not used;

To access `hpos`, `tpos`, etc. we have defined the following macros:

```cpp
#define s_mask(start,len) (s_ls_bits(len)<<(start))
#define s_prep(y,start,len) (((y)&s_ls_bits(len))<<(start))
#define s_get(y,start,len) (((y)>>(start))&s_ls_bits(len))
#define s_set(x,bf,start,len) (x=((x)&~s_mask(start,len))|s_prep(bf,start,len))
#define s_hpos s_get(vars,0,5)
#define s_tpos s_get(vars,5,5)
#define s_len s_get(vars,10,5)
#define s_apos s_get(vars,15,5)
#define s_chdir s_get(vars,20,2)
#define s_hpos_set(pos) s_set(vars,pos,0,5)
#define s_tpos_set(pos) s_set(vars,pos,5,5)
#define s_len_set(len) s_set(vars,len,10,5)
#define s_apos_set(app) s_set(vars,app,15,5)
#define s_chdir_set(cdir) s_set(vars,cdir,20,2)
#define s_len_inc s_len_set(s_len+1)
```

For more information, describing the technique behind the macros, please read the following article: [*Working with bits and bitfields*](https://www.coranac.com/documents/working-with-bits-and-bitfields/).

### `shape`

`shape` keeps the directions for each cell of the snake. `2` bits per direction are enough, so we can keep a total of 32 directions:

![png]({{site.url}}/assets/images/2022-05-01-4-integers-are-enough-to-write-a-snake-game/shape.drawio.png)

The possible directions are mapped using the following macros:

```cpp
#define SU 0                       
#define SD 1                       
#define SL 2                       
#define SR 3
```

Each time the snake moves inside the `map` grid, we cycle through the directions, with the following macros: 

```cpp
#define s_hdir ((shape>>(s_len*2)&3))
#define s_tdir (shape&3)
#define s_hdir_set(d) s_set(shape,d,s_len*2,2)
#define s_tdir_set(d) s_set(shape,d,0,2)
#define s_shape_rot(nd) do { shape>>=2; s_hdir_set(nd); } while(0);
#define s_shape_add(nd) do { s_len_inc; shape<<=2; s_tdir_set(nd); } while(0);
```

When the snake moves, without eating an apple we call `s_shape_rot` that removes the last direction, and pushes a new head (based on `s_chdir`).
When the snake moves and eats an apple we call `s_shape_add` that increases the length, and adds pushes a new tail `s_tdir`.

## The game loop

The game loop looks like this:

```cpp
#define s_init do { srand(time(0)); initscr(); keypad(stdscr, TRUE); cbreak(); noecho(); } while(0);
#define s_exit(e) do { endwin(); exit(e); } while(0);
#define s_key_press(k1, k2) if (s_hdir==k2) break; s_chdir_set(k1); break;

int main(void) {
    s_init; // initialize the curses context
    rnd_apple(); // creates a random position for the apple
    while(1) {
        show_map(); // renders the map on screen
        timeout(80); // getch() timeouts after waiting for user input
        switch (getch()) {
            case KEY_UP : { s_key_press(SU, SD) }; 
            case KEY_DOWN : { s_key_press(SD, SU) };
            case KEY_LEFT : { s_key_press(SL, SR) };
            case KEY_RIGHT : { s_key_press(SR, SL) };
            case 'q' : exit(0); // Quits the game
        }
        move_snake(); // The snake moves inside the grid
        s_shape_rot(s_chdir); // The shape is getting updated
        napms(200); // frame rate :))
    }
    s_exit(0); // games exits
}
```    

Each time a key is pressed `s_key_press` is expanded. This checks if the movement is possible, and then updates the `s_chdir` (using `s_chdir_set`).

### The function that moves the snake:

`move_snake()` is where most of our logic is implemented:

```cpp
#define s_next_l s_mask5(s_hpos+1)
#define s_next_r s_mask5(s_hpos-1)
#define s_next_u s_mask5(s_hpos+8)
#define s_next_d s_mask5(s_hpos-8)
// Check if a left movement is possible. 
static void check_l() { if ((s_mod_p2(s_next_l,8) < s_mod_p2(s_hpos,8)) || s_is_set(s_next_l)) s_exit(-1); }
// Check if a right movement is possible. 
static void check_r() { if ((s_mod_p2(s_next_r,8) > s_mod_p2(s_hpos,8)) || s_is_set(s_next_r)) s_exit(-1); }
// Check if a up movement is possible
static void check_u() { if ((s_next_u < s_hpos) || s_is_set(s_next_u)) s_exit(-1); }
// Check if a down movement is possible
static void check_d() { if ((s_next_d > s_hpos) || s_is_set(s_next_d)) s_exit(-1); }
static void move_snake() {
    if (s_hdir==SL) { check_l(); s_hpos_set(s_hpos+1); } 
    else if (s_hdir==SR) { check_r(); s_hpos_set(s_hpos-1); } 
    else if (s_hdir==SU) { check_u(); s_hpos_set(s_hpos+8); }
    else if (s_hdir==SD) { check_d(); s_hpos_set(s_hpos-8); }
    // Sets the bit based on the current s_hdir and s_hpos
    s_set_1(s_hpos);
    // If an apple is ate
    if (s_apos==s_hpos) {
        // We generate another apple
        rnd_apple();
        // Append to the tail
        s_shape_add(s_tdir);
        // We stop clearning the tail bit
        return;
    }
    // Clear the tail bit
    s_set_0(s_tpos);
    // Update the t_pos so we can clear the next tail bit when the snake moves
    if (s_tdir==SL) { s_tpos_set(s_tpos+1); } 
    else if (s_tdir==SR) { s_tpos_set(s_tpos-1); } 
    else if (s_tdir==SU) { s_tpos_set(s_tpos+8); } 
    else if (s_tdir==SD) { s_tpos_set(s_tpos-8); }
}
```

### The function that displays the snake

This is the last function we are going to implement:

```cpp
static void show_map() {
    clear();
    i=32;
    while(i-->0) {
        // If the bit is an apple, we render the apple '@'
        if (i==s_apos) { addch('@'); addch(' '); }
        // We draw either the snake bit ('#') or the empty bit ('.')
        else { addch(s_is_set(i) ? '#':'.'); addch(' '); }
        // We construct the grid by inserting a new line
        if (!s_mod_p2(i,8)) { addch('\n'); }
    };
}
```

# Final thoughts

It was a fun exercise. The full code can be found [here](https://github.com/nomemory/integers-snake/blob/main/snake.c), it's around 100 lines, and 4 integers. 

If the snake moves to fast on your terminal, you can tweak the `s_napms` by increasing it.


