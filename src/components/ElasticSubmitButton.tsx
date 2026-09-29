import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface ElasticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function ElasticSubmitButton({ children, ...props }: ElasticButtonProps) {
  const dockRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const [rot, setRot] = useState(0);

  // Framer motion springs for smooth elastic movement
  const springX = useSpring(0, { stiffness: 200, damping: 15, mass: 1 });
  const springY = useSpring(0, { stiffness: 200, damping: 15, mass: 1 });
  
  useEffect(() => {
    springX.set(btnPos.x);
    springY.set(btnPos.y);
  }, [btnPos, springX, springY]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dockRef.current || !buttonRef.current) return;
    
    const dockRect = dockRef.current.getBoundingClientRect();
    
    // Calculate distance from center of dock to mouse
    const centerX = dockRect.left + dockRect.width / 2;
    const centerY = dockRect.top + dockRect.height / 2;
    
    let dx = e.clientX - centerX;
    let dy = e.clientY - centerY;
    
    // Max pull distance
    const maxPull = 120;
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // If distance is large, clamp it
    if (dist > maxPull) {
      dx = (dx / dist) * maxPull;
      dy = (dy / dist) * maxPull;
    }
    
    // Calculate rotation based on pull direction
    const targetRot = (dx * 0.1); 

    setBtnPos({ x: dx, y: dy });
    setRot(targetRot);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setBtnPos({ x: 0, y: 0 });
    setRot(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // We need to sync the framer motion spring values to draw the SVG band dynamically
  const [pathStr, setPathStr] = useState("M 0 0 Q 0 0 0 0");

  useEffect(() => {
    let animationFrameId: number;
    const renderPath = () => {
      // The socket center is (0,0) in our relative coordinates (since SVG is centered)
      const bx = springX.get();
      const by = springY.get();
      
      // Control point for quadratic bezier curve (make it look like a tense band)
      // We push the control point slightly in the opposite direction or midway
      const cx = bx * 0.5;
      const cy = by * 0.5;

      // Calculate the thickness of the band based on stretch distance
      const stretch = Math.sqrt(bx * bx + by * by);
      const thickness = Math.max(2, 20 - (stretch * 0.15));

      // Simple straight line for the band, or a curve
      setPathStr(`M 0 -${thickness/2} L ${bx} -${thickness/2} L ${bx} ${thickness/2} L 0 ${thickness/2} Z`);
      animationFrameId = requestAnimationFrame(renderPath);
    };
    renderPath();
    return () => cancelAnimationFrame(animationFrameId);
  }, [springX, springY]);

  return (
    <div 
      className="dock" 
      ref={dockRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{
        position: 'relative',
        width: '100%',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '16px',
        // Make the hit area much larger so the button can be chased
        padding: '60px',
        margin: '-60px', 
      }}
    >
      {/* The socket (where the button docks) */}
      <div 
        className="dock__socket" 
        style={{
          position: 'absolute',
          width: '100%',
          maxWidth: '300px',
          height: '56px',
          borderRadius: '8px',
          border: '2px dashed rgba(56, 189, 248, 0.3)',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />

      {/* The elastic band */}
      <svg 
        className="dock__band" 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '400px',
          height: '400px',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          overflow: 'visible',
          zIndex: 1,
          opacity: isHovered ? 1 : 0,
        }}
      >
        <path 
          data-band-line 
          d={pathStr} 
          fill="rgba(56, 189, 248, 0.6)" 
          style={{ transform: 'translate(200px, 200px)' }}
        />
      </svg>

      {/* The CTA button */}
      <motion.button 
        ref={buttonRef}
        className="cta btn-primary"
        style={{
          x: springX,
          y: springY,
          rotate: rot,
          zIndex: 2,
          position: 'absolute',
          width: '100%',
          maxWidth: '300px',
          padding: '16px',
        }}
        {...(props as any)}
      >
        {children}
      </motion.button>
    </div>
  );
}
