import React, { useState } from 'react' 
import axios from 'axios'
import Swal from 'sweetalert2'
const Login = (props) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formErrors, setFormErrors] = useState({}) 
    const [ serverErrors, setServerErrors] = useState()
    const loginErrors = {}

    const handleChange = (e) => {
        if(e.target.name === 'email'){
            setEmail(e.target.value)
        }
        else if(e.target.name === 'password'){
            setPassword(e.target.value)
        }
    }

    const runValidations = () => {
        if(email.trim().length === 0){
            loginErrors.email = 'email cannot be blank'
        }
        if(password.trim().length === 0){
            loginErrors.password = 'password cannot be blank'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if(Object.keys(loginErrors).length > 0){
            console.log('error true')
            setFormErrors(loginErrors)
        }
        else{
            setFormErrors({})
            const formData = {
                email: email,
                password: password
            }
            axios.post('http://dct-user-auth.herokuapp.com/users/login', formData)
                 .then((response) => {
                     if(response.data.hasOwnProperty('errors')){
                        setServerErrors(response.data.errors)
                        //  Swal.fire('Error',response.data.errors,'error')
                     }
                     else{
                         Swal.fire('', 'Successfully logged in','success')
                         localStorage.setItem('token',response.data.token)
                         props.history.push('/')
                         props.handleAuth()
                     }
                 })
                 .catch((error) => {
                     Swal.fire('Oops..',error.message,'error')
                 })            
        }
        
    }

    const cancelLogin = (e) => {
        e.preventDefault()
        setFormErrors({})
        setServerErrors('')
        setEmail('')
        setPassword('')
    }

    return (
        <div className="col-md-6">           
            <h3>Login To Your Account</h3>

            <form className="form-group" onSubmit={handleSubmit}>
                <input type="text" className="form-control" 
                       name="email" 
                       value={email} 
                       onChange={handleChange} 
                       placeholder="Enter email" />
                { formErrors.email && <span className="text-danger"> { formErrors.email } <br/></span> }<br/>    

                <input type="password" className="form-control" 
                       name="password" 
                       value={password} 
                       onChange={handleChange} 
                       placeholder="Enter password" />
                { formErrors.password && <span className="text-danger"> { formErrors.password } <br/> </span> }

                { serverErrors && <span className="text-danger"> { serverErrors} <br/></span>}<br/>

                <input type="submit" className="btn btn-success btn-sm" value="Login" />
                <button className="mx-2 btn btn-secondary btn-sm" onClick={cancelLogin} style={{marginLeft: '10px'}}>Cancel</button>
            </form>
            

        </div>  
    )
}

export default Login