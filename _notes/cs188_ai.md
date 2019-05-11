---
layout: page
title: CS188 Artificial Intelligence, Review
category: algorithms
---

<p class="message">
  Simplified notes from the course website.
</p>

## Note 1

Given the environment, we can write a rational planning agent and a search problem. We need:

* State space: e.g. all *(x,y)* tuples for pacman 
* Successor function: pacman can go NSEW
* Start state: position of all entities
* Goal test: whether all food pellets have been eaten

Search problems can be represented in memory as **state space graphs** or **search trees**. The first is usually too big, but represents each state only once. The second has no restriction on the number of times a state can appear, and paths through it can encode a plan or policy. 

Searching through a tree can be written with the following general algorithm:

![](../res/img/2019-05-11-14-01-55.png)

We can modify the general uninformed tree search algorithm to yield DFS, BFS, UCS, and incorporate heuristics to make A*. We generally keep in mind the following properties of search strategies:

* **Completeness**: will find the solution if it exists
* **Optimality**: will find the lowest cost solution 
* **Branching factor**: number of nodes placed on the fringe each time a node dequeued. Depth *k* search tree has $O(b^k)$ nodes
* Maximum depth *m*
* Depth of shallowest solution *s*

DFS:
* Always select the deepest fringe node
* Uses a LIFO stack
* Not complete: cycles and/or infinite depth trees will never have a solution
* Not optimal: will always find the "leftmost" solution with no regard of costs
* Time complexity: will search the entire tree in the worst case: $O(b^m)$
* Space complexity: fringe will store maximum of $O(bm)$ nodes

BFS:
* Always select the shallowest fringe node
* Use a FIFO queue
* Complete: if solution exists and *s* finite
* Not optimal: does not consider costs, but if all edges equivalent, then optimal (reduction to UCS)
* Time complexity: will explore all nodes at depth until solution depth: $O(b^s)$
* Space complexity: will store nodes at depth of the shallowest solution: $O(b^s)$

UCS:
* Always select the lowest cost fringe node
* Use a priority queue on the cost from the start to the new node
* Complete: if solution exists and *s* is finite
* Optimal: if all edges are nonnegative
* Time complexity: if optimal path cost $C^*$ and minimal cost between nodes in the state space graph $\epsilon$, then need to explore all nodes in depths ranging from 1 to $C^*/\epsilon$, so running time complexity of $O(b^{C^*/\epsilon})$
* Space complexity: will store nodes at level of cheapest solution:$O(b^{C^*/\epsilon})$

Greedy search:
* Always select the lowest heuristic cost node
* Use a priority queue on heuristic cost
* Completeness and optimality: depending on heuristic

A* search:
* Always select the lowest estimated total cost node (heuristic and lowest cost)
* Use a priority queue on backward (sum of edge weights) and forward (heuristic) cost
* Complete and optimal: given appropriate heuristic 
* High speed of greedy search and optimality/completness of UCS

Admissibility:
* Required for optimality of A* 
* $\forall n, 0 \leq h(n) \leq h^*(n)$, meaning heuristic is never negative or overestimate 

Consistency:
* Resured for optimality and *consistency* of A*
* $\forall A,C, h(A) - h(C) \leq cost(A,C)$, meaning that the heuristic should not only underestimate the total distance to the goal from any node, but should also underestimate the cost of each edge in the graph.
* Consistency implies admissibility

Dominance:
* if the estimated goal distance for a heuristic is greater than that of another heuristic for every node in the state space graph
* trivial heuristic is 0 for every edge, reducing A* to UCS
* gives rise to heuristic semi-lattice
  
![](../res/img/2019-05-11-14-23-24.png)

## Note 2

Minimax:
* opponent behaves optimally
* values of non-terminal states depends on values of terminal states

![](../res/img/2019-05-11-14-24-56.png)

Alpha-Beta pruning:
* if no more data can be provided
* does not affect eventual outcome, but may affect values of intermediary nodes

![](../res/img/2019-05-11-14-26-33.png)

Evaluation functions:
* take in current state and output estimate of true minimax
* not feasible to search until the bottom of search trees (games too big)
* used in **depth-limited minimax**
* linear combination of **features**, with weights

Expectimax:
* represent randomness, esp when not assuming opponent is optimal
* can also still prune
  
## Note 3

**Nondeterministic search problems** can be modeled with **Markov decision processes (MDPs)**

* set of states *S*
* set of actions *A*
* start state
* one or more terminal states
* **discount factor** $\gamma$ for finite horizon purposes
* transition function $T(s, a, s')$ that gives probability of taking a certain action from a state and going to a new state
* reward function $R(s, a, s')$ that rewards agent's survival and also arrival at terminal state
  * can be punishments as well (negative)

MDPs, like state-space graphs, can be unraveled into search trees. Uncertainty (e.g. by the transition function) is modeled by **q-states**, which are identical to expectimax chance nodes. The utility is then the the max over the q-states.

Bellman equation:

* dynamic programming equation, given inherent recursive structure


![](../res/img/2019-05-11-14-36-16.png)
![](../res/img/2019-05-11-14-36-23.png)
![](../res/img/2019-05-11-14-37-42.png)

Value iteration:
* running time is $O(\|S\|^2\|A\|)$ since need to update values of all $\|S\|$ states for all $\|A\|$ possible actions
  * Then another $\|S\|$ when extracting the policy, which requires iteration over all the states again
  
![](../res/img/2019-05-11-14-41-29.png)

Policy extraction:
* Note: better to keep list of q-values in practice, so don't have to recompute on the fly when extracting policy

![](../res/img/2019-05-11-14-42-09.png)

Policy iteration:

![](../res/img/2019-05-11-14-45-21.png)

![](../res/img/2019-05-11-14-45-40.png)


## References
1. Course notes from [CS188 Spring 2019](https://inst.eecs.berkeley.edu/~cs188/sp19/)