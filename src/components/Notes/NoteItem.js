import React, { useState } from 'react'
import EditNote from './EditNote'
import axios from 'axios'
import Swal from 'sweetalert2'

const NoteItem = (props) => {
    const { _id, title, body, removeItem, editNote} = props
    const [ toggle, setToggle]  = useState(false)

    const showNote = (id) => {
        axios.get(`http://dct-user-auth.herokuapp.com/api/notes/${id}`,
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
                Swal.fire({
                    title: `<h3>${result.title}</h3>`,
                    text: result.body
                  })
            }
        })
        .catch((error) => {
            Swal.fire('Oops..',error.message,'error')
        })    

    }

    const handleToggle = () => {
        setToggle(!toggle)
    }

    return (
        <div className="card mb-2" key={_id}>
            <div className="card-body">
                <span onClick={() => showNote(_id)} style={{cursor: 'pointer'}}>
                    { title}</span>

                <div className="mt-2" style={{float:'right'}}>
                    <button className="btn btn-primary btn-sm"
                            style={{marginRight:'5px'}}
                            onClick={handleToggle}> 
                        Edit </button>

                    <button className="btn btn-danger btn-sm" 
                            onClick={() => {
                                removeItem(_id)
                            }}>
                        Delete </button>
                </div>

                { toggle && <EditNote id={_id} title={title} body={body} 
                                      editNote={editNote}
                                      toggle={toggle}
                                      handleToggle={handleToggle}/> }
                
            </div>
        </div>
    )
}

export default NoteItem