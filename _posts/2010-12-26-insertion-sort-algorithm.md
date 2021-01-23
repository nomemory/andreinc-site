---
title: "Insertion Sort Algorithm"
date: "2010-12-26"
classes: wide
categories: 
  - "algorithms"
  - "java"
tags: 
  - "algorithm"
  - "algorithm-description"
  - "algorithm-implementation"
  - "code"
  - "insertion"
  - "insertion-sort"
  - "java-code"
  - "java-implementation"
  - "java-sourcecode"
  - "sort"
  - "source"
---

# Description

Insertion Sort is one of the simplest, but not very effective, sorting algorithms . It works very similar to the way (us humans) sort a hand of playing cards:

<table border="1"><tbody><tr><td>1. At first none of our cards are sorted . So we start with an "empty" space in our hand were we are going to insert cards one at a time .</td></tr><tr><td>2. We take a card from our hand and we put it in the "special place" were we planned to keep our cards sorted . We do this for every card in our initial hand, until we finish them off .</td></tr><tr><td>3. Finding the right position for the insertion is not hard . At this point we can apply two tactics :<ul><li>We compare the card we are planning to insert with all the cards that are already in sorted state <strong>O(n)</strong>;</li><li>We use binary search to determine the right position (<strong>O(logn)</strong>) .</li></ul></td></tr></tbody></table>

In our case that "special place" were we are going to insert cards one at a time, is not an additional array, but the array itself . We know for sure that an array of size 1 is always sorted, so we consider that first sorted sub-array, is the block composed by the first element .

For example, we want to sort the following array (with bold, are the elements already sorted):

<table border="1"><tbody><tr><td>8</td><td>0</td><td>3</td><td>11</td><td>5</td><td>-1</td><td>14</td><td>10</td><td>1</td><td>1</td><td>-2</td><td>Array is unsorted .</td></tr><tr><td><strong><span style="background-color: #c0c0c0;">8</span></strong></td><td>0</td><td>3</td><td>11</td><td>5</td><td>-1</td><td>14</td><td>10</td><td>1</td><td>1</td><td>-2</td><td>The first sorted block is <strong>{8} </strong>.</td></tr><tr><td><strong><span style="background-color: #c0c0c0;">0</span></strong></td><td><strong><span style="background-color: #c0c0c0;">8</span></strong></td><td>3</td><td>11</td><td>5</td><td>-1</td><td>14</td><td>10</td><td>1</td><td>1</td><td>-2</td><td>We compare <strong>{0}</strong> with <strong>{8}</strong> we move <strong>{0}</strong> at the new position, we shift <strong>{8}</strong> .</td></tr><tr><td><strong><span style="background-color: #c0c0c0;">0</span></strong></td><td><strong><span style="background-color: #c0c0c0;">3</span></strong></td><td><strong><span style="background-color: #c0c0c0;">8</span></strong></td><td>11</td><td>5</td><td>-1</td><td>14</td><td>10</td><td>1</td><td>1</td><td>-2</td><td>We compare <strong>{3}</strong> with <strong>{8}</strong>, <strong>{0}</strong>, we move {3} at the new position, we shift <strong>{8}</strong> .</td></tr><tr><td><strong><span style="background-color: #c0c0c0;">0</span></strong></td><td><strong><span style="background-color: #c0c0c0;">3</span></strong></td><td><strong><span style="background-color: #c0c0c0;">8</span></strong></td><td><strong><span style="background-color: #c0c0c0;">11</span></strong></td><td>5</td><td>-1</td><td>14</td><td>10</td><td>1</td><td>1</td><td>-2</td><td>We compare <strong>{11}</strong> with <strong>{8}</strong>, <strong>{11}</strong> remains at the same position .</td></tr><tr><td><strong><span style="background-color: #c0c0c0;">0</span></strong></td><td><strong><span style="background-color: #c0c0c0;">3</span></strong></td><td><strong><span style="background-color: #c0c0c0;">5</span></strong></td><td><strong><span style="background-color: #c0c0c0;">8</span></strong></td><td><strong><span style="background-color: #c0c0c0;">11</span></strong></td><td>-1</td><td>14</td><td>10</td><td>1</td><td>1</td><td>-2</td><td>We compare <strong>{5}</strong> with <strong>{11}</strong>, <strong>{8}</strong> and <strong>{3}</strong>, we move <strong>{5}</strong> at the new position, we shift <strong>{8}</strong>, <strong>{11}</strong> .</td></tr><tr><td><strong><span style="background-color: #c0c0c0;">-1</span></strong></td><td><strong><span style="background-color: #c0c0c0;">0</span></strong></td><td><strong><span style="background-color: #c0c0c0;">3</span></strong></td><td><strong><span style="background-color: #c0c0c0;">5</span></strong></td><td><strong><span style="background-color: #c0c0c0;">8</span></strong></td><td><strong><span style="background-color: #c0c0c0;">11</span></strong></td><td>14</td><td>10</td><td>1</td><td>1</td><td>-2</td><td>We compare <strong>{-1}</strong> with <strong>{11}</strong>, <strong>{8}</strong>, ..., <strong>{0}</strong>, we move <strong>{-1}</strong> at the new position, we shift <strong>{0}</strong>, <strong>{3}</strong>, ... <strong>{11}</strong> .</td></tr><tr><td><strong><span style="background-color: #c0c0c0;">-1</span></strong></td><td><strong><span style="background-color: #c0c0c0;">0</span></strong></td><td><strong><span style="background-color: #c0c0c0;">3</span></strong></td><td><strong><span style="background-color: #c0c0c0;">5</span></strong></td><td><strong><span style="background-color: #c0c0c0;">8</span></strong></td><td><strong><span style="background-color: #c0c0c0;">11</span></strong></td><td><strong><span style="background-color: #c0c0c0;">14</span></strong></td><td>10</td><td>1</td><td>1</td><td>-2</td><td>We compare <strong>{14}</strong> with <strong>{11}</strong>, we move <strong>{11}</strong> at the new position .</td></tr><tr><td><strong><span style="background-color: #c0c0c0;">-1</span></strong></td><td><strong><span style="background-color: #c0c0c0;">0</span></strong></td><td><strong><span style="background-color: #c0c0c0;">3</span></strong></td><td><strong><span style="background-color: #c0c0c0;">5</span></strong></td><td><strong><span style="background-color: #c0c0c0;">8</span></strong></td><td><strong><span style="background-color: #c0c0c0;">10</span></strong></td><td><strong><span style="background-color: #c0c0c0;">11</span></strong></td><td><strong><span style="background-color: #c0c0c0;">14</span></strong></td><td>1</td><td>1</td><td>-2</td><td>We compare <strong>{10}</strong> with <strong>{14}</strong>, <strong>{11}</strong>, <strong>{8}</strong>, we move <strong>{10}</strong> at the new position, we shift <strong>{11}</strong>, <strong>{14}</strong>.</td></tr><tr><td><strong><span style="background-color: #c0c0c0;">-1</span></strong></td><td><strong><span style="background-color: #c0c0c0;">0</span></strong></td><td><strong><span style="background-color: #c0c0c0;">1</span></strong></td><td><strong><span style="background-color: #c0c0c0;">3</span></strong></td><td><strong><span style="background-color: #c0c0c0;">5</span></strong></td><td><strong><span style="background-color: #c0c0c0;">8</span></strong></td><td><strong><span style="background-color: #c0c0c0;">10</span></strong></td><td><strong><span style="background-color: #c0c0c0;">11</span></strong></td><td><strong><span style="background-color: #c0c0c0;">14</span></strong></td><td>1</td><td>-2</td><td>We compare <strong>{1}</strong> with <strong>{14}</strong>, <strong>{11}</strong>, ..., <strong>{0}</strong>, we move <strong>{1}</strong> at the new position, we shift <strong>{3}</strong>, <strong>{5}</strong>, ..., <strong>{14}</strong> .</td></tr><tr><td><strong><span style="background-color: #c0c0c0;">-1</span></strong></td><td><strong><span style="background-color: #c0c0c0;">0</span></strong></td><td><strong><span style="background-color: #c0c0c0;">1</span></strong></td><td><strong><span style="background-color: #c0c0c0;">1</span></strong></td><td><strong><span style="background-color: #c0c0c0;">3</span></strong></td><td><strong><span style="background-color: #c0c0c0;">5</span></strong></td><td><strong><span style="background-color: #c0c0c0;">8</span></strong></td><td><strong><span style="background-color: #c0c0c0;">10</span></strong></td><td><strong><span style="background-color: #c0c0c0;">11</span></strong></td><td><strong><span style="background-color: #c0c0c0;">14</span></strong></td><td>-2</td><td>We compare <strong>{1}</strong> with <strong>{14}</strong>, <strong>{11}</strong>, ..., <strong>{1}</strong>, we move <strong>{1}</strong> at the new position, we shift <strong>{3}</strong>, <strong>{5}</strong>, ...,<strong> {14}</strong> .</td></tr><tr><td><strong><span style="background-color: #c0c0c0;">-2</span></strong></td><td><strong><span style="background-color: #c0c0c0;">-1</span></strong></td><td><strong><span style="background-color: #c0c0c0;">0</span></strong></td><td><strong><span style="background-color: #c0c0c0;">1</span></strong></td><td><strong><span style="background-color: #c0c0c0;">1</span></strong></td><td><strong><span style="background-color: #c0c0c0;">3</span></strong></td><td><strong><span style="background-color: #c0c0c0;">5</span></strong></td><td><strong><span style="background-color: #c0c0c0;">8</span></strong></td><td><strong><span style="background-color: #c0c0c0;">10</span></strong></td><td><strong><span style="background-color: #c0c0c0;">11</span></strong></td><td><strong><span style="background-color: #c0c0c0;">14</span></strong></td><td>We compare <strong>{-2} </strong>with <strong>{14}, {11}, ..., {-1}, </strong>we move <strong>{-2}</strong> at the new position, we shift <strong>{-1}</strong>, <strong>{0}</strong>, ..., <strong>{14}</strong> .</td></tr></tbody></table>

The pseudo-code for the algorithm can be easily written as follows:

```java
FUNCTION SORT(A, length)
	// The array is 0-indexed
	FOR i:=1 TO length DO
		key := A[i]
		j := i - 1

		// COMPARE
		WHILE j >= 0 AND A[j] > key DO
			// SHIFT
			A[j+1] := A[j]
			j := j - 1

		// MOVE
		A[j+1] = key
```
		

# Java Implementation

The Java implementation of the algorithm is pretty straight-forward:

```java 
public class InsertionSort {
	// Print array
	public static void printArray(int [] array){
		for(int i : array){
			System.out.printf("%d ", i);
		}
	}

	// Sort array through the 'Insertion Sort' method .
	public static void sortArray(int [] array){
		int key, j;
		for(int i = 1; i < array.length; ++i){
			key = array[i];
			j = i - 1;
			while(j >= 0 && array[j] > key){
				// Shift array elements so we can place
				// the key to the right place
				array[j+1] = array[j];
				j--;
			}
			// Place the key into position
			array[j+1] = key;
		}
	}

	public static void main(String[] args){
		int [] array = new int[] {8, 0, 3, 11, 5, -1 , 14, 10, 1, 1, -2};
		sortArray(array);
		printArray(array);
	}
}
```

