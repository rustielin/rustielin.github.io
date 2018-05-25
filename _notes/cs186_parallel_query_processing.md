---
layout: page
title: CS186 Parallel Query Processing
category: database
---

## Hybrid Hash Join Review
* Naive and Grace hash join at the same time
* input, output buffer
* *k* buffers for hashed join keys
* *B-(k+2)* buffers for in-memory hash table


## Ideas
### Two Metrics
Speed-up:
* increase hw
* fix wordload
* so throughput increase

Scale-up:
* increase hw
* increase workload
* so throughput stay the same

## Parallel Architectures
* Shared Memory
    * every CPU touches every piece of data
* Shared Disk
    * every CPU can only address own data
    * caches are all different
* Shared Nothing (cluster)
    * coordination through network
    * largest workloads

## Kinds of Query Parallelism

### Inter-query
* parallelism across queries
* each query runs on a separate processor
    * single thread (no parallelism) per query
* requires parallel-aware concurrency control

### Intra-query
* inter-oprator
    * pipeline parallism
        * linear plan (f, g, h)
    * busy (tree) parallelism
        * multiple tiered joins plan
* intra-operator
    * partition parallelism
    * same operations, different partitions
    * single join plan


![](/res/img/2018-03-30-15-06-23.png)

## Intra Operator Parallelism
### Split up data
* Range
    * good for equijoins, range queries, group-by
    * preserve order (range queries)
* Hash
    * good for equijoins, group-by
    * overhead in split ups
* Round Robin
    * good for spreading load

![](/res/img/2018-03-30-15-09-07.png)

Importance: shared nothing, needs good partition

### Parallel Scans
* Scan in parallel, merge output
* indexes can be built at each partition
