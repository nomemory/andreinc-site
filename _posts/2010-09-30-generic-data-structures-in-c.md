---
title: "Generic data structures in C"
date: "2010-09-30"
classes: wide
excerpt: "A short tutorial on how to write generic code in C."
categories: 
  - "c" 
  - "algorithms" 
tags: 
  - "advanced"
  - "advanced-c"
  - "c-generics"
  - "c-tutorial"
  - "c-templates"
  - "code-wizard"
  - "compile-time"
  - "data-structure"
  - "generic"
  - "generic-programming"
  - "generic-stack"
  - "generics"
  - "glib"
  - "java-2"
  - "java-generics"
  - "macro"
  - "macro-concatenation"
  - "macro-stringification"
  - "macros"
  - "preprocessor"
  - "preprocessor-hack"
  - "stack"
  - "templates"
---

> This tutorial assumes basic familiarity with **C macros**, **pointers**, and simple **data structures**.  The C language does not provide built-in generics or templates (like C++, C# or Java), but with a few techniques we *can* emulate them. This tutorial is old.

In this post we explore two classic approaches:

* [Using the C preprocessor (`#define` magic)](#generic-data-structures-using-the-c-preprocessor)
* [Using the flexibility of the void pointer (`void*`)](#generic-data-structures-using-void)

There are excellent generic C libraries already available, but understanding the underlying techniques is...  educational. A GitHub repository containing all code from this article is available here:

```
git clone nomemory/blog-generic-data-structures-in-c
```

# Generic Data Structures Using the C Preprocessor

To understand the "magic" (it’s not really magic, just clever abuse), you should be comfortable with: *object-like macros*, *function-like macros*, *stringification (`#arg`)*, *token concatenation (`arg1##arg2`)*. If you need a full refresher, GCC’s macro documentation [is excellent](https://gcc.gnu.org/onlinedocs/cpp/Macros.html): 

Below is a short overview for completeness.

## What is a macro ?

A macro is a piece of text associated with a name. Before compilation, the preprocessor replaces the macro name with the macro body. Two main kinds of macros exist: *object-like macros*, they behave like constants, and, *function-like macros*, they behave like functions (yay!).

**Example for object-like macros:**

```
#include <stdio.h> 
#define HELLO "Hello World Macro!"
int main(){
	printf(HELLO);
	return 0;
}
```

The preprocessor literally replaces `HELLO` with `"Hello World Macro!"`. Can you gess what will be the output ?

**Example for function-like macros:**

```
#include <stdio.h>
#define MAX(a, b) ((a) > (b)) ? (a) : (b)
int main(){
	printf("%dn", MAX(1,3));
	return 0;
}
``` 

Expanding `MAX(1,3)` yields: `((1) > (3) ? (1) : (3))`, so the actual code that gets compiled is:

```
#include <stdio.h>
int main(){
	printf("%dn", ((1) > (3) ? (1) : (3)));
	return 0;
}
```

## Token concatenation (`##`)

Token concatenation allows you to merge tokens into identifiers.

```
#include <stdio.h> 
#define SHOW(type, msg) show_##type(msg)
void show_error(char *);
void show_info(char *);

void show_error(char *message) {
    fprintf(stderr, "ERROR: %s", message);
}

void show_info(char *message){
    fprintf(stdout, "INFO: %s", message);
}

int main(){
    SHOW(error, "An errorn");
    SHOW(info, "Some messagen");
    return (0);
}
```

Output:

```
ERROR: An error
INFO: Some message
```

This technique is the cornerstone of macro-based generic data structures.


# Writing a generic stack using macros

We want a macro that declares: the struct type, the `push()` function, the `pop()` function. And we want all names to depend on the generic parameter.

```
#define STACK_DECLARE(type)                                      \
typedef struct stack_##type##_s {                                \
    type data;                                                   \
    struct stack_##type##_s *next;                               \
} stack_##type;                                                  \
                                                                 \
void stack_##type##_push(stack_##type **stack, type data);       \
type stack_##type##_pop(stack_##type **stack);
```

Depending on the type supplied as the argument, different code will be generated. A macro can be associated with blocks of code, we just need to use `\` to signal a multi-line macro.


```
#define STACK_DEFINE(type)                                      \
void stack_##type##_push(stack_##type **stack, type data) {     \
    stack_##type *new_node = malloc(sizeof(*new_node));         \
    if (NULL == new_node) {                                     \
        fputs("Couldn't allocate memoryn", stderr);             \
        abort();                                                \
    }                                                           \
    new_node->data = data;                                      \
    new_node->next = *stack;                                    \
    *stack = new_node;                                          \
}                                                               \
type stack_##type##_pop(stack_##type **stack) {                 \
    if (NULL == stack || NULL == *stack){                       \
        fputs("Stack underflow", stderr);                       \
        abort();                                                \
    }                                                           \
    stack_##type *top = *stack;                                 \
    type value = top->data;                                     \
    *stack = top->next;                                         \
    free(top);                                                  \
    return value;                                               \
}                                                               \
```

Finally the implementation for the `pop()` and `push()` functions:

```
#define STACK_DEFINE(type)                                      \
void stack_##type##_push(stack_##type **stack, type data) {     \
    stack_##type *new_node = malloc(sizeof(*new_node));         \
    if (NULL == new_node) {                                     \
        fputs("Couldn't allocate memoryn", stderr);             \
        abort();                                                \
    }                                                           \
    new_node->data = data;                                      \
    new_node->next = *stack;                                    \
    *stack = new_node;                                          \
}                                                               \
type stack_##type##_pop(stack_##type **stack) {                 \                  
    if (NULL == stack || NULL == *stack){                       \
        fputs("Stack underflow", stderr);                       \    
        abort();                                                \                                                    
    }                                                           \    
    stack_##type *top = *stack;                                 \
    type value = top->data;                                     \    
    *stack = top->next;                                         \
    free(top);                                                  \
    return value;                                               \    
}                                                               \
```

Expanding with `type = int` produces real functions:

```
/* Expansion if int is supplied as the macro argument */
void stack_int_push(stack_int **stack, int data) {
    stack_int *new_node = malloc(sizeof(*new_node));
    if (NULL == new_node) {
        fputs("Couldn't allocate memoryn", stderr);
        abort();
    }
    new_node->data = data;
    new_node->next = *stack;
    *stack = new_node;
}
int stack_int_pop(stack_int **stack) {
    if (NULL == stack || NULL == *stack) {
        fputs("Stack underflow.n", stderr);
        abort();
    }
    stack_int *top = *stack;
    int value = top->data;
    *stack = top->next;
    free(top);
    return value;
}
```

Putting all together:

```
#include <stdio.h>
#include <stdlib.h>
#include "generic_queue.h" /* the header file where we */
                           /* declared and defined our implementation*/

STACK_DECLARE(int)
STACK_DEFINE(int)

STACK_DECLARE(double)
STACK_DEFINE(double)

int main() {
    STACK_TYPE(int)    *st  = NULL;
    STACK_TYPE(double) *st2 = NULL;

    for (int i = 0; i < 100; ++i) {
        STACK_PUSH(int,    &st,  i);
        STACK_PUSH(double, &st2, i * 1.0);
    }

    while (st && st2) {
        printf("POP: %d %.2f\n",
            STACK_POP(int, &st),
            STACK_POP(double, &st2)
        );
    }

    return 0;
}
``` 

The type argument cannot contain spaces or `*`. `STACK_DECLARE(unsigned long)` will not work. Use a `typedef` instead.

# Writing a generic stack using `*void`

Typecasting is one of the most powerful features of the C language. It allows you to convert values between different types, and this becomes especially important when working with pointers.

Let’s look at a few examples: you can have pointers of type `int*`, `char*`, or `float*`. These all reference concrete types. However, C also provides a special "typeless" pointer: the void pointer, written as `void*`. A `void*` can store the address of any data type, and—after casting back—it allows you to retrieve and interpret that data correctly.

This makes `void*` extremely useful for implementing generic data structures, including stacks, queues, or lists that can hold arbitrary values.

Let's start by defining the underlying `struct`:

```
typedef struct stack_s {
    void *data; // Can reference "anything" 
    struct stack_s *next; // The stack is built as a linked list
} stack;
```

The next step is defining the two main stack operations `push()` and `pop()`. Their signatures look like this:

```
void stack_push(stack **head, void *data);
void *stack_pop(stack **head);
```

The (actual) implementation:

```
void stack_push(stack **head, void *data) {
    stack *new_node = malloc(sizeof(*new_node));
    if (NULL == new_node) {
        fputs("Couldn't allocate memory\n", stderr);
        abort();
    }
    new_node->data = data;
    new_node->next = *head;
    *head = new_node;
}

void *stack_pop(stack **head) {
    stack *top;
    void *value;
    if (NULL == head || NULL == *head) {
        fputs("Stack underflow\n", stderr);
        abort();
    }
    top = *head;
    value = top->data;
    *head = top->next;
    free(top);
    return value;
}
```

The main method:

```
int main() {
    stack *s = NULL;
    int i, *tmp; 
    
    /* Add values from [1..100] into the stack */
    printf("Pushing: \n");
    
    for (i = 0; i < 100; ++i) {
        tmp = malloc(sizeof (*tmp));
        if (NULL == tmp) {
            fputs("Couldn't allocate memory \n", stderr);
            abort();
        }
        *tmp = i;
        printf("%d ", *tmp);
        stack_push(&s, tmp);
    }
    
    // Remove all elements of the stack
    
    printf("\nPopping: \n");
    while(i-->0){
        tmp = stack_pop(&s);
        printf("%d \n", *tmp);
        free(tmp);
    }
    
    return (0);
}
```

Putting all together:

```
#include <stdio.h>
#include <stdlib.h>

typedef struct stack_s {
    void *data; // Can reference "anything"
    struct stack_s *next; // The stack is built as a linked list
} stack;

void stack_push(stack **head, void *data);
void *stack_pop(stack **head);

void stack_push(stack **head, void *data) {
    stack *new_node = malloc(sizeof(*new_node));
    if (NULL == new_node) {
        fputs("Couldn't allocate memoryn", stderr);
        abort();
    }
    new_node->data = data;
    new_node->next = *head;
    *head = new_node;
}

void *stack_pop(stack **head) {
    stack *top;
    void *value;
    if (NULL == head || NULL == *head) {
        fputs("Stack underflow\n", stderr);
        abort();
    }
    top = *head;
    value = top->data;
    *head = top->next;
    free(top);
    return value;
}

int main() {
    stack *s = NULL;
    int i, *tmp;

    /* Add values from [1..100] into the stack */
    printf("Pushing: \n");

    for (i = 0; i < 100; ++i) {
        tmp = malloc(sizeof (*tmp));
        if (NULL == tmp) {
            fputs("Couldn't allocate memory\n", stderr);
            abort();
        }
        *tmp = i;
        printf("%d ", *tmp);
        stack_push(&s, tmp);
    }

    // Remove all elements of the stack

    printf("\nPopping: n");
    while(i-->0){
        tmp = stack_pop(&s);
        printf("%d ", *tmp);
        free(tmp);
    }

    return (0);
}
```
