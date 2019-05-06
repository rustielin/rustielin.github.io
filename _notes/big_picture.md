---
layout: page
title: The Big Picture
category: distributed systems
---

I've been stuck in the weeds recently learning all these specific technologies, and while there's merit in that, sometimes I need to take a breather and explore the big picture. Everything needs a clear direction and in that sense the big picture of systems and the applications and workloads they support is this guiding north star. 

# Scaling Distributed Systems

## Design

Fixing bugs takes order 10 to 100x longer time than it takes to account for the bug in design and work a solution around it.

Also have to determine in design which dimensions you can possibly scale at. There's also the concern of whether you solve issues now in design or solve them up front as they arise, hitting some scaling wall.

## Microservices

Microservices is a buzzword, and there's no real cutoff between services and microservices in regards to compute, storage, other metrics, etc. Instead, it's more valuable to think of pushing down the scale of any service you write. Smaller services are easier to swap in and out. For example, if the initial design was flawed or a new better way to solve a problem is discovered, small scale services provide the modularity needed to easily swap out individual parts of a service.

There's a bit of a paradox here: 
- Microservices increase scalability by modularity, which means loose coupling
- Scalability can be achieved by tight coupling of individual components

Moral of the story is that things will need to be titrated in production.

# What Picture? Tangent on how to make impact

Note: A bit of a tangent, and me jotting down a bunch of ideas/ranting:

Lamport implies various times in his Turing Award paper "The Computer Science of Concurrency: The Early Years" that there's a huge gap between engineering solutions to concurrency issues and the study of concurrency in computer science. Dijkstra studied and published fault tolerances and self stabilization in 1974, without having the direct application of his work in mind. Perhaps he (and others) anticipated fault tolerance to be a major field of study within computer science and thus chose to pursue the study, but it's hard to know for certain. It's more worth noting (personally) that early systems implemented solutions to concurrency and fault tolerance in distributed systems from the engineering perspective, without consulting the formalism of scientific work such as that of Dijkstra. 

As Lamport puts it, "A survey of fault tolerance published in 1978 does not mention a single algorithm, showing that fault tolerance was still the province of computer engineering, not of computer science." [[2]](http://lamport.azurewebsites.net/pubs/turing.pdf) 

That is to say that there's an obvious tradeoff between engineering and science-ing solutions -- in many aspects. One is driven by the need for a solution so as to solve an issue with an application or domain focus. The other is driven by the pure scientific pursuit. Of course there might be some driving application or foresight/insight, but science often abstracts away the usages of its findings. Papers that do not are often either whitepapers describing something that has already been built (in which case it might as well be a high level system spec) or pressured somehow (e.g. by source of funding) to append notes on future work or applications. 

In terms of the cycle of impact-making: it seems from my perspective that when problems first arise, a solution is hacked first. Unless it's a very fundamental problem, it's often not worth it to pay the cost of all the abstraction overhead and design from the top down again (scientifically). Problems are run into in industry or other engineering circumstances, and should be dealt first in that context. If there seem to be recurring problems with the solution, or similar problems keep arising, then it seems like the best way to amortize future time spent fixing problems is to subject the nature of the problem in question to more rigorous scientific study. In general, we work up the stack: assuming problems arise in engineering and not just scientific ideation, impact is first made directly facing the application, and then later escalated to pure scientific pursuit if necessary.

Adopting a science-only or engineering-only policy seems suboptimal, since you'll either always be upper or lower bounding the abstraction layers you're working on. Instead, pick up the skillset to work in between. Then brings up the question of whether workflow should be communication bound or compute bound. I mean communication in terms of ferrying work and reults between engineering and science workflows, and compute in terms of actual time and engergy spent in engineering and science. It's definitely hard to translate scientific works to the real world. Academics often deal in situations of theory and absolutes and assumptions. And when it comes to implementation, that's when ideas meet reality. Perhaps a happy middleground to focus on would be academically-focused engineering.


## References

1. [Hidden Scaling Issues of Distributed Systems](https://blog.ably.io/hidden-scaling-issues-of-distributed-systems-system-design-in-the-real-world-9a9f0d309e8e)
2. [The Computer Science of Concurrency: The Early Years](http://lamport.azurewebsites.net/pubs/turing.pdf)