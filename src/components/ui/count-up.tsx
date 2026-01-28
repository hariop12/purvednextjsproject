
"use client";

import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUp({ 
  end, 
  duration = 2000, 
  delay = 0, 
  prefix = '', 
  suffix = '',
  className = ''
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const countRef = useRef<number>(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only set up the observer if we haven't animated yet
    if (!hasAnimated && elementRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            // Start animation after specified delay
            setTimeout(() => {
              animateCount();
              setHasAnimated(true);
              // Disconnect observer once animation has started
              if (observerRef.current) {
                observerRef.current.disconnect();
              }
            }, delay);
          }
        },
        { threshold: 0.1 }
      );
      
      observerRef.current.observe(elementRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [delay, hasAnimated]);

  const animateCount = () => {
    const startTime = performance.now();
    const startValue = 0;
    
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Using easeOutExpo for a nice deceleration at the end
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      
      const currentCount = Math.floor(startValue + easeOutExpo * (end - startValue));
      countRef.current = currentCount;
      setCount(currentCount);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    
    requestAnimationFrame(step);
  };
  
  return (
    <div ref={elementRef} className={className}>
      {prefix}{count}{suffix}
    </div>
  );
}
