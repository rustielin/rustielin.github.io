---
layout: page
title: Thoughts and learnings from GDP
category: distributed systems
---

<p class="message">
Been involved in the Global Data Plane project at the Swarm Lab. Some interesting learnings and discussion topics with Kubi
</p>

GDP is all about trust zones and federations. 

This is not really a concern in most public blockchains I've studied in the past, since of course those generally dont make any assumptions at all in terms of trust. However, this is necessary in the case where you're designing a system that maximizes on effective bandwidth for all sorts of traffic. GDP traffic is heterogeneous, whereas in blockchain where everything is meant to be publicly auditable. GDP requires smart multicast and routing of data within the network, whereas in blockchains gossip is better.

I've read a paper recently on using fountain codes for more effective gossip protocols within the Solano blockchain. While this is efficient for the blockchain case, it clearly is not scalable in a heterogeneous network where nodes care about different pieces of data, such as the Internet or the GDP. 

Instead of gossip, we can consider multicast trees for efficient data dissemination, to avoid thrashing the network. 

## Certificates

In particular, we consider the common routines in which we use certificates.

AdCerts certify that a particular node can serve data on behalf of some other entity (by data)

RtCerts certify that a node has access to a particular route.

(Perhaps a way to think about it would be to associate AdCerts and RtCerts as nodes and edges on a graph)

### Current issues

There needs to be a way to tie certificates back to the physical world, perhaps with MAC addresses, IP addresses, etc on a layer-by-layer basis. 

We then look at `certs.py` within the GDP v1. 

RouteCerts (RtCerts) are routing certificates for addresses that we own the private keys for. 

"From them to us."

AdvertisementCerts (AdCerts) are routing certificates for addresses delegated to us. We present adverts to one of the names owned by us, which then has a routing certificate. 

"From them to address delegated to us."

Certs stored as a DAG, not sure if this is done usually, but that's pretty cool, since we build off with some original "trusted" data. It's accessed via `certs::validate_cert` which is called by `certs::insert_cert` which is notably called by `RouterDB::insert_cert` which is used directly in `router.py`

The router validates certs when processing incoming advertisement requests on channels (ports).



## References

1. [End-To-End Arguments in System Design](https://people.eecs.berkeley.edu/~kubitron/courses/cs262a-F19/handouts/papers/p277-saltzer.pdf)