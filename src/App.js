import './App.css';
import { useState } from 'react';
const startNote = {
  content: '', author: ''
}
function App() {
  //State
  const [note, setNote] = useState(startNote)
  const [editNote, setEditNote] = useState(null)
  const [allNotes, setallNotes] = useState([])
  //Functions from inputs
  function onNoteValueChange(event) {
    const { name, value } = event.target
    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      }
    })
  }
  function onEditNoteValueChange(event) {
    const { name, value } = event.target
    setEditNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      }
    })
  }
  //Function add,edit,delete
  function onNoteSubmit(event) {
    event.preventDefault()
    setallNotes((prevAllNotes)=>{
      const newNote = {...note }
      newNote.id = Date.now().toString()
      return [newNote, ...prevAllNotes]
    })
    setNote(startNote)
  }
  function onEditNoteSubmit(event) {
    event.preventDefault()
    setallNotes((prevAllNotes)=>{
      return prevAllNotes.map((theNote)=>{
        if(theNote.id !== editNote.id) return theNote
        return editNote
      })
    })
    setEditNote(null)
  }
  function onNoteDelete(noteid){
    setallNotes((prevAllNotes)=>{
      return prevAllNotes.filter((theNote) => theNote.id !== noteid)
    })
  }
  //Elements
  const noteElements = allNotes.map((theNote)=>{
    return (
      <div key={theNote.id} className="app-note">
        <p>{theNote.content}</p>
        <h5>{theNote.author}</h5>
        <p>
          <a onClick={() =>{setEditNote(theNote)}}>Edit</a>
          <span> | </span>
          <a onClick={()=>{onNoteDelete(theNote.id)}}>Delete</a>
        </p>
      </div>
    )
  })
let editNoteElement = null
if(!!editNote){
  editNoteElement = (
    <div className="app-edit-note">
      <form onSubmit={onEditNoteSubmit}>
          <p>
            <textarea className="app-container-input"
              rows="3"
              placeholder="บันทึกความในใจ"
              name="content"
              value={editNote.content}
              onChange={onEditNoteValueChange}
            />
          </p>
          <p>
            <input className="app-container-input"
              type="text"
              placeholder="ผู้เขียน"
              name="author"
              value={editNote.author}
              onChange={onEditNoteValueChange}
            />
          </p>
          <p>
            <button type="submit">เพิ่มให้หน่อย</button>
          </p>
        </form>
    </div>
  )
}

  return (
    <section className="app-section">
      <div className="app-container">
        <h3>บันทึกซักหน่อย</h3>
        <form onSubmit={onNoteSubmit}>
          <p>
            <textarea className="app-container-input"
              rows="3"
              placeholder="บันทึกความในใจ"
              name="content"
              value={note.content}
              onChange={onNoteValueChange}
            />
          </p>
          <p>
            <input className="app-container-input"
              type="text"
              placeholder="ผู้เขียน"
              name="author"
              value={note.author}
              onChange={onNoteValueChange}
            />
          </p>
          <p>
            <button type="submit">เพิ่มให้หน่อย</button>
          </p>
        </form>
        <div className="app-notes">
          {noteElements}
        </div>

      </div>
      {editNoteElement}
    </section>
  );
}

export default App;
