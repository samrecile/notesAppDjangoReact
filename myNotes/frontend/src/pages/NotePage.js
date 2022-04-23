import React, {useState, useEffect} from 'react'
import { useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import { useNavigate } from 'react-router';

const NotePage = ({ history }) => {

  let noteId = useParams()
  let [note, setNote] = useState(null)
  let navigate = useNavigate();

  useEffect(() => {
    getNote()
  }, [noteId])

  let getNote = async () => {
    if (noteId.id === 'new') return

    let response = await fetch(`/api/notes/${noteId.id}/`)
    let data = await response.json()
    setNote(data)
  }

  let updateNote = async () => {
    fetch(`/api/notes/${noteId.id}/update/`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note.body)
    })
  }

  let deleteNote = async () => {
    fetch(`/api/notes/${noteId.id}/delete/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    navigate('/')
  }

  let createNote = async () => {
    fetch(`/api/notes/create/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
  }

  let handleSubmit = () => {
    console.log(note)
    if (noteId.id !== 'new' && note.body === ''){
      deleteNote()
    } else if (noteId.id !== 'new' ) {
      updateNote() 
    } else if (noteId.id === 'new' && note.body !== null) {
      createNote()
    }
    navigate('/');
  }

  let handleChange = (value) => {
    setNote(note => ({...note, 'body': value}))
    console.log('Handle Change:', note)
  }
  return (
    <div className="note">
        <div className="note-header">
          <h3>
            <ArrowLeft onClick={handleSubmit}/>
          </h3>
          {noteId.id !== 'new' ? (
            <button onClick={deleteNote}>Delete</button>
          ) : (
            <button onClick={handleSubmit}>Done</button>
          )}
        </div>
        <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
    </div>
  )
}

export default NotePage