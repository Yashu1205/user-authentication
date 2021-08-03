import React, { useEffect, useState } from 'react'

import NavBar from './components/NavBar'
import './navbar.css'

const App = (props) => { 
    const [userLoggedIn, setUserLoggedIn] = useState(false)

    useEffect(() => {
        if(localStorage.getItem('token')){
            handleAuth()   
        }  
    },[])

    const handleAuth = () => {
        setUserLoggedIn(!userLoggedIn)
    }

    return (
        <div className="container">
            <h1 style={{textAlign:'center', margin:'20px'}}>User Auth</h1>
            <NavBar userLoggedIn={userLoggedIn} handleAuth={handleAuth}/>
        </div>
    )
}

export default App