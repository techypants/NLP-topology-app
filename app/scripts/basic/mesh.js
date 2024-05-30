import DHCPServer from "./dhcp";

class Node {
  constructor(id) {
    this.id = id;
    this.ip = null;
    this.connectednodes = [];
  }
  connectTo(node) {
    this.connectednodes.push(node);
  }
  getConnectedNodes() {
    return this.connectednodes;
  }
}

export default class MeshTopology {
  constructor(numNodes, dhcpserver) {
    this.nodes = [];
    this.dhcpserver = dhcpserver;
    const meshswitch = new Node("meshswitch");
    meshswitch.ip = this.dhcpserver.allocateIP();
    for (let i = 0; i < numNodes; i++) {
      const node = new Node(i);
      node.ip = this.dhcpserver.allocateIP();
      this.nodes.push(node);
    }
    this.nodes.push(meshswitch);

    // connect each node to every other node
    for (let i = 0; i < numNodes; i++) {
      const currentNode = this.nodes[i];
      for (let j = 0; j < numNodes; j++) {
        if (i != j) {
          currentNode.connectTo(this.nodes[j]);
        }
      }
    }
  }
  getNode(id) {
    return this.nodes[id];
  }
}

// const mesh = new MeshTopology(5);
// const mesh0 = mesh.getNode(0);
// const connections = mesh0.getConnectedNodes();
// // console.log(connections.map((node) => node));
// console.log(connections)

// module.exports = MeshTopology
