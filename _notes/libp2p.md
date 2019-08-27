---
layout: page
title: libp2p consensus
category: distributed systems
---

<p class="message">
  Ideating on how to use libp2p to write consensus simulations for education purposes. Also trying out speccing/note-taking in markdown for the time being
</p>

## Transport 

libp2p is transport agnostic and supports many foundational protocols, which are abstractly called **trasport protocols** (e.g. TCP/IP, UDP, QUIC, etc.)

Two core operations:
* `Listen`: for inbound connection
* `Dial`: for outbound connection

Each transport needs its own address scheme, and libp2p uses `multiaddr` to encode many different addressing schemes.

```
/ip4/7.7.7.7/tcp/6543

// Multiaddr vs tarditional construction

7.7.7.7:6542
```

Multiaddr construction is explicit about protocols being described.

When dialing, need to also include `PeerId` of the peer so as to prevent impersonation. (e.g. authentication)

```
/ip4/1.2.3.4/tcp/4321/p2p/QmcEPrat8ShnCph8WjkREzt5CPXF2RwhYxYBALDcLC1iV6
```

The `switch` manages transports and coordinates other processes such as protocol negotiation, stream multiplexing, and establishing secure communication, etc. It exposes the connection stack API.

## Consensus 

Previous implementations of consensus simulation were light weight and relaxed. This will be a bigger project built from the ground up and part of a lecture series. Better to use the tech iteself

* Theory
* Implementation
  * How libp2p works at a high level, what we can take away
    * Tutorials
    * Conceptual docs
  * Create a framework for distributed systems in examples(?)
    * Limit the API even further 
    * Usage of [go-libp2p-swarm](https://github.com/libp2p/go-libp2p-swarm)? Probably want even lower level
  

## References

1. [libp2p conceptual docs](https://docs.libp2p.io/concepts)