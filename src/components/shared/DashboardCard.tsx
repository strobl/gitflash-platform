
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
  onClick?: () => void; // Added onClick property
}

export function DashboardCard({ 
  title, 
  description, 
  children, 
  footer,
  className,
  isHighlighted = false,
  onClick
}: DashboardCardProps) {
  return (
    <Card 
      className={cn(
        "overflow-hidden",
        isHighlighted && "border-gitflash-primary card-gradient",
        onClick && "cursor-pointer hover:border-gitflash-primary transition-colors",
        className
      )}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
