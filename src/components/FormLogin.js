import React, {useState} from 'react';


const FormLogin = (props) => {

    const {username, setUsername} = props

    return (
        <>
        <div>
            <h3>Login Form</h3>
            <form onSumbit = {(e) => {
                e.preventDefault();
            }}>
                <label for = "username">Username: </label>
                <input type = 'text' name = 'username' value = {username} onChange = {(e) => setUsername(e.target.value)}></input>
            </form>
        </div>
        </>
    )
}

export default FormLogin