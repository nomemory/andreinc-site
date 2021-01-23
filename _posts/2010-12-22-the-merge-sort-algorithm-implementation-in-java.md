---
title: "The merge sort algorithm (implementation in Java)"
date: "2010-12-22"
classes: wide
categories: 
  - "java"
  - "algorithms"
tags: 
  - "algorithm"
  - "computer-science"
  - "divide-and-conquer"
  - "java-implementation"
  - "merge"
  - "merge-sort"
  - "sort"
  - "sorting"
  - "sorting-algorithms"
---

# Description

In computer science many algorithms are recursive by nature, and they usually follow an approach called _**divide-and-conquer**_. 

Divide-and-conquering a problem means to break it into smaller identical sub-problems, resolve the smaller sub-problems recursively (by dividing the smaller sub-problems into even smaller problems), and eventually combine all their results to determine the solution for the initial problem .

The **[Merge Sort](http://en.wikipedia.org/wiki/Merge_sort)** algorithm is based on this technique :

1. The merge sort algorithm works on arrays (or lists). If the array has its `size < 1`, then we consider the array already sorted and no change is done. This is considered to be the stop condition for the recursive approach. 
2. If size of the array (or list) `> 1`, then we divide the array into two equally-sized sub-arrays.
3. We recursively sort both of the two arrays.
4. We merge the two sorted sub-arrays into one sorted array .

In pseudo-code we need two functions to implement the algorithm `MERGE` and `MERGESORT`:

```java
FUNCTION MERGE(L, llim, mlim, rlim)
	/* The leftArray is defined as containing all the elements from
	llim to mlim of L + a sentinel value */
	LEFTL := [(L[llim]..L[mlim]), SENTINEL]

	/* The right array is defined as containing all the elements from
	mlim to rlim of L + a sentinel value */
	RIGHTL := [(L[mlim]..L[rlim]), SENTINEL]

	i := 0
	j := 0
	
	FOR k:=llim TO rlim DO
		IF LEFTL[i] <= RIGHTL[j] THEN
			L[k] = LEFTL[i]
			i := i + 1
		ELSE
			L[k] = RIGHTL[j]
			j := j + 1	
```


Where:

* `L` is the initial unsorted array;
* `llim` is the starting index of the left sub-array;
* `mlim` is the stopping index for right sub-array, and the starting index for the right sub-array;
* `rlim` is the stopping index for the right sub-array;
* `LEFTL`, `RIGHTL` are additional helper arrays; 
* `SENTINEL` is value used to simplify our code, there's nothing "bigger" than the Sentinel.

The `MERGE-SORT` function can be written as:

```java
MERGESORT(L, start, stop)
	IF start < stop THEN
		middle := (start + stop) / 2
		MERGESORT(L, start, middle)
		MERGESORT(L, middle + 1, stop)
		MERGE(L, start, middle, stop)
```

# Java implementation

Translating the pseudo-code to Java looks like this:

```java
public class MergeSort {
	// Print Array 
	public static void printArray(int[] array){
		for(int i : array) {
			System.out.printf("%d ", i);
		}
		System.out.printf("n");
	}

	// Sorting an array of values using the
	// Merge Sort algorithm . This is the function initializer
	// for the mergeSorth method
	public static void sortArray(int[] array){
		mergeSort(array, 0, array.length - 1);
	}

	// Recursive function used by the sort function
	public static void mergeSort(int[] array, int llim, int hlim){
		if(llim < hlim) {
			int mlim = (llim + hlim) / 2;
			mergeSort(array, llim, mlim);
			mergeSort(array, mlim + 1, hlim);
			merge(array, llim, mlim, hlim);
		}
	}

	public static void merge(int[] array, int llim, int mlim, int hlim){
		// Additional Helper Arrays
		int larraySize = mlim - llim + 1;
		int rarraySize = hlim - mlim;
		int[] larray = new int[larraySize + 1];
		int[] rarray = new int[rarraySize + 1];

		// Sentinel values, to avoid additional checks
		// when we are merging larray and rarray
		larray[larraySize] = Integer.MAX_VALUE;
		rarray[rarraySize] = Integer.MAX_VALUE;

		for(int i = 0; i < larraySize; ++i){
			larray[i] = array[llim + i];
		}
		for(int i = 0; i < rarraySize; ++i){
			rarray[i] = array[i + mlim + 1];
		}

		// Building the resulting array from the previously
		// sorted sequences 
		for(int p = llim, m = 0, n = 0, k = llim; k <= hlim; ++k){
			if(larray[m] <= rarray[n]){
				array[k] = larray[m];
				m++;
			}
			else {
				array[k] = rarray[n];
				n++;
			}
		}
	}

	public static void main(String[] args){
		int[] array = new int[]{12, 8, 0, -5, 12, 3, 4, 23};
		sortArray(array);
		printArray(array);
	}
}
```