import React from 'react';
import { motion } from 'framer-motion';
import { Code, Award, BarChart2, Settings, Zap, PenTool, Share2, Globe } from 'lucide-react';

interface FloatingIconProps {
  icon: React.ReactNode;
  x: string;
  y: string;
  size?: string;
  delay?: number;
  duration?: number;
  className?: string;
}

const FloatingIcon: React.FC<FloatingIconProps> = ({ 
  icon, 
  x, 
  y, 
  size = "w-10 h-10", 
  delay = 0,
  duration = 5,
  className = ""
}) => {
  return (
    <motion.div
      className={`absolute ${size} flex items-center justify-center bg-white/30 backdrop-blur-sm rounded-full text-agency-blue shadow-lg z-10 ${className}`}
      style={{ 
        left: x,
        top: y,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay,
        duration: 0.8,
        type: "spring",
        stiffness: 100
      }}
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay
        }}
      >
        {icon}
      </motion.div>
    </motion.div>
  );
};

const FloatingIcons: React.FC = () => {
  const icons = [
    { icon: <Code size={18} />, x: "10%", y: "20%", delay: 0.2, duration: 4 },
    { icon: <BarChart2 size={20} />, x: "85%", y: "15%", delay: 1.5, duration: 6 },
    { icon: <Award size={16} />, x: "20%", y: "80%", delay: 0.8, duration: 5 },
    { icon: <Settings size={22} />, x: "75%", y: "75%", delay: 2.2, duration: 7 },
    { icon: <Zap size={18} />, x: "30%", y: "30%", delay: 1.1, duration: 5.5 },
    { icon: <PenTool size={16} />, x: "60%", y: "25%", delay: 0.5, duration: 4.5 },
    { icon: <Share2 size={20} />, x: "40%", y: "70%", delay: 1.8, duration: 6.5 },
    { icon: <Globe size={22} />, x: "90%", y: "60%", delay: 0.3, duration: 5.2 },
  ];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {icons.map((props, index) => (
        <FloatingIcon key={index} {...props} />
      ))}
    </div>
  );
};

export default FloatingIcons;
