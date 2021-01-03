---
title: "Generic data structures in C"
date: "2010-09-30"
classes: wide
categories: 
  - "c"
  - "algorithms"
  - "programming-languages"
tags: 
  - "advanced"
  - "advanced-c"
  - "c-2"
  - "c-generics"
  - "c-tutorial"
  - "c-3"
  - "c-templates"
  - "code-wizard"
  - "compile-time"
  - "data-structure"
  - "generic"
  - "generic-programming"
  - "generic-stack"
  - "generics"
  - "glib"
  - "hacks"
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

In order to prove that [generic programming](http://en.wikipedia.org/wiki/Generic_programming) (the style of computer programming in which algorithms are written in terms of _to-be-specified-later_ types that are then_instantiated_ when needed for specific types provided as parameters) can be achieved in **C**, let's write the implementation of a generic **[Stack](http://en.wikipedia.org/wiki/Stack_(data_structure))** [data structure](http://en.wikipedia.org/wiki/Stack_(data_structure)) . We will follow two possible approaches:

* [_Hacking_ with the `#preprocessor`](#hacking-with-the-preprocessor)
* [Using the flexibility of the void pointer (`void*`)](#using-the-void-pointer-void)

You can always try both of the approaches and see which one is more suitable for your particular case . Also note that there are already generic C libraries available (see [GLib](http://library.gnome.org/devel/glib/)).

An existing [github project](https://github.com/nomemory/blog-generic-data-structures-in-c) contains all the code from this article, to clone it:

```shell
gh repo clone nomemory/blog-generic-data-structures-in-c
```

# _Hacking_ with the `#preprocessor`

To understand _the magic_ (not really) behind this approach you will need to be familiar with **C macros** and the associated concepts: _function-like macros_, _macro arguments_, _stringification_ and _concatenation_. You can find a very nice tutorial on macros **[here](http://gcc.gnu.org/onlinedocs/cpp/Macros.html)**. If you already know this, you can skip the following paragraphs (or you can read them to refresh your memory / find errors and correct me).

> _What is a macro ?_ 
> 
> A macro is a piece of code that was labeled with a name. Whenever the preprocessor encounters it, the label is replaced by the associated code. Basically there are two kinds of macros : **object-like macros** (resemble data objects when used) and **function-like macros** (resemble function calls).

_Example for object-like macros_:

```c
#include <stdio.h> 

// Macro bellow !
#define HELLO "Hello World Macro!"

int main(){
	printf(HELLO);
	return 0;
}
```

In the above example the label is `HELLO`, and the associated data is `"Hello World Macro!"`.

Before compile-time the preprocessor will replace the label with the associated code. If we compile and run the above code the output will be:

```
Hello World Macro!
```

_Example for function-like macros:_

```c
#include <stdio.h>

#define MAX(a, b) ((a) > (b)) ? (a) : (b)

int main(){
	printf("%dn", MAX(1,3));
	return 0;
}
``` 

In the case above `MAX` works exactly as a function that receives two arguments `a`, `b` and returns the maximum of the two .

Note that the arguments are _generic_ and appear to be _typeless_, the preprocessor is not performing any validation on types (that's the compiler job) - but bear in mind this an advantage is also a disadvantage.

If we want to expand the above macro (_see with the eyes of the compiler_ :p) you can use the `-E` switch with [`gcc`](http://gcc.gnu.org/).

After the macro is expanded (replaced with the associated code) the sample above will look similar to this:

```c
int main(){
	printf("%dn", ((1) > (3)) ? (1) : (3));
	return 0;
}
```

Note that the notion of macro will be unknown for the compiler, as the code has been already replaced: `((1) > (3)) ? (1) : (3)`

Now let's focus on a more important aspect: **macro concatenation**. 

How do we proceed when we want to merge two tokens into one while expanding macros ? The `##` preprocessing operator performs token pasting .

_Example for macro-concatenation:_

```c
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

As you can see we supplied the token arguments (not strings!) `error` / `info` to the `SHOW` macro. 

The tokens were concatenated with `show_?`, and the resulting two tokens were actually two real functions: `show_error` and `show_info` .

Now lets jump into writing our `generic<>` Stack data structure:

## Declaring the (Stack) data structure, and the associated functions (`pop` and `push`):

```c
#define STACK_DECLARE(type)                                     \
typedef struct stack_##type##_s {                               \
    type data;                                                  \
    struct stack_##type##_s *next;                              \
} stack_##type;                                                 \
void stack_##type##_push(stack_##type **stack, type data);      \
type stack_##type##_pop(stack_##type **stack);                  \
```

Depending on the type supplied as the argument, different code will be generated.
A macro can be associated with blocks of code, we just need to use `\` to signal the fact to the `#preprocessor`.


```c
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

Different types, different code ...

## Defining the STACK functions (`push` and `pop`) declared in the previous step:

```c
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

Expanding the macro:

```c
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

## Wrapping the generic functions into macros

```c
#define STACK_TYPE(type)                    \
    stack_##type                            \

#define STACK_DATA(stack)                   \
    (stack)->data                           \

#define STACK_PUSH(type, stack, data)       \
    stack_##type##_push(stack, data)        \

#define STACK_POP(type, stack)              \
    stack_##type##_pop(stack)               \
```

## Putting all togheter

```c
#include <stdio.h>
#include <stdlib.h>

#define STACK_DECLARE(type)                                     \
typedef struct stack_##type##_s {                               \
    type data;                                                  \
    struct stack_##type##_s *next;                              \
} stack_##type;                                                 \
void stack_##type##_push(stack_##type **stack, type data);      \
type stack_##type##_pop(stack_##type **stack);                  \

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

#define STACK_TYPE(type)                    \
    stack_##type                            \

#define STACK_DATA(stack)                   \
    (stack)->data                           \

#define STACK_PUSH(type, stack, data)       \
    stack_##type##_push(stack, data)        \

#define STACK_POP(type, stack)              \
    stack_##type##_pop(stack)               \


// If you want to work with a stack that holds integers you should
// use those macros. They will expand and the associated functions will be
// generated .
//

STACK_DECLARE(int)
STACK_DEFINE(int)
STACK_DECLARE(double)
STACK_DEFINE(double)

int main(int argc, char** argv) {
    int i;

    //New stack . Alaways assign NULL
    STACK_TYPE(int) *st = NULL;
    STACK_TYPE(double) *st2 = NULL;

    for (i = 0; i < 100; ++i) {
        printf("PUSH: %d\n", i);
        STACK_PUSH(int, &st, i);
        STACK_PUSH(double, &st2, i);
    }

    while (i--> 0) {
        printf("POP: %d %2.2f\n", STACK_POP(int, &st), STACK_POP(double, &st2));
    }
    return (0);
}
``` 

_Note:_ The type argument cannot contain `*` or spaces. For example, `STACK_DECLARE(char*)` won't work, a `typedef` should be used instead.

# Using the void pointer (`void*`)

Typecasting is one of the powerful features of C. Type casting represents the ability to convert between different type variables.

Not let's focus on pointers: there are pointers of type `int`, `char`, or `float`, however there's a certain pointer that does not have a type known as the `void` pointer. Any type of pointer can be cast to a void pointer, and conversely, any void pointer can be cast to a pointer of a type .

Generic data, can be referenced using `*void`. 

```c
typedef struct stack_s {
    void *data; // Can reference "anything"
    struct stack_s *next; // The stack is built as a linked list
} stack;
```

The next step would be now to declare & define the functions involved in the stack manipulation: `push` and `pop`. 
Their signatures could look like this:

```c
void stack_push(stack **head, void *data);
void *stack_pop(stack **head);
```

```c
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
```

Main method:

```c
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

```c
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
