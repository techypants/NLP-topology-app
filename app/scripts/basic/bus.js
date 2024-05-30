import DHCPServer from "./dhcp";

class Node {
  constructor(id) {
    this.id = id;
    this.ip = null;
    this.connectedNodes = [];
  }
  connectTo(node) {
    this.connectedNodes.push(node);
  }
  getConnectedNodes() {
    return this.connectedNodes;
  }
}

export default class BusTopology {
  constructor(numNodes, dhcpserver) {
    this.nodes = [];
    this.dhcpserver = dhcpserver;
    const bus = new Node("bus");
    bus.ip = this.dhcpserver.allocateIP();
    for (let i = 1; i <= numNodes; ++i) {
      const node = new Node(i);
      node.ip = this.dhcpserver.allocateIP();
      this.nodes.push(node);
    }
    this.nodes.push(bus);

    for (let i = 0; i < numNodes; i++) {
      const currentNode = this.nodes[i];
      currentNode.connectTo(bus);
    }
  }
  getNode(id) {
    return this.nodes[id];
  }
}

// const bus = new BusTopology(6);
// const bus0 = bus.getNode(0);
// const connections = bus0.getConnectedNodes();
// console.log(bus0)

// module.exports = BusTopology;
