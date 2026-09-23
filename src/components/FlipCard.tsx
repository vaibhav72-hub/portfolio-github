import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, RotateCw, Sparkles } from 'lucide-react';

export interface CertData {
  title: string;
  issuer: string;
  category: string;
  skills?: string[];
  link: string;
}

interface FlipCardProps {
  cert: CertData;
  className?: string;
}

export default function FlipCard({ cert, className = "" }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.42);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        // Standard certificate HTML template width is ~880px
        const calculatedScale = width > 0 ? width / 880 : 0.42;
        setScale(calculatedScale);
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const triggerFlip = () => {
    setHasInteracted(true);
    setIsFlipped(prev => !prev);
  };

  return (
    <div
      ref={containerRef}
      className={`flip-card-container ${className}`}
      style={{
        perspective: "1000px",
        height: "270px",
        cursor: "pointer",
      }}
      onMouseEnter={() => {
        setHasInteracted(true);
        setIsFlipped(true);
      }}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={triggerFlip}
      role="button"
      tabIndex={0}
      aria-label={`Certificate: ${cert.title}. Click to view certificate directly.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          triggerFlip();
        }
      }}
    >
      <motion.div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          borderRadius: "16px",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.65, type: "spring", stiffness: 200, damping: 22 }}
      >
        {/* Front Face: Modern Glassmorphic Badge & Overview */}
        <div
          className="flip-card-face"
          style={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            background: "linear-gradient(135deg, rgba(30, 41, 59, 0.85) 0%, rgba(15, 23, 42, 0.95) 100%)",
            boxShadow: isFlipped ? "none" : "0 10px 25px -5px rgba(0, 0, 0, 0.4)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <span className="badge" style={{ fontSize: "0.75rem", padding: "4px 10px", margin: 0 }}>
                {cert.category}
              </span>
              <div 
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "rgba(16, 185, 129, 0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  boxShadow: "0 0 15px rgba(16, 185, 129, 0.2)",
                }}
              >
                <Award className="w-5 h-5 text-[#10B981]" />
              </div>
            </div>

            <h3 style={{ fontSize: "1.15rem", fontWeight: "600", color: "var(--text-primary)", marginBottom: "8px", lineHeight: 1.35 }}>
              {cert.title}
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--accent-cyan)", fontWeight: "500" }}>
              {cert.issuer}
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <span style={{ fontSize: "0.78rem", color: "var(--accent-cyan)", display: "flex", alignItems: "center", gap: "6px", fontWeight: "500" }}>
              <RotateCw className="w-3.5 h-3.5" /> Flip to view certificate
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
              <Sparkles className="w-3 h-3 text-[#10B981]" /> Verified
            </span>
          </div>
        </div>

        {/* Back Face: Direct Certificate HTML Embed */}
        <div
          className="flip-card-face"
          style={{
            transform: "rotateY(180deg)",
            border: "1px solid rgba(56, 189, 248, 0.4)",
            background: "#ffffff",
            overflow: "hidden",
            boxShadow: isFlipped ? "0 15px 35px -5px rgba(56, 189, 248, 0.25)" : "none",
          }}
        >
          {/* Certificate Embed */}
          <div
            style={{
              width: "100%",
              height: "100%",
              position: "relative",
              overflow: "hidden",
              background: "#ffffff",
            }}
          >
            {hasInteracted ? (
              <iframe
                src={cert.link}
                title={`Certificate - ${cert.title}`}
                loading="lazy"
                tabIndex={-1}
                style={{
                  width: "880px",
                  height: "600px",
                  border: "none",
                  transform: `scale(${scale})`,
                  transformOrigin: "top left",
                  pointerEvents: "none",
                  display: "block",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "#0f172a",
                  color: "#94a3b8",
                  fontSize: "0.85rem",
                }}
              >
                Hover or click to view
              </div>
            )}

            {/* Top Overlay Bar with Direct Action & Flip Indicator */}
            <div
              style={{
                position: "absolute",
                top: "8px",
                left: "8px",
                right: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                pointerEvents: "none",
                zIndex: 10,
              }}
            >
              <span
                style={{
                  fontSize: "0.7rem",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  background: "rgba(15, 23, 42, 0.85)",
                  backdropFilter: "blur(8px)",
                  color: "#e2e8f0",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontWeight: "500",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                }}
              >
                <RotateCw className="w-3 h-3" /> Tap to flip back
              </span>

              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    pointerEvents: "auto",
                    fontSize: "0.72rem",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    background: "rgba(15, 23, 42, 0.9)",
                    backdropFilter: "blur(8px)",
                    color: "#38BDF8",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontWeight: "600",
                    border: "1px solid rgba(56, 189, 248, 0.4)",
                    textDecoration: "none",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  }}
                  title="Open full certificate in new tab"
                >
                  Full View <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
