import React, { useEffect, useState } from 'react'


const NoteForm = (props) => {
    const { title: noteTitle, body: noteBody, toggle, handleToggle, formSubmission, isSaved, toggleSaved } = props
    const [title, setTitle] = useState(noteTitle || '') 
    const [body, setBody] = useState(noteBody || '')
    const [formErrors, setFormErrors] = useState({})

    useEffect(() => {
        if(isSaved){
            setTitle('')
            setBody('')
            toggleSaved()
        }
    }, [isSaved])

    const handleChange = (e) => {
        if(e.target.name === 'title'){
            setTitle(e.target.value)
        }
        else if(e.target.name === 'body'){
            setBody(e.target.value)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(title.trim().length === 0){
            const error = {title: 'title cannot be blank '}
            setFormErrors(error)
        }
        else{
            setFormErrors({})
            const formData = {
                title: title,
                body: body
            }
            formSubmission(formData)
        }
        
    }

    const cancelEdit = () => {
        handleToggle()
    }

    return (
        <div className="card">
            <div className="card-body">
            <h2>{toggle ? 'Update' : 'Add'} Note</h2>

            <form onSubmit={handleSubmit}>

                <input type="text" className="form-control"
                       name="title" 
                       value={title} 
                       onChange={handleChange}
                       placeholder="Enter title"
                />
                { formErrors.title && <span> {formErrors.title}<br/> </span> }
                <br/>

                <textarea name="body" className="form-control"
                          value={body}
                          onChange={handleChange}
                          placeholder="Enter body">
                </textarea> <br/>

                <input type="submit" className="btn btn-primary btn-sm" value={toggle ? 'update' : 'save' } />
                
                { toggle && <button className="btn btn-secondary btn-sm" style={{marginLeft: '5px'}}
                                    onClick={cancelEdit}>Cancel</button> }
            </form>
            </div>
        </div>
    )
}

export default NoteForm