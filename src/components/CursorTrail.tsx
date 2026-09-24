import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CursorTrail: React.FC = () => {
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let idCounter = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const newPoint = { x: e.clientX, y: e.clientY, id: idCounter++ };
      
      setTrail((prev) => {
        const updated = [...prev, newPoint];
        if (updated.length > 20) {
          updated.shift();
        }
        return updated;
      });

      // Cleanup points after a short delay
      setTimeout(() => {
        setTrail((current) => current.filter((p) => p.id !== newPoint.id));
      }, 500); // 500ms trail life
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999, width: '100%', height: '100%' }}>
      <AnimatePresence>
        {trail.map((point) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0.8, scale: 1 }}
            animate={{ opacity: 0, scale: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              left: point.x,
              top: point.y,
              width: '8px',
              height: '8px',
              backgroundColor: 'var(--accent-cyan)',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              boxShadow: '0 0 10px var(--accent-cyan)',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CursorTrail;
