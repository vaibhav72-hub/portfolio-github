import React from 'react';
import { motion } from 'framer-motion';

const WaveformAnim: React.FC = () => {
  const bars = Array.from({ length: 20 });

  return (
    <div style={{ width: '100%', height: '100%', opacity: 0.2, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 200 100" width="100%" height="100%" preserveAspectRatio="none">
        {bars.map((_, i) => (
          <motion.rect
            key={i}
            x={i * 10}
            y="50"
            width="6"
            height="10"
            fill={i % 3 === 0 ? '#8A2BE2' : '#00F0FF'}
            rx="3"
            animate={{
              height: [10, 30 + Math.random() * 50, 10],
              y: [45, 50 - (30 + Math.random() * 50) / 2, 45]
            }}
            transition={{
              duration: 0.8 + Math.random() * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.05
            }}
            style={{ filter: `drop-shadow(0 0 3px ${i % 3 === 0 ? '#8A2BE2' : '#00F0FF'})` }}
          />
        ))}
      </svg>
    </div>
  );
};

export default WaveformAnim;
