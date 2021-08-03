import React, { useState } from 'react'
import { NavLink, Route, withRouter } from 'react-router-dom'
import Swal from 'sweetalert2'

import Home from './Home'
import Register from './Register'
import Login from './Login'
import Account from './Account'
import NotesContainer from './Notes/NotesContainer'

const NavBar = (props) => {
    const {userLoggedIn, handleAuth } = props

    const logout = () => {
        Swal.fire('','Successfully logged out','success')
        localStorage.removeItem('token')
        props.history.push('/')
        handleAuth()
    }

    return (
        <div >
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
                <ul className="nav nav-pills mr-auto">
                    <li>
                        <NavLink exact to="/" activeClassName="active">
                            Home
                        </NavLink>
                    </li>

                    {
                        userLoggedIn ? (
                            <>
                                <li >
                                    <NavLink to="/account"  activeClassName="active">
                                        Account
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="/mynotes" activeClassName="active">
                                        My Notes
                                    </NavLink>
                                </li>

                                <li onClick={logout}><a>  Logout  </a></li>
                            </>
                            ) : (
                                <>
                                    <li>
                                        <NavLink to="/register" activeClassName="active">
                                            Register
                                        </NavLink>
                                    </li>

                                    <li>
                                        <NavLink to="/login" activeClassName="active">
                                            Login
                                        </NavLink>
                                    </li>                           
                                </>
                            )
                        }                    
                </ul>
            </nav>     

            <Route path="/" component={Home} exact={true} />
            <Route path="/register" component={Register} />
            <Route path="/login" render={(props) => {
                    return <Login {...props} handleAuth={handleAuth} /> 
                }} />
            <Route path="/account" component={Account} />
            <Route path="/mynotes" component={NotesContainer} />
        </div>

    )
}

export default withRouter(NavBar)