"use client";
import React, { useState } from "react";
// import Psketch from "./components/tryp5"
import ParseInput from "./components/parseText";

// Create a global DHCP server instance

export default function Home() {
  return (
    <div>
      <h1 className="text-[20px]">Network Topologies</h1>

      <ParseInput />
      <div className="bottom-0 w-full flex items-center mb-4 h-5">
        <h1 className=" m-auto">p5.js Network Topologies with React</h1>
      </div>
    </div>
  );
}
