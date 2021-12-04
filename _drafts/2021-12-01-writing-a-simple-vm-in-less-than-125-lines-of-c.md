---
title: "Writing a simple 4bytes VM in less than 125 lines of C"
date: "2021-12-01"
classes: wide
comments: true
usemathjax: false
excerpt: "Writing a simple VM for LC3 in less than 200 lines of C"
categories:
- "c"
tags:
- "vm"
- "lc3"
---

The intended audience for this article is:
* Undergrad students who want to understand how to write a simple Virtual Machine in a few lines of C code;
* Seasoned developers curious to understand how things are working once you get closer to the processor; 

# Virtual Machines

In the world of computing, a VM (*Virtual Machine*) is a term that refers to a system that emulates/virtualize a computer system/architecture. Broadly speaking, there are two categories of Virtual Machines:
* *System Virtual Machines* that provide a complete substitute for a real machine. They implement enough functionality that allow operating systems to function on them. They can share and manage hardware, and sometimes multiple environments can function on the same physical machine without hindering each other.
* *Process Virtual Machines* which are simpler and are designed to execute computer programs in a platform-agnostic environment. The [JVM](https://en.wikipedia.org/wiki/Java_virtual_machine) is a good example of a *Process Virtual Machine*.

In this article we will develop a simple *Process Virtual Machine* designed to execute simple computer programs in a platform-independent environment. Our *toy* Virtual Machine is based on the [LC-3 Computer Architecture](https://en.wikipedia.org/wiki/Little_Computer_3), and will be capable of interpreting and executing (a subset of) LC3 Assembly Code.

> Little Computer 3, or LC-3, is a type of computer educational programming language, an assembly language, a type of low-level programming language. It features a relatively simple instruction set, but can be used to write moderately complex assembly programs and is a viable target for a C compiler. The language is less complicated than x86 assembly but has many features similar to those in more complex languages. These features make it worthwhile for beginning instruction, so it is most often used to teach fundamentals of programming and computer architecture to computer science and computer engineering students. ([wikipedia](https://en.wikipedia.org/wiki/Little_Computer_3))

For simplicity, we deliberately stripped down our LC-3 implementation from the following features: interrupt processing, priority levels, process, status registers (PSR), privilege modes, supervisor stack, user stack. We will virtualize only the most basic hardware possible, and we will interact with the *outside* world (`stdin`, `stdout`) through `traps`.

# von Neumann model

Our LC-3 inspired VM, like most of the general purpose computers nowadays, is based on the [von Neumann](https://en.wikipedia.org/wiki/John_von_Neumann) [computer model](https://en.wikipedia.org/wiki/Von_Neumann_architecture), and it will have 3 main components: the **CPU**, the **Main Memory**, the **input**/**output** devices.

![png]({{site.url}}/assets/images/2021-12-01-writing-a-simple-vm-in-less-than-125-lines-of-c/vn.drawio.png)

The **CPU**, an abbreviation for *Central Processing Unit* is the "circuitry" that controls and manipulates data. Furthermore, the CPU is divided into three layers: **ALU**, **CU** and **Registers**.

ALU stands for *Arithmetic/Logic Unit* and represents the circuits that are actually carrying the instructions on the data (operations like ADD, XOR, Division, etc.). 

CU, an abbreviation for *Control Unit*, coordinates the activities on CPU. 

The registers are quickly accessible "slots" located at the CPU level. The ALU operates on registers. They come in small numbers (that's a relative statement, as it depends on the architecture), so the amount of data that can be *loaded* inside the CPU is limited. We use registers to interact with the *Main Memory*. A typical scenario involves loading a memory location into a register, performing some changes, and putting the data back into memory.

The **Main Memory** is imagined as an extensive "array" of `W` words of `N` bits each. Program instructions and the associated data are stored in the main memory in a binary format. Each memory *word* contains either one instruction or program data (e.g.: a number used for computation).

The **Input/Output** devices enable the computer to communicate with the outside world. 

# Implementing the VM

Our VM functions like this:
- We load the program into the main memory, and it has an "entry point" at a given memory location;
- In the `RPC` register, we keep the current instruction that we need to execute;
- We obtain the *Operation Code* (first 4 bits), and based on that, we parse the instruction;
- We execute the method associated with the given *Operation Code* (the instruction);
- We jump to the next memory slot.

![png]({{site.url}}/assets/images/2021-12-01-writing-a-simple-vm-in-less-than-125-lines-of-c/vm.drawio.png)

## The Main Memory

Our machine has `W=UINT16_MAX` words, of `N=16` bits each. From a C perspective our memory can be defined as:

```c
uint16_t PC_START = 0x3000;
uint16_t mem[UINT16_MAX] = {0};
```

`UINT16_MAX` is the maximum size of a `uint16_t` (a unsigned 16 bits integer), `UINT16_MAX=65535`. So to put things into perspective, our system is quite limited. It won't run/load programs with more than `65535` instructions. I know it sounds harsh for our current times, but computers were much more humble than this back in the day (a few decades ago). `65535` is more than enough to write a few ASCII games and keep them all in memory.

As a convention, we should start loading programs into the main memory from `0x3000` onwards. We keep the memory slots up to `0x3000` reserved for other potential components, for example, a toy operating system. But who has time for something like this?

At this point, it's a good idea to write two functions for reading (`mr(...)`) and writing (`mw(...)`) to the main memory:

```c
static inline uint16_t mr(uint16_t address) { return mem[address];  }
static inline void mw(uint16_t address, uint16_t val) { mem[address] = val; }
```

Even if this looks redundant because we can access the memory directly, in the future, we might add additional logic or impose some validations, so it's a good idea to isolate this functionality.

## The registers

Our VM has a total of 10 registers, 16 bits each:
* `R0` is a general-purpose register. We are going to also use it for reading/writing data from/to `stdin`/`stdout`;
* `R1`, `R2`,..`R7` are general purpose registers;
* `RPC` is the program counter register. It contains the memory address of the next instruction we are going to execute.
* `RCND` is the conditional register. The conditional flag gives us information about the previous operation that happened at ALU level in the CPU.

From a code perspective we can implement them as follows:

```c
enum regist { R0 = 0, R1, R2, R3, R4, R5, R6, R7, RPC, RCND, RCNT };
uint16_t reg[RCNT] = {0};
```

To access a register, we simply: `reg[R3]=...`. 

## The instructions

An instruction is a *command* we are giving to the VM. 

Through instructions we kindly ask the VM to perform a simple (and granular) task for us: read a char from the keyboard, add two numbers, perform a binary AND on a register, etc.

Instructions have the same word size as the memory, 16 bits. This is a natural decision; after all, we keep instructions loaded inside the *Main Memory*. So, from the C language perspective, instructions are  `uint16_t` unsigned integers.

Our VM supports only a limited set of instructions: `16` (actually `14`, because two LC-3 instructions didn't make any sense to implement). 

In terms of format, instructions are usually *encoded* like this:

![png]({{site.url}}/assets/images/2021-12-01-writing-a-simple-vm-in-less-than-125-lines-of-c/instr.drawio.png)

The first 4 bits are always the OpCode of the instruction. And then, depending on the instruction, there are 1,2,3,... params encoded in the remaining 12 bits.

Based on the OpCode we can identify the instruction, and understand how can we "decode"/"extract" the rest of the params from the `uint16_t`.

For extracting the OpCode itself we can write an utility macro that applies a simple bitwise trick:

```c
#define OPC(i) ((i)>>12)
```

We just shift 12 bits to the right (`i>>12`), to get the 4 most significant bits that contain the OpCode:

![png]({{site.url}}/assets/images/2021-12-01-writing-a-simple-vm-in-less-than-125-lines-of-c/opp.drawio.png)

Because OpCodes are represented on 4 bits, the maximum number of instructions we can encode are 16 (`2^4=16`).

Now, a nice trick we can perform in C (from a data modelling perspective) is to save all possible instructions (and their associated C functions) in an array. The index will represent the actual OpCode (after all, OpCodes are numbers from 0 to 15), and the value will be a pointer to the corresponding C function.

```c
#define NOPS (16) // number of instructions
typedef void (*op_ex_f)(uint16_t instruction);
//
// ... other operations here
//
static inline void add(uint16_t i)  { /* code here */ }
static inline void and(uint16_t i)  { /* code here */ }
//
// ... other operations here
//
op_ex_f op_ex[NOPS] = { 
    br, add, ld, st, jsr, and, ldr, str, rti, not, ldi, sti, jmp, res, lea, trap 
};
```

`typedef void (*op_ex_f)(uint16_t i);` is a `typedef` for a function pointer, that returns `void` and accepts one parameter the actual `uint16_t instruction`.

All instructions are now accessible if we know the OpCode:

```c
uint16_t instr = ...;
op_ex[OP(instr)](instr); // this will execute the function associated with the OP(instr) 
                         // For example if OP(instr)==0b0001 then we will execute add(instr)
                         //             if OP(instr)==0b0010 then we will execute ld(instr)
                         //             (and so on)
```

With this simple trick we can avoid having to write a `switch` statement with 16 (+1) `cases`. 

Now, let see what instructions our VM supports. As I've said earlier, I wasn't original enough to come up with my own ASM, so I've decided to copy the instructions from the LC3 specification.

| Instruction | OpCode Hex | OpCode Bin | C function | Comments |
|-- |-- |-- |-- |
| [`br`](#br---conditional-branch) | `0x0` | `0b0000` | `void br(uint16_t i)` | Conditional branch |
| `add` |`0x1` | `0b0001` | `void and(uint16_t i)` | Used for addition. |
| `ld` | `0x2` | `0b0010` | `void ld(uint16_t i)` | Load |
| `st` | `0x3` | `0b0011` | `void st(uint16_t i)` | Store |
| `jsr` | `0x4` | `0b0100` | `void jsr(uint16_t i)` | Jump to subroutine |
| `and` | `0x5` | `0b0101` | `void and(uint16_t i)` | Bitwise logical AND | 
| `ldr` | `0x6` | `0b0110` | `void ldr(uint16_t i)` | Load Base+Offset |
| `str` | `0x7` | `0b0111` | `void str(uint16_t i)` | Store base + offset |
| `rti` | `0x8` | `0b1000` | `void rti(uint16_t i)`| Return from interrupt (not implemented) |
| `not` | `0x9` | `0b1001` | `void not(uint16_t i)`| Bitwise complement |
| `ldi` | `0xA` | `0b1010` | `void ldi(uint16_t i)` | Load indirect |
| `sti` | `0xB` | `0b1011` | `void sti(uint16_t i)` | Store indirect |
| `jmp` | `0xC` | `0b1100` | `void jmp(uint16_t i)` | Jump/Return to subroutine |
|  | `0xD` | `0b1101` |  | Unused OpCode |
| `lea` | `0xE` | `0b1110` | `void lea(uint16_t i)` | Load effective address |
| `trap` | `0xF` | `0b1111`| `void trap(uint16_t i)` | System trap/call |

But before jumping into the implementation for each instruction, we must note that some operations have additional "side-effects" on the registers.

`RCND`, also known as the conditional register flag, is used to "track" additional information for some instructions. In our implementation it can have only three values:

* `1<<0` (P) - if the last operation yielded a positive result;
* `1<<1` (Z) - if the last operation yielded 0;
* `1<<2` (P) - if the last operation yielded a negative result;


# `br` - Conditional branch

This instruction is used to jump from one instruction to another (if certain conditions are satisfied).

The ASM format of the instruction is the following:

![png]({{site.url}}/assets/images/2021-12-01-writing-a-simple-vm-in-less-than-125-lines-of-c/br.drawio.png)

