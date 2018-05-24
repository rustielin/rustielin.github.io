---
layout: post
title: Blockshell, A Minimal Blockchain Learning CLI
headline: I taught a six hour long workshop on an Introduction to Bitcoin and Blockchain for new Blockchain at Berkeley members. As the first part of new members' "Month of Learning" program, it is imperative for all members to have seen the same material, establishing a baseline knowledge that we expect from every one of our members.
---

[Blockshell](https://github.com/rustielin/blockshell), credits to Daxeel

I taught a six hour long workshop on an Introduction to Bitcoin and Blockchain for new Blockchain at Berkeley members. As the first part of new members' "Month of Learning" program, it is imperative for all members to have seen the same material, establishing a baseline knowledge that we expect from every one of our members.

I had heard of an open source blockchain learning tool called Blockshell from one of my teammates, and was eager to play around with it myself. Blockchain and education (making the technology accessible) are the intersection of my intersts, and blockchain educational material especially help me gain new insight into how to teach students the material effectively.

After checking out Blockshell, I realized that it would be a good fit into my 6-hour workshop syllabus, especially after the Bitcoin low-level mechanics section.

Initially Blockshell did not implement the mempool, where transactions sit before they are included in a block. Instead, it mined a new block for each transaction that was submitted to the network via the command `dotx`. I saw the need to implement this mempool functionality into Blockshell as to not confuse my students as to how transactions actually work in Bitcoin.

After teaching the workshop, I submitted a pull request to Blockshell a while later with my changes, and was surprised to hear back pretty much immediately from the original author, Daxeel. He was very excited to hear about how people on the other side of the world were using his blockchain learning tool, and sent out a social media blast soon afterwards. It was 4:00AM here in Berkeley, solid time to be connecting with developers from around the world. Made my day :)

![pic]({{ "/res/img/2018-3-9-blockshell.jpg" | absolute_url }})
