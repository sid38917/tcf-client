import React from 'react'

const ButtonUser = (props) => { 
    const {user, login, removeUser} = props;
    const {user, setUser}

    return (
        <>
        {!user ? <button style = {{backgroundColor: 'black', margin: '10px', height: '30px'}} onClick = {login}>Lgin</button>: 
        <button style = {{backgroundColor: 'red', height: '30px'}} onClick = {removeUser}>Logout</button>}
       
        </>
    )
}