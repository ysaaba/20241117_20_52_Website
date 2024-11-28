import React from 'react';
import { cn } from '../../lib/utils';

interface ToggleGroupProps {
  children: React.ReactNode;
  className?: string;
  value: string[];
  onValueChange: (value: string[]) => void;
}

interface ToggleGroupItemProps {
  children: React.ReactNode;
  className?: string;
  value: string;
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({
  children,
  className,
  value,
  onValueChange,
}) => {
  const handleClick = (itemValue: string) => {
    if (value.includes(itemValue)) {
      onValueChange(value.filter(v => v !== itemValue));
    } else {
      onValueChange([...value, itemValue]);
    }
  };

  return (
    <div 
      className={cn(
        "inline-flex w-full divide-x divide-gray-200 rounded-lg border border-gray-200 bg-white shadow-sm",
        className
      )}
    >
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              onClick: () => handleClick(child.props.value),
              isActive: value.includes(child.props.value),
            })
          : child
      )}
    </div>
  );
};

export const ToggleGroupItem: React.FC<ToggleGroupItemProps & { 
  onClick: () => void; 
  isActive: boolean 
}> = ({
  children,
  className,
  value,
  onClick,
  isActive,
}) => {
  return (
    <button
      className={cn(
        "flex-1 px-4 py-2.5 text-sm font-medium transition-colors",
        "first:rounded-l-lg last:rounded-r-lg",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        "disabled:cursor-not-allowed disabled:opacity-50",
        isActive 
          ? "bg-gray-50 text-gray-900" 
          : "bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
