import { useEffect, useRef } from 'react';

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];
    
    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Mouse position
    let mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: 100
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.x;
      mouse.y = e.y;
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const handleMouseOut = () => {
      mouse.x = null;
      mouse.y = null;
    };
    window.addEventListener('mouseout', handleMouseOut);

    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;
      color: string;
      baseX: number;
      baseY: number;
      density: number;

      constructor(x: number, y: number, directionX: number, directionY: number, size: number, color: string) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.baseX = x;
        this.baseY = y;
        this.density = (Math.random() * 30) + 1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        // Move particles (data flow left to right)
        if (this.x > canvas!.width) {
          this.x = 0;
          this.y = Math.random() * canvas!.height;
        }
        if (this.x < 0) {
          this.x = canvas!.width;
        }
        if (this.y > canvas!.height || this.y < 0) {
          this.directionY = -this.directionY;
        }
        
        // Mouse collision (Neural activation)
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx*dx + dy*dy);
          
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            
            // Attract slightly to mouse
            this.x += forceDirectionX * force * 1.5;
            this.y += forceDirectionY * force * 1.5;
          }
        }
        
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    let animationFrameId: number;

    const init = () => {
      particlesArray = [];
      const calculatedCount = Math.floor((canvas.height * canvas.width) / 12000); // Much denser neural net
      const numberOfParticles = Math.min(100, Math.max(40, calculatedCount));
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = Math.random() * innerWidth;
        let y = Math.random() * innerHeight;
        let directionX = (Math.random() * 0.8) + 0.1; // Flow right
        let directionY = (Math.random() * 0.4) - 0.2; // Slight vertical drift
        let isPurple = Math.random() > 0.7;
        let color = isPurple ? 'rgba(138, 43, 226, 0.7)' : 'rgba(0, 240, 255, 0.7)'; // purple and cyan
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    const maxDistanceSquared = 140 * 140;

    const connect = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a + 1; b < particlesArray.length; b++) {
          let dx = particlesArray[a].x - particlesArray[b].x;
          let dy = particlesArray[a].y - particlesArray[b].y;
          let distance = dx * dx + dy * dy;
          if (distance < maxDistanceSquared) {
            let opacityValue = (1 - (distance / maxDistanceSquared)) * 0.3;
            ctx.strokeStyle = `rgba(0, 240, 255, ${opacityValue})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
      
      // Connect to mouse to show ML node activation
      if (mouse.x != null && mouse.y != null) {
        for (let a = 0; a < particlesArray.length; a++) {
          let dx = particlesArray[a].x - mouse.x;
          let dy = particlesArray[a].y - mouse.y;
          let distance = dx * dx + dy * dy;
          if (distance < maxDistanceSquared) {
            let opacityValue = (1 - (distance / maxDistanceSquared)) * 0.5;
            ctx.strokeStyle = `rgba(138, 43, 226, ${opacityValue})`; // purple connection to mouse
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
    };

    init();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none'
      }} 
    />
  );
}
