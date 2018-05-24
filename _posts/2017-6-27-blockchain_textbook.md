---
layout: post
title: Blockchain Textbook
headline: I've recently been working on a series of personal notes on blockchain technologies and cryptocurrencies as a passion project, and also to brush up on my understanding. Last Spring, I was a student in Blockchain at Berkeley's "Introduction to Cryptocurrencies and Blockchain" DeCal (student run class). Going in, I knew at a very high level what blockchains were and how they functioned, but to me it just sounded all hype and no substance (I had not read any technical papers or articles back then). Having taken the class and increasing my level of understanding, I have fully embraced the hype around upcoming cutting-edge blockchain technologies, thanks to friends as well as the wonderful course staff.
---

I've recently been working on a series of personal notes on blockchain technologies and cryptocurrencies as a passion project,
and also to brush up on my understanding. Last Spring, I was a student in Blockchain at Berkeley's "Introduction to Cryptocurrencies
and Blockchain" DeCal (student run class). Going in, I knew at a very high level what blockchains were and how they functioned, but
to me it just sounded all hype and no substance (I had not read any technical papers or articles back then). Having taken the class
and increasing my level of understanding, I have fully embraced the hype around upcoming cutting-edge blockchain technologies, thanks to
friends as well as the wonderful course staff.

In the beginning of June, word got around among my connections that I was working on this project. One of my good friends, who is currently
Co-head of Education at B@B joined me for the project, and we've been working at a steady pace online using ShareLatex's handy
live collaborative editing feature. He introduced the project to the president of the organization, who immediately was a fan of our work, even offering
to make our set of notes available to future students of the course as a sort of textbook.

Not only have I been enjoying brushing up on blockchain, I've also been having fun writing documents in LaTeX, the document typeseting
system. The documents come out looking very nice, so as a writer I can focus more on the content than on how the document looks. For those
curious, the project is currently open-sourced on GitHub [here](https://github.com/rustielin/Blockchain-Notes). I'm planning on compiling
the PDF's manually and sticking them in the GitHub repo soon. But for now, Tex files can be compiled using an editor such as
Gumi, or an online service such as ShareLatex.

Here's a taste of what we're writing...

{% highlight latex %}
 \section*{Mining Sketch -- Finding Blocks}

    Every miner includes a special transaction called a \textbf{coinbase transaction} in a block's list of transactions. This transaction allows miners to receive a mining reward \big(currently at 12.5 BTC (6/20/17)\big) if they find a valid proof-of-work before every other miner. Miners who have found a valid proof-of-work have, in Bitcoin vernacular, ``found the block." The miner saves the block to his own blockchain, then broadcasts the block to the rest of the Bitcoin network. Other miners in the network would verify the block and then add it to their own copy of the blockchain.

    On average, a block is found every 10 minutes. Not by chance, but by design: because the average level of computational power (which we shall also refer to as ``\textbf{hash rate}") within the network constantly varies, the difficulty of the problem which miners solve (the Proof-of-Work puzzle) must adjust accordingly. Consider a scenario in which the difficulty remained constant: if the hash rate rises significantly (the expected long-term trend), then the puzzle becomes too easy to solve, and the proof-of-work no longer requires any work to find; and if the hash rate decreases significantly, then the network gets backed up because valid blocks are too difficult and time-consuming to generate. Hence, the puzzle's difficulty must adapt to remain relatively as difficult as before with the network's hash rate fluctuations. (We shall discuss further in Note 5, ``Mining.")

    The block reward halves every 4 years; at the time of writing, the nearest instance of the block reward halving will be on July 9th, 2017. A halving block reward implies that bitcoins are in limited supply, i.e. deflationary, as the block reward will approach 0 over time and no more bitcoins will be minted. Around Year 2140, the maximum of 21 million bitcoins will be in circulation. There are approximately 15.2 million bitcoins in circulation today (6/19/17).

    Briefly, the process of mining can be described as follows: A miner attempts to generate a ``valid" block header. Before we discuss the definition of ``valid," let us look at what defines a potential block header:
    $$\mathit{Output} = \text{SHA-256}\big(\mathit{Merkle~Root} + \text{SHA-256}(\mathit{Previous~Block}) + \mathit{Nonce}\big) = \mathit{Block~Header}$$

    The output of the hash of three components, 1) the \textbf{Merkle root}, 2) a hash of a previous block header, and 3) a \textbf{nonce}, generates a block header. A Merkle root preserves a summary of transactions by using some useful cryptographic properties which we will discuss later. A nonce is an arbitrary number, the piece of the math puzzle miners search for, the coveted proof-of-work, and the only part of this equation that changes. A miner uses SHA-256 to hash together the Merkle root, a nonce, and a hash of the previous block.

    A ``valid" block header must contain a prerequisite number of leading zeroes agreed upon by the network per the ``difficulty." The higher the difficulty, the more leading zeroes required for a valid block header, and vice versa. Validity is defined as leading zeroes because a) any arbitrary pattern could have been selected (leading number of sixes, sequential order of digits), but leading zeroes happened to be selected, and b) the required amount of leading zeroes is easy to adjust, fulfilling our desire from before for an adjustable difficulty. The solution (proof-of-work) that miners vie for is defined as an output that generates a valid block header. The difficulty of the puzzle is constantly adjusted every 2016 blocks (every two weeks at 10 minutes/block).

   \includegraphics[scale=0.65]{blockchain_diagram}

{% endhighlight %}

...and what it compiles to:

![blockchain notes](/res/img/blockchain_notes.png)
