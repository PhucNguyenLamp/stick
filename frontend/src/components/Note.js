import React from 'react'
import './Note.css'

export default function Note({header, message, position, onDrag, onMouseDown, isActive}) {
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });

    const handleMouseDown = e => {
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        })
        onMouseDown();
    }
    const handleMouseMove = e => {
        if (isDragging) {
            onDrag(e.clientX - dragOffset.x, e.clientY - dragOffset.y);
        }
    }
    const handleMouseUp = e => {
        setIsDragging(false);
    }
  return (
      <div className={`note ${isActive ? 'active' : ''}`} 
        style={{ left: position.x, top: position.y}}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <strong>{header}</strong>
        <p>{message}</p>
    </div>
  )
}

