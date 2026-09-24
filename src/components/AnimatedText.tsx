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
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const wordVariant: Variants = {
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    hidden: {
      opacity: 0,
      filter: "blur(8px)",
    },
  };

  return (
    <motion.div
      ref={ref}
      style={{ display: "inline-flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariant}
          style={{ display: "inline-block", position: "relative", marginRight: "0.28em", willChange: "transform, opacity" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
