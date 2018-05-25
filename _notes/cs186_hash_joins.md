---
layout: page
title: CS 186 Hash Joins
category: database
---

## Grace Hash Join
### Main Idea
Grace hash join requires equality predicate, so works with **equi-joins** and **natural joins**.

Has two main stages:
* (Divide) **Partition** tuples from **R** and **S** by join key, so all tuples for a given key are in the same partition
* (Conquer) **Build & Probe** a separate hash table for each partition (like Naive Hash). Assume partition of smaller relation fits in memory, and recurse if necessary

![](/res/img/2018-03-23-15-10-14.png)

### Pseudocode
```
# Divide
for cur in {R, S}:
    for page in cur:
        read page into input buffer
        for tup on page:
            place tup in output buf hash_p(tup.joinkey)
            if output buf full then flush to disk partition
    flush output bufs to disk partitions

# Conquer
for i in [0...(B-1)]:
    for page in R_i:
        for tup on page:
            build tup in memory hash_r(tup.joinkey)
    for page in S_i:
        for tup on page:
            read page into input buffer
            probe memory hash_r(tup.joinkey) for matches
            send all matches to output buffer
            flush output buffer if full

```
### Cost

Cost is the sum of cost of both stages:
* **Partitioning Phase**: *2([R] + [S])*, since we read and write both relations
* **Matching Phase** *[R] + [S]*, since we read both relations, and then forward the output

Total cost of 2-pass hash join is *3([R] + [S])*
### Remarks
* sensitive to skew


## Sorting vs Hashing
Sorting pros:
* good if input already sorted, or need output sorted

Hashing pros:
* can cheaper due to hybrid hashing
* number of passes for join depends on size of smaller relation
* good if input already hashed, or need output hashed (e.g. groupby)

## Recap
Nested Loop Join:
* works for arbitrary joins
* make sure to utilize memory in blocks

Index Nested Loops:
* for equi-joins
* when you already have an index on one side

Sort/Hash:
* for equi-joins
* no index required

Remark: no clear winners, know them all!

## Hybrid Hash Join

### Main Idea
Build a hash table on the fly. Doing both Grace and Naive at the same time, one for each relation.

* Hash Table *B-(k+2)*
* Input and output buffers
* *k* buffers
