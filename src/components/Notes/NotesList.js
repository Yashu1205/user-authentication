import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

import NoteItem from './NoteItem'

const NotesList = (props) => {
    const { notes, removeNote, editNote } = props    

    const removeItem = (id) => {

        Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel!',
            })
           .then((result) => {
                if (result.isConfirmed) {

                    axios.delete(`http://dct-user-auth.herokuapp.com/api/notes/${id}`,
                        {
                            headers: {
                                'x-auth' : localStorage.getItem('token')
                            }
                        }
                    )
                    .then((response) => {
                        const result = response.data
                        if(result.hasOwnProperty('errors')){
                            Swal.fire('',result.errors,'error')
                        }
                        else{
                            Swal.fire('Deleted','Note has been deleted successfully','success')
                            removeNote(id)
                        }
                    })
                    .catch((error) => {
                        Swal.fire('Oops..',error.message,'error')
                    })              
                }
          })        
    }

    return (
        <div>
            {
                notes.length === 0 ? (
                    <h3>No notes found.</h3>
                ) : (                    
                        notes.map(note => {
                            return (
                                <NoteItem key={note._id} 
                                           {...note} 
                                           removeItem={removeItem}
                                           editNote={editNote}/>
                            )
                        })                                        
                )
            }
        </div>
    )
}

export default NotesList