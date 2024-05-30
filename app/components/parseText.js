import React, { useState } from "react";
import ParseText from "../scripts/parser/compromise/topo-parser";
import DHCPServer from "../scripts/basic/dhcp";
import BusTopology from "../scripts/basic/bus";
import RingTopology from "../scripts/basic/ring";
import StarTopology from "../scripts/basic/star";
import MeshTopology from "../scripts/basic/mesh";
import TopologyTree from "./topologytree";

const dhcpServer = new DHCPServer(1, 250);

function processTopologies(topologyData, dhcpServer) {
  let topologies = [];
  topologyData.forEach((topo) => {
    let TopologyClass = getTopologyClass(topo.type);
    let topologyInstance = new TopologyClass(topo.count, dhcpServer);
    if (topo.nested && Array.isArray(topo.nested)) {
      topologyInstance.nested = processTopologies(topo.nested, dhcpServer);
    }
    topologies.push(topologyInstance);
  });
  return topologies;
}

function getTopologyClass(type) {
  switch (type) {
    case "bus topology":
      return BusTopology;
    case "ring topology":
      return RingTopology;
    case "star topology":
      return StarTopology;
    case "mesh topology":
      return MeshTopology;
  }
}

export default function ParseInput(inputText) {
  const [inputdata, setInput] = useState(null);
  const [inputJson, setInputJson] = useState("");
  const [topologies, setTopologies] = useState([]);

  // const handleInputChange = (e) => {
  //   setInputJson(e.target.value);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setInput(ParseText(e.target.value));

      const parsedJson = JSON.parse(inputdata);
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

  // console.log(inputdata);
  return (
    <div>
      <input
        type="text"
        className="text-black w-full h-8 mb-4"
        onChange={(e) => {
          setInput(ParseText(e.target.value));
        }}
      ></input>
      <form onSubmit={handleSubmit}>
    
        <button type="submit">Process Topologies</button>
      </form>
      <TopologyTree topologies={topologies} />
      {console.log(topologies)}
    </div>
  );
}
//3 system star topology and [within a ring topology: 5 system mesh topology]
