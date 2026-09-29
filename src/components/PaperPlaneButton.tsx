import React, { useEffect } from 'react';
import { motion, useAnimation, type HTMLMotionProps } from 'framer-motion';

interface PaperPlaneButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  isSending: boolean;
  isSuccess: boolean;
}

export default function PaperPlaneButton({ children, isSending, isSuccess, ...props }: PaperPlaneButtonProps) {
  const controls = useAnimation();
  const textControls = useAnimation();
  const planeControls = useAnimation();
  const successControls = useAnimation();

  useEffect(() => {
    if (isSending) {
      // 1. Shrink button to a circle
      controls.start({
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: 'var(--bg-primary)',
        color: 'transparent',
        transition: { duration: 0.3 }
      });
      textControls.start({ opacity: 0, transition: { duration: 0.2 } });
      
      // 2. Show paper plane and wiggle
      planeControls.start({
        opacity: 1,
        scale: 1,
        rotate: [0, -10, 10, -10, 10, 0],
        transition: { delay: 0.3, duration: 0.5 }
      }).then(() => {
        // 3. Fly away
        planeControls.start({
          x: 300,
          y: -300,
          opacity: 0,
          scale: 0.5,
          transition: { duration: 0.6, ease: "easeIn" }
        });
      });
    } else if (isSuccess) {
      // Show success state
      planeControls.set({ opacity: 0 });
      controls.start({
        width: '100%',
        borderRadius: '8px',
        backgroundColor: 'var(--accent-emerald)',
        transition: { duration: 0.3 }
      });
      successControls.start({ opacity: 1, transition: { delay: 0.3 } });
    } else {
      // Reset
      controls.start({
        width: '100%',
        height: '56px',
        borderRadius: '8px',
        backgroundColor: 'var(--accent-cyan)',
        transition: { duration: 0.3 }
      });
      textControls.start({ opacity: 1 });
      planeControls.set({ opacity: 0, x: 0, y: 0, scale: 0.5, rotate: 0 });
      successControls.set({ opacity: 0 });
    }
  }, [isSending, isSuccess, controls, textControls, planeControls, successControls]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '16px', height: '56px' }}>
      <motion.button
        animate={controls}
        style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: 'none',
          outline: 'none',
          cursor: isSending ? 'default' : 'pointer',
          overflow: 'hidden',
          padding: 0,
          color: '#000',
          fontWeight: 600,
          fontSize: '1rem',
          boxShadow: '0 0 15px rgba(56, 189, 248, 0.4)',
        }}
        {...props}
      >
        <motion.span animate={textControls} style={{ position: 'absolute', whiteSpace: 'nowrap' }}>
          {children}
        </motion.span>
        
        {/* Paper Plane SVG */}
        <motion.svg 
          animate={planeControls}
          initial={{ opacity: 0, scale: 0.5 }}
          style={{ position: 'absolute', width: '28px', height: '28px', color: 'var(--accent-cyan)' }}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </motion.svg>

        {/* Checkmark SVG */}
        <motion.svg 
          animate={successControls}
          initial={{ opacity: 0 }}
          style={{ position: 'absolute', width: '28px', height: '28px', color: '#fff' }}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </motion.svg>
      </motion.button>
    </div>
  );
}
