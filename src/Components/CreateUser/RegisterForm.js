import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ChatApi } from '../../Context/Chat_API'



function RegisterForm(props) {

    const [name, setFName] = useState('')
    const [email, setEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')


    // const [isNew, setIsNew] = useState(true);

    function fNameInputHandler(event) {
        setFName(event.target.value);
    }
    function emailInputHandler(event) {
        setEmail(event.target.value);
    }

    function userNameInputHandler(event) {
        setUserName(event.target.value);
    }
    function passwordInputHandler(event) {
        setPassword(event.target.value);
    }




    const createUserEventHandler = async (event) => {
        event.preventDefault();

        const newUser = {
            name,
            email,
            userName,
            password
        };

        try {
            const responce = await fetch(`${ChatApi}/auth/signup`, {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify(newUser),
            })
            const data = await responce.json();
            if (data.status === 'failed') setError(data.message)
            if (data.status === 'success') {
                document.cookie = `Bearer ${data.token}`;
                window.location.href = '/rooms'
            }

        } catch (e) {
            console.log(e.message)
        }


        setFName('');
        setEmail('');
        setUserName('');
        setPassword('');
    }


    return (
        <form className='createUser' onSubmit={createUserEventHandler} >
            <input type="text"
                id="fName"
                placeholder="Full Name"
                value={name}
                onChange={fNameInputHandler} />
            <br/>
            <input type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={emailInputHandler} />
            <br/>
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
            <button type="submit" className="createUser-btn">SignUp </button>
            <br/>
            <span>Click here to <NavLink to={'/'} style={{ margin: '0 20px' }}>LOGIN</NavLink></span>

        </form>
    )
}

export default RegisterForm