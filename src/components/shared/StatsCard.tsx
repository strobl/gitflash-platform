
import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  value: string | number;
  label: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
}

export function StatsCard({ value, label, icon, trend, className }: StatsCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-3xl font-bold">{value}</p>
            
            {trend && (
              <div className="mt-2 flex items-center text-xs">
                <span 
                  className={cn(
                    "font-medium", 
                    trend.value >= 0 
                      ? "text-green-500" 
                      : "text-red-500"
                  )}
                >
                  {trend.value >= 0 ? '+' : ''}{trend.value}%
                </span>
                <span className="ml-1 text-muted-foreground">{trend.label}</span>
              </div>
            )}
          </div>
          
          {icon && (
            <div className="self-start">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
