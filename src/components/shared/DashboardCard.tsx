
import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  isHighlighted?: boolean;
}

export function DashboardCard({ 
  title, 
  description, 
  children, 
  footer,
  className,
  isHighlighted = false
}: DashboardCardProps) {
  return (
    <Card className={cn(
      "overflow-hidden",
      isHighlighted && "border-gitflash-primary card-gradient",
      className
    )}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
