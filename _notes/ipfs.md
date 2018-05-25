---
layout: page
title: IPFS
category: distributed systems
---

<p class="message">
  Some background context: As an education officer for Blockchain at Berkeley, one of my responsibilities early in the semester is to host informal discussions known as "Blockchills." Blockchills are mainly to expose new members to as much as the space as possible, and are generally in-depth discussions on specific topics. I had previously led blockchills on topics such as Cosmos and Tendermint, and this week's topic was IPFS, the InterPlanetary File System. Below is the agenda and some notes for the IPFS blockchill, 3/14/2018.
</p>


## Agenda
* Problems
    * HTTP
    * (Lack of) Versioning
    * Centralization on the Web
    * (Lack of) Resilience
* What is IPFS?
* Historical (similar) attempts and successes
* Architecture and philosophy
    * DHT
    * Block Exchanges
    * VCS
    * SFS
* IPFS From the Ground Up
* Filecoin
* Questions

# Notes

Notes from IPFS whitepaper and other resources for student reference.

## Intro

The [InterPlanetary File System](https://ipfs.io/) (IPFS) is a p2p distributed filesystem. A filesystem is an abstraction that contols how data is stored and retrieved.

IPFS can be compared to the Web, but can more accurately be seen as a single BitTorrent swarm, exchanging objects within one Git repository. It provides high throughput content-addressed block storage model, with content-addressed hyperlinks. The structure forms a generalized Merkle DAG, upon which one can build cersioned file systems, blockchains, and even a Permanent Web.

Underlying all this, we have a distributed hashtable, incentivized block exchange, and self-certifying namespace. IPFS has no point of failure, and is Byzantine Fault Tolerant.


Historically, there have been no success in creating general pupose distributed filesystems.

HTTP has been used for the past 2 decades, but since then there have been significant new findings. Especially in the face of new challenges, upgrade is increasingly necessary:
* Hosting and distributing petabyte datasets
* Computing on large data across organizations
* High-volume, HD, on-demand, real-time media
* Versioning and linking of massive datasets
* Data replication and making sure important files dont dissapear

In general: lots of data accessible everywhere.

## Background

Some projects and ideas that inspired IPFS design philosophy. These solved very specific problems, and IPFS aims to generalize all this.

### Distributed Hash Tables

DHTs widely used to coordinate and maintain metadata about p2p systems. BitTorrent MainlineDHT tracks sets of peers part of a torrent swarm. Other examples:
* Kademlia DHT
    * Efficient lookup through massive networks in *log* time
    * Low coordination overhead by optimizing the number of control messages it sends to other nodes
    * Prefers long-lived nodes: resistance to some attacks
    * Wide usage in p2p applications
* Corsal DSHT (Distributed Sloppy Hash Table)
* S/Kademlia DHT
    * Extends Kademlia to protect against against attacks

### Block Exchanges -- BitTorrent

BitTorrent coordinates networks of untrusting peers (swarms) to cooperate in distributing pieces of files to each other. Key features:
* Reward nodes who contribute to each other, and punish nodes who only leech others' resources. Downloads are also uploaders, unless they leech. Keeping track of share ratios: `amount uploaded/amount downloaded`. [Interesting related article](http://people.csail.mit.edu/katrina/papers/propshare.pdf)
* Keep track of availability of file pieces, and send the rarest pieces first. Reduces load off seeds, and make non-seed peers capable of trading with each other.
* BitTorrent's standard tit-for-tat vulnerable to some bandwitdth sharing. PropShare resists, improving performance of swarms.

### Version Control Systems -- Git

Equally important to efficient data distribution is version control. Git, which is probably the most well known version control system today, was a pioneer in this. Git's underlying Merkle DAG data model enables powerful file distribution strategies.

The central IPFS design principle is to model *all data* as part of the same Merkle DAG.

### Self-Certified Filesystems -- SFS

Using a scheme such that the *name* of an SFS file system certifies its server.

```bash
/sfs/<Location>:<HostID>
HostID = hash(public_key || Location)
```

## IPFS Design

Using ideas from DHTs, BitTorrent, Git, and SFS. IPFS is p2p, no nodes are privileged, IPFS nodes store IPFS objects (files, data structures, etc) in local storage. Stack of sub-protocols:
* Identities: manage node identity generation and verification
* Network: manages connections to other peers, using various underlying network protocols
* Routing: maintains information to location specific peers and objects, responding to both local and remote queries. (Defaults to DHT, but swappable)
* Exchange: block exchange protocol (BitSwap) that governs efficient block distribution. Modelled as market, weakly inventivizing data replication.
* Objects: Merkle DAG of content-addressed immutable objects with links.
* Files: versioned file system hierarchy inspired by Git
* Naming: self-certifying mutable name system

### Identities

Nodes identified by `NodeId`, which is the (cryptographic) hash of a public key. Uses S/Kademlia cryptographic puzzle for choosing pub/priv key.

* Generate pub/priv key pair
* `NodeId = hash(pubkey)`
* count of preceding zero bits in `hash(NodeId)` must be at least a specified `difficulty`

Also, cryptographic hash digets are self-describing, so that the system can choose the best function for a given use case, and to evolve as function choices change.

Digest: `<function code><digest length><digest bytes>`

### Network

* Transport: IPFS can use any transport protocol
* Reliability: IPFS can provide reliability if underlying networks do not provide it
* Connectivity: IPFS uses ICE NAT traversal techniques
* Integrity: Using hash checksum
* Authenticity: using HMAC and sender's public key

### Routing

Needed to find other peers' network addresses, and peers who can serve particular objects. IPFS uses DSHT based on S/Dademlia and Coral. Distinction based on file size: small values stored directly in DHT, large values stored as references to `NodeIds` of peers who can serve the block.

### Block Exhcnage -- BitSwap Protocol

BitTorrent inspired protocol to exchange blocks with peers. Peers have `want_list` and `have_list`, and "barter" on the BitSwap "persistent marketplace." (More advanced functionality needs DLT and probably an underlying digital currency.)

Base case: Peers have blocks that provide direct value to one another, then swap.

Working: Node has nothing its peers want, so seek the pieces its peers want.

BitSwap Credit to incentivize nodes to seed when they don't need anything in particular.

### Object Merkle DAG

On top of DHT and BitSwap (which allow p2p storage and distribution), need to link objects together. Generalization of Git data structure.

* Content addressing: content uniquely idenfified
* Tamper resistence
* Deduplication

IPFS Object Format contains name/alias, multihash, size.

### Files

Defining a set of objects for modeling a versioned filesystem on top of the Merkle DAG:
* block: variable-size block of data (Git blob)
* list: collection of blocks or other lists
* tree: collection of blocks, lists, or other trees
* commit: snaption in the version history of a tree


## Filecoin

[How to Host your IPFS Files Online Forever](https://medium.com/@merunasgrincalaitis/how-to-host-your-ipfs-files-online-forever-f0c56b9b5398)

*"Unless your file gets popular and a lot of people pin it from their computer, your file will die. So better be prevented and store it yourself with this tutorial."*

Tutorial uses AWS, but doesn't that mean survival of your file is tied to survival of your AWS instance?

Building off of IPFS, adding blockchain elements. As an incentive lay on top of IPFS. Other blockchain systems allow devs to write smart contracts, but have very little storage capability and at a high cost. IPFS as a way to reference and distribute content, but need to add Filecoin support to guarantee storage of IPFS content (in exchange of Filecoin tokens).

Proof of replication to convince a user that a server/prover that some data has been replicated. Proof of spacetime to prove that data was stored throughout a period of time.
