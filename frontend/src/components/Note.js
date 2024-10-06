import React, { useEffect } from 'react'
import './Note.css'

export default function Note({header, message, position, onDrag, onMouseDown, isActive}) {
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragOffset, setDragOffset] = React.useState({ x: 0, y: 0 });
    const handleMouseDown = e => {
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
        onMouseDown();
    }
    const handleMouseMove = e => {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const newWidth = Math.max(0, Math.min(windowWidth, e.clientX - dragOffset.x));
        const newHeight = Math.max(0, Math.min(windowHeight, e.clientY - dragOffset.y));
        onDrag(newWidth, newHeight);
    }
    const handleMouseUp = e => {
        setIsDragging(false);
    }
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
        }
    }, [isDragging]);
  return (
      <div className={`note ${isActive ? 'active' : ''}`} 
        style={{ left: position.x, top: position.y}}
        onMouseDown={handleMouseDown}
      >
        <strong>{header}</strong>
        <p>{message}</p>
    </div>
  )
}

