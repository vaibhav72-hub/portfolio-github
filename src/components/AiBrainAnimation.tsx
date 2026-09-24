import React from 'react';
import { motion } from 'framer-motion';

const nodes = [
  { id: 0, cx: 100, cy: 20 },
  { id: 1, cx: 70, cy: 45 },
  { id: 2, cx: 130, cy: 45 },
  { id: 3, cx: 45, cy: 80 },
  { id: 4, cx: 90, cy: 75 },
  { id: 5, cx: 110, cy: 75 },
  { id: 6, cx: 155, cy: 80 },
  { id: 7, cx: 50, cy: 125 },
  { id: 8, cx: 85, cy: 115 },
  { id: 9, cx: 115, cy: 115 },
  { id: 10, cx: 150, cy: 125 },
  { id: 11, cx: 75, cy: 160 },
  { id: 12, cx: 125, cy: 160 },
  { id: 13, cx: 100, cy: 140 },
];

const links = [
  [0, 1], [0, 2], [0, 4], [0, 5],
  [1, 3], [1, 4], [1, 8],
  [2, 5], [2, 6], [2, 9],
  [3, 7], [3, 8], [3, 4],
  [4, 5], [4, 8], [4, 13],
  [5, 6], [5, 9], [5, 13],
  [6, 10], [6, 9],
  [7, 8], [7, 11],
  [8, 11], [8, 13], [8, 9],
  [9, 10], [9, 12], [9, 13],
  [10, 12],
  [11, 13], [11, 12],
  [12, 13]
];

const AiBrainAnimation: React.FC = () => {
  return (
    <div style={{ position: 'relative', width: '300px', height: '300px', margin: '0 auto' }}>
      {/* Ambient Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, var(--accent-cyan) 0%, transparent 70%)',
          filter: 'blur(20px)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      
      <svg
        viewBox="0 0 200 200"
        style={{ width: '100%', height: '100%', overflow: 'visible', position: 'relative', zIndex: 10 }}
      >
        {/* Draw Links */}
        {links.map((link, idx) => {
          const startNode = nodes[link[0]];
          const endNode = nodes[link[1]];
          return (
            <motion.line
              key={`link-${idx}`}
              x1={startNode.cx}
              y1={startNode.cy}
              x2={endNode.cx}
              y2={endNode.cy}
              stroke="url(#gradientGlow)"
              strokeWidth="1.5"
              strokeOpacity="0.4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 1, 0],
                opacity: [0, 0.8, 0.8, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: idx * 0.1,
                times: [0, 0.4, 0.6, 1]
              }}
            />
          );
        })}

        {/* Draw Static Faint Links for structure */}
        {links.map((link, idx) => {
          const startNode = nodes[link[0]];
          const endNode = nodes[link[1]];
          return (
            <line
              key={`bg-link-${idx}`}
              x1={startNode.cx}
              y1={startNode.cy}
              x2={endNode.cx}
              y2={endNode.cy}
              stroke="var(--accent-cyan)"
              strokeWidth="1"
              strokeOpacity="0.15"
            />
          );
        })}

        {/* Draw Nodes */}
        {nodes.map((node) => (
          <motion.circle
            key={`node-${node.id}`}
            cx={node.cx}
            cy={node.cy}
            r="4"
            fill="var(--accent-cyan)"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{
              scale: [0.8, 1.5, 0.8],
              opacity: [0.5, 1, 0.5],
              boxShadow: ["0px 0px 0px transparent", "0px 0px 10px var(--accent-cyan)", "0px 0px 0px transparent"]
            }}
            transition={{
              duration: 2 + Math.random(),
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
        
        {/* Data pulses traveling along some paths */}
        {links.slice(0, 10).map((link, idx) => {
           const startNode = nodes[link[0]];
           const endNode = nodes[link[1]];
           return (
             <motion.circle
               key={`pulse-${idx}`}
               r="2"
               fill="#fff"
               initial={{ cx: startNode.cx, cy: startNode.cy, opacity: 0 }}
               animate={{
                 cx: [startNode.cx, endNode.cx],
                 cy: [startNode.cy, endNode.cy],
                 opacity: [0, 1, 0]
               }}
               transition={{
                 duration: 1.5 + Math.random(),
                 repeat: Infinity,
                 ease: "easeInOut",
                 delay: Math.random() * 3
               }}
               style={{ filter: 'drop-shadow(0 0 4px #fff)' }}
             />
           )
        })}

        <defs>
          <linearGradient id="gradientGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-cyan)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="var(--accent-emerald)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default AiBrainAnimation;
