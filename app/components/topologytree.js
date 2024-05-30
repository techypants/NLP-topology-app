import React from "react";

function TopologyNode({ topology }) {
  const { type, nodes, nested } = topology;
  const count = nodes.length;

  return (
    <div className=" m-2 border-2 border-white rounded-lg p-4">
      <p>{`${type} - Count: ${count}`}</p>
      <ul>
        {nodes.map((node, index) => (
          <li key={index}>
            System {node.id}: IP Address - {node.ip}
          </li>
        ))}
      </ul>
      {/* <p>{`${typeof nested}`}</p> */}
      {nested && nested.length > 0 && (
        <div className="ml-[40px]">
          {nested.map((nestedTopology, index) => (
            <TopologyNode key={index} topology={nestedTopology} />
          ))}
        </div>
      )}
    </div>
  );
}

// function TopologyNode({ topology }) {
//   const { type, nodes, nested } = topology;
//   const count = nodes.length; // Use the length of the nodes array to get the count

//   return (
//     <div>
//       <p>{`${type} - Count: ${count}`}</p>
//       {nested && nested.length > 0 && (
//         <div style={{ marginLeft: 20 }}>
//           {nested.map((nestedTopology, index) => (
//             <TopologyNode key={index} topology={nestedTopology} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

export default function TopologyTree({ topologies }) {
  return (
    <div>
      {/* {console.log((topologies))} */}

      {topologies.map((topology, index) => (
        <TopologyNode key={index} topology={topology} />
      ))}
    </div>
  );
}
