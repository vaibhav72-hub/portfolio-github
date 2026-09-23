import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  once?: boolean;
}

export default function AnimatedText({ text, className = "", once = true }: AnimatedTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  // Split text into words for clean, snappy staggered word animation
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.02 },
    },
  };

  const wordVariant: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 140,
      },
    },
    hidden: {
      opacity: 0,
      y: 12,
    },
  };

  return (
    <motion.div
      ref={ref}
      style={{ display: "inline-block" }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariant}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
