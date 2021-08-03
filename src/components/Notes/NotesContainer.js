import React, { useEffect, useState } from 'react'
import axios from 'axios'

import NotesList from './NotesList'
import AddNote from './AddNote'
import Swal from 'sweetalert2'

const NotesContainer = (props) => {
    const [notes, setNotes] = useState([])    

    useEffect(() => {
        if(localStorage.getItem('token')){
            axios.get('http://dct-user-auth.herokuapp.com/api/notes', {
                headers: {
                    'x-auth': localStorage.getItem('token')
                }
            })
            .then((response) => {
                const result = response.data
                setNotes(result.reverse())
            })
            .catch((error) => {
                Swal.fire('Error',`${error.message}`,'error')
            })
        }
        else{
            props.history.push('/login')
        }
    },[])

    const addNote = (formData, id) => {
        const newNotes = [{...formData,_id: id}, ...notes]
        setNotes(newNotes)
    }

    const removeNote = (id) => {
        const result = notes.filter(note => {
            return id !== note._id
        })
        setNotes(result)
    }

    const editNote = (updatedNote) => {
        const result = notes.map(note => {
            if(updatedNote._id === note._id){
                return {...note, title: updatedNote.title, body: updatedNote.body }
            }
            else{
                return {...note}
            }
        })
        setNotes(result)
    }

    return (
        <div>
            
            <div className="row">
                <div className="col-md-7"> 
                    <h2>My Notes - {notes.length} </h2>
                    <NotesList notes={notes} removeNote={removeNote} editNote={editNote}/> 
                </div>
                <div className="col-md-5 mt-5"> 
                    <AddNote addNote={addNote}  /> 
                </div>             
            </div>
            
        </div>
    )
}

export default NotesContainer