import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

import NoteForm from './NoteForm'

const AddNote = (props) => {
    const { addNote } = props
    const [isSaved, setIsSaved ] = useState(false)

    const formSubmission = (formData) => {
        axios.post('http://dct-user-auth.herokuapp.com/api/notes', formData, {
            headers: {
                'x-auth' : localStorage.getItem('token') 
            }
        })
        .then((response) => {
            const result = response.data
            if(result.hasOwnProperty('errors')){
                alert(result.errors)
            }
            else{
                Swal.fire('Added!','Note added successfully', 'success')
                addNote(formData, result._id) 
                setIsSaved(true)               
            }
        })
        .catch((error) => {
            alert(error.message)
        })        
    }

    const toggleSaved = () => {
        setIsSaved(!isSaved)
    }

    return (
        <NoteForm formSubmission={formSubmission} 
                  isSaved={isSaved} 
                  toggleSaved={toggleSaved} />
    )
}

export default AddNote