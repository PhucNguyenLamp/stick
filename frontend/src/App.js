import React, {useEffect} from 'react';
import './App.css';
import Note from './components/Note';
import {ObjectId} from 'bson';

function App() {
  const [notes, setNotes] = React.useState([]);
  const [activeNote, setActiveNote] = React.useState(null);
  
  const fetchNotes = async () => {
    const response = await fetch('http://localhost:3000/api/notes');
    const data = await response.json();
    setNotes(data);
  }
  useEffect(() => {
    fetchNotes();
  }, [])
  const generateTintedWhiteColor = (blendFactor) => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    const tintedColor = {
      r: Math.floor(255 - (255 - r) * blendFactor),
      g: Math.floor(255 - (255 - g) * blendFactor),
      b: Math.floor(255 - (255 - b) * blendFactor),
    };

    // Convert to hexadecimal
    const hexColor = '#' + ((1 << 24) + (tintedColor.r << 16) + (tintedColor.g << 8) + tintedColor.b).toString(16).slice(1);

    return hexColor;
  };

  const addNote = async () => {
    const newNote = {
      _id: new ObjectId(),
      header: "new note",
      message: "new message",
      position: {
        x: 100, 
        y: 100,
      },
      color: generateTintedWhiteColor(0.2),
    }
    console.log('adding note')
    await fetch('http://localhost:3000/api/note', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    })
    setNotes([...notes, newNote])
  }
  function debounce(cb, delay){
    let timeout
    return function(...args){
      clearTimeout(timeout)
      timeout = setTimeout(()=>{
        cb(...args)
      }, delay)
    }
  }
  const sendNotePosition = async (noteId, x, y) => {
    console.log(`sending note ${noteId} position`)
    await fetch(`http://localhost:3000/api/note/${noteId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ position: { x, y } })
    })
  }
  const sendNotePositionDebounce = debounce(sendNotePosition, 1000)
  const updateNotePosition = (id, x, y) => {
    const updatedNotes = notes.map((note, i) => {
      if (note._id === id) {
        return {
          ...note,
          position: { x, y }
        }
      }
      return note;
    });
    setNotes(updatedNotes);
    sendNotePositionDebounce(id, x, y);
  }

  const updateNoteContent = async (id, header, message) => {
    await fetch(`http://localhost:3000/api/note/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ header, message })
    })
  }

  const deleteNote = async (id) => {
    await fetch(`http://localhost:3000/api/note/${id}`, {
      method: 'DELETE',
    })
    console.log(`deleting note ${id}`)
    const updatedNotes = notes.filter((note) => note._id !== id);
    setNotes(updatedNotes);
  }

  const handleMouseDown = (id) => {
    setActiveNote(id);
  }
  return (
    <div className="background">
      <div onClick={addNote}>
        <svg className="add" viewBox="0 0 448 512" height={32} width={32}><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" /></svg>
      </div>
      {
        notes.map((note) => {
          return <Note 
          key={note._id} header={note.header} message={note.message} position={note.position} 
            onDrag={(x, y) => updateNotePosition(note._id, x, y)} 
            onEdit={(header, message) => updateNoteContent(note._id, header, message)}
            onDelete={() => deleteNote(note._id)}
            onMouseDown={() => handleMouseDown(note._id)}
            isActive={activeNote === note._id}
            color={note.color}
          />
        })
      }
    </div>
  );
}

export default App;
