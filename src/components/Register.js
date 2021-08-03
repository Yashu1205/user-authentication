import React, { useState } from 'react' 
import axios from 'axios'
import Swal from 'sweetalert2'

const Register = (props) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({})
    const [serverErrors, setServerErrors] = useState({})
    let signupErrors = {}

    const handleChange = (e) => {
        if(e.target.name === 'username'){
            setUsername(e.target.value)
        }
        else if(e.target.name === 'email'){
            setEmail(e.target.value)
        }
        else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
    }

    const runValidations = () => {
        if(username.trim().length === 0){
            signupErrors.username = 'username cannot be blank'
        }
        if(email.trim().length  === 0){
            signupErrors.email = 'email cannot be blank'
        }

        if(password.trim().length === 0){
            signupErrors.password = 'password cannot be blank'
        } else if(password.length >=128 || password.length < 8){
            signupErrors.password = 'password length should be between 8 to 128'
        }
    } 

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()        

        if(Object.keys(signupErrors).length > 0){
            setFormErrors(signupErrors)
        }
        else{
            setFormErrors({})
            const formData = {
                username: username,
                email: email,
                password: password
            }
            axios.post('http://dct-user-auth.herokuapp.com/users/register', formData)
                 .then((response) => {
                     if(response.data.hasOwnProperty('errors')){
                        setServerErrors(response.data.errors)
                     }
                     else{
                         Swal.fire({title: 'Success', text: 'Successfully registered'})
                        props.history.push('/login')
                     }
                     
                 })
                 .catch((error) => {
                     alert(error.message)
                 })
        }
        
    }

    const cancelRegister = (e) => {
        e.preventDefault()
        setFormErrors({})
        setServerErrors({})
        setUsername('')
        setEmail('')
        setPassword('')
    }

    return (
        <div className="col-md-6">
            <h3>Register With Us</h3>

            <form className="form-group" onSubmit={handleSubmit}>

                <input type="text" className="form-control"
                       name="username" 
                       value={username} 
                       onChange={handleChange} 
                       placeholder="Enter username" />
                { formErrors.username && <span className="text-danger"> 
                                             { formErrors.username}<br/> </span> }
                { serverErrors.username && <span className="text-danger"> 
                                             { serverErrors.username.message } <br/> </span>}<br/>
                
                <input type="text"  className="form-control"
                       name="email" 
                       value={email} 
                       onChange={handleChange} 
                       placeholder="Enter email" />
                { formErrors.email && <span className="text-danger"> 
                                        { formErrors.email} <br/></span> }
                { serverErrors.email && <span className="text-danger"> 
                                        { serverErrors.email.message } <br/></span>}<br/>

                <input type="password" className="form-control"
                       name="password" 
                       value={password} 
                       onChange={handleChange} 
                       placeholder="Enter password" />
                { formErrors.password && <span className="text-danger"> 
                                          { formErrors.password} <br/></span> }
                { serverErrors.password && <span className="text-danger"> 
                                          { serverErrors.password.message } <br/></span>}<br/>

                <input type="submit" className="btn btn-success btn-sm" value="Register" />
                <button className="mx-2 btn btn-secondary btn-sm" onClick={cancelRegister}>Cancel</button>
            </form>
        </div>  
    )
}

export default Register