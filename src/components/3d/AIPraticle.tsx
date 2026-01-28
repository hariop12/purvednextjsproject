import React from 'react';
import { Brain, Cpu, Network, Sparkles } from 'lucide-react';

interface AIParticleProps {
  icon: 'brain' | 'cpu' | 'network' | 'sparkles';
  className?: string;
}

const AIParticle: React.FC<AIParticleProps> = ({ icon, className = '' }) => {
  const icons = {
    brain: Brain,
    cpu: Cpu,
    network: Network,
    sparkles: Sparkles,
  };

  const Icon = icons[icon];

  return (
    <div className={`absolute transform transition-all duration-500 ${className}`}>
      <Icon className="w-6 h-6 text-agency-blue/30" />
    </div>
  );
};

export default AIParticle;