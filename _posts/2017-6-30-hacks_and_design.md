---
layout: post
title: Hacking vs. Precision
headline: It's obvious that strategy 1 is useful whenever you're rapidly prototyping, or trying to get something to work as a proof of concept, and that strategy 2 is useful for long-term deployable projects where there's more time to contemplate all the possible edge cases and potential exploits.
---

<p class="message">
  Just a quick advertisement: I'll be talking about blockchain in this post. Feel free to educate yourself through
  the textbook I'm writing <a href="https://github.com/rustielin/Blockchain-Notes">here</a>!
</p>

I've recently undertaken a research project involving designing and implementing a consensus protocol on a blockchain system.
This project has made me contemplate distinct design strategies and the optimal situations to use them:

<div>
    <br>
    <ol>
        <li> Hacking: aka build, break, build; moving fast and breaking stuff </li>
        <li> Aiming for perfection: precision code that considers many edge cases, or contains protocol for change </li>
    </ol>
    <br>
</div>

It's obvious that strategy 1 is useful whenever you're rapidly prototyping, or trying to get something to work as a
proof of concept, and that strategy 2 is useful for long-term deployable projects where there's more time to contemplate
all the possible edge cases and potential exploits. However, my experience designing this consensus protocol starting from
cryptographic primitives has shown me that blockchain systems **MUST** be as perfect as possible or include functionality
to adapt, especially since it's a relatively new
mainstream technology that must be handled carefully, else skewing the public eye. There's already a significant population of
blockchain and Bitcoin skeptics, and given how volatile controversial new technologies are, all it takes is another hacked
exchange, coin fraud, or system failure to have the public shift their focus away from blockchain. I truly believe that
emerging blockchain technologies hold the key to unlocking the massive decentralized and distributed systems of the future, which is why
developers and protocol designers and researchers must take no shortcuts.

Doing this sort of consensus research was a welcome change of pace for me, a regular hackathon attendee. I often prided myself with
getting things to work, as quickly as possible, and (funny story) I even have a couple shirts that say: 'Build, Break, Build',
precisely strategy 1. At hackathons, and also for some personal projects of mine, a common theme would be to hook up various
pre-existing services or APIs together with a unique idea, without any consideration of the underlying code of these services.
I would also just perform some on-the-fly ad hoc testing, since there was always a time constraint. There's a time and place
for hacking, and often times it boils down to opportunity cost -- balancing pro and con -- but mission critical design schemes
such as those in blockchain call for strategy 2.

Designing consensus protocols is very detail oriented; you must take into account any and all possible conditions. A small bug,
mishandled exception, or unexpected behavior could bring the whole thing down. This is especially the case when considering the
classic problem of Byzantine fault tolerance. As the story goes, research on Byzantine fault tolerance began shortly after
people decided it was a good idea to put computers on airplanes. Solar radiation, wind, and harsh conditions in general could potentially
mess up on-board computers (unintentional bit flips, etc.). Especially since air planes have people in them, failed computations could
alter the flight schedule and make customers unhappy, or in extreme situations even threaten the life of everyone onboard. Needless to say,
computers are pretty important on planes.

It all boils down to finding a way to handle dropped connectivity or nodes that acted in any arbitrary way (aka Byzantine).
There are many proposed solutions to build Byzantine fault tolerant networks. Probably the most famous and earliest developed ones
is Bitcoin's Proof-of-work scheme, where nodes in the network (called miners) decide on the next block of transactions by solving
a really hard cryptographic puzzle. Once solved (found the proof-of-work), they propagate their solution, everyone validates the
solution, and either reject or accept it. Then they keep mining.

Bitcoin's Proof-of-Work scheme catches a lot of malicious behavior, and ensures that the network will continue to be healthy
as long as 51% of all nodes are honest. There's an assumption that the longest blockchain must be the legitimate blockchain,
and people mine on the longest one because there's no economic incentive to mine on a shorter one and get no mining reward.

In addition to being very precise in its cryptography and code, and catching Byzantine behavior, Bitcoin also has built
into its protocol support for BIPs (Bitcoin Improvement Proposals) which allow it the flexibility to survive. Bitcion realizes that
it's not a perfect system, and allows itself to adapt to maintain the health of its network. This I feel is an important feature of
protocols and also in design in general.

The main problem is that of over-engineering. Similar to how you don't want to fit a model so closely to existing data
that the model can't generalize, it's often difficult or ineffective to design a protocol to function exactly the way it was designed to, forever.
With over-engineering, there's no room for growth. This is why there's a protocol to write amendments to the US Constitution, the written form of government.
This is why blockchain systems often include ways to come to consensus over changes in the protocol itself. (Side note: blockchain
for government is a real thing!) There must be a way to grow, otherwise the system breaks or splits. I'll present two examples.


<div>
    <br>
    <ol>
        <li> After the hacking of the DAO, two main groups of thought
             led to the split between Ethereum and Ethereum Classic. Those who believed that 'code is law', and that the
             design system must be followed no matter the cost, continued in Ethereum Classic. Those who believed that the previous group's
             mindset was too strict and allowed no room for growth continued in Ethereum. Both chains exist currently, so I guess there's merit
             in both schools of thought. </li>
        <li>
        A less technical/crypto related example deals with the hypothetical automation of police and surveillance. In compliance
        with traffic laws, say that all car manufacturers get together to design cars that automatically pull over when they surpass
        the speed limit. The moment there's a life threatening situation that requires someone to drive faster than the speed limit, the system breaks because the situation was not accounted for.
        </li>
    </ol>
    <br>
</div>

So, in being specific and precise, protocol designers must encapsulate, predict, and account for all possible outcomes, or
design into the protocol a flexible method of proposing change. Moral of the story is: there's a time and place for most design schemes.
There's an opportunity cost associated with choosing
rapid paced prototyping versus precise design. In the world of blockchain, consensus protocol design should be as precise as
possible and/or include protocol for change. Some might find change for the better more trustworthy, while others might find the notion
of unstoppable code, or immovable protocols more appealing. It's all up to design, case by case. Anyways, there should  be the ability to detect fraud, and to enforce
trust to maintain the health of the network. After all, blockchains are at the core a way to exercise 'trust as a service.'

Just a couple interesting things and itching thoughts I had to dump somewhere. Blockchain technology is amazing and I'm learning very much.
I'm very excited to be a part of this.
