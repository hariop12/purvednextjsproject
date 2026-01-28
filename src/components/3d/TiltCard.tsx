
import React, { useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  intensity = 15,
  onMouseEnter,
  onMouseLeave
}) => {
  const [transform, setTransform] = useState('');
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * intensity;
    const rotateY = ((centerX - x) / centerX) * intensity;
    
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };
  
  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg)');
    if (onMouseLeave) {
      onMouseLeave();
    }
  };
  
  const handleMouseEnter = () => {
    if (onMouseEnter) {
      onMouseEnter();
    }
  };
  
  return (
    <div
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{ transform }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </div>
  );
};

export default TiltCard;
