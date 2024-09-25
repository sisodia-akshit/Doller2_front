import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

import { ChatApi } from '../../Context/Chat_API'
import { NavLink } from 'react-router-dom';
import './Room.css'



function Room(props) {
    const [rooms, setRoom] = useState()
    const [user, setUser] = useState()

    const getRoom = async () => {
        try {
            const response = await fetch(`${ChatApi}/rooms`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': document.cookie
                }
            })
            const data = await response.json()
            if (data.status === 'success') {
                setRoom(data.rooms);
                setUser(data.receiver)

                const socket = io(ChatApi, {
                    query: {
                        userName: data.receiver.userName
                    }
                });
                props.getSocket(socket)
            }

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getRoom()
    }, [])





    if (!rooms) return <h1>Loading...</h1>

    return (
        <div className="rooms">
            <h1>Available rooms</h1>
            {rooms.map((curr, i) => {
                return (
                    <div className='roomName' key={i}>
                        <NavLink to={`/rooms/${user.userName}/${curr._id}`}><h1>{curr.name}</h1></NavLink>
                    </div>
                )
            })}

            <p>username: <span id='USERNAME'>{user.userName}</span></p>
        </div>
    )


}

export default Room