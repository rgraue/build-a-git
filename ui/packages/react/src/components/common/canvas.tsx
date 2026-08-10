import React, { useState, useRef } from 'react';
import { Branch } from '../editor/branch';

export const DraggableCanvas = ({children}: {children: React.ReactElement | React.ReactElement[]}) => {
  const canvasRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [pan, setPan] = useState({ x: -2000, y: -2000 });
  const dragStart = useRef({ x: -2000, y: -2000 });

  const handleMouseDown = (e: any) => {
    if (e.target.id == 'canvas') {
      setIsDragging(true);
    }

    // Track where the mouse clicked relative to the current pan positioning
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging) return;
    // Calculate new position based on pointer movement
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <div
      style={{
        overflow: 'hidden',
        backgroundColor: 'Menu',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
    >
      {/* This inner div acts as the infinitely large workspace canvas */}
      <div
        id="canvas"
        ref={canvasRef}
        style={{
          width: '5000px',
          height: '5000px',
          transform: `translate(${pan.x}px, ${pan.y}px)`,
          backgroundImage: 'radial-gradient(#80808022 2px, transparent 1px)',
          backgroundSize: '40px 40px',
          position: 'relative',
          justifyContent: "center",
          alignItems: "center",
          display: "flex"
        }}
      >
        {children}
      </div>
    </div>
  );
}
