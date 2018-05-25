---
layout: page
title: Plasma Cash
category: blockchain
---

<p class="message">
  Some notes that I later transcribed from a discussion on the <a href="https://ethresear.ch/t/plasma-cash-plasma-with-much-less-per-user-data-checking/1298">Plasma Cash proposal</a> a couple days after it was posted.
</p>



* Every desposit corresponds to unique coin ID; tokens are indivisible and cannot be merged
* Instead of storing transactions in a binary Merkle tree in order of txindex, we require them to be stored in either a sparese simple Merkle tree or a patricia tree, with the index being the ID of the coin that is spent

## Proving coins valid
All the transactions since the time the coin was deposited that represents the coin's history, plus a proof of non-inclusion for every block that does not contain a transaction spending the coin. With *n* coins and *t* blocks, the proof has size *t\*log(n)*, since for every block the cost of traversal of the tree storing transactions is *log(n)*.

## Storing signatures
What if we have a lot of signatures for every client to store? Signature for each transaction, and we have to keep track of all transactions that ever happened to coin *i* that I own. The number of signatures is only linear to the number of transactions that have happened to coin *i*.

This is to challenge someone trying to exit (e.g. original depositor). Could be a problem on really really old chains. Can chains be that old so that this is really an issue? Even if so, could also just withdraw and deposit again to start over the history.

## A transfer to B
Idea is to give A a way to burn her ownership of a coin once a transfer has been made. A will only burn her coin if daa of her transaction is made available from the operator.

A makes transaction to B. A sends operator a signed hash of a random number to be included in leaf node of her coin.

To prove ownership of coin, B must now prove that he has the random number that hashes to the value. A will wait until data is available (by operator) before she gives B the pre-image. When B gets pre-image, then he broadcasts to the network and now owns the coin.

If A attempts to exit, we slash her deposit if the pre-image of her committed hash is revealed by someone.

Pro: A is in complete control of her coin, regardless of operator's actions. Disincentivize dishonest withdrawls by slashing balances.

## Issues

Some issues in Plasma Cash, and in minimum viable Plasma in general:

### Block Withholding

We need confirm signatures! Need confirm signature to challenge an exit.

How it works in minimum viable Plasma:
* Alice sends coin to Bob
* Bob sends block over to Alice
* Alice sees block
* Alice sends signature to Bob

Plasma cash:
* No signature needed after block published

Earliest expenditure of a coin is valid.

Need way to store random numbers

### Divisibility

Not really useful as cash if we limit the divisiblity such as in this implementation.
