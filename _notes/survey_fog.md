---
layout: page
title: Survey of Fog Computing
category: distributed systems
---

<p class="message">
  Recently been interested in fog computing after having to investigate in my graduate parallel computing class. Especially interesting has been investigation in light of multicloud and blockchain systems.
</p>

## Visual Fog Computing 

Fog computing is a paradigm by which edge devices as well as intermediate gateways and servers on the path to the centralized cloud can be used to provide high availability and low latency compute. The main challenge is scheduling and distributing compute jobs amongst heterogeneous devices.

Chu, Yang, Pillai, and Chen [[1]](https://aaai.org/ocs/index.php/AAAI/AAAI18/paper/view/16426/16183) pose the problem of scheduling tasks for visual fog computing, powering large scale visual processing applications in real time. Applications of such technology are readily available in big data analytics [[2]](http://arxiv.org/abs/1807.00976) for example in retail, directed advertisement, and video for senior and baby care. Application of parallel computing can drastically reduce the resources required for visual fog computing. Due to the traditionally high compute requirements characteristic of typical visual fog computing tasks, tasks are split up and offloaded (scheduled) to other devices. It is widely known that video analytics jobs can be split into interdependent processing stages. Thus, the general strategy is to leverage task and data level parallelism.

After proving the NP-completeness of scheduling tasks in visual fog computing, reductions of realistic visual fog computing settings to ILP are tested. Two successful proposed solutions are `ILP-T` and `ILP-D`, resulting from generalizations of the two fundamentals types of parallelism available for the visual fog compute problem. Tests of `ILP-T` and `ILP-D` with a centralized solver under various simulated visual fog settings are promising. Experiments were run on Intel Xeon processors using MATLAB Optimization Toolbox. Simulations with varying task tree depth and branching factor show that despite the fact that the visual fog computing problem is proven intractable, the proposed solution is scalable to upwards of 20,000 source devices thanks to compute offloading and varying levels of parallelism.

## Distributed Scheduling 

Just like how using "dumb" IoT devices to stream data to the cloud for complex event processing and data analytics poses a network bottleneck, so too does the existence of a centralized scheduler (see the centralized ILP solver in the previous section). Centralization clearly does not scale well. Especially is the case when considering that proposed fog computing workloads are often characterized by their requirement for low latency. Consider the use case of controlling a power grid. IoT devices are connected to the physical world and often need to react quickly to real world events. Fog computing infrasturcture thus cannot afford a centralized network bottleneck and send all computing jobs to the cloud. Thus motivates distributed scheduling (and parallel execution).

## Distributed Storage

Extending on previous observations, it can be noted that one of fog computing's advantages over the cloud is that of data locality. Specifically, the fog is deployed locally such that networks are aware of the general topology. In contrast, the cloud -- though more powerful and centralized in terms of compute -- is less topologically aware. In fog storage systems, `put` operations are handled by the closest site. [[3]](https://www.computer.org/csdl/proceedings/cloudcom/2016/1445/00/07830696.pdf)

Within such distributed storage systems deployed in the fog, trust must be carefully administered. Ideas of using blockchain to impose explicit trust models onto the fog have been proposed [[4]](https://blogs.cisco.com/innovation/blockchain-and-fog-made-for-each-other) but will not be the focus in this survey. Instead, we turn specifically to distributed storage systems that are topologically aware. Of such a class of storage system, RADOS (Rados, Reliable Autonomic Distributed Object Store), Cassandra, and IPFS stand out. While Rados and Cassandra were designed for deployment in the cloud, IPFS was designed for deployment at the edge of the network, with decentralization in mind. 

In Rados, nodes are either monitors or storage daemons, with monitors running a variant of the Paxos consensus algorithm agreeing upon a common network topology and mapping of files and objects to their respective storage daemons. Paxos guarantees that there is only one master monitor. The data structure tracking the network topology is known as the "clustermap" and is distributed to all storage daemons so that they can locate objects using the CRUSH distributed algorithm. [[5]](https://ceph.com/wp-content/uploads/2016/08/weil-crush-sc06.pdf) The client fetches the clustermap from a monitor and uses that to index into the storage system and find which site contains the object requested. 

Cassandra is a distributed key value store that uses a one hop DHT. Ranges of the key space are allocated to each node in the system and gossiped around such that each node knows the total network topology. Since it uses a one hop DHT, once gossip has finished, each node can locate any object simply by hashing the object's key and contacting the node responsible for the key space in which the key falls under. Similar to Rados, in Cassandra, the client must specify the keyspace's name they want to use. Upon connecting to the network, the client receives the topology from a server, and then use this topology to directly request data from the site containing the node that contains it. 

IPFS is arguably simpler than both Rados and Cassandra in design, and famously leverages two well known open source technologies. BitTorrent is used to effectively transfer large data between users in a p2p fashion, and Kademlia DHT is used to store location metadata for the data transferred by BitTorrent. Notable is the location management system in IPFS compared to Rados and Cassandra. Rados and Cassandra are both designed to minimize communication and are able to locate and fetch data without extra communication from the client's viewpoint. When a client stores an object in IPFS, the connected IPFS node will store it locally and note the object location in kademlia DHT. When a client queries for an object in IPFS, the connected IPFS node will consult kademlia DHT and forward the request to the correct node. Upon receiving the object, the intermediate IPFS node will cache the object such that future retrievals of the same object by the client will maximize on spacial locality (if the client calls an IPFS node geographically close to it). The new replica of the data will also be announced on the DHT. Thus, IPFS supports native data mobility. Also, IPFS uses immutable objects, and objects are all content addressed, making it easier to maintain consistency of replicas across IPFS nodes.


// some more stuff here

## FogBus




## References

1. [Scheduling in Visual Fog Computing: NP-Completeness and Practical Efficient Solutions](https://aaai.org/ocs/index.php/AAAI/AAAI18/paper/view/16426/16183)  
2. [Fog Computing: Survey of Trends, Architectures, Requirements, and Research Directions](http://arxiv.org/abs/1807.00976)  
3. [Performance Analysis of Object Store Systems in a Fog/Edge Computing Infrastructures](https://www.computer.org/csdl/proceedings/cloudcom/2016/1445/00/07830696.pdf)
4. [Blockchain and Fog: Made for Each Other](https://blogs.cisco.com/innovation/blockchain-and-fog-made-for-each-other)
5. [CRUSH: Controlled, Scalable, Decentralized Placement of Replicated Data](https://ceph.com/wp-content/uploads/2016/08/weil-crush-sc06.pdf)