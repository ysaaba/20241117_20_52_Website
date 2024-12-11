import React from 'react';
import { DragDropContext, DragDropContextProps } from 'react-beautiful-dnd';
import { useEffect, useState } from 'react';

interface DragDropWrapperProps extends Omit<DragDropContextProps, 'children'> {
  children: React.ReactNode;
}

export function DragDropWrapper({ children, onDragEnd }: DragDropWrapperProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Small timeout to let the DOM render completely
    const timeout = setTimeout(() => {
      setEnabled(true);
    }, 100);

    return () => {
      clearTimeout(timeout);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {children}
    </DragDropContext>
  );
} 