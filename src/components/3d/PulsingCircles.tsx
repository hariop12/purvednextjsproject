import React from 'react';
import { motion } from 'framer-motion';

interface PulsingCirclesProps {
  count?: number;
  color?: string;
  className?: string;
}

const PulsingCircle = ({ delay, size, x, y }: { delay: number; size: string; x: string; y: string }) => {
  return (
    <motion.div
      className={`absolute rounded-full ${size} bg-agency-blue/20`}
      style={{ 
        left: x,
        top: y,
      }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.1, 0.3, 0.1],
      }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        times: [0, 0.5, 1],
        repeat: Infinity,
        delay
      }}
    />
  );
};

const PulsingCircles: React.FC<PulsingCirclesProps> = ({ 
  count = 5,
  color = "agency-blue",
  className = ""
}) => {
  // Generate random positions for circles
  const circles = React.useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      delay: i * 0.8,
      size: ['w-48 h-48', 'w-64 h-64', 'w-36 h-36', 'w-72 h-72', 'w-56 h-56'][i % 5],
      x: `${Math.random() * 80 + 10}%`,
      y: `${Math.random() * 80 + 10}%`,
    }));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {circles.map((circle) => (
        <PulsingCircle 
          key={circle.id} 
          delay={circle.delay} 
          size={circle.size} 
          x={circle.x} 
          y={circle.y} 
        />
      ))}
    </div>
  );
};

export default PulsingCircles;