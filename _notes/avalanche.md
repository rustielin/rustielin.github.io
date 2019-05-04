---
layout: page
title: Avalanche Overview
category: blockchain
---

<p class="message">
  Just some notes reading through the whitepaper
</p>

## Intro

Traditional consensus relies on quadratic communication e.g. broadcasts, so every node hears from every other node -- or at least on that order. Since traditional workloads and systems using these consensus mechanisms generally were smaller and had known membership, the cost of quadratic communication was bearable. However, dynamic membership and scalability to large number of nodes is a huge bottleneck for these mechanisms. Traditional consensus mechanisms also usually relied on leader election to coordinate consensus state.

Nakamoto consensus mechanisms have probabilisitc safety guarantees, meaning that consensus state may revert with probability $\epsilon$. This sacrifices some of the safety of the protocol with liveness of being able to scale to large number of participants and dynamic membership.

Snow protocol family removes the need for leaders to coordinate consensus, and thereby reduces communication overhead from $O(n)$ in traditional consensus (e.g. leader send commit to all nodes) to $O(1)$ (e.g. no notion of leader). Snow also tolerates membership uncertainty.

// to be continued eventually

## References

1. [Scalable and Probabilistic Leaderless BFT Consensus through Metastability](https://avalabs.org/snow-avalanche.pdf)