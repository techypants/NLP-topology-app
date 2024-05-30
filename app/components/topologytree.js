import React from "react";

function TopologyNode({ topology }) {
  const { count, type, nested } = topology;
  return (
    <div>
      <p>{`${type} - Count: ${count}`}</p>
      {nested && nested.length > 0 && (
        <div style={{ marginLeft: 20 }}>
          {nested.map((nestedTopology, index) => (
            <TopologyNode key={index} topology={nestedTopology} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TopologyTree({ topologies }) {
  return (
    <div>
      {topologies.map((topology, index) => (
        <TopologyNode key={index} topology={topology} />
      ))}
    </div>
  );
}
