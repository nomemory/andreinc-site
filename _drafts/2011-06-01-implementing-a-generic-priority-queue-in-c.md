---
title: "Implementing a generic Priority Queue in C (using heaps)"
date: "2011-06-01"
categories: 
  - "c"
  - "algorithms"
  - "programming-languages"
tags: 
  - "c-2"
  - "implementation"
  - "max-heap"
  - "min-heap"
  - "pointer"
  - "priority-queue"
  - "queue"
  - "struct"
  - "void"
---

This article considers you are already familiar with the concept of a **Priority Queue**.

It's a Queue with a twist. You **push()** elements like in a standard Queue, but when it comes to **pop()** them out you take the element with the "highest" priority.

The implementation is going to use a [Binary Heap](https://en.wikipedia.org/wiki/Binary_heap).

The following code is also available on [github](https://github.com/nomemory/c-generic-pqueue):

git clone https://github.com/nomemory/c-generic-pqueue.git

**_pqueue.h_**

#ifndef \_\_PQUEUE\_\_H\_\_
#define \_\_PQUEUE\_\_H\_\_

/\*\*
\* Debugging macro .
\*
\* Checks for a NULL pointer, and prints the error message, source file and
\* line via 'stderr' .
\*
\* If the check fails the program exits with error code (-1) .
\*/
#define NP\_CHECK(ptr) \\
    { \\
        if (NULL == (ptr)) { \\
            fprintf(stderr, "%s:%d NULL POINTER: %s n", \\
                \_\_FILE\_\_, \_\_LINE\_\_, #ptr); \\
            exit(-1); \\
        } \\
    } \\

#define DEBUG(msg) fprintf(stderr, "%s:%d %s", \_\_FILE\_\_, \_\_LINE\_\_, (msg))

/\*\*
\* Priority Queue Structure
\*/
typedef struct PQueue\_s {
    /\* The actual size of heap at a certain time \*/
    size\_t size;
    /\* The amount of allocated memory for the heap \*/
    size\_t capacity;
    /\* An array of (void\*), the actual max-heap \*/
    void \*\*data;
    /\* A pointer to a comparator function, used to prioritize elements \*/
    int (\*cmp)(const void \*d1, const void \*d2);
} PQueue;

/\*\* Allocates memory for a new Priority Queue .
Needs a pointer to a comparator function, thus establishing priorities .
\*/
PQueue \*pqueue\_new(int (\*cmp)(const void \*d1, const void \*d2),
                   size\_t capacity);

/\*\* De-allocates memory for a given Priority Queue \*/
void pqueue\_delete(PQueue \*q);

/\*\* Add an element inside the Priority Queue \*/
void pqueue\_enqueue(PQueue \*q, const void \*data);

/\*\* Removes the element with the greatest priority from within the Queue \*/
void \*pqueue\_dequeue(PQueue \*q);

#endif

_**pqueue.c**_

#include
#include

#include "pqueue.h"

/\* Util macros \*/
#define LEFT(x) (2 \* (x) + 1)
#define RIGHT(x) (2 \* (x) + 2)
#define PARENT(x) ((x) / 2)

void pqueue\_heapify(PQueue \*q, size\_t idx);

/\*\*
\* Allocates memory for a new Priority Queue structure .

\* 'cmp' function:
\*   returns 0 if d1 and d2 have the same priorities
\*   returns \[negative value\] if d1 have a smaller priority than d2
\*   returns \[positive value\] if d1 have a greater priority than d2
\*/
PQueue \*pqueue\_new(int (\*cmp)(const void \*d1, const void \*d2),
                   size\_t capacity) {
    PQueue \*res = NULL;
    NP\_CHECK(cmp);
    res = malloc(sizeof(\*res));
    NP\_CHECK(res);
    res->cmp = cmp;
    /\* The inner representation of data inside the queue is an array of void\* \*/
    res->data = malloc(capacity \* sizeof(\*(res->data)));
    NP\_CHECK(res->data);
    res->size = 0;
    return (res);
}

/\*\*
\* De-allocates memory for a given Priority Queue structure .
\*/
void pqueue\_delete(PQueue \*q) {
    if (NULL != q) {
        DEBUG("Priority Queue is already NULL. Nothing to free.");
        return;
    }
    free(q->data);
    free(q);
}

/\*\*
\* Adds a new element to the Priority Queue .
\*/
void pqueue\_enqueue(PQueue \*q, const void \*data) {
    size\_t i;
    void \*tmp = NULL;
    NP\_CHECK(q);
    if (q->size >= q->capacity) {
        DEBUG("Priority Queue is full. Cannot add another element .");
        return;
    }
    /\* Adds element last \*/
    q->data\[q->size\] = (void\*) data;
    i = q->size;
    q->size++;
    /\* The new element is swapped with its parent as long as its
    precedence is higher \*/
    while(i > 0 && q->cmp(q->data\[i\], q->data\[PARENT(i)\]) > 0) {
        tmp = q->data\[i\];
        q->data\[i\] = q->data\[PARENT(i)\];
        q->data\[PARENT(i)\] = tmp;
        i = PARENT(i);
    }
}

/\*\*
\* Returns the element with the biggest priority from the queue .
\*/
void \*pqueue\_dequeue(PQueue \*q) {
    void \*data = NULL;
    NP\_CHECK(q);
    if (q->size < 1) {         
         /\* Priority Queue is empty \*/         
         DEBUG("Priority Queue underflow . Cannot remove another element .");         
         return NULL;     
    }     
    data = q->data\[0\];
    q->data\[0\] = q->data\[q->size-1\];
    q->size--;
    /\* Restore heap property \*/
    pqueue\_heapify(q, 0);
    return (data);
}

/\*\*
\* Turn an "almost-heap" into a heap .
\*/
void pqueue\_heapify(PQueue \*q, size\_t idx) {
    /\* left index, right index, largest \*/
    void \*tmp = NULL;
    size\_t l\_idx, r\_idx, lrg\_idx;
    NP\_CHECK(q);

    l\_idx = LEFT(idx);
    r\_idx = RIGHT(idx);

    /\* Left child exists, compare left child with its parent \*/
    if (l\_idx < q->size && q->cmp(q->data\[l\_idx\], q->data\[idx\]) > 0) {
        lrg\_idx = l\_idx;
    } else {
        lrg\_idx = idx;
    }

    /\* Right child exists, compare right child with the largest element \*/
    if (r\_idx < q->size && q->cmp(q->data\[r\_idx\], q->data\[lrg\_idx\]) > 0) {
        lrg\_idx = r\_idx;
    }

    /\* At this point largest element was determined \*/
    if (lrg\_idx != idx) {
        /\* Swap between the index at the largest element \*/
        tmp = q->data\[lrg\_idx\];
        q->data\[lrg\_idx\] = q->data\[idx\];
        q->data\[idx\] = tmp;
        /\* Heapify again \*/
        pqueue\_heapify(q, lrg\_idx);
    }
}

In order to test this "lovely" code we will write a bogus structure, and an allocator / de-allocator for it .

_**test.h**_

#ifndef \_\_TEST\_\_H\_\_
#define \_\_TEST\_\_H\_\_

#define NP\_CHECK(ptr) \\
    { \\
        if (NULL == (ptr)) { \\
            fprintf(stderr, "%s:%d NULL POINTER: %s n", \\
                \_\_FILE\_\_, \_\_LINE\_\_, #ptr); \\
            exit(-1); \\
        } \\
    } \\

/\* Test structure \*/
typedef struct test\_s {
    int priority;
} Test;

Test \*test\_new(int priority);

void test\_delete(Test \*t);

int test\_compare(const void \*d1, const void \*d2);

#endif

_**test.c**_

#include
#include

#include "test.h"

Test \*test\_new(int priority) {
    Test \*t = NULL;
    t = malloc(sizeof(\*t));
    NP\_CHECK(t);
    t->priority = priority;
    return (t);
}

void test\_delete(Test \*t) {
    if (NULL != t) {
        free(t);
    }
}

/\* Used two compare two elements \*/
int test\_compare(const void \*d1, const void \*d2) {
    return ((Test\*)d1)->priority - ((Test\*)d2)->priority;
}

And the main function:

#include
#include
#include

#include "pqueue.h"
#include "test.h"

int main(int argc, char \*argv\[\]) {
    PQueue \*q = NULL;
    Test \*t = NULL;
    int i;

    srand(time(NULL));

    /\* A priority Queue containing a maximum of 10 elements \*/
    q = pqueue\_new(test\_compare, 10);

    for(i = 0; i < 10; ++i) {
        /\* Adding elements to priority Queue \*/
        t = test\_new(rand());
        pqueue\_enqueue(q, t);
    }

    for(i = 0; i < 10; ++i) {          
         printf("%dn", ((Test\*)pqueue\_dequeue(q))->priority);
        /\* Free memory - me lazy \*/
    }

    /\* Free memory - me lazy \*/

    return (0);
}

And the output:

31343
28060
25554
19390
14846
8850
3514
2619
1794
873

Just as expected the random numbers that were being inserted are shown in the right order, decided by the comparator function .
