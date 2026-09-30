import React from 'react';
import { motion } from 'framer-motion';

const AiScannerAnim: React.FC = () => {
  // Generate a grid of "data points"
  const grid = [];
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      grid.push({ id: `${i}-${j}`, x: i * 10 + 5, y: j * 10 + 5 });
    }
  }

  return (
    <div style={{ width: '100%', height: '100%', opacity: 0.5, pointerEvents: 'none', position: 'relative' }}>
      <svg viewBox="0 0 100 100" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        {/* Grid points */}
        {grid.map(point => (
          <circle
            key={point.id}
            cx={point.x}
            cy={point.y}
            r="1"
            fill="rgba(255,255,255,0.15)"
          />
        ))}

        {/* Scanning Line */}
        <motion.line
          x1="0" y1="0"
          x2="100" y2="0"
          stroke="#00F0FF"
          strokeWidth="2"
          initial={{ y1: 0, y2: 0, opacity: 0 }}
          animate={{ 
            y1: [0, 100, 0], 
            y2: [0, 100, 0],
            opacity: [0, 1, 1, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Highlighted scanned data */}
        {grid.map((point) => (
          <motion.circle
            key={`highlight-${point.id}`}
            cx={point.x}
            cy={point.y}
            r="1.5"
            fill="#8A2BE2"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: (point.y / 100) * 2, // Synchronize roughly with scanner going down
              ease: "linear"
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default AiScannerAnim;
