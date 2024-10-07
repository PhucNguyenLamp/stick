import React, {useEffect} from 'react';
import './App.css';
import Note from './components/Note';

function App() {
  const [notes, setNotes] = React.useState([{ header: "helloWorld", message: "Helloworld", position: { x: 50, y: 60 } }]);
  const [activeNote, setActiveNote] = React.useState(null);
  
  // const fetchNotes = async () => {
  //   const response = await fetch('http://localhost:8000/notes');
  //   const data = await response.json();
  //   setNotes(data);
  // }
  // useEffect(() => {

  // }, [])
  const addNote = () => {
    const newNote = {
      header: "newNote",
      message: "newNote",
      position: { x: 100, y: 100 }
    }
    setNotes([...notes, newNote])
  }

  const updateNotePosition = (index, x, y) => {
    const updatedNotes = notes.map((note, i) => 
      i === index ? {...note, position: {x, y}} : note
    );
    setNotes(updatedNotes);
  }

  const handleMouseDown = (index) => {
    setActiveNote(index);
  }
  return (
    <div >
      <div onClick={addNote}>
        <svg class="add" viewBox="0 0 448 512" height={32} width={32}><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" /></svg>
      </div>
      {
        notes.map((note, index) => {
          return <Note key={index} header={note.header} message={note.message} position={note.position} onDrag={(x, y) => updateNotePosition(index, x, y)}
          onMouseDown = {() => handleMouseDown(index)}
          isActive = {activeNote === index}
          />
        })
      }
    </div>
  );
}

export default App;
