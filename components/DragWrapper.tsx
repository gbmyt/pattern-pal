"use client"
import React, { useState, useRef } from "react";
import AiAssistantDialogue from "./AiAssistantDialogue";

const DragWrapper = ({ children }: { children: React.ReactNode }) => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const rectRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rectRef.current) return;

    setIsDragging(true);
    const rect = rectRef.current;
    (rect as any).startX = e.clientX - position.x;
    (rect as any).startY = e.clientY - position.y;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !rectRef.current) return;

    const rect = rectRef.current;
    setPosition({
      x: e.clientX - (rect as any).startX,
      y: e.clientY - (rect as any).startY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={rectRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: "grab",
      }}
    >{children}</div>
  );
};

export default DragWrapper;
