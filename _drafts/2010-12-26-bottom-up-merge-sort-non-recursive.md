---
title: "Bottom-up Merge Sort (non-recursive)"
date: "2010-12-26"
categories: 
  - "algorithms"
  - "java-programming-languages"
  - "programming-languages"
tags: 
  - "algorithm"
  - "bottom-up-merge-sort"
  - "java-2"
  - "java-code"
  - "java-implementation"
  - "java-source"
  - "merge"
  - "merge-sort"
  - "non-recursive-merge-sort"
  - "pseudo-code"
  - "sort"
  - "sorting"
---

**1\. Algorithm Description**

In the [**last article**](http://andreinc.net/2010/12/22/the-merge-sort-algorithm-implementation-in-java/) I've described a recursive version of the **Merge Sort Algorithm** . Of course every recursive algorithm can be written in an iterative manner . So today I am going to present the **bottom-up** version of the same algorithm, written in a **non-recursive** fashion .

The main idea of the bottom-up merge sort is to sort the array in a sequence of passes . During each pass the array is divided into smaller sub-arrays of a pseudo-fixed size (**step**) . Initially **step** is 1, but the value increases with every pass, as every adjacent sub-arrays are merged, thus **step** doubles .

Example.:

<table><tbody><tr><td>0. We consider an array with size &lt;= 1 sorted .</td></tr><tr><td>1. The array that needs to be sorted is <strong>A = { 5, 2, 1, 12, 2, 10, 4, 13, 5}</strong> . At this point <strong>step</strong> <strong>= 1 </strong>.</td></tr><tr><td>2. At the first iteration array A is divided into blocks of size <strong>step = 1 </strong>. The resulting blocks (sub-arrays) are <strong>{5}</strong>, <strong>{2}</strong>, <strong>{1}</strong>, <strong>{12}</strong>, <strong>{2}</strong>, <strong>{10}</strong>, <strong>{4}</strong>, <strong>{13}</strong>, <strong>{5}</strong> .</td></tr><tr><td>3. <strong>step *= 2</strong>, thus step is now&nbsp;<strong>2</strong> .&nbsp;At this point we have a collection of sorted sub-arrays (because their size is = <strong>1</strong>) . We will group the sub-arrays one-by-one and we will start merging them . After the merge, the resulting sub-arrays are: <strong>{2, 5}</strong>, <strong>{1,12}</strong>, <strong>{2,10}</strong>, <strong>{4, 13}</strong> and <strong>{5}</strong> . <strong>{5}</strong> remains unpaired as the array size is an odd number . We will take care of this block later .</td></tr><tr><td>4. <strong>step *= 2</strong>, thus step is now&nbsp;<strong>4</strong> .&nbsp;Now we have a collection of 4 blocks of size two and one block of size one . We will start to merge again the&nbsp;adjacent&nbsp;blocks, so the sub-arrays collection becomes: <strong>{1, 2, 5, 12}</strong>, <strong>{2, 4, 10, 13}</strong> and <strong>{5}</strong> .</td></tr><tr><td>5. <strong>step *= 2</strong>, thus step is now&nbsp;<strong>8</strong> .&nbsp;Now we have a collection of 2 blocks with size 4 and one block with size 1 . We will merge the&nbsp;adjacent&nbsp;blocks so the sub-arrays collection becomes <strong>{1, 2, 2, 4, 5, 10, 12, 13}</strong> and <strong>{5}</strong> .</td></tr><tr><td>6. We now have two blocks one of size 8 and one of size 1 . We will merge those blocks and obtain the resulting sorted array: <strong>{1, 2, 2, 4, 5, 5, 10, 12, 13} </strong>.</td></tr></tbody></table>

  
The pseudo code for the algorithm can be written as follows . We will start by writing the merge function . This is responsible with the merging of two already sorted blocks (sub-arrays) from a given array . The input parameters for this function are : the array itself, and the interval headers (stop, start) for the two already sorted blocks . The sentinel is a concept that simplifies the code . In our case we consider SENTINEL infinity (no value from the array is bigger or equal to the Sentinel) .

FUNCTION MERGE(A, startL, stopL, startR, stopR)
    /\* The leftArray is defined as containing all the elements from
    startL to stopL of A + a sentinel value \*/
    LEFTL := \[\[A\[llim\]..A\[mlim\]) + SENTINEL\]

    /\* The right array is defined as containing all the elements from
    startR to stopR A + a sentinel value \*/
    RIGHTL := \[\[A\[mlim\]..A\[rlim\]) + SENTINEL\]

    i := 0
    j := 0
    FOR k:=llim TO rlim DO
        IF LEFTL\[i\] <= RIGHTL\[j\] THEN
            A\[k\] = LEFTL\[i\]
            i := i + 1
        ELSE
            A\[k\] = RIGHTL\[j\]
            j := j + 1

And the actual function responsible with the actual merge can be written as follows:

FUNCTION MERGESORT(A, length)
	IF length < 2 THEN
		//RETURN - THE ARRAY IS ALREADY SORTED
		RETURN
	step := 1
	WHILE step < length DO
		startL := 0
		startR := step
		WHILE startR + step <= length DO
			MERGE(A, startL, startL + step, startR startR + step)
			startL := startR + step
			startR := startL + step
		IF startR < length THEN
			MERGE(A, startL, startL + step, startR, length)
		step := step \* 2

Where **A** is the unsorted-but-soon-to-be-sorted array, **length** represents the size of **A**, **step** is the current size of the block, **startL** and **startR** represent the starting indexes of the sorted blocks that are going to be merged .

**2\. Algorithm implementation in Java**

In the following paragraph I am going to implement the Bottom-up Merge Sort (non-recursive) algorithm in Java . Follow the comments :

public class NonRecursiveMergeSort {

	// Print Array
    public static void printArray(int\[\] array){
        for(int i : array) {
            System.out.printf("%d ", i);
        }
        System.out.printf("n");
    }

	// Bottom-up merge sort
	public static void mergeSort(int\[\] array) {
		if(array.length < 2) {
			// We consider the array already sorted, no change is done
			return;
		}
		// The size of the sub-arrays . Constantly changing .
		int step = 1;
		// startL - start index for left sub-array
		// startR - start index for the right sub-array
		int startL, startR;

		while(step < array.length) {
			startL = 0;
			startR = step;
			while(startR + step <= array.length) {
				mergeArrays(array, startL, startL + step, startR, startR + step);
				// System.out.printf("startL=%d, stopL=%d, startR=%d, stopR=%dn",
					// startL, startL + step, startR, startR + step);
				startL = startR + step;
				startR = startL + step;
			}
			// System.out.printf("- - - with step = %dn", step);
			if(startR < array.length) {
				mergeArrays(array, startL, startL + step, startR, array.length);
				// System.out.printf("\* startL=%d, stopL=%d, startR=%d, stopR=%dn",
					// startL, startL + step, startR, array.length);
			}
			step \*= 2;
		}
	}

	// Merge to already sorted blocks
	public static void mergeArrays(int\[\] array, int startL, int stopL,
		int startR, int stopR) {
		// Additional arrays needed for merging
		int\[\] right = new int\[stopR - startR + 1\];
		int\[\] left = new int\[stopL - startL + 1\];

		// Copy the elements to the additional arrays
		for(int i = 0, k = startR; i < (right.length - 1); ++i, ++k) {
			right\[i\] = array\[k\];
		}
		for(int i = 0, k = startL; i < (left.length - 1); ++i, ++k) {
			left\[i\] = array\[k\];
		}

		// Adding sentinel values
		right\[right.length-1\] = Integer.MAX\_VALUE;
		left\[left.length-1\] = Integer.MAX\_VALUE;

		// Merging the two sorted arrays into the initial one
		for(int k = startL, m = 0, n = 0; k < stopR; ++k) {
			if(left\[m\] <= right\[n\]) {
				array\[k\] = left\[m\];
				m++;
			}
			else {
				array\[k\] = right\[n\];
				n++;
			}
		}
	}

	public static void main(String\[\] args) {
		// Beacuse of the chosen Sentinel the array
		// should contain values smaller than Integer.MAX\_VALUE .
		int\[\] array = new int\[\] { 5, 2, 1, 12, 2, 10, 4, 13, 5};
		mergeSort(array);
		printArray(array);
	}
}
