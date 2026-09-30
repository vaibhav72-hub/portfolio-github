import React from 'react';
import { motion } from 'framer-motion';

const DataPipelineAnim: React.FC = () => {
  const nodes = [
    { id: 1, x: 20, y: 20, r: 2 },
    { id: 2, x: 20, y: 80, r: 3 },
    { id: 3, x: 50, y: 50, r: 6 }, // Center Hub
    { id: 4, x: 80, y: 20, r: 2 },
    { id: 5, x: 80, y: 80, r: 4 },
  ];

  const paths = [
    { id: 'p1', d: "M 20 20 L 50 50", delay: 0 },
    { id: 'p2', d: "M 20 80 L 50 50", delay: 1 },
    { id: 'p3', d: "M 50 50 L 80 20", delay: 0.5 },
    { id: 'p4', d: "M 50 50 L 80 80", delay: 1.5 },
  ];

  return (
    <div style={{ width: '100%', height: '100%', opacity: 0.3, pointerEvents: 'none' }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        
        {/* Draw Paths */}
        {paths.map(path => (
          <g key={path.id}>
            {/* Background Path */}
            <path d={path.d} stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" fill="none" />
            
            {/* Glowing Pulse traveling along the path */}
            {/* Framer motion doesn't natively animate along SVG paths easily without complex plugins, 
                but we can animate strokeDasharray/strokeDashoffset for a cool laser beam effect */}
            <motion.path
              d={path.d}
              stroke="#00F0FF"
              strokeWidth="1"
              fill="none"
              strokeDasharray="15 100"
              initial={{ strokeDashoffset: 115 }}
              animate={{ strokeDashoffset: -15 }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
                delay: path.delay
              }}
            />
          </g>
        ))}

        {/* Draw Nodes */}
        {nodes.map(node => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={node.r}
            fill="#1E293B"
            stroke={node.id === 3 ? "#8A2BE2" : "#00F0FF"}
            strokeWidth="0.8"
            animate={{
              r: [node.r, node.r * 1.5, node.r],
              boxShadow: ['0px 0px 0px transparent', '0px 0px 10px #00F0FF', '0px 0px 0px transparent']
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Center Hub Extra Ripple */}
        <motion.circle
          cx="50" cy="50" r="8"
          fill="none"
          stroke="#8A2BE2"
          strokeWidth="0.5"
          initial={{ scale: 0.8, opacity: 1 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      </svg>
    </div>
  );
};

export default DataPipelineAnim;
