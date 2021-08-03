import React from "react"
import axios from "axios"
import Swal from "sweetalert2"

import NoteForm from './NoteForm'

const EditNote = (props) => {
    const {id, title, body, editNote, handleToggle, toggle} = props
    
    const formSubmission = (updatedData) => {
        axios.put('http://dct-user-auth.herokuapp.com/api/notes/'+id, updatedData, {
            headers: {
                'x-auth' : localStorage.getItem('token') 
            }
        })
        .then((response) => {
            const result = response.data
            if(result.hasOwnProperty('errors')){
                Swal.fire('',result.errors,'error')
            }
            else{
                Swal.fire('success','Note updated successfully','success')
                handleToggle()
                editNote(result)
            }
        })
        .catch((error) => {
            Swal.fire('Oops..', error.message, 'error')
        })
    }

    return  (
        <>
            { toggle && 
                        <NoteForm id={id} title={title} body={body} 
                                  formSubmission={formSubmission}
                                  toggle={toggle} 
                                  handleToggle={handleToggle} /> }
        </>
    )
}

export default EditNote