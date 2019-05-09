---
layout: page
title: Security, Edge Computing
category: distributed systems
---

<p class="message">
  Special topics lecture of CS162 
</p>

## Security

* Background: security assumptions in Chord, not being secure and resilient against denial of service

Data provenance and integrity are more important than ever. Issues with fake data are even more dangerous than fake news: fake data gives rise to fake news (perhaps also vice versa.)

Today, we need to compute in the presence of the adversary. Everything's vulnerable, especially in the world of Internet of Things. There's always an adversary.

Modern applications are distributed, ad hoc, and vulnerable. They want to leverage the power of distributed computing in the cloud, fog, and edge, but there's generally insufficient security.

## Containers

Shipping containers 
* Invented in 1956, changing everything
* Ships, trains, trucks, cranes, all handle standardized format containers
  * NOTE: need standard protocol! hard to adopt?
  * Each container has unique ID

Data Containers (DataCapsule)
* Satandardized metadata container 
* Every transaction explicitly sequenced in a hash-chain history
* Similarities
  * Blockchain history?
  * Git history?
  * It's a secure log of info



## References

1. [CS162 Operating Systems and Systems Programming, Lecture 25: Security, Edge Computing Quantum Computing](https://cs162.eecs.berkeley.edu/static/lectures/25.pdf)
2. [Global Data Plane](https://swarmlab.berkeley.edu/sites/default/files/publications/fog_robotics_public_research_proposal_0.pdf)