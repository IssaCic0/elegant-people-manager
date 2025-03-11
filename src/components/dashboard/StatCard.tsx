
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedNumber from '@/components/ui/AnimatedNumber';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  className?: string;
  valueFormatter?: (value: number) => string;
  iconClassName?: string;
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendLabel = "相比上月",
  className,
  valueFormatter,
  iconClassName,
}: StatCardProps) => {
  const isTrendPositive = trend && trend > 0;
  const isTrendNegative = trend && trend < 0;
  
  return (
    <GlassCard className={cn("p-5", className)} hoverEffect>
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className={cn(
          "p-2 rounded-full",
          iconClassName || "bg-primary/10 text-primary"
        )}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold">
          <AnimatedNumber value={value} formatter={valueFormatter} />
        </div>
        
        {trend !== undefined && (
          <div className="flex items-center text-sm">
            <span
              className={cn(
                "font-medium",
                isTrendPositive && "text-emerald-600",
                isTrendNegative && "text-rose-600",
                !isTrendPositive && !isTrendNegative && "text-muted-foreground"
              )}
            >
              {isTrendPositive && "+"}{trend}%
            </span>
            <span className="ml-1 text-muted-foreground">{trendLabel}</span>
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default StatCard;
