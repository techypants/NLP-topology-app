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
    topologyInstance.type = topo.type;
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
    default:
      throw new Error(`Unknown topology type: ${type}`);
  }
}

export default function ParseInput() {
  const [inputJson, setInputJson] = useState("4 system star topology");

  const [topologies, setTopologies] = useState([]);
  const [modeljson, setmodeljson] = useState([]);

  const handleInputChange = (e) => {
    setInputJson(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const parsedText = ParseText(inputJson);
      console.log(typeof parsedText);

      const parsedJson = JSON.parse(parsedText);
      setmodeljson(parsedJson.topologies);

      const processedTopologies = processTopologies(
        parsedJson.topologies,
        dhcpServer
      );
      setTopologies(processedTopologies);
    } catch (error) {
      console.error(
        "Invalid format or JSON parsing error. Please check your input.",
        error
      );
    }
  };

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex  flex-col w-full items-center "
      >
        <textarea
          type="text"
          className="m-6 text-black w-[80%] h-16 lg:h-12 mb-4 p-4 rounded-lg"
          value={inputJson}
          onChange={handleInputChange}
          placeholder="Enter topology description"
        />
        <button type="submit" className="p-2 text-black bg-white rounded-lg">
          Process Topologies
        </button>
      </form>
      {/* {console.log(topologies)} */}
      <div className="flex flex-col justify-center items-center">
        <TopologyTree topologies={topologies} />
      </div>
      {console.log(topologies)}
      {/* {console.log(inputJson)}  */}
    </div>
  );
}
