import React from 'react';
import { motion } from 'framer-motion';

const WaveformAnim: React.FC = () => {
  const bars = React.useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => {
      const targetHeight = 30 + Math.random() * 50;
      return {
        id: i,
        targetHeight,
        targetY: 50 - targetHeight / 2,
        delay: i * 0.05,
        duration: 0.8 + Math.random() * 1.5,
        isPurple: i % 3 === 0
      };
    });
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', opacity: 0.2, pointerEvents: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg viewBox="0 0 200 100" width="100%" height="100%" preserveAspectRatio="none">
        {bars.map((bar) => (
          <motion.rect
            key={bar.id}
            x={bar.id * 10}
            y={50}
            width={6}
            height={10}
            fill={bar.isPurple ? '#8A2BE2' : '#00F0FF'}
            rx={3}
            animate={{
              height: [10, bar.targetHeight, 10],
              y: [45, bar.targetY, 45]
            }}
            transition={{
              duration: bar.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: bar.delay
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default WaveformAnim;
