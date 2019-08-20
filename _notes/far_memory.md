---
layout: page
title: Far Memory Data Structures
category: algorithms
---

Designing BCL has brought challenges in interpreting new far memory programming paradigms, especially with respect to the supercomputers BCL is designed to be modular on top of. There's the consideration of HPC vs datacenter compute environments and the network topology.

Existing data structures are not suited for use with far memory. They assumed homogenous access time to local memory, or in the case of NUMA-aware data structures, assumed cache coherence. None of these assumptions can be made with far memory. 

Distributed data structures assume local process operates on memory, poked by RPCs. Far memory is one-sided access. Far memory must limit the number of far accesses 

### Primitives
* Indirect addressing
* Scatter-gather
* Notifications

### HPC Interconnects
* RDMA
* OmniPath
* Gen-Z

## References

1. [Designing Far Memory Data Structures: Think Outside the Box](https://www.microsoft.com/en-us/research/uploads/prod/2019/05/hotos19-final67.pdf)