import React from "react";
import { ReactP5Wrapper } from "@p5-wrapper/react";

function starTopology(p5, nodes) {
  p5.setup = () => {
    p5.createCanvas(300, 300);
  };

  p5.draw = () => {
    p5.background(250);
    const centerX = p5.width / 2;
    const centerY = p5.height / 2;
    const radius = 75;
    const angle = p5.TWO_PI / nodes;

    p5.fill(255, 0, 0);
    p5.ellipse(centerX, centerY, 20, 20); // Central hub

    p5.fill(0, 0, 255);
    for (let i = 0; i < nodes; i++) {
      const x = centerX + radius * p5.cos(i * angle);
      const y = centerY + radius * p5.sin(i * angle);
      p5.ellipse(x, y, 20, 20);
      p5.line(centerX, centerY, x, y); // Line from hub to node
    }
  };
}

function busTopology(p5, nodes) {
  p5.setup = () => {
    p5.createCanvas(300, 300);
  };

  p5.draw = () => {
    p5.background(250);
    const startX = 50;
    const endX = p5.width - 50;
    const y = p5.height / 2;
    const spacing = (endX - startX) / (nodes - 1);

    p5.fill(0, 0, 255);
    for (let i = 0; i < nodes; i++) {
      const x = startX + i * spacing;
      p5.ellipse(x, y, 20, 20);
      if (i > 0) {
        p5.line(startX + (i - 1) * spacing, y, x, y);
      }
    }
  };
}

function meshTopology(p5, nodes) {
  p5.setup = () => {
    p5.createCanvas(300, 300);
  };

  p5.draw = () => {
    p5.background(250);
    const centerX = p5.width / 2;
    const centerY = p5.height / 2;
    const radius = 75;
    const angle = p5.TWO_PI / nodes;
    const positions = [];

    p5.fill(0, 0, 255);
    for (let i = 0; i < nodes; i++) {
      const x = centerX + radius * p5.cos(i * angle);
      const y = centerY + radius * p5.sin(i * angle);
      p5.ellipse(x, y, 20, 20);
      positions.push({ x, y });
    }

    p5.stroke(0);
    positions.forEach((pos, i) => {
      for (let j = i + 1; j < positions.length; j++) {
        p5.line(pos.x, pos.y, positions[j].x, positions[j].y);
      }
    });
  };
}

function ringTopology(p5, nodes) {
  p5.setup = () => {
    p5.createCanvas(300,300);
  };

  p5.draw = () => {
    p5.background(250);
    const centerX = p5.width / 2;
    const centerY = p5.height / 2;
    const radius = 150;
    const angle = p5.TWO_PI / nodes;

    p5.fill(0, 0, 255);
    const positions = [];
    for (let i = 0; i < nodes; i++) {
      const x = centerX + radius * p5.cos(i * angle);
      const y = centerY + radius * p5.sin(i * angle);
      p5.ellipse(x, y, 20, 20);
      positions.push({ x, y });
    }

    p5.stroke(0);
    for (let i = 0; i < nodes; i++) {
      const nextIndex = (i + 1) % nodes;
      p5.line(
        positions[i].x,
        positions[i].y,
        positions[nextIndex].x,
        positions[nextIndex].y
      );
    }
  };
}



const sketches = {
  star: starTopology,
  bus: busTopology,
  mesh: meshTopology,
  ring: ringTopology,
};

export default function Psketch({ type, nodes }) {
  const sketch = (p5) => sketches[type](p5, nodes);
  return <ReactP5Wrapper sketch={sketch} />;
}
