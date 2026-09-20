import React from 'react';
import { motion } from 'framer-motion';
import './CircularText.css';

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  className?: string;
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  className = '',
}) => {
  const letters = Array.from(text);

  return (
    <motion.div
      className={`circular-text ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: spinDuration,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {letters.map((letter, index) => {
        const angle = (360 / letters.length) * index;

        return (
          <span
            key={index}
            style={{
              transform: `rotate(${angle}deg) translateY(-45px)`,
            }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;