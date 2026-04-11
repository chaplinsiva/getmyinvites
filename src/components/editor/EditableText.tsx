"use client";

import { useState, useRef } from "react";

export function EditableText({
  id,
  defaultText,
  isEditing,
  className,
  style = {},
}: {
  id: string;
  defaultText: string;
  isEditing: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [text, setText] = useState(defaultText);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{ startX: number; startY: number; initialX: number; initialY: number } | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isEditing || !e.altKey) return;
    e.preventDefault();
    setIsDragging(true);
    dragRef.current = { startX: e.clientX, startY: e.clientY, initialX: pos.x, initialY: pos.y };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragRef.current) return;
    setPos({ x: dragRef.current.initialX + (e.clientX - dragRef.current.startX), y: dragRef.current.initialY + (e.clientY - dragRef.current.startY) });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    dragRef.current = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  return (
    <div className={`relative group ${isEditing ? "hover:ring-1 hover:ring-dashed hover:ring-indigo-400" : ""}`}>
      {isEditing && (
        <div className="absolute -top-6 left-0 text-[9px] uppercase tracking-wider text-indigo-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-indigo-50 px-2 py-0.5 rounded shadow-sm border border-indigo-100">
          Hold ALT to drag
        </div>
      )}
      <div
        data-editable-id={id}
        contentEditable={isEditing}
        suppressContentEditableWarning
        onBlur={(e) => setText(e.currentTarget.innerText)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        style={{
          transform: `translate(${pos.x}px, ${pos.y}px)`,
          cursor: isDragging ? "grabbing" : isEditing ? "text" : "auto",
          outline: "none",
          whiteSpace: "pre-wrap",
          ...style,
        }}
        className={className}
      >
        {text}
      </div>
    </div>
  );
}
