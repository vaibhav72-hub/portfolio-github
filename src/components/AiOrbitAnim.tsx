import React from 'react';
import { motion } from 'framer-motion';

const AiOrbitAnim: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100%', opacity: 0.25, pointerEvents: 'none' }}>
      <svg viewBox="0 0 200 200" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        {/* Inner Orbit */}
        <motion.circle
          cx="100" cy="100" r="40"
          fill="none" stroke="#00F0FF" strokeWidth="0.5" strokeDasharray="5, 5"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '100px 100px' }}
        />
        <motion.circle
          cx="140" cy="100" r="3" fill="#00F0FF"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '100px 100px', filter: 'drop-shadow(0 0 2px #00F0FF)' }}
        />

        {/* Middle Orbit */}
        <motion.circle
          cx="100" cy="100" r="65"
          fill="none" stroke="#8A2BE2" strokeWidth="1" strokeDasharray="10, 10"
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '100px 100px' }}
        />
        <motion.circle
          cx="35" cy="100" r="4" fill="#8A2BE2"
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '100px 100px', filter: 'drop-shadow(0 0 3px #8A2BE2)' }}
        />
        
        {/* Outer Orbit */}
        <motion.circle
          cx="100" cy="100" r="90"
          fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '100px 100px' }}
        />
        <motion.circle
          cx="100" cy="10" r="2" fill="#FFFFFF"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: '100px 100px' }}
        />
        
        {/* Center Core */}
        <motion.circle
          cx="100" cy="100" r="10"
          fill="#00F0FF"
          animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ filter: 'drop-shadow(0 0 5px #00F0FF)' }}
        />
      </svg>
    </div>
  );
};

export default AiOrbitAnim;
