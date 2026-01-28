import React, { useEffect, useRef } from 'react';

interface MouseParallaxProps {
  children: React.ReactNode;
  speed?: number;
}

const MouseParallax: React.FC<MouseParallaxProps> = ({ children, speed = 0.05 }) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!elementRef.current) return;

      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const xPos = (clientX / innerWidth - 0.5) * speed * 100;
      const yPos = (clientY / innerHeight - 0.5) * speed * 100;

      elementRef.current.style.transform = `translate(${xPos}px, ${yPos}px)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [speed]);

  return (
    <div ref={elementRef} className="transition-transform duration-200 ease-out">
      {children}
    </div>
  );
};

export default MouseParallax;