import React, { useState } from 'react'

import { ChatApi } from '../../../Context/Chat_API'
import { useParams } from 'react-router-dom'


function SendMessage(props) {
    const { id } = useParams();
    const [message, setMessage] = useState('');

    const handleSendMessage = async (e) => {
        e.preventDefault();
        const messageText = {
            messageText: message
        }
        try {
            fetch(`${ChatApi}/rooms/${id}`, {
                method: 'PATCH',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    'authorization': document.cookie
                }),
                body: JSON.stringify(messageText)
            })
            // props.socket.emit('send message',props.userName, message);
            setMessage('')
        } catch (e) {
            console.log(e)
        }
    }



    return (
        <div className='chatboxBottom' >
            <p id="newEntry" style={{ textAlign: 'center', color: 'gold' }}></p>
            <form className='sendMsg' onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default SendMessage