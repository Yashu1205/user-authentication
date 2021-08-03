import React, { useEffect, useState } from 'react'
import axios from 'axios' 
import Swal from 'sweetalert2'

const Account = (props) => {
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        if(localStorage.getItem('token')) {
            axios.get('http://dct-user-auth.herokuapp.com/users/account',{ 
                    headers: {
                        "x-auth" : localStorage.getItem('token') 
                    }
                })
                 .then((response) => {
                     setUserInfo(response.data)
                 }) 
                 .catch((error) => {
                     Swal.fire('Oops..',error.message,'error')
                 })
        }
        else{
            props.history.push('/login')
        }
    },[])
    

    return (
        <div className="card" style={{width: '50%'}}>
            <div className="card-body">
            <table className="table table-borderless ">
                <thead></thead>
                <tbody>
                    <tr>
                        <td>username</td>
                        <td>{ userInfo.username}</td>
                    </tr>
                    <tr>
                        <td>email</td>
                        <td>{ userInfo.email}</td>
                    </tr>
                    <tr>
                        <td>join date</td>
                        <td>{ userInfo.createdAt}</td>
                    </tr>
                </tbody>
            </table>
            </div>
            
        </div>
    )
}

export  default Account