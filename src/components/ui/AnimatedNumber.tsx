
import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  formatter?: (value: number) => string;
}

const AnimatedNumber = ({ 
  value, 
  duration = 1000, 
  className,
  formatter = (val) => val.toLocaleString()
}: AnimatedNumberProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const startTimeRef = useRef<number | null>(null);
  const startValueRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  
  useEffect(() => {
    startValueRef.current = displayValue;
    startTimeRef.current = null;
    
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
    }
    
    const animateValue = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }
      
      const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);
      const nextValue = Math.floor(startValueRef.current + progress * (value - startValueRef.current));
      
      setDisplayValue(nextValue);
      
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animateValue);
      } else {
        setDisplayValue(value);
      }
    };
    
    frameRef.current = requestAnimationFrame(animateValue);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [value, duration]);
  
  return (
    <span className={cn("tabular-nums", className)}>
      {formatter(displayValue)}
    </span>
  );
};

export default AnimatedNumber;
