import React, {useState, useEffect} from 'react'
import { useParams, Link } from "react-router-dom";
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

  let handleSubmit = () => {
    updateNote()
    navigate('/');
  }
  return (
    <div className="note">
        <div className="note-header">
          <h3>
            <ArrowLeft onClick={handleSubmit}/>
          </h3>
        </div>
        <textarea onChange={(e) => { setNote({ ...note, 'body':e.target.value }) }} defaultValue={note?.body}></textarea>
    </div>
  )
}

export default NotePage