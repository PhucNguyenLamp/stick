/* eslint-disable default-case */
import React, { useEffect } from 'react'
import './Note.css'
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

export default function Note({header, message, position, onDrag, onMouseDown, isActive, onEdit, onDelete, color}) {
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
          style={{ left: position.x, top: position.y, backgroundColor: color }}
    onMouseDown={handleMouseDown}
    >
    <div className="delete" onClick={onDelete}>x</div>
          <div className="header" style={{ backgroundColor: color }}>
        <EditText 
            defaultValue={header} 
            onSave={({ value }) => onEdit(value, null)} 
    
        />
    </div>
    <div className="message" >
        <EditTextarea 
            defaultValue={message} 
            onSave={({ value }) => onEdit(null, value)} 
        />
    </div>
    </div>
  )
}

