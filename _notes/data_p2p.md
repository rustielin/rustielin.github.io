---
layout: page
title: Universal Data
category: distributed systems
---

<p class="message">
  In the midst of libp2p ideation, I realized that similar functionality could be implemented using the Global Data Plane project. 
</p>

## The Issue

The issue of distributed data access is increasingly important in consideration of both horizontal scalability for decentralization purposes as well as use cases involving smart devices and IoT. The birth of libp2p was mainly derived from its necessity of implementation underlying the IPFS project. Its thesis is that HTTP is outdated and does not scale well, incurring massive bandwidth penalties due to client-server dependencies. Migration away from HTTP and the notion of client-server is a difficult problem, and the way libp2p solves this is by offering a shotgun approach of no-opinion modularity. 

On the other hand, the Global Data Plane (GDP) was primarily born from latency and bandwidth bottlenecks in swarm applications. The GDP is opinionated in its design and exposes append-only logs as first class citizens in design. It flows more easily from existing cloud architectures and fog network proposals. In a nutshell:

<p class="message">
  We argue that raising the level of abstraction to a data-centric design—focused around the distribution, preservation and protection of information—better matches the IoT.
</p>

Current architecture relying solely on the cloud suffers from high latency because the cloud is at the edge of the Internet backbone. Data is collected but not analyzed immediately, shuttled back to the cloud for batch processing if at all. 

See note titled `Security, Edge Computing pt 2` based on CS162 special topics lecture for more. 

## Abstraction

It seems that GDP is at a higher level of abstraction than libp2p, which is natural since they offer different services. Whereas libp2p is primarily concerned with transport of data, GDP is concerned with data locality and access within the fog. 

GDP could be implemented on top of libp2p.

This seems like the domain of IPFS, but the key distinction is that of data standard, which can be attributed again to abstraction and design. IPFS is used as a key-value store with a notion of versioning. GDP is at a lower level and primarily exposes an append-only log. Both IPFS and GDP don't support access control of their underlying data structures, but that can be implemented at a higher level. 

Both GDP and IPFS use a flat address space, which follows in the trend of disaggregation for decentralization and horizontal scalability. Both use an underlying DHT with optimizations. 

## References

1. [libp2p conceptual docs](https://docs.libp2p.io/concepts)
2. [Towards a Global Data Infrastructure](https://ptolemy.berkeley.edu/projects/chess/pubs/1172/MorEtAl_GlobalData_1_.pdf)
3. [A Case for the Universal DataPlane](https://ptolemy.berkeley.edu/projects/terraswarm/pubs/116/kubitowicz_udplane_edge.pdf)