import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ChatApi } from '../../Context/Chat_API'
import '../CreateUser/CreateUser.css'

function LoginUser() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')



    function userNameInputHandler(event) {
        setUserName(event.target.value)
    }
    function passwordInputHandler(event) {
        setPassword(event.target.value);
    }

    async function loginUserEventHandler(e) {
        e.preventDefault();
        let user = { userName, password }

        try {
            const responce = await fetch(`${ChatApi}/auth/`, {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify(user),
            })
            const data = await responce.json();
            if (data.status === 'failed') setError(data.message)
            if (data.status === 'success') {
                document.cookie = `Bearer ${data.token}`
                window.location.href = '/rooms'
            }


        } catch (e) {
            console.log(e.message)
        }
        setUserName('')
        setPassword('')
    }


    return (
        <div className='register'>
            <h1>Login</h1>
            <form className='loginForm' onSubmit={loginUserEventHandler}  >
                    <input type="text"
                        id="userName"
                        placeholder="UserName"
                        value={userName}
                        onChange={userNameInputHandler} />
                    <br/>   
                    <input type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={passwordInputHandler} />

                <p>{error}</p>

                <button type="submit"> Login </button><br/>
                <span>Click here to<NavLink to={'/signup'} style={{ margin: '0 20px' }}>SignUp</NavLink></span>
            </form>
        </div>
    )
}

export default LoginUser