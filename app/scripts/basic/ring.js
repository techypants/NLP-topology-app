class Node {
  constructor(id) {
    this.id = id;
    this.x = null;
    this.y = null;
    this.ip = null;
    this.nextNode = null;
  }

  setNextNode(nextNode) {
    this.nextNode = nextNode;
  }

  getNextNode() {
    return this.nextNode;
  }
}

export default class RingTopology {
  constructor(num_Nodes, dhcpserver) {
    this.nodes = [];
    this.dhcpserver = dhcpserver;

    const ringswitch = new Node("ringswitch");
    ringswitch.ip = this.dhcpserver.allocateIP();

    for (let i = 0; i < num_Nodes; i++) {
      const node = new Node(i);
      node.ip = this.dhcpserver.allocateIP();
      this.nodes.push(node);
    }
    for (let i = 0; i < num_Nodes; i++) {
      const currentNode = this.nodes[i];
      const nextNode = this.nodes[(i + 1) % num_Nodes];
      currentNode.setNextNode(nextNode);
		}
    this.nodes.push(ringswitch);
		
  }
  getNode(id) {
    return this.nodes[id];
  }
}

// const rings = new RingTopology(8);
// const node0 = rings.nodes[0];
// for (let i=0;i<rings.nodes.length;i++){
//     console.log(rings.nodes[i].id,"->",rings.nodes[i].nextNode.id)
// }

// module.exports = RingTopology
