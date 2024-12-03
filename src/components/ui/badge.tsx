import { cn } from "@/lib/utils";
import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'outline';
  size?: 'sm' | 'md';
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-gray-50 text-gray-900 border-gray-300',
    blue: 'bg-blue-50 text-blue-900 border-blue-400',
    green: 'bg-green-50 text-green-900 border-green-500',
    red: 'bg-red-50 text-red-800 border-red-400',
    yellow: 'bg-yellow-50 text-yellow-800 border-yellow-500',
    purple: 'bg-purple-50 text-purple-800 border-purple-400',
    outline: 'bg-transparent border'
  };

  const sizeStyles = {
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm'
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-lg border",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
