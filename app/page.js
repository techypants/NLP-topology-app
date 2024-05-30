"use client";
import React, { useState } from "react";
import TopologyTree from "./components/topologytree";
import DHCPServer from "./scripts/basic/dhcp";
import BusTopology from "./scripts/basic/bus.js";
import RingTopology from "./scripts/basic/ring.js";
import MeshTopology from "./scripts/basic/mesh.js";
import StarTopology from "./scripts/basic/star.js";
import ParseText from "./scripts/parser/compromise/topo-parser";
import ParseInput from "./components/parseText";

// Create a global DHCP server instance
const dhcpServer = new DHCPServer(1, 250);

// Function to map topology types to classes
function getTopologyClass(type) {
  switch (type) {
    case "bus topology":
      return BusTopology;
    case "ring topology":
      return RingTopology;
    case "mesh topology":
      return MeshTopology;
    case "star topology":
      return StarTopology;
    default:
      throw new Error(`Unknown topology type: ${type}`);
  }
}

// Recursive function to process topologies and nested topologies
function processTopologies(topologyData, dhcpServer) {
  let topologies = [];

  topologyData.forEach((topo) => {
    let TopologyClass = getTopologyClass(topo.type);
    let topologyInstance = new TopologyClass(topo.count, dhcpServer);

    // If there are nested topologies, process them recursively
    if (topo.nested && Array.isArray(topo.nested)) {
      topologyInstance.nested = processTopologies(topo.nested, dhcpServer);
    }

    topologies.push(topologyInstance);
  });

  return topologies;
}

export default function Home() {
  const [inputJson, setInputJson] = useState("");
  const [topologies, setTopologies] = useState([]);

  const handleInputChange = (e) => {
    setInputJson(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const parsedJson = JSON.parse(inputJson);
      const processedTopologies = processTopologies(
        parsedJson.topologies,
        dhcpServer
      );
      setTopologies(processedTopologies);
    } catch (error) {
      alert("Invalid JSON format. Please check your input.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-[20px]">Network Topologies</h1>

      <ParseInput />
    </div>
  );
}
