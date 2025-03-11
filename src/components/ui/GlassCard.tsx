
import React from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard = ({ children, className, hoverEffect = false }: GlassCardProps) => {
  return (
    <div 
      className={cn(
        "glass-card rounded-xl shadow-sm transition-all duration-300",
        hoverEffect && "hover:shadow-md hover:translate-y-[-2px]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
