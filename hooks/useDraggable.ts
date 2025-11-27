import React, { useState, useEffect, useCallback, RefObject } from 'react';

interface Position {
  x: number;
  y: number;
}

export const useDraggable = (
  ref: RefObject<HTMLElement>,
  initialPosition: Position,
  onDragEnd: (pos: Position) => void,
  enabled: boolean = true
) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(initialPosition);
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    setPosition(initialPosition);
  }, [initialPosition.x, initialPosition.y]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!enabled || !ref.current) return;
      
      // Only drag if clicking the title bar (handled by parent passing specific event source usually, 
      // but here we assume the handle wraps this hook or we check target)
      
      const rect = ref.current.getBoundingClientRect();
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsDragging(true);
    },
    [enabled, ref]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;

      // Simple boundary check could go here
      setPosition({ x: newX, y: newY });
    },
    [isDragging, offset]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      onDragEnd(position);
    }
  }, [isDragging, onDragEnd, position]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return {
    position,
    handleMouseDown,
    isDragging
  };
};