import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, CheckCircle2, RotateCw } from 'lucide-react';

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

  return (
    <div
      className={`flip-card-container ${className}`}
      style={{
        perspective: "1000px",
        minHeight: "240px",
        height: "100%",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(prev => !prev)}
      role="button"
      tabIndex={0}
      aria-label={`Certificate: ${cert.title}. Click to flip.`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsFlipped(prev => !prev);
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
        transition={{ duration: 0.6, type: "spring", stiffness: 220, damping: 22 }}
      >
        {/* Front Face */}
        <div
          className="flip-card-face"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            borderRadius: "16px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            background: "linear-gradient(135deg, rgba(30, 41, 59, 0.75) 0%, rgba(15, 23, 42, 0.85) 100%)",
            boxShadow: isFlipped ? "none" : "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <span className="badge" style={{ fontSize: "0.75rem", padding: "4px 10px" }}>
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

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.06)", marginTop: "12px" }}>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "6px" }}>
              <RotateCw className="w-3 h-3" /> Flip for details
            </span>
            <span style={{ fontSize: "0.75rem", color: "var(--accent-emerald)", display: "flex", alignItems: "center", gap: "4px" }}>
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified
            </span>
          </div>
        </div>

        {/* Back Face */}
        <div
          className="flip-card-face"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderRadius: "16px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            border: "1px solid rgba(56, 189, 248, 0.25)",
            background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 100%)",
            boxShadow: isFlipped ? "0 12px 30px -5px rgba(56, 189, 248, 0.15)" : "none",
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "var(--accent-emerald)", fontWeight: "600" }}>
                <CheckCircle2 className="w-4 h-4" /> Official Credential
              </span>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Vaibhav Pernole
              </span>
            </div>

            <p style={{ fontSize: "0.95rem", fontWeight: "600", color: "var(--text-primary)", marginBottom: "12px" }}>
              {cert.title}
            </p>

            {cert.skills && cert.skills.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "14px" }}>
                {cert.skills.map((skill, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: "0.7rem",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      background: "rgba(56, 189, 248, 0.1)",
                      color: "var(--accent-cyan)",
                      border: "1px solid rgba(56, 189, 248, 0.2)",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px", paddingTop: "12px", borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
              <RotateCw className="w-3 h-3" /> Tap to flip back
            </span>
            {cert.link && (
              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="btn-primary"
                style={{
                  padding: "6px 12px",
                  fontSize: "0.78rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  borderRadius: "8px",
                }}
              >
                Open Credential <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
