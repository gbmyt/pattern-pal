"use client"
import React, { useState, useRef, useEffect } from "react";

const DragWrapper = ({ children }: { children: React.ReactNode }) => {
  const [position, setPosition] = useState({ x: 40, y: 40 });
  const [isDragging, setIsDragging] = useState(false);
  const offsetRef = useRef<{ offsetX: number; offsetY: number }>({
    offsetX: 0,
    offsetY: 0,
  });
  const rectRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    offsetRef.current = {
      offsetX: e.clientX - position.x,
      offsetY: e.clientY - position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - offsetRef.current.offsetX,
        y: e.clientY - offsetRef.current.offsetY,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={rectRef}
      onMouseDown={handleMouseDown}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none", // prevents text highlighting while dragging
      }}
    >
      {children}
    </div>
  );
};

export default DragWrapper;
