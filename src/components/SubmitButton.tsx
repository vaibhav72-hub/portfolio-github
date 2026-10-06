import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Send } from 'lucide-react';
import MagneticButton from './MagneticButton';

interface SubmitButtonProps {
  status: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ status }) => {
  let buttonState = 'idle';
  if (status === 'Sending...') buttonState = 'sending';
  else if (status.includes('successfully')) buttonState = 'success';
  else if (status.includes('Failed') || status.includes('error')) buttonState = 'error';

  return (
    <MagneticButton 
      type="submit" 
      disabled={buttonState === 'sending' || buttonState === 'success'}
      className="btn-primary"
      style={{ 
        width: '100%', 
        marginTop: '16px', 
        height: '56px',
        padding: 0,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: buttonState === 'success' ? 'rgba(16, 185, 129, 0.2)' : buttonState === 'error' ? 'rgba(239, 68, 68, 0.2)' : undefined,
        borderColor: buttonState === 'success' ? 'var(--accent-emerald)' : buttonState === 'error' ? '#ef4444' : undefined,
        borderStyle: 'solid',
        borderWidth: (buttonState === 'success' || buttonState === 'error') ? '1px' : '0px',
        color: buttonState === 'error' ? '#ef4444' : buttonState === 'success' ? 'var(--accent-emerald)' : '#000',
        transition: 'all 0.3s ease'
      }}
    >
      <AnimatePresence mode="wait">
        {buttonState === 'idle' && (
          <motion.div
            key="idle"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span>Send Message</span>
            <Send className="w-5 h-5" />
          </motion.div>
        )}
        {buttonState === 'sending' && (
          <motion.div
            key="sending"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', position: 'absolute' }}
          >
            {/* Animated Paper Plane */}
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: 'visible', zIndex: 2 }}>
              <motion.path
                d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2"
                initial={{ pathLength: 1, x: -60, y: 30, scale: 0.5, rotate: -20 }}
                animate={{ 
                  x: [-60, 0, 150], 
                  y: [30, 0, -50],
                  scale: [0.5, 1.2, 0.2],
                  opacity: [0, 1, 0],
                  rotate: [-20, 0, 20]
                }}
                transition={{ 
                  duration: 2.5, 
                  ease: "easeInOut",
                  repeat: Infinity,
                  times: [0, 0.4, 1]
                }}
              />
            </svg>
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: [0, 1, 0], x: [-20, 0, 20] }}
              transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, times: [0, 0.4, 1] }}
              style={{ position: 'absolute', fontWeight: 600, color: '#000', zIndex: 1 }}
            >
              Sending...
            </motion.span>
          </motion.div>
        )}
        {buttonState === 'success' && (
          <motion.div
            key="success"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span>Sent!</span>
            <CheckCircle className="w-5 h-5" />
          </motion.div>
        )}
        {buttonState === 'error' && (
           <motion.div
            key="error"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 10, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span>Failed</span>
            <XCircle className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </MagneticButton>
  );
};

export default SubmitButton;
