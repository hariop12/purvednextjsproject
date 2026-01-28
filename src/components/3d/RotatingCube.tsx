
import React, { useEffect, useRef } from 'react';

interface RotatingCubeProps {
  size?: string;
  color1?: string;
  color2?: string;
  speed?: number;
}

const RotatingCube: React.FC<RotatingCubeProps> = ({
  size = 'w-24 h-24',
  color1 = 'from-agency-blue',
  color2 = 'to-agency-orange',
  speed = 10
}) => {
  const cubeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;
    
    let animationFrameId: number;
    let rotateX = 0;
    let rotateY = 0;
    
    const animate = () => {
      rotateX += 0.3;
      rotateY += 0.5;
      
      if (cube) {
        cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
      
      animationFrameId = window.requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [speed]);
  
  return (
    <div className="perspective-container">
      <div 
        ref={cubeRef}
        className={`${size} relative transform-style-preserve-3d`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front face */}
        <div className={`absolute w-full h-full bg-gradient-to-br ${color1} ${color2} opacity-90`} style={{ transform: 'translateZ(2rem)' }}></div>
        
        {/* Back face */}
        <div className={`absolute w-full h-full bg-gradient-to-tl ${color1} ${color2} opacity-90`} style={{ transform: 'translateZ(-2rem) rotateY(180deg)' }}></div>
        
        {/* Left face */}
        <div className={`absolute w-full h-full bg-gradient-to-tr ${color1} ${color2} opacity-90`} style={{ transform: 'translateX(-2rem) rotateY(-90deg)' }}></div>
        
        {/* Right face */}
        <div className={`absolute w-full h-full bg-gradient-to-bl ${color1} ${color2} opacity-90`} style={{ transform: 'translateX(2rem) rotateY(90deg)' }}></div>
        
        {/* Top face */}
        <div className={`absolute w-full h-full bg-gradient-to-r ${color1} ${color2} opacity-90`} style={{ transform: 'translateY(-2rem) rotateX(90deg)' }}></div>
        
        {/* Bottom face */}
        <div className={`absolute w-full h-full bg-gradient-to-l ${color1} ${color2} opacity-90`} style={{ transform: 'translateY(2rem) rotateX(-90deg)' }}></div>
      </div>
    </div>
  );
};

export default RotatingCube;
