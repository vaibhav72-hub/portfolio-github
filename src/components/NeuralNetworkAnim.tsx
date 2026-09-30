import React from 'react';
import { motion } from 'framer-motion';

const NeuralNetworkAnim: React.FC = () => {
  // Define a simple neural network structure (Input layer, Hidden layer, Output layer)
  const nodes = [
    // Input
    { id: 1, cx: 10, cy: 20 },
    { id: 2, cx: 10, cy: 50 },
    { id: 3, cx: 10, cy: 80 },
    // Hidden
    { id: 4, cx: 50, cy: 15 },
    { id: 5, cx: 50, cy: 40 },
    { id: 6, cx: 50, cy: 65 },
    { id: 7, cx: 50, cy: 90 },
    // Output
    { id: 8, cx: 90, cy: 35 },
    { id: 9, cx: 90, cy: 65 }
  ];

  const edges = [
    // Input to Hidden
    [1, 4], [1, 5], [1, 6],
    [2, 5], [2, 6], [2, 7],
    [3, 5], [3, 6], [3, 7],
    // Hidden to Output
    [4, 8], [5, 8], [6, 8],
    [5, 9], [6, 9], [7, 9]
  ];

  return (
    <div aria-hidden="true" style={{ width: '100%', height: '100%', opacity: 0.6, pointerEvents: 'none' }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        {/* Draw Edges */}
        {edges.map(([source, target], i) => {
          const sNode = nodes.find(n => n.id === source)!;
          const tNode = nodes.find(n => n.id === target)!;
          return (
            <g key={`edge-${i}`}>
              <line 
                x1={sNode.cx} y1={sNode.cy} 
                x2={tNode.cx} y2={tNode.cy} 
                stroke="rgba(255,255,255,0.1)" 
                strokeWidth="0.5" 
              />
              {/* Traveling data packet */}
              <motion.circle
                r="1"
                fill="#00F0FF"
                initial={{ cx: sNode.cx, cy: sNode.cy, opacity: 0 }}
                animate={{ cx: tNode.cx, cy: tNode.cy, opacity: [0, 1, 0] }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: "linear"
                }}
                style={{ filter: 'drop-shadow(0 0 2px #00F0FF)' }}
              />
            </g>
          );
        })}

        {/* Draw Nodes */}
        {nodes.map(node => (
          <motion.circle
            key={node.id}
            cx={node.cx}
            cy={node.cy}
            r="2.5"
            fill="#1E293B"
            stroke="#8A2BE2"
            strokeWidth="0.8"
            animate={{
              r: [2.5, 3, 2.5],
              stroke: ['#8A2BE2', '#00F0FF', '#8A2BE2']
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default NeuralNetworkAnim;
