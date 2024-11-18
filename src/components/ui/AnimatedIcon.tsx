import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AnimatedIconProps {
  Icon: LucideIcon;
  isActive?: boolean;
  className?: string;
}

export function AnimatedIcon({ Icon, isActive, className = "" }: AnimatedIconProps) {
  return (
    <div className="flex items-center justify-center">
      <Icon 
        className={`w-4 h-4 transition-all duration-300 ${
          isActive ? 'stroke-[2px]' : 'stroke-[1.5px]'
        } ${className}`}
      />
    </div>
  );
} 