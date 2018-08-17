---
layout: post
title: Thoughts on Time
headline: Two days pass, and Bob hasn't heard from Alice. So Bob wonders -- has Alice baked the cake? The event of Bob wondering about Alice's cake and Alice's baking/not baking of the cake are concurrent. In physics, we might say that Alice both baked and didn't bake the cake, but in distributed systems talk, we just simply don't know.
---

<div class="message">
Note: this was written very late at night and with no revision, so this is pretty much my pure thought process, very quickly and roughly sketched into markdown.
</div>

I began the summer eager to start coding again after having spent the last year at school taking only courses on computer science theory. My intended focus was blockchain development, and I wanted to build some projects with Cosmos and Tendermint.

However, after some contemplation, I decided that it would be more impactful to approach blockchain development from an academic standpoint. This was especially the case after watching a particular talk by Leslie Lamport titled "Thinking Above the Code." Being in a university just one or two hops away from literal distributed systems gods, I changed my focus to learning about distributed systems from the very beginning -- a full academically-grounded survey.

I've always appreciated distributed systems; my favorite lecture to teach for the Blockchain Fundamentals DeCal was our lecture on alternative consensus. It's one of our more technical lectures: starting from formal definitions of distributed systems and their properties and fundamental tradeoffs, we extend that knowledge into the blockchain space. My personal flair that I've added when I taught it was to wrap it in the narrative of first explaining what it means to come to be distributed, and to have consensus (socially), the origins of distributed systems, and the historical context for its study.

My study this summer began with a history lesson on the specific problems and research labs associated with the birth of distributed systems. The works of Leslie Lamport and co and that leading up to SIFT was where I started.

The formal study of distributed systems in computer science began roughly around the time the aerospace industry decided they wanted to put computers on aircraft. Computers could help with data collection about fuel levels, altitude, speed, etc. and later, advancements in digital avionics would lead to innovations in autopilot and fly-by-wire technologies. The fundamental challenge faced here though is that of computing in extremely harsh conditions, namely in the face of heat and cold and of potential solar radiation. There was a need to distribute the points of failure across multiple computers, just in case one failed in execution. Coordination of these separate computers proved to be a challenge though.

Through the lens of a computer scientist, a fundamental challenge to face here is that of event ordering. If we have multiple computers on an airplane logging data from various sensors onboard, we need to maintain a consistently ordered log across all machines.

Amongst other early distributed systems papers, "Time, Clocks, and the Ordering of Events in a Distributed System", written by Leslie Lamport, stood out to me for being incredibly intuitive. In it, Lamport explains what it means for an event to precede -- or happen before -- another. A majority of the paper is spent formalizing the definition of $$a \leftarrow b$$, read as $$a$$ happened before $$b$$.

The key insight is that at the most basic level, $$a \leftarrow b$$ if either $$a$$ and $$b$$ occur in the same process and $$a$$ happened at an earlier time than $$b$$, or $$a$$ and $$b$$ occur in different processes and $$a$$ is the sending of a message and $$b$$ is the receiving of a message. the $$\leftarrow$$ operator is also composable.

![res/img/20180816123412952-atom-img-paste.png]({{ "res/img/20180816123412952-atom-img-paste.png" | absolute_url}})

Above, $$p_1$$ and $$q_1$$ are concurrent. $$p_1 \leftarrow q_7$$ and $$q_1 \leftarrow q_7$$

Machines may see events in different physical order, but they must agree on a partial ordering of events such that consensus can occur. In his paper, Lamport explains that this is not a problem of computer science but that of physics, and explains the ordering of events and associated phenomena as parallel to that of special relativity.

With a very limited understanding of special relativity, trying to piece together this meaning was a challenge for me, but I believe I've built up a very solid intuition for this. In special relativity, different observers may see events happening in different order. Same goes for distributed systems. The slight difference is that in special relativity, we consider all events that could potentially happen when constructing the partial ordering, whereas in distributed systems, we only consider the events that have actually occurred.

In that case then, it only makes sense to order events that have a causal relation. I believe this to have a relation to that of the age old "If a tree falls in the woods with no sound, did it actually fall"-type questions. You as the observer may have existed at the same time the event of the tree falling supposedly occurred, but since there's no causal relationship between you existing and the tree existing (standing/falling), whatever actually happened doesn't matter to you. My understanding is that in physics, we consider the tree to be both standing and falling -- in a superposition of all its possible states -- since we have not observed it. Upon observation, there is a transfer of information, and so the superposition collapses into a single event -- the tree having fallen or not.

We can see the same in distributed systems as well, and the fact that these two -- special relativity and distributed systems -- are so analogous represents to me the generality the concept of time and the fundamentality of the idea of modeling a system in a distributed fashion. Say that Alice and Bob are friends that don't get to see each other that often in person -- perhaps they live in different cities. On a particularly nice day, Alice calls Bob to tell him that she plans on baking a cake the day after. Bob acknowledges, and the day ends. Two days pass, and Bob hasn't heard from Alice. So Bob wonders -- has Alice baked the cake? The event of Bob wondering about Alice's cake and Alice's baking/not baking of the cake are concurrent. In physics, we might say that Alice both baked and didn't bake the cake, but in distributed systems talk, we just simply don't know. (Again, in distributed systems we care about the events that actually happen, as opposed to the set of all events that could possibly happen.) Only after Alice texts Bob an image of the amazing cake that she baked does Bob gain context and realize that Alice did in fact bake the cake.

This then got me thinking about concurrent processes in general. One of my good friends studies neurobiology, and explained to me how the highly parallel human brain handles concurrency. I've also stumbled across academic papers applying $$\pi$$-calculus and ambient calculus (calculi of concurrent processes traditionally used for formal modeling of distributed systems) to intracellular routines (amongst organelles and RNA transfer.)

Time is a natural thing, and our understanding of distributed systems comes from applying insight from the physical world into the logical world. I've come to appreciate the art of reasoning about such scenarios at a fundamental level. Understanding distributed systems formalisms (and elegance), I plan on re-evaluating blockchain from the academic eye.
