---
layout: page
title: Raft Overview
category: distributed systems
---

* A node can be in 1 of 3 states
    - Follower (all start here)
    - Candidate
        - If followers don't hear from a leader (**Heartbeat**) then they can become a candidate
        - Request votes from other nodes
        - Can become the leader if gets majority vote, **Leader Election**
    - Leader
        - All changes in system go through leader

- **Log Replication**
    - Transaction made, log entry uncommitted at first
    - Leader sends to nodes, and then wait until majority have written entry
    - Leader then notifies followers that entry is committed
- **Leader Election**
    - 2 timeouts in regards to voting
        - **Election timeout**
            - Time follower waits until become candidate
            - Randomized between 150 and 300 ms
            - **Election Term** starts if dont see a leader
            - Node votes for self, and sends out *Request Vote*
            - Receiving nodes vote on candidate iff they haven't voted yet this term
            - Election timeout reset
        - Leader sends out *Append Entries*, with intervals specified by **Heartbeat Timeout**
            - Followers respond to *Append Entries* message
            - Election term will continue until a follower stops receiving heartbeats and becomes a candidate
        - Requiring majority votes guarantees only one leader can be elected per term
        - Unless **split vote**
            - Two nodes both start an election for the same term
                - Not enough
                - Wait for election and try again next term
        - **Log Replication** procedure
            - Once have leader, replicate all changes to all nodes
            - Uses same *Append Entries* message
            - Client sends leader request, appends to leader log
            - Leader sends to all other nodes on next heartbeat
        - **Partition Tolerance**
            - Uncommitted so long as no majority
            - Majority as seen in face of partition, eg 2+3 partition, 3 can 2/3 majority
            - Recovery
                - Leader step down when higher term seen
                - Roll back uncommitted entries and match new leader's log
