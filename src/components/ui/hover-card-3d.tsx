import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface HoverCard3DProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  borderGlow?: boolean;
  glowColor?: string;
}

export const HoverCard3D: React.FC<HoverCard3DProps> = ({
  children,
  className = '',
  intensity = 10,
  borderGlow = false,
  glowColor = "rgba(66, 153, 225, 0.6)"
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [scale, setScale] = useState(1);
  const [glowOpacity, setGlowOpacity] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const deltaX = (mouseX - centerX) / (rect.width / 2);
    const deltaY = (mouseY - centerY) / (rect.height / 2);
    
    setRotateX(-deltaY * intensity);
    setRotateY(deltaX * intensity);
    setScale(1.05);
    setGlowOpacity(0.8);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setScale(1);
    setGlowOpacity(0);
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-full h-full"
      >
        {borderGlow && (
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{
              boxShadow: `0 0 15px ${glowColor}`,
              opacity: glowOpacity,
            }}
            transition={{ duration: 0.2 }}
          />
        )}
        {children}
      </motion.div>
    </div>
  );
};
